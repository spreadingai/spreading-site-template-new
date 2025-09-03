# 录制混流

- - - 

## 功能简介

本地服务端录制 SDK 支持将房间内的所有用户的音视频流混合成一个画面再录制，集成 SDK 后，即可开始使用 SDK 的混流录制功能。

## 前提条件

- 已在项目中集成 ZEGO 本地服务端录制 SDK，详情请参考 [快速开始 - 集成](/local-recording-linux-java/integration/sdk-integration)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

## 使用步骤

### 置事件回调监听

初始化 SDK 之前，首先通过 [setZegoRoomCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoRoomCallback-com.zego.zegoliveroom.callback.IZegoRoomCallback-)、[setZegoStreamRecordCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoStreamRecordCallback-com.zego.zegoliveroom.callback.IZegoStreamRecordCallback-)、[setZegoExternalVideoDataCallback](https://doc-preview-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoExternalVideoDataCallback-com.zego.zegoliveroom.callback.IZegoExternalVideoDataCallback-) 接口分别设置房间回调、录制回调、视频数据回调，便于接收音视频流录制过程中的相关事件通知。

```java
private static IZegoRoomCallback mRoomCallback = new IZegoRoomCallback() {
    //处理房间回调
};

private static IZegoStreamRecordCallback mStreamRecordCallback = new IZegoStreamRecordCallback() {
    //处理录制事件回调
};
   
private static IZegoExternalVideoDataCallback mVideoDataCallback = new IZegoExternalVideoDataCallback() {
    //处理视频帧数据回调，回调抛出每路单流解码帧数据，目前仅支持混流下使用
};

public void setZegoRoomCallback(IZegoRoomCallback callback)

public void setZegoStreamRecordCallback(IZegoStreamRecordCallback callback)
 
public void setZegoExternalVideoDataCallback(IZegoExternalVideoDataCallback callback)
```

初始化 SDK 之前，您还可以根据需要，调用 [setLogDirAndSize](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setLogDirAndSize-java.lang.String-long-) 接口，设置日志文件路径和大小，便于问题定位与分析。
    
### 初始化 SDK

调用 [initSDK](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#initSDK-long-byte:A-com.zego.zegoliveroom.callback.IZegoInitSDKCompletionCallback-) 接口初始化 SDK，将申请到的 AppID 传入参数 “appID”。

```java
public boolean initSDK(long appID, IZegoInitSDKCompletionCallback callback)
```

注册异步回调 [onInitSDK](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoInitSDKCompletionCallback.html#onInitSDK-int-)，用于接收初始化 SDK 过程中的相关事件通知。

```java
public interface IZegoInitSDKCompletionCallback {
    void onInitSDK(int errorCode);
}
```

###  设置 Token

初始化 SDK 之后、登录房间之前，需要调用 [setCustomToken](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setCustomToken-java.lang.String-) 接口，传入您获取到的 Token，用于鉴权。

Token 的获取方式，请参考 [使用 Token 鉴权](!User_Access_Control)。

```java
public void setCustomToken(String thirdPartyToken);
```

###  登录房间

鉴权通过后，调用 [loginRoom](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#loginRoom-java.lang.String-com.zego.zegoliveroom.callback.IZegoLoginCompletionCallback-) 接口登录房间。

```java
public boolean loginRoom(String roomID, IZegoLoginCompletionCallback callback)
```

注册异步回调 [onLoginCompletion](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoLoginCompletionCallback.html#onLoginCompletion-int-java.lang.String-)，用于接收登录房间过程中的相关事件通知。

```java
public interface IZegoLoginCompletionCallback {
    void onLoginCompletion(int errorCode, String roomID);
}
```

###  开始录制

登录房间成功后，调用 [startRecordMixStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#startRecordMixStream-com.zego.zegoliveroom.entity.ZegoMixStreamRecordConfig-) 接口，开始录制音视频流。

<Note title="说明">

- 建议您在登录房间成功、并收到 [onStreamUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoRoomCallback.html#onStreamUpdate-int-com.zego.zegoliveroom.entity.ZegoStreamInfo:A-java.lang.String-) 流信息更新的回调通知，确认增加流的信息后，再调用 [startRecordMixStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#startRecordMixStream-com.zego.zegoliveroom.entity.ZegoMixStreamRecordConfig-) 接口开启录制混流。
- 您可以在开始录制之前，调用 [getMaxRecordCount](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#getMaxRecordCount--) 接口，获取 SDK 支持的最大同时录制流数，根据其值处理同时录制的流数量。
</Note>

```java
public boolean startRecordMixStream(ZegoMixStreamRecordConfig config)
```

其中：config 指进行混流录制的各项配置，详情请参考 [ZegoMixStreamRecordConfig](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/entity/ZegoMixStreamRecordConfig.html)。
  
注册异步回调 [onStreamRecordBegin](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordBegin-java.lang.String-java.lang.String-)、[onMixStreamRecordUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onMixStreamRecordUpdate-java.lang.String:A-)，用于接收录制混流过程中的相关事件通知。

```java
public interface IZegoStreamRecordCallback {

    void onStreamRecordBegin(String streamID, String pathAndName);
    void onMixStreamRecordUpdate(String[] listStreamID);
}
```

录制启动成功后，会收到 [onStreamRecordBegin](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordBegin-java.lang.String-java.lang.String-) 回调，成功拉到有音视频数据的流时会收到 [onMixStreamRecordUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onMixStreamRecordUpdate-java.lang.String:A-) 回调。
    
<Warning title="注意">

如果您需要同时录制单流和混流，在开始录制之前，请先调用 [enableSingleAndMixRecordMode](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#enableSingleAndMixRecordMode-boolean-) 接口，启用 `单流混流同时录制模式`：

- 该模式下，“混流录制”会混入所有“单流录制”正在录制的流。即使您没有将“单流录制”中的某条单流作为“混流录制”的输入流，如果此条单流中有音频，这个音频也会被混流录制下来。
- 该模式比较消耗系统资源；且只能先启动混流录制、再启动单流录制；结束混流录制时，也会同时结束所有的单流录制。

请您酌情使用该模式。
</Warning>
      
###  更新混流配置

当您需要增加输入流、更新输入流、或更新混流输出配置时，需要重新构造混流配置 [ZegoStreamConfig](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/entity/ZegoStreamConfig.html)、并调用 [updateInputStreamConfig](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#updateInputStreamConfig-com.zego.zegoliveroom.entity.ZegoStreamConfig:A-) 接口更新混流配置。

```java
public boolean updateInputStreamConfig(ZegoStreamConfig[] listStreamConfig）
```
    
注册异步回调 [onMixStreamRecordUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onMixStreamRecordUpdate-java.lang.String:A-)，用于接收更新混流配置过程中的相关事件通知。

```java
public interface IZegoStreamRecordCallback {
    void onMixStreamRecordUpdate(String[] listStreamID);
}
```

<Note title="说明">

- 混流成功后，会返回混流输入流的流 ID 列表（仅包含成功拉到数据的流 ID）。
- 混流录制的输入流发生变化时（例如，开始录制、录制中流发生异常等）都会收到 [onMixStreamRecordUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onMixStreamRecordUpdate-java.lang.String:A-) 回调。
</Note>  

###  停止录制

当不需要录制、或录制完成后，调用 [stopRecordMixStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#stopRecordMixStream--) 接口停止录制。

```java
public boolean stopRecordMixStream()
```

注册异步回调 [onStreamRecordEnd](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordEnd-java.lang.String-java.lang.String-int-)，用于接收停止录制时的相关事件通知。
 
```java
public interface IZegoStreamRecordCallback {
    void onStreamRecordEnd(String streamID, String pathAndName, int reason);
}
```

然后：

1. 调用 [logoutRoom](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#logoutRoom--) 接口退出房间。
2. 调用 [setZegoRoomCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoRoomCallback-com.zego.zegoliveroom.callback.IZegoRoomCallback-)(null)、[setZegoStreamRecordCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoStreamRecordCallback-com.zego.zegoliveroom.callback.IZegoStreamRecordCallback-)(null)、[setZegoExternalVideoDataCallback](https://doc-preview-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoExternalVideoDataCallback-com.zego.zegoliveroom.callback.IZegoExternalVideoDataCallback-)(null) 接口，停止回调监听。
3. 调用 [unInitSDK](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#unInitSDK--) 反初始化 SDK。
