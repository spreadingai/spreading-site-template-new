<Title>为什么 Android 9 应用锁屏或切后台后采集音视频无效？</Title>



---

为了增强用户隐私，Android 9 更新了一些权限限制，系统对后台访问做了强限制，相关信息如下：

> **Limited access to sensors in background**
>
> Android 9 limits the ability for background apps to access user input and sensor data. If your app is running in the background on a device running Android 9, the system applies the following restrictions to your app:
> - Your app cannot access the microphone or camera.
> - Sensors that use the continuous reporting mode, such as accelerometers and gyroscopes, don't receive events.
> - Sensors that use the on-change or one-shot reporting modes don't receive events.
>
> If your app needs to detect sensor events on devices running Android 9, use a foreground service.

详见 [Android 行为变更](https://developer.android.com/about/versions/pie/android-9.0-changes-all#privacy-changes-all)。


目前，Android 官方没有明确说明后台采集声音或视频应如何处理，仅说明了使用前台服务可以让应用正常工作。

如果 Android 9 设备用户有锁屏或切后台后采集音频或视频的需求，可以在锁屏或退至后台前起一个 Service，并在退出锁屏或返回前台前终止 Service。起 Service 的相关操作可参考 [Service](https://developer.android.com/reference/android/app/Service)。
