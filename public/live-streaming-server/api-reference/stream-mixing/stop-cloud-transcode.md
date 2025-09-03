# 停止单流转码

- - -

## 简介

调用本接口，停止单流转码任务。

“客户端”基于转码模板触发的单流转码介绍，请参考 [单流转码](/real-time-video-android-java/live-streaming/single-stream-transcoding)；“服务端”的相关回调，请参考 [单流转码开始回调](https://doc-zh.zego.im/article/19686) 和 [单流转码停止回调](https://doc-zh.zego.im/article/19688)。


## 接口原型

- 请求方法：POST

<Note title="说明">


  使用 POST 请求方法传递参数时：

  - Body 中的参数直接传 JsonObject 格式即可，无需序列化为 String 格式。
  - Headers 中，设置 “Content-type” 为 “application/json”。

</Note>




- 请求地址：`https://rtc-api.zego.im/?Action=StopCloudTranscode`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒



## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


**此接口中只有部分参数在开始混流后支持动态更新，未标注的则不支持动态更新，详情请参考下表中的参数描述。**

| 名称 | 类型 | 必填 | 描述 |
|---|---|---|---|
| TaskId | String | 是 | <p>任务 ID，单流转码任务的唯一标识，由开发者自定义。</p> |
| UserId | String | 是 | 用户 ID。当开启单流转码任务归属时，停止某个 TaskId 的转码任务必须输入 <a href="https://doc-zh.zego.im/article/19605" target="_blank">开始单流转码</a> 任务时指定的 UserId。 |
| Sequence | Int | 否 | 转码任务的序列号，用于保证时序，同个任务的参数修改需要保证序列号的递增。 |



## 请求示例

- 请求 URL
    ```
    https://rtc-api.zego.im/?Action=StopCloudTranscode
    &<公共请求参数>
    ```

- 请求消息体
    ```json
    {
        "TaskId": "2213699902971205739",
        "UserId": "456"
    }
    ```


## 响应参数

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |



## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "8472822294336370476"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 110200002 | 输入参数错误。 | 请参考 Message 信息处理。|
| 110200151 | 单流转码任务失败。 |请重试，或联系 ZEGO 技术支持处理。|
