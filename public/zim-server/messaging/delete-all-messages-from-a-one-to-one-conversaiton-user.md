

# 删除指定单聊用户全部消息

---

## 描述

调用此接口，您可以在服务端删除单聊会话中某一用户的全部消息。

### 接口原型
- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=ClearPeerMessage`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

### 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考[调用方式 - 公共请求参数](/zim-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 删除此用户向 `ToUserId` 发送过的所有单聊消息。 |
| ToUserId | String | 是 | 消息接收用户。 |

<Note title="说明">
示例：  
用户 A 与 B 对话，若需要删除用户 A 的全部单聊消息，则 `FromUserId` 为 A，`ToUserId` 为 B；若需要删除用户 B 的全部单聊消息，则 `FromUserId` 为 B，`ToUserId` 为  A。
</Note>

### 请求示例

- 请求地址 URL：

  ```json
  https://zim-api.zego.im/?Action=ClearPeerMessage
  &<公共请求参数>
  ```

- 请求消息体：
  ```json
  {
      "FromUserId": "user_a",
      "ToUserId": "user_b",
  }
  ```
  
## 响应参数
| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |

### 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "343649807833778782"
}
```

## 返回码

返回码请参考 [全局返回码](/zim-server/return-codes)。