# 集成 SDK 

--- 

## 准备环境  
在开始集成 ZegoEffects SDK 前，请确保开发环境满足以下要求：  
- Android Studio 2.1 或以上版本。
- Android SDK 25、Android SDK Build-Tools 25.0.2、Android SDK Platform-Tools 25.x.x 或以上版本。
- Android 6.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机）。

## 集成 SDK  

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">

1. 打开 Android Studio，选择 “File > New > New Project” 菜单。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/ZegoLiveRoom-IntegrationGuide/3.1-new_project-1.png" /></Frame>

2. 填写项目名及项目存储路径。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/ZegoLiveRoom-IntegrationGuide/3.1-new_project-2.png" /></Frame>

3. 其它按照默认设置，单击 “Next”，最后单击 “Finish” 完成新工程创建。  
</Accordion>   

### 导入 SDK

目前支持的平台架构包括：arm64-v8a、armeabi-v7a、x86_64。

<Steps>
<Step title="获取 SDK">
请在 [下载](/ai-effects-android-java/downloads) 页面，获取最新版本的 SDK。  
</Step>
<Step title="解压 SDK">
解压 SDK 至项目目录，如 “app/libs”。  
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/integration_Android_1.png" alt="integration_Android_1.png"/></Frame>
</Step>
<Step title="添加 SDK 引用">
进入到 “app” 目录，打开 “build.gradle” 文件。  
    * 在 “defaultConfig” 节点添加 “ndk” 节点，指定支持的平台类型。  
        <Frame width="auto" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/integration_Android_2.png" alt="integration_Android_2.png"/></Frame>

        ```gradle title="app/build.gradle"
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64' 
        }
        ```

    * 在 “android” 节点添加 “sourceSets” 节点，指定 “libs” 所在目录。

        <Note title="说明">
        示例代码中 “libs” 目录仅为举例，开发者可根据实际路径填写。  
        </Note>

        <Frame width="auto" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/ZegoLiveRoom-IntegrationGuide/3_2_insert_sourceSets_node_2.png" /></Frame>

        ```gradle title="app/build.gradle"
        sourceSets {
            main {
                jniLibs.srcDirs = ['libs']
            }
        }
        ```

    * 在 “dependencies” 节点引入 “libs” 下所有的 jar。  

        <Frame width="auto" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ZegoLiveRoom/ZegoLiveRoom-IntegrationGuide/3_2_insert_sourceSets_node_3.png" /></Frame> 
    
        ```gradle title="app/build.gradle"
        implementation fileTree(dir: 'libs', include: ['*.jar'])
        ```  

</Step>
</Steps>

### 设置权限  

根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。 

<Note title="说明">
Android SDK 版本在 33 及以上，默认不开启 OpenCL，如需使用，开发者需要主动开启 OpenCL。<br/>
</Note>
 
```xml title="app/src/main/AndroidManifest.xml"
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- App 需要使用的部分权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />


<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />

<!-- Android SDK 33 或以上，需要执行以下语句开启 OpenCL-->
<uses-native-library android:name="libOpenCL.so" android:required="false"/>
<uses-native-library android:name="libOpenCL-car.so" android:required="false"/>
<uses-native-library android:name="libOpenCL-pixel.so" android:required="false"/>
```

<Warning title="注意">
因为 Android 6.0 在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>  

```java
String[] permissionNeeded = {
    "android.permission.CAMERA"};

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED) {
        requestPermissions(permissionNeeded, 101);
    }
}
```
## 防止混淆代码  

在 “proguard-rules.pro” 文件中，为 SDK 添加 `-keep` 类的配置，防止混淆 SDK 公共类名称。  

```proguard title="proguard-rules.pro"
-keep class **.zego.**{*;}
```

## 导入资源和模型

请根据 [导入资源和模型](/ai-effects-android-java/quick-starts/import-resources-and-models) 文档，导入 SDK 内的 AI 模型和资源。

## 相关文档

- [如何获取 SDK 的堆栈信息？](https://doc-zh.zego.im/faq/AI_Stack)
- [如何获取 SDK 的日志信息？](https://doc-zh.zego.im/faq/AI_log)
