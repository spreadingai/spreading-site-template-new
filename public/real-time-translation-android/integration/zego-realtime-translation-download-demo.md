# 跑通示例源码

- - -

本文介绍如何快速跑通示例源码，体验基础的实时传译服务。

<Warning title="注意">
- 本示例源码仅用于演示产品功能， 示例源码对外开放，可供开发者接入时参考。
- 本示例源码未经过严格测试，若开发者计划将该示例源码用于生产环境，请确保发布前自行进行充分测试，避免发生潜在问题可能造成损失。
</Warning>




## 跑通示例源码

### 准备环境

在运行示例源码前，请确保开发环境满足以下要求：

- Android Studio  2021.2.1 或以上版本 (下面简称 AS)。
- Android SDK 29、Android SDK Build-Tools 29.0.0、Android SDK Platform-Tools 29.x.x 或以上版本。
- Android 8.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。
- Android 设备已经连接到 Internet。

### 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已开通相关权限，并获取到实时传译的 License。

    - 谷歌：参考 [控制台 - 云市场 - 实时传译（谷歌）](/console/cloud-market/real-time-translation/google)，按照页面指引，自助开通相关权限。
    - 科大讯飞：联系 ZEGO 商务人员开通服务权限。

### 获取示例源码

<Card title="示例 Demo 源码" href="https://artifact-demo.zego.im/zegorealtimetranslation/Android/SourceCode/ZegoRealtimeTranslationDemo.zip" >
Android 本地下载
</Card>
### 运行示例源码

1. 双击 Android Studio 软件。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/GoClass/Android/image-20201203142600097.png" /></Frame>

2. 在打开的 Android Studio 软件中，单击 “Open”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/metaworld/as_open_project.png" /></Frame>

3. 选择下载的示例 Demo ，并单击 “Open”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtt_open_proj.png" /></Frame>

4. 修改 “app/src/main/java/im/zego/realtimetranslationdemo” 路径下的 “KeyCenter.java” 文件，填写 SDK 初始化所需的 AppID、AppSign 和实时传译的 License。

<Note title="说明">


    - AppID 和 AppSign 请使用本文“前提条件”已获取的 AppID 和 AppSign 正确填写。
    - License 请使用本文“前提条件”已获取的 License 正确填写。
</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtt_keycenter.png" /></Frame>

5. 选择一台已连接到 Internet 的 Android 真机设备（推荐）或模拟器，当该设备成功开启开发者模式和 USB 调试功能后，可以看到 Android Studio 由下图：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_run_1.png" /></Frame>

    变为下图：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_run2.png" /></Frame>

    说明 Android Studio 软件已成功连接到 Android 设备，可以将示例 Demo 运行到该设备上了。

6. 单击 Android Studio 软件上的 “build and run” 按钮，编译并运行示例源码。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_run3.png" /></Frame>

## 示例源码功能简介

示例源码运行成功后，即可看到 UI 界面，示例源码的 UI 主要分为以下三部分：

- 登录界面
- 实时传译界面
- 文本翻译界面

1. 开发者在使用示例源码或者体验 App 时，首先进入登录界面，用户需要在此界面选择需要进入的房间 ID，单击选择的房间。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_room_list.png" /></Frame>

2. 在弹窗中，选择角色和用户名，角色可以选择主播和观众，用户昵称可以自己修改也可以使用默认值，设置完成后，单击“进入房间”。

<Note title="说明">


    角色说明：
    - 主播：可以推流，且可以开启语音识别推送出去，一个房间最多能进两个主播。
    - 观众：不能推流，能看到主播的视频以及主播开启语音识别后的识别结果和翻译结果。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_role_select.png" /></Frame>

3. 进入房间后，即可进入实时传译界面。如果角色选择的是主播，进入实时传译界面后，可以根据需要选择语音识别服务提供商和翻译服务提供商，还可以设置识别语音，以及要实时传译的目标语言。

<Note title="说明">


    - 语音识别文本翻译开关：控制是否翻译语言识别的文本到目标语言，默认开启。
    - 文本翻译中间结果开关：控制语音识别的中间结果是否也要翻译，默认中间结果也会进行翻译，但会导致翻译的请求量增加，且计费也会随之增加。示例源码中默认会开启，但不建议开启。

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_main_scene.png" /></Frame>

4. 参数设置完成后，单击"开启实时语音识别", 即可启动实时传译，识别结果和翻译结果会在两个框中显示出来。
5. 切换到文本翻译的界面，可以在此界面进行纯文本的翻译，选择好翻译提供商，源语言和目标语言，单击"开始文本翻译"即可。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/realtimetranslation/rtvt_trans.png" /></Frame>
