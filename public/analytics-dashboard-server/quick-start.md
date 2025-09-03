
# 快速开始

- - -

## 简介

ZEGO 星图提供了多个服务端 API 接口，支持开发者向 ZEGO 服务端发送请求查询用户推拉流数据、地区数据和运营运营。开发者可以通过发起 HTTPS 网络请求，使用 GET 方法调用服务端 API，实现与 ZEGO 服务端的信息交互。

本文以 “如何调用一个服务端 API 接口” 为例，帮助开发者快速了解服务端 API 各类接口的使用方式。

## 前提条件

在开始调用服务端 API 接口之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppId 和 ServerSecret，详情请参考 [控制台 - 项目管理](https://doc-zh.zego.im/article/12107) 中的“项目信息”。
- 已准备好调试服务端 API 接口的开发环境。
- 已准备好自己的客户端，搭建相关的业务场景。

## GET 请求示例代码

ZEGO 提供多种编程语言的示例代码，开发者可根据实际情况进行参考。以 [查询业务规模](/analytics-dashboard-server/operation-data/get-biz-usage) 接口，向 ZEGO 服务端发送 GET 请求为例：

<CodeGroup>
```go Go
package main

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"
)

//请将 AppId 修改为你的 AppId，AppId 为 uint32
//举例：1234567890
var appId uint32 = 1234567890

//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
//举例："abcde1234aaaaaaaabbbbbbb"
var serverSecret = 

func main() {
	queryParams := url.Values{}
	startDate := "20250110"
	endDate := "20250112"
	metrics := "publish_count"
	queryParams.Add("StartDate", startDate)
	queryParams.Add("EndDate", endDate)
    queryParams.Add("Metrics[]", "publish_count")
    queryParams.Add("Metrics[]", "view_count")

	timestamp := time.Now().Unix()
    // 生成16进制随机字符串(16位)
	nonce := make([]byte, 8)
	rand.Read(nonce)
	hexNonce := hex.EncodeToString(nonce)
    // 生成签名
	signature := generateSignature(appId, serverSecret, hexNonce, timestamp)
	authParams := url.Values{}
	authParams.Set("AppId", fmt.Sprintf("%d", appId))
    //公共参数中的随机数和生成签名的随机数要一致
	authParams.Set("SignatureNonce", hexNonce)
	authParams.Set("SignatureVersion", "2.0")
    //公共参数中的时间戳和生成签名的时间戳要一致
	authParams.Set("Timestamp", fmt.Sprintf("%d", timestamp))
	authParams.Set("Signature", signature)
	// analytics-api.zego.im 表示请求的是星图服务端 API
    // 以下示例可调用 "GetBizUsage" API 查询指定时间段内每日的实时音视频数据统计
	addr := fmt.Sprintf("https://analytics-api.zego.im/?Action=GetBizUsage&%s&%s", authParams.Encode(), queryParams.Encode())
	rsp, err := http.Get(addr)
	if err != nil {
		fmt.Printf("http.Get err:%+v", err)
		return
	}
	defer rsp.Body.Close()
	body, err := ioutil.ReadAll(rsp.Body)
	if err != nil {
		fmt.Printf("ioutil.ReadAll err:%+v", err)
		return
	}
	fmt.Printf("body:%+v", string(body))
}

// 生成签名
// Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
func generateSignature(appId uint32, serverSecret, signatureNonce string, timeStamp int64) string {
	data := fmt.Sprintf("%d%s%s%d", appId, signatureNonce, serverSecret, timeStamp)

	h := md5.New()
	h.Write([]byte(data))
	return hex.EncodeToString(h.Sum(nil))
}
```

```python Python
# -*- coding: UTF-8 -*-
import hashlib
import secrets
import time


from urllib.parse import urlencode

import requests

# 生成签名
# Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
def GenerateSignature(appId, signatureNonce, serverSecret, timestamp):
    str1 = str(appId) + signatureNonce + serverSecret + str(timestamp)
    hash = hashlib.md5()
    hash.update(str1.encode("utf8"))
    signature = hash.hexdigest()
    return signature


if __name__ == '__main__':
    # 请将 appId 修改为你的 AppId，AppId 为 数字
    # 举例：1234567890
    appId = 1234567890
    # 请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
    # 举例："abcde1234aaaaaaaabbbbbbb"
    serverSecret = 
    # 生成随机数
    signatureNonce = secrets.token_hex(8)
    
    timestamp = int(time.time())
    # 生成签名
    sig = GenerateSignature(appId, signatureNonce, serverSecret, timestamp)

    # 以下示例可调用 "GetBizUsage" API 查询指定时间段内每日的实时音视频数据统计
    par = {
        "Action": "GetBizUsage",
        "AppId": appId,
        "Signature": sig,
        "SignatureNonce": signatureNonce, # 公共参数中的时间戳和生成签名的时间戳要一致
        "SignatureVersion": "2.0",
        "Timestamp": timestamp, # 公共参数中的时间戳和生成签名的时间戳要一致
        "StartDate": "20250110"
        "EndDate": "20250112"
        "Metrics[]": "publish_count"
        "Metrics[]": "view_count"
    }
    url = 'https://analytics-api.zego.im/'
    req = requests.get(url, params=par)
    print("Url: ", req.url)
    print("StatusCode: ", req.status_code)
    print("Respone: ", req.text)
```

```java Java
package org.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

public class GetBizUsage {

    public static void main(String[] args) {
        // 查询业务规模
        getBizUsage();
    }

    /**
     * 测试查询业务规模
     */
    public static void getBizUsage() {
        // 请填写查询的起始日期
        String startDate = "20250110";
        // 请填写查询的起始日期
        String endDate = "20250112";
        // 请填写你从控制台获取的APP ID,
        // 举例：1234567890L，APP_ID为 Long 型
        Long APP_ID = 1234567890L;
        // 请填写你从控制后台获取的SERVER SECRET，
        // 举例："abcde1234aaaaaaaabbbbbbb"
        String SERVER_SECRET = ;
        // 生成16进制随机字符串(16位)
        byte[] bytes = new byte[8];
        SecureRandom sr = new SecureRandom();
        sr.nextBytes(bytes);
        String signatureNonce = bytesToHex(bytes);
        // 设定时间戳
        long timestamp = System.currentTimeMillis() / 1000L;

        // 生成签名Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
        String signatue = generateSignature(APP_ID, signatureNonce, SERVER_SECRET, timestamp);

        // 组装请求URL
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("Action", "GetBizUsage");
        params.put("StartDate", startDate);
        params.put("EndDate", endDate);
        // 请填写需要查询的指标
        params.put("Metrics[]", "publish_count");
        params.put("Metrics[]", "view_count");
        params.put("AppId", APP_ID);
        // 公共参数中的随机数和生成签名的随机数要一致
        params.put("SignatureNonce", signatureNonce);
        // 公共参数中的时间戳和生成签名的时间戳要一致
        params.put("Timestamp", timestamp);
        params.put("Signature", signatue);
        params.put("SignatureVersion", "2.0");
        String url = buildAPIUrl("https://analytics-api.zego.im/", params);

        String result = sendGet(url);
        System.out.println(result);
    }

    /**
     * 生成签名
     * @param appId 应用 AppId
     * @param signatureNonce 签名随机码
     * @param serverSecret 服务端API密钥
     * @param timestamp 签名时间戳
     * @return 生成的签名字符串
     */
    public static String generateSignature(long appId, String signatureNonce, String serverSecret, long timestamp){
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

    /**
     * 字节数组转16进制
     * @param bytes 需要转换的byte数组
     * @return 转换后的Hex字符串
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

    /**
     * 发送HTTP-GET请求
     * @param httpurl 请求路径
     * @return 响应内容
     */
    public static String sendGet(String httpurl) {
        HttpURLConnection connection = null;
        InputStream is = null;
        BufferedReader br = null;
        String result = null;// 返回结果字符串
        try {
            // 创建远程url连接对象
            URL url = new URL(httpurl);
            // 通过远程url连接对象打开一个连接，强转成httpURLConnection类
            connection = (HttpURLConnection) url.openConnection();
            // 设置连接方式：get
            connection.setRequestMethod("GET");
            // 设置连接主机服务器的超时时间：15000毫秒
            connection.setConnectTimeout(15000);
            // 设置读取远程返回的数据时间：60000毫秒
            connection.setReadTimeout(60000);
            // 发送请求
            connection.connect();
            // 通过connection连接，获取输入流
            if (connection.getResponseCode() == 200) {
                is = connection.getInputStream();
                // 封装输入流is，并指定字符集
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                // 存放数据
                StringBuffer sbf = new StringBuffer();
                String temp = null;
                while ((temp = br.readLine()) != null) {
                    sbf.append(temp);
                    sbf.append("\r\n");
                }
                result = sbf.toString();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            if (null != br) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != is) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            connection.disconnect();// 关闭远程连接
        }
        return result;
    }
    /**
     * 组装API地址字符串
     * @param url API地址
     * @param params 请求参数
     * @return 组装好的API地址字符串
     */
    public static String buildAPIUrl(String url, Map<String, Object> params) {
        if(params.isEmpty()) {
            return url;
        }
        StringBuffer buffer = new StringBuffer(url).append("?");
        for(String key : params.keySet()) {
            buffer.append(key).append("=").append(params.get(key)).append("&");
        }
        String apiurl = buffer.toString();
        if(apiurl.endsWith("&")) {
            return apiurl.substring(0, apiurl.length()-1);
        } else {
            return apiurl;
        }
    }

}
```

```php PHP
<?php
/**
 * 查询业务规模的最简示例代码
 */

//请将 appId 修改为你的 AppId
//举例：1234567890
$appId = 1234567890;
//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 字符串
//举例："1234567890bbc111111da999ef05f0ee"
$serverSecret = ;

//生成签名
//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
function GenerateSignature($appId, $signatureNonce, $serverSecret, $timeStamp){
    $str = $appId . $signatureNonce . $serverSecret . $timeStamp;
    //使用PHP中标准的MD5算法，默认返回32字符16进制数
    return md5($str);
}

//取随机字符串并转换为十六进制值
$signatureNonce = bin2hex(random_bytes(8));

//取毫秒级时间戳
list($msec, $sec) = explode(' ', microtime());
$msecTime = (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
//对$msecTime四舍五入取到秒级时间戳
$timeStamp = round($msecTime/1000);
// 生成签名
// 生成签名时用到的 Timestamp 要和url参数中的 Timestamp一致，生成签名时用到的 SignatureNonce 也要和url参数中的 SignatureNonce 一致
$sig = GenerateSignature($appId, $signatureNonce, $serverSecret, $timeStamp);

//以下示例可调用 "GetBizUsage" API 查询业务规模
$url = "https://analytics-api.zego.im/?Action=GetBizUsage&StartDate=20250110&EndDate=20250112&Metrics[]=publish_count&Metrics[]=play_count&AppId=$appId&SignatureNonce=$signatureNonce&Timestamp=$timeStamp&Signature=$sig&SignatureVersion=2.0&IsTest=false";

//使用curl库
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//设置请求连接超时时间,单位：秒
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
$response = curl_exec($ch);
curl_close($ch);
//请求的url
echo "Url: " . $url ."\r\n";
//返回的结果
echo "response:" . $response;
```

```js Node.js
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
</CodeGroup>

## 使用流程

开发者可以通过以下流程，快速向 ZEGO 服务端发起请求：

1. 开发者的服务端首先确认请求的 URL 地址；
2. 根据签名生成规则，获取签名信息；
3. 开发者的服务端配置公共请求参数；
4. 配置 API 相关业务参数；
5. 开发者的服务端通过 URL 地址，携带请求信息（包含业务参数、签名信息等），访问 ZEGO 服务端；
6. ZEGO 服务端返回响应信息。


我们以 API 接口 [查询业务规模](/analytics-dashboard-server/operation-data/get-biz-usage)，向 ZEGO 服务端发送 GET 请求为例，详细介绍使用流程。

### 1 确认 URL 地址

ZEGO 服务端根据不同的 URL 地址区分不同的请求。因此，开发者的服务端访问 ZEGO 服务端，请先到对应接口文档中获取请求 URL 地址。

以下为 [查询业务规模](/analytics-dashboard-server/operation-data/get-biz-usage) 的 URL 地址：

```txt
https://analytics-api.zego.im/?Action=GetBizUsage
```

其中：
- https：指定了请求通信协议。
- analytics-api.zego.im：指定了 ZEGO 服务端的接入地址，其中 `analytics` 代表使用的产品是星图，详见 [调用方式 - 请求结构 - 接入地址](/analytics-dashboard-server/access-server-apis#接入地址)。
- Action=GetBizUsage：指定了要调用的 API 接口为 `GetBizUsage`。


### 2 生成签名信息

为保证 API 的安全调用，ZEGO 服务端会对每个 API 的访问请求进行身份验证。开发者在调用 API 时，都需要在请求中包含签名 Signature 信息。

开发者可以参考 [调用方式 - 签名机制](/analytics-dashboard-server/access-server-apis#签名机制) 中的各语言示例代码，使用本文 [前提条件](#前提条件) 获取到的 AppId 和 ServerSecret，生成自己的签名信息。


### 3 配置公共请求参数

开发者调用每个 ZEGO 服务端 API 前，需要先配置 API 的公共请求参数。

公共请求参数，是指每个接口都需要使用到的请求参数，包含了 AppId、Signature（指 [2 生成的签名信息](#2-生成签名信息)）、SignatureNonce（随机字符串）、Timestamp（时间戳）等参数，请根据实际情况修改。公共参数的具体介绍，请参考 [调用方式 - 公共参数](/analytics-dashboard-server/access-server-apis#公共参数)。

```txt
https://analytics-api.zego.im/?Action=GetBizUsage&AppId=1234567890&SignatureNonce=15215528852396&Timestamp=1234567890&Signature=Pc5WB8gokVn0xfeu%2FZV%2BiNM1dgI%3D&SignatureVersion=2.0&IsTest=false
```

开发者可以在 [服务端 API 校验](https://doc-zh.zego.im/server-link-checker) 页面中，输入 URL 地址，验证签名信息、公共参数、以及 URL 格式是否合法。

### 4 配置 API 相关业务参数

配置完公共参数后，再去配置 API 相关的业务参数，设定所需的目标操作。 

业务参数的具体介绍，请参考 [请求参数](/analytics-dashboard-server/operation-data/get-biz-usage#请求参数)。

### 5 开发者的服务端发起请求 

以上配置完成后，开发者的服务端可以通过 URL 地址，向 ZEGO 服务端发送请求。

请求示例如下：

```
//该请求为获取从 20250110 至 20250112 期间的推流累计和拉流累计
https://analytics-api.zego.im/?Action=GetBizUsage
&StartDate=20250110
&EndDate=20250112
&Metrics[]=publish_count
&Metrics[]=play_count
&<公共请求参数>
```

### 6 ZEGO 服务端响应请求

ZEGO 服务端接收到开发者的请求信息后，返回响应的信息。

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

返回信息字段中，如果 Code 为 “0” 表示访问成功，即可查看到房间内的成员列表；如果不为 “0”，请参考 [全局返回码](/analytics-dashboard-server/return-codes) 处理。

至此，开发者的服务端和 ZEGO 服务端就完成了一次信息交互。
