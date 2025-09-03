<Title>打包 iOS 时 Xcode 报错提示 Bitcode 版本不兼容？</Title>



- - -

## 问题描述

打包导出 iOS App 时，Xcode 报错提示如下：

```
ipatool failed with an exception: ...... bitcode-build-tool ......
```

或者编译链接时报错提示如下：

```
Failed to verify bitcode in XXXX.framework/XXXX       (XXXX 为集成的 ZEGO SDK 的产品名称，例如 ZegoExpressEngine)
```

## 问题原因

1. 由于 Apple 要求提交到 AppStore 的 iOS App 不能使用过时的工具链和 iOS SDK 构建（即使用版本较低版本的 Xcode），因此 ZEGO 会实时更新构建 ZEGO SDK 的工具链的版本（例如 Xcode），当版本较低时会导致该报错。

2. Bitcode 是一种可用于减小 App 包大小的技术，Xcode 默认开启此特性（即 Xcode 工程上， “Target > Build Setting” 中的 “Enable Bitcode” 选项默认设置为 “Yes”）。但此特性对二进制兼容性要求较高，不支持向上兼容，因此开发者无法在开启 Bitcode 特性时使用较低版本的 Xcode 来构建一个集成了 ZEGO SDK 的 iOS App。


> 当在 Xcode 上选择 “Window > Organizer > Archive > Distribute App (Export)” 时，如果勾选了 “Include bitcode” 或 “Rebuild from bitcode”，则会报错提示处理 Bitcode 失败。  
 



## 解决方案

1. 升级 Xcode 到最新的版本。（推荐）

2. 打开 Xcode 工程，在 “Target > Build Setting” 中将 “Enable Bitcode” 选项设置为 “NO”。（不推荐）

