
# 批量拉黑用户

- - -

## 描述

调用此接口，可为用户批量拉黑至多 20 名用户，不再接收相关用户消息。如需上调，请联系 ZEGO 技术支持。

每名用户默认最多可拉黑 1000 名用户，如需上调，请联系 ZEGO 技术支持。

为用户拉黑用户成功后，此用户客户端将通过以下 ZIM SDK 的回调接口接收黑名单列表更新的通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-blacklist-changed-user-list) | [onBlacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-blacklist-changed) | [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-blacklist-changed-user-list) | [onBlacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-blacklist-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|---------|---------|
| [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#blacklist-changed) | [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#blacklist-changed) | [onBlacklistChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onBlacklistChanged.html) | [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#blacklist-changed) |

| uni-app \| uni-app x-25% | HarmonyOS-25% |      
|---------|---------|
| [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#blacklist-changed) | [blacklistChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#blacklist-changed) |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=AddUsersToBlacklist`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">

以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册。
</Note>

<table>
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
<td>为此 UserId（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）拉黑用户。</td>
</tr>
<tr data-row-level="4">
<td>UserIds</td>
<td>Array of String</td>
<td>是</td>
<td>待拉黑的用户列表。字符串默认上限为 20。每个字符串长度上限为 32 字节。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 UserId 仅支持数字，英文字符和{" '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'"}。
</Note>


## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=AddUsersToBlacklist
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "zego_user",
    "UserIds": [
        "user1",
        "user2",
        "user3",
        "user4"
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
<Note title="说明">当您发起请求同时拉黑多名用户时：<ul><li>如果成功拉黑 1 名或更多用户，Code 都会返回 0。此时请参考 ErrList 中的具体信息，确认操作结果。</li><li>如果全部指定用户拉黑失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<td>ErrList</td>
<td>Array of Object</td>
<td>
失败信息列表。
<ul>
<li>
Code 为 0：
<ul><li>ErrList 为空，表示成功拉黑全部指定用户。</li><li>ErrList 不为空，表示部分指定用户拉黑失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrList 不为空，表示拉黑全部指定用户失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-3">
<td>└UserID</td>
<td>String</td>
<td>拉黑此 UserID 失败。</td>
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
    "ErrList": [
        {
            "UserId": "user1",
            "SubCode": 660000002
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
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>6607000015</td>
<td>接口目标用户未注册。</td>
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660800001</td>
<td>`FromUserId` 未注册。</td>
<td>
请确认该用户是否已注册：
- 确认已注册，请联系 ZEGO 技术支持排查。
- 确认未注册，请注册此用户。
</td>
</tr>
<tr>
<td>660800037</td>
<td>用户已被拉黑，无需重复操作。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800038</td>
<td>不能拉黑 `FromUserId` 或将 `FromUserId` 移除黑名单。</td>
<td>请修改 `UserIds`。</td>
</tr>
<tr>
<td>660800039</td>
<td>传入的用户列表超过限制。</td>
<td>请缩短传入的用户列表。</td>
</tr>
<tr>
<td>660800040</td>
<td>`FromUserId` 的黑名单已达上限，无法拉黑更多用户。</td>
<td>无需处理。</td>
</tr>
<tr>
<td>660800041</td>
<td>拉黑全部指定用户失败。</td>
<td>请参考响应参数 `ErrList` 的 `SubCode` 处理.</td>
</tr>
</tbody></table>
