<Title>iOS 12 系统真机调试的时候出现 Metal 相关的 crash 怎么解决？</Title>


---

如果 iOS 12 系统的真机在调试的时候出现了 Metal 相关的crash，需要在 XCODE 的 [Edit Scheme] -> [Run] -> [Diagnostics] -> [Metal] 中取消勾选 ‘API Validation’ 选项。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/iOS/metal_crash.png" /></Frame></Frame>


