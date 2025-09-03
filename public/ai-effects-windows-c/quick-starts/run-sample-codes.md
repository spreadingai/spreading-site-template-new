# 跑通示例源码

---

## 准备环境

在运行示例源码前，请确保开发环境满足以下技术要求：

:::if{props.platform=undefined}
<div>
* Windows 8 或以上版本，已安装 Visual Studio 2015 或以上版本。
</div>
:::
:::if{props.platform="macOS"}
<div>
* 已安装 Xcode 14.0 或以上版本。
</div>
:::
* 已安装 [CMake](https://cmake.org/download/)。
* 已安装 [Qt](http://download.qt.io/official_releases/qt) 5.12 或以上版本，详细信息请参考 [Getting Started with Qt](https://doc.qt.io/qt-5/gettingstarted.html)。

## 前提条件

- 已在 [下载](/ai-effects-windows-c/downloads) 页面，获取最新版本的 SDK 和示例源码。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已联系 ZEGO 技术支持，开通 ZegoEffects 相关套餐服务权限。
- 安装完 CMake 和 Qt 后需要添加环境变量：
    <Note title="说明">
    下面提供的 CMake 和 Qt 路径仅供参考，用户需要根据自己设备上的实际路径填写。
    </Note>
    :::if{props.platform=undefined}
    <div>
    - 修改“环境变量”：在 `Path` 中添加 `C:\Program Files\CMake\bin`。
    - 修改“环境变量”：在 `Path` 中添加 `C:\Qt\Qt5.12.10\5.12.10\msvc201d5\bin`。
    - 修改“环境变量”：在 `Path` 中添加 `C:\Qt\Qt5.12.10\5.12.10\msvc2015_64\bin`。
    - 添加“用户变量”：添加 `QT_DIR` 用户变量为 `C:\Qt\Qt5.12.10\5.12.10\msvc2015`。
    - 添加“用户变量”：添加 `QT_DIR_x64` 用户变量为 `C:\Qt\Qt5.12.10\5.12.10\msvc2015_64`。
    </div>
    :::
    :::if{props.platform="macOS"}
    ```bash
    export PATH="/Users/<your-name>/Qt5.12.10/5.12.10/clang_64/bin:$PATH"
    export QTDIR="/Users/<your-name>/Qt5.12.10/5.12.10/clang_64/"
    ```
    :::

## 运行示例源码

<Steps>
<Step title="添加 SDK 资源">
已在 [下载](/ai-effects-windows-c/downloads) 页面，获取最新版本的 SDK 和示例源码。   
**若获取到的示例源码中已经有对应的 SDK 文件，请跳过此步到下一步操作**。
:::if{props.platform=undefined}
在主目录新建 "/libs/win" 文件路径，将获取到的 SDK 包解压到此目录（可参考 ".pro" 文件里面依赖库的配置）。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/SampleCodes/sampleCodes_win_2.png" /></Frame>
:::
:::if{props.platform="macOS"}
在主目录新建 "/libs/mac" 文件路径，将获取到的 SDK 包解压到此目录（可参考 ".pro" 文件里面依赖库的配置）。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/SampleCodes/sampleCodes_mac_2.png" /></Frame>
:::
</Step>
<Step title="使用 IDE 打开项目">
示例源码中自带了 Qt 工程文件，支持在 Windows 和 macOS 上使用 Qt Creator 打开。  
使用 QtCreator 打开 "src/qt/ZegoEffectsExample" 目录下的 "ZegoEffectsExample.pro" 文件。
</Step>
<Step title="配置鉴权信息">
下载的示例源码中缺少 SDK 初始化所需的鉴权信息（AppID、AppSign），需要修改 "ZegoEffectsExample" 目录下的 "ZegoLicense.h" 文件。请使用本文 [前提条件](#前提条件) 所获取到的信息正确填写，否则源码无法正常运行。
<Warning>
请注意：此处需要填写鉴权文件，SDK 校验通过才可以正常使用 SDK 的功能。ZEGO 建议开发者定时更新、拉取鉴权数据，防止鉴权文件过期，导致 SDK 校验不通过的问题。
</Warning>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Qt/effects_enter_license_windows.png" /></Frame>
</Step>
<Step title="编译运行">
编译和运行项目工程。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/SampleCodes/open_by_qt.png" /></Frame>
</Step>
</Steps>
