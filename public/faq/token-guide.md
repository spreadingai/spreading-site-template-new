<Title>什么是 Token？如何生成 Token？如何使用 Token？</Title>



- - -

<Note title="说明">



本文仅供 Native 平台参考，主要指 iOS、Android、macOS、Windows 平台。

</Note>







## Token 是什么

Token 是一种认证令牌，使用 SDK 时，在对业务安全性有较高要求的情况下，可以对“登录房间”和“在房间内推流”的权限进行控制。

<Warning title="注意">



在使用 Token 进行用户权限控制功能前，请联系 ZEGO 技术支持配置开启该功能。

</Warning>






## Token 的生成和使用

开启用户权限控制功能后，开发者服务端生成 Token，用户在登录房间时传入 Token，设置对应的权限。通过 SDK 的传递，ZEGO 服务端会对带着 Token 的用户进行校验，根据 Token 参数判断用户是否能登录特定房间和在房间内推流。

具体实现可参考 [实时音视频 - 用户权限控制](/real-time-video-ios-oc/communication/using-token-authentication)。


## Token 的有效期

Token 的有效期由开发者自行设置，具体实现可参考 [实时音视频 - 用户权限控制](/real-time-video-ios-oc/communication/using-token-authentication) 中的“生成 Token”。 


## Token 到期时的 SDK 行为与建议处理方式

Token 过期时，用户不会立即被踢出房间，当前成功推送的流也不受影响，但是会影响用户的下一次登录和推流操作。开发者需要从自己的服务端获取新的有效 Token, 调用 SDK 提供的 renewToken 接口更新 Token。


API 参考：

- iOS：[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine&jumpType=route#renew-token-room-id)
- Android：[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#renew-token)
- macOS：[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_macos~class~zego-express-engine&jumpType=route#renew-token-room-id)
- Windows：[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~CPP_windows~class~zego-express-i-zego-express-engine&jumpType=route#renew-token)


## 相关参考

[实时音视频 - 使用 Token 鉴权](/real-time-video-ios-oc/communication/using-token-authentication)
