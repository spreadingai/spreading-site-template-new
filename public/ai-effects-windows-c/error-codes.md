export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const errorCallbackMap = {
    'default': <a href="https://doc-zh.zego.im/article/api?doc=effects-sdk_API~objectivec_ios~protocol~ZegoEffectsEventHandler#effects-errcode-desc" target='_blank'>effects:errcode:desc:</a>,
    'macOS': <a href="https://doc-zh.zego.im/article/api?doc=effects-sdk_API~objectivec_macos~protocol~ZegoEffectsEventHandler#effects-errcode-desc" target='_blank'>effects:errcode:desc:</a>,
    'Android': <a href="@onError" target='_blank'>onError</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/registerEventCallback.html" target='_blank'>onEffectsError</a>,
    'Windows': <a href="@effects_on_error" target='_blank'>effects_on_error</a>,
    'RN': <a href="@on" target='_blank'>on</a>,
}

# 常见错误码

- - -

错误码通常会从 {getPlatformData2(props,errorCallbackMap)} 回调中抛出，请根据以下错误码并进行相应处理。

## 通用错误码

| 错误码枚举值 |  说明 |
| ---------- | ----- |
| 0          | 执行成功。 |
| 5000001    | License 格式无效。 |
| 5000002    | License 已过期。 |
| 5000003    | License 不包含当前 SDK 版本的授权。 |
| 5000004    | License 不包含当前平台的授权。 |
| 5000005    | License 不包含对当前 “Bundle ID” 的授权。 |
| 5000006    | 输入的图像数据异常，纹理 ID 小于等于 0 或者数据长度为 0，需要检查图像数据是否正确。 |
| 5000007    | SDK 的内部错误，正常不会出现，请联系 ZEGO 技术支持。 |
| 5000008    | 读取资源文件失败，通过 `setResource` 等设置资源接口，设置给 SDK 的资源文件路径不存在或者格式损坏，请检查路径是否正确，或尝试重新从官网下载资源并导入工程。 |
| 5100000    | SDK 鉴权成功。    |
| 5100001    | SDK 鉴权参数错误，请检查 AppID 和 AppSign 是否正确。    |
| 5100002    | SDK 鉴权网络异常，请检查网络是否连接成功。    |
| 5100003    |  SDK 鉴权异常。请检查鉴权参数、网络以及包名，仍有问题请联系 ZEGO 技术支持。    |
| 5100004    | SDK 鉴权请求 Token 错误，请联系 ZEGO 技术支持处理。    |
| 5100005    | SDK 鉴权请求 Server 错误，请联系 ZEGO 技术支持处理。    |
| 5100006    | SDK 鉴权包名错误，请检查Bundle ID 是否正确。    |


## 引擎相关错误码


| 错误码枚举值 |  说明 |
| ---------- | ----- |
| 5000100    | 缺少 AI 模型文件，请检查传入的模型路径是否正确和文件是否存在，或者参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000103    | 初始化 AI 推理引擎失败，模型文件损坏，请检查模型文件否正确设置，或者参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000104    | 缺少颜色查找表（LUT）资源，可能是没有正确设置美白、红润、白牙、风格滤镜等资源，请参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000105    | 加载颜色查找表（LUT）失败，可能是文件不存在或者损坏，请参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。  |
| 5000106    | 缺失背景图片，可能是启用了人像分割或者绿幕分割的背景替换能力，但是没有设置背景图片，请检查相关接口是否正确调用以及背景图片的路径是否存在。 |
| 5000107    | 加载背景图片失败，可能是不支持的图像格式，当前仅能完美支持“JPG”和“PNG”格式，其他格式未经验证。 |
| 5000108    | 引擎未进行初始化就调用了其他美颜接口，需要先调用 `initEnv` 进行初始化。 |
| 5000109    | AI 引擎异常，理论上不会出现该错误，请联系 ZEGO 技术支持。 |
| 5000110    | AI 模型版本与 SDK 版本不对应，请下载最新版本的 SDK，并参考 “导入资源和模型”重新配置。 |
| 5000111    | AI 模型格式错误或者损坏，请参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。           |
| 5000112    | 挂件资源路径为空，请确认路径是否正确。 |
| 5000113    | 挂件资源不存在，请确认资源是否已经导入以及路径是否正确。 |
| 5000114    | 美妆资源不存在，请确认资源是否已经导入以及路径是否正确，或者参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000203    | 运行人像分割模型失败，该错误会在每次处理图片时抛出，请参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000302    | 运行人脸检测模型失败，该错误会在每次处理图片时抛出，请参考 [导入资源和模型](https://doc-zh.zego.im/article/10189) 重新配置。 |
| 5000701    | 美妆特效运行失败，缺少人脸信息，请联系 ZEGO 技术支持处理。 |

## 鉴权相关错误码

| 错误码枚举值 |  说明 |
| ---------- | ----- |
| 5000201    | License 不包含“人像分割”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000301    | License 不包含“人脸检测”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000303    | License 不包含“红唇”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000501    | License 不包含“美白”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000502    | License 不包含“磨皮”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000503    | License 不包含“大眼”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000504    | License 不包含“小嘴”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000505    | License 不包含“长下巴”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000506    | License 不包含“瘦鼻”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000507    | License 不包含“白牙”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000508    | License 不包含“亮眼”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000509    | License 不包含“锐化”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000510    | License 不包含“红润”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000511    | License 不包含“挂件”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000512    | License 不包含“绿幕”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000601    | License 不包含“滤镜”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000602    | License 不包含“去除法令纹”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000603    | License 不包含“去除黑眼圈”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000604    | License 不包含“缩小额头高度”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。|
| 5000605    | License 不包含“瘦下颌骨”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。|
| 5000606    | License 不包含“瘦颧骨”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。  |
| 5000607    | License 不包含“小脸”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000608    | License 不包含“长鼻”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000609    | License 不包含“腮红”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000610    | License 不包含“眼线”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。  |
| 5000611    | License 不包含“眼影”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000612    | License 不包含“眼睫毛”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000613    | License 不包含“口红”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。  |
| 5000614    | License 不包含“美瞳”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000615    | License 不包含“风格妆”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000616    | License 不包含“祛痘斑”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000617    | License 不包含“清晰”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
| 5000619    | License 不包含“调整肤色”功能的授权，或 License 过期/无效，请联系 ZEGO 技术支持处理。 |
<Content platform="Windows" />