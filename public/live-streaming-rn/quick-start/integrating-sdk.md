# 集成 SDK

- - -

## 准备环境

在开始集成 SDK 前，请确保开发环境满足以下技术要求：

* React Native 0.60.0 或以上版本。 
* iOS 12.0 或以上版本且支持音视频的 iOS 设备或模拟器（推荐使用真机）。
* Android 版本不低于 4.4 且支持音视频的 Android 设备或模拟器（推荐使用真机），如果为真机，请开启“允许调试”选项。
* iOS 与 Android 设备已经连接到 Internet。
* 配置 VS Code 开发环境，可在应用商店中搜索 “React Native Tools” 扩展并下载。


## 集成 SDK

### 新建项目（可选）

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
开发环境配置完毕后，在命令行中执行 `react-native init YourProject`。
</Accordion>


### 导入 SDK

1. 进入项目根目录，并执行 `npm install zego-express-engine-reactnative --save` 或 `yarn add zego-express-engine-reactnative` 命令安装 SDK。

2. 进入 iOS 根目录，并执行 `pod install` 命令安装依赖。

完成如上操作即可在项目中通过 javascript 或 typescript (推荐使用 typescript) 来使用 `zego-express-engine-reactnative` SDK。 

## 添加权限

根据实际需要，设置应用所需权限。

* **Android**

    打开 “app/src/main/AndroidManifest.xml” 文件，添加如下内容：

    ```xml
    <!-- Permissions required by the SDK -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <!-- Permissions required by the App -->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <uses-feature
        android:glEsVersion="0x00020000"
        android:required="true" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
    ```

    - **申请动态权限**

<Warning title="注意">

  
      - 由于 Android 6.0 在一些重要的权限上必须申请动态权限，通过 “AndroidMainfest.xml” 文件申请静态权限后，还需要参考如下代码申请动态权限。
      - 关于 BLUETOOTH 权限：仅 Android 6.0 以下版本需要声明，Android 6.0 及以上版本无需声明。
      
</Warning>



    ```javascript
    import {PermissionsAndroid} from 'react-native';

    const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.RECORD_AUDIO);

    granted
      .then((data)=>{
        if(!data) {
          const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
          PermissionsAndroid.requestMultiple(permissions);
        }
      })
      .catch((err)=>{    
          console.log(err.toString());
      })
      
    ```
    

* **iOS**

    1. 在 Xcode 中，选择 “TARGETS > Info > Custom iOS Target Properties” 菜单。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png" /></Frame>

    2. 单击 “+” 按钮，添加摄像头和麦克风权限。
    
        - `Privacy - Camera Usage Description`
        - `Privacy - Microphone Usage Description`

    添加权限完成后显示结果如下图所示：

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png" /></Frame>


## 常见问题

**1. 可以使用 React Native 0.60.0 以下版本集成 SDK 吗？**

不能，zego-express-engine-reactnative SDK 仅支持 0.60.0 或以上版本的 React Native。若需集成 SDK，请先升级项目版本。


**2. 导入 SDK 到工程后，还需要手动执行 `react-native link zego-express-engine-reactnative` 命令链接 Native Module 吗?** 

不需要，React Native 从 0.60.0 版本开始，已支持自动链接 Native Module。

<Content />

