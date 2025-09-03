# 多人视频通话

- - -

## 功能简介

<Warning title="注意">



本文档适用于以下平台： Android、iOS、Windows。

</Warning>





本文展示了如何使用 ZEGO Express SDK 构造多人音视频通话场景，即实现多对多实时音视频互动。用户可在房间内与其余用户进行实时音视频通话，互相推拉流。该场景可用于多人实时视频聊天、视频会议等。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/videoCommunicationSample.png" /></Frame>


## 前提条件

在应用多人音视频通话场景之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/1241) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。

## 使用步骤

本节将介绍如何使用 ZEGO Express SDK 实现多人视频通话。

- 多人视频通话的流程图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Android/eventhandler_process_new.jpeg" /></Frame>

- API 调用时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Scenes/VideoForMultipleUsers/Video_for_Multiple_Users_android_new.png" /></Frame>

<Note title="说明">


  ZEGO Express SDK 可支持多人视频通话，如上时序图以 2 名房间成员间的实时视频通话为例，建议开发者参考上述流程设计自己的多人实时视频通话场景。

</Note>




### 创建引擎

定义 SDK 引擎对象，调用 [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/createEngineWithProfile.html) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

```dart
// 请通过官网注册获取，格式为 123456789
int appID = appID;
// 64个字符，请通过官网注册获取，格式为"0123456789012345678901234567890123456789012345678901234567890123"
String appSign = appSign;
// 通用场景接入
ZegoScenario scenario = ZegoScenario.General;

var profile = ZegoEngineProfile(appID, scenario, appSign: appSign);

// 创建引擎
ZegoExpressEngine.createEngineWithProfile(profile);
// 实时音视频 SDK 做纯音频场景时，可以关闭摄像头，这样将不会需要摄像头权限和推视频流
// ZegoExpressEngine.instance.enableCamera(false);
```


### 开启房间内用户变化通知

开发者需在每位用户登录房间时将 [ZegoRoomConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoRoomConfig-class.html) 中的 “isUserStatusNotify” 设为 “true”，用于接收其他用户进出房间的回调通知。

```dart
var RoomConfig = ZegoRoomConfig.defaultConfig();
RoomConfig.isUserStatusNotify = true;
// 登录房间
ZegoExpressEngine.instance.loginRoom(roomID, user, config: RoomConfig);
```

### 预览自己的画面，并推送到远端

在用户调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngineRoom/loginRoom.html) 之后，可以调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPublishingStream.html) 接口，传入 “streamID”，将自己的音视频流推送到 ZEGO 音视频云。您可通过回调 [onPublisherStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPublisherStateUpdate.html) 知晓推流是否成功。

如果希望看到自己的画面，可调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePublisher/startPreview.html) 接口设置预览视图，并启动本地预览。

“streamID” 由您本地生成，但是需要保证：同一个 AppID 下，“streamID” 全局唯一。如果同一个 AppID 下，不同用户各推了一条 “streamID” 相同的流，会导致后推流的用户推流失败。


```dart
// 进行预览和推流
// 若使用实时音视频 SDK 或者音视频场景，viewID 为一个 int 数据，开发者可以通过 SDK 的 createCanvasView 获取
ZegoExpressEngine.instance.startPreview(canvas: ZegoCanvas(viewID));
// 若使用实时语音 SDK 或者纯音频场景时，不需要传 canvas 参数
// ZegoExpressEngine.instance.startPreview();
// 推流用户本端的 StreamID
ZegoExpressEngine.instance.startPublishingStream("YOUR_STREAM_ID");
```

### 拉取音视频流

**拉取其他用户的音视频**

进行视频通话时，我们需要拉取到其他用户的音视频。

 [onRoomStreamUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomStreamUpdate.html) ：在同一房间内的其他用户将音视频流推送到 ZEGO 音视频云时，会在此回调中收到音视频流新增的通知。

可以在该回调中，调用 [startPlayingStream](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEnginePlayer/startPlayingStream.html)，传入 “streamID” 拉取播放该用户的音视频。您可通过监听 [onPlayerStateUpdate ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onPlayerStateUpdate.html) 回调知晓是否成功拉取音视频。

**展示用户进出房间的信息**

[onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调可以用于监听房间内的用户变化，房间内其他用户进入或退出都会触发该回调。

<Warning title="注意">


房间人数大于 500 人的情况下 [onRoomUserUpdate](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/dart_flutter/zego_express_engine/ZegoExpressEngine/onRoomUserUpdate.html) 回调不保证有效。若业务场景存在房间人数大于 500 的情况，不应依赖于该回调设计业务逻辑。若有在房间人数大于 500 时使用该回调的需求，请联系 ZEGO 技术支持。


</Warning>



代码示例如下：

```dart
ZegoExpressEngine.onRoomUserUpdate = (String roomID, ZegoUpdateType updateType, List<ZegoUser> userList) {
     // 房间用户变化回调，实际业务流程需开发者按需设计
     if(updateType == ZegoUpdateType.Add){
         // 当 “updateType” 为 “Add” 时，用户可以拉取 userList 里的用户进行处理
         for(ZegoUser user : userList){
             // user 加入房间
         }
     }else{
         // 当 “updateType” 为 “Delete” 时，用户可以拉取 userList 里的用户进行处理
         for(ZegoUser user : userList){
             // user 离开房间
         }
     }
};

ZegoExpressEngine.onRoomStateUpdate = (String roomID, ZegoRoomState state, int errorCode, Map<String, dynamic> extendedData) {
    // 房间状态回调
    if(state == ZegoRoomState.Connected){
        // 可以根据实际业务进行设计
    }
};

ZegoExpressEngine.onRoomStreamUpdate = (String roomID, ZegoUpdateType updateType, List<ZegoStream> streamList, Map<String, dynamic> extendedData) {
    // 流变化回调

    // 在这里更新 UI 或执行其他操作
    if(updateType == ZegoUpdateType.Add){
        // 当 “updateType” 为 “Add” 时，用户可以拉取 streamList 里各条音视频流以展示房间内其他用户的画面和声音
        for(ZegoStream stream : streamList){
            // 进行拉流
            // viewID 为一个 int 数据，此处的 viewID 和预览的 viewID 不是一个，需要通过 SDK 的 createCanvasView 重新获取新的；在展示多人视频的时候，开发者需要创建使用不同的 viewID 承载不同音视频流的画面，保证不同用户的视频不会重叠在一起；此处的示例代码会覆盖当前正在拉流的画面
            ZegoExpressEngine.instance.startPlayingStream(stream.streamID, canvas: ZegoCanvas(viewID));
            // 如果是使用实时语音sdk 或者纯音频场景时不需要传canvas参数
            // ZegoExpressEngine.instance.startPlayingStream(stream.streamID);
        }
    }else{
        // 当 “updateType” 为 “Delete” 时，用户可以停止拉取相应的音视频流
        for(ZegoStream stream : streamList){
            // 停止拉流
            ZegoExpressEngine.instance.stopPlayingStream(stream.streamID);
        }
    }
};
```

### 停止视频通话

通话过程中，房间内的用户如果需要结束通话，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7634#publishingStream) 依次完成相关操作。
