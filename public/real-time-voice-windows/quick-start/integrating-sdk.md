# 集成 SDK

- - -


## 准备环境
在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：
- Visual Studio 2015 或以上版本。
- Windows 7 或以上版本。
- 麦克风等支持音频功能的外部设备。

## 集成 SDK
### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Microsoft Visual Studio，选择 “文件 > 新建> 项目” 菜单。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/add_project_1.png" /></Frame>

2. 在新建项目窗口，选择项目类型为 “MFC 应用程序”，输入项目名称，选择项目存储路径，并单击 “确认”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/add_project_2.png" /></Frame>

3. 进入 MFC 应用程序窗口，选择 “应用程序类型” 为 “基于对话框”，并单击 “完成”。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/add_project_3.png" /></Frame>
</Accordion>

### 导入 SDK
1. 下载 SDK。
    请从 [下载 SDK 包](/real-time-video-windows-cpp/client-sdk/download-sdk) 下载 SDK。
2. 解压 SDK，并拷贝到项目目录下。
   SDK 包含 “include” 和 “lib” 两个目录，每个目录包含的文件说明如下。
```cpp
include    --------------- 包含SDK头文件
lib        --------------- 包含SDK的.lib和.dll文件
   | x86   --------------- 32位版本
   | x64   --------------- 64位版本
```

## 设置项目属性
在解决方案资源管理器窗口中，右击项目名称，单击 “属性”，进入项目属性页。在项目属性页面内进行以下配置，配置完成后单击 “确定”。

1. 将 include 目录加入到头文件搜索路径。
选择 “配置属性 > C/C++ > 常规” 菜单，在 “附加包含目录” 中添加 include 目录。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/project_property_1.png" /></Frame>

2. 将 lib 目录加入到库搜索路径。
选择 “配置属性 > 链接器 > 常规” 菜单，在 “附加加库目录” 中添加 lib/x86 或 lib/x64 目录。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/project_property_2.png" /></Frame>

3. 指定链接库 ZegoExpressEngine.lib。
选择 “配置属性 > 链接器 > 输入” 菜单，在 “附加依赖项” 中添加 ZegoExpressEngine.lib。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/dev/Pics/Windows/ZegoExpressEngine/Common/project_property_3.png" /></Frame>
