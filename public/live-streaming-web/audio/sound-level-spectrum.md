# 音量变化

- - -

## 功能简介

在 K 歌场景中，经常需要拉多路流并显示其中正在讲话的用户，ZEGO 提供了甄别用户是否说话、说话音量大小（音浪）的能力，方便开发者做 UI 展示，例如：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/16051) 获取源码。

相关源码请查看 “src/Examples/AdvancedAudioProcessing/SoundLevelAndAudioSpectrum” 文件。

## 前提条件

在监听音量变化功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## RTC / L3 使用步骤

1. 监听音浪回调接口，注册 [soundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#sound-level-update) 回调，接收流音量大小的变化。

<Note title="说明">


    音浪即某条流音量的大小。

</Note>



    ```js
    zg.on('soundLevelUpdate', (streamList) => {
        streamList.forEach(stream => {
            stream.type == 'push' && $('#soundLevel').html(Math.round(stream.soundLevel) + '');
            console.warn(`${stream.type} ${stream.streamID}, soundLevel: ${stream.soundLevel}`);
        });
    });
    ```


2. 启动音浪监听，调用 [setSoundLevelDelegate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口启动监听音量大小，设置音浪回调间隔时间，单位为 ms。

    ```javascript
    zg.setSoundLevelDelegate(true, 1000);
    ```

3. 停止音浪监听，调用 [setSoundLevelDelegate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-sound-level-delegate) 接口停止监听音量大小。

    ```javascript
    zg.setSoundLevelDelegate(false);
    ```

## 播放器插件场景使用步骤

1. 监听播放器插件音浪回调接口，注册 [onSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#on-sound-level-update) 回调，接收流音量大小的变化。

<Warning title="注意">

Safari 浏览器上使用 MSE (Media Source Extensions) 的解码方式播放音频无法获取音浪，如果需要获取音浪避免在 Safari 浏览器上使用 MSE 的解码方式。

</Warning>

```js
// player 为播放器插件 ZegoExpressPlayer 实例
player.onSoundLevelUpdate = (level) => {
  // level 为播放器播放音量大小
  console.warn("onSoundLevelUpdate",level)
}
```

2. 启动音浪监听，调用 [enableSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#enable-sound-level-monitor) 接口启动监听音量大小，设置音浪回调间隔时间，单位为 ms。

```js
player.enableSoundLevelMonitor(true, 1000);
```

3. 停止音浪监听，调用 [enableSoundLevelMonitor|_blank](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressPlayer#enable-sound-level-monitor) 接口停止监听音量大小。

```js
player.enableSoundLevelMonitor(false);
```

## 混流场景使用步骤

1. 调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task) 时，需进行混流配置 [ZegoMixStreamConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig)，需要将 `enableSoundLevel` 配置为 true，并为 [inputList](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoMixStreamConfig#input-list) 配置`soundLevelID`，详情请参考 [混流](https://doc-zh.zego.im/article/16061)。
    ```js
    const mixConfig = {
        "taskID": "custom-task",
        "enableSoundLevel": true,
        "inputList": [
            {
                "streamID": streamID1,
                "soundLevelID": soundLevelID1,
                "layout": {
                    "top": 0,
                    "left": 0,
                    "bottom": 200,
                    "right": 200
                }
            },
            {
                "streamID": streamID2,
                "soundLevelID": soundLevelID2,
                "layout": {
                    "top": 200,
                    "left": 200,
                    "bottom": 400,
                    "right": 400
                }
            }
        ],
        "outputList": [
            "custom-mixwebrtc-1"
        ],
        "outputConfig": {
            "outputBitrate": 300,
            "outputFPS": 15,
            "outputWidth": 400,
            "outputHeight": 400
        }
    }
    zg.startMixerTask(mixConfig);
    ```
2. 调用 [mixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTCEvent#mixer-sound-level-update) 接口监听混流音量变化。
    ```js
    zg.on("mixerSoundLevelUpdate", (mixMap, id) => {
        console.warn("mixerSoundLevelUpdate", mixMap, id);
      });
    ```
3. 根据混流 streamID 拉流，若需要获取混流音量值，需要开启 SEI，详情请参考 [媒体补充增强信息（SEI）](https://doc-zh.zego.im/)。

<Warning title="注意">

    根据混流 streamID 拉流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [服务配置 - 混流](/console/service-configuration/enable-stream-mixing-service)），或联系 ZEGO 技术支持开通。

</Warning>



    ```js
    // 拉流
    zg.startPlayingStream(mixStreamID, {
        // 开启解析 SEI
        isSEIStart: true
    }).then(stream => {

    }).catch(err => {

    });
    ```

<Content />

