# 停止混流

---

## 描述

调用本接口停止混流。相关回调请参考 [混流结束回调](https://doc-zh.zego.im/article/19684)。

<Warning title="注意">



- 在当前混流任务（以下称为“混流任务 A”）仍在进行的情况下，如果开发者启动新的混流任务（以下称为“混流任务 B”），混流任务 A 不会自动停止。只有在混流任务 A 的所有输入流都不存在后的 90 秒之后，才会自动结束。

- 在使用 ZEGO 音视频云服务的混流功能时，开发者应注意：在启动混流任务 B 时，应停止混流任务 A，以免导致主播已开启混流任务 B 与其他主播混流，但观众依然在拉取混流任务 A 的输出流。

</Warning>



## 接口原型

- 请求方法：POST

<Note title="说明">


  使用 POST 请求方法传递参数时：
   - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
   - Headers 中，设置 “Content-type” 为 “application/json”。
  
</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StopMix`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-voice-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>

<thead>
  <tr>
    <th>名称<br /></th>
    <th>类型<br /></th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>TaskId</td>
    <td>String</td>
    <td>是</td>
    <td>混流任务 ID，需要和开始混流传入的 TaskId 保持一致。</td>
  </tr>
  <tr>
    <td>Sequence</td>
    <td>Int</td>
    <td>否</td>
    <td>混流任务的序列号，用于保证时序，同个任务的参数修改需要保证序列号的递增。</td>
  </tr>
  <tr>
    <td>UserId</td>
    <td>String</td>
    <td>否</td>
    <td>用户 ID。当开启混流任务归属时停止某个 TaskId 的混流任务必须输入开始混流任务时指定的 UserId 。</td>
  </tr>
</tbody>
</table>


## 请求示例

- 请求 URL  
    ```
    https://rtc-api.zego.im/?Action=StopMix
    &<公共请求参数>
    ```

- 请求消息体 
    ```json
    {
        "TaskId": "2213699902971205739", 
        "Sequence": 1, 
        "UserId": "456"
    }
    ```

## 响应参数


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
    <td>操作结果描述。</td>
  </tr>
  <tr>
    <td>RequestId</td>
    <td>String</td>
    <td>请求 ID。</td>
  </tr>
</tbody>
</table>


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"6351841974556802202"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 110200001 | 失败。 | 请重试。 |
| 110200002 | 输入参数错误。 | 请参考 Message 信息处理。|
| 110200003 | 鉴权失败。 | 请确认鉴权信息是否正确或过期，详情请参考 <a href="https://doc-zh.zego.im/article/19458#5" target="_blank">调用方式</a> 中的 “3 签名机制”。 |
| 110200004 | 解析输入参数失败。 | 请检查混流参数是否正确。|
