# ZPNs 错误码

调用 ZPNs 的接口后，如果返回结果中存在 `errorCode` 字段，则表示该接口调用异常。示例代码如下：

```java
@Override
protected void onRegistered(Context context, ZPNsRegisterMessage message) {
    message.getErrorCode();
    message.getMsg();
}
```

| 错误码 |  说明 | 处理建议 | 
|--|--|--|
| 0 | 成功。  | - |
| 6000401 | 连接失败。  | 网络状态良好时重试。 |
| 6000402 | 提供的厂商相关的 AppID 或 AppKey 错误。  | 检查填入的厂商配置内容是否有误。 |
| 6000403 | 获取 PushID 时，厂商 API 报错。  | 根据 Error Message 中厂商所提供内容处理。 |
| 6000404 | 注册 Push 出现异常、其他失败。  | 根据 Error Message 所提供内容处理。 |
| 6000405 | 注销 Push 出现异常、其他失败。  | 根据 Error Message 所提供内容处理。 |
<Content />
