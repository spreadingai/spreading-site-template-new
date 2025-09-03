# 查询混流任务信息

---

## 描述

根据指定混流任务的 taskid 查询相关信息。


## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=GetMixTaskInfo`
- 传输协议：HTTPS
- 调用频率限制：100 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
<td>任务 ID，混流任务的唯一标识。</td>
</tr>
</tbody></table>


## 请求示例

```
https://rtc-api.zego.im/?Action=GetMixTaskInfo
&TaskId=task_test_123
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应数据。 |
| └ TaskInfo | Object | 混流任务信息，详情可见[TaskInfo](#taskInfo)。 |

<a id="taskinfo"></a>
**TaskInfo**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 混流任务 ID。 |
| MixDuration | Int | 混流任务持续时长，单位秒。 |



## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "RequestId": "1864314306034131629",
    "Data": {
        "TaskInfo": {
            "TaskId": "task_test_123",
            "MixDuration": 13
        }
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 请求成功。 | - |
| 110200001 | 失败。 | 建议重试。一般是网络错误异常导致。 |
| 110200004 | 解析输入参数失败。 | 请检查混流参数是否正确。|
| 110200194 | 混流请求过载。 | 请求过于频繁，请稍后再试。 |
| 110209001 | 混流任务不存在。 | 请核查该混流任务是否正在进行。如果混流任务实际正在进行，请联系 ZEGO 技术支持。 |
