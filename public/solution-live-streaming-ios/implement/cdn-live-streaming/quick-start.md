# 快速开始

- - -

本文将介绍如何集成 SDK 并使用 ZEGO Express SDK 实现基本的直播功能。

## 前提条件

在开始接入前，请确保开发环境满足以下要求：

- Xcode 13.0 或更高版本。
- 运行 iOS 9.0 或更高版本的设备。
- 在 [管理控制台](https://console.zego.im/ProjectManage) 中注册并创建项目，同时开通 “ZEGO CDN” 服务。
  <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/zegocloud/console/console_cdn_zh.png" /></Frame>

## 创建 iOS 项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。
2. 在出现的表单中，选择 iOS 平台，并在 “Application” 下选择 “App”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" /></Frame>

3. 填写表单并选取各个选项来配置项目，完成后，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identifier”，用于创建 App 的唯一标识 “Bundle Identifier”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" /></Frame>

4. 选择项目存储路径，单击 “Create” 创建项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" /></Frame>
</Accordion>

## 导入 SDK

开发者可通过以下任意一种方式实现集成 SDK。

<Accordion title="方式 1：使用 Swift Package Manager 自动集成（推荐）" defaultOpen="false">
1. 打开 Xcode ，在菜单栏选择 “File > Add Packages...”，在 “Apple Swift Packages” 弹窗的 “Search or Enter Package URL” 输入框中，填写如下 URL 并敲击回车键确认：

    ```markdown
    https://github.com/zegolibrary/express-video-ios
    ```

2. 在 “Dependency Rule” 中，指定您想要集成的 SDK 版本（建议使用默认的 “Up to Next Major Version”），然后单击 “Add Package“ 导入 SDK，您也可以参考 [Apple 官方文档](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) 进行设置。
</Accordion>

<Accordion title="方式 2：使用 CocoaPods 自动集成" defaultOpen="false">
1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#1)。
2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。
3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZegoExpressEngine'`，需要将 “MyProject” 替换为开发者的 Target 名称。

    <Warning title="注意">
    - 由于 SDK 为 XCFramework，需要 CocoaPods v1.10.0 或以上版本才能集成该 SDK。
    - 从 v3.2.0 版本开始， Express 实时音视频 Video SDK 的 Pod 名称由 `ZegoExpressEngine/Video` 变更为 `ZegoExpressEngine`；Express 实时语音 Audio SDK 的 Pod 名称由 `ZegoExpressEngine/Audio` 变更为 `ZegoExpressAudio`。
    </Warning>

    ```ruby
    target 'MyProject' do
        use_frameworks!
        # 请填写具体的 SDK 版本号
        # 请从发布日志查询 SDK 最新版本，并将 x.y.z 修改为具体的版本号
        pod 'ZegoExpressEngine', '~> x.y.z'
    end
    ```

4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK，最新版本号请参考 [发布日志](https://doc-zh.zego.im/article/12540)。
5. 执行 `pod install` 命令安装 SDK。

    <Note title="说明">
    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#2)。
    - 若出现 “Unable to find a specification for 'ZegoExpressEngine'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。
    - 若出现 “CocoaPods could not find compatible versions for pod "ZegoExpressEngine"” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=ExpressVideo&platform=macos#3)。
    </Note>
</Accordion>

<Accordion title="方式 3：复制 SDK 文件手动集成" defaultOpen="false">
1. 请参考 [下载](https://doc-zh.zego.im/article/2968) 文档，下载最新版本的 SDK 并解压。

2. 手动将 SDK 动态库文件 “ZegoExpressEngine.xcframework” 拷贝到开发者的项目目录下。
   <Note title="说明">
   XCFramework 文件说明：
   XCFramework 是一个同时包含真机、模拟器等多平台架构的全新封装形式，请将其作为一个**整体**集成到工程内，不建议拆开使用。但如果您确实**仅需要**单独集成真机架构、或单独集成模拟器架构，也可以将 **XCFramework** 内的 **.framework** 单独取出使用。
    - ios-arm64：适用于 iOS 真机。
    - ios-arm64_x86_64-maccatalyst：适用于 macOS 的 **Mac Catalyst** 包。**Mac Catalyst** 是 Apple 在 2019 年推出的新框架，即 **UIKit for Mac**，旨在让 iPad App 运行在 macOS 上。详情请参考 [Apple 开发者 - Mac Catalyst](https://developer.apple.com/mac-catalyst)。
    - ios-arm64_x86_64-simulator：适用于 iOS 模拟器。
    </Note>

3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/add-files.png" /></Frame>

4. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZegoExpressEngine.xcframework”，将 “Embed” 设置为 “Embed & Sign”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/embed_sign.png" /></Frame>
</Accordion>

## 添加设备权限

根据实际应用需要，设置应用所需权限。

1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" /></Frame>

2. 单击 “+” 添加按钮，添加摄像头和麦克风权限。
    - `Privacy - Camera Usage Description`
    - `Privacy - Microphone Usage Description`

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" /></Frame>

## 实现直播功能

### 示例代码

当您开发应用程序时，可下载 [示例代码](https://github.com/ZEGOCLOUD/zegocloud_sdk_demo_ios/tree/master/live_streaming/quick_start) 进行参考。

### 创建用户界面

根据场景需要，为您的项目创建视频通话的用户界面。我们推荐你在项目中添加如下元素：

- 主播摄像头视图
- 结束通话按钮


<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/zegocloud/live/quickstart/live_page.jpg" /></Frame>

### 实现直播逻辑

#### 技术原理

下图显示了用户A播放用户B发布的流的基本过程：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/common_usage_new.png" /></Frame>

为了更好的理解相关功能，您可以参考 [术语表](https://doc-zh.zego.im/article/5390) 理解关键概念。


#### 创建和销毁 ZegoExpressEngine 实例

首先，运行以下命令导入头文件。

```objc
// 导入 ZegoExpressEngine 头文件
#import <ZegoExpressEngine/ZegoExpressEngine.h>
```

然后，调用 [createEngineWithProfile|_blank](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#create-engine-with-profile-event-handler) 方法初始化 ZegoExpressEngine SDK。并配置以下内容：
- `profile`: ZegoEngineProfile 对象，用于配置 AppID 和 AppSign，并根据 App 实际的音视频业务选择一个合适的场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/20757) 文档，把选择好的场景枚举传入参数 "scenario"。
- `eventHandler`: 事件通知回调，用于监听核心事件回调，例如房间连接状态变化更新、房间内参与者登录或退出更新等。您可以通过调用 [`setEventHandler`](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#set-event-handler) 方法来设置事件处理器对象。

要销毁 SDK 并释放其占用的资源，请调用 [destroyEngine|_blank](https://doc-zh.zego.im/article/api?doc=express-video-sdk_API~objectivec_ios~class~ZegoExpressEngine#destroy-engine) 方法。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您对项目安全性有更高要求，建议您升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>

```objc
- (void)createEngine {
    ZegoEngineProfile *profile = [[ZegoEngineProfile alloc] init];
    // 请通过官网注册获取，格式为：1234567890
    profile.appID = <#appID#>;
    // 请通过官网注册获取，格式为：@"0123456789012345678901234567890123456789012345678901234567890123"（共64个字符）
    profile.appSign = <#appSign#>;
    // 指定使用直播场景 (请根据实际情况填写适合的业务场景)
    profile.scenario = ZegoScenarioBroadcast;
    // 创建引擎，并注册 self 为 eventHandler 回调。不需要注册回调的话，eventHandler 参数可以传 nil，后续可调用 "-setEventHandler:" 方法设置回调
    [ZegoExpressEngine createEngineWithProfile:profile eventHandler:self];
}

[ZegoExpressEngine destroyEngine:nil];
```

#### 设置事件处理器

实现 `ZegoEventHandler` 事件处理器以监听事件回调，例如房间内流的添加或删除更新、房间内其他用户登录或退出更新、房间连接状态变化更新等。

- [onRoomStreamUpdate](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~ObjectiveC_ios~protocol~zego-event-handler&jumpType=route#on-room-stream-update-stream-list-extended-data-room-id): 房间内流的状态更新回调。当新的流推到房间或房间内现有流停止时，SDK 通过此回调发出事件通知。您可以在此回调中调用下文中示例的 `startPlayStream()` 和 `stopPlayStream()` 方法。
- [onRoomStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler#on-room-state-update-error-code-extended-data-room-id): 当前房间连接状态的更新回调。当前房间连接状态发生变化时（例如，当前用户从房间断开连接或登录认证失败），SDK 通过此回调发出事件通知。
- [onRoomUserUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-user-update-user-list-room-id): 房间内其他用户状态的更新回调。当其他用户登录或退出房间时，SDK 通过此回调发出事件通知。

```objc
@interface ViewController () <ZegoEventHandler>

// 房间内流的状态更新回调。
- (void)onRoomStreamUpdate:(ZegoUpdateType)updateType
             streamList:(NSArray<ZegoStream *> *)streamList
           extendedData:(nullable NSDictionary *)extendedData
                  roomID:(NSString *)roomID {
    // 如果用户想要播放房间内其他用户推流的流，可以在 updateType == ZegoUpdateTypeAdd 时，
    // 使用 `streamList` 参数中得到的相应 streamID 调用 startPlayingStream 方法。
    if (updateType == ZegoUpdateTypeAdd) {
        for (ZegoStream *stream in streamList) {
            [self startPlayStreamWithStreamID:stream.streamID];
        }
    } else {
        for (ZegoStream *stream in streamList) {
            [self stopPlayStreamWithStreamID:stream.streamID];
        }
    }
}

// 当前用户房间连接状态的更新回调。
- (void)onRoomStateUpdate:(ZegoRoomState)state
               errorCode:(int)errorCode
             extendedData:(nullable NSDictionary *)extendedData
                   roomID:(NSString *)roomID {
    if (errorCode != 0) {
        [self.view makeToast:[NSString stringWithFormat:@"onRoomStateUpdate: %lu, errorCode: %ld", (unsigned long)state.rawValue, (long)errorCode]];
    }
}

// 房间内其他用户状态的更新回调。
// 用户只能在登录房间时将 ZegoRoomConfig 的 isUserStatusNotify 属性设置为 `true` 才能接收到回调。
- (void)onRoomUserUpdate:(ZegoUpdateType)updateType
                userList:(NSArray<ZegoUser *> *)userList
                   roomID:(NSString *)roomID {
    // 根据需要实现
}

@end
```

#### 登录或退出

- 调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-user) 登录房间。
- 调用 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#logout-room) 退出房间。

```objc
@interface ViewController ()

// 用于退出房间
- (void)loginRoom {
    // `userID` 的值是本地生成的，必须全局唯一。
    ZegoUser *user = [[ZegoUser alloc] initWithUserID:_localUserID];
    // 用户必须登录同一个房间才能相互通话。
    ZegoRoomConfig *roomConfig = [[ZegoRoomConfig alloc] init];
    // 当 "isUserStatusNotify" 参数值为 "true" 时，可以接收到 onRoomUserUpdate 回调。
    roomConfig.isUserStatusNotify = YES;
    // 登录房间
    [[ZegoExpressEngine sharedEngine] loginRoom:self.roomID user:user config:roomConfig completion:^(int errorCode,NSDictionary *_Nonnull extendedData) {
        if (errorCode == 0) {
            // 登录房间成功
            if (self.isHost) {
                [self startPreview];
                [self startPublish];
            }
        } else {
            // 登录房间失败
            [self.view makeToast:[NSString stringWithFormat:@"loginRoom failed with errorCode: %d", errorCode] duration:2.0 position:CSToastPositionCenter];
        }
    }];
}

// 用于退出房间
- (void)logoutRoom {
    [[ZegoExpressEngine sharedEngine] logoutRoom];
}

@end
```

#### 开始或停止本地视频预览

- 调用 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#start-preview) 方法，开始本地视频预览并渲染。
- 调用 [stopPreview](https://doc-zh.zego.im/article/api?doc=express_video_sdk_API~objective-c_ios~class~ZegoExpressEngine#stop-preview) 方法，停止预览及渲染。

```objc
// 开启预览
- (void)startPreview {
    // 设置主播摄像头的视图
    ZegoCanvas *canvas = [[ZegoCanvas alloc] initWithView:self.hostCameraView];
    [[ZegoExpressEngine sharedEngine] startPreview:canvas];
}

// 停止预览
- (void)stopPreview {
    [[ZegoExpressEngine sharedEngine] stopPreview];
}
```

#### 开始或停止推流

- 调用 [startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#start-publishing-stream)，向远端用户推送本地音视频流。
- 调用 [stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#stop-publishing-stream)，向远端用户推送本地音视频流。

```objc
// 开始推流
- (void)startPublish {
    // 调用 `loginRoom` 方法后，调用此方法来推流。
    // 房间内的 StreamID 必须唯一。
    NSString *streamID = [NSString stringWithFormat:@"stream_%@", self.localUserID];
    [[ZegoExpressEngine sharedEngine] startPublishingStream:streamID];
}

// 停止推流
- (void)stopPublish {
    [[ZegoExpressEngine sharedEngine] stopPublishingStream];
}
```

#### 开始或停止拉流

- 调用 [startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#start-playing-stream-canvas) ，开始拉远端视频流。
- 调用 [stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~class~zego-express-engine#stop-playing-stream)，停止拉流。

```objc
// 开始拉流
- (void)startPlayStreamWithStreamID:(NSString *)streamID {
    // 开始拉流，设置远端流的渲染视图。
    ZegoCanvas *canvas = [[ZegoCanvas alloc] initWithView:self.hostCameraView];
    ZegoPlayerConfig *config = [[ZegoPlayerConfig alloc] init];
    config.resourceMode = ZegoPlayerConfigResourceModeDefault; // 直播
    [[ZegoExpressEngine sharedEngine] startPlayingStream:streamID canvas:canvas config:config];
}

// 停止拉流
- (void)stopPlayStreamWithStreamID:(NSString *)streamID {
    [[ZegoExpressEngine sharedEngine] stopPlayingStream:streamID];
}
```

### 启动和停止您的应用程序

- 当您的应用程序启动时，您可以调用示例 Demo 中封装的 `createEngine` 方法初始化 SDK。
- 当您的应用程序即将退出时，您可以调用示例 Demo 中封装的 `destroyEngine` 来释放 SDK 资源。

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    // 加载视图后进行其他额外的设置
    [self createEngine];
    [self initViews];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [self destroyEngine];
}
```


## 运行和测试

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


## 资源

更多详细的演示源代码，请查看 [此处](https://github.com/ZEGOCLOUD/zegocloud_sdk_demo_ios/tree/master/live_streaming/quick_start)。

## 常见问题解答

**运行应用时提示 `Building for iOS Simulator, but the linked and embedded framework 'ZegoExpressEngine.framework' was built for iOS + iOS Simulator.` 该如何处理？**

在 Xcode 12.3 之后，默认禁止使用 iOS + iOS（模拟器）双平台架构的 framework。建议替换为苹果推荐的 XCFramework（您可以在 [下载 SDK 包](https://doc-zh.zego.im/article/2968) 中的下拉框中选择下载 XCFramework）。或者，您可以通过 Xcode 选择 "TARGETS > Build Settings > Validate Workspace" 并设置此参数的值为 YES，以继续使用传统的 framework。
