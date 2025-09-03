
# 拒绝呼叫邀请

- - -

## 描述

通过该接口可以为用户拒绝呼叫邀请。

用户拒绝邀请后，通过以下 ZIM SDK 的回调接口，其他处于呼叫中的用户会收到呼叫用户状态变更的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-call-user-state-changed-call-id) | [onCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-user-state-changed) | [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-call-user-state-changed-call-id) | [onCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-call-user-state-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|---------|--------------|
| [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#call-user-state-changed) | [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#call-user-state-changed) | [onCallUserStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onCallUserStateChanged.html) | [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#call-user-state-changed) |

| Unity3D-25% | uniapp \| uniapp x-25% | HarmonyOS-25% |
|---------|---------|------------|
| [OnCallUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-user-state-changed) | [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#call-user-state-changed) | [callUserStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#call-user-state-changed) |



## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=CallReject`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

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
<td>为此 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）的用户拒绝邀请。</td>
</tr>
<tr data-row-level="3">
<td>CallId</td>
<td>String</td>
<td>是</td>
<td>呼叫 ID。</td>
</tr>
<tr data-row-level="5">
<td>ExtendedData</td>
<td>String</td>
<td>否</td>
<td>扩展字段，长度上限为 2 KB。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=CallReject
&FromUserId=user0
&CallId=CallId
&ExtendedData=ExtendedData
&<公共请求参数>
```

## 响应参数

<table>
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
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782"
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
<td>660900004</td>
<td>获取呼叫信息异常</td>
<td>请检查呼叫是否存在，或者稍后再试。</td>
</tr>
<tr>
<td>660900005</td>
<td>呼叫已结束，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660900006</td>
<td>呼叫邀请已超时，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660900008</td>
<td>该呼叫没有邀请操作用户，无法对其进行操作。</td>
<td>无需处理。</td>
</tr>
</tbody></table>
