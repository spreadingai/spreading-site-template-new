<Title>怎么处理无声问题？</Title>



---

如果存在无声问题，您可以参考如下操作步骤进行处理。

## 问题排查

1. 您可以使用 ZEGO 提供的 [示例源码](/real-time-video-android-java/quick-start/run-example-code) 来测试是否同样存在无声问题，如果示例源码正常，您可以参考以下方式进行排查。
2. 是否配置了麦克风的权限。如果没有，请确保配置麦克风的权限。
3. 如果为 PC 环境，请确认是否有音频设备接入。如果接入了音频设备，请确保选择接入设备作为通话设备，并且已正确安装了驱动。
4. 是否有调用了 SDK 的静音接口：[mutePublishStreamAudio](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#mute-publish-stream-audio) 或 [muteMicrophone](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#mute-microphone)。
5. 项目的 AppID、AppSign 或 Token 是否配置正确，具体的配置可参考 [快速开始 - 实现流程](/real-time-video-android-java/quick-start/implementing-video-call)。


## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。


<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="2">必要信息</td>
    <td>出现无声的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>听到无声和导致无声的用户 ID（userID）。</td>
  </tr>
  <tr>
    <td rowspan="2">可选信息</td>
    <td>出现无声情况的具体时间段。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
