# 设置混流布局
---
## 功能描述

使用混流录制时，云端录制服务会对房间内的所有音视频流与白板进行混流转码，将其混合在一个画面中。每路音视频流与白板在画面中的显示位置依赖于设置的布局方式，如果原视频的宽高比与混流布局中的宽高比不一致，可能出现裁剪或压缩。

云端录制支持的布局方式如下：

* 自定义布局：灵活设置每个画面的位置和大小，最多支持 25 个画面。
* 平分布局：所有画面平铺显示，根据画面的数量自动调整每个画面的大小和位置，每个画面的大小一致，最多支持 25 个画面。
* 水平布局：显示一个大画面和若干个小画面，小画面在画布上方从左到右排列，根据画面的数量自动调整每个画面的大小和位置，每个小画面的大小一致，最多支持 25 个画面。
* 垂直布局：显示一个大画面和若干个小画面，小画面在画布右侧从上到下排列，根据画面的数量自动调整每个画面的大小和位置，每个小画面的大小一致，最多支持 25 个画面。
* 悬浮布局：显示一个大画面和若干个小画面，大画面铺满整个画布，小画面在画布下方从右到左排列，每个小画面的大小一致，悬浮在大画面上方，最多支持 25 个画面。

<Note title="说明">

如果某条流只有音频数据，依然会占据一个画面。  
</Note>

## 实现方法

在调用 [StartRecord](/cloud-recording-server/start) 方法时，通过设置 `MixMode` 参数选择布局方式。在录制过程中可以通过调用 [UpdateLayout](/cloud-recording-server/update-layout) 方法更改布局方式。

本节将详细介绍几种布局方式，示例中的数字代表流加入房间的先后顺序。

### 平分布局

<Warning title="注意">

- 在以下平分布局示例中，如果房间内的流数不足，则剩余位置会空置显示背景色。  
- 未设置补白参数时，中途有流退出房间，则该条流的画面会被后进入房间的流顶替。如果设置了补白参数，中途退出房间的流依然会占据原先的画面，停留在最后一帧。  
- 如果开启了白板录制，当房间内有白板时，白板画面会始终占据1号画面。  
- 如果实际视频流的宽高比与画面的宽高比不一致，原视频会裁剪以适配画面的大小。  
</Warning>

实际布局效果如下所示：

<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/AdaptiveLayout1.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/AdaptiveLayout2.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/AdaptiveLayout4.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/AdaptiveLayout6.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/AdaptiveLayout9.png" /></Frame>

<Note title="说明">

以此类推，优先按列扩展，直至25个画面。  
</Note>

### 水平布局

水平布局可以在调用 [StartRecord](/cloud-recording-server/start) 方法和 [UpdateLayout](/cloud-recording-server/update-layout) 方法时通过设置 `MixMaxResolutionStreamId` 来指定大画面显示的流。

<Warning title="注意">

- 未设置 `MixMaxResolutionStreamId` 时，大画面显示最先进入房间的流。  
- 设置了 `MixMaxResolutionStreamId` 但该条流还未进入房间时，该画面显示背景色。  
- 在以下水平布局示例中，如果房间内的流数不足，则剩余位置会空置显示背景色。  
- 未设置补白参数时，中途有流退出房间，则该条流的画面会被后进入房间的流顶替。如果设置了补白参数，中途退出房间的流依然会占据原先的画面，停留在最后一帧。  
- 如果开启了白板录制，当房间内有白板时，`MixMaxResolutionStreamId` 参数失效，白板画面会始终占据大画面。  
- 如果实际视频流的宽高比与画面的宽高比不一致，对于大画面，原视频会缩放以适配画面的大小，对于小画面，原视频会裁剪以适配画面的大小。  
</Warning>

实际布局效果如下所示：

<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/HorizontalLayout9.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/HorizontalLayout5.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/HorizontalLayout17.png" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/HorizontalLayout25.png" /></Frame>

### 垂直布局

垂直布局可以在调用 [StartRecord](/cloud-recording-server/start) 方法和 [UpdateLayout](/cloud-recording-server/update-layout) 方法时通过设置 `MixMaxResolutionStreamId` 来指定大画面显示的流。

注意事项请参考 [水平布局](#水平布局)，实际布局效果如下所示：

<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/VerticalLayout5.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/VerticalLayout9.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/VerticalLayout17.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/VerticalLayout25.jpg" /></Frame>

### 悬浮布局

悬浮布局可以在调用 [StartRecord](/cloud-recording-server/start) 方法和 [UpdateLayout](/cloud-recording-server/update-layout) 方法时通过设置 `MixMaxResolutionStreamId` 来指定大画面显示的流。

注意事项请参考 [水平布局](#水平布局)，实际布局效果如下所示：

<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/FloatingLayout5.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/FloatingLayout9.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/FloatingLayout17.jpg" /></Frame>
<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/FloatingLayout25.jpg" /></Frame>

### 自定义布局

自定义布局可以在调用 [StartRecord](/cloud-recording-server/start) 方法和 [UpdateLayout](/cloud-recording-server/update-layout) 方法时通过设置 `MixInputList` 来设定每个画面的大小、位置、显示的流。

`MixInputList` 是一个 json 数组，最多可以设置 25 个画面，参数定义如下：

| 参数      | 类型   | 是否必选 | 描述                                                         |
| :-------- | :----- | :------- | :----------------------------------------------------------- |
| StreamId | String | 否       | 指定在该画面显示的 streamID，如果未指定，会按照流加入房间的时间顺序进行匹配。                                            |
| ViewType | Int    | 否       | 该画面显示内容的类型。<ul><li>1：音视频（默认值）</li><li>2：白板</li></ul> 类型 2 仅在开启白板录制时有效，仅支持将一个画面设置为白板，超过两个及以上会返回错误。|
| Top       | Int    | 是       | 画布上该画面左上角的 y 轴坐标，取值范围 [0, 1920]，不能超过 bottom 的值和画布的高。                                        |
| Left      | Int    | 是       | 画布上该画面左上角的 x 轴坐标，取值范围 [0, 1920]，不能超过 right 的值和画布的宽。                                       |
| Bottom    | Int    | 是       | 画布上该画面右下角的 y 轴坐标，取值范围 [0, 1920]，不能超过画布的高。                                       |
| Right     | Int    | 是       | 画布上该画面右下角的 x 轴坐标，取值范围 [0, 1920]，不能超过画布的宽。                                       |
| Layer     | Int    | 是       | 该画面的图层优先级，当两个画面发生重叠时，数值大的显示在上方。                                                 |
| FillMode | Int    | 否       | 实际视频流宽高比与画面不一致时的处理方式。<ul><li>1：裁剪模式，该模式下优先保证画面被填满，原视频等比缩放填满画面后，四周超出画面的内容会被裁剪。（默认值）</li><li>2：缩放模式，该模式下优先保证原视频的完整性，原视频等比缩放填满画面后，四周会补一圈黑边。</li></ul> |

<Warning title="注意">

- 设置了 `StreamId` 但该条流还未进入房间时，该画面显示背景色。  
- 如果房间内的流数不足，则剩余位置会空置显示背景色。  
- 未设置补白参数时，中途有流退出房间，且该条流的画面未设置 `StreamId`，则该画面会被后进入房间的流顶替，如果设置了 `StreamId` 则该画面依然占据原先的位置显示为背景色。如果设置了补白参数，中途退出房间的流依然会占据原先的画面，停留在最后一帧。  
- 如果开启了白板录制，当房间内有白板时，会显示在 `ViewType` 设置为 “2” 的画面。  
</Warning>

坐标系如下图所示：

<Frame width="384" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/CommonFeatures/MixRecord/CoordinateSys.png" /></Frame>


## 请求示例

在录制过程中，可以随时调用本方法更新混流布局，以下是一个更新自定义布局的示例。

`Content-type` 为 `application/json;charset=utf-8`，UpdateLayout 请求包体内容如下：

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
## 常见问题

- [为什么指定了 StreamId，但自定义布局不生效？](https://doc-zh.zego.im/faq/stream_id_invalid)
- [混流的 MixInputList 参数，如果 ViewType 设为 2，StreamId 需要如何设置？](https://doc-zh.zego.im/faq/view_type_2)
- [为什么白板的窗口位置会显示音视频流？](https://doc-zh.zego.im/faq/whiteboard_stream)
- [自定义布局、水平布局、平分布局、垂直布局、悬浮布局都支持指定白板的位置吗？](https://doc-zh.zego.im/faq/Record_board_Postion)
- [混流录制自定义布局下，如果 MixInputList 只有一个布局，可以录制多条流么？](https://doc-zh.zego.im/faq/single_layout_multi_stream)
