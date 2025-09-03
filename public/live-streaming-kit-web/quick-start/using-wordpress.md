- Windows 或 macOS 开发电脑已经连接到 Internet。
- 满足 ZEGO Express Web SDK 兼容性的浏览器（具体请参考 [浏览器兼容性和已知问题](/real-time-video-web/introduction/browser-restrictions)），推荐使用最新版本的 Google Chrome 浏览器。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。
- 联系 ZEGO 技术支持，开通 UIKit 相关服务。

```js
declare interface ZegoCloudRoomConfig {
  // 1 UI控件
  // 1.1 全局
  container?: HTMLElement | undefined | null; // 组件容器。
  maxUsers?: number; // 通话参与人数范围为 [2-20]。默认值为无限制。
  scenario?: {
    mode?: ScenarioModel; // 场景选择。
    config?: ScenarioConfig[ScenarioModel]; // 相应场景的具体配置。
  };
  console?: ConsoleLevel; // 用于问题定位，不是常规设置。设置此项可以决定要打印的日志的严重程度。
  screenSharingConfig?: {
    resolution?: ScreenSharingResolution;
    width?: number;
    height?: number;
    frameRate?: number;
    maxBitRate?: number;
    onError?: (errorCode: number) => string | undefined // 屏幕共享失败回调，若需要自定义提示文本可根据错误码返回对应字符串，若需要自定义 UI 则返回空字符串。
  }; // 屏幕共享设置，分辨率设置
  language?: ZegoUIKitLanguage; // 设置 UIKit 语言

  // 1.2 加入前页面
  showPreJoinView?: boolean; // 是否显示加入前页面。默认显示。
  preJoinViewConfig?: {
    title?: string; // 加入前页面的标题。默认为“进入房间”。
  };
  turnOnMicrophoneWhenJoining?: boolean; // 加入通话时是否开启麦克风。默认开启。
  turnOnCameraWhenJoining?: boolean; // 加入通话时是否开启摄像头。默认开启。
  useFrontFacingCamera?: boolean; // 加入房间时是否使用前置摄像头。默认使用前置摄像头。
  videoResolutionDefault?: VideoResolution; // 默认视频分辨率。
  enableStereo?: boolean; // 是否开启立体声模式。默认关闭。

  // 1.3 房间页面
  // 您可以使用此按钮关闭其他参与者的摄像头。
  showTurnOffRemoteCameraButton?: boolean; // 是否显示关闭远程摄像头的按钮。默认不显示。
  // 您可以使用此按钮静音其他参与者的麦克风。
  showTurnOffRemoteMicrophoneButton?: boolean; // 是否显示关闭远程麦克风的按钮。默认不显示。
  showMyCameraToggleButton?: boolean; // 是否显示切换我的摄像头的按钮。默认显示。
  showMyMicrophoneToggleButton?: boolean; // 是否显示切换我的麦克风的按钮。默认显示。
  showAudioVideoSettingsButton?: boolean; // 是否显示音视频设置的按钮。默认显示。
  showTextChat?: boolean; // 是否显示右侧的文本聊天。默认显示。
  showUserList?: boolean; // 是否显示参与者列表。默认显示。
  showRemoveUserButton?: boolean; // 是否显示移除参与者的按钮。默认不显示。
  lowerLeftNotification?: {
    showUserJoinAndLeave?: boolean; // 是否在左下角显示参与者加入和离开的通知。默认显示。
    showTextChat?: boolean; // 是否在左下角显示最新的消息。默认显示。
  };
  branding?: {
    logoURL?: string; // 品牌LOGO的URL。
  };
  layout?: "Sidebar" | "Grid" | "Auto"; // 布局模式。默认使用自动模式。
  showLayoutButton?: boolean; // 是否显示切换布局的按钮。默认显示。
  showNonVideoUser?: boolean; // 是否显示无视频的参与者。默认显示。
  showOnlyAudioUser?: boolean; // 是否显示仅音频参与者。默认显示。
  sharedLinks?: { 
    name?: string; 
    url?: string }[]; // 生成的共享链接的描述。
  showScreenSharingButton?: boolean; // 是否显示屏幕共享按钮。默认显示。
  showPinButton?: boolean; // 是否显示固定按钮。默认显示。
  whiteboardConfig?: {
    showAddImageButton?: boolean; // 默认为 false。要使用此功能，请激活文件共享功能，然后导入插件。否则，将出现此提示：“添加图像失败，不支持此功能。”
    showCreateAndCloseButton?: boolean; // 是否显示用于创建/关闭白板的按钮。默认显示。
  };
  showRoomTimer?: boolean; // 是否显示计时器。默认不显示。
  showRoomDetailsButton?: boolean; // 是否显示查看房间详情的按钮。默认显示。
  showInviteToCohostButton?: boolean; // 是否显示邀请观众连麦的按钮。
  showRemoveCohostButton?: boolean; // 是否显示下麦连麦观众的按钮。
  showRequestToCohostButton?: boolean; // 是否显示请求连麦的按钮。
  rightPanelExpandedType?: RightPanelExpandedType; // 控制右侧面板显示的信息类型，默认显示“无”。
  autoHideFooter?: boolean; // 是否自动隐藏底部工具栏，默认自动隐藏。仅适用于移动浏览器。
  enableUserSearch?: boolean; // 是否启用用户搜索功能，默认为false。
  showMoreButton?: boolean; // 是否显示更多按钮，默认true
  showUserName?: boolean; // 是否显示用户名称，默认true
  hideUsersById?: string[]; // 隐藏指定用户id对应的画面
  videoViewConfig?: {
    userID?: string; // 用户ID
    showAvatarWhenCameraOff?: boolean; // 摄像头关闭时是否显示用户头像，默认true
  }[];
  backgroundUrl?: string; // 背景图
  liveNotStartedTextForAudience?: string; // 自定义观众端直播开始前展示的文本
  startLiveButtonText?: string; // 自定义开始直播按钮文本
  // 通话中邀请用户时，邀请用户窗口将出现在邀请方，如果您想隐藏此视图，请将其设置为false。默认展示。
  // 您可以在此视图中取消对此用户的邀请。
  showWaitingCallAcceptAudioVideoView?: boolean;
  // 通话中呼叫邀请列表配置
  callingInvitationListConfig?: {
    waitingSelectUsers: ZegoUser[]; // 等待选择的成员列表
    defaultChecked?: boolean; // 是否默认选中， 默认true
  };

  // 1.4 离开房间页面
  showLeavingView?: boolean; // 是否显示离开房间页面。默认显示。
  showLeaveRoomConfirmDialog?: boolean; // 离开房间时是否显示确认弹窗，默认为true
  leaveRoomDialogConfig?: {
    titleText?: string, // 自定义弹窗标题
    descriptionText?: string, // 自定义弹窗描述
  }

  // 2 相关事件回调
  onJoinRoom?: () => void; // 加入房间时触发此回调函数。
  onLeaveRoom?: () => void; // 离开房间时触发此回调函数。
  onUserJoin?: (users: ZegoUser[]) => void; // 房间内有参与者加入时触发此回调函数。
  onUserLeave?: (users: ZegoUser[]) => void; // 房间内有参与者离开时触发此回调函数。
  onUserAvatarSetter?: (user: ZegoUser[]) => void; // 设置用户头像的回调函数。
  onLiveStart?: (user: ZegoUser) => void; // 直播开始时的回调函数。
  onLiveEnd?: (user: ZegoUser) => void; // 直播结束时的回调函数。
  onYouRemovedFromRoom?: () => void; // 被移出房间时的回调函数。
  onInRoomMessageReceived?: (messageInfo: InRoomMessageInfo) => void; // 收到房间内聊天消息时的回调函数。
  onInRoomCustomCommandReceived?: (command: ZegoSignalingInRoomCommandMessage[]) => void;
  onReturnToHomeScreenClicked?: () => void; // 点击“返回主屏幕”按钮时触发此回调函数。设置此回调函数后，点击按钮将不会导航到主屏幕；而是您可以在此处添加自己的页面导航逻辑。
}

// 这是一个隐藏加入前页面的示例：
zp.joinRoom({
  container: document.querySelector("#root"),
  showPreJoinView: false
});
```













# 使用 WordPress

:::if{props.kitType=undefined}
本文档将介绍如何在 WordPress 上集成音视频通话 UIKit。
:::
:::if{props.kitType="LiveStreaming"}
本文档将介绍如何在 WordPress 上集成互动直播 UIKit。
:::

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Prebuilt_Web/wordpress_call_effect.png" />
</Frame>

## 准备环境

:::if{props.kitType=undefined}
在开始集成音视频通话 UIKit 前，请确保开发环境满足以下要求：
:::
:::if{props.kitType="LiveStreaming"}
在开始集成互动直播 UIKit 前，请确保开发环境满足以下要求：
:::

<WebEnvRequirement/>

## 前提条件

<CreateAccountAndServices/>

## 实现步骤

### 1 添加一个新页面

登录 WordPress 控制面板，在侧边栏点击 **Add New** 创建一个新页面。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Prebuilt_Web/wodpress_dashboard.png" />
</Frame>

### 2 添加自定义 HTML

创建新页面后，点击 **+** 按钮，然后点击 **Custom HTML** 添加自定义 HTML。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CallKit/wordpress_add_html_new.png" /></Frame>

### 3 在 HTML 块中添加互动直播 UIKit 代码

添加自定义 HTML 后，从下面的代码块中复制代码。

<Note title="说明">
- 为方便测试，以下代码使用 `generateKitTokenForTest` 接口生成 Kit Token。为规避安全风险，在您的 App 上线时，请在您的服务端生成 Token，并在客户端调用 `generateKitTokenForProduction` 接口生成 Kit Token，详情请参考 [使用 Kit Token 鉴权](/live-streaming-kit-web/authentication-and-kit-token)。
- UIKit 默认语言为英文，如需修改为中文，请在 `joinRoom` 时传入 `language` 参数。
</Note>

:::if{props.kitType=undefined}
```html
<script>
function getUrlParams(
  url  = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}
  var script = document.createElement("script");
  script.type = "text/javascript";

  script.addEventListener("load", function (event) {
     // 通过调用方法生成一个Kit Token。
    // @param 1: appID
    // @param 2: serverSecret
    // @param 3: Room ID
    // @param 4: User ID
    // @param 5: Username
    const roomID = getUrlParams().get('roomID') || Math.floor(Math.random() * 10000) + "";
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID =  ;
    const serverSecret = "";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);



    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: document.querySelector("#root"),
        sharedLinks: [{
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        }],
        scenario: {
           mode: ZegoUIKitPrebuilt.GroupCall, //  要实现一对一通话，请将此处的参数修改为[ZegoUIKitPrebuilt.OneONoneCall]。
        },
        // 设置语言为中文
        language: "zh-CN",
    });
  });

  script.src =
    "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
  document.getElementsByTagName("head")[0].appendChild(script);
</script>
```
:::
:::if{props.kitType="LiveStreaming"}
```html
<script>
function getUrlParams(
  url  = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}
  var script = document.createElement("script");
  script.type = "text/javascript";

  script.addEventListener("load", function (event) {
     // 生成 Kit Token。
    // @param 1: appID
    // @param 2: serverSecret
    // @param 3: Room ID
    // @param 4: User ID
    // @param 5: Username
    const roomID = "room01";
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID =  ;
    const serverSecret = "";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
// 您可以根据 URL 参数分配不同的角色。
    let role = getUrlParams(window.location.href)['role'] || 'Host';
    role = role === 'Host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: document.querySelector("#root"),
        scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: {
                role,
            },
        },
        sharedLinks: [{
            name: 'Join as the audience',
            url:
                window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                '?roomID=' +
                roomID +
                '&role=Audience',
        }],
        // 设置语言为中文
        language: "zh-CN",
    });
});

script.src =
  "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
document.getElementsByTagName("head")[0].appendChild(script);
</script>
```
:::


### 4 传入 appID 和 serverSecret

在图中高亮代码传入您从 [ZEGO 控制台](https://console.zego.im) 获取的项目的 AppID 和 ServerSecret，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Prebuilt_Web/wordpress_code_call_appID.png" />
</Frame>

### 5 预览

点击 **Save Draft** 保存草稿。点击 **Preview** 按钮来执行代码。

<Frame width="512" height="auto" caption="">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Prebuilt_Web/wordpress_call_preview.png" />
</Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CallKit/wordpress_call_preview_new.png" /></Frame>

恭喜！您已完成所有步骤！

## 相关指南

<CardGroup cols={2}>
<Card title="认证和 Kit Token" href="/live-streaming-kit-web/authentication-and-kit-token">
  按照步骤生成 Kit Token。
</Card>
</CardGroup>

<Content kitType="LiveStreaming"/>