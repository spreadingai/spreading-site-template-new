<Title>互动白板的生命周期是什么样的？</Title>



- - -
## 问题描述
互动白板的完整生命周期有几个阶段？分别是什么？

## 解决方案
互动白板的生命周期大致分为三个阶段：

创建白板 -> 白板处于活动中(可进行涂鸦、同步数据等工作) -> 白板销毁。

具体的生命周期介绍如下：

1. 创建白板：调用接口 `ZegoWhiteboardManager` 类的 `createWhiteboardView` 接口创建 `ZegoWhiteboardView` 。 创建成功之后，同一房间内的用户会收到 `onWhiteboardAdded` 的代理回调。
2. 白板活动中...
3. 主动销毁白板：调用接口 `ZegoWhiteboardManager` 类的 `destroyWhiteboardView` 方法移除白板。 移除成功之后，同一房间内的用户会收到 `onWhiteboardRemoved` 的回调通知。
4. 房间不存在后白板被 SDK 销毁。如果所有人退出房间后，房间内仍然存在白板（没有主动销毁的白板），**白板会保留15分钟** ，之后 SDK 会自动将他们销毁掉。

<Note title="说明">


白板正常工作的前提条件：

1. 初始化 ZegoExpress SDK、ZegoWhiteboardView SDK。
2. 使用 ZegoExpress 的 `loginRoom` 接口登录房间。


</Note>



## 相关链接

[互动白板SDK实现流程](https://doc-zh.zego.im/article/8895#3_3)
