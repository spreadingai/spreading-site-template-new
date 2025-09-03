# 集成 SDK

---

## 准备环境

在开始集成本地服务端录制 SDK 前，请确保开发环境满足以下要求：

- 任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统，支持 x86_64, aarch64, armhf, armel 架构
- libasound（ALSA）。
- libv4l2（v4l utils）。
- JDK 1.7 或以上版本。
- Apache Maven 3.6 或以上版本。

<Note title="说明">

- SDK 依赖 libasound (ALSA) 和 libv4l2 (v4l utils)。
- CentOS (RHEL/Fedora) 可以通过执行 `yum install alsa-lib-devel libv4l-devel` 命令安装。
- Ubuntu (Debian/Deepin) 可以通过执行 `apt install libasound2-dev libv4l-dev` 命令安装。
- 其他平台和系统请自行安装。
- 若需要交叉编译，请参考 [如何交叉编译 Linux alsa-lib 依赖库？](http://doc-zh.zego.im/faq/alsa_lib_cross_compile?product=ExpressAudio&platform=linux) 和 [如何交叉编译 Linux v4l-utils 依赖库？](http://doc-zh.zego.im/faq/v4l_utils_cross_compile?product=ExpressVideo&platform=linux) 两篇文档，同时目标机器需安装好 libasound 和 libv4l2 依赖库。
</Note>

## 集成 SDK

请通过 [下载](/local-recording-linux-java/downloadsdk) 文档，下载最新版本的 SDK。

<Note title="说明">

集成 SDK 后运行时需要依赖 Native 动态库，建议您参考 [跑通示例源码](/local-recording-linux-java/downloaddemo) 的运行指引。
</Note>

1. 打开 IntelliJ IDEA 并打开您的 Java 工程。

2. 添加 SDK 引用到工程中。

    a. 打开 IDEA，在菜单栏选择 “File > Project Structure...”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/Java/5.jpeg" /></Frame>

    b. 在弹出的 “Project Structure” 对话框中，选择菜单 “Libraries”，点击 “+”，选择 “Java”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/Java/6.jpeg" /></Frame>

    c. 选择 SDK 的 jar 包后，点击 “Open” 导入。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/Java/7.jpeg" /></Frame>
