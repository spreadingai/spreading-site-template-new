# 使用 uni-app 在浏览器渲染和播放（Web）

---

## 应用场景

在使用 ZEGO Web SDK 时，调用 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 接口，创建 [ZegoLocalStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream) 实例对象 `localStream`，再调用 [playVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoLocalStream#play-video) 接口播放预览视频。   



## 使用步骤

1. 创建标签。

    ```html
    <view id="localVideo" ></view>
    ```

2. 创建流并播放预览。

    ```javascript
    const localVideo = document.querySelector("#localVideo");

    const localStream = this.zg
      .createZegoStream({
        camera: { video: true, audio: true },
      })
      .then((stream) => {
        stream.playVideo(localVideo);
      })
      .catch((err) => {
        console.error(err);
      });
    ```
