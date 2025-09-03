<Accordion title="展开查看详细内容" defaultOpen="false">
#### 基础参数

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| md5             | String | 文件的 MD5 值。   |
| file_name       | String | 文件名称。  |
| file_size       | String | 文件大小，单位为字节（B）。  |
| download_url    | String | 下载地址。  |
| media_duration  | String | 音视频时长，单位为秒（s）。 |

#### 图片消息扩展参数

如果是图片消息，在基础参数上额外以下参数。

| 参数                      | 类型   | 描述                         |
|-------------------------|------|----------------------------|
| origin_image_width      | Int  | 原图的宽度，单位为像素（px）。   |
| origin_image_height     | Int  | 原图的高度，单位为像素（px）。   |
| large_image_download_url| String | 大图下载地址。                  |
| large_image_width       | Int  | 大图的宽度，单位为像素（px）。   |
| large_image_height      | Int  | 大图的高度，单位为像素（px）。   |
| thumbnail_download_url  | String | 缩略图下载地址。                |
| thumbnail_width         | Int  | 缩略图的宽度，单位为像素（px）。 |
| thumbnail_height        | Int  | 缩略图的高度，单位为像素（px）。 |

#### 视频消息扩展参数

如果是视频消息，在基础参数上额外以下参数。

| 参数                          | 类型   | 描述                           |
|-----------------------------|------|------------------------------|
| video_first_frame_download_url | String | 视频首帧图的下载地址。              |
| video_first_frame_width     | Int  | 视频首帧图的宽度，单位为像素（px）。   |
| video_first_frame_height    | Int  | 视频首帧图的高度，单位为像素（px）。   |
</Accordion>
<Accordion title="展开查看详细内容" defaultOpen="false">

| 参数              | 类型     | 描述    |
|-----------------|--------|-------|
| multi_msg       | Array of Object | 组合消息 Item 数组。  |
|  └msg_type       | Int | Item 类型：<ul><li>1：文本。</li><li>11：图片。</li><li>12：文档。</li><li>13：音频。</li><li>14：视频。</li><li>200：自定义消息类型。</li></ul>  |
|  └sub_msg_type | Int | 仅当 msg_type 为 200 时，返回此参数。  |
|  └callback_content | Object | Item 内容。<ul><li>仅当 msg_type 为 1 或 200 时，可直接在此参数阅读消息内容。</li><li>当 Item 为 11、12、13 或 14，请参考本文 [多媒体消息结构](#多媒体消息) 了解消息的的各个字段数据。</li></ul>  |
</Accordion>
# 查询消息

--- 

## 描述

本接口支持查询单个指定会话（群聊、单聊）中的多条消息。

## 接口原型

- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=QueryMessagesByMsgSeq`
- 传输协议：HTTPS
- 调用频率限制：20 条消息/秒

    <Warning title="注意">
    本接口的频率限制是 20 条消息/秒，而非 20 次/秒。
    </Warning>

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数         | 类型              | 是否必选 | 描述                                                                 |
|--------------|-------------------|----------|----------------------------------------------------------------------|
| FromUserId   | String            | 是        | 用户的 UserID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。<ul><li>查询单聊会话消息时，此处填入任一参与用户的 userID。</li><li>查询群聊会话消息时，此处可填入任意已注册用户的 userID。</li></ul> |
| ConvId       | String            | 是        | 会话 ID。<ul><li>查询单聊会话消息时，此处填入另一参与用户的 userID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。</li><li>查询群聊会话消息时，此处填入目标群组的 groupID。</li></ul> |
| ConvType     | Number            | 是        | 会话类型：<ul><li>0：单聊。</li><li>2：群聊。</li></ul>                                  |
| MsgSeqList   | Array of Number   | 是        | 待查询消息的 seq 列表。列表长度上限为 20。<Note title="说明">如需上调，请联系 ZEGO 技术支持。</Note>seq 获取方式：<ul><li>若需要查询由**客户端**发出的消息，通过 [消息发送后回调](/zim-server/callbacks/message-sent) 获取 MsgSeq。</li><li>若需要查询由 服务端 API [SendPeerMessage](/zim-server/messaging/send-a-one-to-one-message) 发出的**单聊**消息，通过接口响应数据获取 MsgSeq。</li><li>若需要查询由 服务端 API [SendGroupMessage](/zim-server/messaging/send-group-messages) 发出的**群聊**消息，通过接口响应数据获取 MsgSeq。</li></ul>            |

## 请求示例

- 请求地址 URL：
    ```json
    https://zim-api.zego.im/?Action=QueryMessagesByMsgSeq
    &<公共请求参数>
    ```

- 请求消息体：
    ```json
    {
        "FromUserId": "user0",
        "ConvId": "user1",
        "ConvType": 0,
        "MsgSeqList": [
            1,
            2,
            3
        ]
    }
    ```

## 响应参数

| 参数        | 类型            | 描述                 |
|-------------|-----------------|----------------------|
| Code        | Number          | 返回码。             |
| Message     | String          | 操作结果描述。       |
| RequestId   | String          | 请求 ID。            |
| MessageList | Array of Object | 返回的消息内容列表，详情请参考 [MessageList 结构](#messagelist-结构)。 |

### MessageList 结构

| 参数        | 类型   | 描述     |
|-------------|--------|--------|
| Sender      | String | 消息发送者。    |
| MsgType     | Number | 消息类型：<ul><li>1：文本。</li><li>10：组合。</li><li>11：图片。</li><li>12：文件。</li><li>13：音频。</li><li>14：视频。</li><li>31：撤回消息。</li><li>32：Tips 消息。</li><li>200：自定义。</li></ul> |
| SubMsgType  | Number | 具体的自定义类型。值由用户发送自定义消息时填写，取值范围为 [0,200]。只有当 MsgType 为 200（自定义类型）时，此参数才有意义。                |
| MsgBody     | String | 消息内容。<ul><li>当 MsgType 为 1（文本类型）或 200（自定义类型），MsgBody 为发送消息时传入的消息内容，开发者可直接阅读消息内容。</li><li>当 MsgType 为下列类型时，MsgBody 为 JSON 字符串。请使用 URLDecode 对此 JSON 字符串解码，并按照对应结构获取消息中各字段数据：<ul><li>当 MsgType 为 11、12、13、14（多媒体消息）：<a href="#多媒体消息">MsgBody JSON 字符串解析结果参数说明 - 多媒体消息</a>。</li><li>当 MsgType 为 10（组合消息）：<a href="#组合消息">MsgBody JSON 字符串解析结果参数说明 - 组合消息</a>。</li><li>当 MsgType 为 31（消息已被撤回）：<a href="#撤回消息">MsgBody JSON 字符串解析结果参数说明 - 撤回消息</a></li><li>当 MsgType 为 32（Tips 消息）：<a href="#tips-消息">MsgBody JSON 字符串解析结果参数说明 - Tips 消息</a>。</li></ul></li></ul> |
| MsgId       | Number | 消息 ID，可借此确定消息的唯一性。    |
| MsgSeq      | Number | 消息 Seq。      |
| Payload     | String | 消息扩展字段。    |
| MsgTime     | Number | 服务端收到消息的时间，Unix 时间戳，单位为毫秒（ms）。          |
| IsEmpty     | Number | 是否是空消息：<ul><li>0：不是空消息。</li><li>1：消息已被删除（查询不到或者客户调用接口删除此消息），此时其他参数均为空。</li><li>2：消息已被撤回。</li></ul>    |


### MsgBody JSON 字符串解析结果参数说明

#### 多媒体消息

<MediaMsgBodyDescriptionZh />

#### 组合消息

<MultiMsgBodyDescriptionZh />

#### 撤回消息

<Accordion title="展开查看详细内容" defaultOpen="false">
| 参数        | 类型    | 描述                                                                 |
|------------|--------|--------------------------------------------------------------------|
| user_id    | String | 撤回发起用户的 userID。       |
| revoke_time| Number | 撤回操作的时间戳，单位为毫秒。                                |
| msg_type   | Number | 原消息类型。|
| payload    | String | 撤回操作时携带的扩展字段。                                                   |
| msg_status | Number | 撤回的对应状态：<ul><li>4：由用户自行撤回。</li><li>8：由系统撤回。</li><li>12：通过服务端 API 撤回。</li><li>16：由群管理员撤回。</li><li>20：由群主撤回。</li><li>24：因未通过审核而遭撤回。</li></ul> |
</Accordion>

#### Tips 消息

<Accordion title="展开查看详细内容" defaultOpen="false">
| 参数              | 类型                | 描述                                                                 |
|------------------|--------------------|--------------------------------------------------------------------|
| type             | Number             | Tips 消息类型：<ul><li>群成员变更：<ul><li>1：群创建。</li><li>2：群解散。</li><li>3：用户主动加群。</li><li>4：群内成员邀请群外用户加入群组。</li><li>5：群成员主动离开。</li><li>6：群内成员被踢出。</li></ul></li><li>群成员资料变更：<ul><li>11：群主转移。</li><li>12：群成员角色变更。</li><li>13：群成员禁言状态变更。</li></ul></li><li>群资料变更：<ul><li>30：群名、群头像、群公告变更。</li><li>34：群组禁言状态变更。</li></ul></li></ul> |
| op_user_info     | Object             | Tips 消息触发者（例如：群组创建用户、群名称修改用户）的用户信息。|
| └user_id                | String | 用户 ID。      |
| └role                   | Number | 用户的群成员角色。<ul><li>1：群主。</li><li>2：群管理员。</li><li>3：群成员。</li></ul>     |
| └group_member_name      | String | 用户名。     |
| └group_member_nickname  | String | 用户的群成员昵称。     |
| target_users     | Array of Object    | Tips 消息触发操作的目标用户（例如：在创建群时一起被邀请加入群的用户、被踢出群组的用户等）。 |
| └user_id                | String | 用户 ID。      |
| └role                   | Number | 用户的群成员角色。<ul><li>1：群主。</li><li>2：群管理员。</li><li>3：群成员。</li></ul>     |
| └group_member_name      | String | 用户名。     |
| └group_member_nickname  | String | 用户的群成员昵称。     |
| group_data_flag  | Number             | 当 type 为 30 时，此参数有意义，表示被修改的群资料项目。<ul><li>1：群名称。</li><li>2：群公告。</li><li>4：群头像。</li></ul> |
| group_notice     | String             | 群公告。                                                      |
| group_name       | String             | 群名称。                       |
| group_avatar     | String             | 群头像。                       |
| forbid           | Object of GroupForbid        | 当 type 为 34 时，此参数表示群组禁言对象。
| └is_all_forbid      | Bool              | 是否全员禁言：<ul><li>false：不是。</li><li>true：是。</li></ul>   |
| └forbid_role_list   | Array of Number   | 被禁言的群成员角色。  |
| └forbid_expire_time | Number            | 禁言到期时间戳，单位为毫秒。            |
| forbid_expire_time| Number            | 当 type 为 13 时，此参数表示群成员禁言到期时间戳，单位为毫秒。               |
| role             | Number             | 当 type 为 12 时，此参数表示变更后的群成员角色。<ul><li>1：群主。</li><li>2：群管理员。</li><li>3：群成员。</li></ul> |
</Accordion>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "MessageList": [
        {
            "Sender": "userA",
            "MsgType": 1,
            "MsgBody": "this is a message",
            "MsgId": 971503777289036700,
            "MsgSeq": 1,
            "Payload": "this is a payload",
            "MsgTime": 1705895412000,
            "IsEmpty": 0
        }
    ]
}
```

## 返回码

| 返回码       | 说明                                           | 处理建议                                                                 |
|-------------|----------------------------------------------|----------------------------------------------------------------------|
| 660000001   | 服务端出错。                                     | 请重试，或联系 ZEGO 技术支持。  |
| 660000002   | 输入的参数缺失或不合法。	                | 请检查输入的参数。 |
| 660300005   | 调用接口的频率超出了 AppID 级别限制。                 | 请稍后再试，或参考相关文档了解调用频率。                                    |
| 660700008   | 获取用户信息出错。	                                      | 请检查用户 ID 是否正确。    |
| 660700015	  | 用户未注册。	                                      | 请先注册用户。    |