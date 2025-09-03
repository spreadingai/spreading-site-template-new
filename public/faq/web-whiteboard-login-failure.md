<Title>如何解决 Web 平台互动白板 SDK 登录失败的问题？</Title>


---

## 问题描述

集成 Web 平台互动白板 SDK，初始化后，出现登录失败的现象。

## 问题原因

登录失败一般可能是如下原因：

1. 网络异常。
2. 初始化传入参数异常。
3. 登录时传入参数异常。

<Note title="说明">


Web 平台互动白板 SDK 包含了实时音视频 SDK 的所有功能，初始化、登录流程与实时音视频 SDK 完全一致。


</Note>




## 解决方案

针对登录失败的原因，ZEGO 提供了以下排查方法：

1. 优先检查网络是否正常。
2. 检查初始化传入的 appID和server 的格式和合法性。

<Warning title="注意">

    请开发者确保 appID、server 是通过 ZEGO 控制台申请的，且未被修改过。
    
</Warning>


3. 检查登录时传入参数的格式与合法性，尤其是 Token 参数。

<Note title="说明">

    需要由开发者的业务服务器实现 Token 逻辑，也可以使用 ZEGO 控制台生成的临时 Token 进行调试。
    
</Note>


4. 根据 SDK 返回的错误码进行排查。

## 相关链接

1. SDK 初始化请参考 [实时音视频 SDK 初始化](/real-time-video-web/quick-start/implementing-video-call)。
2. 登录接口请参考 [实时音视频 SDK 登录](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)。
3. 登录房间相关错误码可参考 [相关错误码](/real-time-video-web/client-sdk/error-code)。
