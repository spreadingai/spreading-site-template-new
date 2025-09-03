

# 删除指定群聊用户全部消息

---

## 描述

调用此接口，您可以在服务端删除群聊会话中某一用户的全部消息。

### 接口原型
- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=ClearMemberGroupMessage`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

### 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考[调用方式 - 公共请求参数](/zim-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | 删除此用户在 `GroupId` 发送过的所有群聊消息。 |
| GroupId | String | 是 | 群组 ID。 |

### 请求示例

- 请求地址 URL：

  ```json
  https://zim-api.zego.im/?Action=ClearMemberGroupMessage
  &<公共请求参数>
  ```

- 请求消息体：
  ```json
  {
      "FromUserId": "user_a",
      "GroupId": "group_id",
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