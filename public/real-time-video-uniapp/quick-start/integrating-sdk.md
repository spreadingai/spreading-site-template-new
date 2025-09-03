# 集成 SDK

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- HBuilderX 3.0.0 或以上版本。
- App:
    - 准备 iOS 及 Android 设备，版本要求如下：
        - iOS 12.0 或以上版本且支持音视频的 iOS 设备。
        - Android 4.4 或以上版本且支持音视频的 Android 设备。
    - iOS 及 Android 设备已经连接到 Internet。
- Web:
    - 准备一台可以连接到互联网的 Windows 或 macOS 计算机。
    - 使用最新版本的 Chrome 浏览器。

<Note title="说明">


- 浏览器的兼容性，请参考 [ZEGO Express Web SDK 支持哪些浏览器？](https://doc-zh.zego.im/faq/browser_support)。

</Note>

<Warning title="注意">

- 如果您只需要使用 uni-app 开发 Web 平台应用，建议使用 [Web SDK](https://doc-zh.zego.im/article/overview?key=ExpressVideoSDK&platform=web&language=javascript) 以获得更及时的功能更新。
- 如果您使用uni-app同时开发原生端及 Web，请先联系技术支持。

</Warning>

## 集成 SDK

### 创建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 启动 HBuilderX，选择“文件 > 新建 > 项目”菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/New_Project_uniapp.png" /></Frame>

2. 在出现的表单中，选择 “uni-app” 平台，并填写项目名称，单击“创建”，即可创建项目。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Choose_platform_uniapp.png" /></Frame>
</Accordion>

### 集成 SDK

<Warning title="注意">
uni-app SDK 视频相关的画面是基于原生 view 进行渲染的，只能使用 nvue。
</Warning>



#### 方式 1：在 ZEGO 官网下载 SDK

1. 下载 [Express-Video SDK](/real-time-video-uniapp/client-sdk/download-sdk) 到本地，解压缩 “zego-ZegoExpressUniAppSDK” 文件。

2. 将解压缩后的文件夹，直接复制到项目工程根目录下的 “nativeplugins” 文件夹中，如果没有该目录，请手动创建。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Import_SDK_uniapp.png" /></Frame>

#### 方式 2：通过 uni-app 插件市场获取 [Express-Video SDK](https://ext.dcloud.net.cn/plugin?id=3617)。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Get_SDK_uniapp.png" /></Frame>

1. 在 uni-app 插件市场任选一种方式导入：

    - 方式 1：单击 “购买（0元） for 云打包”，选择相应的项目导入。
    - 方式 2：单击 “下载 for 离线打包”，离线导入。

    下载 SDK 到本地，解压缩 “zego-ZegoExpressUniAppSDK” 文件。将解压缩后的文件夹，直接复制到项目工程根目录下的 “nativeplugins” 文件夹中，如果没有该目录，请手动创建。

### 在 uni-app 项目中导入插件

1. 单击项目目录的 “manifest.json” 文件后，单击 “App 原生插件配置” 中的“选择本地插件”或“选择云端插件”。

<Note title="说明">


    其他常见问题，请参考 [在 Windows 平台上集成 Express uni-app SDK 后，使用 dev 证书云打包运行 iOS 应用时出错，该如何处理？](https://doc-zh.zego.im/faq/RTC_uniapp_packing_within_Windows?product=ExpressVideo&platform=uni-app)

</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Choose_plugin_uniapp.png" /></Frame>

3. 在弹出的选择框中，选择 “ZegoExpress 音视频 SDK” 后，单击“确认”，即添加成功。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Confirm_uniapp.png" /></Frame>

### 自定义调试基座

#### 制作自定义调试基座

<Note title="说明">


uni-app 官方自定义调试基座使用说明请参考 [什么是自定义调试基座及使用说明](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)。

</Note>



1. 选择“运行 > 运行到手机或模拟器 > 制作自定义调试基座”菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Customize_uniapp.png" /></Frame>

2. 在弹出的界面中，按照 [uni-app 教程](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)，填写相关信息，并单击“打包”进行云打包。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Unpack_uniapp.png" /></Frame>

    打包成功后，控制台会收到 uni-app 的相关提示。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/Packaged_successfully_uniapp.png" /></Frame>

#### 切换运行基座为自定义调试基座

自定义调试基座选择“运行 > 运行到手机或模拟器 > 运行基座选择 > 自定义调试基座”菜单。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/QuickStart/run_uniapp.png" /></Frame>



## 集成 JS 封装层


1. 导入 JS 封装层。

    在插件市场的 [ZegoExpressEngine 音视频插件（JS）](https://ext.dcloud.net.cn/plugin?id=7748) 界面，单击右侧的“使用 HBuilderX 导入插件”。

    <Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/8ff3f5d466.png" /></Frame>

    导入的 JS 封装层将存储在 `uni_modules` 目录中，目录结构如下。

    <Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace741/896bc39e2e65b82d5670b01b7c131c30/d19d1a5c0c.png" /></Frame>

2. 导入后，可以在业务代码中引入 JS 封装层，并调用 Express 相关接口，示例如下：

    ```javascript
    import ZegoExpressEngine from '@/uni_modules/zego-ZegoExpressUniApp-JS/components/zego-ZegoExpressUniApp-JS/lib/ZegoExpressEngine';
    ```

## 设置权限

根据实际应用需要，设置应用所需权限。

进入 `manifest.json` 文件，打开 App 权限设置，在 App 云打包权限配置里添加权限。

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- App 需要使用的部分权限 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<uses-feature
    android:glEsVersion="0x00020000"
    android:required="true" />

<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```

<Warning title="注意">


由于 Android 6.0 在一些比较重要的权限上要求必须申请动态权限。因此还需要参考执行如下代码，`permission.js` 文件可以在示例代码中查看。

</Warning>



```javascript
import permision from "@/pages/permission.js";

if (uni.getSystemInfoSync().platform === "android") {
    await permision.requestAndroidPermission(
	"android.permission.RECORD_AUDIO"
    );
    await permision.requestAndroidPermission(
	"android.permission.CAMERA"
    );
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
<td rowspan="7">必要权限</td>
<td>INTERNET</td>
<td>访问网络权限。</td>
<td>SDK 基本功能都需要在联网的情况下才可以使用。</td>
</tr>
<tr>
<td>ACCESS_WIFI_STATE</td>
<td>获取当前 WiFi 状态权限。</td>
<td rowspan="2">SDK 会根据网络状态的改变执行不同的操作。例如，当网络重连时，SDK 内部会将网络断开时的状态都恢复，用户不需做额外的操作。</td>
</tr>
<tr>
<td>ACCESS_NETWORK_STATE</td>
<td>获取当前网络状态权限。</td>
</tr>
<tr>
<td>CAMERA</td>
<td>访问相机权限。</td>
<td>预览和发送视频时需要使用该权限。</td>
</tr>
<tr>
<td>RECORD_AUDIO</td>
<td>录制音频权限。</td>
<td>发送音频时需要使用该权限。</td>
</tr>
<tr>
<td>
BLUETOOTH
</td>
<td>
连接蓝牙设备权限。
</td>
<td>
连接蓝牙设备时需要使用该权限。

<Warning title="注意">
<p>仅 Android 6.0 以下版本需要声明，Android 6.0 及以上版本无需声明。</p>
</Warning>

</td>
</tr>
<tr>
<td>MODIFY_AUDIO_SETTINGS</td>
<td>修改音频配置权限。</td>
<td>修改音频设备配置时需要使用该权限。</td>
</tr>
<tr>
<td rowspan="2">非必要权限</td>
<td>READ_PHONE_STATE</td>
<td>允许以只读方式访问电话状态，包括当前的呼叫状态。</td>
<td>SDK 会根据当前的呼叫状态，启停音频设备。如监听到当前为呼叫状态，则 SDK 会自动停止使用音频设备，直到通话结束。</td>
</tr>
<tr>
<td>WRITE_EXTERNAL_STORAGE</td>
<td>内置 SDK 写权限。</td>
<td>若需要使用媒体播放器或音效播放器加载 Android 外部存储内的媒体资源文件，则需要申请此权限，否则 SDK 无法加载资源。</td>
</tr>
</tbody></table>

<Note title="说明">


其中非必要权限 “android.permission.READ_PHONE_STATE” 仅用于实现 SDK 的打断事件处理，因此只需在 AndroidMainfest.xml 文件中进行声明即可，不需要动态申请（业务方有需求则另外处理）。

</Note>


