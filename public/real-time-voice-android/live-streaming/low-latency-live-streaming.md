# 超低延迟直播

---

## 功能简介


ZEGO [超低延迟直播](/live-streaming-ios/introduction/overview)（Low-Latency Live Streaming，L3）为高质量体验而生，可打造超低延迟、超强同步、抗极端弱网、超低卡顿、超清画质、首帧秒开的极致直播体验，是直播分发产品中的“六边形战士”。

相较于传统 CDN 直播，ZEGO 超低延迟直播基于全链路自研私有协议、海量有序数据网络（MSDN）和端到端监控，提供更加稳定、更高质量的直播分发服务，助力业务侧解决“直播体验”痛点，是众多直播头部客户的共同选择。


<Warning title="注意">
超低延迟拉流功能不是默认开启的，使用前请先联系 ZEGO 技术支持开通功能。
</Warning>


<video poster="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/d3f29ec6e8.png" src="http://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/36e23be657.mp4" width="70%" muted="true" loop="true" autoplay="autoplay" preload="auto" nocontrols></video>


### 功能特点

超低延迟直播支持千万级超大并发，提供稳定、高质量的直播分发服务，具有以下 6 大高质量特性：

<table>

<tbody><tr>
<th>功能</th>
<th>特点</th>
</tr>
<tr>
<td>超低延迟</td>
<td>正常网络下直播延迟 600 ms ～ 1000 ms。</td>
</tr>
<tr>
<td>
超强同步
</td>
<td>毫秒级同步，不同观众间的同步性误差 < 400ms。</td>
</tr>
<tr>
<td>抗极端弱网</td>
<td>支持抗极端弱网，最高抗 80% 丢包不掉线，复杂网络环境下仍能稳定播放。</td>
</tr>
<tr>
<td>超低卡顿</td>
<td>对比 CDN 直播，使用 ZEGO 超低延迟直播后卡顿率最高可降低 75% 以上。</td>
</tr>
<tr>
<td>超清画质</td>
<td>通过 All-in-one 的 SDK 提供丰富的画质优化能力，实现各场景的用户级高质量画质实践。</td>
</tr>
<tr>
<td>首帧秒开</td>
<td>使用独家的解耦底层架构，并提供预加载直播流等秒开策略，支持观众极速进房，最高可实现 99% 的国内秒开率。</td>
</tr>
</tbody></table>


### 应用场景

超低延迟直播可应用于如下场景：

<table>

<tbody><tr>
<th>应用场景</th>
<th>说明</th>
</tr>
<tr>
<td>
出海直播
</td>
<td>
将卡顿高、首帧慢、画质差等痛点逐个击破，提升全球观众直播体验，全球用户畅玩直播社交。
突破海外网络环境差、中低端设备占比高、素人主播开播环境差等瓶颈，助力企业出海本地化。
</td>
</tr>
<tr>
<td>秀场直播</td>
<td>提供秒开、美颜等必备秀场直播功能，支持跨房间 PK、直播转 1 V 1 等多场景无缝切换方案。
在保障所有观众的直播观看体验的同时，重点保障大主播和付费用户的体验质量，有效促进付费用户增长。</td>
</tr>
<tr>
<td>
教育大班课
</td>
<td>超低延迟在线课堂，完美地兼容多样化教学插件，提供优秀的师生互动体验感，使得学生与教师的课堂进度一致，教学沉浸感媲美线下课堂。</td>
</tr>
<tr>
<td>游戏直播</td>
<td>在大码率的游戏场景，能够根据观众带宽自适应转码，有效降低卡顿率，使所有观众都能流畅观看游戏互动。基于高清低码实现同等码率下有效提升游戏画质，不受限于观众端网络瓶颈。</td>
</tr>
<tr>
<td>
赛事直播
</td>
<td>毫秒级延迟和超低卡顿，告别被剧透，实时掌握赛场动态，不错过任何高光时刻。支持 4K 60fps 和 HDR，呈现丰富的赛场细节和丝滑超清的动态画面。</td>
</tr>
<tr>
<td>电商直播</td>
<td>匹配带货的强实时性要求，主播极速回应观众购物咨询，提高主播与观众粘性。
实现拍卖、抢购、秒杀等活动的强同步和公平性，刺激直播间用户下单转化。</td>
</tr>
<tr>
<td>一起看</td>
<td>全球海量观众可在同一直播间内同步观看电影、演唱会或者竞技比赛等内容，低延迟、多端同步的音画体验帮助用户零距离畅快沟通，带来沉浸式观感体验。</td>
</tr>
</tbody></table>

## 前提条件

在实现超低延迟直播功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3575) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7636)。


## 使用步骤

设置 [ZegoPlayerConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-player-config#resource-mode) 的 “resourceMode” 参数为 “ONLY_L3”，调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-playing-stream-1) 接口，根据传入的流 ID 参数 “streamID”，拉取远端推送的低延迟直播流。

```java
ZegoPlayerConfig playerConfig = new ZegoPlayerConfig();
playerConfig.resourceMode = ZegoStreamResourceMode.ONLY_L3;
ZegoExpressEngine.getEngine().startPlayingStream(streamID, playCanvas, playerConfig);
```

<Content />