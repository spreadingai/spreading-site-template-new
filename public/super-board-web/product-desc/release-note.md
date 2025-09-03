# 发布日志
- - -

## 2.20.0 版本

发布日期：2025-01-14

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 销毁白板功能 | 支持调用一次接口销毁多个白板。 | [destroySuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#destroy-super-board-sub-view)|
| 销毁所有白板功能 | 支持调用一次接口销毁所有白板。 | [destroyAllSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#destroy-all-super-board-sub-view)|

**问题修复**

1. 修复了页面尺寸变化时白板重绘导致的内存问题  
2. 修复了销毁白板或反初始化时未释放内存的问题  
3. 修复了拖动滚动条时两端页码显示不一致的问题  
4. 修复了快速拖动滚动条时当前页面未加载的问题  



## 2.19.1 版本

发布日期：2024-12-23

**问题修复**

1. 修复了频繁反初始化和初始化有概率导致无法获取白板列表的问题



## 2.19.0 版本
发布日期：2024-11-18

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 文件预览功能 | 初始化超级白板 SDK 后，用户可以在不进入房间的情况下预览文件。 | [createPreviewFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-preview-file-view)|
| 切换当前预览文件视图 |对当前预览 View 进行切换。|[switchPreview](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#switch-preview)|
| 获取当前预览文件视图 |获取当前的预览文件视图。|[getCurrentPreview](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#get-current-preview)|
| 获取当前所有预览文件视图。|获取当前已创建的所有预览文件|[getPreviewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#get-preview-list)|



## 2.18.0 版本

发布日期：2024-11-05

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化使用手写板进行涂鸦的效果| 优化使用手写板进行涂鸦容易出现断触的场景 | - |

**问题修复**

1. 修复了改变容器大小后激光笔出现偏移的问题



## 2.17.0 版本
发布日期：2024-10-23

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 背景图片新增支持类型 | 背景图片新增了对 SVG 和 GIF 格式的支持，目前支持的背景图片格式有 JPG、JPEG、PNG、SVG 和 GIF。 | [setBackgroundImage](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubView#set-background-image)|



## 2.16.1 版本

发布日期：2024-05-28

**问题修复**

1. 修复了偶现的图元相对位置变化问题
2. 修复了偶现的文本换行不同步问题
3. 修复了 PC 端容器变小到一定值后边界文本被遮盖问题
4. 修复了调用 [addText](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubView#add-text) 接口添加文本无效问题



## 2.16.0 版本

发布日期：2024-03-25

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增按下键盘回调事件 | 当用户在动态 ppt 中切换工具为“点击”后，如果用户点击 ppt 后按下键盘（左右键除外），会触发回调 [superBoardSubViewKeydown](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoEvent#super-board-sub-view-keydown)  | [superBoardSubViewKeydown](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoEvent#super-board-sub-view-keydown) |

**问题修复**

1. 修复了容器拖拽（transform X轴、Y轴偏移）引起的图元错位问题
2. 修复了用户在 Web 端输入文本后，在 iOS 或 Android 端对其再次编辑后显示不全的问题
3. 修复了偶现的激光笔未同步给其他端问题



## 2.15.3 版本

发布日期：2024-02-26

**问题修复**

1. 修复了使用文本工具输入中文换行时文字遮盖问题
2. 修复了使用文本工具时，因刷新、切换窗口等操作造成文本异常失去焦点的文本显示问题



## 2.15.2 版本

发布日期：2024-01-30

**问题修复**

修复了无法对异常图元操作的问题

新增 [clearPageMode](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~enum~ZegoSuperboardCustomConfigKey#clear-page-mode)。在初始化 SDK 后且开始绘制图元前，调用 [setCustomizedConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-customized-config)，传入 `key` 为 `'clearPageMode'`，传入 `value` 为 `'1'`。

随后，当用户在异常场景下绘制出图元后，SDK 会自行判断该图元是否异常。如果判断为异常，SDK 会自行修正该图元。该用户即可对该图元执行正常操作，如删除、拖动等。



## 2.15.1 版本

发布日期：2023-12-11

**问题修复**

修复了删除白板时会概率性出现删除失败的的问题




## 2.15.0 版本

发布日期：2023-10-23

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增 Express 支持版本 | SuperBoard Web SDK 可适配 Express-Video 3.0.0 及之前的 SDK。  | - |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化日志上报 | 优化日志上报场景 | - |

**问题修复**

1. 修复了在本端断网期间，对端新增/删除/切换白板，随后本端重连网络，无法同步最新白板的问题
2. 修复了使用文本工具输入特殊字符 '\<' '&lt' 或 '&gt' 后，再输入字母会导致自动换行的问题
3. 修复了本端使用画笔时断网，将画笔切换为激光笔，随后网络恢复，本端的激光笔操作无法同步到对端白板上的问题
4. 修复了用户 A 在纯白板上绘制图形时，用户 B 切换至文件白板后又切换回纯白板，用户 B 无法看到该图形的问题
5. 修复了修复了本端断网重连后出现多余光标的问题




## 2.14.1 版本

发布日期：2023-09-11

**问题修复**

1. 修复了英文字母底部的截断问题
2. 修复了斜体文本左下部和右上部的截断问题



## 2.14.0 版本

发布日期：2023-07-19

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 支持反初始化 SDK | 在不使用文件白板功能时，支持反初始化 SDK，释放资源 | [unInit](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#un-init)|

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化“获取 SuperBoardSubView 列表”的请求策略 | 优化 “获取 SuperBoardSubView 列表” 的网络请求策略，多次发起请求时，节省网络请求数。| [querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#query-super-board-sub-view-list) |
| 增加关键 API 接口的初始化校验 | 在一些关键 API 接口调用时，增加 “SDK 是否已完成初始化” 的校验逻辑，保证接口调用时序的正确性。| <ul><li>[querySuperBoardSubViewList](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#query-super-board-sub-view-list)</li><li>[createWhiteboardView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-whiteboard-view)</li><li>[createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-file-view)</li></ul> |
| 优化错误码提示 | 在使用文件功能时，如果未开启相关服务权限，抛出相关错误码提示。| [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#create-file-view) |

**问题修复**

1. 修复了断网时房间内其他用户新增或删除白板，网络重连后本端自动渲染白板异常的问题
2. 修复在 Safari 浏览器中，文本工具在输入状态时状态框高度计算异常的问题
3. 修复设置自定义光标文本的值为空时，文本没有消失的问题
4. 修复在非 Excel 类的文件切换时，也会收到 Excel sheet 切换通知的问题
5. 修复某些场景下，图元无法被选中或删除的问题
6. 修复多次操作图元并撤销重做后，出现无法再次重做的问题
7. 修复在断网重连成功后，获取 SuperBoardSubView 列表时，偶现重复文件或白板的问题
8. 修复其他已知问题





## 2.13.0 版本

发布日期：2023-05-11

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 光标支持自定义文字展示 | 支持在画笔光标上展示自定义的文字信息。| [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-custom-cursor-attribute)|



## 2.12.0 版本

发布日期：2023-04-10

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增监测动态 PPT 播放视频异常的功能 | 新增监测动态 PPT 播放视频异常的功能，针对用户在接收其他用户播放的音视频时，由于浏览器播放策略导致无法同步播放的问题，通过新增的 [superBoardSubViewMediaPermission](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoEvent#super-board-sub-view-media-permission) 回调监听视频播放异常问题，发现异常后，调用 [playMedia](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubViewImpl#play-media) 接口动态播放视频。 | <ul><li>[superBoardSubViewMediaPermission](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoEvent#super-board-sub-view-media-permission)</li><li>[playMedia](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubViewImpl#play-media)</li></ul> |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化静态资源请求策略 | 优化静态资源的网络请求策略，动态固定每次翻页、滚动产生的资源请求数，节省网页的性能消耗。| - |
| 优化日志上报策略 | <ul><li>增加 PPT.js 脚本每条日志的上报时间。</li><li>日志上传的峰值由 10 条改为 5 条。</li><li>增加切换动画步骤、切页、接收信令等的日志打印。</li></ul>| - |

**问题修复**

1. 修复了网络异常导致动态 PPT 切换步骤超时，其他用户多切一步、以及不能连续切步的问题
2. 修复了后进房的用户无法同步缩放画面的问题
3. 修复了 Safari 浏览器展示文本图元时，文本页面四角显示不全的问题
4. 修复了放大拖拽图元后，无法清除图元的问题
5. 修复了动态 PPT 在放大拖拽后，切页会不同步的问题
6. 修复了文本输入文字达到最大限制后，继续输入中文会删除之前文字的问题
7. 修复了在 Safari 浏览器下刷新页面时，其他用户正在播放的视频变为暂停的问题
8. 修复了截图功能在保存动态 PPT 和 Excel 文件时，保存的截图样式丢失的问题
9. 修复了一端用户新增文本图元后，其他用户擦除该文本图元后无法撤销重做的问题
10. 修复了在开启自定义光标后，多端同时进行涂鸦绘制时，其他用户端同步展示会出现光标交替闪烁的问题
11. 修复了在移动设备使用橡皮擦擦除叠加在一起的多个图元时，会一起擦除所有图元的问题
12. 修复了一端用户使用激光笔后，切换为画笔工具绘制时，其他用户端仍显示激光笔的问题





## 2.11.0 版本

发布日期：2022-12-26

**问题修复**

1. 修复断线重连期间切换白板，但重连成功后白板没有同步切换的问题
2. 修复截图功能在 Safari/Firefox 浏览器上的兼容问题




## 2.10.0 版本

发布日期：2022-12-01

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化加载 PDF 文件策略 | <p>增加配置项：</p><ul><li>优化移动端设备加载 PDF 文件的策略。</li><li>优化转码后文件的体积大小。</li></ul> | [setCustomizedConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-customized-config)  |

**问题修复**

1. 修复了更改浏览器分辨率时、可能会引起图元消失的问题



## 2.9.0 版本

发布日期：2022-11-18

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 切换扬声器 | 支持设置动态演示文件的扬声器设备。 | [switchSpeaker](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardSubViewImpl#switch-speaker) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 日志优化 | 优化初始化日志输出。 | -  |

**问题修复**

1. 修复了异常情况下画笔残留的问题
2. 修复了后进房异常情况下动态演示文件视频播放问题




## 2.8.1 版本

发布日期：2022-10-10

**问题修复**

1. 修复已知问题




## 2.8.0 版本

发布日期：2022-10-10

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 日志优化 | 优化日志上报格式。 | -  |
| PDF 渲染优化 | 优化 PDF 文件在移动设备上的渲染。 | -  |

**问题修复**

1. 修复了动态 PPT 脚本日志等级无法设置的问题



## 2.7.0 版本

发布日期：2022-08-22

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化加载动态 PPT 体验 | 优化用户等待体验，动态 PPT 的资源 CDN 切换重试时间改为 30s。| -  |

**问题修复**

1. 修复了部分由 PPT 转 PDF 格式的文件、在翻页过程中会产生细小误差的问题



## 2.6.0 版本

发布日期：2022-08-03

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 配置文件转码格式 | 新增文件转码配置项 renderImgType，支持在上传文件时，进行转码配置。| [uploadFile](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#upload-file)  |
| 支持预加载静态文件 |  新增支持预加载静态文件。|[cacheFile](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~interface~ZegoEvent#cache-file) |
| 取消缓存文件 |  针对正在进行的预加载任务，支持进行取消操作。|[cancelCacheFile](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#cancel-cache-file) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 动态调整清晰度 | 部分 iOS 移动设备渲染静态文件，根据 canvas 位图尺寸上限，动态调整清晰度。| -  |
| 优化错误码提示 | 部分 iOS 移动设备渲染静态文件，绘制 canvas 时内存会超出限制，增加错误码提示。| -  |




## 2.5.3 版本

发布日期：2022-07-29

**问题修复**

1. 修复了初始化 SDK 后，文件服务无法建立连接的问题



## 2.5.2 版本

发布日期：2022-07-08

**问题修复**

1. 修复了切换文件环境无效的问题



## 2.5.0 版本

发布日期：2022-07-05

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化日志 | 优化日志信息|- |

**问题修复**

1. 修复了一个概率性拉取白板失败的问题



## 2.4.0 版本

发布日期：2022-06-06

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
|-------|-------|-------|
| 设置日志高级配置 |  配置客户端本地打印日志级别。|[setLogConfig](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-log-config) |

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化 SDK 间的版本依赖关系 | 优化与 [Express-Video SDK](https://doc-zh.zego.im/article/3209) 的版本依赖关系。|- |



## 2.3.0 版本

发布日期：2022-05-26

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化鉴权方式 | 提高 Token 安全性，支持使用 “token04” 版本的 Token，具体请参考 [使用 Token 鉴权](/super-board-web/quick-start/user-access-control)。| <ul><li>[loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#login-room)</li><li>[renewToken](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#renew-token)</li><li>[tokenWillExpire](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~interface~ZegoRTMEvent#token-will-expire)</li><li>[init](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#init)</li></ul>|
| 优化自定义光标传输数据时机 | 关闭此功能时，将不会发送数据。| -  |



## 2.2.2 版本

发布日期：2022-04-13

**问题修复**

1. 修复已知问题



## 2.2.0 版本

发布日期：2022-01-18

**新增功能**

| 功能项  | 功能描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增自定义光标功能 | 新增画笔自定义光标功能。可以通过调用 [setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-custom-cursor-attribute) 接口设置画笔光标样式。|<ul><li>[enableCustomCursor](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#enable-custom-cursor)</li><li>[enableRemoteCursorVisible](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#enable-remote-cursor-visible)</li><li>[setCustomCursorAttribute](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~class~ZegoSuperBoardManager#set-custom-cursor-attribute)</li></ul>|

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增错误码 | 新增如下错误码：<ul><li>3130011：光标设置偏移值超出光标大小。</li><li>3131018：打开文件时弹需要修复文件提示框（文件损坏）。</li><li>3131019：EOF 错误（文件内容不完整）。</li></ul>|-|




## 2.1.6 版本

发布日期：2021-11-19

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 优化 PDF 文件加载 | 优化 h5 场景下部分机型无法加载较大 PDF 文件的问题。  |-|

**问题修复**

1. 修复开启笔锋后，画笔、椭圆、矩形绘制后会消失的问题




## 2.1.5 版本

发布日期：2021-11-16

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 废弃测试环境 | 统一环境概念，对外不再区分测试环境/正式环境，详见 [测试环境废弃说明](https://doc-zh.zego.im/article/13105)。|-|




## 2.1.0 版本

发布日期：2021-10-15

**改进优化**

| 优化项  | 优化描述 | 相关接口 |
| -----  | ---- | ----- |
| 新增备用请求域名 | 针对请求域名网络异常情况，自动切换备用请求域名，且重试次数增加至6次。 |-|
|优化笔锋效果|优化开启笔锋时，在白板上绘制的轨迹过短时会缺失的问题。|-|
|优化多端图元显示位置|优化多端在共享超大文件白板时，图元显示位置会偏移的问题。|-|
| 优化 PDF 文件加载 | 优化 h5 场景下部分机型（如 iPhone 6）无法加载较大 PDF 文件的问题。  |-|
|优化图片图元内存占用|优化图片图元过多的情境下内存占用过大的问题。|-|
| 新增错误码 | 新增两个文件转码失败的错误码：<ul><li>3121010：源文件中存在安全隐患，无法正常打开。</li><li>3121011：转码结束后存在图片、音视频文件未正常导出。</li></ul> |-|




## 2.0.1 版本

发布日期：2021-09-13

**问题修复**

1. 修复部分错误码提示不正确的问题




## 2.0.0 版本

发布日期：2021-09-02

**新增功能**

首次发布。超级白板包括白板涂鸦、实时轨迹同步、文档共享、文件转码、白板录制与回放、白板与实时音视频同步等多种能力。
