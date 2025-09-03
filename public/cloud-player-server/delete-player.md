
# 销毁云端播放器

- - -

## 描述

调用本接口销毁指定的云端播放器。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloud-player-api.zego.im/?Action=DeletePlayer`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数，公共参数列表请参考 [调用方式 - 公共请求参数](/cloud-player-server/accessing-server-apis#公共请求参数)。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| PlayerId | String | 是 | 云端播放器唯一标识 ID，通过 [CreatePlayer](/cloud-player-server/create-player) 返回。<strong>调用本接口时，请确保 PlayerId 是已存在的，否则可能会出错。</strong> |

## 请求示例

- 请求 URL
  
    ```
    https://cloud-player-api.zego.im/?Action=DeletePlayer
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    &IsTest=false
    ```

- 请求消息体    

    ```json
    {
    "PlayerId": "player_1",
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/cloud-player-server/return-codes)。

| 返回码 | 说明 | 处理建议 |
|--------|------|----------|
| 0 | 成功。 | - |
| 100000004 | 签名过期。 | 请重新生成签名。 |
| 100000005 | 签名错误。 | 请确认生成签名的参数是否正确。 |
| 350006001 | 接口请求频率超过上限。 | 请确认对应接口的 QPS 限制，降低请求频率。 |
| 350006002 | 网关校验失败。 | 请联系 ZEGO 技术支持处理。 |
| 350006003 | 无效的输入参数。 | 请根据 Message 提示，调整对应参数的取值。 |
| 350006006 | 服务未开通。 | 请联系 ZEGO 技术支持，开通服务权限。 |
| 350006009 | 云端播放器正在创建中。 | 请稍后重试本次操作。 |
| 350010000 | 系统错误。 | 请联系 ZEGO 技术支持处理。 |
