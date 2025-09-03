# 文件转码状态回调

- - -

<Warning title="注意">回调服务不能保证完全可靠，请慎重考虑使用回调方案构建核心业务流程的风险。</Warning>

##  描述

当开发者希望获取文件转码完成的事件通知时，可以联系 ZEGO 技术配置回调地址，文件转码服务器将会以 POST 的形式对回调地址进行请求。

##  回调说明

- 请求方法：POST
- 请求地址：请联系 ZEGO 技术支持配置
- 传输协议：HTTPS

##  请求参数

| 参数 | 类型 | 描述 |
|---|---|---|
| appid | Number | AppId。 |
| event | String | 回调事件，此回调返回值为 cvt_finish。 |
| nonce | String | 随机数字符串。 |
| signature | String | 检验串，请参考 <a href="#检验说明">检验说明</a>。 |
| timestamp | Number | 服务器当前时间，Unix 时间戳。 |
| data | Object | 响应对象。 |
| └file_id | String | 转码成功后返回的文件 ID。 |
| └task_id | String | 文件转码任务 ID。 |
| └status | Number | 文件转码状态，详情请参考下文中 <a href="#status-字段取值说明如下">status</a> 字段说明表。 |


### status 字段取值说明如下

|状态码|描述|
|-----|----|
|16|转码成功。|
|32|转码失败。|
|64|转码任务已取消。|
|128|受密码保护的文档。|
|256|文件内容过大。|
|512|Excel 文件标签数过多。|
|1024|文件内容为空。例如：PPT 内无幻灯片。|
|2048|转码服务器打开文件失败。|
|4096|不支持的目标文件类型。|
|8192|源文件为只读文件。|
|16384|<p>转码服务器下载源文件失败。 可能的原因如下：</p><ul><li>无法从请求参数中的源文件 URL 下载文件。</li><li>请求参数中的文件哈希值不是 32 位的 MD5 哈希值。</li><li>请求参数中的文件哈希值和根据文件计算的哈希值不匹配。</li></ul> |
|32768|检测到源文件中包含了转码工具无法处理的元素，如墨迹涂鸦等，请去掉这些元素后再进行转码。|
|32769|检测到 Word、Excel 和 PowerPoint 文件格式不合法，请确保源文件可以使用 Office 打开再进行转码。|

##  数据示例

```json
{
    "appid": 123,
    "data": {
        "file_id": "ZYV-AFTrF6qnfFGW",
        "status": 16,
        "task_id": "9Y74yTsVd7e825-N"
    },
    "event": "cvt_finish",
    "nonce": "6990248315071153368",
    "signature": "1bb4db39726ee7f64c20ac0a71a730655b98ae2c",
    "timestamp": 1627544014
}
```

##  检验说明

为提高数据安全性，开发者在收到 ZEGO 服务端发出的回调时，进行本地签名计算，并与 signature 进行对比，判断该请求是否合法。

###  加密/校验

加密/校验的使用流程如下：

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/server/Callback/encryptVerifyProcess.png" />
</Frame>

参数说明如下：

| 参数 | 说明  |
|---- | ------ |
| callbacksecret  | 服务端校验密钥。在 [ZEGO 控制台](https://console.zego.im/) 注册项目时生成，可在 “控制台 > 项目配置 > 服务端API密钥” 中查看。 |
| timestamp| Unix 时间戳。|
| nonce | 随机数。|


### 示例代码

以下示例代码用于生成和检验 signature。

<CodeGroup>
```PHP title="PHP 示例"
// 从请求参数中获取到 signature, timestamp, nonce
$signature = $_POST["signature"];
$timestamp = $_POST["timestamp"];
$nonce = $_POST["nonce"];

$secret = callbacksecret;// 后台获取的 callbacksecret
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

// 后台获取的 callbacksecret
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

### 输出示例

```bash
$timestamp = 1470820198;
$nonce = 123412;
$secret = 'secret';

排序拼接后需要加密的原始串为:1234121470820198secret
加密的结果为:5bd59fd62953a8059fb7eaba95720f66d19e4517
```


##  返回响应

返回 HTTP status code 为 2XX （例如 200）表示成功，其他响应都表示失败。


##  回调重试策略

如果 ZEGO 服务器没有收到响应，会在 15 秒后发起重试，最多重试两次。
