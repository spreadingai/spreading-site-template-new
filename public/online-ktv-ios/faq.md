# KTV方案集成 FAQ

- - -

## 点歌相关问题

<Accordion title="为什么切换原唱/伴唱没有成功？" defaultOpen="false">
只有带有伴奏的歌曲才可以切换原唱和伴奏。
</Accordion>

<Accordion title="歌词同步频率和评分频率设置多少合适？" defaultOpen="false">
均设置为 60ms 一次。
</Accordion>

<Accordion title="歌曲/伴奏文件的大小及下载时间，大概会是多少？" defaultOpen="false">
分为SQ（Standard Quality）、HQ、无损音乐（暂无），音质不同大小不同。歌曲：SQ是3-4M，HQ6-7M，伴奏：单音轨默认都是SQ等级，双音轨是10M左右。下载时间根据具体的下载网络类型和网速而定，如4G下行10M/s，下载时间在1s以内。
</Accordion>


## 合唱方案相关问题

<Accordion title="为什么麦上用户延迟高？" defaultOpen="false">
可能造成的原因是：

- 用户当前网络差；
- 没有开启超低延迟模式；
- jitterbuffer水位设置过高。
</Accordion>

<Accordion title="观众端拉流时，为什么伴奏和人声对不齐？" defaultOpen="false">
没有开启混流对齐配置，总共有3个接口:
- startPublishingStreamWithConfig(forceSynchronousNetworkTime = 1)；
- setStreamAlignmentProperty；
- ZegoMixerTask setStreamAlignmentMode = 1。
</Accordion>

<Accordion title="为什么拉流收听会有卡顿？" defaultOpen="false">
麦上的用户拉流的 jitterbuffer 水位过低。网络存在抖动。麦上用户推荐值是(30,30)，观众是(500,100)。
</Accordion>

<Accordion title="为什么多端伴奏不同步？" defaultOpen="false">
可能是因为开发者没有使用合唱示例源码，自行实现倒计时同步逻辑，导致存在误差。
</Accordion>

<Accordion title="为什么观众端歌词会比人声滞后，甚至进度会暂停？" defaultOpen="false">
请查看是否开了 DTX，影响了 SEI 发送。
</Accordion>

<Accordion title="为什么麦上用户接受不到 SEI 的回调？" defaultOpen="false">
可能有以下原因：
- 重复设置了 setEventHandler 事件回调代理；
- 推流端没发 SEI；
- 拉流端没拉带有 SEI 的流。
</Accordion>

<Accordion title="为什么观众端收听效果人声比伴奏慢？" defaultOpen="false">
请查看每次播放时有没有重新推伴奏流并更新混流。
</Accordion>

<Accordion title="设置 setReverbPreset 后耳返没混响" defaultOpen="false">
Express 需要 advancedConfig("audio_loopback_after_prep":"true")。
</Accordion>

<Accordion title="为什么辅路流没有数据？" defaultOpen="false">
请检查是否设置辅路流的数据来源，需要设置音频外部采集。
</Accordion>

<Accordion title="中途加入合唱，伴奏为什么没有对齐？" defaultOpen="false">
需要使用合唱示例源码的中途加入合唱对齐功能实现。
</Accordion>

<Accordion title="插拔耳机会导致进度落后，应该如何解决？" defaultOpen="false">
需要集成伴奏对齐功能，可以参考合唱示例源码实现。
</Accordion>

## 抢唱方案相关问题

<Accordion title="为什么一轮的总曲目比设定的要少，例如我设置了一轮 8 首歌，但是只播放 7 首？" defaultOpen="false">
房主下载歌曲时，如果某些歌曲下载异常，例如已下架，则会上报后台该歌曲下载失败，后台会将歌曲从歌单剔除，所以歌曲会变少。
</Accordion>

<Accordion title="歌曲的 segment_begin, segment_end, prelude_duration 这三者的关系？" defaultOpen="false">
`segment_begin`、`segment_end` 这两个字段用来定位高潮片段在整首歌中的起始位置和结束位置，单位均为毫秒，下载到的资源即 segment_begin ~ segment_end 这段，时长为 segment_end - segment_begin 的值。

`prelude_duration` 这个字段描述的是高潮前奏的时长，单位毫秒，前奏是包含在 segment_begin ~ segment_end 这段里面的。

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/KTVGrab/Common/grab_song_clip_rsc_exp.png" />
</Frame>
</Accordion>

<Accordion title="如何将麦克风人声和播放器进行混流？" defaultOpen="false">
以下代码供您参考：

以下代码供您参考：

```objc
// 创建媒体播放器
ZegoMediaPlayer *mediaPlayer = [[ZegoExpressEngine sharedEngine] createMediaPlayer];
// 将播放器的流混入主流中
[mediaPlayer enableAux:YES];
// 推流
[[ZegoExpressEngine sharedEngine] startPublishingStream:@"my_stream_id"];
```
更多详情可参考 ZegoExpressSDK API 文档的 [enableAux](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#enable-aux) 接口。

</Accordion>

<Accordion title="为什么有些情况需要提前推流？" defaultOpen="false">
由于客户端拉流建立链接需要短暂时间，因此为了保证拉流端的歌曲聆听体验，在某些状态会提前进行推流（状态 [round_preparing](/online-ktv-ios/implementation/ktv-solutions/grab-the-mic#2-状态准备本轮游戏)、[next_song_preparing](/online-ktv-ios/implementation/ktv-solutions/grab-the-mic#8-状态下一首)）；拉流同理。
</Accordion>
