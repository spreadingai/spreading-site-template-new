# 实现离线推送


ZEGO 即时通讯（ZIM）支持离线推送消息的功能。例如在“单聊”或“群组聊天”时，如果您的程序在后台被冻结、或被系统或用户杀掉，与 ZEGO 服务后台的长连接超时断开后，此时如果您已接入“离线推送”功能，ZEGO 后台会为目标用户发送离线推送的消息。

开发者可以通过集成 ZPNs SDK，与 ZIM SDK 搭配使用，实现离线推送功能。

<Warning title="注意">
- ZPNs SDK 需要搭配 ZIM SDK 2.0.0 或以上版本使用。
- 使用 ZPNs SDK 前，请先在 [ZEGO 控制台](https://console.zego.im) 自助配置 ZIM 离线推送证书（详情请参考 [项目管理 - 即时通讯 - 离线推送配置](https://doc-zh.zego.im/article/16233)），若无法配置，请联系 ZEGO 技术支持处理。
</Warning>

## 方案介绍

ZIM 实现离线推送的方案如下：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/OfflinePush/Android.png" /></Frame>


1. 首先消息接收方（即接收离线消息的用户），开启各厂商的推送通道，向各厂商的推送服务器发送请求，获取 Token。
2. 各厂商的推送服务器，将 Token 返回给接收方。
3. 接收方生成 PushID，并向 ZIM 服务器发送请求，绑定用户与 PushID 的关系。

    开发者如果将 ZPNs SDK 与 ZIM SDK 搭配使用，SDK 内部会自动绑定用户与 PushID 的关系，无需特殊处理；如果单独使用 ZPNs SDK，则需自行对接 ZPNs 服务器、实现绑定逻辑。**请注意，同一设备切换 userID 前，请调用 zim.[logout](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#logout) 接口，该接口会清除 userID 绑定的 PushID。**

4. 发送方开始发送消息，消息存储到 ZIM 服务器。
5. ZIM 服务器会确认接收方的客户端是否在线。
6. 如果接收方的客户端不在线，ZIM 服务器会将消息转发给 ZPNs 服务器。
7. ZPNs 服务器将离线消息转发给各厂商的推送服务器。
8. 各厂商的服务器将消息通过“离线推送”的方式，推送给接收方；接收方登录后（至少登录一次），即可收到离线消息。

## 接入第三方厂商离线推送通道

请参考 Android 推送集成指南（[小米](/zim-android/offline-push-notifications/integrate-xiaomi)/[华为](/zim-android/offline-push-notifications/integrate-huawei)/[OPPO](/zim-android/offline-push-notifications/integrate-oppo)/[vivo](/zim-android/offline-push-notifications/integrate-vivo)/[FCM](/zim-android/offline-push-notifications/integrate-fcm)），集成需要使用到的第三方厂商离线推送 SDK，接入各厂商的离线推送通道。

## 集成 ZPNs SDK

### 导入 ZPNs SDK

开发者有两种方式导入 ZPNs SDK：

- 方式1: 使用 Maven Central 自动集成 SDK
- 方式2: 复制 SDK 文件手动集成

<Tabs>
<Tab title="方式1">
<Warning title="注意">仅支持 2.2.0 及之后版本的 SDK</Warning>

1. 进入项目根目录，打开 “build.gradle” 文件，在 “allprojects” 中加入如下代码。

    ```gradle
    ...
    allprojects {
        repositories {
            mavenCentral()
            google()
            jcenter()
        }
    }
    ```

2. 进入 “app” 目录，打开 “build.gradle” 文件，在 “dependencies” 中添加 `implementation 'im.zego:zpns:x.y.z'`。“x.y.z” 为 SDK 的版本号，请参考 [发布日志](/zim-android/client-sdks/zpns-release-notes) 中的发布历史获取。

    ```gradle
    ...
    dependencies {
        ...
        implementation 'im.zego:zpns:2.7.0'

        //以下为支持各厂商推送服务的 ZPNS 包，根据您实际需求，选择保留或删除
        implementation 'im.zego:zpns-huawei:2.7.0'
        implementation 'im.zego:zpns-xiaomi:2.7.0'
        implementation 'im.zego:zpns-oppo:2.7.0'
        implementation 'im.zego:zpns-vivo:2.7.0'
        implementation 'im.zego:zpns-fcm:2.7.0'
    }
    ```
</Tab>
<Tab title="方式2">
1. 请参考 [下载 SDK](/zim-android/client-sdks/sdk-downloads)，下载最新版本的 ZPNs SDK。
2. 将 SDK 包解压至项目目录下，例如 “app/libs”。 
3. 添加 SDK 引用。进入到 “app” 目录，打开 “build.gradle” 文件。  

    * 在 dependencies” 节点引入 “libs” 下的 aar。
    
    ```gradle
    implementation files('libs/zpns-release.aar')

    //以下为支持各厂商推送服务的 ZPNS 包，根据您实际需求，选择保留或删除
    implementation files('libs/fcm/zpns-android-plugin-fcm-release.aar')
    implementation files('libs/xiaomi/zpns-android-plugin-xiaomi-release.aar')
    implementation files('libs/huawei/zpns-android-plugin-huawei-release.aar')
    implementation files('libs/oppo/zpns-android-plugin-oppo-release.aar')
    implementation files('libs/vivo/zpns-android-plugin-vivo-release.aar')
    ```
</Tab>
</Tabs>

### 设置权限

开发者可以根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。 
 
```java AndroidManifest.xml
<!-- ZPNs SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

## 使用 ZPNs SDK 注册离线推送功能

1. 开发者创建新的 Java 类 MyZIMPushReceiver 继承自 ZPNs 中的 [ZPNsMessageReceiver](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver) 广播类，用于接收厂商推送消息。

    ```xml
    <receiver
        android:name=".MyZPNsReceiver"
        android:enabled="true"
        android:exported="true">
            <intent-filter>
                <action android:name="im.zego.zim.zpns.intent.action.MESSAGE" />
            </intent-filter>
        </receiver>
    ```

    <a name="HowToGetPushID"></a>

2. 实现继承 ZPNsMessageReceiver 的广播中的函数，用于向厂商发送相关通知。其中，
    
   关于各大厂商的回调支持情况：
   |接口名称|接口说明|厂商支持情况|
   |-|-|-|
   |onThroughMessageReceived|厂商透传消息回调。各厂商返回的透传消息都会触发该接口，并在此接口抛出通知。| 小米：不支持该回调 <br/> vivo：不支持该回调 <br/> 华为：支持该回调，但请先参考华为官方文档 [推送服务 - FAQ - 申请特殊权限](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509) 申请**高优先级透传消息权限**<br/> 谷歌推送：APP 处于前后台状态下才能收到此回调 <br/> OPPO：不支持该回调 |
   |onNotificationArrived|厂商通知展示回调。厂商通知展示回调，统一在此接口抛出。|小米:APP处于前后台状态下才能收到此回调 <br/> vivo：不支持该回调 <br/> 华为：不支持该回调 <br/> 谷歌推送：不支持该回调 <br/> OPPO：不支持该回调| 
   |onRegistered|厂商注册“离线推送”的结果回调。厂商注册“离线推送”的结果，会统一在此接口抛出，可通过该回调获取到 PushID。| 所有厂商都支持 |

    ```java
    public class MyZPNsReceiver extends ZPNsMessageReceiver {
        // 厂商透传消息回调
        @Override
        protected void onThroughMessageReceived(Context context, ZPNsMessage message) {
            Log.e("MyZPNsReceiver", "onThroughMessageReceived message:" + message.toString());
        }

        // 厂商通知展示回调
        @Override
        protected void onNotificationArrived(Context context, ZPNsMessage message) {
            Log.e("MyZPNsReceiver", "onNotificationArrived message:" + message.toString());
        }

        // 厂商注册离线推送结果回调，可通过该回调获取到 Push ID
        @Override
        protected void onRegistered(Context context, ZPNsRegisterMessage message) {
            Log.e("MyZPNsReceiver", "onRegistered: message:" + message.getCommandResult());
        }
    }
    ```

<Accordion title="展开了解如何获取 payload 透传字段" defaultOpen="false">
    根据离线推送接收端的厂商，开发者应选择不同的 payload 透传字段获取方式，通过 ZPNsMessageReceiver 回调方法中的 ZPNsMessage 对象获取
    在上述方法触发时将 [ZPNsMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsMessage) 对象传给该方法，取出 payload 字段。

    ```java
    static public String getZPNsMessagePayload(ZPNsMessage message){
        String payload = "";
        switch (message.getPushSource()){
            case XIAOMI:
                MiPushMessage miMsg = (MiPushMessage) message.getExtras();
                payload = miMsg.getExtra().get("payload");
                break;
            case OPPO:
                DataMessage oppoMsg = (DataMessage)message.getExtras();
                String extraJson = oppoMsg.getDataExtra();
                // 将 extra 转为 map 后，取 key 为 "payload"的 value
                break;
            case HUAWEI:
                RemoteMessage huaweiMsg = (RemoteMessage)message.getExtras();
                payload = huaweiMsg.getDataOfMap().get("payload");
                break;
            case FCM:
                com.google.firebase.messaging.RemoteMessage remoteMessage = (com.google.firebase.messaging.RemoteMessage)message.getExtras();
                payload = remoteMessage.getData().get("payload");
                break;
        }
        return payload;
    }
    ```
</Accordion>

3. 配置第三方推送通道。

    根据 [前提条件](#接入第三方厂商离线推送通道) 集成的第三方厂商离线推送 SDK，调用 [enableHWPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsConfig#enable-hw-push)/[enableMiPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsConfig#enable-mi-push)/[enableOppoPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsConfig#enable-oppo-push)/[enableVivoPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZPNsConfig#enable-vivo-push) 接口，启用各厂商的推送功能，然后调用 [setPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#set-push-config) 接口，配置第三方推送通道。

    ```java
    ZPNsConfig zpnsConfig = new ZPNsConfig();
    zpnsConfig.enableFCMPush(); // FCM
    zpnsConfig.enableHWPush("HW_APP_ID"); // 华为
    zpnsConfig.enableMiPush("MI_APPID", "MI_APPKEY"); // 小米
    zpnsConfig.enableOppoPush("OPPO_APP_ID", "OPPO_APP_KEY", "OPPO_APP_SECRET"); // OPPO
    zpnsConfig.enableVivoPush("VIVO_APP_ID", "VIVO_APP_KEY"); // vivo
    ZPNsManager.setPushConfig(zpnsConfig);
    ```
4. 注册离线推送功能。

    ```JAVA
    ZPNsManager.getInstance().registerPush(this.getApplication());
    ```

    注册离线推送功能后，可以通过继承 [ZPNsMessageReceiver](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver) 类中的 [onRegistered](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-registered) 回调，获取到离线推送的 `pushID`，向指定设备推送离线消息。

5. 如果不再需要离线推送功能，开发者可以调用 [unregisterPush](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsManager#unregister-push) 接口，注销该功能，注销后用户将不再能收到推送消息。

    ```java
    ZPNsManager.getInstance().unregisterPush();
    ```

## 使用 ZIM SDK 实现离线推送功能

ZIM 支持在发送单聊消息、发送群组消息、发起呼叫邀请时，使用离线推送消息的功能。

<Warning title="注意">
在实现离线推送前，请确保：
- 参考 [发送消息](/zim-android/send-and-receive-messages)，实现发送单聊/群聊消息的功能。
- 参考 [呼叫邀请](/zim-android/guides/call-invitation-signaling)，实现呼叫邀请。
</Warning>


#### 场景 1：发送单聊消息时使用离线推送功能

1. 首先开发者需要通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```java
    ZIMTextMessage textMessage = new ZIMTextMessage();
    ZIMPushConfig pushConfig = new ZIMPushConfig();
    pushConfig.title = "离线推送标题";
    pushConfig.content = "离线推送内容";
    pushConfig.payload = "自定义透传字段，非必填";
    pushConfig.resourcesID = "资源 ID，非必填";
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```java
    ZIMMessageSendConfig sentConfig = new ZIMMessageSendConfig();
    sentConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message)，传入 “sentConfig”，向接收方发送单聊消息。

    ```java
    zim.sendMessage(textMessage, "myUserID", ZIMConversationType.PEER, sentConfig, new ZIMMessageSentCallback() {
         @Override
         public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {

         }

         @Override
         public void onMessageAttached(ZIMMessage message) {

         }
    });
    ```

4. 接收方如果处于离线状态，将会在上线后，接收到发送方之前发送的离线消息。

#### 场景 2：发送群组消息时使用离线推送功能

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```java
    ZIMTextMessage textMessage = new ZIMTextMessage();
    ZIMPushConfig pushConfig = new ZIMPushConfig();
    pushConfig.title = "离线推送标题";
    pushConfig.content = "离线推送内容";
    pushConfig.payload = "自定义透传字段，非必填";
    pushConfig.resourcesID = "资源 ID，非必填";
    ```

2. 然后通过 [ZIMMessageSendConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMMessageSendConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```java
    ZIMMessageSendConfig sentConfig = new ZIMMessageSendConfig();
    sentConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [sendMessage](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#send-message)，传入 “sentConfig”，向群组内的所有用户发送消息。

    ```java
    zim.sendMessage(textMessage, "myGroupID", ZIMConversationType.GROUP, sentConfig, new ZIMMessageSentCallback() {
         @Override
         public void onMessageSent(ZIMMessage message, ZIMError errorInfo) {

         }
         
         @Override
         public void onMessageAttached(ZIMMessage message) {

         }
    });
    ```

4. 群组内的用户，如果有人处于离线状态，将会在上线后，接收到发送方之前发送的群组离线消息。

#### 场景 3：发送呼叫邀请时使用离线推送功能

1. 开发者通过 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 对象，设置离线推送标题、内容、以及其他自定义属性。

    ```java
    ZIMPushConfig pushConfig = new ZIMPushConfig();
    pushConfig.title = "离线推送标题";
    pushConfig.content = "离线推送内容";
    pushConfig.payload = "自定义透传字段，非必填";
    pushConfig.resourcesID = "资源 ID，非必填";
    ```

2. 然后通过 [ZIMCallInviteConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMCallInviteConfig) 对象的 `pushConfig` 参数，配置离线消息的相关配置等。

    ```java
    ZIMCallInviteConfig callInviteConfig = new ZIMCallInviteConfig();
    callInviteConfig.pushConfig = pushConfig;
    ```

3. 发送方调用 [callInvite](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIM#call-invite)，传入 “ callInviteConfig”，发起呼叫邀请。

    ```java
    ArrayList<String> invitees = new ArrayList<>();
    invitees.add("userA");
    invitees.add("userB");
    zim.callInvite(invitees, callInviteConfig, new ZIMCallInvitationSentCallback() {
        @Override
        public void onCallInvitationSent(String callID, ZIMCallInvitationSentInfo info, ZIMError errorInfo) {
        }
    });
    ```

4. 被邀请的用户若处于离线状态，将会收到对应的离线推送，上线后，若呼叫邀请还未结束，将会收到 [onCallInvitationReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZIMEventHandler#on-call-invitation-received) 的回调。

## 在线调试

集成 ZPNs SDK 和获取 Push ID 后，您可以在 [ZEGO 控制台](https://console.zego.im/) 在线调试 ZIM 离线推送功能，详情请参考控制台的 [ZIM 离线推送调试](https://doc-zh.zego.im/article/17949)。
