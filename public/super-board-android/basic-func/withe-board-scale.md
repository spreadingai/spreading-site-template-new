# 白板缩放


- - -

本文主要介绍如何对正在显示的白板缩放。

下图以 Web 端为例展示同步缩放效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/zoom.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-android/quick-start/create-white-board) 创建了白板。

## 实现流程
默认开启缩放模式，可以通过手势缩放白板。

<Note title="说明">

当 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#set-tool-type) 为 [Click](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~enum~ZegoSuperBoardTool#click) 时，手势会被关闭，无法缩放白板。

</Note>

- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Zoom，即可开启 ZegoSuperBoard 的缩放功能。
- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Draw.getMode() | ZegoSuperBoardOperationMode.Zoom.getMode()，会开启绘制功能并同时打开缩放功能。

```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取superBoardView
if (superBoardView != null) {
    // 通过superBoardView拿到当前展示的subView
    ZegoSuperBoardSubView currentSubView = superBoardView.getCurrentSuperBoardSubView();
    // 同时打开绘制和缩放
    currentSubView.setOperationMode(ZegoSuperBoardOperationMode.Draw.getMode() | ZegoSuperBoardOperationMode.Zoom.getMode());

    // 只打开缩放，不能绘制
    // currentSubView.setOperationMode(ZegoSuperBoardOperationMode.Zoom.getMode());
}
```


如需各端同步缩放，可通过下面的方法打开同步缩放功能。

```java
//如需开启同步缩放功能
ZegoSuperBoardManager.getInstance().enableSyncScale(true);

//如需开启接收同步缩放功能
ZegoSuperBoardManager.getInstance().enableResponseScale(true);

```
