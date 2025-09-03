# 跑通示例源码

- - -

## 示例代码运行指引

本示例源码**仅**针对支付宝原生组件。

## 准备环境

请确保开发环境满足以下技术要求：

* 已安装 [支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)。
* 使用支付宝小程序基础库 1.23.0 及以上版本，低版本需要做 [兼容处理](https://opendocs.alipay.com/mini/framework/compatibility)。
* **请确保您已自行联系支付宝商务人员，开通了相关权限，并获取到了接入 MRTC 的相应参数，以及完成了挂包（Android 设备需要下载挂包）后，才可以正常使用 [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。如果您**
* 确保您的支付宝小程序符合以下类目，并开通实时音视频权限（获取到对应的小程序 AppID），详情请参考 [申请开通](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/AliPay_miniprogram_item.png" /></Frame>

## 前提条件

请到 [ZEGO 控制台](https://console.zego.im/) 注册账号并申请初始化 SDK 时需要的 AppID 与 Server，申请流程请参考 [项目管理](/console/project-info)。

<Warning title="注意">


Express 的小程序平台的功能默认开启，使用时如遇问题请联系 ZEGO 技术支持。

</Warning>

## 获取示例源码

<Card title="示例源码" href="https://github.com/zegoim/zego-express-alimini-sample/tree/master" target="_blank">
支付宝小程序-GitHub 下载
</Card>

## 示例源码目录结构

下面目录结构为 zego-express-alimini-sample 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├── libs    # 依赖库文件夹，存放如 SDK 的 js 文件等
│   └──ZegoExpressMiniProgram.js    # 小程序 SDK
├── pages   # 小程序页面
│   ├── base    # 视频直播《基础推拉流》
│   ├── index    # 首页
│   ├── message     # 视频直播《实时消息》
│   ├── setting     # 自定义设置 设置 AppID
│   └── tokenRole   # Token 鉴权 v3
├── resource    # 资源文件夹，存放如图片等静态资源
├── utils       # 存放共享的工具类、方法等的 js 文件夹
├── app.js      # 支付宝小程序的入口文件
├── app.json    # 支付宝小程序公共设置
├── app.acss    # 支付宝小程序全局样式
├── package.json    # npm 包描述文件
└── mini.project.json # 支付宝小程序项目配置描述文件
```

## 运行示例代码

<Warning title="注意">


- 示例代码中的 SDK 为 beta 版本，请勿将其用于正式发布，请在 [下载](!DownloadSDK/DownloadSDK) 页面获取最新最新版本的 SDK。
- 登录房间所需 Token 的获取请参考 [使用 Token 鉴权](/real-time-video-miniprogram/communication/using-token-authentication)，若需要快速调试，可使用控制台生成的临时 Token，详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。
- 请使用真机进行调试，且调试时，在支付宝小程序开发者工具中，设置勾选不校验域名。

</Warning>



1. 使用编辑器（如 VS Code、WebStorm）打开已下载的项目。
2. 将 app.js 文件中的 zegoAppID 及 server 分别修改为 [前提条件](!DownloadDemo_AliPay#3) 中获取到的 AppID 和 Server，同时在 userID 和 token 中，传入正确的值，否则示例代码无法正常运行。

<Warning title="注意">


    为方便开发者调试，[ZEGO 控制台](https://console-express.zego.im/account/login) 提供生成临时 Token 的功能，开发者可直接获取临时 Token 进行使用，但在开发者自己的线上环境中，请通过自己的服务端生成 Token。


</Warning>



3. 输入从支付宝 BD 获取到的 MRTC 参数，以及身份验证签名 signature。

    - MRTC 参数，包含 bizName、subBiz、以及 serverUrl。
    - [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f) 的参数 signature，是由 bizName、subBiz、秘钥 key 等加密生成，具体生成规则请参考 [流媒体签名使用说明](https://opendocs.alipay.com/pre-open/0876cs?pathHash=f6441b0b)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/appid_server.jpeg" /></Frame>

4. 使用支付宝小程序开发者工具打开示例源码，在“详情”中，勾选如下图左下角的两个选项。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/web_view_details.jpeg" /></Frame>

5. 编译运行示例代码，请使用手机扫码预览。

<Note title="说明">


    若运行过程中出现问题，请联系 ZEGO 技术支持。

</Note>





## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<Content />