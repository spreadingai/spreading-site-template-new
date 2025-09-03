# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

* 已安装 [支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)。
* 使用支付宝小程序基础库 1.23.0 及以上版本，低版本需要做 [兼容处理](https://opendocs.alipay.com/mini/framework/compatibility)。
* **请确保您已自行联系支付宝商务人员，开通了相关权限，并获取到了接入 MRTC 的相应参数，以及完成了挂包（Android 设备需要下载挂包）后，才可以正常使用 [RTC room 组件](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。**
* 确保您的支付宝小程序符合以下类目，并开通实时音视频权限（获取到对应的小程序 AppID），详情请参考 [申请开通](https://opendocs.alipay.com/pre-open/08757t?pathHash=d1fc6c9f)。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/wx_program/AliPay_miniprogram_item.png" /></Frame>


## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="true">
请参考 [支付宝小程序文档 - 快速接入](https://opendocs.alipay.com/mini/developer/getting-started) 创建一个支付宝小程序。
</Accordion>



### 导入 SDK

1. 请参考 [下载](/real-time-video-miniprogram/client-sdk/download-sdk) 文档，下载最新版本的 `支付宝小程序` SDK。

2. 解压 SDK 压缩包，将 “ZegoExpressAlipayMiniProgram-x.x.x.js” 文件拷贝到项目中。

3. 在使用到的插件的 JS 文件的最前方导入 SDK。

```javascript
import { ZegoExpressEngine } from '../libs/ZegoExpressAlipayMiniProgram-x.x.x';
```
