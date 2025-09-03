# 创建超级白板
- - -

## 概念解释
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。
- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard） 的 SDK。
- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardView#switch-super-board-sub-view) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" />
</Frame>

## 前提条件
- 由于 ZegoSuperBoard SDK 需要与配套的 ZegoExpress-Video SDK 搭配使用，如已集成过 ZegoExpress-Video SDK，需要删除旧包并参考本页面重新集成，避免 SDK 版本不匹配造成初始化失败。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](http://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](http://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
- `2.3.0 或以上` 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：
- Android Studio 4.0 或以上版本。
- Android 版本不低于 5.0 且支持音视频的 Android 设备。
- Android 设备已经连接到 Internet。

## 集成 SDK

### 1 （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步骤。" defaultOpen="false">


1. 打开 Android Studio，选择菜单 “File > New > New Project”。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/WhiteBoard/new_project.png" />
  </Frame>

2. 选择项目类型 “Empty Activity”。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/WhiteBoard/new_project_1.png" />
  </Frame>


3. 选择项目存储路径。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/WhiteBoard/new_project_5.png" />
  </Frame>

4. 单击 “Finish” 完成新工程创建。

</Accordion>

### 2 导入 SDK


<Warning title="注意">

ZegoSuperBoard SDK 基于 AndroidX 构建，因此被导入的项目也需要基于 AndroidX 构建。如果开发者的项目不满足该要求，请参考 [迁移到 AndroidX](https://developer.android.google.cn/jetpack/androidx/migrate?hl=zh-cn) 进行迁移。

</Warning>

1. 请参考 [下载 SDK 包](/super-board-android/download-sdk)，下载最新版本的 SDK，下载完成后进行解压。

2. 分别将 zegoexpress.jar及对应 arm64-v8a/armeabi-v7a 文件夹、zegowhiteboardview.aar、zegodocsview.aar、zegosuperboard.aar 文件拷贝到开发者的项目目录 “app/libs/” 文件夹下。

3. 添加 SDK 引用，进入到 “app” 目录，打开 “build.gradle” 文件。

    - 在 “defaultConfig” 节点添加 “ndk” 节点，指定支持的平台类型。

        ```groovy
        ndk {
            abiFilters "armeabi-v7a", 'arm64-v8a'
        }
        ```

    - 在 “android” 节点添加 “sourceSets” 节点，指定 “libs” 所在目录。

        ```groovy
        sourceSets {
            main {
                jniLibs.srcDirs = ['libs']
            }
        }
        ```

4. 在 “app/build.gradle” 文件中的 `dependencies` 节点下添加以下代码:

   ```groovy
   implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
   ```

5. SDK 依赖以下模块，在 “app/build.gradle” 文件中的 `dependencies` 节点下添加以下代码:

    ```groovy
    // recyclerview 推荐使用 1.1.0 版本
    implementation "androidx.recyclerview:recyclerview:1.1.0"
    implementation 'androidx.appcompat:appcompat:1.3.1'
    implementation 'com.google.android.material:material:1.4.0'
   // 如果需要在纯 java 项目中集成,需要添加此依赖项
    implementation 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.4.30'
    ```

    <Warning title="注意">

    recyclerview 推荐使用 1.1.0 版本。
    </Warning>

### 3 设置权限

添加权限声明，打开 "app/AndroidManifest.xml" 文件，添加如下内容：

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

如图所示：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Android/WhiteBoard/new_project_4.png" />
</Frame>

权限说明如下：

|     权限     |     必要性               | 权限说明             | 需要理由                                                     |
| :------- | ---------------------- | -------------------- | ------------------------------------------------------------ |
| INTERNET |       必要权限         | 访问网络权限         | SDK 基本功能都需在联网的情况下才可以使用。                      |
| ACCESS_WIFI_STATE |   必要权限    | 获取当前 WIFI 状态权限 | SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。 |
| ACCESS_NETWORK_STATE |  必要权限  | 获取当前网络状态权限 | SDK 会根据网络状态的改变执行不同的操作。如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。 |
| WRITE_EXTERNAL_STORAGE | 必要权限 | 内置 SD 卡写权限        | 若需要使用媒体播放器或音效播放器加载 Android 外部存储内的媒体资源文件，则需要申请此权限，否则 SDK 无法加载资源。                   |
| READ_EXTERNAL_STORAGE |  必要权限 | 内置 SD 卡读权限        | SDK 会将日志和相关配置文件保存在内置 SD 卡内。                   |


### 4 防止代码混淆

在 proguard-rules.pro 文件中，为 SDK 添加 -keep 类的配置，这样可以防止混淆 SDK 公共类名称。

```bash
-keep class im.zego.zegowhiteboard.**{*;}
-keep class im.zego.zegodocs.**{*;}
-keep class im.zego.superboard.**{*;}
```

## 实现超级白板

### 1 初始化 SDK

#### 初始化 ZEGO Express Video SDK


定义 SDK 引擎对象，调用 [createEngine](http://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine) 接口，将申请到的 AppID 传入参数 “appID”，创建引擎单例对象。

如果需要注册回调，可将实现了 [IZegoEventHandler](http://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler) 的对象传入参数 “eventHandler”。如果不需要注册回调，可将 “null” 传入参数 “eventHandler”，创建引擎后仍需要注册回调时可通过调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-event-handler) 接口设置回调。

```java
// 创建引擎，通用场景接入，并注册 self 为 eventHandler 回调
// 不需要注册回调的话，eventHandler 参数可以传 null，后续可调用 "setEventHandler:" 方法设置回调
ZegoEngineProfile profile = new ZegoEngineProfile();
profile.appID = ;  // 请通过官网注册获取，格式为：1234567890L
profile.appSign = ;  // 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.scenario = ZegoScenario.GENERAL;  // 通用场景接入
profile.application = getApplication();
engine = ZegoExpressEngine.createEngine(profile, null);
```

<Note title="说明">

如果您需要切换鉴权方式，请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Note>

#### 初始化 ZegoSuperBoard SDK

使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager) 的 [init](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#init) 方法初始化 ZegoSuperBoard SDK。

如果回调 onInit 中的 errorCode 为 ZegoSuperBoardError.ZegoSuperBoardSuccess，代表初始化成功，可进行更多操作。errorCode 可参考 [常见错误码](/super-board-android/error-code)。

```java
// 配置superBoard初始化所需要的appID，appSign和UserID
ZegoSuperBoardInitConfig config = new ZegoSuperBoardInitConfig();
config.appID = appID; //赋值 appID
config.appSign = appSign; //赋值 appSign
config.userID = userID; //赋值 userID

// 调用SuperBoardManager初始化SuperBoard sdk
// this 为Android的Application上下文，因此此段代码建议放在Application中实现
ZegoSuperBoardManager.getInstance().init(this, config, new IZegoSuperBoardInitCallback() {
    @Override
    public void onInit(int errorCode) {
        Log.d(TAG, "init ZegoSuperBoardManager result: errorCode = [" + errorCode + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 初始化成功 */
        } else {
            /** 初始化失败 */
        }
    }
});
```

<Warning title="注意">

需要确保 **ZegoExpress-Video SDK** 和 **ZegoSuperBoard SDK** 均初始化成功，即调用了各自的 init() 方法并在回调中返回的errorCode等于ZegoSuperBoardError.ZegoSuperBoardSuccess，才能够执行后续的接口调用。
</Warning>

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。
<Warning title="注意">

SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。

</Warning>


- [onError](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~IZegoSuperBoardManagerListener#on-error)：SDK 抛出的错误码。errorCode 可参考 [常见错误码](/super-board-android/error-code)。
- [onRemoteSuperBoardSubViewAdded](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~IZegoSuperBoardManagerListener#on-remote-super-board-sub-view-added)：远端新增文件白板通知。
- [onRemoteSuperBoardSubViewRemoved](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~IZegoSuperBoardManagerListener#on-remote-super-board-sub-view-removed)：远端销毁文件白板通知。
- [onRemoteSuperBoardSubViewSwitched](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~IZegoSuperBoardManagerListener#on-remote-super-board-sub-view-switched)：远端切换白板文件通知。


```java
// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。
ZegoSuperBoardManager.getInstance().setManagerListener(new IZegoSuperBoardManagerListener() {
    @Override
    public void onError(int errorCode) {
        //SDK 抛出的错误码。可以根据错误码提示用户一些异常情况
    }

    @Override
    public void onRemoteSuperBoardSubViewAdded(@NonNull ZegoSuperBoardSubViewModel subViewModel) {
        //远端新增白板。可以根据model里的信息更新展示的UI内容，例如白板名称等
    }

    @Override
    public void onRemoteSuperBoardSubViewRemoved(@NonNull ZegoSuperBoardSubViewModel subViewModel) {
        //远端删除白板通知
        //收到通知后可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板名称。
    }

    @Override
    public void onRemoteSuperBoardSubViewSwitched(@NonNull String uniqueID) {
        //远端切换白板的通知
        //收到通知后可以根据当前 ZegoSuperBoardManager.getInstance().getSuperBoardView().getCurrentSuperBoardSubView() 的信息更新UI，如更新当前显示白板名称。
    }

});
```

### 3 登录房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine) 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#login-room) 接口登录房间，推荐在初始化成功之后调用。

<Warning title="注意">

1. 需保证 “roomID” 信息的全局唯一。
2. “userID” 与 “userName” 不能为 “null” 否则会导致登录房间失败。
3. ZegoUser 的构造方法 [public ZegoUser(String userID)](https://doc-zh-api.zego.im/Java/class/im-zego-zegoexpress-entity-zego-user#zego-user) 会将 “userName” 设为与传的参数 “userID” 一样。
4. 每个 “userID” 必须唯一，建议设置成一个有意义的值，开发者可将 “userID” 与自己业务账号系统进行关联。
</Warning>

错误码详情请参考 [登录房间错误码 ](http://doc-zh.zego.im/article/4378)。

```java
//登录房间
void loginRoom() {
    // ZegoUser 的构造方法 public ZegoUser(String userID) 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “null” 否则会导致登录房间失败。
    ZegoUser user = new ZegoUser("user2");

    ZegoRoomConfig roomConfig = new ZegoRoomConfig();

    // 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
    roomConfig.isUserStatusNotify = true;

    // roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话
    String roomID = "room1";

    // 登录房间
    engine.loginRoom(roomID, user, roomConfig, (int error, JSONObject extendedData)->{
        // 登录房间结果，如果仅关注登录结果，关注此回调即可
        if (error == 0) {
            // 登录成功
            Toast.makeText(this, "登录成功", Toast.LENGTH_LONG).show();
        } else {
            // 登录失败，请参考 errorCode 说明 https://doc-zh.zego.im/article/4378
            Toast.makeText(this, "登录失败，请参考 errorCode 说明 https://doc-zh.zego.im/article/4378", Toast.LENGTH_LONG).show();
        }
    });
}
```

#### （可选）Token 过期更新
<Accordion title="此步骤介绍 Token 过期时如何处理；如果您未使用 Token 鉴权，可忽略此步。" defaultOpen="false">


监听 Token 过期通知，如果 Token 过期，需要主动更新 Token。

```java
engine.setEventHandler(new IZegoEventHandler() {
    @Override
    public void onRoomTokenWillExpire(String roomID, int remainTimeInSecond) {
        //token即将过期，去服务端获取新的token
        String token = getTokenFromServer();
        engine.renewToken(roomID, token);
        //这里需要同步更新文件token
        ZegoSuperBoardManager.getInstance().renewToken(token);
    }
}
```

</Accordion>


<Warning title="注意">

要判断登录房间是否成功，需要监听onRoomStateUpdate回调。如果 ZegoRoomState 等于 ZegoRoomState.CONNECTED，表示登录房间成功，才能够执行后续的接口调用。
</Warning>

```java
// 创建白板前需要保证登录成功，即房间回调状态为 ZegoRoomState.CONNECTED
engine.setEventHandler(new IZegoEventHandler() {
    /** 以下为常用的房间相关回调 */

    /** 房间状态更新回调 */
    @Override
    public void onRoomStateUpdate(String roomID, ZegoRoomState state, int errorCode, JSONObject extendedData) {
        /** 根据需要实现事件回调 */
        if (state == ZegoRoomState.CONNECTED) {
            // 登录房间成功，需要在登录成功之后才可以创建白板
            // 可以将创建白板的代码放在这里，确保登录房间后创建白板，也可以通过其他方法保证登录成功后再创建白板
        }
    }
});
```

### 4 添加白板视图
在登录房间之后，将 **ZegoSuperBoardView** 直接添加到您的业务场景视图中。示例代码如下:

```java
ZegoSuperBoardView superBoardView = ZegoSuperBoardManager.getInstance().getSuperBoardView();
if (superBoardView != null) {
    // 添加 ZegoSuperBoardView 到指定视图中（以 Demo 中的 boardContainer 视图容器为例）。
    boardContainer.addView(superBoardView, new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT,
            Gravity.CENTER));
}
```

### 5 创建白板

超级白板支持创建纯白板和文件白板。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

创建白板前需要保证登录成功，建议可在登录成功的回调中调用创建纯白板或文件白板的接口。
```java
// 创建白板前需要保证登录成功，即房间回调状态为 ZegoRoomState.CONNECTED
engine.setEventHandler(new IZegoEventHandler() {
    /** 以下为常用的房间相关回调 */

    /** 房间状态更新回调 */
    @Override
    public void onRoomStateUpdate(String roomID, ZegoRoomState state, int errorCode, JSONObject extendedData) {
        /** 根据需要实现事件回调 */
        if (state == ZegoRoomState.CONNECTED) {
            // 登录房间成功，需要在登录成功之后才可以创建白板
            // 可以将创建纯白板或文件白板的代码放在这里，确保登录房间后创建白板，也可以通过其他方法保证登录成功后再创建白板
        }
    }
});
```

- 创建纯白板

```java
// 创建白板需要构造 ZegoCreateWhiteboardConfig 配置类，具体字段解释如下
ZegoCreateWhiteboardConfig config = new ZegoCreateWhiteboardConfig();
// 白板名称
config.name = "一个测试白板";
// 白板页数
config.pageCount = 5;
// 一页白板的宽度
config.perPageWidth = 960;
// 一页白板的高度
config.perPageHeight = 540;

ZegoSuperBoardManager.getInstance().createWhiteboardView(config, new IZegoSuperBoardCreateCallback() {
    @Override
    public void onViewCreated(int errorCode, @Nullable ZegoSuperBoardSubViewModel subViewModel) {
        Log.d(TAG, "createWhiteboardView() called with: errorCode = [" + errorCode + "], subViewModel = [" + subViewModel + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 创建成功 */
        } else {
            /** 创建失败 */
        }
    }
});
```

<a id="fileWhiteboard"></a>

- 创建文件白板

创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-android/basic-func/file-manage) 进行上传。

```java
// 创建文件需要构造 ZegoCreateFileConfig 配置类
ZegoCreateFileConfig config = new ZegoCreateFileConfig();
// 文件的fileID，在上传文件成功后可以拿到
config.fileID = fileID;
ZegoSuperBoardManager.getInstance().createFileView(config, new IZegoSuperBoardCreateCallback() {
    @Override
    public void onViewCreated(int errorCode, @Nullable ZegoSuperBoardSubViewModel subViewModel) {
        Log.d(TAG, "createFileView() called with: errorCode = [" + errorCode + "], subViewModel = [" + subViewModel + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 创建成功 */
        } else {
            /** 创建失败 */
        }
    }
});
```

<Warning title="注意">

- 一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
- 请通过 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#query-super-board-sub-view-list) 获取房间内当前的白板数量。

</Warning>

### 6 验证白板创建

使用多台设备运行上述项目，登录同一房间ID。用手指在任一设备的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个设备 ZegoSuperBoardView 上。

### 7 销毁白板
```java
//销毁后SDK内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个

//subViewModel 是白板共享列表 ZegoSuperBoardManager.getInstance().getSuperBoardSubViewModelList() 中的一个model
ZegoSuperBoardManager.getInstance().destroySuperBoardSubView(uniqueId, new IZegoSuperBoardDestroyCallback() {
    @Override
    public void onViewDestroyed(int errorCode) {
        Log.d(TAG, "onViewDestroyed() called with: errorCode = [" + errorCode + "]");
        if (errorCode == ZegoSuperBoardError.ZegoSuperBoardSuccess) {
            /** 销毁成功 */
        } else {
            /** 销毁失败 */
        }
    }
});
```

### 8 离开房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine) 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#logout-room-2) 接口退出房间。


```java
engine.logoutRoom(roomID);
```

### 9 反初始化 SDK

#### 反初始化 ZegoSuperBoard SDK

调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager) 的 [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~java_android~class~ZegoSuperBoardManager#un-init)，反初始化 ZegoSuperBoard SDK。

```java
//推荐离开房间的时候，反初始化 ZegoSuperBoard SDK
ZegoSuperBoardManager.getInstance().unInit();
```

#### 反初始化 ZEGO Express Video SDK

如果无需再使用 ZEGO Express Video SDK 的能力，即可调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine) 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#destroy-engine) 销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```java
 ZegoExpressEngine.destroyEngine(null);
```
