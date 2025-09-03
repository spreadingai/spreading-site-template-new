# 跑通示例源码
## 示例源码运行指引

### 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：
1. 安装 [Node.js](https://nodejs.org/en/)，推荐使用其官网首页展示的长期支持版。

2. 安装浏览器，兼容性如下表所示：

  |浏览器|Windows|Mac| Android |iOS |
| --- | --- | --- | --- | --- |
| Chrome 58 或以上| ✔️ | ✔️ | ✔️ | ✖️|
| FireFox 56 或以上 | ✔️ | ✔️| ✔️  | ✖️ |
| Safari 11 或以上 |  -  |✔️|  -  | ✔️ |
| Opera 45 或以上 | ✔️ |✔️| 部分支持 |  ✖️ |
| QQ 浏览器最新版 | ✔️ | ✔️ | 部分支持 |  ✖️ |
| 360 安全浏览器极速模式|✔️  | ✔️ | ✖️ |  ✖️ |
| 微信浏览器|-| - |✔️| <ul><li>iOS 14.3 或以上版本，并且微信版本为 6.5 或以上时，支持推拉流</li><li>iOS 14.3 以下版本仅支持拉流</li></ul> |
| WebView| -| -| ✔️| 仅支持拉流 |

<Warning title="注意">


只支持 **SSL** 的 Web 服务器（**https**），**localhost**，**127.0.0.1** 等同于 **https**。

</Warning>



### 前提条件

已到 [ZEGO 控制台](https://console-express.zego.im/account/login) 创建项目，申请有效的 AppID 和 AppSign，以及获取到接入服务器地址 Server，详情请参考 [控制台 - 项目管理](/console-old/project-management)。


### 注意事项

- 示例源码中的 SDK 为 beta 版本，请勿将其用于正式环境。
- 即构当前只提供了用于测试环境获取 token 的接口，正式环境下开发者需要自行实现 token 的获取逻辑。登录房间所需 token 的获取请参考 [登录房间鉴权](/real-time-video-web/communication/using-token-authentication)。

### 获取示例源码

<CardGroup cols={2}>
<Card title="示例源码" href="https://github.com/zegodev/zego-express-webrtc-sample">
GitHub 下载

该示例源码展示了如何使用 API 来实现音视频业务
</Card>
<Card title="示例源码"  href="https://gitee.com/zegodev/zego-express-webrtc-sample">
码云下载

该示例源码展示了如何使用 API 来实现音视频业务
</Card>
</CardGroup>

<Card title="功能体验" href="https://zegodev.github.io/zego-express-webrtc-sample/">
GitHub 地址
</Card>
### 运行示例源码

1. 在 Terminal 中切换到项目所在目录下，执行 `npm i` 命令安装依赖。

2. 下载的示例源码中缺少 SDK 初始化所需的 appId 和 server 地址，需要将 “./src/common.js” 文件下的 appId 和 server 分别修改为 [前提条件](#前提条件) 中获取到的 AppID 和 Server，否则示例源码无法正常运行。
   <Frame width="auto" height="auto" >
     <img src="http://zego-public.oss-cn-shanghai.aliyuncs.com/sdk-doc/codeSample.png"/>
   </Frame> 

3.  在 Terminal 中执行 `npm run dev` 命令运行示例源码，运行成功后在浏览器中访问本地服务器（https://***)，示例如下：

​    &emsp;Project is running at https://192.168.6.184:9090/

<Note title="说明">

在 Terminal 中执行 `Control+C` 命令停止 server。

</Note>




### 体验实时音视频功能

在真机中运行项目，运行成功后，可以听到本端音频，看到本端视频画面。

通过 [Web 端调试示例 ](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)（只支持在测试环境下使用），输入相同的 AppID 和 roomID，加入同一房间与真机设备互通。当成功开始音视频通话时，可以同时听到本端和远端音频，看到本端和远端视频画面。

<Note title="说明">

纯音频场景下只能听到音频，看不到视频画面。

</Note>


