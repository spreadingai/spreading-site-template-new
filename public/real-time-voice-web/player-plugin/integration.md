# 接入指引

- - -

## 下载资源

ZEGO 播放器插件，由深圳市即构科技有限公司提供，您可以在本页面获取适用于 Web 平台的播放器插件资源，当前可下载版本为 1.5.0，发布日志请参考 [播放器插件 - 发布日志](https://doc-zh.zego.im/article/18461)，合规事宜请参考 [ZEGO 安全合规白皮书](/policies-and-agreements/zego-security-and-compliance-white-paper)。

<CardGroup cols={2}>
<Card title="播放器插件 1.5.0" href="https://webrepo.zego.im/webplatform/ZegoExpressPlayer.zip">
本地下载
</Card>
<Card title="功能体验"  href="https://zegoim.github.io/express-demo-web/src/Examples/AdvancedStreaming/StreamByCDN/index.html" target="_blank">
前往体验
</Card>
</CardGroup>
<Warning title="注意">
- 播放器插件当前为 Beta 公测阶段，仅支持 Web 平台使用。如果您有相关的问题或业务需求，请联系 ZEGO 技术支持咨询。
- 播放器插件必须搭配 Express SDK 3.0.0 或以上版本使用。
</Warning>

## 前提条件

在开始集成播放器插件前，请确保满足以下要求：

- 已在项目中集成 ZEGO Express SDK，详情请参考 [快速开始 - 集成](/real-time-video-web/quick-start/integrating-sdk)。
- 已生成推流转推的 CDN 地址，详情请参考 [使用 CDN 直播](/real-time-video-web/live-streaming/using-cdn-for-live-streaming)。

## 集成指引

### 注意事项

- 播放器插件包的所有文件，都需要部署在静态服务器中。在 HTML 中使用 \<script> 标签引入文件 `ZegoExpressPlayer-1.3.0.js`（版本号可根据实际下载的包体内的版本变更），该 JS 文件会在 \<script> 标签加载后请求相关的资源依赖。

- 播放器插件实例依赖并控制页面中指定的容器 \<div> 标签，播放媒体资源画面，因此需要在页面中添加一个空的 \<div> 标签作为容器，并交给播放器插件进行控制，以确保媒体资源的正常播放。

- 目前播放器插件仅支持 \<script> 标签引入的方式集成，暂不支持 npm 的方式集成。

    如果您的业务项目使用 npm 集成，在集成播放器插件的过程中，需要在 npm 打包时，确保 `package.json` 配置 "homepage" 为当前目录下，保证播放器请求资源文件的相对路径是正确的。如果您还没有配置，请在 `package.json` 中加入配置选项：

    ```json
    {
        "homepage" : ".",
        ...
    }
    ```

### 集成过程示例

下文详述了集成播放器插件的流程。

#### 创建测试项目文件

1. 在本地新建文件夹 “zego-express-player-demo”；
2. 在 [下载](/real-time-video-web/client-sdk/download-sdk) 页面获取最新的 Express SDK 的 JS 集成包（**必须是 3.0.0 或以上版本**）；
3. 在 [本页面](https://doc-zh.zego.im/article/18463#1) 开头获取最新的播放器插件包。解压后的目录中所有文件都需要用到，需要在服务器上放在同一个目录下，并且不能与页面地址跨域部署。

新建目录结构如下：

```txt
测试项目根目录
- zego-express-player-demo
    |--- zego-express-engine-webrtc   # 该目录下放置 Web Express SDK 的 JS 集成包（SDK 版本 >= 3.0.0）
        |--- ...
        |--- ZegoExpressWebRTC-3.0.0.js
    |--- zego-express-player  # 该目录下放置下载的播放器插件包内容所有文件
        |--- ...
        |--- ZegoExpressPlayer-1.3.0.js
    |--- demo.html
```

#### 引入 Express SDK 和播放器插件

1. 在 demo.html 文件中，使用 \<script> 标签引入 Express SDK（**必须是 3.0.0 或以上版本**）和播放器插件的包。
2. 同时，创建一个 id 名称为 "player-container"（id 可修改）的、空的 \<div> 标签，作为播放器容器，并配置容器的宽、高。

    **播放器组件容器相关配置说明：**

    - zg-width，播放器组件的宽度，非必选。如果只设置了宽度，渲染组件的 **高度** 将会按照视频比例等比例缩放。
    - zg-height，播放器组件的高度，非必选。如果只设置了高度，渲染组件的 **宽度** 将会按照视频比例等比例缩放。
    - 如果两者都未设置，渲染组件会直接按照视频分辨率展示。

```html
...
<body>
    ...
    <div id="player-container" zg-width="640" zg-height="360"></div>
    ...
    <script src="./zego-express-engine-webrtc/ZegoExpressWebRTC-3.0.0.js"></script>
    <script src="./zego-express-player/ZegoExpressPlayer-1.3.0.js"></script>
</body>
</html>
```


#### 实例化播放器插件并鉴权

1. 在 \<script> 标签引入播放器插件包后，会在当前运行环境的全局对象上挂载 ZegoExpressPlayer 的原型，您可以在 JS 文件中实例化播放器插件。
2. 对播放器进行初始化，鉴权，否则无法继续使用播放器的其他接口。

<Warning title="注意">


- 如果您已通过 Express Web SDK 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口成功登录房间，此处无需再对播放器插件进行鉴权。
- 如果您没有使用 Express Web SDK 的 [loginRoom](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#login-room) 接口登录房间，此处必须对播放器插件进行鉴权，Token 的获取方式请参考 [使用 Token 鉴权](https://doc-zh.zego.im/article/14049)。

</Warning>



```js
...
const zg = new ZegoExpressEngine(...);

const player = new ZegoExpressPlayer(zg, {
  container: document.getElementById("player-container"),
  mode: "live"
});
...
const res = await player.verify(token, userID); // 播放器鉴权，返回 true / false，分别代表鉴权成功和鉴权失败。
```


#### 使用播放器插件请求资源，开始播放

调用播放器实例接口，可控制播放器状态、并接收播放器的回调通知。您可通过设置 URL 地址，拉取 CDN 直播流进行播放。

<Warning title="注意">


目前该播放器插件仅支持播放 FLV 协议。

</Warning>



```js
player.onError = (err) => {
    console.error(err);
    if (err.code === 100006) {
        // 自动播放失败处理，如果需要开屏自动播放可能会受浏览器限制触发该错误，引导用户点击后调 player.play();
    }
}
player.src = "http://xxxx/livestream/stream.flv"; // 目前只支持 http-flv 格式的资源
player.play();
...
```

#### 更多功能

播放器插件还支持：暂停或中断请求资源、全屏显示、拉流时 SEI 回调、媒体信息回调等功能。更多功能说明，请参考 [ZegoExpressPlayer](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressPlayer) 的 API 接口文档说明。


### 完整示例代码

我们提供了一个完整的播放器插件集成示例代码，可作为开发过程中的参考。

<Accordion title="集成播放器插件的完整示例代码" defaultOpen="true">
使用静态服务如 'http-server' 等，打开 demo 进行测试，不能从浏览器中直接打开文件 demo.html。

以下是 demo.html 文件的示例代码：

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zego Express Player Demo</title>
    <style>
        #modal {
          display: none;
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }

        #modal-content {
          background-color: #fff;
          width: 300px;
          padding: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        #modal-buttons {
          text-align: center;
        }
      </style>
</head>
<body>
    <div id="player-container" zg-width="640"></div>

    <button id="load-play-btn">加载资源播放</button>

    <div id="modal">
        <div id="modal-content">
            <p>自动播放失败，您点击确认后视频将继续播放</p>
                <div id="modal-buttons">
                    <button id="confirm-btn">确认</button>
                </div>
        </div>
    </div>

    <script src="./zego-express-engine-webrtc/ZegoExpressWebRTC-3.0.0.js"></script>
    <script src="./zego-express-player/ZegoExpressPlayer-1.3.0.js"></script>
    <script>
        function closeModal() {
            var modal = document.getElementById('modal');
            modal.style.display = 'none';
        }

        function openModal() {
            closeModal();
            var modal = document.getElementById('modal');
            modal.style.display = 'block';
        }

        window.onload = async () => {
            // 本测试DEMO，需要您配置好以下参数才能使用：
            const   appID = 0,
                    server = "",
                    userID = "",
                    token = "";

            const zg = new ZegoExpressEngine(appID, server);

            try {
                const player = new ZegoExpressPlayer(zg, {
                    container: document.getElementById("player-container"),
                    mode: "live"
                });

                const res = await player.verify(token, userID); // 注意：这里鉴权接口是异步的，需要等待异步鉴权完成后才可以继续调用播放器的接口。

                if (!res) {
                    console.error("播放器鉴权失败！");
                }

                document.getElementById("confirm-btn").onclick = ()=>{
                    player.play();
                    closeModal();
                }

                player.onError = (err) => {
                    console.error(err);
                    if (err.code === 100006) {
                        // 自动播放失败处理，引导用户点击后调 player.play();
                        openModal();
                    }
                }

                player.onWaiting = () => {
                    console.warn("media waiting..");
                }

                player.onPlaying = () => {
                    console.warn("media playing..");
                }

                player.onEnded = () => {
                    console.warn("meida play ended.");
                }

                player.onCanPlay = () => {
                    console.warn("meida play can play.");
                }

                player.onPlay = () => {
                    console.warn("meida played.");
                }

                player.onPaused = () => {
                    console.warn("meida paused.");
                }

                player.onLoaded = () => {
                    console.warn("meida loaded.");
                }

                player.onTimeUpdate = () => {
                    // console.warn("currentTime: ", player.currentTime);
                }

                player.onMediaInfoUpdate = (mediainfo) => {
                    console.warn("media info update: ", JSON.stringify(mediainfo, null, 2));
                }

                player.onRecvSEI = (data) => {
                  console.warn(data);
                }

                document.addEventListener("click", () => {
                    player.src = "";
                    player.play();
                });
            } catch (err) {
                console.error(err);
            }

        }
    </script>
</body>
</html>
```
</Accordion>

<Content />

