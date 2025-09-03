<Title>调用 createEngine 接口创建引擎时，如果将房间场景设置为 “语音通话/语聊房/KTV” 等场景时，还需要主动调用 “enableCamera” 接口关闭摄像头吗？</Title>



- - -

不需要，房间场景（[ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~enum~ZegoScenario)）设置为 “语音通话/语聊房/KTV” 等场景时，SDK 会默认关闭摄像头。