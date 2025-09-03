<Warning title="注意">

`2.3.0 及以上`版本的 SDK，开始支持 “AppSign 鉴权”，同时仍支持 “Token 鉴权”，若您需要升级鉴权方式，可参考 [ZIM 如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade_zim)。
</Warning>
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台文档 [项目管理 - 即时通讯](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
本文介绍如何快速跑通示例源码，体验即时通讯服务。
# 跑通示例源码

---

<Card title="示例源码" href="https://artifact-demo.zego.im/zim/example/react-native/ZIMReactNativeExample.zip" target="_blank">点击获得完整代码。</Card>

## 1 概览

本文介绍使用 [react-native 框架](https://reactnative.dev/)，如何快速使用原生插件跑通示例源码，体验即时通讯服务。

## 2 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- React Native 0.60.0 或以上版本。
- iOS 11.0 或以上版本的 iOS 真机设备，暂不支持模拟器。
- Android 版本不低于 4.1 的 Android 设备、并开启“允许调试”选项，暂不支持模拟器。
- iOS/Android 设备已经连接到 Internet。
- 配置 VS Code 开发环境，可在应用商店中搜索 “React Native Tools” 扩展并下载。

## 3 前提条件

<Content />
<Content1 />


## 4 示例源码目录结构

下列结构为 IM 源码文件的子目录结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
react-native
├── App.js
├── Gemfile
├── __tests__
├── android
├── app.json
├── babel.config.js
├── index.js
├── ios
├── main.js
├── metro.config.js
├── package-lock.json
├── package.json
├── react-native.config.js
├── src
│   ├── assets
│   │   └── js
│   │       ├── config.js
│   ├── components
│   ├── hooks
│   │   └── zim.js
│   └── pages
│       ├── action
│       ├── chat
│       ├── group
│       ├── home
│       └── login
├───────
```

## 5 运行示例源码

1. 打开 VScode，选择 “文件 > 导入 > 从本地目录导入”，导入示例源码文件。

2. 打开 “src/assets/js” 文件夹下的 “config.js” 文件，并使用本文 [3 前提条件](#3-前提条件) 已获取的 AppID 和 AppSign 正确填写，并保存。

    ```typescript
    export const appConfig = {
        appID: , // 填写申请的 AppID
        appSign: , // 填写申请的 AppSign
    }; 
    ```

    **若您的项目已切换为 “Token 鉴权”，请在 [ZEGO 控制台](https://console.zego.im) 上，申请临时 Token 用于调试。**

3. 进入项目根目录，并执行 `yarn install` 安装依赖。

4. 如果是在 iOS 设备上运行程序，请在项目根目录，执行 `cd ios && pod install` 命令安装依赖。

5. 在项目根目录，执行 `yarn ios` / `yarn android` 启动项目。
