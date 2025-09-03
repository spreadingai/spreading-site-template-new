<Title>如何通过白板来加载文件？</Title>



- - -

## 问题描述
同时集成了互动白板 SDK 和文件共享 SDK 后，如何通过互动白板来加载共享的文件？

## 解决方案

在实际的使用过程中，用户经常需要将白板和文件结合使用，我们这里介绍常见的两种情况：
#### 1、 用户主动创建带文件的白板
这部分的使用指南请参考：

- iOS: [互动白板与文件共享的搭配使用](https://doc-zh.zego.im/article/9870)
- Android: [互动白板与文件共享的搭配使用](https://doc-zh.zego.im/article/9871)

#### 2、 开发者收到新增文件白板（`onWhiteboardAdd`）的通知

此时可按照以下步骤加载文件：

a. 收到远端新增白板时，从 `whiteboardView` 的参数 `whiteboardModel` 中的 `fileInfo` 字段拿到加载文件时所需要用到的 `fileID` 。

b. 创建 `ZegoDocsView`，并且将 `ZegoDocsView` 展示到界面上。

c. 调用 `ZegoDocsView` 的 `loadFile` 接口加载文件。

d. 文件加载成功后，根据文件真实的内容布局来调整 `whiteboardView` 的布局。

具体实现方法请参考 [示例 Demo](https://github.com/zegoim/zego-whiteboard-example/tree/release/express/src)
