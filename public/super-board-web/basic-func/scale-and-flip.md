# 白板翻页

- - -

本文主要介绍如何对正在显示的白板翻页和跳步（跳步仅动态PPT文件生效）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/filppage.gif" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/step.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-web/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 设置滚动事件监听
```javascript
// 监听白板翻页、滚动
var zegoSuperBoard = ZegoSuperBoardManager.getInstance();
var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView().getCurrentSuperBoardSubView();
zegoSuperBoard.on('superBoardSubViewScrollChanged', function (uniqueID, page, step) {
    // 判断收到滚动通知的 SuperBoardView 是否与当前展示的是同一个
    if (zegoSuperBoardSubView && zegoSuperBoardSubView.getModel().uniqueID == uniqueID) {
        // SuperBoardView 每次滚动后都会回调这个方法
        // 业务层可在这里更新界面的 页码/总页数 等信息
    }
        // 省略其他回调接口实现...
    });
```


### 翻页接口
```javascript
var zegoSuperBoard = ZegoSuperBoardManager.getInstance();
var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView().getCurrentSuperBoardSubView();
if (zegoSuperBoardSubView) {
    // 这里可以调用subView对应的接口进行翻页，以下是简单的示例

    // 跳转指定页
    zegoSuperBoardSubView.flipToPage(page);
    // 跳转上一页
    zegoSuperBoardSubView.flipToPrePage();
    // 跳转下一页
    zegoSuperBoardSubView.flipToNextPage();
    }
```

### 跳步接口（仅动态PPT文件生效）
```javascript
var zegoSuperBoard = ZegoSuperBoardManager.getInstance();
var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView().getCurrentSuperBoardSubView();
// 通过 superBoardView 拿到当前展示的 subView
if(zegoSuperBoardSubView){
    // 注意！！
    // 上一步、下一步接口仅针对当前展示的文件类型是动态文件的，才会生效

    // 这里可以调用subView对应的接口进行上下跳步的操作，以下是简单的示例

    //上一步
    zegoSuperBoardSubView.preStep();
    // 下一步
    zegoSuperBoardSubView.nextStep();
}
```
动态 PPT 还可以通过 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-tool-type) 设置 [Click](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~enum~ZegoSuperBoardTool#click) 工具，点击进行跳步与翻页。
