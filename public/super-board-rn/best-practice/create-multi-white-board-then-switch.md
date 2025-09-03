# 创建多个白板并切换

- - -
## 功能简介
该文档展示了如何使用超级白板 SDK 创建多个不同的白板并自由切换显示。本文档示例的场景如下：
1. 开发者依次创建了一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板。
2. 开发者切换 Excel 至指定 sheet。
3. 开发者切换到动态 PPT，逐步演示 PPT。
4. 开发者切换到纯白板，写下一行字后放大显示。

开发者可参考本文中的实现以及 ZEGO 提供的 [示例源码](/super-board-rn/quick-start/run-demo)，根据自己的业务场景组合代码以满足业务需求。

## 前提条件

已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

## 实现流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/Superboard_bestpractice.png" /></Frame>

流程中以 A 端创建并操作白板，B 端观看白板为例；图中的虚线表示 A 端进行操作时，B 端可在收到的对应回调中获取相关信息。

### 1. 初始化 SDK 并登录房间

请参考 [快速开始](/super-board-rn/quick-start/create-white-board) 完成 SDK 的集成与初始化，并登录房间。

#### 初始化 SDK
```javascript
// 请先完成 SDK 的集成再运行下面的代码
// 初始化 ZegoExpressEngine
// 以下初始化的示例代码建议放在应用启动时执行
// 采用通用场景
const profile = {
    appID : xxx,
    // AppSign 仅满足简单的鉴权需求，如果需要升级为更加安全的鉴权方式，请参考[如何从 AppSign 鉴权升级为 Token 鉴权](https://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo&platform=all)
    // AppSign 可通过[控制台](https://console.zego.im/dashboard)获取，格式为 @"39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    appSign: '39011cbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    scenario : 0
};

var engine = ZegoExpressEngine.createEngineWithProfile(profile)

if (engine != null) {
    var superboardConfig = {
      appID: YOURAPPID,
      appSign: 'YOURAPPSIGN',
    };

initSuperboad = async () => {
    // 初始化 ZegoSuperBoard SDK
    const superboard_init_res = await ZegoSuperBoardManager.init(superboardConfig);
    // 初始化结果
    console.log('Result', superboard_init_res);
  };
initSuperboad()
}
```

#### 登录房间

```javascript
// 登录房间的前提是已经成功初始化Express SDK
// 开始登录房间
engine.loginRoom('room1', {'userID': 'id1', 'userName': 'user1'});
```

### 2. 创建白板

<Note title="说明">

创建文件白板使用的文件需要先上传，详见 [共享文件管理](/super-board-rn/basic-func/file-manage)。
</Note>

定义一个挂载白板的区域

```javascript
<ZegoSuperBoardRenderView ref={this.refContainer} style={[styles.boardView]} />
```

```javascript
// 登录房间成功后，需将该区域传入，仅需操作一次
const tag = findNodeHandle(this.refContainer.current);
    await ZegoSuperBoardManager.setContainerView({
      reactTag: tag,
    });
```

```javascript
// 以下示例代码定义两个封装方法，可以分别实现创建纯白板和创建文件白板的功能

/**
 * 创建纯白板
 */
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()

const res = await zegoSuperBoard.createWhiteboardView({
    name: 'test whiteboard', // 创建的白板名称
    pageCount: 5, // 创建的白板页数
    perPageWidth: 960, // 页宽
    perPageHeight: 540,// 页高
});

/**
 * 创建指定文件白板
 * 动态 PPT、Excel 等文件白板都可通过此方法创建
 * @param fileID 文件 ID，上传文件转码成功后可以拿到
 */
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
const res = await zegoSuperBoard.createFileView({
    fileID,// 文件id
});
```

白板依次创建完成后，SuperBoardView 自动多端同步，默认显示最新创建的白板，即 Excel 文件白板, B 端在 A 端每次创建白板后都会收到 [remoteSuperBoardSubViewAdded](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~interface~ZegoEvent#remote-super-board-sub-view-added) 通知，在对应回调内刷新本地 UI 逻辑即可。

**注册 SuperBoardManager Listener回调方法，监听远端白板新增、销毁、切换的动作。**

```javascript
// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
// 监听错误回调，SDK 内部错误均通过此回调抛出，除了直接在接口中直接返回的错误外

    // 获取实例
    var zegoSuperBoard = ZegoSuperBoardManager.getInstance()

    // 监听远端新增白板
    zegoSuperBoard.on('remoteSuperBoardSubViewAdded', function(name,createTime,fileID,fileType,uniqueID,whiteboardIDList) {

    });

    // 监听远端销毁白板
    zegoSuperBoard.on('remoteSuperBoardSubViewRemoved', function(name,createTime,fileID,fileType,uniqueID,whiteboardIDList) {

    });

    // 监听远端切换白板
    zegoSuperBoard.on('remoteSuperBoardSubViewSwitched', function(uniqueID) {

    });
```

**注册 SuperBoardView 回调方法，监听 SuperBoardView 滚动、翻页的行为。**

```javascript
     // 获取实例
    var zegoSuperBoard = ZegoSuperBoardManager.getInstance()

    // 监听白板翻页、滚动
    zegoSuperBoard.on('scrollChange', function(name,createTime,fileID,fileType,uniqueID,whiteboardIDList,currentPage,pageCount) {

    });

```

通过 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardSubView#set-operation-mode) 设置权限可控制客户端是否可操作白板。

拥有权限的客户端可以在白板上进行绘制，详情请参考 [白板绘制](/super-board-rn/basic-func/sketch)。

### 3. 切换 Excel 至指定 sheet

A 端切换至 Excel 到第二个 sheet。

```javascript
// A 端操作
// 获取实例
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
// 切换 Excel 到第二个 sheet
await zegoSuperBoard.getSuperBoardView().switchSuperBoardSubViewWithSheetIndex(model2.uniqueID,1);
```

B 端在 A 端切换 Excel sheet 后会自动同步切换，同时收到 [scrollChange](https://doc-zh.zego.im/) 通知，在对应回调内刷新本地 UI 逻辑即可。

### 4. 切换到动态 PPT 并演示

A 端切换至动态 PPT。
```javascript
// A 端操作
// 获取实例
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
await zegoSuperBoard.getSuperBoardView().switchSuperBoardSubView(model2.uniqueID);
```

切换至动态 PPT 后，可通过跳步/翻页接口或点击工具进行 PPT 演示，详情请参考 [白板翻页](/super-board-rn/basic-func/scale-and-flip)。

B 端在 A 端切换白板后会自动同步切换，同时收到 [remoteSuperBoardSubViewSwitched](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~interface~ZegoEvent#remote-super-board-sub-view-switched) 通知，在对应回调内刷新本地 UI 逻辑即可。

### 5. 切换到纯白板进行绘制

如果需要各端之间同步缩放效果，需要在各端上都开启同步缩放和响应缩放。

```javascript
// 如需本端和对端缩放同步
ZegoSuperBoardManager.getInstance().enableSyncScale(true);// 同步缩放至其他端
ZegoSuperBoardManager.getInstance().enableResponseScale(true);// 响应其他端同步过来的缩放
```

A 端切换至纯白板，使用文本工具在白板上写字，然后可使用手势进行缩放。

```javascript
// A 端操作
// 切换至目标白板
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
await zegoSuperBoard.getSuperBoardView().switchSuperBoardSubView(uniqueID);

// 默认白板工具为画笔，如需设置其他工具类型，请调用 setToolType 接口
// 举例：设置白板工具为文本，然后点击白板上想要显示文本的位置后输入文本即可
zegoSuperBoard.setToolType(2)

// 获取当前显示的白板
var curSubView = zegoSuperBoardSubView.getSuperBoardView().getCurrentSuperBoardSubView();
```

B 端在 A 端切换白板后会自动同步切换，同时收到 [remoteSuperBoardSubViewSwitched](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~interface~ZegoEvent#remote-super-board-sub-view-switched) 通知，上一步中已实现该回调。

## API 参考列表
| 方法                                                                                                                                                                   | 描述                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [createEngineWithProfile](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) | 创建 ZegoExpressEngine 单例对象并初始化 SDK |
| [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#get-instance)                                                                                                                                    | 获取 ZegoSuperBoardManager 实例对象         |
| [init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#init)                                                                                                                                                  | 初始化 ZegoSuperBoard SDK                   |
| [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom)                             | 登录房间                                    |
| [createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#create-whiteboard-view)                                                                                                                  | 创建纯白板                                  |
| [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#create-file-view)                                                                                                                              | 创建文件白板                                |
| [getSuperBoardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#get-super-board-view)                                                                                                                        | 获取 BoardView 对象                         |
| [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardView#switch-super-board-sub-view)                                                                                                            | 切换到指定的SuperBoardSubView               |
| [enableSyncScale](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#enable-sync-scale)                                                                                                                            | 设置是否将缩放同步给房间内其他成员          |
| [enableResponseScale](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#enable-response-scale)                                                                                                                    | 是否响应房间内其他成员的缩放                |
| [setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#set-tool-type)                                                                                                                                    | 设置白板工具类型                            |
