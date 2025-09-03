# 锁屏显示来电呼叫


本文档描述了如何配置在锁屏时全屏显示来电呼叫。

<Frame width="auto" height="500">
  <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/59de43acec.jpeg" alt="LockScreenDisplayZh.jpeg"/>
</Frame>


如需实现本功能，请进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加以下权限即可：
```xml app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
```

<Warning title="注意">

- 如果您的应用需要上传到 Google Play Store，由于 [Google Play 的政策](https://support.google.com/googleplay/android-developer/answer/13392821?hl=zh)限制，你可能需要针对这两个权限作出相应的声明才可以避免被拒绝。

- 如果您的设备有针对锁屏显示的额外设置，请先按要求设置以使该功能正常工作。
</Warning>
