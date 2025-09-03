<Title>不同用户之间如何传递混流流名信息？</Title>



- - - 

ZegoExpress SDK 提供如下两种方式：

* 使用流附加信息：用户调用 [setStreamExtraInfo ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#set-stream-extra-info) 接口传入，同一房间内其他用户通过监听 [onRoomStreamExtraInfoUpdate ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-stream-extra-info-update) 回调获取流附加信息。
* 使用自定义信令：调用 [sendCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#send-custom-command) 接口向指定用户发送流名信息，该用户通过监听 [onIMRecvCustomCommand ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-im-recv-custom-command) 回调获取对应信息。

<Warning title="注意">


用户也可以使用自己的信令服务，发送与接收混流流名信息。

</Warning>




