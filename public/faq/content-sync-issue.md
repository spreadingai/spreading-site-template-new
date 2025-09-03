<Title>为什么各端看到的白板或者文件内容不同步？</Title>


---

## 问题描述

当前房间内有多个白板时，多个用户进入房间后，可能会看到不同的白板内容。例如老师端切换白板之后，学生端没有自动同步老师端切换后的白板。

## 问题原因

当一个客户端切换了白板之后没有通知到其他客户端，或者其他客户端收到了通知但未同步切换白板，就会出现白板内容不同步的情况。

## 解决方案
一个客户端创建、切换、销毁了白板之后，需要同步给其他客户端，其他客户端进行同步操作。

以 Web 平台为例：

白板的创建、销毁 SDK 内部已经做了同步，会主动推送给房间内的所有成员，开发者只需要注册相应的监听事件（viewAdd 和 viewRemoved）即可获取其他人创建的白板实例、销毁的白板对应 ID，然后执行相应的业务逻辑。

<Note title="说明">


本端创建、销毁白板操作不会触发本端的的监听事件。


</Note>




切换白板操作如下：

1. **获取已有白板。** 获取需要显示的 ZegoWhiteboardView，可以通过以下两种方法：
    - 调用 [getViewList](https://doc-zh.zego.im/article/api?doc=whiteboardview_API~javascript_web~class~ZegoExpressEngine#get-view-list) 获取房间内所有已创建的 ZegoWhiteboardView 列表，筛选出目标 ZegoWhiteboardView。
    - 在 [viewAdd](https://doc-zh.zego.im/article/api?doc=whiteboardview_API~javascript_web~interface~ZegoEvent#view-add) 监听中获取目标 ZegoWhiteboardView。

2. **显示目标白板。** 调用 [attachView](https://doc-zh.zego.im/article/api?doc=whiteboardview_API~javascript_web~class~ZegoExpressEngine#attach-view) 添加目标 ZegoWhiteboardView 到视图进行显示。

3. **将当前显示的白板信息告知房间内其他用户。** 将目标 ZegoWhiteboardView 的唯一标识 ID (可通过接口 [getID](https://doc-zh.zego.im/article/api?doc=whiteboardview_API~javascript_web~interface~ZegoWhiteboardView#get-id) 获取)发送给房间内其他成员，可以通过以下三种方法：
    - Express-Video SDK 的房间广播消息 [sendBroadcastMessage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-broadcast-message)。
    - Express-Video SDK 的自定义信令 [sendCustomCommand](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#send-custom-command)。
    - 其他信令传输通道。
4. **其他用户切换至相应白板。** 其他成员使用该 ID 通过步骤 1、2 找到目标 ZegoWhiteboardView 并且将视图展示到界面最上层。

## 相关链接

注册监听事件请参考 [on](https://doc-zh.zego.im/article/api?doc=whiteboardview_API~javascript_web~class~ZegoExpressEngine#on)。
