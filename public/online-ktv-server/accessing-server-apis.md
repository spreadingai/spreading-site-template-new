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

## 请求结构


### 服务地址


开发者需要根据自己的服务端所在地理区域，指定相应的接入地址，向 ZEGO 服务端发送请求。

<Warning title="注意">
为保障您的业务服务接入质量，请优先使用您的服务端所在地理区域的域名，作为接入地址，向 ZEGO 服务端发送请求。
</Warning>


ZEGO 支持如下地理区域的请求接入：

<table>
  <colgroup>
    <col/>
    <col/>
  </colgroup>
<tbody><tr>
<th>地理区域</th>
<th>接⼊地址</th>
</tr>
<tr>
<td>中国⼤陆（上海）</td>
<td>ktv-api-sha.zego.im</td>
</tr>
<tr>
<td>港澳台（⾹港）</td>
<td>ktv-api-hkg.zego.im</td>
</tr>
<tr>
<td>欧洲（法兰克福）</td>
<td>ktv-api-fra.zego.im</td>
</tr>
<tr>
<td>美⻄（加州）</td>
<td>ktv-api-lax.zego.im</td>
</tr>
<tr>
<td>亚太（孟买）</td>
<td>ktv-api-bom.zego.im</td>
</tr>
<tr>
<td>东南亚（新加坡）</td>
<td>ktv-api-sgp.zego.im</td>
</tr>
<tr>
<td>统一接入地址（不区分区域）</td>
<td>ktv-api.zego.im</td>
</tr>
</tbody></table>


### 通信协议

ZEGO 服务端 API 的所有接口均通过 HTTPS 进行通信，提供安全的通信服务。

### 请求方法

ZEGO 服务端 API 支持以下 HTTP 请求方法：

- GET
- POST


<Note title="说明">

所有请求参数（包括公共参数和业务参数）统⼀放在 Query，使⽤ GET 请求方法。特殊复杂 API 的业务参数放在 Body，使用 POST 请求方法。
</Note>


## 公共参数


本节介绍了开发者调用 ZEGO 服务端 API 时使用的公共参数，包含了公共请求参数和公共返回参数。

### 公共请求参数

公共请求参数是每个接口都需要使用到的请求参数。

<table>
  
  <tbody><tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
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
    <td>签名版本号，默认值为 2.0 。</td>
  </tr>
  <tr>
    <td>Timestamp</td>
    <td>Int64</td>
    <td>是</td>
    <td>Unix 时间戳，单位为秒。最多允许 10 分钟的误差。</td>
  </tr>
  <tr>
    <td>UserId</td>
    <td>String</td>
    <td>是</td>
    <td>用户 ID。</td>
  </tr>
  <tr>
    <td>RoomId</td>
    <td>String</td>
    <td>否</td>
    <td>房间 ID，在以房间包月的场景下必传。</td>
  </tr>
  <tr>
    <td>VendorId</td>
    <td>Number</td>
    <td>是</td>
    <td><p>版权方 ID，取值范围：0、1、2、4。<b>请注意，不填写则默认为 0。</b></p><p>版权方的详细信息，请联系 ZEGO 商务人员咨询。</p></td>
  </tr>
  </tbody></table>


请求示例：

<Warning title="注意">

- 请勿直接拷贝下面的示例用于请求。
- `https://ktv-api.zego.im/?Action=GetPlaylistCategory` 需要替换为各接口文档“接口原型”章节中的请求地址。
- 各公共参数的取值请根据实际情况修改。

</Warning>


```
https://ktv-api.zego.im/?Action=GetPlaylistCategory
&AppId=1234567890
&Timestamp=1234567890
&Signature=Pc5WB8gokVn0xfeu%2FZV%2BiNM1dgI%3D
&SignatureVersion=2.0
&SignatureNonce=15215528852396
&UserId=221
&RoomId=123
&VendorId=0
```


### 公共返回参数

API 返回结果采用统一格式，返回的数据格式为 JSON。

每次调用接口，无论成功与否，都会返回公共参数。

<table>

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
    <td>请求结果的说明信息。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
</tbody>
</table>


返回示例：

```
{
    "Code": 0,
    "Message": "",
    "RequestId": "8411281679140263090",
    ......
}
```

<Content />


