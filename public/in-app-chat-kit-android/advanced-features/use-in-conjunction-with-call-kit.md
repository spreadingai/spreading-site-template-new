# 集成音视频通话功能

这份文档将介绍如何使用 音视频通话 UIKit 来为ZIMKit 增加音视频通话的功能。

<Frame width="200" height="auto" caption="">
    <img src="https://media-resource.spreading.io/docuo/workspace737/c930b1495b92aa1bb3bd62bf096731cb/4e648e6706.gif" />
   
</Frame>

## 实现流程

<Steps>
<Step title="集成 IMKit">
请参考[快速开始](/in-app-chat-kit-android/quick-start)来集成 IMKit。如果已经集成了，可以忽略这一步骤。
</Step>


<Step title="添加 CallKit 依赖">
修改你的 app 模块的 build.gradle 文件，添加 CallKit 依赖：

```groovy
dependencies {
    ...
    implementation 'com.github.ZEGOCLOUD:zego_uikit_prebuilt_call_android:+'    // 在您的模块级 build.gradle 文件的 dependencies 中添加这行代码，通常命名为 [app]。
}
```
</Step>


<Step title="调整 IMKit 初始化方式">
在之前的步骤中，您使用了如下代码来初始化ZIMKit :
```java
Long appId = ;    // 您从 ZEGO 管理控制台获取的 AppID。
String appSign = ;    // 您从 ZEGO 管理控制台获取的 AppSign。
ZIMKit.initWith(this,appId,appSign);    
ZIMKit.initNotifications();    // 在线通知初始化（如果需要，请使用以下代码）。
```

为了集成音视频通话功能，需要使用带`ZIMKitConfig`类参数的方法来进行初始化：
```java
ZIMKitConfig zimKitConfig = new ZIMKitConfig();
Long appId = ;    // 您从 ZEGO 管理控制台获取的 AppID。
String appSign = ;    // 您从 ZEGO 管理控制台获取的 AppSign。
ZIMKit.initWith(this,appId,appSign,zimKitConfig);    
ZIMKit.initNotifications();  // 在线通知初始化（如果需要，请使用以下代码）。
```
</Step>

<Step title="启用 CallKit 功能">
在 `ZIMKitConfig` 类中，我们可以通过创建`ZegoCallPluginConfig`对象来启用音视频通话的功能。
```java
ZIMKitConfig zimKitConfig = ；
// ...
zimKitConfig.callPluginConfig = new ZegoCallPluginConfig();
```
</Step>

<Step title="添加音视频呼叫按钮">
启用 CallKit 功能以后，我们可以通过配置 `ZIMKitConfig` 的 `ZIMKitInputConfig` 参数来添加音视频呼叫按钮。
```java
ZIMKitConfig zimKitConfig = new ZIMKitConfig();
zimKitConfig.callPluginConfig = new ZegoCallPluginConfig();
zimKitConfig.inputConfig.expandButtons.add(ZIMKitInputButtonName.VOICE_CALL);
zimKitConfig.inputConfig.expandButtons.add(ZIMKitInputButtonName.VIDEO_CALL);
```

配置后，聊天页面的输入框中就会出现音视频呼叫的按钮，点击后会弹出二级菜单，你可以选择视频呼叫或者语音呼叫（暂时不支持群呼叫）。

</Step>
</Steps>
## 更多资源

以上内容仅介绍了集成音视频通话 UIKit 所需的基本配置。如果您需要进一步自定义呼叫的配置，可以设置：

```java
ZIMKitConfig zimKitConfig = ；
// ...
zimKitConfig.callPluginConfig = new ZegoCallPluginConfig();
// 自定义呼叫的配置
ZegoUIKitPrebuiltCallInvitationConfig invitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();
zimKitConfig.callPluginConfig.invitationConfig = invitationConfig;  // 可选，呼叫的邀请配置
zimKitConfig.callPluginConfig.resourceID = ; // 可选，用于呼叫邀请的 resourceID
```
关于使用 `ZegoUIKitPrebuiltCallInvitationConfig` 来进行通话功能的自定义，请参考以下文档：

<CardGroup cols={1}>
  <Card title="音视频通话 UIKit - 自定义 UI" href="https://doc-zh.zego.im/article/20217" target="_blank">
    本文介绍了如何进一步自定义通话的功能和界面。
  </Card>

</CardGroup>