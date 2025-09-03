# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

* Android Studio 2020.3.1 或以上版本。

- Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
- Android 4.4 或以上版本，且支持音视频的 Android 设备。
- Android 设备已经连接到 Internet。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Android Studio，选择 “File > New > New Project” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project.png" /></Frame>

2. 填写项目名及项目存储路径。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project_finish.png" /></Frame>

3. 其它按照默认设置，单击 “Next”，最后单击 “Finish” 完成新工程创建。
</Accordion>

### 导入 SDK

目前支持的平台架构包括：armeabi-v7a、arm64-v8a、x86、x86_64。

开发者可通过以下任意一种方式实现集成 SDK。

#### 方式 1：自动集成 SDK（推荐）

1. 进入项目根目录，打开 “settings.gradle” 文件，在 “dependencyResolutionManagement” 中加入如下代码。

    <Warning title="注意">


    如果您在 “settings.gradle” 中找不到以下字段，可能是因为您的 Android Gradle Plugin 版本低于 v7.1.0。

    相关信息请参考 [Android Gradle Plugin Release Note v7.1.0](https://developer.android.google.cn/build/releases/past-releases/agp-7-1-0-release-notes#settings-gradle)。
    </Warning>

    ```groovy
    ...
    dependencyResolutionManagement {
        repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
        repositories {
            maven { url 'https://maven.zego.im' }
            google()
            mavenCentral()
        }
    }
    ```

    若您的 Android Gradle Plugin 版本低于 v7.1.0，请按照如下方式操作：

    进入项目根目录，打开 “build.gradle” 文件，在 “allprojects” 中加入如下代码。

    ```groovy
    ...
    allprojects {
        repositories {
            maven { url 'https://maven.zego.im' }
            google()
            mavenCentral()
        }
    }
    ```

2. 进入 “app” 目录，打开 “build.gradle” 文件，在 “dependencies” 中添加 `implementation 'im.zego:express-video:x.y.z'`，请从 [发布日志](https://doc-zh.zego.im/article/12542) 查询 SDK 最新版本，并将 `x.y.z` 修改为具体的版本号。

    ```groovy
    ...
    dependencies {
        ...
        implementation 'im.zego:express-video:x.y.z'
    }
    ```

#### 方式 2：复制 SDK AAR 文件手动集成

<Accordion title="复制 SDK AAR 文件手动集成" defaultOpen="false">
1. 请参考 [下载](/real-time-video-android-java/client-sdk/download-sdk) 文档，下载最新版本的 SDK 并解压。

2. 将解压后的 AAR 文件中的 “release/Library/ZegoExpressEngine.aar” 文件拷贝至您的项目目录下，如 “app/libs”。

    <Note title="说明">


    SDK 包中的 “release/Library/” 目录下的文件包含：

    - “.aar” 文件：供您在采用本集成方式时使用，其他文件可以忽略。
    - 其他文件：供您在采用 [方式 3：复制 SDK JAR 和 SO 文件手动集成](#方式-3复制-sdk-jar-和-so-文件手动集成) 使用。
    </Note>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_aar.png" /></Frame>

3. 进入项目根目录，打开 “settings.gradle” 文件，在 “dependencyResolutionManagement” 中加入如下代码。

    ```groovy
    ...
    dependencyResolutionManagement {
        repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
        repositories {
            google()
            mavenCentral()
            flatDir {
                dir 'app/libs'
            }
        }
    }
    ```

    如果您在 “settings.gradle” 中找不到上述字段，可能是因为您的 Android Gradle Plugin 版本低于 v7.1.0，相关信息请参考 [Android Gradle Plugin Release Note v7.1.0](https://developer.android.google.cn/build/releases/past-releases/agp-7-1-0-release-notes#settings-gradle)。此时请按照如下方式操作：

    进入项目根目录，打开 “build.gradle” 文件，在 “allprojects” 中加入如下代码。

    ```groovy
    ...
    allprojects {
        repositories {
            google()
            mavenCentral()
            flatDir {
                dir 'app/libs'
            }
        }
    }
    ```

4. 进入 “app” 目录，打开 “build.gradle” 文件，在 “dependencies” 中添加 `implementation(name: 'ZegoExpressEngine', ext: 'aar')`。

    ```groovy
    ...
    dependencies {
        ...
        implementation(name: 'ZegoExpressEngine', ext: 'aar')
    }
    ```

    并在 “defaultConfig” 节点添加 “ndk” 节点，指定支持的架构。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_ndk_node.png" /></Frame>

    ```groovy
    ndk {
        abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
    }
    ```

    <Note title="说明">


    根据实际情况决定要支持的架构。通常在发布 App 时只需要保留 "armeabi-v7a" 和 "arm64-v8a" 即可，可以减少 APK 包大小。
    </Note>
</Accordion>

<a name="Integration_3"></a>

#### 方式 3：复制 SDK JAR 和 SO 文件手动集成

<Accordion title="复制 SDK JAR 和 SO 文件手动集成" defaultOpen="false">
1. 请参考 [下载](/real-time-video-android-java/client-sdk/download-sdk) 文档，下载最新版本的 SDK 并解压。

2. 将解压后的 “release/Library/” 目录下的 “所有文件（除 .aar 文件之外）” 拷贝至您的项目目录下，如 “app/libs”。

    <Note title="说明">


    - 架构目录下的 “include” 目录是 SDK 的 C++ 头文件，如果您仅使用 Java 接口进行开发，可以忽略。
    - “ZegoExpressEngine-sources.jar” 是源码包，您可在 Android Studio 导入，以获得更好的开发体验，详情请参考 [Express Android SDK 如何查看 API 注释和文档？](https://doc-zh.zego.im/faq/express_android_java_api_doc?product=All&platform=android)
    </Note>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_jar.png" /></Frame>

3. 添加 SDK 引用，打开 “app” 目录下的 “build.gradle” 文件。

    1. 在 “defaultConfig” 节点添加 “ndk” 节点，指定支持的架构。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_ndk_node.png" /></Frame>

        ```groovy
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
        }
        ```

        <Note title="说明">

        根据实际情况决定要支持的架构。通常在发布 App 时只需要保留 "armeabi-v7a" 和 "arm64-v8a" 即可，可以减少 APK 包大小。
        </Note>

    2. 在 “android” 节点添加 “sourceSets” 节点，指定 “libs” 所在目录。

        <Note title="说明">

        示例代码中 “libs” 目录仅为举例，开发者可根据实际路径填写。
        </Note>

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_sourceSets_node.png" /></Frame>

        ```groovy
        sourceSets {
            main {
                jniLibs.srcDirs = ['libs']
            }
        }
        ```

    3. 在 “dependencies” 节点引入 “libs” 下所有的 jar。

        ```groovy
        dependencies {
            implementation fileTree(dir: 'libs', include: ['*.jar'])
            ......
        }
        ```
</Accordion>

## 设置权限

根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- App 需要使用的部分权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<uses-feature
    android:glEsVersion="0x00020000"
    android:required="true" />

<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```

<Warning title="注意">


- 由于 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
- 关于 BLUETOOTH 权限：仅 Android 6.0 以下版本需要声明，Android 6.0 及以上版本无需声明。
</Warning>

```java
String[] permissionNeeded = {
    "android.permission.CAMERA",
    "android.permission.RECORD_AUDIO"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
        //101 为 requestCode，可以是任何大于 0 的数字，会透传到权限请求结果回调 onRequestPermissionsResult
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
<td rowspan="2">SDK 会根据网络状态的改变执行不同的操作。例如，当网络重连时，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。</td>
</tr>
<tr>
<td>ACCESS_NETWORK_STATE</td>
<td>获取当前网络状态权限。</td>
</tr>
<tr>
<td>CAMERA</td>
<td>访问相机权限。</td>
<td>预览和发送视频时需要使用该权限。</td>
</tr>
<tr>
<td>RECORD_AUDIO</td>
<td>录制音频权限。</td>
<td>发送音频时需要使用该权限。</td>
</tr>
<tr>
<td>BLUETOOTH</td>
<td>
连接蓝牙设备权限。
</td>
<td>
连接蓝牙设备时需要使用该权限。
<Warning title="注意">
<p>仅 Android 6.0 以下版本需要声明，Android 6.0 及以上版本无需声明。</p>
</Warning>
</td>
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

## 防止混淆代码

在 “proguard-rules.pro” 文件中，为 SDK 添加 `-keep` 类的配置，防止混淆 SDK 公共类名称。

```txt
-keep class **.zego.**{*;}
```

## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)
