# 实现实时传译

- - -

## 简介

本文介绍如何实现实时传译的功能，包括与 Express 的接口对接，主播与观众之间的通信方式。


## 前提条件

在实现实时传译功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [实时音视频 - 快速开始 - 集成 SDK](/real-time-video-android-java/quick-start/integrating-sdk)。
- 已在项目中集成 ZegoRealtimeTranslation SDK，详情请参考 [集成 SDK](https://doc-zh.zego.im/article/16658) 文档。
- 已开通相关权限，并获取到实时传译的 License。

    - 谷歌：参考 [控制台 - 云市场 - 实时传译（谷歌）](/console/cloud-market/real-time-translation/google)，按照页面指引，自助开通相关权限。
    - 科大讯飞：联系 ZEGO 商务人员开通服务权限。

## 示例源码

ZEGO 提供了 [示例源码](https://doc-zh.zego.im/article/16656)，以供开发者进一步了解 ZEGO 实时传译功能。

## 流程图

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoRealtimeTranslation/ZegoRealtimeTranslation_Sequence_diagram.png" /></Frame>

## 实现流程

请您根据自己的业务需要，选择实现相关的内容识别传译功能。

<Accordion title="实时语音识别" defaultOpen="false">
#### 1 初始化 Express SDK

1. 创建界面。根据场景需要，为您的项目展示实时传译的用户界面，推荐您在项目中添加如下元素：

    - 主播的视频窗口
    - 语音识别结果的窗口
    - 识别结果翻译后的窗口
    - 设置项（服务商，语言等）

2. 创建引擎。调用 ZEGO Express SDK 的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#create-engine) 接口，将申请到的 AppID 和 AppSign 分别传入参数“appID”和“appSign”，创建引擎单例对象。

    注册回调，可将实现了 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~IZegoEventHandler) 的对象传入参数 “eventHandler”。

    ```java
    ZegoEngineProfile zegoEngineProfile = new ZegoEngineProfile();
    // 请通过 ZEGO 控制台获取，格式为：1234567890
    zegoEngineProfile.appID = Config.appID;
    // 请通过 ZEGO 控制台获取，格式为："0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
    zegoEngineProfile.appSign = Config.appSign;
    zegoEngineProfile.application = application;
    // 实时通讯场景接入
    zegoEngineProfile.scenario = ZegoScenario.COMMUNICATION;
    // 创建引擎
    ZegoExpressEngine.createEngine(zegoEngineProfile, zegoEventHandler);

    ...
    private IZegoEventHandler zegoEventHandler = new IZegoEventHandler() {
        // 重载的方法见后面的步骤需要，在后面步骤有详细实现
        ...
    };
    ```


#### 2 登录房间

调用 ZEGO Express SDK 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口登录房间。roomID 和 user 的参数由开发者的本地业务生成，但是需要满足以下条件：同一个 AppID 内，需保证 “roomID” 全局唯一。

```java
// 创建用户对象，ZegoUser 的构造方法 userWithUserID 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null”，否则会导致登录房间失败。
String roomID = "your_room_id";
ZegoUser user = new ZegoUser("your_user_id");

// 登录房间
ZegoExpressEngine.getEngine().loginRoom(roomID, user);
```

<a name="step3"></a>

#### 3 初始化 ZegoRealtimeTranslation SDK

在使用 ZegoRealtimeTranslation SDK 功能前，必须先进行初始化。

```java
ZegoRealtimeTranslation zegoRealtimeTranslation = ZegoRealtimeTranslation.getInstance();
zegoRealtimeTranslation.init(license); // 传入申请到的license
```

#### 4 开始推流

登录房间后如果是主播需要开始推流，设置声音采集的参数。同时设置声音采集的回调接口，把声音数据传给 ZegoRealtimeTranslation SDK。

```java
engine.startPublishingStream(streamID); // streamID是流ID
// 设置采集声音的参数，必须sampleRate是16k，单声道格式。
ZegoAudioFrameParam audioFrameParam = new ZegoAudioFrameParam();
audioFrameParam.sampleRate = ZegoAudioSampleRate.ZEGO_AUDIO_SAMPLE_RATE_16K;
audioFrameParam.channel = ZegoAudioChannel.MONO;
engine.startAudioDataObserver(ZegoAudioDataCallbackBitMask.CAPTURED.value(), audioFrameParam);
// 设置接收麦克风收集到的声音数据回调，并传给ZegoRealtimeTranslation SDK.
engine.setAudioDataHandler(new IZegoAudioDataHandler() {
    @Override
    public void onCapturedAudioData(ByteBuffer byteBuffer, int dataLength, ZegoAudioFrameParam zegoAudioFrameParam) {
        zegoRealtimeTranslation.sendSpeechPCM(byteBufferToByteArray(byteBuffer), dataLength);
    }
};

// ByteBuffer转Byte数组的方法
public static byte[] byteBufferToByteArray(ByteBuffer bytes) {
    int len = bytes.limit() - bytes.position();
    byte[] bytes1 = new byte[len];
    bytes.get(bytes1);
    return bytes1;
}
```

#### 5 拉流

主播和观众都需要拉流，当有流新增时，进行拉流操作。

```java
// zegoEventHandler对应创建引擎时传的参数
private IZegoEventHandler zegoEventHandler = new IZegoEventHandler() {
    ...

    @Override
    public void onRoomStreamUpdate(String roomID, ZegoUpdateType zegoUpdateType, ArrayList<ZegoStream> arrayList, JSONObject jsonObject) {
        ZegoCanvas zegoCanvas = new ZegoCanvas(textureView); // textureView是TextureView
        zegoCanvas.viewMode = ZegoViewMode.ASPECT_FILL;
        engine.startPlayingStream(streamID, zegoCanvas);
    }
}
```

#### 6 解析 SEI 信息

SEI 通道用来传识别和翻译后的文本，这里可以自己定义规则，
Demo使用的规制是：<br />
`zegoa2ti:{\"username\":\"小明\", \"text\":\"今天天气不错\", \"trans\":\"It's a nice day today\"}`

- "zegoa2ti:" 开头的 SEI 信息表示传的是识别中的文本。
- "zegoa2td:" 开头的 SEI 信息表示传的是识别确认最终的文本。
- 后面的内容是个json格式的字符串，包括用户名，文本和翻译的内容。

```java
// zegoEventHandler对应创建引擎时传的参数
private IZegoEventHandler zegoEventHandler = new IZegoEventHandler() {
    ...

    @Override
    public void onPlayerRecvSEI(String streamID, byte[] bytes) {
        String str = new String(data, StandardCharsets.UTF_8);
        // 根据自定义规则处理文本
        if (str.startWith("zegoa2ti") {
            ...
        } else if (str.startWith("zegoa2td") {
            ...
        } else {
            // 其他用途的SEI
        }
    }
}
...
// json定义的数据类
public static class RecognizeModel{
    @SerializedName("username")
    public String userName;
    @SerializedName("text")
    public String text;
    @SerializedName("trans")
    public String translateText;
}
```

#### 7 设置实时传译的参数并开启服务

开启实时传译前需要设置参数，包括服务提供商，源语言和目标语言。

```java
zegoRealtimeTranslation.enableTranslate(true); // 如果不需要翻译可以设置为false
zegoRealtimeTranslation.enableInterimTranslation(true);// 如果不需要中间结果翻译可以设置为false，开启会增加很多翻译请求量
zegoRealtimeTranslation.setSpeechToTextService(ZegoRTServiceProvider.Iflytek); // 设置语音识别使用的服务提供商
zegoRealtimeTranslation.setTextTranslationService(ZegoRTServiceProvider.Iflytek); // 设置翻译使用的服务提供商
zegoRealtimeTranslation.setSourceSpeechLanguage(ZegoSpeechLanguage.zh_CN); // 设置语音识别的语言
zegoRealtimeTranslation.setTargetTranslationLanguage(ZegoTranslationLanguage.en); // 设置翻译的目标语言
zegoRealtimeTranslation.setRealtimeTranslationHandler(new IZegoRealtimeTranslationHandler() {
    @Override
    public void onRecognizingText(String sttText) {
        RecognizeModel recognizeModel = new RecognizeModel();
        recognizeModel.userName = viewModel.userName; // 自己的用户名
        recognizeModel.text = sttText;
        if (!TextUtils.isEmpty(sttText)) {
            // 把识别的文本显示出来
        }

        // 把识别结果通过SEI通道发送出去
        engine.sendSEI(("zegoa2ti:" + gson.toJson(recognizeModel)).getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void onRecognizingTranslatedText(String translateText) {
        RecognizeModel recognizeModel = new RecognizeModel();
        recognizeModel.userName = viewModel.userName; // 自己的用户名
        recognizeModel.translateText = translateText;
        if (!TextUtils.isEmpty(translateText)) {
            // 把翻译的文本显示出来
        }
        // 把识别结果通过SEI通道发送出去
        engine.sendSEI(("zegoa2ti:" + gson.toJson(recognizeModel)).getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void onRecognizedText(String sttText) {
        RecognizeModel recognizeModel = new RecognizeModel();
        recognizeModel.userName = viewModel.userName; // 自己的用户名
        recognizeModel.text = sttText;
        if (!TextUtils.isEmpty(sttText)) {
            // 把识别的文本显示出来
        }

        // 把识别结果通过SEI通道发送出去
        engine.sendSEI(("zegoa2td:" + gson.toJson(recognizeModel)).getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void onRecognizedTranslatedText(String translateText) {
        RecognizeModel recognizeModel = new RecognizeModel();
        recognizeModel.userName = viewModel.userName; // 自己的用户名
        recognizeModel.translateText = translateText;

        if (!TextUtils.isEmpty(translateText)) {
            // 把翻译的文本显示出来
        }
        // 把识别结果通过SEI通道发送出去
        engine.sendSEI(("zegoa2td:" + gson.toJson(recognizeModel)).getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void onError(int error) {
        // 处理出错情况
    }
});

// 开始识别
int ret = zegoRealtimeTranslation.startRealtimeTranslation();
```

```java
// 在适当的时机，停止实时传译
zegoRealtimeTranslation.stopRealtimeTranslation();
```

<a name="step8"></a>

#### 8 资源回收

1. 退出房间。主持人调用 ZEGO Express SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 接口，退出房间。

```java
// 退出房间
ZegoExpressEngine.getEngine().logoutRoom();
```

<Note title="说明">


主持人退出房间后，如果没有暂停或停止视频播放，房间内的观众可以继续观看当前视频。

</Note>



2. 反初始化 ZegoRealtimeTranslation SDK。

```java
zegoRealtimeTranslation.unInit();
```

3. 销毁引擎。如果退出房间，不需要使用到引擎资源，可以调用 ZEGO Express SDK 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 接口，销毁引擎。

```java
ZegoExpressEngine.destroyEngine{ };
```
</Accordion>


<Accordion title="文本翻译识别" defaultOpen="false">
#### 1 初始化 ZegoRealtimeTranslation SDK

在使用 ZegoRealtimeTranslation SDK 功能前，必须先进行初始化。

```java
ZegoRealtimeTranslation zegoRealtimeTranslation = ZegoRealtimeTranslation.getInstance();
zegoRealtimeTranslation.init(license); // 传入申请到的license
```

#### 2 纯文本翻译

主持人登录房间、并且播放器设置完成后，可以调用  ZegoRealtimeTranslation SDK 的 [translate](https://doc-zh.zego.im/article/api?doc=ZegoRealtimeTranslation_API~java_android~class~ZegoRealtimeTranslation#translate)。

```java
zegoRealtimeTranslation.translate(text, ZegoRTServiceProvider.Google, ZegoTranslationLanguage.zh_Hans, ZegoTranslationLanguage.en,
    (errorCode, resultText) -> {
        if (errorCode == ZegoRealtimeTranslationError.SUCCESS) {
            // 翻译成功，显示resultText
        }
    });
```

#### 资源回收

1. 退出房间。主持人调用 ZEGO Express SDK 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room) 接口，退出房间。

```java
// 退出房间
ZegoExpressEngine.getEngine().logoutRoom();
```

<Note title="说明">


主持人退出房间后，如果没有暂停或停止视频播放，房间内的观众可以继续观看当前视频。

</Note>



2. 反初始化 ZegoRealtimeTranslation SDK。

```java
zegoRealtimeTranslation.unInit();
```

3. 销毁引擎。如果退出房间，不需要使用到引擎资源，可以调用 ZEGO Express SDK 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 接口，销毁引擎。

```java
ZegoExpressEngine.destroyEngine{ };
```
</Accordion>
