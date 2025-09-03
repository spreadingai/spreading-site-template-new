# 呼叫邀请配置

## 前提条件

修改呼叫邀请配置前，需已经实现 [呼叫邀请](/callkit-uniapp/quick-start-(with-call-invitation).mdx) 相关功能。

## 自定义呼叫铃声

如果您想设置接收或发送呼叫邀请时的呼叫铃声，您可以在 `ZegoUIKitPrebuiltCallService` 初始化中使用 `incomingCallRingtone` 和 `outgoingCallRingtone` 配置。

以下是参考代码：

```vue title="自定义呼叫铃声" {4-5}
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
  incomingCallRingtone: 'https://xxx/xxx.mp3', // 接收呼叫邀请时的铃声
  outgoingCallRingtone: 'https://xxx/xxx.mp3', // 发送呼叫邀请时的铃声
})
```

## 隐藏拒绝按钮

要在收到呼叫邀请界面隐藏拒绝按钮，请将 `showDeclineButton` 设置为 `false`。

以下是参考代码：

```vue title="隐藏拒绝按钮" {4}
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
  showDeclineButton: false,
})
```

## 设置因发起者离开而自动结束通话

默认情况下，通话在发起者离开后仍将继续。如需因发起者退出而自动结束通话，请将 `endCallWhenInitiatorLeave` 属性设置为 `true`。

以下是参考代码：

```vue title="设置因发起者离开而自动结束通话" {4}
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
  endCallWhenInitiatorLeave: true,
})
```

## 监听呼叫邀请事件回调

您可以通过监听与呼叫邀请相关的事件回调来实现进一步的业务逻辑。

支持配置以下事件回调：

- `onIncomingCallDeclineButtonPressed?: () => void`：当拒绝按钮被按下时（被叫用户拒绝呼叫邀请），将触发此回调。

- `onIncomingCallAcceptButtonPressed?: () => void`：当接受按钮被按下时（被叫用户接受呼叫邀请），将触发此回调。

- `onIncomingCallReceived?: (callID: string, caller: ZegoUser, callType: number, callees: ZegoUser[]) => void`：当接收到呼叫邀请时，将触发此回调。

- `onIncomingCallCanceled?: (callID: string, caller: ZegoUser) => void`：当主叫用户取消呼叫邀请时，将触发此回调。

- `onIncomingCallTimeout?: (callID: string, caller: ZegoUser) => void`：当被叫用户在超时时间内未响应呼叫邀请时，将通过此回调接收到通知。

- `onOutgoingCallCancelButtonPressed?: () => void`：当取消按钮被按下时（主叫用户取消呼叫邀请），将触发此回调。

- `onOutgoingCallAccepted?: (callID: string, callee: ZegoUser) => void`：当被叫用户接受呼叫邀请时，主叫用户将通过此回调接收到通知。

- `onOutgoingCallRejectedCauseBusy?: (callID: string, callee: ZegoUser) => void`：当被叫用户因忙碌拒绝呼叫邀请时，主叫用户将通过此回调接收到通知。

- `onOutgoingCallDeclined?: (callID: string, callee: ZegoUser) => void`：当被叫用户主动拒绝呼叫邀请时，主叫用户将通过此回调接收到通知。

- `onOutgoingCallTimeout?: (callID: string, callees: ZegoUser[]) => void`：当呼叫邀请在超时时间内未收到响应时，主叫用户将通过此回调接收到通知。

以下是参考代码：

```vue title="监听呼叫邀请事件回调"
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
      onIncomingCallDeclineButtonPressed() {

      },
      onIncomingCallAcceptButtonPressed() {

      },
      onIncomingCallReceived(callID, caller, callType, callees) {
          
      },
      onIncomingCallCanceled(callID, caller) {

      },
      onIncomingCallTimeout(callID, caller) {
          
      },
      onOutgoingCallCancelButtonPressed() {
          
      },
      onOutgoingCallAccepted(callID, callee) {
          
      },
      onOutgoingCallRejectedCauseBusy(callID, callee) {
          
      },
      onOutgoingCallDeclined(callID, callee) {
          
      },
      onOutgoingCallTimeout(callID, callees) {
          
      },
})
```

## 通话配置

**音视频通话 UIKit** 提供了一组默认的通话页面行为和样式，如果您需要自定义通话界面，您可以通过配置 [ZegoUIKitPrebuiltCallConfig](/callkit-uniapp/api-reference/config) 属性进行自定义。


以下是参考代码：

```vue title="通话配置" {4}
import ZegoUIKitPrebuiltCallService from "@/uni_modules/zego-PrebuiltCall/services/ZegoUIKitPrebuiltCallService";

ZegoUIKitPrebuiltCallService.init(appID, appSign, userID, userName, {
      callConfig: ZegoUIKitPrebuiltCallConfig;
})
```
