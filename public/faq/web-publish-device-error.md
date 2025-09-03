<Title>Web 端推流时，报错：“code: 1103065, msg: Not Readable Error: device is not readable”，该如何处理？</Title>



- - -

可能有以下几种原因：

- 麦克风、摄像头等设备异常，请检查设备是否可用。

- 如果开发者使用 React Native 开发 H5，需要在 React Native 层面设置应用所需的权限，请参考官网文档 [添加权限](/real-time-video-rn/quick-start/integrating-sdk#添加权限)。

- 如果使用的是华为手机，通过 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口检测浏览器的兼容性时，该接口除依赖浏览器外，还依赖于操作系统本身，需要注释掉 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口相关代码。