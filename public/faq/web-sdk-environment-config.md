<Title>如何设置 Web 平台互动白板 SDK 和 文件转码 SDK 的环境？</Title>


---

## 问题描述

使用互动白板 SDK和文件共享 SDK 时，需要设置 SDK 环境，这两个SDK的环境是相同的么？会互相影响么？

## 解决方案

<Note title="说明">


互动白板 SDK 与 文件转码 SDK 是独立的两个 SDK，都有各自的测试环境、正式环境，相互之间不影响。


</Note>



1. 互动白板 SDK 设置环境：
互动白板 SDK 包含了实时音视频 SDK 的所有功能，设置方案与实时音视频 SDK 完全一致，是通过初始化时传入 server 来区分的，传入测试环境 server 即表示当前是测试环境。

2. 文件转码 SDK 设置环境：在初始化时传入 isTestEnv 的值，默认 false 表示正式环境，设置为 true 表示当前为测试环境。

## 相关链接

1. 实时音视频 SDK 设置环境请参考 [实时音视频 SDK 初始化](/real-time-video-web/quick-start/implementing-video-call)。
2. 文件共享 SDK 设置环境请参考 [文件共享 SDK 初始化](https://doc-zh.zego.im/article/9395)。
