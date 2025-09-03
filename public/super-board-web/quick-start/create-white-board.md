# 创建超级白板
- - -

## 概念解释
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。
- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard） 的 SDK。
- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardView#switch-super-board-sub-view) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" /></Frame>

## 前提条件

- ZegoSuperBoard SDK 需要与 ZegoExpress-Video SDK 搭配使用，请同时集成 ZegoExpress-Video SDK。超级白板 SDK 的压缩包中已经包含 ZegoExpress-Video SDK，无需单独下载。
- 若之前已集成过 ZegoExpress-Video SDK，请升级到最新版本，避免 SDK 版本不匹配造成初始化失败。

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已生成 Token，详情请参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/15011)。也可以参考 [控制台 - 开发辅助](https://doc-zh.zego.im/article/16309)，在 ZEGO 控制台获取临时 Token（有效期为 24 小时）。

<Warning title="注意">

使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
</Warning>


## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：

- <p id="browser_compatibility">准备一台可以连接到互联网的 Windows 或 macOS 计算机。</p>
- 获取摄像头麦克风等行为需运行在 HTTPS 环境下，集成 SDK 之前，请确保最终项目能够运行在 HTTPS 环境下。开发环境下则可先通过本地运行规避，例如 localhost 或 127.0.0.1。
- 使用 SDK 支持的浏览器，目前 SDK 支持的浏览器版本如下：

| 平台 |  浏览器/Webview | 备注 |
| --- | ------- | ------- |
| Windows  | Chrome  | 支持 win7 或以上  |
| macOS   |  Chrome  |  支持 macOS 10.10 或以上|
| iOS   |     Safari  |  支持 iOS 10.0 或以上 |
| iOS  |   微信内嵌浏览器|支持 iOS 10.0 或以上   |
| Android |    Chrome   | 支持 Android 8.0 或以上  |
| Android |  微信内嵌浏览器  | 支持 Android 8.0 或以上  |

## 集成 SDK

### 1 下载 SDK

#### 从官网下载 SDK

请参考 [下载 SDK 包](/super-board-web/download-sdk)，下载最新版本的 SDK，下载完成后进行解压。

#### npm 下载 SDK
需要分别下载 ZegoSuperBoard SDK 和 ZegoExpress-Video SDK。
```bash
npm i zego-superboard-web
npm i zego-express-engine-webrtc
```
<Note title="说明">

- 超级白板 2.2.0 及之前版本的 SDK 仅适配 ZegoExpress-Video 2.14.0 及之前的 SDK。
- npm 下载包支持 typescript 语言(推荐)。
- 如果在 macOS 或 Linux 系统中执行 npm 命令失败，提示 “permission denied”，请在 npm 命令前加上 sudo 重新执行即可。


</Note>

### 2 导入 SDK

**从官网下载的 SDK** 可使用 script 直接引入，需要分别导入 ZegoSuperBoard SDK 和 ZegoExpress-Video SDK，其中，“x.x.x” 为 ZegoExpress-Video SDK 的版本号，请参考上一步压缩包解压后的文件名。

```  html
<script src="ZegoSuperBoardManagerWeb.js"></script>
<script src="ZegoExpressWebRTC-x.x.x.js"></script>
```

**npm 下载的 SDK** 可使用下面的方法导入。

```typescript
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
// 或
const ZegoSuperBoardManager = require('zego-superboard-web').ZegoSuperBoardManager;
var ZegoExpressEngine = require('zego-express-engine-webrtc').ZegoExpressEngine
```
## 实现超级白板

### 1 初始化 SDK
#### 初始化 ZegoExpress-Video SDK

创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将接入服务器地址传入参数 “server”。

<Note title="说明">
“server” 为接入服务器地址，获取方式如下：

1. 登录 ZEGO 控制台。
2. 在对应项目下单击“查看”。
3. 弹出基本信息后单击“环境配置”下的“查看”按钮。
4. 在弹窗中的“集成的SDK”中选择 “Express” 后，再选择 “Web” 平台便可获取对应的接入服务器地址。
</Note>

```js
// 初始化实例
const zg = new ZegoExpressEngine(appID, server);
```

#### 初始化 ZegoSuperBoard SDK

1. 使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager) 的 [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#get-instance) 方法获取 ZegoSuperBoard 实例。
2. 使用 ZegoSuperBoard 实例的 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#init) 方法初始化 ZegoSuperBoard SDK，这里需要传入 ZegoExpressEngine 的引擎实例。

初始化 SDK 需要用于验证身份的 Token，其获取方式请参考 [用户权限控制](/super-board-web/quick-start/user-access-control#42-生成-token) 中的 “4.2 生成 Token”。


<Warning title="注意">

文件共享在验证身份时不校验 “RoomId” 参数，开发者在生成 Token 的过程中，可将 “RoomId” 参数设置为空字符串。

</Warning>

```html
<!-- 需要挂载的父容器 -->
<div id="parentDomID"></div>
```

```typescript
// 获取 ZegoSuperBoard 实例
zegoSuperBoard = ZegoSuperBoardManager.getInstance();
// 初始化 ZegoSuperBoard，成功则 result 返回 true
const result = await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID', // 需要挂载的父容器 ID
    appID: 0, // 申请到的 AppID
    userID: '', // 用户自定义生成的用户 ID
    token: '' // 登录房间需要用于验证身份的 Token
});
```
<Warning title="注意">

请初始化 ZegoExpress-Video SDK 和 ZegoSuperBoard SDK 成功之后，再调用登录房间接口。

</Warning>

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。

<Warning title="注意">

SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。

</Warning>

[on](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#on): 注册回调事件，通过 event 指定监听事件名。

```javascript
// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
// 监听错误回调，SDK 内部错误均通过此回调抛出，除了直接在接口中直接返回的错误外
zegoSuperBoard.on('error', function(errorData) {
    // 错误码，错误提示语
    console.log(errorData.code, errorData.message)
});

// 监听白板翻页、滚动
zegoSuperBoard.on('superBoardSubViewScrollChanged', function(uniqueID, page, step) {

});
// 监听远端白板缩放
zegoSuperBoard.on('superBoardSubViewScaleChanged', function(uniqueID, scale) {

});

// 监听远端新增白板
zegoSuperBoard.on('remoteSuperBoardSubViewAdded', function(uniqueID) {

});

// 监听远端销毁白板
zegoSuperBoard.on('remoteSuperBoardSubViewRemoved', function(uniqueID) {

});

// 监听远端切换白板
zegoSuperBoard.on('remoteSuperBoardSubViewSwitched', function(uniqueID) {

});

// 监听远端切换 Excel Sheet
zegoSuperBoard.on('remoteSuperBoardSubViewExcelSwitched', function(uniqueID, sheetIndex) {

});

// 监听远端白板权限变更
zegoSuperBoard.on('remoteSuperBoardAuthChanged', function(data) {
    console.log(data.scale, data.scroll)
});

// 监听远端白板图元权限变更
zegoSuperBoard.on('remoteSuperBoardGraphicAuthChanged', function(data) {
    console.log(data.create, data.delete, data.move, data.update, data.clear)
});
```

### 3 登录房间

1. 获取登录 Token

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间，推荐在初始化成功之后调用。登录时，请传入本文 前提条件 所获取到的 Token 进行鉴权。

<Warning title="注意">
临时 Token 仅供调试，正式上线时，请从开发者的业务服务器生成 token，详情可参考 使用 [Token 鉴权](/super-board-web/quick-start/user-access-control)。如果 Token 错误，请参考 [错误码](/super-board-web/error-code) 文档中的 1002067 和 1003072 排查问题。
</Warning>

2. 登录房间

调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口，传入房间 ID 参数 “roomID”、“token” 和用户参数 “user”，根据实际情况传入参数 “config”，登录房间。

<Warning title="注意">
- 在登录房间之前，请先注册登录房间后需要监听的所有回调。成功登录房间后，即可接收相关的回调。
- “roomID”、“userID” 和 “userName” 参数的取值都为自定义。
- “roomID” 和 “userID” 都必须唯一，建议开发者将 “userID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
</Warning>

```js
// 登录房间，成功则返回 true
// userUpdate 设置为 true 才能收到 roomUserUpdate 回调。

let userID = Util.getBrow() + '_' + new Date().getTime();
let userName = "user0001";
let roomID = "0001";
let token = ;
// 为避免错过任何通知，您需要在登录房间前先监听用户加入/退出房间、房间连接状态变更、推流状态变更等回调。
zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {

})
zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(result => {
     if (result == true) {
        console.log("login success")
     }
});

```

### 4 创建白板

超级白板支持创建纯白板和文件白板。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

您可以通过 [roomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#room-state-update) 回调接口，实时接收房间和服务器之间的连接状态变化。**仅当房间状态是连接成功时，才能进行创建白板等操作。**

- 创建纯白板

```typescript
// 上一步的登录房间成功，返回 true 后才可创建白板
const model = await zegoSuperBoard.createWhiteboardView({
    name: '', // 白板名称
    perPageWidth: 1600, // 白板每页宽度
    perPageHeight: 900, // 白板每页高度
    pageCount: 5 // 白板页数
});
```

<a id="fileWhiteboard"></a>

- 创建文件白板

创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-web/basic-func/file-manage) 进行上传。

```typescript
// 上一步的登录房间成功，返回 true 后才可创建白板
const model = await zegoSuperBoard.createFileView({
    fileID // 文件的 fileID，在上传文件成功后返回的唯一文件标识
});
```

<Warning title="注意">

- 一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
- 请通过 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 获取房间内当前的白板数量。

</Warning>

### 5 挂载当前白板
<Warning title="注意">

1. 客户端加入房间时房间内已有白板存在时，因为 ZegoSuperBoard SDK 无法得知 parentDomID 对应的父容器是否已经存在，所以无法主动挂载当前白板到父容器上。
2. 进房成功后，一定要在 parentDomID 对应的父容器存在（物理像素宽高不为0）后，按照以下步骤，先调用 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 接口通知 ZegoSuperBoard SDK 当前白板容器已经存在，并通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardView#switch-super-board-sub-view) 接口挂载当前白板到父容器上

</Warning>

```typescript
// 获取 SuperBoardSubViewList
const superBoardSubViewList = await zegoSuperBoard.querySuperBoardSubViewList();

// 获取 SuperBoardView
const superBoardView = zegoSuperBoard.getSuperBoardView();

// 获取当前 SuperBoardSubView
const zegoSuperBoardSubView = superBoardView.getCurrentSuperBoardSubView()

// 获取 SuperBoardSubView 对应 model
const model = zegoSuperBoardSubView.getModel();

// 获取当前需要挂载白板的 uniqueID
const uniqueID = model.uniqueID;

// 判断文件类型，如果是 Excel 白板，需要先获取到 sheetIndex
let sheetIndex;
const fileType = model.fileType;
if (fileType === 4) {
    // Excel 白板
    const sheetName = zegoSuperBoardSubView.getCurrentSheetName();
    // 获取当前 Excel 对应的 Sheet 列表
    const zegoExcelSheetNameList = zegoSuperBoardSubView.getExcelSheetNameList();
    // 通过 sheetName 从 zegoExcelSheetNameList 中获取到对应的 sheetIndex
    sheetIndex = zegoExcelSheetNameList.findIndex(function(element, index) {
        return element === sheetName;
    });
}

// 挂载当前白板
const result = await superBoardView.switchSuperBoardSubView(uniqueID, sheetIndex);
```

### 6 验证白板创建

运行上述项目的多个实例，登录同一房间ID。用鼠标在任一窗口的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个窗口的 ZegoSuperBoardView 上。

### 7 销毁白板

```typescript
// 销毁后SDK内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个
const result = await zegoSuperBoard.destroySuperBoardSubView(uniqueID)
```

### 8 离开房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#logout-room) 接口退出房间。

```js
zg.logoutRoom(roomID);
```

### 9 反初始化 SDK

#### 反初始化 ZegoSuperBoard SDK

调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager) 的 [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#un-init)，反初始化 ZegoSuperBoard SDK。

```js
zegoSuperBoard.unInit();
```

#### 反初始化 ZEGO Express Video SDK

如果无需再使用 ZEGO Express Video SDK 的能力，即可调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-engine) 销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```js
zg.destroyEngine();
```
