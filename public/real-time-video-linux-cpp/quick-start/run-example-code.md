# 示例源码运行指引

---


<Note title="说明">


此示例源码为一个简单的命令行程序，您可以参考桌面端跨 C++ 平台的 [示例源码文档](/real-time-video-windows-cpp/quick-start/run-example-code)，获取更丰富的 Qt 示例源码。

</Note>

本文介绍如何快速跑通示例源码，体验基础的音视频通话服务。

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- 任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统，支持 x86_64、aarch64、armhf、armel 架构。
- libasound（ALSA）。
- libv4l2（v4l utils）。
- CMake 3.7 或更高版本。

<Note title="说明">
- SDK 依赖 libasound (ALSA) 和 libv4l2 (v4l utils)。
- CentOS (RHEL/Fedora) 可以通过执行 `yum install alsa-lib-devel libv4l-devel` 命令安装。
- Ubuntu (Debian/Deepin) 可以通过执行 `apt install libasound2-dev libv4l-dev` 命令安装。
- 其他平台和系统请自行安装。
- 若需要交叉编译，请参考 [如何交叉编译 Linux alsa-lib 依赖库？](http://doc-zh.zego.im/faq/alsa_lib_cross_compile?product=ExpressAudio&platform=linux) 和 [如何交叉编译 Linux v4l-utils 依赖库？](http://doc-zh.zego.im/faq/v4l_utils_cross_compile?product=ExpressVideo&platform=linux) 两篇文档，同时目标机器需安装好 libasound 和 libv4l2 依赖库。
</Note>

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>

## 构建示例源码工程

### 获取示例源码
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/linux_cli_cpp/ZegoExpressDemo_linux_cli_cpp.zip" target="_blank">
本地下载
</Card>
### 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```tree
.
├── README.md
├── README_zh.md
└── ZegoExpressExample
    ├── .gitignore
    ├── Broadcaster.cc # 摄像头直播示例
    ├── Broadcaster.h
    ├── CMakeLists.txt
    ├── ExampleBase.h
    ├── MediaPublisher.cpp # 媒体数据推流器示例
    ├── MediaPublisher.h
    ├── Options.h
    ├── libs
    ├── main.cpp # 程序入口
    └── wingetopt
```

### 构建示例源码前，检查依赖是否满足

找到对应架构的 SDK Native 动态库的目录 (即存放 `libZegoExpressEngine.so` 的目录)，打开终端执行以下命令查看输出，如果有 `not found` 等信息，说明依赖未满足，请检查并安装缺失的依赖。

<Note title="说明">


该工程为 CMake 工程，您可以使用 `VS Code` 或其他任意 IDE 打开，`./ZegoExpressExample` 目录，以便查看源码。

</Note>

```sh
$ ldd libZegoExpressEngine.so
```

### 方式 1：本机编译（支持 x86_64、aarch64、armhf 及 armel）

1. 执行 `cd ./ZegoExpressExample` 命令，进入项目工程根目录 (即 “main.cpp” 文件所在的目录)。

2. 通过 CMake 生成 Makefile 到当前目录的 “build” 目录下。

    ```sh
    $ cmake -B"build"
    ```

3. 通过 Make 编译示例代码工程。

    ```sh
    $ make -C ./build
    ```

### 方式 2：交叉编译

1. 目前支持在 x86_64 环境下为 aarch64, armhf 或 armel 目标平台交叉编译（若需要支持其他环境，请自行修改 `CMakeLists.txt` 中的配置）。

2. 确认您的机器已安装为目标平台交叉编译用的 gcc/g++ ，下面假设为 aarch64 目标平台交叉编译。

3. 执行 `export TARGET_LINUX_ARCH=aarch64`，此环境变量是为了给 `CMakeLists.txt` 识别当前要构建的目标平台。

4. 通过 CMake 生成 Makefile 到当前目录的 “build” 目录下。

    ```sh
    $ cmake -B"build"
    ```

5. 通过 Make 编译示例代码工程。

    ```sh
    $ make -C ./build
    ```

## 运行示例源码

1. 构建成功后，示例代码的可执行二进制文件将被生成到 “./ZegoExpressExample/out” 目录。

2. 打开终端，执行示例代码的可执行二进制文件，然后按照打印的帮助信息继续操作。

    运行效果如下：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/Express/run_express_cpp_cli_demo.png" /></Frame>

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。

