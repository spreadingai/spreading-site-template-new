# 录制单流

- - - 

## 功能简介

本地服务端录制 SDK 支持录制房间内的单条音视频流，集成 SDK 后，即可开始使用 SDK 的单流录制功能。

## 前提条件

- 已在项目中集成 ZEGO 本地服务端录制 SDK，详情请参考 [快速开始 - 集成](/local-recording-linux-java/integration/sdk-integration)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

## 使用步骤

###  设置事件回调监听

初始化 SDK 之前，首先通过 [setZegoRoomCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoRoomCallback-com.zego.zegoliveroom.callback.IZegoRoomCallback-)、[setZegoStreamRecordCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoStreamRecordCallback-com.zego.zegoliveroom.callback.IZegoStreamRecordCallback-) 接口分别设置房间回调、录制回调，便于接收音视频流录制过程中的相关事件通知。

```java
private static IZegoRoomCallback mRoomCallback = new IZegoRoomCallback() {
    //处理房间回调
};

private static IZegoStreamRecordCallback mStreamRecordCallback = new IZegoStreamRecordCallback() {
    //处理录制事件回调
};

public void setZegoRoomCallback(IZegoRoomCallback callback)

public void setZegoStreamRecordCallback(IZegoStreamRecordCallback callback)
```
  
初始化 SDK 之前，您还可以根据需要，调用 [setLogDirAndSize](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setLogDirAndSize-java.lang.String-long-) 接口，设置日志文件路径和大小，便于问题定位与分析。
    
###  初始化 SDK

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

登录房间成功后，调用 [startRecordSingleStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#startRecordSingleStream-java.lang.String-java.lang.String-int-int-com.zego.zegoliveroom.entity.ZegoRecordSingleStreamConfig-) 接口，开始录制音视频流。

<Note title="说明">

- 建议您在登录房间成功、并收到 [onStreamUpdate](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoRoomCallback.html#onStreamUpdate-int-com.zego.zegoliveroom.entity.ZegoStreamInfo:A-java.lang.String-) 流信息更新的回调通知，确认增加流的信息后，再调用 [startRecordSingleStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#startRecordSingleStream-java.lang.String-java.lang.String-int-int-com.zego.zegoliveroom.entity.ZegoRecordSingleStreamConfig-) 接口开启录制单流。
- 您可以在开始录制之前，调用 [getMaxRecordCount](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#getMaxRecordCount--) 接口，获取 SDK 支持的最大同时录制流数，根据其值处理同时录制的流数量。
</Note>

```java
public boolean startRecordSingleStream(String streamID, String pathAndName, int muxerStreamType, int fragmentSeconds, ZegoRecordSingleStreamConfig config)
```

其中：

- streamID：指您需要进行录制的流 ID。
- pathAndName：录制后生成文件的存档路径（包括文件名）。
    - 必须以 `.mp3`/`.mp4`/`.flv`/`.m3u8` 结尾。
    - SDK 内部会自动创建对应路径；如果路径下有相同的文件存在，会直接覆盖原文件。
- muxerStreamType：录制流类型，请参考 [ZegoMuxerStreamType](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/constants/ZegoMuxerStreamType.html)，默认录制音视频。
- fragmentSeconds：录制文件的分片间隔，单位为秒。
    - m3u8 格式取值范围为 [2, 60]，其他格式取值范围为 [0, 10]。
    - 取值为 0 表示不分片；大于 0 表示分片；默认值为 2。
    - 进行分片，可以避免录制过程中发生异常、导致中断时，已保存的录制文件无法正常播放等问题发生。
- config：进行单流录制的各项配置，详情请参考 [ZegoRecordSingleStreamConfig](https://doc-preview-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/entity/ZegoRecordSingleStreamConfig.html)。
  
<Warning title="注意">

`分片` 是 SDK 内部处理录制文件的一个逻辑概念，并非将录制的文件按间隔时间分成多个小文件存储。  
</Warning>

注册异步回调 [onStreamRecordBegin](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordBegin-java.lang.String-java.lang.String-)，用于接收录制过程中的相关事件通知。

```java
public interface IZegoStreamRecordCallback {

    void onStreamRecordBegin(String streamID, String pathAndName);
}
```

录制启动成功后，会收到 [onStreamRecordBegin](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordBegin-java.lang.String-java.lang.String-) 回调。
          
###  停止录制

当不需要录制、或录制完成后，调用 [stopRecordSingleStream](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#stopRecordSingleStream-java.lang.String-) 接口停止录制。

```java
public boolean stopRecordSingleStream(String streamID)
```

注册异步回调 [onStreamRecordEnd](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/callback/IZegoStreamRecordCallback.html#onStreamRecordEnd-java.lang.String-java.lang.String-int-)，用于接收停止录制时的相关事件通知。
 
```java
public interface IZegoStreamRecordCallback {
    void onStreamRecordEnd(String streamID, String pathAndName, int reason);
}
```
 
然后：

1. 调用 [logoutRoom](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#logoutRoom--) 接口退出房间。
2. 调用 [setZegoRoomCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoRoomCallback-com.zego.zegoliveroom.callback.IZegoRoomCallback-)(null)、[setZegoStreamRecordCallback](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#setZegoStreamRecordCallback-com.zego.zegoliveroom.callback.IZegoStreamRecordCallback-)(null) 接口，停止回调监听。
3. 调用 [unInitSDK](https://doc-zh.zego.im/API/ServerRecord-java/com/zego/zegoliveroom/ZegoLiveRoom.html#unInitSDK--) 反初始化 SDK。
