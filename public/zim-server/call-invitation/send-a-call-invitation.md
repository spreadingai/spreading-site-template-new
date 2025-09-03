
# 发起呼叫邀请

- - -

## 描述

通过该接口可以创建**普通模式**的呼叫邀请。

呼叫邀请创建成功后，通过以下 ZIM SDK 的回调接口，发起邀请的用户（主叫）会收到邀请已创建的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-call-invitation-created-call-id) | [onCallInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-created) | [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-call-invitation-created-call-id) | [onCallInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-call-invitation-created) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|--------|---------|--------------|
| [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#call-invitation-created) | [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#call-invitation-created) | [onCallInvitationCreated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationCreated.html) | [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#call-invitation-created) |

| Unity3D-25% | uniapp \| uniapp x-25% | HarmonyOS-25% |
|--------|--|--|
| [onCallInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-created) |[callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#call-invitation-created) | [callInvitationCreated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#call-invitation-created) | 

被邀请的用户（被叫）会收到被邀请的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-call-invitation-received-call-id) | [onCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-received) | [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-call-invitation-received-call-id) | [onCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-call-invitation-received) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|--------|---------|--------------|
| [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#call-invitation-received) | [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#call-invitation-received) | [onCallInvitationReceived](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallInvitationReceived.html) | [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#call-invitation-received) |

| Unity3D-25% | uniapp \| uniapp x-25% | HarmonyOS-25% |
|---------|---------|------------|
| [OnCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-received) | [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#call-invitation-received) | [callInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#call-invitation-received) |  |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=CallInvite`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

<table>
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>主叫用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</td>
</tr>
<tr data-row-level="3">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>被叫用户列表，上限为 9 名用户。如需上调，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="4">
<td>Timeout</td>
<td>Number</td>
<td>否</td>
<td>呼叫超时时间，单位为秒，取值范围为 (0, 600]。传 0 或为空取默认值 90。</td>
</tr>
<tr data-row-level="5">
<td>ExtendedData</td>
<td>String</td>
<td>否</td>
<td>扩展字段，长度上限为 2 KB。</td>
</tr>
<tr data-row-level="6">
<td>OfflinePush</td>
<td>Object</td>
<td>是</td>
<td>离线推送配置，详情请参考 <a href="https://doc-zh.zego.im/article/17609#offlinePush">MessageBody 说明 - OfflinePush 说明。</a></td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserIds 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=CallInvite
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "user0",
    "UserIds": [
        "uid1",
        "uid2"
    ],
    "Timeout": 90,
    "ExtendedData": "ExtendedData",
    "OfflinePush": {
        "Enable": 1,
        "Title": "title",
        "Content": "content",
        "Payload": "payload"
    }
}
```

## 响应参数

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>操作结果描述。</td>
</tr>
<tr data-row-level="4">
<td>RequestId</td>
<td>String</td>
<td>请求 ID。</td>
</tr>
<tr data-row-level="5">
<td>CallId</td>
<td>String</td>
<td>呼叫 ID。</td>
</tr>
<tr data-row-level="6">
<td>CreateTime</td>
<td>Number</td>
<td>呼叫邀请创建时间戳。</td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>ErrorUsers</td>
<td>Array of Object</td>
<td>
邀请失败用户信息。
<ul>
<li>
Code 为 0：
<ul><li>ErrorUsers 为空，向全部指定用户发起邀请成功。</li><li>ErrorUsers 不为空，表示向部分指定用户发起邀请失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul>
<li>ErrorUsers 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorUsers 不为空，表示向全部指定用户发起邀请失败。</li>
</ul>
</li>
</ul>
</td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>失败用户 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└SubCode</td>
<td>Number</td>
<td>失败的具体返回码。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "CreateTime": "1713249504000",
    "CallId": "12261423186766631832",
    "ErrorUsers":[
        {
            "UserId": "uid2",
            "SubCode": 660500002
        }
    ] 
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请检查请求参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>请先让操作者用户注册 ZIM 服务。</td>
</tr>
<tr>
<td>660900003</td>
<td>所有被叫用户需为已注册。</td>
<td>请检查被叫用户的注册状态或稍后再试。</td>
</tr>
<tr>
<td>660900007</td>
<td>被叫用户列表长度超过限制。</td>
<td>请缩短被叫用户列表长度，或联系 ZEGO 技术支持上调上限。</td>
</tr>
</tbody></table>
