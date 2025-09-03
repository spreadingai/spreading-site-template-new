# 学生端实现流程
---

## 基础流程图
以下展示了大班课场景的重要流程，可根据流程实现学生端相关功能。

1. 学生端登录/登出流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/学生进房.png" /></Frame>

## 核心 API 时序图
参考以下时序图，搭配 Express Video SDK （含白板功能）、ZegoWhiteboardView SDK、ZegoDocsView SDK、ZEGO GO课堂后台服务可实现大班课场景的相关功能，包括课堂管理、实时音视频通讯、互动白板、文件共享等基础功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoClass/UMLs/LargeClass_Web_zh.png" /></Frame>

## GO课堂业务逻辑参考
以下步骤介绍了GO课堂的基础实现流程，开发者可以据此理解GO课堂的实现方案。

### 具体流程
1. 填写 constants_data.js 中项目所需参数，运行项目。
2. 调用业务后台登录接口 this.loginRoomBiz() 。
3. 初始化 SDK this.initClient() 。
4. 注册监听 SDK 回调方法 this.initLiveRoom() 。
5. 调用 SDK 登录房间方法 this.loginRoom() 。
6. GO课堂具体业务实现。


<Note title="说明">

 
以上方法名称均为GO课堂项目中的封装方法名。
</Note>


### 初始化

初始化以下两个 SDK：

- ZegoDocsView SDK
- ZegoWhiteboardView SDK

### 学生端白板和文件实现流程

1. 获取房间白板列表（[getViewList](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#get-view-list)），在本地维护一个白板列表。

2. 对端新增白板/文件操作：

- 对端新增白板：

  1. 对端新增白板，会触发 [viewAdd](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~interface~ZegoEvent#view-add) 回调方法，获得新增白板，更新本地白板列表。
  2. 监听房间附加信息，获得白板 ID 。
  3. 在白板列表中查询得到目标白板。
  4. 通过互动白板 SDK 的 [attachView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#attach-view)(parent) 将目标白板渲染出来，其中 parent 是需要挂载的父容器 ID，如 `<div id="parent"></div>` 。

- 对端新增文件：

  1. 监听房间附加信息，获得白板 ID 。

  2. 在白板列表中查询得到目标白板。

  3. 通过互动白板 SDK 的 [getFileInfo()](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~interface~ZegoWhiteboardView#get-file-info) 判断该白板是否文件白板。

  4. 使用文件共享 SDK 的 [createView](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~class~ZegoExpressDocs#create-view) 创建文件 view 。

  5. 使用文件共享 SDK 的 [loadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#load-file) 加载指定的文件。

  6. 加载文件转码成功后在回调方法中创建与文件相匹配白板 [onLoadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoEvent#on-load-file)。

  7. 根据 [onLoadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoEvent#on-load-file) 回调返回的参数，使用互动白板 SDK 的 [createView](https://doc-zh.zego.imhttps://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#create-view) 创建与文件相匹配的白板。

  8. 使用互动白板 SDK 的 [attachView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#attach-view)(parent) 渲染白板，其中 parent 是 [onLoadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoEvent#on-load-file) 回调返回参数中的 viewID 。

        

3. 对端切换白板/文件操作：

- 对端切换白板：
  1. 监听房间附加信息，获得切换的白板 ID 。
  2. 在白板列表中查询得到目标白板。
  3. 通过互动白板 SDK 的 [attachView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#attach-view)(parent) 将目标白板渲染出来，其中 parent 是需要挂载的父容器 ID，如 `<div id="parent"></div>` 。
- 对端切换文件：
   1. 监听房间附加信息，获得切换的文件白板 ID 。
   2. 在白板列表中查询得到目标文件白板。
   3. 根据文件白板上的文件信息(fileInfo)，通过文件转码 SDK 的 [createView](https://doc-zh.zego.imhttps://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#create-view)(options) 创建文件视图。
   4. 使用文件共享 SDK 的 [loadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#load-file) 加载指定的文件。
   5. 通过互动白板 SDK 的 [attachView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#attach-view)(parent) 将目标文件白板渲染出来，其中 parent 是 [onLoadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoEvent#on-load-file) 回调返回参数中的 viewID。


## 核心 API 参考

### ZEGO GO课堂后台服务
 
|API|实现功能|
|-|-|
|[login_room ](/large-class/server-api/login-room)| 登录教室。|
|[leave_room ](/large-class/server-api/leave-room)|离开课堂。|
|[end_teaching ](/large-class/server-api/end-teaching)|结束教学。|
|[get_attendee_list ](/large-class/server-api/get-attendee-list)|获取在线成员列表。|
|[get_join_live_list ](/large-class/server-api/get-join-live-list)|获取连麦成员列表。|
|[set_user_info ](/large-class/server-api/set-user-info)|设置某个用户设备状态。|

<Note title="说明">

 
完整的 API 请参考 [GO 课堂后台服务](/large-class/server-api/accessing-server-apis)。
</Note>

### Express-Video SDK （含白板功能）

|API|实现功能|
|-|-|
|[ZegoExpressEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#constructor)|new 初始化实例。|
|[loginRoom ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)|登录房间，推拉流前必须登录房间。|
|[startPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-publishing-stream)|用户将自己本地的音视频流推送到 ZEGO 实时音视频云。|
|[stopPublishingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream)|用户停止发送本地的音视频流，结束通话。|
|[startPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-playing-stream)|用户可以从 ZEGO 音视频云拉取远端用户的音视频流进行互通。|
|[stopPlayingStream ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-playing-stream)|用户停止拉取远端的音视频流。|

<Note title="说明">

 
完整的 API 请参考 [Express Video SDK API 文档 ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class)。
</Note>

### ZegoWhiteboardView SDK

|API|实现功能|
|-|-|
|[createView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#create-view)|创建白板 view。|
|[attachView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#attach-view)|添加白板到视图（渲染）。|
|[setToolType](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~interface~ZegoWhiteboardView#set-tool-type)|设置要使用的白板工具。|
|[getViewList](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class~ZegoExpressEngine#get-view-list)|获取当前房间的所有白板。|
|[scroll](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~interface~ZegoWhiteboardView#scroll)|跳转到指定位置，用百分比描述。|

<Note title="说明">

 
完整的 API 请参考 [互动白板 API 文档 ](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~class)。
</Note>

### ZegoDocsView SDK

|API|实现功能|
|-|-|
|[createView](https://doc-zh.zego.im/article/api?doc=DocsView_API~Javascript_web~class~ZegoExpressDocs#create-view)| 创建 docsView 实例。|
|[uploadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~Javascript_web~class~ZegoExpressDocs#upload-file)| 从客户端本地上传文件转码，并存储。|
|[getFileID](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#get-file-id)| 获取当前视图对应的 fileID，与 loadFile 传入的 fileID 一致。|
|[loadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#load-file)|加载指定的文件，文件内容将被渲染到视图上。|
|[scrollTo](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#scroll-to)|跳转到指定位置，用百分比描述。|
|[setScaleFactor](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~interface~ZegoDocsView#set-scale-factor)|缩放。|

<Note title="说明">

 
完整的 API 请参考 [文件共享 API 文档 ](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~class)。
</Note>
