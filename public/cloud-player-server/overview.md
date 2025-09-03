
# API 概览

---

云端播放器提供以下相关 API 接口及回调，可参考 [调用方式](/cloud-player-server/accessing-server-apis) 调用以下接口。

|接口名称|接口功能| 调用频率限制|
|-|-|-|
|[创建云端播放器](/cloud-player-server/create-player)| 创建一个云端播放器，向指定房间内播放媒体资源。| 20 次/秒 |
|[更新云端播放器](/cloud-player-server/update-player)| 更新指定云端播放器的播放进度、音频转码参数、视频转码参数等。| 20 次/秒 |
|[销毁云端播放器](/cloud-player-server/delete-player)| 销毁指定的云端播放器。|20 次/秒 |
|[查询云端播放器任务列表](/cloud-player-server/describe-players)| 查询已创建的云端播放器任务列表，包含已创建、正在运行中、已销毁等所有状态。| 10 次/秒 |
|[创建上传任务](/cloud-player-server/create-upload-task)| 创建一个上传任务，将 URL 在线资源上传到 OSS。上传之后同区域的云播放器集群可以通过内网拉流地址获取播放资源，保证资源传输过程的稳定性。 | 20 次/秒 |
|[取消上传任务](/cloud-player-server/cancel-upload-task)|取消一个上传任务。 | 20 次/秒 |
|[查询上传任务](/cloud-player-server/describe-upload-tasks)| 获取单个或多个上传任务的详情。 | 20 次/秒 |
|[回调](/cloud-player-server/callback/callback)| 通过回调信息，第一时间获知云端播放器相关状态变更事件和文件上传任务相关事件。**请注意，需要联系 ZEGO 技术支持配置回调地址。**| -|
