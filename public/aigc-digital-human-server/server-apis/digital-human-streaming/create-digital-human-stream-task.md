## 接口原型

- 请求方法：POST
- 请求体格式：JSON
- 请求地址：{props.link}
- 传输协议：HTTPS
- 调用频率限制：{props.rateLimit || '10 次/秒'}
# 创建数字人视频流任务

---

##  描述

通过本接口，您可以创建数字人视频流任务。

<PostPrototype link="https://aigc-digitalhuman-api.zegotech.cn?Action=CreateDigitalHumanStreamTask" />

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式 - 公共请求参数](/aigc-digital-human-server/server-apis/accessing-server-apis#公共请求参数)。

| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| DigitalHumanConfig      | Object | 是    | 数字人配置。 本参数结构，请参考 [DigitalHumanConfig](#digitalhumanconfig)。     |
| RTCConfig      | Object | 是    | RTC 相关配置。 本参数结构，请参考 [RTCConfig](#rtcconfig)。           |
| VideoConfig      | Object | 是    | 视频相关配置。 本参数结构，请参考 [VideoConfig](#videoconfig)。           |
| Assets      | Array of Object | 是    | 素材相关配置，可通过此配置设置背景图片或挂件等。 本参数结构，请参考 [Asset](#asset)。           |
| TTL      | Number | 否    | 数字人视频流任务最大时长，持续时间达到该值自动结束。 单位为秒，取值范围为 [10, 86400]，如果不填，取值为 86400 秒（24 小时）。     |

### DigitalHumanConfig
| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| DigitalHumanId      | String | 是    | 数字人 ID。     |
| BackgroundColor     | String | 否    | 背景颜色，十六进制的 RGB 值，格式如 `#80ffffff`，如果不填，取值为 `#00000000`（黑色）。 |
| Layout      | Object | 否    | 数字人布局。 本参数结构，请参考 [Layout](#layout)。           |

### Layout

<Note title="说明"> 坐标系的原点 (0, 0) 位于屏幕/画布的左上角，X 轴向右递增，Y 轴向下递增。</Note>

| 参数     | 类型     | 是否必填 | 描述                         |
| ------ | ------ | ---- | -------------------------- |
| Top    | Number | 是    | 数字人/资源左上角的纵坐标，单位为像素。        |
| Left   | Number | 是    | 数字人/资源左上角的横坐标，单位为像素。        |
| Width  | Number | 是    | 数字人/资源宽度，单位为像素。               |
| Height | Number | 是    | 数字人/资源高度，单位为像素。               |
| Layer  | Number | 否    | 数字人/资源层级，必须 ≥ 0，值越大越靠前。默认值为 0。 |

### RTCConfig
| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| RoomId      | String | 是    | 推流目标房间 ID，长度在 128 字节以内，用户自定义传入。     |
| StreamId      | String | 是    | 流 ID，长度在 128 字节以内，仅支持数字，英文字符 和 ‘-’，’_’。<Note title="注意">请注意，StreamId 必须是 AppID 全局内唯一，用户自定义传入。</Note>    |

### VideoConfig

| 参数      | 类型     | 是否必填 | 描述                                                        |
| ------- | ------ | ---- | --------------------------------------------------------- |
| Width   | Number | 是    | 视频流的宽度，单位为像素，最大 1920。且 `Width × Height` 不得超过 1920 × 1080。 |
| Height  | Number | 是    | 视频流的高度，单位为像素，最大 2560。且 `Width × Height` 不得超过 1920 × 1080。 |
| Bitrate | Number | 否    | 视频码率，单位为 bps，范围为 [100000, 3000000]，默认值为 3000000。         |

### Asset
| 参数               | 类型   | 是否必填 | 描述             |
|------------------|------|------|-------------------------|
| AssetType      | Number | 是    | 资源类型，<ul><li>1：图片。</li></ul>     |
| AssetUrl      | String | 是    | 资源 URL，长度在 1024 字节以内。     |
| Layout        | Object | 是    | 资源布局。 本参数结构，请参考 [Layout](#layout)。           |

## 请求示例

- 请求地址 URL：

    ```https
    https://aigc-digitalhuman-api.zegotech.cn?Action=CreateDigitalHumanStreamTask
    &<公共请求参数>
    ```

- 请求消息体：

    ```json
    {
        "DigitalHumanConfig": {
            "DigitalHumanId": "0d3538a4-9e8e-4155-b1fb-c7defb8eeef8",
            "Layout": {
                "Top": 0,
                "Left": 0,
                "Width": 1080,
                "Height": 1920,
                "Layer": 2
            }
        },
        "RTCConfig": {
            "RoomId": "1234567890",
            "StreamId": "elias1"
        },
        "VideoConfig": {
            "Width": 1080,
            "Height": 1920
        },
        "Assets": [
            {
                "AssetType": 1,
                "AssetUrl": "https://xxx.com/xxx.jpg",
                "Layout": {
                    "Top": 0,
                    "Left": 0,
                    "Width": 1920,
                    "Height": 1080,
                    "Layer": 1
                }
            }
        ]
    }
    ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Number | 返回码。0 表示成功，其他值表示失败。如需了解错误码及响应处理建议，请参考 [返回码](/aigc-digital-human-server/server-apis/return-codes)。 |
| Message | String | 请求结果的说明信息。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 返回数据。 |
| └TaskId      | String       | 数字人视频流任务 ID。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "success",
    "RequestId": "d799c85c-10c8-4191-8c6a-3290a5940b5f",
    "Data": {
        "TaskId": "6a5898fa-3e1d-4a6f-b949-05f39f1c10cb"
    }
}
```