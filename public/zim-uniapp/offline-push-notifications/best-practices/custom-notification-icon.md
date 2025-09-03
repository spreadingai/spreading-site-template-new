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

# 自定义通知图标

:::if{props.platform="Flutter|RN|uni-app"}
<Note title="说明">本功能仅限在 iOS 设备上实现。</Note>
:::

## 概述
在离线推送默认展示 APP 的图标的基础上，您还可以凭借 ZPNs 自定义离线推送的通知图标，可用于在推送单聊、群聊消息时携带发送方头像。

以 ZIM 示例 Demo 为例：

| 未自定义通知图标 | 自定义通知图标并保留 App 图标 |
| -- | -- |
| <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_1.jpeg" /></Frame> | <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_2.jpeg" /></Frame> |

## 实现原理
ZPNs 支持通过发送 APNs 推送时携带 `"mutable-content":1` 字段，以便您的 APP 拦截该推送消息，修改其内容再展示，详情请参考 [Apple Developer 官网文档对 mutable-content 的描述](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification#2943360)。


## 前提条件

- 已实现离线推送，详情请参考 [实现离线推送](/zim-uniapp/offline-push-notifications/implement-offline-push-notification)。 
- iOS 15.0 或以上版本的 iOS 真机设备。

## 配置 resourceID

联系 ZEGO 技术支持配置携带 `"mutable-content":1` 的 resourceID。

## 发送端

通过携带 {getPlatformData2(props, ZIMPushConfig)} 的接口发送离线推送时，请将上述 `resourceID` 填入其中。

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
// 传入需要的图标地址
pushConfig.payload = @"{\"avatar_url\":\"https://doc-media.zego.im/zim/example/web/assets/1.jpeg\"}"; // 在 payload 中自定协议,增加携带通知图片 url 的字段，与app 接收端解析时的协议一致即可。这里使用了一个 json 字符串。
sentConfig.pushConfig = pushConfig;

// 发送单聊文本消息
[[ZIM getInstance] sendMessage:txtMsg toConversationID:@"toUserID" conversationType:ZIMConversationTypePeer config:sentConfig notification:nil callback:^(ZIMMessage * _Nonnull message, ZIMError * _Nonnull errorInfo) {}];
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMMessageSendConfig sendConfig = ZIMMessageSendConfig();
ZIMPushConfig pushConfig = ZIMPushConfig();
pushConfig.title = "推送标题，一般为本人 userName，对应 APNs title";
pushConfig.content = "推送内容，一般与消息内容一致，对应 APNs body";
pushConfig.resourcesID = "携带 mutable-content";
// 传入需要的图标地址
pushConfig.payload = "{\"avatar_url\":\"图片资源的 url\"}";// 在 payload 中自定协议,增加携带通知图片 url 的字段，与app 接收端解析时的协议一致即可。这里使用了一个 json 字符串。
sendConfig.pushConfig = pushConfig;
// 发送单聊文本消息
ZIM.getInstance()?.sendMessage(ZIMTextMessage(message: 'message'), "toConversationID", ZIMConversationType.peer, sendConfig);
```
:::
:::if{props.platform="RN|uni-app"}
```typescript
const sendConfig: ZIMMessageSendConfig = {
    priority: 1,
    pushConfig: {
        title: '推送标题，一般为本人 userName',
        content: '推送内容，一般与消息内容一致，对应 APNs body',
        resourcesID: '携带 mutable-content',
        payload: '{\"avatar_url\":\"图片资源的 url\"}';// 在 payload 中自定协议,增加携带通知图片 url 的字段，与app 接收端解析时的协议一致即可。这里使用了一个 json 字符串。
    }
}

// 发送单聊文本消息
const toUserID = '';
const messageTextObj: ZIMMessage = { type: 1, message: '文本消息内容' };
zim.sendMessage(messageTextObj, toUserID, 0, sendConfig)
    .then((res: ZIMMessageSentResult) => {
        // 发送成功
    })
    .catch((err: ZIMError) => {
        // 发送失败
    });
```
:::

## 接收端

### 1 配置 Capability

打开 Xcode，在 TARGETS 下选择目标，根据路径 Signing & Capabilities > Capabilities，开启 **Push Notification**（用于离线推送通知） 和 **Communication Notifications**（用于在拦截推送后，自定义通知图标）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_3.jpeg" /></Frame>


### 2 配置 info.plist 文件

将以下配置添加到项目的 info.plist 中。

```xml
NSUserActivityTypes (Array)
    - INStartCallIntent
    - INSendMessageIntent
```

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_4.jpeg" /></Frame>

### 3 设置 Notification Service Extension

1. 添加 Notification Service Extension 到 Targets。

    1. 点击 “File > New > Target...”

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_5.jpeg" /></Frame>

    2. 在弹窗中，选择 “iOS > Notification Service Extension”。
    
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_6.jpeg" /></Frame>

    3. 为该 Extension 输入 Product Name 等信息。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_7.jpeg" /></Frame>

    创建 Extension 后，会在项目工程中生成 "xxxExtension" 文件夹（xxx 为新增 Extension 时输入的 Product Name），您需要用到其中的 NotificationService 类文件与 info.plist 文件。

2. 为上述新增的 Extension 配置 info.plist 文件

    ```xml
    NSUserActivityTypes (Array)
        - INStartCallIntent
        - INSendMessageIntent
    ```

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_8.jpeg" /></Frame>

3. 为上述新增的 Extension 配置 Capability

    在 TARGETS 下选择 Extension 目标，然后选择 “Signing & Capabilities > Capabilities > Push Notification”，即可开启离线推送通知。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_9.jpeg" /></Frame>

4. 调整上述新增的 Extension 支持的最低版本为 iOS 11.0 或以上。

    如果设备的 iOS 版本低于此处要求，Extension 不会在此设备生效。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZPNS/pic_10.jpeg" /></Frame>

### 4 编写自定义通知图标的业务逻辑

在 "xxxExtension" 文件夹（xxx 为新增 Extension 时输入的 Product Name）中的 NotificationService.m 文件中编写自定义通知图标的业务逻辑，示例代码如下所示：

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
    
    
    NSString *avatar_url = [payload_json_map objectForKey:@"avatar_url"];
    if(avatar_url == nil){
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    if(@available(iOS 15.0, *)){
        [self downloadWithURLString:avatar_url completionHandle:^(NSData *data, NSURL *localURL) {
            // 将图片数据转换成INImage（需要 #import <Intents/Intents.h>）
            INImage *avatar = [INImage imageWithImageData:data];
            // 创建发信对象
            INPersonHandle *messageSenderPersonHandle = [[INPersonHandle alloc] initWithValue:@"" type:INPersonHandleTypeUnknown];
            NSPersonNameComponents *components = [[NSPersonNameComponents alloc] init];
            INPerson *messageSender = [[INPerson alloc] initWithPersonHandle:messageSenderPersonHandle
                                                              nameComponents:components
                                                                 displayName:title
                                                                       image:avatar
                                                           contactIdentifier:nil
                                                            customIdentifier:nil
                                                                        isMe:NO
                                                              suggestionType:INPersonSuggestionTypeNone];
            // 创建自己对象
            INPersonHandle *mePersonHandle = [[INPersonHandle alloc] initWithValue:@"" type:INPersonHandleTypeUnknown];
            INPerson *mePerson = [[INPerson alloc] initWithPersonHandle:mePersonHandle
                                                         nameComponents:nil
                                                            displayName:nil
                                                                  image:nil
                                                      contactIdentifier:nil
                                                       customIdentifier:nil
                                                                   isMe:YES
                                                         suggestionType:INPersonSuggestionTypeNone];


            // 创建intent
            INSpeakableString *speakableString = [[INSpeakableString alloc] initWithSpokenPhrase:subtitle];
            INSendMessageIntent *intent = [[INSendMessageIntent alloc] initWithRecipients:nil
                                                                      outgoingMessageType:INOutgoingMessageTypeOutgoingMessageText
                                                                                  content:body
                                                                       speakableGroupName:speakableString
                                                                   conversationIdentifier:nil
                                                                              serviceName:nil
                                                                                   sender:messageSender
                                                                              attachments:nil];

            [intent setImage:avatar forParameterNamed:@"speakableGroupName"];
            // 创建 interaction
            INInteraction *interaction = [[INInteraction alloc] initWithIntent:intent response:nil];
            interaction.direction = INInteractionDirectionIncoming;
            [interaction donateInteractionWithCompletion:nil];
            // 创建 处理后的 UNNotificationContent
            UNNotificationContent *newContent = [self.bestAttemptContent contentByUpdatingWithProvider:intent error:nil];
            self.bestAttemptContent = [newContent mutableCopy];
            self.contentHandler(self.bestAttemptContent);
        }];
    }else{
        self.contentHandler(self.bestAttemptContent);
        return;
    }
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

<Content platform="uni-app"/>