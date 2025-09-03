# 白板绘制

 - - -

本文主要介绍如何在已创建的白板上使用超级白板 SDK 提供的工具进行绘制。

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/1ced8ebc21.gif" alt="superboard_scatch.gif"/>
</Frame>
## 前提条件

已参考 [创建超级白板](/super-board-rn/quick-start/create-white-board) 创建了一个白板。

## 相关功能

### 开启绘制功能

<Note title="说明">

SuperBoard SDK 默认开启绘制功能。
</Note>

将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Draw，即可开启 ZegoSuperBoard 的绘制功能。

```javascript
var currentSubView = await ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView();
if (currentSubView) {
    // ZegoSuperBoardOperationMode.Draw = 4
    currentSubView.setOperationMode(4);
}
```

### 设置绘制工具类型。   

设置 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager) 类的 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#set-tool-type) 方法可修改 ZegoSuperBoard 的工具类型，目前支持 10 种工具。

```javascript
None,         //未选择：0
Pen ,         // 涂鸦画笔：1
Text ,        // 文本：2
Line ,        // 直线：4
Rect ,        // 矩形：8
Ellipse ,     // 圆：16
Selector ,    // 选取图元：32
Eraser ,      // 橡皮擦：64
Laser ,       // 激光笔：128
CustomImage , // 自定义图形工具：256
```

将工具设置为 Pen（涂鸦画笔）。

```javascript
// 设置白板工具为画笔
// ZegoSuperBoardTool.Pen = 1
ZegoSuperBoardManager.getInstance().setToolType(1);
// 画笔颜色，默认为红色
ZegoSuperBoardManager.getInstance().setBrushColor('#FF0000');
// 画笔粗细，默认为 6
ZegoSuperBoardManager.getInstance().setBrushSize(10);
```

设置涂鸦画笔成功后，用手指在 ZegoSuperBoardView 的范围内向下划动，即可看到涂鸦效果展示在 ZegoSuperBoardView 上。

### 启用笔锋效果

开发者可通过调用 [enableHandwriting](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#enable-handwriting) 接口针对 Pen 开启笔锋模式，本文开头的示意图先后演示了无笔锋时的绘制效果和有笔锋时的绘制效果。

```javascript
// 关闭笔锋 (默认笔锋是关闭状态）
ZegoSuperBoardManager.getInstance().enableHandwriting(false);

// 开启笔锋
ZegoSuperBoardManager.getInstance().enableHandwriting(true);
```

### 自定义光标

ZEGO SDK 已内置默认画笔图标，开发者可通过 [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#set-custom-cursor-attribute) 设置画笔的光标样式。

```javascript
// 关闭自定义光标（默认为开启状态） 
ZegoSuperBoardManager.getInstance().enableCustomCursor(false);

// 开启自定义光标 
ZegoSuperBoardManager.getInstance().enableCustomCursor(true);

// 关闭显示远程自定义光标（默认为开启状态） 
ZegoSuperBoardManager.getInstance().enableRemoteCursorVisible(false);

// 开启显示远程自定义光标 
ZegoSuperBoardManager.getInstance().enableRemoteCursorVisible(true);

// 设置自定义光标样式
ZegoSuperBoardManager.getInstance().setCustomCursorAttribute(1, {
    iconPath: 'FILE',  // 自定义光标的地址，支持本地地址和网络地址
    offsetX: 0,  // 自定义光标横向偏移量
    offsetY: 0   // 自定义光标纵向偏移量
})
```

## 常见问题

### 1. 如何动态控制用户的操作权限？

ZEGO 超级白板 SDK 本身不包含业务操作逻辑，需要您在业务侧通过信令传达操作权限数据，并结合 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 接口实现。

例如，当教师想要允许学生在白板上涂鸦，则需要教师端 App 向学生端 App 发送信令，学生端 App 调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationMode.Draw`。当教师不再允许学生对白板操作时，则教师端 App 再次向学生端 App 发送信令，学生端 App 再次调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationMode.None`。
