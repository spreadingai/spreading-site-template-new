# 获取白板列表

- - -

本文主要介绍如何获取房间内正在共享的白板列表。

## 前提条件

已参考 [快速开始](/super-board-android/quick-start/create-white-board) 创建了白板。

## 实现流程
1. 首次进房，可以主动拉取房间已经创建的白板列表。

```java
ZegoSuperBoardManager.getInstance().querySuperBoardSubViewList(new IZegoSuperBoardQueryListCallback() {
    @Override
    public void onQuery(int errorCode, ZegoSuperBoardSubViewModel[] subViewModelList, HashMap<String, String> extraInfo) {
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 拉取列表成功 */
            // 拿到 subViewModelList后，可以做界面上的更新。
            // 例如填充到自己的 recyclerView 列表中去
        } else {
            /** 拉取列表失败，查询错误码对应的原因 */
        }
    }
});
```


2. 如果已经在房间中了，需要获取当前所有的白板列表。

```java
// 可调用 getSuperBoardSubViewModelList() 方法
List<ZegoSuperBoardSubViewModel> modelList = ZegoSuperBoardManager.getInstance().getSuperBoardSubViewModelList();
// 做对应的业务逻辑处理 ...
```
