
# 更新好友备注

- - -

## 描述

通过该接口，可为一名用户批量修改至多 20 名好友的备注。如需上调（最多可为 50），请联系 ZEGO 技术支持。

修改好友备注成功后，用户通过以下 ZIM SDK 的回调接口接收相关修改通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-info-updated-friend-info-list) | [onFriendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-friend-info-updated) | [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-info-updated-friend-info-list) | [onFriendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-friend-info-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|---------|---------|---------|
| [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#friend-info-updated) | [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#friend-info-updated) | [onFriendInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendInfoUpdated.html) | [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#friend-info-updated) |

| uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|
| [friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#friend-info-updated) |[friendInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#friend-info-updated)  |



## 接口原型

- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=UpdateFriendsAlias`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<Note title="说明">

以下 `FromUserId` 和 `UserIds` 对应的用户已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册。
</Note>

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<td>参数</td>
<td>类型</td>
<td>是否必选</td>
<td>描述</td>
</tr>
<tr data-row-level="2">
<td>FromUserId</td>
<td>String</td>
<td>是</td>
<td>更新此用户对指定好友的备注。</td>
</tr>
<tr data-row-level="3" data-row-child="true">
<td>UserIds</td>
<td>Array of Object</td>
<td>是</td>
<td>备注待更新的用户列表。单次最多修改 20 个用户。</td>
</tr>
<tr data-row-level="3-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>用户 ID。长度上限为 32 字节。</td>
</tr>
<tr data-row-level="3-2">
<td>└FriendAlias</td>
<td>String</td>
<td>否</td>
<td>新的好友备注，长度不超过 256 字符。</td>
</tr>
</tbody></table>

## 请求示例

- 请求url
  ```json
  https://zim-api.zego.im/?Action=UpdateFriendsAlias
  &<公共请求参数>
  ```

- 请求消息体
  ```json
  {
      "FromUserId": "zego_user",
      "UserIds": [
          {
              "UserId": "user1",
              "FriendAlias": "FriendAlias1"
          },
          {
              "UserId": "user2",
              "FriendAlias": "FriendAlias2"
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
<td>返回码。<Note title="说明">当您发起请求同时更新多个好友备注：<ul><li>如果成功更新 1 个或更多好友备注，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果全部好友备注更新失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note></td>
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
<tr data-row-level="5" data-row-child="true">
<td>ErrorList</td>
<td>Array of Object</td>
<td>
失败信息列表。
<ul><li>
Code 为 0：
<ul><li>ErrorList 为空，全部好友备注修改成功。</li><li>ErrorList 不为空，表示部分好友备注修改失败，请参考 SubCode 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部好友备注都修改失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>好友备注修改失败的用户 ID。</td>
</tr>
<tr data-row-level="5-2">
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
            "UserId": "aaa",
            "SubCode": 660000012
        },
        {
            "UserId": "bbb",
            "SubCode": 660000013
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
<td>660000001</td>
<td>业务类通用错误。</td>
<td>请重试，或联系 ZEGO 技术支持。</td>
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
<td>660800019</td>
<td>单次批量操作超过上限。</td>
<td>减少单次批量操作数量。</td>
</tr>
<tr>
<td>660800021</td>
<td>`FriendAlias` 超过长度上限。</td>
<td>请缩减相关字段的内容长度。</td>
</tr>
<tr>
<td>660800034</td>
<td>此用户不是`FromUserId` 的好友。</td>
<td>请先添加此用户为好友。</td>
</tr>
</tbody></table>
