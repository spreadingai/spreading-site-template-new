<Title>如何避免直播上下麦时音量的变化？</Title>



---

ZEGO SDK 的某些配置下，麦上麦下会使用不用的音量模式，比如麦上使用通话音量，麦下使用媒体音量。这样的配置可以给大多数场景带来更好的体验，但同时会有麦上麦下音量的变化。


如果您想要避免音量变化的问题，可以在调用 createEngine 接口创建引擎时，通过 “scenario” 参数设置应用场景为 “COMMUNICATION” 或 “GENERAL”。
- “COMMUNICATION” 场景下，麦上麦下都使用通话音量。
- “GENERAL” 场景下，麦上麦下都使用媒体音量。

如果对音量模式有其他需求，可联系 ZEGO 技术支持。


相关参考：

[媒体音量和通话音量有什么区别？](https://doc-zh.zego.im/faq/system_volume)