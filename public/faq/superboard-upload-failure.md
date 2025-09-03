<Title>超级白板上传文件失败怎么处理？</Title>


---

1. 请根据错误码排查失败原因。
2. 请检查上传的文件是否符合文件规范。
3. Android 平台 2.0 版本的 SDK 未支持 Android Q 中引入的分区储存功能。如果 targetSdkVersion 设置为 30 以及以上，会导致上传文件失败。解决方法如下：
- <b>升级 SDK 到最新版本（推荐）。</b>
- 设置 targetSdkVersion \<=28，以 Android 9 或更低版本为目标平台。
- 设置 targetSdkVersion = 29，请在 manifest 中添加 `android:requestLegacyExternalStorage="true"`。
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ZegoDocsView/requestLegacyExternalStorage.png" /></Frame></Frame>

Android Q 存储权限的行为变更，请参考 [存储 - Android](https://source.android.google.cn/devices/storage?hl=zh-cn#permissions)。

## 相关链接

- [错误码（超级白板）](/super-board-ios/error-code)
- [错误码（文件共享）](https://doc-zh.zego.im/article/4351)
- [文件规范](/super-board-ios/product-desc/use-restrictions/filerule)
