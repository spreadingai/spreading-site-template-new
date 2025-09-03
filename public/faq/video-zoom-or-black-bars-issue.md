<Title>怎么处理视频放大或黑边问题？</Title>



- - -

视频放大和黑边主要是因为视频分辨率与显示视图尺寸不一致，造成的视频画面问题。您可以参考如下操作步骤进行处理。


## 问题排查

常见的放大和黑边有以下几种情况：

* 如果手机摄像头正朝向和编码分辨率不一致，会在编码前发生裁剪导致视频放大。比如手机屏幕朝向为竖屏，编码分辨率选择横屏，或者手机屏幕朝向为横屏，编码分辨率选择竖屏，都会有明显的放大。相关信息可参考 [视频采集旋转](/real-time-video-android-java/video/video-capture-rotation)。
* 如果拉流端渲染使用的填充模式是 [ASPECT_FILL](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~enum~im-zego-zegoexpress-constants-zego-view-mode&jumpType=route#public-static-func-lists) 模式，并且视频尺寸（编码分辨率）与显示视图尺寸的比例不一致时，会发生裁剪导致视频放大。
* 如果拉流端渲染使用的填充模式是 [ASPECT_FIT](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~enum~im-zego-zegoexpress-constants-zego-view-mode&jumpType=route#public-static-func-lists) 模式，并且视频尺寸（编码分辨率）与显示视图尺寸的比例不一致时，会发生缩放导致黑边。

## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。

<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="3">必要信息</td>
    <td>视频发送端的APP是横屏还是竖屏，编码分辨率是横屏还是竖屏。</td>
  </tr>
  <tr>
    <td>视频接收端的视图长宽比。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
</tbody></table>
