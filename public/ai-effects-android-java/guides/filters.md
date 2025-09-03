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

export const setFilterMap = {
    'default': <a href="@setFilter" target='_blank'>setFilter</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setFilter.html" target='_blank'>setFilter</a>,
    'Windows': <a href="@zego_effects_set_filter" target='_blank'>zego_effects_set_filter</a>,
}

export const setFilterParamMap = {
    'default': <a href="@setFilterParam" target='_blank'>setFilterParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setFilterParam.html" target='_blank'>setFilterParam</a>,
    'Windows': <a href="@zego_effects_set_filter_param" target='_blank'>zego_effects_set_filter_param</a>,
}


export const ZegoEffectsFilterParamMap = {
    'default': <a href="@-ZegoEffectsFilterParam" target='_blank'>ZegoEffectsFilterParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsFilterParam-class.html" target='_blank'>ZegoEffectsFilterParam</a>,
    'Windows': <a href="@zego_effects_filter_param" target='_blank'>zego_effects_filter_param</a>,
}

export const nilMap = {
    'default': "nil",
    'Android,RN': "null",
    'Flutter': "空字符串",
    'Windows': "资源路径设置为空，",
}

# 滤镜

- - -

## 功能简介

ZegoEffects SDK 提供滤镜功能，包含多种滤镜风格可使用，可广泛应用于短视频，直播等场景。

## 前提条件

在使用 ZegoEffects SDK 滤镜功能前，请确保已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 集成 SDK](/ai-effects-android-java/quick-starts/import-the-sdk)。

## 使用步骤

滤镜功能提供了以下风格：
- 自然（Natural）：奶油（Creamy）、青春（Brighten）、清新（Fresh）、秋天（Autumn）
- 灰调（Gray）：莫奈（Cool）、暗夜（Night）、胶片（Film-like）
- 梦境（Dreamy）：落日（Sunset）、琉璃（Cozily）、星云（Sweet）

开发者在调用接口时，可以根据需要，选择对应的滤镜资源使用。

开启滤镜功能之后，开发者可根据实际的需求来自定义滤镜参数。如果未自定义，SDK 将采用默认参数值实现滤镜功能。


### 开启滤镜

调用 {getPlatformData2(props,setFilterMap)} 接口开启/关闭滤镜功能，传入对应的滤镜绝对路径。调用 {getPlatformData2(props,setFilterParamMap)} 接口设置滤镜强度。

{getPlatformData2(props,ZegoEffectsFilterParamMap)} 对象的滤镜强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

<Warning title="注意">
滤镜风格的效果不能叠加，设置新的滤镜路径后，会覆盖之前的滤镜效果。
</Warning>

:::if{props.platform=undefined}
```objc
// 开启滤镜功能
// 1. 开启滤镜功能，并且传入对应的滤镜绝对路径
[self.effects setFilter:@"/xxx/xxx/Night.bundle"];

// 设置滤镜强度，范围 [0, 100]
ZegoEffectsFilterParam *param = [[ZegoEffectsFilterParam alloc] init];
param.intensity = 100;
[self.effects setFilterParam:param];
```
:::
:::if{props.platform="Android"}
```java
// 开启滤镜功能
// 1. 开启滤镜功能，并且传入对应的滤镜绝对路径
mEffects.setFilter("/xxx/xxx/Night.bundle");

// 设置滤镜强度，范围 [0, 100]
ZegoEffectsFilterParam param = new ZegoEffectsFilterParam();
param.intensity = 100;
mEffects.setFilterParam(param);
```
:::
:::if{props.platform="Windows"}
```c
// 开启滤镜功能
// 1. 开启滤镜功能，并且传入对应的滤镜绝对路径
zego_effects_set_filter(handle,"/xxx/xxx/Night.bundle");

// 设置滤镜强度，范围 [0, 100]
zego_effects_filter_param param;
param.intensity = 100;
zego_effects_set_filter_param(handle,param);
```
:::
:::if{props.platform="Flutter"}
```dart
// 开启滤镜功能
// 1. 开启滤镜功能，并且传入对应的滤镜绝对路径
ZegoEffectsPlugin.instance.setFilter('Night');

// 设置滤镜强度，范围 [0, 100]
ZegoEffectsFilterParam param = ZegoEffectsFilterParam();
param.intensity = 100;
ZegoEffectsPlugin.instance.setFilterParam(param);
```
:::
:::if{props.platform="RN"}
```javascript
// 开启滤镜功能
// 1. 开启滤镜功能，并且传入对应的滤镜绝对路径
mEffects.setFilter("/xxx/xxx/Night.bundle");

// 设置滤镜强度，范围 [0, 100]
mEffects.setFilterParam({ intensity: 100 });
```
:::

### 移除滤镜。

如果需要移除滤镜，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setFilterMap)} 接口。

:::if{props.platform=undefined}
```objc
// 移除滤镜功能
[self.effects setFilter:nil];
```
:::
:::if{props.platform="Android"}
```java
// 移除滤镜功能
mEffects.setFilter(null);
```
:::
:::if{props.platform="Windows"}
```c
// 移除滤镜功能
zego_effects_set_filter(handle,"");
```
:::
:::if{props.platform="Flutter"}
```dart
// 移除滤镜功能
ZegoEffectsPlugin.instance.setFilter('');
```
:::
:::if{props.platform="RN"}
```javascript
// 移除滤镜功能
mEffects.setFilter(null);
```
:::
<Content platform="Android"/>