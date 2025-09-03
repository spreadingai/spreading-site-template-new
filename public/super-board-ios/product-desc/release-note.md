# 发布日志

- - -


## 2.5.5 版本

发布日期：2024-06-03

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK 3.14.5。  | - |





## 2.5.2 版本

发布日期：2024-01-15

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK 3.12.2。  | - |




## 2.5.1 版本

发布日期：2023-12-13

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK v3.10.0。  | - |




## 2.5.0 版本

发布日期：2023-07-19

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK v3.7.0。  | - |

**问题修复**

1. **修复已知问题，提高稳定性**





## 2.4.0 版本

发布日期：2023-05-06

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 光标支持自定义文字展示 | 支持在画笔光标上展示自定义的文字信息。| [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-custom-cursor-attribute-type-cursor-attribute-complete)|

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK v3.4.1。  | - |


**废弃删除**

1. 从 2.4.0 版本开始，废弃了对 iOS 11.0 以下版本的支持，iOS Deployment Target（最低支持版本）提升到 iOS 11.0

    具体说明，请参考 [App Store submission requirement starts April 25](https://developer.apple.com/news/?id=jd9wcyov) 及 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。

2. 从 2.4.0 版本开始，iOS SDK 不再支持 32 位 armv7 架构

    具体说明，请参考 [Xcode 14 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Build-System)。




## 2.3.7 版本

发布日期：2023-04-10

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增设置白板和文件最大缩放比例的功能 | <p>新增设置白板和文件最大缩放比例的功能，支持用户通过 [setSuperBoardMaxScaleFactor](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#set-super-board-max-scale-factor-scale-factor) 接口自行调整缩放比例的最大倍数，适应不同的教育场景。</p><p>默认放大比例的最大倍数为 300%，最大可设置为 1000%。</p>| [setSuperBoardMaxScaleFactor](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#set-super-board-max-scale-factor-scale-factor)|





## 2.3.6 版本

发布日期：2023-03-28

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新文件共享 SDK | 更新文件共享 SDK，提高稳定性。 |-|
| 更新音视频 SDK | 音视频 SDK 更新为 Express Video SDK v3.3.0。  | - |

**问题修复**

1. **修复已知问题**




## 2.3.5 版本

发布日期：2022-12-27

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 更新文件共享 SDK | 更新文件共享 SDK，提高稳定性。 |-|
| 音视频 SDK 更新 | 音视频 SDK 更新为 Express Video SDK v3.0.3。  | - |

**问题修复**

1. **修复已知问题**




## 2.3.0 版本

发布日期：2022-05-26

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化鉴权方式 | <ul><li><code>2.3.0 或以上</code>版本的 SDK，在创建引擎（[createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler)）和初始化 ZegoSuperBoard SDK（[initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete)）时，不传 AppSign；并且在登录房间（[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-callback-user-config)）时必须传入 Token，鉴权通过后即可使用实时音视频功能和白板功能。</li><li><code>2.3.0 以下</code>版本的 SDK，在创建引擎（[createEngineWithProfile](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-engine-with-profile-event-handler)）和初始化 ZegoSuperBoard SDK（[initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete)）时，传入 AppSign，鉴权通过后即可使用实时音视频功能和白板功能。</li></ul> | <ul><li>[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#login-room-callback-user-config)</li><li>[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#renew-token-room-id)</li><li>[onRoomTokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoEventHandler#on-room-token-will-expire-room-id)</li><li>[initWithConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#init-with-config-config-complete)</li></ul>|




## 2.2.0 版本

发布日期：2022-01-18

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增自定义光标功能 | 新增画笔自定义光标功能。可以通过调用 [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-custom-cursor-attribute-type-cursor-attribute-complete) 接口设置画笔光标样式。|<ul><li>[enableCustomCursor](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#enable-custom-cursor)</li><li>[enableRemoteCursorVisible](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardManager#enable-remote-cursor-visible)</li><li>[setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~objective-c_ios~class~ZegoSuperBoardSubView#set-custom-cursor-attribute-type-cursor-attribute-complete)</li></ul>|


**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增错误码 | 新增如下错误码：<ul><li>3130011：光标设置偏移值超出光标大小。</li><li>3131018：打开文件时弹需要修复文件提示框（文件损坏）。</li><li>3131019：EOF 错误（文件内容不完整）。</li></ul>|-|




## 2.1.5 版本

发布日期：2021-11-16

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃测试环境 | 统一环境概念，对外不再区分测试环境/正式环境，详见 [测试环境废弃说明](https://doc-zh.zego.im/article/12997)。|-|




## 2.1.1 版本

发布日期：2021-10-27

**问题修复**

修复了特定场景下 SDK 会崩溃的问题。




## 2.1.0 版本

发布日期：2021-10-15

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增备用请求域名 | 针对请求域名网络异常情况，自动切换备用请求域名，且重试次数增加至6次。 |-|
|优化笔锋效果|优化开启笔锋时，在白板上绘制的轨迹过短时会缺失的问题。|-|
|优化多端图元显示位置|优化多端在共享超大文件白板时，图元显示位置会偏移的问题。|-|
|优化图片图元内存占用|优化图片图元过多的情境下内存占用过大的问题。|-|
| 新增错误码 | 新增两个文件转码失败的错误码：<ul><li>3121010：源文件中存在安全隐患，无法正常打开。</li><li>3121011：转码结束后存在图片、音视频文件未正常导出。</li></ul> |-|




## 2.0.0 版本

发布日期：2021-09-02

**新增功能**

首次发布。超级白板包括白板涂鸦、实时轨迹同步、文档共享、文件转码、白板录制与回放、白板与实时音视频同步等多种能力。
