<Title>Express SDK 发送实时消息后，为什么收不到回调？</Title>



- - -

### 问题原因

可能有以下几种情况：

- 消息接收方未设置发送消息接口的对应回调。
- 消息发送方和消息接收方未使用相同的 AppID。
- 消息发送方和消息接收方未在同一个房间内，即房间 ID 不同。
- 消息发送方和消息接收方未同时在线，没有都处于“已成功登录房间”状态。
- 消息发送方不能接收本端发送的实时消息。


### 解决方案

针对以上提到的几种情况，开发者在实现实时消息功能时必须同时满足：

- 消息接收方已设置发送消息接口的对应回调。
- 消息发送方和消息接收方需要使用相同的 AppID。
- 消息发送方和消息接收方需要在同一个房间内，即使用相同的房间 ID。
- 消息发送方和消息接收方需要同时在线，即需要保证都处于“已成功登录房间”状态。

另外，开发者需要关注到，消息发送方无法接收本端发送的实时消息。

### 相关链接

<Accordion title="各平台发送实时消息接口对应的回调参考" defaultOpen="false">
<table>
  
  <tbody><tr>
    <th>平台</th>
    <th>消息类型</th>
    <th>发送消息接口</th>
    <th>接收消息回调</th>
    <th>相关文档</th>
  </tr>
  <tr>
    <td rowspan="3">iOS</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-broadcast-message-room-id-callback">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~zego-event-handler#on-im-recv-broadcast-message-room-id">onIMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-ios-oc/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-barrage-message-room-id-callback">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~zego-event-handler#on-im-recv-barrage-message-room-id">onIMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-custom-command-to-user-list-room-id-callback">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-im-recv-custom-command-from-user-room-id">onIMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">Android</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-broadcast-message">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-im-recv-broadcast-message">onIMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-android-java/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-barrage-message">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-barrage-message">onIMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#send-custom-command">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-custom-command">onIMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">macOS</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-broadcast-message-room-id-callback">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~zego-event-handler#on-im-recv-broadcast-message-room-id">onIMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-macos-oc/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-barrage-message-room-id-callback">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~zego-event-handler#on-im-recv-barrage-message-room-id">onIMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#send-custom-command-to-user-list-room-id-callback">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-im-recv-custom-command-from-user-room-id">onIMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">Windows</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-broadcast-message">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-broadcast-message">onIMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-windows-cpp/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-barrage-message">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-barrage-message">onIMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine#send-custom-command">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-event-handler#on-im-recv-custom-command">onIMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">Web</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-broadcast-message">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-broadcast-message">IMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-web/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-barrage-message">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-barrage-message">IMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-custom-command">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#im-recv-custom-command">IMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">小程序</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-broadcast-message">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-broadcast-message">IMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-miniprogram/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-barrage-message">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-barrage-message">IMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~class~ZegoExpressEngine#send-custom-command">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_wxxcx~interface~ZegoRTMEvent#im-recv-custom-command">IMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">Linux</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-broadcast-message">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-broadcast-message">onIMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-linux-cpp/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-barrage-message">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-barrage-message">onIMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-express-engine#send-custom-command">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_linux~class~zego-express-i-zego-event-handler#on-im-recv-custom-command">onIMRecvCustomCommand</a></td>
  </tr>
  <tr>
    <td rowspan="3">React Native</td>
    <td>广播消息</td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#sendbroadcastmessage">sendBroadcastMessage</a></td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvbroadcastmessage">IMRecvBroadcastMessage</a></td>
    <td rowspan="3"><a target="_blank" href="/real-time-video-rn/room/messaging-and-signaling">实时消息与信令</a></td>
  </tr>
  <tr>
    <td>弹幕消息</td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#sendbarragemessage">sendBarrageMessage</a></td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvbarragemessage">IMRecvBarrageMessage</a></td>
  </tr>
  <tr>
    <td>自定义消息</td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/classes/_zegoexpressengine_.zegoexpressengine.html#sendcustomcommand">sendCustomCommand</a></td>
    <td><a target="_blank" href="https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#imrecvcustomcommand">IMRecvCustomCommand</a></td>
  </tr>
</tbody></table>
</Accordion>