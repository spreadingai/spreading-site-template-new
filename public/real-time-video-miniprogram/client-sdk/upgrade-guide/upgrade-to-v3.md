# 3.0.0 及以上版本升级指南

- - -

<Warning title="注意">


本文仅适用于 `微信小程序` SDK。

</Warning>




## 升级必读

- 开发者 `不能` 通过 3.0.0 以前的版本 `平滑升级` 到 3.0.0 或以上的版本。

    您需要在微信小程序的开发设置里，将部分域名添加至服务器域名，详情请参考下文 [添加服务器域名](https://doc-zh.zego.im/article/18284#2)。

- 为了保证您的音视频通话体验，ZEGO 推荐您使用 3.0.0 或以上版本的 SDK。

    - 自 `2023-09-20` 起至 `2024-09-20` 止，ZEGO 不再接受对 3.0.0 以前版本的微信小程序 SDK 的功能新增申请，仅支持问题修复、提供安全补丁。
    - 自 `2024-09-20` 后，ZEGO 将停止对 3.0.0 以前版本的微信小程序 SDK 的维护，不再接受功能新增、问题修复、安全补丁等各种申请。


## 添加服务器域名

打开 [微信公众平台](https://mp.weixin.qq.com/?token=&lang=zh_CN)，扫码进入 “小程序管理平台”，选择菜单 “开发管理 > 开发设置 > 服务器域名 > socket服务器域名”，进入修改页面，添加以下 socket 合法服务器域名：

```js
// socket 服务器域名
wss://accesshub-wss.zego.im
wss://accesshub-wss.coolzcloud.com
wss://accesshub-wss.zegocloud.com
```
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/socket.jpeg" /></Frame>
