# 集成 SDK

- - -

本文介绍如何集成 ZIM Audio SDK。

## 前提条件

在集成 ZIM Audio SDK 之前，请确保
- 开发环境满足以下要求：
    - React Native 0.60.0 或以上版本。
    - iOS 12.0 或以上版本的 iOS 设备或模拟器（推荐使用真机）。
    - Android 4.4 或以上版本的 Android 的真机设备，请开启“允许调试”选项。
    - iOS / Android 设备已经连接到 Internet。
    - 配置 VS Code 开发环境，可在应用商店中搜索 “React Native Tools” 扩展并下载。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，获取到了接入 ZIM SDK 服务所需的 AppID、AppSign。ZIM 服务权限不是默认开启的，使用前，请先在 [ZEGO 控制台](https://console.zego.im) 自助开通 ZIM 服务（详情请参考控制台的 [服务配置 - 即时通讯 - 开通服务](https://doc-zh.zego.im/article/14994)），若无法开通 ZIM 服务，请联系 ZEGO 技术支持开通。
- 已集成 ZIM SDK，详情请参考 [快速开始 - 实现基本收发消息](/zim-rn/send-and-receive-messages) 的 “2 集成 SDK”。


##  导入 SDK

开发者可以使用 npm 获取 SDK。

1. 执行 `npm i zego-zim-audio-react-native` 或 `yarn add zego-zim-audio-react-native` 命令安装依赖。

2. 导入 SDK。

    ```typescript
    import ZIMAudio from 'zego-zim-audio-react-native';
    ```

3. 进入 iOS 根目录，并执行 `pod install` 命令安装依赖。

完成如上操作即可在项目中通过 javascript 或 typescript (推荐) 来使用 `zego-zim-audio-react-native` SDK。

## 设置权限

使用 ZIM Audio SDK 前，请设置麦克风权限，以实现采集语音。

<Tabs>
<Tab title="iOS">
1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/add_property_audio.jpeg" /></Frame>
2. 单击 “+” 添加按钮，选择`Privacy - Microphone Usage Description`，添加麦克风权限。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/ZIMAudio/addition_done.jpeg" /></Frame>
</Tab>
<Tab title="Android">

开发者可以根据实际应用需要，设置应用所需权限。

进入 “app/src/main” 目录，打开 “AndroidManifest.xml” 文件，添加权限。

```xml
<!-- SDK 必须使用的权限 -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

<Warning title="注意">

由于 Android 6.0 及以上版本在一些比较重要的权限上要求必须申请动态权限，不能只通过 “AndroidMainfest.xml” 文件申请静态权限。因此还需要参考执行如下代码，其中 “requestPermissions” 是 “Activity” 的方法。
</Warning>

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) !=
            PackageManager.PERMISSION_GRANTED) {
        String[] permissions = {Manifest.permission.RECORD_AUDIO};
        requestPermissions(permissions, PERMISSION_REQUEST_CODE);
    }
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
<td>必要权限</td>
<td>RECORD_AUDIO</td>
<td>录制音频权限。</td>
<td>发送音频时需要使用该权限。</td>
</tr>
</tbody>
</table>
</Tab>
</Tabs>

## 防止混淆

如果您使用 React Native 框架开发 Android 应用，还需要在 “proguard-rules.pro” 文件中，为 SDK 添加 -keep 类的配置，防止混淆 SDK 公共类名称。

```txt
-keep class **.zego.**{*;}
```
