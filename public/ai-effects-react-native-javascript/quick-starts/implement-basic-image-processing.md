# 实现图像处理

---

## 前提条件

在实现基本的 AI 美颜功能之前，请确保：

- 已在项目中集成 SDK，详情请参考 [快速开始 - 集成 SDK](/ai-effects-react-native-javascript/quick-starts/import-the-sdk)。
- 已在项目中导入 ZegoEffects 资源和模型，详情请参考 [导入资源和模型](/ai-effects-react-native-javascript/quick-starts/import-resources-and-models)
- 登录 [ZEGO 控制台](https://console.zego.im) 创建项目，获取接入 ZegoEffects SDK 服务所需的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](https://doc-zh.zego.im/article/12107)。

## 使用步骤

### 1. 导入 ZegoExpress React Native SDK。     
    
<Steps>
<Step title="下载 ZegoExpress React Native SDK">
进入您的项目根目录，并执行以下任意命令，下载 ZEGO Express React Native SDK。

<CodeGroup>
```bash title="npm"
npm install zego-express-engine-reactnative --save
```

```bash title="yarn"
yarn add zego-express-engine-reactnative
```
</CodeGroup>
</Step>
<Step title="导入音视频 SDK --- ZegoExpress React Native SDK">
导入 ZEGO Express React Native SDK。

```javascript
import ZegoExpressEngine, {
  ZegoPublishChannel,
  ZegoTextureView,
  ZegoVideoConfig,
  ZegoVideoConfigPreset
} 
from "zego-express-engine-reactnative";
```
</Step>
<Step title="导入 AI 美颜 SDK --- ZEGO Effects React Native SDK">
导入 ZEGO Effects React Native SDK。

```javascript
import ZegoEffects from '@zegocloud/zego-effects-reactnative';
```
</Step>
</Steps>


### 2. 初始化并调用 AI 美颜相关接口

<Steps>
<Step title="开启自定义视频前处理">
调用 Express 的 [enableCustomVideoProcessing](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#enablecustomvideoprocessing) 接口，开启自定义视频前处理。
</Step>
<Step title="启用图像处理功能">
传入鉴权文件，并调用 AI 美颜的 [enableImageProcessing](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#enable-image-processing) 接口，启用图像处理功能。
</Step>
<Step title="开启美颜功能">
根据需求调用 [enableSmooth](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#enable-smooth)、[enableFaceLifting](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~javascript_react-native~class~ZegoEffects#enable-face-lifting) 等 AI 美颜接口，实现相关功能。
</Step>
</Steps>

<Warning title="注意">
初始化创建 ZegoEffects 对象时，SDK 内部会通过 AppID 及 AppSign 进行鉴权。
</Warning>

```javascript
/*
  * 初始化美颜效果 SDK。
  * 此方法应在创建 Express 实例后调用。
  */
async function initEffects() {
    // 为 Express 和 Effects启 用自定义视频处理
    // engine 是 ExpressEngine 的一个实例
    await engine.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

    // 记录 Effects SDK 的版本
    console.log(`Effects version=${await ZegoEffects.getVersion()}`);

    // 获取前提条件中申请到的 AppID、AppSign，直接传入create接口，创建Effects对象并返回相关错误码
    const appID = 1234567890;
    const appSign = "xxxxxxxxxxxx";
    const effects = new ZegoEffects(appID, appSign);

    // 监听错误事件并处理
    effects.on('error', (errorCode: number, desc: string) => {
      // 记录错误信息以供调试
      console.error(`Error code: ${errorCode}, Description: ${desc}`);
    });

    // 为 Express 启用自定义处理器，为 Effects 启用图像处理
    effects.enableImageProcessing(true);

    // 启用并配置磨皮效果以获得更好的美化效果
    effects.enableSmooth(true);
    effects.setSmoothParam({ intensity: 100 });

    // 启用瘦脸效果以创建更小的脸部外观
    effects.enableFaceLifting(true);
    effects.setFaceLiftingParam({ intensity: 100 });

    // 这里可以添加其他效果或配置的额外步骤
    // 例如：
    // effects.enableWhitening(true);
    // effects.setWhiteningParam({ intensity: 50 });

    // 确保所有效果都已正确启用和配置
    console.log('美颜效果初始化成功。');
}
```

### 3. 推流

实现上述美颜效果后，即可进行推流等相关操作。
