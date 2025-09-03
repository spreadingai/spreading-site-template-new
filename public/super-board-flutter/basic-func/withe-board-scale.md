# 白板缩放


- - -

本文主要介绍如何对正在显示的白板缩放。

下图以 Web 端为例展示同步缩放效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/zoom.gif" /></Frame>

## 前提条件

已参考 [创建超级白板](/super-board-flutter/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 默认开启

超级白板默认开启缩放模式，可以通过手势缩放白板。

### 关闭缩放

当 `toolType` 为 [ZegoSuperBoardTool.Click](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_defines/ZegoSuperBoardTool.html#click) 时，手势会被关闭，无法缩放白板。

### 开启缩放

当缩放功能关闭时，调用 [setOperationMode](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setOperationMode.html) 方法传入 `ZegoSuperBoardOperationMode.zoom.value`，即可开启缩放功能。

```dart
// 调用 setOperationMode 接口设置操作模式为缩放模式
ZegoSuperBoardManager.instance.setOperationMode(ZegoSuperBoardOperationMode.zoom.value);
```

### 同时开启缩放与绘制

调用 [setOperationMode](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setOperationMode.html) 方法传入 `ZegoSuperBoardOperationMode.zoom.value|ZegoSuperBoardOperationMode.draw.value`，会开启绘制功能并同时打开缩放功能。

```dart
ZegoSuperBoardManager.instance.setOperationMode(ZegoSuperBoardOperationMode.zoom.value|ZegoSuperBoardOperationMode.draw.value);
```

## 同步缩放

如需各端同步缩放，本端需调用 [enableSyncScale](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/enableSyncScale.html) 开启同步缩放功能，其他端需要调用 [enableResponseScale](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/enableResponseScale.html) 接口，开启接收功能。

```dart
// 如需开启同步缩放功能
ZegoSuperBoardManager.instance.enableSyncScale(true);
// 如需开启接收同步缩放功能
ZegoSuperBoardManager.instance.enableResponseScale(true);
```
