# 创建超级白板

- - -

## 概念解释
- ZegoExpress-Video SDK：ZEGO 音视频互动 SDK，能够提供超级白板所需的实时信令传输的能力。超级白板 SDK 必须搭配此 SDK 使用。
- 超级白板 SDK、ZegoSuperBoard SDK：均指提供 ZEGO 超级白板服务（ZegoSuperBoard） 的 SDK。
- ZegoSuperBoardView：在代码实现过程中，开发者用于展示的白板视图。
- ZegoSuperBoardSubView：ZegoSuperBoardView 的子集，开发者实际创建的 View。ZegoSuperBoardView 会自动呈现最新创建或通过 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardView#switch-super-board-sub-view-unique-id-complete) 指定的 ZegoSuperBoardSubView。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/sync.gif" /></Frame>

## 前提条件

- 由于 ZegoSuperBoard SDK 需要与配套的 ZegoExpress-Video SDK 搭配使用，如已集成过 ZegoExpress-Video SDK，需要删除旧包并参考本页面重新集成，避免 SDK 版本不匹配造成初始化失败。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](http://doc-zh.zego.im/article/12107) 中的“项目信息”。


<Warning title="注意">

- 使用超级白板前，请参考 [控制台 - 服务配置 - 文件共享](http://doc-zh.zego.im/article/14338) 在 [ZEGO 控制台](https://console.zego.im) 自助开通文件共享功能（或联系 ZEGO 技术支持开通相关功能权限），否则超级白板服务无法正常使用。
- `2.3.0 或以上` 版本的 SDK 支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>



## 准备环境

在开始集成 ZegoSuperBoard SDK 前，请确保开发环境满足以下要求：
* Xcode 14.0 或以上版本。
* iOS 11.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* iOS 设备已经连接到 Internet。

## 集成 SDK

### 1 （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">

1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。在出现的表单中，选择 iOS 平台，并在 “Application” 下选择 “App”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" /></Frame>

2. 填写表单并选取各个选项来配置项目，单击 “Next”。

必须提供 “Product Name” 和 “Organization Identify”，用于创建在整个系统中标识 App 的 “Bundle Identify”。
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>


3. 选择项目存储路径，单击 “Create” 创建项目。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>

</Accordion>

### 2 导入 SDK
开发者可通过以下任意一种方式实现集成 SDK。

#### 方式一： 使用 CocoaPods 自动集成
1. 安装 CocoaPods，安装方法及常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#1)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，添加 ` pod 'ZegoSuperBoard'`。

4. 执行 `pod install` 命令安装 SDK。


#### 方式二：复制 SDK 文件手动集成

1. 请参考 [下载 SDK 包](/super-board-ios/download-sdk)，下载最新版本的 SDK，下载完成后进行解压。

2. 手动将 SDK 动态库文件，拷贝到项目目录下。

3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/add_framework.png" />
  </Frame>

4. 在 Xcode 中选择 “TARGETS > General > Frameworks,Libraries,and Enbedded Content” 菜单，添加 “ZegoSuperBoard.xcframework”、“ZegoWhiteboardView.xcframework”、“ZegoDocsView.xcframework” 和 “ZegoExpressEngine.xcframework”，将 “Embed” 设置为 “Embed & Sign”。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/embed_sign.png" />
  </Frame>

5. 选择 “TARGET > General > Deployment Info”，设置 9.0 或以上版本。

  <Frame width="512" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/SuperBoard/set_ios_target.png" />
  </Frame>

## 实现超级白板

### 1 初始化 SDK

#### 初始化 ZEGO Express Video SDK

调用 [createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 接口，将申请到的 AppID 传入参数 “appID”，创建引擎单例对象。

如果需要注册回调，可将实现了 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler) 的对象（例如 “self”）传入参数 “eventHandler”。如果不需要注册回调，可将 “nil” 传入参数 “eventHandler”，创建引擎后仍需要注册回调时可通过调用 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-event-handler) 接口设置回调。

```objc
/**
* appID:ZEGO 为开发者签发的应用 ID，请从 ZEGO 控制台 https://console-express.
* zego.im 申请，取值范围为 0~4294967295。
* appSign: ZEGO 为开发者签发的应用 appSign，请从 ZEGO 控制台 https://console-express.  zego.im 申请
* scenario: 所属的应用场景,ZegoScenarioGeneral为通用场景
*/
ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
profile.appID = <#appID#>;
profile.appSign = <#appSign#>;
profile.scenario = ZegoScenarioGeneral;
// 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
[ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
```


<Note title="说明">

如果您需要切换鉴权方式，请参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Note>

#### 初始化 ZegoSuperBoard SDK

使用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager) 的 [initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete) 方法初始化 ZegoSuperBoard SDK。

如果回调 onInit 中的 errorCode 为 0，代表初始化成功，可进行更多操作。errorCode 可参考 [常见错误码](/super-board-ios/error-code)。

```objc
/**
* appID:ZEGO 为开发者签发的应用 ID，请从 ZEGO 控制台 https://console-express.
* zego.im 申请，取值范围为 0~4294967295。
* appSign: ZEGO 为开发者签发的应用 appSign，请从 ZEGO 控制台 https://console-express.  zego.im 申请
*/
//创建一个初始化配置类ZegoSuperBoardInitConfig
ZegoSuperBoardInitConfig * config = [ZegoSuperBoardInitConfig new];
config.appID = appID; //赋值 appID
config.appSign = appSign; //赋值 appSign
config.userID = userID; //赋值 userID

//设置ZegoSuperBoardManager监听,需要在登录房间之前设置
[ZegoSuperBoardManager sharedInstance].delegate = self;

[[ZegoSuperBoardManager sharedInstance] initWithConfig:config complete:^(ZegoSuperBoardError errorCode) {
    if (errorCode == ZegoSuperBoardSuccess) {
         /** 初始化成功 */
    } else {
        /** 初始化失败 */
    }
}];
```
<Warning title="注意">

需要确保 **ZegoExpress-Video SDK** 和 **ZegoSuperBoard SDK** 均初始化成功，即调用了各自的 `init` 方法并在回调中返回的errorCode等于0，才能够执行后续的接口调用。
</Warning>

### 2 监听事件回调

根据实际应用需要，在初始化 SuperBoard 后监听想要关注的事件回调，比如错误提醒、远端新增白板文件、远端删除白板文件、远端切换白板文件等。

<Warning title="注意">

SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。

</Warning>

- [onError](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~protocol~ZegoSuperBoardManagerDelegate#on-error-error)：SDK 抛出的错误码。errorCode 可参考 [常见错误码](/super-board-ios/error-code)。
- [onRemoteSuperBoardSubViewAdded](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~protocol~ZegoSuperBoardManagerDelegate#on-remote-super-board-sub-view-added-model)：远端新增文件白板通知。
- [onRemoteSuperBoardSubViewRemoved](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~protocol~ZegoSuperBoardManagerDelegate#on-remote-super-board-sub-view-removed-model)：远端销毁文件白板通知。
- [onRemoteSuperBoardSubViewSwitched](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~protocol~ZegoSuperBoardManagerDelegate#on-remote-super-board-sub-view-switched-unique-id)：远端切换白板文件通知。


```objc
// 遵循 ZegoSuperBoardManagerDelegate 协议处理相关的事件回调
@interface ViewController () <ZegoSuperBoardManagerDelegate>
// ······
@end

@implementation ViewController

// 常用的 SuperBoard 相关回调
// SuperBoard 自动实现了多端同步能力，远端通知回调内只需刷新本地UI逻辑即可。

- (void)onError:(ZegoSuperBoardError)error
{
    //SDK 抛出的错误码。可以根据错误码提示用户一些异常情况
}
- (void)onRemoteSuperBoardSubViewAdded:(ZegoSuperBoardSubViewModel *)model
{
     //远端新增白板。可以根据model里的信息更新展示的UI内容，例如白板名称等
}
- (void)onRemoteSuperBoardSubViewRemoved:(ZegoSuperBoardSubViewModel *)model{
     //远端删除白板通知
    //收到通知后可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板名称。
}
- (void)onRemoteSuperBoardSubViewSwitched:(NSString *)uniqueID
{
    //远端切换白板的通知
    //收到通知后可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板名称。
}

@end
```

### 3 登录房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine) 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#login-room-user) 接口登录房间，推荐在初始化成功之后调用。

<Warning title="注意">

1. 需保证 “roomID” 信息的全局唯一。
2. “userID” 与 “userName” 不能为 “nil” 否则会导致登录房间失败。
3. ZegoUser 的构造方法 [ZegoUser userWithUserID:](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-user#user-with-user-id) 会将 userName 设为与传的参数 userID 一样。
4. 每个 “userID” 必须唯一，建议设置成一个有意义的值，开发者可将 “userID” 与自己业务账号系统进行关联。
</Warning>

错误码详情请参考 [登录房间错误码 ](https://doc-zh.zego.im/article/4377)。

```objc
- (void)loginRoom {
    // roomID 由您本地生成,需保证 “roomID” 全局唯一。不同用户要登录同一个房间才能进行通话
    NSString *roomID = @"room1";

    // 创建用户对象，ZegoUser 的构造方法 userWithUserID 会将 “userName” 设为与传的参数 “userID” 一样。“userID” 与 “userName” 不能为 “nil”，否则会导致登录房间失败。
    // userID 由您本地生成,需保证 “userID” 全局唯一。
    ZegoUser *user = [ZegoUser userWithUserID:@"user1"];

    // 只有传入 “isUserStatusNotify” 参数取值为 “true” 的 ZegoRoomConfig，才能收到 onRoomUserUpdate 回调。
    ZegoRoomConfig *roomConfig = [[ZegoRoomConfig alloc] init];

    roomConfig.isUserStatusNotify = YES;
    // 登录房间
    [[ZegoExpressEngine sharedEngine] loginRoom:roomID user:user config:roomConfig callback:^(int errorCode, NSDictionary * _Nullable extendedData) {
        // (可选回调) 登录房间结果，如果仅关注登录结果，关注此回调即可
        if (errorCode == 0) {
            NSLog(@"房间登录成功");
        } else {
            // 登录失败，请参考 errorCode 说明 https://doc-zh.zego.im/article/4377
            NSLog(@"房间登录失败");
        }
    }];
}
```

#### （可选）Token 过期更新

<Accordion title="此步骤介绍 Token 过期时如何处理；如果您未使用 Token 鉴权，可忽略此步。" defaultOpen="false">

监听 Token 过期通知，如果 Token 过期，需要主动更新 Token。

```objc
- (void)onRoomTokenWillExpire:(int)remainTimeInSecond roomID:(NSString *)roomID {

    NSString * token = @“”;//后台获取到的token

    [[ZegoExpressEngine sharedEngine] renewToken:token roomID:roomID];
    [[ZegoSuperBoardManager sharedInstance] renewToken:token];
}
```
</Accordion>

### 4 添加白板视图
在登录房间之后，将 **ZegoSuperBoardView** 直接添加到您的业务场景视图中。示例代码如下：

```objc
ZegoSuperBoardView *superBoardView = [ZegoSuperBoardManager sharedInstance].superBoardView;
if (superBoardView != null) {
// 添加 ZegoSuperBoardView 到指定视图中（以 Demo 中的 currentContainer View 视图容器为例）。
    superBoardView.frame = self.currentContainer.bounds;
    [self.currentContainer addSubview:superBoardView];
}
```

### 5 创建白板

超级白板支持创建纯白板和文件白板。
- 纯白板：指定宽、高和页数创建的白板，用户在指定的白板画布上进行实时绘制。
- 文件白板：基于文件创建的白板，白板宽高和页数由文件决定，实现在文件上绘制图元的业务需求。

创建白板前需要保证登录成功，建议可在登录成功的回调中调用创建纯白板或文件白板的接口。
```objc
// 创建白板前需要保证登录成功，即房间回调状态为 ZegoRoomStateConnected
- (void)onRoomStateUpdate:(ZegoRoomState)state errorCode:(int)errorCode extendedData:(NSDictionary *)extendedData roomID:(NSString *)roomID {

    if (state == ZegoRoomStateConnected && errorCode == 0) {
     // 表示登录成功，需要在登录成功后才可以创建白板
     // 可以将创建纯白板或文件白板的代码放在这里，确保登录房间后创建白板，也可通过其他方法保证登录成功后再创建白板

    }
}
```

- 创建纯白板

```objc
// 创建白板需要构造 ZegoCreateWhiteboardConfig 配置类，具体字段解释如下
ZegoCreateWhiteboardConfig * config = [ZegoCreateWhiteboardConfig new];
// 白板名称
config.name = @"一个测试白板";
// 白板页数
config.pageCount = 5;
// 一页白板的宽度
config.perPageWidth = 16;
// 一页白板的高度
config.perPageHeight = 9;
// 创建白板
[[ZegoSuperBoardManager sharedInstance] createWhiteboardView:config complete:^(ZegoSuperBoardError errorCode, ZegoSuperBoardSubViewModel *model) {
 // 创建白板回调
 // 创建完成后可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板名称。
      if (errorCode == ZegoSuperBoardSuccess) {
            /** 创建成功 */
      } else {
            /** 创建失败 */
      }
}];
```

<a id="fileWhiteboard"></a>

- 创建文件白板

创建文件白板前需要先获取文件的 fileID，可参考 [共享文件管理](/super-board-ios/basic-func/file-manage) 进行上传。

```objc
// 创建文件需要构造 ZegoCreateFileConfig 配置类
ZegoCreateFileConfig * config = [ZegoCreateFileConfig new];
// 文件的fileID，在上传文件成功后可以拿到
config.fileID = fileID;
__weak typeof(self) weakSelf = self;
[[ZegoSuperBoardManager sharedInstance] createFileView:config complete:^(ZegoSuperBoardError errorCode, ZegoSuperBoardSubViewModel *model) {
 // 创建文件白板回调
 // 创建完成后可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示文件名称。
      if (errorCode == ZegoSuperBoardSuccess) {
            /** 创建成功 */
      } else {
            /** 创建失败 */
      }

}];
```

<Warning title="注意">

- 一个房间内最多可创建 50 个白板，房间内已存在 50 个白板时再创建白板会失败。
- 请通过 [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#query-super-board-sub-view-list-complete) 获取房间内当前的白板数量。

</Warning>



### 6 验证白板创建

使用多台设备运行上述项目，登录同一房间ID。用手指在任一设备的 ZegoSuperBoardView 的范围内按下移动，即可看到涂鸦效果展示在各个设备 ZegoSuperBoardView 上。

### 7 销毁白板

```objc
//销毁后SDK内部会自动切换到另外一个白板。展示的白板为销毁白板的上一个

//subViewModel 是白板共享列表 [ZegoSuperBoardManager sharedInstance].superBoardSubViewModelList 中的一个model
[[ZegoSuperBoardManager sharedInstance] destroySuperBoardSubView:subViewModel.uniqueID complete:^(ZegoSuperBoardError errorCode) {
 // 销毁白板回调
 // 销毁完成后可以根据当前 [ZegoSuperBoardManager sharedInstance].superBoardView.currentSuperBoardSubView 的信息更新UI，如更新当前显示白板名称。
      if (errorCode == ZegoSuperBoardSuccess) {
            /** 销毁成功 */
      } else {
            /** 销毁失败 */
      }

}];
```

### 8 离开房间

调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine) 的 [logoutRoom](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#logout-room-2) 接口退出房间。

```objc
[[ZegoExpressEngine sharedEngine] logoutRoom:@"roomID"];
```

### 9 反初始化 SDK

#### 反初始化 ZegoSuperBoard SDK

调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager) 的 [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#un-init)，反初始化 ZegoSuperBoard SDK。

```objc
[[ZegoSuperBoardManager sharedInstance] unInit];
```

#### 反初始化 ZEGO Express Video SDK

如果无需再使用 ZEGO Express Video SDK 的能力，即可调用 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine) 的 [destroyEngine](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#destroy-engine) 销毁引擎，释放麦克风、摄像头、内存、CPU 等资源。

```objc
[ZegoExpressEngine destroyEngine:^{

}];
```
