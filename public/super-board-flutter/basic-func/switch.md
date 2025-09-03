# 白板切换

- - -

本文主要介绍如何切换显示的白板。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/switch.gif" /></Frame>

## 前提条件

已参考 [创建超级白板](/super-board-flutter/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 监听远端白板切换

调用 [onRemoteSuperBoardSubViewSwitched](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onRemoteSuperBoardSubViewSwitched.html) 接口，监听远端白板切换。

```dart
await ZegoSuperBoardManager.onRemoteSuperBoardSubViewSwitched = ((uniqueID) {
    // 收到远端切换白板文件，这里无需做其他任何操作。
    // 可以根据当前 currentSuperBoardSubView 的信息更新UI，如更新当前显示白板/文件名称。
});
```

### 主动切换白板

调用 [switchSuperBoardSubView](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/switchSuperBoardSubView.html) 可以切换白板；调用 [switchSuperBoardSubViewWithSheetIndex](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/switchSuperBoardSubViewWithSheetIndex.html) 可以切换 Excel 文件。

```dart
ZegoSuperBoardView *superBoardView = [ZegoSuperBoardManager sharedInstance].superBoardView;
// 切换白板
// subViewModel 是白板共享列表
await ZegoSuperBoardManager.instance.switchSuperBoardSubView(uniqueID: subViewModel.uniqueID);

// 切换Excel文件
// sheetIndex 为Excel名称数组 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView.excelSheetNameList 里的下标
int sheetIndex = 0;
await ZegoSuperBoardManager.instance. switchSuperBoardSubViewWithSheetIndex(uniqueID: subViewModel.uniqueID, sheetIndex: sheetIndex);
```
