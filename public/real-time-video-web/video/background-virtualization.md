# 背景虚化及虚拟背景

- - -

## 功能简介

背景虚化及虚拟背景功能可以将视频画面中的主体从原始画面中分离出来，并对主体外的区域做如下处理：
- 虚化主体外的区域
- 以自定义图片替换主体外的区域

背景虚化及虚拟背景功能广泛适用于如下场景：
- 在线会议
- 远程教育
- 视频通话

使用背景虚化及虚拟背景功能有助于：
- 保护个人隐私
- 避免杂乱背景对观众造成干扰
- 提升互动的趣味性

### 效果展示

<table>

<tbody><tr>
<th>功能</th>
<th>效果</th>
</tr>
<tr>
<td>背景虚化-弱</td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/b669d10113.png" /></Frame></td>
</tr>
<tr>
<td>背景虚化-中</td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/6364d2bc42.png" /></Frame></td>
</tr>
<tr>
<td>背景虚化-强</td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/c624f44d28.png" /></Frame></td>
</tr>
<tr>
<td>虚拟背景</td>
<td><Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/de1e9cf26f.png" /></Frame></td>
</tr>
</tbody></table>


如需体验实际效果，请前往 [背景虚化及虚拟背景示例 Demo](https://zegoim.github.io/express-demo-web/src/Examples/DebugAndConfig/InitSettings/index.html?lang=zh) 中进行体验。


### 兼容性

支持背景虚化及虚拟背景功能的浏览器如下表：

| 浏览器 | 兼容版本 |
|  ----  | ----  |
|Google Chrome	| 90 及以上|
|Firefox | 111 及以上|
|Safari | 15 及以上 |
|移动端浏览器| 不支持 |
|微信内嵌网页| 不支持 |

### 注意事项

- 背景虚化及虚拟背景功能对设备性能有较高要求，建议在满足以下条件的设备上开启虚拟背景功能：
    - 配备 Core i5 或以上 CPU。
    - 配备 8GB 或以上 RAM。
- 为了更好地使用背景虚化及虚拟背景功能，推荐使用最新版桌面端 Google Chrome 浏览器。
- 背景虚化及虚拟背景功能付费功能，如需申请体验或咨询正式收费标准，请联系 ZEGO 商务人员。

## 示例源码

请参考 [下载示例源码](https://doc-zh.zego.im/article/3211) 获取源码。

相关源码请查看 “src/Examples/Others/VirtualBackground” 目录下的文件。

## 前提条件

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 Server 地址，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/199) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7638)。
- 如需使用该功能，请联系 ZEGO 技术支持。


## 实现流程

1. 集成背景处理模块。

    - 方式 1：使用 npm 方式集成

    ```javascript
    import { ZegoExpressEngine } from'zego-express-engine-webrtc';
    import { BackgroundProcess } from'zego-express-engine-webrtc/background-process';
    // 引用背景处理模块
    ZegoExpressEngine.use(BackgroundProcess);
    ```

    - 方式 2：在官网 [下载 SDK 包](https://doc-zh.zego.im/article/3209)，手动集成。
    ```javascript
    <script src="./background-process-XXX.js"></script>
    <script src="./ZegoExpressWebRTC-XXX.js"></script>
    <script>
            ZegoExpressEngine.use(BackgroundProcess);
            ...
    </script>
    ```

2. 动态加载背景虚化及虚拟背景依赖的 wasm 等资源文件。

    将 [示例源码](https://doc-zh.zego.im/article/3211) 中 `zego-express-engine-webrtc/background-process/assets` 目录下的所有资源文件，发布至 CDN 或者静态资源服务器中，且需发布至同一资源目录下，并生成 URL。

<Warning title="注意">


    - 由于浏览器安全策略，需将资源文件放在 HTTPS 服务下。
    - 若资源文件的 Host URL 与网页应用的 Host URL 不同，则需开启文件域名的 CORS 策略。

</Warning>



3. 初始化背景处理模块，并传入上述步骤 2 中资源文件的 URL，SDK 会动态加载依赖的文件。

    ```javascript
    // 初始化实例，appID 及 server 请在控制台获取
    const zg = new ZegoExpressEngine(appID, server);
    try {
       // 第二个参数传入步骤 2 中的 wasm 等资源文件所在的 URL 路径
       await zg.initBackgroundModule(0, "../assets");
    } catch (err) {
       // 控制台打印初始化背景处理模块错误
       console.error(err);
    }
    ```

4. 创建本地数据流 [createZegoStream](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#create-zego-stream) 后，设置使用背景虚化或虚拟背景，并设置相关参数。

    - 使用背景虚化效果

        调用 [setBackgroundBlurOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-background-blur-options) 接口设置背景虚化效果。
        ```javascript
        const stream = await zg.createZegoStream();
        zg.setBackgroundBlurOptions(stream, {
            blurDegree: 1  // 虚化等级 1、2、3，等级越大，虚化程度越高
        });
        ```

    - 使用虚拟背景效果

        调用 [setVirtualBackgroundOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-virtual-background-options) 接口设置虚拟背景效果。

<Warning title="注意">


        - 由于受浏览器安全策略影响，图片资源如果不在同一个域下，服务器需开启跨越访问权限，且设置 `HTMLImageElement` 的 `crossOrigin` 属性为 'anonymous'。
        - 图片加载需要时间，需要在图片加载完成后，调用 [setVirtualBackgroundOptions](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#set-virtual-background-options)，即在 `onload` 事件中调用。

</Warning>



        ```javascript
        const stream = await zg.createZegoStream();
        // source 为背景图片的 HTMLImageElement
        // objectFit 为虚拟背景填充方式：'contain', 'cover', 'fill'
        zg.setVirtualBackgroundOptions(stream, {
            source: img,
            objectFit: 'fill'
        });
        ```
    |内容自适应方式|说明|
    |---|---|
    |fill|不保证保持原有的比例，图片会被拉伸以填充整个容器。|
    |contain| 保持原有尺寸比例，图片会被缩放。|
    |cover| 保持原有尺寸比例，尽可能充满容器，但部分内容可能被剪切。|



5. 调用 [enableBackgroundProcess](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-background-process) 接口，并将 `enable` 设置为 `true`，即可开启背景虚化及虚拟背景功能。

    ```javascript
    // enable 传入 true 则为开启虚拟背景，false 则为关闭
    zg.enableBackgroundProcess(stream, true, 0);
    ```

6. 调用 [enableBackgroundProcess](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~javascript_web~class~ZegoExpressEngine#enable-background-process) ，并将 `enable` 设置为 `false`，即可关闭背景虚化及虚拟背景功能。

    ```javascript
    // enable 传入 true 则为开启虚拟背景，false 则为关闭
    zg.enableBackgroundProcess(stream, false, 0);
    ```
