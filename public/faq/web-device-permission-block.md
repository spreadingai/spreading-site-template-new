<Title>在 Web 平台上，如何禁止麦克风/摄像头的访问权限弹框？</Title>



---

存在以下 3 种场景：

#### 场景 1：禁止摄像头的访问权限弹框

- 调用 [createZegoStream](https://doc-preview-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口时，将摄像头采集流相关配置的 video 属性设置为 false。
- 注释掉 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口相关代码，或者将 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 的 camera 属性设置为 false。

以上两项必须同时满足。

<br/>

#### 场景 2：禁止麦克风的访问权限弹框：

- 调用 [createZegoStream](https://doc-preview-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口时，将摄像头采集流相关配置的 audio 属性设置为 false。

- 注释掉 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口相关代码，或者将 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 的 microphone 属性设置为 false。

以上两项必须同时满足。

<br/>

#### 场景 3：禁止摄像头和麦克风的访问权限弹框

- 不调用 [createZegoStream](https://doc-preview-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，或者调用 [createZegoStream](https://doc-preview-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口时，将摄像头采集流相关配置的 video 和 audio 属性设置为 false。
- 注释掉 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 接口相关代码，或者将 [checkSystemRequirements](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#check-system-requirements) 的 camera 和 microphone 属性设置为 false。

以上两项必须同时满足。
