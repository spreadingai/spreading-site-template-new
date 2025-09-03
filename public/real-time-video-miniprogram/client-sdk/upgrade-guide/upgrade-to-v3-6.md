# 3.6.0 版本及以上升级指南

- - -


## 升级必读

开发者如需升级到 3.6.0 或以上的版本 SDK，需在微信小程序的开发设置里，将部分域名添加至服务器域名，用于上报事件和日志，具体操作如下。

<Warning title="注意">


开发者`无法` 通过 3.6.0 以前版本，`平滑升级` 到 3.6.0 或以上版本，如需升级，请务必进行以下配置。

</Warning>




1. 打开 [微信公众平台](https://mp.weixin.qq.com/?token=\&lang=zh_CN)，使用小程序对应微信账号，扫码进入 “小程序管理平台”，选择“开发 > 开发设置 > 服务器域名 > request 合法域名”。
2. 进入修改页面，添加以下 request 服务域名。
    ```javascript
    // request 服务域名
    https://weblogger-wss.coolfcloud.com
    ```
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/request_log.jpeg" /></Frame>
3. 将 SDK 更新至 3.6.0 或以上版本后，即可正常使用。
