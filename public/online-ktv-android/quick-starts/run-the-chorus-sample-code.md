# 合唱示例 Demo 运行指引

- - -

## 准备环境

在运行示例 Demo 前，请确保开发环境满足以下要求：

- Android Studio 2020.3.1 或以上版本。
- Android SDK 30、Android SDK Platform-Tools 30.x.x 或以上版本。
- Android 4.4 或以上版本，且支持音视频的 Android 设备（仅支持真机），并开启“允许调试”选项。
- Android 设备、macOS 开发电脑已经连接到 Internet。

## 前提条件

- 已参考 [下载](/online-ktv-android/downloads)，下载 ZEGO Express SDK（含版权音乐功能）。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 及 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/downloads/KTV_demo/KTVChorusDemo_Android.zip">点击获得完整代码。</Card>

通过以上卡片获取示例源码压缩包后，将其解压获取示例源码文件夹。

## 运行项目

<Steps>
<Step title="添加 SDK">
由于示例 Demo 里没有 ZEGO Express SDK（含版权音乐功能），你需要参考 [集成 SDK](/online-ktv-android/quick-starts/integrate-the-sdk/express-video)，将下载好的 SDK 添加到项目中。SDK 存放路径：KTVChorusDemo_Android -> app->libs。
<Frame width="512" height="auto">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/libs.png" alt="libs.png"/>
</Frame>
</Step>
<Step title="打开项目">
选择 KTVChorusDemo_Android 项目在 IDE 中打开。
<Frame width="512" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/f9945f4885.jpeg" alt="AndroidDemo.jpeg"/>
</Frame>
</Step>
<Step title="设置 appID">
请搜索 ZegoDataCenter 文件，配置 AppID 和 AppSign，将从控制台获取的 AppID 和 AppSign 填到如图所示的位置。
<Frame width="512" height="auto">
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/modify_app_config.png" alt="modify_app_config.png"/>
</Frame>
</Step>
<Step title="运行">
<Note title="说明">
项目包含版权音乐模块的代码，你需要为 AppID 开通版权音乐服务才能正常体验 Demo 功能。
</Note>
<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/android_run.png" alt="android_run.png"/>
</Frame>
</Step>
</Steps>

## 示例 Demo App 点歌播放流程

1. 进入 App 主页后，点击“点歌”按钮，进入“点歌”界面；
2. 选择一首歌曲，点击右侧“点歌”按钮，进行下载；
3. 歌曲下载完成后，"已点列表"更新；
4. 在已点列表中"选择"演唱歌曲；
5. 返回至主页，点击页面左下角“播放”，开始播放歌曲。
