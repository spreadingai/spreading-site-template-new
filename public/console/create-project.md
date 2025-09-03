# 创建项目

- - -

<Warning title="注意">


根据国家互联网用户实名制相关要求，同时为保障您的账号资产安全和归属，在购买或使用 ZEGO 服务前，请先完成实名认证。认证方式和流程请参考 [实名认证](/console/verified/real-name-authentication)。

</Warning>




注册 [ZEGO 控制台](https://console.zego.im) 账号后登录 ，在左侧导航栏单击“项目管理”，点击“创建项目”，按以下场景操作：

## 场景1：首次创建项目

如果是首次创建项目，您可以按照教程快速跑通实时音视频源码。

1. 输入项目名称，选择主营业务地区，完成后点击“创建”进入下一步。

<Warning title="注意">


    主营业务地区会涉及到集群和节点资源分布，影响到访问速度，请谨慎填写。

</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/12.png" /></Frame>

2. 根据您需要接入的终端，下载对应的源码文件。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/2.png" /></Frame>

3. 解压步骤二下载的源码。示例源码中缺少 SDK 初始化所需的 “AppID”、“AppSign” 和 “Token”等配置信息，可以从本界面获取。根据“操作说明”，找到示例源码的对应文件，将相关配置信息填写到对应位置即可。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/07211.png" /></Frame>

<Note title="说明">


    项目需要 **1** 分钟即可创建成功，完成后才能查看配置信息。

</Note>



4. 为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)。
在该页面下，输入相同的 “AppID”、“RoomID”，输入一个不同的 “UserID”，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/4.png" /></Frame>

## 场景2：非首次创建项目

点击“创建项目”，在弹出的“创建项目”窗口中，填写“项目名称”、并按需选择“主营业务地区”。

<Warning title="注意">


- 主营业务地区会涉及到集群和节点资源分布，影响到访问速度，请谨慎填写。
- 单击“确定”后，开始创建项目，预计需要 **1** 分钟即可创建成功。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Consle/13.png" /></Frame>

<Warning title="注意">


最多可创建 20 个项目，若需创建更多项目，请联系 ZEGO 技术支持调整上限额度。

</Warning>


