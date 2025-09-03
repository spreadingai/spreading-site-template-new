# 多人视频通话

- - -

## 功能简介

该文档展示了如何使用 ZEGO Express SDK 构造多人视频通话场景，即实现多对多实时音视频互动。用户可在房间内与其余用户进行实时视频通话，互相推拉流。该场景可用于多人实时视频聊天、视频会议等。

## 前提条件

在应用多人视频通话场景之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/197) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633)。


## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3128) 获取源码。

相关源码请查看 “ZegoExpressExample/Examples/Scenes/VideoForMultipleUsers” 目录下的文件。

## 使用步骤

本节将介绍如何使用 ZEGO Express SDK 实现多人视频通话。

- 多人视频通话的流程图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Android/eventhandler_process_new.jpeg" /></Frame>

- API 调用时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Scenes/VideoForMultipleUsers/Video_for_Multiple_Users_android_new.png" /></Frame>

  <Note title="说明">


  ZEGO Express SDK 可支持多人视频通话，如上时序图以 2 名房间成员间的实时视频通话为例，建议开发者参考上述流程设计自己的多人实时视频通话场景。
</Note>


### 1 创建引擎

定义 SDK 引擎对象，调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~ZegoExpressSDK#create-engine) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

如果需要注册回调代理，可将实现了 [IZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler) 的对象传入参数 “eventHandler”。如果不需要注册回调代理，可将 “null” 传入参数 “eventHandler”，创建引擎后仍需要注册回调时可通过调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-event-handler) 接口设置回调代理。

```cpp
// 定义 SDK 引擎对象
IZegoExpressEngine *engine;

ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_DEFAULT;
// 创建引擎实例
engine = ZegoExpressSDK::createEngine(profile, nullptr);
```

### 2 开启房间内用户变化通知

开发者需在每位用户登录房间时将 [ZegoRoomConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoRoomConfig) 中的 “isUserStatusNotify” 设为 “true” ，用于接收其他用户进出房间的回调通知。

```cpp
ZegoRoomConfig RoomConfig;
RoomConfig.isUserStatusNotify = true;
// 登录房间
engine->loginRoom(roomID, user, RoomConfig);
```

### 3 设置事件通知回调

为实现多人视频通话功能，需要监听房间内用户和流的增减并做出相应处理，可通过 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-event-handler) 设置相关回调。

**监听房间内的用户变化**

注册 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-room-user-update) 回调，用于监听房间内的用户变化，已登录房间内用户的新增和删除都会触发该回调。

回调中 “updateType” 参数指明了房间内用户变化的类型，该参数取值如下：

|用户变化类型|枚举值|说明|
|-|-|-|
|用户新增|ZEGO_UPDATE_TYPE_ADD|房间内用户增加，“userList” 为新增的用户列表。|
|用户减少|ZEGO_UPDATE_TYPE_DELETE|房间内用户减少，“userList” 为减少的用户列表。|

用户首次登录房间时，若此房间内已存在其他用户，该新登录用户会通过此回调接收到新增类型的用户列表，即 “updateType” 为 “ZEGO_UPDATE_TYPE_ADD” 的回调，该用户列表为房间内已存在的用户。

<Warning title="注意">


- 只有在 [loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#login-room) 登录房间时允许了状态通知，即将 [ZegoRoomConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoRoomConfig) 中的 “isUserStatusNotify” 设为 "true" 时（默认为 “false” ），才能监听 [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-room-user-update) 回调。
- 当房间内人数超过 500 人时，该回调会失效。
</Warning>

```cpp
class MyEventHandler : public IZegoEventHandler
{
    void onRoomUserUpdate(const std::string &roomID, ZegoUpdateType updateType, const std::vector<ZegoUser> &userList){
        // 在这里更新 UI 或执行其他操作
    }
};
auto eventHandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventHandler)
```

**监听房间内的流变化**

为监听房间内的流变化，需注册 [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoEventHandler#on-room-stream-update) 回调，房间内其他用户新增或删除流时将触发此回调通知变更的流列表。

回调中 “updateType” 参数指明了房间内流变化的类型，该参数取值如下：

|流变化类型|枚举值|说明|
|-|-|-|
|流新增|ZEGO_UPDATE_TYPE_ADD|房间内流增加，“streamList” 为新增的流列表。|
|流减少|ZEGO_UPDATE_TYPE_DELETE|房间内流减少，“streamList” 为减少的流列表。|


用户首次登录房间时，若此房间内存在其他用户正在推流，会接收到流新增列表，也即 “updateType” 为 “ZEGO_UPDATE_TYPE_ADD” 的回调。

```cpp
class MyEventHandler : public IZegoEventHandler
{
    void onRoomStreamUpdate(const std::string& currentRoomID, ZegoUpdateType updateType, const std::vector<ZegoStream>& streamList, const std::string& extendData){
        // 在这里更新 UI 或执行其他操作
    }
};
auto eventHandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventHandler)
```

### 4 开始推流/拉流

请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633#publishingStream) 依次完成“推流”和“拉流”相关操作。

### 5 停止视频通话

通话过程中，房间内的用户如果需要结束通话，请参考 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7633#publishingStream) 依次完成相关操作。
