# 修改群组资料

- - -

## 描述

通过该接口可以实现修改群组资料信息，包括群组头像、群组名称、群组公告等。

修改群组资料成功后，群成员可通过以下 ZIM SDK 的回调接口接收群组资料修改通知：

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|--------|---------|
| [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-name-updated-operated-info-group-id) | [onGroupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-group-name-updated) | [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-name-updated-operated-info-group-id) | [onGroupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-group-name-updated) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|---------|-----|--------|---------|
| [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#group-name-updated) | [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#group-name-updated) | [onGroupNameUpdated](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onGroupNameUpdated.html) | [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#group-name-updated) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |
|---------|---------|-----------------|
| [OnGroupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-group-name-updated) | [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-name-updated) | [groupNameUpdated](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#group-name-updated) |

## 接口原型

- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=UpdateGroupData`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](https://doc-zh.zego.im/article/12250#2)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 修改群资料的操作者 ID（已注册）。 |
| GroupId | string | 是 | 待修改资料的群组 ID。 |
| GroupAvatar | string | 群组头像、群组名称和群组公告至少有一个 | 群组头像地址，长度限制 500 字符。 |
| GroupName | string | 同上 | 群组名称，长度限制 50 字符。 |
| GroupNotice | string | 同上 | 群组公告，长度限制 300 字符。 |

<Note title="说明">
由于 `GroupAvatar`、`GroupName` 和 `GroupNotice` 支持设置为空字符。因此，如果无需修改上述某个字段，JSON 字符串中不能包含该字段名称（不能传空），否则会被认为是空字符串，原有内容会被删除。
</Note>

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=UpdateGroupData
&<Common request parameters>
```

- 请求地址 URL：

```json
{
    "FromUserId": "user",
    "GroupId": "111",
    "GroupName": "newName",
    "GroupAvatar": "https://xxx.com/xxx.png",
    "GroupNotice": "newNotice",
}
```

## 响应参数
| 参数 | 类型 | 描述 |
|------|------|------|
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

| 返回码 | 描述 | 处理建议 |
|------|------|------|
| 660000002 | 参数错误。 | 请参考 [请求参数](#请求参数) 输入正确参数。 |
| 660300006 | 调用接口的频率超出了群/房间限制。 | 请稍后再试。 |
| 660500002 | `FromUserId` 未注册。 | 请先注册 `FromUserId`。 |
| 660600001 | 群组不存在。 | 请确认输入的 GroupId 是否正确，或创建群组。 |
| 660600009 | 获取群组相关信息失败。 | 请先确认 GroupID 是否正确。如果正确，请联系 ZEGO 技术支持。 |
| 660600028 | 修改群组资料失败。 | 请联系 ZEGO 技术支持。 |
