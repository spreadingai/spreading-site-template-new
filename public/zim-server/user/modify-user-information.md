
# 修改用户资料

- - -

## 描述

通过该接口可以实现修改用户资料信息，包括用户昵称、头像等。

修改用户资料成功后，相关用户通过以下 ZIM SDK 的回调接口接收用户资料修改通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% | 
| --- | --- | --- | --- |
| [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-user-info-updated) | [onUserInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-user-info-updated) | [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-user-info-updated) | [onUserInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-user-info-updated) | 

| Web-25% | 小程序-25% | Flutter-25% | Unity3D-25% |
| --- | --- | --- | --- |
| [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#user-info-updated) | [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#user-info-updated) | [onUserInfoUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onUserInfoUpdated.html) | [OnUserInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-user-info-updated) | 

| uni-app \| uni-app x-25% | React Native-25% | HarmonyOS-25% |
| --- | --- |  --- | 
|[userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#user-info-updated) | [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#user-info-updated) | [userInfoUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#user-info-updated) |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=ModifyUserInfo`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<td>参数</td>
<td>类型</td>
<td>是否必选</td>
<td>描述</td>
</tr>
<tr data-row-level="2" data-row-child="true">
<td>UserInfo</td>
<td>Array of Object</td>
<td>是</td>
<td>资料待修改的用户列表。单次最多修改 100 个用户。</td>
</tr>
<tr data-row-level="2-1">
<td>└UserId</td>
<td>String</td>
<td>是</td>
<td>修改此用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册））的资料。</td>
</tr>
<tr data-row-level="2-2">
<td>└UserName</td>
<td>String</td>
<td>否</td>
<td>新用户名，长度不超过 256 字节。</td>
</tr>
<tr data-row-level="2-3">
<td>└UserAvatar</td>
<td>String</td>
<td>否</td>
<td>新头像，长度不超过 500 字节。</td>
</tr>
<tr data-row-level="2-4">
<td>└Extra</td>
<td>String</td>
<td>否</td>
<td>用户额外信息，长度默认 2 KB。如此上调，请联系 ZEGO 技术支持，最大可为 32 KB。</td>
</tr>
</tbody></table>

## 请求示例

- 请求url
```json
https://zim-api.zego.im/?Action=ModifyUserInfo&<公共请求参数>
```

- 请求消息体
```json
{
    "UserInfo": [
        {
            "UserId": "aaa",
            "UserName": "userNamea",
            "UserAvatar": "http",
            "Extra": "extra info"
        },
        {
            "UserId": "bbb",
            "UserName": "userNameb",
            "UserAvatar": "http"
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
<tr data-row-level="5" data-row-child="true">
<td>ErrorList</td>
<td>Array of Object</td>
<td>
失败信息列表。
<ul><li>
Code 为 0：
<ul><li>ErrorList 为空，全部用户资料修改成功。</li><li>ErrorList 不为空，表示部分用户资料修改失败，请参考 SubCode、SubMessage 处理。</li></ul>
</li>
<li>
Code 不为 0：
<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示全部用户资料都修改失败。</li></ul>
</li>
</ul></td>
</tr>
<tr data-row-level="5-1">
<td>└UserId</td>
<td>String</td>
<td>资料修改失败的用户 ID。</td>
</tr>
<tr data-row-level="5-2">
<td>└SubCode</td>
<td>Number</td>
<td>用户资料修改失败的具体返回码。</td>
</tr>
<tr data-row-level="5-3">
<td>└SubMessage</td>
<td>String</td>
<td>用户资料修改失败的原因说明。</td>
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
            "SubCode": 660000012,
            "SubMessage": "user length limit"
        },
        {
            "UserId": "bbb",
            "SubCode": 660000013,
            "SubMessage": "this is a demo"
        }
    ]
}
```

## 返回码

<table>

<tbody><tr>
<th>返回码</th>
<th>描述</th>
<th>处理建议</th>
</tr>
<tr>
<td>660000002</td>
<td>参数错误。</td>
<td>请参考 <a href="#请求参数">请求参数</a> 输入正确参数。</td>
</tr>
<tr>
<td>660300005</td>
<td>调用接口的频率超出了 AppID 级别限制。</td>
<td>请稍后再试。</td>
</tr>
<tr>
<td>660700012</td>
<td>用户未注册。</td>
<td>请先注册用户。</td>
</tr>
<tr>
<td>660700013</td>
<td>查询用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660700016</td>
<td>同步用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>660700017</td>
<td>更新用户信息出错。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
</tbody></table>
