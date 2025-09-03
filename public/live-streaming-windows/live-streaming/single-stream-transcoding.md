# 单流转码

- - -

## 功能简介


单流转码，指在云端把单条原始流转换为不同编码格式、不同分辨率的转码流。在直播等场景中，观众可以基于接入网络质量、终端设备等，自行选择不同分辨率的流进行观看，以保证播放的流畅性。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Single_stream_transcoding.jpeg" />
</Frame>

### 应用场景

- 当开发者提供多种分辨率的视频流供用户按需观看时，需要将原始流转换为不同清晰度的转码流，此时可使用单流转码功能。
- 将原始视频流转换为不同的视频编码格式时，可使用单流转码功能。例如，部分设备由于性能问题不能解码 H.265 时，需要转码为 H.264。


## 前提条件

<Warning title="注意">


单流转码功能目前为内测功能，如需接入，请联系 ZEGO 商务人员或 ZEGO 技术支持。
</Warning>

在使用单流转码功能之前，请确保：
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13414) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13416)。

- 需使用 [L3 拉流](https://doc-zh.zego.im/article/6779)、[转推 CDN 拉流（通过 streamID 拉流）](https://doc-zh.zego.im/article/1189) 或 RTC 拉流，且未使用混流能力。

<Note title="说明">


对于已经使用混流能力的场景，可直接基于混流接口，实现输出多条不同分辨率的流，不需要触发单流转码。
</Note>




## 实现流程

单流转码的主要流程如下：
1. 添加转码模板。
2. 创建引擎并登录房间。
3. 按需拉取转码流，根据需要选择拉流方式为 [L3 拉流](https://doc-zh.zego.im/article/6779)、[转推 CDN 拉流（通过 streamID 拉流）](https://doc-zh.zego.im/article/1189) 或 RTC，并传入转码模板 ID 触发转码。


<a name="step1"></a>
### 1 添加转码模板

请联系 ZEGO 技术支持添加转码模板，并获取到对应的转码模板 ID。

目前支持配置的转码参数为：模板 ID、分辨率、码率、帧率及视频编码格式。

<Warning title="注意">


- 目前只支持配置视频相关参数。
- 一个 AppID 最多支持添加 5 个转码模板。如需设置更多模板，请联系 ZEGO 技术支持。
</Warning>

<table>

<tbody><tr>
<th>参数</th>
<th>说明</th>
</tr>
<tr>
<td>模板 ID</td>
<td>取值大于 100 的整数，ID 必须唯一。<br />推荐按输出分辨率命名，例如，转码输出分辨率为 360P 的模板 ID，可命名为 360。若转码输出分辨率小于 100P，可自行命名。</td>
</tr>
<tr>
<td>分辨率</td>
<td><ul><li>支持宽度范围：[0, 3000]，数值必须是 2 的倍数。</li><li>支持高度范围：[0, 3000]，数值必须是 2 的倍数。</li></ul></td>
</tr>
<tr>
<td>码率</td>
<td>取值需大于 0，单位为 bps。</td>
</tr>
<tr>
<td>帧率</td>
<td>支持范围：[1, 20]，单位 fps。<br />如果需要输出更大帧率，请联系 ZEGO 技术支持进行配置。</td>
</tr>
<tr>
<td>视频编码格式</td>
<td><p>支持以下视频编码格式：</p><ul><li>H.264</li><li>H.265</li><li>保持原始流的视频编码格式。</li></ul></td>
</tr>
</tbody></table>


### 2 创建引擎并登录房间

具体流程请参考“实现视频通话”文档的 [创建引擎](https://doc-zh.zego.im/article/13416#createEngine) 和 [登录房间](https://doc-zh.zego.im/article/13416#loginRoom) 章节。

<Warning title="注意">


实现单流转码前，房间内需要有已存在的流。
</Warning>

### 3 拉转码流

配置 [ZegoPlayerConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoPlayerConfig) 的 codecTemplateID 属性，填写 [步骤 1 添加转码配置模板](https://doc-zh.zego.im/article/17789#step1) 中获取的转码模板 ID，并开始拉流。

```cpp
ZegoPlayerConfig config;
// 按实际业务情况配置
config.resourceMode = ZEGO_STREAM_RESOURCE_MODE_DEFAULT;
// 101 是配置好的模板 ID，参考步骤 1 添加转码配置模板
config.codecTemplateID = 101;

ZegoCanvas canvas(ZegoUtilHelper::GetView(ui->frame_Play));
canvas.viewMode = static_cast<ZegoViewMode>(ui->comboBox_ViewModePlay->currentIndex());
// engine 为创建引擎时，创建的 IZegoExpressEngine 对象
engine->startPlayingStream("streamid", &canvas, config);
```



## 常见问题

<Accordion title="混流和单流转码的区别是什么？" defaultOpen="false">

- 混流一般用于将多条输入流合并为一路，同时支持定义多路输出流的编码格式、分辨率等参数，且混流转码需要开发者额外调用客户端或服务端接口触发。
- 单流转码用于实现单条流的转码功能，且无需开发者额外调用客户端或服务端接口触发，仅需在拉流时带上模板参数触发即可。
</Accordion>
<Content />
