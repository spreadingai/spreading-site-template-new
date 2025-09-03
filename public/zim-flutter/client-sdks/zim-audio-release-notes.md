# ZIM Audio 发布日志

- - -

## 1.0.0 版本

**发布日期：2024-04-17**

ZIM Audio SDK 首次发布，支持完整的语音处理功能，包含语音采集、播放、噪声抑制（ANS）、自动增益控制（AGC）等，开发可以轻松实现高清语音消息的收发，无需关注音频处理的底层实现。若需使用，请同时搭配 ZIM SDK 接入。

| <div style={{width:"130px"}}>功能项</div>  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 语言采集 | 支持录制至多 120 秒的 M4A 和 MP3 格式音频，检查录制状态。 | <ul><li>[startRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/startRecord.html)</li><li>[onRecorderStarted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderStarted.html)</li><li>[onRecorderProgress](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderProgress.html)</li><li>[onRecorderFailed](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderFailed.html)</li><li>[completeRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/completeRecord.html)</li><li>[cancelRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/cancelRecord.html)</li><li>[onRecorderCompleted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCompleted.html)</li><li>[isRecording](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/isRecording.html)</li><li>[cancelRecord](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/cancelRecord.html)</li><li>[onRecorderCancelled](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onRecorderCancelled.html)</li></ul> |
| 语音播放 | 支持播放 M4A 和 MP3 格式音频，以及设置音频输出播放设备。 | <ul><li>[startPlay](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/startPlay.html)</li><li>[onPlayerStarted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerStarted.html)</li><li>[onPlayerFailed](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerFailed.html)</li><li>[onPlayerInterrupted](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerInterrupted.html)</li><li>[onPlayerEnded](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerEnded.html)</li><li>[setAudioRouteType](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/setAudioRouteType.html)</li><li>[stopPlay](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/stopPlay.html)</li><li>[onPlayerStopped](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudioEventHandler/onPlayerStopped.html)</li></ul> |
| 音量增益（AGC） | 支持自动调整麦克风音量，以适应远近拾音并保持音量稳定。<br />注意：如需使用本功能，请联系 ZEGO 技术支持开通，专业版和旗舰版用户可免费开通。| [enableAGC](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/enableAGC.html) |
| 噪声控制（ANS） | 支持识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。<br />注意：如需使用本功能，请联系 ZEGO 技术支持开通，专业版和旗舰版用户可免费开通。  | [enableANS](https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/enableANS.html) |
