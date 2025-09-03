# 将白板推送到第三方平台

- - -

## 功能简介

<Warning title="注意">
该功能需要额外付费，收费标准请咨询 ZEGO 商务人员。
</Warning>

本文主要讲述如何利用 ZEGO Express SDK 的混流功能，将音视频流和 [ZegoSuperBoard](/super-board-ios/product-desc/overview) 内容合并成一路流，输出到第三方平台，例如微信、视频号等，从而达到更好的传播和营销效果。

白板是教育、培训和娱乐场景高频使用的功能，ZegoSuperBoard 可以与 Express SDK 结合使用，提供完整的多人实时白板互动协同服务，包括：白板涂鸦、实时轨迹同步、白板与实时音视频同步等多种能力。

许多活动，为了扩大传播效果，希望主讲人的画面、语音和白板内容，能在第三方平台，例如微信、视频号、抖音等播放，但要求主讲端和播放端同时集成了 ZEGO Express 和 ZegoSuperBoard 才可以实现实时白板互动协同服务，实现方式复杂。

当前 ZEGO 通过混流功能，将主讲人的音视频流与白板相关操作在 ZEGO 服务端合成一路，再输出到第三方平台，实现第三方平台无需集成 ZEGO Express 和 ZegoSuperBoard，即可在第三方平台同时接收主讲人画面、语音和白板内容的效果。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/whiteboard_mixer.jpeg" />
</Frame>


## 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/13396) 获取源码。

相关源码请查看 “/ZegoExpressExample/Others/src/main/java/com/example/others/streammixing” 目录下的文件。

## 前提条件

在实现白板混流功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13394) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13395)。

- 已在项目中集成 ZegoSuperBoard SDK，实现白板相关功能，详情请参考 [创建超级白板](https://doc-zh.zego.im/article/11320)。

<Warning title="注意">
混流功能不是默认开启的，使用前请在 [ZEGO 控制台](https://console.zego.im) 自助开通（开通步骤请参考 [项目管理 - 服务配置](/console/service-configuration/enable-stream-mixing-service) 中的“混流”），或联系 ZEGO 技术支持开通。
</Warning>


## 实现流程

### 1 初始化并登录房间

具体流程请参考“实现视频通话”文档的 [初始化](https://doc-zh.zego.im/article/13395#初始化) 和 [登录房间](https://doc-zh.zego.im/article/13395#登录房间) 章节完成初始化并登录房间。

### 2 设置混流配置


在 Express SDK 中，通过 [ZegoMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerTask) 定义混流任务配置对象，其中包含输入流布局、输出流和 ZEGO 超级白板配置等信息。

#### 创建混流任务对象

具体流程请参考混流文档的 [创建混流任务对象](https://doc-zh.zego.im/article/14777#创建混流任务对象) 进行创建。

#### 设置混流输入流

具体流程请参考混流文档的 [设置混流输入流](https://doc-zh.zego.im/article/14777#设置混流输入流) 进行设置。

#### 设置混流输出

具体流程请参考混流文档的 [设置混流输出](https://doc-zh.zego.im/article/14777#设置混流输出) 进行设置。

<Note title="说明">
第三方平台直播间的地址可以通过设置混流输出中的参数进行配置，直播间地址格式一般为：`rtmp://xxxx`。
</Note>


#### 设置混流白板配置

调用 [setWhiteboard](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerTask#set-whiteboard) 接口，将 ZEGO 超级白板内容合入混流：需填入 [whiteboardID](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoMixerWhiteboard#whiteboard-id) 白板 ID 等参数，即本文 [前提条件](https://doc-zh.zego.im/article/20785#2) 中，集成 ZegoSuperBoard SDK 并创建白板时返回的 ID 等信息。

<Note title="说明">
白板混流支持的文件格式如下：
- 静态演示文件：PPTX、PPT。
- 动态演示文件：PPTX、PPT。
- 表格文件：XLS、XLSX。
- 文本文件：DOC、DOCX、TXT、PDF。
- 图片文件：JPG、JPEG、PNG、BMP。
</Note>

以白板布局放置于画面左上角为例：

```java
ZegoMixerWhiteboard whiteboard = new ZegoMixerWhiteboard();

// ZEGO 超级白板 ID，即本文前提条件中，集成 ZegoSuperBoard SDK 并创建白板时返回的 ID
whiteboard.whiteboardID = 0;

// ZEGO 超级白板视图布局
whiteboard.layout.left = 0;
whiteboard.layout.top = 0;
whiteboard.layout.right = 100;
whiteboard.layout.bottom = 100;

// ZEGO 超级白板是否支持加载动态 PPT
whiteboard.isPPTAnimation = true;

if (whiteboard != null) {
    mMixerTask.setWhiteboard(whiteboard);
}
```

### 3 开始混流任务

具体流程请参考混流文档的 [开始混流任务](https://doc-zh.zego.im/article/14777#开始混流任务) 章节。


### 4 更新混流任务配置

Express SDK 支持更新混流任务中的白板配置，例如，需要切换要混入的 ZEGO 超级白板实例或不再混入 ZEGO 超级白板时，可通过调用 [startMixerTask](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class~ZegoExpressEngine#start-mixer-task) 接口更新配置。如需更新混流任务的其它配置，请参考混流文档中的 [5.4 更新混流任务的配置](https://doc-zh.zego.im/article/14777#5_4)。

以不再混入 ZEGO 超级白板内容到混流中为例：

```java
// 重置混流任务白板配置信息
mMixerTask.setWhiteboard(null);

// 再调用一次启动混流任务接口，即可更新混流配置
engine.startMixerTask(mMixerTask, null);
```

### 5 停止混流

具体流程请参考混流文档的 [停止混流](https://doc-zh.zego.im/article/14777#停止混流)。


## 常见问题

<Accordion title="为什么混流任务中指定了混入 ZEGO 超级白板，但混流结果中没有白板画面？" defaultOpen="false">

请确认混流任务白板配置中 `whiteboardID` 成员的值，是否为要混入混流的 ZEGO 超级白板 ID。

</Accordion>

<Accordion title="为什么 ZEGO 超级白板中加载了带动效的 PPT 文件，但混流结果中白板画面却没有混入对应的动效？" defaultOpen="false">

请确认混流任务白板配置中 `isPPTAnimation` 成员的值，是否为 true。

</Accordion>

<Accordion title="可以不展示主讲人的摄像头画面吗？" defaultOpen="false">

可以，但是至少需要一路音频流。否则无法发起白板混流。
</Accordion>

<Content />

