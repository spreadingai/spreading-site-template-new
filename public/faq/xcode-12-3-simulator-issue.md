<Title>在 Xcode 12.3 及以上版本中使用 iOS 模拟器构建项目为什么会失败？</Title>



- - -

## 问题描述

在 Xcode 12.3 及以上版本中，[集成 SDK](/real-time-video-ios-oc/quick-start/integrating-sdk) 并使用 iOS 模拟器构建项目时，可能会收到如下报错：

```
Building for iOS Simulator, but the linked and embedded framework 'xxx.framework' was built for iOS + iOS Simulator.
```

## 问题原因

- 从 Xcode 11.0 版本开始，Apple 允许但不推荐把用于多平台的二进制框架或库捆绑到一个 “.framework” 文件中。

- 从 Xcode 12.3 版本开始，Apple 不允许在一个 “.framework” 文件中绑定多平台的库，必须使用 “.xcframework” 文件替代。

## 解决方案

### 方案一：升级 SDK （推荐）

从 ZEGO Express SDK 2.8.0 版本开始，iOS/macOS SDK 默认交付 XCFramework。该文件符合 Xcode 的要求，且支持在 iOS 真机和 iOS 模拟器上运行项目。

ZEGO 推荐您将 SDK 升级至 2.8.0 或以上版本，集成 SDK 的详细操作步骤请参考 [快速开始 - 集成](/real-time-video-ios-oc/quick-start/integrating-sdk)。

### 方案二：修改构建选项

<Warning title="注意">



此方案在未来的 Xcode 版本中可能会失效，不建议使用。

</Warning>



在 Xcode 中，选择 “TARGETS > Project Name > Build Settings > Build Options” 菜单，将 “Validate Workspace” 设置为 “Yes”。
