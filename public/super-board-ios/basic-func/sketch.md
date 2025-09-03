# 白板绘制

- - -

本文主要介绍如何在已创建的白板上使用超级白板 SDK 提供的工具进行绘制。

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/1ced8ebc21.gif" alt="superboard_scatch.gif"/>
</Frame>

## 前提条件

已参考 [快速开始](/super-board-ios/quick-start/create-white-board) 创建了一个白板。

## 实现流程

### 在白板上涂鸦

1. 开启 ZegoSuperBoard 的绘制功能。

- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 设置为 ZegoSuperBoardOperationModeDraw，即可开启 ZegoSuperBoard 的绘制功能并同时关闭滚动功能。
- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 设置为 ZegoSuperBoardOperationModeScroll，会关闭绘制功能并同时打开滚动功能。

```objc
//获取当前正在展示的视图
ZegoSuperBoardSubView *superBoardSubView = [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView;
//设置当前展示的视图的操作模式为绘制
[superBoardSubView setOperationMode:ZegoSuperBoardOperationModeDraw];
```
2. 设置绘制工具类型。   

设置 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager) 类的 [toolType](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#tool-type) 属性可修改 ZegoSuperBoard 的工具类型，目前支持 10 种工具。

```
ZegoSuperBoardToolNone ,     //未选择
ZegoSuperBoardToolPen     // 涂鸦画笔
ZegoSuperBoardToolText ,    // 文本
ZegoSuperBoardToolLine ,    // 直线
ZegoSuperBoardToolRect ,    // 矩形
ZegoSuperBoardToolEllipse , // 圆
ZegoSuperBoardToolSelector ,// 选取图元
ZegoSuperBoardToolEraser ,  // 橡皮擦
ZegoSuperBoardToolLaser ,   // 激光笔
ZegoSuperBoardToolCustomImage ,   // 自定义图形工具
```

3. 将工具设置为 ZegoSuperBoardToolPen 涂鸦画笔。

```objc
// 设置白板工具为画笔
[ZegoSuperBoardManager sharedInstance].toolType = ZegoSuperBoardToolPen;

// 画笔颜色，默认为红色
[ZegoSuperBoardManager sharedInstance].brushColor = UIColor.redColor;

// 画笔粗细，默认为6
[ZegoSuperBoardManager sharedInstance].brushSize = 16;
```

设置涂鸦画笔成功后，用手指在 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在 ZegoSuperBoardView 上。
<Note title="说明">

开发者可通过 [enableHandwriting](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#enable-handwriting) 开启笔锋模式，文首的图先后演示了无笔锋时的绘制效果和有笔锋时的绘制效果。

</Note>

```objc
// 关闭笔锋（默认笔锋是关闭状态）
[ZegoSuperBoardManager sharedInstance].enableHandwriting = NO;

// 开启笔锋
[ZegoSuperBoardManager sharedInstance].enableHandwriting = YES;
```

4. 可针对画笔设置自定义光标。

ZEGO SDK 已内置默认画笔图标，开发者可通过 [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-custom-cursor-attribute-type-cursor-attribute-complete) 设置画笔的光标样式。

```objc
// 关闭自定义光标（默认为开启状态）
[ZegoSuperBoardManager sharedInstance].enableCustomCursor = NO;

// 开启自定义光标
[ZegoSuperBoardManager sharedInstance].enableCustomCursor = YES;

// 关闭显示远程自定义光标（默认为开启状态）
[ZegoSuperBoardManager sharedInstance].enableRemoteCursorVisible = NO;

// 开启显示远程自定义光标 
[ZegoSuperBoardManager sharedInstance].enableRemoteCursorVisible = YES;

// 设置自定义光标
ZegoSuperBoardCursorAttribute * attribute = [ZegoSuperBoardCursorAttribute new];
attribute.iconPath = @"https://xxxxxxxx.com/xxx.png";  // 请使用正确的图片地址
attribute.offsetX = 0;  // 自定义光标作用点，绘制点作用在图片指定 x 偏移方向，默认为 0，不可超出图片宽度
attribute.offsetY = 0;  // 自定义光标作用点，绘制点作用在图片指定 y 偏移方向，默认为 0，不可超出图片高度
[[ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView setCustomCursorAttribute:ZegoSuperBoardViewCursorTypePen cursorAttribute:attribute complete:nil];
```

## 常见问题

### 1. 如何动态控制用户的操作权限？

ZEGO 超级白板 SDK 本身不包含业务操作逻辑，需要您在业务侧通过信令传达操作权限数据，并结合 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 接口实现。

例如，当教师想要允许学生在白板上涂鸦，则需要教师端 App 向学生端 App 发送信令，学生端 App 调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationModeDraw`。当教师不再允许学生对白板操作时，则教师端 App 再次向学生端 App 发送信令，学生端 App 再次调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationModeNone`。
