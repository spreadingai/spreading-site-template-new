<Title>ZEGO 超低延迟直播和其他 RTMP + CDN 直播技术有什么区别？</Title>




- - -

CDN 直播技术一般是通过 RTMP 协议推流，拉流时转化为 HTTP-FLV 或 HLS 等TCP 协议，是常见的低成本、大规模的直播分发服务。

区别于市面上最常见的 CDN + RTMP 直播技术，ZEGO 自研超低延迟直播为高质量体验而生，是直播分发产品中的“六边形战士”，打造超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验。

<video poster="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d3f29ec6e8.png" src="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/36e23be657.mp4" width="80%" muted="true" loop="true" autoplay="autoplay" preload="auto" controls></video>

ZEGO 自研超低延迟直播使用了以下技术，使主播端和观众端之间的实时通讯质量达到专线级别：
- 私有传输协议
- 私有传输算法
- BGP（Border Gateway Protocol，边界网关协议）线路

具体比较可参考下表：

|技术|常见 CDN 直播|ZEGO 超低延迟直播|
|-|-|-|
|传输协议| RTMP 等 TCP 协议|基于 UDP 的全链路自研私有协议|
|传输算法|TCP|ZEGO 私有丢包对抗、带宽自适应等多种策略|
|网络线路|单线|BGP|

此外，为了满足开发者多样的直播需求，ZEGO 也提供 CDN 直播推拉流能力，并与多家 CDN 厂商进行对接。
