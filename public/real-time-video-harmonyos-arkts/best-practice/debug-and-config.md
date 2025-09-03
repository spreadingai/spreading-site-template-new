# 调试与配置

- - -

## 功能简介

开发者在集成 SDK 时会遇到一些错误，SDK 会输出相关错误日志，开发者可以根据需要，配置日志输出路径和单个日志文件大小。

除此之外，SDK 支持调用接口查看当前版本。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/19408) 获取源码。

相关源码请查看 “/pages/Topics/QuickStart” 目录下的文件 QuickStart.ets。

## 前提条件

在使用日志相关功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/19409) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/19410)。


## 使用步骤

### 设置日志属性

在创建引擎前，可通过调用 [setLogConfig](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#setlogconfig) 设置日志属性。

具体路径通过在 ability 中获取，单个日志文件大小上限为 5 MB 为例：

```ts
// 获取日志路径（ability.ets）
let logPath = applicationContext.filesDir.toString();

// 设置日志路径（QuickStart.ets）
let logConfig = new ZegoLogConfig();
// 5MB
logConfig.logSize = 5 *1024 * 1024;
logConfig.logPath = logPath;
ZegoExpressEngine.setLogConfig(logConfig)
```

### 创建引擎

定义 SDK 引擎对象，调用 [createEngine](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 接口，将申请到的 AppID 和 AppSign 传入参数 “appID” 和 “appSign”，创建引擎单例对象。

```ts
let profile = new ZegoEngineProfile(KeyCenter.appID, KeyCenter.appSign, ZegoScenario.General, Context);
ZegoExpressEngine.createEngine(profile).then((engineInst) => {
    this.ZegoExpressInstance = engineInst;
});
```

### （可选）开启调试助手

建议在开发调试阶段调用 [enableDebugAssistant](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#enabledebugassistant) 接口开启 SDK 的调试助手功能，当后续调用其他 SDK 的接口时，既能输出日志到控制台，同时在接口调用出错时还会弹窗提醒，方便开发者第一时间发现问题并及时修正。

<Warning title="注意">


当开发完成，即将上线 App 前，请务必关闭此功能，以避免在线上环境发生潜藏错误时弹出 UI 弹窗。

</Warning>



```ts
this.ZegoExpressInstance.enableDebugAssistant(true);
```

### 获取 SDK 版本号

调用 [getSDKVersion](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/ets_ohos/classes/_zegoexpressengine_.zegoexpressengine.html#getsdkversion) 可获得 SDK 版本号。开发者可将 SDK 版本号信息作为 App 所使用的 Engine 的版本信息，以便统计线上各版本 App 对应的各版本 SDK。

<Note title="说明">


SDK 在运行过程中，当开发者发现与预期情况不符时，可将问题与相关日志提交给 ZEGO 技术支持定位，ZEGO 技术支持可能需要 Engine 的版本的信息来辅助定位问题。


</Note>



```ts
let sdKVersion = ZegoExpressEngine.getSDKVersion();
```
