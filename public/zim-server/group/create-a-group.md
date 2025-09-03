
# 创建群组

- - -

## 描述

通过此接口创建群组。

创建群组成功，通过以下 ZIM SDK 的回调接口，群主会收到群组创建成功的通知，其他群成员会收到加入群组的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id) | [onGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id) | [onGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-state-changed) |

| Web-25% | 小程序-25% | Flutter-25% |React Native-25% | 
|-----|---------|---------|---------|  
| [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-state-changed) | [onGroupStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupStateChanged.html) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-state-changed)| 

|Unity3D-25% | uni-app \| uni-app x-25% |  HarmonyOS-25% | 
|---------|--------------|-----------|
|[OnGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-state-changed)  | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-state-changed) | 

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=CreateGroup`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">
以下 `GroupOwner` 和 `UserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或开发者已调用 [服务端 API](/zim-server/user/batch-register-users) 注册相关的 userID。
</Note>

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>GroupId</td>
<td>String</td>
<td>否</td>
<td>群 ID，群的唯一标识，不能以 # 开头。长度上限为 32 字节。为空则由 ZIM 服务端创建，并以 # 开头定义。</td>
</tr>
<tr data-row-level="3">
<td>GroupName</td>
<td>String</td>
<td>否</td>
<td>群名称，长度上限为 50 字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="4">
<td>GroupNotice</td>
<td>String</td>
<td>否</td>
<td>群公告，长度上限为 300 字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="5">
<td>GroupAvatar</td>
<td>String</td>
<td>否</td>
<td>群头像 URL，长度上限为 500 字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="6">
<td>GroupOwner</td>
<td>String</td>
<td>是</td>
<td>群主的用户 ID。长度上限为 32 字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="7">
<td>UserId</td>
<td>Array of String</td>
<td>否</td>
<td>需要入群用户的 ID。每个用户 ID 的长度上限为 32 字节。如需调整，请联系 ZEGO 技术支持。<br/>默认支持一次性最多添加 100 名用户。如需调整，请联系 ZEGO 技术支持。<Note title="说明"><ul><li>此数组无需包含群主。如果包含了群主，ZIM 服务端会自动去重。</li><li>此数组用户的入群时间等于群组创建时间，即 CreateGroupTime。</li></ul></Note></td>
</tr>
<tr data-row-level="8" data-row-child="true">
<td>Attributes</td>
<td>Array of Object</td>
<td>否</td>
<td>群属性。群属性上限为 10 个。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="8-1">
<td>└Key</td>
<td>String</td>
<td>是（仅当需要配置群属性时）</td>
<td>群属性的键，长度上限为 16 个字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="8-2">
<td>└Value</td>
<td>String</td>
<td>是（仅当需要配置群属性时）</td>
<td>群属性的值，长度上限为 1024 个字节。如需调整，请联系 ZEGO 技术支持。</td>
</tr>
<tr data-row-level="9">
<td>CreateGroupTime</td>
<td>Number</td>
<td>否</td>
<td>创建群的时间戳（毫秒级别）。
<ul><li>为 0 或者不填：默认群组为当前时间创建。</li>
<li>为其他值：不可大于当前时间戳。</li></ul></td>
</tr>
</tbody></table>

<Note title="说明">

GroupId 和 GroupOwner 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=CreateGroup
&<公共请求参数>
```

- 请求消息体：

```json
{
    "GroupId": "group",
    "GroupName": "group_name",
    "GroupNotice": "group_notice",
    "GroupAvatar": "https://www.baidu.com/",
    "GroupOwner": "owner",
    "UserId": [
        "user1",
        "user2"
    ],
    "Attributes": [
        {
            "Key": "key1",
            "Value": "value1"
        },
        {
            "Key": "key2",
            "Value": "value2"
        }
    ],
    "CreateGroupTime": 0
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
<td>GroupId</td>
<td>String</td>
<td>群 ID。</td>
</tr>
<tr data-row-level="6" data-row-child="true">
<td>Members</td>
<td>Array of Object</td>
<td>入群成功用户信息。</td>
</tr>
<tr data-row-level="6-1">
<td>└UserId</td>
<td>String</td>
<td>群用户 ID。</td>
</tr>
<tr data-row-level="6-2">
<td>└UserName</td>
<td>String</td>
<td>群用户名称。</td>
</tr>
<tr data-row-level="7" data-row-child="true">
<td>ErrorUsers</td>
<td>Array of Object</td>
<td>
入群失败用户信息。
<ul><li>
Code 为 0：
<ul><li>ErrorList 为空，全部指定用户入群成功。</li><li>ErrorList 不为空，表示部分指定用户入群失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部指定用户入群失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="7-1">
<td>└UserId</td>
<td>String</td>
<td>失败用户 ID。</td>
</tr>
<tr data-row-level="7-2">
<td>└SubCode</td>
<td>Number</td>
<td>用户入群失败的具体返回码。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "GroupId": "group",
    "Members": [
        {
            "UserId": "owner",
            "UserName": "owner"
        },
        {
            "UserId": "user1",
            "UserName": "user1"
        }
    ],
    "ErrorUsers": [
        {
            "UserId": "user2",
            "SubCode": 660000015
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
<td>660600010</td>
<td>超出调用频率限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660600011</td>
<td>群已经存在。</td>
<td>请使用其他 GroupId。</td>
</tr>
<tr>
<td>660600012</td>
<td>群数量超过限制。</td>
<td>请升级套餐。</td>
</tr>
<tr>
<td>660600013</td>
<td>群主不存在。</td>
<td>请检查群主的用户 ID 是否正确。</td>
</tr>
<tr>
<td>660600014</td>
<td>修改群主的群列表出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600015</td>
<td>ZIM 服务端执行 db 操作出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600016</td>
<td>群成员数量超过限制。</td>
<td>请减少群成员数量。</td>
</tr>
<tr>
<td>660600017</td>
<td>创建群时用户进群失败。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660600019</td>
<td>属性数量超过限制。</td>
<td>请减少群属性，默认最多 10 个。</td>
</tr>
<tr>
<td>660600020</td>
<td>属性的 Key 或 Value 长度错误。</td>
<td>请检查相关参数的长度。</td>
</tr>
</tbody></table>
