<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码
---


## 概览

本文介绍使用 [uni-app x 框架](https://doc.dcloud.net.cn/uni-app-x/)，如何快速使用 UTS 插件跑通示例源码，体验即时通讯服务。

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- [HBuilder X 4.27](https://www.dcloud.io/hbuilderx.html) 或以上版本。
- iOS 12.0 或以上版本的 iOS 设备。
- Android 版本不低于 5.0 的 Android 设备。如果为真机，请开启“允许调试”选项。
- iOS/Android 设备已经连接到 Internet。

## 前提条件

<Content />
<Content1 />

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/uni-app/ZIMUniAppXExample.zip" target="_blank">点击获得完整代码。</Card>

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
.
├── App.uvue
├── README.md
├── index.html
├── main.uts
├── manifest.json
├── node_modules
│   └── crypto-js        # js 加密库，用于本地生成 token（zim 登录时需要）
├── package.json
├── pages
│   └── index
│       ├── index.uvue   # 业务页面
│       ├── js
├── pages.json
├── static
├── uni.scss
├── uni_modules
│   └── zego-zim-uts      # 插件
│       ├── changelog.md
│       ├── node_modules  # 开发 Web、小程序应用时，安装 npm sdk 成功后创建的依赖库目录
│       ├── package.json
│       ├── readme.md
│       ├── utssdk
│       └── yarn.lock
└── yarn.lock
```

## 运行示例源码

1. 打开 HBuilderX，选择 “文件 > 导入 > 从本地目录导入”，导入示例源码文件。

    <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/import_uni_project.png" />
    </Frame>


2. 打开 “pages/index/index.uvue” 文件，并使用本文 [前提条件](#前提条件) 已获取的 AppID 、AppSign 和 ServerSecret 正确填写，并保存。

    - 如果您的应用搭配 iOS、Android 使用：

    ```typescript
    export const zimAppConfig = {
        appID: , // 填写申请的 AppID
        appSign: , // 填写申请的 AppSign，搭配 iOS/Android 平台时需要填写
    }; 
    ```
    
    **若您的项目已切换为 “Token 鉴权”，请在 [ZEGO 控制台](https://console.zego.im) 上，申请临时 Token 用于调试。**

    - 如果您的应用搭配 Web、小程序使用：

    ```typescript
    export const zimAppConfig = {
        appID: , // 填写申请的 AppID
        serverSecret: , // 填写申请的 ServerSecret，搭配 Web、小程序平台时，需要生成 Token 使用
    }; 
    ```
    在 `uni_modules/zego-zim-uts` 目录下运行 `npm run install` 安装 npm 加密库，用于生成 Token。
    

3. 自定义调试基座

具体操作请参考 [制作自定义调试基座](/zim-uniapp-x/send-and-receive-messages#231-制作自定义调试基座)。
