export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const platformMap = {
  'iOS': "iOS",
  'macOS': "macOS",
}

export const newProjectMap = {
  'iOS': <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_1.png" alt="NewProject_1.png" />,
  'macOS': <img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_4.png" alt="NewProject_4.png" />,
}

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 启动 Xcode，在 “Welcome to Xcode” 窗口中单击 “Create a new Xcode project” 或选择 “File > New > Project” 菜单。在出现的表单中，选择 {getPlatformData(props,platformMap)} 平台，并在 “Application” 下选择 “App”，单击 “Next”。
    
   <Frame width="512" height="auto" caption="">{getPlatformData(props,newProjectMap)}</Frame>

2. 填写表单并选取各个选项来配置项目，单击 “Next”。

    必须提供 “Product Name” 和 “Organization Identifier”，用于创建在整个系统中标识 App 的 “Bundle Identifier”。   
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_2.png" alt="NewProject_2.png"/></Frame>


3. 选择项目存储路径，单击 “Create” 创建项目。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/NewProject_3.png" alt="NewProject_3.png"/></Frame>
</Accordion>

# 集成 SDK

---

## 准备环境

在开始集成 ZegoEffects SDK 前，请确保开发环境满足以下要求：

- Xcode 6.0 或以上版本。
- macOS 10.13 或以上版本的 macOS 设备。

## 集成 SDK

### （可选）新建项目

<Content platform="macOS" />

### 导入 SDK

1. 请在 [下载](/ai-effects-macos-c/downloads) 页面，获取最新版本的 SDK zip 包并解压。  

2. 手动将 SDK 动态库文件 “ZegoEffects.xcframework” 拷贝到开发者的项目目录下。

3. 打开 Xcode，选择 “File > Add Files to "xxx"（xxx 为项目名）” 菜单，添加 SDK 库文件到项目。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/add-files.png" /></Frame>

4. 选择 “TARGETS > General > Frameworks,Libraries,and Embedded Content” 菜单，添加 ZegoEffects.xcframework，将 “Embed” 设置为 “Embed & Sign”。
    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/integration_macOS_1.png" alt="integration_macOS_1.png"/></Frame>

## 设置权限

根据实际应用需要，设置应用所需权限。

在 Xcode 中，选择 “TARGETS > Signing & Capabilities > App Sandbox” 菜单，勾选 Hardware 的 “Camera” 选项，设置 SDK 所需的权限。 
<Frame width="auto" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/AI_Vision/QuickStarts/integration_macOS_2.png" alt="integration_macOS_2.png"/></Frame>

## 导入资源和模型

请根据 [导入资源和模型](/ai-effects-macos-c/quick-starts/import-resources-and-models) 文档，导入 SDK 内的 AI 模型和资源。

## 相关文档

- [如何获取 SDK 的堆栈信息？](https://doc-zh.zego.im/faq/AI_Stack)
- [如何获取 SDK 的日志信息？](https://doc-zh.zego.im/faq/AI_log)

<Content />