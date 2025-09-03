# 白板绘制

- - -

本文主要介绍如何在已创建的白板上使用超级白板 SDK 提供的工具进行绘制。

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/1ced8ebc21.gif" alt="superboard_scatch.gif"/>
</Frame>
## 前提条件

已参考 [创建超级白板](/super-board-flutter/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 1 开启 ZegoSuperBoard 的绘制功能

调用 [setOperationMode](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setOperationMode.html) 接口将模式设置为 `ZegoSuperBoardOperationMode.draw.value`，即可开启 ZegoSuperBoard 的绘制功能并同时关闭滚动功能。

<Note title="说明">

默认开启绘制功能。
</Note>

```dart
await ZegoSuperBoardManager.instance 
.setOperationMode(mode: ZegoSuperBoardOperationMode.draw.value); 
```

### 2 设置绘制工具

调用 [setToolType](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setToolType.html)、[setBrushColor](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setBrushColor.html) 和 [setBrushSize](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setBrushSize.html) 方法可分别修改绘制工具的类型、颜色和粗细。

```dart
// 设置白板工具为画笔 
await ZegoSuperBoardManager.instance.setToolType(toolType: ZegoSuperBoardTool.pen); 
// 画笔颜色，默认为红色 
await ZegoSuperBoardManager.instance.setBrushColor(rgbValue: '#000000'); 
// 画笔粗细，默认为6 
await ZegoSuperBoardManager.instance.setBrushSize(brushSize: 10); 
```

### 3 测试涂鸦效果

设置涂鸦画笔成功后，用手指在 ZegoSuperBoardView 的范围内向下移动，即可看到涂鸦效果展示在 ZegoSuperBoardView 上。

### 4 （可选）开启笔锋模式

开发者可通过 [enableHandwriting](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/enableHandwriting.html) 开启笔锋模式，文首的图先后演示了无笔锋时的绘制效果和有笔锋时的绘制效果。


```dart
// 关闭笔锋 (默认笔锋是关闭状态） 
await ZegoSuperBoardManager.instance .enableHandwriting(enableHandwriting: false); 
// 开启笔锋 
await ZegoSuperBoardManager.instance .enableHandwriting(enableHandwriting: true); 
```

### 5 (可选)设置自定义画笔光标。

除了默认画笔图标，开发者还可通过 [setCustomCursorAttribute](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setCustomCursorAttribute.html) 设置画笔的光标样式。

```dart
// 关闭自定义光标（默认为关闭状态） 
await ZegoSuperBoardManager.instance.enableCustomCursor(enableCustomCursor: false); 
// 开启自定义光标 
await ZegoSuperBoardManager.instance.enableCustomCursor(enableCustomCursor: true); 
// 关闭显示远程自定义光标（默认为关闭状态） 
await ZegoSuperBoardManager.instance.enableRemoteCursorVisible(enableRemoteCursorVisible: false); 
// 开启显示远程自定义光标 
await ZegoSuperBoardManager.instance.enableRemoteCursorVisible(enableRemoteCursorVisible: false); 
// 设置自定义光标样式 
await ZegoSuperBoardManager.getInstance().setCustomCursorAttribute(1, { 
    iconPath: 'FILE', // 自定义光标的地址，支持本地地址和网络地址 
    offsetX: 0, // 自定义光标横向偏移量 
    offsetY: 0 // 自定义光标纵向偏移量 
}) 
```

### 6 关闭绘制功能

调用 [setOperationMode](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setOperationMode.html) 接口将模式设置为 `ZegoSuperBoardOperationMode.scroll.value`，即可关闭绘制功能并同时打开滚动功能。

```dart
await ZegoSuperBoardManager.instance 
.setOperationMode(mode: ZegoSuperBoardOperationMode.scroll.value); 
```
