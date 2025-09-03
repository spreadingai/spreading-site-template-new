# 实现云端录制

---

## 功能概述

ZEGO 云端录制支持服务端 API，无需集成 SDK，用户在使用ZEGO音视频即时通信服务时可以在推拉流的同时直接调用云端录制的服务端API，即可轻松开始云端录制，并支持将录制文件上传到指定的第三方存储中用于回放点播等场景。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/FastStart/CloudRecordStructure.png" /></Frame>

## 前提条件

### 开通云端录制服务

请在 [ZEGO 控制台](https://console.zego.im) 完成注册、创建项目并在开启云录制录制服务。如需了解服务开通流程，请参考控制台文档 [服务配置 - 云端录制](https://doc-zh.zego.im/article/14334)。

### 集成 SDK

请确保您的项目已接入 ZEGO [实时音视频](https://doc-zh.zego.im/article/195)/[实时语音](https://doc-zh.zego.im/article/3575) SDK。

### 开通第三方云存储服务

在使用云端录制服务前，需要开通第三方云存储服务，并获取如下字段对应的Region、Bucket、Access Key和Secret Key等信息（不同服务所需的参数有差异，请根据实际需要获取）。

当前支持的第三方云存储服务如下所示：
- [亚马逊 S3](https://aws.amazon.com/cn/s3/?c=s&sec=srv)
- [阿里云 OSS](https://www.aliyun.com/product/oss)
- [腾讯云 COS](https://cloud.tencent.com/product/cos)
- [七牛云 Kodo](https://www.qiniu.com/products/kodo)
- [阿里云 Vod](https://www.aliyun.com/product/vod)
- [腾讯云 Vod](https://cloud.tencent.com/product/vod)
- [华为云 OBS](https://www.huaweicloud.com/product/obs.html)
- [谷歌云 Cloud Storage](https://cloud.google.com/storage)
- [移动云 EOS](https://icloud.sh.chinamobile.com/)
- 使用 S3 协议的存储服务提供商（例如 DigitalOcean）

## 实现云端录制

以下为实现云端录制需要调用的 API 时序图：

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/CloudRecord/FastStart/APISequenceV2.png" /></Frame>

### 1 开始录制

调用 [StartRecord](/cloud-recording-server/start) 方法并设置房间号即可进入该房间进行录制，请求成功会返回对应的录制 TaskId，该 Id 是整个录制周期的唯一标识，将作为调用后续方法的请求参数。

<Note title="说明">


- 每个录制任务时间最长为 24 小时。超过 24 小时，录制任务将自动停止录制。
- 如果录制任务监测到房间内无音视频流、无白板任务后，也会自动停止录制。
- <b>ZEGO 建议您的每个录制任务都调用 [StopRecord](/cloud-recording-server/stop) 方法停止录制，以免持续录制产生额外的费用。</b>
</Note>

调用所有接口都需要带上公共参数，详见 [调用方式](/cloud-recording-server/making-api-requests)，之后不再赘述。

### 2 查询录制状态

录制过程中可以多次调用 [DescribeRecordStatus](/cloud-recording-server/query) 方法查询录制状态，在返回的响应中可以获取到录制状态及文件上传地址等信息。

### 3 更新混流布局

混流录制过程中可以多次调用 [UpdateLayout](/cloud-recording-server/update-layout) 方法更新混流布局，详情请参考 [设置混流布局](/cloud-recording/common-features/set-the-mixed-flow-layout)。

### 4 更新白板

白板录制过程中可以多次调用 [UpdateWhiteboard](/cloud-recording-server/update-whiteboard) 方法更新白板 Id，详情请参考 [白板录制](/cloud-recording/common-features/whiteboard-recording)。

### 5 停止录制

调用 [StopRecord](/cloud-recording-server/stop) 方法停止录制。

## 管理录制文件

### 1 上传录制文件

录制任务停止后，录制文件会上传至预先指定的第三方云存储。调用 [DescribeRecordStatus](/cloud-recording-server/query) 方法，通过返回的参数可以及时查看上传进度。

* FileUrl：返回录制文件的上传地址。
* Status：返回录制文件的上传状态。
* VideoId：Vod 返回录制文件的 VideoId。

录制文件上传结束后，云端录制会回调通知到开通服务时指定的回调地址。

### 2 管理录制文件名

录制文件名包含 StreamId 和开始录制时间戳等信息，详情请参考 [StartRecord](/cloud-recording-server/start) 方法的 OutputFileRule 参数。

## 常见问题

- [录制结束后没有在云存储中看到录制文件？](https://doc-zh.zego.im/faq/No_record)
- [支持录制动态 PPT 吗？](https://doc-zh.zego.im/faq/Support_Dynamic_PPT)
- [支持录制 IM 信息吗？](https://doc-zh.zego.im/faq/record_IM)
- [什么时候会收到回调通知？](https://doc-zh.zego.im/faq/record_callback)
- [用户程序崩溃对云录制会有什么影响？](https://doc-zh.zego.im/faq/user_crash)
- [第三方云存储参数（StorageParams）支持传入临时授权的 Token 吗？](https://doc-zh.zego.im/faq/storage_params_token)
- [录制 PPT 时，能隐藏 PPT Notes 吗？](https://doc-zh.zego.im/faq/Hide_PPT_Notes)
- [云端录制服务器出现断网、异常崩溃时，会如何处理？](https://doc-zh.zego.im/faq/record_crash)
