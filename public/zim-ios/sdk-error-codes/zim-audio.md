# ZIM Audio 错误码



为了给开发者带来更好的体验，ZEGO 推荐开发者使用最新版本的 SDK。

## 概览

开发者如果使用的是**最新版本**的 SDK，当 SDK 运行出现网络、媒体相关等错误时，SDK 无法自动恢复，请参考本文档进行处理。

调用接口后如果返回结果中存在 `errorCode` 字段，则表示该接口调用异常。示例代码如下：

:::if{props.platform=undefined}
```java
ZIMAudio.getInstance().setEventHandler(new ZIMEventHandler() {
    @Override
    public void onError(ZIMAudioError errorInfo) {
        errorInfo.code; // 本次错误的错误码，请参考官网错误码表处理
        errorInfo.message; // 本次错误的错误信息
    }
}
```
:::
:::if{props.platform="Flutter"}
```dart
ZIMAudioEventHandler.onError = (ZIMAudioError errorInfo){
       errorInfo.code; //本次错误的错误码，请参考官网错误码表处理
       errorInfo.message; //本次错误的错误信息
};
```
:::
:::if{props.platform="iOS"}
```objc
- (void)onError:(ZIMAudioError *)errorInfo{
    NSLog(@"errorCode%lu,%@",(unsigned long)errorInfo.code,errorInfo.message);
}
```
:::
:::if{props.platform="RN"}
```typescript
ZIMAudio.getInstance().on("onError", (error) => {
    console.log('onError,code:'+onError.code+"message:"+onError.message);
});
```
:::

## 错误码

<table>
<tbody><tr>
<th>错误码</th>
<th>说明</th>
<th>处理建议</th>
</tr>
<tr>
<td>0</td>
<td>成功。</td>
<td>无。</td>
</tr>
<tr>
<td>1</td>
<td>未知错误，</td>
<td>请联系 ZEGO 技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>2</td>
<td>在未初始化的情况下调用了 SDK 的其他API。</td>
<td>请先初始化 SDK。</td>
</tr>
<tr>
<td>3</td>
<td>SDK 识别出非法路径。</td>
<td>请检查参数的合法性。</td>
</tr>
<tr>
<td>4</td>
<td>开发者传入了非法参数，导致错误。</td>
<td>请检查参数的合法性。</td>
</tr>
<tr>
<td>5</td>
<td>目标文件无法打开。文件格式或内容可能不正确。</td>
<td>请检查文件格式或内容。</td>
</tr>
<tr>
<td>6</td>
<td>写入文件时空间不足。</td>
<td>请检查磁盘空间是否足够正常使用 SDK 功能。</td>
</tr>
<tr>
<td>7</td>
<td>SDK 对这个路径没有读写权限。</td>
<td>请检查权限配置。</td>
</tr>
<tr>
<td>8</td>
<td>IO 错误。</td>
<td>请联系ZEGO技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>11</td>
<td>录音时编码错误。</td>
<td>请联系 ZEGO 技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>12</td>
<td>解码错误。</td>
<td>请联系ZEGO技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>13</td>
<td>API 调用错误。</td>
<td>请联系ZEGO技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>14</td>
<td>内部逻辑异常导致错误。</td>
<td>请联系 ZEGO 技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>15</td>
<td>内部日志模块出现异常。</td>
<td>请联系ZEGO技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>31</td>
<td>录制器出现一般错误。</td>
<td>请联系 ZEGO 技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>32</td>
<td>录制时间太短。</td>
<td>请在收到 onRecorderStarted 回调之后，再完成录制。</td>
</tr>
<tr>
<td>51</td>
<td>播放器出现一般错误。</td>
<td>请联系 ZEGO 技术支持进行故障排查和解决。</td>
</tr>
<tr>
<td>81</td>
<td>License 鉴权文件格式不正确。</td>
<td>请检查 License 鉴权文件内容是否正确。</td>
</tr>
<tr>
<td>82</td>
<td>License 鉴权文件内容已过期。</td>
<td>请重新申请 License 鉴权文件并再次初始化SDK。</td>
</tr>
<tr>
<td>83</td>
<td>无法使用未开通服务的功能。</td>
<td>请联系 ZEGO 技术支持开通相应服务。</td>
</tr>
</tbody></table>
<Content platform="iOS"/>