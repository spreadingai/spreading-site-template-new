# 呼叫中邀请

默认情况下，一旦发出通话邀请，就不能再邀请其他用户。但是，Call Kit 支持在通话进行中邀请外部用户加入。

<Steps>
<Step title="启用功能">
如果您想要启用呼叫中邀请功能，请将 `ZegoCallInvitationInCallingConfig.canInvitingInCalling` 属性配置为 `true`。

此外，如果您希望允许通话中的所有用户邀请其他用户，而不仅仅是发起者，您可以将 `ZegoCallInvitationInCallingConfig.onlyInitiatorCanInvite` 属性配置为 `false`。
</Step>
<Step title="添加按钮">
您需要在通话界面添加一个新的按钮，以便呼叫参与者并向外部用户发送邀请。该按钮应调用 [sendInvitation](/callkit-android/api-reference/api#sendinvitation) 方法。

由于默认的呼叫配置 (`ZegoUIKitPrebuiltCallInvitationConfig`) 不支持您更改底部菜单栏，您应通过设置 `ZegoUIKitPrebuiltCallConfigProvider` 属性来添加该按钮，相关文档可参考 [呼叫邀请配置 - 自定义呼叫配置](/callkit-android/calling-config/call-invitation-config#自定义呼叫配置)。
</Step>
</Steps>

<CodeGroup>
```java title="With call invitation" {17-21,23-45}
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

        callInvitationConfig.callingConfig = new ZegoCallInvitationInCallingConfig();
        // 是否启用呼叫中邀请功能。        
        callInvitationConfig.callingConfig.canInvitingInCalling = true;
        // 是否仅有呼叫发起用户可以在呼叫中邀请其他用户。
        callInvitationConfig.callingConfig.onlyInitiatorCanInvite = false;

        callInvitationConfig.provider = new ZegoUIKitPrebuiltCallConfigProvider() {
            @Override
            public ZegoUIKitPrebuiltCallConfig requireConfig(ZegoCallInvitationData invitationData) {
                ZegoUIKitPrebuiltCallConfig config = ZegoUIKitPrebuiltCallInvitationConfig.generateDefaultConfig(
                        invitationData);

                Button button = new Button(context);
                button.setOnClickListener(v -> {
                    // 被邀请用户的 ID 和名称均为 1
                    List<ZegoUIKitUser> uiKitUsers = Collections.singletonList(new ZegoUIKitUser("1", "1"));
                    // 邀请用户加入一个视频通话。
                    ZegoUIKitPrebuiltCallService.sendInvitation(uiKitUsers, ZegoInvitationType.VIDEO_CALL, "", 60, null, null,
                        new PluginCallbackListener() {
                            @Override
                            public void callback(Map<String, Object> result) {
                                Log.d(TAG, "callback() called with: result = [" + result + "]");
                            }
                        });
                });

                config.bottomMenuBarConfig.extendButtons.add(button);
            }
        }

        ZegoUIKitPrebuiltCallService.init(getApplication(), appID, appSign, userID, userName,callInvitationConfig);
    }
}
```
</CodeGroup>

当上述步骤完成后，Call Kit 将在通话页面上显示一个邀请按钮。