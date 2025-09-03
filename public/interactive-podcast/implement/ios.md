# iOS
---
## 基本概念

本节介绍该场景涉及到的一些基本概念。

### 用户角色

该场景包含的用户角色有：

- **主持人**

某个用户创建聊天室，即可成为该聊天室的主持人。主持人可以邀请听众一起聊天。

- **普通听众**

用户从聊天室列表中选择一个进入，就会成为该聊天室的普通听众。听众只能旁听主持人和嘉宾的聊天。

- **嘉宾**

普通听众加入和主持人的聊天后，就成为了嘉宾。嘉宾退出聊天后就成了普通听众。
	
### 业务功能

该场景包括的主要业务功能有：

- **听众加入聊天**

主持人可邀请听众上麦，听众同意邀请后，加入聊天。或者听众可以申请上麦，主持人同意后该听众加入聊天。

- **听众退出聊天**

嘉宾可以主动退出聊天。也可以由主持人将嘉宾设置为听众，让其退出聊天。

- **静音**

参与聊天的嘉宾可以主动静音，或由主持人远程将嘉宾静音，让其暂时屏蔽语音，但不退出聊天。

### 系统模块

为了实现该场景的业务功能，涉及到的业务模块如下：

- **业务服务器**

在本方案中业务服务器负责维护业务聊天室列表、聊天室人员角色、聊天申请状态、Microphone 状态等信息。当房间内的人员状态信息发生改变时，房间信令 API 及时通知房间内的相关人员。            

具体包括如下功能：
- 创建房间，会自动进入房间 
- 房间内成员变更通知
- 中途离开房间
- 观众举手
- 主持人邀请观众上台
- 结束房间，销毁房间

<Note title="提示">



ZEGO 房间信令 API 有频率和字节大小限制，建议开发者根据自己的业务情况合理使用，具体请咨询 ZEGO 技术支持。
</Note>
 

- **Zego Express SDK**

在本方案中，使用 `Zego Express SDK` 进行房间内的推拉流，实现语音聊天。同时基于它的房间信令通知房间、用户等状态的变化。

- **主持人端**

本方案的一种用户角色，由主持人端来创建聊天房间。在本方案中，该端由 Native App 实现，需要接入 `Zego Express SDK` 和业务服务器提供的 HTTP API。

- **听众或嘉宾端**

本方案的另外 2 种用户角色。在本方案中，该端由 Native App 实现，需要接入 `Zego Express SDK` 和业务服务器提供的 HTTP API。

## 业务流程
### 主持人创建聊天室

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_create_room.png" /></Frame>

其主要流程描述如下：

1. 向业务服务器请求登录，服务器需要记录用户信息，接口返回创建的用户信息，其中包括必需的用户 ID。
2. 与业务服务器保持心跳。
3. 向业务服务器请求创建房间，返回房间信息，其中包括必需的房间 ID。
4. 初始化 `Zego Express SDK`，并设置事件回调。
5. 使用 `Zego Express SDK` 登录到 Zego 房间，必须使用步骤 1 的用户 ID 和步骤 3 的房间 ID。
6. 使用 `Zego Express SDK` 推流，加入语音聊天。

### 听众加入房间

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_audience_login_room.png" /></Frame>

其主要流程描述如下：

1. 向业务服务器请求登录，服务器需要记录用户信息，接口返回创建的用户信息，其中包括必需的用户 ID。
2. 与业务服务器保持心跳。
3. 向业务服务器获取聊天室列表。
4. 选择某个聊天室进入，向业务服务器请求登录房间，服务器需要记录该用户信息。
5. 业务服务器使用 `Zego Express SDK` 的房间附加信息封装用户列表更新消息，并使用 API 更新房间附加信息。
6. 用户端收到房间附加信息更新事件，解析其数据，得到用户列表，并展示在界面上。
7. 初始化 `Zego Express SDK`，并设置事件回调。
8. 向业务服务器获取房间的用户列表，并在 UI 上展示列表。
9. 使用 `Zego Express SDK` 登录到 Zego 房间，必须使用步骤 1 的用户 ID 和步骤 4 的房间 ID。

### 听众请求加入聊天

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_audience_join_chat.png" /></Frame>

其主要流程描述如下：

1. 听众向业务服务器请求举手，示意想要加入聊天。
2. 业务服务器使用 `Zego Express SDK` 的房间附加信息封装用户的举手消息，并使用 API 更新房间附加信息。
3. 主持人收到房间附加信息更新事件，解析其数据，得到用户举手变化信息，在界面上显示举手用户。
4. 主持人向业务服务器请求将目标用户加入聊天。
5. 业务服务器封装邀请信息，使用 `Zego Express SDK` 的自定义信令发送邀请信息。
6. 听众通过 `Zego Express SDK` 收到自定义信令，解析出邀请信息。
7. 听众选择同意或拒绝邀请，并向业务服务器进行相应的接口请求。
8. 如果听众同意邀请，使用 `Zego Express SDK` 的房间附加信息封装用户的角色状态变化消息，并使用 API 更新房间附加信息。
9. 用户端收到房间附加信息更新事件，解析其数据，得到用户角色变化信息，在界面上更新用户。
10. 目标用户收到自己的角色变成嘉宾后，调用 `Zego Express SDK` 开启本地推流。

### 邀请听众加入聊天

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_presenter_invitation.png" /></Frame>

其主要流程描述如下：

1. 主持人向业务服务器请求邀请某个听众加入聊天。
2. 业务服务器封装邀请信息，使用 `Zego Express SDK` 的自定义信令发送邀请信息。
3. 听众通过 `Zego Express SDK` 收到自定义信令，解析出邀请信息。
4. 听众选择同意或拒绝邀请，并向业务服务器进行相应的接口请求。
5. 如果听众同意邀请，使用 `Zego Express SDK` 的房间附加信息封装用户的角色状态变化消息，并使用 API 更新房间附加信息。
6. 用户端收到房间附加信息更新事件，解析其数据，得到用户角色变化信息，在界面上更新用户。
7. 目标用户收到自己的角色变成嘉宾后，调用 `Zego Express SDK` 开启本地推流。

### 让嘉宾退出聊天

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_guest_quit_chat.png" /></Frame>


其主要流程描述如下：

1. 主持人向业务服务器请求将某个嘉宾退出聊天。
2. 业务服务器更新本地目标用户的角色修改成普通听众。
3. 使用 `Zego Express SDK` 的房间附加信息封装用户的角色状态变化消息，并使用 API 更新房间附加信息。
4. 用户端收到房间附加信息更新事件，解析其数据，得到用户角色变化信息，在界面上更新用户。
5. 目标用户收到自己的角色变成普通听众后，调用 `Zego Express SDK` 停止本地推流。

### 让嘉宾关闭麦克风

时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoEnjoy/GoChat/goenjoy_gochat_uml_guest_close_mic.png" /></Frame>

其主要流程描述如下：

1. 主持人向业务服务器请求对某个嘉宾静音。
2. 业务服务器更新本地目标用户的 Microphone 状态。
3. 使用 `Zego Express SDK` 的房间附加信息封装用户的 Microphone 状态变化消息，并使用 API 更新房间附加信息。
4. 用户端收到房间附加信息更新事件，解析其数据，得到 Microphone 状态，在界面上更新嘉宾的 Microphone 状态。
5. 目标用户收到自己的 Microphone 被关闭后，调用 `Zego Express SDK` 的关闭本地 Microphone 采集。

## API 参考


|API|实现功能|
|-|-|
|[createEngineWithAppID](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#create-engine-with-app-id-app-sign-is-test-env-scenario-event-handler)|创建引擎单例对象。|
|[setEventHandler](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC_ios~class~zego-express-engine#set-event-handler)|设置事件通知回调。|
|[loginRoom](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#login-room-user)|登录房间，推拉流前必须登录房间。|
|[startPublishingStream](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#start-publishing-stream)|用户将自己本地的音视频流推送到 ZEGO 实时音视频云。|
|[stopPublishingStream](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#stop-publishing-stream)|用户停止发送本地的音视频流，结束通话。|
|[startPlayingStream](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#start-playing-stream)|用户可以从 ZEGO 音视频云拉取远端用户的音视频流进行互通。|
|[stopPlayingStream](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~ObjectiveC~class~zego-express-engine#stop-playing-stream)|用户停止拉取远端的音视频流。|


<Note title="提示">

 
完整的 API 请参考 [实时语音 SDK API 文档 ](https://doc-zh.zego.im/article/api?doc=express_audio_sdk_API~objective-c_ios~class)。
</Note>
