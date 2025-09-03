# API

## ZegoUIKitPrebuiltCall

### init

使用 appSign 初始化 ZegoUIKitPrebuiltCall，用户登录（或重新登录、自动登录）到您的应用后，您必须立即调用此方法。   
同时您也可通过配置 `ZegoUIKitPrebuiltCallConfig`，来配置呼叫模式和进房后是否自动打开摄像头与麦克风。
当您使用 `呼叫邀请` 时，可以通过 `invitationEvents` 接收邀请过程中的事件，详情见[呼叫邀请配置](/callkit-miniprogram/calling-config/call-invitation-config)。

<CodeGroup>
```js Prototype
/**
    * 初始化rtc和zim
    * @param appID 客户的appID
    * @param server 客户的server地址，初始化rtc需要
    * @param userID 用户ID
    * @param userName 用户名
    * @param token 访问令牌, 生产环境需要服务器生成, 下发下来
    * @param config 配置选项（可选）
    * @param invitationEvents 希望监听的邀请相关事件
    * @returns 初始化结果
    */
static init(appID: number, server: string, userID: string, userName: string, token: string, config?: ZegoUIKitPrebuiltCallConfig, invitationEvents?: ZegoUIKitPrebuiltCallInvitationEvents)
```

```js Example
import { ZegoUIKitPrebuiltCall, ZegoCallScenario, ZegoUIKitUser }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';
const events = {
    onIncomingCallReceived: (callID: string, caller: ZegoUIKitUser,  callType: number, callees: ZegoUIKitUser[], customData: string) => {
        console.warn('onIncomingCallReceived', callID, caller, callType, callees, customData);
    },
    onIncomingCallCanceled: (callID: string, caller: ZegoUIKitUser, customData: string) =>{
        console.warn('onIncomingCallCanceled', callID, caller, customData);
        showToast(`${caller.userID}已取消呼叫邀请`);
    },
    // ......
}
const config = {
    // turnOnCameraWhenJoining: false,
    // turnOnMicrophoneWhenJoining: false,
    mode: ZegoCallScenario.CALL_INTIVATION,
}
ZegoUIKitPrebuiltCall.init(APPID, SERVER, userID, userName, token, config, events)
    .then((res)=>{
        console.log('res', res);
    })
    .catch((err)=>{
        console.log('err', err);
    });
```
</CodeGroup>

### sendCallInvitation

使用该接口发起呼叫邀请。

<CodeGroup>
```js Prototype
/**
     * 发起通话邀请
     * @param params 通话邀请参数
     * @returns 接口调用结果
     */
    static sendCallInvitation(params: {
        callees: ZegoUIKitUser[], 
        callType: ZegoCallInvitationType, 
        customData?: string, 
        timeout?: number, 
        roomID?: string}
    )
```

```js Example
import { ZegoUIKitPrebuiltCall }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

ZegoUIKitPrebuiltCall.init(APPID, SERVER, userID.value, userName.value, token, config, events)
    .then((res)=>{
        const callees = [{ userID: 'xx', userName: 'user_xx' }];
        const callType = 1;
        ZegoUIKitPrebuiltCall.sendCallInvitation({ callees, callType })
            .then((res)=>{
        	    !res.code && ZegoUIKitPrebuiltCall.onInvitationSent(callType, callees)
            });
    })
```
</CodeGroup>

### unInit

用户登出应用后，必须立即调用此方法。

<CodeGroup>
```js Prototype
/**
    * 反初始化
    * @returns 反初始化结果
    */
static unInit() 
```

```js Example
import { ZegoUIKitPrebuiltCall }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

ZegoUIKitPrebuiltCall.unInit();
```
</CodeGroup>


### renewToken

在您想更新 `init` 传入的 `token` 的值时，或者收到 `onTokenWillExpire` 回调时，需要在生产新的 `token` 后, 调用该接口进行更新。


<CodeGroup>
```js Prototype
/**
    * 更新令牌。
    * @param token 令牌字符串。
    * @param roomID 房间ID（可选）。
    * @returns 如果更新令牌成功，则返回true；否则返回false。
    */
static renewToken(token: string, roomID?: string): boolean 
```

```js Example
import { ZegoUIKitPrebuiltCall }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

// 监听 `onTokenWillExpire` 回调，并调用 `renewToken` 更新为新的 Token。

const LISTENER_ID = '' + Date.now() // 生成回调ID

onMounted(() => {
    // 监听 `onTokenWillExpire` 回调
    ZegoUIKitPrebuiltCall.addUIKitListener(LISTENER_ID, {
        onTokenWillExpire(roomID) {
            console.warn('onTokenWillExpire', roomID);
            // 重新获取token
            token = generatePrebuiltTokenTest(APPID, SERVER_SECRET, userID);
            // 刷新内部token
            ZegoUIKitPrebuiltCall.renewToken(token, roomID);
        },
    })
});

onUnmounted(() => {
    // 确保配套调用, 添加的 listener 必须在不用的时候删除
    ZegoUIKitPrebuiltCall.removeUIKitListener(LISTENER_ID);
	ZegoUIKitPrebuiltCall.unInit();
})
```
</CodeGroup>

### addUIKitListener

添加 UIKit 事件监听器，需要提供一个唯一的 ``，确保在不需要的时候能够移除监听器，否则会造成泄漏等不可预知的错误。

<CodeGroup>

```js Prototype
/**
    * 添加UIKit事件监听器

    * @param listenerID 事件监听器
ID
    * @param listener 事件监听器

    * @returns 添加事件监听器
结果
    */
static addUIKitListener(listenerID: string, listener: ZegoUIKitListener)
```

```js Example
import { ZegoUIKitPrebuiltCall }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

const LISTENER_ID = '' + Date.now(); // 生成回调ID
const listener = {
    onTokenWillExpire: (roomID) => {
    },
};

ZegoUIKitPrebuiltCall.addUIKitListener(LISTENER_ID, listener);
```
</CodeGroup>

### removeUIKitListener

取消监听 UIKit 回调事件，在不需要的时候必须移除监听器，否则会造成泄漏等不可预知的错误。

<CodeGroup>

```js Prototype
/**
    * 取消监听 uikit 回调事件
    * @param listenerID 事件监听器
ID
    * @returns 取消监听结果
    */
static removeUIKitListener(listenerID: string)
```

```js Example
import { ZegoUIKitPrebuiltCall }  from '@zegocloud/zego-uikit-prebuilt-call-mini-program';

const LISTENER_ID = '' + Date.now(); // 生成回调ID

// 取消事件监听器
ZegoUIKitPrebuiltCall.removeUIKitListener(LISTENER_ID);
```
</CodeGroup>