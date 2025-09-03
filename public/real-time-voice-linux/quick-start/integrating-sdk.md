# 集成 SDK

- - -

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- 任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统，支持 x86_64, aarch64, armhf, armel 架构。
- libasound（ALSA）。
- libv4l2（v4l utils）。
- CMake 3.7 或以上版本。

<Note title="说明">

- SDK 依赖 libasound (ALSA) 和 libv4l2 (v4l utils)。
- CentOS (RHEL/Fedora) 可以通过执行 `yum install alsa-lib-devel libv4l` 命令安装。
- Ubuntu (Debian/Deepin) 可以通过执行 `apt install libasound2-dev libv4l-dev` 命令安装。
- 其他平台和系统请自行安装。
- 若需要交叉编译，请参考 [如何交叉编译 Linux alsa-lib 依赖库？](http://doc-zh.zego.im/faq/alsa_lib_cross_compile?product=ExpressAudio&platform=linux) 和 [如何交叉编译 Linux v4l-utils 依赖库？](http://doc-zh.zego.im/faq/v4l_utils_cross_compile?product=ExpressVideo&platform=linux) 两篇文档，同时目标机器需安装好 libasound 和 libv4l2 依赖库。

</Note>



使用 Qt + qmake 集成 SDK 时，请下载 [Qt](http://download.qt.io/official_releases/qt) 5.9 ～ 5.15 之间的任意版本，详细信息请参考 [Getting Started with Qt](https://doc.qt.io/qt-5/gettingstarted.html)。

## 集成 SDK

1. 请通过 [下载](/real-time-video-linux-cpp/client-sdk/download-sdk) 文档下载最新版本的 SDK。

    建议参考 [跑通示例源码](/real-time-video-linux-cpp/quick-start/run-example-code) 的工程来集成 SDK。

2. 解压 SDK，并把 “release/Library“ 目录下的所有内容拷贝到您的工程中。

    - **使用 CMake 集成 SDK 时，请按如下流程导入 SDK**

        在您的工程的 “CMakeLists.txt” 文件中引入 SDK。

        ```cmake
        cmake_minimum_required(VERSION 3.7)
        project(MyAwesomeProject)

        # Add header search path
        include_directories("./libs/zego/include")
        # Add lib search path
        link_directories("./libs/zego")
        # Link SDK
        link_libraries(ZegoExpressEngine rt)

        add_compile_options(
        -std=c++11
        )

        aux_source_directory(./src SRC_LIST)

        add_executable(MyAwesomeProject ${SRC_LIST})
        ```

    - **使用 Qt + qmake 集成 SDK 时，请按如下流程导入 SDK**

        在您的工程的 `<project_name>.pro` 文件中添加以下配置，导入 SDK 库与头文件。

        ```qmake
        unix {
            contains(QT_ARCH, arm64) {
                INCLUDEPATH += $PWD/../libs/ZegoExpress/linux/aarch64/include
                DEPENDPATH  += $PWD/../libs/ZegoExpress/linux/aarch64/include
                LIBS += -L$PWD/../libs/ZegoExpress/linux/aarch64 -lZegoExpressEngine
            } else:contains(QT_ARCH, arm) {
                INCLUDEPATH += $PWD/../libs/ZegoExpress/linux/armhf/include
                DEPENDPATH  += $PWD/../libs/ZegoExpress/linux/armhf/include
                LIBS += -L$PWD/../libs/ZegoExpress/linux/armhf -lZegoExpressEngine
            } else { # Assume other archs are x86_64
                INCLUDEPATH += $PWD/../libs/ZegoExpress/linux/x86_64/include
                DEPENDPATH  += $PWD/../libs/ZegoExpress/linux/x86_64/include
                LIBS += -L$PWD/../libs/ZegoExpress/linux/x86_64 -lZegoExpressEngine
            }
        }
        ```
3. （可选）Linux 端 SDK 没有屏蔽 SIGPIPE 信号，开发者在实际开发过程中需要根据实际情况，选择是否屏蔽 SIGPIPE 信号。

<Warning title="注意">


    大多数情况下，您需要屏蔽此信号，否则，客户端进程在收到此信号后会默认退出。您也可以直接忽略该信号：`signal(SIGPIPE,SIG_IGN);`。

</Warning>



    ```cpp
    static void ExceptionSigHandler(int signum)
     {
         char exitSignalStr[1024] = {0};
         sprintf(exitSignalStr,"exception signal : %d",signum);
         log("------------------------------");
         log(exitSignalStr);
         log("------------------------------");
     }
     int main(int argc, const char * argv[]) {
         signal(SIGPIPE, ExceptionSigHandler);
         // your code

         return 0;
     }
    ```

<Content />