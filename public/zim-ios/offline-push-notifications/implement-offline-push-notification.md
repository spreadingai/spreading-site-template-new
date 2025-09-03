# 实现离线推送


## 功能简介

ZEGO 即时通讯（ZIM）支持离线推送消息的功能。例如在“单聊”或“群组聊天”时，如果您的程序在后台被冻结、或被系统或用户杀掉，与 ZEGO 服务后台的长连接超时断开后，此时如果您已接入“离线推送”功能，ZEGO 后台会为目标用户发送离线推送的消息。

开发者可以通过集成 ZPNs SDK，与 ZIM SDK 搭配使用，实现离线推送功能。

<Warning title="注意">
- ZPNs SDK 需要搭配 ZIM SDK 2.0.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>


## 方案介绍

ZIM 实现离线推送的方案如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/ios.png" />
</Frame>
1. 首先消息接收方（即接收离线推送的用户），开启 APNs 推送通道，向 APNs 推送服务器请求，获取 DeviceToken。
2. APNs 推送服务器，将 DeviceToken 返回给接收方。
3. 接收方生成 PushID，并向 ZIM 服务器发送请求，绑定用户与 PushID 的关系。
    
    开发者如果将 ZPNs SDK 与 ZIM SDK 搭配使用，SDK 内部会自动绑定用户与 PushID 的关系，无需特殊处理；如果单独使用 ZPNs SDK，则需自行对接 ZPNs 服务器、实现绑定逻辑。**请注意，同一设备切换 userID 前，请调用 zim.[logout](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#logout) 接口，该接口会清除 userID 绑定的 PushID。**

4. 发送方开始发送消息，消息存储到 ZIM 服务器。
5. ZIM 服务器会确认接收方的客户端是否在线。
6. 如果接收方的客户端不在线，ZIM 服务器会将消息转发给 ZPNs 服务器。
7. ZPNs 服务器将离线消息转发给 APNs 服务器。
8. APNs 服务器将消息通过“离线推送”的方式，推送给接收方；接收方登录后（至少登录一次），即可收到离线消息。

## 实现流程

### 获取 APNs 推送证书

请参考 [Apple 推送集成指南](/zim-ios/offline-push-notifications/integrate-apns)，获取 APNs 推送证书。

### 集成 ZPNs SDK 

开发者可通过以下任意一种方式实现集成 SDK。  

#### 方式一： 使用 Swift Package Manager 自动集成

1. 打开 Xcode 并点击菜单栏 “File > Add Packages...”，在 “Apple Swift Packages” 弹窗的 “Search or Enter Package URL” 输入框中填写如下 URL 并敲击回车键确认：

    ```markdown
    https://github.com/zegolibrary/zpns-ios
    ```

2. 在 “Dependency Rule” 中指定你想要集成的 SDK 版本（建议使用默认的 “Up to Next Major Version”），然后点击 “Add Package“ 导入 SDK。你也可以参考 [Apple 官方文档](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) 进行设置。

#### 方式二：使用 CocoaPods 自动集成

1. 安装 CocoaPods，安装时的常见问题请参考 [CocoaPods 常见问题 - 安装 CocoaPods](https://doc-zh.zego.im/article/13860#1)。

2. 打开终端，进入项目根目录，执行 `pod init` 命令创建 Podfile 文件。

3. 打开 Podfile 文件，在 “target” 下添加 `pod 'ZPNs'`，需要将 “MyProject” 替换为开发者的 Target 名称。  

    <Warning title="注意">
    由于 SDK 为 XCFramework，只有 1.10.0 或以上版本的 CocoaPods 才能集成该 SDK。
    </Warning>

    ```ruby
    target 'MyProject' do
        use_frameworks!
        pod 'ZPNs'
    end
    ```

4. 执行 `pod repo update` 命令更新本地索引，确保能安装最新版本的 SDK，最新版本号请参考 [发布日志](/zim-ios/client-sdks/zpns-release-notes)。

5. 执行 `pod install` 命令安装 SDK。

    <Note title="说明">
    - 若出现 “CDN: trunk URL couldn't be downloaded” 问题，请参考 [CocoaPods 常见问题 - 连接不上 trunk CDN 的问题](https://doc-zh.zego.im/article/13860#2)。
    - 若出现 “Unable to find a specification for 'ZPNs'” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/article/13860#3)。  
    - 若出现 “CocoaPods could not find compatible versions for pod "ZPNs"” 问题，请参考 [CocoaPods 常见问题 - 无法找到项目的问题](https://doc-zh.zego.im/article/13860#3)。
    </Note>

#### 方式三：复制 SDK 文件手动集成
 
1. 请在 [下载](/zim-ios/client-sdks/sdk-downloads) 获取最新的 ZPNs SDK 包。

2. 将 SDK 包解压至项目目录下，例如 “libs” 文件夹下。

3. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 “ZIM.xcframework”，将 “Embed” 设置为 “Embed & Sign”。


### 获取 DeviceToken

开发者需要获取 DeviceToken，ZIM SDK 才能根据 DeviceToken 配置离线推送功能。

<Note title="说明">
- DeviceToken，是 Apple 设备上每个 APP 的唯一标识。
- APNs（Apple Push Notification Service，Apple Push 服务器），是 Apple 的推送服务核心组件。
</Note>


#### 添加头文件

首先在 AppDelegate.m 文件引入头文件。

```oc
import <ZPNs/ZPNs.h>
```

#### 申请 App 的推送权限

开发者需要通过 `requestAuthorizationWithOptions` 官方接口，申请 App 的推送权限；即在发送离线消息时，手机设备上弹窗提示是否同意推送。

```oc
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = (id)[ZPNs shared];
//请求获取通知权限（角标，声音，弹框）
[center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge|UNAuthorizationOptionSound|UNAuthorizationOptionAlert) completionHandler:^(BOOL granted, NSError * _Nullable error) {
  if(granted){
      NSLog(@"用户允许发送通知");
  }
}];

```

#### 获取 APNs 的 DeviceToken

1. 在 AppDelegate.m 文件中，开发者需要实现如下 Apple 官方的代理回调，用于接收 deviceToken。

```oc
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {

}
```

2. 开发者调用 [registerAPNs](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#register-ap-ns) 注册 APNs，注册成功后，系统会通过 `didRegisterForRemoteNotificationsWithDeviceToken` 代理回调，自动获取到 DeviceToken。

```oc
[[ZPNs shared] registerAPNs];
```

#### ZPNs SDK 获取 DeviceToken

在 `didRegisterForRemoteNotificationsWithDeviceToken` 代理回调中，开发者需要通过 [setDeviceToken](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-device-token-is-product) 接口，获取到 DeviceToken。

```oc
// 使用 ZPNs SDK 获取 DeviceToken
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
/// Required - 注册 DeviceToken
//isProduct 根据是否是生产环境来填写
  [[ZPNs shared] setDeviceToken:devicetoken isProduct:false];
}
```

<Warning title="注意">
请根据开发环境或生产环境准确填入 isProduct 的值（打包时用 development 证书签名为开发环境，用 distribution 证书签名为生产环境），否则 ZPNs 服务器无法选择合适的推送证书向 APNs 正确发送离线推送请求。APNs 在正式环境下的到达率与延迟均好于测试环境。
</Warning>

ZPNs SDK 获取到 DeviceToken 后，会把 DeviceToken 传给 ZIM SDK，ZIM SDK 会根据 DeviceToken 做相应的离线推送处理。

#### 通过 onRegistered 获取 pushID

```oc
- (void)onRegistered:(NSString *)Pushid{
      
}
```

### 使用 ZIM SDK 实现离线推送功能

ZIM 支持在发送单聊消息、群组消息和呼叫邀请时，使用离线推送消息的功能。

<Warning title="注意">
在实现离线推送前，请确保：
- 参考 [发送消息](/zim-ios/send-and-receive-messages)，实现发送单聊/群聊消息的功能。
- 参考 [呼叫邀请](/zim-ios/guides/call-invitation-signaling)，实现呼叫邀请。
</Warning>


#### 场景 1：发送单聊消息时使用离线推送功能

1. 首先开发者需要通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```objc
    ZIMPushConfig *pushConfig = [ZIMPushConfig alloc] init];
    pushConfig.title = @"离线推送标题";
    pushConfig.content = @"离线推送内容";
    pushConfig.payload = @"自定义透传字段，非必填";
    pushConfig.resourcesID = @"资源ID";
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```objc
    ZIMMessageSendConfig *sendConfig = [ZIMMessageSendConfig alloc] init];
    sendConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [sendPeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#send-peer-message-message-to-user-id-config-callback)，传入 “sendConfig”，向接收方发送单聊消息。

    ```objc
    [zim sendPeerMessage:textMessage toUserID:@"toUserID" config:sendConfig callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {
        
    }];
    ```
4. 接收方如果处于离线状态，将会在上线后，接收到发送方之前发送的离线消息。


#### 场景 2：发送群组消息时使用离线推送功能

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```objc
    ZIMPushConfig *pushConfig = [ZIMPushConfig alloc] init];
    pushConfig.title = @"离线推送标题";
    pushConfig.content = @"离线推送内容";
    pushConfig.payload = @"自定义透传字段，非必填";
    pushConfig.resourcesID = @"资源ID";
    ```
2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```objc
    ZIMMessageSendConfig *sendConfig = [ZIMMessageSendConfig alloc] init];
    sendConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [sendGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#send-peer-message-message-to-user-id-config-callback)，传入 “sentConfig”，向群组内的所有用户发送消息。

    ```objc
    [zim sendGroupMessage:textMessage toUserID:@"myGroupID" config:sendConfig callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {

    }];
    ```
4. 群组内的用户，如果有人处于离线状态，将会在上线后，接收到发送方之前发送的群组离线消息。

#### 场景 3：发送呼叫邀请时使用离线推送功能
1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```objc
    ZIMPushConfig *pushConfig = [ZIMPushConfig alloc] init];
    pushConfig.title = @"离线推送标题";
    pushConfig.content = @"离线推送内容";
    pushConfig.payload = @"自定义透传字段，非必填";
    pushConfig.resourcesID = @"资源ID";
    ```
2. 然后通过 [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMCallInviteConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```objc
    ZIMCallInviteConfig *callInviteConfig = [ZIMMessageSendConfig alloc] init];
    callInviteConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [callInviteWithInvitees](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIM#call-invite-with-invitees-config-callback)，传入 “ callInviteConfig”，发起呼叫邀请。

    ```objc
    [[ZIM getInstance] callInviteWithInvitees:@[@"userA",@"userB"] config: callInviteConfig callback:^(NSString * _Nonnull callID, ZIMCallInvitationSentInfo * _Nonnull info, ZIMError * _Nonnull errorInfo) {
        
    }];
    ```
4. 被邀请的用户若处于离线状态，将会收到对应的离线推送，上线后，若呼叫邀请还未结束，将会收到 [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-call-invitation-received-call-id) 回调。



### 注销离线推送

若开发者希望某台设备不再接收离线推送，可通过调用 [unregisterAPNs](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZPNsManager#unregister-ap-ns) 接口注销。注销后，发送弹窗推送、静默推送也将不再生效。

```objc
[[ZPNs shared] unregisterAPNs];
```

## 在线调试

集成 ZPNs SDK 和获取 Push ID 后，您可以在 [ZEGO 控制台](https://console.zego.im/) 在线调试 ZIM 离线推送功能，详情请参考控制台的 [ZIM 离线推送调试](https://doc-zh.zego.im/article/17949)。

