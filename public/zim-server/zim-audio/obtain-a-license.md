
# 获取鉴权信息

- - -

## 描述

通过该接口获取用于语音组件鉴权的 License。

## 接口原型

- 请求方法：GET
- 请求地址：`https://auth-api.zego.im?Action=CgiDescribeZIMAudioLicense`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒


## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/zim-server/accessing-server-apis#2-公共参数)。

## 请求示例

```json
https://auth-api.zego.im?Action=CgiDescribeZIMAudioLicense
&<公共请求参数>
```

## 响应参数

<table class="collapsible-table" >
<tbody><tr data-row-level="1">
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr>
<tr data-row-level="2">
<td>Code</td>
<td>Number</td>
<td>返回码。</td>
</tr>
<tr data-row-level="3">
<td>Message</td>
<td>String</td>
<td>请求结果的说明信息。</td>
</tr>
<tr data-row-level="4" data-row-child="true">
<td>Data</td>
<td>Object</td>
<td>“Code” 为 0 时，此参数为鉴权文件。</td>
</tr>
<tr data-row-level="4-1">
<td>└License</td>
<td>String</td>
<td>鉴权文件的内容，可在 7 天内重复使用。</td>
</tr>
</tbody></table>

## 响应示例

```json
{
    "Code": 0,
    "Message": "Success.",
    "Data": {
        "License": "1234567890QWERTYUIOASDFGHJKLZXCVNM"
    }
}
```

## 返回码

以下仅列出了接口业务逻辑相关的返回码，完整返回码请参考 [全局返回码](/zim-server/return-codes)。

<table>
<tbody><tr>
<th>返回码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>910001</td>
<td>参数错误。</td>
<td>请检查参数。</td>
</tr>
<tr>
<td>910002</td>
<td>证书无效。</td>
<td>请联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>910003</td>
<td>服务内部问题。</td>
<td>请联系技术支持。</td>
</tr>
<tr>
<td>910004</td>
<td>授权信息有误。</td>
<td>请检查公共参数的认证信息。</td>
</tr>
</tbody></table>
