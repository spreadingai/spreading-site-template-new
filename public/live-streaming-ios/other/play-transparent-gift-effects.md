# 播放透明礼物特效

- - -
## 功能简介

在语聊房和直播等场景中，礼物是主播与观众互动的重要环节。精致的礼物效果，可以增强互动感，提升观看体验。随着行业的蓬勃发展，礼物效果也从静态到动态、从不透明到透明逐步进化。

通过播放 MP4 的礼物视频来实现动态礼物效果，是比较常见的方式。由于 MP4 不支持 Alpha 通道，在全屏播放礼物特效时，会挡住直播间的内容，从而影响用户体验。因此 ZEGO Express SDK 媒体播放器提供透明渲染能力，可以实现播放透明动态礼物的功能。

ZEGO Express SDK 媒体播放器提供 RGB 通道与 Alpha 通道分离播放 MP4 素材（RGB 与 Alpha 拼接后的 MP4 素材）的功能，实现播放透明礼物的动态效果，即播放礼物特效时，不会挡住直播间内容，大大提升用户体验。

<video poster="https://doc-media.zego.im/sdk-doc/Pics/Express/gift_special_effects.png" src="https://doc-media.zego.im/sdk-doc/doc/video/Express_Video_SDK/gift_special_effects.mp4" width="70%" muted="true" loop="true" autoplay="autoplay" preload="auto" nocontrols></video>

### 功能优势

- **开发成本低**

    开发者不需要学习复杂的动画实现方案，只需要使用设计师处理好的素材，即可实现播放透明礼物特效，提升开发效率和效果。

- **动画还原度高**

    帮助设计师实现输出素材所见即所得，即设计师在设计动效时，无需担心开发人员使用的技术栈能否还原动效复杂的 3D 效果、描边、粒子效果等。

- **兼容性好**

    规避 Lottie、Cocos2d-X 等半透明动效实现方式复杂、性能不高，以及部分机型的兼容问题较大、后期维护难度较高的问题。

### 实现原理

如下图所示，图中上半部分为一段进行了 Alpha 通道分离的素材的部分像素点，左侧使用 RGB 通道存储了礼物素材的 RGB 通道的信息，右侧使用 RGB 通道存储了礼物素材的 Alpha 通道的信息。

客户端播放时，会将右侧的视频的 R 通道提取出来，作为左侧对应像素点的 Alpha 通道的值。

渲染时，将 Alpha 通道的值除以 255，进行归一化处理，得到 0 ~ 1 之间的 Alpha 取值，最后根据 RGBA 值将每个像素点渲染到屏幕上，实现半透明效果。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RGBtoRGBA.jpeg" /></Frame>


## 示例源码


请参考 [下载示例源码](https://doc-zh.zego.im/article/13411) 获取源码。

相关源码请查看 “/ZegoExpressExample/Examples/Others/MediaPlayer” 目录下的文件。


## 前提条件

在使用媒体播放器播放 MP4 动态效果，即实现播放透明礼物特效之前，请确保：

- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/13413) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/13415)。




## 实现流程

### 1 输出素材

以在 AE 软件中输出素材为例。

1. 在 AE 中正常制作带透明效果的视频，并分别输出 RGB 及 Alpha 通道视频。
    - 输出 RGB 通道的视频。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/output_RGB.jpeg" /></Frame>
    - 输出 Alpha 通道的视频。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/output_Alpha.jpeg" /></Frame>


2. 在 AE 中，将输出的 RGB 及 Alpha 通道视频拼接为一个视频。

    ZEGO 媒体播放器支持以下四种拼接方式，拼接出的视频越接近正方形，性能越好。开发者可以根据源素材的比例，选择合适的拼接方式：
    - Alpha 通道在下方。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RGB_up_Alpha.jpeg" /></Frame>
    - Alpha 通道在左侧。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Alpha_RGB.jpeg" /></Frame>
    - Alpha 通道在右侧。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RGB_Alpha.jpeg" /></Frame>
    - Alpha 通道在右上方，Alpha 通道仅支持 0.5x 的缩放倍率。
        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/RGB_Alpharighttop.jpeg" /></Frame>



### 2 对 view 进行特殊设置

在播放透明礼物特效前，需要设置用于播放器渲染透明特效的 view，即调用 [setBackgroundColor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMixerTask#set-background-color) 将 `backgroundColor` 属性设置为 `clearColor`。

```oc
@property (weak, nonatomic) IBOutlet UIView *mediaPlayerView;
[self.mediaPlayerView setBackgroundColor:UIColor.clearColor];
```

### 3 创建媒体播放器

调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 创建媒体播放器。调用 [setPlayerCanvas](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#set-player-canvas) 设置播放器 canvas 的 `alphaBlend` 属性为 `YES`。

```oc
ZegoCanvas *canvas = [ZegoCanvas canvasWithView:self.mediaPlayerView];
canvas.alphaBlend = YES;//支持 Alpha 通道渲染
[self.mediaPlayer setPlayerCanvas:canvas];
```

### 4 加载素材

调用 [createMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoExpressEngine#create-media-player) 创建媒体播放器后，通过 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-with-config-callback) 接口，通过**文件路径**或**二进制内存数据**，播放拼接后的特效素材。

<Warning title="注意">
虽然 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-with-config-callback) 接口支持通过版权音乐资源 ID 加载多媒体资源，但是版权音乐目前不支持视频，因此无法通过版权音乐资源 ID 加载方式来加载礼物特效。
</Warning>


<CodeGroup>
```objc 通过文件路径加载
  ZegoMediaPlayerResource *resource = [[ZegoMediaPlayerResource alloc]init];
  resource.loadType = ZegoMultimediaLoadTypeFilePath;//加载方式选择文件路径加载
  resource.filePath = @"fileURL";//文件路径
  resource.alphaLayout = ZegoAlphaLayoutTypeLeft;//根据实际资源选择 Alpha 通道布局
  [self.mediaPlayer loadResourceWithConfig:resource callback:^(int errorCode) {
      //资源加载结果
      // 可执行更新 UI 等逻辑
      if (errorCode == 0) {
          //加载文件成功，此时可以开始播放媒体资源
          [self.mediaPlayer start];
      }
  }];
  ```

```objc 通过二进制内存数据加载
  ZegoMediaPlayerResource *resource = [[ZegoMediaPlayerResource alloc]init];
  resource.loadType = ZegoMultimediaLoadTypeMemory;//加载方式选择二进制内存数据加载
  resource.memory = [NSData dataWithContentsOfFile:@"fileURL"];//资源文件
  resource.memoryLength = (int)[resource.memory length];//资源文件长度
  resource.alphaLayout = ZegoAlphaLayoutTypeLeft;//根据实际资源选择 Alpha 通道布局
  [self.mediaPlayer loadResourceWithConfig:resource callback:^(int errorCode) {
      //资源加载结果
      // 可执行更新 UI 等逻辑
      if (errorCode == 0) {
          //加载文件成功，此时可以开始播放媒体资源
          [self.mediaPlayer start];
      }
  }];
  ```
</CodeGroup>

### 5 播放素材

在调用 [loadResourceWithConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#load-resource-with-config-callback) 加载文件成功后，可调用 [start](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#start)、[pause](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#pause)、[resume](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#resume)、[stop](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#stop) 来启停播放。一旦播放器的内部状态改变，[ZegoMediaPlayer](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer) 的 [stateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~protocol~ZegoMediaPlayerEventHandler) 回调将会被触发。

用户也可通过调用 [currentState](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#current-state) 随时获取播放器的当前状态。

如果 [enableRepeat](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~objective-c_ios~class~ZegoMediaPlayer#enable-repeat) 设置为 `YES`，则播放器会在播放完文件后自动重播。

```objc
// 开始播放，播放之前需要先调用接口加载媒体文件
[self.mediaPlayer start];
// 暂停
[self.mediaPlayer pause];
// 恢复
[self.mediaPlayer resume];
// 停止
[self.mediaPlayer stop];
```

<Content />

