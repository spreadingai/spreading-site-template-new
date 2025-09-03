<Title>如何处理常见的 Web 浏览器控制台报错？</Title>



- - -

将 Zego Express Web SDK 集成到你的 Web 应用后，遇到问题时可以通过浏览器控制台打印的日志进行调试，本文列出控制台日志中常见的错误和原因。


<table>
  
<tbody><tr>
<th>错误提示</th>
<th>可能原因</th>
<th>处理建议</th>
</tr>
<tr>
<td>WebSocket is closed before the connection is established</td>
<td>Web 应用与 ZEGO 服务器的连接还未连接成功就被关闭。</td>
<td><ul><li>检查网络连接。</li><li>检查 DNS 是否存在异常。</li></ul></td>
</tr>
<tr>
<td>input parm error.roomID must be string</td>
<td>参数错误，登录房间传入的 “roomID” 格式错误。</td>
<td>请检查参数内容，确保 “roomID” 为字符串格式。</td>
</tr>
<tr>
<td>Failed to load resource</td>
<td>用户本地的 DNS 解析错误。</td>
<td><p>建议用户根据所在区域修改 DNS 后重新登录房间。</p> <ul><li>中国大陆用户：将 DNS 服务器设为 114.114.114.114。</li> <li>中国大陆之外的用户：将 DNS 服务器设为 8.8.8.8。</li></ul></td>
</tr>
<tr>
<td>publisher already exist</td>
<td>重复推了相同流名的流。</td>
<td>检查业务逻辑中是否存在重复推流的情况，重新推流需先调用 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine#stop-publishing-stream">stopPublishingStream</a> 接口停止推流。</td>
</tr>
<tr>
<td>cmd=login, err_code=1011, err_message=token format error</td>
<td>登录房间时传入的 “token” 参数格式错误。</td>
<td>“token” 为字符串类型，需要将 json 格式经过 base64 加密后再传入 <a target="_blank" href="https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~javascript_web~class~ZegoExpressEngine&amp;jumpType=route#login-room">loginRoom</a> 接口中。</td>
</tr>
<tr>
<td><ul><li>cmd=login, err_code=1000000101, err_message=login liveroom request fail"</li><li>"content":"server error=1000000101"</li></ul></td>
<td>AppID 过期或 Server 地址错误。</td>
<td>请到 <a target="_blank" href="https://console.zego.im">ZEGO 控制台</a> 确认地址是否正确或联系 ZEGO 技术支持。</td>
</tr>
<tr>
<td>devices detect error: NotReadableError Could not start video source</td>
<td>浏览器没有获取媒体设备的权限或媒体设备被占用。</td>
<td>检查是否允许该页面获取媒体设备信息，是否有其他程序正在使用摄像头设备。</td>
</tr>
<tr>
<td>https or localhost required</td>
<td>基于浏览器安全策略对隐私性的要求，Web 平台调用摄像头强制要求 “https”，此安全策略是浏览器的要求。<br/>ZEGO SDK 依赖于浏览器提供的 webRTC API，所以只支持 SSL 的 Web 服务器（https）、localhost、127.0.0.1（等同于 https）。</td>
<td>可以使用 “localhost” 先集成测试，后续上线仍然需要 “https” 环境。</td>
</tr>
<tr>
<td>Player already exist</td>
<td>SDK 不支持重复拉取同一条流。</td>
<td>检查业务代码逻辑，避免重复拉流。</td>
</tr>
</tbody></table>
