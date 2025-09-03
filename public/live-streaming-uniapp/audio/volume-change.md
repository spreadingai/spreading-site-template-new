# 音量变化

- - -

## 功能简介

音量变化：指某条流的音量大小，下文简称为“声浪”。

主要应用场景是在推拉流过程中，判断麦上的用户谁在说话，并做 UI 展示，例如：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/SoundLevel.png" /></Frame>


## 前提条件

在监听声浪前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21045) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21030)。



## 非混流场景使用步骤

### 1 监听声浪的回调接口

- 接口原型：

    本地采集的声浪回调接口 [capturedSoundLevelInfoUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelinfoupdate):

    ```javascript
    /**
     * 本地采集音频声浪回调
     *
     * @param soundLevelInfo 本地采集的声浪值，取值范围为 0.0 ~ 100.0
     */
    capturedSoundLevelInfoUpdate: (soundLevelInfo: zego.ZegoSoundLevelInfo) => void;
    ```

    远端音频声浪回调接口 [remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate):

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

    可先通过 [roomStreamUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomstreamupdate) 回调方法获取到当前房间内存在的流列表并保存，再通过保存的流列表来索引 map 取得每条流对应的声浪数据。

    以下示例为如何从回调方法中获取到声浪的数据：

    ```javascript
    // 监听远端声浪回调通知
    ZegoExpressEngine.instance().on('remoteSoundLevelUpdate', (soundLevels) => {
        // 通过 streamID 索引 soundLevels map 中的远端声浪值
        });

    // 监听本地声浪回调通知
    ZegoExpressEngine.instance().on('capturedSoundLevelInfoUpdate', (soundLevelInfo) => {
        // 直接获取本地声浪值
        });
    ```

### 2 启动监听声浪回调

调用 [startSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startsoundlevelmonitor) 接口启动监听声浪回调。

```javascript
// 启动声浪监控
ZegoExpressEngine.instance().startSoundLevelMonitor();
```

在调用上述接口后，[capturedSoundLevelInfoUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelinfoUpdate) 回调方法需要在调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 开始预览接口或者 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 开始推流接口之后，才会有回调。

[remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate) 需要在调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 开始拉流接口之后，才会有回调。


### 3 停止监听声浪回调

调用 [stopSoundLevelMonitor](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#stopsoundlevelmonitor) 接口停止监听声浪回调。

```javascript
// 停止声浪监控
ZegoExpressEngine.instance().stopSoundLevelMonitor();
```

在调用上述接口之后，[capturedSoundLevelInfoUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#capturedsoundlevelinfoupdate) 与 [remoteSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#remotesoundlevelupdate) 不再回调。

## 混流场景使用步骤

- 混流，是将多路流混合成一路流的功能。当客户需要展示混流前各条流的声浪信息时，即可使用混流声浪的功能。由于混流的输出是单流，使用混流输出流的声浪信息是无法满足展示各条输入流声浪的需求。此时需要在混流时，在流信息里携带输入流的声浪信息，然后在拉取混流输出流时，从流信息里解析出各条输入流的声浪信息。
- 当从流信息里解析出各条输入流的声浪信息时，我们获得的是各条输入流对应声浪的值，就是一个字典。字典里面的 `key` 是流的标识符，`value` 是声浪值。但是由于流信息的大小限制，`key` 不能使用流 ID，只能用一个数字 ID（soundLevelID）来标识流。
- 在手动混流配置中，需要开发者维护数字 ID（soundLevelID）和流 ID 的关联关系。在回调中，开发者会得到数字 ID（soundLevelID）和对应声浪信息。
- 在房间自动混流中，混流服务端和 SDK 会自动处理数字 ID 和流 ID 的关联。在回调中，开发者得到的是流 ID 对应声浪信息。


### 1 监听混流声浪的回调接口

- 接口原型

    - 手动混流中每条单流的声浪更新回调接口 [mixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#mixersoundlevelupdate)：

        ```javascript
        /**
         * 混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevel 混流中每条单流的声浪键值对，key 为每条单流的 soundLevelID，value 为对应的单流的声浪值。取值范围：value 的取值范围为 0.0 ~ 100.0。
         */
        mixerSoundLevelUpdate: (soundLevels: Map<number, number>) => void
        ```

    - 自动混流中每条单流的声浪更新回调接口 [autoMixerSoundLevelUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#automixersoundlevelupdate)：

        ```javascript
        /**
         * 自动混流中每条单流的声浪更新回调
         *
         * 回调通知周期为 100 ms。
         * @param soundLevels 混流中每条单流的声浪键值对，key 为每条单流的 streamID，value 为对应的单流的声浪值，value 的取值范围为 0.0 ~ 100.0
         */
        autoMixerSoundLevelUpdate: (soundLevels: Map<string, number>) => void
        ```

### 2 启动监听声浪回调的开关

在开始/更新混流时，可启动监听声浪回调的开关。

- 手动混流场景

  调用 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 接口发起手动混流任务时，设置 `soundLevel` 参数为 `true` 可启动声浪的监听，并为每条输入流指定设置唯一的 `soundLevelID`：

    ```javascript
    ZegoMixerTask task = new ZegoMixerTask();
    task.taskID = "task123";
    // 开启混流声浪
    task.soundLevel = true;

    ZegoMixerInput input = new ZegoMixerInput();
    // 给输入流分配一个 soundLevelID
    input.soundLevelID = 123;

    // 其他配置
    ZegoExpressEngine.instance().startMixerTask(task);
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startautomixertask) 接口发起自动混流任务时，设置 `enableSoundLevel` 参数为 `true` 可启动声浪的监听：

    ```javascript
    ZegoAutoMixerTask task = new ZegoAutoMixerTask();
    task.taskID = "autotask123";
    // 开启混流声浪
    task.enableSoundLevel = true;
    // 其他配置

    ZegoExpressEngine.instance().startAutoMixerTask(task);
    ```


### 3 停止监听声浪回调的开关

在更新混流任务时，可设置停止监听声浪回调的开关。

- 手动混流场景

  在调用 [startMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startmixertask) 的客户端接口更新一个混流任务时，设置 `soundLevel` 参数为 `false` 可停止声浪的监听：

    ```javascript
    ZegoMixerTask task = new ZegoMixerTask();
    // taskID 要和之前的保持一致
    task.taskID = "task123";
    // 停止监听混流声浪
    task.soundLevel = false;

    ZegoExpressEngine.instance().startMixerTask(task);
    ```

- 自动混流场景

  调用 [startAutoMixerTask](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startautomixertask) 的客户端接口更新一个自动混流任务时，设置 `enableSoundLevel` 参数为 `false` 可停止声浪的监听：

    ```javascript
    ZegoAutoMixerTask task = new ZegoAutoMixerTask();
    // taskID 要和之前的保持一致
    task.taskID = "autotask123";
    // 停止监听混流声浪
    task.enableSoundLevel = false;

    ZegoExpressEngine.instance().startAutoMixerTask(task);
    ```

## 常见问题

**开启了声浪的监听开关之后，为什么没有收到相关回调？**

- 本地采集的声浪回调会立刻触发，未推流时的回调值为 0。
- 远端拉流的声浪回调在调用 [startPlayingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_uni-app/classes/_zegoexpressengine_.zegoexpressengine.html#startplayingstream) 接口拉流成功之后才会触发。

<Content />

