<Title>怎么处理音画不同步问题？</Title>



---

如果存在音画不同步的问题，您可以参考如下操作步骤进行处理。


## 问题排查

1. 如果您使用了自定义视频采集，请检查自定义视频采集的时间戳是否正确，尤其要检查时间戳的单位是否正确（SDK 使用 Unix 标准时间戳，单位为毫秒）。ZEGO SDK 内部会根据您提供的采集时间戳进行音画同步。

2. 如果您使用了虚拟摄像头采集（比如XX直播助手），由于虚拟摄像头的采集延迟可能存在过大问题，而 ZEGO SDK 是无法获取到这种延迟的，可能存在音画不同步的问题。针对这种情况，您可以与 ZEGO 技术支持联系，技术支持可在分析确认后，通过引擎进阶配置进行修正。


## 使用星图监控质量

您可以使用 [ZEGO管理控制台](https://console.zego.im/) 中的 [星图](https://console.zego.im)，对音视频通话的质量进行跟踪。

## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。


<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="2">必要信息</td>
    <td>出现音画不同步的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>出现音画不同步的用户 ID（userID）。</td>
  </tr>
  <tr>
    <td rowspan="2">可选信息</td>
    <td>出现音画不同步具体时间段。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
