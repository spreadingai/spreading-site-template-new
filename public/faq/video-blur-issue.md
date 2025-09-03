<Title>怎么处理视频模糊问题？</Title>



- - -

视频模糊一般是视频码率或分辨率过低导致，您可以参考如下操作步骤进行处理。

## 自查

请按以下步骤进行排查：

- 确认 [setVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-video-config) 接口设置的 [ZegoVideoConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-video-config)（例如分辨率、码率），尝试配置更高的分辨率和码率看是否可以解决问题。
- 尝试 4G 连接，或者其他 Wi-Fi 信号排除网络问题。
- 如果使用了视频前处理功能，例如美颜等，请先关闭该功能，检查视频模糊是否是由于视频前处理导致。
- 也可以通过 ZEGO 的星图（音视频通话质量跟踪平台），确认用户的网络质量情况、设备 CPU 负载情况。

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
    <td>出现模糊画面的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>出现模糊画面的用户 ID（userID）。</td>
  </tr>
  <tr>
    <td rowspan="4">可选信息</td>
    <td>出现模糊画面的具体时间段。</td>
  </tr>
  <tr>
    <td>出现模糊画面的流的 ID（streamID）。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
  <tr>
    <td>录屏文件。</td>
  </tr>
</tbody></table>
