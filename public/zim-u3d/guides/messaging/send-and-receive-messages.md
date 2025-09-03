# 收发消息

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>


## 功能简介

ZIM SDK 支持单聊消息、群组消息、房间消息等的收发，以及查询历史消息、删除消息等功能。可广泛应用于娱乐社交、电商购物、在线教育、互动直播等多种场景下。

本文档介绍了如何使用 ZIM SDK 的接口，实现各类消息的收发功能与监听消息的状态。

## 消息类型

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
<p>不可存储，一般适用于“语聊房”、“在线课堂”等房间内的信令传输，比如上下麦操作、送礼物，发送在线课堂课件等。</p>
<p>支持更高的并发，但不可靠，不保证消息送达和消息顺序。</p>

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

## 收发普通消息

普通消息，包含 ZIMTextMessage、ZIMBarrageMessage 等消息类型。

<Warning title="注意">

- 接收消息时，收到的消息类型是基类 [ZIMMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMMessage)。开发者需要根据其中的 `type`（具体请参考 [ZIMMessageType](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMMessageType)）字段，判断消息类型是 Text 还是 Command，然后强转基类为具体的子类（[ZIMTextMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMTextMessage) 或 [ZIMCommandMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMCommandMessage)），然后从 “message” 字段获取消息内容。
- 接收消息时，可以使用消息的 orderkey 来实现排序；即 orderkey 越大，消息的时间越新。接收到消息后，会自动更新消息未读数量。
</Warning>


### 发送消息

以客户端 A 向客户端 B 发送消息为例： 

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/send_receive_peerMessage_U3D.png" /></Frame>

1. 客户端 A、B 分别创建自己的 ZIM 实例，并注册 [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接口，用于接收单聊消息通知。
2. 客户端 A、B 分别登录 ZIM SDK。
3. 客户端 A 调用 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，设置 `conversationType` 为 `ZIMConversationType.Peer` 发送一条单聊消息到客户端 B。
4. 客户端 B 将通过 [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接口，收到客户端 A 的消息。

<Warning title="注意">
目前，ZIM SDK 对于 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口有以下限制：
- 不支持向自己发送消息：即 `toConversationID` 不能设置为调用者自己的用户 ID。
- 不支持发送空白消息：消息内容不能为空或空白。
当出现上述两种情况时，ZIM SDK 会返回错误 6000001，并提示传入参数错误。
</Warning>

```cs
// 1、创建 ZIM 对象，传入 appID、appSign
ZIMAppConfig appConfig = new ZIMAppConfig();
appConfig.appID = 12345;  // 替换为您从 [ZEGO 控制台](https://console.zego.im) 申请到的 AppID，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
appConfig.appSign = "appSign";   // 替换为您从 [ZEGO 控制台](https://console.zego.im) 申请到的 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
ZIM.Create(appConfig);

// 2、设置单聊消息回调
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                    List<ZIMMessage> messageList,
                    string fromUserID) =>{ };

// 3、登录
ZIMUserInfo zimUserInfo = new ZIMUserInfo();
zimUserInfo.userID = "xxxx";
zimUserInfo.userName = "xxxx";
ZIM.GetInstance().Login(zimUserInfo, (ZIMError errorInfo) =>
    {
        // 开发者可根据 ZIMError 来判断是否登录成功。          
    }
);

string toConversationID = "xxxx1";

ZIMTextMessage zimMessage = new ZIMTextMessage();
zimMessage.message = "消息内容";

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.Low;
// 设置消息的离线推送配置
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content = "离线推送的内容";
pushConfig.payload = "离线推送的扩展信息";
config.pushConfig = pushConfig;

// 4、设置发送的会话类型
// 发送单聊信息
ZIMConversationType peerType = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType groupType = ZIMConversationType.Group;

// 发送房间信息
// ZIMConversationType roomType = ZIMConversationType.Room;


ZIMMessageSendNotification notification = new ZIMMessageSendNotification();
            
// 5、发送消息
ZIM.GetInstance().SendMessage(zimMessage, toConversationID, peerType, config, notification, (ZIMMessage message, ZIMError errorInfo) =>
{
    // 开发者可以通过该回调监听消息是否发送成功。
});

ZIM.GetInstance().onMessageSentStatusChanged = (
    ZIM zim,
    List<ZIMMessageSentStatusChangeInfo> messageSentStatusChangeInfoList) =>
{
    // 开发者可以通过该通知监听消息是否发送成功。
};
```

### 接收消息

<Note title="说明">

- 发送消息时，统一使用 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，并根据消息类型传入对应的 ZIMConversationType 取值。
- 接收消息时：
    - 单聊消息（Peer 类型），通过 [OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接收。
    - 房间消息（Room 类型），通过 [OnReceiveRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接收。
    - 群组消息（Group 类型），通过 [OnReceiveGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message) 回调接收。
</Note>

```cs
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                            List<ZIMMessage> messageList,
                            string fromUserID) =>
{
    // 收到的单聊消息
};

ZIM.GetInstance().onReceiveRoomMessage = (ZIM zim,
                            List<ZIMMessage> messageList,
                            string fromRoomID) =>
{
    // 收到的房间消息
};

ZIM.GetInstance().onReceiveGroupMessage = (ZIM zim,
                            List<ZIMMessage> messageList,
                            string fromGroupID) =>
{
    // 收到的群聊消息
};
```

## 收发富媒体消息

ZIM SDK 支持发送多种类型的富媒体消息，包含图片、文件、音频、视频等消息类型，开发者可以通过以下步骤实现富媒体文件消息的收发。

1. 用户登录成功后，指定消息类型（图片、文件、音频、视频）、会话类型（单聊、房间、群组）等，向指定会话发送富媒体消息。
2. 接收方用户登录成功后，根据会话类型（单聊、房间、群组）的相关回调监听，接收富媒体消息的相关通知，以及下载富媒体消息文件到本地。

### 发送富媒体消息

用户登录成功后，调用 [SendMediaMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-media-message) 接口，指定会话、消息类型（图片、文件、音频、视频）、会话类型（单聊、房间、群组）、以及相关消息配置，向指定会话发送富媒体消息。

<Warning title="注意">

- 发送富媒体消息时，填写的待发送文件路径，必须使用 `UTF-8` 编码格式。
- 如果需要向房间/群组内发送富媒体消息，消息发送者必须要在这个房间/群组内。
</Warning>

<Accordion title="发送“图片”消息示例" defaultOpen="false">
```cs
// 发送富媒体消息消息示例 - 单聊 发送图片消息
ZIMImageMessage message = new ZIMImageMessage("/picture/xxx.jpg");
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
bool isUsingUrl = false;

if(isUsingUrl == true)
{
    message.largeImageDownloadUrl = "url";
    message.fileDownloadUrl = "url";
    message.thumbnailDownloadUrl = "url";
}
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.Low;
// 设置消息的离线推送配置
ZIMPushConfig pushConfig = new ZIMPushConfig();
pushConfig.title = "离线推送的标题";
pushConfig.content = "离线推送的内容";
pushConfig.payload = "离线推送的扩展信息";
config.pushConfig = pushConfig;
ZIMMediaMessageSendNotification notification = new ZIMMediaMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) => { };
notification.onMediaUploadingProgress = (ZIMMessage message,
    ulong currentFileSize, ulong totalFileSize) => { };
ZIM.GetInstance().SendMediaMessage(message, "toConversationID", ZIMConversationType.Peer, config, notification, (ZIMMessage message, ZIMError errorInfo) =>
{

});
```

</Accordion>

<Accordion title="发送“文件”消息示例" defaultOpen="false">
```cs
// 发送富媒体消息消息示例 - 单聊 发送文件消息
ZIMFileMessage message = new ZIMFileMessage("/picture/xxx.zip");
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
bool isUsingUrl = false;
if(isUsingUrl == true)
{
    message.fileDownloadUrl = "url";
}
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.High;
ZIMMediaMessageSendNotification notification = new ZIMMediaMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) => { };
notification.onMediaUploadingProgress = (ZIMMessage message,
    ulong currentFileSize, ulong totalFileSize) => { };

ZIM.GetInstance().SendMediaMessage(message, "conversationID", ZIMConversationType.Peer, config, notification, (ZIMMessage message, ZIMError errorInfo) => { });
```

</Accordion>

<Accordion title="发送“音频”消息示例" defaultOpen="false">
```cs
// 发送富媒体消息消息示例 - 单聊 发送音频消息
ZIMAudioMessage message = new ZIMAudioMessage("/picture/xxx.mp3", 300); // 这里的300只是举例，单位是秒。
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
bool isUsingUrl = false;
if(isUsingUrl == true)
{
    message.fileDownloadUrl = "url";
}
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.High;
ZIMMediaMessageSendNotification notification = new ZIMMediaMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) => { };
notification.onMediaUploadingProgress = (ZIMMessage message,
    ulong currentFileSize, ulong totalFileSize) => { };

ZIM.GetInstance().SendMediaMessage(message, "conversationID", 
    ZIMConversationType.Peer, config, notification, (ZIMMessage message, ZIMError errorInfo) => { });
```

</Accordion>

<Accordion title="发送“视频”消息示例" defaultOpen="false">
```cs
// 发送富媒体消息消息示例 - 单聊 发送视频消息
ZIMVideoMessage message = new ZIMVideoMessage("/picture/xxx.mp4", 300);//这里单位是秒
// 如果此处填了网络 URL，SDK 则会透传该路径，而不会经过 ZIM 后台服务处理，同时填入网络 URL 与本地路径，SDK 会优先认为用户想要使用网络 URL
bool isUsingUrl = false;
if(isUsingUrl == true)
{
    message.fileDownloadUrl = "url";
    message.videoFirstFrameDownloadUrl = "url";
}
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
config.priority = ZIMMessagePriority.High;
ZIMMediaMessageSendNotification notification = new ZIMMediaMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) => { };
notification.onMediaUploadingProgress = (ZIMMessage message,
    ulong currentFileSize, ulong totalFileSize) => { };

ZIM.GetInstance().SendMediaMessage(message, "conversationID", 
    ZIMConversationType.Peer, config, notification, (ZIMMessage message, ZIMError errorInfo) => { });
```

</Accordion>



#### 富媒体文件消息的发送进度回调

开发者可以通过 [ZIMMediaUploadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-media-uploading-progress) 回调，接收富媒体消息的上传发送进度的相关通知。


``` c#
public delegate void ZIMMediaUploadingProgress(ZIMMessage message,
    ulong currentFileSize, ulong totalFileSize);
```

其中：

- message：正在发送消息的内容。
- currentFileSize：当前已被发送的消息大小。
- totalFileSize：发送消息的总体大小。


### 接收富媒体消息

接收方用户登录成功后，根据会话类型（单聊、房间、群组）的相关回调监听（[OnReceivePeerMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-peer-message)、[OnReceiveRoomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-room-message)、[OnReceiveGroupMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-receive-group-message)），接收富媒体消息的相关通知，然后可以调用 [DownloadMediaFile](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#download-media-file) 接口，下载富媒体消息文件到本地。

下载富媒体消息时，需要指定对应的媒体消息的文件类型。

- 图片消息：可以选择下载原始文件、大图、缩略图。
- 文件/音频消息：仅能选择下载文件/音频的原始文件。
- 视频消息：可以选择下载视频原始文件、视频首帧的缩略图。

```cs
// 接收富媒体消息示例 - 单聊 接收富媒体消息
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                                 List<ZIMMessage> messageList,
                                 string fromUserID) =>
        {
            foreach(var message in messageList)
            {
                if(message.type == ZIMMessageType.Image)
                {
                    ZIMImageMessage imageMessage = message as ZIMImageMessage;
                    ZIM.GetInstance().DownloadMediaFile(imageMessage, ZIMMediaFileType.OriginalFile, (ZIMMediaMessage message,
                           ulong currentFileSize, ulong totalFileSize) =>
                    { 
                    // 下载进度的回调
                    },
                    (ZIMMediaMessage message, ZIMError errorInfo) => {
                    // 下载完成的回调
                    });
                }else if (message.type == ZIMMessageType.Video)
                {
                    ZIMVideoMessage videoMessage = message as ZIMVideoMessage;
                    // 通过 ZIMMediaFileType 选择下载的类型，如视频源文件、视频首帧图等
                    ZIMMediaFileType fileType = ZIMMediaFileType.VideoFirstFrame;
                    ZIM.GetInstance().DownloadMediaFile(videoMessage, fileType, (ZIMMediaMessage message,
                           ulong currentFileSize, ulong totalFileSize) =>
                    {
                        //下载进度的回调
                    },
                    (ZIMMediaMessage message, ZIMError errorInfo) => {
                        //下载完成的回调
                    });
                }
            }
        };
```


#### 富媒体文件消息的下载进度回调

开发者可以通过 [ZIMMediaDownloadingProgress](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~interface~ZIMDefines#zim-media-downloading-progress) 回调，接收富媒体消息的下载进度的相关通知。

``` c#
public delegate void ZIMMediaDownloadingProgress(ZIMMediaMessage message, ulong currentFileSize, ulong totalFileSize);
```

其中：

- message：正在下载的消息内容。
- currentFileSize：当前已被下载的消息大小。
- totalFileSize：下载消息的总体大小。


## 收发信令消息

ZIM SDK 支持开发者实现信令类型的消息收发，开发者可以通过 [ZIMCommandMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMCommandMessage) 对象定义自己的消息类型，例如位置消息等。

<Note title="说明">

信令消息不支持离线推送和本地存储。
</Note>

以下以**向指定用户发送信令消息**为例。

### 发送信令消息

```cs
//向指定用户发送信令消息
// 4、发送信令信息
string userID = "xxxx";

ZIMCommandMessage customMessage = new ZIMCommandMessage();
customMessage.message = new byte[] { 0x1, 0x2, 0x1, 0x2 };

ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.Low;
// 房间不支持设置消息的离线推送配置，如果需要发送离线消息，请联系 ZEGO 技术支持开通相关权限。

// 发送单聊信息
ZIMConversationType peerType = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType groupType = ZIMConversationType.Group;

// 发送房间信息
// ZIMConversationType roomType = ZIMConversationType.Room;

ZIMMessageSendNotification notification = new ZIMMessageSendNotification();
notification.onMessageAttached = (ZIMMessage message) => { };
ZIM.GetInstance().SendMessage(customMessage, 
    "toConversationID", peerType, config, notification, (ZIMMessage message, ZIMError errorInfo) => { });
```

### 接收信令消息

```cs
//用户接收信令消息
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                        List<ZIMMessage> messageList,
                        string fromUserID) =>
{
    foreach(var message in messageList)
    {
        if (message.type == ZIMMessageType.Command)
        {
            ZIMCommandMessage commandMessage = (ZIMCommandMessage)message;
        }
    }
};
```

## 收发自定义消息

ZIM SDK 支持开发者实现自定义类型的消息收发，开发者可以通过 [ZIMCustomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMCustomMessage) 对象自行定义消息类型，例如投票类型、接龙类型、视频卡片类型等。开发者可以通过以下步骤实现自定义消息的收发。

<Note title="说明">

- 仅 2.8.0 及以上版本的 ZIM SDK 支持发送自定义类型消息，接收并查看自定义类型消息的内容。
- 如果接收端的 SDK 版本介乎 [2.0.0, 2.8.0) 区间，可以收到自定义消息时，但会显示此消息类型为未知，且无法获取信息内容。如需获取此条消息，请将 SDK 升级为 2.8.0 或以上版本。
- 如果接收端的 SDK 版本为 1.x.x 版本，则无法收到自定义消息，也不会收到未知消息。
</Note>

### 发送自定义消息

发送自定义消息使用的接口为 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message)，与发送普通消息所用接口相同，开发者可参考 [收发普通消息 - 发送消息](#发送消息) 了解此接口参数详情。

开发者需要通过 [ZIMCustomMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMCustomMessage) 对象定义自定义类型消息，包括以下参数：


以下为用户在单聊会话中发送自定义消息的示例代码：

```cs
// 在单聊会话中向指定用户发送自定义消息

// 1、创建 ZIM 对象，传入 appID、appSign 与 Android 中的 Application
// 具体代码请参考上文 [收发普通消息 - 发送消息] 相关代码。

// 2、登录
// 具体代码请参考上文 [收发普通消息 - 发送消息] 相关代码。

// 3、发送自定义信息
// 指定用户的 ID
string userID = "xxxx";

// 自定义消息的文本内容
string message = "";

// 具体的自定义类型
int subType = 100; 

// 自定义消息的检索字段。
string searchedContent = "";

ZIMCustomMessage zimCustomMessage = new ZIMCustomMessage(message,subType);

// 发送消息的高级属性配置
ZIMMessageSendConfig config = new ZIMMessageSendConfig();
// 设置消息优先级
config.priority = ZIMMessagePriority.LOW;

// 发送单聊信息
ZIMConversationType type = ZIMConversationType.Peer;

// 发送群聊信息
// ZIMConversationType type = ZIMConversationType.Gourp;

// 发送房间信息
// ZIMConversationType type = ZIMConversationType.Room;

ZIMMessageSendNotification notification = new ZIMMessageSendNotification();
ZIM.GetInstance().SendMessage(zimCustomMessage, toConversationID, type,config, notification, (ZIMMessage message, ZIMError errorInfo) =>
{
    // 开发者可以通过该回调监听消息是否发送成功。
});

ZIM.GetInstance().onMessageSentStatusChanged = (
    ZIM zim,
    List<ZIMMessageSentStatusChangeInfo> messageSentStatusChangeInfoList) =>
{
    // 开发者可以通过该通知监听消息是否发送成功。
};
            
```

### 接收自定义消息

接收自定义消息的回调接口与接收普通消息的回调接口一致，请参考 [收发普通消息 - 接收消息](#接收消息) 了解具体接口。

以下为用户在单聊会话中接收自定义消息的示例代码：

```cs
//用户接收自定义消息
ZIM.GetInstance().onReceivePeerMessage = (ZIM zim,
                        List<ZIMMessage> messageList,
                        string fromUserID) =>
{
    foreach(var message in messageList)
    {
        if (message.type == ZIMMessageType.Custom)
        {
            ZIMCustomMessage customMessage = (ZIMCustomMessage)message;
        }
    }
};
```

## 监听消息状态

在一些弱网场景中，可能存在以下场景，即消息发送成功，但由于某些因素（如网络丢包），导致 ZIM SDK 未收到服务端应答。此时，ZIM SDK 会因应答超时而认为消息发送失败，但实际上消息发送成功，导致消息状态混乱。为解决该问题，明确消息最终状态， 2.6.0 或以上版本 SDK 支持开发者监听 [OnMessageSentStatusChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-message-sent-status-changed) 回调，接收消息的状态变化。消息的状态有三种，即 Sending、Success 和 Failed。根据消息状态的变化，开发者可判断消息发送是否成功，并在业务上做相应处理。

```cs
// 监听消息状态
 ZIM.GetInstance().onMessageSentStatusChanged = (
            ZIM zim,
            List<ZIMMessageSentStatusChangeInfo> messageSentStatusChangeInfoList) =>
        {
                // 开发者可在这里监听消息状态改变时的回调。
        };
```
