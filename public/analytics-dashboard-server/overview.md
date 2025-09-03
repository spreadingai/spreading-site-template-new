
# API 概览

- - -

ZEGO 星图服务端提供以下相关 API 接口及回调，可参考 [调用方式](/analytics-dashboard-server/access-server-apis) 调用以下接口。

## 明细数据

| 接口功能 | 接口描述 | 默认调用频率限制 |
| -- | -- | -- |
| [查看用户推拉流基本信息](/analytics-dashboard-server/user-data/get-stream-base-info) | 查询用户在指定时间段内与指定房间 ID 和流 ID 相关的基本信息。 | 3 次/秒，10000 次/天 |
| [查看用户推流质量和性能明细](/analytics-dashboard-server/user-data/get-publish-quality-detail) | 根据用户 ID、时间段、房间 ID 和流 ID 查询推流质量和设备性能。 | 3 次/秒，10000 次/天 |
| [查看用户拉流质量和性能明细](/analytics-dashboard-server/user-data/get-play-quality-detail) | 根据用户 ID、时间段、房间 ID 和流 ID 查询拉流质量和设备性能。 | 3 次/秒，10000 次/天 |

## 实时监控

| 接口功能 | 接口描述 | 默认调用频率限制 |
| -- | -- | -- |
| [查看地区质量实时数据](/analytics-dashboard-server/real-time-monitoring/get-region-quality-detail) | 查询指定地区（或所有地区）和指定平台（或所有平台）上 1 小时内的质量数据。 | 3 次/分，480 次/天 |
| [查询实时规模](/analytics-dashboard-server/real-time-monitoring/get-real-time-usage) | 获取最近 2 小时的实时推拉流并发数、房间并发数、在线用户数、最大房间用户数以及混流并发数。返回数据粒度为秒。 | 3 次/分，480 次/天 |
| [查询实时质量](/analytics-dashboard-server/real-time-monitoring/get-real-time-quality) | 获取最近 2 小时的实时音视频卡顿率、上下行延时、端到端延迟、推拉流成功率以及房间登录成功率。返回数据粒度为秒。 | 3 次/分，480 次/天 |


## 运营大盘

| 接口功能 | 接口描述 | 默认调用频率限制 |
| -- | -- | -- |
| [查询业务规模](/analytics-dashboard-server/operation-data/get-biz-usage) | 查询指定时间段内每日的实时音视频数据统计，包括房间并发峰数、用户并发数、推拉流并发数及推拉流累计总数。 | 3 次/分，480 次/天 |
| [查询质量趋势](/analytics-dashboard-server/operation-data/get-biz-quality) | 查询指定时间段内每日的实时音视频质量指标，包括卡顿率、首帧耗时、推流成功率、拉流成功率、房间登录成功率，以及 5 秒内房间登录成功率。 | 3 次/分，480 次/天 |
