# 白板切换

- - -

本文主要介绍如何切换显示的白板。

下图以 Web 端为例展示同步切换白板效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/switch.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-ios/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 监听远端白板切换
```objc
[ZegoSuperBoardManager sharedInstance].delegate = self;

- (void)onRemoteSuperBoardSubViewSwitched:(NSString *)uniqueID
{
    // 收到远端切换白板文件，这里无需做其他任何操作。
    //可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板/文件名称。
}
- (void)onRemoteSuperBoardSubViewExcelSwitched:(NSString *)uniqueID sheetIndex:(int)sheetIndex
{
     // 收到远端切换Excel文件，这里无需做其他任何操作。
     // 可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示Excel文件名称。
}
```

### 主动切换白板
```objc

ZegoSuperBoardView *superBoardView = [ZegoSuperBoardManager sharedInstance].superBoardView;

// 切换白板
//subViewModel 是白板共享列表 [ZegoSuperBoardManager sharedInstance].superBoardSubViewModelList 中的一个model
[superBoardView switchSuperBoardSubView:subViewModel.uniqueID complete:^(ZegoSuperBoardError errorCode) {
        // 切换白板回调
        // 可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板/文件名称。
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 切换白板成功 */
     } else {
            /** 切换白板失败 */
     }
}];

// 切换Excel文件

//sheetIndex 为Excel名称数组 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView.excelSheetNameList 里的下标
NSInteger sheetIndex = 0;
[superBoardView switcSuperBoardSubView:subViewModel.uniqueID sheetIndex:sheetIndex complete:^(ZegoSuperBoardError errorCode) {
       // 切换Excel文件回调
       // 可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示Excel文件名称。
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 切换Excel成功 */
     } else {
            /** 切换Excel失败 */
     }
}];
```
