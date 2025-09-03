# 通话前检测

---

## 功能简介

为了保证实时通话体验，通话前可以进行网络与设备的检测，提前识别并排查问题。

- 网络检测：检测网络环境，可用于判断或预测网络环境是否适合推/拉指定码率的流。
- 设备检测：检测本地麦克风、摄像头以及扬声器是否能正常工作。

本文将介绍如何使用 ZEGO Express SDK 接口，实现上述两个角度的检测。


## 网络检测

请参考 [网络测速](/real-time-video-rn/communication/testing-network) 进行操作。


## 设备检测

### 麦克风检测

#### 检测逻辑

麦克风设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Microphone_detection.png" /></Frame>


#### 对应接口

**1. 启动麦克风**

调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口在不推流的情况下启动音频采集。

```javascript
ZegoExpressEngine.instance().startPreview();
```

**2. 检测麦克风权限**

ZEGO SDK 自动检查麦克风权限。

<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>



```javascript
import {PermissionsAndroid} from 'react-native';

const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,
                                        PermissionsAndroid.RECORD_AUDIO);
granted.then((data)=>{

        if(!data) {
            const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
            PermissionsAndroid.requestMultiple(permissions);
        }
    }).catch((err)=>{
    console.log(err.toString());
    })
}
```

**3. 检测麦克风是否可用**

调用 [deviceError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#deviceerror) 接口检测设备是否异常，若未检测到任何异常反馈（可同步启动“4. 检测麦克风收音数据”），且麦克风收音数据检测正常，则麦克风设备可用。

```javascript
/**
 * 音视频设备错误通知
 * @param deviceName 设备类型名称。
 * @param errorCode 错误码，请参考常见错误码：/real-time-video-rn/error-code#7。
 */
deviceError: (errorCode: number, deviceName: string) => void;
```


**4. 检测麦克风收音数据**

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startsoundlevelmonitor) 接口获取麦克风采集到声音的能量值，如果数据无异常则麦克风正常，可用于通话。

```java
ZegoExpressEngine.instance().startSoundLevelMonitor();
```


### 摄像头检测

#### 检测逻辑

摄像头设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Camera_detection.png" /></Frame>


#### 对应接口

**1. 启动摄像头**

调用 [startPreview](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口绑定摄像头预览画面的视图，在不推流的情况下启动视频采集并预览。

```javascript
render() {
    return (
    ...
    <ZegoTextureView ref='zego_preview_view' style={{height: 200}} />
    ...
    );
}

componentDidMount() {
    ...
    ZegoExpressEngine.instance().startPreview({"reactTag": findNodeHandle(this.refs.zego_preview_view), "viewMode": ZegoViewMode.AspectFit, "backgroundColor": 0});
    ...
}
```

**2. 检测摄像头权限**

ZEGO SDK 会自动检查摄像头权限。

<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>



```javascript
import {PermissionsAndroid} from 'react-native';

const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,
                                        PermissionsAndroid.RECORD_AUDIO);
granted.then((data)=>{

        if(!data) {
            const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
            PermissionsAndroid.requestMultiple(permissions);
        }
    }).catch((err)=>{
    console.log(err.toString());
    })
}
```

**3. 检测摄像头是否可用**

调用 [deviceError](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#deviceerror) 接口检测设备是否异常，若未检测到任何异常反馈（可同步启动“检测画面是否正常”），且画面显示正常，则设备可用。

```javascript
/**
 * 音视频设备错误通知
 * @param deviceName 设备类型名称
 * @param errorCode 错误码，请参考常见错误码：/real-time-video-rn/error-code#7
 */
deviceError: (errorCode: number, deviceName: string) => void;
```

**4. 检测画面是否正常**

若此时画面显示正常，则摄像头正常，可用于通话。


### 扬声器检测

#### 检测逻辑

播放设备检测流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/Playback_device_detection.png" /></Frame>


#### 对应接口

**1. 使用媒体播放器播放音频文件**

调用 [ZegoMediaPlayer](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressdefines_.zegomediaplayer.html) 接口播放您用于测试的音频文件。

```java
// 1. 创建播放器对象
let mediaPlayer = ZegoExpressEngine.instance().createMediaPlayer();
// 2. 加载资源
let resourcePath = "xxx";
mediaPlayer.loadResource(resourcePath);
// 3. 播放资源
mediaPlayer.start();
```

**2. 检测是否听到声音**

如果可以听到相应的音频，则播放设备正常，可用于通话。调用 [mediaPlayerStateUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegomediaplayerlistener.html#mediaplayerstateupdate) 回调查看播放器状态：

```javascript
/**
 * 播放器播放状态回调
 * @param mediaPlayer 回调的播放器实例
 * @param state 播放器状态
 * @param errorCode 错误码，详情请参考常见错误码文档 https://doc-en.zego.im/en/308.html
 */
mediaPlayerStateUpdate: (mediaPlayer: ZegoMediaPlayer, state: ZegoMediaPlayerState, errorCode: number) => void;
```
