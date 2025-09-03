<Title>如何搭配使用 超级白板 SDK 和 实时音视频 SDK？</Title>



- - -

## 问题描述

1. 为了使用超级白板功能，除了官网下载超级白板 SDK 外，还需要下载实时音视频 SDK 吗？
2. 实时音视频 SDK 初始化、超级白板 SDK 初始化、登录房间这三个动作之间的顺序是？

## 解决方案
1. 实时音视频 SDK 能够提供互动白板所需的实时信令传输的能力，超级白板 SDK 必须搭配此 SDK 使用。因此，如果需要集成白板功能，需要下载并集成这两个 SDK。

<Note title="说明">
 

    超级白板 SDK 本地下载包中已包含了对应版本的实时音视频 SDK，无需单独下载。

    
</Note>


2. 集成超级白板 SDK 和实时音视频 SDK 之后，初始化顺序如下：

    1. 初始化实时音视频 SDK。
     
    2. 初始化超级白板 SDK。

    3. 登录房间后，即可使用超级白板和音视频服务。

## 相关链接

[实现流程-实时音视频](/real-time-video-android-java/quick-start/implementing-video-call)

[创建白板-超级白板](/super-board-ios/quick-start/create-white-board)
