<Title>超级白板和互动白板和文件共享是什么关系？</Title>


---
## 导读

- 如果您是新用户，我们推荐使用超级白板，请通过 [概述](/super-board-ios/product-desc/overview) 了解 ZEGO 超级白板服务。
- 如果您是 ZEGO 互动白板和文件共享服务的老用户，您可通过本文档了解超级白板和这两个服务的关系。
- ZEGO 也将持续维护互动白板 SDK 和文件共享 SDK，但推荐新用户使用超级白板。
    - [互动白板文档](https://doc-zh.zego.im/article/4395)
    - [文件共享文档](https://doc-zh.zego.im/article/4400)

## SDK 之间的关系

超级白板 SDK 合并了互动白板 SDK 和文件共享 SDK，目的是降低用户接入门槛。之前的 SDK，客户需要大量的代码实现白板和文件的联动，以及多端之间的同步。合并后的SDK这些逻辑都会在 SDK 里实现,可以减少客户80%的接入代码量。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/superboard_sync.png" /></Frame></Frame>

上图中橙色字体的部分表示单独使用互动白板 SDK 和文件共享 SDK 时需客户自行实现，使用超级白板 SDK 时自动实现的同步操作，包括：

- 文件视图和白板视图的同步创建与销毁；
- 文件视图和白板视图之间的同步滚动与翻页；
- 文件视图大小变更时白板视图的可见区域设置；
- 一端切换文件/白板时其他端的同步切换。
