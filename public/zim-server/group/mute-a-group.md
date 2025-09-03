
# 设置群禁言

- - -

## 描述

通过该接口可以禁言或解禁群组全员或某些群角色。

接口调用成功后，群组内全体用户通过以下 ZIM SDK 的回调接口，得知哪些角色无法在该群组发言或可恢复发言：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|-------|
| [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-muted-info-updated-operated-info-group-id) | [onGroupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-muted-info-updated) | [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-muted-info-updated-operated-info-group-id) | [onGroupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-muted-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|-------|-------|
| [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-muted-info-updated) | [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-muted-info-updated) | [onGroupMutedInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMutedInfoUpdated.html) | [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-muted-info-updated) |

| uni-app \| uni-app x-25% | HarmonyOS-25% | 
|---------|-----------|
| [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-muted-info-updated) | [groupMutedInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-muted-info-updated) | 

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=MuteGroup`
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
<td>操作用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。<Note title="说明">由于禁言操作会触发群 tips 消息，因此当 FromUserId 不是群组成员时，开发者需要隐藏该消息或实现其他处理，避免群内用户产生困惑。</Note></td>
</tr>
<tr data-row-level="3">
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr data-row-level="4">
<td>IsAllMuted</td>
<td>Bool</td>
<td>否</td>
<td>是否全员禁言。不传则默认 false。</td>
</tr>
<tr data-row-level="5">
<td>MuteRoleList[]</td>
<td>Array of Number</td>
<td>否（仅当 IsAllMuted 为 false 或不传时有意义）</td>
<td>
禁言角色列表，单次请求最多禁言 20 个群角色。枚举如下：
<ul>
<li>1: 群主。</li>
<li>2: 管理员。</li>
<li>3: 群成员。</li>
<li>其他: 开发者自定义的群角色，建议大于 100。</li>
</ul></td>
</tr>
<tr data-row-level="6">
<td>Duration</td>
<td>Number</td>
<td>否</td>
<td>禁言时长，不传默认为 0。
<ul><li>-1：永久。</li><li>0：取消群组级别的所有禁言。</li><li>大于 0：禁言时长，单位为秒。最大支持 30 天（2592000 秒）。</li></ul>禁言有效期内，若再次设置禁言时长，以最近一次请求设置的时长延长禁言状态。</td>
</tr>
</tbody></table>

<Note title="说明">
- IsAllMuted、MuteRoleList、Duration 都不传，则解除群组内所有用户的禁言状态。<br/>
- 如果 Duration 非 0，IsAllMuted 传了 false，则传入的 MuteRoleList 会覆盖之前设置的禁言角色列表。
- FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
- 若 FromUserId 为管理员，则 MuteRoleList[] 不能包含 1（群主）。
</Note>

## 请求示例

```json
https://zim-api.zego.im/?Action=MuteGroup
&<公共请求参数>
&FromUserId=user1
&GroupId=group
&IsAllForbid=false
&MuteRoleList[]=2
&MuteRoleList[]=3
&Duration=100000
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
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
<td>660600001</td>
<td>群组不存在。</td>
<td>请确认传入的 GroupID 是否正确。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600024</td>
<td>FromUserId 不在群内。</td>
<td>请检查 FromUserId 或添加 FromUserId 为群成员</td>
</tr>
<tr>
<td>660600032</td>
<td>FromUserId 没权限。</td>
<td>FromUserId 需为群主或管理员。</td>
</tr>
</tbody></table>
