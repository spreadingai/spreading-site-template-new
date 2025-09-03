<Title>服务端的“流创建”和“流关闭”回调通知，能否保证是有序的？</Title>



- - -


公网链路比较复杂，所以无法保证时序的绝对正确，尤其是在较短的时间间隔内触发的多次回调。

基于这种情况，ZEGO 提供了流回调乱序的解决方案，维护本地流列表，详情请参考 [回调生成房间流列表解决方案](/real-time-video-server/callback/solution/maintain-the-room-stream-list)。