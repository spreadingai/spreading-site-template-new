

## 注册机器人
---

## 描述

调用此接口，您可以注册多个机器人。

### 接口原型

- **请求方法**：POST
- **请求地址**：`https://zim-api.zego.im/?Action=RobotRegister`
- **传输协议**：HTTPS
- **调用频率限制**：20次/秒

### 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考[调用方式 - 公共请求参数](/zim-server/accessing-server-apis#公共请求参数)。

| 参数        | 类型            | 是否必选 | 描述                                                         |
| ----------- | --------------- | -------- | ------------------------------------------------------------ |
| UserInfo    | Array Of Object | 是       | 机器人用户信息列表。单次最多注册 20 个机器人。                         |
|  └UserId     | String          | 是       | 机器人用户 ID。长度不超过 32 字节，必须以 @RBT#开头。              |
|  └UserName   | String          | 否       | 机器人名称。长度不超过 256 字节。                               |
|  └UserAvatar | String          | 否       | 机器人头像地址。长度不超过 500 字节。                          |

### 请求示例

- 请求地址 URL：

  ```json
  https://zim-api.zego.im/?Action=RobotRegister
  &<公共请求参数>
  ```

- 请求消息体：
  ```json
  {
      "UserInfo":[
      {
          "UserId": "@RBT#R1",
          "UserName": "userNameA",
          "UserAvatar": "https"
      },
      {
          "UserId": "@RBT#R2",
          "UserName": "userNameB",
          "UserAvatar": "https"
      }
      ]
  }
  ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。<Note title="说明">当您发起请求同时注册多个机器人时：<ul><li>如果有 1 个或以上的机器人用户 ID 注册成功，Code 都会返回 0。此时请参考 ErrorList 中的具体信息，确认操作结果。</li><li>如果全部机器人用户 ID 注册失败，Code 会返回相关返回码，具体请参考 [全局返回码](/zim-server/return-codes)。</li></ul></Note> |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| ErrorList | Object | 失败信息列表。<ul><li>Code 为 0：<ul><li>ErrorList 为空，全部机器人用户 ID 注册成功。</li><li>ErrorList 不为空，表示部分机器人用户 ID 注册失败，请参考 SubCode、SubMessage 处理。</li></ul></li><li>Code 不为 0：<ul><li>ErrorList 为空，表示参数错误、接口频率限制、系统错误。</li><li>ErrorList 不为空，表示所有机器人用户 ID 都注册失败，请参考 SubCode、SubMessage 处理。</li></ul></li></ul> |
| └UserId | String | 注册失败的机器人用户 ID。 |
| └SubCode | Number | 机器人注册失败的具体返回码。|
| └SubMessage | String | 机器人注册失败的原因说明。 |

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

| 返回码 | 描述 | 可能原因 | 处理建议 |
|--------|------|----------|----------|
| 660000001 | 业务类通用错误。 | 服务端出错。 | 请重试，或联系 ZEGO 技术支持。 |
| 660000002 | 输入参数错误。 | 输入的参数缺失或不合法。 | 请检查输入的参数。 |
| 660300005 | 调用接口的频率超出了 AppID 级别限制。	 |请稍后再试，或参考相关文档了解调用频率。|
| 660000012 | UserID 长度超过限制。 | UserID 最大长度为 32 字节。 | 请确认 UserID 的长度。 |
| 660700001 | 请求过于频繁。 | 发起请求频率超过 20 次/秒。 | 请稍后再试。 |
| 660700002 | 机器人已存在。 | 发送请求的 UserID 已存在。 | 请避免重复注册相同的 UserID。 |
| 660700006 | UserName 长度超过限制。 | UserName 长度最大为 256 字节。 | 请确认 UserName 的长度。 |
| 660700007 | UserAvatar 地址长度超过限制。 | UserAvatar 地址长度最大为 500 字节。 | 请确认 UserAvatar 的长度。 |