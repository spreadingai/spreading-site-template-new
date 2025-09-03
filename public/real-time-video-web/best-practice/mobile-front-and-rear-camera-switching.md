# 移动端前后摄像头切换

- - -

## 简介

开发者创建流成功后，可以通过 [useVideoDevice](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-video-device) 接口切换采集摄像头。但在 H5 上直接使用时，部分机型可能产生一些不符合预期的问题，例如黑屏、切换摄像头失败等。

本文介绍了 3 种在移动端切换前、后置摄像头的接口调用方式，请开发者根据自己当前所使用的 SDK 版本，选择相应的配置方式。

<Warning title="注意">


H5 的前/后置摄像头通过 facingMode 配置。

</Warning>



## 解决方案

### 方式一

<Note title="说明">


该方式仅支持在 3.2.0 及以上版本的 SDK 中使用。

</Note>



1. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建后置摄像头采集流 zegoLocalStream，用 zegoLocalStream 推流。
2. 调用 [useFrontCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#use-front-camera) 接口，切换为前置或后置摄像头。

```js
// 创建流使用后置摄像头
const localStream = await zg.createZegoStream({
    camera: {
        video: {
            facingMode: "environment" // 摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头
        }
    }
});
// 切换前置摄像头
await zg.useFrontCamera(localStream, true);
// 切换后置摄像头
await zg.useFrontCamera(localStream, false);
```

### 方式二

<Note title="说明">


该方式支持在 3.0.0 及以上的所有版本的 SDK 中使用。

</Note>



1. 调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建前置摄像头采集流 zegoLocalStream，用 zegoLocalStream 推流。

2. 调用 [stopCaptureVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#stop-capture-video) 接口，停止当前摄像头采集。

3. 调用 [startCaptureCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#start-capture-camera) 接口，切换为后置摄像头，重新开始采集。

4. 调用 [updatePublishingStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#update-publishing-stream) 接口，更新到推流中。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>switch h5 camera</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="./ZegoExpressWebRTC-3.0.0.js"></script>
    </head>
    <body>
        <button id="switchCamera">切换摄像头</button>
        <div id="localView"></div>
    </body>
    <script>
        (async ()=> {
            // 初始化信息，请传入从 ZEGO 控制台获取到的 AppID 和 Server 地址
            let appID = xxxxx;
            let server = 'xxxxxxx';
            // 初始化实例
            const zg = new ZegoExpressEngine(appID, server);
            zg.setDebugVerbose(false);
            let facingMode = 'user'; // 摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头

            const zegoLocalStream = await zg.createZegoStream({
                camera: { video: { facingMode } }
            });
            const $localView = document.querySelector('#localView');
            zegoLocalStream.playVideo($localView);

            document.querySelector('#switchCamera').addEventListener('click', async ()=> {
                facingMode = facingMode == 'user' ? 'environment': 'user'; // 摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头
                await zegoLocalStream.stopCaptureVideo(); // 停止当前摄像头采集
                await zegoLocalStream.startCaptureCamera({facingMode}); // 重新采集
                // 如果是调用 startPublishingStream 推流成功后，需要调用 updatePublishingStream 更新到推流上去
                await zg.updatePublishingStream(zegoLocalStream, 0);
            });
        })();

    </script>
</html>
```

### 方式三

<Note title="说明">


该方式支持在所有版本的 SDK 中使用。

</Note>



针对 H5 切换前、后置摄像头的场景，推荐使用置换视轨的方法实现。

1. 调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口，创建前置摄像头采集流 localStream，用 localStream 推流。

2. 切换为后置摄像头。
    
    1. 通过 `getVideoTracks` 获取 localStream 的 videoTrack，并通过 `stop` 方法停止这条视轨。

    请注意，部分机型设备（例如：荣耀 10）不支持同时使用 2 个摄像头，如果没有主动停止 videoTrack 视轨，会导致后置摄像头流创建失败。 
    
    2. 调用 [createStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-stream) 接口，创建后置摄像头采集流。

    3. 调用 [replaceTrack](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#replace-track) 接口，将 localStream 的视轨替换成后置摄像头视轨即可。


```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Zego Express Video Call</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="./js/ZegoExpressWebRTC-2.19.0.js"></script>
    </head>
    <body>
        <h1>Zego RTC Video Call</h1>
        <div class="video-wrapper">
            <button onclick="switchCamera()">切换摄像头</button>
            <video id="local-video" autoplay muted playsinline controls></video>
        </div>
    </body>
    <script>
        // 初始化信息，请传入从 ZEGO 控制台获取到的 AppID 和 Server 地址
        let appID = xxxxx;
        let server = 'xxxxxxx';

        let userID = 'Kline'; // userID 用户自己设置，必须保证全局唯一
        let userName = "克莱恩";// userName 用户自己设置，没有唯一性要求
        let roomID = "room01"; // roomID 用户自己设置，必须保证全局唯一

        let localStream = null;
        let isFrontendCamera = true; // 设置为 true，表示前置摄像头
        let streamConfig = {
            videoQuality: 2,
            video: true,
            audio: true,
        };
        // 初始化实例
        const zg = new ZegoExpressEngine(appID, server);
        zg.on('roomStateUpdate', async (roomID, state, errorCode, extendedData) => {
            if (state == 'CONNECTED') {
                localStream = await zg.createStream({
                    camera: {
                        facingMode: 'user', //摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头
                        ...streamConfig
                    }
                });
                const localVideo = document.getElementById('local-video');
                localVideo.srcObject = localStream;
                zg.startPublishingStream('h5switchCamera', localStream);
            }
        });

        // 加入房间
        fetch(`https://wsliveroom-alpha.zego.im:8282/token?app_id=${appID}&id_name=${userID}`)
            .then(rsp=> rsp.text())
            .then(token=> {
                zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true })
            });
        
        async function switchCamera() {
            // 停视轨
            localStream.getVideoTracks()[0].stop();
            let stream;
            if(isFrontendCamera) {// 切换到后置摄像头
                stream = await zg.createStream({
                    camera: {
                        facingMode: 'environment', // 摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头
                        ...streamConfig
                    }
                });
            } else {// 切换前置摄像头
                stream = await zg.createStream({
                    camera: {
                        facingMode: 'user', // 摄像头朝向，“user” 表示前置摄像头，“environment” 表示后置摄像头
                        ...streamConfig
                    }
                });
            }
            let videoTrack = stream.getVideoTracks()[0];
            let {errorCode, extendedData} = await zg.replaceTrack(localStream, videoTrack); // errorCode == 0 成功
            console.warn('switchCamera', {errorCode, extendedData});
            isFrontendCamera = !isFrontendCamera;
        }
    </script>
</html>
```
