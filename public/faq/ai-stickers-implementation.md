<Title>AI 美颜如何实现挂件功能？</Title>


-----

<Warning title="注意">


从 2.0.0 版本之后的 AI 美颜 SDK 不再支持挂件。

</Warning>



## 功能简介

ZegoEffects SDK 提供人脸特效挂件，基于人脸关键点检测与跟踪算法，提供人脸特效，SDK 可直接将二维挂件素材准确贴合人脸，通过脸部动作触发挂件特效，让直播变得更有趣。

## 前提条件

在使用 ZegoEffects SDK 挂件功能前，请确保完成以下操作：

<Warning title="注意">


以下链接以 iOS 为例，如接入其他平台，请自行切换

</Warning>




- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [iOS - 集成 SDK](/ai-effects-ios-objc/quick-starts/import-the-sdk)。
- 导入 “PendantResources.bundle” 资源路径，详情请参考 [iOS 平台- 导入资源和模型](/ai-effects-ios-objc/quick-starts/import-resources-and-models)。



## 使用步骤

挂件贴纸包括：三只动物（Animal）、小丑（Clown）、小鹿（Deer）、潜水镜（Dive）、炫酷脸膜（Facefilm）、美少女战士（Girl）、猫头（Cat）、西瓜（Watermelon）等效果，开发者在调用接口时，可以根据需要，选择对应的滤镜资源使用。

<Tabs>
<Tab title="iOS-Objective-C 平台">
调用 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#set-pendant-path) 接口，将挂件路径设置到 SDK。如果需要移除挂件，可将 `nil` 传入 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#set-pendant-path) 接口。

<Warning title="注意">

- 挂件效果不能叠加，设置新的挂件路径后，会覆盖之前的挂件效果。
- 挂件效果不能与 [美妆 - 风格妆](/ai-effects-ios-objc/guides/makeups) 功能叠加使用，开启挂件功能，会关闭“风格妆”的效果。

</Warning>


```objc
// 设置挂件
[effects setPendant:@"/xxx/xxx/pendantBaby.bundle"];
// 移除挂件
[effects setPendant:nil];
```

</Tab>
<Tab title="Android-Java 平台">
调用 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-nose-narrowing-param) 接口，将挂件路径设置到 SDK。如果需要移除挂件，可将 `null` 传入 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-nose-narrowing-param) 接口。

<Warning title="注意">

- 挂件效果不能叠加，设置新的挂件路径后，会覆盖之前的挂件效果。
- 挂件效果不能与 [美妆 - 风格妆](/ai-effects-android-java/guides/makeups) 功能叠加使用，开启挂件功能，会关闭“风格妆”的效果。

</Warning>


```c
// 设置挂件
mEffects.setPendant("/xxx/xxx/pendantBaby.bundle");
// 移除挂件
mEffects.setPendant(null);
```
</Tab>
<Tab title="macOS-Objective-C 平台">
调用 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-pendant-path) 接口，将挂件路径设置到 SDK。如果需要移除挂件，可将 `nil` 传入 [setPendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_macos~class~ZegoEffects#set-pendant-path) 接口。

<Warning title="注意">


- 挂件效果不能叠加，设置新的挂件路径后，会覆盖之前的挂件效果。
- 挂件效果不能与 [美妆 - 风格妆](/ai-effects-macos-objc/guides/makeups#风格妆) 功能叠加使用，开启挂件功能，会关闭“风格妆”的效果。

</Warning>


```objc
// 设置挂件
[effects setPendant:@"/xxx/xxx/pendantBaby.bundle"];

// 移除挂件
[effects setPendant:nil];
```

</Tab>
<Tab title="macOS-C 平台">
调用 [zego_effects_set_pendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego-effects-set-nose-narrowing-param) 接口，将挂件路径设置到 SDK。如果需要移除挂件，可将挂件路径设置为空，传入 [zego_effects_set_pendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_macos~class~ZegoEffects#zego-effects-set-nose-narrowing-param) 接口。

<Warning title="注意">

- 挂件效果不能叠加，设置新的挂件路径后，会覆盖之前的挂件效果。
- 挂件效果不能与 [美妆 - 风格妆](/ai-effects-macos-c/guides/makeups#风格妆) 功能叠加使用，开启挂件功能，会关闭“风格妆”的效果。

</Warning>


```c
// 设置挂件
zego_effects_set_pendant(handle, "/xxx/xxx/pendantBaby.bundle");

// 移除挂件
zego_effects_set_pendant(handle, "");   
```
</Tab>
<Tab title="Windows-C 平台">
调用 [zego_effects_set_pendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego-effects-set-nose-narrowing-param) 接口，将挂件路径设置到 SDK。如果需要移除挂件，可将挂件路径设置为空，传入 [zego_effects_set_pendant](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~c_windows~class~ZegoEffects#zego-effects-set-nose-narrowing-param) 接口。

<Warning title="注意">

- 挂件效果不能叠加，设置新的挂件路径后，会覆盖之前的挂件效果。
- 挂件效果不能与 [美妆 - 风格妆](/ai-effects-windows-c/guides/makeups#风格妆) 功能叠加使用，开启挂件功能，会关闭“风格妆”的效果。

</Warning>

```c
// 设置挂件
zego_effects_set_pendant(handle, "/xxx/xxx/pendantBaby.bundle");

// 移除挂件
zego_effects_set_pendant(handle, "");   
```
</Tab>
</Tabs>
