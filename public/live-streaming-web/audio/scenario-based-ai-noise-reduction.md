# AI 降噪

- - -

## 功能简介

ZEGO Express SDK 提供了 AI 降噪功能，开发者可以在使用麦克风采集声音时，对声音进行降噪处理；并在传统降噪（详情请参考 [噪声抑制](https://doc-zh.zego.im/article/16044)）消除稳态噪声的基础上，同步处理非稳态噪声（包括鼠标点击声、键盘声、敲击声、空调声、厨房碗碟碰撞声、餐厅嘈杂声、环境风声、咳嗽声、吹气声等非人声噪声），保留纯净语音，提升用户的通话体验。

### 使用场景

本功能适用于语音房、会议、语音开黑等 1v1 或多人音视频通话场景。

### 可消除的噪声

开发者可以使用本功能，消除以下噪音：

<table>

  <tbody><tr>
    <th>场景</th>
    <th>一些典型噪声</th>
  </tr>
  <tr>
    <td>会议室</td>
    <td><ul><li>键盘声</li><li>桌子敲击声</li></ul></td>
  </tr>
  <tr>
    <td>办公室</td>
    <td><ul><li>键盘声</li><li>周围同事说话声</li></ul></td>
  </tr>
  <tr>
    <td>交通工具</td>
    <td><ul>
<li>汽笛声</li>
<li>汽车经过的呼啸声</li>
<li>车载音乐声</li>
<li>雨声及雨刮声</li>
</ul></td>
  </tr>
  <tr>
    <td>网吧</td>
    <td><ul>
<li>键盘声</li>
<li>周围人语音声</li>
</ul></td>
  </tr>
  <tr>
    <td>咖啡厅</td>
    <td><ul>
<li>椅子拖动声</li>
<li>周围人说话声</li>
<li>尖锐碰撞声</li>
</ul></td>
  </tr>
</tbody></table>

## 效果展示

#### 办公室

原始音频包含：鼠标点击声、键盘声、鼓掌声、摩擦声、办公室嘈杂声、空调声等。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/office_noise_original.mp3" controls>您的浏览器不支持 audio 标签。</audio>

AI 降噪后：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/office_noise_AIDenoise.mp3" controls>您的浏览器不支持 audio 标签。</audio>

#### 公共场所

原始音频包含：雨声、电车声、炒菜声、汽车呼啸声等。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/public_noise_original.mp3" controls>您的浏览器不支持 audio 标签。</audio>

AI 降噪后：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/public_noise_AIDenoise.mp3" controls>您的浏览器不支持 audio 标签。</audio>

#### 音乐场景

原始音频：

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Original_audio.mp3" controls>您的浏览器不支持 audio 标签。</audio>

常规 AI 降噪：消除噪音，但音乐损伤大。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Conventional_AI_noise_reduction_effect.mp3" controls>您的浏览器不支持 audio 标签。</audio>

场景化 AI 降噪后：消除噪音，音乐品质保真。

<audio src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/Audio/Scenario_based_AI_noise_reduction_effect.mp3" controls>您的浏览器不支持 audio 标签。</audio>


## 前提条件

在实现 AI 降噪功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。

## 使用步骤

<Warning title="注意">


- 调用 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise) 接口前，需要先调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream。
- 目前仅支持对特定的一条流进行 AI 降噪处理，不支持同时对多条流进行降噪；
- 兼容性：
    - PC web: AI 降噪功能支持在 Google Chrome 66.0、Edge 79.0、FireFox 76.0 和 Safari 14.1及以上版本使用，但为了确保 AI 降噪功能的稳定性，推荐您使用最新版的 Google Chrome 浏览器或 Edge 浏览器。
    - 移动端：为了确保使用 AI 降噪功能的稳定性，推荐使用 Safari 或者 Google Chrome 96.0 以上浏览器，部分 Android 微信浏览器使用 AI 降噪功能可能会存在一点电流声。


</Warning>



1. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 localStream。

    ```javascript
    // AI 降噪模块引入
    import { AiDenoise } from "zego-express-engine-webrtc/aidenoise";
    // 需要在 new ZegoExpressEngine 前调用
    ZegoExpressEngine.use(AiDenoise);
    // 初始化实例
    const zg = new ZegoExpressEngine(appID, server);
    // 创建媒体流
    const localStream = await zg.createZegoStream();
    ```

2. （可选）开发者可通过调用 [setAiDenoiseMode](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-ai-denoise-mode) 接口，设置降噪模式。

<Warning title="注意">


    当前官网 SDK 不包含此接口与功能，默认直接使用 AI 模式。如果您需要使用 AIBalanced 模式，请联系 ZEGO 技术支持特殊编包。


</Warning>



    <table>

    <tbody><tr>
    <th>AI 降噪模式</th>
    <th>适用场景</th>
    </tr>
    <tr>
    <td>AI</td>
    <td>（默认）轻量模式，具有良好的降噪效果，且性能消耗极低，适用于室内噪音环境中。</td>
    </tr>
    <tr>
    <td>AIBalanced</td>
    <td><p>均衡模式，与轻量模式相比，在相同的人声保真效果前提下，噪音抑制效果明显提升，可以达到干净无噪音或不扰人的程度；但性能消耗稍微增加。适用于街道、马路、市场等较为嘈杂（信噪比低）的户外环境中。</p></td>
    </tr>
    </tbody></table>

    ```javascript
    // 需要使用 AIBalanced 降噪模式，要去掉对 AiDenoise 模块的引入，改为引入 VoiceChanger 模块。
    // import { AiDenoise } from "zego-express-engine-webrtc/aidenoise";
    // ZegoExpressEngine.use(AiDenoise);

    // 音频处理模块引入
    import { VoiceChanger } from "zego-express-engine-webrtc/voice-changer";
    // 需要在 new ZegoExpressEngine 前调用
    ZegoExpressEngine.use(VoiceChanger);
    ```

    ```javascript
    // 设置为AIBalanced
    await zg.setAiDenoiseMode(localstream, 1);
    // 设置为 AI
    await zg.setAiDenoiseMode(localstream, 0);
    ```

3. 开发者可通过调用 [enableAiDenoise](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise) 接口，传入需要进行 AI 降噪的媒体流，开启或关闭 AI 降噪功能，完成 AI 降噪的相关设置。

    ```javascript
    // 开启 AI 降噪
    await zg.enableAiDenoise(localstream, true);
    ```

<Content />

