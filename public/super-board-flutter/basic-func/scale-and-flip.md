# 白板翻页

- - -

本文主要介绍如何对正在显示的白板翻页和跳步（跳步仅动态PPT文件生效）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/filppage.gif" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/step.gif" /></Frame>

## 前提条件

已参考 [创建超级白板](/super-board-flutter/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 设置翻页滚动事件监听

调用 [onSuperBoardSubViewScrollChanged](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_event_handler/ZegoSuperBoardEventHandler/onSuperBoardSubViewScrollChanged.html) 接口，监听白板翻页滚动事件。

```dart
// 监听白板翻页、滚动
ZegoSuperBoardManager.onSuperBoardSubViewScrollChanged = ((uniqueID, page, pageCount) {
    // SuperBoardView 每次滚动后都会回调这个方法
    // 业务层可根据当前 currentSuperBoardSubView 的属性刷新 UI 的 页码/总页数 等信息
});
```


### 翻页接口

ZEGO 支持调用 [flipToPrePage](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/flipToPrePage.html)、[flipToNextPage](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/flipToNextPage.html) 和 [flipToPage](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/flipToPage.html) 接口，向前翻页、向后翻页和跳转页面。

```dart
// 翻到上一页
await ZegoSuperBoardManager.instance.flipToPrePage();
// 翻到下一页
await ZegoSuperBoardManager.instance.flipToNextPage();
// 翻到指定页
await ZegoSuperBoardManager.instance.flipToPage(targetPage: 3);
```

### 跳步接口（仅动态PPT文件生效）

ZEGO 支持调用 [preStep](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/preStep.html) 和 [nextStep](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/nextStep.html) 接口，回到上一步和进行下一步。

```javascript
// 上一步
await ZegoSuperBoardManager.instance.preStep();
// 下一步
await ZegoSuperBoardManager.instance.nextStep();
```

还可以通过调用 [setToolType](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/setToolType.html) 接口设置 [Click](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_defines/ZegoSuperBoardTool.html#click) 工具，对动态 PPT 进行点击跳步与翻页。
