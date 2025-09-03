# 3.0.0 及以上版本升级指南

- - -

<Warning title="注意">
- 如果您当前的 SDK 低于 3.0.0 版本，需要升级到任一 3.0.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/13202) 中两个版本区间的变更说明，检查您的业务相关接口。
</Warning>

本文将介绍 Express Electron SDK 版本升级至 3.0.0 及以上版本时的说明和注意事项。

## 废弃说明

1. 废弃 [ZegoScenario](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~enum~ZegoScenario) 场景枚举中的 `General`、`Communication`、`Live` 三种场景，请参考 [场景化音视频配置](https://doc-zh.zego.im/article/16632) 文档进行适配。
 

## 删除说明

删除下列在先前版本已废弃的接口。

方法名 | 描述 |
--- | --- |
setDebugVerbose | 设置调试详细信息开关以及语言。此函数在 2.3.0 版本废弃，请使用 [enableDebugAssistant](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#enable-debug-assistant) 来实现原来的功能。
loginMultiRoom | 登录多房间。此方法在版本 2.9.0 以后已废弃，若需实现多房间功能，请先在引擎初始化之前调用 [setRoomMode](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-room-mode) 函数设置多房间模式，再使用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 登录多房间，如果调用 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#login-room) 函数登录多房间，请确保传入相同的用户信息。
setPlayStreamVideoLayer | 设置选取拉流视频图层。此函数在 2.3.0 版本以后已废弃, 请使用 [setPlayStreamVideoType](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_electron~class~ZegoExpressEngine#set-play-stream-video-type) 代替。
onDeviceError | 设备异常通知。此函数在 2.15.0 版本及以上已废弃，请使用 [onLocalDeviceExceptionOccurred](https://doc-zh.zego.im/article/21399#onLocalDeviceExceptionOccurred) 代替。

## 变更示例代码

您可以参考以下示例代码进行接口变更。

### setDebugVerbose

<Tabs>
<Tab title="3.0.0 版本前">

```js
zgEngine.setDebugVerbose(true, zgDefines.ZegoLanguage.Chinese);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```js
zgEngine.enableDebugAssistant(true)
```
</Tab>
</Tabs>

### loginMultiRoom

<Tabs>
<Tab title="3.0.0 版本前">

```js
var UserInfo = {userID: 'zego', userName: 'zego'}
zgEngine.loginRoom(roomID1, UserInfo, config = {});
zgEngine.loginMultiRoom(roomID2, config = {});
```
</Tab>
<Tab title="3.0.0 版本及以上">

```js
zgEngine.setRoomMode(zgDefines.ZegoRoomMode.MultiRoom)
var UserInfo = {userID: 'zego', userName: 'zego'}
zgEngine.loginRoom(roomID1, UserInfo, config = {});
zgEngine.loginRoom(roomID2, UserInfo, config = {});
```
</Tab>
</Tabs>


### setPlayStreamVideoLayer

<Tabs>
<Tab title="3.0.0 版本前">

```js
zgEngine.setPlayStreamVideoLayer(streamID, zgDefines.ZegoPlayerVideoLayer.Base);
```
</Tab>
<Tab title="3.0.0 版本及以上">

```js
zgEngine.setPlayStreamVideoType(streamID, zgDefines.ZegoVideoStreamType.Small);
```
</Tab>
</Tabs>

### onDeviceError

<Tabs>
<Tab title="3.0.0 版本前">

```js
zgEngine.on('onDeviceError', res = () =>{
    // handle code
})
```
</Tab>
<Tab title="3.0.0 版本及以上">

```js
zgEngine.on('onLocalDeviceExceptionOccurred', res = () =>{
    // handle code
})
```
</Tab>
</Tabs>

<Content />

