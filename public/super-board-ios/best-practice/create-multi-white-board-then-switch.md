# 创建多个白板并切换

- - -

## 功能简介
该文档展示了如何使用超级白板 SDK 创建多个不同的白板并自由切换显示。本文档示例的场景如下：

1. 开发者依次创建了一个普通白板，一个动态 PPT 文件白板和一个 Excel 文件白板。
2. 开发者切换 Excel 至指定 sheet。
3. 开发者切换到动态 PPT，逐步演示 PPT。
4. 开发者切换到纯白板，写下一行字后放大显示。

开发者可参考本文中的实现以及 ZEGO 提供的 [示例源码](/super-board-ios/quick-start/run-demo)，根据自己的业务场景组合代码以满足业务需求。

## 实现流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/Superboard_bestpractice.png" /></Frame>

流程中以 A 端创建并操作白板，B 端观看白板为例；图中的虚线表示 A 端进行操作时，B 端可在收到的对应回调中获取相关信息。

开始前，请满足以下条件：

已在 [ZEGO 控制台](https://console.zego.im/) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

2.3.0 或以上 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Warning>

### 1. 初始化 SDK 并登录房间

请参考 [快速开始](/super-board-ios/quick-start/run-demo) 完成 SDK 的集成与初始化，并登录房间。


完整示例代码如下：

```objc
// 请先完成 SDK 的集成再运行下面的代码
// 初始化 ZegoExpressEngine
ZegoEngineProfile *profile = [ZegoEngineProfile new];
// 请通过官网注册获取，格式为：1234567890
profile.appID = appID;
// 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
profile.appSign = appSign;
//通用场景接入
profile.scenario = ZegoScenarioDefault;
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];

// 获取 ZegoSuperBoard 实例
ZegoSuperBoardManager *superBoardManager = [ZegoSuperBoardManager sharedInstance];
//注册代理
superBoardManager.delegate = self;
// 初始化 ZegoSuperBoard
ZegoSuperBoardInitConfig * config = [ZegoSuperBoardInitConfig new];
config.appID = appID;//填写从 ZEGO 控制台申请到的 appID
config.appSign = appSign; //赋值 appSign
config.userID = userID; //赋值 userID

[[ZegoSuperBoardManager sharedInstance] initWithConfig:config complete:^(ZegoSuperBoardError errorCode) {
       //返回初始化SuperBoard的结果
 }];

// 登录房间
// isUserStatusNotify 设置为 YES 才能接受 [onRoomUserUpdate] 回调，默认情况下不会开启该监听
NSString *userID = userID;//userID 为用户自定义，与登录房间所用 userID 相同
NSString *userName = userName;//userName 为用户自定义
NSString *roomID = roomID;//
// 创建用户
ZegoUser *user = [ZegoUser userWithUserID:userID userName:userName];
// 设置为 YES 后才能接受 [onRoomUserUpdate] 回调
ZegoRoomConfig *config = [[ZegoRoomConfig alloc] init];
config.isUserStatusNotify = YES;
// 登录
[expressEngine loginRoom:roomID user:user config:config];

//监听房间状态回调
- (void)onRoomStateUpdate:(ZegoRoomState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {

    if (state == ZegoRoomStateConnected && errorCode == 0) {
        //此处监听到房间登录连接成功
    }
}
```


<Note title="说明">

如果您需要更换鉴权方式，请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。

</Note>

### 2. 创建白板

<Note title="说明">

创建文件白板使用的文件需要先上传，详见 [共享文件管理](/super-board-ios/basic-func/file-manage)。

</Note>

A 端分别创建一个普通白板，一个文件白板：

```objc
// A 端操作
// 上一步的登录房间成功后才可创建白板
// 创建普通白板
ZegoCreateWhiteboardConfig * config = [ZegoCreateWhiteboardConfig new];
config.name = 白板的名称;
config.pageCount = 5;
config.perPageWidth = 16;
config.perPageHeight = 9;
[[ZegoSuperBoardManager sharedInstance] createWhiteboardView:config complete:^(ZegoSuperBoardError errorCode, ZegoSuperBoardSubViewModel *model) {
      //返回创建普通白板的的结果 以及ZegoSuperBoardSubViewModel数据模型

}];

// 创建文件白板
ZegoCreateFileConfig * config = [ZegoCreateFileConfig new];
config.fileID = fileID;//需要创建文件的id
[[ZegoSuperBoardManager sharedInstance] createFileView:config complete:^(ZegoSuperBoardError errorCode, ZegoSuperBoardSubViewModel *model) {
      //返回创建文件白板的的结果 以及ZegoSuperBoardSubViewModel数据模型

}];
```

白板依次创建完成后，SuperBoardView 自动多端同步，默认显示最新创建的白板，即 Excel 文件白板, B 端在 A 端每次创建白板后都会收到 `remoteSuperBoardSubViewAdded` 和 `onScrollChange:pageCount:subViewModel` 通知，在对应回调内刷新本地 UI 逻辑即可。

```objc
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端新增白板
- (void)onRemoteSuperBoardSubViewAdded:(ZegoSuperBoardSubViewModel *)model
{
    // 可以根据返回的ZegoSuperBoardSubViewModel信息更新UI
}

// 监听白板翻页、滚动
- (void)onScrollChange:(NSInteger)currentPage pageCount:(NSInteger)pageCount subViewModel:(ZegoSuperBoardSubViewModel *)subViewModel {
    // 可以根据回调返回的参数信息更新UI，如更新当前显示页数/当前动画步数。
}
```

通过 [setOperationMode](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-operation-mode-mode) 设置权限可控制客户端是否可操作白板。

拥有权限的客户端可以在白板上进行绘制，详情请参考 [白板绘制](/super-board-ios/basic-func/sketch)。

### 3. 切换 Excel 至指定 sheet

A 端切换至 Excel 到第二个 sheet。

```objc
// A 端操作
// 切换 Excel 到第二个 sheet
[[ZegoSuperBoardManager sharedInstance].superBoardView switcSuperBoardSubView:[ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView.model.uniqueID sheetIndex:1 complete:^(ZegoSuperBoardError errorCode) {

}];
```

B 端在 A 端切换 Excel sheet 后会自动同步切换，同时收到 onRemoteSuperBoardSubViewSwitched 通知，在对应回调内刷新本地 UI 逻辑即可。

```objc
// B 端监听回调，在回调内刷新本地UI逻辑。
// 监听远端切换 Excel Sheet
- (void)onRemoteSuperBoardSubViewSwitched:(NSString *)uniqueID
{
    //监听到切换通知后可以刷新UI
}
```

### 4. 切换到动态 PPT 并演示

A 端切换至动态 PPT。

```objc
// A 端操作
[[ZegoSuperBoardManager sharedInstance].superBoardView switchSuperBoardSubView:uniqueID complete:^(ZegoSuperBoardError errorCode) {
     //切换后会收到对应的回调错误码
}];
```

切换至动态 PPT 后，可通过跳步/翻页接口或点击工具进行 PPT 演示，详情请参考 [白板翻页](/super-board-ios/basic-func/scale-and-flip)。

B 端在 A 端切换白板后会自动同步切换，同时收到 onRemoteSuperBoardSubViewSwitched 通知，在对应回调内刷新本地 UI 逻辑即可。

### 5. 切换到纯白板进行绘制并放大

如果需要各端之间同步缩放效果，需要在各端上都开启同步缩放和响应缩放。

```objc
// 如需本端和对端缩放同步
[ZegoSuperBoardManager sharedInstance].enableSyncScale = YES;// 同步缩放至其他端
[ZegoSuperBoardManager sharedInstance].enableResponseScale = YES;// 响应其他端同步过来的缩放
```

A 端切换至纯白板，使用文本工具在白板上写字后，可使用手势进行缩放。

```objc
// A 端操作
// 切换至目标白板
[[ZegoSuperBoardManager sharedInstance].superBoardView switchSuperBoardSubView:uniqueID complete:^(ZegoSuperBoardError errorCode) {
     // 默认白板工具为画笔，如需设置其他工具类型，请调用 setToolType
     // 举例：设置白板工具为文本，然后点击白板上想要显示文本的位置后输入文本即可
     [ZegoSuperBoardManager sharedInstance].toolType = ZegoSuperBoardToolText;
}];
```

B 端在 A 端切换白板后会自动同步切换，同时收到 onRemoteSuperBoardSubViewSwitched 通知，上一步中已实现该回调。

## API 参考列表

| 方法        | 描述           |
| ----------- | -------------- |
|[createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler)  | 创建 ZegoExpressEngine 单例对象并初始化 SDK  |
|[sharedInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#shared-instance)  | 获取 ZegoSuperBoardManager 实例对象  |
|[initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete)| 初始化 ZegoSuperBoard SDK  |
|[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC~class~zego-express-engine#login-room-user) | 登录房间  |
|[createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#create-whiteboard-view-config-complete) | 创建纯白板  |
|[createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#create-file-view-config-complete)| 创建文件白板|
|[superBoardView](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#super-board-view)| 获取 SuperBoardView 对象|
|[switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardView#switch-super-board-sub-view-unique-id-complete)| 切换到指定的 SuperBoardSubView|
|[enableSyncScale](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#enable-sync-scale)| 设置是否将缩放同步给房间内其他成员|
|[enableResponseScale](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#enable-response-scale)| 是否响应房间内其他成员的缩放|
