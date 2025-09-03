# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：


- 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)。
- 使用微信小程序基础库 1.7.0 或以上版本，否则不支持音视频播放、录制组件。
- 通过微信小程序实时音视频播放相关类目审核（获取到对应的小程序 AppID），开通 [live-player](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)、[live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 组件权限，若不符合相关类目，请参考 [需要小程序直播插件进行直播](/real-time-video-miniprogram/live-streaming/live-streaming#需要小程序直播插件进行直播) 处理。

<Warning title="注意">

该 SDK 不能直接在 QQ 小程序上集成，若需要使用 QQ 小程序 SDK ，请联系 ZEGO 技术支持获取。

</Warning>


## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
请参考 [微信开放文档 - 开始](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html) 创建一个微信小程序。
</Accordion>


### 导入 SDK

开发者可通过以下任意一种方式集成 SDK。

<h4>方式 1：从官网下载 SDK，手动集成</h4>

1. 请参考 [下载](/real-time-video-miniprogram/client-sdk/download-sdk) 文档，下载最新版本的 `微信小程序` SDK。

2. 解压 SDK 压缩包，将 “ZegoExpressWebRTC-x.x.x.js” 文件拷贝到项目中。

3. 在使用到的插件的 JS 文件的最前方导入 SDK。

```javascript
import { ZegoExpressEngine } from '../libs/ZegoExpressMiniProgram-x.x.x';
```



<h4>方式 2： 使用 npm 获取 SDK</h4>

1. 执行 `npm i zego-express-engine-miniprogram` 命令安装依赖。

<Note title="说明">

在微信开发者工具菜单栏，选择“工具 > 构建 npm”，勾选“使用 npm 模块”选项。关于小程序使用 npm 相关内容，请参考 [微信开放文档 - npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 。

</Note>

2. 在使用到的插件的 JS 文件的最前方导入 SDK。

```javascript
import { ZegoExpressEngine } from "zego-express-engine-miniprogram"; // 以 npm 的方式引用
```
