

# 调测指南

- - -
在本文中我们为您介绍如何使用 Postman 调测服务端 API。

Postman 是一款 API 调测工具，可在让开发者在图形化界面中方便、直观地调测服务端 API。

为便于开发者调测云端录制的服务端 API，我们提供了对应的 Postman Collection，预先定义好了每个接口的请求参数，开发者导入后仅需修改参数取值即可调测。

## 前提条件

- 已经下载并安装了 [Postman](https://www.postman.com/downloads/)。
- 已经下载并解压了 [云端录制 API 的 Collection](https://docservice-storage.zego.im/cloudrecord/cloudrecord_postman_collection.zip)。
    <Note title="说明">本文提供的 Collection 仅供调测使用，并未包含所有服务端 API。</Note>
- 已经 [开通云端录制服务](https://doc-zh.zego.im/article/5682#2) 并获取了调用接口所必须的 AppID、ServerSecret 等信息。  

<Warning title="注意"> 
Postman 在不同平台的客户端界面会略有差异，本文以 macOS 平台上的 Postman 为例进行介绍。
</Warning>

## 导入并配置 Collection 

1. 单击 "Import"，将解压 collection 获取的两个文件一起导入。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/imoprt.png" /></Frame>

2. 将环境设置为 "cloudrecord"。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/set_env.png" /></Frame>

3. 打开 “cloudrecord” 环境，将 [前提条件](#前提条件) 中获取的 AppID、ServerSecret 设置到对应环境变量的 “CURRENT VALUE” 中，然后保存。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/set_env_value.png" /></Frame>

## 调测接口

在本章中，我们以 3 个接口为例介绍如何使用 Postman 调测服务端 API。
<Note title="说明">
ZEGO 提供的 collection 通过环境变量和前置脚本实现了公共参数的自动填写，前置脚本可在下图位置查看，开发者开发服务端时可用于参考。
</Note>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/prescript.png" /></Frame>

### 开始录制

此 API 用于启动录制任务，根据传入参数不同，可以实现单流录制、混流录制以及截图。  
ZEGO 提供的 collection 针对这个接口预置了 4 组请求参数，分别对应单流录制、混流录制（平分布局）、混流录制（自定义布局）和视频截图。针对同一个房间，你可以同时启动多个录制任务。

#### 单流录制

单流录制是指分别录制房间内每条音视频流、白板，每条音视频流都会生成对应的媒体文件，所有白板会生成一个视频文件。

1. 在 Collections 中选择 “StartRecord_Single”，查看 "Body" 页签。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Single.png" /></Frame>

    <Note title="说明">

    - RoomId 表示待录制的房间 ID。
    - RecordInputParams 表示录制任务输入参数，此请求中预置的参数表示仅录制 stream1 和 stream2 两条流的音频，每条流生成一个媒体文件；其他可选参数均保持默认值。
    - RecordOutputParams 表示录制任务输出参数，此请求中预置的参数表示输出 mp4 格式的媒体文件到存储服务的 test 文件夹下。
    - StorageParams 表示录制任务的存储配置。

    </Note>

    请根据您自己的需求修改请求参数进行调试，参数具体含义详见 [开始录制](/cloud-recording-server/start)。
    
2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。请注意保存响应返回的 TaskId。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Rsp.png" /></Frame>

#### 混流录制

混流录制录制是指房间内所有音视频流、白板混合录制成一个音视频文件。混流录制支持多种画面布局方式，详见 [设置混流布局](/cloud-recording/common-features/set-the-mixed-flow-layout)。  
ZEGO 提供的 collection 中提供了平分布局和自定义布局两组预置参数。

**平分布局**

1. 在 Collections 中选择 “StartRecord_Mixed_Split”，查看 "Body" 页签。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Mixed_Split.png" /></Frame>

    <Note title="说明">
    - RoomId 表示待录制的房间 ID。
    - RecordInputParams 表示录制任务输入参数：
    - RecordMode 和 StreamType 指定录制模式为混流录制，录制内容为音视频。
    - FillBlank 指定录制的流中断时的画面填充方式，不指定时系统会采用默认配置。
    - FillFrame 指定录制的流摄像头关闭时的画面填充方式，不指定时系统会采用默认配置。
    - MaxIdleTime 和 MaxRecordTime 为录制任务自动结束相关的时间配置，不指定时系统会采用默认配置。
    - MixConfig 为混流相关配置，此请求中预置的参数表示混流时的画面布局为平分布局，并指定了输出流的名称和音视频相关参数，具体布局方式请参考 “设置混流布局” 中的 [平分布局](/cloud-recording/common-features/set-the-mixed-flow-layout#21-平分布局)。
    - RecordOutputParams 表示录制任务输出参数，此请求中预置的值表示输出 mp4 格式的媒体文件到存储服务的 test 文件夹下。
    - StorageParams 表示录制任务的存储配置。  
    </Note>

    请根据您自己的需求修改请求参数进行调试，参数具体含义详见 [开始录制](/cloud-recording-server/start)。

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。请注意保存响应返回的 TaskId。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Rsp.png" /></Frame>

**自定义布局**

1. 在 Collections 中选择 “StartRecord_Mixed_Custom”，查看 "Body" 页签。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Mixed_Custom.png" /></Frame>

    <Note title="说明">
    - RoomId 表示待录制的房间 ID。
    - RecordInputParams 表示录制任务输入参数：
        - RecordMode 和 StreamType 指定录制模式为混流录制，录制内容为音视频。
        - HasWhiteboard 和 Whiteboard 指定录制白板的相关参数，需要录制白板时必选。
        - MixConfig 为混流相关配置，此请求中预置的参数表示混流时的画面布局为自定义布局，并指定了输出流的名称和音视频相关参数；自定义布局时，具体的布局通过 MixInputList 指定，详见 “设置混流布局” 中的 [自定义布局](/cloud-recording/common-features/set-the-mixed-flow-layout#25-自定义布局)。
    - RecordOutputParams 表示录制任务输出参数，此请求中预置的值表示输出 mp4 格式的媒体文件到存储服务的 test 文件夹下。
    - StorageParams 表示录制任务的存储配置。
    </Note>

    请根据您自己的需求修改请求参数进行调试，参数具体含义详见 [开始录制](/cloud-recording-server/start)。

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。请注意保存响应返回的 TaskId。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Rsp.png" /></Frame>

#### 视频截图

调用 [开始录制](/cloud-recording-server/start) 接口时，设置 RecordMode 为 1 并设置 OutputFileFormat 为 “jpg” 即可启动视频截图任务，并可通过 SnapshotInterval 设置截图的间隔，详见 [视频截图](/cloud-recording/common-features/video-screenshot)。

1. 在 Collections 中选择 “StartRecord_Snapshot”，查看 "Body" 页签。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StartRecord_Snapshot.png" /></Frame>

    请根据您自己的需求修改请求参数进行调试，参数具体含义详见 [开始录制](/cloud-recording-server/start)。

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。请注意保存响应返回的 TaskId。

### 结束录制

此 API 用于结束进行中的录制任务。

1. 在 Collections 中选择 “结束录制”，将请求参数中的 TaskId 的值替换为调用 StartRecord 接口时返回的 TaskId。
    
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StopRecord.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/StopRecordRsp.png" /></Frame>

### 查询录制状态

此 API 用于查询录制任务的状态。

1. 在 Collections 中选择 “查询录制状态”，将请求参数中的 TaskId 的值替换为调用 StartRecord 接口时返回的 TaskId。
    
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/DescribeRecordStatus.png" /></Frame>

2. 单击 “Send”，在下方查看响应内容。若响应消息的错误码不是 0，请根据响应消息中的错误描述修改请求再次发送。返回参数的具体含义请参考 [查询录制状态](/cloud-recording-server/query)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CloudRecording/postman/DescribeRecordStatusRsp.png" /></Frame>
