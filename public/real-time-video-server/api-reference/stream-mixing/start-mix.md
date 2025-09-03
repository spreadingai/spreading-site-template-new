# 开始混流

---

## 简介

本文介绍如何调用服务端 API 接口，开始/更新混流任务。

客户端的混流功能介绍请参考 [多路混流](/real-time-video-android-java/live-streaming/stream-mixing)，相关回调请参考 [混流开始回调](https://doc-zh.zego.im/article/19682) 和 [混流结束回调](https://doc-zh.zego.im/article/19684)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoExpressEngine/mixstream.png" /></Frame>

## 前提条件

在实现混流之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppId 和 ServerSecret，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在 [ZEGO 控制台](https://console.zego.im) 自助接入服务开通"混流"服务权限，详情请参考 [控制台 - 服务配置 - 混流](/console/service-configuration/enable-stream-mixing-service)，或联系 ZEGO 技术支持开通。
- 已通过开发者自己的客户端，在房间内发起推拉流，详情请参考 [实现视频通话](/real-time-video-android-java/quick-start/implementing-video-call)。

## 示例代码

ZEGO 提供多种编程语言的示例代码，以下示例代码为"将两条音视频流（stream1、stream2）进行混流，混合输出到一条流（stream3）"：


<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/startMix_layout.jpg" /></Frame>

<Accordion title="开始混流（Go）" defaultOpen="false">
```go
package main

import (
	"bytes"
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"time"
)
// rtc-api.zego.im 表示使用的产品是云通讯产品，包括了实时音视频（Express Video）、实时音频（Express Audio）、低延迟直播（L3）
const DOMAIN = "https://rtc-api.zego.im"

var (
	//请将 appId 修改为你的 appId，appid 为 uint32
	//举例：1234567890
	AppId uint32 = 1234567890
	//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
	Secret = ""
)

type MixStartRequest struct {
	Appid     uint64       `json:"Appid"`
	UserId    string       `json:"UserId"`
	Sequence  int64        `json:"Sequence"`
	MixInput  []*MixInput  `json:"MixInput"`
	MixOutput []*MixOutput `json:"MixOutput"`
	MixTaskId string       `json:"TaskId"`
}

type RectInfo struct {
	Top    int32 `json:"Top"`
	Left   int32 `json:"Left"`
	Bottom int32 `json:"Bottom"`
	Right  int32 `json:"Right"`
}

type MixInput struct {
	StreamId  string    `json:"StreamId"`
	RectInfo  *RectInfo `json:"RectInfo"`
}

type MixOutput struct {
	StreamId     string `json:"StreamId"`
	VideoBitrate int32  `json:"VideoBitrate"`
	Fps          int32  `json:"Fps"`
	Height       int32  `json:"Height"`
	Width        int32  `json:"Width"`
}

func main() {
	nonce := make([]byte, 8)
	rand.Read(nonce)
	hexNonce := hex.EncodeToString(nonce)
	ts := time.Now()
	signature := GenerateSignature(AppId, hexNonce, Secret, ts.Unix())
	value := url.Values{}
	value.Add("AppId", strconv.FormatUint(AppId, 10))
	value.Add("SignatureNonce", hexNonce)
	value.Add("Timestamp", strconv.FormatInt(ts.Unix(), 10))
	value.Add("Signature", signature)
	value.Add("Action", "StartMix")
	value.Add("SignatureVersion", "2.0")
	urlData, err := url.Parse(DOMAIN)
	if err != nil {
		fmt.Println(err)
		return
	}
	urlData.RawQuery = value.Encode()
	dataJson, _ := json.Marshal(GenerateStartMixData())
	req, err := http.NewRequest("POST", urlData.String(), bytes.NewBuffer(dataJson))
	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Close = true
	client := &http.Client{}
	r, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	if r.StatusCode != 200 {
		fmt.Printf("status code is:%v", r.StatusCode)
	}
	defer r.Body.Close()
	resp, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return
	}
	fmt.Println(string(resp))
	return
}

//以下示例为 将 streamId 为 "stream1" 的音视频流 与 streamId 为 "stream2" 的音视频流进行混流，混出 streamId 为 "stream3" 的音视频流
func GenerateStartMixData() *MixStartRequest {
	inputs := make([]*MixInput, 0)
	input1 := MixInput{
		StreamId: "stream1",
		RectInfo: &RectInfo{
			Top:    70,
			Left:   100,
			Bottom: 160,
			Right:  260,
		},
	}
	inputs = append(inputs, &input1)
	input2 := MixInput{
		StreamId: "stream2",
		RectInfo: &RectInfo{
			Top:    200,
			Left:   100,
			Bottom: 290,
			Right:  260,
		},
	}
	inputs = append(inputs, &input2)
	output := MixOutput{
		StreamId:     "stream3",
		VideoBitrate: 12000,
		Fps:          15,
		Height:       360,
		Width:        360,
	}
	outputs := append([]*MixOutput{}, &output)
	req := &MixStartRequest{
		Appid:     AppId,
		UserId:    "123",
		Sequence:  123,
		MixInput:  inputs,
		MixOutput: outputs,
		MixTaskId: "123",
	}
	return req
}

//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
func GenerateSignature(appid uint64, nonce string, appSecret string, timestamp int64) (signature string) {
	data := fmt.Sprintf("%d%s%s%d", appid, nonce, appSecret, timestamp)
	h := md5.New() //规定使用哈希算法中的MD5算法
	h.Write([]byte(data))
	//hex.EncodeToString(h.Sum(nil))输出16进制字符串
	return hex.EncodeToString(h.Sum(nil))
}
```
</Accordion>


<Accordion title="开始混流（Python）" defaultOpen="false">
```py
# -*- coding: UTF-8 -*-
import hashlib
import secrets
import time

# 生成签名
# Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
from urllib.parse import urlencode

import requests


def GenerateSignature(appId, signatureNonce, serverSecret, timestamp):
    str1 = str(appId) + signatureNonce + serverSecret + str(timestamp)
    hash = hashlib.md5()
    hash.update(str1.encode("utf8"))
    signature = hash.hexdigest()
    return signature


if __name__ == '__main__':
    # 请将 appId 修改为你的 appId，appid 为 数字
    # 举例：1234567890
    appId = 1234567890
    # 请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
    serverSecret = ""

    signatureNonce = secrets.token_hex(8)
    timestamp = int(time.time())
    sig = GenerateSignature(appId, signatureNonce, serverSecret, timestamp)

    # 以下示例 将 StreamId 为 "stream1" 的音视频流 与 StreamId 为 "stream2" 的音视频流进行混流，混出 StreamId 为 "stream3" 的音视频流
    par = {
        "Action": "StartMix",
        "AppId": appId,
        "Signature": sig,
        "SignatureNonce": signatureNonce,
        "SignatureVersion": "2.0",
        "Timestamp": timestamp,
        "IsTest": "False"
    }
    body = {
        'TaskId': '123',
        'Sequence': 123,
        'UserId': '123',
        'MixInput': [
            {
                'StreamId': 'stream1',
                'RectInfo': {
                    "Top": 70,
                    "Bottom": 160,
                    "Left": 100,
                    "Right": 260,
                },

            },
            {
                'StreamId': 'stream2',
                'RectInfo': {
                    "Top": 200,
                    "Bottom": 290,
                    "Left": 100,
                    "Right": 260,
                },
            }
        ],
        'MixOutput': [{
            'StreamId': 'stream3',
            'Width': 360,
            'Height': 360,
            'VideoBitrate': 12000,
            'Fps': 15
        }]
    }
    url = 'https://rtc-api.zego.im/'
    req = requests.post(url, params=par, json=body)
    print("Url: ", req.url)
    print("StatusCode", req.status_code)
    print("Respone:", req.text)
```
</Accordion>


<Accordion title="开始混流（Java）" defaultOpen="false">
```java
package org.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

/**
 * 请先引入 com.alibaba.fastjson，方便构建请求的 body 参数
 */
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class StartMix {

    //
    public static void main(String[] args) {
        // 获取房间内用户数目
        startMixStream();
    }

    /**
     * 发起混流
     */
    public static void startMixStream() {
        // 请填写你从控制台获取的APP ID,
        // 举例：1234567890L
        Long APP_ID = 1234567890L;
        // 请填写你从控制后台获取的 SERVER SECRET，
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
        //以下示例为 将 StreamId 为 "stream1" 的音视频流 与 StreamId 为 "stream2" 的音视频流进行混流，混出 StreamId 为 "stream3" 的音视频流
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("Action", "StartMix");
        params.put("AppId", APP_ID);
        params.put("SignatureNonce", signatureNonce);
        params.put("Timestamp", timestamp);
        params.put("Signature", signatue);
        params.put("SignatureVersion", "2.0");
        // rtc-api.zego.im 表示使用的产品是云通讯产品，包括了实时音视频（Express Video）、实时音频（Express Audio）、低延迟直播（L3）
        String url = buildAPIUrl("https://rtc-api.zego.im/", params);

        JSONObject body = new JSONObject()
                .fluentPut("TaskId", "123")
                .fluentPut("Sequence", 123)
                .fluentPut("UserId", "123");

        JSONArray mixInputList = new JSONArray();
        mixInputList.add(new JSONObject()
                .fluentPut("StreamId", "stream1")
                .fluentPut("RectInfo", new JSONObject()
                        .fluentPut("Top", 70)
                        .fluentPut("Bottom", 160)
                        .fluentPut("Left", 100)
                        .fluentPut("Right", 260)));
        mixInputList.add(new JSONObject()
                .fluentPut("StreamId", "stream2")
                .fluentPut("RectInfo", new JSONObject()
                        .fluentPut("Top", 200)
                        .fluentPut("Bottom", 290)
                        .fluentPut("Left", 100)
                        .fluentPut("Right", 260)));
        body.put("MixInput", mixInputList);

        JSONArray mixOutputList = new JSONArray();
        mixOutputList.add(new JSONObject()
                .fluentPut("StreamId", "stream3")
                .fluentPut("Width", 360)
                .fluentPut("Height", 360)
                .fluentPut("VideoBitrate", 12000)
                .fluentPut("Fps", 15));
        body.put("MixOutput", mixOutputList);

        String result = sendPost(url, body.toString());
        System.out.println(result);
    }

    /**
     * 生成签名
     * @param appId 应用APPID
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
     * 发送HTTP-POST请求
     * @param param 消息体参数
     * @return 响应内容
     */
    public static String sendPost(String httpUrl, String param) {
        HttpURLConnection connection = null;
        InputStream is = null;
        OutputStream os = null;
        BufferedReader br = null;
        String result = null;
        try {
            URL url = new URL(httpUrl);
            // 通过远程url连接对象打开连接
            connection = (HttpURLConnection) url.openConnection();
            // 设置连接请求方式
            connection.setRequestMethod("POST");
            // 设置连接主机服务器超时时间：15000毫秒
            connection.setConnectTimeout(15000);
            // 设置读取主机服务器返回数据超时时间：60000毫秒
            connection.setReadTimeout(60000);
            // 默认值为：false，当向远程服务器传送数据/写数据时，需要设置为true
            connection.setDoOutput(true);
            // 默认值为：true，当前向远程服务读取数据时，设置为true，该参数可有可无
            connection.setDoInput(true);
            // 设置传入参数的格式:请求参数应该是 name1=value1&name2=value2 的形式。
            connection.setRequestProperty("Content-Type", "application/json");
            // 建立连接
            connection.connect();
            // 通过连接对象获取一个输出流对象
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(),"UTF-8");
            writer.write(param);
            writer.flush();
            // 通过连接对象获取一个输入流，向远程读取
            if (connection.getResponseCode() == 200) {
                is = connection.getInputStream();
                // 对输入流对象进行包装:charset根据工作项目组的要求来设置
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                StringBuffer sbf = new StringBuffer();
                String temp = null;
                // 循环遍历一行一行读取数据
                while ((temp = br.readLine()) != null) {
                    sbf.append(temp);
                    sbf.append("\r");
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
            if (null != os) {
                try {
                    os.close();
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
            // 断开与远程地址url的连接
            connection.disconnect();
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
</Accordion>


<Accordion title="开始混流（PHP）" defaultOpen="false">
```php
<?php

/**
 * 发起开始混流的最简示例代码
 */

//请将 appId 修改为你的 appId
//举例：1234567890
$appId = 1234567890;
//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
$serverSecret = "";

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
$sig = GenerateSignature($appId, $signatureNonce, $serverSecret, $timeStamp);

//以下示例 将 StreamId 为 "stream1" 的音视频流 与 StreamId 为 "stream2" 的音视频流进行混流，混出 StreamId 为 "stream3" 的音视频流
$url = "https://rtc-api.zego.im/?Action=StartMix&AppId=$appId&SignatureNonce=$signatureNonce&Timestamp=$timeStamp&Signature=$sig&SignatureVersion=2.0&IsTest=false";

$body = [
    "TaskId"   => "123",
    "Sequence" => 123,
    "UserId"   => "123",
    "MixInput" => [
        [
            "StreamId" => "stream1",
            "RectInfo" => [
            "Top"    => 70,
                "Bottom" => 160,
                "Left"   => 100,
                "Right"  => 260,
            ],
        ],
        [
            "StreamId" => "stream2",
            "RectInfo" => [
            "Top"    => 200,
                "Bottom" => 290,
                "Left"   => 100,
                "Right"  => 260,
            ],
        ]
    ],
    "MixOutput" => [
        [
            "StreamId" => "stream3",
            "Width"    => 360,
            "Height"   => 360,
            "VideoBitrate" => 12000,
            "Fps"      => 15
        ]
    ]
];

$post_string = json_encode($body);

$ch = curl_init();

curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_POST, 1);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
//设置请求连接超时时间,单位：秒
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_string);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
    )
);
$response = curl_exec($ch);
curl_close($ch);

echo "Url:" . $url;
echo "\r\n";
echo "request body:" . $post_string;
echo "\r\n";
echo "response:" . $response;
```
</Accordion>


<Accordion title="开始混流（Node.js）" defaultOpen="false">
```js
const crypto = require('crypto');
const request = require('request');

//请将 appId 修改为你的 appId，appid 为 number
var appId = ;
//请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
var serverSecret = "";

//Signature=md5(AppId + SignatureNonce + ServerSecret + Timestamp)
function GenerateSignature(appId, signatureNonce, serverSecret, timeStamp) {
    const hash = crypto.createHash('md5'); //规定使用哈希算法中的MD5算法
    var str = appId + signatureNonce + serverSecret + timeStamp;
    hash.update(str);
    //hash.digest('hex')表示输出的格式为16进制
    return hash.digest('hex');
}

var signatureNonce = crypto.randomBytes(8).toString('hex');
var timeStamp = Math.round(Date.now() / 1000);
var sig = GenerateSignature(appId, signatureNonce, serverSecret, timeStamp)

//以下示例 将 StreamId 为 "stream1" 的音视频流 与 StreamId 为 "stream2" 的音视频流进行混流，混出 StreamId 为 "stream3" 的音视频流
var url = `https://rtc-api.zego.im/?Action=StartMix&AppId=${appId}&SignatureNonce=${signatureNonce}&Timestamp=${timeStamp}&Signature=${sig}&SignatureVersion=2.0&IsTest=false`
var body = {
    'TaskId': '123',
    'Sequence': 123,
    'UserId': '123',
    'MixInput': [
    {
        'StreamId': 'stream1',
        'RectInfo': {
            "Top": 70,
            "Bottom": 160,
            "Left": 100,
            "Right": 260,
        },
    },
    {
        'StreamId': 'stream2',
        'RectInfo': {
            "Top": 200,
            "Bottom": 290,
            "Left": 100,
            "Right": 260,
        },
    }
    ],
    'MixOutput': [{
        'StreamId': 'stream3',
        'Width': 360,
        'Height': 360,
        'VideoBitrate': 12000,
        'Fps': 15
    }]
}

request({
    url: url,
    method: 'POST',
    json: true,
    headers: {
        'content-type': 'application/json'
    },
    body: body
}, function (error, response, body) {
    console.log(error)
    console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
        console.log(body.Data)
    }
})
```
</Accordion>


## 接口原型

- 请求方法：POST

<Note title="说明">


  使用 POST 请求方法传递参数时：
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 "Content-type" 为 "application/json"。

</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StartMix`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒
- 请求示例：

    ```
    https://rtc-api.zego.im/?Action=StartMix
    &<公共请求参数>
    ```



## 参数介绍

为方便开发者快速使用体验混流功能，我们将此服务端 API 接口的请求参数，分类为"基础请求参数"和"全量请求参数"；其中：
- "基础请求参数"包含了"开始混流"接口中最基础的一些参数，开发者可以通过 [基础请求参数](https://doc-zh.zego.im/article/19595#基础请求参数)，快速实现最基本的音视频混流功能；
- "全量请求参数"包含了所有的参数。如果需要配置混流时的一些进阶功能（例如设置混流背景图片、设置背景颜色、设置扩展参数等），可以参考 [全量请求参数](https://doc-zh.zego.im/article/19595#全量请求参数)。

<Note title="说明">


测试环境下（详见 <a target="_blank" href="https://doc-zh.zego.im/article/19458#公共参数">调用方式</a> 中的 "公共参数" 中的 IsTest 的参数说明），`输入流`的流 ID 和`输出流`的流 ID：

- 如果是开发者自己输入的原始流 ID，需要加上 "zegotest-AppId-" 前缀，否则会导致混流失败（混流服务器拉不到输入流或拉不到混流输出流）。例如，开发者输入流 ID 为 "test"，在 AppId 为 "123456789" 的测试环境下，流 ID 应为 "zegotest-123456789-test"。
- 如果是通过 SDK 接口，或通过服务端 API 接口获取到的，此时不需要添加 "zegotest-AppId-" 的前缀。

</Note>




### 基础请求参数

以下仅展示了混流接口的部分请求参数，开发者可以配置参数，快速实现基础的混流功能；全部参数请参考 [全量请求参数](https://doc-zh.zego.im/article/19595#5_2)。

<Note title="说明">

以下所有的请求参数中、类型为 "String" 的参数，仅支持数字，英文字符 和 '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '\'', ',', '.', '\<', '>', '/', ''。

</Note>



| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | 任务 ID，混流任务的唯一标识。<br/><b>重复调用"开始混流"接口，传入相同的 TaskId，可以直接更新混流任务信息。</b> |
| UserId | String | 是 | 发起混流任务的用户 ID，由开发者自定义。<br/><b>同一个任务的用户 ID 需要一致，不同任务的用户 ID 需要保持不同。</b><br/>通过 UserId 可以实现混流任务的用户归属，也就是该用户才能更新或者停止对应 TaskId 的混流任务，该功能需要联系 ZEGO 技术支持开通。 |
| MixInput | Array of Object | 是 | 输入流信息，支持多个，默认上限为 9。如果有更多的需求，请联系 ZEGO 技术支持处理。 |
| └ StreamId | String | 是 | 混流输入流 ID，表示该流 ID 来自 RTC 服务。<br/><p>仅支持数字、英文字符和 "-"、"_"。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。<br/></b></p> |
| └ StreamUrl | String | 是 | <p>混流输入流 URL，支持 RTMP 和 HTTP-FLV 两种协议。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ RectInfo | Object | 是 | 输入流位置信息。输入流的位置参考如下：<frame caption="" height="auto" width="512"/><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/mixStream_Coordinate.png"/><ul><li><b>如果该参数下的字段（Top、Left、Bottom、Right）都不填写时，默认为纯音频混流。</b></li><li><b>如果输入流分辨率与对应输入流画布宽高不一致时，将参考 RenderMode 进行渲染。</b></li></ul>详情可见[RectInfo](#rectInfo)。 |
| MixOutput | Array of Object | 是 | 输出流信息：目前 1 个混流任务最多支持输出 4 路不同分辨率的视频流。<ul><li>同一混流任务输出多个不同分辨率的视频流时，建议第一个 Mixoutput 中的分辨率为最大分辨率。</li><li>同一混流任务输出多个不同分辨率的视频流时，其他分辨率按照第一个分辨率进行等比例缩放裁剪，建议输出等比例的不同分辨率。</li><li>同一混流任务输出多个不同分辨率的视频流时，如果帧率参数设置不一致，按照第一个 Mixoutput 的帧率进行帧率对齐，建议设置相同的帧率。</li><li>如需实现一路混流任务同时输出多个分辨率，请联系 ZEGO 技术支持开通 mutil_encode 后台参数。</li></ul>当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：`rtmp://xxxxxxxx`，且不能传入两个相同的混流输出的地址。 |
| └ StreamId | String | 是 | <p>输出流 ID。默认情况下表示混流输出至 RTC 或低延迟直播产品，也可联系 ZEGO 技术支持配置混流输出至 ZEGO 代理的 CDN 直播产品，生效范围为整个 AppId。如果希望控制指定流输出至 CDN 直播产品，则不能配置混流默认输出至 ZEGO 代理 CDN，应按需设置 StreamUrl。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ StreamUrl | String | 是 | <p>仅支持 RTMP 协议，表示混流输出至 CDN 直播服务，观众可以从 CDN 直播拉混流。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ VideoBitrate | Int | 是 | <p>视频码率，取值必须大于 0，单位为 bps。例如输入分辨率为 360*640 时，输出流的该参数设置为 1200000 bps。</p><p>纯音频混流时，推荐填写 1。支持混流过程中实时更新。<b>再次调用本接口，即可动态更新该参数。</b></p> |
| └ Fps | Int | 是 | 视频帧率，纯音频混流时，推荐填写 1。<b><ul><li>该参数在开始混流后，不支持动态更新。</li><li>混流输出的最大帧率默认限制在 20 帧以内，如果需要输出更大帧率，请联系 ZEGO 技术支持进行配置。</li></ul></b> |
| └ Width | Int | 是 | 宽，范围为 [0, 3000]，数值必须是 2 的倍数。纯音频混流时，推荐填写 1，支持混流过程中实时更新。再次调用本接口，即可动态更新该参数。 |
| └ Height | Int | 是 | 高，范围为 [0, 3000]，数值必须是 2 的倍数。纯音频混流时，推荐填写 1，支持混流过程中实时更新。再次调用本接口，即可动态更新该参数。 |

<a id="rectinfo"></a>
**RectInfo**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| Top | Int | 否 | 上边框。距离输出画布上边框的像素大小。<b>再次调用本接口，即可动态更新该参数。</b> |
| Left | Int | 否 | 左边框。距离输出画布左边框的像素大小。<b>再次调用本接口，即可动态更新该参数。</b> |
| Bottom | Int | 否 | 下边框。距离输出画布上边框的像素大小。<b>再次调用本接口，即可动态更新该参数。</b> |
| Right | Int | 否 | 右边框。距离输出画布左边框的像素大小。<b>再次调用本接口，即可动态更新该参数。</b> |



例如，混流输出流 ID 为 "stream3"，帧率为 15 fps，分辨率为 360*640，视频码率为 1200000 bps。其中两路输入流 "stream1" 和 "stream2" 的画面各占输出画布的一半。参数示例如下：

```json
{
    "TaskId": "2213699902971205739",
    "UserId": "123",
    "MixInput": [
        {
            "RectInfo": {
                "Bottom": 640,
                "Left": 0,
                "Right": 180,
                "Top": 0
            },
            "StreamId": "stream1"
        },
        {
            "RectInfo": {
                "Bottom": 640,
                "Left": 180,
                "Right": 360,
                "Top": 0
            },
            "StreamId": "stream2"
        }
    ],
    "MixOutput": [
        {
            "Fps": 15,
            "Width": 360,
            "Height": 640,
            "StreamId": "stream3",
            "VideoBitrate": 1200000
        }
    ]
}
```

### 全量请求参数

下表包含了开始混流接口的所有参数，开发者如果需要在混流过程中，设置一些进阶功能（例如：设置水印、背景图片，设置扩展参数等），请参考以下内容。

***此接口中只有部分参数在开始混流后支持动态更新，未标注的则不支持动态更新，详情请参考下表中的参数描述。***

| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | 任务 ID，混流任务的唯一标识。<br/><b>重复调用“开始混流”接口，传入相同的 TaskId，可以直接更新混流任务信息。<b><br/></b></b> |
| UserId | String | 是 | 发起混流任务的用户 ID，由开发者自定义。<br/><b>同一个任务的用户 ID 需要一致，不同任务的用户 ID 需要保持不同。</b><br/>通过 UserId 可以实现混流任务的用户归属，也就是该用户才能更新或者停止对应 TaskId 的混流任务，该功能需要联系 ZEGO 技术支持开通。 |
| MixInput | Array of Object | 是 | 输入流信息，支持多个，默认上限为 9。如果有更多的需求，请联系 ZEGO 技术支持处理。 |
| └ StreamId | String | 是 | <p>混流输入流 ID，表示该流 ID 来自 RTC 服务。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ StreamUrl | String | 是 | <p>混流输入流 URL，支持 RTMP 和 HTTP-FLV 两种协议。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ RectInfo | Object | 是 | 输入流位置信息。输入流的位置参考如下：<frame caption="" height="auto" width="512"/><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/mixStream_Coordinate.png"/><ul><li><b>如果该参数下的字段（Top、Left、Bottom、Right）都不填写时，默认为纯音频混流。</b></li><li><b>如果输入流分辨率与对应输入流画布宽高不一致时，将参考 RenderMode 进行渲染。</b></li></ul>详情可见[RectInfo](#rectInfo)。 |
| └ Image | Object | 否 | <p>为该输入流设置占位图片，用于覆盖视频内容；使用图片时，不显示视频内容。</p><p><b>设置的图片，将复用 RectInfo 配置的位置信息。</b></p>详情可见[Image](#image)。 |
| └ ContentControl | Int | 否 | <p>内容控制。</p><ul><li>0：取音视频，默认值。</li><li>1：取音频。</li><li>2：取视频。</li></ul><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| └ SoundLevelId | UInt32 | 否 | <p>声浪 ID。<b>参数 SoundLevel（混流声浪）取值为 "1" 时，此参数必填。</b></p> |
| └ Volume | Int | 否 | 音量，取值范围 [0, 200]，默认为 100。 |
| └ Label | Object | 否 | 文字水印参数，详情可见[Label](#label)。 |
| └ RenderMode | Int | 否 | <p>混流输入填充模式。</p><ul><li>0：裁剪模式，默认值，画面会被裁剪为设置的布局大小。</li><li>1：填充模式，<b>设置的 RectInfo 参数失效</b>，输入画面完整展示，布局会调整适配输入流宽高比。</li></ul><frame caption="" height="auto" width="512"/><img src="https://doc-media.zego.im/sdk-doc/Pics/server_v2/RenderMode.png"/> |
| └ UID | String | 否 | 输入流对应的用户 ID, 会出现在SEI中，长度应该小于 64 字节。使用此字段前，需联系 ZEGO 技术支持开启配置 `enable_layout_in_idr`。 |
| MixOutput | Array of Object | 是 | 输出流信息：目前 1 个混流任务最多支持输出 4 路不同分辨率的视频流。<ul><li>同一混流任务输出多个不同分辨率的视频流时，建议第一个 Mixoutput 中的分辨率为最大分辨率。</li><li>同一混流任务输出多个不同分辨率的视频流时，其他分辨率按照第一个分辨率进行等比例缩放裁剪，建议输出等比例的不同分辨率。</li><li>同一混流任务输出多个不同分辨率的视频流时，如果帧率参数设置不一致，按照第一个 Mixoutput 的帧率进行帧率对齐，建议设置相同的帧率。</li><li>如需实现一路混流任务同时输出多个分辨率，请联系 ZEGO 技术支持开通 mutil_encode 后台参数。</li></ul>当输出目标为 URL 格式时，目前只支持 RTMP URL 格式：`rtmp://xxxxxxxx`，且不能传入两个相同的混流输出的地址。 |
| └ StreamId | String | 是 | <p>输出流 ID。默认情况下表示混流输出至 RTC 或低延迟直播产品，也可联系 ZEGO 技术支持配置混流输出至 ZEGO 代理的 CDN 直播产品，生效范围为整个 AppId。如果希望控制指定流输出至 CDN 直播产品，则不能配置混流默认输出至 ZEGO 代理 CDN，应按需设置 StreamUrl。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ StreamUrl | String | 是 | <p>仅支持 RTMP 协议，表示混流输出至 CDN 直播服务，观众可以从 CDN 直播拉混流。</p><p><b>StreamId 和 StreamUrl 二者取其一即可，若同时填写 StreamId 和 StreamUrl，则 StreamUrl 生效。</b></p> |
| └ VideoBitrate | Int | 是 | <p>视频码率，取值必须大于 0，单位为 bps。例如输入分辨率为 360*640 时，输出流的该参数设置为 1200000 bps。</p><p>纯音频混流时，推荐填写 1。支持混流过程中实时更新。<b>再次调用本接口，即可动态更新该参数。</b></p> |
| └ VideoEncId | Int | 否 | <p>输出视频编码。</p><ul><li>0：H264，默认值</li><li>2：VP8</li><li>3：H265</li><li>4：H264 SVC，分层视频编码</li></ul><p>请注意：</p><ul><li><b>该参数在开始混流后，不支持动态更新。</b></li><li>支持不同输出流使用不同的视频编码格式，上限为两种。<b>使用视频多编码格式时，请先联系 ZEGO 技术支持开通 mutil_encode 后台参数。</b></li><li><b>取值为 2 或者 3 时，</b>如需使用相应的编码格式，请联系 ZEGO 技术支持。</li><li><b>取值为 4 时，需要联系 ZEGO 技术支持开通 mutil_encode 后台参数、并填写 ExtraLayers 字段，H264 SVC 格式才会生效。</b>如果混流输出至 CDN 直播服务，输出流自动降级为 H264 格式。</li></ul> |
| └ Fps | Int | 是 | 视频帧率，纯音频混流时，推荐填写 1。<b><ul><li>该参数在开始混流后，不支持动态更新。</li><li>混流输出的最大帧率默认限制在 20 帧以内，如果需要输出更大帧率，请联系 ZEGO 技术支持进行配置。</li></ul></b> |
| └ Width | Int | 是 | 宽，范围为 [0, 3000]，数值必须是 2 的倍数。纯音频混流时，推荐填写 1，支持混流过程中实时更新。再次调用本接口，即可动态更新该参数。 |
| └ Height | Int | 是 | 高，范围为 [0, 3000]，数值必须是 2 的倍数。纯音频混流时，推荐填写 1，支持混流过程中实时更新。再次调用本接口，即可动态更新该参数。 |
| └ AudioCodec | Int | 否 | <p>音频编码及采样率。如需修改采样率，请联系 ZEGO 技术支持配置。</p><ul><li>0：HE-AAC，采样率：44100 kHz，默认值。</li><li>1：AAC-LC，采样率：44100 kHz。</li><li>2：MP3，采样率：44100 kHz。</li><li>3：OPUS，采样率：48000 kHz。</li></ul><Warning title="注意">如果使用 CDN 录制，音频编码请选择 AAC-LC。这是因为部分浏览器（如 Google Chrome 和 Microsoft Edge）不兼容 HE-AAC 音频编码格式，从而导致录制文件无法播放。</Warning> |
| └ AudioBitrate | Int | 否 | 混流输出音频码率，不填时默认值为 48000，单位为 bps。 |
| └ SoundChannel | Int | 否 | <p>输出音频声道数，优先级比全局参数高。</p><ul><li>1：单声道，默认值。</li><li>2：双声道。</li></ul> |
| └ ExtraLayers | Array of Object | 否 | 分层视频编码的各层参数。<b>当 VideoEncId 取值为 4（H264 SVC）时，该字段必填，且长度必须为 1。</b>详情可见[ExtraLayers](#extraLayers)。 |
| └ LowBitrateHD | Int | 否 | <p>是否开启"高清低码"功能。</p><ul><li>0：默认值，不开启。</li><li>1：开启。</li></ul><p>目前"高清低码"功能需要联系 ZEGO 技术支持开通权限，且仅在 VideoEncId 取值为 3（H265）时生效。</p> |
| └ TargetRoom | Object | 否 | 将输出流增加到指定房间的流列表中。<ul><li>每条输出流只支持加入一个房间，一旦添加，混流过程中不支持动态更新房间，但一个房间可以有多条输出流。</li><li>开始混流时，若加入房间失败，则该混流任务失败，需开发者重新发起混流任务。</li><li>房间关闭时，房间内所有流状态将关闭，但混流任务不会停止。</li><li>RoomId 和 UserId 不能为空。</li></ul>详情可见[TargetRoom](#targetRoom)。 |
| Sequence | Int | 否 | <p>混流请求的序列号，用于保证时序，同个任务的参数修改需要保证序列号的递增。例如："Sequence": 1。</p><p><b>如果开启了混流任务的时序控制（如有需要，请联系 ZEGO 技术支持开启），此参数必填。</b></p> |
| RoomId | String | 否 | 房间 ID。 |
| UserData | String | 否 | <p>自定义用户数据，使用时需要对此参数内容进行 base64 编码。长度限制为 4000 字节，建议不超过 850 字节。</p><p>自定义的用户数据将作为 SEI 信息传输给拉流方，拉流方可通过监听客户端的 <a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-player-sync-recv-sei-stream-id" target="_blank">onPlayerSyncRecvSEI</a> 回调获取该数据。</p><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| SoundLevel | Int | 否 | <Warning title="注意">在视频场景中，不建议打开声浪开关，否则web端拉HLS协议的流可能会出现兼容性问题</Warning><p>混流声浪，指混流的音量大小。支持混流过程中实时更新。</p><ul><li>0：不开启，默认值。</li><li>1：开启。</li></ul><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| ByPass | Int | 否 | <p>单流透传开关，即输入流就一个时是否按输出参数重新编码，该功能需要联系 ZEGO 技术支持开通。</p><ul><li>0：不启用，默认值。</li><li>1：启用。</li></ul> |
| SoundChannel | String | 否 | <p>输出音频声道数，当没有指定输出流时使用该配置。</p><ul><li>1：单声道，默认值。</li><li>2：双声道。</li></ul> |
| BackgroundImage | String | 否 | <p>背景图，支持 JPG 和 PNG 格式。支持以下 2 种使用方式：</p><ul><li>URI：将图片提供给 ZEGO 技术支持进行配置，配置完成后会提供图片 URI，例如：preset-id://xxx.jpg。</li><li>URL：支持 HTTP/HTTPS 协议。图片大小需限制在 5MB 以内，超过 5MB 设置将不会生效。</li></ul><p><b>再次调用本接口，即可动态更新该参数。</b></p> |
| BackGroundColorHex | String | 否 | 混流背景颜色，颜色值对应 RGBA 为 0xRRGGBBAA。目前不支持设置背景色的透明度，可以将 0xRRGGBBAA 中的 AA 设置为 00 即可。例如，RGB 颜色为 #87CEFA，此参数对应取值为 0x87CEFA00。<b>再次调用本接口，即可动态更新该参数。</b> |
| WaterMark | Object | 否 | 水印配置。 |
| └ Image | String | 否 | 水印图片，支持 JPG 和 PNG 格式。使用方式同背景图 BackgroundImage。<b>再次调用本接口，即可动态更新该参数。</b> |
| └ RectInfo | Object | 否 | 水印位置信息。<b>再次调用本接口，即可动态更新该参数。</b>详情可见[RectInfo](#rectInfo)。 |
| CheckImageMode | Int | 否 | <p>控制背景图（BackgroundImage）、输入流占位图（MixInput.Image.Url）、水印图片（WaterMark.Image）等 3 个图片参数校验失败时，能否正常发起混流任务。</p><ul><li>0：严格校验 3 个图片参数的限制条件，即必须满足参数原有的 "支持协议和格式"、"图片大小"、"图片资源请求成功" 等规则，才能正常发起混流，默认值。</li><li>1：仅校验 3 个图片参数的图片路径 URI/URL 格式，即图片路径格式正确、但图片资源请求失败、或图片大小超出限制时，仍能正常发起混流。</li><li>2：不校验 3 个图片参数的任何限制条件，即图片路径格式错误、图片资源请求失败、或图片大小超出限制时，仍能正常发起混流。</li></ul><p><b>该参数仅对图片参数设置错误时、能否正常发起混流任务有影响；图片本身是否能正常生效，仍需满足对应参数的所有规则。</b></p> |
| ExPara | Array of Object | 否 | 拓展参数，根据实际情况填入，常规任务可不填。 |
| └ Key | String | 否 | key 值。 |
| └ Value | String | 否 | value 值。 |
| AlignmentType | Int | 否 | <p>控制播放的实时音视频流是否需要按照 NTP（网络时间）精准对齐后进行混流。<b>此参数主要应用于 KTV 场景中，会增加一定的混流延时；非 KTV 类似场景，不建议设置此参数。</b></p><ul><li>0：不对齐，默认值。</li><li>1：指定流对齐。</li><li>2：所有流强制对齐。</li></ul> |
| RecvBufferLevel | Int | 否 | 用于控制拉流最小缓冲时间(单位：毫秒)，取值范围 [0,4000]，默认最小缓冲时间为0。 |
| WaitVideoInput | Int | 否 | 是否拉到视频数据后才开始推流：<ul><li>0：否（默认）；</li><li>1：是，如果10s 内不能拉到视频数据，混流任务将自动结束。</li></ul> |

<a id="rectinfo"></a>
**RectInfo**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| Top | Int | 否 | 上边框。距离输出画布上边框的像素大小。 |
| Left | Int | 否 | 左边框。距离输出画布左边框的像素大小。 |
| Bottom | Int | 否 | 下边框。距离输出画布上边框的像素大小。 |
| Right | Int | 否 | 右边框。距离输出画布左边框的像素大小。 |

<a id="image"></a>
**Image**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| Url | String | 否 | <p>图片路径，支持 JPG 和 PNG 格式。支持以下 2 种使用方式：</p><ul><li>URI：将图片提供给 ZEGO 技术支持进行配置，配置完成后会提供图片 URI，例如：preset-id://xxx.jpg。</li><li>URL：支持 HTTP/HTTPS 协议，图片大小需限制在 1MB 以内。</li></ul><p><b>本参数为空时显示视频内容，否则即显示对应图片。</b><b>再次调用本接口，即可动态更新该参数。</b></p> |
| DisplayMode | Int | 否 | <p>图片显示模式。</p><ul><li>0：默认值。当 URL 不为空时，覆盖视频内容，显示图片。</li><li><p> 1：根据摄像头状态，判断是否显示图片：</p> <ul><li>摄像头关闭，显示图片。</li><li>摄像头打开，显示视频内容（无需手动清空 URL 参数）。</li></ul></li><li>2：根据输入流是否为空流，判断是否显示图片。输入流连续3秒为空流时，显示图片。</li></ul> |

<a id="label"></a>
**Label**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| Text | String | 是 | 水印内容。最大长度为 100 个中文字符或 300 个英文字符。 |
| Left | Int | 是 | 文字水印位置，相对输入流左边框的距离。 |
| Top | Int | 是 | 文字水印位置，相对输入流上边框的距离。 |
| Font | Object | 是 | 文字参数。 |
| FontType | Int | 是 | <p>字体类型。只能设置一种类型，且不支持在混流中途修改，也不支持不同的输入流有不同的字体。</p><ul><li>0：思源黑体 Regular，默认值。</li><li>1：阿里巴巴普惠体。</li><li>2：庞门正道标题体。</li><li>3：站酷快乐体。</li></ul> |
| FontSize | Int | 否 | 字体大小，取值范围 [12, 100]，默认为 24。 |
| FontColor | Int | 否 | <p>字体颜色，默认为 RGB(255, 255, 255)，即白色。</p><p>该参数计算公式为 R + G × 256 + B × 65536，其中 R（红）、G（绿）、B（蓝）的取值范围 [0, 255]。</p> |
| Transparency | Int | 否 | <p>字体透明度，取值范围 [0, 100]，默认为 100。</p><p>参数取值越大越透明，即 0 表示不透明，100 表示完全透明。</p> |
| BorderColor | Int | 否 | <p>字体轮廓颜色，默认无字体轮廓，填写该参数后字体会有轮廓。</p><p>该参数计算公式为 R + G × 256 + B × 65536，其中 R（红）、G（绿）、B（蓝）的取值范围 [0, 255]。</p> |

<a id="extralayers"></a>
**ExtraLayers**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| VideoBitrate | Int | 是 | 基本层（小分辨率）的视频码率。取值必须大于 0，一般设置为扩展层（大分辨率）视频码率的 25%，单位为 bps。 |

<a id="targetroom"></a>
**TargetRoom**
| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| RoomId | String | 是 | 目标房间 ID，若房间 ID 不存在，将添加失败。 |
| UserId | String | 是 | 将输出流增加到目标房间时，使用的用户 ID。 |



<Accordion title="全量请求参数的示例代码" defaultOpen="false">
例如，在基础请求参数示例中，补充设置背景颜色、背景图片，设置几个扩展参数，参数示例如下：

```yaml
{
    "TaskId":"2213699902971205739",  # N,string,任务ID，同一个任务需要一致
    "Sequence":1,  # Y,int,混流请求的序列号，修改混流参数时需保证递增
    "UserId":"123",  # Y,string用户ID；
    "RoomId":"321",  # N,string,房间ID；
    "UserData":"DoraTest",  # N,string;自定义用户数据,使用时需要对此参数内容进行 base64 编码,长度限制为 4000 字节,建议不超过 850 字节; 自定义的用户数据将作为 SEI 信息传输给拉流方,拉流方可通过监听客户端的 onPlayerSyncRecvSEI 回调获取该数据;支持混流过程中实时更新
    "SoundLevel":1,  # N,int,混流声浪,1: 开启，0：不开启;默认值是0;支持混流过程中实时更新
    "BackgroundImage":"http://47.101.46.7:8090/no_camera_icon.png",  # N,string,背景图，支持线上URL
    "BackGroundColorHex":"0x87CEFA00",  # N,string,背景颜色
    "ByPass":1,  # N,单流透传开关，也就是输入流就一个的时候是否混流(默认不启用) 1: 启用, 0:不启用
    "AlignmentType":0,
    "MixInput":[
        {
            "RectInfo":{
                "Bottom":640,
                "Layer":1,  # N,int,图层层次
                "Left":0,
                "Right":180,
                "Top":0,
                "CornerRadius": 10 # N,int,圆角半径
                #   原点在左上角,top/bottom/left/right 定义如下：
                #
                #   (left, top)-----------------------
                #   |                                |
                #   |                                |
                #   |                                |
                #   |                                |
                #   -------------------(right, bottom)
            },
            "SoundLevelId":1,
            "StreamId":"stream1",
            "Image": {
                "Url": "http://47.101.46.7:8090/no_camera_icon.png",
                "DisplayMode": 0
            },
            "ContentControl":2, # N,int,内容控制。0：取音视频，1：取音频，2：取视频
            "RenderMode":0,  # N,int,混流输入填充模式。0：裁剪模式，默认值，1：填充模式
            "Volume":100,
            "Label":{
                "Text":"Hello",
                "Left":10,
                "Top":10,
                "Font":{
                    "FontType":1,
                    "FontSize":26,
                    "FontColor":256,
                    "Transparency":50,
                    "BorderColor":0
                }
            }
        },
        {
            "RectInfo":{
                "Bottom":640,
                "Layer":2,
                "Left":180,
                "Right":360,
                "Top":0
            },
            "SoundLevelId":2,
            "StreamId":"stream2",
            "ContentControl":2,
            "RenderMode":0
        }
    ],
    "WaterMark": {
        "Image": "http://47.101.46.7:8090/no_camera_icon.png",# Y,string,水印图片
        "RectInfo": {  # 水印的位置信息;必填
            "Top": 0,  # 必填
            "Left": 0,  # 必填
            "Bottom": 200,  # 必填
            "Right": 150  # 必填
        }
    },
    "CheckImageMode": 0, # N, int, 是否对背景图\输入流占位图\水印图片等参数进行检查, 默认 0
    "MixOutput": [{  # 输出流列表;必填
        "StreamId": "stream3",  # Y,输入流地址,StreamId 和 StreamUrl 二者取其一即可,若同时填写 StreamId 和 StreamUrl,则 StreamUrl 生效
        #"StreamUrl": "rtmp://ip/appname/streamid", StreamId 和 StreamUrl 二者取其一即可,若同时填写 StreamId 和 StreamUrl,则 StreamUrl 生效
        "VideoBitrate": 1200000,  # Y,int,视频码率（单位：bps）,纯音频混流的时候,推荐填写0;支持混流过程中实时更新
        "Fps": 15,  # Y,int,视频帧率
        "Width": 360,  # Y,int,宽，范围[0-3000];数值必须是2的倍数，纯音频混流的时候,推荐填写0
        "Height": 640,  # Y,int,高，范围[0-3000];数值必须是2的倍数，纯音频混流的时候,推荐填写0
        "AudioCodec": 0,  # N,int,音频编码 0：HE-AAC，1：AAC-LC，2：MP3；默认0
        "AudioBitrate": 48000,  # N,int,混流输出音频码率,默认48000，单位 bps
        "SoundChannel": 2,  # N,int,声道数， 1：单声道，2：双声道
        "VideoEncId": 0,  # N,int,视频编码,0:H264,2:VP8,3:H265,4:H264 SVC
        "ExtraLayers": [ # 当 VideoEncId 取值为 4 时,该字段必填，且长度必须为 1
            {
                "VideoBitrate": 1200000
            }
        ],
        "LowBitrateHD": 0  # N,int,是否开启高清低码,0:不开启(默认),1:开启, 该参数仅在 VideoEncId 取值为 3 时才生效
    }],
    #"ExPara",  # N,扩展参数（json结构体格式),具体联系技术支持,比如video_encode/sei_mode,可参见数据示例
    "ExPara": [
        {
            "Key": "video_encode",
            "Value": "h264"
        },
        {
            "Key": "sei_mode",
            "Value": "1"
        },
        {
            "Key": "mixowner_userid",
            "Value": "[\"456\"]"
        }
    ],
    "RecvBufferLevel": 0 # N, int, 拉流最小缓冲时间(单位：毫秒), 默认 0
}
```
</Accordion>


### 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Array of Object | 响应数据。 |
| └ UserId | String | 发起混流任务的用户 ID。 |
| └ Sequence | Int | 序列号。 |
| └ RoomId | String | 房间 ID。 |
| └ PlayInfo | Array of Object | 播放信息，详情可见[PlayInfo](#playInfo)。 |

<a id="playinfo"></a>
**PlayInfo**
| 参数 | 类型 | 描述 |
|---|---|---|
| StreamId | String | 输出流的流 ID。 |
| RTMP | String | RTMP 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |
| HLS | String | HLS 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |
| FLV | String | HTTP-FLV 协议对应的 CDN 播放地址（如果指定混流输出地址是 CDN 并且配置了这个协议的拉流域名）。 |



响应示例如下：

```json
{
    "Code": 0,
    "Data": {
        "PlayInfo": [
            {
                "FLV": "http://domain/appname/test.flv",
                "HLS": "http://domain/appname/test/playlist.m3u8",
                "RTMP": "rtmp://domain/appname/test",
                "Status": 0,
                "StreamId": "test",
                "UserName": ""
            }
        ],
        "RoomId": "321",
        "Sequence": 1,
        "UserId": "123"
    },
    "Message": "success",
    "RequestId": "8472822294336370476"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。


<table>

<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>110200002</td>
<td>输入参数错误。</td>
<td>请参考 Message 信息处理。</td>
</tr>
<tr>
<td>110200003</td>
<td>鉴权失败。</td>
<td>请确认鉴权信息是否正确或过期，详情请参考 <a href="https://doc-zh.zego.im/article/19458#5" target="_blank">调用方式</a> 中的 "3 签名机制"。</td>
</tr>
<tr>
<td>110200150</td>
<td>混流的输入流不存在。</td>
<td>请确认输入流 StreamId 或 StreamUrl 是否存在。如不存在，移除该条不存在的流并重试；或对该条不存在的流进行推流并重试。</td>
</tr>
<tr>
<td>110200151</td>
<td>混流任务失败。</td>
<td>请重试，或联系 ZEGO 技术支持处理。</td>
</tr>
<tr>
<td>110200157</td>
<td>混流权限未开。</td>
<td>请确认当前使用的 AppId 所属项目，是否在 <a href="https://console.zego.im/" target="_blank">ZEGO 控制台</a> 上开启了混流服务的权限，详情请参考 <a href="/console/service-configuration/enable-stream-mixing-service" target="_blank">控制台 - 服务配置 - 混流</a>。</td>
</tr>
<tr>
<td>110200158</td>
<td>混流输入流条数过限。</td>
<td>输入流支持多条，默认上限为 9 条，确认是否超出限制。</td>
</tr>
<tr>
<td>110200175</td>
<td>输入流重复。</td>
<td>请确认 MixInput 参数中，各输入流 StreamId 或 StreamUrl 是否是全局唯一。</td>
</tr>
<tr>
<td>110200184</td>
<td>混流开始参数解析失败。</td>
<td>请根据返回提示信息，检查参数内容是否合法。</td>
</tr>
<tr>
<td>110200197</td>
<td>添加流到目标房间失败。</td>
<td>检查目标房间是否存在。</td>
</tr>
</tbody></table>



## 常见问题

1. **在推纯音频混流并设置了背景图时，遇到背景图无法正常进行展示，如何处理？**

    在这种情况下，客户需要根据自身业务需求，正确设置输出布局的宽和高，并联系 ZEGO 技术支持配置开启补黑帧。
