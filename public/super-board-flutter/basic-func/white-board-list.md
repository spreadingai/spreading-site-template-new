# 获取白板列表

- - -

本文主要介绍如何获取房间内正在共享的白板列表。

## 前提条件

已参考 [创建超级白板](/super-board-flutter/quick-start/create-white-board) 创建了一个白板。

## 实现流程

1. 首次进房，可以调用 [querySuperBoardSubViewList](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/querySuperBoardSubViewList.html) 接口主动拉取房间已经创建的白板列表。

```dart
ZegoQuerySuperBoardSubViewResult result = await ZegoSuperBoardManager.instance.querySuperBoardSubViewList(); 
if (kDebugMode) { 
    print('[Flutter][querySuperBoardSubViewList]: ${result.subViewModelList}'); 
} 
```


2. 已在房间时，可以调用 [getSuperBoardSubViewModelList](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/getSuperBoardSubViewModelList.html) 获取当前所有的白板列表。

```dart
// 获取已经存在的所有白板列表。例如在展示白板列表时展示 
List subViewModelList = await ZegoSuperBoardManager.instance.getSuperBoardSubViewModelList() ?? 
[]; 
if (kDebugMode) { 
    print('[Flutter][getSuperBoardSubViewModelList]: $subViewModelList'); 
} 
// 做对应的业务逻辑处理 ... 
```
