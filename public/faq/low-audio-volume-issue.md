<Title>怎么处理音量太小问题？</Title>



---


ZEGO SDK 提供了 AGC（自动增益控制）功能，可以将声音调整到一个合适的音量水平，建议您开启该功能。

如果存在音量太小的问题，您可以参考如下操作步骤进行处理。


## 问题排查

- ZEGO SDK 提供了调整采集音量和播放音量的接口，请检查是否有调用接口将音量设置得很小。相关接口如下表：

<table>
  
  <tbody><tr>
    <th>接口</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&amp;jumpType=route#set-capture-volume">setCaptureVolume</a></td>
    <td>设置推流端采集音量</td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&amp;jumpType=route#set-play-volume">setPlayVolume</a></td>
    <td>设置拉流音量</td>
  </tr>
  <tr>
    <td><a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&amp;jumpType=route#set-all-play-stream-volume">setAllPlayStreamVolume</a></td>
    <td>设置所有拉流音量</td>
  </tr>
</tbody></table>




- 检查设备自身的播放音量是否设置得很小。
- 检查麦克风是否被堵住，如果有手机壳或保护套，或是将手机放置到软性材质上，容易出现音量过小的问题。
- 检查声音是否从听筒发出。



## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。

<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="2">必要信息</td>
    <td>音量过小的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>觉得音量过小的用户 ID（userID）。</td>
  </tr>
  <tr>
    <td rowspan="2">可选信息</td>
    <td>出现音量过小的具体时间段。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
