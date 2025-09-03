# 跑通示例源码

- - -


本文介绍如何快速跑通示例源码，体验基础的实时传译服务。

<Warning title="注意">

- 本示例源码仅用于演示产品功能，示例源码对外开放，可供开发者接入时参考。
- 本示例源码未经过严格测试，若开发者计划将该示例源码用于生产环境，请确保发布前自行进行充分测试，避免发生潜在问题可能造成损失。

</Warning>



## 跑通示例源码

### 准备环境

在运行示例源码前，请确保开发环境满足以下要求：
- Xcode 14.0 或以上版本。
- iOS 11.0 或以上版本且支持音视频的 iOS 设备（仅支持使用真机）。
- iOS 设备已经连接到 Internet。

### 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已开通相关权限，并获取到实时传译的 License。

    - 谷歌：参考 [控制台 - 云市场 - 实时传译（谷歌）](/console/cloud-market/real-time-translation/google)，按照页面指引，自助开通相关权限。
    - 科大讯飞：联系 ZEGO 商务人员开通服务权限。

### 获取示例源码

<Card title="示例 Demo 源码" href="https://artifact-demo.zego.im/zegorealtimetranslation/iOS/sourceCode/ZegoRealtimeTranslationDemo.zip">
iOS 本地下载
</Card>

### 运行示例源码

1. 打开 `AppStore` ，搜索 `Xcode` 并下载安装。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/appstore-xcode.png" /></Frame>
2. 使用 Xcode 打开 `ZegoVoiceTranslation.xcworkspace`。
    1. 打开 Xcode，选择左上角的 `File > Open...`。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-open-file.png" /></Frame>
    2. 在解压后的示例源码文件夹中选择 `ZegoVoiceTranslation/ZegoVoiceTranslation.xcworkspace`，并单击`Open`。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/2441669192992_workspace.jpg" /></Frame>

3. 登录 Apple ID 账号。
    1. 打开 Xcode，选择左上角的 `Xcode` > `Preference`。
    2. 单击 `Account` 选项卡，单击左下角的 `+` 号，选择添加 Apple ID 后单击 `Continue`。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-account.png" /></Frame>
    3. 输入 Apple ID 和密码进行登录。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/GoClass/xcode-login-apple-id.png" /></Frame>

4. 修改开发者证书和 Bundle Identifier。
    1. 打开 Xcode，单击左侧的 `ZegoVoiceTranslation` 项目。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/xcode_select_project.jpg" /></Frame>
    2. 单击 Signing & Capabilities 选项卡，在 Team 中选择自己的开发者证书。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/sign_capabilities.jpg" /></Frame>

5. 修改 License 文件。在项目的根目录下找到命名为 license 的 txt 文件，将从 ZEGO 商务或者技术人员获取到的 License 内容复制到该文件，覆盖之前的内容。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/replace_license.jpg" /></Frame>

6. 修改 KeyCenter.m 文件，填入 SDK 初始化所需的 AppID 和 AppSign 即可运行示例源码。

<Warning title="注意">


    请使用本文“前提条件”已获取的 AppID 和 AppSign 正确填写否则示例源码无法正常运行。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/appid_sign.jpg" /></Frame>

## 示例源码功能简介

示例源码运行成功后，即可看到 UI 界面，示例源码的 UI 主要分为三个界面：

- 房间列表界面
- 实时传译界面
- 文本翻译界面

1. 开发者在使用示例源码或者体验 App 时，首先进入房间列表界面，用户需要在此界面选择房间登录，单击选择的房间。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/room_list.jpg" /></Frame>

2. 在弹窗中，选择角色和用户名，角色可以选择，主播和观众，用户昵称可以自己修改也可以使用默认值，设置完成后，单击“进入房间”。

<Note title="说明">


    角色说明：
    - 主播：可以推流，且可以开启语音识别推送出去，一个房间最多能进两个主播。
    - 观众：不能推流，能看到主播的视频以及开启语音识别后的识别结果和翻译结果。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/rtvt_role_select.jpg" /></Frame>


3. 进入房间后，即可进入实时传译界面。如果角色选择的是主播，进入实时传译界面后，可以根据需要选择语音识别服务提供商和翻译服务提供商，还可以设置识别语音，以及要实时传译的目标语言。

<Note title="说明">


    - 语音识别文本翻译开关：控制是否翻译语言识别的文本到目标语言，默认开启。
    - 文本翻译中间结果开关：控制语音识别的中间结果是否也要翻译，默认中间结果也会进行翻译，但会导致翻译的请求量增加，且计费也会随之增加。示例源码中默认会开启，但不建议开启。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/rtvt_main_speech_scene.jpg" /></Frame>


4. 参数设置完成后，单击"开启实时语音识别", 即可启动实时传译，识别结果和翻译结果会在两个框中显示出来。
5. 切换到文本翻译的界面，可以在此界面进行纯文本的翻译，根据需要选择翻译提供商，源语言和目标语言，单击"开启文本翻译"即可。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/RealtimeTranslation/rtvt_text_translation_scene.jpg" /></Frame>
