

# API概览

---

云端录制服务端 API 升级到 v2 版本，全新的 API 接口文档更加规范和全面。

服务端 API v2 版本支持全球就近接入、统一的鉴权方式、统一的参数风格和公共错误码，给开发者带来简单快捷的使用体验。

<Warning title="注意">

1. 本文档 API 接口均为最新服务端 API v2 接口，后续相关功能的新增都会在此更新。为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新 API v2 接口。
2. 旧版 API 接口仅供 **2021-09-10** 前接入的旧用户维护使用。旧版接口文档请参考 [旧版服务端 API](https://doc-zh.zego.im/article/5836)。
</Warning>

云端录制服务端提供以下相关 API 接口。您可参考 [调测指南](/cloud-recording-server/postman) 使用 Postman 快速调试下列接口。

|接口名称|接口功能| 默认调用频率限制 |
|-|-|-|
|[开始录制](/cloud-recording-server/start)|调用本接口开始云端录制。| 50 次/秒 |
|[结束录制](/cloud-recording-server/stop)|调用本接口结束云端录制。| 50 次/秒 |
|[更新混流布局](/cloud-recording-server/update-layout)|在录制过程中，可以随时调用本接口更改混流布局的设置。| 10 次/秒 |
|[更新白板](/cloud-recording-server/update-whiteboard)|在录制过程中，可以随时调用本接口更改录制的白板。| 10 次/秒 |
|[查询录制状态](/cloud-recording-server/query)| 开始录制后，开发者可以通过调用本接口来查询录制任务的状态。| 10 次/秒 |
|[查询录制任务列表](/cloud-recording-server/query-record-task-list)| 开始录制后，开发者可以通过调用本接口来查询正在录制的任务列表。| 10 次/秒 |
|[暂停录制](/cloud-recording-server/pause-recording)|调用本接口可以暂停录制中的任务，暂停期间将不会录制房间内的音视频流、白板等。| 10 次/秒 |
|[恢复录制](/cloud-recording-server/resume-recording)|调用本接口可以恢复暂停中的任务，继续录制房间内的音视频流、白板等。| 10 次/秒 |
|[截图](/cloud-recording-server/take-snapshot)| 调用本接口，可对 **混流画面** 进行一次截图。| 10 次/秒 |
|[录制结束回调](/cloud-recording-server/end-callback)|如需要第一时间获知任务结束事件，需要在开通云端录制服务时提供回调地址。| - |
