# 通话前检测

---

## 功能简介

为了保证实时通话体验，通话前可以对设备进行检测，提前识别并解决问题。
设备检测主要是检测本地麦克风、摄像头以及扬声器是否能正常工作。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/Others/DeviceDetection” 目录下的文件。

## 前提条件

在实现通话前设备检测功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 实现方法

单击 [在线体验](https://zegoim.github.io/express-demo-web/src/Examples/Others/DeviceDetection/index.html) 可以试用检测设备功能。

### 检测麦克风

麦克风设备的检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection_new.jpeg" /></Frame>

**1. 检测麦克风设备权限并获取麦克风设备列表**

调用 [getMicrophones](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-microphones) 接口获取麦克风设备列表。[getMicrophones](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-microphones) 在检测到没有设备权限时会去申请麦克风允许权限。

- 2.14.0 及以后版本可用 getMicrophones 即可获取设备。
- 2.13.0 及以前版本可用 enumDevices 获取设备列表。

<CodeGroup>
  ```js title="2.14.0 及以后版本"
// 2.14.0 及以后版本可用 getMicrophones 即可获取设备。
const microphones = await zg.getMicrophones()
  ```

  ```js title="2.13.0 及以前版本"
// 通过创建麦克风的媒体流来申请麦克风设备权限
const stream = await zg.createStream({
    camera: {
        video: false,
        audio: true
    }
});
zg.destroyStream(stream);
// 获取全媒体设备接口，需要提前申请麦克风允许权限
const mediaDevices = await zg.enumDevices()
const { microphones } = mediaDevices
  ```
</CodeGroup>

**2. 启动并检测麦克风**

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 流实例对象时，通过 “deviceID” 来启动要检测的麦克风。

- 3.0.0 及以后版本，麦克风启动后，[createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口会检测麦克风是否可用，不可用会抛出错误码信息。
- 3.0.0 以前版本，麦克风启动后，[createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口会检测麦克风是否可用，不可用会抛出错误码信息。

<CodeGroup>
  ```js title="3.0.0 及以后版本"
   // 获取第一个麦克风设备的 deviceID
  const { deviceID } = microphones[0]
  // 创建采集的麦克风的媒体流,
  const micStream = await zg.createZegoStream({
      camera: {
          video: false,
          audio: {
              input: deviceID
          }
      }
  })
  ```

  ```js title="3.0.0 以前版本"
  // 获取第一个麦克风设备的 deviceID
  const { deviceID } = microphones[0]
  // 创建采集的麦克风的媒体流,
  const micStream = await zg.createStream({
      camera: {
          video: false,
          audio: true,
          audioInput: deviceID
      }
  })
  ```
</CodeGroup>



**3. 检测麦克风收音数据**

注册本地采集音频声浪回调 [capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update)，“soundLevel” 取值范围为 [0, 100]。

```js
zg.on("capturedSoundLevelUpdate", (soundLevel) => {
    console.log(soundLevel)
})
```

开启麦克风后调用 [setSoundLevelDelegate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口来开启获取音浪功能，触发 [capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update) 事件来获取麦克风音浪大小变化。根据 [capturedSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#captured-sound-level-update) 事件回调的 “soundLevel” 数据是否正常波动来判断麦克风是否正常收音。通常对着麦克风说话时 “soundLevel” 会波动到 10 以上。

```js
// 开启获取音浪
zg.setSoundLevelDelegate(true);
```

### 检测摄像头

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection_new.jpeg" /></Frame>


**1. 检测摄像头设备权限并获取摄像头设备列表**

调用 [getCameras](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-cameras) 接口获取摄像头设备列表，[getCameras](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-cameras) 在检测到没有设备权限时会去申请摄像头允许权限。

- 2.14.0 及以后版本可用 getCameras 即可获取设备。
- 2.13.0 及以前版本可用 enumDevices 获取设备列表。

<CodeGroup>
  ```js title="2.14.0 及以后版本"
// 2.14.0 及以后版本可用 getCameras 即可获取设备
const cameras = await zg.getCameras()
  ```

  ```js title="2.13.0 及以前版本"
// 通过创建摄像头的媒体流来申请摄像头设备权限
const stream = await zg.createStream({
    camera: {
        video: true,
        audio: false
    }
});
zg.destroyStream(stream);
// 获取全媒体设备接口，需要提前申请麦克风允许权限
const mediaDevices = await zg.enumDevices()
const { cameras } = mediaDevices
  ```
</CodeGroup>
**2. 启动并检测摄像头**


调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 流实例对象时，通过 “deviceID” 来启动要检测的摄像头。

- 3.0.0 及以后版本，摄像头启动后，[createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口会检测摄像头是否可用，不可用会抛出错误码信息。
- 3.0.0 以前版本，摄像头启动后，[createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口会检测摄像头是否可用，不可用会抛出错误码信息。

<CodeGroup>
  ```js title="3.0.0 及以后版本"
// 获取第一个摄像头设备的 deviceID
const { deviceID } = cameras[0]
// 创建采集的摄像头的媒体流,
const cameraStream = await zg.createZegoStream({
    camera: {
        video: {
            input: deviceID
        },
        audio: false
    }
})
  ```

```js title="3.0.0 以前版本"
// 获取第一个摄像头设备的 deviceID
const { deviceID } = cameras[0]
// 创建采集的摄像头的媒体流,
const cameraStream = await zg.createStream({
    camera: {
        video: true,
        videoInput: deviceID,
        audio: false
    }
})
```
</CodeGroup>

**3. 检测画面是否正常**

将采集摄像头画面的媒体流通过 html5 的 `<video>` 标签元素播放，以便用户自行判断摄像头设备是否能正常采集画面。

<CodeGroup>
```js title="3.0.0 及之后版本"
// 3.0.0 及之后版本使用 createZegoStream 创建流的预览方式
// 预览容器 div
<div id="camera-view" playsinline autoplay muted></div>

cameraStream.playVideo(document.querySelector("#camera-view"));
```

```js title="3.0.0 之前版本"
// 3.0.0 之前版本使用 createStream 创建流的预览方式
<video id="camera-view" playsinline autoplay muted></video>

// video 为 html5 上的 video 标签元素，用于预览视频
const video = document.getElementById("camera-view")
video.srcObject = cameraStream
```

</CodeGroup>

### 检测扬声器

扬声器设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>

**1. 检测扬声器设备权限并获取扬声器设备列表**

调用 [getSpeakers](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-speakers) 接口获取麦克风设备列表。[getSpeakers](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-speakers) 在检测到没有设备权限时会去申请音频输出设备允许权限。

- 2.14.0 及以后版本可用 getSpeakers 即可获取设备。
- 2.13.0 及以前版本可用 enumDevices 获取设备列表。

<CodeGroup>
  ```js title="2.14.0 及以后版本"
// 2.14.0 及以后版本可用 getSpeakers 即可获取设备
const speakers = await zg.getSpeakers()
  ```

  ```js title="2.13.0 及以前版本"
// 通过创建麦克风的媒体流来申请音频输出设备权限
const stream = await zg.createStream({
    camera: {
        video: false,
        audio: true
    }
});
zg.destroyStream(stream);
// 获取全媒体设备接口，需要提前申请麦克风允许权限
const mediaDevices = await zg.enumDevices()
const { speakers } = mediaDevices
  ```
</CodeGroup>

**2. 通过 `<audio>` 标签播放音频文件**

使用 html5 的 `<audio>` 标签通过 src 赋值音频地址来播放您用于测试的音频文件。

```html
<audio controls id="music-player" src="http://xxx.mp3" loop></audio>
```

**3. 指定扬声器播放声音**

调用 [useAudioOutputDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#use-audio-output-device) 接口来指定音频播放器播放声音，听对应扬声器是否播放声音。

<Warning title="注意">


[useAudioOutputDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#use-audio-output-device) 接口仅支持在 chrome 浏览器使用。

</Warning>




```js
// 获取第一个扬声器设备的 deviceID
const { deviceID } = speakers[0]
// 获取音频播放器
player = document.getElementById("#music-player")
// 指定音频播放器使用的扬声器设备
zg.useAudioOutputDevice(player, deviceID)
// 播放音乐
player.play()
```

### 音视频采集设备热插拔

ZEGO Express Web SDK 提供 [videoDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#video-device-state-changed) 和 [audioDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#audio-device-state-changed) 事件来监听并获取音视频设备的插拔状态，可以用这两个事件来更新设备列表。

```js
zg.on('videoDeviceStateChanged', (updateType, deviceInfo) => {
  if(updateType === "ADD") {
    cameras.push(deviceInfo)
  } else if(updateType === "DELETE") {
    cameras = cameras.filter(item=>(item.deviceID === deviceInfo.deviceID))
  }
});
zg.on('audioDeviceStateChanged', (updateType, deviceType, deviceInfo) => {
  if(updateType === "ADD") {
    microphones.push(deviceInfo)
  } else if(updateType === "DELETE") {
    microphones = microphones.filter(item=>(item.deviceID === deviceInfo.deviceID))
  }
});
```

如果您想要在新设备插入的时候强制使用新设备，则需要使用 [on](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamView#on) 方法注册 [videoDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#video-device-state-changed) 或 [audioDeviceStateChanged](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#audio-device-state-changed) 事件，并在对应的回调函数里调用 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 或 [useAudioDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-audio-device) 来切换音视频采集设备。

<Content />
