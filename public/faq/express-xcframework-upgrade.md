<Title>Express 从 2.8.0 之前的版本升级以后，Xcode 编译报错如何处理？</Title>


---

## 问题描述
Express 从 2.8.0 之前的版本升级以后，Xcode 编译报错 ```'ZegoExpressEngine/ZegoExpressEngine.h' file not found```。

## 解决方案
XCFramework是 XCode 11 中提出的一个新特性，是由 XCode 创建的一个可分发的二进制包，它包含了 framework 或 library 的一个或多个变体，因此可以在多个平台(iOS、macOS、tvOS、watchOS) 上使用，包括模拟器，是一种相对 framework 更便捷的格式。  
为了符合 Apple 的新的上架规则，Zego Express SDK 自 2.8.0 以后将由 XCFramework 形式提供，如果您的项目中曾集成过以前版本的 SDK，升级以后需要检查以下几个部分：
- 升级到最新版本 Xcode。
- 如果您是通过 Cocoapods 进行集成，请确保 Cocoapods 版本高于 1.9.0（建议更新至 1.10.0 以上），更新以后删除 Podfile.lock 文件并再次执行 pod install 操作。
- 在 Xcode 中通过 shift(⇧)+command(⌘)+K 的组合快捷键或者 Product→Clean 对项目执行 clean 操作，清空之前的缓存，并再次编译。