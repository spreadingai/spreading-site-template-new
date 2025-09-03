
# 设置群成员禁言

- - -

## 描述

通过该接口可以禁言或解禁群组内的特定成员。

接口调用成功后，群组内全体用户通过以下 ZIM SDK 的回调接口，得知哪些群成员无法在该群组发言或解除禁言状态：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|-------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|---------|---------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-info-updated) | [onGroupMemberInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberInfoUpdated.html) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-info-updated) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% | 
|---------|---------|-----------|
| [OnGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-info-updated) | 

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=MuteGroupMembers`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 操作用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。<Note title="说明">由于禁言操作会触发群 tips 消息，因此当 FromUserId 不是群组成员时，开发者需要隐藏该消息或实现其他处理，避免群内用户产生困惑。</Note> |
| GroupId | String | 是 | 群组 ID。 |
| UserIds[] | Array of String | 是 | 禁言或解禁群成员用户 ID 列表，单次请求最多传入 20 个用户 ID。 |
| Duration | Number | 否 | 禁言时长，不传默认为 0。<ul><li>-1：永久。</li><li>0：取消禁言。</li><li>大于 0：禁言时长，单位为秒。最大支持 30 天（2592000 秒）。</li></ul>若在某位群用户的禁言有效期内，再次调用本接口更新禁言时长，则以该请求时刻起重新计算禁言时间。 |

<Note title="说明">

FromUserId 和 UserIds 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=MuteGroupMembers
&<公共请求参数>
&FromUserId=user1   
&GroupId=group
&UserIds[]=user2
&UserIds[]=user3
&Duration=100000
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| ErrorUsers | Array of Object | 失败用户列表。<ul><li>Code 为 0：<ul><li>ErrorUsers 为空，全部指定用户禁言/解禁成功。</li><li>ErrorUsers 不为空，表示部分用户禁言/解禁失败，请参考 SubCode 处理。</li></ul></li><li>Code 不为 0：<ul><li>ErrorUsers 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorUsers 不为空，表示所有用户都禁言/解禁失败。</li></ul></li></ul> |
| └UserId | String | 失败用户 ID。 |
| └SubCode | Number | 失败的具体返回码。 |


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
<td>请检查&nbsp; FromUserId 或 或添加 FromUserId 为群成员。</td>
</tr>
<tr>
<td>660600032</td>
<td>FromUserId 没权限。</td>
<td>FromUserId 需为群主或管理员。</td>
</tr>
<tr>
<td>660600033</td>
<td>对全部指定用户的操作均失败。</td>
<td>请检查 UserIds。</td>
</tr>
</tbody></table>
