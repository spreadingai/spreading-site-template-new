# 已知问题及解决方案

- - -

本文罗列了您在集成 ZEGO [Express HarmonyOS SDK](https://doc-zh.zego.im/article/19406) 时可能会遇到的已知问题、及相关解决方案，建议您在开始接入前仔细阅读。如有疑问，请联系 ZEGO 技术支持咨询。

<Warning title="注意">


请您联系华为商务人员，签署合作计划，开通相关权限后，获取相关 HarmonyOS 5.0.0 Release 操作系统、API 版本等说明。

</Warning>



## 音频问题


<h4>如果其他 App 应用处于前台、畅连使用小窗口进行通话。当畅连挂断后，其他 App 应用没有恢复采集播放。</h4>

HarmonyOS NEXT 系统的 BUG，[华为畅连](https://consumer.huawei.com/cn/mobileservices/meetime/) 挂断后没有触发相关事件。

需要开发者自行实现中断开始等事件通知，由用户来决定恢复时机。

<h4>通话过程中，无法切换扬声器和听筒。</h4>

HarmonyOS NEXT 系统没有提供用户可以手动切换扬声器和听筒的 API 接口。

需要开发者在应用层实现 AVCastPicker（投播组件），由用户点击界面手动切换。

<h4>当 App 应用切到后台后，无法继续采集音频，进行播放。</h4>

HarmonyOS NEXT 系统的限制，没有保活。

需要开发者创建 Playback 长任务和 AVSession、并保证 5s 内有正常播放的音频。如果音频中断超过 5s，需要重新创建 Playback 和 AVSession。



## 视频问题

<h4>当 App 应用切回前台，预览画面会卡顿一下。</h4>

正常现象，是一种 HarmonyOS NEXT 特性。

当 App 应用切到后台后，HarmonyOS NEXT 系统会禁止使用摄像头采集视频；App 应用切回前台后，会重新启动摄像头采集视频，此时画面会卡顿一下。
