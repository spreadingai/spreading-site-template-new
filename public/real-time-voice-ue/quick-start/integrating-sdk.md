# 集成 SDK

- - -

## 准备环境


请确保开发环境满足以下技术要求：

- 安装 Unreal Engine 4.25 或以上版本。您可以在 [下载启动程序](https://www.unrealengine.com/download) 下载 Epic Games Launcher，然后参考 [安装虚幻引擎](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/) 安装您需要的 Unreal Engine 版本：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_1.PNG" /></Frame>

    安装完成后，可根据需要配置选项：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_2.PNG" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_install_3.PNG" /></Frame>

- 根据示例代码需要运行到的平台，选择对应的开发环境或设备：

    - 运行 Android 示例源码要求：Android 5.0 或以上版本，且支持音视频的 Android 设备或模拟器（推荐使用真机），如果是真机，请开启“允许调试”选项，详情请参考 [Android 开发要求](https://docs.unrealengine.com/android-development-requirements-for-unreal-engine/)。
    - 运行 iOS 示例源码要求：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机），详情请参考 [iOS 和 TVOS 开发要求](https://docs.unrealengine.com/SharingAndReleasing/Mobile/iOS/SDKRequirements/)。
    - 运行 macOS 示例源码要求：macOS 11 或以上版本，且支持音视频的 macOS 设备，详情请参考 [硬件和软件规格](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/RecommendedSpecifications/)。
    - 运行 Windows 示例源码要求：Windows 7 或以上版本，且支持音视频的 Windows 设备，并安装了 Visual Studio 2019 或以上版本，详情请参考 [硬件和软件规格](https://docs.unrealengine.com/Basics/InstallingUnrealEngine/RecommendedSpecifications/)。
    - 确保所运行设备网络连接正常。

<Warning title="注意">

Unreal Engine 4.25 版本，与 M1 或以上系列处理器的 macOS 系统不兼容。

</Warning>



## 集成 SDK

### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="true">
1. 打开 Epic Games Laucher，启动 Unreal Engine Editor。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_open_proj.png" /></Frame>

2. 选择 “第一人称游戏”，类型为 “C++”，选择项目路径，填写项目名称为 “first_person_game”，点击 “创建”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_create_project.png" /></Frame>

3. 创建成功后，会自动打开 Unreal Engine Editor 和 Visual Studio（Windows）。
</Accordion>

### 导入 SDK

目前 ZEGO Unreal Engine SDK 支持 Android、iOS、macOS、Windows 平台。

1. 请参考 [下载 SDK 包](https://doc-zh.zego.im/article/17989)，下载最新版本的 SDK，下载完成后进行解压。

2. 手动将 “ZegoExpressSDKPlugin” 文件夹拷贝到开发者项目的 “Plugins” 目录下。如果没有该目录，请手动新建一个名为 “Plugins” 的文件夹。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_copy_plugin.png" /></Frame>

3. 重新启动 Unreal Engine Editor，打开您的项目 “first_person_game”。编译完成后，选择菜单 “编辑 > 插件”，确保已勾选 “ZegoExpressSDKPlugin” 文件。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_plugin_import.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_plugin_import_1.png" /></Frame>
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_plugin_import_2.png" /></Frame>

4. 编辑项目目录下的 “Source/first_person_game/first_person_game.Build.cs” 文件，向 “PublicDependencyModuleNames.AddRange()” 添加 ZEGO 依赖库：

    ```cpp
    PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", "EnhancedInput", "ZegoExpressSDKPlugin" });
    ```


## 设置权限

对于 Andriod、iOS、macOS 平台，需要开发者手动获取摄像头、麦克风权限。

### Android 平台

1. 找到项目目录下的 “Source/first_person_game/first_person_game.Build.cs” 文件，添加如下代码：

    ```cpp
    if (Target.Platform == UnrealTargetPlatform.Android)
    {
        // request mic and camera permission
        AdditionalPropertiesForReceipt.Add("AndroidPlugin", Path.Combine(ModuleDirectory, "android_permission.xml"));
        PrivateDependencyModuleNames.AddRange(new string[] { "AndroidPermission" });
    }
    ```

2. 在项目目录 “Source/first_person_game” 下新建一个 “android_permission.xml” 文件，添加如下代码：

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <!-- steps to add to build additions -->
    <root xmlns:android="http://schemas.android.com/apk/res/android">
        <androidManifestUpdates>
            <addPermission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
            <addPermission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
            <addPermission android:name="android.permission.RECORD_AUDIO"/>
            <addPermission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
            <addPermission android:name="android.permission.INTERNET"/>
            <addPermission android:name="android.hardware.camera"/>
            <addPermission android:name="android.hardware.camera.autofocus"/>
            <addPermission android:name="android.permission.CAMERA"/>
            <addPermission android:name="android.permission.BLUETOOTH"/>
            <addPermission android:name="android.permission.READ_PHONE_STATE"/>
            <addPermission android:name="android.permission.ACCESS_NETWORK_STATE"/>
            <addPermission android:name="android.permission.ACCESS_WIFI_STATE"/>
        </androidManifestUpdates>
    </root>
    ```

3. 在您的项目中，添加如下代码，检查相关权限是否已申请成功。

    ```
    void UZegoMainUserWidget::NativeConstruct() {
        Super::NativeConstruct();

    #if PLATFORM_ANDROID
        CheckAndroidPermission();
    #endif
    }

    void UZegoMainUserWidget::CheckAndroidPermission() {
    #if PLATFORM_ANDROID
        FString pathfromName = UGameplayStatics::GetPlatformName();
        if (pathfromName == "Android") {
            UE_LOG(LogTemp, Warning, TEXT("check android permission!"));
            TArray<FString> AndroidPermission;
            AndroidPermission.Add(FString("android.permission.WRITE_EXTERNAL_STORAGE"));
            AndroidPermission.Add(FString("android.permission.READ_EXTERNAL_STORAGE"));
            AndroidPermission.Add(FString("android.permission.RECORD_AUDIO"));
            AndroidPermission.Add(FString("android.permission.MODIFY_AUDIO_SETTINGS"));
            AndroidPermission.Add(FString("android.permission.CAMERA"));
            AndroidPermission.Add(FString("android.hardware.camera.autofocus"));
            AndroidPermission.Add(FString("android.hardware.camera"));
            AndroidPermission.Add(FString("android.permission.INTERNET"));
            AndroidPermission.Add(FString("android.permission.BLUETOOTH"));
            AndroidPermission.Add(FString("android.permission.READ_PHONE_STATE"));
            AndroidPermission.Add(FString("android.permission.ACCESS_WIFI_STATE"));
            AndroidPermission.Add(FString("android.permission.ACCESS_NETWORK_STATE"));
            UAndroidPermissionFunctionLibrary::AcquirePermissions(AndroidPermission);
        }
    #endif
    }
    ```

### iOS 平台

点击 “编辑 > 项目设置 > 平台 > iOS”，将以下代码粘贴到 “Additional Plist Data” 输入框中，申请摄像头、麦克风权限。

```cpp
<key>NSAppleMusicUsageDescription</key>\n<string>We can play music</string>\n<key>NSCameraUsageDescription</key>\n<string>We need Camera</string>\n<key>NSMicrophoneUsageDescription</key>\n<string>We need Microphone</string>
```

### macOS 平台

打包完成后，直接编辑产物 “Contents” 目录下的 “info.plist” 文件。使用 XCode 编辑权限，添加摄像头、麦克风权限。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/UE/ue_run_macos_4.jpeg" /></Frame>

### 其他设置

#### iOS、macOS 平台

开发者可以设置 Unreal Engine 在 iOS、macOS 平台上使用标准 C 的内存分配方式，避免在使用 SDK 插件时，出现异常的内存释放问题。

在项目目录下的 “Source/first_person_game/first_person_game.Target.cs” 中，添加如下代码：

```cpp
if (Target.Platform == UnrealTargetPlatform.Mac || Target.Platform == UnrealTargetPlatform.IOS) //强制指定使用c语言风格的内存分配方式
{
    bOverrideBuildEnvironment = true;
    GlobalDefinitions.Add("FORCE_ANSI_ALLOCATOR=1");
}
```

## 常见问题

1. **传入 SDK 的字符串、SDK 回调的字符串出现乱码，该如何处理？**

    SDK 字符串类型一般为标准类型 “std::string”，不能直接转换为 Unreal Engine 中使用的字符串类型 FString，开发者需要手动转换字符串数据类型：

    ```cpp
    // std::string 转 FString
    std::string sdk_str = "";
    FString ue_str = FString(UTF8_TO_TCHAR(sdk_str.c_str()));
    ```

    ```cpp
    // FString 转 std::string
    FString ue_str = TEXT("");
    std::string sdk_str = TCHAR_TO_UTF8(*ue_str);
    ```

2. **在 SDK 回调中调用 Unreal Engine 的接口，刷新界面时出现崩溃，该如何处理？**

    Unreal Engine 不允许在非 GameThread 中进行界面刷新等操作，需要切换线程：

    ```cpp
    engine_->loginRoom(room_id, user, config, [=](/real-time-voice-ue/quick-start/int-errorcode,-std::string-extendeddata) {
        // 切换到 GameThread 执行
        AsyncTask(ENamedThreads::GameThread, [=](){
            // 更新 UI
        });
    });
    ```

3. **macOS 平台用 Unreal Engine Editor 4.25 编译出现如下报错，该如何处理？**

    编译出错如下：

    ```
    error: no such file or directory: '/System/Library/PrivateFrameworks/MultitouchSupport.framework/Versions/Current/MultitouchSupport'
    ```

    1. 修改 Unreal Engine 安装目录下文件：

    - “UE_4.25/Engine/Source/Runtime/ApplicationCore/ApplicationCore.Build.cs”
    - “UE_4.25/Engine/Source/Runtime/Core/Core.Build.cs”

    ```cpp
    //PublicAdditionalLibraries.Add("/System/Library/PrivateFrameworks/MultitouchSupport.framework/Versions/Current/MultitouchSupport");//注释并替换为以下代码
    string SDKROOT = Utils.RunLocalProcessAndReturnStdOut("/usr/bin/xcrun", "--sdk macosx --show-sdk-path");
    PublicAdditionalLibraries.Add(SDKROOT + "/System/Library/PrivateFrameworks/MultitouchSupport.framework/Versions/Current/MultitouchSupport.tbd");
    ```

    2. 修改完成后，重新启动编辑器。

4. **修改项目配置后，重新打开不生效，该如何处理？**

    请尝试删除项目目录下的 “Intermediate” 文件夹，再重新打开编辑器。

5. **macOS 平台不能打开打包好的应用，提示应用包已损坏，该如何处理？**

    1. 命令行输入 `sudo spctl --master-disable`。
    2. 再次打开，在 “系统偏好设置 > 安全性与隐私” 中，选择“允许打开应用”。
