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

export const ZIMPushConfig={
    "default": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMPushConfig" target="_blank">ZIMPushConfig</a>,
    "RN": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_react-native~interface~ZIMPushConfig" target="_blank">ZIMPushConfig</a>,
    "uni-app": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMPushConfig" target="_blank">ZIMPushConfig</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html" target="_blank">ZIMPushConfig</a>
}

# 更新推送通知

:::if{props.platform="Flutter|RN|uni-app"}
<Note title="说明">本功能仅限在 iOS 设备上实现。</Note>
:::

## 概述

在发送新通知的同时，您可以撤回原来推送通知内容。此功能常用于取消通话邀请通知，撤回消息等场景。

<Video src="https://doc-media.zego.im/sdk-doc/doc/video/ZIM/update_push.mp4"/>

## 实现原理
ZPNs 支持通过发送 APNs 推送时携带 `"mutable-content":1` 字段，以便您的 APP 拦截该推送消息，修改其内容再展示，详情请参考 [Apple Developer 官网文档对 mutable-content 的描述](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification#2943360)。

## 配置 resourceID

联系 ZEGO 技术支持配置携带 `"mutable-content":1` 的 resourceID。

## 发送端

通过携带 {getPlatformData2(props, ZIMPushConfig)} 的接口发送离线推送时，请将上述 `resourceID` 填入其中。

以发起呼叫邀请为例：

:::if{props.platform=undefined}
```objc
ZIMCallInviteConfig *config = [[ZIMCallInviteConfig alloc] init];
config.timeout = 60;
config.mode = ZIMCallInvitationModeGeneral;
ZIMPushConfig *pushConfig = [[ZIMPushConfig alloc] init];
pushConfig.resourcesID = KeyCenter.resourceID;
pushConfig.title = [ZGZIMManager shared].myUserID;
pushConfig.content = @"邀请你语音通话";

// payload 携带一个自定的唯一标识符
pushConfig.payload =  @"{\"customId\":\"1\"}";
config.pushConfig = pushConfig;
// 发起呼叫邀请
[[ZGZIMManager shared] callInviteWithInvitees:self.selectMemberList config:config callback:^(NSString * _Nonnull callID, ZIMCallInvitationSentInfo * _Nonnull info, ZIMError * _Nonnull errorInfo) {}];
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMCallInviteConfig config = ZIMCallInviteConfig();
config.timeout = 60;
config.mode = ZIMCallInvitationMode.general;
ZIMPushConfig pushConfig = ZIMPushConfig();
pushConfig.resourcesID = "携带 mutable-content 的 resourceID";
// payload 携带一个自定的唯一标识符
pushConfig.payload =  "{\"customId\":\"1\"}";
ZIM.getInstance()?.callInvite(["userID1","userID2"], config);
```
:::
:::if{props.platform="RN|uni-app"}
```typescript
const invitees = ['xxxx'];  // 被邀请人ID列表
const config: ZIMCallInviteConfig = {
    mode: 0, 
    timeout: 60 ,//邀请超时时间，单位为秒，范围1-600
    extendedData: '',   
    pushConfig: {
        title: 'push title',
        content: 'push content',
        payload: '{\"customId\":\"1\"}',// payload 携带一个自定的唯一标识符
        resourcesID: "携带 mutable-content 的 resourceID"
}}; 
zim.callInvite(invitees, config)
    .then((res: ZIMCallInvitationSentResult) => {
        const callID = res.callID;
        // 操作成功
        // 此处的 callID 是用户发起呼叫后，SDK 内部生成的 ID，用于唯一标识一次呼叫邀请；之后发起人取消呼叫、被邀请人接受/拒绝呼叫，都会使用此 callID
    })
    .catch((err: ZIMError) => {
        // 操作失败
    })
```
:::

## 接收端

<Steps>
<Step title="配置 Capability">
打开 Xcode，在 TARGETS 下选择目标，根据路径 Signing & Capabilities > Capabilities，开启 **Push Notification**（用于离线推送通知）。
</Step>
<Step title="设置 Notification Service Extension">
<Steps>
<Step title="添加 Notification Service Extension 到 Targets">
    1. 点击 “File > New > Target...”

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_5.jpeg" /></Frame>

    2. 在弹窗中，选择 “iOS > Notification Service Extension”。
    
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_6.jpeg" /></Frame>

    3. 为该 Extension 输入 Product Name 等信息。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_7.jpeg" /></Frame>

    创建 Extension 后，会在项目工程中生成 "xxxExtension" 文件夹（xxx 为新增 Extension 时输入的 Product Name），您需要用到其中的 NotificationService 类文件。

</Step>
<Step title="为上述新增的 Extension 配置 Capability">
    在 TARGETS 下选择 Extension 目标，然后选择 “Signing & Capabilities > Capabilities > Push Notification”，即可开启离线推送通知。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_9.jpeg" /></Frame>
</Step>
<Step title="调整上述新增的 Extension 支持的最低版本为 iOS 11.0 或以上">
    如果使用的设备 iOS 版本低于此处的版本，Extension 不会在此设备生效。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_10.jpeg" /></Frame>
</Step>
</Steps>
</Step>
<Step title="编写替换通知的逻辑">
在 "xxxExtension" 文件夹（xxx 为新增 Extension 时输入的 Product Name）中的 NotificationService.m 文件中编写替换通知的业务逻辑，示例代码如下所示：

```objc
//  NotificationService.m
//  NotificationService

#import "NotificationService.h"
#import <Intents/Intents.h>

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService


// 开启推送拦截后,收到携带 "mutable-content":1 的推送通知时，会触发该方法。
- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    // 标题
    NSString *title = self.bestAttemptContent.title;
    // 副标题
    NSString *subtitle = self.bestAttemptContent.subtitle;
    // 内容
    NSString *body = self.bestAttemptContent.body;

    // 取出发送推送消息附带的 payload 字符串
    NSString *payload = [self.bestAttemptContent.userInfo objectForKey:@"payload"];

    if(payload == nil){
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    
    
    // 解析 json 字符串,并转为 NSDictionary
    NSData *jsonData = [payload dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error = nil;
    NSDictionary *payload_json_map = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&error];
    if (error) {
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    
    // 取出 payload 携带的唯一标识符
    NSString *customId = [payload_json_map objectForKey:@"customId"];

    if(customId != nil){
        [UNUserNotificationCenter.currentNotificationCenter getDeliveredNotificationsWithCompletionHandler:^(NSArray<UNNotification *> * _Nonnull notifications) {
            NSString *target_id = nil;

            // 遍历已存在的通知，找到唯一标识符一致的通知后，删除
            for (int index = 0; index < notifications.count; index ++) {
                if([[notifications[index].request.content.userInfo objectForKey:@"customId"] isEqual: customId]){
                    target_id = notifications[index].request.identifier;
                    break;
                }
            }
            if(target_id != nil){
                [UNUserNotificationCenter.currentNotificationCenter removeDeliveredNotificationsWithIdentifiers:@[target_id]];
            }
            contentHandler(self.bestAttemptContent);
        }];
    }else{
        contentHandler(self.bestAttemptContent);
    }
    
}

@end
```
</Step>
</Steps>

<Content platform="Flutter"/>