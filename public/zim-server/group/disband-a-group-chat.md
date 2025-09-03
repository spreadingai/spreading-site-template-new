
# 解散群组

- - -

##  描述

通过此接口即可解散群组。

解散群组成功后，全体群成员都会收到以下 ZIM 回调通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id) | [onGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-state-changed-operated-info-group-id) | [onGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-state-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% | 
|-----|---------|---------|---------|
| [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-state-changed) | [onGroupStateChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupStateChanged.html) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-state-changed) |

|Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|--------------|-----------|
| [OnGroupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-state-changed) | [groupStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-state-changed) | 

## 接口原型

- 请求方法：GET
- 请求地址： `https://zim-api.zego.im/?Action=DismissGroup`
- 传输协议：HTTPS
- 调用频率限制：1 次/秒，群级别限制。如需调整，请联系 ZEGO 技术支持。

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
<td>操作者用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。可以是任何用户，无需在群内，也无需为群主。</td>
</tr>
<tr data-row-level="3">
<td>GroupId</td>
<td>String</td>
<td>是</td>
<td>群组 ID。</td>
</tr>
</tbody></table>

<Note title="说明">

FromUserId 和 GroupID 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，'{'，'}'，'|'，'~'"}。
</Note>

## 请求示例

```json
https://zim-api.zego.im/?Action=DismissGroup
&FromUserId=zego_user&GroupId=groupid
&<公共请求参数>
```

## 响应参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |

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
<td>输入参数错误。</td>
<td>请检查输入参数。</td>
</tr>
<tr>
<td>660300006</td>
<td>频率限制</td>
<td>请稍后再试，或了解相关频率限制。</td>
</tr>
<tr>
<td>660500002</td>
<td>操作者用户未注册。</td>
<td>请让操作者先注册 ZIM 服务。</td>
</tr>
<tr>
<td>660600001</td>
<td>群组不存在。</td>
<td>请确认输入的 GroupID 是否正确。</td>
</tr>
</tbody></table>
