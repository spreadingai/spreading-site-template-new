# 配置设备性能等级

- - -

## 功能概述

AI 美颜支持配置 SDK 所运行的设备等级，并可以在不同性能的设备下，通过配置不同美颜效果，保证 AI 美颜功能可以流畅与稳定的运行。主要用于当设备性能不足以流畅运行高级特效时，通过降低部分特效的效果，来实现流畅运行的目标。

| 设备性能等级 | 枚举 | 效果差异 | 
| --- | --- | --- | 
| 低端 | ZegoEffectsDeviceLevelLow = 1 | 磨皮效果一般、换肤效果一般、美妆效果一般；祛痘斑效果一般 | 
| 高端 | ZegoEffectsDeviceLevelHigh = 3 | 磨皮效果较好、换肤效果较好、美妆效果较好；祛痘斑效果较好 | 

<Note title="说明">
若不主动配置设备性能等级，默认当前设备性能等级为 `ZegoEffectsDeviceLevelHigh`即高端设备性能等级。
</Note>


## 使用步骤

1. （可选）通过 [getDeviceLevel](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#get-device-level) 获取当前设备性能等级。
    ```objc
    ZegoEffectsDeviceLevel deviceLevel = [ZegoEffects getDeviceLevel];
    ```

2. 在调用 [create](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#create-appid-app-sign) 接口创建 ZegoEffects 对象之前，通过 [setAdvancedConfig](https://doc-zh.zego.im/article/api?doc=Effects_SDK_API~objective-c_ios~class~ZegoEffects#set-advanced-config-config) 将设备性能等级传入 SDK，根据设备性能等级运行相应的 AI 美颜效果。

    ```objc
    // 获取设备性能等级
    ZegoEffectsAdvancedConfig *config = [ZegoEffectsAdvancedConfig alloc];
    ZegoEffectsDeviceLevel deviceLevel = ZegoEffects.getDeviceLevel;
    // 如果要体验不同性能的区别，也可按下面例子忽略实际设备性能等级强制设置为其他性能等级
    // 注意：低端性能等级的设备，可运行高端性能等级设备的美颜效果，但可能出现卡顿。
    // ZegoEffectsDeviceLevel deviceLevel = ZegoEffectsDeviceLevel.ZegoEffectsDeviceLevelMiddle;

    NSMutableDictionary<NSString *, NSString *> *mutableAdvancedConfig = [config.advancedConfig mutableCopy];
    //ZEGO_EFFECTS_DEVICE_LEVEL 为高级配置的参数，可在 ZegoEffects.h 中查看
    [mutableAdvancedConfig setObject:[NSString stringWithFormat:@"%ld", deviceLevel] forKey:ZEGO_EFFECTS_DEVICE_LEVEL];
    config.advancedConfig = [NSMutableDictionary dictionaryWithDictionary:mutableAdvancedConfig];
    [ZegoEffects setAdvancedConfig:config];
    ```
