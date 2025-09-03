<Title>Express 怎么处理音频卡顿问题？</Title>



- - -

音频卡顿是在实时音视频传输过程中，因网络、设备、物理环境等原因，造成的音频播放断断续续、不流畅等现象。

实时音视频通话过程中，连续丢 3 个音频帧，即记为一次音频卡顿。

常见的情况是由客户端的网络不佳造成的，建议开发者尝试以下操作步骤处理卡顿问题。

## 自查

检查网络状态是否良好。可以切换到 4G 或更稳定的 Wi-Fi 环境下再做尝试。

检查当前设备状态是否正常。可以让用户使用微信语音或者第三方 App 进行尝试。

也可以通过 ZEGO 的星图（音视频质量运营平台），确认用户的网络质量情况、设备 CPU 负载情况。


## 使用星图监控质量

可以使用 [ZEGO管理控制台](https://console.zego.im/) 中的 [星图](https://console.zego.im/prism)，对音视频通话的质量进行跟踪。

## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。

<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="2">必要信息</td>
    <td>用户听到音频卡顿的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>出现卡顿的音频发送端和接收端的用户 ID（userID）。</td>
  </tr>
  <tr>
    <td rowspan="5">可选信息</td>
    <td>卡顿音频的录音文件。</td>
  </tr>
  <tr>
    <td>出现卡顿的具体时间段。</td>
  </tr>
  <tr>
    <td>出现卡顿的流的 ID（streamID）。</td>
  </tr>
  <tr>
    <td>如果房间内还有视频画面，检查视频播放是否流畅、清晰。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
