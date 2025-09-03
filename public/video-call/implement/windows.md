# 功能实现流程

- - -

实时视频场景的典型使用之一是同一会话中的多用户进行视频实时通话。即多个人一起互相推拉流，例如：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/videoCommunicationSample.png" /></Frame>

以2人实时视频通话的场景为例，Express Video SDK 的详细 API 调用时序图如下:

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/video call.png" /></Frame>

> 请注意：
>
> 1. 上面流程中以 2 名房间成员间的实时视频为例，实际上 **Express Video SDK** 支持多人实时视频。建议开发者参考上述流程设计自己的多人实时视频通话的场景。
>
> 2. 为了便于开发者更快理解`示例专题`中`视频通话`模块中的逻辑，下述每节会将功能核心源码片段挑出来并加以讲解。开发者亦可直接参考 [Demo](/video-call/run-example-code/windows)。

## 前提条件

在实现基本的视频通话前，请确保：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](!Integration/SDK_Integration)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info)。



## 初始化 SDK

在使用 **Express Video SDK** 进行视频通话之前，需要初始化**Express Video SDK**。由于初始化操作 SDK 内部处理的操作较多，建议开发者在 App 启动的时候进行。

`视频通话`模块中初始化相关源码片段演示如下，如下样例代码与`视频通话`模块中的源码不完全一致，仅供参考：

```cpp
#include "ZegoExpressSDK.h"
using namespace ZEGO::EXPRESS;

ZegoEngineProfile profile;
// AppID 和 AppSign 由 ZEGO 分配给各 App；其中，为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
profile.appID = appID;
profile.appSign = appSign;
profile.scenario = ZegoScenario::ZEGO_SCENARIO_GENERAL;
// 创建引擎实例
auto engine = ZegoExpressSDK::createEngine(profile, nullptr);
```


## 登录房间并推拉流，监听各种回调，开始视频通话

用户间进行实时视频对话前，需要先登录到同一个房间，在收到登录房间成功的回调之后可以直接调用**Express Video SDK** 的 API 接口进行推拉流操作。

已经在房间内进行视频通话的用户需要获取后来进入房间进行视频通话的用户推流的通知，并且也需要获取中途退出视频通话的用户停止推流的通知。在获取这些通知之后，先前在房间内进行视频通话的用户应拉取房间内新增的推流、停止拉取房间内停推的流，并做相应的 UI 展示。

`视频通话`模块中初始化相关源码片段演示如下，如下样例代码与`视频通话`模块中的源码不完全一致，仅供参考：

```cpp
/** 创建用户 */
ZegoUser user("userID", "userName");

/** 开始登录房间 */
engine->loginRoom("roomID", user);
```

继承 IZegoEventHandler，重写特定虚函数以处理事件回调。

```cpp
#include "ZegoExpressSDK.h"
using namespace ZEGO::EXPRESS;

class MyEventHandler: public IZegoEventHandler{
  // 重写 IZegoEventHandler 中的虚函数,不需要实现所有的回调接口，根据实际需要实现其中的某些回调方法。

      /**
    * 房间状态变化通知
    *
    * 当房间的连接状态发生变化时将触发此回调，并告知发生变化的原因。开发者可根据此回调来判断当前用户在房间的状态，若长时间处于正在请求连接状态，一般情况大概率是因为用户端网络不稳定导致。
    * @param roomID 房间 ID，最大长度为 128 字节的字符串。
    * @param state 变化后的的房间状态
    * @param errorCode 错误码，详情请参考常用 [错误码文档](https://doc-zh.zego.im/zh/4572.html)
    * @param extendedData 扩展信息
    */
    virtual void onRoomStateUpdate(const std::string& /*roomID*/, ZegoRoomState /*state*/, int /*errorCode*/, const std::string& /*extendedData*/) {
            /** 根据变化后的房间状态完成具体的业务逻辑 */
            ....
    }

    /**
    * 房间内用户进出通知
    * 当有用户进入/退出房间时将触发此回调，并告知当前房间内存在的用户的列表
    * @param roomID 房间 ID
    * @param updateType 更新类型（添加/删除）
    * @param userList 当前房间内的用户列表
    */
    virtual void onRoomUserUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoUser>& userList) {
            /** 根据房间内用户的变化状况完成具体的业务逻辑 */
            ....
    }

    /**
    * 房间内流更新通知
    * 用户首次登录房间时会接收到房间内存在的所有流列表；后续当房间内新增/删除流时将触发此回调通知变更的流列表
    * @param roomID 房间ID
    * @param updateType 更新类型（添加/删除）
    * @param streamList 更新的流列表
    */
    virtual void onRoomStreamUpdate(const std::string& roomID, ZegoUpdateType updateType, const std::vector<ZegoStream>& streamList) {
            /** 根据房间内音视频流的变化状况完成具体的业务逻辑 */
        for_each(streamList.begin(), streamList.end(), [&](/video-call/implement/zegostream-stream){
          auto it  = std::find_if(zegoStreamList.begin(), zegoStreamList.end(), [&](/video-call/implement/zegostream-const-&_stream){
                  return _stream.streamID == stream.streamID;
          });

          if(updateType == ZEGO_UPDATE_TYPE_ADD && it == zegoStreamList.end()){
              zegoStreamList.push_back(stream);
          }

          if(updateType == ZEGO_UPDATE_TYPE_DELETE && it != zegoStreamList.end()){
              engine->stopPlayingStream(stream.streamID);
              zegoStreamList.erase(it);
          }
      });


      for(auto widget : videoList){
          widget->update();
      }

      for (unsigned int i = 0; i< zegoStreamList.size(); i++) {
          auto stream = zegoStreamList.at(i);
          auto widget = videoList.value(int(i));
          if(widget){
              ZegoCanvas canvas(ZegoView(widget->winId()));
              engine->startPlayingStream(stream.streamID, &canvas);
          }
      }
    }
};

// 创建事件代理
auto eventHandler = std::make_shared<MyEventHandler>();
engine->setEventHandler(eventHandler);
```



在onRoomStreamUpdate回调中，我们可以获取流的增加/移除信息，流增加时进行拉流播放 `startPlayingStream`，流移除时停止拉流 `stopPlayingStream`。

登录房间流程请参考：[快速开始 - 实现流程](/real-time-video-windows-cpp/quick-start/implementing-video-call#2-登录房间) 的 “登录房间”。  

推流流程请参考：[快速开始 - 实现流程](/real-time-video-windows-cpp/quick-start/implementing-video-call#3-预览自己的画面并推送到-zego-音视频云) 的 “预览自己的画面，并推送到 ZEGO 音视频云”。 


> 注意：
>
> 1. `onPublisherStateUpdate` 回调可监听推流状态。若推流不成功，一般为网络问题，SDK内部会做重试工作，开发者也可根据情况做有限次数的推流重试，或给出友好的交互提示。

拉流流程请参考：[快速开始 - 实现流程](/real-time-video-windows-cpp/quick-start/implementing-video-call#4-拉取其他用户的音视频) 的 “拉取其他用户的音视频”。

> 注意：
>
> 1. `onPlayerStateUpdate` 可监听拉流状态。若拉流不成功，一般为网络问题，SDK内部会做重试工作，开发者也可根据情况做有限次数的拉流重试，或给出友好的交互提示。

## 停止视频通话

用户在视频通话过程中退出视频通话，应该停止推流、停止拉流、退出房间，释放对应的 UI 对象资源等。

“视频通话”模块中初始化相关源码片段演示如下，如下样例代码与“视频通话”模块中的源码不完全一致，仅供参考：

```cpp
/** 停止推流 */
engine->stopPublishingStream();
/** 停止本地预览 */
engine->stopPreview();

//停止拉流，如果拉了多条流，应该遍历停止所有拉流
engine->stopPlayingStream("streamID");
// 将相应拉流渲染的View设置为null、释放资源等
...

/** 登出房间 */
engine.logoutRoom("room1");
```
