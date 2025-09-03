# 实现静默推送


## 功能简介

静默推送属于特殊的远程通知，主要用于后台运行的 App 和服务器进行数据同步，例如：App 不在活跃时，App 内数据已经过时，服务器会发送静默推送，此时 App 则进行数据更新，用户全程无感知。

<Warning title="注意">
- 静默推送主要用于更新和同步数据，用户对其无感知，因此静默推送一般不设置内容、声音和角标通知。
- 静默推送唤醒后台 App 并执行下载任务时，最多有 30 秒时间执行。
- App 处于前/后台运行时、后台进程被挂起（保留 App 内存资源）时均可触发对应通知回调，App 关闭后不能触发回调。
- 静默推送请求在 APNs 属于低优先级任务，苹果不保证静默推送的到达率。
- 不要利用静默推送对 App 进行保活，APNs 若检测到较高频率的静默推送的发送请求，可能会终止其发送。
</Warning>


<Content />

<Note title="说明">
本文档适用于以下平台：iOS 和 Android（仅限支持 Google 服务的智能设备）。
</Note>

## 前提条件

在实现静默推送之前，请确保：
- 已集成 ZPNs SDK **2.3.1 或以上版本** 并实现离线推送，详情请参考 [实现离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification)。

## 实现流程

### 发送静默推送

1. 联系 ZEGO 技术支持配置携带静默推送策略的 `resourceID`。静默推送策略有 iOS 和 FCM 两种。根据实际需求，您可以选择只携带一种静默推送策略的 `resourceID`。

2. 在需要发送离线推送的场景（如 [呼叫邀请](/zim-flutter/guides/call-invitation-signaling)、[离线推送](/zim-flutter/offline-push-notifications/implement-offline-push-notification) 等），向 [ZIMPushConfig](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMPushConfig-class.html) 的 resourceID 字段填入预先配置好的值，并根据具体业务场景的需要填入 payload 字段。

    ```dart
    pushConfig.resourcesID="联系 ZEGO 技术支持配置的 resourceID";
    pushConfig.payload = "填写需要的附加内容";
    ```

3.完成上述步骤，即可向别人发送静默推送。

### 接收静默推送

#### App 在前台

通过实现 [onThroughMessageReceived](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsEventHandler/onThroughMessageReceived.html) 事件来接收在线静默推送通知。

```dart
ZPNsEventHandler.onThroughMessageReceived = (ZPNsMessage message) {
    // 处理在线静默推送通知
    String payload = message.extras['payload'] as String;
};
```

#### iOS Android App 在后台、或者 Android App 被终止时

1. 实现类似如下代码块所示的一个顶级非匿名函数（例如，不能是要求初始化的 class 方法）。

    ```dart
    // 注意：@pragma('vm:entry-point') 必须放在函数上，以表明它可以在 AOT 模式下直接从本机或 VM 代码解析、分配或调用。
    @pragma('vm:entry-point')
    Future<void> _zpnsMessagingBackgroundHandler(ZPNsMessage message) async{
        // payload 为发送时填写的 payload 字段内容
        String payload = message.extras['payload'] as String;
        // 当 App 在后台被终止时，可在 logcat 查看 print 打印内容
        print(payload);
    }
    ```

2. 在打开 App 时尽快调用 [setBackgroundMessageHandler](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/setBackgroundMessageHandler.html) 方法传入上述函数，以便 Android App 在后台被终止时触发上述方法，接收离线静默推送通知。

    ```dart
    ZPNs.setBackgroundMessageHandler(_zpnsMessagingBackgroundHandler);
    ```

完成上述步骤，即可接收来自他人的静默推送。
