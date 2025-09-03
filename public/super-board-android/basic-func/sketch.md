# 白板绘制

- - -

本文主要介绍如何在已创建的白板上使用超级白板 SDK 提供的工具进行绘制。

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/1ced8ebc21.gif" alt="superboard_scatch.gif"/>
</Frame>
## 前提条件

已参考 [快速开始](/super-board-android/quick-start/create-white-board) 创建了白板。

## 实现流程

### 在白板上涂鸦

1. 开启 ZegoSuperBoard 的绘制功能。

- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Draw，即可开启 ZegoSuperBoard 的绘制功能并同时关闭滚动功能。
- 将 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 设置为 ZegoSuperBoardOperationMode.Scroll，会关闭绘制功能并同时打开滚动功能。

```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
if (superBoardView != null) {
    ZegoSuperBoardSubView currentSubView =  superBoardView.getCurrentSuperBoardSubView();
    //获取当前正在展示的视图
    if (currentSubView != null) {
        //设置当前展示的视图的操作模式为绘制
        currentSubView.setOperationMode(ZegoSuperBoardOperationMode.Draw.getMode());
    }
}
```
2. 设置绘制工具类型。   

设置 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager) 类的 [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#set-tool-type) 方法可修改 ZegoSuperBoard 的工具类型，目前支持 10 种工具。

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

```java
// 设置白板工具为画笔
ZegoSuperBoardManager.getInstance().setToolType(ZegoSuperBoardTool.Pen);

// 画笔颜色，默认为红色
ZegoSuperBoardManager.getInstance().setBrushColor(Color.RED);

// 画笔粗细，默认为6
ZegoSuperBoardManager.getInstance().setBrushSize(10);
```

4. 设置涂鸦画笔成功后，用手指在 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在 ZegoSuperBoardView 上。

<Note title="说明">

开发者可通过 [enableHandwriting](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#enable-handwriting) 开启笔锋模式，文首的图先后演示了无笔锋时的绘制效果和有笔锋时的绘制效果。

</Note>

```java
// 关闭笔锋 (默认笔锋是关闭状态）
ZegoSuperBoardManager.getInstance().enableHandwriting(false);

// 开启笔锋
ZegoSuperBoardManager.getInstance().enableHandwriting(true);
```

5. 可针对画笔设置自定义光标。

ZEGO SDK 已内置默认画笔图标，开发者可通过 [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-custom-cursor-attribute) 设置画笔的光标样式。

```java
// 关闭自定义光标（默认为开启状态）
ZegoSuperBoardManager.getInstance().enableCustomCursor(false);

// 开启自定义光标
ZegoSuperBoardManager.getInstance().enableCustomCursor(true);

// 关闭显示远程自定义光标（默认为开启状态）
ZegoSuperBoardManager.getInstance().enableRemoteCursorVisible(false);

// 开启显示远程自定义光标 
ZegoSuperBoardManager.getInstance().enableRemoteCursorVisible(true);

// 设置自定义光标
ZegoSuperBoardCursorAttribute attribute = new ZegoSuperBoardCursorAttribute();
attribute.url = url;    // 自定义光标的地址，支持本地地址和网络地址
attribute.pox_x = 10;   // 自定义光标横向偏移量
attribute.pox_y = 10;   // 自定义光标纵向偏移量
currentSubView.setCustomCursorAttribute(ZegoSuperBoardViewCursorType.Pen, attribute, new IZegoSuperBoardApiCalledCallback() {
    @Override
    public void onApiCalledResult(int errorCode) {
        // TODO: 2024/10/22  
    }
});
```

## 常见问题

### 1. 如何动态控制用户的操作权限？

ZEGO 超级白板 SDK 本身不包含业务操作逻辑，需要您在业务侧通过信令传达操作权限数据，并结合 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 接口实现。

例如，当教师想要允许学生在白板上涂鸦，则需要教师端 App 向学生端 App 发送信令，学生端 App 调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationMode.Draw`。当教师不再允许学生对白板操作时，则教师端 App 再次向学生端 App 发送信令，学生端 App 再次调用 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 接口，将 `mode` 设置为 `ZegoSuperBoardOperationMode.None`。
