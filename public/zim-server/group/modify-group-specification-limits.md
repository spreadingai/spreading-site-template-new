# 修改群规格限制

- - -

## 描述

通过此接口修改群组的以下规格限制：
- 进群模式；
- 邀请模式；
- 受邀请模式；
- 群组成员人数上限（最高不超过套餐包的限制，详情请参考 [计费说明 - 版本差异](/zim-android/introduction/pricing#版本差异)）。

修改成功后，群成员可通过以下 ZIM SDK 的回调接口接收群组规格限制修改的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupVerifyInfoUpdated](/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-verify-info-updated-operated-info-group-id) | [onGroupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-verify-info-updated) | [groupVerifyInfoUpdated](/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-verify-info-updated-operated-info-group-id) | [onGroupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-verify-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|---------|---------|
| [groupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-verify-info-updated) | [groupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-verify-info-updated) | [onGroupVerifyInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupVerifyInfoUpdated.html) |[groupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-verify-info-updated) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% | 
|---------|--------------|-----------|
| [OnGroupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-verify-info-updated) |[groupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-verify-info-updated) |[groupVerifyInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-verify-info-updated) | 

## 接口原型

- 请求方法：GET
- 请求地址：`https://zim-api.zego.im/?Action=ModifyGroupLimit`
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
<td>修改操作者的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</td>
</tr>
<tr data-row-level="3">
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>目标群组的 ID。</td>
</tr>
<tr data-row-level="4">
<td>JoinMode</td>
<td>Number</td>
<td>否</td>
<td>加入群组的模式：
<ul><li>0：（默认值）无需验证，任何人可以直接加入群。</li><li>1：用户需发起入群申请，群主或群管理员批准后，该用户才能加入群。</li><li>2：外部用户需经群内成员邀请方可入群。</li></ul></td>
</tr>
<tr data-row-level="5">
<td>InviteMode</td>
<td>Number</td>
<td>否</td>
<td>邀请模式：
<ul><li>0：（默认值）所有群成员都能邀请外部用户入群。</li><li>1：只有群主或者群管理员可以发起邀请。</li></ul></td>
</tr>
<tr data-row-level="6">
<td>BeInvitedMode</td>
<td>Number</td>
<td>否</td>
<td>受邀请模式：
<ul><li>0：（默认值）可以直接邀请外部用户入群，无需对方同意。</li><li>1：邀请某人加入群组后，需要对方同意。</li></ul></td>
</tr>
<tr data-row-level="7">
<td>MemberCountLimit</td>
<td>Number</td>
<td>否</td>
<td>群组成员人数上限，默认值为 0。</td>
</tr>
</tbody></table>

<Note title="说明">

- FromUserID 和 GroupId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
- 如果无需修改 `JoinMode`、`InviteMode` 或 `BeInvitedMode`，请不要请求 URL 中携带该参数。如果携带参数但没赋值，该参数的值可能会被修改为 0。
</Note>


## 请求示例

```json
https://zim-api.zego.im/?Action=ModifyGroupLimit
&<公共请求参数>
&FromUserId=zego
&GroupId=group
&JoinMode=1
&MemberCountLimit=100
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
<td>服务端出错。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660000002</td>
<td>输入的参数缺失或不合法。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>请先注册操作者用户。</td>
</tr>
<tr>
<td>660600001</td>
<td>群不存在</td>
<td>请确认输入的 GroupId 是否正确。</td>
</tr>
<tr>
<td>660600009</td>
<td>获取群相关信息失败。</td>
<td>请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。</td>
</tr>
</tbody></table>