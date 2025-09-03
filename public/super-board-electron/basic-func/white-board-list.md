# 获取白板列表

- - -

本文主要介绍如何获取房间内正在共享的白板列表。

## 前提条件

已参考 [快速开始](/super-board-electron/quick-start/create-white-board) 创建了白板。

## 实现流程
1. 首次进房，可以主动拉取房间已经创建的白板列表。

```javascript

ZegoSuperBoardManager.getInstance().querySuperBoardSubViewList().then(function(zegoSuperBoardSubViewModelList){
    // 拿到 ZegoSuperBoardSubViewModel 后，可以做界面上的更新。
    // 例如填充到 UI 列表中去
})
```


2. 如果已经在房间中了，需要获取当前所有的白板列表。

```javascript
ZegoSuperBoardManager.getInstance().querySuperBoardSubViewList().then(function(zegoSuperBoardSubViewModelList){
    // 拿到 ZegoSuperBoardSubViewModel 后，可以做界面上的更新。
    // 做对应的业务逻辑处理 ...
})

```
