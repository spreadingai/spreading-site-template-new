# 配置设备性能等级

- - -

## 功能概述

AI 美颜支持配置 SDK 所运行的设备性能等级，并可以在不同性能的设备下，通过配置不同美颜效果，保证 AI 美颜功能可以流畅与稳定的运行。主要用于当设备性能不足以流畅运行高级特效时，通过降低部分特效的效果，来实现流畅运行的目标。

| 设备性能等级 | 枚举 | 效果差异 |
| --- | --- | --- |
| 低端 | LOW = 1 | 磨皮效果一般、换肤效果一般、美妆效果一般、祛痘斑效果一般 |  
| 中端 | MIDDLE = 2 | 磨皮效果较好、换肤效果较好、美妆效果一般、祛痘斑效果一般 |  
| 高端 | HIGH = 3 | 磨皮效果较好、换肤效果较好、美妆效果较好、祛痘斑效果较好 |  

<Note title="说明">

若不主动配置设备性能等级，默认当前设备性能等级为 `HIGH` 即高端设备性能等级。
</Note>


## 使用步骤

<Warning title="注意">
若同一设备，分别使用“方式 1” 和“方式 2”配置性能等级，则“方式 2” 通过配置文件配置的性能等级优先级更高。
</Warning>

<Tabs>
<Tab title="方式 1：主动获取并配置">
1. （可选）通过 [getDeviceLevel](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#get-device-level) 获取当前设备性能等级。
    ```java
    int deviceLevel = ZegoEffects.getDeviceLevel().value();
    ```


2. 在调用 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#create) 接口创建 ZegoEffects 对象之前，通过 [setAdvancedConfig](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~java_android~class~ZegoEffects#set-advanced-config) 将设备性能等级传入 SDK，根据设备性能等级运行相应的 AI 美颜效果。

    ```java
    ZegoEffectsAdvancedConfig config = new ZegoEffectsAdvancedConfig();
    HashMap<String,String> map = new HashMap<>();
    int deviceLevel = ZegoEffects.getDeviceLevel().value();
    // 也可按下面例子忽略实际设备性能等级强制设置为其他设备性能等级
    // 注意：低端性能等级的设备，可运行高端性能等级设备的美颜效果，但可能出现卡顿。
    // int deviceLevel = ZegoEffectsDeviceLevel.HIGH.value(); 

    //ZEGO_EFFECTS_DEVICE_LEVEL 为高级配置的参数，可在 ZegoEffects.java 中查看
    map.put(ZegoEffects.ZEGO_EFFECTS_DEVICE_LEVEL, String.valueOf(deviceLevel)); 
    config.setAdvancedConfig(map);
    ZegoEffects.setAdvancedConfig(config);
    ```
</Tab>
<Tab title="方式 2：通过配置文件配置">
1. 支持通过 `CommonResources.bundle/device_level.json` 配置文件，自定义设备性能等级。
2. 定义设备性能等级后，对应设备将按照配置文件所配置的等级，运行 AI 美颜功能。

    ```json title="CommonResources.bundle/device_level.json"
    {
      ...
      whitelist: {
          //  通过 Build.MODEL 获取 Device Name，如 HUAWEI P40
          "device_level_MIDDLE" = ["Device Name 1", "Device Name 2"]
      }
    }
   ```
</Tab>
</Tabs>