# 白板录制
---
## 功能描述

白板录制支持将文件、白板信令的操作录制成一个视频文件。单流录制模式下，白板会录制生成一个视频文件。混流录制模式下，白板会与其它音视频流混合成一个画面后生成一个音视频文件。
<Note title="说明">

- 阅读本文前，请确保您已了解 [单流录制](/cloud-recording/common-features/single-stream-recording)、[混流录制](/cloud-recording/common-features/mixed-stream-recording) 和 [设置混流布局](/cloud-recording/common-features/set-the-mixed-flow-layout)。 
- 混流录制模式下白板的布局请参考 [设置混流布局](/cloud-recording/common-features/set-the-mixed-flow-layout) 中各个布局的注意事项。
</Note>

云端录制支持的文件格式如下：
- 静态演示文件：PPTX、PPT。
- 动态演示文件：PPTX、PPT。
- 表格文件：XLS、XLSX。
- 文本文件：DOC、DOCX、TXT、PDF。
- 图片文件：JPG、JPEG、PNG、BMP。

<Note title="说明">
动态演示文件，即包含动画效果或音视频画面的 PPT 文件。
</Note>

本文介绍如何通过使用云端录制 API 进行白板录制。

## 实现方法

在调用 [StartRecord](/cloud-recording-server/start)  方法时，将 `HasWhiteboard` 设置为 true 即可录制白板。 `Whiteboard` 是一个 json 数组，用于设置白板有关的参数，目前仅支持录制一路白板画面。

<Warning title="注意">

* `HorizontalRatio` 和 `VerticalRatio` 表示原始白板画面的宽高比，为必选参数。  
* `Width` 和 `Height` 表示单流录制模式下输出的白板视频的分辨率，混流录制模式下无需设置该参数。  
* `WhiteboardId` 表示当前录制的白板 ID，若使用超级白板，请通过 `whiteboardIDlist` 获取 `WhiteboardId`。
</Warning>

白板切换时，需要调用 [UpdateWhiteboard](/cloud-recording-server/update-whiteboard) 方法，通过设置 `WhiteboardId` 参数通知云端录制服务当前录制的白板。

## 请求示例

以下是一个混流录制模式下开启白板录制的示例。

`Content-type` 为 `application/json;charset=utf-8`，StartRecord 请求包体内容如下：

```json
{
	"RoomId": "xxxx",
	"RecordInputParams": {
		"RecordMode": 2,
		"StreamType": 3,
		"HasWhiteboard": true,
		"Whiteboard": [
			{
				"HorizontalRatio": 16,
				"VerticalRatio": 9,
				"Width": 1280,
				"Height": 720,
				"WhiteboardId": "0000"
			}
		],
		"MaxIdleTime": 60,
		"MixConfig": {
			"MixMode": 3,
			"MixOutputStreamId": "mix",
			"MixOutputVideoConfig": {
	                "Width": 1280, 
	                "Height": 720, 
	                "Fps": 15, 
	                "Bitrate": 1130000
	        }
		}
	},
	"RecordOutputParams": {
		"OutputFileFormat": "mp4",
		"OutputFolder": "record/"
	},
	"StorageParams": {
		"Vendor": 2,
		"Region": "oss-xxxx",
		"Bucket": "xxxx",
		"AccessKeyId": "xxxx",
		"AccessKeySecret": "xxxx"
	}
}
```

## 常见问题

- [录制过程中，房间内的白板不需要录制了，要如何操作？](https://doc-zh.zego.im/faq/excludeWhiteBoardDuringRecording)
- [为什么启动录制后，录制任务成功，但是录制结果的视频中没有显示白板？](https://doc-zh.zego.im/faq/No_Whiteboard)
- [为什么录制结果中，白板的窗口变小，出现异常？](https://doc-zh.zego.im/faq/whiteboard_small)
- [为什么白板的窗口位置会显示背景图？](https://doc-zh.zego.im/faq/whiteboard_backgroud)
- [录制视频里可以同时展示两个白板窗口么？](https://doc-zh.zego.im/faq/Record2Board)
- [当开启了白板录制，但房间内过了一段时间才新增白板，白板如何录制？](https://doc-zh.zego.im/faq/delay_board_record)
