# 集成 SDK

- - -

本文介绍如何集成 ZIM Audio SDK。

## 前提条件

在集成 ZIM Audio SDK 之前，请确保
- 开发环境满足以下要求：
    - Android Studio 2020.3.1 或以上版本。
    - Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
    - Android 4.4 且支持语音功能的 Android 真机设备。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-android/send-and-receive-messages) 的 “2 集成 SDK”。

##  导入 SDK

目前支持的平台架构包括：armeabi-v7a、arm64-v8a、x86、x86_64。

开发者可通过以下任意一种方式实现集成 SDK。

#### 方式 1：自动集成 SDK

1. 配置 repositories 源

    - 当您的 Android Gradle Plugin 为 v7.1.0 或以上版本：进入项目根目录，打开 “settings.gradle” 文件，在 “dependencyResolutionManagement” 中加入如下代码。

        ```groovy
        ...
        dependencyResolutionManagement {
            repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
            repositories {
                maven { url 'https://maven.zego.im' }
                mavenCentral()
                google()
            }
        }
        ```

        <Warning title="注意">

        如果您在 “settings.gradle” 中找不到上述字段，可能是因为您的 Android Gradle Plugin 版本低于 v7.1.0。

        相关信息请参考 [Android Gradle Plugin Release Note v7.1.0](https://developer.android.google.cn/build/releases/past-releases/agp-7-1-0-release-notes#settings-gradle)。
        </Warning>

    - 若您的 Android Gradle Plugin 为 v7.1.0 以下版本：进入项目根目录，打开 “build.gradle” 文件，在 “allprojects” 中加入如下代码。

        ```groovy
        ...
        allprojects {
            repositories {
                maven { url 'https://maven.zego.im' }
                mavenCentral()
                google()
            }
        }
        ```

2. 声明依赖

    进入 “app” 目录，打开 “build.gradle” 文件，在 “dependencies” 中添加 `implementation 'im.zego:zim_audio:x.y.z'`，请从 [发布日志 - ZIMAudio](https://doc-zh.zego.im/article/19325) 查询 SDK 最新版本，并将 `x.y.z` 修改为具体的版本号。

    ```groovy
    ...
    dependencies {
        ...
        implementation 'im.zego:zim-audio:x.y.z'
    }
    ```

#### 方式 2：复制 SDK 文件手动集成

1. 请参考 [下载 SDK](/zim-android/client-sdks/sdk-downloads)，下载最新版本的 SDK。

2. 将 SDK 包解压至项目目录下，例如 “app/libs”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/android_studio_zimaudio_sdk.jpeg" /></Frame>


3. 添加 SDK 引用。进入到 “app” 目录，打开 “build.gradle” 文件。

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

## 设置权限

开发者可以根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

<Warning title="注意">

由于 Android 6.0 及以上版本在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) !=
            PackageManager.PERMISSION_GRANTED) {
        String[] permissions = {Manifest.permission.RECORD_AUDIO};
        requestPermissions(permissions, PERMISSION_REQUEST_CODE);
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
<td>必要权限</td>
<td>RECORD_AUDIO</td>
<td>录制音频权限。</td>
<td>发送音频时需要使用该权限。</td>
</tr>
</tbody>
</table>

## 防止混淆

在 “proguard-rules.pro” 文件中，为 SDK 添加 `-keep` 类的配置，防止混淆 SDK 公共类名称。

```txt
-keep class **.zego.**{*;}
```
