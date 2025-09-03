# 查询群组资料

- - -

## 描述

通过该接口查询群资料，包含群组名称、群组公告、群组头像、群组禁言信息、群组规格限制、群组创建时间和群组属性。

## 接口原型

- 请求方法：POST
- 请求地址：`https://zim-api.zego.im/?Action=QueryGroupInfo`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 查询者的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册））。 |
| GroupId | String | 是 | 查询目标的群组 ID。 |

## 请求示例

- 请求地址 URL：
    ```json
    https://zim-api.zego.im/?Action=QueryGroupInfo
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "FromUserId": "userId",
        "GroupId": "groupId"
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| GroupName | String | 群组名称。 |
| GroupNotice | String | 群组公告。 |
| GroupDataSeq | Number | 群组资料修改次数。 |
| GroupAvatar | String | 群组头像地址。 |
| IsAllForbid | Bool | 是否全员禁言。<ul><li>true：是。</li><li>false：否。</li></ul> |
| ForbidList | Number | 被禁言的群组角色。<ul><li>1：群主。</li><li>2：群管理员。</li><li>3：群成员。</li><li>其他值：您自定义的群组角色，一般建议大于 100。</li></ul> |
| LimitInfo | Object | 群组规格限制。 |
| └MemberCountLimit | Number | 群组成员人数上限。 |
| └JoinMode | Number | 加入群组的模式：<ul><li>0：无需验证，任何人可以直接加入群组。</li><li>1：用户需发起入群申请，群主或群管理员批准后，该用户才能加入群组。</li><li>2：外部用户需经群内成员邀请方可入群。</li></ul> |
| └InviteMode | Number | 邀请模式：<ul><li>0：所有群成员都能邀请外部用户入群。</li><li>1：只有群主或者群管理员可以发起邀请。</li></ul> |
| └BeInvitedMode | Number | 受邀请模式：<ul><li>0：可以直接邀请外部用户入群，无需对方同意。</li><li>1：邀请某人加入群组后，需要对方同意。</li></ul> |
| └NumberMessage | Number | 新成员入群后可拉取的历史消息数目。 |
| ForbidExpireTime | Number | 禁言结束的 Unix 时间戳，单位为毫秒（ms）。。 |
| GroupCreateTime | Number | 群组创建的 Unix 时间戳，单位为毫秒（ms）。 |
| GroupId | String | 群组 ID。 |
| GroupAttributes | Array of Object | 群组属性列表。 |
| └Key | String | 群组属性的键。 |
| └Value | String | 群组属性的值。 |

<Note title="说明">
`IsAllForbid` 和 `ForbidList` 不会同时存在。 
</Note>

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "GroupName": "GroupName",
    "GroupNotice": "GroupNotice",
    "GroupDataSeq": 1,
    "GroupAvatar": "https://xxx.com/xxx.png",
    "IsAllForbid": true,
    "ForbidList": [2,3],
    "LimitInfo": {
        "MemberCountLimit": 100,
        "JoinMode": 1,
        "InviteMode": 1,
        "BeInvitedMode": 1,
        "NumberMessage": 100
    },
    "ForbidExpireTime": 1000,
    "GroupCreateTime": 10000,
    "GroupId": "GroupId",
    "GroupAttributes": [
        {
            "Key": "1",
            "Value": "1"
        },
        {
            "Key": "2",
            "Value": "2"
        }
    ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 说明 | 解决方案 |
|--------|------|----------|
| 660000002 | 输入参数错误。 | 请检查输入的参数。 |
| 660300005 | 调用接口的频率超出了 AppID 级别限制。 | 请稍后再试。 |
| 660500002 | 操作者用户未注册。 | 请让操作者先注册 ZIM 服务。 |

