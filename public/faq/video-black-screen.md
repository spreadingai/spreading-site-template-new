<Title>Express 怎么处理视频黑屏问题？</Title>



- - -

## 问题描述


常见的视频黑屏有以下三种情况：

1. 本地预览视频黑屏，拉流视频正常。
2. 本地预览视频正常，拉流视频黑屏。
3. 本地预览拉流视频都黑屏。


## 问题原因

出现黑屏的原因有很多，常见原因有：

* 网络问题：如果本地网络连接很差或者中断，就会看不到其他用户的视频。如果通话中有一方的网络出现问题，其他人也看不到这个用户的视频。
* 渲染问题：渲染视图设置不正确或者生命周期异常也会导致黑屏。
* 另外，如果用户主动关闭视频，也会出现黑屏，包括但不限于没有权限、主动禁用、切后台等情况。



## 解决方案


如果存在视频黑屏问题，您可以参考如下操作步骤进行处理。


### 问题排查

<Note title="说明">



在排查过程中，您可以通过设备错误回调 [onDeviceError](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-device-error) 来协助判断问题。

</Note>





#### 本地预览视频黑屏，拉流视频正常

这种情况一般是摄像头故障或者被占用等原因导致本地视频采集出现问题，请参考以下步骤排查：

* 从 [onPublisherQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-publisher-quality-update) 回调中检查推流质量参数，查看采集帧率、渲染帧率是否正常。
* 如果采集帧率为零，请检查用户是否禁用本地视频。比如调用 [enableCamera](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#enable-camera)，或者设置错误的采集/编码分辨率。
* 如果上述配置正常，可能为摄像头硬件问题。打开系统自带的拍摄视频程序看是否可以录像，如果不行，需要更换摄像头。
* 如果摄像头没有问题，需要确认是否开启摄像头权限。Android 和 iOS 系统都有权限管理，请在系统设置中检查。
    * 开通 Android 权限请参考 [实时音视频 - 集成](/real-time-video-android-java/quick-start/integrating-sdk) 中的 “设置权限”，添加项目权限、获取设备权限。
    * 开通 iOS 权限请参考 [实时音视频 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk) 中的 “设置权限”，添加媒体设备权限。
* 检查是否有其他应用占据摄像头。关闭其他应用然后打开自己的应用进行测试。Windows 平台请检查是否有虚拟摄像头占用物理摄像头。
* 如果采集帧率不为零，渲染帧率为零，请参考第三种情况“本地预览拉流视频都黑屏”中的步骤进行排查。
* 如果是自定义视频采集，需要确认自定义视频采集数据是否有问题，请注意时间戳的单位。



#### 本地预览视频正常，拉流视频黑屏

这种情况可能是远端采集/推流问题或者本地下行网络原因导致，请参考以下步骤排查：

* 检查用户是否禁用拉取远端视频，即调用 [mutePlayStreamVideo](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#mute-play-stream-video)。
* 如果没有禁用拉取远端视频，从 [onPlayerQualityUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-player-quality-update) 回调中检查拉流质量参数，查看网络帧率、解码帧率、渲染帧率是否正常。
* 如果网络帧率为零，建议更换网络查看是否还存在问题来排除网络原因，同时从 [onRemoteCameraStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-remote-camera-state-update) 回调检查远端视频摄像头状态。
* 如果远端视频摄像头状态正常，检查远端用户能否在自己的设备上看到自己的画面。如果看不到，则是远端用户的视频问题。请参考第一种情况“本地视频黑屏，远端视频正常”中的步骤来进行排查。
* 如果网络帧率不为零，渲染帧率为零，请参考第三种情况“本地预览拉流视频都黑屏”中的步骤进行排查。


#### 本地预览拉流视频都黑屏

这种情况可能是渲染出现问题或者没有启用视频，请参考以下步骤排查：

* 检查是否有禁用本地摄像头及禁用拉取远端视频。
* 如果是自定义视频渲染，需要排查渲染模块。
* 检查是否使用纯音频 SDK，而没有使用视频 SDK。
* 检查本地预览和拉流渲染视图是否设置正确。比如视图的宽高是否均不为 0，视图生命周期是否正常，视图是否被其他黑色视图覆盖。



### 使用星图监控质量

您可以使用 [ZEGO管理控制台](https://console.zego.im/) 中的 [星图](https://console.zego.im)，对音视频通话的质量进行跟踪。

### 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。


<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td>必要信息</td>
    <td>出现黑屏时相关的用户信息：用户 ID（userID）和流 ID（streamID）。</td>
  </tr>
  <tr>
    <td rowspan="2">可选信息</td>
    <td>出现黑屏的具体时间段。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="http://doc-zh.zego.im/faq/express_sdkLog?product=ExpressVideo&platform=all">Express 如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
