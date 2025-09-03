

# 更新混流布局

---

## 描述

在录制过程中，可以随时调用本接口更改混流布局的设置。

## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=UpdateLayout`
- 传输协议：HTTPS
- 调用频率限制：10 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| TaskId | String | 是 | 录制任务 ID，长度固定为 16 个字节的字符串。 |
| MixMode | Int | 否 | 布局方式。<ul><li>1：自定义布局，必须指定 MixInputList</li><li>2：平分布局（默认值）</li><li>3：水平布局</li><li>4：垂直布局</li><li>5：悬浮布局</li></ul> |
| MixInputList | Array of Object | 否 | 自定义布局参数。<br />详见 <a href="#mixinputlist">MixInputList 属性列表</a>。 |
| MixMaxResolutionStreamId | String | 否 | <code>MixMode</code> 设为 3、4、5 时，用于指定显示大画面的流 ID。 |

<span id="mixinputlist"></span>
**MixInputList**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| <p id="StreamId">StreamId</p> | String | 否 | 指定在该画面显示的 streamID，如果未指定，会按照流加入房间的时间顺序进行匹配。 |
| ViewType | Int | 否 | 该画面显示内容的类型。<ul><li>1：音视频（默认值）</li><li>2：白板</li></ul> 类型 2 仅在开启白板录制时有效，仅支持将一个画面设置为白板，超过两个及以上会返回错误。 |
| Top | Int | 是 | 画布上该画面左上角的 y 轴坐标，取值范围 [0, 1920]，不能超过 Bottom 的值和画布的高。 |
| Left | Int | 是 | 画布上该画面左上角的 x 轴坐标，取值范围 [0, 1920]，不能超过 Right 的值和画布的宽。 |
| Bottom | Int | 是 | 画布上该画面右下角的 y 轴坐标，取值范围 [0, 1920]，不能超过画布的高。 |
| Right | Int | 是 | 画布上该画面右下角的 x 轴坐标，取值范围 [0, 1920]，不能超过画布的宽。 |
| Layer | Int | 是 | 该画面的图层优先级，当两个画面发生重叠时，数值大的显示在上方。 |
| FillMode | Int | 否 | 实际视频流宽高比与画面不一致时的处理方式。<ul><li>1：裁剪模式，该模式下优先保证画面被填满，原视频等比缩放填满画面后，四周超出画面的内容会被裁剪。（默认值）</li><li>2：缩放模式，该模式下优先保证原视频的完整性，原视频等比缩放填满画面后，四周会补一圈黑边。</li></ul> |
| <p id="BackgroundImage">BackgroundImage</p> | String | 否 | 流画面背景图的 URL 地址，仅当指定了 <a href="#StreamId">StreamId</a> 时生效。<br />自定义布局指定的流不存在或者流中断时会显示该背景图。<ul><li>建议背景图的分辨率与流画面分辨率一致，如两者分辨率不一致，背景图会被拉伸或压缩以填满整个画面。</li><li>背景图格式支持 JPG 和 PNG，大小不能超过 5MB，如背景图下载失败，则设置不生效。</li><li>URL 支持 HTTP 和 HTTPS 协议。</li></ul> |

## 请求示例
- 请求 URL  
  ```
  https://cloudrecord-api.zego.im/?Action=UpdateLayout
  &AppId=1234567890
  &SignatureNonce=15215528852396
  &Timestamp=1234567890
  &Signature=7a2c0f11145fb760d607a07b54825013
  &SignatureVersion=2.0
  ```
- 请求消息体  
  ```json
  {
    "TaskId": "xxxx",
    "MixMode": 1,
    "MixInputList": [
      {
              "StreamId": "xxxx", 
              "ViewType": 1, 
              "Top": 0, 
              "Left": 0, 
              "Bottom": 720, 
              "Right": 540, 
              "Layer": 1
      },
      {
              "StreamId": "", 
              "ViewType": 1, 
              "Top": 0, 
              "Left": 540, 
              "Bottom": 360, 
              "Right": 1080, 
              "Layer": 1
      },
      {
              "StreamId": "", 
              "ViewType": 1, 
              "Top": 360, 
              "Left": 540, 
              "Bottom": 720, 
              "Right": 1080, 
              "Layer": 1
      }
    ]
  }
  ```

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |

## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123"
}
```
