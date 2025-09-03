<Title>Web 平台如何获取 CDN 的拉流地址？</Title>



- - -


Web 平台获取 CDN 拉流地址的方式，考虑下列的实现方式：

- 如果是通过 ZEGO 平台申请的 CDN，那么拉流端可以通过监听 “roomStreamUpdate” 回调，获取相关拉流地址。如果无法获取，请联系 ZEGO 技术支持。
- 如果不是通过 ZEGO平 台申请的 CDN，请联系 CDN 厂商，获取拉流地址。
- 如果不使用 SDK 回调实现该功能，需要业务端通过业务服务器自行同步拉流地址；或者通过 ZEGO 房间的 [实时消息与信令](/real-time-video-android-java/room/messaging-and-signaling) 发送拉流地址信息。