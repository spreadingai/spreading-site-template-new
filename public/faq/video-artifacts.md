<Title>怎么处理视频花屏或绿屏问题？</Title>



- - -

花屏指的是视频画面中出现颜色错误的不规则像素块，导致视频无法正常显示。图像的纹理可能会出现部分，或者全局不连续。花屏与视频模糊不同，视频模糊一般由于分辨率或码率过低导致。在模糊的视频中画面依然是完整的，常见现象是全局块状马赛克，或者局部斜线曲线锯齿。

绿屏指的是视频画面中出现绿色色块，导致视频无法正常显示，绿屏常见于处理 YUV 图像的环节，比如采集、渲染、解码。

花屏或绿屏可能由摄像头、第三方美颜 SDK、视频分辨率、或采集和渲染模块的问题导致。您可以参考如下操作步骤进行处理。


## 问题排查

### 推流端预览花屏/绿屏

根据视频采集方的不同，参考对应的处理方式进行自查：

- ZEGO 采集

请按照以下步骤排查摄像头、第三方美颜 SDK、视频分辨率的问题：

1. 无论是使用 ZEGO SDK 渲染还是使用自定义视频渲染，都需要另一台设备在拉流端确认是否花屏/绿屏。
2. 如果拉流端花屏/绿屏，请排查推流端的采集模块。
3. 通过检查系统自带的摄像机是否正常工作，确认摄像头是否可以正常工作。
4. 检查第三方美颜 SDK。如果您使用了第三方美颜 SDK，尝试关闭美颜功能并检查是否花屏/绿屏。如果花屏/绿屏现象消失，那么可能是第三方美颜 SDK 的问题，请联系第三方美颜 SDK 的技术支持。
5. 如果出现条纹斜线状纹理，请检查视频分辨率是否是预设的分辨率。如果不是，尝试改变视频分辨率。
6. 如果拉流端正常，请排查推流端的渲染模块。
7. 如果使用 ZEGO SDK 渲染，请联系 ZEGO 技术支持。
8. 如果使用自定义视频渲染，请检查返回的图像中 “stride” 参数和 “width” 参数的使用是否混淆，RGB 和 YUV 都需要根据实际的 stride 进行渲染。
    
- 自定义视频采集

请按照以下步骤进行排查：
    
1. 无论是使用 ZEGO SDK 渲染还是自渲染，都需要在拉流端确认是否花屏/绿屏。
2. 如果拉流端花屏/绿屏，请排查推流端的采集模块。
3. 检查 [enableCustomVideoCapture](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#enable-custom-video-capture) 函数的 [ZegoCustomVideoCaptureConfig](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-entity-zego-custom-video-capture-config) 参数中的 [ZegoVideoBufferType](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java~enum~im-zego-zegoexpress-constants-zego-video-buffer-type) 中指定的视频数据格式和传回 SDK 的视频数据格式是否一致。
4. 检查采集图像参数是否正确。
5. 如果拉流端正常，请排查推流端的渲染模块。
6. 如果使用 ZEGO SDK 渲染，请联系 ZEGO 技术支持。
7. 如果业务侧自行实现渲染，请自行排查。


### 拉流端花屏/绿屏

如果推流端和拉流端同时出现花屏/绿屏，需要首先参考 “1.1 推流端预览花屏/绿屏” 排查推流端的问题。

如果只有拉流端花屏/绿屏，请参考以下步骤排查：
1. 使用不同的网络环境接收同一条流，如果两者表现不一致，请联系 ZEGO 技术支持。
2. 切换软解码/硬解码，如果两者表现不一致，请联系 ZEGO 技术支持。
3. 如果拉流端使用自定义视频渲染，需要您自行排查拉流端自定义视频渲染模块的问题，检查返回图像中 “stride” 参数和 “width” 参数的使用是否混淆，RGB 和 YUV 都需要根据实际的 stride 进行渲染。



## 联系 ZEGO 技术支持

如果问题仍然存在，请联系 ZEGO 技术支持，并提供以下信息，方便快速定位问题。


<table>
  
  <tbody><tr>
    <th>信息</th>
    <th>详情</th>
  </tr>
  <tr>
    <td rowspan="6">必要信息</td>
    <td>出现花屏/绿屏的房间 ID（roomID）。</td>
  </tr>
  <tr>
    <td>出现花屏/绿屏时，推流端和拉流端的用户 ID（userID）以及设备型号。</td>
  </tr>
  <tr>
    <td>花屏/绿屏的截图。</td>
  </tr>
  <tr>
    <td>出现花屏/绿屏的具体时间段。</td>
  </tr>
  <tr>
    <td>推流端和拉流端的采集和渲染方式：ZEGO SDK 采集、自定义视频采集、ZEGO SDK 渲染、自定义视频渲染。</td>
  </tr>
  <tr>
    <td>SDK 日志文件，详情请参考 <a target="_blank" href="https://doc-zh.zego.im/faq/express_sdkLog">如何设置和获取 SDK 的日志、堆栈信息</a>。</td>
  </tr>
  <tr>
    <td rowspan="3">可选信息</td>
    <td>用其他分辨率是否可以重现花屏和绿屏。</td>
  </tr>
  <tr>
    <td>在其他应用上是否出现花屏和绿屏。</td>
  </tr>
  <tr>
    <td>在其他机型上是否可以重现花屏和绿屏。</td>
  </tr>
</tbody></table>
