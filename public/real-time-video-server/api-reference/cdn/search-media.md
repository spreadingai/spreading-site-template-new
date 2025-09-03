# 检索媒体信息

---

## 描述

用户进行 CDN 录制时，会把录制好的媒体文件存放在 CDN 服务器上，用户可以调用本接口查询自己名下的媒体文件相关信息，例如媒体文件名、创建时间等。

<Warning title="注意">
首次使用本接口之前，请确认是否已经开通 CDN 直播服务。若未开通，请前往 [ZEGO 控制台](https://console.zego.im) 自助开通，详情请参考 [控制台 - 服务配置 - CDN](/console/service-configuration/activate-cdn-service)，或联系 ZEGO 技术支持开通。
</Warning>



## 接口原型

- 请求方法：GET
- 请求地址：`https://rtc-api.zego.im/?Action=SearchMedia`
- 传输协议：HTTPS
- 调用频率限制：20 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 完整公共参数列表请参考 [调用方式](/real-time-video-server/api-reference/accessing-server-apis#公共请求参数) 中的 “公共请求参数”。


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
    <td>NamePrefix</td>
    <td>String</td>
    <td>否</td>
    <td>
    <p>文件名前缀，前缀匹配媒体文件的文件名，最长支持 20 个字节。</p>

<Warning title="注意">
使用时，请对该参数内容进行 UrlEncode。
</Warning>

</td>
  </tr>
  <tr>
    <td>StartTime</td>
    <td>Int</td>
    <td>否</td>
    <td><p>搜索文件的开始时间（文件创建时间），Unix 时间戳，精确到秒。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
  <tr>
    <td>EndTime</td>
    <td>Int</td>
    <td>否</td>
    <td><p>搜索文件的结束时间（文件创建时间），Unix 时间戳，精确到秒。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
  <tr>
    <td>PageSize</td>
    <td>Int</td>
    <td>否</td>
    <td><p>返回的记录条数，默认值为 10。取值范围：PageNumber * PageSize + PageSize 不超过 5000。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
  <tr>
    <td>PageNumber</td>
    <td>Int</td>
    <td>否</td>
    <td><p>取得第几页。取值范围：PageNumber * PageSize + PageSize 不超过 5000。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
  <tr>
    <td>FileId[]</td>
    <td>Array of String</td>
    <td>否</td>
    <td><p>文件 ID 列表，最多支持输入 10 个 FileId，单个 FileId 的最大长度为 40 个字符。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
  <tr>
    <td>StreamId[]</td>
    <td>Array of String</td>
    <td>否</td>
    <td><p>CDN 录制的流 ID 列表，最多支持输入 10 个 StreamId，匹配集合中的任意元素。</p><p><b>该参数仅在 Vendor 取值为 Tencent 时有效。</b></p></td>
  </tr>
<tr>
    <td>Marker</td>
    <td>String</td>
    <td>否</td>
    <td><p>检索信息时的标记位，该参数不填写时，默认返回检索到的第一页信息列表。</p><ol><li>第一次调用本接口，入参 Marker 传入为空。</li><li>再次调用本接口时，入参 Marker 取值为 NextMarker（返回结果中的标记位信息）。</li></ol><p>每次调用本接口发起请求时，响应结果中都会返回 NextMarker，开发者需要判断是否检索到最后一页。</p><p><b>该参数在 Vendor 取值为 Ws、Huawei 时有效。</b></p></td>
  </tr>
<tr>
    <td>MaxKeys</td>
    <td>Int</td>
    <td>否</td>
    <td><p>调用一次本接口，返回记录的最大条数，取值范围 [1, 1000]，默认为 1000。</p><p>超过 MaxKeys 取值的信息列表，需要根据前一次调用本接口时、返回结果中的 NextMarker 取值，再次调用本接口进行查询。</p><p><b>该参数在 Vendor 取值为 Ws、Huawei 时有效。</b></p></td>
  </tr>
</tbody>
</table>


## 请求示例

```
https://rtc-api.zego.im/?Action=SearchMedia
&Vendor=Tencent
&NamePrefix=nameprefix
&StartTime=
&EndTime=
&PageSize=
&PageNumber=
&FileId[]=fileId1
&FileId[]=fileId2
&StreamId[]=streamId1
&StreamId[]=streamId2
&<公共请求参数>
```


## 响应参数

| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| Code | Number | 返回码。 |
| Message | String | 操作结果描述。 |
| RequestId | String | 请求 ID，由 ZEGO 服务端返回。 |
| Data | Object | 响应数据。 |
| └ Tencent | Object | <code>腾讯云</code> 返回内容（Vendor 取 Tencent 时返回本参数），详情可见 [Tencent](#tencent)。 |
| └ Huawei | Object | <code>华为云</code> 返回内容（Vendor 取 Huawei 时返回本参数），详情可见 [Huawei](#huawei)。 |
| └ Ws | Object | <code>网宿云</code> 返回内容（Vendor 取 Ws 时返回本参数），详情可见 [Ws](#ws)。 |

<a id="tencent"></a>
**Tencent**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| RequestId | String | 唯一请求 ID，由请求参数 Vendor 取值对应的 CDN 厂商（即 Tencent）返回，定位问题时需要提供该次请求的 RequestId。 |
| TotalCount | Number | 符合搜索条件的记录总数。最大值为 5000。当命中记录数超过 5000 时，该参数将返回 5000，而非实际命中总数。 |
| MediaInfoSet | Array of Object | 媒体文件信息列表。 |
| └ FileId | String | 文件唯一标识，即 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 中的 FileID。 |
| └ BasicInfo | Object | 基础信息。包括视频名称、分类、播放地址、封面图片等，详情可见 [BasicInfo](#basicinfo)。 |
| └ TranscodeInfo | Object | 媒体文件转码结果的相关信息，包括该媒体文件转码后的文件地址、规格、码率、分辨率等，详情可见 [TranscodeInfo](#transcodeInfo)。 |

<a id="basicinfo"></a>
**BasicInfo**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| Name | String | 媒体名。 |
| Description | String | 媒体文件描述。 |
| CreateTime | String | 媒体文件的创建时间，使用 “ISO 日期格式”。 |
| UpdateTime | String | 媒体文件的最近更新时间（如修改视频属性、发起视频处理等会触发更新媒体文件信息的操作），使用 “ISO 日期格式”。 |
| ExpireTime | String | 媒体文件的过期时间，使用 “ISO 日期格式”。过期后该媒体文件及其相关资源（转码结果、雪碧图等）将被永久删除。“9999-12-31T23:59:59Z” 表示永不过期。 |
| ClassId | Number | 媒体文件的分类 ID。 |
| ClassName | String | 媒体文件的分类名称。 |
| ClassPath | String | 媒体文件的分类路径，分类间以 “-” 分隔，如 “新的一级分类 - 新的二级分类”。 |
| CoverUrl | String | 媒体文件的封面图片地址。 |
| Type | String | 媒体文件的封装格式，例如 mp4、flv 等。 |
| MediaUrl | String | 原始媒体文件的 URL 地址。 |
| SourceInfo | Object | 该媒体文件的来源信息。 |
| SourceType | String | 来源类型。 |
| SourceContext | String | 来源流。 |
| StorageRegion | String | 媒体文件存储地区，如 ap-guangzhou。 |
| Vid | String | 直播录制文件的唯一标识。 |
| Category | String | <p>文件类型。</p><ul><li>Video：视频文件。</li><li>Audio：音频文件。</li><li>Image：图片文件。</li></ul> |
| Status | String | <p>文件状态。</p><ul><li>Normal：正常。</li><li>Forbidden：封禁。</li></ul> |
| StorageClass | String | <p>文件的存储类型。</p><ul><li>STANDARD：标准存储。</li><li>STANDARD_IA：低频存储。</li><li>ARCHIVE：归档存储。</li><li>DEEP_ARCHIVE：深度归档存储。</li></ul> |

<a id="transcodeinfo"></a>
**TranscodeInfo**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| TranscodeSet | Array of Object | 媒体文件转码信息集合，每个元素代表 1 个转码结果。 |
| Url | String | 转码后的视频文件地址。 |
| Definition | Integer | 转码规格 ID，取值 0 表示原始文件。 |
| Bitrate | Integer | “视频流码率”的平均值与“音频流码率”的平均值之和，单位：bps。 |
| Height | Integer | 视频流高度的最大值，单位：px。 |
| Width | Integer | 视频流宽度的最大值，单位：px |
| Size | Integer | 媒体文件总大小，单位：字节。当媒体文件为 HLS 时，大小是 m3u8 和 ts 文件大小的总和。 |
| Duration | Float | 视频时长，单位：秒。 |
| Md5 | String | 视频的 md5 值。 |
| Container | String | 容器类型，例如 m4a，mp4 等。 |
| VideoStreamSet | Array of Object | 视频流信息。 |
| Bitrate | Integer | 视频流的码率，单位：bps。 |
| Height | Integer | 视频流的高度，单位：px。 |
| Width | Integer | 视频流的宽度，单位：px。 |
| Codec | String | 视频流的编码格式，例如 h264。 |
| Fps | Integer | 帧率，单位：hz。 |
| CodecTag | String | 编码标签，仅当 Codec 为 hevc 时有效。 |
| DynamicRangeInfo | Object | 画面动态范围信息。 |
| Type | String | <p>画面动态范围信息。</p><ul><li>SDR：Standard Dynamic Range 标准动态范围。</li><li>HDR：High Dynamic Range 高动态范围。</li></ul> |
| HDRType | String | <p>高动态范围类型标准，当 Type 为 HDR 时有效。</p><ul><li>hdr10</li><li>hlg</li></ul> |
| AudioStreamSet | Array of Object | 音频流信息。 |
| Bitrate | Integer | 音频流的码率，单位：bps。 |
| SamplingRate | Integer | 音频流的采样率，单位：hz。 |
| Codec | Integer | 音频流的编码格式，例如 aac。 |
| DigitalWatermarkType | String | <p>数字水印类型。</p><ul><li>Trace：表示经过溯源水印处理。</li><li>CopyRight：表示经过版权水印处理。</li><li>None：表示没有经过任何水印处理。</li></ul> |
| CopyRightWatermarkText | String | 版权信息。 |

<a id="huawei"></a>
**Huawei**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| NextMarker | String | 下一次检索时的索引。在下次调用本接口时，传入到请求参数 Marker 中。 |
| └ Keys | Array of Object | 媒体文件信息列表，详情可见 [Keys](#keys)。 |

<a id="keys"></a>
**Keys**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| ETag | String | 媒体文件的 md5 值。 |
| Key | String | 媒体文件的唯一标识，即 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 中的 ObsObject。 |
| LastModified | String | 媒体文件的最后一次修改时间。 |
| Size | Number | 媒体文件的大小。 |
| MediaUrl | String | 媒体文件的地址。 |

<a id="ws"></a>
**Ws**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| NextMarker | String | 下一次检索时的索引。在下次调用本接口时，传入到请求参数 Marker 中。 |
| └ Keys | Array of Object | 媒体文件信息列表，详情可见 [Keys](#keys)。 |

<a id="keys"></a>
**Keys**
| 名称<br/> | 类型<br/> | 备注<br/> |
|---|---|---|
| ETag | String | 媒体文件的 md5 值。 |
| Key | String | 媒体文件的唯一标识，即 <a href="https://doc-zh.zego.im/article/19690" target="blank">录制文件生成回调</a> 中的 PersistentId。 |
| LastModified | String | 媒体文件的最后一次修改时间。 |
| Size | Number | 媒体文件的大小。 |
| MediaUrl | String | 媒体文件的地址。 |



## 响应示例

```json
{
    "Code":0,
    "Message":"success",
    "Data":{
        "Tencent": {
            "TotalCount": 1,
            "MediaInfoSet": [
                {
                    "BasicInfo": {
                        "Name": "1690354361.mp4",
                        "Description": "",
                        "CreateTime": "2023-07-26T06:52:49Z",
                        "UpdateTime": "2023-07-26T10:21:33Z",
                        "ExpireTime": "9999-12-31T23:59:59Z",
                        "ClassId": 0,
                        "ClassName": "其他",
                        "ClassPath": "其他",
                        "CoverUrl": "",
                        "Type": "mp4",
                        "MediaUrl": "http://push.url/6cbbc436vodcq1500020831/03c1ada53270835011057780896/9e505713fb216f0b0232064f.mp4",
                        "SourceInfo": {
                            "SourceType": "VideoProcessing",
                            "SourceContext": ""
                        },
                        "StorageRegion": "ap-chongqing",
                        "Vid": "3270835011057780896",
                        "Category": "Video",
                        "Status": "Normal",
                        "StorageClass": "STANDARD"
                    },
                    "TranscodeInfo": {
                        "TranscodeSet": [
                            {
                                "Url": "http://push.url/6cbbc436vodcq1500020831/03c1ada53270835011057780896/9e505713fb216f0b0232064f.mp4",
                                "Definition": 0,
                                "Bitrate": 576721,
                                "Height": 360,
                                "Width": 640,
                                "Size": 2239086,
                                "Duration": 31.104,
                                "Md5": "",
                                "Container": "mov,mp4,m4a,3gp,3g2,mj2",
                                "VideoStreamSet": [
                                    {
                                        "Bitrate": 530177,
                                        "Height": 360,
                                        "Width": 640,
                                        "Codec": "h264",
                                        "Fps": 14,
                                        "CodecTag": "",
                                        "DynamicRangeInfo": {
                                            "Type": "SDR",
                                            "HDRType": ""
                                        }
                                    }
                                ],
                                "AudioStreamSet": [
                                    {
                                        "Bitrate": 46544,
                                        "SamplingRate": 16000,
                                        "Codec": "aac"
                                    }
                                ],
                                "DigitalWatermarkType": "None",
                                "CopyRightWatermarkText": ""
                            },
                            {
                                "Url": "http://push.url/43a5b1devodtranscq1500020831/03c1ada53270835011057780896/v.f100020.mp4",
                                "Definition": 100020,
                                "Bitrate": 427974,
                                "Height": 540,
                                "Width": 960,
                                "Size": 1677353,
                                "Duration": 31.151,
                                "Md5": "4f51593ed8e28b5d35553f4977d39547",
                                "Container": "mov,mp4,m4a,3gp,3g2,mj2",
                                "VideoStreamSet": [
                                    {
                                        "Bitrate": 363857,
                                        "Height": 540,
                                        "Width": 960,
                                        "Codec": "h264",
                                        "Fps": 25,
                                        "CodecTag": "avc1",
                                        "DynamicRangeInfo": {
                                            "Type": "SDR",
                                            "HDRType": ""
                                        }
                                    }
                                ],
                                "AudioStreamSet": [
                                    {
                                        "Bitrate": 64117,
                                        "SamplingRate": 44100,
                                        "Codec": "aac"
                                    }
                                ],
                                "DigitalWatermarkType": "None",
                                "CopyRightWatermarkText": ""
                            }
                        ]
                    },
                    "FileId": "3270835011057780896"
                }
            ],
            "RequestId": "c827629f-08b4-406c-b063-b660126e922f"
        },
        "Huawei": {
            "Keys": [
                {
                    "ETag": "\"ef4e0314095b8aae02d7a5adaa60c94f\"",
                    "Key": "record/app/command_record/alinxu_test/2023-07-28-09-30-06.mp4",
                    "LastModified": "2023-07-28T09:31:29.176Z",
                    "Size": 2172786,
                    "MediaUrl": "http://push.url/record/app/command_record/alinxu_test/2023-07-28-09-30-06.mp4"
                }
            ],
            "NextMarker": ""
        },
        "Ws": {
            "Keys": [
                {
                    "ETag": "lv1tsU6T8r9hDZietipfSphc806Y",
                    "Key": "app-alinxu_test--20230728181527.mp4",
                    "LastModified": "2023-07-28T10:16:44Z",
                    "Size": 6441553,
                    "MediaUrl": "http://push.url/app-alinxu_test--20230728181527.mp4"
                }
            ],
            "NextMarker": ""
        }
    },
    "RequestId":"6877226848471811505"
}
```

## 返回码

以下仅列出了接口业务逻辑相关的部分返回码，完整返回码请参考 [全局返回码](https://doc-zh.zego.im/)。

|返回码|说明|处理建议|
|-----|------|-----|
| 0 | 请求成功。 |-|
| 2 | 输出参数错误。 |-|
| 3 | 未开通相关权限。 | 请联系 ZEGO 技术支持。|
| 4 | CDN 类型不匹配。 | 请检查参数。|
| 5 | 配置错误。 | 请联系 ZEGO 技术支持。|
| 6 | 请求过于频繁。 | 请稍后重试。|
| 7 | 鉴权失败。 | 请检查鉴权参数是否正确。|
| 8 | 获取鉴权配置失败。 | 请联系 ZEGO 技术支持是否开通此服务。|
| 1000  | 请求失败。 | 请联系 ZEGO 技术支持。|
