# 使用本地导播

- - -

## 功能简介


随着实时互动的发展，视频互动已经不局限于单一摄像头画面。屏幕共享画面、多路摄像头画面、趣味挂件、产品信息等已经成为越来越多的直播间或者用户需要展示的内容。

ZEGO 推出的本地导播插件，支持在本地对画面和声音进行混合，将多路音视频流或页面元素、合并为一路音视频流后推流，助力开发者实现更丰富的场景。

### 效果演示

<table>

<tbody><tr>
<th>在线教育/会议</th>
<th>电商直播</th>
<th>游戏直播</th>
</tr>
<tr>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/35da73d68d.png" /></Frame><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/19258ba8aa.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/953330e49e.png" /></Frame></td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/363fd4daa6.png" /></Frame></td>
</tr>
</tbody></table>

### 功能试用

<CardGroup cols={2}>
  <Card title="本地导播插件" href="https://zegoim.github.io/express-demo-web/src/Examples/Others/StreamCompositor/index.html">
  开始体验 >>
</Card>
</CardGroup>

### 适用场景

- 在线教育
- 在线会议
- 直播带货
- 游戏直播
- 秀场直播

### 兼容性说明

- 桌面端：支持 Chrome 94 或以上版本、Edge 94 或以上版本。**为了获得最佳体验，推荐您使用 Chrome 或 Edge 最新版本的浏览器。**
- 不推荐在移动端使用本地导播插件。


## 前提条件

在实现本地导播功能之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。


## 实现步骤

### 1 集成本地导播插件

开发者可通过以下任意一种方式集成`本地导播插件`。

#### 方式 1：使用 npm 方式集成

找到您项目目录下的 “index.js” 文件，添加如下代码，引入本地导播插件包。

```html
import { ZegoExpressEngine } from'zego-express-engine-webrtc';
import { StreamCompositor } from'zego-express-engine-webrtc/stream-compositor';

ZegoExpressEngine.use(StreamCompositor);
```

#### 方式 2：手动集成

在 [下载](https://doc-zh.zego.im/article/16028) 页面获取最新的包，解压后的文件中包含了本地导播插件包。找到您项目目录下的 “index.html” 文件，添加如下代码，手动集成本地导播插件包。

```javascript
<script src="./stream-compositor-XXX.js"></script>
<script src="./ZegoExpressWebRTC-XXX.js"></script>
<script>
        ZegoExpressEngine.use(StreamCompositor);
        ...
</script>
```

### 2 创建本地导播插件处理实例

创建并初始化一个 [ZegoExpressEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine) 实例，然后调用 [createStreamCompositor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream-compositor) 接口，创建本地导播插件处理实例。

```javascript
// 初始化实例，appID 及 server 请在控制台获取
const zg = new ZegoExpressEngine(appID, server);
const compositor = zg.createStreamCompositor();
```

### 3 创建本地数据流

调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，传入不同的参数，分别创建摄像头、屏幕共享的本地数据流。

```javascript
const cameraStream = await zg.createZegoStream();
const screenStream = await zg.createZegoStream({ screen: { video: true } });
```

### 4（可选）设置摄像头流背景透明

如果您想要将摄像头采集的人像外的视频流背景设置为透明，实现人像画中画、演讲者模式、以及沉浸式直播带货，则需要再引入 `背景处理模块`。

1. 联系 ZEGO 技术支持，开通相关权限。
2. 找到您项目目录下的 “index.js” 文件，添加如下代码，引入背景处理模块。

```javascript
import { BackgroundProcess } from'zego-express-engine-webrtc/background-process';
// 引用背景处理模块
ZegoExpressEngine.use(BackgroundProcess);
```

3. 调用 [setTransparentBackgroundOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-transparent-background-options) 接口，设置摄像头流采集的带人像画面背景的透明效果；再调用 [enableBackgroundProcess](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-background-process) 接口，开启背景处理。

```javascript
zg.setTransparentBackgroundOptions(cameraStream);
await zg.enableBackgroundProcess(cameraStream, true, 0);
```

### 5 设置输入流图层

调用 [setInputEndpoint](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#set-input-endpoint) 接口，设置输入流的布局效果、渲染模式、层级等。

```javascript
compositor.setInputEndpoint(screenStream, {
    layout: { x: 0, y: 0, width: 1280, height: 720, zOrder: 0 }
});

compositor.setInputEndpoint(cameraStream, {
    layout: { x: 0, y: 0, width: 320, height: 180, zOrder: 1 }
});
```

<Note title="说明">


图层参数 zOrder 的数值越大，图层越靠上。

</Note>




### 6 创建图片输入图层

调用 [addImage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#add-image) 接口，设置图片图层的位置。

```javascript
const img = document.getElementById("backImg");

compositor.addImage(img, {
    x: 0,
    y: 540,
    width: 320,
    height: 180,
    zOrder: 1
});
```

<Warning title="注意">


- 由于受浏览器安全策略影响，图片资源如果不在同一个域下，服务器需开启跨越访问权限。您需要设置 `HTMLImageElement` 的 `crossOrigin` 属性为 'anonymous'。
- 图片加载需要时间，您需要在图片加载完成（`onload` 事件）后，再调用 [addImage](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#add-image) 接口。

</Warning>



### 7 设置输出参数和布局

调用 [setOutputConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#set-output-config) 接口，设置输出流的宽、高、帧率等。

```javascript
const width = 1280, height = 720;

compositor.setOutputConfig({
    width: width,
    height: height,
    framerate: 15
});
```

### 8 开始混合媒体流

调用 [startComposingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#start-composing-stream) 接口，开始混合媒体流。

```javascript
// 输出视频流 mediaStream
const outputStream = await compositor.startComposingStream();
```

### 9 停止混合媒体流

调用 [stopComposingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoStreamCompositor#stop-composing-stream) 接口，停止混合媒体流；再调用 [destroyStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#destroy-stream) 销毁流数据，释放资源。

```javascript
await compositor.stopComposingStream();
zg.destroyStream(cameraStream);
zg.destroyStream(screenStream);
```

<Content />

