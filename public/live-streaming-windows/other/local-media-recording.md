# 音视频录制

- - -

## 简介

在进行视频通话、直播、在线教学时，用户经常需要将视频录制保存下来，方便后续其他用户点播观看。ZEGO 提供了多种录制方案，满足不同场景下的录制需求。

<table>

<tbody><tr>
<th>录制方案</th>
<th>简介</th>
<th>适用场景</th>
</tr>
<tr>
<td>
<a href="#方案一客户端本地录制" >客户端本地录制</a>
</td>
<td>
通过客户端 SDK 录制您（本地用户）的音视频，并保存到本地。
</td>
<td>
<p>需要录制您（本地用户）的音视频，并保存到本地设备（手机、电脑等终端设备）中。<b>不支持录制其他用户的音视频。</b></p>
<p>调用方式：通过调用客户端 SDK 接口开始录制。</p>
</td>
</tr>
<tr>
<td><a href="#方案二音频原始数据录制" >音频原始数据录制</a></td>
<td>通过获取音频的原始数据，将原始数据保存到本地，完成音频录制。</td>
<td>
- 只需要录制音频。
- 只需要保存到本地。
- 需要录制您或他人的音频。
</td>
</tr>
<tr>
<td><a href="#方案三云端录制" >云端录制</a></td>
<td>通过 ZEGO 云服务进行录制，并将音视频保存到您开通的云存储中。</td>
<td>
- 您已经开通了第三方云存储服务，目前支持 Amazon S3、阿里云 OSS、腾讯云 COS 等。
- 需要录制您或他人的音视频。
- 需要区分录制房间内的每个用户，获得房间内每个用户单独的音视频文件。
- 需要把多路音频、视频，或音视频和白板混合录制，将房间内所有用户的音频流、视频流和白板混合录制为一个视频文件。
- 需要使用预置混流布局模版。

<p>调用方式：通过调用 ZEGO 服务端 API 接口开始录制。</p>
</td>
</tr>
<tr>
<td><a href="#方案四cdn-录制" >CDN 录制</a></td>
<td>录制直播的音视频，并保存到 ZEGO CDN 上。</td>
<td>
- 需要录制直播的音视频，并保存到 ZEGO 的 CDN 中。
- 需要录制您或他人的音视频。&nbsp; &nbsp;&nbsp;

<p>调用方式：您在 <a href="https://console.zego.im" target="_blank">ZEGO 控制台</a> 开通了 CDN 录制后，默认是全局录制，无需调用服务端 API 接口；如果您需要选择性录制，请调用 ZEGO 服务端 API 接口开始录制。</p>
</td>
</tr>
<tr>
<td><a href="#方案五本地服务端录制" >本地服务端录制</a></td>
<td>通过开发者自己部署的服务端进行录制。</td>
<td>
- 您希望通过自己的服务器进行录制，节约成本。
- 需要录制您或他人的音视频。
- 需要区分录制房间内的每个用户，获得房间内每个用户单独的音视频文件。
- 需要把多路音频、视频，或音视频和白板混合录制，将房间内所有用户的音频流、视频流和白板混合录制为一个视频文件。

<p>调用方式：通过调用开发者自己搭建的服务器接口开始录制。</p>
</td>
</tr>
</tbody></table>

## 方案一：客户端本地录制

通话或直播过程中，将您（本地用户）预览的音视频数据录制存储到本地设备中，保存为 mp4 或其他格式的文件。**不支持录制其他用户的音视频。**

### 适用场景

- 纯本地录制：不推流情况下，本地预览进行录制。
- 边直播边录制：在推流的同时进行录制，把直播的全程录制保存到本地文件。
- 直播过程中录制短视频：直播过程中，可以随时录制一小段视频进行保存到本地。
- 只录制您（本地用户）预览的内容。

### 支持格式

- 音视频：FLV、MP4
- 纯音频：AAC

### 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/13412) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/Recording”目录下的文件。

### 前提条件

在实现录制功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13414) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13416)。



### 实现步骤

录制功能接口调用流程如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/record/express_record_process_Andriod.png" /></Frame>

**设置录制回调**

开发者需要调用 [setDataRecordEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#set-data-record-event-handler) 来设置录制功能的回调以接收录制过程中的录制信息。

开发者可以根据此回调 [onCapturedDataRecordStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoDataRecordEventHandler#on-captured-data-record-state-update) 判断文件录制的状态或者进行 UI 的提示等。

开发者可以根据此回调 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoDataRecordEventHandler#on-captured-data-record-progress-update) 判断文件录制过程进度或者对用户界面进行 UI 的提示等。
<Warning title="注意">


在调用 [startRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-recording-captured-data) 开始录制之后才会收到所设置的录制回调信息。
</Warning>

```cpp
// 继承 IZegoDataRecordEventHandler 并重写相关方法
class MyDataRecordEventHandler: public IZegoDataRecordEventHandler{
public:
    void onCapturedDataRecordStateUpdate(ZegoDataRecordState state, int errorCode, ZegoDataRecordConfig config, ZegoPublishChannel channel) override {
        // 开发者可以在这里根据错误码或者录制状态处理录制过程状态变更的逻辑，例如在界面上进行 UI 的提示等
    }

    void onCapturedDataRecordProgressUpdate(ZegoDataRecordProgress progress, ZegoDataRecordConfig config, ZegoPublishChannel channel) override {
        // 开发者可以在这里根据录制进度处理录制过程进度变更的逻辑，例如在界面上进行 UI 的提示等
    }
};

// 设置录制回调
engine->setDataRecordEventHandler(std::make_shared<MyDataRecordEventHandler>());
```

**开始录制**

开发者需要调用 [startRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-recording-captured-data) 以开始录制。

- [ZegoPublishChannel ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoPublishChannel) 指定录制的媒体通道，若只推一条流或只做本地预览预览应使用 “ZEGO_PUBLISH_CHANNEL_MAIN”。

- [ZegoDataRecordConfig ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoDataRecordConfig) 指定录制的配置，可以指定录制的路径以及录制的类型 [ZegoDataRecordType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoDataRecordType)。
若希望录制音视频则应指定为 “ZEGO_DATA_RECORD_TYPE_AUDIO_AND_VIDEO”。

若希望只录制音频则选择 “ZEGO_DATA_RECORD_TYPE_ONLY_AUDIO”，若只录制纯视频则选择 “ZEGO_DATA_RECORD_TYPE_ONLY_VIDEO”。

<Warning title="注意">


- 在 [ZegoDataRecordConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~struct~ZegoDataRecordConfig) 指定录制的配置中，文件路径的后缀名必须是 “.mp4”、“.flv” 或 “.aac” 结尾以指定录制文件的格式。
- 录制的类型 [ZegoDataRecordType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~enum~ZegoDataRecordType) 与文件的后缀名无关。
</Warning>


```cpp
// 登录房间、开始推流、启动预览等接口调用
...

// 创建录制配置
ZegoDataRecordConfig config;
// 例如需要录制 mp4 格式
config.filePath = "path.mp4";
// 例如录制音视频
config.recordType = ZEGO_DATA_RECORD_TYPE_AUDIO_AND_VIDEO;

// 开始录制，使用主通道录制
engine->startRecordingCapturedData(config, ZEGO_PUBLISH_CHANNEL_MAIN);
```

**停止录制**

开发者需要调用 [stopRecordingCapturedData](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#stop-recording-captured-data) 来结束录制。

<Warning title="注意">


在录制过程中，若退出房间 [logoutRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#logout-room) SDK 内部会主动停止录制。
</Warning>


```cpp
engine->stopRecordingCapturedData(ZEGO_PUBLISH_CHANNEL_MAIN);
```

**播放录制文件**

录制文件的播放，可选两种方式进行播放。

* 调用系统默认的播放器进行播放。
* 调用 ZegoExpressEngine 中的 ZegoMediaPlayer 组件进行播放，详情可参考 [媒体播放器](https://doc-zh.zego.im/article/14781)。


### 常见问题

1. **本地音视频录制支持什么格式的打包文件？**

  目前音视频已支持 FLV 和 MP4，纯音频已支持 AAC，通过文件路径的后缀名指定格式。其中 FLV 格式只支持 H.264 编码，MP4 格式支持 H.264 和 H.265 编码，不满足会导致没有画面或者没有音频。

2. **存储的路径有什么要求？**

    存储的路径为应用有权限读写的文件路径即可，如果传入目录路径，则会在回调中返回写文件失败。

3. **录制过程如何获取到录制文件的大小？**

    录制进度回调 [onCapturedDataRecordProgressUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoDataRecordEventHandler#on-captured-data-record-progress-update) 中可以获取得到录制时长和录制文件大小。

4. **传递一个已存在文件的文件路径，SDK 如何处理？**

    不会出错，但原文件内容将被清空后再写入。

5. **使用外部采集时的录制需要注意什么？**

    使用外部采集时，也需要在录制之前调用 SDK 的 [startPreview](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_windows~class~IZegoExpressEngine#start-preview) 方法来启动。

6. **为什么我录制出来的视频会有绿边？**

    使用者需要注意在开启录制的过程中不要修改视频编码分辨率，开启流量控制（开启时会依据网络环境动态调整编码分辨率）。

7. **为什么我录制过程中结束推流，录制出的视频会在这时有一瞬间的卡顿？**

    SDK 内部处理方式的问题，目前暂时无法解决，需要用户尽量避免出现这种操作的情况。

8. **本地媒体录制支持录 “ZegoMediaPlayer/ZegoAudioPlayer/混音功能” 的声音吗？**

    可以录制以上输入源的声音，但是只有混入推流中的声音才会被录制，如果仅本地播放，则不会被录制进文件。

## 方案二：音频原始数据录制

通过获取音频的原始数据，将原始数据保存到本地，完成音频录制。

### 适用场景

- 只需要录制音频。
- 只需要保存到本地。
- 需要录制本人或他人的音频。

### 使用步骤

请参考 [原始音频数据获取](https://doc-zh.zego.im/article/21546)。

## 方案三：云端录制

云端录制，即通过调用 ZEGO 服务端 API 录制音视频，并保存到您指定的 CDN 上，支持录制视频通话或者直播中任意一个用户的音视频流，并且提供各种容灾、安全机制。

### 适用场景

适用于各种需要录制功能的场景，包括但不限于音视频通话、直播、在线课堂、在线会议等。

### 使用步骤

请参考 [云端录制](/cloud-recording/quick-start/integration)。

## 方案四：CDN 录制

CDN 录制，是指将正在通过 CDN 直播的内容保存到相应 CDN 上。需要将音视频推到 CDN 进行直播后，才能使用该方式进行录制。

### 适用场景

开发者需要将音视频推到 CDN 进行直播后，才能使用该方式进行录制。如果开发者只是进行视频通话或者连麦，并未将音视频推到 CDN，则无法使用此功能。

您在 [ZEGO 控制台](https://console.zego.im) 开通了 CDN 录制后，默认是全局录制，无需调用服务端 API 接口；如果您需要选择性录制，请调用 ZEGO 服务端 API 接口开始录制。


### 使用步骤

请参考 [开始 CDN 录制](/real-time-video-server/api-reference/cdn/start-cdn-recrod)。


## 方案五：本地服务端录制

开发者自行集成 ZEGO 的服务端录制插件，并部署在自己的服务器上，然后开发者通过访问自己的服务器接口开始录制，具体说明请参考 [本地服务端录制](/local-recording-linux-cpp/overview)。

### 适用场景

本方案适用于您有自己的服务端开发团队，并且有能力部署专门的服务器用于音视频录制，并能够处理好大规模并发的问题。

### 使用步骤

请参考 [本地服务端录制](/live-streaming-uniapp/quick-start/integrating-sdk)。

<Content />