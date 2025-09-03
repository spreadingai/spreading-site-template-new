# 呼叫邀请

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>


## 功能简介

ZIM SDK 提供了呼叫邀请功能，支持主叫向被叫（可为离线状态）发送呼叫邀请、被叫（可为离线状态）接受或拒绝邀请等完整的业务流程控制能力。呼叫邀请分为两种模式，普通模式与进阶模式。

普通模式的呼叫邀请支持用户发起、取消、接受、拒绝和超时未响应。在此基础上，进阶模式的呼叫邀请还允许用户中途邀请他人、退出以及结束呼叫。

<Note title="说明">

“呼叫邀请” 功能仅提供了基本的业务流程控制能力，开发者需要自行实现使用本功能的业务需求（例如，通常应用在聊天工具中，发起语音通话或视频通话邀请等场景中）。
</Note>

## 呼叫用户状态说明

呼叫用户状态（[ZIMCallUserState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMCallUserState)），是指用户在呼叫邀请各个环节中的状态。本节主要介绍状态如何流转，以及状态与接口/回调的关系。

### 状态流转

从呼叫邀请发起到呼叫结束，呼叫用户状态流转如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMCallUserState.jpeg" /></Frame>

<table>
<tbody><tr>
<th>状态</th>
<th>含义</th>
<th>触发事件</th>
<th>适用模式</th>
</tr>
<tr>
<td>Inviting</td>
<td>被邀请中。</td>
<td>用户正在被邀请。</td>
<td rowspan="6"><ul><li>普通模式。</li><li>进阶模式。</li></ul></td>
</tr>
<tr>
<td>Accepted</td>
<td>已接受邀请。</td>
<td><ul><li>用户发起呼叫邀请。</li><li>用户接受呼叫邀请。</li></ul></td>
</tr>
<tr>
<td>Rejected</td>
<td>已拒绝邀请。</td>
<td>用户拒绝呼叫邀请。</td>
</tr>
<tr>
<td>Cancelled</td>
<td>已取消邀请。</td>
<td><ul><li>用户主动取消呼叫邀请.</li><li>被叫尚未应答邀请，而主叫掉线且心跳超时。</li></ul></td>
</tr>
<tr>
<td>Received</td>
<td>已收到邀请。</td>
<td><ul><li>在线用户收到邀请。</li><li>离线用户在超时范围内上线。</li></ul></td>
</tr>
<tr>
<td>Timeout</td>
<td>超时未接受。</td>
<td>被叫用户超时未响应邀请。</td>
</tr>
<tr>
<td>Quit</td>
<td>退出。</td>
<td>呼叫实现后，用户退出呼叫。</td>
<td><ul><li>进阶模式。</li></ul></td>
</tr>
<tr>
<td>Unknown</td>
<td>未知。</td>
<td colspan="2">请联系 ZEGO 技术支持。</td>
</tr>
</tbody>
</table>





### 状态与接口/回调的关系

在用户在进行呼叫邀请时，其呼叫用户状态会影响用户是否可以调用某些接口，或者监听某些事件。

- 各状态可调用接口：

<table>
<tbody><tr>
<th></th>
<th>CallInvite</th>
<th>CallCancel</th>
<th>CallAccept</th>
<th>CallReject</th>
<th>CallInvite</th>
<th>CallQuit</th>
<th>CallEnd</th>
</tr>
<tr>
<td>Inviting</td>
<td rowspan="8">与呼叫用户状态无关，只需用户不在呼叫中，即可调用。</td>
<td rowspan="8">与呼叫用户状态无关，只需用户发起邀请后，无人应答即可调用。</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Accepted</td>
<td>✖</td>
<td>✖</td>
<td>✔️</td>
<td>✔️</td>
<td>✔️</td>
</tr>
<tr>
<td>Rejected</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Cancelled</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Received</td>
<td>✔️</td>
<td>✔️</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Timeout</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Quit</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Unknown</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
</tbody>
</table>

- 各状态可监听事件：

<table>
<tbody><tr>
<th></th>
<th>OnCallInvitationReceived</th>
<th>OnCallInvitationTimeout</th>
<th>OnCallInvitationCancelled</th>
<th>OnCallInvitationEnded</th>
<th>OnCallUserStateChanged</th>
</tr>
<tr>
<td>Inviting</td>
<td>✔️</td>
<td>✔️</td>
<td>✔️</td>
<td>✔️</td>
<td>✔️</td>
</tr>
<tr>
<td>Accepted</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✔️</td>
<td>✔️</td>
</tr>
<tr>
<td>Rejected</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Cancelled</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Received</td>
<td>✖</td>
<td>✖</td>
<td>✔️</td>
<td>✔️</td>
<td>✔️</td>
</tr>
<tr>
<td>Timeout</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
<tr>
<td>Quit</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✔️</td>
</tr>
<tr>
<td>Unknown</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
<td>✖</td>
</tr>
</tbody>
</table>



## 普通模式

普通模式下，呼叫邀请的生命周期在全员响应后随即结束（所有被叫接受、拒绝、邀请超时之后）。以下，我们以客户端 A（邀请者）向客户端 B（被邀请者）发起呼叫邀请为例。


### 1 监听呼叫邀请相关用户的状态变化

开发者可以监听 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) 回调，进而收到呼叫邀请相关用户的状态变化。

示例代码如下：

```cs
// 监听呼叫邀请相关用户的状态变化
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info,
string callID) =>
    {
        foreach(ZIMCallUserInfo userInfo in info.callUserList)
        {

            // 状态发生变化的 userID
            String userID = userInfo.userID;

            // 该用户当前最新状态
            ZIMCallUserState state = userInfo.state;

            // 透传字段，与用户调用接受、拒绝、退出接口时携带的 extended data 内容一致
            String extendedData = userInfo.extendedData;
        }
    };
```

### 2 发起呼叫邀请

客户端 A 向客户端 B 发起呼叫邀请时，流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/send.png" /></Frame>

1. 客户端 A 通过调用 [CallInvite](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-invite) 接口，发起呼叫邀请，客户端 B 在收到邀请信息后，可以选择 <a href="#4-接受呼叫邀请">接受</a> 或者 <a href="#5-拒绝呼叫邀请">拒绝</a>。
2. 客户端 B 通过注册 [OnCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-received) 回调接口，接收客户端 A 的邀请通知。

    <Note title="说明">

    若客户端 B 为离线用户：
    - 在 timeout（邀请超时时间）内登录，即可通过 [OnCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-received) 收到呼叫邀请通知。
    - 在 timeout 外登录，请调用 [QueryCallInvitationList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-call-invitation-list) 来 <a href="#查询呼叫邀请列表">查询呼叫邀请列表</a>。
    </Note>

**示例代码**

- 发送呼叫邀请

```cs
// 发送呼叫邀请
List<string> invitees = new List<string>();  // 被邀请人列表
invitees.Add("421234");       // 被邀请人id
ZIMCallInviteConfig config = new ZIMCallInviteConfig();
config.timeout = 200; // 邀请超时时间，单位为秒，范围 1-600

// （可选）需要向离线用户发起呼叫邀请时填写
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "your title";
pushConfig.content = "your content";
pushConfig.payload = "your payload";
config.pushConfig = pushConfig;

ZIM.GetInstance().CallInvite(invitees, config, (string callID, ZIMCallInvitationSentInfo info, ZIMError errorInfo) => { });
```

-  被邀请者收到邀请后的回调通知

```cs
// 被邀请者收到邀请后的回调通知
ZIM.GetInstance().onCallInvitationReceived = (ZIM zim,
                                        ZIMCallInvitationReceivedInfo info,
                                        string callID) =>
{
    // 被邀请者收到邀请后的回调通知
};
```

### 3 取消呼叫邀请

客户端 A 向客户端 B 发起呼叫邀请后、又取消邀请时，流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/cancel.png" /></Frame>

1. 客户端 A 发起呼叫邀请后，如果需要取消，可以调用 [CallCancel](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-cancel) 接口，主动选择取消当前邀请。
    <Note title="说明">

    在呼叫邀请成功创建后至其超时前，如果没有任何被叫用户接受，主叫用户主动登出或因心跳超时而掉线，也会导致呼叫邀请被取消。
    </Note>
2. 邀请取消后，客户端 B 会收到 [OnCallInvitationCancelled](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-cancelled) 回调接口的相关通知。


**示例代码**

- 取消呼叫邀请

```cs
// 取消呼叫邀请
List<string> invitees = new List<string>();  // 被邀请人列表
invitees.Add("421234");       // 被邀请人 ID
string callid = "12352435";        // 呼叫 ID
ZIMCallCancelConfig config = new ZIMCallCancelConfig();

ZIM.GetInstance().CallCancel(invitees, callid, config, (string callID, List<string> errorInvitees,
                ZIMError errorInfo) =>
{
    // 取消呼叫邀请的回调
});
```

- 被邀请者收到取消邀请后的回调通知

```cs
ZIM.GetInstance().onCallInvitationCancelled = (ZIM zim,
                                            ZIMCallInvitationCancelledInfo info,
                                            string callID) =>
{
    // 被邀请者收到取消邀请后的回调通知
};
```


### 4 接受呼叫邀请

客户端 B 收到客户端 A 的呼叫邀请后，选择接受邀请时，流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/accept_new.png" /></Frame>

1. 客户端 B 收到客户端 A 发来的呼叫邀请后，通过调用 [CallAccept](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-accept) 接口，接受该邀请。
2. 客户端 B 接受邀请后，客户端 A 可以通过 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) 回调接口，收到相关通知。如果是在多人呼叫中，则所有现有呼叫成员都可通过此回调收到相关通知。

**示例代码**

- 接受呼叫邀请

```cs
string callid = "12352435";        // 呼叫 ID
ZIMCallAcceptConfig config = new ZIMCallAcceptConfig();
ZIM.GetInstance().CallAccept(callid, config, (string callID, ZIMError errorInfo) =>
{
    // 接受呼叫的回调结果
});
```

- 呼叫成员收到有用户接受呼叫邀请的通知

```cs
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info,
                                  string callID) =>
  {
      //监听通知
  };
```


### 5 拒绝呼叫邀请


客户端 B 收到客户端 A 的呼叫邀请后，选择拒绝邀请时，流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/reject_new.png" /></Frame>

1. 客户端 B 收到客户端 A 发来的呼叫邀请后，通过调用 [CallReject](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-reject) 接口，拒绝该邀请。
2. 客户端 B 拒绝邀请后，客户端 A 可以通过 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) 回调接口，收到相关通知。如果是在多人呼叫中，则所有现有呼叫成员都可通过此回调收到相关通知。

**示例代码**

- 拒绝呼叫邀请

```cs
string callid = "12352435";        // 呼叫 ID
ZIMCallRejectConfig config = new ZIMCallRejectConfig();
ZIM.GetInstance().CallReject(callid, config, (string callID, ZIMError errorInfo) => { });
```

- 呼叫成员收到有用户拒绝呼叫邀请的通知

```cs
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info,
                                    string callID) =>
    {
        //监听通知
    };
```

### 6 超时未响应呼叫邀请

客户端 B 收到客户端 A 的呼叫邀请后，客户端 B 长时间未响应时，流程如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/timeout.png" /></Frame>

1. 客户端 A（邀请者）通过 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) 回调接口，收到邀请超时、客户端未响应的通知。如果是在多人呼叫中，则所有现有呼叫成员都可通过此回调收到相关通知。
2. 客户端 B（被邀请者）通过 [OnCallInvitationTimeout](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-timeout) 回调接口，收到邀请超时、自己未响应的通知。


```cs
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info, string callID) =>
{
    //监听该通知
};

ZIM.GetInstance().onCallInvitationTimeout += (ZIM zim, ZIMCallInvitationTimeoutInfo info, string callID) => {
    //监听该通知
}
```

## 进阶模式

如果您想要实现更为丰富的用户状态场景，比如多人呼叫邀请业务场景，可以参考本节内容实现进阶模式的呼叫邀请。

发起进阶模式的呼叫邀请后，呼叫邀请的生命周期延长至用户主动调用 [CallEnd](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-end) 接口结束呼叫。在结束呼叫之前，用户还可以实现在呼叫中继续邀请他人以及退出呼叫的功能。

### 发起进阶模式的呼叫邀请

开发者在调用 [CallInvite](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-invite) 接口时主动设置模式为进阶模式，，才能发起进阶模式的呼叫邀请。

示例代码：

```cs
/** 向用户发送呼叫邀请 - 进阶模式 */
// 发送呼叫邀请
List<string> invitees = new List<string>();  // 被邀请人列表
invitees.Add("421234");       // 被邀请人id
ZIMCallInviteConfig config = new ZIMCallInviteConfig();
config.timeout = 200; // 邀请超时时间，单位为秒，范围 1-600
config.mode = ZIMCallInvitationMode.Advanced; //  mode 为呼叫邀请模式，ADVANCED 表示进阶模式。

// （可选）需要向离线用户发起呼叫邀请时填写
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "your title";
pushConfig.content = "your content";
pushConfig.payload = "your payload";
config.pushConfig = pushConfig;
ZIM.GetInstance().CallInvite(invitees, config, (string callID, ZIMCallInvitationSentInfo info, ZIMError errorInfo) => {
    // 此处的 callID 是用户发起呼叫后，SDK 内部生成的 ID，用于唯一标识一次呼叫邀请；之后发起人取消呼叫、被邀请人接受/拒绝呼叫，都会使用此 callID
});
```

<Note title="说明">

除了发起外，呼叫邀请的进阶模式和普通模式在取消、接受、拒绝和超时未响应上没有差别。
</Note>

### 呼叫中邀请

在创建进阶模式呼叫邀请后，状态为 `Accepted` 的用户可以调用 [CallingInvite](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#calling-invite) 接口向不在本呼叫中的用户发起邀请。但是，同一个呼叫中的参与用户不能超过 10 人（含邀请创建用户）。

**示例代码**

- 呼叫中邀请

```cs
// 呼叫中邀请
List<string> inviteesList = new List<string>();
inviteesList.Add("inviteesA");
inviteesList.Add("inviteesB");
ZIMCallingInviteConfig inviteConfig = new ZIMCallingInviteConfig();
// callID 通过创建进阶模式呼叫邀请的回调获取
ZIM.GetInstance().CallingInvite(invitees, callID, callingInviteConfig, (string callID, ZIMCallingInvitationSentInfo info, ZIMError errorInfo) =>
{
        if(errorInfo.code != ZIMErrorCode.Success){
            //邀请成功后的业务逻辑
        }
});
```

- 呼叫成员收到正在邀请其他用户的通知

```cs
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info,
                                string callID) =>
{
    // 所有用户状态为“呼叫中”和“已接受”的用户可在此处收到有用户被呼叫邀请的通知
};
```

### 退出呼叫

实现进阶模式呼叫邀请后，呼叫用户状态为 `Accepted` 的用户可调用 [CallQuit](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-quit) 接口退出呼叫。退出成功后，该用户的状态将流转为 `quit`，该用户和仍在呼叫中的其他用户都将会收到 [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) 的通知回调。

**示例代码**

- 退出呼叫

```cs
// 退出呼叫
ZIMCallQuitConfig config = new ZIMCallQuitConfig();
// callID 通过创建进阶模式呼叫邀请的回调获取
ZIM.GetInstance().CallQuit(callID, config, (string callID, ZIMCallQuitSentInfo info, ZIMError errorInfo) =>
{
        if(errorInfo.code == ZIMErrorCode.Success){
            // 退出成功后的业务逻辑
        }else {
            // 退出成功后的业务逻辑
        }
});
```

- 呼叫成员收到有用户退出呼叫的通知

```cs
ZIM.GetInstance().onCallUserStateChanged += (ZIM zim, ZIMCallUserStateChangeInfo info,
                                string callID) =>
{
    // // 退出用户本人和用户状态为 “inviting”, “received” 和 “accept” 的其他用户可在此处收到有用户退出呼叫的通知
};
```

### 结束呼叫

实现进阶模式呼叫邀请后，呼叫用户状态为 `Accepted` 的用户可调用 [CallEnd](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#call-end) 接口结束呼叫。此后，所有人的状态保持不变，该呼叫的状态（`callState`）变为 `end`，状态为 `Iniviting`、`Accepted` 和 `Received` 的用户将会收到 [OnCallInvitationEnded](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-ended) 的通知回调。

**示例代码**

- 结束呼叫

```cs
// 结束呼叫
ZIMCallEndConfig endConfig = new ZIMCallEndConfig();
// callID 通过创建进阶模式呼叫邀请的回调获取
ZIM.GetInstance().CallEnd(callID, endConfig, (string callID, ZIMCallEndedSentInfo info, ZIMError errorInfo) =>
{
    if (errorInfo.code == ZIMErrorCode.Success)
    {
        // 结束成功后的业务逻辑
    }
    else
    {
        // 根据官网错误码表处理错误
    }
});
```

- 呼叫成员收到呼叫结束的通知

```cs
ZIM.GetInstance().onCallInvitationEnded += (ZIM zim, ZIMCallInvitationEndedInfo info, string callID) =>
{

};
```
### 呼叫邀请离线推送

- （**可选**）如需实现呼叫邀请离线推送，请参考下表。
<table>
<tbody><tr>
<th>呼叫邀请离线推送发起端</th>
<th>呼叫邀请离线推送接收端</th>
<th>接收端配置参考文档</th>
</tr>
<tr>
<td>
- iOS
- Android
- macOS
- Windows
- Web
- 小程序
</td>
<td>
- iOS
- Android
</td>
<td>
- [实现离线推送 - iOS](/zim-ios/offline-push-notifications/implement-offline-push-notification)
- [实现离线推送 - Android](/zim-android/offline-push-notifications/implement-offline-push-notification)
</td>
</tr>
</tbody>
</table>

## 更多功能

### 查询呼叫邀请列表

通过调用 [QueryCallInvitationList](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#query-call-invitation-list) 接口，用户可以查询与自己相关的呼叫邀请列表，单次查询上限为 100 条，超出 100 条按照 100 条为准。

```cs
// 查询用户自己的呼叫邀请列表

ZIMCallInvitationQueryConfig queryCallListConfig = new ZIMCallInvitationQueryConfig();
queryCallListConfig.count = 20;
queryCallListConfig.nextFlag = 0;
ZIM.GetInstance().QueryCallInvitationList(callInvitationQueryConfig, (List<ZIMCallInfo> callList, long nextFlag, ZIMError errorInfo) =>
{
    if (errorInfo.code != ZIMErrorCode.Success)
    {
        // 根据官网错误码表处理错误
        return;
    }
    if (nextFlag != 0)
    {
        // 如果 callback 返回的 nextFlag 不为 0，代表没有完成查询所有的呼叫邀请信息。下次查询时可以传入 callback 返回的 nextFlag 继续查询剩余呼叫邀请信息
        queryCallListConfig.nextFlag = nextFlag;
    }
});
```
