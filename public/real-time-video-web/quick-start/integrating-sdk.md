# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- Windows 或 macOS 开发电脑已经连接到 Internet。
- 满足 Express Web SDK 兼容性的浏览器（具体请参考 [浏览器兼容性和已知问题](https://doc-zh.zego.im/article/12047)），推荐使用最新版本的 Google Chrome 浏览器。

## 集成 SDK

开发者可通过以下任意一种方式集成 SDK。

### 方式 1：使用包管理器自动集成（推荐）

1. 下载并安装[Node.js ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)。
2. 新建项目

  <Tabs>
  <Tab title="HTML">
  新建文件夹 创建index.html , index.js
  ```bash
  ├── index.html
  ├── index.js
  ```
  </Tab>
  <Tab title="Vue">
  在命令行中执行
  ```bash
  npm create vue@latest
  ```
  选择默认选项即可
  ```bash
  > npx
  > create-vue
  Vue.js - The Progressive JavaScript Framework
  ✔ 请输入项目名称： … zego_web_vue_demo
  ✔ 是否使用 TypeScript 语法？ … [否] / 是
  ✔ 是否启用 JSX 支持？ … [否] / 是
  ✔ 是否引入 Vue Router 进行单页面应用开发？ … [否] / 是
  ✔ 是否引入 Pinia 用于状态管理？ … [否] / 是
  ✔ 是否引入 Vitest 用于单元测试？ … [否] / 是
  ✔ 是否要引入一款端到端（End to End）测试工具？ › 不需要
  ✔ 是否引入 ESLint 用于代码质量检测？ › 否
  正在初始化项目 /xxx/zego_web_vue_demo...
  项目初始化完成，可执行以下命令：
    cd zego_web_vue_demo
    npm install
    npm run dev
  ```
  </Tab>
  <Tab title="React">
  在命令行中执行
  ```bash
  npm create vite@latest zego_web_react_demo --  --template react
  ```

  ```
  > npx
  > create-vite zego_web_react_demo --template react
  Scaffolding project in /xxx/zego_web_react_demo...
  Done. Now run:
    cd zego_web_react_demo
    npm install
    npm run dev
  ```
  </Tab>
  </Tabs>

3. 通过包管理器 安装 SDK。

  在项目的根目录下执行以下命令安装依赖。
  <Tabs>
  <Tab title="npm">
  ```bash
  npm install zego-express-engine-webrtc
  ```
  </Tab>
  <Tab title="yarn">
  ```bash
  yarn add zego-express-engine-webrtc
  ```
  </Tab>
  <Tab title="pnpm">
   ```bash
  pnpm add zego-express-engine-webrtc
  ```
  </Tab>
  </Tabs>

<Note title="说明">
   - 安装的依赖包支持 typescript 语言。
   - 如果在 macOS 或 Linux 系统中执行安装命令失败，提示 “permission denied”，请在SDK安装命令前加上 `sudo` 重新执行即可。
</Note>



4. 在项目中文件中引入SDK，示例代码如下：
  <Tabs>
  <Tab title="HTML">
  index.html:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Zego Web Demo</title>
  </head>
  <body>
    <h1>Zego Web Demo</h1>
    <script src="index.js" type="module"></script>
  </body>
  </html>
  ```
  index.js:
  ```js
  import { ZegoExpressEngine } from "zego-express-engine-webrtc"
  ```
  </Tab>
  <Tab title="Vue">
  app.vue:
  ```html
  <script setup>
  import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
  </script>
  <template>
    <div>
      <h1>Zego Web Vue Demo</h1>
    </div>
  </template>
  ```
  </Tab>
  <Tab title="React">
  app.jsx:
  ```js
  import { ZegoExpressEngine } from "zego-express-engine-webrtc"
  function App() {
    return (
      <>
        <h1>Zego Web React Demo</h1>
      </>
    )
  }
  export default App
  ```
  </Tab>
  </Tabs>


5. 完整引入和按需引入 SDK。

<Warning title="注意">


    - 在 3.4.0 版本之前：
      开发者集成 ZEGO Web SDK 时，默认同时集成了混音、混流等功能。如果开发者的业务仅需其中的某个功能模块，无法单独集成。
    - 从 3.4.0 版本开始：
      - 开发者依然可以通过主路径引入 SDK，同时集成混音、混流等功能。
      - 同时，开发者也可以按照业务需要，从`混音`、`混流`、`CDN`、`范围语音`、`美颜` 功能模块中进行选择，并通 包管理器安装的 方式单独集成。（**仅支持通过 包管理器安装的 方式单独集成某个功能模块，其余方式不支持。**）
        - 各功能模块的包大小约为：混音（56 KB）、混流（60 KB）、CDN（29
          KB）、范围语音（97 KB）、美颜（69 KB）。
        - 对于未引入的功能，在构建过程中会自动移除，减少 SDK 包的体积。

</Warning>


    <Tabs>
    <Tab title="完整集成 SDK">
    如果您需要完整集成 ZEGO Web SDK，请参考如下代码，在 “index.js” 文件中引入完整的 SDK。
    ```javascript
    import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
    ```
    </Tab>
    <Tab title="单独集成功能模块">
    请注意，在创建 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 实例时，开发者必须通过 `import { ZegoExpressEngine } from "zego-express-engine-webrtc/esm"` 引入某个功能模块，才能实现按需集成的效果。
    请根据您业务需要，选择需要使用的功能，通过 `zego-express-engine-webrtc/esm` 路径引入。

    ```javascript
    import { ZegoExpressEngine } from "zego-express-engine-webrtc/esm"
    // 引入 CDN 模块
    import { StreamCDN } from "zego-express-engine-webrtc/esm/stream-cdn"
    // 引入 混音 模块
    import { AudioMix } from "zego-express-engine-webrtc/esm/audio-mix"
    // 引入 混流 模块
    import { MixStream }  from "zego-express-engine-webrtc/esm/mix-stream"
    // 引入 范围语音 模块
    import { RangeAudio } from 'zego-express-engine-webrtc/esm/range-audio';
    // 引入 美颜 模块
    import { BeautyEffect } from 'zego-express-engine-webrtc/esm/beauty-effect';
    ZegoExpressEngine.use(StreamCDN);
    ZegoExpressEngine.use(AudioMix);
    ZegoExpressEngine.use(MixStream);
    ZegoExpressEngine.use(RangeAudio);
    ZegoExpressEngine.use(BeautyEffect);
    ```
    如果您未集成某个功能模块、但调用了模块相关的 API 接口，SDK 将返回错误码 `1101003` 及相关提示。功能模块及对应的 API 接口如下：
    <ul><li><p>CDN 功能(StreamCDN)：</p>
        <ul><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#add-publish-cdn-url" target="blank" >addPublishCdnUrl</a>：通知即构服务器将流转推到 CDN。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#remove-publish-cdn-url" target="blank" >removePublishCdnUrl</a>：通知即构服务器停止将流转推到 CDN。</li></ul></li><li><p>混音功能(AudioMix)：</p>
        <ul><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixing-audio" target="blank" >startMixingAudio</a>：开始混音。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixing-audio" target="blank" >stopMixingAudio</a>：停止混音。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixing-audio-volume" target="blank" >setMixingAudioVolume</a>：设置混音音量。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-live-audio-effect" target="blank" >enableLiveAudioEffect</a>：开启或关闭音效增强的功能。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-audio-changer-param" target="blank" >setAudioChangerParam</a>：对传入的歌曲进行变调处理。</li></ul></li>
    <li><p>混流功能(MixStream)：</p>
        <ul><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#start-mixer-task" target="blank" >startMixerTask</a>：开始混流任务。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#stop-mixer-task" target="blank" >stopMixerTask</a>：停止服务端混流。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-mixer-task-config" target="blank" >setMixerTaskConfig</a>：混流高级配置。</li></ul></li>
    <li><p>范围语音(RangeAudio)：</p>
        <ul><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-range-audio-instance" target="blank" >createRangeAudioInstance</a>：创建范围语音实例对象。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-param" target="blank" >setVoiceChangerParam</a>：范围语音对媒体流进行自定义参数设置变声处理。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-voice-changer-preset" target="blank" >setVoiceChangerPreset</a>：范围语音对媒体流进行变声处理。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-audio-source-update-checker" target="blank" >enableAudioSourceUpdateChecker</a>：是否检查范围内用户的变更。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#on" target="blank" >on</a>：注册回调事件。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#off" target="blank" >off</a>：注销回调事件。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-audio-receive-range" target="blank" >setAudioReceiveRange</a>：设置音频接收距离的最大范围。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-self-position" target="blank" >updateSelfPosition</a>：更新听者的位置和朝向。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-audio-source" target="blank" >updateAudioSource</a>：添加或更新音源位置信息。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-spatializer" target="blank" >enableSpatializer</a>：开关 3D 音效。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-microphone" target="blank" >enableMicrophone</a>：开关麦克风。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-microphone" target="blank" >selectMicrophone</a>：指定麦克风设备。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#select-speaker" target="blank" >selectSpeaker</a>：指定扬声器设备。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#enable-speaker" target="blank" >enableSpeaker</a>：开关扬声器。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-custom-mode" target="blank" >setRangeAudioCustomMode</a>：设置范围语音的高阶自定义模式。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-mode" target="blank" >setRangeAudioMode</a>：设置范围语音模式。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-team-id" target="blank" >setTeamID</a>：设置队伍 ID。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-position-update-frequency" target="blank" >setPositionUpdateFrequency</a>：设置 SDK 内部实时更新位置的频率。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-range-audio-volume" target="blank" >setRangeAudioVolume</a>：设置范围语音本地播放音量。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-ai-denoise" target="blank" >enableAiDenoise</a>：范围语音开启或关闭 AI 降噪。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#is-audio-context-running" target="blank" >isAudioContextRunning</a>：判断 AudioContext 对象是否已启用。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#resume-audio-context" target="blank" >resumeAudioContext</a>：重新启用内部的 AudioContext 对象。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-stream-vocal-range" target="blank" >setStreamVocalRange</a>：设置拉流音频发送范围。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-stream-position" target="blank" >updateStreamPosition</a>：更新拉流的位置。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#set-custom-source-vocal-range" target="blank" >setCustomSourceVocalRange</a>：设置自定义发声源发送范围。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressRangeAudio#update-custom-source-position" target="blank" >updateCustomSourcePosition</a>：添加或更新自定义发声源位置信息。</li></ul></li>
    <li><p>美颜功能(BeautyEffect)：</p>
        <ul><li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-effects-beauty" target="blank" >setEffectsBeauty</a>：开启或关闭美颜。</li>
        <li><a href="https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-lowlight-enhancement" target="blank" >setLowlightEnhancement</a>：设置低照度增强。</li></ul></li></ul>
    </Tab>
    </Tabs>

### 方式 2：从官网下载 SDK，手动集成

<Accordion title="从官网下载 SDK，手动集成" defaultOpen="false">
1. 下载最新版本的 [SDK](/real-time-video-web/client-sdk/download-sdk) 并解压到项目文件夹，我们可以在 “dist_js/” 下找到 “ZegoExpressWebRTC-x.x.x.js” 文件。
2. 在 [VSCode](https://code.visualstudio.com/)中打开项目文件夹并新建 “index.html” 文件。
  <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/329f88eaa3.png" /></Frame></Frame>
3. 在 “index.html” 文件中编写界面代码，并在文件的 `head` 标签内使用 `script` 标签引入 “ZegoExpressWebRTC-x.x.x.js”。其中，“x.x.x” 为 SDK 的版本号，请参考第 1 步压缩包解压后的文件名修改。

  <Accordion title=" index.html 代码示例如下：" defaultOpen="false">
  ```html
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Zego RTC Web Demo</title>
      <script src="./dist_js/ZegoExpressWebRTC-x.x.x.js"></script>
    </head>
    <body>
      <h1>
        Zego RTC Web Demo
      </h1>
    </body>
    <script>
      (async () => {
        // 此处添加后续的代码...
      })();
    </script>
  </html>
  ```
  </Accordion>
</Accordion>
