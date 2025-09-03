# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：   

- 支持 Electron 7.0.0 版本到 23.0.0 版本。
- 支持 Windows 7 及以上操作系统。
- 支持 macOS 10.13 及以上操作系统。
- 支持 x86_64、aarch64、armhf 架构的 Linux 操作系统，如需使用 Linux 平台，请联系 ZEGO 技术支持。
- 麦克风、摄像头等支持音视频的设备。
- 设备已经连接到 Internet。
- 安装 [Node.js](https://nodejs.org/en/), 推荐使用其官网首页展示的长期支持版。  

## 集成 SDK

### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
请参考 [Electron 文档 - 快速启动指南](https://github.com/electron/electron-quick-start) 创建一个 Electron 项目。
</Accordion> 

### 安装 SDK

在项目中使用 npm 命令 `npm install zego-express-engine-electron`，安装 SDK 包。

<Note title="说明">


- 请参考 [下载 SDK 包](https://doc-zh.zego.im/article/21123) 查看最新版。
- 执行 `npm install` 安装 SDK 时，如果 npm 官网镜像下载缓慢，可将其切换至国内镜像。

</Note>

   

 
### 导入 SDK

在项目脚本文件中导入 SDK 并使用。  

```js
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');
console.log(zgEngine.getVersion())
```
如果控制台中可以打印出正确的 SDK 版本号，即为导入成功。


## 常见问题

1. **macOS Monterey(12.2.1) 及以上版本运行 electron 应用导致摄像头、麦克风等设备不能使用或者 crash？**

如何解决此问题，详情请参考 [FAQ](http://doc-zh.zego.im/faq/macOS_Monterey_v12.2.1_access_solution?product=ExpressVideo&platform=electron)。

<Content />
