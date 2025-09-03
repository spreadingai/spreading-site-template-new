# 删除媒体文件

---

## 描述


用户进行 CDN 录制时，会把录制好的媒体文件存放在 CDN 服务器上，用户可以调用本接口删除该文件。

<Warning title="注意">
首次使用本接口之前，请确认是否已经开通 CDN 录制服务。若未开通，请前往 [ZEGO 控制台](https://console.zego.im) 自助开通，详情请参考 [控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)，或联系 ZEGO 技术支持开通。

</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=DeleteMedia`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/live-streaming-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


<table>

<thead>
  <tr>
    <th>参数</th>
    <th>类型</th>
    <th>是否必选</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Vendor</td>
    <td>String</td>
    <td>是</td>
    <td><p>可能的取值及对应的 CDN 厂商：</p><ul><li>Tencent：腾讯云。</li><li>Ws：网宿。</li><li>Huawei：华为云。</li></ul></td>
  </tr>
  <tr>
    <td>FileId[]</td>
    <td>Array of String</td>
    <td>是</td>
    <td><p>文件唯一标识，在 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 中返回，最大支持 100 个媒体文件 FileId。</p><p>请注意，各 CDN 厂商的录制文件唯一标识不同：</p><ul><li>腾讯云：FileID。</li><li>网宿：PersistentId。</li><li>华为云：ObsObject。</li></ul><p>您也可以通过 <a href="https://doc-zh.zego.im/article/19637" target="blank">检索媒体信息</a> 接口，获取媒体文件的唯一标识，标识对应的参数名称有所差异，请注意区分使用。</p><p>示例：&FileId[]=5285890813221514958&FileId[]=5285890813221513290</p></td>
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=DeleteMedia
&Vendor=Tencent
&FileId[]=5285890813221514958&FileId[]=5285890813221513290
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | String | 响应数据，由以下参数 JSON 序列化后生成。 |
| └ Deleted | Array of String | 成功删除的文件列表。 |
| └ Errors | Array of Object | 未成功删除的文件列表，详情可见[Errors](#Errors)。 |

<a id="errors"></a>
**Errors**

| 参数 | 类型 | 描述 |
|---|---|---|
| Code | String | 删除文件失败的错误码。 |
| Message | String | 删除文件失败的错误消息。 |
| Key | String | 删除失败的文件的唯一标识。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商返回，定位问题时需要提供该次请求的 RequestId。 |



## 响应示例

```
{
    "Code": 0,
    "Message": "success",
    "Data": "{\"Deleted\":[\"3270835010809755971\",\"3270835010811335406\"],\"Errors\":[]}",
    "RequestId": "3574501647605445341"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 请求成功。 |-|
| 2 | 输入参数错误。 |-|
| 3 | 未开通相关权限。 | 请联系 ZEGO 技术支持。|
| 4 | CDN 类型不匹配。 | 请检查参数。|
| 5 | 配置错误。 | 请联系 ZEGO 技术支持。|
| 6 | 请求过于频繁。 | 请稍后重试。|
| 7 | 鉴权失败。 | 请检查鉴权参数是否正确。|
| 1000  | 请求失败。 | 请联系 ZEGO 技术支持。|
