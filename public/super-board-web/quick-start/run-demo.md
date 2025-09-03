# 跑通示例源码

---

<Note title="说明">该示例源码展示了如何使用 API 来实现超级白板业务</Note>

<Card title="示例源码" href="https://artifact-demo.zego.im/SuperBoardSDK/Web/DemoSourceCode/superboard_demo_web.zip" target="_blank">
**本地下载**
</Card>

<Warning title="注意">

- 本示例源码仅用于演示超级白板产品功能，源码对外开放，可供开发者接入时参考。但是示例源码本身未经过严格测试，若开发者计划将该示例源码用于生产环境，请确保发布前自行进行充分测试，避免发生潜在问题可能造成损失。
- 本示例源码只针对桌面端浏览器做过适配，若需要在移动端使用，需要开发者自行做移动端适配工作。
</Warning>


## 示例源码运行指引

### 准备环境
已安装一款 ZEGO SDK 支持的浏览器，如下表所示：


| 平台 |  浏览器/Webview | 备注 |
| --- | ------- | ------- |
| Windows  | Chrome  | 支持 win7 或以上  |
| macOS   |  Chrome  |  支持 macOS 10.10 或以上|
| iOS   |     Safari  |  支持 iOS 10.0 或以上 |
| iOS  |   微信内嵌浏览器|支持 iOS 10.0 或以上   |
| Android |    Chrome   | 支持 Android 8.0 或以上  |
| Android |  微信内嵌浏览器  | 支持 Android 8.0 或以上  |


### 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已生成 Token，详情请参考 [使用 Token 鉴权](/super-board-web/quick-start/user-access-control)。也可以参考 [控制台 - 开发辅助](https://doc-zh.zego.im/article/16309)，在 ZEGO 控制台获取临时 Token（有效期为 24 小时）。


<Warning title="注意">

使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
</Warning>

### 运行示例源码

1. 在 superboard_demo_web/key_center.js 文件中填写登录房间所需的 AppID、Server 和 Token。请使用本文 “[前提条件](#前提条件)” 已获取的 AppID、Server 和 Token 正确填写。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/WhiteBoard/appid_var.jpeg" /></Frame>

2. 在项目所在目录下，双击打开 “index.html” 页面，输入房间号和用户名进入房间。
