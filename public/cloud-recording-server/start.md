

# 开始录制

---

## 描述

调用本接口开始云端录制。

当开发者成功调用 StartRecord 接口后，云端录制服务会根据设置的录制参数录制房间内的音视频流和白板。

<Warning title="注意">
- 每个录制任务时间最长为 24 小时。超过 24 小时，录制任务将自动停止录制。
- <b>ZEGO 建议您的每个录制任务都调用 [StopRecord](/cloud-recording-server/stop) 方法停止录制，以免持续录制产生额外的费用。</b>
</Warning>


## 接口原型

- 请求方法：POST
- 请求地址：`https://cloudrecord-api.zego.im/?Action=StartRecord`
- 传输协议：HTTPS
- 调用频率限制：50 次/秒

## 请求参数

以下请求参数列表仅列出了接口请求参数和部分公共参数，完整公共参数列表请参考 [调用方式](/cloud-recording-server/making-api-requests#公共请求参数) 中的 “公共请求参数”。

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| RoomId | String | 是 | 待录制的房间 ID。 |
| RecordInputParams | Object | 是 | 录制任务输入参数。<br />详见 <a href="#recordinputparams">RecordInputParams 属性列表</a>。 |
| RecordOutputParams | Object | 否 | 录制任务输出参数。<br />详见 <a href="#recordoutputparams">RecordOutputParams 属性列表</a>。 |
| StorageParams | Object | 是 | 录制任务的存储配置。<br />详见 <a href="#storageparams">StorageParams 属性列表</a>。 |

<span id="recordInputParams"></span>
**RecordInputParams**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| RecordMode | Int | 是 | 录制模式。<ul><li>1：单流录制</li><li>2：混流录制</li></ul> |
| StreamType | Int | 否 | 录制媒体流类型，仅适用于音视频流，白板只会录制视频。<ul><li>1：仅录制音频</li><li>2：仅录制视频</li><li>3：录制音视频（音视频文件合并）（默认值）</li><li>4：录制音视频（音频视频文件分离）</li></ul> |
| RecordStreamList | Array of Object | 否 | 仅适用于单流录制模式，指定要录制的流信息列表。<br />详见 <a href="#recordstreamlist">RecordStreamList 属性列表</a>。<br />若未指定该字段或该列表为空，默认录制房间中所有流。 |
| <p id="FillBlank">FillBlank</p> | Bool | 否 | <p>流中断时是否自动补白，默认为 false，即不补白。</p><ul><li>true：用户推流中断时会自动补白，根据录制模式不同，自动补白的效果不同。</li><ul><li>**单流录制**：只对音频进行补白。<Note title="说明"><p>若推流端仅推视频流，或录制媒体流类型为仅录制视频，则无法补白。</p></Note>中断过程中，服务端将为音频补充静音帧，直到使用同样的流 ID 重新在房间内推流。最终，同一份录制文件会保留正常推流内容和静音帧。</li><li>**混流录制**：中断过程中，视频将停留在最后一帧（默认）或显示流画面背景图。此外，若混流中没有音频内容了，服务端将补充静音帧，直到使用同样的流 ID 重新在房间内推流。最终，同一份录制文件会保留正常推流内容、补白画面和静音帧（如有）。如果需要使用流画面背景图作为补白，请参考 <a href="#DefaultMixStreamBackgroundImage">DefaultMixStreamBackgroundImage</a> 和 <a href="#BackgroundImage">BackgroundImage</a> 参数说明。仅当进行混流录制时（即 RecordMode 取值为 2），设置流画面背景图才会生效。</li></ul><li>false：用户推流中断时不会补白，该用户下次重推生成新的录制文件。</li></ul><p>中断补白的时机有两种可能：</p><ul><li>房间无流时长超时导致自动停止云录制，见 MaxIdleTime 的定义。</li><li>主动停止云录制。</li></ul> |
| FillFrame | Object | 否 | 关闭摄像头后（音频持续在推）填充画面的方式，仅适用于混流录制。<br />详见 <a href="#fillframe">FillFrame 属性列表</a>。 |
| RecordMuteAudio | Int | 否 | 指定是否录制静音状态下的音频帧数据，仅当单流录制、只录制音频且输出文件格式为 mp3 时生效。<ul><li>1：录制静音状态下的音频帧（默认值）</li><li>2：不录制静音状态下的音频帧</li></ul> |
| RecordMuteAudioSplitThreshold | Int | 否 | 录制文件自动分片的静音时长阈值，单位：秒。<br />录制过程中如果静音状态时长大于等于该阈值，则该段静音前后会生成为不同的录制文件。<br />仅当单流录制、只录制音频、输出文件格式为 mp3 且 RecordMuteAudio 为 2 时生效。<br />指定为 0 时遇静音即分片，不指定或者指定为负数时表示不分片。 |
| HasWhiteboard | Bool | 否 | 是否录制白板。<ul><li>true：录制白板</li><li>false：不录制白板（默认值）</li></ul>本参数为 true 时 <code>Whiteboard</code> 参数必选。 |
| Whiteboard | Array of Object | 否 | 白板参数，<code>HasWhiteboard</code> 为 true 时必选。<br />详见 <a href="#whiteboard">Whiteboard 属性列表</a>。 |
| <p id="MaxIdleTime">MaxIdleTime</p> | Int | 否 | 房间内没有任何流、白板之后多长时间自动停止云录制，单位：秒。默认值为 30 秒，该值需大于等于 5，且小于等于 86400（24 小时）。<br /><b>注意：该参数仅当房间内无流、无白板时生效。</b><br/> |
| <p id="MaxRecordTime">MaxRecordTime</p> | Int | 否 | 录制任务最大时长，录制持续时间达到该值自动结束。单位：秒。默认值 86400 秒（24 小时），该值需大于等于 300，且小于等于 86400（24 小时）。 |
| MixConfig | Object | 否 | 混流参数，<code>RecordMode</code> 为 2 时必选。<br />详见 <a href="#mixconfig">MixConfig 属性列表</a>。 |

<Warning title="注意">
- `FillBlank` 和 `MaxIdleTime` 作用对象不同：
    - `FillBlank`：作用于流本身，只要录制任务还在进行，`FillBlank`设置为 true 后，若流处于中断状态，则会继续以补白的方式录制，此时该流仍然为中断状态，不影响房间内有无流的判断。
    - `MaxIdleTime`：作用于整个录制任务状态，当房间内无流时长超过 `MaxIdleTime` 时，则会中止整个录制任务。
- 混流录制模式下，若 `StreamType` 为 1，表示仅录制音频，此时无法录制白板。
</Warning>

<span id="recordstreamlist"></span> 
**RecordStreamList**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| StreamId | String | 是 | 待录制的流 ID。 |

<span id="fillframe"></span>
**FillFrame**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FrameFillMode | Int | 否 | 画面填充模式。<ul><li>1：填充最后一帧（默认值）</li><li>2：填充指定颜色</li><li>3：不填充帧</li></ul> |
| FrameFillColor | Int | 否 | <code>FrameFillMode</code> 设置为 2 时有效，用于指定填充颜色，默认为黑色。前三个字节为 RGB 颜色值，第四个字节固定为 0，即 0xRRGGBB00。 |

<Warning title="注意">
`FrameFillMode` 相关：  
- 小程序端仅支持填充最后一帧，不支持填充指定颜色或不填充帧。
- web 端仅支持填充黑色，不支持填充最后一帧或填充其它颜色或不填充帧。
</Warning>

<span id="whiteboard"></span>
**Whiteboard**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| HorizontalRatio | Int | 是 | 原始白板的宽高比（宽）。 |
| VerticalRatio | Int | 是 | 原始白板的宽高比（高）。 |
| Width | Int | 否 | 单流录制白板输出视频的分辨率宽，默认值为 1280。 |
| Height | Int | 否 | 单流录制白板输出视频的分辨率高，默认值为 720。 |
| WhiteboardId | String | 否 | 录制白板的 ID。<ul><li>如果希望开始录制后立刻录制白板，必须指定白板 ID。</li><li>如果希望开始录制后先不录制白板，可不携带该参数，待需要录制白板时调用 [更新白板](/cloud-recording-server/update-whiteboard) 接口指定白板 ID。</li></ul> |
| BackgroundColor | Int | 否 | 白板背景颜色，默认为白色。前三个字节为 RGB 颜色值，第四个字节固定为 0，即 0xRRGGBB00。 |
| IsPPTAnimation | Bool | 否 | 是否录制动态 PPT，默认为 false。<ul><li>true：录制动态 PPT，支持录制 PPT 中的动画效果、视频。</li><li>false：不录制动态 PPT，PPT 中的动画效果、视频不会被录制下来。</li></ul> |
| PPTAnimationFps | Int | 否 | 录制动态 PPT 的帧率，默认值为 15，有效范围 [1,30]。 |

<Warning title="注意">
使用录制动态 PPT 功能前，请联系 ZEGO 商务人员付费开通。否则，设置 `IsPPTAnimation` 和 `PPTAnimationFps` 参数无效。
</Warning>

<span id="mixconfig"></span>
**MixConfig**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| MixMode | Int | 否 | 布局方式。<ul><li>1：自定义布局，必须指定 MixInputList</li><li>2：（默认）平分布局</li><li>3：水平布局</li><li>4：垂直布局</li><li>5：悬浮布局</li></ul> |
| MixInputList | Array of Object | 否 | 自定义布局参数。<br />详见 <a href="#mixinputlist">MixInputList 属性列表</a>。 |
| FillMode | Int | 否 | <strong>(适用于 <code>MixConfig</code> 中的 <code>MixMode</code> 不为 <code>1</code>，即不是自定义布局时)</strong><br />实际视频流宽高比与画面不一致时的处理方式。<ul><li>1：裁剪模式，该模式下优先保证画面被填满，原视频等比缩放填满画面后，四周超出画面的内容会被裁剪。（默认值）</li><li>2：缩放模式，该模式下优先保证原视频的完整性，原视频等比缩放填满画面后，四周会补一圈黑边。</li></ul><Note title="说明"><p>如需了解适用于自定义布局的 <code>FillMode</code>，请参考 <code>mixinputlist.FillMode</code>。</p></Note> |
| MixOutputStreamId | String | 是 | 指定混流输出的流 ID，将作为 OutputFileRule 中的一部分。 |
| MixOutputVideoConfig | Object | 否 | 输出视频参数；<code>StreamType</code> 为 2、3、4 时，此参数必选。<br />详见 <a href="#mixoutputvideoconfig">MixOutputVideoConfig 属性列表</a>。 |
| MixOutputAudioConfig | Object | 否 | 输出音频参数。<br />详见 <a href="#mixoutputaudioconfig">MixOutputAudioConfig 属性列表</a>。 |
| MixOutputBackgroundColor | Int | 否 | 录制背景颜色，默认为黑色。前三个字节为 RGB 颜色值，第四个字节固定为 0，即 0xRRGGBB00。 |
| MixOutputBackgroundImage | String | 否 | 视频画布背景图的 URL 地址。<ul><li>建议背景图的分辨率与输出视频分辨率一致，如两者分辨率不一致，背景图会被拉伸或压缩以填满整个画面。</li><li>背景图格式支持 JPG 和 PNG，大小不能超过 5MB，如背景图下载失败，则设置不生效。</li><li>URL 支持 HTTP 和 HTTPS 协议。</li></ul> |
| MixMaxResolutionStreamId | String | 否 | <code>MixMode</code> 设为 3、4、5 时，用于指定显示大画面的流 ID。 |
| MixOutputWatermarkImage | String | 否 | 水印图片的 URL 地址。<ul><li>建议水印图片的大小和设置的水印布局大小一致，若两者不一致，水印图片会被拉伸以填满水印布局的位置。</li><li>水印图片格式支持 JPG 和 PNG，大小不能超过 5MB，如水印图片下载失败，则设置不生效。</li><li>URL 支持 HTTP 和 HTTPS 协议。</li></ul> |
| MixOutputWatermarkImageConfig | Object | 否 | 水印布局配置。<br />详见 <a href="#mixoutputwatermarkimageconfig">MixOutputWatermarkImageConfig 属性列表</a>。 |
| <p id="DefaultMixStreamBackgroundImage">DefaultMixStreamBackgroundImage</p> | String | 否 | 流画面默认背景图的 URL 地址，当 <a href="#FillBlank">FillBlank</a> 为 true 时，指定流不存在或者流中断，且录制模式为混流录制时，会显示该背景图。<ul><li>自定义布局时，若对指定流 ID 设置了 <a href="#BackgroundImage">BackgroundImage</a>，则优先显示 BackgroundImage。</li><li>建议背景图的大小和设置的流的画面大小一致，若两者不一致，背景图会被拉伸或压缩以填满整个画面。</li><li>背景图格式支持 JPG 和 PNG，大小不能超过 5MB，如背景图下载失败，则设置不生效。</li><li>URL 支持 HTTP 和 HTTPS 协议。</li></ul> |
| <p id="IsAlwaysMix">IsAlwaysMix</p> | Bool | 否 | 录制任务启动后，是否立即开始录制。默认为 false，表示房间内进行推流后，开始录制。<ul><li>true：录制任务启动后，立即开始录制。</li><li>false：录制任务启动后，等房间内进行推流后，开始录制。</li></ul> |
| MixOutputWatermarkTimestampConfig | Object | 否 | 时间水印配置。配置后，时间水印显示在视频右上角，格式为 yyyy-MM-dd HH:mm:ss。<br />详见 <a href="#mixoutputwatermarktimestampconfig">MixOutputWatermarkTimestampConfig 属性列表</a>。 |
| RecordSoundWave | Bool | 否 | 录制任务启动后，是否记录音浪信息。默认为 false。<ul><li>true：录制任务启动后，每间隔1秒记录当前所有流的音浪信息。</li><li>false：录制任务启动后，不记录音浪信息。</li></ul><p>音浪信息会以 JSON 格式写入到一个独立的文件中，文件名称与录制文件名称一致，后缀为.sw，在录制任务结束后，和录制文件一起上传到指定的云存储位置。</p> |
| SoundWaveType | Int | 否 | 音浪信息类型。<strong>注意：仅当 <code>RecordSoundWave</code> 为 <code>true</code> 时，此参数生效。</strong><ul><li>0：记录流 ID 信息（默认值）。示例：<code>`\{"time":10, "sound_wave":[{"stream_id":"s1", "volume":0}]\}`</code></li><li>1：记录用户 ID 信息。示例：<code>`{"time":10, "sound_wave":[{"user_id":"u1", "volume":0}]}`</code></li></ul> |
| StreamConfigList | Array of Object | 否 | 自定义流参数。<br />详见 <a href="#streamconfiglist">StreamConfigList 属性列表</a>。 |
| ClearInputStreamTimeout | Int | 否 | 等待输入流的超时时间，单位为毫秒。在此期间，ZEGO 服务端等待获取输入流后才开始混流。若超时仍未收到输入流，混流将自动开始。 |

<span id="mixinputlist"></span>
**MixInputList**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| <p id="StreamId">StreamId</p> | String | 否 | <p>指定在该画面中录制的流的 ID。</p><p>如果未指定，会按照流加入房间的时间顺序进行录制。</p> |
| ViewType | Int | 否 | 该画面显示内容的类型。<ul><li>1：音视频（默认值）</li><li>2：白板</li></ul> 类型 2 仅在开启白板录制时有效，仅支持将一个画面设置为白板，超过两个及以上会返回错误。 |
| Top | Int | 是 | 画布上该画面左上角的 y 轴坐标，取值范围 [0, 1920]，不能超过 Bottom 的值和画布的高。 |
| Left | Int | 是 | 画布上该画面左上角的 x 轴坐标，取值范围 [0, 1920]，不能超过 Right 的值和画布的宽。 |
| Bottom | Int | 是 | 画布上该画面右下角的 y 轴坐标，取值范围 [0, 1920]，不能超过画布的高。 |
| Right | Int | 是 | 画布上该画面右下角的 x 轴坐标，取值范围 [0, 1920]，不能超过画布的宽。 |
| Layer | Int | 是 | 该画面的图层优先级，当两个画面发生重叠时，数值大的显示在上方。 |
| FillMode | Int | 否 | 实际视频流宽高比与画面不一致时的处理方式。<ul><li>1：裁剪模式，该模式下优先保证画面被填满，原视频等比缩放填满画面后，四周超出画面的内容会被裁剪。（默认值）</li><li>2：缩放模式，该模式下优先保证原视频的完整性，原视频等比缩放填满画面后，四周会补一圈黑边。</li></ul> |
| <p id="BackgroundImage">BackgroundImage</p> | String | 否 | 流画面背景图的 URL 地址，仅当指定了 <a href="#StreamId">StreamId</a> 时生效。<br />自定义布局指定的流不存在或者流中断时会显示该背景图。<ul><li>建议背景图的大小和设置的流的画面大小一致，若两者不一致，背景图会被拉伸或压缩以填满整个画面。</li><li>背景图格式支持 JPG 和 PNG，大小不能超过 5MB，如背景图下载失败，则设置不生效。</li><li>URL 支持 HTTP 和 HTTPS 协议。</li></ul> |

<span id="mixoutputvideoconfig"></span>
**MixOutputVideoConfig**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Width | Int | 是 | 输出视频的分辨率宽，单位为像素。<br />Width 取值小于或等于 1920，且 Width 和 Height 的乘积不能超过 1920 * 1080，否则会报错。 |
| Height | Int | 是 | 输出视频的分辨率高，单位为像素。<br />Height 取值小于或等于 1920，且 Width 和 Height 的乘积不能超过 1920 * 1080，否则会报错。 |
| Fps | Int | 是 | 输出视频的帧率，默认 15，有效范围 [5,30]。 |
| Bitrate | Int | 是 | 输出视频的码率，单位：bps。例如要设置码率为 1.5 Mbps 时，需要设置设置此参数为 1500*1000，也就是 1500000。 |

<span id="mixoutputaudioconfig"></span>
**MixOutputAudioConfig**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Bitrate | Int | 否 | 音频码率，默认值为 48000 bps。 |

<span id="mixoutputwatermarkimageconfig"></span>
**MixOutputWatermarkImageConfig**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Left | Int | 是 | 画布上该水印左上角的 x 轴坐标，取值范围 [0, 1920]，不能超过 Right 的值和画布的宽。 |
| Top | Int | 是 | 画布上该水印左上角的 y 轴坐标，取值范围 [0, 1920]，不能超过 Bottom 的值和画布的高。 |
| Right | Int | 是 | 画布上该水印右下角的 x 轴坐标，取值范围 [0, 1920]，不能超过画布的宽。 |
| Bottom | Int | 是 | 画布上该水印右下角的 y 轴坐标，取值范围 [0, 1920]，不能超过画布的高。 |

坐标系相关说明，请参考 [设置混流布局 - 自定义布局](/cloud-recording/common-features/set-the-mixed-flow-layout#25-自定义布局)。

<span id="streamconfiglist"></span>
**StreamConfigList**

<table>  
<tbody><tr>
<th>参数</th>
<th>类型</th>
<th>是否必选</th>
<th>描述</th>
</tr>
<tr>
<td>StreamId</td>
<td>String</td>
<td>否</td>
<td>流 ID。</td>
</tr>
<tr>
<td>StreamType</td>
<td>Int</td>
<td>否</td>
<td>流录制类型， 仅在 RecordInputParams 中的 StreamType等于 3 或 4 生效。
<ul><li>0: 默认类型</li><li>1 音频</li><li>2: 视频</li><li>3: 音视频</li></ul></td>
</tr>
</tbody></table>

StreamConfigList 中如果StreamId为空，表示设置参数的默认值，其他没有在 StreamConfigList 中出现的流会使用参数默认值。

<span id="mixoutputwatermarktimestampconfig"></span>
**MixOutputWatermarkTimestampConfig**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| FontSize | Int | 是 | 字体大小，取值范围 [12, 100]，单位 px。 |

<span id="recordoutputparams"></span>
**RecordOutputParams**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| <p id="OutputFileFormat">OutputFileFormat</p> | String | 否 | 指定录制生成文件的格式，默认为 "mp4"。目前支持 "mp4"、"flv"、"hls"、"jpg" 和 "mp3"。如果录制 "mp4" 或 "flv"，且 <code>StreamType</code> 设为 4，则录制生成的音频文件格式为 aac。<Note title="说明">当推流为 VP8 编码且录制生成文件选择 "mp4" 格式时，需要联系 ZEGO 技术支持进行配置。</Note>|
| OutputFolder | String | 否 | 录制文件在第三方云存储的输出目录，默认为根目录。 |
| OutputFileRule | Int | 否 | 录制文件命名规则，默认值为 1（暂不支持设置其它命名格式），表示命名格式为：<ul><li>TaskId_RoomId_UserId_StreamId_Type_UTC（单流录制）</li><li>Taskid_RoomId_MixOutputStreamId_Type_UTC（混流录制）</li><li>Taskid_Roomid_<b>whiteboard</b>_Type_UTC（单流录制带白板）</li></ul>文件名中的字段含义如下：<ul><li>Type：文件类型，V 表示视频文件，A 表示音频文件，VA 表示音视频文件。</li><li>UTC：该文件开始录制时的 UTC 时间，时区为 UTC+0，由年、月、日、小时、分钟、秒和毫秒组成。</li><li>MixOutputStreamId：在 MixConfig 中指定。</li><li>whiteboard：固定，不可修改。</li></ul> |
| SnapshotInterval | Int | 否 | 截图周期，单位：秒。录制文件格式为 "jpg" 时有效，取值范围是 [5, 3600]，默认值 10。 |
| CallbackUrl | String | 否 | 自定义回调地址的 URL，不填写此参数时会使用服务开通时配置的回调地址。URL 支持 HTTP 和 HTTPS 协议。 |
| FragmentSeconds | Int | 否 | 分片时长，单位：秒，取值范围是 [2, 60]，默认值 15。<br /><strong>注意：仅当 <code>OutputFileFormat</code> 为"hls"时，此参数生效。</strong> |
| RealtimeUploadFragment | Bool | 否 | 是否在录制时实时上传分片。<br /><strong>注意：仅当 <code>OutputFileFormat</code> 为 "hls"时，此参数生效。</strong> |
| ShortFragmentPath | Bool | 否 | M3U8 文件是否只保存视频分片文件（如 .ts 文件）的文件名，而非视频分片的路径。<br /><strong>注意：仅当 <code> RealtimeUploadFragment </code> 为 "true" 时生效。</strong> |

<span id="storageparams"></span>
**StorageParams**
<Note title="说明">各个属性参数的填写方法请参考 <a href="https://doc-zh.zego.im/faq/vendor_params?product=CloudRecording&platform=all" target="_blank">StorageParams 中的各个云存储相关的参数如何填写？</a></Note>

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Vendor | Int | 是 | 录制文件存储服务提供商，目前支持的存储服务提供商如下：<ul><li>1：亚马逊 S3</li><li>2：阿里云 OSS</li><li>3：腾讯云 COS</li><li>4：七牛云 Kodo</li><li>5：阿里云 Vod</li><li>6：腾讯云 Vod </li><li>7：华为云 OBS</li><li>8：谷歌云 Cloud Storage</li><li>9：移动云 EOS</li><li>10：使用 S3 协议的存储服务提供商，需要填写 <code>StorageParams</code> 属性参数 <code>EndPoint</code>。</li></ul> |
| Region | String | 否 | 云存储指定的地区信息。 |
| Bucket | String | 否 | 云存储 bucket。 |
| AccessKeyId | String | 否 | 云存储的 access key，建议提供只写权限的访问密钥。 |
| AccessKeySecret | String | 否 | 云存储的 secret key。 |
| AlibabaCloudVodParams | Object | 否 | 阿里云 Vod 存储信息。<br />详见 <a href="#alibabacloudvodparams">AlibabaCloudVodParams 属性列表</a>。 |
| TencentCloudVodParams | Object | 否 | 腾讯云 Vod 存储信息。<br />详见 <a href="#tencentcloudvodparams">TencentCloudVodParams 属性列表</a>。 |
| EndPoint | String | 否 | Vendor为 10 时，填写使用 S3 协议的存储服务的地址。 |

<Warning title="注意">

- `Vendor`设置为 1、2、3、4、7、9、10 时，`Region`，`Bucket`，`AccessKeyId`，`AccessKeySecret` 必选。
- `Vendor` 设置为 5 时，`AlibabaCloudVodParams` 必选。目前仅支持上传 MP4、FLV 格式文件。
- `Vendor` 设置为 6 时，`TencentCloudVodParams` 必选。目前仅支持上传 MP4、FLV、JPG、MP3 格式文件。
- `Vendor`设置为 8 时，`Bucket`，`AccessKeyId`，`AccessKeySecret` 必选。
- `Vendor`设置为 10 时，`Bucket`，`EndPoint` 必选。
</Warning>

<span id="alibabacloudvodparams"></span>
**AlibabaCloudVodParams**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| Region | String | 是 | 阿里云 Vod 指定的地区信息，例如 cn-shanghai。 |
| AccessKeyId | String | 是 | 阿里云 Vod 的 access key。 |
| AccessKeySecret | String | 是 | 阿里云 Vod 的 secret key，建议提供只写权限的访问密钥。 |
| Title | String | 是 | 阿里云 Vod 视频名称。 |
| StorageLocation | String | 是 | 阿里云 Vod 提供的固定参数。 |

<span id="tencentcloudvodparams"></span>
**TencentCloudVodParams**

| 参数 | 类型 | 是否必选 | 描述 |
|------|------|----------|------|
| SecretId | String | 是 | 腾讯云 Vod 的 access key。 |
| SecretKey | String | 是 | 腾讯云 Vod 的 secret key，建议提供只写权限的访问密钥。 |
| Region | String | 是 | 腾讯云 Vod 指定的地区信息，例如 ap-shanghai。 |
| SubAppId | Int64 | 否 | 腾讯云 Vod 的子应用 ID。 |

## 请求示例

- 请求 URL  

    ```
    https://cloudrecord-api.zego.im/?Action=StartRecord
    &AppId=1234567890
    &SignatureNonce=15215528852396
    &Timestamp=1234567890
    &Signature=7a2c0f11145fb760d607a07b54825013
    &SignatureVersion=2.0
    ```

- 请求消息体  

    <CodeGroup>
    ```json title="亚马逊 S3、阿里云 OSS、腾讯云 COS、七牛云 Kodo、华为云 OBS、移动云 EOS"
    {
        "RoomId": "xxxx",
        "RecordInputParams": {
            "RecordMode": 1,
            "StreamType": 3,
            "MaxIdleTime": 60
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

    ```json title="阿里云 Vod"
    {
        "RoomId": "xxxx",
        "RecordInputParams": {
            "RecordMode": 1,
            "StreamType": 3,
            "MaxIdleTime": 60
        },
        "RecordOutputParams": {
            "OutputFileFormat": "mp4",
            "OutputFolder": "record/"
        },
        "StorageParams": {
            "Vendor": 5,
            "Region": "",
            "Bucket": "",
            "AccessKeyId": "",
            "AccessKeySecret": "",
            "AlibabaCloudVodParams":{
                "Region": "cn-xxxxx",
                "AccessKeyId": "xxxx",
                "AccessKeySecret": "xxxx",
                "Title": "xxxx",
                "StorageLocation": "xxxx.oss-cn-xxxx.aliyuncs.com"
            }
        }
    }
    ```
    ```json title="S3 协议存储服务提供商"
    {
        "RoomId": "xxxx",
        "RecordInputParams": {
            "RecordMode": 1,
            "StreamType": 3,
            "MaxIdleTime": 60
        },
        "RecordOutputParams": {
            "OutputFileFormat": "mp4",
            "OutputFolder": "record/"
        },
        "StorageParams": {
            "Vendor": 10,
            "Region": "oss-xxxx",
            "Bucket": "xxxx",
            "AccessKeyId": "xxxx",
            "AccessKeySecret": "xxxx",
            "EndPoint": "xxxx"
        }
    }
    ```
    </CodeGroup>

## 响应参数

| 参数 | 类型 | 描述 |
|------|------|------|
| Code | Int64 | 错误码。 |
| Message | String | 错误描述。 |
| RequestId | String | 请求 ID。 |
| Data | Object | 响应对象。 |
| └TaskId | String | 云录制服务分配的任务 ID，长度固定为 16 个字节的字符串。任务 ID 是对一次录制生命周期过程的唯一标识，结束录制时会失去意义。 |


## 响应示例

```json
{
    "Code": 0,
    "Message": "succeed",
    "RequestId": "abcd123",
    "Data": {
        "TaskId": "XXXXXXXXXXXX"
    }
}
```
