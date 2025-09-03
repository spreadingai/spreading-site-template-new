# 视频画面旋转

- - -

## 功能简介

用户使用移动设备进行直播或视频通话时，可以采用不同的视频采集方向，ZegoExpress SDK 支持采集视频的方式如下：

<Note title="说明">


以下示例中“拉流端”渲染画面的模式以默认的 “AspectFit”（等比缩放，可能有黑边）方式，具体请参考 [ZegoViewMode](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/enums/_zegoexpressdefines_.zegoviewmode.html)。

</Note>




#### 固定竖屏

表示推流端固定采集以竖屏方式展示的视频，此时当对端设备方向为竖屏时，观看到的画面为充满设备屏幕的竖屏效果。当对端设备方向为横屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- UI 锁定时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen.png" /></Frame>

- UI 不锁定时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_portrait_screen_noUI.png" /></Frame>

#### 固定横屏

表示推流端固定采集以横屏方式展示的视频，此时当对端设备方向为横屏时，观看到的画面为充满设备屏幕的横屏效果。当对端设备方向为竖屏时，观看到的画面为相对推流端图像有一定旋转角度的效果（下图以逆时针旋转 90 度为例）。

- UI 锁定时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen.png" /></Frame>

- UI 不锁定时：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Fixed_horizontal_screen_noUI.png" /></Frame>

#### 横竖屏切换

提供视频旋转功能，用户可以根据需要将视频相比于手机正立的方向逆时针旋转 90，180 或 270 度。便于用户结合视频场景需要，获取想要的视频渲染效果。视频旋转后会自动进行调整，以适配编码后的图像分辨率。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_01.png" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/Video-rotation/Switch_between_horizontal_and_portrait_02.png" /></Frame>

以上三种方式调用的接口存在差异，详细描述请参考本文的 [使用步骤](https://doc-zh.zego.im/article/21019#3)。


## 前提条件

在实现视频采集旋转之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/21002) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/21003)。



## 使用步骤

### 固定竖屏

使用竖屏直播或视频通话时，宽的分辨率应比高的分辨率小，假设为 “360 × 640”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#CreateEngine) 的 “创建引擎”。

```javascript
//  使用从 ZEGO 控制台申请到的 appID 用于初始化
const profile = {
appID : xxx,
appSign: '39011cbxxxxxxxxxxxx',
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

2. （可选）调用 [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口设置编码分辨率，默认值为 “360 × 640”, 可以根据需要调整，若保持默认值则跳过此步骤。

竖屏直播的分辨率设置如下：

```javascript
let config = new ZegoVideoConfig();
config.encodeWidth = 360;
config.encodeHeight = 640;
ZegoExpressEngine.instance().setVideoConfig(config);
```

3. 调用 [loginRoom](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#loginRoom) 的 “登录房间”。

```javascript
ZegoExpressEngine.instance().loginRoom("test_roomid", {
    userID:"test_userid",
    userName: "test_username"
});
```

4. 在 `render` 函数中使用 `<ZegoTextureView ref='zego_preview_view' style={{height: 200}}/>` 设置本地视图，调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口启动本地预览，用于显示本地画面。

```javascript
render() {
    return (
    ...
    <View style={{height: 200}}>
        <ZegoTextureView ref='zego_preview_view' style={{height: 200}} />
    </View>
    ...
    );
}

componentDidMount() {
    ...
    ZegoExpressEngine.instance().startPreview({"reactTag": findNodeHandle(this.refs.zego_preview_view), "viewMode": ZegoViewMode.AspectFit, "backgroundColor": 0});
    ...
}
```

5. 调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#publishingStream) 的 “推流”。

```javascript
ZegoExpressEngine.instance().startPublishingStream("test_streamid");
```

6. 使用固定的竖屏方式进行直播或视频通话。


### 固定横屏

使用横屏直播或视频通话时，宽的分辨率应比高的分辨率大，假设为 “640 × 360”，则需要通过如下步骤实现功能。

1. 调用 [createEngine ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#createengine) 接口创建 SDK 引擎实例，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#CreateEngine) 的 “创建引擎”。

```javascript
//  使用从 ZEGO 控制台申请到的 appID 用于初始化
const profile = {
appID : xxx,
appSign: '39011cbxxxxxxxxxxxxxxxxxx',
scenario : 0
};

ZegoExpressEngine.createEngineWithProfile(profile)
```

2. 调用 [setVideoConfig ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setvideoconfig) 接口设置编码分辨率为 “640 × 360”。

```javascript
let config = new ZegoVideoConfig();
config.encodeWidth = 640;
config.encodeHeight = 360;
```

横屏直播的分辨率设置如下：

```javascript
let config = new ZegoVideoConfig();
config.encodeWidth = 640;
config.encodeHeight = 360;
ZegoExpressEngine.instance().setVideoConfig(config);
```

3. 调用 [setAppOrientation ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#setapporientation) 接口设置视频的朝向，若逆时针旋转 90 度，则如下接口传参为 ZegoOrientation.LandscapeLeft。若顺时针旋转 90 度，则传参为 ZegoOrientation.LandscapeRight。

```javascript
ZegoExpressEngine.instance().setAppOrientation(ZegoOrientation.LandscapeLeft);
```

4. 调用 [loginRoom ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#loginroom) 接口登录房间，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#loginRoom) 的 “登录房间”。

```javascript
ZegoExpressEngine.instance().loginRoom("test_roomid", {
    userID:"test_userid",
    userName: "test_username"
});
```

5. 在 `render` 函数中使用 `<ZegoTextureView ref='zego_preview_view' style={{height: 200}}/>` 设置本地视图，调用 [startPreview ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpreview) 接口启动本地预览，用于显示本地画面。

```javascript
render() {
    return (
    ...
    <View style={{height: 200}}>
        <ZegoTextureView ref='zego_preview_view' style={{height: 200}} />
    </View>
    ...
    );
}

componentDidMount() {
    ...
    ZegoExpressEngine.instance().startPreview({"reactTag": findNodeHandle(this.refs.zego_preview_view), "viewMode": ZegoViewMode.AspectFit, "backgroundColor": 0});
    ...
}
```

6. 调用 [startPublishingStream ](https://doc-zh.zego.im/unique-api/express-video-sdk/zh/javascript_react-native/classes/_zegoexpressengine_.zegoexpressengine.html#startpublishingstream) 接口开始推流，将本地的音视频流推送到实时音视频云，详情请参考 [快速开始 - 实现视频通话](https://doc-zh.zego.im/article/21003#publishingStream) 的 “推流”。

```javascript
ZegoExpressEngine.instance().startPublishingStream("test_streamid");
```

7. 使用固定的横屏方式进行直播或视频通话。


## 常见问题

1. **为什么录制出来的直播流好像看不了？**

    由于横竖屏切换时，流的编码分辨率被修改，部分第三方播放器对分辨率修改的视频兼容性不好，可能会出现播放失败的问题，因此一般不推荐在直播或视频过程中进行横竖屏切换时修改分辨率。

<Content />

