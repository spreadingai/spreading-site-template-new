# 示例源码运行指引

---

<Warning title="注意">

- **请联系 ZEGO 技术支持获取示例代码压缩包**，并解压获取示例源码文件夹。
- 本示例源码仅用于演示超级白板产品功能，源码对外开放，可供开发者接入时参考。但是示例源码本身未经过严格测试，若开发者计划将该示例源码用于生产环境，请确保发布前自行进行充分测试，避免发生潜在问题可能造成损失。
- 本示例源码只针对桌面端浏览器做过适配，若需要在移动端使用，需要开发者自行做移动端适配工作。
</Warning>

## 准备环境

在开始集成 SDK 前，请确保开发环境满足以下技术要求：

- React Native 0.60 或以上版本。
- iOS 11.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- Android 版本不低于 5.0 且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
- iOS/Android 设备已经连接到 Internet。
- 安装 [Node.js](https://nodejs.org/en/)，推荐使用其官网首页展示的长期支持版

## 前提条件

- 已在 ZEGO 控制台 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目项目信息](https://doc-zh.zego.im/article/12107)。
- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。

## 示例源码目录结构

```bash
zego_superboard_rn_example
├─ Gemfile
├─ README.md
├─ app.json
├─ babel.config.js
├─ index.js
├─ metro.config.js
├─ package.json
├─ src
│  ├─ App.tsx
│  └─ config.ts
└─ yarn.lock

```

## 运行示例代码

###  填写配置文件

在 “src/config.ts” 文件中，填入本文 [前提条件](#前提条件) 已获取的 AppID  和 appSign。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/superboard/superboard_rn_1.png" />
</Frame>


### 安装依赖

1. 完成配置后。进入工程根目录，启动终端并输入：

    ```
    yarn
    ```

2. **（可选）** 如果您需要运行 iOS 应用，请在终端输入以下命令：

    ```
    cd ios
    pod install
    ```

    完成 install 后，输入以下命令返回到上级页面

    ```
    cd ..
    ```

### 在 Android 设备上运行

1. 按照 React Native 官方文档 [Setting up the development environment - React Native CLI Quickstart](https://www.reactnative.dev/docs/environment-setup) 指引，配置开发环境。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RoomKit/ReactNative/Android_Env.png" /></Frame>

2. 将一台 Android 设备（推荐使用真机）连接到电脑。
3. 在终端输入以下命令：

    ```
    yarn android
    ```


### 在 iOS 设备上运行

1. 按照 React Native 官方文档 [Setting up the development environment - React Native CLI Quickstart](https://www.reactnative.dev/docs/environment-setup) 指引，配置开发环境。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/RoomKit/ReactNative/iOS_Env.png" /></Frame>

2. 将一台 iOS 设备（推荐使用真机）连接到电脑。
3. 在终端输入以下命令：

    ```
    yarn ios
    ```

## 常见问题

#### 对于处于中国大陆的开发者，如果因为网络原因下载依赖失败，进而在 Android 设备上运行代码失败，应该如何处理？

在项目的 "/android/build.gradle" 文件的 `allprojects` 节点下添加以下代码，获取相关依镜像依赖：

```groovy
maven { url 'https://maven.aliyun.com/repository/public' }
maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
```
