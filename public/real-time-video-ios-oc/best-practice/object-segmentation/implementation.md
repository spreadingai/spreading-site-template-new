# 实现流程

- - -

## 概述

本篇文档介绍利用 ZIM SDK 与 ZEGO Express SDK中的主体分割与 Alpha 数据传输与渲染能力，实现多人同场景实时视频互动及房间内的麦位管理的原理和步骤。

大多数的视频互动，参与互动的用户各自被矩形视频区域分隔，画面中主体占画面的比例往往不到一半。这种情况下互动的体验，不同用户不同的背景容易给整体画面带来杂乱的观感，难以形成沉浸式的互动体验，如下图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/group_video_chat.jpeg" /></Frame>

为了提升互动体验，ZEGO Express SDK 除主体分割能力外，开创性地提供了 Alpha 数据传输功能。原理是将原始视频和经主体分割得到的 Alpha 信息拼接在原视频的下方，得到一个高 * 2 的视频。经过编码后传输给拉流端。拉流端会分离原始视频和 Alpha 数据，使用 Alpha 数据做渲染，可以形成视觉上只显示画面中的主体的效果。

如下图所示，推流端的原始视频下方的 Alpha 信息用黑色代表这部分内容是透明的。拉流端在解码后，将黑色部分归一化为 Alpha 数据，便可以将对应的原视频画面对应的区域渲染成透明效果，在视图上只会展示人的主体部分，不会展示用户的真实背景。

如需了解渲染部分的实现原理，请参考 [播放透明礼物特效](https://doc-zh.zego.im/article/17410)。

<table>

<tbody><tr>
<th>推流画面</th>
<th>拉流画面</th>
<th>渲染后的显示效果</th>
</tr>
<tr>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/alphaLayoutTypeBottom.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/alphaLayoutTypeBottom.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/videoObjectAfterRender.png" /></Frame></td>
</tr>
</tbody></table>

通过这种方式，可以将多个用户的主体渲染到同一个背景图或者背景视频上，虽然他们身处不同空间，依然可以在同一个场景下实时互动。

## 应用场景

<table>

<tbody><tr>
<th>应用场景</th>
<th>沉浸式会议、一起看电影</th>
<th>主播连麦</th>
<th>大型活动，如新闻发布会等</th>
</tr>
<tr>
<th>图示</th>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/videoOS_scene2.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/scene_2.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/videoOS_scene1.png" /></Frame></td>
</tr>
</tbody></table>

## 方案架构

本最佳实践的房间内业务的整体架构如下图所示。由于开发者业务后台仅管理房间列表，不涉及房间内业务，因此没有在下图中体现。其中：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/structure.jpeg" /></Frame>

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理 - 项目信息](/console/project-info)。
- 已联系 ZEGO 商务人员，开通主体分割权限。
- 已联系 ZEGO 技术支持，获取包含主体分割功能的实时音视频 SDK，并参考实时音视频的 [快速开始 - 集成](https://doc-zh.zego.im/article/196) 集成 SDK。**如果您的项目曾集成了官网版本的实时音视频 SDK，需要替换。**
- 已在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](/console/service-configuration/im/activate-service)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](https://doc-zh.zego.im/article/11567#2) 的 “集成 SDK”。

## 实现流程

实现流程主要包含 6 个步骤，即初始化 SDK、加入房间、管理麦位、使用主体分割、拉流和退出房间。

### 1 初始化 SDK

- 在管理房间内的麦位之前，需要先初始化 ZIM SDK，并设置通知回调，以便监听 ZIM 事件，接口调用详情请参考 [即时通讯 - 实现基本消息收发](/zim-ios/send-and-receive-messages#3-实现基本收发消息) 的 “创建 ZIM 实例” 和 “使用 EventHandler 协议”。
- 在实现主体分割之前，需要先初始化 ZEGO Express SDK，同时设置通知回调，以便监听 Express 事件，接口调用请参考 [实时音视频 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call#初始化) 的 “初始化”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/init_iOS.png" /></Frame>

### 2 加入房间

- 为实现推流，用户需要先登录 RTC 房间，接口调用请参考 [实时音视频 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call#登录房间) 的 “登录房间”。
- 本最佳实践通过修改 ZIM 房间属性实现用户上下麦的业务逻辑，因此，用户需要：
    1. 登录 ZIM 服务，接口调用请参考 [即时通讯 - 实现基本消息收发](/zim-ios/send-and-receive-messages#login) 的 “登录 ZIM”。
    2. 用户需要创建或加入 ZIM 房间，详情请参考 [即时通讯 - 房间管理](/zim-ios/guides/room/manage-rooms#创建房间加入房间) 的 “创建房间、加入房间”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/joinRoom_iOS.png" /></Frame>

### 3 管理麦位

- 加入 ZIM 房间后，用户可通过查询房间所有属性了解房间内的麦位信息，接口调用详情请参考 [即时通讯 - 房间属性管理](/zim-ios/guides/room/room-properties#获取房间属性) 的 “获取房间属性”。
- 用户如需上麦，可通过修改房间属性，修改麦位信息，接口调用详情请参考 [即时通讯 - 房间属性管理](/zim-ios/guides/room/room-properties#设置房间属性) 的 “设置房间属性”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/micManagement_iOS.png" /></Frame>


### 4 使用主体分割

1. 为在推流时传输经主体分割后的图像，需要设置透明通道，请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#7可选使用-alpha-通道传输分割出的主体) 的 “使用 Alpha 通道传输分割出的主体”，了解如何调用 [enableAlphaChannelVideoEncoder](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#enable-alpha-channel-video-encoder-alpha-layout-channel) 设置透明通道。

2. 由于手机前置摄像头捕捉的画面与实际左右相反，需要开启屏幕镜像，以便预览或拉流时，获取正确方向画面，接口调用详情请参考 [实时音视频 - 常用视频配置](/real-time-video-ios-oc/video/common-video-configuration#设置镜像模式) 的 “设置镜像模式”。

3. 出于旋转手机屏幕时画面的美观角度，需要设置采集视频的朝向，接口调用详情请参考 [实时音视频 - 视频采集旋转](/real-time-video-ios-oc/video/video-capture-rotation)。

4. 如需预览本端的画面，需先将用于渲染的 View 的 backgroundColor 属性为 clearColor（透明色），接口调用详情请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#2-对-view-进行特殊设置) 的 “对 view 进行特殊设置”。

    预览和推送本端画面，接口调用详情请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#8-开始预览和推流) 的 “开始预览和推流”。

5. 开启主体分割，接收分割结果，接口调用详情请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#5-监听主体分割状态回调) 的 “监听主体分割状态回调” 和 “使用主体分割实现多种业务功能”。

    <Note title="说明">


    由于 RTC 房间仅与推流有关，所以，开发者也可在 RTC 房间外预览主体分割的效果。
    </Note>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/previewAndPublishing_iOS.png" /></Frame>


### 5 拉流

用户收到 ZIM 事件通知，得知房间内有人上麦后：
1. 调用实时音视频接口将用于渲染的 View 的 backgroundColor 属性为 clearColor（透明色），接口调用详情请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#2-对-view-进行特殊设置) 的 “对 view 进行特殊设置”。

    <Note title="说明">


    如在预览时实现了对 View 的设置，则可省略此步骤。
    </Note>

2. 拉取对方已实现主体分割的视频流，从而实现两个用户处在 “同一空间” 面对面对话的视觉效果。接口调用详情请参考 [实时音视频 - 主体分割](/real-time-video-ios-oc/video/object-segmentation#9可选在拉流端设置-alpha-通道渲染并拉流) 的 “开始拉流”。
3. 如需结束拉流，接口调用详情可参考 [实时音视频 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call#6-停止音视频通话) 的 “停止音视频通话”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/playingStream_iOS.png" /></Frame>

### 6 退出房间

1. 停止预览和推流，接口调用详情请参考 [实时音视频 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call#6-停止音视频通话) 的 “停止音视频通话”。
2. 离开 ZIM 房间，接口调用详情请参考 [即时通讯 - 房间管理](/zim-ios/guides/room/manage-rooms#离开房间) 的 “离开房间”。
3. 退出 RTC 房间，接口调用详情请参考 [实时音视频 - 实现视频通话](/real-time-video-ios-oc/quick-start/implementing-video-call#6-停止音视频通话) 的 “停止音视频通话”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoObjectSegmentation/logoutRoom_iOS.png" /></Frame>
