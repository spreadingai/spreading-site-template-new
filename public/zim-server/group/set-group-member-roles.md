
# 设置群成员角色

- - -

## 描述

调用此接口，可以为群成员设置在群内的角色。

ZIM SDK 默认支持将用户设置为群主、管理员、普通成员。在群组中，群主拥有所有**客户端**权限，可以实现所有群组功能。管理员拥有大部分**客户端**权限。普通成员拥有的**客户端**权限最少，具体如下表所示：

<table>
<tbody><tr>
<th>客户端权限</th>
<th>群主（对应枚举值为 1）</th>
<th>管理员（对应枚举值为 2）</th>
<th>普通成员（对应枚举值为 3）</th>
</tr>
<tr>
<th>修改群头像、群名称、群公告</th>
<td rowspan="2">支持</td>
<td rowspan="2">支持</td>
<td rowspan="2">支持</td>
</tr>
<tr>
<th>修改群属性</th>
</tr>
<tr>
<th>修改群成员昵称</th>
<td rowspan="9">支持，可对所有群角色用户使用此功能</td>
<td rowspan="5">支持，可对所有普通成员使用此功能</td>
<td rowspan="2">支持，仅可对自己使用此功能</td>
</tr>
<tr>
<th>撤回群成员消息</th>
</tr>
<tr>
<th>踢人</th>
<td rowspan="7">不支持。</td>
</tr>
<tr>
<th>对单独群成员禁言</th>
</tr>
<tr>
<th>对特定群角色禁言</th>
</tr>
<tr>
<th>设置群成员角色</th>
<td rowspan="4">不支持</td>
</tr>
<tr>
<th>转让群主</th>
</tr>
<tr>
<th>解散群组</th>
</tr>
<tr>
<th>全员禁言</th>
</tr>
</tbody></table>

除此之外，还可以自定义群角色，但该角色拥有的客户端权限与**普通成员**一致。

设置成功后，群内成员通过以下 ZIM 回调收到通知：

| iOS | Android | macOS |
|-----|---------|--------|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) |

| Windows | Web | 小程序 |
|---------|-----|---------|
| [onGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-member-info-updated) |

| Flutter | Unity3D | uni-app |
|---------|---------|---------|
| [onGroupMemberInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupMemberInfoUpdated.html) | [OnGroupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-member-info-updated) |

| React Native | HarmonyOS | |
|---------|--------------|---|
| [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-member-info-updated) | [groupMemberInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-member-info-updated) | |

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=SetGroupMemberRole`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `FromUserId` 和 `ToUserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

<table>
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>操作用户的 ID，建议填群主的用户 ID。<Warning title="注意">此参数不能与 ToUserId 相同。</Warning></td>
</tr>
<tr>
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
<tr>
<td>ToUserId</td>
<td>String</td>
<td>是</td>
<td>待设置角色的目标用户&nbsp; ID。</td>
</tr>
<tr>
<td>Role</td>
<td>Number</td>
<td>是</td>
<td>角色：<ul><li>2: 管理员。</li><li>3: 普通成员。</li><li>其他值：可自定义角色，取值范围建议为 [100, 255]，权限与普通成员一致。</li></ul></td>
</tr>
</tbody></table>

## 请求示例

```json
https://zim-api.zego.im/?Action=SetGroupMemberRole
&<公共请求参数>
&FromUserId=zego
&GroupId=group
&ToUserId=zego2
&Role=3
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
<td>请求结果的说明信息。</td>
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
<td>服务端错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后重试</td>
</tr>
<tr>
<td>660600001</td>
<td>群不存在</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600009</td>
<td>查询群信息失败。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600024</td>
<td>ToUserId 不在群内。</td>
<td>请确认 ToUserId 是否在群内：
<ul><li>如果在，请联系 ZEGO 技术支持处理。 </li><li>如果不在，请将ToUserId 拉进群。</li></ul></td>
</tr>
<tr>
<td>660600029</td>
<td>Role 不能设置为 1。</td>
<td>请修改 Role。</td>
</tr>
<tr>
<td>660600030</td>
<td>FromUserId 不能和 ToUserId相等。</td>
<td>请修改 ToUserId。</td>
</tr>
</tbody></table>
