# 白板切换

- - -

本文主要介绍如何切换显示的白板。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/switch.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-electron/quick-start/create-white-board) 创建了白板。

## 实现流程

### 监听远端白板切换
```javascript
    zegoSuperBoard = ZegoSuperBoardManager.getInstance();
    // 监听远端切换白板
    zegoSuperBoard.on('remoteSuperBoardSubViewSwitched', function () {
        // 收到远端切换白板文件，这里无需做其他任何操作。
        // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板/文件名称。
    });

    // 监听远端切换 Excel 文件
    zegoSuperBoard.on('remoteSuperBoardSubViewExcelSwitched', function () {
        // 收到远端切换Excel文件，这里无需做其他任何操作。
        // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示Excel文件名称。
    });
```


### 主动切换白板
```javascript

var superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取superBoardView
if (superBoardView) {
    // 切换白板
    // subViewModel 是白板共享列表 ZegoSuperBoardManager.getInstance().getSuperBoardSubViewModelList() 中的一个model
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID).then(function(){
        // 切换白板回调
        // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板/文件名称。
    });

    // 切换Excel文件
    // sheetIndex 为Excel名称数组 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView().getExcelSheetNameList() 里的下标
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, sheetIndex).then(function(){
        // 切换Excel文件回调
        // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示Excel文件名称。
    });
}
```
