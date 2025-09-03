# 与音视频通话 UIKit 一起使用

这份文档将介绍如何配合使用 IMKit 和 [音视频通话 UIKit](https://doc-zh.zego.im/article/20192)。

<Frame width="200" height="auto" caption="">
    <img src="https://doc-media.zego.im/sdk-doc/Pics/ZIMKit/inapp_chat_with_call.gif"/>
</Frame>

## 实现流程

<Steps>
<Step title="集成 IMKit">
请参考[快速开始](/in-app-chat-kit-ios/quick-start)来集成 IMKit。如果已经集成了，可以忽略这一步骤。
</Step>
<Step title="集成 音视频通话 UIKit">
请参考[音视频通话 UIKit 快速开始(包含呼叫邀请)](https://www.zegocloud.com/docs/uikit/zh/callkit-ios/quick-start-(with-call-invitation))来集成 音视频通话 UIKit 。
</Step>
<Step title="初始化音视频通话 UIKit">

- 编辑 `Podfile` 文件添加基本依赖项：
```Ruby
pod 'ZegoUIKitPrebuiltCall', '>= 2.12.1'
```
- 打开 `Info.plist` 文件并添加以下内容：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>NSCameraUsageDescription</key>
        <string>应用需要使用您的摄像头实现视频通话、拍照。</string>
        <key>NSMicrophoneUsageDescription</key>
        <string>应用需要使用您的麦克风实现音视频通话、语音消息。</string>
    </dict>
</plist>
```

- 通过 `ZIMKitConfig`初始化 音视频通话 UIKit ：

```swift AppDelegate.swift {11}
import UIKit
import ZIMKit
import ZegoUIKitPrebuiltCall
import ZegoPluginAdapter

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        let appID: UInt32 = YOUR_APPID
        let appSign: String = YOUR_APP_SIGN
        let userID: String = YOUR_USER_ID
        let userName: String = YOUR_USER_NAME
        let resourceID: String = "resourceID" 
        let config = ZIMKitConfig()
        // 生产环境`isSandboxEnvironment`设置为false
        let call:ZegoUIKitPrebuiltCallInvitationConfig = ZegoUIKitPrebuiltCallInvitationConfig(notifyWhenAppRunningInBackgroundOrQuit: true, isSandboxEnvironment: true, certificateIndex: .firstCertificate)
        let callConfig: ZegoCallPluginConfig = ZegoCallPluginConfig(invitationConfig: call, resourceID: resourceID)

        config.callPluginConfig = callConfig
        // bottomConfig.expandButtons 默认提供两个功能 拍照、文件
        // bottomConfig.expandButtons 添加音、视频呼叫选项
        config.bottomConfig.expandButtons.append(.voiceCall)
        config.bottomConfig.expandButtons.append(.videoCall)
        ZIMKit.initWith(appID: appID, appSign: appSign, config: config)
    }
}
```
成功登录应用内聊天工具后，添加以下代码登陆ZIM:

```swift {7,8}
let appID: UInt32 = YOUR_APPID
let appSign: String = YOUR_APP_SIGN
let userID: String = YOUR_USER_ID
let userName: String = YOUR_USER_NAME
ZIMKit.connectUser(userID: userID, userName: userName) { error in
    if error.code == .success {
        let config = ZegoUIKitPrebuiltCallInvitationConfig(notifyWhenAppRunningInBackgroundOrQuit: true, isSandboxEnvironment: false)
        ZegoUIKitPrebuiltCallInvitationService.shared.initWithAppID(appID, appSign: appSign, userID: userID, userName: userName, config: config)
    }
}
```
</Step>
</Steps>
到目前为止，您已成功将 音视频通话 UIKit 集成到 IMKit 中。现在您可以运行并体验它了。

## 更多资源

以上内容仅介绍了集成 音视频通话 UIKit 所需的基本配置。如果您需要进一步自定义呼叫的配置，请参考以下文档：

<CardGroup cols={2}>
  
  <Card title="音视频通话 UIKit - 快速开始" href="https://doc-zh.zego.im/article/20209" target="_blank">
    本文档中的步骤帮助您快速发起通话。
  </Card>

  <Card title="音视频通话 UIKit - 自定义 UI" href="https://doc-zh.zego.im/article/20216" target="_blank">
    本文介绍了如何进一步自定义通话的功能和界面。
  </Card>

</CardGroup>
