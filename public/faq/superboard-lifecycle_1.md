<Title>超级白板的生命周期是什么样的？</Title>


---

## 问题描述
超级白板的完整生命周期有几个阶段？分别是什么？

## 解决方案
超级白板的生命周期大致分为三个阶段：

创建白板 -> 白板处于活动中(可进行涂鸦、同步数据等工作) -> 白板销毁。

具体的生命周期介绍如下：

1. 创建白板：调用 ZegoSuperBoardManager 类的 createWhiteboardView 或者 createFileView 接口创建白板。
2. 白板活动中...
3. 主动销毁白板：调用接口 ZegoSuperBoardManager 类的 destroySuperBoardSubView 方法移除白板。 
4. 当房间所有人都离开之后，白板会被默认销毁。如您需仍然保留白板，请联系 ZEGO 技术支持。

白板正常工作的前提条件：

1. 初始化 ZegoExpress SDK、ZegoSuperBoard SDK。
2. 使用 ZegoExpress 的 loginRoom 接口登录房间。