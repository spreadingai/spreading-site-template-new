# 创建多个白板并切换

- - -
## 功能简介
该文档展示了如何使用超级白板 SDK 创建多个不同的白板并自由切换显示。本文档示例的场景如下：
1. 开发者依次创建了一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板。
2. 开发者切换 Excel 至指定 sheet。
3. 开发者切换到动态 PPT，逐步演示 PPT。
4. 开发者切换到纯白板，写下一行字后放大显示。

开发者可参考本文中的实现以及 ZEGO 提供的 [示例源码](/super-board-android/quick-start/run-demo)，根据自己的业务场景组合代码以满足业务需求。

## 实现流程


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/Superboard_bestpractice.png" /></Frame>

流程中以 A 端创建并操作白板，B 端观看白板为例；图中的虚线表示 A 端进行操作时，B 端可在收到的对应回调中获取相关信息。

开始前，请满足以下条件：

已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

2.3.0 或以上 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>

### 1. 初始化 SDK 并登录房间

请参考 [快速开始](/super-board-android/quick-start/run-demo) 完成 SDK 的集成与初始化，并登录房间。

#### 初始化 SDK
```java
// 请先完成 SDK 的集成再运行下面的代码
// 初始化 ZegoExpressEngine
// 以下初始化的示例代码建议放在应用启动时执行
/** 定义 SDK 引擎对象 */
ZegoExpressEngine engine;

ZegoEngineProfile profile = new ZegoEngineProfile();
/** 请通过官网注册获取，格式为 123456789L */
profile.appID = appID;
/** 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符） */
profile.appSign = appSign;
/** 通用场景接入 */
profile.scenario = ZegoScenario.DEFAULT;
/** 设置app的application 对象 */
profile.application = getApplication();
/** 创建引擎 */
engine = ZegoExpressEngine.createEngine(profile, null);

if (engine != null) {
    // 配置superBoard初始化所需要的appID和对应的appSign
    ZegoSuperBoardInitConfig config = new ZegoSuperBoardInitConfig();
    config.appID = appID;
    config.appSign = appSign;
    config.userID = userID;

    // 调用SuperBoardManager初始化SuperBoard sdk
    ZegoSuperBoardManager.getInstance().init(application, config, errorCode -> {
        Log.d(TAG, "init ZegoSuperBoardManager result: errorCode = [" + errorCode + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 初始化成功 */
        } else {
            /** 初始化失败 */
        }
    });
}
```

<Note title="说明">

如果您需要切换鉴权方式，请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Note>

#### 登录房间

```java
// 登录房间的前提是已经成功初始化Express SDK

// 在实现类中定义两个成员变量（具体可参考示例 Demo 中的 ZegoExpressWrapper.java 文件）
// 是否正在登录房间
private boolean isLoginRoom = false;
// 登录房间后的回调
private SDKLoginCallback loginResult;

// 注册房间状态回调
engine.setEventHandler(new IZegoEventHandler() {
    @Override
    public void onRoomStateUpdate(String roomID, ZegoRoomState state, int errorCode, JSONObject extendedData) {
        Log.d(TAG, "onRoomStateUpdate:state :" + state + ",errorCode: " + errorCode);
        switch (state) {
            case DISCONNECTED: {
                if (isLoginRoom) {
                    if (loginResult != null) {
                        loginResult.onResult(errorCode);
                    }
                    //重置bool变量
                    isLoginRoom = false;
                }
            }
            break;
            case CONNECTED: {
                if (isLoginRoom) {
                    // 这里会回调登录房间成功回调
                    if (loginResult != null) {
                        loginResult.onResult(errorCode);
                    }
                    //重置bool变量
                    isLoginRoom = false;
                }
            }
            break;
        }
    }
});

String userID = "66668888";
String userName = "测试01";
// 生成用户信息
ZegoUser user = new ZegoUser(userID, userName);
// 设置房间属性
ZegoRoomConfig roomConfig = new ZegoRoomConfig();
roomConfig.isUserStatusNotify = true;
engine.loginRoom(roomID, user, roomConfig);
// 标记正在登录房间
isLoginRoom = true;
```

### 2. 创建白板

<Note title="说明">

创建文件白板使用的文件需要先上传，详见 [共享文件管理](/super-board-android/basic-func/file-manage)。

</Note>

```java
// 以下示例代码定义两个封装方法，可以分别实现创建纯白板和创建文件白板的功能

/**
 * 创建纯白板
 */
private void createWhiteboardView() {
    // 创建白板需要构造 ZegoCreateWhiteboardConfig 配置类
    ZegoCreateWhiteboardConfig config = new ZegoCreateWhiteboardConfig();
    // 具体字段解释如下
    // 白板名称
    config.name = "纯白板01";
    // 白板页数
    config.pageCount = 5;
    // 一页白板的宽度
    config.perPageWidth = 960;
    // 一页白板的高度
    config.perPageHeight = 540;
    ZegoSuperBoardManager.getInstance().createWhiteboardView(config, (errorCode, subViewModel) -> {
        Log.d(TAG, "createPureWhiteboardView() called with: errorCode = [" + errorCode + "], subViewModel = [" + subViewModel + "]");
        if (errorCode == 0) {
            Log.d(TAG,"创建白板成功");
        } else {
            Log.d(TAG,"创建白板失败，errorCode：" + errorCode);
        }
    });
}

/**
 * 创建指定文件白板
 * 动态 PPT、Excel 等文件白板都可通过此方法创建
 * @param fileID 文件id，上传文件转码成功后可以拿到
 */
private void createFileBoardView(String fileID) {
    // 创建文件需要构造 ZegoCreateFileConfig 配置类
    ZegoCreateFileConfig config = new ZegoCreateFileConfig();
    // 文件的fileID，在上传文件成功后可以拿到
    config.fileID = fileID;
    ZegoSuperBoardManager.getInstance().createFileView(config, (errorCode, subViewModel) -> {
        Log.d(TAG, "createFileView - onViewCreated() called with: errorCode = [" + errorCode + "], subViewModel = [" + subViewModel + "]");
        if (errorCode == 0) {
            Log.d(TAG,"创建文件成功");
        } else {
            Log.d(TAG,"创建文件失败，errorCode：" + errorCode);
        }
    });
}
```
使用如下，例如 A 端分别创建一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板：
```java
// A 端操作
// 上一步的登录房间成功，返回 true 后才可创建白板
// 创建普通白板
createWhiteboardView();

// 创建动态 PPT 文件白板
createFileBoardView(fileID);

// 创建 Excel 文件白板
createFileBoardView(fileID);
```

白板依次创建完成后，SuperBoardView 自动多端同步，默认显示最新创建的白板，即 Excel 文件白板, B 端在 A 端每次创建白板后都会收到 onRemoteSuperBoardSubViewAdded 通知，在对应回调内刷新本地 UI 逻辑即可。

**注册 SuperBoardManager Listener回调方法，监听远端白板新增、销毁、切换的动作。**

```java
ZegoSuperBoardManager.getInstance().setManagerListener(new IZegoSuperBoardManagerListener() {
    @Override
    public void onError(int errorCode) {
        Log.d(TAG, "onError() called with: errorCode = [" + errorCode + "]");
        // SDK 内部的错误都会从这里抛出来
    }

    @Override
    public void onRemoteSuperBoardSubViewAdded(@NonNull ZegoSuperBoardSubViewModel subViewModel) {
        Log.d(TAG, "onRemoteSuperBoardSubViewAdded() called with: subViewModel = [" + subViewModel + "]");
        // 收到远端新增的白板
    }

    @Override
    public void onRemoteSuperBoardSubViewRemoved(@NonNull ZegoSuperBoardSubViewModel subViewModel) {
        Log.d(TAG, "onRemoteSuperBoardSubViewRemoved() called with: subViewModel = [" + subViewModel + "]");
        // 收到远端销毁的白板
    }

    @Override
    public void onRemoteSuperBoardSubViewSwitched(@NonNull String uniqueID) {
        Log.d(TAG, "onRemoteSuperBoardSubViewSwitched() called with: uniqueID = [" + uniqueID + "]");
        // 收到远端切换白板
    }
});

```
**注册 SuperBoardView Listener回调方法，监听 SuperBoardView 滚动、翻页的行为。**

```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
if (superBoardView != null) {
    superBoardView.setBoardViewListener(new IZegoSuperBoardViewListener() {
        @Override
        public void onScrollChange(int currentPage, int pageCount, ZegoSuperBoardSubViewModel subViewModel) {
            // 滚动监听
            // 当前页、总页数
        }

        @Override
        public void onSizeChange(Size visibleSize, ZegoSuperBoardSubViewModel subViewModel) {
            // subView 大小变更的回调监听
        }
    });
}
```

通过 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardSubView#set-operation-mode) 设置权限可控制客户端是否可操作白板。

拥有权限的客户端可以在白板上进行绘制，详情请参考 [白板绘制](/super-board-android/basic-func/sketch)。

### 3. 切换 Excel 至指定 sheet

A 端切换至 Excel 到第二个 sheet。
```java
ZegoSuperBoardView superBoardView = getSuperBoardView();
if (superBoardView != null) {
    ZegoSuperBoardSubViewModel subViewModel = getCurrentSubViewModel();
    if (subViewModel != null) {
        // A 端操作
        // 切换 Excel 到第二个 sheet
        superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, 1, errorCode -> {
            if (errorCode == 0) {
                Log.d(TAG, "切换sheet成功");
            } else {
                Log.d(TAG, "切换sheet失败，errorCode：" + errorCode);
            }
        });
    }
}
```

B 端在 A 端切换 Excel sheet 后会自动同步切换，同时收到 **onRemoteSuperBoardSubViewSwitched** 通知，在对应回调内刷新本地 UI 逻辑即可。

### 4. 切换到动态 PPT 并演示

A 端切换至动态 PPT。
```java
// A 端操作
ZegoSuperBoardView superBoardView = getSuperBoardView();
if (superBoardView != null) {
    // 切换白板
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, errorCode -> {
        if (errorCode == 0) {
            Log.d(TAG, "切换subView成功");
        } else {
            Log.d(TAG, "切换subView失败，errorCode：" + errorCode);
        }
    });
}
```
切换至动态 PPT 后，可通过跳步/翻页接口或点击工具进行 PPT 演示，详情请参考 [白板翻页](/super-board-android/basic-func/scale-and-flip)。

B 端在 A 端切换白板后会自动同步切换，同时收到 **onRemoteSuperBoardSubViewSwitched** 通知，在对应回调内刷新本地UI逻辑即可。

### 5. 切换到纯白板进行绘制
如果需要各端之间同步缩放效果，需要在各端上都开启同步缩放和响应缩放。
```java
// 如需本端和对端缩放同步
ZegoSuperBoardManager.getInstance().enableSyncScale(true);// 同步缩放至其他端
ZegoSuperBoardManager.getInstance().enableResponseScale(true);// 响应其他端同步过来的缩放
```

A 端切换至纯白板，使用文本工具在白板上写字，然后可使用手势进行缩放。
```java
// A 端操作
// 切换至目标白板
ZegoSuperBoardView superBoardView = getSuperBoardView();
if (superBoardView != null) {
    // 切换白板
    superBoardView.switchSuperBoardSubView(subViewModel.uniqueID, errorCode -> {
        if (errorCode == 0) {
            // 默认白板工具为画笔，如需设置其他工具类型，请调用 setToolType
            // 举例：设置白板工具为文本，然后点击白板上想要显示文本的位置后输入文本即可
            ZegoSuperBoardManager.getInstance().setToolType(ZegoSuperBoardTool.Pen);
            Log.d(TAG, "切换subView成功");
        } else {
            Log.d(TAG, "切换subView失败，errorCode：" + errorCode);
        }
    });
}

```
B 端在 A 端切换白板后会自动同步切换，同时收到 **onRemoteSuperBoardSubViewSwitched** 通知，上一步中已实现该回调。


## API 参考列表
| 方法        | 描述           |
| ----------- | -------------- |
|[createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#create-engine)  | 创建 ZegoExpressEngine 单例对象并初始化 SDK  |
|[getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#get-instance)| 获取 ZegoSuperBoardManager 实例对象  |
|[init](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#init)| 初始化 ZegoSuperBoard SDK  |
|[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#login-room) | 登录房间  |
|[createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#create-whiteboard-view) | 创建纯白板  |
|[createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#create-file-view)| 创建文件白板|
|[getSuperBoardView](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#get-super-board-view)| 获取 BoardView 对象|
|[switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardView#switch-super-board-sub-view)| 切换到指定的SuperBoardSubView|
|[enableSyncScale](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#enable-sync-scale)| 设置是否将缩放同步给房间内其他成员|
|[enableResponseScale](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#enable-response-scale)| 是否响应房间内其他成员的缩放|
|[setToolType](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#set-tool-type)| 设置白板工具类型|
