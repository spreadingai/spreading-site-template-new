

# 删除会话

---

## 描述

调用此接口，您可以在服务端删除一个会话。

### 接口原型
- 请求方法：POST
- 请求地址： `https://zim-api.zego.im/?Action=DeleteConv`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

### 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考[调用方式 - 公共请求参数](/zim-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FromUserId | String | 是 | <ul><li>单聊会话：传入 1 名单聊用户的 UserId。</li><li>群聊会话：传入 1 名群聊成员的 UserId。</li></ul> |
| ConvId | String | 是 | <ul><li>单聊会话：传入另 1 名单聊用户的 UserId。</li><li>群聊会话：传入群聊会话的 GroupId。</li></ul> |
| ConvType | ConvType | 是 | 会话类型：<ul><li>0：单聊。</li><li>2：群聊。</li></ul> |

### 请求示例

- 请求地址 URL：

  ```json
  https://zim-api.zego.im/?Action=DeleteConv
  &<公共请求参数>
  ```

- 请求消息体：
  ```json
  {
      "ConvId": "userB",
      "ConvType": 0,
      "FromUserId": "userA"   
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

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

| 返回码 | 说明 | 处理建议 |
|--------|------|----------|
| 660000002 | 输入参数错误。 | 请检查输入的参数。 |
