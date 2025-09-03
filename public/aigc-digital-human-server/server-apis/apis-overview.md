

# API 概览

---

数字人 API 服务提供以下相关 API 接口及回调，可参考 [调用方式](/aigc-digital-human-server/server-apis/accessing-server-apis) 调用以下接口。

## 数字人管理

|接口名称|接口功能| 调用频率限制|
|-|-|-|
|[查询数字人列表](/aigc-digital-human-server/server-apis/digital-human-management/get-digital-human-list)| 查询可用的数字人列表。| 10 次/秒 |
|[查询数字人信息](/aigc-digital-human-server/server-apis/digital-human-management/get-digital-human-info)| 查询数字人信息。| 10 次/秒 |
|[查询音色列表](/aigc-digital-human-server/server-apis/digital-human-management/get-timbre-list)| 查询数字人可用的音色。| 10 次/秒 |


## 实时流式视频合成

|接口名称|接口功能| 调用频率限制|
|-|-|-|
|[创建数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/create-digital-human-stream-task)| 创建一个数字人视频流任务，生成数字人实时画面。| 10 次/秒 |
|[获取数字人视频流任务状态](/aigc-digital-human-server/server-apis/digital-human-streaming/get-digital-human-stream-task-status)| 获取数字人视频流任务状态。| 10 次/秒 |
|[停止数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/stop-digital-human-stream-task)| 停止数字人视频流任务。| 10 次/秒 |
|[动作驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/do-action)| 驱动数字人做动作。| 10 次/秒 |
|[文本驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-text)| 通过文本驱动数字人说话。| 10 次/秒 |
|[音频驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-audio)| 通过音频驱动数字人说话。| 10 次/秒 |
|[RTC 音频流驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-rtc-stream)| 通过实时的 RTC 音频流驱动数字人说话。| 10 次/秒 |
|[WebSocket 音频流驱动数字人](/aigc-digital-human-server/server-apis/digital-human-streaming/drive-by-ws-stream)| 通过 WebSocket 实时传输音频流数据驱动数字人说话。| 10 次/秒 |
|[获取数字人驱动任务状态](/aigc-digital-human-server/server-apis/digital-human-streaming/get-drive-status)| 获取数字人驱动任务状态。| 10 次/秒 |
|[打断数字人视频流驱动任务](/aigc-digital-human-server/server-apis/digital-human-streaming/interrupt-drive-task)| 打断数字人视频流驱动任务。| 10 次/秒 |
|[查询正在运行的数字人视频流任务](/aigc-digital-human-server/server-apis/digital-human-streaming/query-digital-human-stream-tasks)| 查询正在运行的数字人视频流任务。| 10 次/秒 |
