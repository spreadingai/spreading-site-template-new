
# 批量添加好友

- - -

## 描述

调用此接口，可为用户直接批量添加至多 20 名好友，无需对方同意。如需上调（最多可为 50），请联系 ZEGO 技术支持。

每名用户最多可以拥有 3000 名好友。

为用户添加好友成功后，相关用户的客户端将通过以下 ZIM SDK 的回调接口接收好友列表更新的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% | 
| --- | --- | --- | --- |
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list) | [onFriendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-friend-list-changed) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list) | [onFriendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-friend-list-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% | 
| --- | --- | --- | --- | 
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#friend-list-changed) |  [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#friend-list-changed) | [onFriendListChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendListChanged.html) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#friend-list-changed)   |

|uni-app \| uni-app x-25% | HarmonyOS-25% |
|  --- | --- |
| [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#friend-list-changed) | [friendListChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#friend-list-changed) |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=AddFriends`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">

以下 `FromUserId` 和 `UserId` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册。
</Note>

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr data-row-level="3">
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>为此 UserId 添加好友。</td>
</tr>
<tr data-row-level="4" data-row-child="true">
<td>FriendInfos</td>
<td>Array of Object</td>
<td>是</td>
<td>好友结构体对象。默认上限为 20。</td>
</tr>
<tr data-row-level="4-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>目标用户 ID。长度上限为 32 字节。</td>
</tr>
<tr data-row-level="4-4">
<td>└Wording</td>
<td>String</td>
<td>否</td>
<td>FromUserId 对目标用户成为好友时的附言，长度上限为 256 字符。</td>
</tr>
<tr data-row-level="4-5">
<td>└FriendAlias</td>
<td>String</td>
<td>否</td>
<td>FromUserId 对目标用户的备注，长度上限为 256 字符。</td>
</tr>
<tr data-row-level="4-6">
<td>└FriendTime</td>
<td>Number</td>
<td>否</td>
<td>成为好友的时间。此参数可在数据迁移时用于导入好友列表。
<ul><li>为 0 时，ZIM 服务端以当前时间为准。</li><li>不为 0 时，此参数需为 MS 时间戳，且不晚于当前时间。</li></ul></td>
</tr>
<tr data-row-level="4-7" data-row-child="true">
<td>└Attributes</td>
<td>Array of Object</td>
<td>否</td>
<td>
好友属性，上限 5 个。
<Note title="说明">

<p>Key 的总长度与 Value 的总长度上限为 1024 字节。如需上调，请联系 ZEGO 技术支持。建议不要将上限设置过大。</p>
</Note>
</td>
</tr>
<tr data-row-level="4-7-1">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Key</td>
<td>String</td>
<td>是</td>
<td>好友属性的键。取值仅能为 k0、k1、k2、k3、k4。</td>
</tr>
<tr data-row-level="4-7-2">
<td>&nbsp;&nbsp;&nbsp;&nbsp;└Value</td>
<td>String</td>
<td>是</td>
<td>好友属性的值。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserId 仅支持数字，英文字符和 {"'!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>

## 请求示例

- 请求地址 URL：

    ```json
    https://zim-api.zego.im/?Action=AddFriends
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "FromUserId": "zego_user",
        "FriendInfos": [
            {
                "UserId": "usera1",
                "Wording": "Wording1",
                "FriendAlias": "alias1",
                "Attributes": [
                    {
                        "Key": "k1",
                        "Value": "Value"
                    },
                    {
                        "key": "k2",
                        "Value": "Value1"
                    }
                ]
            },
            {
                "UserId": "usera2",
                "Wording": "Wording2",
                "FriendAlias": "alias2",
                "Attributes": [
                    {
                        "key": "k3",
                        "Value": "Value"
                    },
                    {
                        "key": "k0",
                        "Value": "Value1"
                    }
                ]
            }
        ]
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
<td>返回码。
<Note title="说明">当您发起请求同时将多名指定用户添加为好友时：<ul><li>如果成功添加 1 名或更多好友，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果添加全部指定用户为好友失败，Code 会返回相关返回码，具体请参考 <a href="!Server_APIs/Return_Codes" target="_blank">全局返回码</a>。</li></ul></Note></td>
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
<tr data-row-level="5" data-row-child="true">
<td>ErrorList</td>
<td>Array of Object</td>
<td>
失败信息列表。
<ul>
<li>
Code 为 0：
<ul><li>ErrorList 为空，成功添加全部指定用户为好友。</li><li>ErrorList 不为空，表示添加部分指定用户失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示添加全部指定用户为好友失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-3">
<td>└UserID</td>
<td>String</td>
<td>添加该 UserID 为好友失败。</td>
</tr>
<tr data-row-level="5-5">
<td>└SubCode</td>
<td>Number</td>
<td>具体失败返回码。</td>
</tr>
</tbody></table>


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "ErrorList": [
        {
            "UserId": "usera2",
            "SubCode": 660800022
        }
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>描述</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>输入参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660500002</td>
<td>`FromUserId` 未注册。</td>
<td>请先注册 `FromUserId`。</td>
</tr>
<tr>
<td>660700015</td>
<td><ul><li>如果为 code：`FromUserId` 未注册。</li><li>如果为 subCode：目标用户未注册。</li></ul></td>
<td><ul><li>如果为 code：请先注册 `FromUserId`。</li><li>如果为 subCode：请先注册目标用户。</li></ul></td>
</tr>
<tr>
<td>660800019</td>
<td>单次批量操作超过上限。</td>
<td>减少单次批量操作数量。</td>
</tr>
<tr>
<td>660800020</td>
<td>不能将 `FromUserId` 添加为好友，即 `FriendInfos` 中的 `UserId` 不能与 `FromUserId` 相同。</td>
<td>请修改 `FriendInfos` 中与 `FromUserId` 相同的 `UserId`。</td>
</tr>
<tr>
<td>660800021</td>
<td>`FriendAlias` 或 `Wording` 超过长度上限。</td>
<td>请缩减相关字段的内容长度。</td>
</tr>
<tr>
<td>660800022</td>
<td>参数中的用户 ID 相关参数重复。</td>
<td>请删除或修改重复参数。</td>
</tr>
<tr>
<td>660800023</td>
<td>`Attributes` 的 `Key` 取值不属于 k0 ~ k4。</td>
<td>请修改 `Key` 的值。&nbsp;</td>
</tr>
<tr>
<td>660800024</td>
<td>`Attributes` 的所有 `Key`、`Value` 总长度超过长度上限。</td>
<td>请缩减相关字段的内容长度。</td>
</tr>
<tr>
<td>660800025</td>
<td>所有好友均未注册过，接口调用失败。</td>
<td>请先注册目标用户。</td>
</tr>
<tr>
<td>660800026</td>
<td>好友属性参数错误。</td>
<td>请检查输入的参数。</td>
</tr>
<tr>
<td>660800027</td>
<td>目标用户已经是好友，无需重复添加。</td>
<td>无需操作。</td>
</tr>
<tr>
<td>660800028</td>
<td>`FromUserId` 的好友数量到达上限。</td>
<td>无法添加更多好友。</td>
</tr>
<tr>
<td>660800032</td>
<td>`Attributes` 有重复的 `Key`。</td>
<td>请修改 `Key`。</td>
</tr>
<tr>
<td>660800046</td>
<td>传递的时间戳大于当前时间。</td>
<td>可以不填，默认是当前时间。</td>
</tr>
</tbody></table>
