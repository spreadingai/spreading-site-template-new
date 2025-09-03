# 集成 SDK

---

<Note title="说明">请联系 ZEGO 商务人员，获取最新的 `大饼 AI 变声` SDK 包，并参考本文档跑通源码，集成 SDK 到您的项目中。</Note>

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- Visual Studio 2015 或以上版本。
- Windows 7 或以上版本。
- 麦克风、摄像头等支持音视频功能的外部设备。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Microsoft Visual Studio，选择“文件 > 新建 > 项目”菜单。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/add_project_1.png" /></Frame>

2. 在新建项目窗口，选择项目类型为“MFC 应用程序”，输入项目名称，选择项目存储路径，并单击“确定”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/add_project_2.png" /></Frame>

3. 进入 MFC 应用程序窗口，选择“应用程序类型”为“基于对话框”，并单击“完成”。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/add_project_3.png" /></Frame>
</Accordion>

### 2 导入 SDK

1. 请联系 ZEGO 商务人员，获取最新的 `大饼 AI 变声` SDK 包，并解压。

2. 将 “release/Library” 目录下的内容（包括 x86 和 x64 两个架构）拷贝到您的项目中。

### 设置项目属性

1. 在解决方案资源管理器窗口中，右键单击项目名称后，单击“属性”，进入项目属性页面。

2. 在项目属性页面内进行以下配置，配置完成后，单击“确定”。

    1. 将 “include” 目录加入到头文件搜索路径。
    
    在左侧菜单中，选择“配置属性 > C/C++ > 常规”，在“附加包含目录”中添加 “include” 目录。
    
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/project_property_1.png" /></Frame>

    2. 将 “lib” 目录加入到库搜索路径。
    
    在左侧菜单中，选择“配置属性 > 链接器 > 常规”，在“附加库目录”中添加 “lib/x86” 或 “lib/x64” 目录。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/project_property_2.png" /></Frame>

    3. 指定链接库 “ZegoExpressEngine.lib”。
    
    在左侧菜单中，选择“配置属性 > 链接器 > 输入”，在“附加依赖项”中添加 “ZegoExpressEngine.lib”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Windows/ZegoExpressEngine/Common/project_property_3.png" /></Frame>

## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)
