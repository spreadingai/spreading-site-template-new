# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- [Cocos Creator](https://www.cocos.com/creator-download) v3.6.0 或以上版本（建议通过 Cocos Dashboard 下载最新的版本）。

<Note title="说明">
    请勿使用 Cocos Creator v3.6.2 版本，详情请参考下方 <a href="https://doc-zh.zego.im/article/16919#Q6">常见问题 6</a>。
</Note>



- 根据需要运行的平台，确保对应的开发环境和设备。
  - Android：Android 5.0 或以上版本且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启**允许调试**选项。
  - iOS：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
  - macOS：macOS 10.13 或以上版本且支持音视频的 macOS 设备。
  - Windows：Windows 7 或以上版本且支持音视频的 Windows 设备；并安装 Visual Studio 2019 或以上版本。
  - 满足 Express Web SDK 兼容性的浏览器（具体请参考 [浏览器兼容性和已知问题](/real-time-video-web/introduction/browser-restrictions)），推荐使用最新版本的 Google Chrome 浏览器。

- 确保运行设备已经连接到 Internet。



## 集成 SDK

### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
打开 Cocos Dashboard，新建项目，根据实际情况选择一个模版，填写项目名称并指定项目保存的位置并创建项目。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_dashboard_new_project.png" /></Frame>
</Accordion>

### 导入 SDK

目前，Cocos Creator 支持 Android、iOS、macOS、Windows 平台。

1. 请参考 [下载 SDK](https://doc-zh.zego.im/article/16904) 文档，下载最新版本的 SDK。

2. 打开 “Extensions > Extensions Manager”，在项目选项卡下，单击加号，添加扩展，选择上一步下载下来的 SDK 压缩包。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_extension_manager.png" /></Frame>

3. 添加完成后，确认扩展管理器中有 zego_express_cocos_creator_sdk 并处于启用状态，然后查看资源管理器，在 assets 目录下，应当存在一个 “zego_express_engine” 目录，里面为 SDK 的 TypeScript 层源码。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_scripts_in_assets.png" /></Frame>

    项目根目录下的 “assets/zego_express_engine” 文件夹是扩展管理器启用 SDK 扩展时自动拷贝的，当停用 SDK 时该文件夹会被自动删除。因此建议将 “assets/zego_express_engine” 目录添加到 “.gitignore” 中，不必提交到 git。

    ```
    #//////////////////////////
    # ZEGO RTC
    #//////////////////////////
    /assets/zego_express_engine*
    /extensions/zego_express_cocos_creator_sdk*
    /native/plugins/zego_express_engine*
    ```

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_gitignore.png" /></Frame>

4. 先根据 Cocos Creator [安装配置原生开发环境](https://docs.cocos.com/creator/manualhttps://doc-zh.zego.im/article/editor/publish/setup-native-development.html) 文档配置好开发环境，然后再根据 [发布到原生平台](https://docs.cocos.com/creator/manualhttps://doc-zh.zego.im/article/editor/publish/native-options.html) 文档和实际情况，构建出原生平台工程。

<Note title="说明">
    若构建失败，请打开构建日志文件查看错误信息并根据错误提示修正问题。若错误信息与 ZEGO SDK 有关并难以自行解决，请联系 ZEGO 技术支持。
</Note>



5. 将 “native/engine” 原生工程配置文件纳入 git 跟踪。

    建议把工程的 “native/engine” 目录纳入 git 跟踪，从而能持久化跟踪原生工程的配置，在多人协作中非常有帮助。打开工程根目录的 “.gitignore” 文件，可以看到默认模版中 “native” 目录被忽略了，可以改为：

    ```txt
    native/*
    !native/engine/
    ```

    <a name="step6"></a>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_gitignore_native_engine.png" /></Frame>

    从而让 git 收集 “native/engine” 目录下的文件。

6. 部分平台需要做一些额外处理。

    - Android

        1. 使用 Android Studio 打开原生工程 “MyAwesomeProject/build/android/proj”。

        <Note title="说明">
        若使用 macOS 开发，请勿直接打开 Android Studio，而是需要打开终端，并输入 `open -a "Android Studio"` 来启动 Android Studio 以解决潜在问题，请参考 [Issue](https://github.com/cocos/cocos-engine/issues/12456#issuecomment-1220338692) 以获得更多信息。
        </Note>

        2. 打开 “native/engine/android/app/build.gradle” 文件，在 “android.sourceSets.main.jniLibs” 节点添加 SDK Native 插件库所在目录。

        `srcDir "../../../plugins/zego_express_engine/android/libs"`

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_gradle_jni_libs.png" /></Frame>

        3. 在 dependencies 节点导入 SDK Native 插件库的所有 jar 包。

        `implementation fileTree(dir: "../../../plugins/zego_express_engine/android/libs", include: ['*.jar'])`

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_gradle_jar.png" /></Frame>

        4. 在 “native/engine/android/app/proguard-rules.pro” 文件中，为 SDK 添加 -keep 类的配置，防止混淆 SDK 公共类名称：`-keep class **.zego.**{*;}`。

    <a name="step6_ios"></a>

    - iOS

        1. SDK 插件默认使用 iOS 真机架构，若要构建 iOS 模拟器，请打开工程的 “native/engine/ios/CMakeLists.txt” 文件，在 `cc_ios_before_target` 上面添加如下配置：

        ```cmake
        set(IOS_VARIANT "SIMULATOR") # DEVICE / SIMULATOR / MACCATALYST
        ```

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_cmake_set_ios_variant.png" /></Frame>

        2. 在“构建发布”面板中，重新生成 iOS 工程。当需要构建 iOS 真机架构时，将上面的值改为 “DEVICE” 即可，或者删除该行配置。

        3. （可选）对于 Cocos Creator iOS 原生工程，推荐直接使用导出的 Xcode 原生工程进行编译、运行、调试，不建议使用“构建发布”面板中的“生成”与“运行”按钮进行编译与运行 iOS 应用。
        4. （可选）若一定要使用“构建发布”面板中的按钮来直接生成与运行，注意“构建发布配置”中的“目标平台”仅能勾选其中一种，不能同时勾选真机与模拟器，否则必定生成失败。并且当勾选 “iOS Simulator 模拟器”时，需要按照上述指引修改 iOS 原生工程的 CMake 配置。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_ios_target_os_config.png" /></Frame>

## 设置权限

根据实际需要，设置 SDK 所需的摄像头和麦克风权限。

### Android

根据实际应用需要，设置应用所需权限。

打开 “native/engine/android/app/AndroidManifest.xml” 文件，添加权限声明。

```xml
<!-- 必要权限 -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>

<!-- 非必要权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

<Warning title="注意">
由于 Android 6.0+ 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限，因此还需要参考执行如下代码，其中 requestPermissions 是 Activity 的方法。
</Warning>



以下简单示例在 App 启动时申请权限，也可以根据实际情况在合适的时机申请（在调用 SDK 的 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~typescript_cocos-creator~class~ZegoExpressEngine#create-engine) 前申请即可）。

```java
// native/engine/android/app/src/com/cocos/game/AppActivity.java

import android.content.pm.PackageManager;
import android.os.Build;
import androidx.core.content.ContextCompat;

// ......

public class AppActivity extends CocosActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.shared().init(this);

        String[] permissionNeeded = {
                "android.permission.CAMERA",
                "android.permission.RECORD_AUDIO"};

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
                    ContextCompat.checkSelfPermission(this, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(permissionNeeded, 101);
            }
        }

    }

// ......

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



### iOS

使用 Xcode 打开原生工程 “MyAwesomeProject/build/ios/proj/MyAwesomeProject.xcodeproj”。

1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" /></Frame>

2. 单击 “+” 添加按钮，根据实际应用需要，添加摄像头和麦克风权限。

    - `Privacy - Camera Usage Description`
    - `Privacy - Microphone Usage Description`

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" /></Frame>

3. （可选）如果没有在 Cocos Creator 构建面板中勾选 “跳过 Xcode 工程更新”，下次构建 iOS 时，上面添加的内容会被覆盖掉。建议修改 “native/engine/ios/Info.plist” 文件，并确保 “native/engine/ios” 目录有被 git 跟踪，从而添加的权限声明能持久化。

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone</string>
```

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_apple_privacy_info_plist.png" /></Frame>

### macOS

按照实际需要添加摄像头和麦克风权限声明，详情请参考 [iOS](https://doc-zh.zego.im/article/16919#3_2)。

建议修改 “native/engine/mac/Info.plist” 文件，并确保 “native/engine/mac” 目录有被 git 跟踪，从而添加的权限声明能持久化。

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone</string>
```



## 常见问题

<a name="Q1"></a>

**1. Android 运行时 JS 报错 `ReferenceError: ZegoExpressBridge is not defined`如何处理？**

1. 请检查 “build/android/proj/build/cmake/debug/arm64-v8a/build_output.txt” 构建输出文件，搜索 “ZEGO”，若搜索不到相关内容，说明 SDK 没有成功加载。
2. 若发现有 “NodeJS is not found in $PATH” 的输出，说明 Android Studio 内执行的 cmake 无法找到 node 导致 SDK 无法加载，请参考 [Issue](https://github.com/cocos/cocos-engine/issues/12456#issuecomment-1220338692)。
3. 请参考 [导入 SDK](https://doc-zh.zego.im/article/16919#step6) 的“第 6 步”中关于 Android 工程的提示：通过终端输入 `open -a "Android Studio"` 来启动 Android Studio。
4. 启动 Android Studio 后，先在菜单栏中，选择 “Build > Clean Project” 清理构建缓存，然后在菜单栏中，选择 “File > Invalidate Caches...”，清除 IDE 缓存并重启 Android Studio。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_android_src.png" /></Frame>

5. 在菜单栏中，选择 “File > Sync Project With Gradle Files”，查看工程目录中 “MyAwesomeProject > cpp” 文件夹下是否存在包含 ZEGO 相关 C++ 源码的 “src” 文件夹，若不存在请再次清理缓存、重启 Android Studio。

6. （可选）若反复清理、重启多次后仍然无法解决，请联系 ZEGO 技术支持。

**2. 构建 Android 工程时报错 `java.lang.UnsatisfiedLinkError: dlopen failed: library "libZegoExpressEngine.so" not found` 如何处理？**

未完整集成 SDK，请参考 [导入 SDK](https://doc-zh.zego.im/article/16919#step6) 的“第 6 步”中关于 Android 工程的额外处理步骤。

**3. 构建 Android 工程时报如下错误，如何处理？**

```txt
* What went wrong:
Execution failed for task ':libcocos:compileReleaseJavaWithJavac'.
> java.lang.IllegalAccessError: class org.gradle.internal.compiler.java.ClassNameCollector (in unnamed module @0x7e7b1ec8) cannot access class com.sun.tools.javac.code.Symbol$TypeSymbol (in module jdk.compiler) because module jdk.compiler does not export com.sun.tools.javac.code to unnamed module @0x7e7b1ec8
```

一般是本机的 JDK 版本过高，与 Cocos 原生工程模版的 Android Gradle Plugin 版本不适配，建议安装使用 JDK 11。

若本机已然指定使用 JDK 11 (环境变量 `JAVA_HOME` 指向 JDK 11)，但还是报此错误，可能是 macOS 直接打开 “CocosDashborad” 应用时，没有读取到本机定义在 `.zshrc` 的 `JAVA_HOME` 环境变量，请通过终端输入 `open -a CocosDashboard` 来启动 “CocosDashborad”。

**4. Windows 运行时画面、字体模糊如何解决？**

Cocos Creator 在 Windows 上的显示效果不佳，为已知问题，优化方式如下：

1. 在菜单栏中，选择 “项目 > 项目设置 > 宏配置”，并勾选 “ENABLE_WEBGL_ANTIALIAS” 和 “ENABLE_ANTIALIAS_FXAA”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Common/cocos_project_setting_antialias.png" /></Frame>

2. 针对 Label 文字显示模糊问题，可以将字体大小 Font Size 扩大 2 倍，同时 Node 的 Scale 设为原来的 0.5 倍。

**5. 构建 iOS 模拟器时，报错提示 `Undefined symbol: _zego_express_xxxxxxxxxx` 如何处理？**

请参考 [导入 SDK](https://doc-zh.zego.im/article/16919#step6) 中的“第 6 步”，关于 iOS 工程的额外处理步骤进行处理。

<a name="Q6"></a>

**6. 运行 Debug 包时必现崩溃 `Assertion failed` 如何处理？**

Cocos Creator 3.6.2 版本存在一个 [bug](https://github.com/cocos/cocos-engine/issues/13696)，建议使用 Cocos Creator 3.6.1 / 3.6.3 或更高版本，或者您也可以根据 Cocos 引擎的 [Pull Request](https://github.com/cocos/cocos-engine/pull/13721) 自行修复处理。

<a name="Q7"></a>

**7. 构建 iOS 或 macOS 工程时报如下错误，如何处理？**

```
[cmake] -- The CXX compiler identification is unknown
[cmake-err] CMake Error at CMakeLists.txt:6 (project):
    No CMAKE_CXX_COMPILER could be found.
```

当使用 Xcode 14 或更高版本时，要求使用 CMake 3.23.3 或更高版本，详情请参考 [Issue](https://gitlab.kitware.com/cmake/cmake/-/issues/23609)。如果您已安装新版本的 CMake 但仍然遇到此问题，请在菜单栏中选择 “CocosCreator > 偏好设置 > 外部程序”，并指定 CMake 为您自行安装的路径。

**8. 在 CocosCreator 的编辑器中进行预览时，调用 SDK 的接口无响应？**

当前版本 SDK 暂不支持 Web 平台，请使用 “构建发布” 运行到原生平台。
