<Title>Express SDK 如何将 SDK 日志打印到控制台？</Title>



- - -

在各平台、框架上，都可以通过 Express SDK 接口设置，以 Android 平台为例：

开发者可以通过将 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#enable-debug-assistant) 接口的 enable 参数设置为 TRUE，开启调试助手。设置成功后，SDK 会打印日志到控制台，并在 SDK 其他函数的调用出现问题时，UI 弹窗提示错误。

<Warning title="注意">


以上方式，适用于除去 Web、小程序之外的所有平台和框架。

</Warning>



