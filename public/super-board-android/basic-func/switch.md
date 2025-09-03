# 白板切换

- - -

本文主要介绍如何切换显示的白板。

下图以 Web 端为例展示同步切换白板效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/switch.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-android/quick-start/create-white-board) 创建了白板。

## 实现流程

### 监听远端白板切换
```java
ZegoSuperBoardManager.getInstance().setManagerListener(new IZegoSuperBoardManagerListener() {
    // 省略 ...

    @Override
    public void onRemoteSuperBoardSubViewSwitched(@NonNull String uniqueID) {
        // 收到远端切换白板文件，这里无需做其他任何操作。
        // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板/文件名称。
    }
});
```

### 主动切换白板
```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取superBoardView
if (superBoardView != null) {
    // 切换白板
    // subViewModel 是白板共享列表 ZegoSuperBoardManager.getInstance().getSuperBoardSubViewModelList() 中的一个model
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, new IZegoSuperBoardSwitchCallback() {
        @Override
        public void onViewSwitched(int errorCode) {
            // 切换白板回调
            if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                /** 切换白板成功 */
                // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板/文件名称。
            } else {
                /** 切换白板失败，查询错误码对应的原因 */
            }
        }
    });

    // 切换Excel文件
    // sheetIndex 为Excel名称数组 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView().getExcelSheetNameList() 里的下标
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, sheetIndex, new IZegoSuperBoardSwitchCallback() {
        @Override
        public void onViewSwitched(int errorCode) {
            // 切换白板回调
            if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                /** 切换Excel成功 */
                // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示Excel文件名称。
            } else {
                /** 切换Excel失败，查询错误码对应的原因 */
            }
        }
    });
}
```
