# 集成 SDK

---

## 准备环境

在开始集成 ZEGO Express SDK 前，请确保开发环境满足以下要求：

- 获取 [DevEco Studio 5.0.0 Release 或以上版本](https://developer.huawei.com/consumer/cn/deveco-studio/)。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release SDK 或以上版本。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release 操作系统或以上版本，支持音视频的鸿蒙设备，且已开启“允许调试”选项。
- 如果需要使用真机调试，请参考 [鸿蒙官网文档](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide_debug_device-0000001053822404) 进行配置。
- 鸿蒙设备已经连接到 Internet。
- 已 [注册华为开发者账号](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148) 并完成实名认证。

## 集成 SDK

<Warning title="注意">

由于上架 [OpenHarmony 三方库中心仓](https://ohpm.openharmony.cn/#/cn/home) 时命名规则的限制，ZEGO Express SDK 的包名从 `ZegoExpressEngine` 修改为 `@zego/zego-express-engine`。从旧版本更新至新版本的 SDK 时需要注意修改。

</Warning>



### （可选）新建项目

<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
1. 打开 DevEco Studio，选择 “File > New > Create Project” 菜单，新建工程。

    <Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/c9c9584bf2.jpeg" /></Frame>

2. 选择项目模版为 “Empty Ability”。

    <Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/4cebd36b22.jpeg" /></Frame>

3. 填写您项目名称、设备类型等信息。

    <Frame width="512" height="auto" caption=""><img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/03f53ea813.jpeg" /></Frame>

4. 最后单击 “Finish” ，完成新工程创建。
</Accordion>


### 导入 SDK

开发者可以通过以下两种方式导入 SDK。下载 SDK 文件手动集成或者通过 OpenHarmony 三方库中心仓集成。

#### 下载 SDK 文件手动集成 SDK

1. 请参考 [下载 SDK 包](https://doc-zh.zego.im/article/19521) ，下载最新版本的 SDK。

2. 解压 SDK 至 “entry/libs” 项目目录。如果您的项目中没有 libs 目录，手动新建一个即可。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/Integration_SDK/ohos_sdk_libs_set.png" /></Frame>

3. 进入 “entry” 目录，打开 “oh-package.json5” 文件，在 “dependencies” 节点中引入 “libs” 下所有的 har，添加 SDK 引用。

    ```json {9}
    {
      "name": "zegoexpressohosexample",
      "version": "1.0.0",
      "description": "Please describe the basic information.",
      "main": "Index.ets",
      "author": "",
      "license": "",
      "dependencies": {
        "@zego/zego-express-engine": "file:./libs/ZegoExpressEngine.har"
      }
    }
    ```


    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/HarmonyOS_ArkTS/Integration_SDK/ohos_sdk_set_position.png" /></Frame>

#### 通过 OpenHarmony 三方库中心仓集成 SDK

进入 “entry” 目录，打开 “oh-package.json5” 文件，在 “dependencies” 节点中添加 SDK 引用。

```json {9}
{
  "name": "zegoexpressohosexample",
  "version": "1.0.0",
  "description": "Please describe the basic information.",
  "main": "Index.ets",
  "author": "",
  "license": "",
  "dependencies": {
    "@zego/zego-express-engine": "3.21.0"
  }
}
```

## 设置权限

根据实际应用需要，设置应用所需权限。

进入 “entry/src/main” 目录，打开 “module.json5” 文件，在 “module” 节点中引入 requestPermissions，添加相关权限。

```json
{
    "requestPermissions": [
      {
        "name": "ohos.permission.MICROPHONE",  // 麦克风权限
        "reason": "$string:app_name",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "inuse"
        }
      },
      {
        "name": "ohos.permission.INTERNET",  // 网络权限
        "reason": "$string:app_name",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "always"
        }
      },
      {
        "name": "ohos.permission.CAMERA",  // 摄像头权限
        "reason": "$string:app_name",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "inuse"
        }
      },
      {
        "name": "ohos.permission.ACCESS_BLUETOOTH",  // 蓝牙权限
        "reason": "$string:app_name",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "always"
        }
      },
      {
        "name": "ohos.permission.GET_NETWORK_INFO",  // 网络信息权限
        "reason": "$string:app_name",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "always"
        }
      }
    ]
}
```

<Warning title="注意">


- 鸿蒙系统上，敏感权限基于用户可知可控的原则需动态申请，申请方式参考如下代码。
- 请确保预览或推拉流前应用已获取摄像头和麦克风权限，否则可能导致无法正常预览或推拉流。

</Warning>



```ts
// 首先导入权限相关包
import { AbilityConstant, UIAbility, Want, abilityAccessCtrl, Permissions} from '@kit.AbilityKit';

// 在加载界面完成后进行权限申请或者按需权限申请，可以在 windowStage.loadContent() 中添加以下代码
let atManager = abilityAccessCtrl.createAtManager();
const permissionList: Array<Permissions> = [
    'ohos.permission.INTERNET',
    'ohos.permission.CAMERA',
    'ohos.permission.MEDIA_LOCATION',
    'ohos.permission.MICROPHONE',
    'ohos.permission.READ_MEDIA',
    'ohos.permission.WRITE_MEDIA',
    'ohos.permission.READ_IMAGEVIDEO',
    'ohos.permission.WRITE_IMAGEVIDEO',
    'ohos.permission.GET_NETWORK_INFO',
    'ohos.permission.GET_NETWORK_STATS',
    'ohos.permission.ENTERPRISE_GET_NETWORK_INFO',
    'ohos.permission.ENTERPRISE_MANAGE_NETWORK',
];
atManager.requestPermissionsFromUser(this.context, permissionList).then((data) => {
    console.info('data:' + JSON.stringify(data));
    console.info('data permissions:' + data.permissions);
    console.info('data authResults:' + data.authResults);
}).catch((err: BusinessError) => {
    console.log(`NormalCapturer:createAudioCapturer err code:` + err.code + 'err msg:' + err.message);
    console.log(`NormalCapturer:createAudioCapturer err=${JSON.stringify(err)}`);
});
```
## 设置签名

如需运行到真机进行签名，详情请参考 [DevEco Studio 使用指南 - 为应用/服务进行签名 ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V2/signing-0000001587684945-V2#section18815157237) 设置。

<Content />

