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
export const enableAGCMap = {
  'Android': <a href="@enableAGC" target='_blank'>enableAGC</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim_audio/latest/zego_zim_audio/ZIMAudio/enableAGC.html" target='_blank'>enableAGC</a>,
}

# 音量增益（AGC）

- - -

ZIM Audio SDK 支持自动调整麦克风音量，以适应远近拾音并保持音量稳定。如需确保音量稳定性以改善录制音频的人声质量和用户体验时，可以开启此功能。

<Warning title="注意">

如需使用本功能，请联系 ZEGO 技术支持开通，专业版和旗舰版用户可免费开通。
</Warning>

## 前提条件

在实现“音量增益”功能之前，请确保：
- 已实现 [集成 SDK](/zim-android/zim-audio/integrate-the-zim-audio-sdk)。
- 已实现 [在线鉴权](/zim-android/zim-audio/implement-online-authentication)。


## 实现流程

### 1 完成鉴权

音量增益功能需要搭配鉴权文件 License 使用。请在调用 {getPlatformData(props,initMap)} 时传入有效的 License，否则会导致音量增益相关接口调用失败。

:::if{props.platform=undefined}

```java
// 携带鉴权文件 License 初始化
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

初始化完成后，调用 {getPlatformData(props,enableAGCMap)} 即可启用该功能。

:::if{props.platform=undefined}

```java
// 启用 AGC 功能
ZIMAudio.getInstance().enableAGC(true);
```
:::
:::if{props.platform="Flutter"}
```dart
// 启用 AGC 功能
ZIMAudio.getInstance().enableAGC(true);
```
:::
:::if{props.platform="iOS"}

```objc
// 启用 AGC 功能
[[ZIMAudio sharedInstance] enableAGC:YES];
```
:::
:::if{props.platform="RN"}
```typescript
// 携带鉴权文件 License 初始化
ZIMAudio.sharedInstance().init('xxx');
```
:::

启用音量增益功能后，可开始 [录制音频文件](/zim-android/zim-audio/send-and-receive-audio-messages#4-录制音频文件)。

<Note title="说明">

如果在开始录制后才启用音量增益功能，则音量增益功能对当前录制无效，仅对下一次及之后的录制生效。
</Note>