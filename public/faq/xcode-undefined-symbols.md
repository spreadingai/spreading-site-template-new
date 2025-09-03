<Title>Xcode Archive 时提示 “Undefined symbols for architecture armv7: "_OBJC_CLASS_$_ZegoProduct"”，该如何处理？</Title>


---

### 问题原因

ZegoEffects 的 iOS 平台 SDK 仅提供 “arm64” 和 “x86_64” 架构，不提供 “armv7” 架构。
  
目前能升级到 “iOS 10” 系统的 “armv7” 设备仅剩 “iPhone 5”、“iPhone 5c”、“iPad (4th generation)” 这三种。由于 “iPhone 5” 等 32 位设备算力较低，运行 AI 应用效果不佳。

另外，根据 2021 年 4 月的 iOS 设备市场占有率调查，这几种设备的占有率之和不足 0.1%，微信等主流应用也不再支持 32 位设备，并且，预计 2022 年 Xcode 将不再支持构建 32 位 iOS 应用。

因此，经综合考虑，SDK 仅提供 64 位架构。

### 解决方案

以 ZegoEffects 为例：

- 方案一：将 Target 支持的 iOS 最低版本调整为 iOS 11.0 或以上。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_ios_target_os.png" /></Frame></Frame>

- 方案二：如果仍需支持 iOS 10、iOS 9 等版本，可在 Target 的 “Build Settings” 中指定 “Architectures (Release)” 为 “arm64”。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZegoEffects/Apple/effects_ios_release_arch.png" /></Frame></Frame>
