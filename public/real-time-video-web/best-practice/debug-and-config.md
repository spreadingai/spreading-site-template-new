# 调试与配置

---

## 功能简介

开发者在集成 SDK 时会遇到一些错误，SDK 会输出相关错误日志，开发者可以根据需要配置日志输出等级，并设置错误日志弹窗。

SDK 支持调用接口查看当前版本。

## 示例源码下载

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/DebugAndConfig/LogAndVersionAndDebug” 目录下的文件。

## 前提条件

在使用日志相关功能前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

### 创建引擎

创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 引擎实例，将申请到的 AppID 传入参数 “appID”，将接入服务器地址传入参数 “server”。

<Note title="说明">
- “server” 为接入服务器地址，获取的方式请参考
[控制台 - 项目信息](/console/project-info#配置信息) 。
- 3.6.0 版本及以上 SDK，server 可以改成空字符、null、undefined 或者随意字符，但不能不填。
</Note>

```javascript
// 初始化实例
const zg = new ZegoExpressEngine(appID, server);
```

### 设置日志等级

调用 [setLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-log-config) 接口，通过 [ZegoLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoLogConfig) 对象中的 “logLevel” 属性设置本地控制台打印的日志级别。

<table>

<tbody><tr>
<th>属性</th>
<th>日志级别</th>
</tr>
<tr>
<td>
logLevel
</td>
<td>
以下级别从上至下依次递增，等级越高打印日志越少：
<ul>
<li>debug </li>
<li>info</li>
<li>warn</li>
<li>error</li>
<li>report</li>
<li>disable</li>
</ul></td>
</tr>
</tbody></table>


```javascript
const config = {
	logLevel: 'debug',
};
zg.setLogConfig(config);
```

2.2 若想要在初始化引擎前设置日志等级，可通过 [presetLogConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#preset-log-config) 接口设置对象中的 “logLevel” 属性设置本地控制台打印的日志级别。

```javascript
ZegoExpressEngine.presetLogConfig({
    logLevel: 'disable'
)
```

### （可选）开启错误信息弹窗

在初始化之后登录房间之前调用 [setDebugVerbose](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-debug-verbose) 接口设置是否开启错误日志信息弹窗，用于开发环节提示错误。测试环境下默认开启，正式环境下默认关闭，建议保持默认配置。

<Note title="说明">


当日志级别设置为 “report” 和 “disable” 时不会弹窗。

</Note>



```javascript
// 开启错误信息弹窗
zg.setDebugVerbose(false)
```


### 查看 SDK 版本号

调用 [getVersion](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#get-version) 接口可以获取当前正在使用的 SDK 版本号。

```javascript
zg.getVersion()
```


## 相关文档

- [如何设置和获取 SDK 的日志、堆栈信息？](https://doc-zh.zego.im/faq/express_sdkLog)
- [如何处理常见的 Web 浏览器控制台报错？](https://doc-zh.zego.im/faq/web_console_error)
