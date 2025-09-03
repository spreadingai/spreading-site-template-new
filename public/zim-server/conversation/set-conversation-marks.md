
# 设置会话标记

- - -

## 描述

调用此接口，可为多名用户对多个会话设置或取消标记。每个会话至多可存在 30 个标记。

客户端将通过 ZIM SDK 的回调接口，接收会话的标记变化。

| iOS-25% | Android-25% | macOS-25% | Windows-25% |
|-----|---------|-------|---------|
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-group-member-info-updated-operated-info-group-id) | [onConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cpp_windows~class~ZIMEventHandler#on-conversation-changed) |

| Web-25% | 小程序-25% | Flutter-25% | React Native-25% |
|-----|--------|---------|--------------|
| [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_web~interface~ZIMEventHandler#conversation-changed) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_wxxcx~interface~ZIMEventHandler#conversation-changed) | [onConversationChanged](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConversationChanged.html) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMEventHandler#conversation-changed) |

| Unity3D-25% | uni-app \| uni-app x-25% | HarmonyOS-25% |  
|---------|---------|---------|
| [OnConversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-conversation-changed) |[conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#group-application-updated) | [conversationChanged](https://doc-zh.zego.im/article/api?doc=zim_API~javascript_harmony~interface~ZIMEventHandler#conversation-changed) |  |  |

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=SetConvMark`
- 传输协议：HTTPS
- 调用频率限制：20次/秒。

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 操作用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。 |
| ConvMarkInfoList | Array of [StConvMarkInfoList](#stconvmarkinfolist-说明) | 是 | 会话标记的对象，每次最多 100 个，超过100或者为0报错 |


<Note title="说明">

FromUserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，''，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

### StConvMarkInfoList 说明

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| UserId | String | 是 | 为此 UserID 的用户设置或取消会话标记。<Note title="说明">当目标会话为群聊时，此用户需已在群聊中。</Note> |
| SetMarkC2c |  Object of [ConvMarkInfo](#convmarkinfo-说明)| 至少选择一个 | 单聊会话列表。key 为会话 ID，value 为 ConvMarkInfo 结构。列表最多可包含 100 个会话。 |
| SetMarkGroup | Object of [ConvMarkInfo](#convmarkinfo-说明) | 至少选择一个 | 群聊会话列表。key 为会话 ID，value 为 ConvMarkInfo 结构。列表最多可包含 100 个会话（群聊会话需已存在，且为未被删除）。 |
| Action | Bool | 是 | 标记操作：<ul><li>true：设置标记。</li><li>false：取消标记。</li></ul> |

<Note title="说明">

UserId 仅支持数字，英文字符和 {"'!'，'#'，'$'，'%'，'&'，'('，')'，'+'，'-'，':'，';'，'<'，'='，'.'，'>'，'?'，'@'，'['，']'，'^'，'_'，' '，'{'，'}'，'|'，'~'"}。
</Note>

### ConvMarkInfo 说明

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| MarkContent | Number | 是 | 会话标记。取值为 [1, 30] 的整数。 |

## 请求示例

- 请求地址 URL：

```json
https://zim-api.zego.im/?Action=SetConvMark
&<公共请求参数>
```

- 请求消息体：

```json
{
    "FromUserId": "user_test",
    "ConvMarkInfoList": [
        {
            "UserId": "userA",
            "SetMarkC2c": {
                "conv_c2c_1": {
                    "MarkContent": 2
                },
                "conv_c2c_2": {
                    "MarkContent": 2
                }
            },
            "SetMarkGroup": {
                "conv_group_1": {
                    "MarkContent": 2
                },
                "conv_group_2": {
                    "MarkContent": 2
                }
            },
            "Action": true
        },
        {
            "UserId": "userB",
            "SetMarkC2c": {
                "conv_c2c_1": {
                    "MarkContent": 2
                },
                "conv_c2c_2": {
                    "MarkContent": 2
                }
            },
            "SetMarkGroup": {
                "conv_group_1": {
                    "MarkContent": 2
                },
                "conv_group_2": {
                    "MarkContent": 2
                }
            },
            "Action": true
        }
    ]
}
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。<Note title="说明">当您发起请求设置或取消多个会话的标记时：<ul><li>只需成功对至少一个会话完成操作，Code 都会返回 0，表示成功。此时请参考 FailList 中的具体信息，了解失败操作详情。</li><li>如果所有会话的操作都失败，Code 会返回相关返回码，具体请参考 <a href="/zim-server/return-codes">全局返回码</a>。</li></ul></Note> |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| FailList | Array of [UserFailList](#userfaillist-说明) | 会话标记失败用户列表。<ul><li>Code 为 0：<ul><li>FailList 为空，为所有用户的会话标记操作都成功。</li><li>FailList 不为空，表示为部分用户的会话标记操作失败，请参考 FailList 中的 SubCode 和 SubMessage 处理。</li></ul></li><li>Code 不为 0：<ul><li>FailList 为空，表示参数错误、接口频率限制、系统错误。</li><li>FailList 不为空，表示为全部用户的会话标记操作都失败。</li></ul></li></ul> |

### UserFailList 说明

| 参数 | 类型 | 描述 |
|------|------|------|
| SubCode | Number | 用于标识为一名用户执行会话标记操作的结果。 |
| SubMessage | String | 描述为一名用户执行会话标记操作的结果。 |
| UserId | String | 会话标记操作目标用户的 ID。 |
| FailList | Array of [ConvMarkFailList](#convmarkfaillist-说明) | 标记操作目标会话失败列表。<ul><li>SubCode 为 0：<ul><li>FailList 为空，对目标用户的所有目标会话都操作成功。</li><li>FailList 不为空，表示对目标用户的部分目标会话操作失败，请参考 FailList 中的 Code 和 Message 处理。</li></ul></li><li>SubCode 不为 0：<ul><li>FailList 为空，表示参数错误、接口频率限制、系统错误。</li><li>FailList 不为空，表示对目标用户的所有目标会话都操作失败。</li></ul></li></ul> |

### ConvMarkFailList 说明

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 操作失败返回码。 |
| Message | String | 操作失败描述。 |
| ConvId | String | 会话 ID。<ul><li>单聊会话：会话 ID 为用户 ID。</li><li>群聊会话：会话 ID 为群组 ID。</li></ul> |
| ConvType | Number | 会话类型。<ul><li>0：单聊会话。</li><li>2：群聊会话。</li></ul> |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "FailList": [
        {
            "SubCode": 0,
            "SubMessage": "succ",
            "UserId": "UserA",
            "FailList": [
                {
                    "Code": 1,
                    "Message": "mark content is invalide",
                    "ConvId": "conv_id_1",
                    "ConvType": 0
                },
                {
                    "Code": 1,
                    "Message": "mark content is invalide",
                    "ConvId": "conv_id_2",
                    "ConvType": 0
                }
            ]
        },
        {
            "SubCode": 1,
            "SubMessage": "user not exist",
            "UserId": "UserB"
        }
    ]
}
```


## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 说明 | 处理建议 |
|--------|------|----------|
| 660000001 | 业务类通用错误。 | 请重试，或联系 ZEGO 技术支持。 |
| 660000002 | 输入参数错误。 | 请检查输入的参数。 |
| 660300005 | 调用接口的频率超出了 AppID 级别限制。 | 请稍后再试。 |
| 660800001 | 查询用户信息出错。 | 请联系 ZEGO 技术支持。 |
| 660800054 | 对所有的会话的标记操作都失败。 | 请联系 ZEGO 技术支持。 |
