# 房间管理

- - -

<Note title="说明">

本文档适用于开发以下平台应用：iOS、Android、macOS、Windows。
</Note>

## 功能简介

ZIM SDK 提供多人房间聊天功能，支持用户向房间内发送文本消息或自定义消息，实现了多人在线交流、同步分享。

多人房间聊天功能可应用于小班课或者会议室等场景，房间成员数量上限请参考 [计费说明](/zim-u3d/introduction/pricing)。


## 实现流程

用户可以通过以下两种方式，创建房间并进入房间。

- <b>[方式一：创建房间、加入房间](#创建房间加入房间)</b>：用户 A 调用 [CreateRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room) 接口，传入 [ZIMRoomInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMRoomInfo) 信息，即可创建并加入房间。其他用户调用 [JoinRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-room) 接口，传入由 A 创建的房间 roomID，即可加入房间。
- <b>[方式二：进入房间](#进入房间)</b>：用户 X 调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，传入 [ZIMRoomInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMRoomInfo) 信息，如果 roomID 不存在，会自动创建一个房间然后进入。其他用户需要调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，传入由 X 创建的房间 roomID，进入房间。

房间内的用户，可以通过 [SendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#send-message) 接口，向房间内发送消息，详情请参考 [收发房间消息](/zim-u3d/send-and-receive-messages)。

<Note title="说明">

如果 roomID 已存在：

- 调用 [CreateRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room) 接口，会返回相关错误码，详情请参考 [常见错误码](/zim-u3d/sdk-error-codes/zim)。
- 调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，会直接进入此房间内。

如果 roomID 不存在：

- 调用 [CreateRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room) 接口，可以直接创建、并加入到此房间内。
- 调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，会直接创建一个房间、并进入到此房间内。
</Note>

### 创建房间、加入房间

以下流程中，我们以客户端 A 创建并加入房间，客户端 B 加入房间为例。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/CreateRoom3_new.jpg" /></Frame>

#### 1. 注册回调

所有进入房间的用户，都需注册 [OnRoomMemberJoined](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-joined)、[OnRoomMemberLeft](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-left) 和 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 回调，用于监听房间其他成员的变动和接收房间连接状态发生改变的事件通知。

注册 [OnRoomMemberJoined](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-joined) 回调示例源码：

```cs
ZIM.GetInstance().onRoomMemberJoined += (ZIM zim, List<ZIMUserInfo> memberList, string roomID) = {}
```

注册 [OnRoomMemberLeft](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-left) 回调示例源码：

```cs
ZIM.GetInstance().onRoomMemberLeft += (ZIM zim, List<ZIMUserInfo> memberList, string roomID) => {};
```

注册 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 回调示例源码：

```cs
ZIM.GetInstance().onRoomStateChanged += (ZIM zim, ZIMRoomState state, ZIMRoomEvent roomEvent, Dictionary<string, string> extendedData, string roomID) => {};
```

#### 2. 创建房间

客户端 A 登录后，创建一个房间，可以调用 [CreateRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room) 接口，传入 [ZIMRoomInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMRoomInfo) 信息，即可创建并加入房间。同时可以通过错误码 `ZIMError` 的参数值，判断是否创建成功。相关错误码请查看 [常见错误码](/zim-u3d/sdk-error-codes/zim)。

创建成功后会收到 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 的通知回调，[ZIMRoomState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomState) 为 Connected，[ZIMRoomEvent](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomEvent) 为 Success。

<Warning title="注意">

- “roomID”、“roomName” 支持开发者自定义规则生成。建议开发者将 “roomID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- 调用 [CreateRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#create-room) 接口创建房间后，会直接加入房间，无需再调用 [JoinRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-room) 接口加入房间。
</Warning>

```cs
// roomID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
zimRoomInfo.roomID = "roomID";
zimRoomInfo.roomName = "roomName";
ZIM.GetInstance().CreateRoom(zimRoomInfo, (ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) =>
{
    if (error.code == ZIMErrorCode.Success)
    {
        // 创建成功
    }
    else
    {
        // 创建失败
    }
});
```

#### 3. 加入房间

客户端 B 加入房间，可以调用 [JoinRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#join-room) 接口，传入由 A 创建的房间 roomID，即可加入房间。同时可以根据错误码 `ZIMError` 的参数值，判断用户是否加入成功。相关错误码请查看 [常见错误码](/zim-u3d/sdk-error-codes/zim)。

加入成功后会收到 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 的通知回调，[ZIMRoomState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomState) 为 Connected，[ZIMRoomEvent](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomEvent) 为 Success。

```cs
ZIM.GetInstance().JoinRoom("roomID", (ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) =>
{
    if (error.code == ZIMErrorCode.Success)
    {
        // 加入房间成功。
    }
    else
    {
        // 加入房间失败。
    }
});
```

#### 4. 房间成员变动通知

当房间有其他成员加入时，可以使用回调接口 [OnRoomMemberJoined](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-joined) 方法，实现对其他房间成员加入的监听。

例如，当客户端 B 加入由 A 创建的房间时，A 将收到房间内成员变动的通知。

```cs
ZIM.GetInstance().OnRoomMemberJoined = (ZIM zim, List<ZIMUserInfo> memberList,
                                            string roomID) =>
{
    //加入房间的成员信息
};
```

### 进入房间

以下流程中，我们以客户端 X 创建并进入房间，客户端 Y 直接进入房间为例。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/EnterRoom3_new.jpg" /></Frame>

1. 注册 [OnRoomMemberJoined](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-joined)、[OnRoomMemberLeft](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-left) 和 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 回调，详情请参考 <a href="#callback">创建房间、加入房间 - 1. 注册回调</a>。
2. 客户端 X 登录后，调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，传入 [ZIMRoomInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMRoomInfo) 信息，进入房间；如果传入的 roomID 不存在，将会自动创建一个房间并进入该房间。
3. 客户端 Y 登录后，调用 [EnterRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#enter-room) 接口，传入由 X 创建的房间 roomID，直接进入房间。
4. 进入房间成功后会收到 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 的通知回调，[ZIMRoomState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomState) 为 Connected，[ZIMRoomEvent](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomEvent) 为 Success。
5. 房间内的用户，同样可以使用回调接口 [OnRoomMemberJoined](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-joined) 方法，实现对房间内成员加入的监听。

```cs
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
zimRoomInfo.roomID = "roomID";
zimRoomInfo.roomName = "roomName";

ZIMRoomAdvancedConfig config = new ZIMRoomAdvancedConfig();

ZIM.GetInstance().EnterRoom(zimRoomInfo, config, (ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) =>
{
    if (error.code == ZIMErrorCode.Success)
    {
        // 进入成功
    }
    else
    {
        // 进入失败
    }
});
```

```cs
//回调监听
ZIM.GetInstance().OnRoomMemberJoined = (ZIM zim, List<ZIMUserInfo> memberList,
                                                    string roomID) =>
{
    //进入房间的成员信息
};
```

### 离开房间

用户如果想要离开房间，可以调用 [LeaveRoom](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIM#leave-room) 接口，传入房间的 roomID，即可退出此房间；房间内的其他用户可以通过回调接口 [OnRoomMemberLeft](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-member-left)，收到成员变动通知。

离开房间成功后会收到 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed) 的通知回调，[ZIMRoomState](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomState) 为 Disconnected，[ZIMRoomEvent](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~enum~ZIMRoomEvent) 为 Success。

离开房间后，将不能收到房间内的消息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Unity/LeaveRoom3_new.jpg" /></Frame>

```cs
// 离开房间
ZIM.GetInstance().LeaveRoom("roomID", (string roomID, ZIMError errorInfo) =>
{
    if (errorInfo.code == ZIMErrorCode.Success)
    {
        //离开房间成功
    }
    else
    {
        //离开房间失败
    }
});
```

```cs
ZIM.GetInstance().OnRoomMemberLeft = (ZIM zim, List<ZIMUserInfo> memberList,
                                  string roomID) =>
{
    //离开房间成员的信息
};
```

<Note title="说明">

- 当所有成员离开房间后，房间将自动销毁。ZIM SDK 支持通过 [ZIMRoomAdvancedConfig](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMRoomAdvancedConfig) 设置房间延迟销毁，最大延迟为 3 小时。
- 当房间延迟销毁时，房间属性和房间用户属性默认不保留。如果需要保留，请联系 ZEGO 技术支持。
</Note>


## 网络中断对房间生命周期的影响

ZIM 房间类似于在线聊天室、网络中断会导致房间进入重连状态并抛出 [OnRoomStateChanged](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-room-state-changed)。详情请参考 [场景 4 : ZIM 房间断网](https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=unity3d)。

