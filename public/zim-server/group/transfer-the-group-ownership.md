
# 转让群主

- - -

## 描述

通过该接口可以将群主身份转移给群内其他成员。

转让成功后，群内成员通过以下 ZIM SDK 的回调接口，收到相关通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|---------|---------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-info-updated) | [onGroupMemberInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberInfoUpdated.html) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-info-updated) |


| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|---------|
| [OnGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-info-updated) |


## 接口原型

- 请求方法：GET
- 请求地址： `https://zim-api.zego.im/?Action=TransferGroupOwner`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒，群级别限制。如需调整，请联系 ZEGO 技术支持。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| FromUserId | String | 是 | 操作者用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。 |
| GroupId | String | 是 | 群 ID。 |
| NewOwner | String | 是 | 新群主（接收转让的用户） ID，需为群内用户。 |

<Note title="说明">

FromUserId、GroupId、NewOwner 仅支持数字，英文字符和{" '!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=TransferGroupOwner
&FromUserId=zego_user&GroupId=groupid&NewOwner=newowner
&<公共请求参数>
```

## 响应参数

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr>
<td>Message</td>
<td>String</td>
<td>操作结果描述。</td>
</tr>
<tr>
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
<td>660300006</td>
<td>超出调用频率限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>请先注册该用户。</td>
</tr>
<tr>
<td>660600001</td>
<td>群不存在。</td>
<td>请检查 GroupID 是否正确。</td>
</tr>
<tr>
<td>660600024</td>
<td>接受转让的用户不在群内。</td>
<td>请参考 [添加群成员](/zim-server/group/add-group-members) 将该用户拉进群内。</td>
</tr>
</tbody></table>
