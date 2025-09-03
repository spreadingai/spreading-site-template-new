# 白板翻页

- - -

本文主要介绍如何对正在显示的白板翻页和跳步（跳步仅动态PPT文件生效）。

下图以 Web 端为例展示同步翻页和跳步效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/filppage.gif" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/step.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-android/quick-start/create-white-board) 创建了白板。

## 实现流程

### 设置滚动事件监听
```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取到superBoardView
if (superBoardView != null) {
    // 设置superBoardView监听
    superBoardView.setBoardViewListener(new IZegoSuperBoardViewListener() {
        @Override
        public void onScrollChange(int currentPage, int pageCount, ZegoSuperBoardSubViewModel subViewModel) {
            // SuperBoardView 每次滚动后都会回调这个方法
            // 业务层可在这里更新界面的 页码/总页数 等信息
        }

        @Override
        public void onSizeChange(Size visibleSize, ZegoSuperBoardSubViewModel subViewModel) {
            // SuperBoardView 大小改变后会回调这个方法
            // 业务层可在这里更新界面的 SuperBoardView 大小等展示信息
            // visibleSize 表示当前 SuperBoardView 大小，单位像素
        }
    });
}
```

### 翻页接口
```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取superBoardView
if (superBoardView != null) {
    ZegoSuperBoardSubView currentSubView = superBoardView.getCurrentSuperBoardSubView();
    // 通过superBoardView拿到当前展示的subView
    if (currentSubView != null) {
        // 这里可以调用subView对应的接口进行翻页，以下是简单的示例

        // 翻到上一页
        currentSubView.flipToPrePage(new IZegoSuperBoardApiCalledCallback() {
            @Override
            public void onApiCalledResult(int errorCode) {
                if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                    /** 翻页成功 */
                } else {
                    /** 翻页失败 */
                }
            }
        });

        // 翻到下一页
        currentSubView.flipToNextPage(new IZegoSuperBoardApiCalledCallback() {
            @Override
            public void onApiCalledResult(int errorCode) {
                if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                    /** 翻页成功 */
                } else {
                    /** 翻页失败 */
                }
            }
        });

        // 翻到指定页
        int targetPage = 1;
        currentSubView.flipToPage(targetPage, new IZegoSuperBoardApiCalledCallback() {
            @Override
            public void onApiCalledResult(int errorCode) {
                if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                    /** 翻页成功 */
                } else {
                    /** 翻页失败 */
                }
            }
        });

    }
}
```

### 跳步接口（仅动态PPT文件生效）
```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
// 获取superBoardView
if (superBoardView != null) {
    ZegoSuperBoardSubView currentSubView = superBoardView.getCurrentSuperBoardSubView();
    // 通过superBoardView拿到当前展示的subView
    if (currentSubView != null) {
        // 注意！！
        // 上一步、下一步接口仅针对当前展示的文件类型是动态文件的，才会生效

        // 这里可以调用subView对应的接口进行上下跳步的操作，以下是简单的示例

        // 上一步
        currentSubView.preStep(new IZegoSuperBoardApiCalledCallback() {
            @Override
            public void onApiCalledResult(int errorCode) {
                if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                    /** 上一步成功 */
                } else {
                    /** 上一步失败 */
                }
            }
        });

        // 下一步
        currentSubView.nextStep(new IZegoSuperBoardApiCalledCallback() {
            @Override
            public void onApiCalledResult(int errorCode) {
                if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
                    /** 下一步成功 */
                } else {
                    /** 下一步失败 */
                }
            }
        });

    }
}
```

动态 PPT 还可以通过 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#set-tool-type) 设置 [Click](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~enum~ZegoSuperBoardTool#click) 工具，点击进行跳步与翻页。
