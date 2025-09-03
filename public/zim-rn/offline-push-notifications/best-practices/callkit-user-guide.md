export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const setInitConfiguration={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CallKit/setInitConfiguration.html" target="_blank">setInitConfiguration</a>,
    "RN": `setInitConfiguration`
}
export const didReceiveIncomingPush={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CallKitEventHandler/didReceiveIncomingPush.html" target="_blank">didReceiveIncomingPush</a>,
    "RN": `didReceiveIncomingPush`
}
export const reportIncomingCall={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CallKit/reportIncomingCall.html" target="_blank">reportIncomingCall</a>,
    "RN": `reportIncomingCall`
}
export const reportCallEnded={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CallKit/reportCallEnded.html" target="_blank">reportCallEnded</a>,
    "RN": `reportCallEnded`
}
export const registerPush={
    "default": <a href="https://pub.dev/documentation/zego_zpns/2.5.0/zego_zpns/ZPNs/registerPush.html" target="_blank">registerPush</a>,
    "RN": `registerPush`
}
export const supportsVideo_={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CXProviderConfiguration/supportsVideo_.html" target="_blank">supportsVideo</a>,
    "RN": `supportsVideo`
}
export const hasVideo={
    "default": <a href="https://pub.dev/documentation/zego_callkit/latest/zego_callkit/CXCallUpdate/hasVideo.html" target="_blank">hasVideo</a>,
    "RN": `hasVideo`
}
export const remoteHandle={
    "default": <a href="https://pub.dev/documentation/zego_callkit/1.0.0/zego_callkit/CXCallUpdate/remoteHandle.html" target="_blank">remoteHandle</a>,
    "RN": `remoteHandle`
}
export const iOSVoIPHasVideo={
    "default": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMVoIPConfig/iOSVoIPHasVideo.html" target="_blank">iOSVoIPHasVideo</a>,
    "RN": `iOSVoIPHasVideo`
}

# CallKit 使用指南

<Note title="说明">本功能仅限在 iOS 设备上实现。</Note>

:::if{props.platform=undefined}
为方便 Flutter 开发者在 iOS 设备上实现 VoIP 功能，ZEGO 将 iOS CallKit 、PushKit 库的部分功能封装为了 `zego_callkit`。本插件接口的接口风格、功能基本与 Apple CallKit、PushKit 保持一致，开发者可参考 Apple 开发者文档 [CallKit](https://developer.apple.com/documentation/callkit?language=objc) 和 [PushKit](https://developer.apple.com/documentation/pushkit?language=objc) 相关介绍。
:::
:::if{props.platform="RN"}
为方便 React Native 开发者在 iOS 设备上实现 VoIP 功能，ZEGO 将 iOS CallKit 、PushKit 库的部分功能封装为了 `zego-callkit-react-native`。本插件接口的接口风格、功能基本与 Apple CallKit、PushKit 保持一致，开发者可参考 Apple 开发者文档 [CallKit](https://developer.apple.com/documentation/callkit?language=objc) 和 [PushKit](https://developer.apple.com/documentation/pushkit?language=objc) 相关介绍。
:::

## 前提条件

- 已集成 ZPNs SDK **2.6.0 或以上版本** 并实现离线推送，详情请参考 [实现离线推送](/zim-rn/offline-push-notifications/implement-offline-push-notification)。
- 已向用户申请通知权限，并且用户同意 App 发送推送通知。
- Xcode 工程已在 +Capability 中添加 Push Notifications。   
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/offline_push_enable_pushNotification.png" /></Frame>

## 添加依赖

:::if{props.platform=undefined}
您可以在 flutter 项目根目录中的 “pubspec.yaml” 文件添加依赖。

```yaml
dependencies:
    # 请填写具体的 SDK 版本号
    # 请从 https://pub.dev/packages/zego_callkit 查询插件的最新版本，并将 x.y.z 修改为具体的版本号
    zego_callkit: ^x.y.z
```
:::
:::if{props.platform="RN"}

1.进入您的项目的根目录，执行以下命令安装依赖。

<CodeGroup>
```bash title="npm"
npm i zego-callkit-react-native
```
```bash title="yarn"
yarn add zego-callkit-react-native
```
</CodeGroup>

2.导入 SDK。

```typescript
import CallKit from 'zego-callkit-react-native';
```

3.进入 iOS 根目录，并执行 `pod install` 命令安装依赖。

完成如上操作即可在项目中通过 javascript 或 typescript (推荐) 来使用 `zego-callkit-react-native` SDK。
:::

## 初始化

开发者需要在使用 VoIP 前，请先调用 {getPlatformData2(props, setInitConfiguration)} 设置 VoIP 配置项。有关 Configuration 的内容，请参考 Apple 官网文档 [CXProviderConfiguration](https://developer.apple.com/documentation/callkit/cxproviderconfiguration?language=objc)。

:::if{props.platform=undefined}
```dart
CallKit.setInitConfiguration(CXProviderConfiguration(localizedName: 'Your App Name or others'));   
```
:::
:::if{props.platform="RN"}
```typescript
CallKit.setInitConfiguration({localizedName:"Your app name or others"});
```
:::

## 接收 VOIP 通知

当收到 VoIP 通知时，App 会拉起通话界面并触发 {getPlatformData2(props, didReceiveIncomingPush)}。接口详情请参考 Apple 官方文档 [didReceiveIncomingPushWithPayload](https://developer.apple.com/documentation/pushkit/pkpushregistrydelegate/2875784-pushregistry?language=objc)。

:::if{props.platform=undefined}
```dart
CallKitEventHandler.didReceiveIncomingPush = (Map extras ,UUID uuid){
    // 取出发送时携带的透传字段
    Map payload = extras['payload'];
};
```
:::
:::if{props.platform="RN"}
```typescript
const handleIncomingPush = (extras: Record<string, any>, uuid: string) => {
   //取出 ZIMPushConfig 中传入的 payload
   const payload = extras['payload'];
}
CallKit.getInstance().on('didReceiveIncomingPush', handleIncomingPush);
```
:::

## 主动拉起 iOS CallKit 来电界面

当 iOS 端用户在线但 App 处于后台时，如果有别的用户发起呼叫，请先调用 {getPlatformData2(props, setInitConfiguration)} 接口初始化 CallKit，然后即可调用 {getPlatformData2(props, reportIncomingCall)} 接口，拉起来电界面，如下图所示。接口详情请参考 Apple 官方文档 [reportNewIncomingCallWithUUID](https://developer.apple.com/documentation/callkit/cxprovider/1930694-reportnewincomingcallwithuuid?language=objc)。

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/incoming_call.jpeg" /></Frame>

:::if{props.platform=undefined}
```dart
// 主动拉起 CallKit 前请先至少调用一次 setInitConfiguration
CallKit.setInitConfiguration(CXProviderConfiguration(localizedName: 'ZEGO'));

CallKit.getInstance().reportIncomingCall(CXCallUpdate(), UUID.getUUID()).catchError((onError){
// 主动拉起失败，请关注此处的报错
}).then((value) => {
// 拉起成功
});
```
:::
:::if{props.platform="RN"}
```typescript
// 主动拉起 CallKit 前请先至少调用一次 setInitConfiguration
CallKit.setInitConfiguration({localizedName: 'ZEGO'});

// 创建 CXCallUpdate 对象
const cxCallUpdate = new CXCallUpdate({
    remoteHandle: /* 这里设置 CXHandle 对象 */,
    localizedCallerName: "Caller Name", // 来电者名称
    supportsHolding: true,
    supportsGrouping: false,
    supportsUngrouping: false,
    supportsDTMF: true,
    hasVideo: false
});

// 生成一个 UUID,UUID 请使用 v4 版本。
const uuid = "your-unique-uuid-string"; // 请替换为实际的 UUID

// 调用 reportIncomingCall 方法
CallKit.getInstance().reportIncomingCall(cxCallUpdate, uuid)
    .then(() => {
        console.log("Incoming call reported successfully");
    })
    .catch(error => {
        console.error("Error reporting incoming call: ", error);
    });
```
:::

拉起通话界面后，如需接受邀请，实现真正的通话，请集成 Express SDK，详情请参考 [实时音视频](https://doc-zh.zego.im/article/overview?key=ExpressVideoSDK&platform=flutter&language=dart)。

## 挂断 CallKit 通话界面

如需拒绝来电，请调用 {getPlatformData2(props, reportCallEnded)} 接口。详情请参考 Apple 官网文档 [reportCallWithUUID:endedAtDate:reason](https://developer.apple.com/documentation/callkit/cxprovider/1930701-reportcallwithuuid?language=objc)。

:::if{props.platform=undefined}
```dart
// CXCallEndedReason 填入挂断的原因，示例代码此处的枚举代表对端挂断了电话
// uuid 填入 didReceiveIncomingPush 获得的 uuid 或者 reportIncomingCall 传入的 uuid 对象。
CallKit.getInstance().reportCallEnded(CXCallEndedReason.CXCallEndedReasonRemoteEnded, uuid);
```
:::
:::if{props.platform="RN"}
```typescript
// CXCallEndedReason 填入挂断的原因，示例代码此处的枚举代表对端挂断了电话
// uuid 填入 didReceiveIncomingPush 获得的 uuid 或者 reportIncomingCall 传入的 uuid 字符串。
CallKit.getInstance().reportCallEnded(CXCallEndedReason.AnsweredElsewhere,"BE5832D3-DCAE-4B4C-9B51-33400A5EA69E");
```
:::

## 接收 Callkit 的事件回调

如果需要监听 `CallKit` 的事件回调，请在调用 ZPNs 的 {getPlatformData2(props, registerPush)} 接口之前，传入各个回调函数的实现。回调详情请参考 Apple 官方文档 [didReceiveIncomingPushWithPayload](https://developer.apple.com/documentation/pushkit/pkpushregistrydelegate/2875784-pushregistry?language=objc)、[performAnswerCallAction](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648270-provider?language=objc)、[performEndCallAction](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648264-provider?language=objc) 和 [performSetMutedCallAction](https://developer.apple.com/documentation/callkit/cxproviderdelegate/1648269-provider?language=objc)。

:::if{props.platform=undefined}
```dart
// VoIP 通知到达的回调。
// uuid 为这次通话的唯一标识符。
CallKitEventHandler.didReceiveIncomingPush = (Map extras, UUID uuid){
    // payload 与 ZIMPushConfig 携带的 extended data 内容一致。
    Map payload = extras['payload'];
};

// 用户点击接听按钮事件
CallKitEventHandler.performAnswerCallAction = (CXAnswerCallAction action){
  
};
// 用户点击挂断按钮事件
CallKitEventHandler.performEndCallAction = (CXEndCallAction action){
  
};
// 用户点击静音按钮事件
CallKitEventHandler.performSetMutedCallAction = (CXSetMutedCallAction action){
    // 静音按钮为打开时 muted 为 true
    action.muted;
};
```
:::
:::if{props.platform="RN"}
```typescript
// VoIP 通知到达的回调。
// uuid 为这次通话的唯一标识符。
const handleIncomingPush = (extras: Record<string, any>, uuid: string) => {
   //取出 ZIMPushConfig 中传入的 payload
   const payload = extras['payload'];
}
CallKit.getInstance().on('didReceiveIncomingPush', handleIncomingPush);

// 用户点击接听按钮事件
const handlePerformAnswerCallPush = (action: CXAnswerCallAction) => {
  console.log("handlePerformAnswerCallPush 用户点击接受",action);
  // 接收成功，调用 action fulfill 函数
  action.fulfill();
}
CallKit.getInstance().on('performAnswerCallAction', handlePerformAnswerCallPush);

// 用户点击挂断按钮事件
const handlePerformEndCallAction = (action: CXEndCallAction) => {
  console.log("handlePerformEndCallAction 用户点击挂断", action);
  // 挂断电话，调用 action fulfill 函数
  action.fulfill();
}
CallKit.getInstance().on('performEndCallAction', handlePerformEndCallAction);

// 用户点击静音按钮事件
const handlePerformSetMutedCallAction = (action: CXSetMutedCallAction) => {
    console.log("handlePerformSetMutedCallAction 用户点击静音", action);
    // 静音按钮为打开时 muted 为 true
    const isMuted = action.muted;
    // 在这里添加处理静音逻辑
    // 调用 action fulfill 函数
    action.fulfill();
}
CallKit.getInstance().on('performSetMutedCallAction', handlePerformSetMutedCallAction);
```
:::

## 设置 CallKit 为视频/音频模式

CallKit 默认为音频模式。此模式设置仅影响 UI 展示，实际的通话效果需要由您自行实现。

视频模式与音频模式的 UI 对比：

|  | 视频模式 | 音频模式 |
| :-- | :-- | :-- | 
| 来电通知 | <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/video_mode.jpeg" /></Frame> | <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/voice_mode.jpeg" /></Frame> |
| 通话界面 | <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/video_call.jpeg" /></Frame> | <Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/voice_call.jpeg" /></Frame> |



### 开发者主动拉起 CallKit 时

调用 {getPlatformData2(props, setInitConfiguration)} 接口初始化时，设置 {getPlatformData2(props, supportsVideo_)} 为 true。详情请参考 Apple 官方文档 [supportsVideo](https://developer.apple.com/documentation/callkit/cxproviderconfiguration/1779574-supportsvideo?language=objc)。

调用 {getPlatformData2(props, reportIncomingCall)} 接口拉起来电界面时，设置 {getPlatformData2(props, hasVideo)} 为 true。如果您希望用户在接听来电后，点击用户界面上的“视频”按钮跳转到 App 上，还需要设置 {getPlatformData2(props, remoteHandle)}。详情请参考 Apple 官方文档 [hasVideo](https://developer.apple.com/documentation/callkit/cxcallupdate/2212625-hasvideo?language=objc) 和 [remoteHandle](https://developer.apple.com/documentation/callkit/cxcallupdate/2102405-remotehandle?language=objc)

:::if{props.platform=undefined}
```dart
// 初始化时 supportsVideo_ 需要为 true
var config = CXProviderConfiguration(localizedName: 'localizedName');
config.supportsVideo_ = true;
CallKit.setInitConfiguration(config);

// CXCallUpdate hasVideo 需要为 true
CXCallUpdate update = CXCallUpdate();
update.hasVideo = true;
// 如果希望通话界面的“视频”按钮点击可以跳转到您的 App，需要设置 remoteHandle
update.remoteHandle = CXHandle(type: CXHandleType.CXHandleTypeGeneric, value: '呼叫方的联系人信息');
//生成本次通话的唯一 id
UUID uuid = UUID.getUUID();
CallKit.getInstance().reportIncomingCall(update, uuid);
```
:::
:::if{props.platform="RN"}
```typescript
// 初始化时 supportsVideo 需要为 true
const config = {
    localizedName: 'localizedName',
    supportsVideo: true // 设置 supportsVideo 为 true
};
CallKit.setInitConfiguration(config);

// CXCallUpdate hasVideo 需要为 true
const update = {
    hasVideo: true, // 设置 hasVideo 为 true
    // 如果希望通话界面的“视频”按钮点击可以跳转到您的 App，需要设置 remoteHandle
    remoteHandle: {
        type: 'CXHandleTypeGeneric', // 这里根据实际情况设置合适的类型
        value: '呼叫方的联系人信息' // 设置呼叫方的联系人信息
    }
};
// 生成本次通话的唯一 id,uuid 版本为 v4
const uuid = "",

// 调用 reportIncomingCall 方法
CallKit.getInstance().reportIncomingCall(update, uuid);
```
:::

### SDK 主动拉起 CallKit 时

在发起 VoIP 时，发起端需要设置 {getPlatformData2(props, iOSVoIPHasVideo)} 为 `true`，接收端 SDK 将根据此参数自动将 CallKit 设置为视频模式。

:::if{props.platform=undefined}
```dart
pushConfig.title = "系统通话标题";
pushConfig.payload = "业务需要的透传字段";
pushConfig.resourcesID = "联系 ZEGO 技术支持配置的 resourcesID";

ZIMVoIPConfig voIPConfig = ZIMVoIPConfig();
voIPConfig.iOSVoIPHandleType = ZIMCXHandleType.generic;
//发送方联系人信息
voIPConfig.iOSVoIPHandleValue = "Li hua";
//是否为视频通话
voIPConfig.iOSVoIPHasVideo = true;
pushConfig.voIPConfig = voIPConfig;
```
:::
:::if{props.platform="RN"}
```typescript
// 设置 pushConfig
const pushConfig = {
    title: "系统通话标题", // 设置系统通话的标题
    payload: "业务需要的透传字段", // 设置业务透传的字段
    resourcesID: "联系 ZEGO 技术支持配置的 resourcesID", // 设置 resource ID，需联系 ZEGO 技术支持配置
    // 配置 VoIP 设置
    voIPConfig: {
        iOSVoIPHandleType: ZIMCXHandleType.generic, // 设置 iOS VoIP 的 Handle 类型为通用类型
        iOSVoIPHandleValue: "Li hua", // 设置发送方联系人信息
        iOSVoIPHasVideo: true, // 设置是否为视频通话
    }
};
```
:::

### 处理用户点击 "视频" 按钮的事件回调

CallKit 为视频模式的通话界面如图所示。当用户点击视频按钮时，将会触发 `- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler` 回调。您可以在原生工程监听该方法，并处理该事件回调。

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/video_call.jpeg" /></Frame>

```objc
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
    INInteraction *interaction = userActivity.interaction;
    INIntent *intent = interaction.intent;
    // 用户点击视频按钮时，会满足以下判断条件，需要注意的是该条件不仅点击事件按钮时会被触发，在通讯录点击通话记录时也会触发。
    if([userActivity.activityType isEqual:@"INStartVideoCallIntent"]){
        INPerson *person = [(INStartAudioCallIntent *)intent contacts][0];
        // 在这里可以拿到 ZIMVoIPConfig 填入的 CXHandle，您可以根据这些信息来实现您的业务逻辑。
        CXHandle *handle = [[CXHandle alloc] initWithType:(CXHandleType)person.personHandle.type value:person.personHandle.value];
        // 以下为演示用的 UI，弹框展示了这些信息。
        UIAlertController *alertView = [UIAlertController alertControllerWithTitle:@"tips" message:[NSString stringWithFormat:@"用户活动类型为 INStartVideoCallIntent，切到视频,用户的用户信息为:%@",handle.value] preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *action = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        }];
        [alertView addAction:action];
        [[UIViewControllerCJHelper findCurrentShowingViewController] presentViewController:alertView animated:YES completion:nil];
        return true;
    }
    return false;
}
```
<Content platform="RN"/>