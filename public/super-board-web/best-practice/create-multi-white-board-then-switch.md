# 创建多个白板并切换

- - -
## 功能简介
该文档展示了如何使用超级白板 SDK 创建多个不同的白板并自由切换显示。本文档示例的场景如下：
1. 开发者依次创建了一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板。
2. 开发者切换 Excel 至指定 sheet。
3. 开发者切换到动态 PPT，逐步演示 PPT。
4. 开发者切换到纯白板，写下一行字后放大显示。

开发者可参考本文中的实现以及 ZEGO 提供的 [示例源码](/super-board-web/quick-start/run-demo)，根据自己的业务场景组合代码以满足业务需求。

## 实现流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/Superboard_bestpractice_web.png" /></Frame>

流程中以 A 端创建并操作白板，B 端观看白板为例；图中的虚线表示 A 端进行操作时，B 端可在收到的对应回调中获取相关信息。

开始前，请满足以下条件：

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">
`2.3.0 `或以上 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

### 1. 初始化 SDK 并登录房间

请参考 [快速开始](/super-board-web/quick-start/create-white-board) 完成 SDK 的集成与初始化，并登录房间。

完整示例代码如下：


```html
<!-- 需要挂载的父容器 -->
<div id="parentDomID"></div>
```

```typescript
// 请先完成 SDK 的集成再运行下面的代码
// 初始化 ZegoExpressEngine
const zg = new ZegoExpressEngine(appID, server);
// 获取 ZegoSuperBoard 实例
zegoSuperBoard = ZegoSuperBoardManager.getInstance();
// 初始化 ZegoSuperBoard，成功则 result 返回 true
const result = await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID', // 需要挂载的父容器 ID
    appID: 0, // 申请到的 AppID
    userID: '', // 用户自定义生成的用户 ID
    token: '' // 登录房间需要用于验证身份的 Token
});


// 登录房间，成功则返回 true
// userUpdate 设置为 true 会开启监听 roomUserUpdate 回调，默认情况下不会开启该监听
const result = await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
```

### 2. 创建白板

A 端分别创建一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板：

<Note title="说明">

创建文件白板使用的文件需要先上传，详见 [共享文件管理](/super-board-web/basic-func/file-manage)。

</Note>

```typescript
// A 端操作
// 上一步的登录房间成功，返回 true 后才可创建白板
// 创建普通白板
const model1 = await zegoSuperBoard.createWhiteboardView({
    name: 'purewhiteboard', // 白板名称
    perPageWidth: 1600, // 白板每页宽度
    perPageHeight: 900, // 白板每页高度
    pageCount: 5 // 白板页数
});
// 创建动态 PPT 文件白板
const model2 = await zegoSuperBoard.createFileView({
    fileID // 动态 PPT 文件的 fileID，在上传文件成功后返回的唯一文件标识
});
// 创建 Excel 文件白板
const model3 = await zegoSuperBoard.createFileView({
    fileID // Excel 文件的 fileID，在上传文件成功后返回的唯一文件标识
});
```
白板依次创建完成后，SuperBoardView 自动多端同步，默认显示最新创建的白板，即 Excel 文件白板, B 端在 A 端每次创建白板后都会收到 remoteSuperBoardSubViewAdded 和 superBoardSubViewScrollChanged 通知，在对应回调内刷新本地 UI 逻辑即可。
<Warning title="注意">

B 端加入房间并确认用于挂载白板的父容器的存在（物理像素宽高不为0）后，需要判断房间内是否存在白板，如果存在，请参考 [挂载当前白板](/super-board-web/quick-start/create-white-board#5-挂载当前白板) 进行手动挂载。

</Warning>

```typescript
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端新增白板
zegoSuperBoard.on('remoteSuperBoardSubViewAdded', function(uniqueID) {
  // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView().getModel() 的信息更新UI，如更新当前显示白板/文件名称。
});
// 监听白板翻页、滚动
zegoSuperBoard.on('superBoardSubViewScrollChanged', function(uniqueID, page, step) {
    // 可以根据回调返回的参数信息更新UI，如更新当前显示页数/当前动画步数。
});
```

通过 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubView#set-operation-mode) 设置权限可控制客户端是否可操作白板。

拥有权限的客户端可以在白板上进行绘制，详情请参考 [白板绘制](/super-board-web/basic-func/sketch)。

### 3. 切换 Excel 至指定 sheet

A 端切换至 Excel 到第二个 sheet。
```typescript
// A 端操作
// 切换 Excel 到第二个 sheet
await zegoSuperBoard.getSuperBoardView().switchSuperBoardSubView(model3.uniqueID, 1 );
```

B 端在 A 端切换 Excel sheet 后会自动同步切换，同时收到 remoteSuperBoardSubViewExcelSwitched 通知，在对应回调内刷新本地UI逻辑即可。
```typescript
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端切换 Excel Sheet
zegoSuperBoard.on('remoteSuperBoardSubViewExcelSwitched', function(uniqueID, sheetIndex) {
    // 可以根据回调返回的参数信息更新UI，如更新当前Excel页数。
});
```

### 4. 切换到动态 PPT 并演示

A 端切换至动态 PPT。
```typescript
// A 端操作
await zegoSuperBoard.getSuperBoardView().switchSuperBoardSubView(model2.uniqueID );
```
切换至动态 PPT 后，可通过跳步/翻页接口或点击工具进行 PPT 演示，详情请参考 [白板翻页](/super-board-web/basic-func/scale-and-flip)。

B 端在 A 端切换白板后会自动同步切换，同时收到 remoteSuperBoardSubViewSwitched 通知，在对应回调内刷新本地UI逻辑即可。
```typescript
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端切换白板
zegoSuperBoard.on('remoteSuperBoardSubViewSwitched', function(uniqueID) {
    // 可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView().getModel() 的信息更新UI，如更新当前显示白板/文件名称。
});
```

### 5. 切换到纯白板进行绘制并放大
如果需要各端之间同步缩放效果，需要在各端上都开启同步缩放和响应缩放。
```typescript
// 如需本端和对端缩放同步
zegoSuperBoard.enableSyncScale(true);// 同步缩放至其他端
zegoSuperBoard.enableResponseScale(true);// 响应其他端同步过来的缩放
```

A 端切换至纯白板，使用文本工具在白板上写字后，放大白板至 200%。
```typescript
// A 端操作
// 切换至目标白板
var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView()
await zegoSuperBoardSubView.switchSuperBoardSubView(model.uniqueID);

// 默认白板工具为画笔，如需设置其他工具类型，请调用 setToolType
// 举例：设置白板工具为文本，然后点击白板上想要显示文本的位置后输入文本即可
zegoSuperBoard.setToolType(2)

// 获取当前显示的白板
var curSubView = zegoSuperBoardSubView.getCurrentSuperBoardSubView();
// 放大至 200%
curSubView && curSubView.setScaleFactor(2);
```
B 端在 A 端切换白板后会自动同步切换，同时收到 remoteSuperBoardSubViewSwitched 通知，上一步中已实现该回调。A 端和 B 端都设置了同步缩放后，A 端缩放后 B 端会自动同步，并收到 superBoardSubViewScaleChanged 通知。

```typescript
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端白板缩放
zegoSuperBoard.on('superBoardSubViewScaleChanged', function(uniqueID, scale) {
    // 可以根据回调返回的参数信息更新UI，如更新当前缩放系数。
});
```

## API 参考列表
| 方法                                                                                                  | 描述                                |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#get-instance)                                                                           | 获取 ZegoSuperBoardManager 实例对象 |
| [init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#init)                                                                                         | 初始化 ZegoSuperBoard SDK           |
| [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine-scrap_0/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) | 登录房间                            |
| [createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-whiteboard-view)                                                         | 创建纯白板                          |
| [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-file-view)                                                                     | 创建文件白板                        |
| [getSuperBoardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#get-super-board-view)                                                               | 获取 SuperBoardView 对象            |
| [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardView#switch-super-board-sub-view)                                                   | 切换到指定的 SuperBoardSubView      |
| [enableSyncScale](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#enable-sync-scale)                                                                   | 设置是否将缩放同步给房间内其他成员  |
| [enableResponseScale](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#enable-response-scale)                                                           | 是否响应房间内其他成员的缩放        |
| [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-tool-type)                                                                           | 设置白板工具类型                    |
| [setScaleFactor](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoSuperPreviewView#set-scale-factor)                                                                     | 缩放 SuperBoardSubView              |
| [on](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#on)                                                                                             | 注册监听事件                        |
