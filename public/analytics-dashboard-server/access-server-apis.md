
## 签名机制


为保证 API 的安全调用，ZEGO 服务端会对每个 API 的访问请求进行身份验证。开发者在调用 API 时，都需要在请求中包含签名 Signature 信息。

<Warning title="注意">
    
每次调用接口都需要生成新的签名。  
</Warning>

### 密钥获取

Signature 通过使用 AppID 和 ServerSecret 进行对称加密的方法来验证请求的发送者身份。AppID 用于标识访问者的身份，ServerSecret 用于加密签名字符串和服务器验证签名字符串的密钥，必须严格保密，防止泄漏。

AppID 和 ServerSecret 从 [ZEGO 控制台](https://console.zego.im) 获取，详情请参考控制台文档 [项目信息](https://doc-zh.zego.im/article/12107)。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/appid.png" />
</Frame>

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/server.png" />
</Frame>


### 签名生成

#### 签名参数说明

| 参数            | 含义                                                         |
|-----------------|------------------------------------------------------------|
| AppId           | 应用 ID。     |
| SignatureNonce   | 随机字符串。公共参数里的 SignatureNonce，生成算法可参考下方签名示例。 |
| ServerSecret    | 应⽤密钥。               |
| Timestamp       | 当前 Unix 时间戳，单位为秒。生成算法可参考下方签名示例，最多允许 10 分钟的误差。 |

<Note title="说明">

计算签名所使用的 SignatureNonce 和 Timestamp 参数取值，需要和公共参数中的 SignatureNonce 和 Timestamp 参数取值保持一致。
</Note>

#### 签名生成算法

Signature = md5(AppId + SignatureNonce + ServerSecret + Timestamp)

#### 签名字符串格式

签名采⽤ hex 编码（⼩写），⻓度为 32 个字符。

### 签名示例

ZEGO 提供多种编程语言的签名示例代码，开发者可根据实际情况进行参考。

<CodeGroup>
```go title="Go"
import (
   "crypto/md5"
   "crypto/rand"
   "encoding/hex"
   "fmt"
   "log"
   "time"
)
// Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
func GenerateSignature(appId uint32, signatureNonce string, serverSecret string, timestamp int64) (Signature string){
   data := fmt.Sprintf("%d%s%s%d", appId, signatureNonce, serverSecret, timestamp)
   h := md5.New()
   h.Write([]byte(data))
   return hex.EncodeToString(h.Sum(nil))
}
func main() {
   /*生成16进制随机字符串(16位)*/
   nonceByte := make([]byte, 8)
   rand.Read(nonceByte)
   signatureNonce := hex.EncodeToString(nonceByte)
   log.Printf(signatureNonce)
   appId := 12345       //使用你的appId和serverSecret
   serverSecret := "9193cc662a4c0ec135ec71fb57194b38"
   timestamp := time.Now().Unix()
   /* appId:12345
      signatureNonce:4fd24687296dd9f3
      serverSecret:9193cc662a4c0ec135ec71fb57194b38
      timestamp:1615186943      2021/03/08 15:02:23
      signature:43e5cfcca828314675f91b001390566a
    */
   log.Printf("signature:%v", GenerateSignature(uint32(appId), signatureNonce, serverSecret, timestamp))
}
```

```python title="Python"
# -*- coding: UTF-8 -*-
import secrets
import string
import hashlib
import time
#Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
def GenerateSignature(appId, signatureNonce, serverSecret, timestamp):
    str1 = str(appId) + signatureNonce + serverSecret + str(timestamp)
    hash = hashlib.md5()
    hash.update(str1.encode("utf8"))
    signature = hash.hexdigest()
    return signature

def main():
    #生成16进制随机字符串(16位)
    signatureNonce = secrets.token_hex(8)

    #使用你的appId和serverSecret
    appId = 12345
    serverSecret = "9193cc662a4c0ec135ec71fb57194b38"
    #获得10位unix时间戳
    timestamp = int(time.time())
    print(GenerateSignature(appId,signatureNonce,serverSecret,timestamp))

if __name__ == '__main__':
    main()
```

```java title="Java"
import java.security.MessageDigest;
import java.security.SecureRandom;
public class Md5{
    /**
     * 字节数组转16进制
     * @param bytes 需要转换的byte数组
     * @return  转换后的Hex字符串
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuffer md5str = new StringBuffer();
        //把数组每一字节换成16进制连成md5字符串
        int digital;
        for (int i = 0; i < bytes.length; i++) {
            digital = bytes[i];
            if (digital < 0) {
                digital += 256;
            }
            if (digital < 16) {
                md5str.append("0");
            }
            md5str.append(Integer.toHexString(digital));
        }
        return md5str.toString();
    }
    // Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
    public static String GenerateSignature(long appId, String signatureNonce, String serverSecret, long timestamp){
        String str = String.valueOf(appId) + signatureNonce + serverSecret + String.valueOf(timestamp);
        String signature = "";
        try{
            //创建一个提供信息摘要算法的对象，初始化为md5算法对象
            MessageDigest md = MessageDigest.getInstance("MD5");
            //计算后获得字节数组
            byte[] bytes = md.digest(str.getBytes("utf-8"));
            //把数组每一字节换成16进制连成md5字符串
            signature = bytesToHex(bytes);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return signature;
    }


    public static void main(String[] args){
        //生成16进制随机字符串(16位)
        byte[] bytes = new byte[8];

        //使用SecureRandom获取高强度安全随机数生成器
        SecureRandom sr = new SecureRandom();

        sr.nextBytes(bytes);
        String signatureNonce = bytesToHex(bytes);
        long appId = 12345L;       //使用你的appId和serverSecret，数字后要添加大写L或小写l表示long类型
        String serverSecret = "9193cc662a4c0ec135ec71fb57194b38";
        long timestamp = System.currentTimeMillis() / 1000L;
        System.out.println(GenerateSignature(appId,signatureNonce,serverSecret,timestamp));
    }
}
```

```php title="PHP"
<?php
function GenerateSignature($appId, $signatureNonce, $serverSecret, $timestamp)
{
    $str = $appId.$signatureNonce.$serverSecret.$timestamp;
    $signature = md5($str);
    return $signature;
}

//生成16进制随机字符串(16位)
$signatureNonce = bin2hex(random_bytes(8));
//使用你的appId和serverSecret
$appId = 12345;
$serverSecret = "9193cc662a4c0ec135ec71fb57194b38";
$timestamp = time();
$signature = GenerateSignature($appId, $signatureNonce, $serverSecret, $timestamp);
echo $signature;
?>
```

```javascript title="Node.js"
const crypto = require('crypto'); 
//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
function GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp){
    const hash = crypto.createHash('md5'); //规定使用哈希算法中的MD5算法
    var str = appId + signatureNonce + serverSecret + timeStamp;
    hash.update(str);
    //hash.digest('hex')表示输出的格式为16进制
    return hash.digest('hex');
}

var signatureNonce = crypto.randomBytes(8).toString('hex');
//使用你的appId和serverSecret
var appId = 12345;
var serverSecret = "9193cc662a4c0ec135ec71fb57194b38";
var timeStamp = Math.round(Date.now()/1000);
console.log(GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp));
```

</CodeGroup>

### 签名失败

存在以下签名失败的返回码，请开发者根据实际情况处理。

| 返回码 | 说明 |
| --- | --- |
| 100000004 | 签名过期。 |
| 100000005 | 签名错误。 |

# 调用方式
---

## 使用说明

ZEGO 服务端 API 支持 HTTPS 网络请求协议，允许 GET 或 POST 方法。您可以根据 API 文档编写代码，访问相应 API。

## 请求方式概述

服务端 API 请求由不同内容构成，有固定的请求结构：

- [接入地址](#接入地址)：ZEGO 服务端的接入地址，根据不同的产品和地域会有所不同。
- [公共参数](#公共参数])：每个请求都须有一系列公共参数。
- [签名](#签名机制)：签名也属于公共参数，需要根据相应的签名算法生成。
- 请求参数：您需要通过 Action 参数指定目标操作，例如 Action = GetBizUsage；还需要指定接口的其他参数。

我们根据您的签名验证了请求后，会返回结果给您。接口调用成功会显示返回参数，调用失败则显示相应报错，您可以根据 [全局返回码](/analytics-dashboard-server/return-codes) 分析排查。

<Accordion title="展开查看服务端 API 请求示例" defaultOpen="false">
以下为 [`GetBizUsage`](/analytics-dashboard-server/operation-data/get-biz-usage)（查询业务规模）接口的请求结构为例：

```bash
https://analytics-api.zego.im/?Action=GetBizUsage
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&IsTest=false
&StartDate=20230912
&EndDate=20231012
&Metrics[]=publish_count
&Metrics[]=play_count
```

其中：
- `https`：指定了请求通信协议。
- `analytics-api.zego.im`：指定了 ZEGO 服务端的接入地址。
- `Action=GetBizUsage`：指定了要调用的 API。
- 公共请求参数：是每个接口都需要使用到的请求参数，包含 AppId、SignatureNonce、Timestamp、Signature、SignatureVersion 和 IsTest，具体说明请参考 [公共请求参数](#公共请求参数)。
- 业务参数：不同 Action 要求开发者传入不同的业务参数，上述例子中的 StartDate、EndDate 和 Metrics 为业务参数，具体说明请参考各接口文档。

此外，ZEGO 提供多种编程语言的示例代码，开发者可根据实际情况进行参考。以下是 [`GetBizUsage`](/analytics-dashboard-server/operation-data/get-biz-usage) 接口的 Node.js 代码：

```js
const crypto = require('crypto');
const request = require('request');

//请将 appId 修改为你的 AppId，AppId 为 number
var appId = 1234567890;
//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
//举例："1234567890bbc111111da999ef05f0ee"
var serverSecret = ;

//生成签名
//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
function GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp){
    const hash = crypto.createHash('md5'); //规定使用哈希算法中的MD5算法
    var str = appId + signatureNonce + serverSecret + timeStamp;
    hash.update(str);
    //hash.digest('hex')表示输出的格式为16进制
    return hash.digest('hex');
}

var signatureNonce = crypto.randomBytes(8).toString('hex');
var timeStamp = Math.round(Date.now()/1000);
// 生成签名
// 生成签名时用到的 Timestamp 要和url参数中的 Timestamp一致，生成签名时用到的 SignatureNonce 也要和url参数中的 SignatureNonce 一致
var sig = GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp)
// analytics-api.zego.im 表示使用的产品是星图
//以下示例可获取 RoomID 为 room1 的房间用户数
var url = `https://analytics-api.zego.im/?Action=GetBizUsage&StartDate=20250110&EndDate=20250112&Metrics[]=publish_count&Metrics[]=play_count&AppId=${appId}&SignatureNonce=${signatureNonce}&Timestamp=${timeStamp}&Signature=${sig}&SignatureVersion=2.0&IsTest=false`;

request(url, function(error, response, body){
    console.log('Url: ',url)
    console.log('StatusCode: ',response.statusCode)
    console.log('Error: ', error)
    if(!error && response.statusCode){
        console.log(body)
    }
})
```
</Accordion>

## 请求结构

### 接入地址

开发者需要根据自己的服务端所在地理区域，指定相应的接入地址，向 ZEGO 服务端发送请求。

<Warning title="注意">为保障您的业务服务接入质量，请优先使用您的服务端所在地理区域的域名，作为接入地址，向 ZEGO 服务端发送请求。  </Warning>

ZEGO 支持如下地理区域的请求接入：

<table>
  <colgroup>
    <col />
    <col />
  </colgroup>
<tbody><tr>
<th>地理区域</th>
<th>接⼊地址</th>
</tr>
<tr>
<td>中国⼤陆（上海）</td>
<td>analytics-api-sha.zego.im</td>
</tr>
<tr>
<td>港澳台（⾹港）</td>
<td>analytics-api-hkg.zego.im</td>
</tr>
<tr>
<td>欧洲（法兰克福）</td>
<td>analytics-api-fra.zego.im</td>
</tr>
<tr>
<td>美⻄（加州）</td>
<td>analytics-api-lax.zego.im</td>
</tr>
<tr>
<td>亚太（孟买）</td>
<td>analytics-api-bom.zego.im</td>
</tr>
<tr>
<td>东南亚（新加坡）</td>
<td>analytics-api-sgp.zego.im</td>
</tr>
<tr>
<td>统一接入地址（不区分区域）</td>
<td>analytics-api.zego.im</td>
</tr>
</tbody></table>

### 通信协议

ZEGO 服务端 API 的所有接口均通过 HTTPS 进行通信，提供安全的通信服务。


### 请求方法

ZEGO 服务端 API 支持以下 HTTP 请求方法：

- **GET**
  - 所有请求参数（包括公共参数和业务参数）统⼀放在 Query 中。
- **POST**
  - 特殊复杂 API 的业务参数放在 Body，公共参数放在 Query 中。
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。

## 公共参数

本节介绍了开发者调用 ZEGO 服务端 API 时使用的公共参数，包含了公共请求参数和公共返回参数。

### 公共请求参数

公共请求参数是每个接口都需要使用到的请求参数。

<table>
  <colgroup>
    <col width="22%" />
    <col width="15%" />
    <col width="14%" />
    <col width="49%" />
  </colgroup>
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>AppId</td>
    <td>Uint32</td>
    <td>是</td>
    <td>AppId，ZEGO 分配的用户唯一凭证。</td>
  </tr>
  <tr>
    <td>Signature</td>
    <td>String</td>
    <td>是</td>
    <td>签名，签名的生成请参考 <a href="#签名机制">签名机制</a>。</td>
  </tr>
  <tr>
    <td>SignatureNonce</td>
    <td>String</td>
    <td>是</td>
    <td>随机字符串。</td>
  </tr>
  <tr>
    <td>SignatureVersion</td>
    <td>String</td>
    <td>是</td>
    <td>签名版本号，<b>必须填写为 2.0</b>。</td>
  </tr>
  <tr>
    <td>Timestamp</td>
    <td>Int64</td>
    <td>是</td>
    <td>Unix 时间戳，单位为秒。最多允许 10 分钟的误差。</td>
  </tr>
  <tr>
    <td rowspan="2">IsTest</td>
    <td rowspan="2">String</td>
    <td>是（2021-11-16 及之前创建的项目）</td>
    <td>是否为测试环境。取值如下：<ul><li>true（忽略大小写）：测试环境</li><li>false（忽略大小写）：正式环境（默认值）</li></ul><Warning title="注意">针对 <b>2021-11-16</b> 及之前在 <a target="_blank" href="https://console.zego.im">ZEGO 控制台</a> 创建的项目：<ul><li>从控制台申请的 AppId 和 AppSign 等信息默认是测试环境。</li><li>可根据 AppId 环境类型及业务需求设置本参数。</li></ul></Warning></td>
  </tr>
  <tr>
    <td>否（2021-11-16 之后创建的项目）</td>
    <td>是否为测试环境。默认为正式环境，可忽略不填写。<Warning title="注意">针对 <b>2021-11-16</b> 之后在 <a target="_blank" href="https://console.zego.im">ZEGO 控制台</a> 创建的项目：从控制台申请的 AppId 和 AppSign 等信息都为正式环境。</Warning></td>
  </tr>
</tbody></table>

请求示例：

<Warning title="注意">
- 请勿直接拷贝下面的示例用于请求。
- `https://analytics-api.zego.im/?Action=GetBizUsage` 需要替换为各接口文档“接口原型”章节中的请求地址。
- 各公共参数的取值请根据实际情况修改。
</Warning>

<CodeGroup>
```bash title="GET 请求"
https://analytics-api.zego.im/?Action=xxxx
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=xxxx
&SignatureVersion=2.0
&IsTest=false
&<非公共请求参数>
```

```bash title="POST 请求"
https://analytics-api.zego.im/?Action=xxxx
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=xxxx
&SignatureVersion=2.0
&IsTest=false
```
</CodeGroup>

开发者可以在 [服务端 API 校验](https://doc-zh.zego.im/server-link-checker) 页面中，输入 URL 地址，验证签名信息、公共参数、以及 URL 格式是否合法。

### 公共返回参数

API 返回结果采用统一格式，返回的数据格式为 JSON。

每次调用接口，无论成功与否，都会返回公共参数。

<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="60%" />
</colgroup>
<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Code</td>
    <td>Number</td>
    <td>返回码。</td>
  </tr>
  <tr>
    <td>Message</td>
    <td>String</td>
    <td>操作结果描述。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>-</td>
    <td>响应数据。</td>
  </tr>
</tbody>
</table>


返回示例：

```json
{
    "Code": 0,
    "Data": {
        "Metrics": [
            {
                "Metric": "publish_count",
                "Values": [
                    {
                        "Date": "20250110",
                        "Value": 100
                    },
                    {
                        "Date": "20250111",
                        "Value": 30
                    },
                    {
                        "Date": "20250112",
                        "Value": 40
                    }
                ]
            },
            {
                "Metric": "play_count",
                "Values": [
                    {
                        "Date": "20250110",
                        "Value": 60
                    },
                    {
                        "Date": "20250111",
                        "Value": 20
                    },
                    {
                        "Date": "20250112",
                        "Value": 10
                    }
                ]
            }
        ]
    },
    "Message": "success",
    "RequestId": 1659512998878671000
}
```

<Content />