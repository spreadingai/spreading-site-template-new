# 集成 SDK

- - -

本文介绍如何集成 ZIM Audio SDK。

## 前提条件

在集成 ZIM Audio SDK 前，请确保：
- 已 [注册华为开发者账号](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148) 并完成实名认证。
- 获取 [DevEco Studio 5.0.0 Release](https://developer.huawei.com/consumer/cn/deveco-studio/) 或以上版本。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release SDK 或以上版本。
- 获取配套 [API Version 12 Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/development-intro-api-V5?catalogVersion=V5) 的 HarmonyOS 5.0.0 Release 操作系统或以上版本的鸿蒙设备真机或模拟器。
    - 如需使用真机，请参考鸿蒙官网文档 [使用本地真机运行应用/元服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-run-device-V5)。

## 集成 SDK

<Steps>
<Step title="（可选）新建项目">
<Accordion title="此步骤以如何创建新项目为例，如果是集成到已有项目，可忽略此步。" defaultOpen="false">
    <Steps>
    <Step title="创建项目">
    打开 DevEco Studio，选择 “File > New > Create Project” 菜单，新建工程。

    <Frame width="512" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/c9c9584bf2.jpeg"/>
    </Frame>
    </Step>
    <Step title="选择项目模板">
    选择项目模版为 “Empty Ability”。

    <Frame width="512" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/4cebd36b22.jpeg"/>
    </Frame>
    </Step>
    <Step title="填写信息">

    填写您项目名称、设备类型等信息。
    <Frame width="512" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace745/03e04f98099440df3547898e90a80a96/03f53ea813.jpeg"/>
    </Frame>
    信息填写完步后，单击 "Finish"，完成工程创建。
    </Step>
    </Steps>    
</Accordion>
</Step>
<Step title="导入 SDK">
    <Steps>
    <Step title="获取 SDK">
    请在 [下载](/zim-harmonyos/client-sdks/sdk-downloads) 获取 ZIM SDK 压缩包。
    </Step>
    <Step title="解压 SDK">
    解压 SDK 至 “entry/libs” 项目目录下。
    
    <Note title="说明">如果您的项目中没有 libs 目录，手动新建一个即可。</Note>

    <Frame width="auto" height="auto">
    <img src="https://media-resource.spreading.io/docuo/workspace564/27e54a759d23575969552654cb45bf89/f021605ae9.jpeg" alt="ZIMAudioHarmonyOS.jpeg"/>
    </Frame>
    </Step>
    <Step title="添加 SDK 引用">
    打开 `entry/oh-package.json5` 文件，在 `dependencies` 节点中引入 “libs” 下的 `ZIMAudio.har`。

    ```json5 title="entry/oh-package.json5" {3}
    {
        "dependencies": {
            "zego_zim_audio": "file:./libs/ZIMAudio.har"
        }
    }
    ```
    </Step>
    </Steps>
</Step>
</Steps>

## 添加麦克风权限

1. 进入 “entry/src/main” 目录，打开 “module.json5” 文件，在 “module” 节点中引入 requestPermissions，添加麦克风权限。

```json title="entry/src/main/module.json5" {3-11}
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
      }
    ]
}
```

2. 在合适的时机，向用户申请麦克风权限。

```ets {3-7}
try{
    const atManager = abilityAccessCtrl.createAtManager()
    atManager.requestPermissionsFromUser(getContext(this), ['ohos.permission.MICROPHONE']).then((res)=>{
        atManager.requestPermissionOnSetting(getContext(this),['ohos.permission.MICROPHONE']);
        const flag = res.authResults.every(item => item === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED)
        promptAction.showToast({ message: flag ? '已授权' : '已禁用' })
    });
} catch (e) {
      console.log(e)
}
```