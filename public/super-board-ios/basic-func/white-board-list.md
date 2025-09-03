# 获取白板列表

- - -

本文主要介绍如何获取房间内正在共享的白板列表。

## 前提条件

已参考 [快速开始](/super-board-ios/quick-start/create-white-board) 创建了一个白板。


## 实现流程
1. 首次进房，可以主动拉取房间已经创建的白板列表。

```objc
[[ZegoSuperBoardManager sharedInstance] querySuperBoardSubViewList:^(ZegoSuperBoardError errorCode, NSArray<ZegoSuperBoardSubViewModel *> * _Nonnull superBoardViewList) {
    // 拿到 subViewModelList后，可以做界面上的更新。
    // 例如填充到自己的 白板展示 列表中去
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 获取白板列表成功 */
     } else {
            /** 获取白板列表失败 */
     } 
}];
```


2. 已经在房间中时，需要获取当前所有的白板列表。

```objc
// 获取已经存在的所有白板列表。例如在展示白板列表时展示
 NSArray <ZegoSuperBoardSubViewModel *>* array = [ZegoSuperBoardManager sharedInstance].superBoardSubViewModelList;
// 做对应的业务逻辑处理 ...
```
