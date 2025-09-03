# 结束视频流审核

- - -

## 描述

调用本接口结束视频流内容审核。

<Warning title="注意">


使用该接口前，请参考 [控制台 - 云市场 - 数美内容审核](/console/cloud-market/shumei-moderation)，按照页面指引，自助开通 `数美内容审核` 相关权限。

</Warning>



## 接口原型

- 请求方法：POST

<Note title="说明">


  使用 POST 请求方法传递参数时：
  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。
  
</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StopCensorVideoV2`
- 传输协议：HTTPS
- 调用频率限制（同一个 AppID 下所有房间）：100 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/shumei-moderation/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>
  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>TaskId</td>
<td>String</td>
<td>是</td>
<td>审核任务 ID，可在 [开始视频流审核](https://doc-zh.zego.im/article/18724) 任务的响应参数中获取。</td>
</tr>
</tbody></table>

## 请求示例

- 请求 URL  
    ```
    https://rtc-api.zego.im/?Action=StopCensorVideoV2
    &<公共请求参数>
    ```
- 请求消息体 
    ```
    {
        "TaskId": "9f58178ba8034902c6028c728bc6f6e4"
    }
    ```

## 响应参数

<table>
  
<tbody><tr>
<th>参数名</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr>
<td>Code</td>
<td>Int32</td>
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
</tbody></table>

## 响应示例

```
{
    "Code":0,
    "Message":"success",
    "RequestId":"TestRequestId1635941439344723000"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明| 处理建议 |
|-----|----|----|
| 50006、50007 |  HTTP 请求失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50009 | 审核失败。 | 请稍后重试（建议 300s），或联系 ZEGO 技术支持。|
| 50117 | 配置错误，未开通数美权限。 | 请联系 ZEGO 技术支持开通数美相关权限。|

<Content />

