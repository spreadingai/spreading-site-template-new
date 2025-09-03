# API 概览

---

ZEGO 云通讯产品服务端 API 升级到 v2 版本，全新的 API 接口文档更加规范和全面。

服务端 API v2 版本支持全球就近接入、统一的鉴权方式、统一的参数风格和公共错误码，给开发者带来简单快捷的使用体验。

- 开发者可参考 [快速开始](https://doc-zh.zego.im/article/19456) 文档快速完成一次接口调用。

- 如需进行开发调试，也可参考 [使用 Postman 调试](https://doc-zh.zego.im/article/19704)。

<Warning title="注意">


1. 本文档 API 接口均为最新服务端 API v2 接口，后续相关功能的新增都会在此更新。为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新 API v2 接口。

2. 旧版 API 接口已停止维护，不添加新功能。旧版接口文档请参考 [服务端 API](https://doc-zh.zego.im/article/1287)。


</Warning>



## 房间信令接口

|接口名称|接口功能|
|-|-|
|[SendBroadcastMessage](https://doc-zh.zego.im/article/19461)|推送广播消息|
|[SendBarrageMessage](https://doc-zh.zego.im/article/19551)|推送弹幕消息|
|[SendCustomCommand](https://doc-zh.zego.im/article/19553)|推送自定义消息|
|[DescribeUserNum](https://doc-zh.zego.im/article/19555)|获取房间人数|
|[DescribeUsers](https://doc-zh.zego.im/article/19557)|查询用户状态|
|[DescribeUserList](https://doc-zh.zego.im/article/19559)|获取房间用户列表|
|[AddStream](https://doc-zh.zego.im/article/19561)|增加房间流|
|[DeleteStream](https://doc-zh.zego.im/article/19563)|删除房间流|
|[DescribeSimpleStreamList](https://doc-zh.zego.im/article/19565)|获取简易流列表|
|[CloseRoom](https://doc-zh.zego.im/article/19567)|关闭房间|
|[KickoutUser](https://doc-zh.zego.im/article/19569)|踢出房间用户|
|[SetForbidUserRule](https://doc-zh.zego.im/article/19571#3_1)|设置用户封禁规则|
|[DescribeForbidUserRules](https://doc-zh.zego.im/article/19571#3_2)|查询用户封禁规则|
|[DelForbidUserRule](https://doc-zh.zego.im/article/19571#3_3)|删除用户封禁规则|
|[SetForbidStreamRule](https://doc-zh.zego.im/article/19573#3_1)|设置房间音视频流封禁规则|
|[DescribeForbidStreamRules](https://doc-zh.zego.im/article/19573#3_2)|查询房间音视频流封禁规则|
|[DelForbidStreamRule](https://doc-zh.zego.im/article/19573#3_3)|删除房间音视频流封禁规则|

## 混流转码接口

|接口名称|接口功能|
|-|-|
|[StartMix](https://doc-zh.zego.im/article/19595)|开始混流|
|[StopMix](https://doc-zh.zego.im/article/19597)|停止混流|
|[GetMixTaskInfo](https://doc-zh.zego.im/article/19599)|查询混流任务信息|
|[StartAutoMix](https://doc-zh.zego.im/article/19601)|开始自动混流|
|[StopAutoMix](https://doc-zh.zego.im/article/19603)|停止自动混流|
|[StartCloudTranscode](https://doc-zh.zego.im/article/19605)|开始单流转码|
|[StopCloudTranscode](https://doc-zh.zego.im/article/19607)|停止单流转码|


## 媒体服务接口

|接口名称|接口功能|
|-|-|
|[ForbidCDNLiveStream](https://doc-zh.zego.im/article/19610)|禁止 CDN 推流|
|[QueryForbidCDNLiveStream](https://doc-zh.zego.im/article/21293)|查询已被禁止推流到 CDN 的 URL 列表|
|[ResumeCDNLiveStream](https://doc-zh.zego.im/article/19612)|恢复 CDN 推流|
|[ForbidRTCStream](https://doc-zh.zego.im/article/19614)|禁止 RTC 推流|
|[ResumeRTCStream](https://doc-zh.zego.im/article/19616)|恢复 RTC 推流|
|[ForbidRTCStreams](https://doc-zh.zego.im/article/19618)|批量禁止 RTC 推流|
|[ResumeRTCStreams](https://doc-zh.zego.im/article/19620)|批量恢复 RTC 推流|
|[CreatCDNTransferRule](https://doc-zh.zego.im/article/19624)|启动旁路推流|
|[DeleteCDNTransferRule](https://doc-zh.zego.im/article/19626)|停止旁路推流|
|[ClearCDNTransferRule](https://doc-zh.zego.im/article/19628)|清空旁路推流|
|[RTMPDispatchV2](https://doc-zh.zego.im/article/19630)|RTMP 推拉流调度|


## 媒体文件接口

|接口名称|接口功能|
|-|-|
|[StartCDNRecord](https://doc-zh.zego.im/article/19633)|开始 CDN 录制|
|[StopCDNRecord](https://doc-zh.zego.im/article/19635)|停止 CDN 录制|
|[SearchMedia](https://doc-zh.zego.im/article/19637)|检索媒体信息|
|[DeleteMedia](https://doc-zh.zego.im/article/19639)|删除媒体文件|
|[MergeMedia](https://doc-zh.zego.im/article/19641)|合并媒体文件|
|[DescribeMediaTask](https://doc-zh.zego.im/article/19643)|查询媒体文件任务|
|[TranscodeMedia](https://doc-zh.zego.im/article/19645)|开始点播转码|


## 音视频流审核接口

|接口名称|接口功能|
|-|-|
|[StartCensorAudioV2](https://doc-zh.zego.im/article/19648)|开始音频流审核|
|[StopCensorAudioV2](https://doc-zh.zego.im/article/19650)|结束音频流审核|
|[StartCensorVideoV2](https://doc-zh.zego.im/article/19652)|开始视频流审核|
|[StopCensorVideoV2](https://doc-zh.zego.im/article/19654)|结束视频流审核|
|[GenerateIdentifyToken](https://doc-zh.zego.im/article/19656)|音视频流审核鉴权 Token|

## 场景服务接口

|接口名称|接口功能|
|-|-|
|[SetSceneTemplate](https://doc-zh.zego.im/article/19659)|场景模板配置|

## 回调说明


|回调名称|回调说明|
|-|-|
|[room_create](https://doc-zh.zego.im/article/19664)|房间创建回调|
|[room_close](https://doc-zh.zego.im/article/19666)|房间关闭回调|
|[room_login](https://doc-zh.zego.im/article/19670)|登录房间回调|
|[room_logout](https://doc-zh.zego.im/article/19672)|退出房间回调|
|[stream_create](https://doc-zh.zego.im/article/19676)|流创建回调|
|[stream_close](https://doc-zh.zego.im/article/19678)|流关闭回调|
|[mix_start](https://doc-zh.zego.im/article/19682)|混流开始回调|
|[mix_stop](https://doc-zh.zego.im/article/19684)|混流结束回调|
|[transcode_start](https://doc-zh.zego.im/article/19686)|单流转码开始回调|
|[transcode_stop](https://doc-zh.zego.im/article/19688)|单流转码停止回调|
|[record](https://doc-zh.zego.im/article/19690)|录制文件生成回调|
|[compose](https://doc-zh.zego.im/article/19692)|媒体文件合并完成回调|
|[procedure](https://doc-zh.zego.im/article/19694)|点播转码完成回调|
|[censor_audio_v2_result](https://doc-zh.zego.im/article/21500)|音频流审核结果回调|
|[censor_audio_v2_status](https://doc-zh.zego.im/article/21500)|音频流审核任务状态回调|
|[censor_video_v2_audio_result](https://doc-zh.zego.im/article/19698)|视频流音频审核结果回调|
|[censor_video_v2_img_result](https://doc-zh.zego.im/article/19698)|视频流画面审核结果回调|
|[censor_video_v2_audio_status](https://doc-zh.zego.im/article/19698)|视频流音频审核状态回调|
|[censor_video_v2_img_status](https://doc-zh.zego.im/article/19698)|视频流画面审核状态回调|
