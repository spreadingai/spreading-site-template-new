# 发送与接收语音消息

- - -

本文介绍如何使用 ZIM SDK 和 ZIM Audio SDK 快速实现基本的语音消息发送与接收功能。

## 前提条件

在实现“发送与接收语音消息”功能之前，请确保：


- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-flutter/send-and-receive-messages) 的 “2 集成 SDK”。
- 已集成 ZIM Audio SDK，详情请参考 [语音组件 - 集成 SDK](/zim-flutter/zim-audio/integrate-the-zim-audio-sdk)。


## 实现流程

用户发送与接收语音消息的过程主要包含录制音频、发送音频、接收音频和播放音频等环节。以客户端 A 和 B 的语音消息交互为例：
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/audio_message.png" /></Frame>


<a id="init"></a>

### 1 初始化 SDK

在使用 ZIM Audio SDK 其他接口前，请先调用 [init](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/init.html) 进行初始化。

在调用此接口时，如果您只希望实现最基础的语音消息收发，接口参数可以传空字符串。

如果您希望实现更多音频处理，请传入鉴权文件 License，如何获取 License，请参考 [在线鉴权](/zim-flutter/zim-audio/implement-online-authentication)。

```dart
// 初始化 ZIM Audio SDK
// 本文描述的场景无需 License
ZIMAudio.getInstance().init("");
```

### 2 监听回调

根据需要，实现 [ZIMAudioEventHandler](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler-class.html) 中的回调方法。以 [onError](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onError.html) 为例

```dart
ZIMAudioEventHandler.onError = (ZIMAudioError errorInfo){
    // 编写业务代码
};
```

<a id="record"></a>

### 3 录制音频文件

#### 3.1 开始录制

1. 消息发送客户端调用 [startRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/startRecord.html) 接口定义音频文件存放的本地绝对路径（需包含音频文件名称与后缀，如 xxx/xxx/xxx.m4a，仅支持 .m4a 和 .mp3）和录制时长上限，开始录制音频文件。

    ```dart
    ZIMAudio.getInstance().startRecord(ZIMAudioRecordConfig("path",maxDuration: 10 * 1000));
        // path 为音频文件预期存放的本地绝对路径并携带文件后缀名（仅支持 .m4a 和 .mp3），如 xxx/xxx/xxx.m4a
        // maxDuration 为音频的最大录制时长，单位为 ms。
        // 默认为 60000 ms（即 60 秒）。最大值不超过 300000 ms（即 5 分钟）。
        // 此处示例表示 10 个 1000 ms（即 10 秒）。
    ```

2. 触发相关回调。

    - 开始录制后，消息发送客户端可以监听 [onRecorderStarted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderStarted.html) 回调，用于更新 UI。

        ```dart
        static void Function()? onRecorderStarted;
        ```

    - ZIM Audio SDK 会每 500 毫秒通过 [onRecorderProgress](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderProgress.html) 回调一次进度通知，说明已录制的音频文件时长，此信息可用于 UI 更新 。

        ```dart
        static void Function(int currentDuration)? onRecorderProgress;
        ```

    - 在录音开始时或在录音过程中，如果因异常导致录音失败，ZIM Audio SDK 将会通过 [onRecorderFailed](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderFailed.html) 进行通知，消息发送客户端可以监听该回调并参考 [ZIM Audio 错误码文档](/zim-flutter/sdk-error-codes/zim-audio#错误码) 处理失败事件。

        ```dart
        static void Function(int errorCode)? onRecorderFailed;
        ```


#### 3.2 完成录制 

1. 如需结束录制音频，请调用 [completeRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/completeRecord.html) 接口。

    <Note title="说明">

    - 请在调用 [completeRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/completeRecord.html) 接口之前，您已监听到 [onRecorderStarted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderStarted.html) 回调，否则会导致本次录制取消，且收到录制时间过短的报错。
    - 如果录制没有被 <a href="#32-完成录制-">完成</a> 或 <a href="#33可选取消录制">取消</a>，当录制时长达到时间上限时，ZIM Audio SDK 将会自动完成录制，并触发 [onRecorderCompleted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCompleted.html) 回调。
    </Note>

    ```dart
    ZIMAudio.getInstance().completeRecord();
    ```

2. 收到 [onRecorderCompleted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCompleted.html) 回调后，即可根据开始录制时传入的路径找到该音频文件。

    ```dart
    static void Function(int totalDuration)? onRecorderCompleted; // totalDuration 为音频文件总时长，单位为毫秒
    ```


#### 3.3（可选）取消录制

1. 如需提前停止录音且不需要发送语音消息时，调用 [cancelRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/cancelRecord.html) 即可中断录制并删除该录制文件。

    ```dart
    ZIMAudio.getInstance().cancelRecord();
    ```

2. 调用 [cancelRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/cancelRecord.html) 接口后，将会触发 [onRecorderCancelled](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCancelled.html) 回调，消息发送客户端可监听该回调用于 UI 更新。

    ```dart
    static void Function()? onRecorderCancelled;
    ```

#### 3.4（可选）检查当前是否正在录制

如需在某一时刻检查当前是否正在录制中，可调用 [isRecording](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/isRecording.html) 接口获取当前录制状态。

```dart
bool isRecording = await ZIMAudio.getInstance().isRecording();
```

### 4 发送语音消息

<Warning title="注意">

实现此步骤前，请确认用户已 [登录 ZIM](/zim-flutter/send-and-receive-messages#4-登录-zim)。
</Warning>


当 [onRecorderCompleted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCompleted.html) 触发后，消息发送客户端可以使用音频文件绝对路径构造 [ZIMAudioMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMAudioMessage-class.html)（ZIM 音频消息），并调用 [sendMediaMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMediaMessage.html) 接口发送该消息，下列代码以在单聊会话中发送音频消息为例。

```dart
// 录制完成回调
ZIMAudioEventHandler.onRecorderCompleted = (int totalDuration) async{
    // 将单位为毫秒的音频时长转换为 ZIM 需要的秒
    int second = totalDuration ~/ 1000;
    // 构造 ZIM 音频消息
    ZIMAudioMessage audioMessage  = ZIMAudioMessage('xxx/xxx.mp3');//录制音频文件绝对路径
    audioMessage.audioDuration = second;
    ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
    ZIMMediaMessageSendNotification notification = ZIMMediaMessageSendNotification(onMessageAttached: (message){
        // 开发者可以监听这个回调执行消息发送前的业务逻辑
    },onMediaUploadingProgress: (message,currentFileSize,totalFileSize){
        // 开发者可以监听这个回调获取多媒体上传的进度
    });
    // 在单聊会话中发送音频消息
    ZIM.getInstance()!.sendMediaMessage(
        audioMessage,
        'toConversationID',
    ZIMConversationType.peer,
    ZIMMessageSendConfig(), notification)
        .then((value) => {
        // 成功触发此处
    })
        .catchError((onError) {
        // 失败触发此处
    });
};  
```

如需了解发送进度，请参考收发消息文档的 [富媒体文件消息的发送进度回调](/zim-android/guides/messaging/send-and-receive-messages#富媒体文件消息的发送进度回调)。

### 5 接收语音消息


<Warning title="注意">

实现此步骤前，请确认用户已 [登录 ZIM](/zim-flutter/send-and-receive-messages#4-登录-zim)。
</Warning>

根据会话类型（单聊、房间、群组），消息接收客户端监听 [onPeerMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onPeerMessageReceived.html)、[onGroupMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMessageReceived.html)、[onRoomMessageReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMessageReceived.html)，接收语音消息的相关通知，然后可以调用 [downloadMediaFile](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/downloadMediaFile.html) 接口，下载音频文件到本地。

下列代码描述在单聊会话接收并下载音频消息。

```dart
ZIMEventHandler.onPeerMessageReceived = (zim, messageList, info, fromUserID) async{
    //收到单聊消息触发此处
    for (ZIMMessage message in messageList) {
        // 收到消息时，可通过消息的 Type 进行判断接收到何种类型的消息
        switch (message.type) {
            case ZIMMessageType.audio:
                message as ZIMAudioMessage;
                try{
                    var result = await ZIM.getInstance()!.downloadMediaFile(message,ZIMMediaFileType.originalFile,null);
                    ZIMAudioMessage resultMsg = result.message as ZIMAudioMessage;
                    resultMsg.fileLocalPath;   // 下载成功，获取音频文件本地绝对路径
                }catch(error){
                    // 下载失败，根据 ZIM 官网错误码表处理失败事件
                }
                break;
            default:
        }
    }
};
```

如需了解下载进度，请参考收发消息文档的 [富媒体文件消息的下载进度回调](/zim-android/guides/messaging/send-and-receive-messages#富媒体文件消息的下载进度回调)。

### 6 播放音频文件

#### 6.1 开始播放

1. 消息接收客户端调用 [startPlay](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/startPlay.html) 接口，传入音频文件的本地绝对路径，设置音频输出的路由类型，开始播放音频文件。

    ```dart
    // 开始播放音频    
    await ZIMAudio.getInstance().startPlay(ZIMAudioPlayConfig('填入音频文件的本地绝对路径',routeType:ZIMAudioRouteType.speaker));
    ```

2. 触发相关回调。

    - 监听回调 [onPlayerStarted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerStarted.html) ，用于 UI 更新。

        ```dart
        static void Function(int totalDuration)? onPlayerStarted; // totalDuration 为音频文件总时长，单位为毫秒
        ```

    - ZIM Audio SDK 会每 500 毫秒通过 [onPlayerProgress](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerProgress.html) 回调一次进度通知，说明已播放时长，此信息可用于 UI 更新 。

        ```dart
        static void Function(int currentDuration)? onPlayerProgress;
        ```

    - 在播放开始时或在播放过程中，如果因异常导致播放失败，ZIM Audio SDK 将会通过 [onPlayerFailed](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerFailed.html) 进行通知，消息接收客户端可以监听该回调并参考 [ZIM Audio 错误码文档](/zim-flutter/sdk-error-codes/zim-audio#错误码) 处理失败事件。

        ```dart
        static void Function(int errorCode)? onPlayerFailed;
        ```

    - 若因其他操作（如在播放期间开始录音、在播放期间接收到系统的来电事件、在播放期间音频设备被其他应用抢占等情况。）导致播放终端，ZIM Audio SDK 将回调 [onPlayerInterrupted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerInterrupted.html)。
   
        ```dart
        static void Function()? onPlayerInterrupted;
        ```

    - 播放完成时，ZIM Audio SDK 将会回调 [onPlayerEnded]()。

        ```dart
        static void Function()? onPlayerEnded;
        ```

3. （可选）如需在播放过程中切换音频输出设备(扬声器或听筒)，请调用 [setAudioRouteType](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/setAudioRouteType.html) 。

    <Warning title="注意">

    若用户已连接耳机，该接口调用将不会生效，音频输出仍将通过耳机进行。
    </Warning>

    ```dart
    // 设置输出设备为扬声器
   ZIMAudio.getInstance().setAudioRouteType(ZIMAudioRouteType.speaker);
    ```

#### 6.2（可选）停止播放

1. 如需中断播放，请调用 [stopPlay](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/stopPlay.html) 接口。

    ```dart
    await ZIMAudio.getInstance().stopPlay();
    ```

2. 监听 [onPlayerStopped](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerStopped.html) 回调，更新 UI。停止播放或播放完成后，ZIM Audio SDK 将释放对音频设备的占用。

    ```dart
    static void Function()? onPlayerStopped;
    ```

### 7 反初始化

如果用户彻底不使用语音功能，可调用 [unInit](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/uninit.html) 释放资源。

```dart
ZIMAudio.getInstance().uninit();
```
