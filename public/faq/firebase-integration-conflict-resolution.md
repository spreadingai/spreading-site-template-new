<Title>如何解决同时集成 Firebase Cloud Message 时的冲突？</Title>



---

当 Call Kit 从 FCM 接收到消息时，如果该消息不是来自 ZEGO SDK，它会发送一个广播到当前应用程序，动作为 `com.zegocloud.zegouikit.call.fcm`，示例代码如下：

```java
Intent intent = new Intent("com.zegocloud.zegouikit.call.fcm");
intent.putExtra("remoteMessage", remoteMessage);
context.sendBroadcast(intent);
```

因此，如果您已经集成了 Firebase Messaging，只需按照以下步骤完成迁移：

1. 在您的应用程序中创建并静态注册一个 BroadcastReceiver：
   - 创建一个 BroadcastReceiver，例如 `YourCustomBroadcastReceiver.java`。
   - 将其注册到应用程序的 `Manifest.xml` 文件的 `application` 节点，并将动作设置为 `"com.zegocloud.zegouikit.call.fcm"`，示例如下：
   ```xml
   <receiver
        android:name="com.zegocloud.uikit.demo.calloffline.YourCustomBroadcastReceiver"
        android:enabled="true"
        android:exported="false">
        <intent-filter>
          <action android:name="com.zegocloud.zegouikit.call.fcm"/>
        </intent-filter>
    </receiver>
   ```
2. 从 `Manifest.xml` 中删除原始的 FCM Service，示例如下：
    ```xml
    <service
        android:name=".java.MyFirebaseMessagingService"
        android:exported="false">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
    ```
   请删除它以避免与 Zego SDK 冲突。

3. 监听和处理相关事件：
   您需要将逻辑从 `MyFirebaseMessagingService` 迁移到 `YourCustomBroadcastReceiver`，示例如下。

   原始代码：
   ```java
   public class YourFirebaseMsgService extends FirebaseMessagingService {
        @Override
        public void onMessageReceived(RemoteMessage remoteMessage) {
            // 您的自定义逻辑
        }
    }
   ```
   请迁移如下，并删除 YourFirebaseMsgService.java：

   ```java
   public class YourCustomBroadcastReceiver extends BroadcastReceiver {

        private static final String TAG = "CustomReceiver";

        public void onReceive(Context context, Intent intent) {
            com.google.firebase.messaging.RemoteMessage remoteMessage = intent.getParcelableExtra("remoteMessage");
            // 您的自定义逻辑
            Log.d(TAG, "onReceive.remoteMessage.getData: " + remoteMessage.getData());
        }
    }
   ```
按照这些步骤，您应该能够接收和处理您自己的 FCM 消息。
