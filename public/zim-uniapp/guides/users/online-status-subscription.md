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

export const ZIMUserOnlineStatusMap = {
  'Android': <a href="@-ZIMUserOnlineStatus" target='_blank'>ZIMUserOnlineStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMUserOnlineStatus.html" target='_blank'>ZIMUserOnlineStatus</a>,
}
export const subscribeUsersStatusMap = {
  'Android': <a href="@subscribeUsersStatus" target='_blank'>subscribeUsersStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/subscribeUsersStatus.html" target='_blank'>subscribeUsersStatus</a>,
}
export const onUserStatusUpdatedMap = {
  'Android': <a href="@onUserStatusUpdated" target='_blank'>onUserStatusUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-user-status-updated" target='_blank'>userStatusUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-user-status-updated" target='_blank'>userStatusUpdated</a>,
  "RN,uniapp,harmonyos": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#user-status-updated">userStatusUpdated</a>,
  "UTS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMEventHandler#user-status-updated">onUserStatusUpdated</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onUserStatusUpdated.html" target='_blank'>onUserStatusUpdated</a>,
}
export const ZIMEventHandlerMap = {
  'Android': <a href="@-ZIMEventHandler" target='_blank'>ZIMEventHandler</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>ZIMEventHandler</a>,
  "RN,uniapp,UTS,harmonyos": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~class~ZIM#on">on</a>, 
}
export const unsubscribeUsersStatusMap = {
  'Android': <a href="@unsubscribeUsersStatus" target='_blank'>subscribeUsersStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/subscribeUsersStatus.html" target='_blank'>subscribeUsersStatus</a>,  
}
export const queryUsersStatusMap = {
  'Android': <a href="@queryUsersStatus" target='_blank'>queryUsersStatus</a>,
  'iOS,mac': <a href="@queryUsersStatusByUserIDs" target='_blank'>queryUsersStatusByUserIDs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryUsersStatus.html" target='_blank'>queryUsersStatus</a>,  
}
export const querySubscribedUserStatusListMap = {
  'Android': <a href="@querySubscribedUserStatusList" target='_blank'>querySubscribedUserStatusList</a>,
  'iOS,mac': <a href="@querySubscribedUserStatusListWithConfig" target='_blank'>querySubscribedUserStatusListWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/querySubscribedUserStatusList.html" target='_blank'>querySubscribedUserStatusList</a>,  
}
export const onConnectionStateChangedMap = {
  'Android': <a href="@onConnectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-connection-state-changed-event-extended-data" target='_blank'>connectionStateChanged</a>,
  "RN,uniapp,harmonyos": <a href="@connectionStateChanged" target='_blank'>connectionStateChanged</a>,
  "UTS": <a href="@connectionStateChanged" target='_blank'>onConnectionStateChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onConnectionStateChanged.html" target='_blank'>onConnectionStateChanged</a>,  
}
export const ZIMConnectionStateMap = {
  'Android': <a href="@-ZIMConnectionState" target='_blank'>ZIMConnectionState</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMConnectionState.html" target='_blank'>ZIMConnectionState</a>,
}
export const ConnectedMap = {
  'Android': `CONNECTED`,
  'iOS, mac': `ZIMConnectionStateConnected`,
  'window': `ZIM_CONNECTION_STATE_CONNECTED`,
  "RN,uniapp,UTS,harmonyos":`Connected`,
  "Flutter":`connected`,
}
export const DisconnectedMap = {
  'Android': `DISCONNECTED`,
  'iOS, mac': `ZIMConnectionStateDisconnected`,
  'window': `ZIM_CONNECTION_STATE_DISCONNECTED`,
  "RN,uniapp,UTS,harmonyos":`Disconnected`,
  "Flutter":`disconnected`,
}
export const ConnectingMap = {
  'Android': `CONNECTING`,
  'iOS, mac': `ZIMConnectionStateConnecting`,
  'window': `ZIM_CONNECTION_STATE_CONNECTING`,
  "RN,uniapp,UTS,harmonyos":`Connecting`,
  "Flutter":`connecting`,  
}
export const ReconnectingMap = {
  'Android': `RECONNECTING`,
  'iOS, mac': `ZIMConnectionStateReconnecting`,
  'window': `ZIM_CONNECTION_STATE_RECONNECTING`,
  "RN,uniapp,UTS,harmonyos":`Reconnecting`,
  "Flutter":`reconnecting`,      
}
export const customStatusMap = {
  'Android': <a href="@customStatus-ZIMLoginConfig" target='_blank'>ZIMLoginConfig.customStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMLoginConfig/customStatus.html" target='_blank'>ZIMLoginConfig.customStatus</a>,
}
export const updateUserCustomStatusMap = {
  'Android': <a href="@updateUserCustomStatus" target='_blank'>updateUserCustomStatus</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateUserCustomStatus.html" target='_blank'>updateUserCustomStatus</a>,
}

# 用户状态管理

- - -

<Note title="说明">
如需使用本功能，请开通旗舰版套餐，并联系 ZEGO 技术支持打开用户状态订阅开关。
</Note>

## 功能简介

:::if{props.platform="undefined|iOS|mac|window|RN|UTS|Flutter|uniapp"}
用户状态包含用户在线状态和自定义状态：
<div>
- 用户在线状态（ {getPlatformData(props,ZIMUserOnlineStatusMap)} )：可分为在线、离线，和登出三种状态，由 ZIM 定义，开发者无法修改。
    - 在线：主动调用 `login` 接口登录并保持网络连接的条件下，用户的状态变更为在线状态。
    - 登出：主动调用 `logout` 接口后，用户的状态变更为登出状态。
    - 离线：调用 `login` 接口登录后，用户杀死 app、锁屏或退后台等行为导致网络断开，用户的状态变更为离线状态。 
- 自定义状态：您可以按需自行定义的状态，例如，请勿打扰、忙碌等。
</div>

<Frame width="auto" height="auto" >
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/a8fa19c930.png" alt="1_用户状态_中文.png"/>
</Frame>

本文介绍如何设置用户的自定义状态、订阅和查询用户的在线状态、自定义状态。
:::
:::if{props.platform="harmonyos"}
用户在线状态（ {getPlatformData(props,ZIMUserOnlineStatusMap)} )，可分为在线、离线，和登出三种状态。
<div>
- 在线：主动调用 `login` 接口登录并保持网络连接的条件下，用户的状态变更为在线状态。
- 登出：主动调用 `logout` 接口后，用户的状态变更为登出状态。
- 离线：调用 `login` 接口登录后，用户杀死 app、锁屏或退后台等行为导致网络断开，用户的状态变更为离线状态。 
</div>
本文介绍如何订阅、查询用户的在线状态。
:::

:::if{props.platform="undefined|iOS|mac|window|RN|UTS|Flutter|uniapp"}
## 设置自定义状态

您可以使用以下任意方式设置自定义状态：
<div>
- 登录时，传入 {getPlatformData(props,customStatusMap)} 参数。
- 登录后，调用 {getPlatformData(props,updateUserCustomStatusMap)} 方法。
</div>

<Note title="说明">
<div>
- `customStatus` 长度上限为 64 字节，有效期为 1 天。
- `updateUserCustomStatus` 接口限频为 1 次/秒。
</div>
</Note>
:::
  
:::if{props.platform=undefined}
<CodeGroup>
```java title="登录时设置" {2}
ZIMLoginConfig config = new ZIMLoginConfig();
config.customStatus = "忙碌"; //默认为空字符串，如果为空字符串，登录时不修改当前用户的自定义状态
```

```java title="更新自定义状态" {1}
ZIM.getInstance().updateUserCustomStatus("请勿打扰", new ZIMUserCustomStatusUpdatedCallback() {
    public void onUserCustomStatusUpdated(String customStatus, ZIMError errorInfo) {
        
    }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
```objc
// 1、登录时设置
ZIMLoginConfig *config = [[ZIMLoginConfig alloc] init];
config.customStatus = "忙碌"; //默认为空字符串，如果为空字符串，登录时不修改当前用户的自定义状态

// 2、更新自定义状态
[zim updateUserCustomStatus:@"请勿打扰"
                 callback:^(NSString * _Nonnull customStatus,
                            ZIMError *_Nonnull errorInfo) {
}];
```
:::
:::if{props.platform="window"}
```cpp
// 1、登录时设置
ZIMLoginConfig config;
config.customStatus = "忙碌"; //默认为空字符串，如果为空字符串，登录时不修改当前用户的自定义状态

// 2、更新自定义状态
zim_->updateUserCustomStatus("请勿打扰", [](std::string &customStatus, const ZIMError &errorInfo) {
    
});
```
:::
:::if{props.platform="RN|uniapp|UTS"}
<CodeGroup>
```typescript title="登录时设置" {2}
const config: ZIMLoginConfig = {
    customStatus: "忙碌", //默认为空字符串，如果为空字符串，登录时不修改当前用户的自定义状态
};
```
```typescript title="更新自定义状态" {1}
zim.updateUserCustomStatus("请勿打扰")
    .then((res: ZIMUserCustomStatusUpdatedResult) => {
    });
```
</CodeGroup>
:::
:::if{props.platform="Flutter"}
<CodeGroup>
```dart title="登录时设置" {2}
ZIMLoginConfig config = ZIMLoginConfig();
config.customStatus = "忙碌"; //默认为空字符串，如果为空字符串，登录时不修改当前用户的自定义状态
```
```dart title="更新自定义状态" {1}
ZIM.getInstance()?.updateUserCustomStatus("请勿打扰").then((ZIMUserCustomStatusUpdatedResult result) {
    
}).catchError((onError){

});
```
</CodeGroup>
:::

## 订阅用户状态

如需持续关注某些人的在线状态时，可以调用 {getPlatformData(props,subscribeUsersStatusMap)} 接口，向参数 `userIDs` 批量传入目标用户 ID（至多 100 名已注册用户，不得包含订阅者自身），在 config 中传入 `subscriptionDuration`（订阅有效时长，在此时段内会持续关注目标用户的在线状态变更），进而添加目标用户在线状态的订阅到当前用户的在线状态订阅表中。

<Note title="说明">
- 单个用户最多可以订阅 3000 人，当订阅用户超过 3000 人时，将会覆盖订阅时间最早的用户。
- 订阅其他用户的在线状态后，即便用户在 `subscriptionDuration` 时限内登出并重新登录 ZIM SDK，订阅仍然有效，无需再次调用订阅方法。
</Note>

:::if{props.platform=undefined}
```java
ZIMUserStatusSubscribeConfig config = new ZIMUserStatusSubscribeConfig();
config.subscriptionDuration = 60; // 订阅有效时间，单位为分钟，可填入的有效时间范围为 1 ～ 43200（即 30 天）

ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("userIdA");
userIDs.add("userIdB");

zim.subscribeUsersStatus(userIDs, config, new ZIMUsersStatusSubscribedCallback() {
    @Override
    public void onUsersStatusSubscribed(ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        // 处理订阅回调
        for (ZIMErrorUserInfo errorUserInfo : errorUserList) {
            System.out.println("订阅失败的用户 ID: " + errorUserInfo.userID);
            System.out.println("订阅失败的错误码: " + errorUserInfo.reason);
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMUserStatusSubscribeConfig *config = [[ZIMUserStatusSubscribeConfig alloc] init];
config.subscriptionDuration = 60; // 订阅持续时间（以分钟为单位），有效范围为1到43200（30天）

[zim subscribeUsersStatus:@[@"userIdA",@"userIdB"]
                   config:config
                 callback:^(NSArray<ZIMErrorUserInfo *> *_Nonnull errorUserList,
                            ZIMError *_Nonnull errorInfo) {
                for(ZIMErrorUserInfo *errorUserInfo in errorUserList){
                    errorUserInfo.userID; // 订阅失败的用户ID
                    errorUserInfo.reason; // 订阅失败的错误代码
                }
}];
```
:::
:::if{props.platform="window"}
```cpp
ZIMUserStatusSubscribeConfig config;
config.subscriptionDuration = 60; // 订阅持续时间（以分钟为单位），有效范围为1到43200（30天）

std::vector<std::string> userIDs = {"userIdA", "userIdB"};

zim_->subscribeUsersStatus(userIDs, config, [](const std::vector<ZIMErrorUserInfo> &errorUserList, const ZIMError &errorInfo) {
    for (const ZIMErrorUserInfo &errorUserInfo : errorUserList) {
        errorUserInfo.userID;   // 订阅失败的用户ID
        errorUserInfo.reason;   // 失败原因
    }
});
```
:::
:::if{props.platform="RN|uniapp|UTS|harmonyos"}
```typescript
// 创建订阅配置
const config: ZIMUserStatusSubscribeConfig = {
    subscriptionDuration: 60, // 订阅时长为60分钟
};

// 订阅用户ID列表
const userIDs = ['userIdA', 'userIdB'];

try {
    const result = await zim.subscribeUsersStatus(userIDs, config);

    // 检查订阅失败的用户
    if (result.errorUserList.length > 0) {
        result.errorUserList.forEach((errorUserInfo) => {
            console.log('订阅失败的用户ID：', errorUserInfo.userID);
            console.log('订阅失败的错误代码：', errorUserInfo.reason);
        });
    } else {
        console.log('所有用户订阅成功！');
    }
} catch (error) {
    // 捕获异常并处理错误代码
    console.error('订阅时发生错误：', error);
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMUserStatusSubscribeConfig config = ZIMUserStatusSubscribeConfig();
config.subscriptionDuration = 60; // 订阅有效时间，单位分钟，可填入的有效时间范围为 1 ～ 43200（即 30 天）

ZIM.getInstance()?.subscribeUsersStatus(["userIdA","userIdB"], config).then((ZIMUsersStatusSubscribedResult result) {
    for(ZIMErrorUserInfo errorUserInfo in result.errorUserList){
        errorUserInfo.userID; // 订阅失败的用户 ID
        errorUserInfo.reason; // 订阅失败的错误码
    }
}).catchError((onError){

});
```
:::

#### 结果回调 

随后，在 `subscriptionDuration` 规定的时间内，目标用户的在线状态变更将会通过 {getPlatformData(props,ZIMEventHandlerMap)} 中的 {getPlatformData(props,onUserStatusUpdatedMap)} 事件回调返回。

<Note title="说明">
如果用户在订阅后重新登录，ZIM SDK 会通过此回调向用户主动通知其订阅的目标用户在其登出期间的最后一次状态变化。
</Note>

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler(){
    public void onUserStatusUpdated(ZIM zim, ArrayList<ZIMUserStatus> userStatusList) {
        for (ZIMUserStatus userStatus : userStatusList) {
            String userID = userStatus.userID; // 目标用户 ID
            String onlineStatus = userStatus.onlineStatus; // 用户在线状态
            ArrayList<String> onlinePlatforms = userStatus.onlinePlatforms; // 用户在线平台列表
            long lastUpdateTime = userStatus.lastUpdateTime; // 上次在线状态变更时间
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
@method ZIMEventHandlerImpl : NSObject<ZIMEventHandler>

+(ZIMEventHandlerImpl *)getInstance();

@end

@implementation ZIMEventHandlerImpl

- (void)zim:(ZIM *)zim userStatusUpdated:(NSArray<ZIMUserStatus *> *)userStatusList {
    for(ZIMUserStatus *userStatus in userStatusList){
        userStatus.userID; // 目标用户ID
        userStatus.onlineStatus; // 用户在线状态
        userStatus.onlinePlatforms; // 用户在线平台列表
        userStatus.lastUpdateTime; // 在线状态的最后更新时间
    }
}

// 其他回调事件..

@end

ZIMEventHandlerImpl *eventHandlerImpl = [ZIMEventHandlerImpl getInstance];

[zim setEventHandler: eventHandlerImpl];
```
:::
:::if{props.platform="window"}
```cpp
class CZIMEventHandler : public zim::ZIMEventHandler
{
public:
    CZIMEventHandler();
    ~CZIMEventHandler();
private:
    virtual void onUserStatusUpdated(ZIM* zim, const std::vector<ZIMUserStatus>& userStatusList) override;
    // 其他回调函数
}

...

im_event_handler_ = std::make_shared<CZIMEventHandler>();
zim_->setEventHandler(im_event_handler_);
```
```cpp
void onUserStatusUpdated(ZIM* zim, const std::vector<ZIMUserStatus>& userStatusList) {
    for (const ZIMUserStatus& userStatus : userStatusList) {
        userStatus.userID;            // 目标用户ID
        userStatus.onlineStatus;      // 目标用户的在线状态
        userStatus.onlinePlatforms;   // 用户在线平台列表
        userStatus.lastUpdateTime;    // 在线状态的最后更新时间
    }
}
```
:::

:::if{props.platform="RN|uniapp|harmonyos"}
```typescript
// 监听用户状态更新事件
zim.on('userStatusUpdated', (zim, data) => {
    data.userStatusList.forEach((userStatus) => {
        // 在这里处理用户状态更新后的逻辑，比如更新UI或其他操作
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 监听用户状态更新事件
zim.onUserStatusUpdated((data) => {
    data.userStatusList.forEach((userStatus) => {
        // 在这里处理用户状态更新后的逻辑，比如更新UI或其他操作
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onUserStatusUpdated = (ZIM zim, List<ZIMUserStatus> userStatusList){
    for (ZIMUserStatus userStatus in userStatusList) {
        userStatus.userID;            // 目标用户 ID
        userStatus.onlineStatus;      // 用户在线状态
        userStatus.onlinePlatforms;   // 用户在线平台列表
        userStatus.lastUpdateTime;    // 上次在线状态变更时间
    }
};
```
:::

## 取消订阅用户在线状态

若无需关注某些用户的在线状态，可调用 {getPlatformData(props,unsubscribeUsersStatusMap)} 接口，向 `userIDs` 参数传入目标用户 ID（至多 100 名用户）。

:::if{props.platform=undefined}
```java
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("userIdA");
userIDs.add("userIdB");

zim.unsubscribeUsersStatus(userIDs, new ZIMUsersStatusUnsubscribedCallback() {
    @Override
    public void onUsersStatusUnsubscribed(ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        for (ZIMErrorUserInfo errorUserInfo : errorUserList) {
            System.out.println("取消订阅失败的用户 ID: " + errorUserInfo.userID);
            System.out.println("取消订阅失败的错误码: " + errorUserInfo.reason);
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
[zim unsubscribeUserStatus:@[@"userIdA",@"userIdB"]
                  callback:^(NSArray<ZIMErrorUserInfo *> *_Nonnull errorUserList,
                                ZIMError *_Nonnull errorInfo) {
        for(ZIMErrorUserInfo *errorUserInfo in errorUserList){
            errorUserInfo.userID; // 失败取消订阅的用户ID
            errorUserInfo.reason; // 失败取消订阅的错误代码
        }
}];
```
:::

:::if{props.platform="window"}
```cpp
std::vector<std::string> userIDs = {"userIdA", "userIdB"};

zim_->unsubscribeUsersStatus(userIDs, [](const std::vector<ZIMErrorUserInfo> &errorUserList, const ZIMError &errorInfo) {
    for (const ZIMErrorUserInfo &errorUserInfo : errorUserList) {
        errorUserInfo.userID;   // 无法取消订阅的用户ID
        errorUserInfo.reason;   // 失败原因
    }
});
```
:::
  
:::if{props.platform="RN|uniapp|UTS|harmonyos"}
```typescript
// 要取消订阅的用户ID列表
const userIDs = ['userIdA', 'userIdB'];

try {
    // 调用unsubscribeUsersStatus方法
    const result = await zim.unsubscribeUsersStatus(userIDs);
    // 检查无法取消订阅的用户
    if (result.errorUserList.length > 0) {
        result.errorUserList.forEach((errorUserInfo) => {
            console.log('无法取消订阅的用户ID：', errorUserInfo.userID);
            console.log('无法取消订阅的错误代码：', errorUserInfo.reason);
        });
    } else {
        console.log('成功取消订阅所有用户');
    }
} catch (error) {
    // 捕获异常并处理错误
    console.error('取消订阅时发生错误：', error);
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIM.getInstance()?.unsubscribeUsersStatus(["userIdA","userIdB"]).then((ZIMUsersStatusUnsubscribedResult result) {
    for(ZIMErrorUserInfo errorUserInfo in result.errorUserList){
        errorUserInfo.userID;   // 取消订阅失败的用户 ID
        errorUserInfo.reason;   // 取消订阅失败的错误码
    }
}).catchError((onError){

});
```
:::

## 查询用户在线状态

如仅需获取一次目标用户的在线状态，无需持续关注时，可以调用 {getPlatformData(props,queryUsersStatusMap)} 接口并传入目标用户的 userIDs（至多 200 名用户，不得包括当前用户）。


:::if{props.platform=undefined}
```java
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("userIdA");
userIDs.add("userIdB");

zim.queryUsersStatus(userIDs, new ZIMUsersStatusQueriedCallback() {
    @Override
    public void onUsersStatusQueried(ArrayList<ZIMUserStatus> userStatusList,
                                        ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
        for (ZIMUserStatus userStatus : userStatusList) {
            System.out.println("User ID: " + userStatus.userID); // 目标用户 ID
            System.out.println("Online Status: " + userStatus.onlineStatus); // 用户在线状态
            System.out.println("Online Platforms: " + userStatus.onlineStatus); // 用户在线平台列表
            System.out.println("Last Update Time: " + userStatus.lastUpdateTime); // 上次在线状态变更时间
        }
        
        for (ZIMErrorUserInfo errorUserInfo : errorUserList) {
            System.out.println("查询失败的用户 ID: " + errorUserInfo.userID);
            System.out.println("查询失败的错误码: " + errorUserInfo.reason);
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
[zim queryUsersStatusByUserIDs:userIDs
                      callback:^(NSArray<ZIMUserStatus *> *_Nonnull userStatusList,
                            NSArray<ZIMErrorUserInfo *> *_Nonnull errorUserList,
                            ZIMError *_Nonnull errorInfo) {
    for(ZIMUserStatus *userStatus in userStatusList){
        userStatus.userID; // 目标用户ID
        userStatus.onlineStatus; // 用户在线状态
        userStatus.onlinePlatforms; // 用户在线平台列表
        userStatus.lastUpdateTime; // 在线状态的最后更新时间
    }
    for(ZIMErrorUserInfo *errorUserInfo in errorUserList){
        errorUserInfo.userID; // 查询失败的用户ID
        errorUserInfo.reason; // 查询失败的错误代码
    }
}];
```
:::

:::if{props.platform="window"}
```cpp
std::vector<std::string> userIDs = {"userIdA", "userIdB"};

zim_->queryUsersStatus(userIDs, [](const std::vector<ZIMUserStatus> &userStatusList,
                                    const std::vector<ZIMErrorUserInfo> &errorUserList,
                                    const ZIMError &errorInfo) {
    for (const ZIMUserStatus &userStatus : userStatusList) {
        userStatus.userID;          // 目标用户ID
        userStatus.onlineStatus;    // 用户在线状态
        userStatus.onlinePlatforms; // 用户在线平台列表
        userStatus.lastUpdateTime;  // 在线状态的最后更新时间
    }
    for (const ZIMErrorUserInfo &errorUserInfo : errorUserList) {
        errorUserInfo.userID; // 失败的用户ID
        errorUserInfo.reason; // 失败原因
    }
});
```
:::

:::if{props.platform="RN|uniapp|UTS|harmonyos"}
```typescript
// 需要查询状态的用户 ID 列表
const userIDs = ['userIdA', 'userIdB'];

try {
    // 调用查询用户状态方法
    const result = await zim.queryUsersStatus(userIDs);

    // 遍历查询成功的用户状态
    result.userStatusList.forEach((userStatus) => {
        console.log('User ID:', userStatus.userID); // 目标用户 ID
        console.log('Online Status:', userStatus.onlineStatus); // 用户在线状态
        console.log('Online Platforms:', userStatus.onlinePlatforms); // 用户在线平台列表
        console.log('Last Update Time:', userStatus.lastUpdateTime); // 上次在线状态变更时间
    });

    // 检查查询失败的用户
    result.errorUserList.forEach((errorUserInfo) => {
        console.log('查询失败的用户 ID:', errorUserInfo.userID);
        console.log('查询失败的错误码:', errorUserInfo.reason);
    });
} catch (error) {
    // 捕获异常并处理错误
    console.error('查询用户状态时发生错误:', error);
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIM.getInstance()?.queryUsersStatus(["userIdA","userIdB"]).then((ZIMUsersStatusQueriedResult result) {
    for (ZIMUserStatus userStatus in result.userStatusList) {
      userStatus.userID;          // 目标用户 ID
      userStatus.onlineStatus;    // 用户在线状态
      userStatus.onlinePlatforms; // 用户在线平台列表
      userStatus.lastUpdateTime;  // 上次在线状态变更时间
    }
    for (ZIMErrorUserInfo errorUserInfo in result.errorUserList){
      errorUserInfo.userID; // 查询失败的用户 ID
      errorUserInfo.reason; // 查询失败的错误码
    }
}).catchError((onError){

});
```
:::

## 查询在线状态用户订阅列表

如果用户希望了解自己订阅了哪些用户的在线状态，可以通过 {getPlatformData(props,querySubscribedUserStatusListMap)} 接口，参数 `config.userIDs` 传空，即可获取到完整的订阅列表，包含订阅目标用户当前的状态、以及订阅有效时长。

如果用户希望确认是否订阅了某些用户的在线状态，参数 `config.userIDs` 传入查询目标的 userID 即可。


:::if{props.platform=undefined}
```java
// 查询目标用户 ID（单次查询至多包含 200 名用户）
// 当 userIDs 为 空，表示需要获取完整订阅表信息
// 当 userIDs 不为空，表示需要查询目标用户是否在订阅列表中
// 若存在，则结果回调会包含该用户状态信息
// 若不存在，则结果回调不包含相关信息
ZIMSubscribedUserStatusQueryConfig config = new ZIMSubscribedUserStatusQueryConfig();
config.userIDs.add("userIdA");
config.userIDs.add("userIdB");

zim.querySubscribedUserStatusList(config, new ZIMSubscribedUserStatusListQueriedCallback() {
    @Override
    public void onSubscribedUserStatusListQueried(ArrayList<ZIMUserStatusSubscription> userStatusSubscriptionList, ZIMError errorInfo) {
        for (ZIMUserStatusSubscription subscription : userStatusSubscriptionList) {
            subscription.subscribeExpiredTime; //订阅表中用户的订阅过期时间戳
            subscription.userStatus; //订阅表中用户的状态信息
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMSubscribedUserStatusQueryConfig *config = [[ZIMSubscribedUserStatusQueryConfig alloc] init];
// 查询的目标用户ID（单次查询最多200个用户）
// 当userIDs为空时，表示获取完整的订阅表信息
// 当userIDs不为空时，表示检查目标用户是否在订阅列表中
// 如果是，结果回调将包括他们的状态信息
// 如果不是，结果回调将不包括任何相关信息
config.userIDs = @[@"userIdA",@"userIdB"];

[zim
    querySubscribedUserStatusListWithConfig:config
                                    callback:^(NSArray<ZIMUserStatusSubscription *>
                                        *_Nonnull userStatusSubscriptionList,
                                    ZIMError *_Nonnull errorInfo) {

}];
```
:::

:::if{props.platform="window"}
```cpp
ZIMSubscribedUserStatusQueryConfig config;
// 查询的目标用户ID（单次查询最多200个用户）
// 当userIDs为空时，表示获取完整的订阅表信息
// 当userIDs不为空时，表示检查目标用户是否在订阅列表中
// 如果是，则结果将包括他们的状态信息
// 如果不是，则结果将不包括任何相关信息
config.userIDs = {"userIdA", "userIdB"};

zim_->querySubscribedUserStatusList(config, [](const std::vector<ZIMUserStatusSubscription> &userStatusSubscriptionList,
                                                const ZIMError &errorInfo) {
});
```
:::

:::if{props.platform="RN|uniapp|UTS|harmonyos"}
```typescript
// 查询配置对象
const config: ZIMSubscribedUserStatusQueryConfig = {
    userIDs: ['userIdA', 'userIdB'], // 如果为空，则查询所有订阅用户
};

try {
    // 调用方法查询订阅用户状态列表
    const result = await zim.querySubscribedUserStatusList(config);

    // 遍历订阅用户状态信息
    result.userStatusSubscriptionList.forEach((subscription) => {
        console.log('订阅到期时间：', subscription.subscribeExpiredTime); // 订阅到期时间戳
        console.log('用户状态信息：', subscription.userStatus); // 用户状态信息
    });
} catch (error) {
    // 捕获异常并处理错误
    console.error('查询订阅用户状态列表时发生错误：', error);
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMSubscribedUserStatusQueryConfig queryConfig = ZIMSubscribedUserStatusQueryConfig();
queryConfig.userIDs = ["userIdA","userIdB"];
// 查询目标用户 ID（单次查询至多包含 200 名用户）
// 当 userIDs 为 空，表示需要获取完整订阅表信息
// 当 userIDs 不为空，表示需要查询目标用户是否在订阅列表中
// 若存在，则结果回调会包含该用户状态信息
// 若不存在，则结果回调不包含相关信息
ZIM.getInstance()?.querySubscribedUserStatusList(queryConfig).then((ZIMSubscribedUserStatusListQueriedResult result) {

}).catchError((onError){

});
```
:::

## 监听当前用户在当前设备的在线状态

如果需了解当前用户在当前设备的的在线状态，可通过监听 {getPlatformData(props,onConnectionStateChangedMap)} 回调获取用户当前的连接状态（ {getPlatformData(props,ZIMConnectionStateMap)} ），并根据其判断当前用户的在线状态。

在 {getPlatformData(props,ZIMConnectionStateMap)} 中， {getPlatformData(props,ConnectedMap)} 表示用户在线， {getPlatformData(props,DisconnectedMap)} 表示用户离线；而剩余的 {getPlatformData(props,ConnectingMap)} 和 {getPlatformData(props,ReconnectingMap)} 这两种连接状态，您可以自行根据业务逻辑判断为用户是否在线。

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler(){
    public void onConnectionStateChanged(ZIM zim, ZIMConnectionState state,
                                        ZIMConnectionEvent event, JSONObject extendedData) {
        switch (state) {
            case CONNECTED:
                // 已连接，您可以映射当前用户在线状态为在线
                break;
            case CONNECTING:
                // 连接中，您可以根据您的业务逻辑，映射当前用户在线状态为在线或者离线
                break;
            case RECONNECTING:
                // 重连中，您可以根据您的业务逻辑，映射当前用户在线状态为在线或离线
                break;
            case DISCONNECTED:
                // 已断开，您可以映射当前用户状态为离线
                break;
            default:
                break;
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
@interface ZIMEventHandlerImpl : NSObject<ZIMEventHandler>

+(ZIMEventHandlerImpl *)getInstance();

@end

@implementation ZIMEventHandlerImpl

- (void)connectionStateChanged:(ZIMConnectionState)state event:(ZIMConnectionEvent)event extendedData:(NSDictionary *)extendedData{
    switch (state) {
        case ZIMConnectionStateConnected:
            // 已连接，您可以将当前用户的状态设置为在线
            break;
        case ZIMConnectionStateConnecting:
            // 连接中，根据您的业务逻辑，您可以将当前用户的状态设置为在线或离线
            break;
        case ZIMConnectionStateReconnecting:
            // 重新连接中，根据您的业务逻辑，您可以将当前用户的状态设置为在线或离线
            break;
        case ZIMConnectionStateDisconnected:
            // 已断开连接，您可以将当前用户的状态设置为离线
            break;
        default:
            break;
    }
}

// 其他回调事件..

@end

ZIMEventHandlerImpl *eventHandlerImpl = [ZIMEventHandlerImpl getInstance];

[zim setEventHandler: eventHandlerImpl];
```
:::
:::if{props.platform="window"}
```cpp
class CZIMEventHandler : public zim::ZIMEventHandler
{
public:
    CZIMEventHandler();
    ~CZIMEventHandler();
private:
    virtual void onConnectionStateChanged(ZIM* /*zim*/, ZIMConnectionState state, ZIMConnectionEvent event, const std::string & /*extendedData*/) override;
    // 其他回调函数
}

...

im_event_handler_ = std::make_shared<CZIMEventHandler>();
zim_->setEventHandler(im_event_handler_);
```
```cpp
void onConnectionStateChanged(ZIM* /*zim*/, ZIMConnectionState state, ZIMConnectionEvent event, const std::string & /*extendedData*/) {
    switch (state) {
        case ZIM_CONNECTION_STATE_CONNECTED:
            // 已连接，您可以将当前用户的状态设置为在线
            break;
        case ZIM_CONNECTION_STATE_CONNECTING:
            // 连接中，根据您的业务逻辑，您可以将当前用户的状态设置为在线或离线
            break;
        case ZIM_CONNECTION_STATE_RECONNECTING:
            // 重新连接中，根据您的业务逻辑，您可以将当前用户的状态设置为在线或离线
            break;
        case ZIM_CONNECTION_STATE_DISCONNECTED:
            // 断开连接，您可以将当前用户的状态设置为离线
            break;
        default:
            // 其他可能的状态
            break;
    }
}
```
:::

:::if{props.platform="RN|uniapp|harmonyos"}
```typescript
zim.on('connectionStateChanged', (zim, data) => {
    switch (data.state) {
        case 2: // 已连接
            console.log('已连接');
            break;
        case 1: // 连接中
            console.log('连接中');
            break;
        case 3: // 重新连接中
            console.log('重新连接中');
            break;
        case 0: // 已断开连接
            console.log('已断开连接');
            break;
        default:
            console.log('未知状态');
            break;
    }
});
```
:::
:::if{props.platform="UTS"}
```typescript
zim.onConnectionStateChanged((data) => {
    switch (data.state) {
        case 2: // 已连接
            console.log('已连接');
            break;
        case 1: // 连接中
            console.log('连接中');
            break;
        case 3: // 重新连接中
            console.log('重新连接中');
            break;
        case 0: // 已断开连接
            console.log('已断开连接');
            break;
        default:
            console.log('未知状态');
            break;
    }
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onConnectionStateChanged = (ZIM zim, ZIMConnectionState state,
    ZIMConnectionEvent event, Map extendedData){
    switch (state) {
        case ZIMConnectionState.connected:
        // 已连接，您可以映射当前用户状态为在线
            break;
        case ZIMConnectionState.connecting:
        // 连接中，您可以根据您的业务逻辑，映射当前用户状态为在线或者离线
            break;
        case ZIMConnectionState.reconnecting:
        // 重连中，您可以根据您的业务逻辑，映射当前用户状态为在线或离线
            break;
        case ZIMConnectionState.disconnected:
        // 已断开，您可以映射当前用户状态为离线
            break;
        default:
        // 处理其他可能的状态
            break;
    }
};
```
:::


## 监听当前用户的在线平台列表

在多端登录场景下，当用户登录了第二个平台后，可通过监听 {getPlatformData(props,onUserStatusUpdatedMap)} 回调，从 `userStatus.onlinePlatforms` 属性了解目前在线的平台，开发者可以借此展示用户在不同平台上的在线状态（例如：显示用户在 iOS 和 Windows 端在线）。

<Note title="说明">

当 onUserStatusUpdated 回调返回当前用户的 userStatus 信息时，其中的 `onlineStatus` 将为 `unknown`，`lastUpdateTime` 为 0，并不能真实反馈在线状态。
</Note> 

:::if{props.platform=undefined}
```java
zim.setEventHandler(new ZIMEventHandler(){
    public void onUserStatusUpdated(ZIM zim, ArrayList<ZIMUserStatus> userStatusList) {
        String myUserID = "当前用户的ID"; // 替换为实际当前用户的 ID
        for (ZIMUserStatus userStatus : userStatusList) {
            if (userStatus.userID.equals(myUserID)) {
                // 如果为当前用户，onlineStatus 将为 UNKNOWN，并不能真实反馈当前用户的在线状态
                ZIMUserOnlineStatus onlineStatus = userStatus.onlineStatus;
                
                // 当前用户的在线平台列表
                ArrayList<ZIMPlatformType> onlinePlatforms = userStatus.onlinePlatforms;
                
                // 如果为当前用户，lastUpdateTime 将为 0
                long lastUpdateTime = userStatus.lastUpdateTime;
            }
        }
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
@interface ZIMEventHandlerImpl : NSObject<ZIMEventHandler>

+(ZIMEventHandlerImpl *)getInstance();

@end

@implementation ZIMEventHandlerImpl

- (void)zim:(ZIM *)zim userStatusUpdated:(NSArray<ZIMUserStatus *> *)userStatusList {
    for(ZIMUserStatus *userStatus in userStatusList){
        if([userStatus.userID isEqual:myUserID]){
            userStatus.onlineStatus; // 如果是当前用户，onlineStatus将是未知的
            userStatus.onlinePlatforms; // 当前用户的在线平台列表
            userStatus.lastUpdateTime;  // 如果是当前用户，lastUpdateTime将为0
        }
    }
}

// 其他回调事件..

@end

ZIMEventHandlerImpl *eventHandlerImpl = [ZIMEventHandlerImpl getInstance];

[zim setEventHandler: eventHandlerImpl];
```
:::

:::if{props.platform="window"}
```cpp
void onUserStatusUpdated(ZIM* /*zim*/, const std::vector<ZIMUserStatus>& userStatusList) {
    for (const ZIMUserStatus& userStatus : userStatusList) {
        if (userStatus.userID == "myUserID") {  // 检查是否为当前用户
            userStatus.onlineStatus;            // 如果是当前用户，onlineStatus将为UNKNOWN
            userStatus.onlinePlatforms;         // 当前用户的在线平台列表
            userStatus.lastUpdateTime;          // 如果是当前用户，lastUpdateTime将为0
        }
    }
}
```
:::
:::if{props.platform="RN|uniapp|harmonyos"}
```typescript
const myUserID = '当前用户ID'; // 用当前用户的实际ID替换
zim.on('userStatusUpdated', (zim, data) => {
    data.userStatusList.forEach((userStatus) => {
        if (userStatus.userID === myUserID) {
            // 如果是当前用户，onlineStatus将是unknown，无法准确反映当前用户的在线状态
            const onlineStatus = userStatus.onlineStatus;

            // 当前用户的在线平台列表
            const onlinePlatforms = userStatus.onlinePlatforms;

            // 如果是当前用户，lastUpdateTime将为0
            const lastUpdateTime = userStatus.lastUpdateTime;

            // 处理在线状态、在线平台等逻辑
            console.log('当前用户的在线状态:', onlineStatus);
            console.log('当前用户的在线平台:', onlinePlatforms);
            console.log('最后状态更新时间:', lastUpdateTime);
        }
    });
});
```
:::
:::if{props.platform="UTS"}
```typescript
const myUserID = '当前用户ID'; // 用当前用户的实际ID替换
zim.onUserStatusUpdated((data) => {
    data.userStatusList.forEach((userStatus) => {
        if (userStatus.userID === myUserID) {
            // 如果是当前用户，onlineStatus将是unknown，无法准确反映当前用户的在线状态
            const onlineStatus = userStatus.onlineStatus;

            // 当前用户的在线平台列表
            const onlinePlatforms = userStatus.onlinePlatforms;

            // 如果是当前用户，lastUpdateTime将为0
            const lastUpdateTime = userStatus.lastUpdateTime;

            // 处理在线状态、在线平台等逻辑
            console.log('当前用户的在线状态:', onlineStatus);
            console.log('当前用户的在线平台:', onlinePlatforms);
            console.log('最后状态更新时间:', lastUpdateTime);
        }
    });
});
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMEventHandler.onUserStatusUpdated = (ZIM zim, List<ZIMUserStatus> userStatusList){
    for (ZIMUserStatus userStatus in userStatusList) {
        if (userStatus.userID == "myUserID"){
            userStatus.onlineStatus;       // 如果为当前用户，onlineStatus 将为 UNKNOWN
            userStatus.onlinePlatforms;    // 当前用户的在线平台列表
            userStatus.lastUpdateTime;     // 如果为当前用户，lastUpdateTime 将为 0
       }
    }
};
```
:::
<Content platform="uniapp" />
