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
仅限支持 Google 服务的 Android 手机实现此功能。
</Note>

## 前提条件

在实现静默推送之前，请确保：
- 已实现离线推送，详情请参考 [实现离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification)。

## 实现流程

1. 联系 ZEGO 技术支持配置携带 FCM 静默推送策略的 `resourceID`。

2. 在需要发送离线推送的场景（如 [呼叫邀请](/zim-android/guides/call-invitation-signaling)、[离线推送](/zim-android/offline-push-notifications/implement-offline-push-notification) 等），向 [ZIMPushConfig](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~struct~ZIMPushConfig) 的 resourceID 字段填入预先配置好的值，并根据具体业务场景的需要填入 payload 字段。

    ```java
    pushConfig.resourcesID="联系 ZEGO 技术支持配置的resourceID";
    ```

3. 创建一个继承 [ZPNsMessageReceiver](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver) 的类，并声明其为 ZPNs的广播接收器，声明方式可参考 [实现离线推送 - 使用 ZPNs SDK 注册离线推送功能](/zim-android/offline-push-notifications/implement-offline-push-notification#使用-zpns-sdk-注册离线推送功能)。

    您可在其中的 [onThroughMessageReceived](https://doc-zh.zego.im/article/api?doc=zim_API~java_android~class~ZPNsMessageReceiver#on-through-message-received) 方法实现收到静默推送的具体逻辑。

    ```java
    public class MyZPNsReceiver extends ZPNsMessageReceiver {
        // 厂商透传消息回调
        @Override
        protected void onThroughMessageReceived(Context context, ZPNsMessage message) {
            Log.e("MyZPNsReceiver", "onThroughMessageReceived message:" + message.toString());
            // 可通过 message.getExtras() 拿到静默推送的具体内容.
        }
    }
    ```
4.完成上述步骤，即可向别人发送静默推送以及接收来自别人的静默推送。
