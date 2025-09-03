

|状态码|描述|
|-----|----|
|1|未上传。|
|2|已上传。|
|4|排队中。|
|8|转码中。|
|16|转码成功。|
|32|转码失败。|
|64|转码任务已取消。|
|128|受密码保护的文档。|
|256|文件内容过大，例如文档页数过多。|
|512|Excel 文件标签数过多。|
|1024|文件内容为空。例如：PPT 内无幻灯片。|
|2048|转码服务器打开文件失败。|
|4096|不支持的目标文件类型。|
|8192|源文件为只读文件。|
|16384|<p>转码服务器下载源文件失败。 可能的原因如下：</p><ul><li>无法从请求参数中的源文件 URL 下载文件。</li><li>请求参数中的文件哈希值不是 32 位的 MD5 哈希值。</li><li>请求参数中的文件哈希值和根据文件计算的哈希值不匹配。</li></ul> |
|32768|检测到源文件中包含了转码工具无法处理的元素，如墨迹涂鸦等，请去掉这些元素后再进行转码。|
|32769|检测到 Word、Excel 和 PowerPoint 文件格式不合法，请确保源文件可以使用 Office 打开再进行转码。|
|32770|要转码的文件存在安全隐患，无法正常打开转码。请确保使用 Office 打开文件时不会提示编辑此文件可能会损害您的计算机|
|32771|动态 PPT 转码结束后，检测到有图片、音视频文件未正常导出，转码服务器将重试转码。|
|32772|文件大小过大，无法转码，请确保文件大小在限制的范围之内。|
|32773|打开文件时弹需要修复文件提示框（文件损坏）。|
|32774|EOF 错误（文件内容不完整）。|
<Warning title="注意">

1. 本 API 为最新服务端 API v2 接口，支持全球就近接入、统一的鉴权方式、统一的参数风格和公共错误码。后续相关功能的新增都会在此更新。
2. 旧版 API 接口仅供 **2021-09-10** 前接入的旧用户维护使用。旧版接口文档请参考 [旧版服务端 API](https://doc-zh.zego.im/article/11997)。

</Warning>
# 查询文件转码状态

- - -

<FileServerWarning />

##  描述

通过本接口查询文件转码任务状态。

##  接口原型

- 请求方法：POST
- 请求地址：`https://docs-api.zego.im/?Action=DescribeTranscodeStatus`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒


##  请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/super-board-server/accessing-server-apis) 中的 ”公共请求参数“。

| 参数 | 类型 | 是否必选 | 描述 |
| :-- | :-- | :-- | :-- | 
| TaskId | String | 是 | 文件转码任务 ID。 |


##  请求示例

- 请求 URL  
```
https://docs-api.zego.im/?Action=DescribeTranscodeStatus
&AppId=1234567890
&SignatureNonce=15215528852396
&Timestamp=1234567890
&Signature=7a2c0f11145fb760d607a07b54825013
&SignatureVersion=2.0
&IsTest=false
```
- 请求消息体 
```json
{
    "TaskId": "task"
}
```

##  响应参数

| 参数 | 类型 | 描述 |
| :-- | :-- | :-- | 
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应对象。 |
| └FileHash | String | 源文件哈希。 |
| └FileType | Int64 | 源文件类型参数，可设置为 1、2、4、8、16、32，各参数值说明如下：<ul><li>1：ppt/pptx（静态文件，目标文件类型对应 256；动态文件，目标文件类型对应 512）</li><li>2：doc/docx（目标文件类型对应 256）</li><li>4：xls/xlsx（目标文件类型对应 256）</li><li>8：PDF（目标文件类型对应 256）</li><li>16：jpg/jpeg/png/bmp（目标文件类型对应 16）</li><li>32：txt（目标文件类型对应 256）</li></ul> |
| └DestinationFileType | Int64 | 目标文件类型参数，可设置为 16、256、512，各参数值说明如下：<ul><li>16：jpg/jpeg/png/bmp</li><li>256：向量和图片</li><li>512：动态 PPT</li></ul> |
| └FileName | String | 源文件名称。 |
| └FileSize | Int64 | 源文件大小，单位为字节。 |
| └Status | Int64 | 文件转码状态，详情请参考下文中 <a href="#status">status</a> 字段说明表。 |
| └FileId | String | 转码成功后返回的文件 ID。 |


### Status 字段取值说明如下

<Status />

##  响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "FileHash": "abc",
        "FileType": 1,
        "DestinationFileType": 256,
        "Status": 8,
        "FileId": "fiaaaa"
    }
}
```

##  返回码

以下仅列出了接口业务相关的返回码，公共返回码请参考 [公共返回码](/super-board-server/common-error-codes)。
<table>
  <tbody><tr>
    <th>返回码</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>60013</td>
    <td>文件已经完成转码。</td>
  </tr>
  <tr>
    <td>60014</td>
    <td>不存在的文件转码任务 ID。</td>
  </tr>
  <tr>
    <td>60015</td>
    <td>不支持的源文件类型。</td>
  </tr>
</tbody></table>
