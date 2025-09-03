# 实时音视频

- - -
 
## 准备环境  
在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：    
- [Flutter](https://flutter.dev/docs/get-started/install) 2.0 或以上版本。
- iOS 9.0 或以上版本，且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
- Android 4.4 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。如果为真机，请开启“允许调试”选项。
- Windows 7 或以上版本。
- 设备已经连接到 Internet。

请配置开发环境如下：
- Android Studio：“Preferences > Plugins”，搜索 “Flutter” 插件进行下载，并在插件中配置已经下载好的 Flutter 的 SDK 路径。
- VS Code: 在应用商店中搜索 “Flutter” 扩展并下载。

以上任一开发环境配置好 Flutter 环境后，在终端执行 `flutter doctor`，根据提示内容补全相关未下载的依赖项。  

## 集成 SDK  

### 开通服务

实现“在线 KTV”方案之前，请联系 ZEGO 技术支持开通版权音乐功能的权限。

### 新建项目（可选）
 
<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
请参考 [Flutter 文档 - Get Started](https://flutter.dev/docs/get-started/test-drive#create-app) 创建一个 Flutter 项目。 
</Accordion>
### 导入 SDK
  
1. 打开 “pubspec.yaml” 文件，添加 “zego_express_engine” 依赖，有以下 2 种形式：

- 以 “pub” 形式依赖（推荐）：

    ```yaml
    dependencies:
      flutter:
      sdk: flutter

      zego_express_engine: 3.10.0-copyrightedmusic
    ```  

    <Note title="说明">

    - 版权音乐的 SDK 版本号一般为 x.x.x-copyrightedmusic。
    - 以上代码的版本号仅为示例，并非最新版本。最新版本号请参考 [下载](/online-ktv-flutter/downloads)。
    </Note>


- 以 “path” 形式依赖，请先参考 [下载](/online-ktv-flutter/downloads) 下载 SDK，解压 SDK 压缩包，将解压后的 flutter 文件夹拷贝至工程中与 lib 文件夹同级的目录下，随后在“pubspec.yaml” 文件中添加以下依赖：

    ```yaml
    dependencies:
      flutter:
      sdk: flutter

      zego_express_engine:
        path: flutter
    ```  
2. 添加完成并保存文件后，在终端执行 `flutter pub get`。

## 设置权限
   
根据实际应用需要，设置应用所需权限。

### Android 添加权限

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。 

<Note title="说明">如果在构建发行版 apk（flutter build apk）期间启用了混淆（默认启用），则需要配置与 ZEGO 相关的类，防止混淆，请参考 [常见问题](#常见问题)。</Note>

```xml
<!-- Permissions required by the SDK -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Permissions required by the Demo App -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />

<uses-feature android:glEsVersion="0x00020000" android:required="true" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```


因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。请自行在 [pub](http://pub.dev/) 上寻找第三方 flutter 插件来实现，或者在 Android 原生层参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。 


```java  
String[] permissionNeeded = {
    "android.permission.CAMERA",
    "android.permission.RECORD_AUDIO"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
        requestPermissions(permissionNeeded, 101);
    }
}
```

具体的权限说明如下：

<table>
  
<tbody><tr>
<th>必要性</th>
<th>权限</th>
<th>权限说明</th>
<th>申请原因</th>
</tr>
<tr>
<td rowspan="7">必要权限</td>
<td>INTERNET</td>
<td>访问网络权限。</td>
<td>SDK 基本功能都需要在联网的情况下才可以使用。</td>
</tr>
<tr>
<td>ACCESS_WIFI_STATE</td>
<td>获取当前 WiFi 状态权限。</td>
<td rowspan="2">SDK 会根据网络状态的改变执行不同的操作。例如当网络重连的时候，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。</td>
</tr>
<tr>
<td>ACCESS_NETWORK_STATE</td>
<td>获取当前网络状态权限。</td>
</tr>
<tr>
<td>CAMERA</td>
<td>访问相机权限。</td>
<td>预览和发送视频的时候需要使用该权限。</td>
</tr>
<tr>
<td>RECORD_AUDIO</td>
<td>录制音频权限。</td>
<td>发送音频的时候需要使用该权限。</td>
</tr>
<tr>
<td>BLUETOOTH</td>
<td>连接蓝牙设备权限。</td>
<td>连接蓝牙设备时需要使用该权限。</td>
</tr>
<tr>
<td>MODIFY_AUDIO_SETTINGS</td>
<td>修改音频配置权限。</td>
<td>修改音频设备配置时需要使用该权限。</td>
</tr>
<tr>
<td rowspan="2">非必要权限</td>
<td>READ_PHONE_STATE</td>
<td>允许以只读方式访问电话状态，包括当前的呼叫状态。</td>
<td>SDK 会根据当前的呼叫状态，启停音频设备。如监听到当前为呼叫状态，则 SDK 会自动停止使用音频设备，直到通话结束。</td>
</tr>
<tr>
<td>WRITE_EXTERNAL_STORAGE</td>
<td>内置 SDK 写权限。</td>
<td>若需要使用媒体播放器或音效播放器加载 Android 外部存储内的媒体资源文件，则需要申请此权限，否则 SDK 无法加载资源。</td>
</tr>
</tbody></table>


<Note title="说明">


其中非必要权限 “android.permission.READ_PHONE_STATE” 仅用于实现 SDK 的打断事件处理，因此只需在 AndroidMainfest.xml 文件中进行声明即可，不需要动态申请（业务方有需求则另外处理）。
</Note>


### iOS 添加权限

打开项目，选择菜单 “TARGETS > Info > Custom iOS Target Properties”。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" />
</Frame>

单击 “+” 按钮，添加摄像头和麦克风权限。

- `Privacy - Camera Usage Description`

- `Privacy - Microphone Usage Description`

权限添加完成后，如图所示：

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" />
</Frame>

<Note title="说明">如果使用 Platform View，并且 Flutter 版本低于 1.22，则需要为 iOS 添加其他说明，请参考 [常见问题](#常见问题)。</Note>

### 引入 JavaScript SDK（适用于 Web）

在 index.html 中，使用 \<script> 标签引入 ZEGO Express SDK for Flutter 包内 /assets/packages/zego_express_engine 目录下的 ZegoExpressWebFlutterWrapper.js 和 copyrighted-music.js。

示例代码如下：

```html
<!-- <your-project>/web/index.html -->
<!DOCTYPE html>
<html>
...
<body>
  ...
  <script type="application/javascript" src="assets/packages/zego_express_engine/assets/ZegoExpressWebFlutterWrapper.js"></script>
  <script type="application/javascript" src="assets/packages/zego_express_engine/assets/copyrighted-music.js"></script>
  ...
</body>
</html>
```


## 常见问题
1. **iOS 平台使用 Platform View 时报错：“[VERBOSE-2:platform_view_layer.cc(28)] Trying to embed a platform view but the PaintContext does not support embedding”。**


打开需要使用 Platform View 的 iOS 工程，在 “Info > Custom iOS Target Properties“ 中，增加字段 `io.flutter.embedded_views_preview`，并设置 “Value” 为 “YES”。  

Flutter 1.22 或以上版本不再需要此设置。

<Frame width="512" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/flutter_embeded_views_plist.png" />
</Frame>  

2. **iOS 平台报错：“fatal error: lipo: -extract armv7 specified but fat file: [...] does not contain that architecture”。**

通常在切换 iOS 设备时出现，可通过删除 “flutter-project-path/build” 和 “flutter-project-path/ios/DerivedData” 目录解决。（如果没有 “DerivedData” 文件夹，请查找 “/Users/your-user-name/Library/Developer/Xcode/DerivedData”）。

3. **iOS 平台编译时报错：“CDN: trunk URL couldn't be downloaded” 或者 “CDN: trunk Repo update failed”。**

打开 Terminal 终端， `cd` 进项目根目录下的 "ios" 文件夹（“Podfile” 文件所在的目录），执行 `pod repo update`。

该报错通常是由于国内网络不畅导致的，建议开启代理，请参考 [CocoaPods 常见问题](https://doc-zh.zego.im/faq/CocoaPods_question?product=HybridHierarchicalDeliverySystem&platform=macos)。

4. **Android 平台 Flutter 升级至 v1.10 或以上版本时，Android release 下出现 “NoClassDefFoundError” 导致 Crash。**

Flutter 在 1.10 或以上版本默认开启了混淆，请在 “app/proguard-rules.pro”文件中， 为 SDK 添加 “-keep” 类的配置防止混淆。

```java
-keep class **.zego.**{*;}
```  

5. **Android 平台当频繁创建和销毁 TextureRenderer 时，发生崩溃，报错如下：**

```java
OpenGLRenderer  E  [SurfaceTexture-0-4944-46] updateTexImage: SurfaceTexture is abandoned!
       flutter  E  [ERROR:flutter/shell/platform/android/platform_view_android_jni.cc(39)] java.lang.RuntimeException: Error during updateTexImage (see logcat for details)
```

该问题是由于在 Flutter Engine 内部调用 “SurfaceTexture” 的 “updateTexImage()” 和 “release()”时，线程不安全引起的。该问题已在Flutter 1.24-candidate.2 版本中修复。详细信息请参考 [防止 SurfaceTexture.release 和 updateTexImage 之间的竞争](https://github.com/flutter/engine/pull/21777)。
