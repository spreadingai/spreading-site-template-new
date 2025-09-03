# 合唱示例 Demo 运行指引

- - -

## 准备环境

在运行示例 Demo 前，请确保开发环境满足以下要求：

- Xcode 15.0 或以上版本。
- iOS 12.0 或以上版本且支持音视频的 iOS 设备。
- iOS 设备已经连接到 Internet。

## 前提条件

- 已参考 [下载](/online-ktv-ios/downloads)，下载 ZEGO Express SDK（含版权音乐功能）。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 及 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。
- 已联系 ZEGO 商务人员为 AppID 开通版权音乐服务。

## 获取示例源码

<Card title="示例源码" href="https://artifact-demo.zego.im/downloads/KTV_demo/KTVChorusDemo_Express_iOS.zip" target="_blank">点击获得完整代码。</Card>

通过以上卡片获取示例源码压缩包后，将其解压获取示例源码文件夹。

## 运行项目

<Steps>
<Step title="添加 SDK">
由于示例 Demo 里没有 Express SDK（含版权音乐功能），你需要参考 [集成 SDK](/online-ktv-ios/quick-starts/integrate-the-sdk/express-video)，将下载好的 SDK 添加到项目中。SDK 存放路径：KTVChorusDemo_iOS -> KTVDemo -> libs。
<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/sdk.png" alt="sdk.png" />
</Frame>
</Step>
<Step title="打开项目">
双击选择项目中 KTVDemo.xcworkspace 文件，打开项目。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/dir.png" alt="dir.png"/>
</Frame>
</Step>
<Step title="设置开发者证书">
打开项目 Signing & Capabilities 配置，设置开发者证书，选择自己的开发者证书即可。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/team.png" alt="team.png"/>
</Frame>
</Step>
<Step title="设置 AppID">
请搜索 ZEGOConfig 文件，配置 AppID 和 AppSign，将从控制台获取的 AppID 和 AppSign 填到如图所示的位置。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/appid.png" alt="appid.png"/>
</Frame>
</Step>
<Step title="运行">
<Note title="说明">
项目包含版权音乐模块的代码，你需要为 AppID 开通版权音乐服务才能正常体验 Demo 功能。
</Note>

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/iOS_run.png" alt="iOS_run.png"/>
</Frame>
</Step>
</Steps>

## 示例 Demo App 点歌播放流程

1. 进入 App 主页后，点击“点歌”按钮，进入“点歌”界面；

2. 选择一首歌曲，点击右侧“点歌”按钮，进行下载；

3. 歌曲下载完成后，"已点列表"更新；

4. 在已点列表中"选择"演唱歌曲；

5. 返回至主页，点击页面左下角“播放”，开始播放歌曲。
