# 白板缩放


- - -

本文主要介绍如何对正在显示的白板缩放。

下图以 Web 端为例展示同步缩放效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/zoom.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-ios/quick-start/create-white-board) 创建了一个白板。

## 实现流程


默认开启缩放模式，可以通过手势缩放白板。

<Note title="说明">

当 [toolType](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#tool-type) 为 [ZegoSuperBoardToolClick](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~enum~ZegoSuperBoardTool#zego-super-board-tool-click) 时，手势会被关闭，无法缩放白板。

</Note>

ZegoSuperBoard 的缩放功能控制开关如下。

- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 设置为 `ZegoSuperBoardOperationModeZoom`，即可开启 ZegoSuperBoard 的缩放功能。
- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 设置为 `ZegoSuperBoardOperationModeDraw | ZegoSuperBoardOperationModeZoom`，会开启绘制功能并同时打开缩放功能。

```objc
ZegoSuperBoardSubView *superBoardSubView = [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView;

//同时打开绘制和缩放
[superBoardSubView setOperationMode:ZegoSuperBoardOperationModeDraw|ZegoSuperBoardOperationModeZoom];

//只打开缩放，不能绘制
//[superBoardSubView setOperationMode:ZegoSuperBoardOperationModeZoom];


```

如需各端同步缩放，可通过下面的方法打开同步缩放功能。

```objc
//如需开启同步缩放功能
[ZegoSuperBoardManager sharedInstance].enableSyncScale = YES;
//如需开启接收同步缩放功能
[ZegoSuperBoardManager sharedInstance].enableResponseScale = YES;

```
