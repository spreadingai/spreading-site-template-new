# 集成 SDK

- - -

## 准备环境

请确保开发环境满足以下技术要求：

* Windows系统：Windows7、Windows8、Windows10。
* 已安装 Visual Studio 2019 及以上版本。
* Visual Studio 已安装 C# 开发环境和 Newtonsoft NuGet 程序包（详情请参考 [跑通示例源码-常见问题](/real-time-video-windows-cs/quick-start/run-example-code#常见问题)）。
* 已安装 .NET FrameWork 4.5 或以上版本。
* 已安装 .NET Core 3.1 或以上版本。
* 麦克风、摄像头等支持音视频功能的外部设备正常。

## 集成 SDK

### （可选）新建项目
<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Visual Studio，选择菜单栏，选择“文件 > 新建 > 项目”，新建项目。
2. 在新建项目窗口选择语言为 “C#”，为了创建带 UI 界面的工程，推荐勾选 “Windows 窗体应用(.NET Framework)” 项目类型，然后单击“下一步”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/integrate_4.png" /></Frame>

3. 在弹出的“配置新项目”界面中，填写“项目名称”、“位置”和“解决方案名称”，并选择框架为 “.NET Framework 4.5” 或者以上版本，然后单击 “创建”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/integrate_5.png" /></Frame>

4. 右键单击已创建的项目，选择“属性 > 生成”，根据当前 Windows 的系统属性，配置平台为 “x64” 或者 “x86”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/integrate_13.png" /></Frame>

    假如没有该平台选项，则右键单击解决方案后，选择 “配置管理器”，在活动解决方案平台中，单击“新建”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_1_4_1.png" /></Frame>
    在“新建解决方案”窗口，选择“x64” 和 “x84” 配置项，单击“确定”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_1_4_2.png" /></Frame>
</Accordion>

### 导入 SDK

#### SDK 以源码形式导入

1. 从 [下载](https://doc-zh.zego.im/article/5567) 下载 SDK 项目源码。

2. 将源码目录下 “ZegoExpressCsharp” 文件夹以及 “libs” 文件夹拷贝到当前解决方案目录下（WindowsFormsApp1.sln）。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_2_1_1.png" /></Frame>

3. 在 Visual Studio 的解决方案目录单击右键，选择 “添加 > 现有项目”，选择步骤 2 拷贝的 “ZegoExpressCsharp” 文件夹中的 “ZegoExpressCsharp.csproj” 项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_2_1_3.png" /></Frame>

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_2_1_3_2.png" /></Frame>


4. 右键已创建的项目（WindowsFormsApp1），选择 “添加 > 引用 > 项目”，然后选择 “ZegoExpressCsharp.csproj” 项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_2_2_1_4.png" /></Frame>

<Warning title="注意">


以源码形式导入 SDK 后，仍需要拷贝依赖库 “ZegoExpressEngine.dll” 到运行目录，详细操作请参考 [3 拷贝依赖库到运行目录](#拷贝依赖库到运行目录)。

</Warning>




## 拷贝依赖库到运行目录


- **方式 1（推荐）：自动拷贝**

    可以在项目生成事件中，添加生成后的事件命令行，用于自动拷贝。

    ```csharp
    xcopy /Y $(SolutionDir)libs\ZegoExpress\win\$(PlatformName)\ZegoExpressEngine.dll $(TargetDir)
    ```

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/integrate_3_1.png" /></Frame>

- **方式 2：手动拷贝**

    手动拷贝 “libs” 目录下 “ZegoExpressEngine.dll” 依赖库到输出路径。例如，当前系统为 64 位，拷贝 “libs\ZegoExpress\win\x64” 目录下 “ZegoExpressEngine.dll” 到输出路径：

    1. 右键当前项目，单击 “属性”，选择 “生成” 后，设置输出路径。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_3_1_2_1.png" /></Frame>

    2. 将 “ZegoExpressEngine.dll” 拷贝到输出路径中。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/dotnet/ZegoExpressEngine/Common/Integrate_3_1_3.png" /></Frame>


## 启动调试

在 Visual Studio 中，单击“启动”，开始调试项目。


## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size?product=ExpressVideo&platform=windows)
