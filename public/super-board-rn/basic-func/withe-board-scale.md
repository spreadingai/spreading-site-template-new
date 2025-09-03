# 白板缩放


- - -

本文主要介绍如何对正在显示的白板缩放。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/zoom.gif" /></Frame>

## 前提条件

已参考 [创建超级白板](/super-board-rn/quick-start/create-white-board) 创建了一个白板。

## 实现流程

默认开启缩放模式，可以通过手势缩放白板。

<Note title="说明">

当 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#set-tool-type) 为 [Click](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~enum~ZegoSuperBoardTool#click) 时，手势会被关闭，无法缩放白板。
</Note>

- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Zoom，即可开启 ZegoSuperBoard 的缩放功能。
- 可使用“按位或运算符”同时设置多种模式。例如，设置为 Zoom | Draw 时，可同时支持放缩模式和绘制模式。

```javascript
// 通过superBoardView拿到当前展示的subView
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView().getCurrentSuperBoardSubView();
if (!zegoSuperBoardSubView) return;

// 只打开缩放，不能绘制
// ZegoSuperBoardOperationMode.Zoom = 8
zegoSuperBoardSubView.setOperationMode(8);

// 同时打开绘制和缩放
// ZegoSuperBoardOperationMode.Draw = 4
// ZegoSuperBoardOperationMode.Zoom = 8
zegoSuperBoardSubView.setOperationMode(4|8);
```

如需各端同步缩放，可通过下面的方法打开同步缩放功能。

```javascript
//如需开启同步缩放功能
ZegoSuperBoardManager.getInstance().enableSyncScale(true)

//如需开启接收同步缩放功能
ZegoSuperBoardManager.getInstance().enableResponseScale(true);

```
