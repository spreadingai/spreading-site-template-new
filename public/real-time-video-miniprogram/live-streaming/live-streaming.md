# 小程序直播

---

ZEGO 微信小程序 SDK 可以在小程序中提供音视频直播服务，从而实现电商直播/在线教育/在线问诊/视频客服等各种业务场景。但是由于微信小程序的官方限制，在某些场景下需要额外使用 ZEGO 提供的小程序直播插件才能实现音视频直播功能。   
本节将介绍需要使用与不需要使用 ZEGO 小程序直播插件两种方案的适用场景。

<Warning title="注意">


本功能仅支持在 `微信小程序` 上使用，且如果不符合下面任意一种场景，则无法使用本功能，请联系 ZEGO 技术支持获取解决方案。

</Warning>





## 不需要小程序直播插件进行直播

在微信小程序中实现音视频功能，需要使用微信的 [live-player](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 和 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 组件，并且须符合如下类目场景（当符合如下类目场景时，则不需要使用 ZEGO 小程序直播插件）：

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/MiniProgram/category_zh.png" /></Frame>


## 需要小程序直播插件进行直播

[即构直播助手](https://mp.weixin.qq.com/wxopen/pluginbasicprofile?action=intro&appid=wx2b8909dae7727f25&token=&lang=zh_CN) 是微信官方认证的 [社交 > 直播](https://developers.weixin.qq.com/miniprogram/introduction/plugin.html#%E5%BC%80%E6%94%BE%E8%8C%83%E5%9B%B4%E5%8F%8A%E6%9C%8D%E5%8A%A1%E7%B1%BB%E7%9B%AE) 类目微信小程序插件，为开发者提供便捷、强大的微信小程序音视频直播服务（[什么是小程序插件](https://developers.weixin.qq.com/miniprogram/introduction/plugin.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)）。   
如果小程序具备 **“电商平台”** 类目或 **“教育”** 类目，但二级类目不是 **在线视频课程** ，则无法使用微信的 [live-player](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 和 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 组件能力，但可以使用 ZEGO 提供的插件“即构直播助手”在微信小程序中实现实时音视频功能。可以使用“即购直播助手”的类目具体如下：

| 一级类目 | 二级类目 |
|----------|----------|
| 电商平台 | 电商平台 |
| 教育 | 培训机构 |
| 教育 | 学历教育 |
| 教育 | 驾校培训 |
| 教育 | 教育平台 |

更多“即构直播助手”插件的操作指引及 API 文档请参见：[运行示例代码](https://doc-zh.zego.im/article/2708)、[集成](https://doc-zh.zego.im/article/2879)、[实现流程](https://doc-zh.zego.im/article/2881)、[API文档](https://doc-zh.zego.im/article/2884)。

<Warning title="注意">

1. 微信小程序的主体必须为非个人主体类型，否则无法使用直播功能。本文仅提供参考，详细的微信小程序类目及申请资质要求需以微信最新的 [微信非个人主体小程序开放的服务类目](https://developers.weixin.qq.com/miniprogram/product/material/#%E9%9D%9E%E4%B8%AA%E4%BA%BA%E4%B8%BB%E4%BD%93%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E6%94%BE%E7%9A%84%E6%9C%8D%E5%8A%A1%E7%B1%BB%E7%9B%AE) 为准。   
2. 微信小程序的类目即为微信小程序的服务场景，在小程序后台的 “设置 > 基本设置 > 服务类目” 中，可以选择符合小程序功能的类目。所选类目需符合小程序的实际应用场景，否则在提交审核后会被驳回申请。  

</Warning>


