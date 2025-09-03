# 合并媒体文件

---

## 描述


用户进行 CDN 录制时，会把录制好的媒体文件存放在 CDN 服务器上，用户可以调用本接口将多个媒体文件进行 `裁剪` 和 `合并`。

目前仅支持合并 MP3/MP4/M3U8 格式的媒体文件。

<Warning title="注意">

- 首次使用本接口之前，请确认是否已经开通 CDN 录制服务。若未开通，请前往 [ZEGO 控制台](https://console.zego.im) 自助开通，详情请参考 [控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)，或联系 ZEGO 技术支持开通。
- 请联系 ZEGO 技术支持开通合并媒体文件功能，并配置回调地址，媒体文件合并完成后会通过 [媒体文件合并完成回调](https://doc-zh.zego.im/article/19692) 通知。
- 使用该功能合并后的录制文件会永久保存，不能通过配置来修改保存天数。若需要删除，可以使用 [删除媒体文件](https://doc-zh.zego.im/article/19639) 接口进行删除。

</Warning>




## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=MergeMedia`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


| 参数| 类型 | <div style={{width:"130px"}}>是否必选</div> | 描述 |
| --- | --- | --- | --- |
| Vendor | String | 是 | <p>可能的取值及对应的 CDN 厂商：</p><ul><li>Tencent：腾讯云。</li><li>Huawei：华为云。</li></ul> |
| Format | String | 否 | <p>合并后的文件格式，默认格式为 MP4。</p><ul><li>腾讯云：MP3、MP4、M3U8。</li><Warning title="注意">使用的 CDN 厂商是 “腾讯云” 时，如果合并后的文件为 MP3 或 MP4 格式，您需要确保输入源文件的“音频格式”为 AAC-LC 编码，否则合并后的视频文件可能没有声音。</Warning><li>华为云：MP4、M3U8。</li></ul> |
| Type | String | 否 | <p>合并操作类型。</p><ul><li>0：默认值，不裁剪，直接合并文件。</li><li>1：对媒体文件进行裁剪等操作后，再合并文件。此时 InputFileId[] 参数无效，此时必须传入 HandleMediaArgs.N.FileId 参数。</li></ul><p><b>该参数取值为 1 时，仅对 Vendor 取值为 Tencent 有效，取值为 Huawei 无效。</b></p> |
| InputFileId[] | Array of String | <ul><li> Type 取值为 0，此参数有效，且必选。</li><li> Type 取值为 1，此参数无效。</li></ul> | <p>要合并的文件 ID 列表，按照文件列表的顺序进行合并。其中：</p><ul><li>腾讯云：填写 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 返回的 <code>FilelD</code>，且最多支持 10 个文件合并。</li><li>华为云：填写 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 返回的 <code>ObsObject</code> ，且最多支持 5 个文件合并。</li></ul><p>示例：InputFileId[]=5285890813221514958&InputFileId[]=5285890813221513290</p> |
| HandleMediaArgs.N.FileId | String | Type 取值为 1，此参数有效，且必选。 | <p>需要裁剪后、再进行合并的文件 ID 列表，<b>按照字段名中 N 从小到大的顺序进行合并，最多支持合并 10 个文件。</b></p><ul><li>腾讯云：填写 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 返回的 <code>FilelD</code>。</li><li>华为云：填写 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 返回的 <code>ObsObject</code>。</li></ul><Warning title="注意">N 必须从 0 开始，并依次递增，最大值为 9。不从 0 开始、或跳过某个数字，将无法正确裁剪合并文件。</Warning><p>例如，HandleMediaArgs.0.FileId=5285890813221514958&HandleMediaArgs.1.FileId=5285890813221513290</p> |
| HandleMediaArgs.N.StartTime | Number | Type 取值为 1，此参数有效，非必选。 | <p>HandleMediaArgs.N.FileId 对应的媒体文件开始裁剪的时间偏移量，默认为 0，单位：秒。</p><p>例如，HandleMediaArgs.0.StartTime 对应的是 HandleMediaArgs.0.FileId 这个媒体文件的开始裁剪时间。</p> |
| HandleMediaArgs.N.EndTime | Number | Type 取值为 1，此参数有效，非必选。 | <p>HandleMediaArgs.N.FileId 对应的媒体文件结束裁剪的时间偏移量，默认为视频文件的结束时间，单位：秒。</p><p>例如，HandleMediaArgs.0.EndTime 对应的是 HandleMediaArgs.0.FileId 这个媒体文件的结束裁剪时间。</p> |
| OutputFileName | String | <ul><li>Vendor 取值为 Tencent，此参数必选。</li><li>Vendor 取值为 Huawei，此参数非必选，不填则由系统自动生成。</li></ul> | <p>合并后的媒体文件名称，不包含文件格式。</p><p>使用时，请对该参数内容进行 UrlEncode。</p> |
| ExpireTime | Number | 否| <p>合并后媒体文件的有效保存时长（单位：小时），即文件过期时间 = 接口请求时间 + 有效保存时长。</p><ul><li>取值为 0（默认值）：表示文件永久保存不过期。</li><li>取值大于 0：超过该时长文件将被删除。</li></ul><Warning title="注意"><ul><li>该字段，仅对 Vendor 取值为 Tencent 时有效。</li><li>如果合并媒体文件的任务完成时长，大于其有效保存时长，文件将不会生成，[媒体文件合并完成回调](https://doc-zh.zego.im/article/19692) 在访问合成后的文件 URL 时会 404。</li></ul></Warning> |


## 请求示例

```
https://rtc-api.zego.im/?Action=MergeMedia
&Vendor=Tencent
&Format=mp4
&Type=1
&HandleMediaArgs.0.FileId=5576678019238910395
&HandleMediaArgs.0.StartTime=0.5
&HandleMediaArgs.0.EndTime=10.5
&HandleMediaArgs.1.FileId=5576678019238910395
&HandleMediaArgs.1.StartTime=10
&HandleMediaArgs.1.EndTime=15
&OutputFileName=xxxx-xxxx-test-temp-2.mp4
&<公共请求参数>
```

## 响应参数


| 参数 | 类型 | 描述 |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Object | <code>腾讯云</code> 返回内容（Vendor 为 Tencent 时返回），详情可见 [Tencent](#tencent)。 |
| └ Huawei | Object | <code>华为云</code> 返回内容（Vendor 为 Huawei 时返回），详情可见 [Huawei](#huawei)。 |

<a id="tencent"></a>
**Tencent**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 制作媒体文件的任务 ID，可以通过该 ID 查询制作任务。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即腾讯云）返回，定位问题时需要提供该次请求的 RequestId。 |

<a id="huawei"></a>
**Huawei**
| 参数 | 类型 | 描述 |
|---|---|---|
| TaskId | String | 制作媒体文件的任务 ID，可以通过该 ID 查询制作任务。 |
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即 Huawei）返回，定位问题时需要提供该次请求的 RequestId。 |


## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "RequestId":"3574501647605445341",
    "Data":
      {
        "Tencent":
           {
             "TaskId":"1400341231-EditMedia-0d8b6f0a5c457f5722e6b27796ce1f2ctt0",
             "RequestId":"07f0bdbc-6a52-4ef9-ba7b-e96d6c81d6c3"
           },
        "Huawei":
           {
             "RequestId": "7a690e874857106ccfa5bed198cdsd79",
             "TaskId": "112037345"
           }
      }
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
| 41003  | 文件不存在。 | 请确认文件格式、文件 ID 等是否正确。|
