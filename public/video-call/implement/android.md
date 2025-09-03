# 功能实现流程

- - -

## 架构设计

音视频通话场景的主要架构如下图所示：


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Video_call/Audio_video_call.png" /></Frame>

## 示例源码

ZEGO 针对视频通话场景提供了 [示例源码](/video-call/run-example-code/android)，以供开发者进一步体验相关场景，了解 ZEGO 方案。

## 前提条件

在实现基本的音视频通话前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info)。


## 实现流程

音视频通话场景的整体流程如下：

1. 所有用户均通过信令模块进行连接，信令模块可以控制当前业务房间内的通话流程，同步并通知各端当前的通话状态。
2. 无论用户是否在加入房间，均通过 ZEGO 音视频云服务进行推拉流。
3. 用户开始推流后，房间内所有用户将会接收到流更新通知，并拉取新进来的用户的音视频流。
4. 若用户需要结束通话，则向信令模块发起结束推流请求，房间内的其他用户也收到停止拉流信号。


多用户推拉流详细流程图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Video_call/Audio_video.png" /></Frame>


<Note title="提示">

以下章节主要针对核心源码片段进行说明。
</Note>



### 初始化 SDK

在使用 Express Video SDK 进行视频通话之前，需要初始化 SDK。由于初始化操作 SDK 时，内部处理的操作较多，建议开发者在进入页面的时候进行。

```java
/**
 * 当您从 ZEGO 申请到 APP_ID 和 APP_SIGN 之后，我们强烈建议您将其通过服务器下发到 App，而不是保存在代码当中
 * 这里将其保存在代码当中，只是为了执行 Demo
 *
 * APP_ID，APP_SIGN：从官网或者技术支持获取
 */
public class AuthConstants {
    public final static long APP_ID = YOUR_APP_ID;
    public final static String APP_SIGN = YOUR_APP_SIGN;
}
```

更多初始化 SDK 的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#初始化) 的 “初始化”。   

### 开始音视频通话

#### 登录房间

用户在进行音视频通话前，需要先登录到房间，在收到登录房间成功的回调之后可以直接调用 SDK 的接口进行推拉流操作。


```java
public static final int MAX_USER_COUNT = 4; // 最大用户数
String roomID = "12345678901"; // 必填，房间 ID，建议开发者在自己的后台生成，最大长度为 128 字节的字符串。仅支持数字、英文字符和 '~', '!', '@', '#', '$', '', '^', '&', '*', '(', ')', '_', '+', '=', '-', ', ';', '’', ',', '.', '<', '>', '/'。
ZegoUser user = new ZegoUser(userID, userName);
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
roomConfig.maxMemberCount = MAX_USER_COUNT;
roomConfig.isUserStatusNotify = true;

expressEngine.loginRoom(roomID, user, roomConfig);
```

更多使用 SDK 实现登录房间的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#登录房间) 的 “登录房间”。   


#### 开始推拉流

##### 开始推流

用户向 ZEGO 音视频云服务推流，需要自己生成唯一的 streamID，然后开始预览并推流。

```java
// 设置本地预览视图并启动预览，视图模式采用 SDK 默认的模式，等比缩放填充整个 View
ZegoCanvas previewCanvas = new ZegoCanvas(previewView);
expressEngine.startPreview(previewCanvas);

// 创建流
String streamID = “”; // 推流 ID，建议开发者在自己的后台生产，长度不超过 256 的字符串，仅支持仅支持数字、英文字符和 "-"、"_"。
// 开始推流
expressEngine.startPublishingStream(streamID);
```

更多使用 SDK 实现预览和推流的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#预览自己的画面并推送到-zego-音视频云) 的 “预览自己的画面，并推送到 ZEGO 音视频云”。


##### 开始拉流

用户进入房间后，会收到 SDK 的流更新通知，根据获取到的 streamID 进行拉流。

```java
// 拉流
String playStreamID = “”; // 流 ID
ZegoCanvas playCanvas = new ZegoCanvas(playView);
expressEngine.startPlayingStream(playStreamID, playCanvas);
```

更多使用 SDK 实现拉流的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#拉取其他用户的音视频) 的 “拉取其他用户的音视频”。


### 结束音视频通话

#### 停止推拉流

##### 停止推流
用户需要结束音视频通话时，向 ZEGO 音视频云服务发送结束推流，调用成功后，ZEGO 音视频云服务向房间内其他所有用户发送该用户结束推流信令。房间内其他用户收到信令后停止推流。

```java
// 停止推流
expressEngine.stopPublishingStream();
```

更多使用 SDK 实现停止推流的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#停止音视频通话) 的 “停止音视频通话”。

##### 停止拉流

房间内用户结束推流后，房间内其他所有用户会收到 SDK 的流更新通知，并根据 streamID 进行停止拉流。

```java
// 停止拉流
expressEngine.stopPlayingStream("stream1");
```
更多使用 SDK 实现停止拉流的细节请参考：[快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call#停止音视频通话) 的 “停止音视频通话”。

#### 退出房间

```java
// 退出房间
expressEngine.logoutRoom();
```

## 进阶功能

### 实时消息互动

ZEGO 支持在视频通话中加入实时消息互动，实时展示房间内的消息，例如发消息、进退房提示、互动通知等。有关实现实时消息互动的流程，详情请参考 [实时消息互动](/video-call/advanced/im/android)。


### 美颜美型

基于 AI 美颜服务，提供美白、磨皮、锐化、红润等基础的美颜功能，支持大眼、瘦脸、小嘴、亮眼、白牙、瘦鼻等美型效果，打造独特自然的直播效果。

#### 集成 SDK

如果您的项目需要实现美颜美型效果，需要先向项目集成 ZegoEffects SDK，详情请参考 [集成 SDK](/ai-effects-android-java/quick-starts/import-the-sdk)。

#### 导入资源和模型

在使用 ZegoEffects SDK 提供的 AI 功能前，您需要先导入 AI 资源或模型，详情请参考 [导入资源和模型](/ai-effects-android-java/quick-starts/import-resources-and-models)。

#### 在线鉴权

在使用 ZegoEffects SDK 的 AI 功能前，您需要完成在线鉴权，详情请参考 [在线鉴权](/ai-effects-android-java/quick-starts/online-authentication)。

#### 实现图像处理

完成上述准备后，您可以开始进行美颜美型，详情请参考 [实现图像处理](/ai-effects-android-java/quick-starts/implement-basic-image-processing)。
