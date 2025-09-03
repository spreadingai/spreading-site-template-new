<Title>小程序推流时，如何设置横屏？</Title>



- - -

在允许屏幕旋转的情况下，可分为横屏与竖屏：

手机端设置 `"pageOrientation": "auto"` 或 iPad 上设置 `"resizable": true` 时会允许屏幕旋转，此时使用 Page 的 `onResize` 事件或者 `wx.onWindowResize` 方法可对该操作进行监听，进而判断是使用横屏还是竖屏布局。

详情请参考 [微信小程序官方文档 - 大屏适配指南](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/adapt.html#1.%20%E9%80%82%E9%85%8D%E5%9C%BA%E6%99%AF)。
