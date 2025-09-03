# 呼叫邀请配置


## 前提条件


修改呼叫邀请配置前，需已经实现 [呼叫邀请](/callkit-android/quick-start-(with-call-invitation).mdx) 相关功能。

## 自定义呼叫铃声

### 呼叫邀请铃声

如果您想设置接收或发送呼叫邀请时的呼叫铃声，您可以在 `ZegoUIKitPrebuiltCallService` 中使用 `incomingCallRingtone` 和 `outgoingCallRingtone` 配置。

<Note title="说明">
- 如需设置铃声，请将音频文件放置在目录 `[your_project]/app/src/main/res/raw` 中。   
（如果在 res 目录中没有 raw 文件夹，请创建一个 raw 文件夹。）
- 在代码中指定文件路径时，请删除音频文件的后缀名。   
（例如，如果文件名为 incomingCallRingtone.mp3，请将路径指定为 "incomingCallRingtone"，如下文参考代码所示。）
</Note>

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoUIKit/Android/custom_incoming_ring.png" /></Frame>


以下是参考代码：

<CodeGroup>
```java title="携带邀请的呼叫" {19-20}
public class MainActivity extends AppCompatActivity {
    long appID = YourAppID;
    String appSign = YourAppSign;
    String userID = "userID";
    String userName = "userName";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initCallInviteService();
    }

    public void initCallInviteService() {
        // 在这里修改您的自定义配置。
        ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig 
            = new ZegoUIKitPrebuiltCallInvitationConfig();
            
        callInvitationConfig.incomingCallRingtone = "incomingCallRingtone";
        callInvitationConfig.outgoingCallRingtone = "outgoingCallRingtone";

        ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,
            callInvitationConfig);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ZegoUIKitPrebuiltCallService.logout();
    }
}
```
</CodeGroup>


## 隐藏拒绝按钮

要在收到呼叫邀请界面隐藏拒绝按钮，请将 `showDeclineButton` 设置为 `false`。

<CodeGroup>
```java title="携带邀请的呼叫" {16}
public class MainActivity extends AppCompatActivity {
    long appID = YourAppID;
    String appSign = YourAppSign;
    String userID = "userID";
    String userName = "userName";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initCallInviteService();
    }

    public void initCallInviteService() {
      ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();
      callInvitationConfig.showDeclineButton = false;
      ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);
    }
}
```
</CodeGroup>


## 自定义呼入呼出页面的背景

要自定义呼入呼出页面的背景，请在 `ZegoUIKitPrebuiltCallInvitationConfig` 中使用 `outgoingCallBackground` 和 `incomingCallBackground`。

<Frame width="256" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoUIKit/Android/custom_incoming_bg.png" /></Frame>


<CodeGroup>
```java title="携带邀请的呼叫" {16-17}
public class MainActivity extends AppCompatActivity {
    long appID = YourAppID;
    String appSign = YourAppSign;
    String userID = "userID";
    String userName = "userName";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initCallInviteService();
    }

    public void initCallInviteService() {
      ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();
      callInvitationConfig.outgoingCallBackground = new ColorDrawable(Color.BLUE);
      callInvitationConfig.incomingCallBackground = new ColorDrawable(Color.GREEN);
      ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);
    }
}
```
</CodeGroup>


## 修改用户界面文本

音视频通话 UIKit 支持开发者编辑其内部组件的 UI 文本。如需修改这些文本，请使用 `translationText` 配置。

代码参考如下：

<CodeGroup>
```java title="携带邀请的呼叫" {16-17}
public class MainActivity extends AppCompatActivity {
    long appID = YourAppID;
    String appSign = YourAppSign;
    String userID = "userID";
    String userName = "userName";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initCallInviteService();
    }

    public void initCallInviteService() {
      ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();
      callInvitationConfig.translationText.incomingCallPageDeclineButton = "拒绝";
      callInvitationConfig.translationText.incomingCallPageAcceptButton = "接受";
      ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);
    }
}
```
</CodeGroup>

## 自定义呼叫配置

在使用呼叫邀请功能的时候，如果默认的呼叫配置（`ZegoUIKitPrebuiltCallInvitationConfig`）不能满足您的需求，您可以通过设置 `ZegoUIKitPrebuiltCallConfigProvider` 来自定义 `ZegoUIKitPrebuiltCallConfig` 的配置，代码参考如下：

<CodeGroup>
```java title="携带邀请的呼叫" {18-24}
public class MainActivity extends AppCompatActivity {
    long appID = YourAppID;
    String appSign = YourAppSign;
    String userID = "userID";
    String userName = "userName";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initCallInviteService();
    }

    public void initCallInviteService() {
        ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();
        ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);

        callInvitationConfig.provider = new ZegoUIKitPrebuiltCallConfigProvider() {
            @Override
            public ZegoUIKitPrebuiltCallConfig requireConfig(ZegoCallInvitationData invitationData) {
                ZegoUIKitPrebuiltCallConfig config = ZegoUIKitPrebuiltCallInvitationConfig.generateDefaultConfig(
                        invitationData);
                // 根据你的业务需求修改这里的 config 的配置
            }
        }
    }
}
```
</CodeGroup>

## 设置因发起者离开而自动结束通话

默认情况下，通话在发起者离开后仍将继续。如需因发起者退出而自动结束通话，请将 `ZegoUIKitPrebuiltCallInvitationConfig.endCallWhenInitiatorLeave` 属性设置为 `true`。

<CodeGroup>
```java title="携带邀请的呼叫" {3}
ZegoUIKitPrebuiltCallInvitationConfig callInvitationConfig = new ZegoUIKitPrebuiltCallInvitationConfig();

callInvitationConfig.endCallWhenInitiatorLeave = true;

ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);
```
</CodeGroup>