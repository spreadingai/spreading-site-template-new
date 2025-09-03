export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const initMap = {
  'Android': <a href="@init" target='_blank'>init</a>,
  'iOS': <a href="@initWithLicense" target='_blank'>initWithLicense</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/init.html" target='_blank'>init</a>,
}
export const enableANSMap={
  "Android,RN,iOS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#enable-ans-enable" target="_blank">enableANS</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/enableANS.html" target="_blank">enableANS</a>
}
export const setANSParamMap={
  "Android,RN,iOS": <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~class~ZIMAudio#set-ans-param-param" target="_blank">setANSParam</a>,
  "Flutter": <a href="https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/setANSParam.html" target="_blank">setANSParam</a>
}

# 噪声控制（ANS）

- - -

噪声控制功能可以识别声音中的背景噪声并进行消除，开启该功能后可以使人声更加清晰。此功能更擅长抑制连续性噪声（如雨声和其他白噪声）。如需抑制噪声以改善录制音频的人声质量和用户体验时，可以开启此功能。

<Warning title="注意">

如需使用本功能，请联系 ZEGO 技术支持开通，专业版和旗舰版用户可免费开通。
</Warning>

## 前提条件

在实现“噪声控制”功能之前，请确保：
- 已实现 [集成 SDK](/zim-ios/zim-audio/integrate-the-zim-audio-sdk)。
- 已实现 [在线鉴权](/zim-ios/zim-audio/implement-online-authentication)。




## 实现流程

### 1 完成鉴权

噪声控制功能需要搭配鉴权文件 License 使用。请在调用 {getPlatformData(props,initMap)} 时传入有效的 License，否则会导致音量增益相关接口调用失败。

:::if{props.platform=undefined}

```java
ZIMAudio.getInstance().init(application, "xxx");
```
:::
:::if{props.platform="Flutter"}
```dart
// 携带鉴权文件 License 初始化
ZIMAudio.sharedInstance().init('xxx');
```
:::
:::if{props.platform="iOS"}
```objc
// 携带鉴权文件 License 初始化
[[ZIMAudio sharedInstance] initWithLicense:@"xxx"];
```
:::
:::if{props.platform="RN"}
```typescript
// 携带鉴权文件 License 初始化
ZIMAudio.sharedInstance().init('xxx');
```
:::

### 2 启用功能

初始化完成后，调用 {getPlatformData(props,enableANSMap)} 即可启用该功能。

:::if{props.platform=undefined}

```java
// 启用 ANS 功能
ZIMAudio.getInstance().enableANS(true);
```
:::
:::if{props.platform="Flutter"}
```dart
// 启用 ANS 功能
ZIMAudio.sharedInstance().enableANS(true);
```
:::
:::if{props.platform="iOS"}
```objc
// 启用 ANS 功能
[[ZIMAudio sharedInstance] enableANS:YES];
```
:::
:::if{props.platform="RN"}

```typescript
// 启用 ANS 功能
ZIMAudio.sharedInstance().enableANS(true);
```
:::

启用噪声控制功能后，可开始 [录制音频文件](/zim-ios/zim-audio/send-and-receive-audio-messages#2-录制音频文件)。

<Note title="说明">

如果在开始录制后才启用噪声控制功能，则噪声控制功能对当前录制无效，仅对下一次及之后的录制生效。
</Note>

### 3 （可选）设置 ANS 参数

调用 {getPlatformData(props,enableANSMap)} 启用 ANS 功能后，如需切换噪音抑制模式，以控制噪音抑制的程度，请调用 {getPlatformData(props,setANSParamMap)} 接口。

:::if{props.platform=undefined}

```java
ZIMAudioANSParam param = new ZIMAudioANSParam();
//调整降噪模式为 AGGRESSIVE
param.mode = ZIMAudioANSMode.AGGRESSIVE;
ZIMAudio.getInstance().setANSParam(param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 调整降噪模式为 aggressive
ZIMAudioANSParam param = ZIMAudioANSParam(ZIMAudioANSMode.aggressive);
ZIMAudio.getInstance().setANSParam(param);
```
:::
:::if{props.platform="iOS"}
```objc
ZIMAudioANSParam *param = [[ZIMAudioANSParam alloc] init];
// 调整降噪模式为 ZIMAudioANSModeAggressive
param.mode = ZIMAudioANSModeAggressive;
[[ZIMAudio sharedInstance] setANSParam:param];

```
:::
:::if{props.platform="RN"}

```typescript
// 调整降噪模式为 aggressive
ZIMAudio.getInstance().setANSParam({mode:ZIMAudioANSMode.aggressive});
```
:::
<Content platform="iOS"/>