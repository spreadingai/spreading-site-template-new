# 获取白板列表

- - -

本文主要介绍如何获取房间内正在共享的白板列表。

## 前提条件

已参考 [创建超级白板](/super-board-rn/quick-start/create-white-board) 创建了一个白板。

## 实现流程

在以下场景，您可以调用 querySuperBoardSubViewList 获取白板列表：

1. 首次进房，需要主动拉取房间已经创建的白板列表。
2. 已经在房间内，需要获取当前所有的白板列表。

```javascript
ZegoSuperBoardManager.getInstance().querySuperBoardSubViewList().then(function(zegoSuperBoardSubViewModelList){
    // 拿到 ZegoSuperBoardSubViewModel 后，可以做界面上的更新。
    // 例如填充到 UI 列表中或对应的业务逻辑处理 ...
})
```
