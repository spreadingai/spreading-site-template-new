<Title>运行 App 时提示：“Building for iOS Simulator...” 如何处理？</Title>


---

运行集成了 RoomKit iOS SDK 的 App 时如果出现报错 “Building for iOS Simulator, but the linked and embedded framework 'xxx.framework' was built for iOS + iOS Simulator.”，原因和处理方式如下：

在 Xcode 12.3 版本以后，默认禁止使用带 iOS + iOS(Simulator) 双平台架构的 Framework，可以通过 Xcode 选择 “TARGETS > Build Settings > Validate Workspace”，设置该参数的值为 “YES” 来继续使用传统 Framework。