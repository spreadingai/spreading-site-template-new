# 功能实现流程

- - -

## 架构设计

音视频通话场景的主要架构如下图所示：


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Video_call/Audio_video_call.png" /></Frame>

## 示例源码

ZEGO 针对视频通话场景提供了 [示例源码](/video-call/run-example-code/web)，以供开发者进一步体验相关场景，了解 ZEGO 方案。

## 前提条件

在实现基本的音视频通话前，请确保：
- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-web/quick-start/integrating-sdk)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，申请有效的 AppID，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已获取有效的 Server 地址，Server 地址为接入服务器地址，详情请参考 [控制台 - 项目管理 - 项目信息](/real-time-video-web/quick-start/integrating-sdk)。


## 实现流程

音视频通话场景的整体流程如下：

1. 所有用户均通过 ZEGO 音视频云服务进行连接，ZEGO 音视频云服务可以控制当前业务房间内的通话流程，同步并通知各端当前的通话状态。
2. 无论用户是否在加入房间，均通过 ZEGO 音视频云服务进行推拉流。
3. 用户开始推流后，房间内所有用户将会接收到流更新通知，并拉取新进来的用户的音视频流。
4. 若用户需要结束通话，则向 ZEGO 音视频云服务发起结束推流请求，房间内的其他用户也收到停止拉流信号。


多用户推拉流详细流程图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoCall/call/video_call_web.png" /></Frame>

<Note title="提示">



以下章节主要针对核心源码片段进行说明。
</Note>



### 初始化 SDK

在使用 Express Video SDK 进行视频通话之前，需要初始化 SDK。由于初始化操作 SDK 时，内部处理的操作较多，建议开发者在进入页面的时候进行。

```javascript

/** 填写 appID 和 server */
const appID: number = ;  // 用于区分不同客户和项目的唯一标识（必须为 number 类型），且必须从 ZEGO 控制台获取。一个 appID 对应一个客户项目，不同端共有一个 appID 实现互通，一个客户可以申请多个 appID。
const server: string = ;  // 表示 SDK 连接的 ZEGO 服务器地址（支持备用域名），必须从控制台获取，SDK 内的大多数功能都通过该服务器地址交互。同一个 appID 可以填写多个 server。

const zg = new ZegoExpressEngine(
  appID,
  server
);
```

更多初始化 Express Video SDK 的细节请参考：[快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#创建引擎并监听回调) 的 “创建引擎并监听回调”。   


### 开始音视频通话

#### 登录房间

用户在进行音视频通话前，需要先登录到房间，在收到登录房间成功的回调之后可以直接调用 Express Video SDK 的接口进行推拉流操作。


```javascript
const roomID: string = ; // 必填，房间 ID，建议开发者在自己的后台生成，最大长度为 128 字节的字符串。仅支持数字、英文字符和 '~', '!', '@', '#', '$', '', '^', '&', '*', '(', ')', '_', '+', '=', '-', ', ';', '’', ',', '.', '<', '>', '/'。
const token: string = ; // 必填，登录验证 token，是通过在 ZEGO 控制台注册项目获得密钥，加上指定算法获得。测试阶段可以通过 ZEGO 提供的接口获取，正式环境一定要用户自己实现。
const user: ZegoUser = { userID: "", userName: "" } // 必填，登录用户信息。
const config: ZegoRoomConfig = ; // 可选

zg.loginRoom(roomID, token, user, config);
```

更多使用 Express Video SDK 实现登录房间的细节请参考：[快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#登录房间) 的 “登录房间”。   


#### 开始推拉流

##### 开始推流

用户向 ZEGO 音视频云服务推流，需要自己生成唯一的 streamID，然后开始预览并推流。

```javascript
// 创建流
// 注意事项：调用时机：初始化且调用接口 checkSystemRequirements 检测返回的结果支持后可调用。
const camera: ZegoCamera = ;
const localStream = await zg.createZegoStream({
              camera,
            });
const streamID: string = ; // 推流 ID，建议开发者在自己的后台生产，长度不超过 256 的字符串，仅支持数字、英文字符和 "-"、"_"。
// 开始推流
const isSuccess = zg.startPublishingStream(streamID, localStream);
```

更多使用 Express Video SDK 实现预览和推流的细节请参考：[快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#登录房间) 的 “预览自己的画面，并推送到 ZEGO 音视频云”。


##### 开始拉流

用户进入房间后，会收到 SDK 的流更新通知，根据获取到的 streamID 进行拉流。

```javascript
// 拉流
const streamID: string = ; // 流 ID，开发者可以记录在自己的后台，或者从 zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {}); 中获取
const localStream = await zg.startPlayingStream(streamID);
```

更多使用 Express Video SDK 实现拉流的细节请参考：[快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#拉取其他用户的音视频) 的 “拉取其他用户的音视频”。


### 结束音视频通话

#### 结束推拉流

##### 结束推流

用户需要结束音视频通话时，向 ZEGO 音视频云服务发送结束推流，调用成功后，ZEGO 音视频云服务向房间内其他所有用户发送该用户结束推流信令。房间内其他用户收到信令后停止拉流。

```javascript
// 房间ID
const roomId: string = ;
// 流ID
const streamID: string = ;
// 结束推流
const isSuccess = zg.stopPublishingStream(streamID);
// 退出房间
zg.logoutRoom(roomId);
```

更多使用 Express Video SDK 实现停止推拉流的细节请参考：[快速开始 - 实现流程](/real-time-video-web/quick-start/implementing-video-call#停止音视频通话) 的 “停止音视频通话”。

##### 结束拉流


房间内用户结束推流后，房间内其他所有用户会收到 Express Video SDK 的流更新通知，并根据 streamID 进行结束拉流。


```javascript
// 流ID
const streamID: string = ;
// 用户结束拉流
const isSuccess = zg.stopPlayingStream(streamID); // 流 ID，开发者可以记录在自己的后台，或者从 zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {}); 中获取
```

#### 退出房间

```javascript
// 房间ID
const roomId: string = ;
// 退出房间
zg.logoutRoom(roomId);
```

## 进阶功能

### 屏幕共享

#### 创建屏幕共享流

用户进入房间后，可以单击“屏幕共享”按钮，与房间内其他用户共享自己的屏幕。

单击“屏幕共享”按钮后，需要创建屏幕共享流。

```javascript
// 创建屏幕共享流
const screenStream = await zg.createZegoStream({
    screen: {
        audio: false, // 不共享音频
        videoQuality: 4 // 屏幕共享视频质量。1：流畅度优先；2：清晰度与流畅度适应；3：清晰度优先
    }
});
```
更多使用 Express Video SDK 实现预览和创建流的细节请参考：[屏幕共享 ](/real-time-video-web/video/screen-sharing#创建屏幕共享流) 的“创建屏幕共享流”。

#### 开始推屏幕共享流

屏幕共享弹窗中，选择想要共享的屏幕单击“分享”后，会将创建的流推送到 ZEGO 音视频云服务。

```javascript
// 开始推屏幕共享流
const publisRes = await zg.startPublishingStream(
    screenStreamID,
    screenStream,
    {
        videoCodec: "VP8",
        extraInfo: JSON.stringify(stream.extraInfo)
    }
);
```
更多使用 Express Video SDK 实现预览和推流的细节请参考：[屏幕共享 ](/real-time-video-web/video/screen-sharing#推屏幕共享流) 的“推屏幕共享流”。

#### 开始拉屏幕共享流

用户进入房间后，会收到 Express Video SDK 的屏幕共享流更新通知，根据获取到的屏幕共享流 ID 进行拉流。

```javascript
// 开始拉屏幕共享流
const localScreenStream = await zg.startPlayingStream(screenStreamID);
```

#### 结束推屏幕共享流

用户单击“停止共享”，调用 Express Video SDK 接口结束推流。

```javascript
// 结束推屏幕共享流
zg.stopPublishingStream(screenStreamID);
zg.destroyStream(screenStream);
```
更多使用 Express Video SDK 实现预览和结束推流的细节请参考：[屏幕共享 ](/real-time-video-web/video/screen-sharing#销毁屏幕共享流) 的“销毁屏幕共享流”。

#### 结束拉屏幕共享流

用户收到 ZEGO 音视频云服务的流更新通知后，调用 SDK 接口结束拉流。

```javascript
// 结束拉屏幕共享流
zg.stopPlayingStream(screenStreamID);
```

### 实时消息互动

ZEGO 支持在视频通话中加入实时消息互动，实时展示房间内的消息，例如发消息、进退房提示、互动通知等。有关实现实时消息互动的流程，详情请参考 [实时消息互动](/video-call/advanced/im/web)。

### 美颜

Express Video SDK 提供基础美颜功能，为用户呈现出良好的肌肤状态，打造独特自然的美颜效果。用户可以开启美颜开关，然后根据需要调整美白、磨皮、锐化以及红润的程度，轻松实现基础美颜功能。

#### 实现流程

在 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 获取到媒体流后，通过 ZegoExpressEngine 实例调用 [setEffectsBeauty](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-effects-beauty) 接口开启基础美颜功能，并可以根据需要通过 [ZegoEffectsBeautyParam](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoEffectsBeautyParam) 的 4 个参数设置美颜效果。

```javascript
// 创建流，zg 为 ZegoExpressEngine 实例对象。
const localStream = await zg.createZegoStream();
const enable = true;
// 开启美颜
// setEffectsBeauty 是 Promise 异步方法，异步函数执行完美颜才完成开启。
await zg.setEffectsBeauty(
    localStream,
    enable,
    {
        // 以下为美颜参数，取值范围都为 0 ～ 100，取值越大美颜程度越高，默认值为 50。
        // 磨皮，在保留脸部细节的基础上进行磨皮，比如脸上的痣会保留。
        sharpenIntensity: 50,
        // 美白，对画面整体调高亮度来美白脸部。
        whitenIntensity: 50,
        // 红润，对画面整体进行暖色处理。
        rosyIntensity: 50,
        // 锐化，对画面整体进行锐化处理，当画面有些模糊时可以稍微调大锐化使轮廓清晰。
        smoothIntensity: 50
    }
)

// 开始推流
// 如果是推流前开启美颜，需要等待美颜开启完成才能进行推流。
zg.startPublishingStream("stream1", localStream);

// 关闭美颜
await zg.setEffectsBeauty(localStream, false);
```
更多使用 SDK 实现美颜美型的细节请参考：[实时音视频 - 基础美颜](/real-time-video-web/video/basic-beauty)。
