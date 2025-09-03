<Title>如何减少 Express SDK 在 Web 控制台打印的信息？</Title>



- - -


调用 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-log-config) 接口，通过 [ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLogConfig) 对象中的 “logLevel” 属性，设置本地控制台打印的日志级别。


一般情况下，ZEGO 不建议您将日志级别设置过高，保持默认值 `info` 即可。日志级别设置越高，日志打印越少，出现问题后难以排查。