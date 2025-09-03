export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const createRoomMap = {
  'Android': <a href="@createRoom" target='_blank'>createRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/createRoom.html" target='_blank'>createRoom</a>,
}
export const ZIMRoomInfoMap = {
  'Android': <a href="@-ZIMRoomInfo" target='_blank'>ZIMRoomInfo</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomInfo-class.html" target='_blank'>ZIMRoomInfo</a>,
}
export const joinRoomMap = {
  'Android': <a href="@joinRoom" target='_blank'>joinRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/joinRoom.html" target='_blank'>joinRoom</a>,
}
export const enterRoomMap = {
  'Android': <a href="@enterRoom" target='_blank'>enterRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/enterRoom.html" target='_blank'>enterRoom</a>,
}
export const sendRoomMessageMap = {
  'Android': <a href="@sendRoomMessage" target='_blank'>sendRoomMessage</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendRoomMessage.html" target='_blank'>sendRoomMessage</a>,
}
export const setEventHandlerMap = {
  'Android': <span><a href="@setEventHandler" target='_blank'>setEventHandler</a>的</span>,
  'Web,RN,uniapp,UTS': <span><a href="@on" target='_blank'>on</a>的</span>,
  'Flutter': "",
}
export const onRoomMemberJoinedMap = {
  'Android': <a href="@onRoomMemberJoined" target='_blank'>onRoomMemberJoined</a>,
  'Web,RN,uniapp': <a href="@roomMemberJoined" target='_blank'>roomMemberJoined</a>,
  'UTS': <a href="@roomMemberJoined" target='_blank'>onRoomMemberJoined</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-member-joined-room-id" target='_blank'>roomMemberJoined</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-member-joined-room-id" target='_blank'>roomMemberJoined</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMemberJoined.html" target='_blank'>onRoomMemberJoined</a>,
}
export const leaveRoomMap = {
  'Android': <a href="@leaveRoom" target='_blank'>leaveRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveRoom.html" target='_blank'>leaveRoom</a>,
}
export const onRoomMemberLeftMap = {
  'Android': <a href="@onRoomMemberLeft" target='_blank'>onRoomMemberLeft</a>,
  'Web,RN,uniapp': <a href="@roomMemberLeft" target='_blank'>roomMemberLeft</a>,
  'UTS': <a href="@roomMemberLeft" target='_blank'>onRoomMemberLeft</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-member-left-room-id" target='_blank'>roomMemberLeft</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-member-left-room-id" target='_blank'>roomMemberLeft</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomMemberLeft.html" target='_blank'>onRoomMemberLeft</a>,
}
export const leaveAllRoomMap = {
  'Android': <a href="@leaveAllRoom" target='_blank'>leaveAllRoom</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/leaveAllRoom.html" target='_blank'>leaveAllRoom</a>,
}
export const onRoomStateChangedMap = {
  'Android': <a href="@onRoomStateChanged" target='_blank'>onRoomStateChanged</a>,
  'Web,RN,uniapp': <a href="@roomStateChanged" target='_blank'>roomStateChanged</a>,
  'UTS': <a href="@roomStateChanged" target='_blank'>onRoomStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data" target='_blank'>roomStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-room-state-changed-event-extended-data" target='_blank'>roomStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onRoomStateChanged.html" target='_blank'>onRoomStateChanged</a>,
}
export const ZIMRoomStateMap = {
  'Android': <a href="@-ZIMRoomState" target='_blank'>ZIMRoomState</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomState.html" target='_blank'>ZIMRoomState</a>,
}
export const ZIMRoomEventMap = {
  'Android': <a href="@-ZIMRoomEvent" target='_blank'>ZIMRoomEvent</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomEvent.html" target='_blank'>ZIMRoomEvent</a>,
}
export const switchRoomMap = {
  'Android': <a href="@switchRoom" target='_blank'>switchRoom</a>,
  'iOS,mac': <a href="@switchRoomFromRoomID" target='_blank'>switchRoomFromRoomID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/switchRoom.html" target='_blank'>switchRoom</a>,
}

export const ZIMRoomAdvancedConfigMap = {
  'Android': <a href="@-ZIMRoomAdvancedConfig" target='_blank'>config</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMRoomAdvancedConfig-class.html" target='_blank'>config</a>,
}

export const CONNECTEDMap = {
  'Android': "CONNECTED",
  'Flutter': "connected",
  'Web,RN,uniapp,UTS': "Connected",
  'iOS,mac': "ZIMRoomStateConnected",
  "window": "ZIM_ROOM_STATE_CONNECTED"
}
export const CONNECTINGMap = {
  'Android': "CONNECTING",
  'Flutter': "connecting",
  'Web,RN,uniapp,UTS': "Connecting",
  'iOS,mac': "ZIMRoomStateConnecting",
  "window": "ZIM_ROOM_STATE_CONNECTING"
}
export const SUCCESSMap = {
  'Android': "SUCCESS",
  'Flutter': "success",
  'Web,RN,uniapp,UTS': "Success",
  'iOS,mac': "ZIMRoomEventSuccess",
  "window": "ZIM_ROOM_EVENT_SUCCESS"
}
export const DISCONNECTEDMap = {
  'Android': "DISCONNECTED",
  'Flutter': "disconnected",
  'Web,RN,uniapp,UTS': "Disconnected",
  "window": "ZIM_ROOM_STATE_DISCONNECTED"
}
export const KICKED_OUTMap = {
  'Android': `KICKED_OUT`,
  'Flutter': `kickedOut`,
  'Web,RN,uniapp,UTS': `KickedOut`,
  'iOS,mac': `ZIMRoomEventKickedOut`,
  "window": `ZIM_ROOM_EVENT_KICKED_OUT`
}
export const ROOM_NOT_EXISTMap = {
  'Android': `ROOM_NOT_EXIST`,
  'Flutter': `roomNotExist`,
  'Web,RN,uniapp,UTS': `RoomNotExist`,
  'iOS,mac': `ZIMRoomEventRoomNotExist`,
  "window": `ZIM_ROOM_EVENT_ROOM_NOT_EXIST`
}
export const ActiveSwitchMap = {
  'Android': `ACTIVE_SWITCH`,
  'Flutter': `activeSwitch`,
  'Web,RN,uniapp,UTS': `ActiveSwitch`,
  'iOS,mac': `ZIMRoomEventActiveSwitch`,
  "window": `ZIM_ROOM_EVENT_ACTIVE_SWITCH`
}
export const SwitchFailedMap = {
  'Android': `SWITCH_FAILED`,
  'Flutter': `switchFailed`,
  'Web,RN,uniapp,UTS': `SwitchFailed`,
  'iOS,mac': `ZIMRoomEventSwitchFailed`,
  "window": `ZIM_ROOM_EVENT_SWITCH_FAILED`
}
export const platformMap = {
  'Android':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=android" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'window':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=windows" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'Flutter':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=flutter" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'mac':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=macos" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'iOS':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=ios" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'Web':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=web" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'U3d':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=unity3d" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'RN':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=react-native" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'uniapp,UTS':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=uni-app" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
  'wxxcx':<a href="https://doc-zh.zego.im/faq/reconnect_zim?product=IM&platform=wxxcx" target="_blank" > 场景 4 : ZIM 房间断网 </a>,
}

# 房间管理

- - -

## 功能简介

:::if{props.platform="Flutter"}

<Note title="说明">

本文档适用于开发以下平台的应用：iOS、Android、macOS、Windows、Web。
</Note>
:::


ZIM SDK 提供多人房间聊天功能，支持用户向房间内发送文本消息或自定义消息，实现了多人在线交流、同步分享。

多人房间聊天功能可应用于小班课或者会议室等场景，房间成员数量上限请参考 [计费说明](/zim-android/introduction/pricing)。



## 实现流程

用户可以通过以下两种方式，创建房间并进入房间。

- <b>[方式一：创建房间、加入房间](#创建房间加入房间)</b>：用户 A 调用 {getPlatformData(props,createRoomMap)} 接口，传入 {getPlatformData(props,ZIMRoomInfoMap)} 信息，即可创建并加入房间。其他用户调用 {getPlatformData(props,joinRoomMap)} 接口，传入由 A 创建的房间 roomID，即可加入房间。
- <b>[方式二：进入房间](#进入房间)</b>：用户 X 调用 {getPlatformData(props,enterRoomMap)} 接口，传入 {getPlatformData(props,ZIMRoomInfoMap)} 信息，如果 roomID 不存在，会自动创建一个房间然后进入。其他用户需要调用 {getPlatformData(props,enterRoomMap)} 接口，传入由 X 创建的房间 roomID，进入房间。

房间内的用户，可以通过 {getPlatformData(props,sendRoomMessageMap)} 接口，向房间内发送消息，详情请参考 [收发房间消息](/zim-android/send-and-receive-messages)。

<Note title="说明">

如果 roomID 已存在：

- 调用 {getPlatformData(props,createRoomMap)} 接口，会返回相关错误码，详情请参考 [常见错误码](/zim-android/sdk-error-codes/zim)。
- 调用 {getPlatformData(props,enterRoomMap)} 接口，会直接进入此房间内。

如果 roomID 不存在：

- 调用 {getPlatformData(props,createRoomMap)}  接口，可以直接创建、并加入到此房间内。
- 调用 {getPlatformData(props,enterRoomMap)} 接口，会直接创建一个房间、并进入到此房间内。
</Note>

### 创建房间、加入房间

以下流程中，我们以客户端 A 创建并加入房间，客户端 B 加入房间为例。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/create_joinRoom2.jpg" /></Frame>

#### 1. 注册回调

所有进入房间的用户，都需注册 {getPlatformData(props,onRoomMemberJoinedMap)}、 {getPlatformData(props,onRoomMemberLeftMap)} 和 {getPlatformData(props,onRoomStateChangedMap)} 回调，用于监听房间其他成员的变动和接收房间连接状态发生改变的事件通知。

注册 {getPlatformData(props,onRoomMemberJoinedMap)} 回调示例源码：

:::if{props.platform=undefined}
```java
@Override
public void onRoomMemberJoined(ZIM zim, ArrayList<ZIMUserInfo> memberList, String roomID) {
    super.onRoomMemberJoined(zim, memberList, roomID);
    }
```
:::
:::if{props.platform="window"}
```cpp
void onRoomMemberJoined(ZIM * /*zim*/, const std::vector<ZIMUserInfo> & /*memberList*/,
    const std::string & /*roomID*/) override{
        
    }
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim roomMemberJoined:(NSArray<ZIMUserInfo * > *)memberList roomID:(NSString *)roomID {
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onRoomMemberJoined = (ZIM zim, List<ZIMUserInfo> memberList, String roomID){

  };
```
:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
zim.on('roomMemberJoined', (zim, data) => {
    // to do something
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onRoomMemberJoined((data) => {
    // to do something
});
```
:::


注册 {getPlatformData(props,onRoomMemberLeftMap)} 回调示例源码：

:::if{props.platform=undefined}
```java
@Override
public void onRoomMemberLeft(ZIM zim, ArrayList<ZIMUserInfo> memberList, String roomID) {
    super.onRoomMemberLeft(ZIM zim, ArrayList<ZIMUserInfo> memberList, String roomID);
}
```
:::
:::if{props.platform="window"}
```cpp
void onRoomMemberLeft(ZIM * /*zim*/, const std::vector<ZIMUserInfo> & /*memberList*/,
    const std::string & /*roomID*/) override{
        
    }
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim roomMemberLeft:(NSArray<ZIMUserInfo * > *)memberList roomID:(NSString *)roomID {
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onRoomMemberLeft = (ZIM zim, List<ZIMUserInfo> memberList, String roomID) {
    
  };
```
:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
zim.on('roomMemberLeft', (zim, data) => {
    // to do something
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onRoomMemberLeft((data) => {
    // to do something
});
```
:::

注册 {getPlatformData(props,onRoomStateChangedMap)} 回调示例源码：

:::if{props.platform=undefined}
```java
@Override
public void onRoomStateChanged(ZIM zim, ZIMRoomState state, ZIMRoomEvent event, JSONObject extendedData, String roomID) {
    super.onRoomStateChanged(zim, state, event, extendedData, roomID);
}
```
:::
:::if{props.platform="window"}
```cpp
void onRoomStateChanged(ZIM * /*zim*/, ZIMRoomState /*state*/, ZIMRoomEvent /*event*/,
    const std::string & /*extendedData*/,
    const std::string & /*roomID*/)override{
        
    }
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    roomStateChanged:(ZIMRoomState)state
               event:(ZIMRoomEvent)event
        extendedData:(NSDictionary *)extendedData
     roomID:(NSString *)roomID{
}

```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onRoomStateChanged = (ZIM zim, ZIMRoomState state, ZIMRoomEvent event,
Map extendedData, String roomID){
    
  };
```
:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
zim.on('roomStateChanged', (zim, data) => {
    // to do something
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onRoomStateChanged((data) => {
    // to do something
});
```
:::

#### 2. 创建房间

客户端 A 登录后，创建一个房间，可以调用 {getPlatformData(props,createRoomMap)} 接口，传入 {getPlatformData(props,ZIMRoomInfoMap)} 信息，即可创建并加入房间。同时可以通过错误码 `ZIMError` 的参数值，判断是否创建成功。相关错误码请查看 [常见错误码](/zim-android/sdk-error-codes/zim)。

创建成功后会收到 {getPlatformData(props,onRoomStateChangedMap)} 的通知回调， {getPlatformData(props,ZIMRoomStateMap)} 为 {getPlatformData(props,CONNECTEDMap)}, {getPlatformData(props,ZIMRoomEventMap)} 为 {getPlatformData(props,SUCCESSMap)} 。

<Warning title="注意">

- “roomID”、“roomName” 支持开发者自定义规则生成。建议开发者将 “roomID” 设置为一个有意义的值，可将其与自己的业务账号系统进行关联。
- 调用 {getPlatformData(props,createRoomMap)} 接口创建房间后，会直接加入房间，无需再调用 {getPlatformData(props,joinRoomMap)} 接口加入房间。
</Warning>

:::if{props.platform=undefined}
```java
// roomID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
zimRoomInfo.roomID = roomID;
zimRoomInfo.roomName = roomName;
zim.createRoom(zimRoomInfo, new ZIMRoomCreatedCallback() {
    @Override
    public void onRoomCreated(ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS) {
            // 创建成功             
        } else {
            // 创建失败             
        }                                
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
// 设置房间配置。
ZIMRoomInfo roomInfo = ZIMRoomInfo();
roomInfo.roomID = '房间ID';
roomInfo.roomName = '房间名称';

// 创建房间。
ZIM
    .getInstance()
    .createRoom(roomInfo)
    .then((value) {
        // 当房间创建成功时触发此操作。
    })
    .catchError((onError) {
        // 当房间创建失败时触发此操作。
    });
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 设置房间配置。
ZIMRoomInfo *roomInfo = [[ZIMRoomInfo alloc]init];
roomInfo.roomID = @"" ;
roomInfo.roomName = @"" ;

// 创建房间。
[zim createRoom:roomInfo callback:^(ZIMRoomFullInfo * _Nonnull roomInfo, ZIMError * _Nonnull errorInfo) {
    // 在这里实现创建房间的事件回调。
}];
```
:::
:::if{props.platform="window"}
```cpp
// roomID 最大 32 字节的字符串。仅支持数字，英文字符 和 '!', '#', '$', '%', '&', '(', ')', '+', '-', ':', ';', '<', '=', '.', '>', '?', '@', '[', ']', '^', '_', '{', '}', '|', '~'。
// roomName 最大 64 字节的字符串，无特殊字符限制。
ZIMRoomInfo room_info;
room_info.roomID = room_id;
room_info.roomName = room_name;

zim_->createRoom(room_info, [=](/zim-android/guides/room/zimroomfullinfo-room_info,-zim::zimerror-error_info) {
    global_main_dialog_->PostUiThread([=] {});
    if (error_info.code != 0)
    {
        ShowMsg(L"创建房间失败，房间ID: %s, 错误码: %d", room_info.baseInfo.roomID, error_info.code);
    }
    else
    {
        ShowMsg(L"创建房间成功，房间ID: %s", room_info.baseInfo.roomID);
    }
});
```
:::
:::if{props.platform="Web|RN|uniapp|UTS"}
```typescript
const roomInfo: ZIMRoomInfo = { roomID: '', roomName: '' };
zim.createRoom(roomInfo)
    .then((res: ZIMRoomCreatedResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });
```
:::


#### 3. 加入房间

客户端 B 加入房间，可以调用 {getPlatformData(props,joinRoomMap)} 接口，传入由 A 创建的房间 roomID，即可加入房间。同时可以根据错误码 `ZIMError` 的参数值，判断用户是否加入成功。相关错误码请查看 [常见错误码](/zim-android/sdk-error-codes/zim)。

加入成功后会收到 {getPlatformData(props,onRoomStateChangedMap)} 的通知回调， {getPlatformData(props,ZIMRoomStateMap)} 为 {getPlatformData(props,CONNECTEDMap)} , {getPlatformData(props,ZIMRoomEventMap)} 为 {getPlatformData(props,SUCCESSMap)} 。

:::if{props.platform=undefined}
```java
zim.joinRoom(roomID, new ZIMRoomJoinedCallback() {
    @Override
    public void onRoomJoined(ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS) {
            // 加入房间成功。
        } else {
            // 加入房间失败。
        }     
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIM
    .getInstance()
    .joinRoom('房间ID')
    .then((value) {
        //成功加入房间时触发此代码块。
    })
    .catchError((onError) {
        //无法加入房间时触发此代码块。
    });
```
:::
:::if{props.platform="iOS|mac"}
```objc
[zim joinRoom:RoomID callback:^(ZIMRoomFullInfo * _Nonnull roomInfo, ZIMError * _Nonnull errorInfo) {
    //在这里实现加入房间的事件回调。
}];
```
:::
:::if{props.platform="window"}
```cpp
zim_->joinRoom(roomId, [=](/zim-android/guides/room/zimroomfullinfo-room_info,-zim::zimerror-error_info) {
    global_main_dialog_->PostUiThread([=] {});
    if (error_info.code != 0)
    {
        ShowMsg(L"加入房间失败，房间ID：%s，错误代码：%d", room_info.baseInfo.roomID, error_info.code);
    }
    else
    {
        ShowMsg(L"成功加入房间，房间ID：%s，房间名称：%s", room_info.baseInfo.roomID, room_info.baseInfo.roomName);
    }
});
```
:::
:::if{props.platform="Web|RN|uniapp|UTS"}
```typescript
const roomID = '';
zim.joinRoom(roomID)
    .then((res: ZIMRoomJoinedResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });
```
:::

#### 4. 房间成员变动通知

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web"}
当房间有其他成员加入时，可以使用 {getPlatformData(props,setEventHandlerMap)} 回调接口 {getPlatformData(props,onRoomMemberJoinedMap)} 方法，实现对其他房间成员加入的监听。
:::
:::if{props.platform="UTS"}
当房间有其他成员加入时，可以通过 {getPlatformData(props,onRoomMemberJoinedMap)} 回调接口，实现对其他房间成员加入的监听。
:::

例如，当客户端 B 加入由 A 创建的房间时，A 将收到房间内成员变动的通知。

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler() {
    // 加入房间通知
    @Override
    public void onRoomMemberJoined(ZIM zim, ArrayList<ZIMUserInfo> memberList, final String roomID) {
    // 通过该通知收到加入房间的用户信息        
    }
});
```

:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onRoomMemberJoined = (memberList, roomID) {
    //实现新成员加入房间的事件回调。
};
```
:::
:::if{props.platform="iOS|mac"}
```objc
- (void)zim:(ZIM *)zim
    roomMemberJoined:(NSArray<ZIMUserInfo * > *)memberList
              roomID:(NSString *)roomID{
    //这里写房间成员加入后的自定义代码
}
```
:::

:::if{props.platform="window"}
```cpp
void onRoomMemberJoined(ZIM* zim, const std::vector<ZIMUserInfo>& member_list, const std::string& room_id)
{
    for (auto member : member_list)
    {
        ShowMsg(L"用户: (%s%s) 进入房间: %s", member.userID, member.userName, room_id);
    }
}
```
:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
// 当有新的房间成员加入房间时，用于接收事件通知的回调函数。它还会返回刚刚加入房间的用户信息。
zim.on('roomMemberJoined', (zim, data) => {
    console.log(data.roomID, data.memberList);
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 当有新的房间成员加入房间时，用于接收事件通知的回调函数。它还会返回刚刚加入房间的用户信息。
zim.onRoomMemberJoined((data) => {
    console.log(data.roomID, data.memberList);
});
```
:::

### 进入房间

以下流程中，我们以客户端 X 创建并进入房间，客户端 Y 直接进入房间为例。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/enterRoom2_new.jpg" /></Frame>

1. 注册 {getPlatformData(props,onRoomMemberJoinedMap)}、 {getPlatformData(props,onRoomMemberLeftMap)} 和 {getPlatformData(props,onRoomStateChangedMap)} 回调，详情请参考 <a href="#1-注册回调">创建房间、加入房间 - 1. 注册回调</a>。
2. 客户端 X 登录后，调用 {getPlatformData(props,enterRoomMap)} 接口，传入 {getPlatformData(props,ZIMRoomInfoMap)} 信息，进入房间；如果传入的 roomID 不存在，将会自动创建一个房间并进入该房间。
3. 客户端 Y 登录后，调用 {getPlatformData(props,enterRoomMap)} 接口，传入由 X 创建的房间 roomID，直接进入房间。
4. 进入房间成功后会收到 {getPlatformData(props,onRoomStateChangedMap)} 的通知回调， {getPlatformData(props,ZIMRoomStateMap)} 为 {getPlatformData(props,CONNECTEDMap)} , {getPlatformData(props,ZIMRoomEventMap)} 为 {getPlatformData(props,SUCCESSMap)}。
:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|uniapp"}
5. 房间内的用户，同样可以使用 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberJoinedMap)} 方法，实现对房间内成员加入的监听。
:::
:::if{props.platform="UTS"}
5. 房间内的用户，同样可以使用 {getPlatformData(props,onRoomMemberJoinedMap)} 回调，实现对房间内成员加入的监听。
:::

:::if{props.platform=undefined}
```java
ZIMRoomInfo zimRoomInfo = new ZIMRoomInfo();
zimRoomInfo.roomID = roomID;
zimRoomInfo.roomName = roomName;

ZIMRoomAdvancedConfig config = new ZIMRoomAdvancedConfig();

zim.enterRoom(zimRoomInfo, config, new ZIMRoomEnteredCallback() {
    @Override
    public void onRoomEntered(ZIMRoomFullInfo zimRoomFullInfo, ZIMError error) {
        if (error.code == ZIMErrorCode.SUCCESS) {
            // 进入成功             
        } else {
            // 进入失败             
        }                                
    }
});
```

:::
:::if{props.platform="Flutter"}
```dart
// 设置房间的配置信息。
ZIMRoomInfo roomInfo = ZIMRoomInfo();
roomInfo.roomID = '房间ID';
roomInfo.roomName = '房间名称';
ZIMRoomAdvancedConfig advancedConfig = ZIMRoomAdvancedConfig();

// 直接加入房间。
ZIM.getInstance().enterRoom(roomInfo, advancedConfig).then((value) {
        // 当操作成功时触发此处代码。
    }).catchError((onError){
        // 当操作失败时触发此处代码。
    });
```
:::
:::if{props.platform="iOS|mac"}
```objc
// 设置房间的配置
ZIMRoomInfo *roomInfo = [[ZIMRoomInfo alloc]init];
roomInfo.roomID = @"" ;
roomInfo.roomName = @"" ;

ZIMRoomAdvancedConfig *config = [[ZIMRoomAdvancedConfig alloc] init];

// 直接加入房间
[zim enterRoom:roomInfo config:config callback:^(ZIMRoomFullInfo * _Nonnull roomInfo, ZIMError * _Nonnull errorInfo) {
    // 实现加入房间的事件回调
}];
```
:::
:::if{props.platform="window"}
```cpp
ZIMRoomInfo room_info;
room_info.roomID = room_id;
room_info.roomName = room_name;

ZIMRoomAdvancedConfig config;

zim_->enterRoom(room_info, config, [=](/zim-android/guides/room/zimroomfullinfo-room_info,-zim::zimerror-error_info) {
    global_main_dialog_->PostUiThread([=] {});
    if (error_info.code != 0)
    {
        ShowMsg(L"加入房间失败。房间ID：%s，错误代码：%d", room_info.baseInfo.roomID, error_info.code);
    }
    else
    {
        ShowMsg(L"成功加入房间。房间ID：%s", room_info.baseInfo.roomID);
    }
});
```
:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
const roomInfo: ZIMRoomInfo = { roomID: '', roomName: '' };
zim.enterRoom(roomInfo)
    .then((res: ZIMRoomEnteredResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });

// 当有新的房间成员加入房间时，接收事件通知的回调函数。它还返回刚刚加入房间的用户信息。
zim.on('roomMemberJoined', (zim, data) => {
    console.log(data.roomID, data.memberList);
});
```
:::
:::if{props.platform="UTS"}
```typescript
const roomInfo: ZIMRoomInfo = { roomID: '', roomName: '' };
zim.enterRoom(roomInfo)
    .then((res: ZIMRoomEnteredResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });

// 当有新的房间成员加入房间时，接收事件通知的回调函数。它还返回刚刚加入房间的用户信息。
zim.onRoomMemberJoined((data) => {
    console.log(data.roomID, data.memberList);
});
```
:::

### 切换房间

如果用户想要从一个房间切换至另一个房间，可以调用 {getPlatformData(props,switchRoomMap)} 接口，传入原房间的 ID（`fromRoomID`）以及目标房间信息（`toRoomInfo`，含房间 ID 和房间名称），即可切换房间。

然而，可能因目标房间不存在而导致房间切换失败。如需避免这种失败，也可以在调用 {getPlatformData(props,switchRoomMap)} 接口时，传入 `isCreateWhenRoomNotExisted` 为 `true`（允许 ZIM 在房间不存在时创建新房间）和 {getPlatformData(props,ZIMRoomAdvancedConfigMap)} （用于配置新房间）。如此，当 ZIM 判断目标房间不存在时，就会根据 `toRoomInfo` 和 `config`（如有）创建新房间用于切换。 
:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|uniapp"}
房间切换成功后，原房间内的其他用户可通过 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberLeftMap)} ，得知有用户离开房间；目标房间内的其他用户可通过 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberJoinedMap)} ，得知有用户进入了房间。
:::
:::if{props.platform="UTS"}
房间切换成功后，原房间内的其他用户可通过 {getPlatformData(props,onRoomMemberLeftMap)} 回调，得知有用户离开房间；目标房间内的其他用户可通过 {getPlatformData(props,onRoomMemberJoinedMap)} 回调，得知有用户进入了房间。
:::

- 完整流程请参考下图：

    :::if{props.platform="undefined|window|Flutter"}
    ```mermaid
    %%{ init: { 'flowchart': { 'curve': 'stepAfter' } } }%%

    flowchart TD
        Start([开始]) --> A[用户 A 通过 switchRoom 从 Room1 切换至 Room2]
        A --> B[用户 A 通过 onRoomStateChanged 事件得知正在连接 Room2]
        B --> C{Room2 是否存在}
        
        C -->|否| D{服务器内房间数量\n是否达到上限?}
        C -->|是| E[房间切换成功\nRoom2 用户收到 onRoomMemberJoined 回调]
        
        D -->|是| K[房间切换失败\n用户 A 通过 onRoomStateChanged 事件得知与 Room2 断连]
        D -->|否| F{isCreateWhen\nRoomNotExisted \n参数是否为 true}
        
        F -->|否| K 
        F -->|是| G[创建新房间 Room2，房间切换成功\nRoom2 各参数与调用 switchRoom 传入时一致]
        
        G --> H[用户 A 收到 2 次onRoomStateChanged 回调\n分别得知已连接 Room2 并与 Room1 断连]
        E --> H
        
        H --> I{Room1 是否\n有其他成员}
        
        I -->|是| J[Room1 用户收到 onRoomMemberLeft 回调]
        I -->|否| L[Room1 在延迟销毁时间到达时被销毁]
            
        J --> End([结束])
        L --> End
        K --> End
    ```
    :::

    :::if{props.platform="iOS|mac"}
    ```mermaid
    %%{ init: { 'flowchart': { 'curve': 'stepAfter' } } }%%

    flowchart TD
        Start([开始]) --> A[用户 A 通过 switchRoomFromRoomID 从 Room1 切换至 Room2]
        A --> B[用户 A 通过 roomStateChanged 事件得知正在连接 Room2]
        B --> C{Room2 是否存在}
        
        C -->|否| D{服务器内房间数量\n是否达到上限?}
        C -->|是| E[房间切换成功\nRoom2 用户收到 roomMemberJoined 回调]
        
        D -->|是| K[房间切换失败\n用户 A 通过 roomStateChanged 事件得知与 Room2 断连]
        D -->|否| F{isCreateWhen\nRoomNotExisted \n参数是否为 true}
        
        F -->|否| K 
        F -->|是| G[创建新房间 Room2，房间切换成功\nRoom2 各参数与调用 switchRoomFromRoomID 传入时一致]
        
        G --> H[用户 A 收到 2 次 roomStateChanged 回调\n分别得知已连接 Room2 并与 Room1 断连]
        E --> H
        
        H --> I{Room1 是否\n有其他成员}
        
        I -->|是| J[Room1 用户收到 roomMemberLeft 回调]
        I -->|否| L[Room1 在延迟销毁时间到达时被销毁]
            
        J --> End([结束])
        L --> End
        K --> End
    ```
    :::

    :::if{props.platform="Web|RN|uniapp"}
    ```mermaid
    %%{ init: { 'flowchart': { 'curve': 'stepAfter' } } }%%

    flowchart TD
        Start([开始]) --> A[用户 A 通过 switchRoom 从 Room1 切换至 Room2]
        A --> B[用户 A 通过 roomStateChanged 事件得知正在连接 Room2]
        B --> C{Room2 是否存在}
        
        C -->|否| D{服务器内房间数量\n是否达到上限?}
        C -->|是| E[房间切换成功\nRoom2 用户收到 roomMemberJoined 回调]
        
        D -->|是| K[房间切换失败\n用户 A 通过 roomStateChanged 事件得知与 Room2 断连]
        D -->|否| F{isCreateWhen\nRoomNotExisted \n参数是否为 true}
        
        F -->|否| K 
        F -->|是| G[创建新房间 Room2，房间切换成功\nRoom2 各参数与调用 switchRoom 传入时一致]
        
        G --> H[用户 A 收到 2 次 roomStateChanged 回调\n分别得知已连接 Room2 并与 Room1 断连]
        E --> H
        
        H --> I{Room1 是否\n有其他成员}
        
        I -->|是| J[Room1 用户收到 roomMemberLeft 回调]
        I -->|否| L[Room1 在延迟销毁时间到达时被销毁]
            
        J --> End([结束])
        L --> End
        K --> End
    ```
    :::
      :::if{props.platform="UTS"}
    ```mermaid
    %%{ init: { 'flowchart': { 'curve': 'stepAfter' } } }%%

    flowchart TD
        Start([开始]) --> A[用户 A 通过 switchRoom 从 Room1 切换至 Room2]
        A --> B[用户 A 通过 onRoomStateChanged 事件得知正在连接 Room2]
        B --> C{Room2 是否存在}
        
        C -->|否| D{服务器内房间数量\n是否达到上限?}
        C -->|是| E[房间切换成功\nRoom2 用户收到 onRoomMemberJoined 回调]
        
        D -->|是| K[房间切换失败\n用户 A 通过 onRoomStateChanged 事件得知与 Room2 断连]
        D -->|否| F{isCreateWhen\nRoomNotExisted \n参数是否为 true}
        
        F -->|否| K 
        F -->|是| G[创建新房间 Room2，房间切换成功\nRoom2 各参数与调用 switchRoom 传入时一致]
        
        G --> H[用户 A 收到 2 次 onRoomStateChanged 回调\n分别得知已连接 Room2 并与 Room1 断连]
        E --> H
        
        H --> I{Room1 是否\n有其他成员}
        
        I -->|是| J[Room1 用户收到 onRoomMemberLeft 回调]
        I -->|否| L[Room1 在延迟销毁时间到达时被销毁]
            
        J --> End([结束])
        L --> End
        K --> End
    ```
    :::


    如上图所示，用户在切换房间的时候会接收到数次 {getPlatformData(props,onRoomStateChangedMap)} 事件通知，根据触发时机，该事件中相关参数如下表所示：

    | 触发时机                                           | <div style={{width:"120px"}}>roomID 值</div> | state 值 | <div style={{width:"120px"}}>event 值</div> | <div style={{width:"120px"}}>事件意义</div>       |
    | ------------------------------------------------- | --------- | -------- | -------- | -------------- |
    | 调用 {getPlatformData(props,switchRoomMap)} 接口后。 | Room2     | {getPlatformData(props,CONNECTINGMap)}        | {getPlatformData(props,ActiveSwitchMap)} | 正在连接 Room2。 |
    | 调用 {getPlatformData(props,switchRoomMap)} 接口后，Room2 不存在时，以下任意情况：<ul><li>服务器内房间数量已达上限。</li><li>服务器内房间数量未达上限，但调用 {getPlatformData(props,switchRoomMap)} 接口时 `isCreateWhenRoomNoteExisted` 参数为 false。</li></ul> | Room2     | {getPlatformData(props,DISCONNECTEDMap)}        | {getPlatformData(props,SwitchFailedMap)} | 因 Room2 不存在导致切换失败。|
    | 在以下任意情况下，用户会收到两次回调：<ul><li>调用 {getPlatformData(props,switchRoomMap)} 接口后，Room2 存在。</li><li>调用 {getPlatformData(props,switchRoomMap)} 接口后，Room2 不存在，服务器内房间数量未达上限，且调用 {getPlatformData(props,switchRoomMap)} 接口时 `isCreateWhenRoomNoteExisted` 参数为 true。</li></ul> | <ul><li>第一次回调：Room2</li><li>第二次回调：Room1</li></ul>     | <ul><li>第一次回调：{getPlatformData(props,CONNECTEDMap)}</li><li>第二次回调：{getPlatformData(props,DISCONNECTEDMap)}</li></ul> | <ul><li>第一次回调：{getPlatformData(props,SUCCESSMap)}</li><li>第二次回调：{getPlatformData(props,SUCCESSMap)}</li></ul> | <ul><li>第一次回调：成功连接 Room2。</li><li>第二次回调：成功断连 Room1。</li></ul> |

- 示例代码：

:::if{props.platform=undefined}
```java
String fromRoomID = "fromRoomID";
ZIMRoomInfo toRoomInfo = new ZIMRoomInfo();
roomInfo.roomID = "toRoomID";
roomInfo.roomName = "toRoomName";

// 如果房间不存在时，是否创建房间。
// 只有此为 true 且切换到的房间不存在时，toRoomInfo 中的 toRoomName 以及 config 才有意义
boolean isCreateWhenRoomNotExisted = true;

// 进阶配置，用于创建房间
ZIMRoomAdvancedConfig config = new ZIMRoomAdvancedConfig();
config.roomAttributes.put("key1", "value1");
config.roomDestroyDelayTime = 90;

// 切换房间
zim.switchRoom(fromRoomID, toRoomInfo, isCreateWhenRoomNotExisted, config, new ZIMRoomSwitchedCallback() {
    @Override
    public void onRoomSwitched(ZIMRoomFullInfo roomInfo, ZIMError errorInfo) {
        if (errorInfo.code == ZIMErrorCode.SUCCESS) {
            // 切换房间成功，开发者可以从 roomInfo 中获取切换后房间的信息
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
NSString *fromRoomID = @"fromRoomID";
ZIMRoomInfo *toRoomInfo = [[ZIMRoomInfo alloc] init];
toRoomInfo.roomID = @"toRoomID";
toRoomInfo.roomName = @"toRoomName";
// 如果房间不存在，是否创建一个新的房间。
// 只有当这个值为true并且目标房间不存在时，toRoomName和toRoomInfo中的config才有意义。
BOOL isCreateWhenRoomNotExisted = YES; 
// 创建房间的高级配置
ZIMRoomAdvancedConfig *config = [[ZIMRoomAdvancedConfig alloc] init];
[config insertRoomAttribute:@"key1" value:@"value1"];
config.roomDestroyDelayTime = 90;
// 切换房间
[zim switchRoomFromRoomID:fromRoomID 
            toRoomInfo:toRoomInfo 
isCreateWhenRoomNotExisted:isCreateWhenRoomNotExisted
                config:config
                callback:^(ZIMRoomFullInfo *_Nonnull roomInfo, ZIMError *_Nonnull errorInfo) {
        if (errorInfo.code == 0) {
            // 房间切换成功，您可以从roomInfo中获取有关切换后的房间的信息
        }
    }];
```
:::
:::if{props.platform="window"}
```cpp
std::string fromRoomID = "fromRoomID";
auto toRoomInfo = zim::ZIMRoomInfo("toRoomID", "toRoomName");

// 当房间不存在时是否创建房间。
// 只有当此值为true且目标房间不存在时，toRoomName和toRoomInfo中的config才有意义。
bool isCreateWhenRoomNotExisted = true; 

// 创建房间的高级配置
auto config = zim::ZIMRoomAdvancedConfig();
config.roomAttributes.emplace("key1", "value1");
config.roomDestroyDelayTime = 90;

// 切换房间
zim->switchRoom(
    fromRoomID, toRoomInfo, isCreateWhenRoomNotExisted, config,
    [=](/zim-android/guides/room/const-zim::zimroomfullinfo-&roominfo,-const-zim::zimerror-&errorinfo) {
        if (errorInfo.code == zim::ZIMErrorCode::ZIM_ERROR_CODE_SUCCESS) {
            // 房间切换成功，您可以从roomInfo中获取有关切换后房间的信息
        }
    });
```
:::
:::if{props.platform="Web|RN|uniapp|UTS"}
```typescript
const fromRoomID = 'fromRoomID';
const toRoomInfo: ZIMRoomInfo = { roomID: 'toRoomID', roomName: 'toRoomName' };
const isCreateWhenRoomNotExisted = true;
// 创建房间的高级配置
const to_room_attr = {
    key1: 'value1', // 将此代码替换为实际的键值对
    key2: 'value2', // 另一个键值对
    // 可以添加更多的键值对
};

// 设置房间销毁延迟时间（以秒为单位）
const to_room_delay_destroy_time = 90; 

const config: ZIMRoomAdvancedConfig = {
    roomAttributes: to_room_attr,
    roomDestroyDelayTime: to_room_delay_destroy_time,
};

zim.switchRoom(fromRoomID, toRoomInfo, isCreateWhenRoomNotExisted, config)
    .then((res: ZIMRoomSwitchedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::

### 离开房间

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|uniapp"}
用户如果想要离开房间，可以调用 {getPlatformData(props,leaveRoomMap)} 接口，传入房间的 roomID，即可退出此房间；房间内的其他用户可以通过 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberLeftMap)} ，收到成员变动通知。
:::
:::if{props.platform="UTS"}
用户如果想要离开房间，可以调用 {getPlatformData(props,leaveRoomMap)} 接口，传入房间的 roomID，即可退出此房间；房间内的其他用户可以通过 {getPlatformData(props,onRoomMemberLeftMap)} 回调，得知有用户离开房间。
:::


离开房间成功后会收到 {getPlatformData(props,onRoomStateChangedMap)} 的通知回调， {getPlatformData(props,ZIMRoomStateMap)} 为 {getPlatformData(props,DISCONNECTEDMap)} ， {getPlatformData(props,ZIMRoomEventMap)} 为 {getPlatformData(props,SUCCESSMap)} 。

离开房间后，将不能收到房间内的消息。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/Android/leaveRoom2.jpg" /></Frame>


:::if{props.platform=undefined}
```java
// 离开房间
zim.leaveRoom(roomID, new ZIMRoomLeftCallback() {
            @Override
            public void onRoomLeft(String roomID, ZIMError errorInfo) {
                
            }
});
```

```java
zim.setEventHandler(new ZIMEventHandler() {
     // 离开房间通知
    @Override
    public void onRoomMemberLeft(ZIM zim, ArrayList<ZIMUserInfo> memberList, final String roomID) {
    // 通过该通知收到离开房间的用户信息        
    }
});
```

:::
:::if{props.platform="Flutter"}
```dart
ZIM
    .getInstance()
    .leaveRoom('roomID')
    .then((value) {
        //当成功离开房间时触发此代码块。
    })
    .catchError((onError) {
        //当离开房间失败时触发此代码块。
    });
```

```dart
ZIMEventHandler.onRoomMemberLeft = (memberList, roomID) {
    //当房间成员离开时，在此处填写自定义代码。
};
```

:::
:::if{props.platform="iOS|mac"}
```objc
[zim leaveRoom:roomID callback:^(ZIMError * _Nonnull errorInfo) {
    //实现房间成员离开时的事件回调。
}];
```

```objc
- (void)zim:(ZIM *)zim 
    roomMemberLeft:(NSArray<ZIMUserInfo * > *)memberList
            roomID:(NSString *)roomID{
	//在房间成员离开时填写自定义代码。
}
```
:::

:::if{props.platform="window"}
```cpp
zim_->leaveRoom(room_id, [=](/zim-android/guides/room/zim::zimerror-error_info) {
    global_main_dialog_->PostUiThread([=] {
        ShowMsg(L"退出房间结果：%d", error_info.code);
    });
});
```

```cpp
void onRoomMemberLeft(ZIM* zim, const std::vector<ZIMUserInfo>& member_list, const std::string& room_id)
{
    for (auto member : member_list)
    {
        ShowMsg(L"用户: (%s,%s) 退出房间: %s", member.userID, member.userName, room_id);
    }
}
```

:::
:::if{props.platform="Web|RN|uniapp"}
```typescript
const roomID = '';
zim.leaveRoom(roomID)
    .then((res: ZIMRoomLeftResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });
```

```typescript
// 当现有房间成员离开房间时，用于接收事件通知的回调函数。它还返回刚刚离开房间的用户的信息。
zim.on('roomMemberLeft', (zim, data) => {
    console.log(data.roomID, data.memberList);
});
```
:::
:::if{props.platform="UTS"}
```typescript
const roomID = '';
zim.leaveRoom(roomID)
    .then((res: ZIMRoomLeftResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });
```

```typescript
// 当现有房间成员离开房间时，用于接收事件通知的回调函数。它还返回刚刚离开房间的用户的信息。
zim.onRoomMemberLeft((data) => {
    console.log(data.roomID, data.memberList);
});
```
:::

<Note title="说明">

- 当所有成员离开房间后，房间将自动销毁。ZIM SDK 支持通过 {getPlatformData(props,ZIMRoomAdvancedConfigMap)} 设置房间延迟销毁，最大延迟为 3 小时。
- 当房间延迟销毁时，房间属性和房间用户属性默认不保留。如果需要保留，请联系 ZEGO 技术支持。
</Note>

### 退出所有房间

调用 {getPlatformData(props,leaveAllRoomMap)} 接口，即可立即离开当前加入的所有房间，并返回离开的房间列表。如果用户多端登录，则用户在一端调用此接口后，仅会退出在该端上加入的房间，在其他端加入的房间不受影响。

:::if{props.platform=undefined}
```java
ZIM.getInstance().leaveAllRoom(new ZIMRoomAllLeftCallback() {
    @Override
    public void onRoomAllLeft(ArrayList<String> roomIDList, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS){
            //roomIDList 为离开的房间列表
        }else{
            //根据官网错误码表处理
        }
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMRoomAllLeftResult result = await ZIM.getInstance()!.leaveAllRoom();
    result.roomIDs; // 离开的房间列表
} catch (PlatformException onError) {
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="iOS|mac"}
```objc
[[ZIM getInstance] leaveAllRoom:^(NSArray<NSString *> * _Nonnull roomIDList, ZIMError * _Nonnull errorinfo) {
    if(errorinfo.code == ZIMErrorCodeSuccess){
        // `roomIDList` 包含用户已离开的所有房间的ID。
    }else{
        // 根据相应的错误代码表处理错误。
    }
}];
```
:::

:::if{props.platform="window"}
```cpp
zim->leaveAllRoom([](const std::vector<std::string>& roomIDList, const ZIMError& errorInfo) {
    if (errorInfo.errorCode == 0) {
        // `roomIDList` 包含用户已离开的所有房间的ID。
    }else{
        // 根据相应的错误代码表处理错误。
    }
});
```
:::
:::if{props.platform="Web|RN|uniapp|UTS"}
```typescript
const roomIDs = [];
zim.leaveAllRoom(roomIDs)
    .then((res: ZIMRoomAllLeftResult) => {
        // 操作成功。
    })
    .catch((err: ZIMError) => {
        // 操作失败。
    });
```
:::

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web|RN|uniapp"}
房间内的其他用户可以通过 {getPlatformData(props,setEventHandlerMap)} 的回调接口 {getPlatformData(props,onRoomMemberLeftMap)} ，收到成员变动通知。
:::
:::if{props.platform="UTS"}
房间内的其他用户可以通过 {getPlatformData(props,onRoomMemberLeftMap)} 回调，得知有用户离开房间。
:::

退出所有房间成功后，用户会根据所离开房间的数量，多次收到 {getPlatformData(props,onRoomStateChangedMap)} 的通知回调， {getPlatformData(props,ZIMRoomStateMap)} 为 {getPlatformData(props,DISCONNECTEDMap)} ， {getPlatformData(props,ZIMRoomEventMap)} 为 {getPlatformData(props,SUCCESSMap)} 。

离开房间后，将不能收到房间内的消息。

### 销毁房间

开发者可以在后台调用 ZIM 服务端接口进行 [销毁房间](/zim-server/room/destroy-the-room)。房间被销毁后，用户通过 {getPlatformData(props,onRoomStateChangedMap)} 收到房间状态（ {getPlatformData(props,ZIMRoomStateMap)} ）从 {getPlatformData(props,CONNECTEDMap)} 转变为 {getPlatformData(props,DISCONNECTEDMap)} 的事件通知。根据 ZIM SDK 版本不同，回调中描述导致房间连接状态发生变更的事件（ {getPlatformData(props,ZIMRoomEventMap)} ）如下所示：
- 当 ZIM SDK 版本小于 2.13.0 时，事件为 {getPlatformData(props,KICKED_OUTMap)} 。
- 当 ZIM SDK 版本为 2.13.0 及之后版本时，事件为 {getPlatformData(props,ROOM_NOT_EXISTMap)} 。

## 网络中断对房间生命周期的影响

ZIM 房间类似于在线聊天室、网络中断会导致房间进入重连状态并抛出 {getPlatformData(props,onRoomStateChangedMap)} 。详情请参考 {getPlatformData(props,platformMap)}。
