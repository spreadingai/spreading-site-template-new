# 自定义通知铃声

## 功能简介

ZIM 消息推送默认使用在手机系统设置的铃声与震动提示状态，但也支持自定义通知铃声。  

<Note title="说明">
本文档仅适用于配置了 APNs 或接入了 Google FCM 离线推送通道的项目。
</Note>

## 前提条件

在自定义通知铃声之前，请确保：

- 已集成 ZPNs SDK，详情请参考 [实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)。
- 已在控制台配置离线推送证书。

## 实现流程

如需自定义铃声，您必须将铃声文件打包到应用程序中，同时需要在 ZEGO 控制台配置自定义铃声文件的地址，随后在发送离线推送时传入已配置的 resourceID。

### 准备声音资源

<Tabs>
<Tab title="iOS 项目">
#### 准备声音资源

准备满足以下要求的音频资源：
- 音频长度必须小于 30 秒，否则系统将播放默认铃声。
- 音频数据格式为以下格式：
    - Linear PCM
    - MA4（IMA/ADPCM）
    - µLaw
    - aLaw
- 音频文件格式为以下格式：
    - AIFF
    - WAV
    - CAF

详情请参考 Apple 开发者文档 [UNNotificationSound](https://developer.apple.com/documentation/usernotifications/unnotificationsound?language=objc)。

#### 将声音资源加入到项目工程中

使用 XCode 打开您的项目，选择您的项目，选择合适的 Target，点击 Build Phrases 页签，展开 Copy Bundle Resources，添加声音资源，如图所示：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/addSound.png" /></Frame>
</Tab>
<Tab title="Android 项目">

#### 将声音资源加入到项目工程

1. 将声音资源文件加入到“您的项目/res/raw”目录下。

2. 如果您的项目支持 Android 8.0 (API 26) 及以上版本，需要创建 channel 以自定义铃声。

示例代码：

<CodeGroup>
```java title="Android - Java"
  // 如下代码为创建 channel 并为 channel 绑定铃声的示例代码。
  // 代码中的 callChannel 为示例的 Channel ID。
  // callChannel、ChannelName 为示例，可根据实际情况自定义。
  if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
      NotificationChannel channel = new NotificationChannel("callChannel", "ChannelName", NotificationManager.IMPORTANCE_HIGH);
      Uri sound = Uri.parse("android.resource://" + getPackageName() + "/raw/call_sound");
      channel.setSound(sound, null);
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
  }
```
```dart title="Flutter - Dart"
  // 如下代码为创建 channel 并为 channel 绑定铃声的示例代码。
  // 代码中的 callChannel 为示例的 Channel ID。
  // callChannel、ChannelName 为示例，可根据实际情况自定义。
  ZPNsNotificationChannel channel = ZPNsNotificationChannel();
  channel.channelID = "channelID";
  channel.channelName = "channelName";
  channel.androidSound = "sound";
  ZPNs.getInstance().createNotificationChannel(channel);
```
```typescript title="React Native - JavaScript"
  // 如下代码为创建 channel 并为 channel 绑定铃声的示例代码。
  // 代码中的 callChannel 为示例的 Channel ID。
  // callChannel、ChannelName 为示例，可根据实际情况自定义。
  const channel = {
      channelID: "channelID",
      channelName: "channelName",
      androidSound: "sound"
  }; 
  ZPNs.getInstance().createNotificationChannel(channel);
```
```typescript title="uni-app - JavaScript"
  // 如下代码为创建 channel 并为 channel 绑定铃声的示例代码。
  // 代码中的 callChannel 为示例的 Channel ID。
  // callChannel、ChannelName 为示例，可根据实际情况自定义。
  const channel = {
      channelID: "channelID",
      channelName: "channelName",
      androidSound: "sound"
  }; 
  ZPNs.getInstance().createNotificationChannel(channel);
```
</CodeGroup>
</Tab>
</Tabs>

### 在 ZEGO 控制台添加声音资源

<Steps>
<Step title="进入项目详情页">
登录 ZEGO 控制台，在 “项目管理” 页签中单击对应的项目，进入项目详情页。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Enter_project_1.jpeg" /></Frame>
</Step>
<Step title="点击添加资源按钮">
选择“服务配置 > 即时通讯” 页签。找到 “自定义推送策略（resourceID）配置”，单击 “添加 reourcesID”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Add_1.jpeg" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/resouceID.jpeg" /></Frame>
</Step>
<Step title="填写必要信息">
在弹窗中输入声音资源的相关信息并单击 “确定”。
<Note title="说明">
请根据您的项目实际情况，按需配置适用于 APNs 和 FCM 的 Sound 文件地址（可二选一）。   
</Note>

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Pop_out_1.jpeg" /></Frame>

相关信息的说明如下：


<table>
<tbody><tr>
<th>信息</th>
<th>说明</th>
</tr>
<tr>
<td>resourceID 名称</td>
<td>需要推送的资源的 ID。您可以自定义此 ID。</td>
</tr>
<tr>
<td colspan="2"><b>APNs</b></td>
</tr>
<tr>
<td>推送类型</td>
<td>必须为 “alert”。</td>
</tr>
<tr>
<td>Sound</td>
<td>声音资源文件在您的应用中的地址。例如，如果您是通过 Xcode 打开项目并在 Build Phrases &gt; Copy Bundle Resources 将声音资源引入项目，此时，该声音资源已位于根目录中，地址为“声音资源名称 + 后缀”，如 callSound.caf）。如何将声音资源加入到 iOS 项目工程，详情请参考 [准备声音资源](#准备声音资源)。</td>
</tr>
<tr>
<td colspan="2"><b>FCM</b></td>
</tr>
<tr>
<td>推送类型</td>
<td>仅支持为 “Notification Message” 自定义铃声。</td>
</tr>
<tr>
<td>Chanel ID</td>
<td>如果您的项目支持 Android 8.0 (API 26) 及以上版本，需要创建 channel 以自定义铃声。如何创建 channel，详情请参考 [准备声音资源](#准备声音资源)。</td>
</tr>
<tr>
<td>Sound</td>
<td>声音资源文件的名称，无需后缀，如 call_sound。如何将声音资源加入到 Android 项目工程，详情请参考 [准备声音资源](#准备声音资源)。</td>
</tr>
    </tbody></table>
</Step>
<Step title="拷贝 Resource ID">
完成输入后，“自定义推送策略（resourceID）配置” 下会出现该声音资源的具体信息，请拷贝对应的 Resource ID。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Copy_1.jpeg" /></Frame>
</Step>
</Steps>

### 发送离线推送时使用自定义铃声

在 ZIMPushConfig 中填入之前拷贝的 Push Resource ID。

<CodeGroup>
```objc title="iOS - objective-C"
  ZIMPushConfig *pushConfig = [[ZIMPushConfig alloc] init];
  pushConfig.resourcesID = @"push_resources_soundlimit";    // 从 ZEGO 控制台拷贝的 Push Resource ID
  pushConfig.title = @"your title";
  pushConfig.content = @"your content";

  // 调用包含 pushConfig 参数的 API
  ```
```java title="Android - Java"
  ZIMPushConfig pushConfig = new ZIMPushConfig();
  pushConfig.title = "your title";
  pushConfig.content = "your content";
  pushConfig.resourcesID = "push_resources_soundlimit";    // 从 ZEGO 控制台拷贝的 Push Resource ID

  // 调用包含 pushConfig 参数的 API
  ```
```dart title="Flutter - Dart"
  ZIMPushConfig pushConfig = ZIMPushConfig();
  pushConfig.resourcesID = "push_resources_soundlimit";    // 从 ZEGO 控制台拷贝的 Push Resource ID
  pushConfig.title = "your title";
  pushConfig.content = "your content";

  // 调用包含 pushConfig 参数的 API
  ```
```typescript title="React Native - JavaScript"
  const pushConfig = {
      resourcesID: "push_resources_soundlimit",    // 从 ZEGO 控制台拷贝的 Push Resource ID
      title: "your title",
      content: "your content"
  };
  const sendConfig = {
      priority: 2,
      pushConfig: pushConfig
  };

  // 调用包含 pushConfig 参数的 API
  ```
</CodeGroup>

<Content />