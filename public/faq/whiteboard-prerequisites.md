<Title>使用互动白板前需要做些什么？</Title>



-------

在使用互动白板 SDK 之前，需要保证以下条件成立：

1. 你的 AppID 开通了互动白板的功能。

    如果你的 AppID 没有开通互动白板的功能，那么当你使用 ZegoExpress SDK 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#login-room) 接口登录房间时，会登录失败并收到错误码 52005033。

    请联系 ZEGO 技术支持开通互动白板功能。

2. 下载包含白板能力的 ZegoExpress SDK。
    
    互动白板 SDK 需要与包含白板能力的 ZegoExpress SDK 搭配使用，才能正常工作，所以请确认你的 ZegoExpress SDK 版本包含了白板能力。

<Note title="说明">
 

    [互动白板 SDK](https://doc-zh.zego.im/article/4406) 中已包含 ZegoExpress-Video SDK（含白板功能），无需单独下载。
    
</Note>



3. 参考 [互动白板 - 快速开始 - 实现流程](https://doc-zh.zego.im/article/8941#3)，创建白板并使用基本功能。
