# 呼叫邀请配置

## 前提条件

修改呼叫邀请配置前，需已经实现 [呼叫邀请](/callkit-miniprogram/quick-start-(with-call-invitation).mdx) 相关功能。

## 监听呼叫邀请事件回调

您可以通过监听与呼叫邀请相关的事件回调来实现进一步的业务逻辑。

支持配置以下事件回调：

- `onIncomingCallDeclineButtonPressed?: () => void`：当拒绝按钮被按下时（被叫用户拒绝呼叫邀请），将触发此回调。

- `onIncomingCallAcceptButtonPressed?: () => void`：当接受按钮被按下时（被叫用户接受呼叫邀请），将触发此回调。

- `onIncomingCallReceived?: (callID: string, caller: ZegoUIKitUser, callType: number, callees: ZegoUIKitUser[], customData: string,) => void`：当接收到呼叫邀请时，将触发此回调。

- `onIncomingCallCanceled?: (callID: string, caller: ZegoUIKitUser, customData: string) => void`：当主叫用户取消呼叫邀请时，将触发此回调。

- `onIncomingCallTimeout?: (callID: string, caller: ZegoUIKitUser) => void`：当被叫用户在超时时间内未响应呼叫邀请时，将通过此回调接收到通知。

- `onOutgoingCallCancelButtonPressed?: () => void`：当取消按钮被按下时（主叫用户取消呼叫邀请），将触发此回调。

- `onOutgoingCallAccepted?: (callID: string, calleeID: string) => void`：当被叫用户接受呼叫邀请时，主叫用户将通过此回调接收到通知。

- `onOutgoingCallRejectedCauseBusy?: (callID: string, calleeID: string, customData: string) => void`：当被叫用户拒绝呼叫邀请时（被呼叫者忙碌），主叫用户将通过此回调接收到通知。

- `onOutgoingCallDeclined?: (callID: string, calleeID: string) => void`：当被叫用户主动拒绝呼叫邀请时，主叫用户将通过此回调接收到通知。

- `onOutgoingCallTimeout?: (callID: string, calleeID: string, customData: string) => void`：当呼叫邀请在超时时间内未收到响应时，主叫用户将通过此回调接收到通知。

```js 回调设置示例代码
<script setup>
import { ZegoUIKitPrebuiltCall, ZegoCallScenario } from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

const appID = 0; // 您从控制台获取的 AppID
const server = ""; // 您从控制台获取的 Server 地址
const userID = "user1"; // userID，需用户自己定义，保证全局唯一，建议设置为业务系统中的用户唯一标识
const userName = "user1_name"; // userName 用户名
const token = ""; // 您从服务端生成的 Token
const config = {
    mode: ZegoCallScenario.CALL_INTIVATION,
}; // 房间配置

onMounted(() => {
    const invitationEvents = {
        onIncomingCallAcceptButtonPressed: () => {
            
        },
        onIncomingCallDeclineButtonPressed: () => {
        
        },
        onIncomingCallReceived: (callID, caller, callType, callees, customData) => {
            
        },
        onIncomingCallCanceled: (callID, caller, customData) =>{
            
        },
        onIncomingCallTimeout: (callID, caller) => {
            
        },
        onOutgoingCallCancelButtonPressed: () => {
            
        },
        onOutgoingCallAccepted: (callID, calleeID) =>{
            
        },
        onOutgoingCallRejectedCauseBusy: (callID, calleeID) => {
            
        },
        onOutgoingCallDeclined: (callID, calleeID) =>{
            
        },
        onOutgoingCallTimeout: (callID, calleeID, customData) => {
            
        },
    }
	ZegoUIKitPrebuiltCall.init(appID, server, userID, userName, token, config, invitationEvents);
})
</script>
```