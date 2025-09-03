# 实现 VoIP 通知

## 功能简介

通过 VoIP 通知，您可以在 App 上实现与运营商提供的电话功能一致的语音呼叫体验。

<Warning title="注意">
受中国大陆政策限制，此功能仅限于中国大陆以外地区使用。
</Warning>


## 前提条件

在实现 VoIP 通知之前，请确保：
- 已集成 ZPNs SDK **2.1.0 或以上版本** 并实现离线推送，详情请参考 [实现离线推送](/zim-ios/../../en/docs_zim_ios/offline-push-notifications/implement-offline-push-notification)。
- 已向用户申请通知权限，并且用户同意 App 发送推送通知。
- Xcode 工程已在 +Capability 中添加 Push Notifications。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/offline_push_enable_pushNotification.png" /></Frame>

## 实现流程

<Steps>
<Step title="申请用于 VoIP 推送的证书">
在 [Apple developer 官网](https://developer.apple.com/) 申请用于 VoIP 推送的证书（后缀名为 .cer 证书文件），详情请参考 [Apple 官方文档](https://developer.apple.com/help/account/create-certificates/create-voip-services-certificates/)。
</Step>
<Step title="导出 “.p12”文件">
双击该证书文件，系统会把文件安装到钥匙串访问中，在如图所示位置（左侧边栏选择登录，顶部边栏选中证书），找到该证书，并导出 “.p12” 后缀的文件。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/VoIP_p12.jpg" /></Frame>
</Step>
<Step title="获取 resourceID">
联系 ZEGO 技术支持配置携带 iOS VoIP 策略的 `resourceID`。
</Step>
<Step title="添加 Background Modes Capabilities">
使用 Xcode 打开工程，在 “Signing & capabilities” 页面单击 “+Capability”，并在弹窗中双击 “Background Modes”，您即可在 “Signing & capabilities” 看到 “Background Modes” 配置区域。  

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/capability.jpg" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/Capability_Window.jpeg" /></Frame>

    在 “Background Modes” 配置区域勾选 “Voice over IP”、“Background fetch” 以及 “Remote notifications”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/Background_Modes.jpeg" /></Frame>
</Step>
<Step title="导入 PushKit 与 CallKit 库">
导入 PushKit 与 CallKit 库，并在使用前声明头文件。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/iOS/Callkit_and_Pushkit.jpg" /></Frame>
</Step>

:::if{props.platform=undefined}
<Step title="导入头文件">
```objc
#import "CallKit/CallKit.h"
#import "PushKit/PushKit.h"
```
</Step>
<Step title="申请当前设备的 VoIP token">
运行以下代码以申请 VoIP token。
   
```objc
dispatch_queue_t mainQueue = dispatch_get_main_queue();
PKPushRegistry *voipRegistry = [[PKPushRegistry alloc] initWithQueue:mainQueue];
[voipRegistry setDelegate:self]; // 可以用想要收到 VoIP 代理方法的对象替换此处的 self
NSMutableSet *desiredPushTypes = [[NSMutableSet alloc] init];
[desiredPushTypes addObject:PKPushTypeVoIP];
voipRegistry.desiredPushTypes = desiredPushTypes;
```
</Step>
<Step title="获取 VoIP token">
通过 `didUpdatePushCredentials` 方法获取 VoIP token，并调用 [setVoipToken](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZPNs#set-vo-ip-token-vo-i-ptoken-is-product) 接口传入 ZPNs SDK 中。
   
```objc
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials: (PKPushCredentials *)credentials forType:(NSString *)type {
    NSData *voIPToken = credentials.token;
    [[ZPNs shared] setVoipToken:voIPToken isProduct:TRUE];
}
```
   
<Warning title="注意">
请根据开发环境或生产环境准确填入 isProduct 的值（打包时用 development 证书签名为开发环境，用 distribution 证书签名为生产环境），否则 ZPNs 服务器无法选择合适的推送证书向 APNs 正确发送离线推送请求。APNs 在生产环境下的到达率与延迟均好于开发环境。
</Warning>
</Step>
<Step title="发送及接收 VoIP 通知">
    - 发送 VoIP 通知 
    
        <Note title="说明">
        请联系 ZEGO 技术支持，配置带 **VoIP 策略** 的 resourceID。
        </Note>
 
        在 [发起呼叫邀请](/zim-ios/guides/call-invitation-signaling) 或其他需要 VoIP 通知场景中，向 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig) 中传入该 resourceID，即可配置本次推送为 VoIP 类型。

        ```objc
        pushConfig.resourcesID = @"联系 ZEGO 技术支持配置的 resourcesID";
        ```

    - 接收到 VoIP 通知

        当收到 VoIP 通知时，App 会被唤起并触发 [didReceiveIncomingPushWithPayload](https://developer.apple.com/documentation/pushkit/pkpushregistrydelegate/2875784-pushregistry?language=objc)。请在该回调中调用 CallKit 的 [reportNewIncomingCallWithUUID](https://developer.apple.com/documentation/callkit/cxprovider/1930694-reportnewincomingcallwithuuid/) 接口拉起来电界面，并参考 [Apple 开发者文档](https://developer.apple.com/documentation/callkit?language=objc) 编写相关逻辑，并在逻辑结束后调用 `completion()`。

        ```objc
        - (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion{
            // 请参考 https://developer.apple.com/documentation/callkit?language=objc 编写 CallKit 相关逻辑
            // 请在此处使用  reportNewIncomingCallWithUUID 拉起 CallKit 来电页面。
            completion();
        }
        ```
</Step>
:::
:::if{props.platform="Flutter"}
<Step title="申请通知权限">
调用 [applyNotificationPermission](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/applyNotificationPermission.html) 向用户申请同意 App 的通知权限。

```dart
ZPNs.getInstance().applyNotificationPermission();
```
</Step>
<Step title="启用 VoIP">
开发者需要在使用 VoIP 之前，需要调用 [registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html)，设置 iOS 当前所处环境，并设置 `enableIOSVoIP` 为 true。

```dart
ZPNs.getInstance()
.registerPush(iOSEnvironment: ZPNsIOSEnvironment.Development,enableIOSVoIP: true)
.catchError((onError) {
	if (onError is PlatformException) {
    	// 开发者需要关注此处可能抛出的异常
    	log(onError.message ?? "");
   	}
});
```
<Warning title="注意">
请在开发环境或生产环境中输入正确的`iOSEnvironment`值。否则，ZPNs服务器无法选择正确的推送证书将离线通知请求发送到APNs。在打包过程中，如果使用开发证书，请选择开发环境的值；如果使用分发证书，请选择生产环境的值。在生产环境中，APNs具有更高的投递率和更低的延迟。
</Warning>
</Step>
<Step title="获取携带 VoIP token 的 pushID">
通过 [onRegistered](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onRegistered.html) 方法获取携带 VoIP token 的 pushID。

```dart
ZPNsEventHandler.onRegistered = (ZPNsRegisterMessage registerMessage) {
	log(registerMessage.errorCode.toString());
};
```
</Step>
<Step title="发送及接收 VoIP 通知">

    - 发送 VoIP 通知 
    
        <Note title="说明">
        请联系 ZEGO 技术支持，配置带 **VoIP 策略** 的 resourceID。
        </Note>
 
        在 [发起呼叫邀请](/zim-ios/guides/call-invitation-signaling) 或其他需要 VoIP 通知场景中，向 [ZIMPushConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html) 中传入该 resourceID，即可配置本次推送为 VoIP 类型。

        ```dart
        pushConfig.title = "系统通话标题";
        pushConfig.payload = "业务需要的透传字段";
        pushConfig.resourcesID = "联系 ZEGO 技术支持配置的 resourcesID";

        ZIMVoIPConfig voIPConfig = ZIMVoIPConfig();
        voIPConfig.iOSVoIPHandleType = ZIMCXHandleType.generic;
        //发送方联系人信息
        voIPConfig.iOSVoIPHandleValue = "Li hua";
        //是否为视频通话
        voIPConfig.iOSVoIPHasVideo = false;
        pushConfig.voIPConfig = voIPConfig;
        ```

    - 接收到 VoIP 通知
      为了方便 Flutter 开发者使用 iOS 原生的 Callkit 库接口， ZEGO 封装了相关接口到 zego_callkit 插件中。请参考 [CallKit 使用指南](/zim-ios/offline-push-notifications/best-practices/callkit-user-guide)。

</Step>
:::
:::if{props.platform="RN"}
<Step title="申请通知权限">
调用 [applyNotificationPermission](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#apply-notification-permission) 接口向用户申请同意 App 的通知权限。

    ```typescript
    import ZPNs, { CallKit } from 'zego-zpns-react-native';
    
    ZPNs.getInstance().applyNotificationPermission();
    ```
</Step>
<Step title="启用 VoIP">
设置 iOS 当前所处环境，调用 [registerPush](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#register-push)，并设置 `enableIOSVoIP` 为 true。

    <Warning title="注意">
    请根据开发环境或生产环境准确填入 [enableDebug](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNs#enable-debug) 的参数（打包时用 development 证书签名为开发环境，用 distribution 证书签名为生产环境），否则 ZPNs 服务器无法选择合适的推送证书向 APNs 正确发送离线推送请求。APNs 在生产环境下的到达率与延迟均好于开发环境。
    </Warning>

    ```typescript
    // 开发环境: true;  生产环境: false (默认值)
    ZPNs.enableDebug(true);

    ZPNs.getInstance().registerPush({ enableIOSVoIP: true });
    ```
</Step>
<Step title="获取携带 VoIP token 的 pushID">
注册 [registered](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~class~ZPNsEventHandler#registered) 回调，获取 携带 VoIP token 的 pushID。

   ```typescript
    ZPNs.getInstance().on("registered", (message) => {
        console.log("[ZPNs] registered. pushID: " + message.pushID + ", error: " + message.errorCode);
    });
    ```
</Step>
<Step title="发送及接收 VoIP 通知">
- 发送 VoIP 通知 
    
    <Note title="说明">
    请联系 ZEGO 技术支持，配置带 **VoIP 策略** 的 resourceID。
    </Note>


    在 [发起呼叫邀请](/zim-ios/guides/call-invitation-signaling) 或其他需要 VoIP 通知场景中，向 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig) 中传入该 resourceID，即可配置本次推送为 VoIP 类型。

        ```typescript
        const pushConfig: ZIMPushConfig = {
            resourcesID: "your resourcesID", // 联系 ZEGO 技术支持配置的 resourcesID
            title: "系统通话标题",
            payload: "业务需要的透传字段",
            content: "your content",
            voIPConfig:{
                'iOSVoIPHandleType': 1,
                'iOSVoIPHandleValue': '发送方联系人信息',
                'iOSVoIPHasVideo': true
            }
        };
        ```

- 接收到 VoIP 通知

    为了方便 RN 开发者使用 iOS 原生的 Callkit 库接口， ZEGO 封装了相关接口到 zego-callkit-react-native 插件中。请参考 [CallKit 使用指南](/zim-ios/offline-push-notifications/best-practices/callkit-user-guide)。

</Step>
:::
</Steps>

