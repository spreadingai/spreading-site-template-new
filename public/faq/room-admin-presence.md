<Title>在每个房间，通话中是否有管理员？</Title>



- - -

没有管理员的概念。

对于房间内通话的管理是属于业务管理层的范围，可以由客户实现自己的信令层，调用 SDK 的接口（[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-publishing-stream)/[stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#stop-publishing-stream)/[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-playing-stream)/[stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#stop-playing-stream)）来实现通话管理。或者使用 SDK 的信令服务进行相关通知，详情请参考 [实时消息与信令](/real-time-video-android-java/room/messaging-and-signaling)。
