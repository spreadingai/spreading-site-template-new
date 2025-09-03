<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码

---


## 概览

本文介绍使用 [uni-app 框架](https://uniapp.dcloud.io/)，如何快速使用原生插件跑通示例源码，体验即时通讯服务。

## 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- [HBuilder X 3.0.5](https://www.dcloud.io/hbuilderx.html) 或以上版本。
- iOS 11.0 或以上版本的 iOS 真机设备，暂不支持模拟器。
- Android 版本不低于 4.1 的 Android 设备，暂不支持模拟器。如果为真机，请开启“允许调试”选项。
- iOS/Android 设备已经连接到 Internet。

## 前提条件

<Content />
<Content1 />

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/uni-app/ZIMUniAppExample.zip" target="_blank">点击获得完整代码。</Card>

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
├── App.vue
├── assets
│   ├── js
│   │   ├── utils.js
├── components
├── index.html
├── main.js
├── manifest.json
├── pages
│   ├── action
│   │   ├── createC2C.vue
│   │   ├── createGroup.vue
│   │   ├── createRoom.vue
│   │   ├── joinGroup.vue
│   │   └── joinRoom.vue
│   ├── chat
│   │   ├── chat.vue
│   │   ├── info.vue
│   │   └── memberList.vue
│   ├── group
│   │   ├── group.vue
│   │   ├── info.vue
│   │   ├── memberAdd.vue
│   │   ├── memberDelete.vue
│   │   ├── memberList.vue
│   │   ├── modifyName.vue
│   │   ├── modifyNotice.vue
│   │   ├── modifyOwner.vue
│   │   └── modifyRemark.vue
│   ├── home
│   │   └── home.vue
│   └── login
│       └── login.vue
├── pages.json
├── static
│   ├── customicons.css
│   └── customicons.ttf
├── store
│   └── index.js
├── uni.scss
```

## 运行示例源码

1. 打开 HBuilderX，选择 “文件 > 导入 > 从本地目录导入”，导入示例源码文件。

    <Frame width="512" height="auto" caption="">
      <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Web/import_uni_project.png" />
    </Frame>


2. 打开 “assets/js” 文件夹下的 “config.js” 文件，并使用本文 [3 前提条件](#3-前提条件) 已获取的 AppID 、AppSign 和 ServerSecret 正确填写，并保存。

    - 如果您的应用搭配 iOS、Android 使用：

    ```typescript
    export const appConfig = {
        appID: , // 填写申请的 AppID
        appSign: , // 填写申请的 AppSign，搭配 iOS/Android 平台时需要填写
    }; 
    ```

    - 如果您的应用搭配 Web、小程序使用：

    ```typescript
    export const appConfig = {
        appID: , // 填写申请的 AppID
        serverSecret: , // 填写申请的 ServerSecret，搭配 Web 平台时，需要生成 Token 使用
    }; 
    ```

    **若您的项目已切换为 “Token 鉴权”，请在 [ZEGO 控制台](https://console.zego.im) 上，申请临时 Token 用于调试。**

3. 在项目中导入插件，具体操作请参考 [在 uni-app 项目中导入插件](/zim-uniapp/send-and-receive-messages#在-uni-app-项目中导入插件)。


## 自定义调试基座

### 1 制作自定义调试基座

<Note title="说明">

uni-app 官方自定义调试基座使用说明，请参考 [使用自定义基座运行 ](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)。 
</Note>

1. 选择 “运行 > 运行到手机或模拟器 > 制作自定义调试基座” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/UniApp/uni_1.png" /></Frame>

2. 在弹出的界面中，按照 [uni-app 教程](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)，填写相关信息，并单击“打包”进行云打包。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/UniApp/uni_2.png" /></Frame>

    打包成功后，控制台会收到 uni-app 的相关提示。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Packaged_successfully_uniapp.png" /></Frame>


### 2 切换运行基座为自定义调试基座

自定义调试基座，请选择“运行 > 运行到手机或模拟器 > 运行基座选择 > 自定义调试基座”菜单。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/UniApp/uni_3.png" /></Frame>


## 常见问题

请参考 [uni-app 常见问题](https://uniapp.dcloud.net.cn/faq.html#app%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)。
