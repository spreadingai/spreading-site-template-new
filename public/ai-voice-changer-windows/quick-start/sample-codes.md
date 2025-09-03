# 跑通示例源码

- - -

<Note title="说明">请联系 ZEGO 商务人员，获取最新的 `大饼 AI 变声` 示例源码包，并开通相关权限，然后参考本文档跑通源码，体验 AI 变声效果。</Note>


## 准备环境

请确保开发环境满足以下技术要求：

* Windows：Windows 7 或以上版本，安装了 Visual Studio 2019 或以上版本。
* macOS：macOS 11.0 或以上版本，安装了 Xcode 15.0 或以上版本。
* Linux：任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统，支持 x86_64, aarch64, armhf 架构。

<Note title="说明">


    - Linux RTC SDK 仅支持自定义视频渲染，不支持 SDK 自动渲染（即预览、拉流的 ZegoCanvas 参数无效），因此示例 Demo 中除了自定义视频渲染专题外都不能显示画面。
    - 您可以参考 [自定义视频渲染 ](/real-time-video-linux-cpp/video/custom-video-rendering) 文档和此 Demo “ZegoExpressExample/Examples/AdvancedVideoProcessing/CustomVideoRendering” 目录下的示例代码，来实现在 Linux Qt 上渲染显示预览或拉流的画面。
</Note>



- 其他通用要求：
    * 安装了 CMake：[下载 CMake](https://cmake.org/download/)。
    * 安装了 Qt（5.9 ~ 5.15 版本）：[下载 Qt](https://download.qt.io/archive/qt/)，首次使用 Qt 的开发者可阅读其 [官方教程](https://doc.qt.io/qt-5/gettingstarted.html) 学习使用。
    * 麦克风、摄像头等支持音视频功能的外部设备正常。

<Warning title="注意">


    QtCreator 8.0.1 之前的版本，在 macOS 12 Monterey 或以上的系统上，可能会遇到在调试此 Demo 时无法请求摄像头、麦克风权限从而导致 Demo 崩溃的问题，详情参考 [此 issue](https://bugreports.qt.io/browse/QTCREATORBUG-26743)。

    解决方案：可下载安装 QtCreator 8.0.2 或以上版本，而不要使用 Qt5 安装包自带的 QtCreator。

    开发者可以从 [QtCreator Github Release](https://github.com/qt-creator/qt-creator/releases) 或 [Qt 官网](https://download.qt.io/official_releases/qtcreator/) 下载，或者使用 HomeBrew 安装：`brew update && brew install --cask qt-creator`


</Warning>



## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已参考 [控制台 - 云市场 - 大饼 AI 变声](/console/cloud-market/dabing-ai-voice-changer)，按照页面指引，自助开通 `大饼 AI 变声` 相关权限。

安装完 CMake 和 Qt 后需要添加环境变量，下面提供的 CMake 和 Qt 路径仅供参考，用户需要根据自己设备上的实际路径填写。

- **Windows 系统：**

   1. 修改环境变量：在 Path 中添加 `C:\Program Files\CMake\bin`
   2. 修改环境变量：在 Path 中添加 `C:\Qt\Qt5.12.12\5.12.12\msvc2017\bin`
   3. 添加用户变量：添加 `QTDIR` 用户变量为 `C:\Qt\Qt5.12.12\5.12.12\msvc2017`

- **macOS 系统：**

  ```bash
  export PATH="$PATH:$HOME/Qt5.12.12/5.12.12/clang_64/bin"
  export QTDIR="$HOME/Qt5.12.12/5.12.12/clang_64"
  ```

- **Linux 系统：**

  ```bash
  export QTDIR="/usr/local/Qt-5.12.12"
  export PATH="$PATH:$QTDIR/bin"
  export LD_LIBRARY_PATH="$QTDIR/lib:$LD_LIBRARY_PATH"
  ```

## 示例源码目录结构

下列结构为 **video** 子目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
.
├── README_zh.md
├── README.md
├── libs
│   ├── ScreenCapture
│   └── ZegoExpress
│       ├── linux # ZegoExpressVideo Linux SDK 存放目录
│       ├── mac # ZegoExpressVideo macOS SDK 存放目录
│       │   └── ZegoExpressEngine.xcframework
│       └── win # ZegoExpressVideo Windows SDK 存放目录
│           ├── x64
│           └── x86
└── ZegoExpressExample
    ├── KeyCenter.cpp # 填写申请的 AppID 和 AppSign
    ├── KeyCenter.h
    ├── ZegoExpressExample.pro # Qt 工程文件
    ├── Examples
    ├── HomePage
    ...
```

## 运行示例源码

1. 修改 “/ZegoExpressExample/KeyCenter.cpp” 文件，填写 SDK 初始化所需的 “AppID” 和 “AppSign”。

    <Warning title="注意">请使用本文 [前提条件](#前提条件) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。  </Warning>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/sample_code/sample_code_win.png" /></Frame>

2. 打开工程。

    使用 QtCreator 打开 “./ZegoExpressExample/ZegoExpressExample.pro” 工程文件。

3. 编译和运行项目工程。

    - **方式 1**：通过 QtCreator 直接 Run 或者 Build。

        打开 Qt 工程后，单击左下角的 “Run”、“Debug”、“Build” 按钮，构建并运行 Demo。

    - **方式 2**：通过 qmake 和 make 构建。


<Accordion title="Windows" defaultOpen="false">
1. 打开 cmd.exe，并执行 `cd \path\to\this\folder` 命令进到此文件所在的目录。
2. 找到 “vcvarsall.bat” 的路径 (例如 VS 2019 版本在 “C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat”)。
3. 执行 `call "\path\to\your\vcvarsall.bat" x86` 命令设置 MSVC 环境。
4. 执行 `qmake ZegoExpressExample\ZegoExpressExample.pro CONFIG+=Win32 -o .\build\Makefile` 命令通过 qmake 生成 Makefile。
5. 执行 `cd build` 进入 build 目录，并通过 `nmake` 命令构建工程。
6. 执行 `cd ..` 回到上级目录，并通过 `windeployqt .\bin\release\ZegoExpressExample.exe` 命令部署 Qt App。
</Accordion>


<Accordion title="macOS" defaultOpen="false">
1. 打开终端，并执行 `cd /path/to/this/folder` 命令，进入此文件所在目录。
2. 执行 `qmake ZegoExpressExample/ZegoExpressExample.pro CONFIG+=x86_64 -o ./build/Makefile` 命令，通过 qmake 生成 Makefile。
3. 执行 `cd build` 命令进入 build 目录，并通过 `make` 命令构建工程。
4. 执行 `cd ..` 命令回到上级目录，并通过 `macdeployqt ./bin/release/ZegoExpressExample.app` 命令部署 Qt App。
</Accordion>


<Accordion title="Linux" defaultOpen="false">
1. 打开终端，并进入文件所在的目录 `cd /path/to/this/folder`。
2. 选择编译环境。

    * 本机编译 (支持 x86_64, aarch64, armhf)：

        1. 执行 `qmake ZegoExpressExample/ZegoExpressExample.pro -o ./build/Makefile`，通过 qmake 生成 Makefile。
        2. 执行 `cd build`，进入 build 目录并执行 `make` 构建工程。
        3. 在上层目录的 `bin/release` 目录下，找到 `ZegoExpressExample` 工程文件，即可运行。

    * 交叉编译：

        1. 目前支持在 x86_64 环境下为 aarch64 或 armhf 目标平台交叉编译 (若需要支持其他环境，请自行修改 `ZegoExpressExample.pro` 中的配置)。
        2. 确认您的机器已安装为目标平台交叉编译用的 Qt everywhere，下面假设为 aarch64 目标平台交叉编译并且对应的 Qt 已经安装到了 `/usr/aarch64-linux-gnu/Qt-5.12.12` 目录。
        3. 执行 `export TARGET_LINUX_ARCH=aarch64` ，此环境变量是为帮助 `ZegoExpressExample.pro` 识别当前要构建的目标平台。
        4. 执行 `/usr/aarch64-linux-gnu/Qt-5.12.12/bin/qmake ZegoExpressExample/ZegoExpressExample.pro -o ./build/Makefile -spec linux-aarch64-gnu-g++`，通过 qmake 生成目标平台为 aarch64 的 Makefile。
        5. 执行 `cd build`，进入 build 目录并执行 `make` 构建工程。
        6. 将 `bin/release` 目录下的产物和 `/usr/aarch64-linux-gnu/Qt-5.12.12/lib` 目录拷贝到您的目标平台上，即可运行。
</Accordion>
