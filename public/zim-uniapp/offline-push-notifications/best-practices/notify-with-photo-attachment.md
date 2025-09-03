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
    "uniapp": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~javascript_uni-app~interface~ZIMPushConfig" target="_blank">ZIMPushConfig</a>,
    "Flutter": <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html" target="_blank">ZIMPushConfig</a>
}

# 通知携带图片附件

## 概述

ZPNs 支持在发送离线推送时携带一张图片。

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/push_with_photo.jpeg" /></Frame>

## 实现原理

ZPNs 支持通过发送 APNs 推送时携带 `"mutable-content":1` 字段，以便您的 APP 拦截该推送消息，修改其内容再展示，详情请参考 [Apple Developer 官网文档对 mutable-content 的描述](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification#2943360)。


## 前提条件

- 已实现离线推送，详情请参考 [实现离线推送](/zim-uniapp/offline-push-notifications/implement-offline-push-notification)。 
- iOS 11.0 或以上版本的 iOS 真机设备。
:::if{props.platform="Flutter|RN|uniapp"}
- Android device or emulator with Android 9.0 or above version (real device is recommended).
:::

## 发送端处理

ZPNs 支持两种发送图片附件的方式，<a href="#通过-sdk-发送">通过 SDK 发送</a>和 <a href="#通过服务端-api-发送">通过全员推送服务端 API</a> 发送。其区别是，SDK 发送方式可用于所有使用 ZIMPushConfig 的接口且仅支持 iOS 端设备；全员推送服务端接口仅适用于全员推送场景，且仅支持 iOS、Google FCM 和华为设备。


### 通过 SDK 发送
1. 联系 ZEGO 技术支持配置携带 `"mutable-content":1` 的 resourceID。

2. 通过携带 {getPlatformData2(props, ZIMPushConfig)} 的接口发送离线推送时，请将上述 `resourceID` 填入其中。

以发送单聊文本消息为例：

:::if{props.platform=undefined}
```objc
ZIMTextMessage *txtMsg = [[ZIMTextMessage alloc] init];
txtMsg.message = @"消息内容";

ZIMMessageSendConfig *sentConfig = [[ZIMMessageSendConfig alloc] init];

ZIMPushConfig *pushConfig = [[ZIMPushConfig alloc] init];
pushConfig.title = @"推送标题，一般为本人 userName，对应 APNs title";
pushConfig.content = @"推送内容，一般与消息内容一致，对应 APNs body";
pushConfig.resourcesID = @"携带 "mutable-content":1 的 resourceID";
// 传入需要的图片 url 地址
pushConfig.payload = @"{\"image_attachment\":\"图片资源的 url\"}"; // 在 payload 中自定协议，增加携带图片 url 的字段，与 app 接收端解析时的协议一致即可。这里使用了一个 json 字符串。
sentConfig.pushConfig = pushConfig;

// 发送单聊文本消息
[[ZIM getInstance] sendMessage:txtMsg toConversationID:@"toUserID" conversationType:ZIMConversationTypePeer config:sentConfig notification:nil callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {}];
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMPushConfig pushConfig = ZIMPushConfig();
pushConfig.title = "推送标题，一般为本人 userName，对应 APNs title";
pushConfig.content = "推送内容，一般与消息内容一致，对应 APNs body";
pushConfig.resourcesID = "携带 mutable-content";
pushConfig.payload = "{\"image_attachment\":\"图片资源的 url\"}";
```
:::
:::if{props.platform="RN|uniapp"}
```typescript
const pushConfig: ZIMPushConfig = {
    title: '推送标题，一般为本人 userName，对应 APNs title',
    content: '推送内容，一般与消息内容一致，对应 APNs body',
    payload: '{\"image_attachment\":\"图片资源的 url\"}',
    resourcesID: '携带 mutable-content'
};
```
:::

### 通过服务端 API 发送

相关接口文档请参考 [全员推送](/zim-server/messaging/push-message-to-all-users)。

## 接收端处理

:::if{props.platform="Flutter|RN|uniapp"}
<div>
<Note title="说明">
只有iOS设备需要在接收端进行相应的处理，才能实现接收带有图像附件的通知。而在Android设备上则不需要进行处理。
</Note>
</div>
:::

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

    如果设备的 iOS 版本低于此处要求，Extension 不会在此设备生效。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_10.jpeg" /></Frame>
</Step>
</Steps>
</Step>
<Step title="编写添加图片附件的逻辑">
在 "xxxExtension" 文件夹（xxx 为新增 Extension 时输入的 Product Name）中的 NotificationService.m 文件中编写添加图片附件的业务逻辑，示例代码如下所示：

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
    
    
    NSString *imageAttachmentUrl = [payload_json_map objectForKey:@"image_attachment"];
    if(imageAttachmentUrl == nil){
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    
    [self downloadWithURLString:imageAttachmentUrl completionHandle:^(NSData *data, NSURL *localURL) {
        if(localURL){
            UNNotificationAttachment * attachment = [UNNotificationAttachment attachmentWithIdentifier:@"myAttachment" URL:localURL options:nil error:nil];
            self.bestAttemptContent.attachments = @[attachment];
        }
        contentHandler(self.bestAttemptContent);
    }];
    
}

// 下载并保存图片的方法
- (void)downloadWithURLString:(NSString *)urlStr completionHandle:(void(^)(NSData *data,NSURL *localURL))completionHandler{
    __block NSData *data = nil;
    NSURL *imageURL = [NSURL URLWithString:urlStr];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    [[session downloadTaskWithURL:imageURL completionHandler:^(NSURL *temporaryFileLocation, NSURLResponse *response, NSError *error) {
        NSURL *localURL;
        if (error != nil) {
            NSLog(@"%@", error.localizedDescription);
        } else {
            NSFileManager *fileManager = [NSFileManager defaultManager];
            localURL = [NSURL fileURLWithPath:[temporaryFileLocation.path stringByAppendingString:@".png"]];
            [fileManager moveItemAtURL:temporaryFileLocation toURL:localURL error:&error];

            NSLog(@"localURL = %@", localURL);
            data = [[NSData alloc] initWithContentsOfURL:localURL];
        }
        completionHandler(data,localURL);

    }]resume];
}

@end
```
</Step>
</Steps>

<Content platform="uniapp"/>