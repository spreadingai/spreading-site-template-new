# 创建超级白板
- - -

<Note title="说明">

本文档适用于以下平台：iOS、Android。
</Note>

## 概念解释
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。
- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard） 的 SDK。
- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardView#switch-super-board-sub-view) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" /></Frame>

## 前提条件

- ZegoSuperBoard SDK 需要与 ZegoExpress-Video SDK 搭配使用，请根据 [此网页](https://www.npmjs.com/package/zego-express-engine-whiteboard-reactnative?activeTab=readme) 获取并集成 ZegoExpress-Video SDK。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。

<Warning title="注意">

使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](https://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
</Warning>


## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：

- React Native 0.60 或以上版本。
- iOS 9.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- Android 版本不低于 5.0 且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
- iOS/Android 设备已经连接到 Internet。
- 安装 [Node.js](https://nodejs.org/en/)，推荐使用其官网首页展示的长期支持版。

## （可选）新建项目


<Accordion title="如果您已有项目，可跳过此步骤。" defaultOpen="false">
如果您需要了解如何创建一个 React Native 项目，请参考React Native 官方文档 [Setting up the development environment](https://www.reactnative.dev/docs/environment-setup)。
</Accordion>


## 项目配置

### iOS

1. 安装 CocoaPods，安装方法及常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/article/13860)

2. 在项目的 iOS 目录中执行 `pod install` 命令安装 SDK。

### Android

#### 添加依赖

超级白板 SDK 依赖以下模块，在 “您的项目/android/app/build.gradle” 文件中的 `dependencies` 节点下添加以下代码:

```groovy
implementation 'androidx.appcompat:appcompat:1.3.1'
implementation 'com.google.android.material:material:1.4.0'
implementation 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.4.30'
```

#### 设置权限

添加权限声明，打开 "您的项目/android/app/src/main/AndroidManifest.xml" 文件，添加如下内容：

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

如图所示：

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/WhiteBoard/new_project_4.png" />
</Frame>

权限说明如下：

| 权限	| <p style={{width:"4em"}}>必要性</p> |	<p style={{width:"6em"}}>权限说明</p> |	需要理由 |
|---|---|---|---|
| INTERNET |	必要权限 |	访问网络权限 |	SDK 基本功能都需在联网的情况下才可以使用。 |
| ACCESS_WIFI_STATE |	必要权限 |	获取当前 WIFI 状态权限 | SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。|
| ACCESS_NETWORK_STATE |	必要权限 |	获取当前网络状态权限 |	SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。|
| WRITE_EXTERNAL_STORAGE |	必要权限 |	内置 SD 卡写权限 |	若需要使用媒体播放器或音效播放器加载 Android 外部存储内的媒体资源文件，则需要申请此权限，否则 SDK 无法加载资源。|
| READ_EXTERNAL_STORAGE |	必要权限 |	内置 SD 卡读权限 |	SDK 会将日志和相关配置文件保存在内置 SD 卡内。|

#### 防止混淆

在 “您的项目/android/app/proguard-rules.pro” 文件中，为 SDK 添加 -keep 类的配置，这样可以防止混淆 SDK 公共类名称。

```pro
-keep class im.zego.zegowhiteboard.**{*;}
-keep class im.zego.zegodocs.**{*;}
-keep class im.zego.superboard.**{*;}
```

## 集成 SDK

通过终端进入您的项目的根目录，并通过 yarn/npm 的命令来安装 SDK（**请联系 ZEGO 技术支持了解相关命令**）。

## 导入 SDK

使用下面的方法导入 Express Video SDK 和 超级白板 SDK。

```typescript
import ZegoExpressEngine from 'zego-express-engine-whiteboard-reactnative';
import ZegoSuperBoardManager, {ZegoSuperBoardRenderView} from 'zego-superboard-reactnative';
```

## 实现超级白板

### 1 初始化 SDK

#### 初始化 ZegoExpress-Video SDK

调用 Express Video SDK 的 [createEngineWithProfile ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createenginewithprofile) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。


如果需要注册回调方法，开发者可根据实际需要，实现 Express Video SDK 的 [ZegoEventListener](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html) 中的某些方法，创建引擎后可通过调用 [on](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#on) 接口设置回调。

```javascript
// 采用通用场景
const profile = {
    appID: YOURAPPID,
    // AppSign 可通过[控制台](https://console.zego.im/dashboard)获取
    appSign: 'YOURAPPSIGN',
    scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```


#### 初始化 ZegoSuperBoard SDK

使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager) 的 [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#get-instance) 方法获取 ZegoSuperBoard 实例。

```typescript
const superboardConfig = {
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
```

<Warning title="注意">

请初始化 ZegoExpress-Video SDK 和 ZegoSuperBoard SDK 成功之后，再调用登录房间接口。
</Warning>

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。

<Warning title="注意">

SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地 UI 逻辑即可。
</Warning>

[on](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#on): 注册回调事件，通过 event 指定监听事件名。

```javascript
// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
// 监听错误回调，SDK 内部错误均通过此回调抛出，除了直接在接口中直接返回的错误外

    // 获取实例
    var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
    zegoSuperBoard.on('error', function(errorData) {
        // 错误码，错误提示语
        console.log(errorData.code, errorData.message)
    });

    // 监听白板翻页、滚动
    zegoSuperBoard.on("scrollChange", function (name, createTime, fileID, fileType, uniqueID, whiteboardIDList, currentPage, pageCount) {}
    );

    // 监听远端新增白板
    zegoSuperBoard.on("remoteSuperBoardSubViewAdded", function (name, createTime, fileID, fileType, uniqueID, whiteboardIDList) {});

    // 监听远端销毁白板
    zegoSuperBoard.on("remoteSuperBoardSubViewRemoved", function (name, createTime, fileID, fileType, uniqueID, whiteboardIDList) {});

    // 监听远端切换白板
    zegoSuperBoard.on("remoteSuperBoardSubViewSwitched", function (uniqueID) {});

    // 监听远端白板权限变更
    zegoSuperBoard.on("remoteSuperBoardAuthChanged", function (data) {});

    // 监听远端白板图元权限变更
    zegoSuperBoard.on("remoteSuperBoardGraphicAuthChanged", function (data) {});

```

### 3 登录房间

您可以调用 Express Video SDK 的 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间，推荐在初始化成功之后调用。如果房间不存在，调用该接口时会创建并登录此房间。

roomID 和 user 的参数由您本地生成，但是需要满足以下条件：

- 同一个 AppID 内，需保证 “roomID” 全局唯一。
- 同一个 AppID 内，需保证 “userID” 全局唯一，建议开发者将 “userID” 与自己业务的账号系统进行关联。

```javascript
// 登录房间
ZegoExpressEngine.instance().loginRoom('room1', {'userID': 'id1', 'userName': 'user1'});
```

```javascript

// 以下为常用的房间相关回调

ZegoExpressEngine.instance().on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
  // 房间状态更新回调，登录房间后，当房间连接状态发生变更（如出现房间断开，登录认证失败等情况），SDK会通过该回调通知
}); ;
```

### 4 创建白板

超级白板支持创建纯白板和文件白板。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

创建白板前需要保证登录成功，即登录房间返回 true 后才可创建白板。

#### 创建纯白板

1. 定义一个挂载白板的区域

```javascript
<ZegoSuperBoardRenderView ref={refContainer} style={{ height: 500, width: 300 } />
```
<Warning title="注意">
挂载白板的区域的宽高不得小于 0。
</Warning>

2. 创建纯白板

```typescript
// 登录房间成功后才可创建纯白版

// 登录成功后，需将该区域传入
const tag = findNodeHandle(refContainer.current);
    await ZegoSuperBoardManager.setContainerView({
      reactTag: tag,
    });

// 获取实例
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
const res = await zegoSuperBoard.createWhiteboardView({
    name: 'test whiteboard', // 创建的白板名称
    pageCount: 5, // 创建的白板页数
    perPageWidth: 960, // 页宽
    perPageHeight: 540,// 页高
});
```

<a id="fileWhiteboard"></a>

#### 创建文件白板

创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-rn/basic-func/file-manage) 进行上传。

```typescript
// 登录房间成功后才可创建文件白板
// Get Instance
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
const res = await zegoSuperBoard.createFileView({
    fileID,
});
```

<Warning title="注意">

- 一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
- 请通过 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 获取房间内当前的白板数量。
</Warning>

### 5 验证白板创建

使用多台设备运行上述项目，登录同一房间 ID。用手指在任一设备的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个设备的 ZegoSuperBoardView 上。

### 6 销毁白板

```typescript
// 销毁后 SDK 内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个
// subViewModel 是白板共享列表 ZegoSuperBoardManager.getInstance().querySuperBoardSubViewList() 中的一个 model
// Get Instance
var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
const result = await zegoSuperBoard.destroySuperBoardSubView(uniqueID)
```

### 7 离开房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html) 的 [logoutRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#logoutroom) 接口退出房间。

```js
engine.logoutRoom(roomID);
```

### 8 反初始化 SDK

#### 反初始化 ZegoSuperBoard SDK

调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager) 的 [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_react-native~class~ZegoSuperBoardManager#un-init)，反初始化 ZegoSuperBoard SDK。

```js
ZegoSuperBoardManager.getInstance().unInit();
```

#### 反初始化 ZEGO Express Video SDK

如果无需再使用 ZEGO Express Video SDK 的能力，即可调用 [ZegoExpressEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html) 的 [destroyEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#destroyengine) 销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```js
ZegoExpressEngine.destroyEngine();
```


## 常见问题

#### 对于处于中国大陆的开发者，如果因为网络原因下载依赖失败，进而在 Android 设备上运行代码失败，应该如何处理？

在项目的 "/android/build.gradle" 文件的 `allprojects` 节点下添加以下代码，获取相关依镜像依赖：

```groovy
maven { url 'https://maven.aliyun.com/repository/public' }
maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
```
