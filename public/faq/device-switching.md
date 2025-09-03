<Title>如何实现开关摄像头/视频画面/麦克风/音频/扬声器？</Title>



---

Express SDK 为您提供一系列接口，以便实现相关设备的开启与关闭，具体说明如下所示：

<table>
  
<tbody>
<tr>
<th>设备</th>
<th>接口</th>
<th>描述</th>
<th>注意事项</th>
</tr>
<tr>
<td>摄像头</td>
<td>`enableCamera`</td>
<td>开启或关闭您（本地设备）的摄像头。</td>
<td>
- `enableCamera` 会真正的开关摄像头设备，不建议频繁使用。
- 当需要解除占用摄像头设备时，可调用此接口。
</td>
</tr>
<tr>
<td rowspan="2">视频画面</td>
<td>`mutePublishStreamVideo`</td>
<td>推流时，是否发送视频数据，true 代表不发送。</td>
<td>
- 在主播不想发布自己的画面时，可调用此接口。
- 此接口不会真正开关设备，也不会真正停止推流。
</td>
</tr>
<tr>
<td>`mutePlayStreamVideo`</td>
<td>拉流时，是否播放某条流中的视频数据，true 代表不播放。</td>
<td>- 在观众不想看到某个人的画面时，可调用此接口。- 此接口不会真正停止拉流。</td>
</tr>
<tr>
<td>麦克风</td>
<td>`enableAudioCaptureDevice`</td>
<td>开启或关闭您（本地设备）的麦克风。</td>
<td>
- 与 `muteMicrophone` 的区别是，本接口会真正开启或关闭麦克风设备。
- 如果需要频繁开关，建议使用 `muteMicrophone` 接口。
</td>
</tr>
<tr>
<td rowspan="3">音频</td>
<td>`muteMicrophone`</td>
<td>是否将您（本地设备）的麦克风静音。</td>
<td>与 `enableAudioCaptureDevice` 的区别是，`muteMicrophone` 没有真正关闭麦克风，只是会使用静音数据替换设备采集到的音频数据。</td>
</tr>
<tr>
<td>`mutePublishStreamAudio`</td>
<td>推流时，是否发送音频数据，true 代表不发送。</td>
<td>
- 在主播不想发布自己声音时，可使用此接口。
- 此接口不会真正开关设备，也不会真正停止推流。
</td>
</tr>
<tr>
<td>`mutePlayStreamAudio`</td>
<td>拉流时，是否播放某条流中的音频数据，true 代表不播放。</td>
<td>- 在观众不想听到某个人的声音时，可使用此接口。- 此接口不会真正停止拉流。</td>
</tr>
<tr>
<td>扬声器/耳机</td>
<td>`muteSpeaker`</td>
<td>是否将您（本地设备）的扬声器/耳机静音。</td>
<td>设置静音后，SDK 所有声音都不会播放，包括拉流、媒体播放器等。</td>
</tr>
</tbody>
</table>