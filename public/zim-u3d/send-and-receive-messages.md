# 实现基本消息收发

--- 

本文介绍如何使用 ZIM SDK 快速实现基本的单聊会话消息收发功能。

<Note title="说明">
本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>

## 前提条件

- 请确保开发环境满足以下技术要求：

- 安装 Unity 2021.3.18f1c1 或以上版本。若未安装，可以在 [Unity 官网](https://unity.com/download) 下载 Unity Hub，然后安装您需要的 Unity 版本（若不清楚，建议您安装最新的 LTS 版本）。下载时，推荐根据自身需要运行到的平台，勾选对应的 Plaforms 模块一起下载，以在 Windows 上安装为例：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/unityEnv.jpeg" /></Frame>

- 根据示例代码需要运行到的平台，选择对应的开发环境或设备：

    - 运行 Android 示例源码要求：Android 4.1 或以上版本，支持 JDK 1.6 或以上版本的设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项。
    - 运行 iOS 示例源码要求：Xcode 13.0 或以上版本，iOS 11.0 或以上版本的设备或模拟器（推荐使用真机）。
    - 运行 macOS 示例源码要求：支持 macOS 10.13 或以上版本。
    - 运行 Windows 示例源码要求：Windows 7 或以上版本；并安装了 Visual Studio 2015 或以上版本。
    - 确保所运行设备网络连接正常。
    - 确保 Unity 已经安装了需要运行到的平台所对应的 Platfroms 模块。若已经安装 Unity，但没有安装相关 Platroms 模块，需要下载对应模块，以在 Windows 上安装为例：打开 Unity Hub，单击左侧的 “Install” 选项，选择需要安装的 Unity 版本，单击右上角图标选择 “Add modules” 选项，在弹窗中勾选对应模块后进行下载。

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](http://doc-zh.zego.im/article/12107) 中的“项目信息”。

<Warning title="注意">

SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](http://doc-zh.zego.im/faq/token_upgrade?product=ExpressVideo)。
</Warning>


## 集成 SDK  

### 1 （可选）新建项目

<details class="zg-primary">
    <summary>此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。</summary>

单击 “新建” 按钮，选择 “3D” 模版，填写 “项目名称”，选择 “位置” 存放项目，单击 “创建” 按钮创建项目。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/int-create.png" /></Frame>

</details>

### 2 导入 SDK

1. [下载](/zim-u3d/client-sdks/sdk-downloads) 并解压 SDK 压缩包，将 解压后的 ZIMUnity3D 目录下的 “ZIM” 文件夹到拷贝到开发者项目的 "Assets" 目录下，即可集成 SDK ：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/pic_1.jpeg" /></Frame>

2. 对于不同的运行平台，需要做一些额外处理。

<Accordion title="Windows" defaultOpen="false">

Unity 项目中不能存在同名的 .dll 文件，否则在 Build 时会出现 “Multiple plugins with the same name 'zim'” 错误。开发者需根据实际业务情况删除 “Plugins/Windows” 文件夹下的 x64 文件夹或 x86 文件夹。   

<Note title="说明">

如果不准备在 Windows 平台上运行示例源码，开发者可以直接删除 “Plugins/Windows” 文件夹。
</Note>   

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/win_dll.jpeg" /></Frame>     

</Accordion>

<Accordion title="macOS" defaultOpen="false">
如果 Unity 为 2019.3 或之前版本，由于其不支持将 macOS dylib 作为 Plugins，请将 "libZIM.dylib" 重命名为 "libZIM.bundle"，以便正确导入 SDK。此外，macOS 应为 10.5 或以上版本。
</Accordion>

<Accordion title="iOS" defaultOpen="false">

如下图所示，在路径“ZIM/Plugins/IOS/XCFramework”下有三个文件夹：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/iOS_SDK.jpeg" /></Frame>     

说明如下：

| 文件夹名称 | 作用 | 相关操作 |
| -- | -- | -- |
| ios-arm64_armv7 | 真机架构，用于真机运行调试以及上架发布。 | 需要在真机上运行时，请保留此文件夹并删除其他文件夹。 |
| ios-arm64_x86_64-simulator | 模拟器架构，用于模拟器运行调试。 | 需要在 iOS 模拟器上运行时，请保留此文件夹并删除其他文件夹。（即当工程配置 iOS Target SDK 指定为 Simulator SDK 时。） |
| ios-arm64_x86_64-maccatalyst | iOS MacCatalyst 架构。 | 目前 Unity 暂不支持此架构，**请直接删除**。 |

</Accordion>

<Accordion title="Android" defaultOpen="false">
构建 Android App 时也可能会提示存在多个 Windows dll 文件。请按照上述 Windows 的处理方式解决。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/win_dll.jpeg" /></Frame>     
</Accordion>    


## 实现基本收发消息

以下流程中，我们以客户端 A 和 B 的消息交互为例：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/quick_start_Implementation_Flutter.png" /></Frame>

### 实现流程

#### 1. 导入头文件

在项目文件中引入头文件。

```cs
using ZEGO;
```

#### 2. 创建 ZIM 实例

首先我们需要在 SDK 中创建 ZIM 单实例，实例对应的是一个用户，表示一个用户以客户端的身份登录系统。

例如，客户端 A、B 分别调用 [Create](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create) 接口，传入在 [前提条件](#前提条件) 中获取到的 AppID、AppSign（开发 Web 平台应用时无需使用 “appsign”，为防止暴露，请勿传入），创建了 A、B 的实例：

```cs
// 创建 
// 通过插件创建 ZIM 单实例，传入 APPID、AppSign
// 请注意：ZIM 从 2.3.0 版本开始支持 AppSign 鉴权，SDK 也默认为 AppSign 鉴权，如果您需要切换鉴权方式：
// (1) 2.3.3 及以上版本的 SDK，支持鉴权方式的自主切换; (2) 2.3.0 版本的 SDK，需要切换为 “Token 鉴权” 时，请联系 ZEGO 技术支持处理

//定义唯一 ZIM 实例(实际使用时一般全局定义)
ZIM zim;

ZIMAppConfig config = new ZIMAppConfig();
config.appID = (uint)appID; // 请通过 [ZEGO 控制台](https://console.zego.im/) 获取，格式为 123456789，详情请参考控制台的 [项目信息](https://doc-zh.zego.im/article/12107)
config.appSign = (string)appSign;// 请通过 [ZEGO 控制台](https://console.zego.im/) 获取，格式为"0123456789012345678901234567890123456789012345678901234567890123"，64 个字符，详情请参考控制台的 [项目信息](https://doc-zh.zego.im/article/12107)

zim = ZIM.Create(config);
```

由于大多数开发者，在整个流程中，只需要将 ZIM 实例化一次。因此，ZEGO 建议您调用 [GetInstance](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#get-instance) 方法获取已创建的实例对象。

```cs
// 在成功调用 Create 方法创建实例后，可以通过 GetInstance 方法获取 zim 对象。
// 在调用 Create 方法之前，或者在调用 Destroy 方法销毁实例之后，调用 GetInstance 方法将返回 null。
ZIM zim = ZIM.GetInstance();
```

#### 3. 注册用于接收通知的回调

在调用登录接口前，开发者必须注册所需回调。

<Accordion title="通过 lambda 表达式注册。" defaultOpen="false">
```cs
void SetZIMEventHandler()
    {
        // SDK 出现异常时，会通过该回调提示详细的异常信息。
        ZIM.GetInstance().onError = (ZIM zim, ZIMError errorInfo) => {};

        // 连接状态发生改变时会通过该回调将目前的状态与事件通知用户。
        ZIM.GetInstance().onConnectionStateChanged = (ZIM zim, ZIMConnectionState state,
                                              ZIMConnectionEvent connectionEvent,
                                              Dictionary<string,string> extendedData) => {};

        // 当收到此回调时，开发者应当及时调用 [RenewToken] 函数更新 Token。
        ZIM.GetInstance().onTokenWillExpire = (ZIM zim, uint second) => {};

        // 当收到其他人发来的点对点消息时，将会收到此回调。
        ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                                 List<ZIMMessage> messageList,
                                 string fromUserID) => {};
    }
```
</Accordion>


详细的接口介绍，请参考 [OnConnectionStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-connection-state-changed)、[OnTokenWillExpire](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-token-will-expire)、[OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message)。

<a id="login"></a>

#### 4. 登录 ZIM

创建实例后，客户端 A 和 B 需要登录 ZIM，只有登录成功后才可以开始发送、接收消息等。

客户端需要使用各自的用户信息进行登录。调用 [Login](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#login) 接口，传入用户信息 [ZIMUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMUserInfo) 对象，进行登录。


<Warning title="注意">

- “userID”、“userName” 支持开发者自定义规则生成。建议开发者将 “userID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- `2.3.0` 或以上版本的 SDK，默认鉴权方式为 “AppSign 鉴权”，登录 ZIM 时只需传入 [ZIMUserInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMUserInfo)、Token 传入空字符串即可。
- 如果您使用的是 “Token 鉴权”，请参考 [使用 Token 鉴权](/zim-u3d/guides/users/authentication) 文档，获取 Token 后，并在登录 ZIM 时传入 Token，鉴权通过后才能登录成功。
</Warning>

```cs
// userID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
// userName 最大 256 字节的字符串，无特殊字符限制。
ZIMUserInfo userInfo = new ZIMUserInfo();
userInfo.userID = "xxxxx";
userInfo.userName = "xxxxx";

// 登录：
// 使用 Token 鉴权，需要开发者填入 "使用 Token 鉴权" 文档生成的 Token，详情请参考 [使用 Token 鉴权]
// 使用 AppSign 鉴权 (2.3.0 或以上版本的默认鉴权方式)，Token 参数填空字符串
ZIM.GetInstance().Login(userInfo, "", (ZIMError errorInfo) =>
{
    if(errorInfo.code == ZIMErrorCode.Success)
    {
        //发送成功
    }
    else 
    {
        //发送失败
    }
});
```

#### 5. 发送消息

客户端 A 登录成功后，可以向客户端 B 发送消息。

目前 ZIM 支持的消息类型如下：

<table>
<tbody>
<tr data-row-level="1">
<th>消息类型</th>
<th>说明</th>
<th>特性及适用场景</th>
</tr>

<tr data-row-level="2">
<td>ZIMCommandMessage(2)</td>
<td>开发者可自定义数据内容的信令消息。消息大小不超过 5 KB，单个客户端发送频率限制为 10 次/秒。</td>
<td>
不可存储，支持更高的并发；一般适用于“语聊房”、“在线课堂”等房间内的信令传输，比如上下麦操作、送礼物，发送在线课堂课件等。

相关接口：[SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message)
</td>
</tr>
<tr data-row-level="3">
<td>ZIMBarrageMessage(20)</td>
<td>房间内弹幕文本消息。消息大小不超过 5 KB，单个客户端发送频率无限制。</td>
<td>
<p>不可存储，专门用于房间内的高频、不可靠、允许丢掉的消息，一般适用于发送“弹幕消息”的场景中。</p><p>支持高并发，但不可靠，不保证消息送达。</p>

相关接口：[SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message)

</td>
</tr>

<tr data-row-level="4">
<td>ZIMTextMessage(1)</td>
<td>文本消息。消息大小不超过 32 KB，单个客户端发送频率限制为 10 次/秒。</td>
<td rowspan="6">
消息可靠有序，可存储为历史消息（保存时间请参考 [计费说明 - 版本差异](/zim-u3d/introduction/pricing) 中“历史消息存储天数”。）；
可用于单聊、房间、群聊等即时聊天场景。房间解散后，“房间聊天”的消息不存储。

- 图片、文件、语音、视频：通常用于发送富媒体文件类型的消息。
- 自定义消息：通常用于发送投票类型、接龙类型、视频卡片类型等消息。

相关接口：[SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message)、[SendMediaMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-media-message)
</td>
</tr>
<tr data-row-level="5">
<td>ZIMImageMessage(11)</td>
<td>图片消息。支持主流图片格式，包括 JPG、PNG、BMP、TIFF、GIF、WebP，大小不超过 10 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="6">
<td>ZIMFileMessage(12)</td>
<td>文件消息。消息内容为文件，格式不限，大小不超过 100 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="7">
<td>ZIMAudioMessage(13)</td>
<td>语音消息。支持 MP3、M4A 格式的语音文件，时长不超过 300 秒，大小不超过 6 MB，单个客户端发送频率限制为 10 次/秒。</td>
</tr>
<tr data-row-level="8">
<td>ZIMVideoMessage(14)</td>
<td>视频消息。支持 MP4、MOV 格式的视频文件，大小不超过 100 MB，单个客户端发送频率限制为 10 次/秒。**仅支持视频编码格式为 H264 和 H265 的视频文件在消息发送成功后获取该视频首帧的宽、高信息。**</td>
</tr>
<tr data-row-level="9">
<td>ZIMCustomMessage(200)</td>
<td>自定义消息。开发者可自定义消息的类型，并自行完成消息的解析，ZIM SDK 不负责定义和解析自定义消息的具体内容。</td>
</tr>
</tbody>
</table>


以下为发送`单聊文本消息`为例：客户端 A 可以调用 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，传入客户端 B 的 userID、消息内容、消息类型 conversationType 等参数，即可发送一条`文本消息`到 B 的客户端。

- [ZIMMessageSentCallback](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-message-sent-callback) 回调，判断消息是否发送成功。
- [OnMessageAttached](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMMessageSendNotification#on-message-attached) 回调，在消息发送前，可以获得一个临时的 [ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMMessage)，以便您添加一些业务处理逻辑。例如：在发送消息前，获取到该条消息的 ID 信息。开发者在发送“视频”等内容较大的消息时，可以在消息上传完成前，缓存该消息对象，直到收到 SDK 发送成功通知时，通过比较对象相同来实现发送前 Loading 的效果。

```cs
// // 以下以发送单聊信息为例，conversationType 设置为 ZIMConversationType.Peer
息

string toConversationID = ""; // 对方 userID
ZIMConversationType type = ZIMConversationType.Peer; // 会话类型为 ZIMConversationType.Peer
ZIMTextMessage message = new ZIMTextMessage("文本消息内容");
ZIMMessageSendConfig messageSendConfig = new ZIMMessageSendConfig(); // 使用默认配置
ZIMMessageSendNotification notification = new ZIMMessageSendNotification(); // 消息信息
ZIM.GetInstance().SendMessage(message, toConversationID, type,
messageSendConfig, notification, (ZIMMessage callbackMessage, ZIMError errorInfo) =>
{
    if(errorInfo.code == ZIMErrorCode.Success)
    {
        //发送成功
    }
    else 
    {
        //发送失败
    }
});
```

#### 6. 接收消息

客户端 B 登录 ZIM 后，将会通过前面 “3.注册用于接收通知的回调” 中的 [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 接收到消息。

```cs
// 注册监听“收到单聊消息”的回调
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                         List<ZIMMessage> messageList,
                         string fromUserID) =>
{
    //messageList即是收到的单聊消息
};
```

#### 7. 退出登录

如果客户端需要退出登录，直接调用 [Logout](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#logout) 接口即可。

```cs
ZIM.GetInstance().Logout();
```

#### 8. 销毁 ZIM 实例

如果不需要 ZIM 实例，可直接调用 [Destroy](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#destroy) 接口，销毁实例。

```cs
ZIM.GetInstance().Destroy();
```

### API 时序图

通过以上的实现流程描述，API 接口调用时序图如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/flowchart_u3d.png" /></Frame>

<Note title="说明">

- 发送消息时，统一使用 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，并根据消息类型传入对应的 conversationType 取值。
- 接收消息时：
    - 单聊消息（Peer 类型），通过 [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接收。
    - 房间消息（Room 类型），通过 [OnReceiveRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-room-message) 回调接收。
    - 群组消息（Group 类型），通过 [OnReceiveGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-group-message) 回调接收。
</Note>

## 相关文档

- [如何获取 SDK 的日志信息？](https://doc-zh.zego.im/faq/IM_sdkLog)
- [如何设置消息的优先级更为合理？](https://doc-zh.zego.im/faq/IM_Message_Priority)
- [什么时候使用自定义消息？](https://doc-zh.zego.im/faq/IM_CustomMessage)
- [如何限制只有好友之间才能互发消息？](https://doc-zh.zego.im/faq/IM_FriendMeassge)
- [支持发送消息给自己吗？](http://doc-zh.zego.im/faq/IM_send_toSelf)
