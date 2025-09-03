# 示例代码运行指引

## 准备环境

请确保开发环境满足以下要求：

- 使用 [Cocos Creator](https://www.cocos.com/creator-download) v3.6.0 或以上版本（建议通过 Cocos Dashboard 下载最新的版本）。

- 根据需要运行的平台，确保对应的开发环境和设备。
  - Android：Android 5.0 或以上版本且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启**允许调试**选项。
  - iOS：Xcode 15.0 或以上版本，iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
  - macOS：macOS 10.13 或以上版本且支持音视频的 macOS 设备。
  - Windows：Windows 7 或以上版本且支持音视频的 Windows 设备；并安装 Visual Studio 2019 或以上版本。
  - 满足 Express Web SDK 兼容性的浏览器（具体请参考 [浏览器兼容性和已知问题](/real-time-video-web/introduction/browser-restrictions)），推荐使用最新版本的 Google Chrome 浏览器。
- 确保运行设备已经连接到 Internet。

<Note title="说明">
您可以从 [Github](https://github.com/zegoim/zego_express_cocos_creator_sdk/releases/) 下载其他 Cocos Creator 编辑器版本的示例 Demo 源码。
</Note>



## 前提条件

已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。

<Warning title="注意">
SDK 同时也支持 Token 鉴权，若您需要升级鉴权方式，可参考 [如何从 AppSign 鉴权升级为 Token 鉴权](/console/project-info)。
</Warning>
## 获取示例源码
<CardGroup cols={2}>
<Card title="示例源码" href="https://artifact-demo.zego.im/express/example/video/cocos_creator/ZegoExpressDemo_cocos_creator.zip" target="_blank">
本地下载
</Card>
<Card title="示例源码"  href="https://github.com/zegoim/zego_express_cocos_creator_sdk/releases/" target="_blank">
Github
</Card>
</CardGroup>

## 示例源码目录结构

下列结构为工程目录的文件结构，下文所涉及的文件路径均为相对于此目录的路径。

```bash
cocos_creator
├── VERSION.txt
└── ZegoExpressExample
    ├── assets
    │   ├── HomeScene.scene # 主场景
    │   ├── HomeScene.ts # 主场景的脚本
    │   ├── KeyCenter.ts # 填写申请的 AppID 和 AppSign
    │   ├── resources # 资源文件
    │   ├── topics # 示例专题
    │   └── utils # 工具类
    ├── native
    │   └── engine # 原生工程配置
    ├── package.json
    .
    .
```

## 运行示例代码

1. 解压已下载的示例 Demo 源码压缩包，并打开 “CocosDashboard”。
2. 在 CocosDashboard 中，单击项目侧边栏，然后单击“Add”按钮，导入示例工程源码所在的 ZegoExpressExample 目录。
3. 打开示例工程（建议使用示例工程指定的 Cocos Creator Editor 编辑器版本打开工程）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_add_project.png" /></Frame>

4. 加载示例工程后，控制台会报大量错误，原因是下载的示例源码中缺少 SDK，因此需要先 [下载 SDK 包](https://doc-zh.zego.im/article/16937) （无需解压）。
5. SDK 包下载完成后，在 Cocos Creator 菜单栏，选择“Extensions > Extensions Manager”。
6. 单击“Project” 并单击 **+** 号，导入下载好的 SDK 压缩包即可。

<Warning title="注意">
导入完成后，若控制台仍然报大量错误，请重新启动 Cocos Creator。
</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_extension_manager.png" /></Frame>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_import_sdk.png" /></Frame>

7. 示例源码中缺少 SDK 初始化所需的 AppID 和 AppSign，请使用 VS Code 打开示例源码工程，修改 assets/KeyCenter.ts 文件，请使用本文 [前提条件](https://doc-zh.zego.im/article/16918#1_2) 已获取的 AppID 和 AppSign 正确填写，否则示例源码无法正常运行。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_key_center.png" /></Frame>

8. 返回 Cocos Creator 检查控制台是否仍然有错误，若有错误，则重新打开“扩展编辑器”找到 SDK 扩展，尝试先停用 SDK 扩展（单击“开关”按钮），并打开“文件资源管理器/访达”，再回到 Cocos Creator 让其刷新资源，再重新启用 SDK 扩展。然后再打开“文件资源管理器/访达”，再回到 Cocos Creator，直到控制台没有报错为止。若仍然报错，可能需要多次重新启动 Cocos Creator并重复上述步骤。

9. 打开工程后，在左下角单击“Assets”，在 assets 目录下，双击 “HomeScene” 场景文件，可以看到示例源码主页的场景（主页为 2D 场景）。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_home_scene.png" /></Frame>

10. 在菜单栏选择“Project > Build”，先根据 Cocos Creator [安装配置原生开发环境](https://docs.cocos.com/creator/manualhttps://doc-zh.zego.im/article/editor/publish/setup-native-development.html) 文档配置好开发环境，然后再根据 [发布到原生平台](https://docs.cocos.com/creator/manualhttps://doc-zh.zego.im/article/editor/publish/native-options.html) 文档和实际情况，构建出原生平台工程。

<Note title="说明">
    若构建失败，请打开构建日志文件查看错误信息并根据错误提示修正问题。若错误信息与 ZEGO SDK 有关并难以自行解决，请联系 ZEGO 技术支持。
</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_build_manager.png" /></Frame>

11. 开始运行。

    - 运行到 Android 设备：

        1. 在菜单栏选择“Project > Build”，新建构建任务，平台选择 “Android”，填写好各项信息后，单击 “Build”，最后单击 “Make” 开始编译（此步骤耗时较久）。
        2. 完成上述操作后，连接 Android 设备并单击 “Run”。或者使用 Android Studio 打开原生工程目录 “build/android/proj” 进行操作。

<Note title="说明">
        若生成失败，请参考 [集成 SDK](/real-time-voice-cocos-creator/quick-start/integrating-sdk#常见问题) 文档中的常见问题 1、2、3 进行操作。


</Note>

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_run_android.png" /></Frame>

    - 运行到 iOS 设备：

        1. 在菜单栏选择“Project > Build”，新建构建任务，平台选择 “iOS”，填写好各项信息后，单击 “Build”，最后单击 “Make” 开始编译（此步骤耗时较久）。
        2. 完成上述操作后，使用 Xcode 打开 “build/ios/proj/ZegoExpressExample.xcodeproj” 原生工程，然后连接 iOS 真机设备，选择 “ZegoExpressExample-mobile” 目标，并选择该真机设备，单击 “Run” 按钮运行。

<Warning title="注意">


        - 若要构建 iOS 模拟器架构，请参考 [集成 SDK](https://doc-zh.zego.im/article/16939#step6_ios) 文档 “2.2 导入 SDK” 中关于 iOS 工程的额外处理步骤。
        - 若生成失败，请参考 [集成 SDK](https://doc-zh.zego.im/article/16939#Q7) 文档中的常见问题 7 进行操作。


</Warning>



        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_run_xcode.png" /></Frame>

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_run_ios.png" /></Frame>

    - 运行到 macOS 设备：

        1. 在菜单栏选择“Project > Build”，新建构建任务，平台选择 “macOS”，填写好各项信息后，单击 “Build”，最后单击 “Make” 开始编译（此步骤会比较久）。
        2. 完成上述操作后，单击 “Run”，或者使用 Xcode 打开 “build/mac/proj/ZegoExpressExample.xcodeproj” 原生工程进行操作。

<Note title="说明">


        若生成失败，请参考 [集成 SDK](https://doc-zh.zego.im/article/16939#Q7) 文档中的常见问题 7 进行操作。


</Note>



        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_run_macos.png" /></Frame>

    - 运行到 Windows 设备：

        1. 在菜单栏选择“Project > Build”，新建构建任务，平台选择 “Windows”，填写好各项信息后，单击 “Build”，最后单击 “Make” 开始编译（此步骤会比较久）。
        2. 完成上述操作后，单击 “Run”，或者使用 Visual Studio 打开 “build\windows\proj\ZegoExpressExample.sln” 原生工程进行操作。

        <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/CocosCreator/Express/cocos_express_demo_run_windows.png" /></Frame>

## 体验实时音视频功能

在真机中运行项目，运行成功后，可以看到本端视频画面。

为方便体验，ZEGO 提供了一个 [Web 端调试示例](https://zegodev.github.io/zego-express-webrtc-sample/assistDev/index.html)，在该页面下，输入相同的 AppID、RoomID，输入不同的 UserID、以及对应的 [Token](/console/development-assistance/temporary-token)，即可加入同一房间与真机设备互通。当成功开始音视频通话时，可以听到远端的音频，看到远端的视频画面。


# 常见问题

**1. 打开示例工程时 CocosDashboard 报错 `The editor version does not exist` 如何处理？**

- 方式 1：本地尚未安装示例工程指定的 Cocos Creator 版本，请单击 CocosDashboard 侧边栏的 Editor 选项卡，并单击右下角的 Download 下载指定的 Cocos Creator 版本。
- 方式 2：单击示例工程的 Editor Version 下拉框，修改示例工程所使用的编辑器版本，但这样可能会存在兼容性问题，需要自行解决。

<Content />
