# 查询 App 下的禁言群组列表

- - -

## 描述

本接口用于查询 App 中的所有禁言群组的 ID，包含处于全员禁言、按群组角色禁言或按用户 ID 禁言状态的群组。

本接口每次默认返回 10000 个群组，如需调整，请联系 ZEGO 技术支持。 

## 接口原型

- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=FetchForbidGroupList`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 |  查询操作者的用户 ID（已在客户端调用 `login` 方法登录 ZIM 服务，或已调用 [服务端 API](/zim-server/user/batch-register-users) 完成注册）。 |
| StartFlag | Number | 是 | 分页拉取标志。第一次填 0，之后填上一次返回的 NextFlag 值。当返回的 NextFlag 为 0 时，表示群组列表获取完毕。 |


## 请求示例

- 请求地址 URL：
```json
https://zim-api.zego.im/?Action=FetchForbidGroupList
&<Common request parameters>
```

- 请求消息体：

```json
{
    "FromUserId": "userId",
    "StartFlag": 0
}
```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| FetchEnd | Number | 是否拉取完毕：<ul><li>0：否。</li><li>1：是。</li></ul> |
| NextFlag | Number | <ul><li>当 FetchEnd 为 0 时，表示仍有更多群组可拉取，可将其作为下次接口调用的 StartFlag。</li><li>当 FetchEnd 为 1 时，表示列表已拉取完毕，此时请忽略此字段。</li></ul> |
| GroupList | Array of Object | 禁言群组列表。 |
| └GroupId | String | 群组 ID。 |
| └ForbidType | Number | 禁言类型：<ul><li>1：全员禁言</li><li>2：按群组角色禁言</li><li>4：按用户 ID 禁言</li></ul>如果同时存在多种禁言情况，ForbidType 会把这些数值相加，例如同时全员禁言（1）和按群组角色禁言（2）时，ForbidType 为 3。|

## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782",
    "FetchEnd": 1,
    "NextFlag": 100000,
    "GroupList": [
        {
            "GroupId": "group_1",
            "ForbidType": 1
        },
        {
            "GroupId": "group_2",
            "ForbidType": 5
        }
    ]
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 描述 | 处理建议 |
|------|------|------|
| 660000002 | 输入参数错误。 | 请检查输入的参数。 |
| 660000003 | 逻辑处理错误。 | 请重试，或联系 ZEGO 技术支持。 |
| 660000011 | 用户个数超过限制。 | 请检查输入的用户列表。 |