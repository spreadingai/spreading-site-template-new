# 教师端实现流程
---
## 基础流程图
以下展示了大班课场景的重要流程，可根据流程实现教师端相关功能。

1. 教师端登录/登出流程

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/teacher_enter_room.png" /></Frame>

2. 教师端上下麦流程（例如：开启摄像头、麦克风等）

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/GoClass/大班课-教师上下麦.png" /></Frame>

## 核心 API 时序图
参考以下时序图，搭配 Express Video SDK （含白板功能）、ZegoWhiteboardView SDK、ZegoDocsView SDK、ZEGO 在线课堂示例 demo 后台服务可实现大班课场景的相关功能，包括课堂管理、实时音视频通讯、互动白板、文件共享等。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoClass/UMLs/BigClass_ios.png" /></Frame>

## 在线课堂示例 demo 业务逻辑参考
以下步骤介绍了在线课堂示例 demo 的基础实现流程，开发者可以据此理解在线课堂示例 demo 的实现方案。
### 初始化 SDK
初始化以下 3 个 SDK：
1. Express-Video SDK（含白板功能）
2. ZegoDocsView SDK
3. ZegoWhiteboardView SDK

<Warning title="注意">

ZegoWhiteboardView SDK 需要在 Express-Video SDK  初始化完毕后、登录房间操作之前进行初始化。
</Warning>

详情请参考 `ZegoSDKManager.initSDKEnvironment()` 方法

### 登录房间
#### 获取业务后台 host
登录房间前需要获取在线课堂示例 demo 业务后台的 host 地址并在 `BackendApiConstants` 类中进行替换。
   
<Note title="说明">

 
在线课堂示例 demo 业务后台服务需要用户自己搭建，详情请参考 [在线课堂示例 demo 堂后台服务说明](/large-class/server-api/accessing-server-apis)。
</Note>

#### 登录
使用 `JoinActivity` 完成登录。登录成功后 App 会跳转至课堂主界面。

### 白板及文件视图加载
#### 进入房间获取白板列表
1. 如果白板列表为空，则创建一个空白板，并通知 Express-Video SDK 创建对应白板。
2. 如果白板列表有值，则根据白板 [ZegoWhiteboardViewModel](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~struct~ZegoWhiteboardViewModel) 判断是否包含文件。
- 如果 [ZegoFileInfoModel](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoFileInfoModel) 中的 [fileID](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoFileInfoModel#file-id) 为空字符串，则说明是纯白板，可将白板视图直接添加至 WhiteboardContainer 视图上。
- 如果 [ZegoFileInfoModel](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoFileInfoModel) 中的 [fileID](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoFileInfoModel#file-id) 有值，说明白板包含文件信息，则需要在父视图中先添加文件视图，再添加白板视图（否则文件和白板无法正常配合使用）。并根据 [fileID](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoFileInfoModel#file-id) 加载文件内容，然后调整白板和文件视图至合适的位置和尺寸。

<Note title="说明">

教师端和学生端在业务上的主要差别如下：
- 教师端在刚进入房间的时候，如果拉取到的白板数量为 0 时，需要负责创建一个新的白板。
- 教师端可以对学生端进行权限管理。

</Note>

#### 白板切换同步
如果远端创建了多个白板，本端可以通过如下逻辑实现本端白板和远端白板切换同步。

在进入房间后，Express-Video SDK 会调用 [ZegoEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler) 协议中的 [onRoomExtraInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler#on-room-extra-info-update) 方法，根据方法参数获取远端正在显示的白板 ID，然后在白板列表加载完毕后找到对应的 [ZegoWhiteboardView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class~ZegoWhiteboardView) 进行展示。

#### 白板图元及文件同步
在白板和文件加载完成之后，白板图元和文件的页数需要和远端进行同步。

白板图元对象的同步在 ZegoWhiteboardView SDK 内部已经实现。白板的偏移量和文件页数的同步工作需要开发者使用相应方法自行完成。

由于白板和文件的 contentSize 是一样大的，文件和白板的滚动偏移量必须相同，否则白板上的涂鸦会对应到文件的错误位置。在与白板一一对应的 [ZegoWhiteboardViewModel](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~struct~ZegoWhiteboardViewModel) 中可以获取到该白板的横向与纵向偏移百分比。根据百分比偏移量，可以计算出白板和文件视图正确的偏移量，这样可以和远端保持一致。

- **纯白板页数同步** 

由于纯白板内部没有页数的概念，需要开发者根据偏移百分比自行定义并计算。例如在线课堂示例 demo 内创建的纯白板为 “5 * 白板view” 尺寸，总共有 5 页。如果纵向偏移百分比为 20%，那么当前处于第 2 页（0.2 * 5 + 1）。

- **文件页数同步**

通过 [ZegoDocsView](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class~ZegoDocsView) 类获取文件的总页数以及当前页码。

- **动态 PPT 同步**  

如果是带有动画的动态 PPT 文件，需要调用 [ZegoDocsView.playAnimation()](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class~ZegoDocsView#play-animation) 方法同步额外的动画信息。

- **Excel sheet 同步**  

Excel 文件的每个 sheet 都对应着一个白板文件，本端在收到远端的当前的白板 ID 后，可以找到对应的白板和文件视图，调用 DocsView 的 [ZegoDocsView.switchSheet()](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class~ZegoDocsView#switch-sheet) 方法即可完成 sheet 的切换。


## 核心 API 参考

### ZEGO 在线课堂示例 demo 后台服务
 
|API|实现功能|
|-|-|
|[login_room ](/large-class/server-api/login-room)| 登录教室。|
|[leave_room ](/large-class/server-api/leave-room)|离开课堂。|
|[end_teaching ](/large-class/server-api/end-teaching)|结束教学。|
|[get_attendee_list ](/large-class/server-api/get-attendee-list)|获取在线成员列表。|
|[get_join_live_list ](/large-class/server-api/get-join-live-list)|获取连麦成员列表。|
|[set_user_info ](/large-class/server-api/set-user-info)|设置某个用户设备状态。|

<Note title="说明">

 
完整的 API 请参考 [在线课堂示例 demo 后台服务说明](/large-class/server-api/accessing-server-apis)。
</Note>

### Express-Video SDK （含白板功能）

|API|实现功能|
|-|-|
|[createEngine ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#create-engine)|创建引擎单例对象。|
|[setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#set-event-handler)|设置事件通知回调。|
|[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#login-room)|登录房间，推拉流前必须登录房间。|
|[startPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-publishing-stream)|用户将自己本地的音视频流推送到 ZEGO 实时音视频云。|
|[stopPublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#stop-publishing-stream)|用户停止发送本地的音视频流，结束通话。|
|[startPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#start-playing-stream)|用户可以从 ZEGO 音视频云拉取远端用户的音视频流进行互通。|
|[stopPlayingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine#stop-playing-stream)|用户停止拉取远端的音视频流。|

<Note title="说明">

 
完整的 API 请参考 [Express Video SDK API 文档 ](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~java_android~class)。
</Note>

### ZegoWhiteboardView SDK

|API|实现功能|
|-|-|
|[init ](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#init)|初始化 SDK。|
|[setConfig](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#set-config)|设置白板相关配置(日志，缓存路径)。|
|[setToolType](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#set-tool-type)|设置白板工具。|
|[createWhiteboardView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#create-whiteboard-view)|向服务器申请创建白板并通知其他用户。|
|[getWhiteboardViewList](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#get-whiteboard-view-list)|获取当前房间的所有白板。|
|[setWhiteboardManagerListener](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardManager#set-whiteboard-manager-listener)|设置白板新增，删除和白板相关错误的监听。|
|[setVisibleRegion](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardView#set-visible-region)|配合 DocsView 使用，根据DocsView的可见区域大小设置白板可见区域大小。|
|[scrollTo](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardView&jumpType=route#scroll-to)|跳转到指定位置，用百分比描述。|
|[getWhiteboardViewModel](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~Java_android~class~ZegoWhiteboardView#get-whiteboard-view-model)|获得白板 View 对应的 ViewModel。|

<Note title="说明">

 
完整的 API 请参考 [互动白板 API 文档 ](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~java_android~class)。
</Note>

### ZegoDocsView SDK

|API|实现功能|
|-|-|
|[init ](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsViewManager#init)| 用配置类的实例初始化 SDK。|
|[uploadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsViewManager#upload-file)| 从客户端本地上传文件转码，并存储。|
|[getFileID](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsView#get-file-id)|获取当前视图对应的 fileID，与 loadFile 传入的 fileID 一致。|
|[loadFile](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsView#load-file)|加载指定的文件，文件内容将被渲染到视图上。|
|[flipPage](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsView#flip-page)| 跳转到指定页位置。|
|[scrollTo](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsView#scroll-to)|跳转到指定位置，用百分比描述。|
|[scaleDocsView](https://doc-zh.zego.im/article/api?doc=DocsView_API~Java_android~class~ZegoDocsView#scale-docs-view)|缩放。|

<Note title="说明">

 
完整的 API 请参考 [文件共享 API 文档 ](https://doc-zh.zego.im/article/api?doc=DocsView_API~java_android~class)。
</Note>
