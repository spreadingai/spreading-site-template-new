# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- [Unity](https://unity.com/download) 2018.4.21f1 或以上版本（建议通过 Unity Hub 下载最新的 LTS 版本）。安装 Unity 时，请根据需要运行的平台，勾选对应的 "Plaforms" 模块一起下载。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/install_unity_modules.png" /></Frame>

- 根据需要运行的平台，确保对应的开发环境和设备。
  - Android：Android 4.4 或以上版本且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
  - iOS：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
  - macOS：macOS 10.13 或以上版本且支持音视频的 macOS 设备。
  - Windows：Windows 7 或以上版本且支持音视频的 Windows 设备；并安装 Visual Studio 2015 或以上版本。
  - Linux：任意具有 GLIBC 2.16 或以上版本的 Linux 发行版系统（目前仅支持 x86_64 架构），libasound（ALSA），libv4l2（v4l utils），CMake 3.7 或以上版本。
  - WebGL：浏览器需要支持 WebGL 以及 WebAssembly（推荐使用 WebGL 2.0），Chrome 57 或以上版本、Firefox 56 或以上版本，Safari 11 或以上版本，**不支持移动设备上使用**。推荐使用最新版的浏览器，以达到最佳的性能和兼容性。

- 确保运行设备已经连接到 Internet。

## 集成 SDK

### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
单击 “新建” 按钮，选择 “3D” 模版，填写 “项目名称”，选择 “位置” 存放项目，单击 “创建” 按钮，创建项目。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/int-create.png" /></Frame>
</Accordion>

### 导入 SDK

目前，Unity 支持 Android、iOS、macOS、Windows、Linux、WebGL 平台。

1. 请参考 [下载 SDK 包](https://doc-zh.zego.im/article/21098)，下载最新版本的 SDK，下载完成后进行解压。

2. 手动将 “Plugins”，“Scripts” 两个目录，拷贝到开发者项目的 “Assets” 目录下，即可集成 SDK。

    如果需要支持 WebGL 平台，还需要同时将 “WebGLTemplates” 拷贝到开发者项目的 “Assets” 目录下。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Web/ExpressSDK/Unity_WebGL/Unity_WebGL_1.jpeg" /></Frame>

3. 对于不同的运行平台，需要做一些额外处理。

    <a name="Windows"></a>
    - **Windows**

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/multiple_dll_error.png" /></Frame>

        Unity 项目中不能存在同名的 `.dll` 文件，否则在 Build 时会出现 "Multiple plugins with the same name 'zegoexpressengine" 错误。
        开发者需根据实际业务情况删除 Plugins/Windows 文件夹下的 x64 文件夹或 x86 文件夹，不准备运行到 Windows 平台则可以直接删除 Plugins/Windows 文件夹。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/windows_all_archs.png" /></Frame>

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/windows_one_arch.png" /></Frame>

    - **macOS**

        在 Unity 2019.3 之前版本不支持将 macOS dylib 作为 Plugins，需要手动将 "libZegoExpressEngine.dylib" 重命名为 "ZegoExpressEngine.bundle" 才能正确导入 SDK，且 macOS 版本不能低于 10.5。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/macos_dylib.png" /></Frame>

    - **iOS**

        导出 Xcode 工程后，直接运行可能会报如下错误：

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/ios_multiple_archs_error.png" /></Frame>

        iOS 平台的 XCFramework 中有三个文件夹：

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/QuickStart/ios_xcframework.png" /></Frame>

        - "ios-arm64" 是真机架构，用于真机运行调试以及上架发布。**当需要在真机上运行时请保留此文件夹并删除其他两个**。

        - "ios-arm64_×86_64-simulator" 是模拟器架构，用于模拟器运行调试。**如果需要运行 iOS 模拟器请保留此文件夹并删除其他两个**（即当工程配置 iOS Target SDK 指定为 Simulator SDK 时）。

        - "ios-arm64_×86_64-maccatalyst" 是 iOS MacCatalyst 架构，目前 Unity 暂不支持此架构，**请直接删除**，详情请参考 [Unity 官网说明](https://forum.unity.com/threads/mac-catalyst.1183951/)。

    - **Android**

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/android_win_dll_error.png" /></Frame>

        构建 Android App 时也可能会提示存在多个 Windows dll 文件的问题，请按照上述 [Windows 的处理方式](https://doc-zh.zego.im/article/21098#Windows) 操作。

    - **其他平台**

        无需额外处理。

## 设置权限

根据实际应用平台，设置 SDK 所需的摄像头和麦克风权限。

### Android 平台

在 UNITY_2018_3_OR_NEWER 或以上版本中，Unity 不会主动获取摄像头和麦克风权限，需要开发者调用获取权限。

```cs
#if(UNITY_2018_3_OR_NEWER)
using UnityEngine.Android;
#endif
void Start()
{
#if (UNITY_2018_3_OR_NEWER)
    permissionList.Add(Permission.Microphone);
    permissionList.Add(Permission.Camera);
#endif
}
void Update()
{
#if (UNITY_2018_3_OR_NEWER)
    // 获取设备权限
    CheckPermission();
#endif
}
private void CheckPermission()
{
#if (UNITY_2018_3_OR_NEWER)
    foreach (string permission in permissionList)
    {
        if (Permission.HasUserAuthorizedPermission(permission))
        {
        }
        else
        {
            Permission.RequestUserPermission(permission);
        }
    }
#endif
}
```

### iOS 平台

需要运行到 iOS 设备的项目，导出 Xcode 工程后，选择 Info.plist 文件，添加摄像头和麦克风权限。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/unity_set_ios_privacy.png" /></Frame>

## 界面自适应

由于 Android 设备和 iOS 设备的屏幕方向存在 Portrait、PortraitUpsideDown、LandscapeLeft、LandscapeRight 四种方向，为保证推流预览和拉流的显示界面始终在正确的方向，推荐在 Update 方法中添加以下代码。

<Note title="说明">


开发者也可根据实际业务情况，参考以下代码，通过调用 `SetAppOrientation` 接口传入对应角度，保证推流预览和拉流的显示界面始终在正确的方向。


</Note>





```cs
private DeviceOrientation preOrientation=DeviceOrientation.Unknown;
void Update()
{
    #if UNITY_ANDROID||  UNITY_IPHONE
        if (engine != null)
        {
            if (preOrientation != Input.deviceOrientation)
            {

                if (Input.deviceOrientation == DeviceOrientation.Portrait)
                {
                    engine.SetAppOrientation(ZegoOrientation.ZegoOrientation_0);
                }
                else if (Input.deviceOrientation == DeviceOrientation.PortraitUpsideDown)
                {
                    engine.SetAppOrientation(ZegoOrientation.ZegoOrientation_180);
                }
                else if (Input.deviceOrientation == DeviceOrientation.LandscapeLeft)
                {
                    engine.SetAppOrientation(ZegoOrientation.ZegoOrientation_90);
                }
                else if (Input.deviceOrientation == DeviceOrientation.LandscapeRight)
                {
                    engine.SetAppOrientation(ZegoOrientation.ZegoOrientation_270);
                }
                preOrientation = Input.deviceOrientation;

            }
        }
    #endif
}
```
## （可选，适用于 Web 项目）引入版权音乐模块

<Accordion title="如需开发一个 Web KTV项目，请展开。" defaultOpen="false">
如果您需要开发一个 Web KTV 项目，在 [在线 KTV - 下载](https://doc-zh.zego.im/article/15533) 获取包含版权音乐的 Express SDK 后，完成对上述引入步骤，请打开 `Assets/WebGLTemplates/zegoTemplates/index.html` 文件，在 `head` 标签内引入以下两个 js 文件。

```html
<!-- If the copyrighted music feature is not required, you can omit including the 'copyrighted-music.js' file. -->
<script src="./lib/copyrighted-music.js"></script>
<!-- If the copyright music scoring function is not required, you can omit including the 'voice-changer.js' file. -->
<script src="./lib/voice-changer.js"></script>
```
</Accordion>

## 常见问题

1. **为什么在多次启用或停止编辑器调试过程中，Unity 会出现卡死的情况？**

    在编辑器运行程序调试时，请务必添加以下代码，避免 Unity 出现卡死的问题。

    ```cs
    void OnApplicationQuit() {

        ZegoExpressEngine.DestroyEngine();
    }
    ```

2. **导出 iOS Xcode 工程后还需要集成 ZegoExpressEngine.framework 吗？**

    需要集成，以 Unity 2019.4 导出的 Xcode 工程为例，需要在 “TARGETS > Build Phases > Embed Frameworks” 菜单中，集成 ZegoExpressEngine.framework。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/ios_add_embedded_framework.png" /></Frame>

    否则运行到设备上时，可能会报出如下的错误：

    ```txt
    no suitable image found.  Did find:
    /private/var/containers/Bundle/Application/3CC0EE65-89C9-45F5-8E22-A4AC194DF260/hello.app/Frameworks/UnityFramework.framework/Frameworks/ZegoExpressEngine.framework/ZegoExpressEngine: code signature in (/private/var/containers/Bundle/Application/3CC0EE65-89C9-45F5-8E22-A4AC194DF260/hello.app/Frameworks/UnityFramework.framework/Frameworks/ZegoExpressEngine.framework/ZegoExpressEngine) not valid for use in process using Library Validation: mapped file has no cdhash, completely unsigned? Code has to be at least ad-hoc signed.
    ```

    开发者也可参考以下的 ZEGO_BuildPostProcess.cs 文件，根据实际情况调整代码后，将文件放置在 Unity 的 Assets 目录下的 Editor 目录下。Unity 导出 Xcode 项目的过程中将自动完成 ZegoExpressEngine.framework 的集成，无须手动添加，即可实现自动配置集成 ZegoExpressEngine.framework。

    ```cs
    using UnityEngine;
    using UnityEditor;
    using UnityEditor.Callbacks;
    using System.Collections;
    #if UNITY_IOS
    using UnityEditor.iOS.Xcode.Extensions;
    using UnityEditor.iOS.Xcode;
    #endif
    using System.IO;

    public class ZEGO_BuildPostProcess
    {

        [PostProcessBuild]
        public static void OnPostprocessBuild(BuildTarget buildTarget, string path) {

            if (buildTarget == BuildTarget.iOS) {
                LinkLibraries (path);
            }
        }

        public static void LinkLibraries (string path) {
    #if UNITY_IOS
            // 链接库
            string projPath = path + "/Unity-iPhone.xcodeproj/project.pbxproj";
            PBXProject proj = new PBXProject();
            proj.ReadFromFile(projPath);
            string target;
            string unityTargetGuid;

            var unityMainTargetGuidMethod = proj.GetType().GetMethod("GetUnityMainTargetGuid");

            if (unityMainTargetGuidMethod != null)
            {
                target = (string)unityMainTargetGuidMethod.Invoke(proj, null);
            }
            else
            {
                target = proj.TargetGuidByName("Unity-iPhone");
            }

            var unityFrameworkTargetGuidMethod = proj.GetType().GetMethod("GetUnityFramworkTargetGuid");
            if(unityFrameworkTargetGuidMethod != null)
            {
                unityTargetGuid = (string)unityFrameworkTargetGuidMethod.Invoke(proj, null);
            }
            else
            {
                unityTargetGuid = proj.TargetGuidByName("UnityFramework");
            }

            // 禁用 bitcode
            proj.SetBuildProperty(unityTargetGuid, "ENABLE_BITCODE", "false");
            proj.SetBuildProperty(target, "ENABLE_BITCODE", "false");

            // 将默认框架添加到主项目
            string defaultLocationInProj = path + "/Frameworks/Plugins/iOS/ZegoExpressEngine.xcframework/ios-arm64";//实际 ZegoExrpessFramework 路径
            string coreFrameworkName = "ZegoExpressEngine.framework";
            string framework = Path.Combine(defaultLocationInProj, coreFrameworkName);
            string fileGuid = proj.AddFile(framework, "/" + coreFrameworkName, PBXSourceTree.Source);
            PBXProjectExtensions.AddFileToEmbedFrameworks(proj, target, fileGuid);

            // 写入项目
            File.WriteAllText(projPath, proj.WriteToString());

            // 添加权限
            string pListPath = path + "/Info.plist";
            PlistDocument plist = new PlistDocument();
            plist.ReadFromString(File.ReadAllText(pListPath));
            PlistElementDict rootDic = plist.root;
            var cameraPermission = "NSCameraUsageDescription";
            var micPermission = "NSMicrophoneUsageDescription";
            rootDic.SetString(cameraPermission, "Video need to use camera");
            rootDic.SetString(micPermission, "Voice call need to user mic");
            File.WriteAllText(pListPath, plist.WriteToString());

    #endif
        }

    }
    ```

3. **为什么集成 SDK 后，在 Unity Editor 调试过程中创建 SDK 经常失败？**

    如果仅在 Unity Editor 中出现创建 SDK 失败，请检查 Unity Editor 是否有如下的配置：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Unity3D/ZegoExpressEngine/Unity_Editor.png" /></Frame>

    如果按图中勾选了对应设置，Unity Editor 在停止调试后一段时间会缓存静态变量，导致 SDK 内部静态变量没有重置而出现异常，表现为首次 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 成功，Unity Player 停止运行后再启动 [CreateEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cs_unity3d~class~ZegoExpressEngine#create-engine) 失败，详情请参考 [域重新加载](https://docs.unity3d.com/cn/current/Manual/DomainReloading.html)。

<Content />

