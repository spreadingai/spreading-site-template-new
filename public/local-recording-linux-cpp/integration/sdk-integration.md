# 集成
- - - 
## 1 开发环境要求
请确保开发环境满足以下条件： 

* CentOS 6.5+ 64位
* Ubuntu 14.04+ 64位
* Linux 上已安装 cmake 

## 2 下载 SDK
本地服务端录制 SDK 下载地址：[ZegoLiveRoom-ServerRecording-Linux](https://artifact-sdk.zego.im/downloads/ZegoLiveRoom-ServerRecording-Linux.zip)

SDK 下载并解压完成后如下图：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/download.png" />
</Frame>

解压完后如图标号2所示，包含 include、libs 目录，其中，
* include 目录：包含 SDK 头文件--`LiveRoom.h`。
* libs 目录：包含 SDK 的 so 文件--`libzegoliveroomrecorder.so`。

## 3 集成 SDK

### 3.1 添加头文件
将 SDK 包中 include 目录下的头文件（LiveRoom.h）添加至已有的 project 的头文件目录下，project 需要添加其头文件目录的链接路径。

### 3.2 链接动态库
将 SDK 包中 libs 目录下的 so 文件（libzegoliveroomrecorder.so）添加至已有的 project 的库文件目录下或者自定义的某目录下， project 需要添加该 so 文件的链接路径。

### 3.3 （可选）屏蔽 SIGPIPE 信号
（可选）Linux 端 SDK 没有屏蔽 SIGPIPE 信号，开发者在实际开发过程中需要根据实际情况，选择是否屏蔽 SIGPIPE 信号。大多数情况下，您需要屏蔽此信号，否则，客户端进程在收到此信号后会默认退出。您也可以直接忽略该信号：`signal(SIGPIPE,SIG_IGN);`。

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

## 4 集成示例
以本地服务端录制 Demo 的集成方式为例。
### 4.1 新建工程
假定工程代码放到 `~/zegoServerRecordingDemo` 目录下。
* $ mkdir ~/zegoServerRecordingDemo

### 4.2 拷贝 SDK
将 `include/` 和 `libs/`文件夹拷贝至 `~/zegoServerRecordingDemo` 目录下。
* $ cp -r include libs ~/zegoServerRecordingDemo 
* $ cd ~/zegoServerRecordingDemo

### 4.3 新建 main.cpp
新建 main.cpp 文件并打印 SDK 的版本号。
* $ touch main.cpp
* $ vim main.cpp
* 输入如下内容：

  ```cpp
  #include <stdlib.h>
  #include <stdio.h>
  #include "LiveRoom.h"

  using namespace ZEGO;

  int main(int argc, const char * argv[])
  {
     printf("Zego SDK Version: %s\n", LIVEROOM::GetSDKVersion());
     return 0;
  }
  ``` 

### 4.4 创建 CMakeLists.txt
* $ touch CMakeLists.txt
* $ vim CMakeLists.txt
* 输入如下内容

  ```cpp
  cmake_minimum_required(VERSION 3.5.2)
  project (zegoServerRecordingDemo)

  include_directories("./include")

  link_directories("./libs")

  link_libraries(zegoliveroomrecorder rt)

  add_compile_options(
    -std=c++11
    )

  aux_source_directory(. SRC_LIST)

  add_executable(zegoServerRecordingDemo ${SRC_LIST})
  ```

### 4.5 编译
* $ mkdir build & cd build
* $ cmake .. & make

编译成功会生成一个可执行文件。

### 4.6 运行 
* $ ./zegoServerRecordingDemo

集成成功会打印出 "Zego SDK Version: xxx"。

## 5 使用 SDK
成功导入 SDK 后可参考如下文档实现本地服务端录制功能。
* [快速开始-录制单流](/local-recording-linux-cpp/integration/singlestreamrecording)
* [快速开始-录制混流](/local-recording-linux-cpp/integration/mixstreamrecording)
