# 示例代码运行指引

- 示例源码**仅**针对微信原生组件。
- 本文档**仅**提供小程序原生框架示例接入指引，**uni-app 框架**示例接入指引及相关注意事项，请参考上方 uni-app 框架下示例源码中的 readme.md 文件。

## 准备环境

请确保开发环境满足以下技术要求：

* 已安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)。
* 使用微信小程序基础库 1.7.0 及以上版本（否则不支持音视频播放和录制功能）。
* 确保您的微信小程序符合以下类目并开通实时音视频权限（获取到对应的小程序 AppID）；不符合以下类目的，请参考 [需要小程序直播插件进行直播](/real-time-video-miniprogram/live-streaming/live-streaming#需要小程序直播插件进行直播) 处理。
  - 微信小程序需符合类目：
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/category_zh.png" /></Frame>
  - 开通实时音视频权限（获取到对应的小程序 AppID）：
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/apiconfig_2.png" /></Frame>

## 前提条件

请到 [ZEGO 控制台](https://console.zego.im/) 注册账号并申请初始化 SDK 时需要的 AppID 与 Server，申请流程请参考 [项目管理](/console/project-info)。

<Warning title="注意">

Express 的小程序平台的功能默认开启，使用时如遇问题请联系 ZEGO 技术支持。

</Warning>

## 获取示例源码
<CardGroup cols={2}>
<Card title="示例源码" href="https://github.com/zegodev/zego-express-wxmini-sample" target="_blank">
GitHub下载
</Card>
<Card title="示例源码"  href="https://gitee.com/zegodev/zego-express-wxmini-sample" target="_blank">
码云下载
</Card>
</CardGroup>
<Card title="示例源码" href="https://github.com/zegoim/zego-express-wxmini-uniapp-sample" target="_blank">
uni-app 框架-GitHub下载
</Card>


## 示例源码目录结构

下面目录结构为 zego-express-wxmini-sample 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├── components  # 小程序组件
│   ├── zego-player # zego-player组件，封装了live-player拉流
│   └── zego-pusher # zego-pusher组件，封装了live-pusher推流
├── libs    # 依赖库文件夹，存放如sdk的js文件等
│   └──ZegoExpressMiniProgram.js    # 小程序sdk
├── miniprogram_npm # 一些项目依赖的npm包
│   └── miniprogram-api-promise # 用于扩展微信小程序api支持promise
├── pages   # 小程序页面
│   ├── base    # 视频直播《基础推拉流》
│   ├── base_zego   # 视频直播 推拉流组件
│   ├── bgm     # 视频直播 背景音
│   ├── cdn     # 视频直播 CDN
│   ├── customlive  # 自定义推拉流
│   ├── main    # 首页
│   ├── message     # 视频直播《实时消息》
│   ├── mix     # 视频直播 混流
│   ├── multi   # 重试 多节点
│   ├── native      # 基础演示 摄像头、麦克风等
│   ├── setting     # 自定义设置 设置APPID
│   ├── snapshot    # 视频直播 截图
│   └── tokenRole   # token鉴权 token v3
├── resource    # 资源文件夹，存放如图片等静态资源
├── script      # 一些测试脚本
├── utils       # 存放共享的工具类、方法等的js文件夹
├── app.js      # 微信小程序的入口文件
├── app.json    # 微信小程序公共设置
├── app.wxss    # 微信小程序全局样式
├── package.json    # npm包描述文件
├── project.config.json # 微信小程序项目配置描述文件
└── sitemap.json    # sitemap配置文件，用于配置小程序及其页面是否允许被微信索引
```

## 运行示例代码

<Warning title="注意">

- 示例代码中的 SDK 为 beta 版本，请勿将其用于正式发布。
- 登录房间所需 Token 的获取请参考 [使用 Token 鉴权](/real-time-video-miniprogram/communication/using-token-authentication)，若需要快速调试，可使用控制台生成的临时 Token，详情请参考 [控制台 - 开发辅助](/console/development-assistance/temporary-token)。
- 微信开发者工具只支持本地预览，不支持推拉流，请使用**真机**进行调试，且调试时在微信开发者工具中，设置勾选不校验域名。

</Warning>


1. 使用编辑器（如 VS Code、WebStorm）打开已下载的项目。
2. 将 app.js 文件中的 zegoAppID 及 server 分别修改为 [前提条件](#前提条件) 中获取到的 AppID 和 Server，同时在 userID 和 token 中，传入正确的值，否则示例代码无法正常运行。

<Warning title="注意">

    - 自 3.6.0 起，server 地址可填写控制台获取的 server 或空字符串。
    - 为方便开发者调试，[ZEGO 控制台](https://console.zego.im/) 提供生成临时 Token 的功能，开发者可直接获取临时 Token 进行使用，但在开发者自己的线上环境中，请通过自己的服务端生成 Token。

</Warning>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/wxprogram_demo_key_center.png" /></Frame>

3. 使用微信开发者工具打开示例源码，在“本地设置”中，勾选“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”选项。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/local_setting.png" /></Frame>

4. 编译运行示例代码，请使用手机扫码预览。

<Note title="说明">
    若运行过程中出现问题，请联系 ZEGO 技术支持。

</Note>

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


<Content />

