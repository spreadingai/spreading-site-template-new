# 跑通示例源码
---
## 下载示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/downloads/ZegoServerRecordingDemo.zip" target="_blank">
本地下载 Linux - C++ 
</Card>

## 示例源码运行指引

本文介绍如何快速跑通示例源码，体验基础的音视频流录制功能。

### 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

### 运行示例源码

假定将本地服务端录制 Demo 放到  “/root” 目录下。

本地服务端录制 Demo 的目录内容如下图：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/demoMenu.png" />
</Frame>

1. 执行 `cd ～/ZegoServerRecordingDemo` 命令，切换到 “ZegoServerRecordingDemo” 目录。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/use_step1.jpg" />
</Frame>

2. 执行 `chmod 777 playrecorder`命令，给 playrecorder 添加可执行权限。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/use_step2.jpg" />
</Frame>

3. 执行 `export LD_LIBRARY_PATH=./libs/:$LD_LIBRARY_PATH`命令，将 “libs” 文件夹添加到库文件搜索路径。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/use_step3.jpg" />
</Frame>

4. 执行 `./playrecorder -a appID -r roomID -u userID -k token` 命令，开始录制。 

- “appID”，指您在 [前提条件](#前提条件) 获取到的 AppID。
- “roomID”，指您需要进行数据流录制的房间 ID。
- “userID”，指您登录房间所对应的用户 ID。
- “token”，指登录录制流所属房间的鉴权 Token。
- 如果您不设置其它附加参数，默认录制时长为 20s，录制单流，生成一个 .mp4 音视频文件。 

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/ServerRecording/use_step4.jpg" />
</Frame>

<Warning title="注意">

- 录制后生成的文件保存在 `~/zego/log_[roomID]_[timestamp]` 文件夹下，其中：
    - roomID，运行 Demo 时指定的房间 ID。
    - timestamp，运行 Demo 时的时间戳。
- 不支持自定义录制生成文件的目录。
- 若填写的房间 roomID 中没有流，录制不会进行。  
</Warning>

## 命令行参数说明

可选命令行附加参数如下：

- `-a`：项目的 AppID。
- `-r`：录制流所属的房间 ID。
- `-u`：登录录制流所属房间的用户 ID。
- `-k`：登录录制流所属房间的鉴权 Token。
- `-d`：录制时长，单位为分钟。
- `-m`：录制模式。
    - 1 表示只录制单流。
    - 2 表示只录制混流。
    - 3 表示同时录制单流和混流。
- `-s`：单流录制类型。
    - 1 表示只录制音频。
    - 2 表示只录制视频。
    - 3 表示录制音、视频。
- `-x`：混流录制类型。
    - 1 表示只录制音频。
    - 2 表示只录制视频。
    - 3 表示录制音、视频。
- `-o`：录制输出方式。
    - 1 表示只生成录制文件。
    - 2 表示只返回音视频数据。
- `-t`：输出的录制文件类型。
- `-g`：生成 mp4 文件同时生成 mp3 文件。
- `-b`：缓存大小，取值范围是 64KB ~ 1 MB，默认是 1 MB。
