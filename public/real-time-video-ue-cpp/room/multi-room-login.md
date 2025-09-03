# 登录多房间

---

## 功能简介

同一个用户可以同时加入多个房间，并同时在多个房间内推流、拉流、发送实时消息和接收消息回调。

<Note title="说明">


- ZEGO Express SDK 从 2.9.0 版本开始支持该功能。
- 本功能默认不开启，如需使用，请联系 ZEGO 技术支持开通相关权限。
- 本功能开启后，默认支持最多同时加入 5 个房间，如果您有更多需求，请联系 ZEGO 技术支持提供处理。

</Note>




### 应用场景

本功能可以隔离多个房间的消息及回调，实现更灵活的连麦业务。ZEGO 推荐用于跨房间连麦和在线教育的超级小班场景。

- 跨房间连麦

    主播 A 与主播 B 进行跨房间连麦，主播 A 可以通知房间 A 中所有观众登录主播 B 的房间进行拉流，主播 B 同样可以通知房间 B 中所有观众登录主播 A 的房间进行拉流。


- 超级小班

    老师进入大班房间推流，学生都登录大班房间拉流，同时登录小组房间与同组学生讨论和连麦。助教老师登录小组房间维持课堂秩序或解答学生问题。


## 前提条件

在实现多房间功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK（2.9.0 及以上版本），实现基本的实时音视频功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/18087) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/18088)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

- 已联系 ZEGO 技术支持开通多房间功能。


## 使用步骤

以同一用户加入两个房间为例，整体实现流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/MultiRoom/MultiRoom_new.png" /></Frame>

1. 在初始化 SDK 之前，将房间模式设置为多房间。
2. 初始化 SDK。
3. 加入第一个房间，成功登录后，可在该房间内推流、拉流、发送和接收实时消息。
4. 加入第二个房间，成功登录后，可在该房间内推流、拉流、发送和接收实时消息。
5. 离开第一个和第二个房间，针对离开房间不做时序上的限制。

具体功能的实现如下：


### 设置多房间模式

必须在初始化 SDK 之前，调用 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~ZegoExpressSDK#set-room-mode) 接口，通过 [ZegoRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~enum~ZegoRoomMode) 类将房间模式设置为多房间模式，即 `mode` 取值为 `ZEGO_ROOM_MODE_MULTI_ROOM`。

<Note title="说明">


如果在没有开通多房间功能的情况下设置多房间模式，则登录房间会失败并报错，返回错误码为 “1002036”。

</Note>




```cpp
// 设置房间模式为多房间模式
ZegoExpressSDK::setRoomMode(ZegoRoomMode::ZEGO_ROOM_MODE_MULTI_ROOM)
```


### 初始化 SDK

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/18088#CreateEngine) 的 “初始化”  进行 SDK 的初始化。

### 登录房间

传入房间 ID（roomID）等参数，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#login-room) 接口登录房间。

- 单房间模式下，同一时间只能登录一个房间，调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#login-room) 接口时，如果之前已经登录其他房间，则会提示已登录相同房间。
- 多房间模式下，同一时间可以登录多个房间，且登录的用户信息必须相同。

```cpp
// 创建用户
ZegoUser user("userID", "userName");

// 开始登录房间
engine->loginRoom("roomID", user);
```


### 推流

传入流 ID（streamID）、房间 ID（roomID）等参数，调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-publishing-stream)（带有 “ZegoPublisherConfig” 参数）接口在指定房间内推流。

<Warning title="注意">



多房间模式下，必须使用 [ZegoPublisherConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~struct~ZegoPublisherConfig) 指定 “streamID” 关联的 “roomID”，退出指定房间后会停止该房间对应的推流操作。

</Warning>




```cpp
ZegoPublisherConfig config;
config.roomID = "room1";

// 开始推流
engine->startPublishingStream("streamID", config);
```


### 拉流

传入流 ID（streamID）、房间 ID（roomID）等参数，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-playing-stream)（带有 “ZegoPlayerConfig” 参数）接口在指定房间内拉流。

<Warning title="注意">



多房间模式下，必须使用 [ZegoPlayerConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~struct~ZegoPlayerConfig) 指定 “streamID” 关联的 “roomID”，退出指定房间后会停止该房间对应的拉流操作。


</Warning>



```cpp
ZegoPlayerConfig config;
config.roomID = "room1";

// 拉取实时流
// 填写windows窗口句柄
HWND playWND = ...;
ZegoCanvas canvas(playWND);
engine->startPlayingStream("streamID", &canvas, config);
```


### 发送/接收实时消息

多房间与单房间发送、接收实时消息的实现一致，详情请参考 [实时消息与信令](https://doc-zh.zego.im/article/20652)。

### 退出房间

传入房间 ID（roomID），调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#logout-room) 接口退出房间。

<Note title="说明">



如果想一次性退出所有已登录的房间，可以直接调用不含 “roomID” 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#logout-room) 接口。

</Note>



- 单房间模式下退出房间，同时会停止所有的推拉流。
- 多房间模式下退出房间，可以只退出指定房间，并停止该房间的推拉流。

```cpp
// 退出房间
engine->logoutRoom("roomID");
```

## 常见问题

1. **调用 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~ZegoExpressSDK#set-room-mode) 接口返回失败，是什么原因？**

- 是否在初始化 SDK 之前调用了 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~ZegoExpressSDK#set-room-mode) 接口，此时会上报错误码 “1001020”。
- 是否未联系 ZEGO 技术支持开通多房间功能。
- 是否传入正确的参数。

2. **调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#login-room) 登录失败，错误码为 “1002036”，是什么原因？**

在没有开通多房间功能的情况下设置了多房间模式，登录房间会失败，返回错误码 “1002036”。

3. **调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#login-room) 登录失败，错误码为 “1002037”，是什么原因？**

同时登录的房间数超过最大房间个数后会返回错误码 “1002037”。目前默认最多同时加入 5 个房间，如有更多需求，请联系 ZEGO 技术支持提供扩展能力。

4. **调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#login-room) 登录失败，错误码为 “1002018”，是什么原因？**

多房间模式下，传入的登录用户信息不相同，则会返回错误码 “1002018”。

5. **调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-publishing-stream) 推流失败，错误码为 “1003070”，是什么原因？**

多房间模式下，必须调用带有 “ZegoPublisherConfig” 参数的 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-publishing-stream) 接口进行推流，否则会返回错误码 “1003070”。

6. **调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-playing-stream) 拉流失败，错误码为 “1004070”，是什么原因？**

多房间模式下，必须调用带有 “ZegoPlayerConfig” 参数的 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_ue~class~IZegoExpressEngine#start-playing-stream) 接口进行拉流，否则会返回错误码 “1004070”。

<Content />

