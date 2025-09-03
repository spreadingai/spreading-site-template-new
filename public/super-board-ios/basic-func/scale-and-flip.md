# 白板翻页

- - -

本文主要介绍如何对正在显示的白板翻页和跳步（跳步仅动态PPT文件生效）。

下图以 Web 端为例展示同步翻页和跳步效果，移动端效果相同。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/filppage.gif" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/step.gif" /></Frame>

## 前提条件

已参考 [快速开始](/super-board-ios/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 设置滚动事件监听
```objc
[ZegoSuperBoardManager sharedInstance].superBoardView.delegate = self;


- (void)onScrollChange:(NSInteger)currentPage pageCount:(NSInteger)pageCount subViewModel:(ZegoSuperBoardSubViewModel *)subViewModel
{
      // SuperBoardView 每次滚动后都会回调这个方法
     // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 页码/总页数 等信息
}
```

### 翻页接口
```objc
ZegoSuperBoardSubView *currentSuperBoardSubView = [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView;

 // 翻到上一页
[currentSuperBoardSubView flipToPrePage:^(ZegoSuperBoardError errorCode) {
       // 翻页回调
       // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 页码/总页数 等信息
      if (errorCode == ZegoSuperBoardSuccess) {
            /** 翻页成功 */
      } else {
            /** 翻页失败 */
      }
}];

// 翻到下一页
[currentSuperBoardSubView flipToNextPage:^(ZegoSuperBoardError errorCode) {
       // 翻页回调
       // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 页码/总页数 等信息
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 翻页成功 */
      } else {
            /** 翻页失败 */
      }
}];


// 翻到指定页
NSInteger targetPage = 1;
[currentSuperBoardSubView flipToPage:targetPage complete:^(ZegoSuperBoardError errorCode) {
       // 翻页回调
       // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 页码/总页数 等信息
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 翻页成功 */
      } else {
            /** 翻页失败 */
      }
}];

```

### 跳步接口（仅动态PPT文件生效）
```objc
ZegoSuperBoardSubView *currentSuperBoardSubView = [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView;

//上一步
[currentSuperBoardSubView preStep:^(ZegoSuperBoardError errorCode) {
       // 跳步回调
       // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 步骤 等信息
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 跳步成功 */
      } else {
            /** 跳步失败 */
      }

}];

//下一步
[currentSuperBoardSubView nextStep:^(ZegoSuperBoardError errorCode) {
      // 跳步回调
      // 业务层可根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的属性刷新UI的 步骤 等信息
     if (errorCode == ZegoSuperBoardSuccess) {
            /** 跳步成功 */
      } else {
            /** 跳步失败 */
      }
}];
```
动态 PPT 还可以通过 [toolType](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#tool-type) 设置 [ZegoSuperBoardToolClick](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~enum~ZegoSuperBoardTool#zego-super-board-tool-click) 工具，点击进行跳步与翻页。
