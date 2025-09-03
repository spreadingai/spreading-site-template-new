# 音量变化

- - -

## 功能简介

音量变化：指某条流的音量大小，下文简称为“声浪”。

主要应用场景是在推拉流过程中，判断麦上的用户谁在说话，并做 UI 展示，例如：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>


## 前提条件

在监听声浪前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/4835) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/8328)。



## 非混流场景使用步骤

### 监听声浪的回调接口

- 接口原型：

    本地采集的声浪回调接口 [capturedSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelupdate):

    ```javascript
    /**
     * 本地采集音频声浪回调
     *
     * @param soundLevel 本地采集的声浪值，取值范围为 0.0 ~ 100.0
     */
    capturedSoundLevelUpdate: (soundLevel: number) => void;
    ```

    远端音频声浪回调接口 [remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate):

    ```javascript
    /**
     * 远端音频声浪回调
     *
     * @param soundLevels 远端的声浪键值对，key 为流 ID，value 为对应的流的声浪值，value 取值范围为 0.0 ~ 100.0
     */
    remoteSoundLevelUpdate: (soundLevels: {[key: string]: number}) => void;
    ```

- 调用示例：

    远端拉流声浪的回调给的是 map，“key” 为当前房间内正在推流的其他用户的流 ID，“value” 为对应这条流的声浪数据。

    可先通过 [roomStreamUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调方法获取到当前房间内存在的流列表并保存，再通过保存的流列表来索引 map 取得每条流对应的声浪数据。

    以下示例为如何从回调方法中获取到声浪的数据：

    ```javascript
    // 监听远端声浪回调通知
    ZegoExpressEngine.instance().on('remoteSoundLevelUpdate', (soundLevels) => {
        // 通过 streamID 索引 soundLevels map 中的远端声浪值
        });

    // 监听本地声浪回调通知
    ZegoExpressEngine.instance().on('capturedSoundLevelUpdate', (soundLevel) => {
        // 直接获取本地声浪值
        });
    ```

### 启动监听声浪回调

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startsoundlevelmonitor) 接口启动监听声浪回调。

```javascript
// 启动声浪监控
ZegoExpressEngine.instance().startSoundLevelMonitor;
```

在调用上述接口后，[capturedSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelupdate) 回调方法需要在调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 开始预览接口或者 [startPublishingStream: ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 开始推流接口之后，才会有回调。

[remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate) 需要在调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 开始拉流接口之后，才会有回调。


### 停止监听声浪回调

调用 [stopSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#stopsoundlevelmonitor) 接口停止监听声浪回调。

```objc
// 停止声浪监控
ZegoExpressEngine.instance().stopSoundLevelMonitor();
```

在调用上述接口之后，[capturedSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelupdate) 与 [remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate) 不再回调。


## 常见问题

**开启了声浪的监听开关之后，为什么没有收到相关回调？**

- 本地采集的声浪回调会立刻触发，未推流时的回调值为 0。
- 远端拉流的声浪回调在调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉流成功之后才会触发。
