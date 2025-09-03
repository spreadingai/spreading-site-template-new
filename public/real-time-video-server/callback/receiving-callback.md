为提高数据安全性，建议开发者在收到 ZEGO 服务端发出的回调时，进行本地签名计算，并与 signature 进行对比，判断该请求是否合法。

校验的使用流程如下：

<Steps>
<Step title="对参数进行排序">
将 `callbacksecret`、`timestamp`、`nonce` 三个参数按照字典序进行排序
</Step>
<Step title="计算 SHA1">
将排序后的 `callbacksecret`、`timestamp`、`nonce` 拼接成一个字符串并进行sha1计算
</Step>
<Step title="校验 signature">
将计算后的哈希字符串与 `signature` 进行校验对比，如果相同则标识该请求来源于 ZEGO
</Step>
</Steps>

参数说明如下：

| 参数 | 说明  |
|---- | ------ | 
| callbacksecret  | 服务端校验密钥。在 [ZEGO 控制台](https://console.zego.im/) 注册项目时生成，可在 “控制台 > 项目配置 > 项目信息 > 配置信息” 中查看。 | 
| timestamp| Unix 时间戳。|
| nonce | 随机数。|

<Accordion title="使用示例" defaultOpen="false">

以下示例代码用于生成和检验 signature。

<CodeGroup> 
```PHP title="PHP 示例"
// 从请求参数中获取到 signature, timestamp, nonce
$signature = $_POST["signature"];
$timestamp = $_POST["timestamp"];
$nonce = $_POST["nonce"];

$secret = callbacksecret;// 控制台获取的 callbacksecret
$tmpArr = array($secret, $timestamp, $nonce);
sort($tmpArr, SORT_STRING);
$tmpStr = implode( $tmpArr );
$tmpStr = sha1( $tmpStr );

if( $tmpStr == $signature ){
    return true;
} else {
    return false;
}
```
```java title="Java 示例"
// 从请求参数中获取到 signature, timestamp, nonce
String signature = request.getParameter("signature");
long timestamp = request.getParameter("timestamp");
String nonce = request.getParameter("nonce");

// 控制台获取的 callbacksecret
String secret = callbacksecret;

String[] tempArr = {secret, ""+timestamp, nonce};
Arrays.sort(tempArr);
        
String tmpStr = "";
for (int i = 0; i < tempArr.length; i++) {
    tmpStr += tempArr[i];
}
tmpStr = org.apache.commons.codec.digest.DigestUtils.sha1Hex(tmpStr);

return tmpStr.equals(signature);
```

</CodeGroup>

输出示例如下：

```PHP title="PHP 示例"
$nonce = 123412;
$timestamp = 1470820198;
$secret = 'secret';
// 三个参数经过排序后的顺序为：nonce、timestamp、secret
// 排序拼接后需要加密的原始串为：1234121470820198secret
// 哈希运算的结果为：5bd59fd62953a8059fb7eaba95720f66d19e4517
```

</Accordion>
# 回调配置说明
---

在使用 ZEGO 服务端 API 时，开发者可通过回调服务对接业务后台，进一步保证业务的有序和正常。

<Warning title="注意">


**回调服务不能保证完全可靠，请慎重考虑使用回调方案构建核心业务流程的风险。**

</Warning>



## 使用场景

例如：

- 客户端推流成功后，业务后台可以接收 ZEGO 服务端的 [流创建回调](https://doc-zh.zego.im/article/19676)，用于增加直播列表 (可维护直播列表)。

<Note title="说明">


1. 流创建回调中的 “pic_url” 可用于鉴黄，默认 20s 一张的缓存图片。
2. “pic_url” 只能在推流过程中使用，推流结束后无效。

</Note>



- 客户端停止推流后，业务后台可以接收 ZEGO 服务端的 [流关闭回调](https://doc-zh.zego.im/article/19678)，用于删除直播列表 (可维护直播列表)。

- 客户端结束直播后，业务后台可以接收 ZEGO 服务端的 [录制文件生成回调](https://doc-zh.zego.im/article/19690)，用于实现点播服务。


## 回调配置

开发者可根据实际业务需要，在 [ZEGO 控制台 ](https://console.zego.im) 的 “项目配置 > 服务端回调配置” 中进行回调信息的配置。


同时，可按需配置接收 ZEGO 回调的 URL 地址。

<Note title="说明">


可按如下方式查看控制台界面：

- **2021-11-16** 之后注册 [ZEGO 控制台](https://console.zego.im) 的用户，请参考 [控制台 - 服务端回调配置](/console/server-callback-configuration)。
- **2021-11-16** 及之前注册 [ZEGO 控制台](https://console.zego.im) 的用户，请参考 [控制台（旧版） - 项目管理](/console-old/project-management#高级配置) 中的 “高级配置”。

</Note>




## 回调说明

- 请求方法：POST。

<Note title="说明">


  回调数据格式为 JSON，您需要对其进行 UrlDecode 解码。

</Note>



- 传输协议：HTTPS/HTTP，建议使用 HTTPS。

## 验证签名

<Content />

## 返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。

## 回调重试策略

如果 ZEGO 服务器没有收到响应，或收到的 HTTP status code 不为 2XX（例如 200），都会尝试重试，**最多进行 5 次重试**。每次重试请求与**上一次请求**的间隔时间分别为 2s、4s、8s、16s、32s。若第 5 次重试后仍然失败，将不再重试，该回调丢失。
