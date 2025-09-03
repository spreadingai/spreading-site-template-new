# 集成 SDK

- - -

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- macOS 11.0 或以上版本。
- 已安装 Xcode 15 或以上版本。
- （可选）已安装 [CMake](https://cmake.org/download/)。
- （可选）安装 [Qt](http://download.qt.io/official_releases/qt) 5.9 ～ 5.15 之间的任意版本，详细信息请参考 [Getting Started with Qt](https://doc.qt.io/qt-5/gettingstarted.html)。
- 麦克风、摄像头等支持音视频功能的外部设备。

## 集成 SDK

### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 Qt Creator，选择“文件 > 新建 > 项目”菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ZegoExpressEngine/Common/add_project_1.png" /></Frame>

2. 新建项目窗口，选择项目类型为 “Qt Widgets Application”，输入项目名称，选择项目存储路径，并单击“确定”。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ZegoExpressEngine/Common/add_project_2.png" /></Frame>

3. 选择用 qmake 编译，创建项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/macOS/ZegoExpressEngine/Common/add_project_3.png" /></Frame>
</Accordion>

### 2.2 导入 ZEGO Express SDK

1. 请从 [下载](/real-time-video-macos-cpp/client-sdk/download-sdk) 页面下载 ZEGO Express SDK。

2. 解压 SDK，并将 “release/Library” 目录下的 “ZegoExpressEngine.xcframework” 文件拷贝到您的项目中。

<Warning title="注意">



如果您的工程不支持 XCFramework，可以将 “ZegoExpressEngine.xcframework” 当做一个文件夹，直接使用里面的 “.dylib” 动态库和头文件即可。

</Warning>





## 设置项目属性

编辑项目 pro 文件，在 pro 文件中添加以下内容：

```cpp
INCLUDEPATH += $PWD/../libs/ZegoExpress/mac/ZegoExpressEngine.xcframework/macos-arm64_x86_64/Headers
DEPENDPATH  += $PWD/../libs/ZegoExpress/mac/ZegoExpressEngine.xcframework/macos-arm64_x86_64/Headers
LIBS += -L$PWD/../libs/ZegoExpress/mac/ZegoExpressEngine.xcframework/macos-arm64_x86_64/ -lZegoExpressEngine
```

## 相关文档

[如何减少集成 Native SDK 的 App 体积？](https://doc-zh.zego.im/faq/express_reduce_app_size)

<Content />
