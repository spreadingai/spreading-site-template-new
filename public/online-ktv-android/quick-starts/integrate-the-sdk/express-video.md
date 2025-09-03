# 实时音视频

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

* Android Studio 2020.3.1 或以上版本。
* Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
* Android 4.4 或以上版本，且支持音视频的 Android 设备。
* Android 设备已经连接到 Internet。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Android Studio，选择 “File > New > New Project” 菜单。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project.png" alt="android_new_project.png"/></Frame>

2. 填写项目名及项目存储路径。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_new_project_finish.png" alt="android_new_project_finish.png"/></Frame>

3. 其它按照默认设置，单击 “Next”，最后单击 “Finish” 完成新工程创建。
</Accordion>

### 导入 SDK

目前支持的平台架构包括：armeabi-v7a、arm64-v8a、x86、x86_64。

开发者可通过以下任意一种方式实现集成 SDK。

<Tabs>
<Tab title="自动集成 SDK">
1. 进入项目根目录，打开 “settings.gradle” 文件，在 “dependencyResolutionManagement” 中加入如下代码。

    ```groovy title="settings.gradle"
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

    <Warning title="注意">

    如果您在 “settings.gradle” 中找不到上述字段，可能是因为您的 Android Gradle Plugin 版本低于 v7.1.0。

    相关信息请参考 [Android Gradle Plugin Release Note v7.1.0](https://developer.android.google.cn/build/releases/past-releases/agp-7-1-0-release-notes#settings-gradle)。
    </Warning>

    若您的 Android Gradle Plugin 版本低于 v7.1.0，请按照如下方式操作：

    进入项目根目录，打开 “build.gradle” 文件，在 “allprojects” 中加入如下代码。

    ```groovy title="build.gradle"
    ...
    allprojects {
        repositories {
            maven { url 'https://maven.zego.im' }
            google()
            mavenCentral()
        }
    }
    ```

2. 进入 “app” 目录，打开 “build.gradle” 文件，在 “dependencies” 中添加 `implementation 'im.zego:express-private:3.22.0.46151'`。

    ```groovy title="app/build.gradle"
    ...
    dependencies {
        ...
        implementation 'im.zego:express-private:3.22.0.46151'
    }
    ```
</Tab>
<Tab title="复制 SDK 文件手动集成">
1. 请参考 [下载](/online-ktv-android/downloads) ，下载最新版本的 SDK。

2. 解压 SDK 至项目目录，如 “app/libs”。

    <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/ktv/plugin/android_video.png" alt="android_video.png"/></Frame>

    <Note title="说明">

    "ZegoExpressEngine-sources.jar" 是源码包，可在 Android Studio 导入以获得更好的开发体验。

    具体可参考 [Express Android SDK 如何查看 API 注释和文档？](https://doc-zh.zego.im/faq/express_android_java_api_doc?product=All&platform=android)

    </Note>

3. 添加 SDK 引用，进入 “app” 目录，打开 “build.gradle” 文件。

    <Steps>
        <Step title="在 “defaultConfig” 节点添加 “ndk” 节点，指定支持的架构。">
            <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_ndk_node.png" alt="add_ndk_node.png"/></Frame>

            ```groovy title="app/build.gradle"
            ndk {
                abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            }
            ```

            <Note title="说明">
            根据实际情况决定要支持的架构。通常在发布 App 时只需要保留 "armeabi-v7a" 和 "arm64-v8a" 即可，可以减少 APK 包大小。
            </Note>
        </Step>
        <Step title="在 “android” 节点添加 “sourceSets” 节点，指定 “libs” 所在目录。">
            <Note title="说明">
            示例代码中 “libs” 目录仅为举例，开发者可根据实际路径填写。
            </Note>

            <Frame width="512" height="auto" ><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/add_sourceSets_node.png" alt="add_sourceSets_node.png"/></Frame>

            ```groovy title="app/build.gradle"
            sourceSets {
                main {
                    jniLibs.srcDirs = ['libs']
                }
            }
            ```
        </Step>
        <Step title="在 “dependencies” 节点引入 “libs” 下所有的 jar。">
        ```groovy title="app/build.gradle"
        dependencies {
            implementation fileTree(dir: 'libs', include: ['*.jar'])
            ......
        }
        ```
        </Step>
    </Steps>
</Tab>
</Tabs>

## 设置权限

根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。

```xml title="app/src/main/AndroidManifest.xml"
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
<uses-permission android:name="android.permission.WAKE_LOCK" />

<uses-feature
    android:glEsVersion="0x00020000"
    android:required="true" />

<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```

<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>

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

## 防止混淆代码

在 “proguard-rules.pro” 文件中，为 SDK 添加 `-keep` 类的配置，防止混淆 SDK 公共类名称。

```txt title="proguard-rules.pro"
-keep class **.zego.**{*;}
```

## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)