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

export const setEyelinerMap = {
    'default': <a href="@setEyeliner" target='_blank'>setEyeliner</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyeliner.html" target='_blank'>setEyeliner</a>,
    'Windows': <a href="@zego_effects_set_eyeliner" target='_blank'>zego_effects_set_eyeliner</a>,
}

export const setEyelinerParamMap = {
    'default': <a href="@setEyelinerParam" target='_blank'>setEyelinerParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyelinerParam.html" target='_blank'>setEyelinerParam</a>,
    'Windows': <a href="@zego_effects_set_eyeliner_param" target='_blank'>zego_effects_set_eyeliner_param</a>,
}

export const ZegoEffectsEyelinerParamMap = {
    'default': <a href="@-ZegoEffectsEyelinerParam" target='_blank'>ZegoEffectsEyelinerParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsEyelinerParam-class.html" target='_blank'>ZegoEffectsEyelinerParam</a>,
    'Windows': <a href="@zego_effects_eyeliner_param" target='_blank'>zego_effects_eyeliner_param</a>,
}

export const setEyeshadowMap = {
    'default': <a href="@setEyeshadow" target='_blank'>setEyeshadow</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyeshadow.html" target='_blank'>setEyeshadow</a>,
    'Windows': <a href="@zego_effects_set_eyeshadow" target='_blank'>zego_effects_set_eyeshadow</a>,
}

export const setEyeshadowParamMap = {
    'default': <a href="@setEyeshadowParam" target='_blank'>setEyeshadowParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyeshadowParam.html" target='_blank'>setEyeshadowParam</a>,
    'Windows': <a href="@zego_effects_set_eyeshadow_param" target='_blank'>zego_effects_set_eyeshadow_param</a>,
}

export const ZegoEffectsEyeshadowParamMap = {
    'default': <a href="@-ZegoEffectsEyeshadowParam" target='_blank'>ZegoEffectsEyeshadowParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsEyeshadowParam-class.html" target='_blank'>ZegoEffectsEyeshadowParam</a>,
    'Windows': <a href="@zego_effects_eyeshadow_param" target='_blank'>zego_effects_eyeshadow_param</a>,
}

export const setEyelashesMap = {
    'default': <a href="@setEyelashes" target='_blank'>setEyelashes</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyelashes.html" target='_blank'>setEyelashes</a>,
    'Windows': <a href="@zego_effects_set_eyelashes" target='_blank'>zego_effects_set_eyelashes</a>,
}

export const setEyelashesParamMap = {
    'default': <a href="@setEyelashesParam" target='_blank'>setEyelashesParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setEyelashesParam.html" target='_blank'>setEyelashesParam</a>,
    'Windows': <a href="@zego_effects_set_eyelashes_param" target='_blank'>zego_effects_set_eyelashes_param</a>,
}

export const ZegoEffectsEyelashesParamMap = {
    'default': <a href="@-ZegoEffectsEyelashesParam" target='_blank'>ZegoEffectsEyelashesParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsEyelashesParam-class.html" target='_blank'>ZegoEffectsEyelashesParam</a>,
    'Windows': <a href="@zego_effects_eyelashes_param" target='_blank'>zego_effects_eyelashes_param</a>,
}

export const setBlusherMap = {
    'default': <a href="@setBlusher" target='_blank'>setBlusher</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setBlusher.html" target='_blank'>setBlusher</a>,
    'Windows': <a href="@zego_effects_set_blusher" target='_blank'>zego_effects_set_blusher</a>,
}

export const setBlusherParamMap = {
    'default': <a href="@setBlusherParam" target='_blank'>setBlusherParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setBlusherParam.html" target='_blank'>setBlusherParam</a>,
    'Windows': <a href="@zego_effects_set_blusher_param" target='_blank'>zego_effects_set_blusher_param</a>,
}

export const ZegoEffectsBlusherParamMap = {
    'default': <a href="@-ZegoEffectsBlusherParam" target='_blank'>ZegoEffectsBlusherParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsBlusherParam-class.html" target='_blank'>ZegoEffectsBlusherParam</a>,
    'Windows': <a href="@zego_effects_blusher_param" target='_blank'>zego_effects_blusher_param</a>,
}

export const setLipStickMap = {
    'default': <a href="@setLipStick" target='_blank'>setLipStick</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setLipstick.html" target='_blank'>setLipStick</a>,
    'Windows': <a href="@zego_effects_set_lip_stick" target='_blank'>zego_effects_set_lip_stick</a>,
}

export const setLipStickParamMap = {
    'default': <a href="@setLipStickParam" target='_blank'>setLipStickParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setLipstickParam.html" target='_blank'>setLipStickParam</a>,
    'Windows': <a href="@zego_effects_set_lip_stick_param" target='_blank'>zego_effects_set_lip_stick_param</a>,
}

export const ZegoEffectsLipstickParamMap = {
    'default': <a href="@-ZegoEffectsLipstickParam" target='_blank'>ZegoEffectsLipstickParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsLipstickParam-class.html" target='_blank'>ZegoEffectsLipstickParam</a>,
    'Windows': <a href="@zego_effects_lip_stick_param" target='_blank'>zego_effects_lip_stick_param</a>,
}

export const setColoredcontactsMap = {
    'default': <a href="@setColoredcontacts" target='_blank'>setColoredcontacts</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setColoredcontacts.html" target='_blank'>setColoredcontacts</a>,
    'Windows': <a href="@zego_effects_set_colored_contacts" target='_blank'>zego_effects_set_colored_contacts</a>,
}

export const setColoredcontactsParamMap = {
    'default': <a href="@setColoredcontactsParam" target='_blank'>setColoredcontactsParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setColoredcontactsParam.html" target='_blank'>setColoredcontactsParam</a>,
    'Windows': <a href="@zego_effects_set_colored_contacts_param" target='_blank'>zego_effects_set_colored_contacts_param</a>,
}

export const ZegoEffectsColoredcontactsParamMap = {
    'default': <a href="@-ZegoEffectsColoredcontactsParam" target='_blank'>ZegoEffectsColoredcontactsParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsColoredcontactsParam-class.html" target='_blank'>ZegoEffectsColoredcontactsParam</a>,
    'Windows': <a href="@zego_effects_colored_contacts_param" target='_blank'>zego_effects_colored_contacts_param</a>,
}

export const setMakeupMap = {
    'default': <a href="@setMakeup" target='_blank'>setMakeup</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setMakeup.html" target='_blank'>setMakeup</a>,
    'Windows': <a href="@zego_effects_set_makeup" target='_blank'>zego_effects_set_makeup</a>,
}

export const setMakeupParamMap = {
    'default': <a href="@setMakeupParam" target='_blank'>setMakeupParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_plugin/ZegoEffectsPlugin/setMakeupParam.html" target='_blank'>setMakeupParam</a>,
    'Windows': <a href="@zego_effects_set_makeup_param" target='_blank'>zego_effects_set_makeup_param</a>,
}

export const ZegoEffectsMakeupParamMap = {
    'default': <a href="@-ZegoEffectsMakeupParam" target='_blank'>ZegoEffectsMakeupParam</a>,
    'Flutter': <a href="https://doc-zh.zego.im/unique-api/ai-effects-sdk/zh/dart_flutter/zego_effects_defines/ZegoEffectsMakeupParam-class.html" target='_blank'>ZegoEffectsMakeupParam</a>,
    'Windows': <a href="@zego_effects_makeup_param" target='_blank'>zego_effects_makeup_param</a>,
}

export const nilMap = {
    'default': "nil",
    'Android,RN': "null",
    'Flutter': "空字符串",
    'Windows': "资源路径设置为空，",
}

# 美妆

- - -
## 功能简介

ZegoEffects SDK 提供美妆功能，包含眼线，眼影，眼睫毛，腮红，口红，美瞳，风格妆等，进行局部上妆，打造出自然精致的妆容，可广泛应用于短视频，直播等场景。

## 前提条件

在使用 ZegoEffects SDK 美妆功能前，请确保：
- 已在项目中集成 ZegoEffects SDK，实现基本的图像处理功能，详情请参考 [快速开始 - 集成 SDK](/ai-effects-ios-objc/quick-starts/import-the-sdk)。
- 已导入美妆功能资源 “MakeupResources” 文件，详情请参考 [快速开始 - 导入资源和模型](/ai-effects-ios-objc/quick-starts/import-resources-and-models)。

## 使用步骤

美妆提供了以下功能：眼线、眼影、眼睫毛、腮红、口红、美瞳、风格妆。

各个功能包含的风格有：

- [眼线](#眼线)：自然（Natural）、野猫（Cat Eye）、俏皮（naughty）、心机（innocent）、气质（dignified）。
- [眼影](#眼影)：粉雾海（Pink Mist）、微光蜜（Shimmer Pink）、暖茶棕（Tea Brown）、元气橙（Bright Orange）、摩卡棕（Mocha_Brown）。
- [眼睫毛](#眼睫毛)：自然（Natural）、温柔（Tender）、卷翘（Curl）、纤长（Everlong）、浓密（Thick）。
- [腮红](#腮红)：微醺（Slightly Drunk）、蜜桃（Peach）、奶橘（Milky Orange）、杏粉（Apricot Pink）、甜橙（Sweet Orange）。
- [口红](#口红)：豆沙粉（Cameo Pink）、甜橘色（Sweet Orange）、铁锈红（Rust Red）、珊瑚色（Coral）、丝绒红（Red Velvet）。
- [美瞳](#美瞳)：水光黑（Darknight Black）、星空蓝（Starry Blue）、仙棕绿（Mystery Brown-Green）、异瞳棕（Polar Lights Brown）、可可棕（Chocolate Brown）。
- [风格妆](#风格妆)：眼睑下至妆（Vulnerable & Innocent Eyes）、银河眼妆（Milky Eyes）、奶凶（Cutie & Cool）、纯欲（Pure & Sexy）、神颜（Flawless）。

<Warning title="注意">
- **每个功能的各种风格效果不能叠加，设置新的风格资源路径后，会覆盖之前的效果。**
- **眼线、眼影、眼睫毛、腮红、口红、美瞳等功能可以叠加使用，但不能与风格妆功能叠加使用。**
</Warning>

开发者在调用接口时，可以根据需要，选择对应的美妆资源使用。

开启美妆功能之后，开发者可根据实际的需求来自定义美妆参数。如果未自定义，SDK 将采用默认参数值实现美妆功能。

### 眼线

1. 开启眼线。

    调用 {getPlatformData2(props,setEyelinerMap)} 接口开启/关闭眼线功能，传入对应的眼线绝对路径。调用 {getPlatformData2(props,setEyelinerParamMap)} 接口设置眼线强度。

    {getPlatformData2(props,ZegoEffectsEyelinerParamMap)} 对象的眼线强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启眼线功能
    // 1. 开启眼线功能，并且传入对应的眼线绝对路径
    [self.effects setEyeliner:@"/xxx/xxx/eyelinerdir/eyelinerdir_natural.bundle"];

    // 设置眼线强度，范围 [0, 100]
    ZegoEffectsEyelinerParam* param = [[ZegoEffectsEyelinerParam alloc] init];
    param.intensity = 100;
    [self.effects setEyelinerParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启眼线功能
    // 1. 开启眼线功能，并且传入对应的眼线绝对路径
    mEffects.setEyeliner("/xxx/xxx/eyelinerdir/eyelinerdir_natural.bundle");

    // 设置眼线强度，范围 [0, 100]
    ZegoEffectsEyelinerParam param = new ZegoEffectsEyelinerParam();
    param.intensity = 100;
    mEffects.setEyelinerParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启眼线功能
    // 1. 开启眼线功能，并且传入对应的眼线绝对路径
    zego_effects_set_eyeliner(handle,"/xxx/xxx/eyelinerdir/eyelinerdir_natural.bundle");

    // 设置眼线强度，范围 [0, 100]
    zego_effects_eyeliner_param param;
    param.intensity = 100;
    zego_effects_set_eyeliner_param(handle,param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启眼线功能
    // 开启眼线功能，并且传入对应的眼线绝对路径
    ZegoEffectsPlugin.instance.setEyeliner('eyelinerdir_natural');

    // 设置眼线强度，范围 [0, 100]
    ZegoEffectsEyelinerParam param = ZegoEffectsEyelinerParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setEyelinerParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启眼线功能
    // 1. 开启眼线功能，并且传入对应的眼线绝对路径
    mEffects.setEyeliner("/xxx/xxx/eyelinerdir/eyelinerdir_natural.bundle");

    // 设置眼线强度，范围 [0, 100]
    mEffects.setEyelinerParam({ intensity: 100 });
    ```
    :::

2. 移除眼线。

    如果需要移除眼线，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setEyelinerMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除眼线功能
    [self.effects setEyeliner:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除眼线功能
    mEffects.setEyeliner(null);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除眼线功能
    zego_effects_set_eyeliner(handle,"");
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除眼线功能
    ZegoEffectsPlugin.instance.setEyeliner('');
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除眼线功能
    mEffects.setEyeliner(null);
    ```
    :::

### 眼影

1. 开启眼影。

    调用 {getPlatformData2(props,setEyeshadowMap)} 接口开启/关闭眼影功能，传入对应的眼影绝对路径。调用 {getPlatformData2(props,setEyeshadowParamMap)} 接口设置眼影强度。

    {getPlatformData2(props,ZegoEffectsEyeshadowParamMap)} 对象的眼影强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启眼影功能
    // 1. 开启眼影功能，并且传入对应的眼影绝对路径
    [self.effects setEyeshadow:@"/xxx/xxx/eyeshadowdir/eyeshadowdir_mist_pink.bundle"];

    // 设置眼影强度，范围 [0, 100]
    ZegoEffectsEyeshadowParam* param = [[ZegoEffectsEyeshadowParam alloc] init];
    param.intensity = 100;
    [self.effects setEyeshadowParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启眼影功能
    // 1. 开启眼影功能，并且传入对应的眼影绝对路径
    mEffects.setEyeshadow("/xxx/xxx/eyeshadowdir/eyeshadowdir_mist_pink.bundle");

    // 设置眼影强度，范围 [0, 100]
    ZegoEffectsEyeshadowParam param = new ZegoEffectsEyeshadowParam();
    param.intensity = 100;
    mEffects.setEyeshadowParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启眼影功能
    // 1. 开启眼影功能，并且传入对应的眼影绝对路径
    zego_effects_set_eyeshadow(handle,"/xxx/xxx/eyeshadowdir/eyeshadowdir_mist_pink.bundle");

    // 设置眼影强度，范围 [0, 100]
    zego_effects_eyeshadow_param param;
    param.intensity = 100;
    zego_effects_set_eyeshadow_param(handle,param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启眼影功能
    // 开启眼影功能，并且传入对应的眼影名字
    ZegoEffectsPlugin.instance.setEyeshadow('eyeshadowdir_mist_pink');

    // 设置眼影强度，范围 [0, 100]
    ZegoEffectsEyeshadowParam param = ZegoEffectsEyeshadowParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setEyeshadowParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启眼影功能
    // 1. 开启眼影功能，并且传入对应的眼影绝对路径
    mEffects.setEyeshadow("/xxx/xxx/eyeshadowdir/eyeshadowdir_mist_pink.bundle");

    // 设置眼影强度，范围 [0, 100]
    mEffects.setEyeshadowParam({ intensity: 100 });
    ```
    :::

2. 移除眼影。

    如果需要移除眼影，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setEyeshadowMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除眼影功能
    [self.effects setEyeshadow:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除眼影功能
    mEffects.setEyeshadow(null);    
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除眼影功能
    zego_effects_set_eyeshadow(handle,"");  
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除眼影功能
    ZegoEffectsPlugin.instance.setEyeshadow('');    
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除眼影功能
    mEffects.setEyeshadow(null);    
    ```
    :::

### 眼睫毛

1. 开启眼睫毛。

    调用 {getPlatformData2(props,setEyelashesMap)} 接口开启/关闭眼睫毛功能，传入对应的眼睫毛绝对路径。调用 {getPlatformData2(props,setEyelashesParamMap)} 接口设置眼睫毛强度。

    {getPlatformData2(props,ZegoEffectsEyelashesParamMap)} 对象的眼睫毛强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启眼睫毛功能
    // 1. 开启眼睫毛功能，并且传入对应的眼睫毛绝对路径
    [self.effects setEyelashes:@"/xxx/xxx/eyelashesdir/eyelashesdir_bushy.bundle"];

    // 设置眼睫毛强度，范围 [0, 100]
    ZegoEffectsEyelashesParam* param = [[ZegoEffectsEyelashesParam alloc] init];
    param.intensity = 100;
    [self.effects setEyelashesParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启眼睫毛功能
    // 1. 开启眼睫毛功能，并且传入对应的眼睫毛绝对路径
    mEffects.setEyelashes("/xxx/xxx/eyelashesdir/eyelashesdir_bushy.bundle");

    // 设置眼睫毛强度，范围 [0, 100]
    ZegoEffectsEyelashesParam param = new ZegoEffectsEyelashesParam();
    param.intensity = 100;
    mEffects.setEyelashesParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启眼睫毛功能
    // 1. 开启眼睫毛功能，并且传入对应的眼睫毛绝对路径
    zego_effects_set_eyelashes(handle,"/xxx/xxx/eyelashesdir/eyelashesdir_bushy.bundle");

    // 设置眼睫毛强度，范围 [0, 100]
    zego_effects_eyelashes_param  param;
    param.intensity = 100;
    zego_effects_set_eyelashes_param(handle,param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启眼睫毛功能
    // 开启眼睫毛功能，并且传入对应的眼睫毛绝对路径
    ZegoEffectsPlugin.instance.setEyelashes('eyelashesdir_bushy');

    // 设置眼睫毛强度，范围 [0, 100]
    ZegoEffectsEyelashesParam param = ZegoEffectsEyelashesParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setEyelashesParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启眼睫毛功能
    // 1. 开启眼睫毛功能，并且传入对应的眼睫毛绝对路径
    mEffects.setEyelashes("/xxx/xxx/eyelashesdir/eyelashesdir_bushy.bundle");

    // 设置眼睫毛强度，范围 [0, 100]
    mEffects.setEyelashesParam({ intensity: 100 });
    ```
    :::

2. 移除眼睫毛。

    如果需要移除眼睫毛，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setEyelashesMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除眼睫毛功能
    [self.effects setEyelashes:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除眼睫毛功能        
    mEffects.setEyelashes(null);    
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除眼睫毛功能        
    zego_effects_set_eyelashes(handle,"");  
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除眼睫毛功能        
    ZegoEffectsPlugin.instance.setEyelashes('');    
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除眼睫毛功能
    mEffects.setEyelashes(null);    
    ```
    :::

### 腮红

1. 开启腮红。

    调用 {getPlatformData2(props,setBlusherMap)} 接口开启/关闭腮红功能，传入对应的腮红绝对路径。调用 {getPlatformData2(props,setBlusherParamMap)} 接口设置腮红强度。

    {getPlatformData2(props,ZegoEffectsBlusherParamMap)} 对象的腮红强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启腮红功能
    // 1. 开启腮红功能，并且传入对应的腮红绝对路径
    [self.effects setBlusher:@"/xxx/xxx/blusherdir/blusherdir_apricot_pink.bundle"];

    // 设置腮红强度，范围 [0, 100]
    ZegoEffectsBlusherParam* param = [[ZegoEffectsBlusherParam alloc] init];
    param.intensity = 100;
    [self.effects setBlusherParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启腮红功能
    // 1. 开启腮红功能，并且传入对应的腮红绝对路径
    mEffects.setBlusher("/xxx/xxx/blusherdir/blusherdir_apricot_pink.bundle");

    // 设置腮红强度，范围 [0, 100]
    ZegoEffectsBlusherParam param = new ZegoEffectsBlusherParam();
    param.intensity = 100;
    mEffects.setBlusherParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启腮红功能
    // 1. 开启腮红功能，并且传入对应的腮红绝对路径
    zego_effects_set_blusher(handle,"/xxx/xxx/eyelashesdir/eyelashesdir_bushy.bundle");

    // 设置腮红强度，范围 [0, 100]
    zego_effects_blusher_param param;
    param.intensity = 100;
    zego_effects_set_blusher_param(param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启腮红功能
    // 1. 开启腮红功能，并且传入对应的腮红绝对路径
    ZegoEffectsPlugin.instance.setBlusher('blusherdir_apricot_pink');

    // 设置腮红强度，范围 [0, 100]
    ZegoEffectsBlusherParam param = ZegoEffectsBlusherParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setBlusherParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启腮红功能
    // 1. 开启腮红功能，并且传入对应的腮红绝对路径
    mEffects.setBlusher("/xxx/xxx/blusherdir/blusherdir_apricot_pink.bundle");

    // 设置腮红强度，范围 [0, 100]
    mEffects.setBlusherParam({ intensity: 100 });
    ```
    :::

2. 移除腮红。

    如果需要移除腮红，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setBlusherMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除腮红功能
    [self.effects setBlusher:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除腮红功能
    mEffects.setBlusher(null);  
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除腮红功能
    zego_effects_set_blusher(handle,"");  
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除腮红功能
    ZegoEffectsPlugin.instance.setBlusher('');  
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除腮红功能
    mEffects.setBlusher(null);  
    ```
    :::

### 口红

1. 开启口红。

    调用 {getPlatformData2(props,setLipStickMap)} 接口开启/关闭口红功能，传入对应的口红绝对路径。调用 {getPlatformData2(props,setLipStickParamMap)} 接口设置口红强度。

    {getPlatformData2(props,ZegoEffectsLipstickParamMap)} 对象的口红强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启口红功能
    // 1. 开启口红功能，并且传入对应的口红绝对路径
    [self.effects setLipStick:@"/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle"];

    // 设置口红强度，范围 [0, 100]
    ZegoEffectsLipstickParam* param = [[ZegoEffectsLipstickParam alloc] init];
    param.intensity = 100;
    [self.effects setLipstickParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启口红功能
    // 1. 开启口红功能，并且传入对应的口红绝对路径
    mEffects.setLipStick("/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle");

    // 设置口红强度，范围 [0, 100]
    ZegoEffectsLipstickParam param = new ZegoEffectsLipstickParam();
    param.intensity = 100;
    mEffects.setLipstickParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启口红功能
    // 1. 开启口红功能，并且传入对应的口红绝对路径
    zego_effects_set_lipstick(handle,"/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle");

    // 设置口红强度，范围 [0, 100]
    zego_effects_lipstick_param param;
    param.intensity = 100;
    zego_effects_set_lipstick_param(param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启口红功能
    // 1. 开启口红功能，并且传入对应的口红绝对路径
    ZegoEffectsPlugin.instance.setLipStick('lipstickdir_bean_paste_pink');

    // 设置口红强度，范围 [0, 100]
    ZegoEffectsLipstickParam param = ZegoEffectsLipstickParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setLipstickParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启口红功能
    // 1. 开启口红功能，并且传入对应的口红绝对路径
    mEffects.setLipStick("/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle");

    // 设置口红强度，范围 [0, 100]
    mEffects.setLipstickParam({ intensity: 100 });
    ```
    :::

2. 移除口红。

    如果需要移除口红，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setLipStickMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除口红功能
    [self.effects setLipStick:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除口红功能
    mEffects.setLipStick(null);  
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除口红功能
    zego_effects_set_lipstick(handle,"");  
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除口红功能
    ZegoEffectsPlugin.instance.setLipStick('');  
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除口红功能
    mEffects.setLipStick(null);  
    ```
    :::

### 美瞳

1. 开启美瞳。

    调用 {getPlatformData2(props,setColoredcontactsMap)} 接口开启/关闭美瞳功能，传入对应的美瞳绝对路径。调用 {getPlatformData2(props,setColoredcontactsParamMap)} 接口设置美瞳强度。

    {getPlatformData2(props,ZegoEffectsColoredcontactsParamMap)} 对象的美瞳强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启美瞳功能
    // 1. 开启美瞳功能，并且传入对应的美瞳绝对路径
    [self.effects setColoredcontacts:@"/xxx/xxx/coloredcontactsdir/coloredcontactsdir_chocolate_brown.bundle"];

    // 设置美瞳强度，范围 [0, 100]
    ZegoEffectsColoredcontactsParam* param = [[ZegoEffectsColoredcontactsParam alloc] init];
    param.intensity = 100;
    [self.effects setColoredcontactsParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启美瞳功能
    // 1. 开启美瞳功能，并且传入对应的美瞳绝对路径
    mEffects.setColoredcontacts("/xxx/xxx/coloredcontactsdir/coloredcontactsdir_chocolate_brown.bundle");

    // 设置美瞳强度，范围 [0, 100]
    ZegoEffectsColoredcontactsParam param = new ZegoEffectsColoredcontactsParam();
    param.intensity = 100;
    mEffects.setColoredcontactsParam(param);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 开启美瞳功能
    // 1. 开启美瞳功能，并且传入对应的美瞳绝对路径
    zego_effects_set_coloredcontacts(handle,"/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle");    

    // 设置美瞳强度，范围 [0, 100]
    zego_effects_coloredcontacts_param param;
    param.intensity = 100;
    zego_effects_set_coloredcontacts_param(param);
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启美瞳功能
    // 开启美瞳功能，并且传入对应的美瞳绝对路径
    ZegoEffectsPlugin.instance.setColoredcontacts('coloredcontactsdir_chocolate_brown');

    // 设置美瞳强度，范围 [0, 100]
    ZegoEffectsColoredcontactsParam param = ZegoEffectsColoredcontactsParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setColoredcontactsParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启美瞳功能
    // 1. 开启美瞳功能，并且传入对应的美瞳绝对路径
    mEffects.setColoredcontacts("/xxx/xxx/coloredcontactsdir/coloredcontactsdir_chocolate_brown.bundle");

    // 设置美瞳强度，范围 [0, 100]
    mEffects.setColoredcontactsParam({ intensity: 100 });
    ```
    :::

2. 移除美瞳。

    如果需要移除美瞳，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setColoredcontactsMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除美瞳功能
    [self.effects setColoredcontacts:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除美瞳功能
    mEffects.setColoredcontacts(null);  
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除美瞳功能
    ZegoEffectsPlugin.instance.setColoredcontacts('');  
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除美瞳功能
    mEffects.setColoredcontacts(null);  
    ```
    :::

### 风格妆

<Warning title="注意">
对于 2.0.0 之前的版本，风格妆效果不能与挂件功能叠加使用，开启风格妆功能，会关闭挂件效果。
</Warning>

1. 开启风格妆。

    调用 {getPlatformData2(props,setMakeupMap)} 接口开启/关闭风格妆功能，传入对应的风格妆绝对路径。调用 {getPlatformData2(props,setMakeupParamMap)} 接口设置风格妆强度。

    {getPlatformData2(props,ZegoEffectsMakeupParamMap)} 对象的风格妆强度参数 “intensity” 的取值范围为 [0, 100]。取值越大，效果呈现的程度越大，开发者可以根据需求自定义取值。

    :::if{props.platform=undefined}
    ```objc
    // 开启风格妆功能
    // 1. 开启风格妆功能，并且传入对应的风格妆绝对路径
    [self.effects setMakeup:@"/xxx/xxx/makeupdir/makeupdir_cutie_and_cool.bundle"];

    // 设置风格妆强度，范围 [0, 100]
    ZegoEffectsMakeupParam* param = [[ZegoEffectsMakeupParam alloc] init];
    param.intensity = 100;
    [self.effects setMakeupParam:param];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 开启风格妆功能
    // 1. 开启风格妆功能，并且传入对应的风格妆绝对路径
    mEffects.setMakeup("/xxx/xxx/makeupdir/makeupdir_cutie_and_cool.bundle");

    // 设置风格妆强度，范围 [0, 100]
    ZegoEffectsMakeupParam param = new ZegoEffectsMakeupParam();
    param.intensity = 100;
    mEffects.setMakeupParam(param);
    ```
    ::: 
    :::if{props.platform="Windows"}
    ```cpp
    // 开启风格妆功能
    // 1. 开启风格妆功能，并且传入对应的风格妆绝对路径
    zego_effects_set_makeup(handle,"/xxx/xxx/makeupdir/makeupdir_cutie_and_cool.bundle");  

    // 设置风格妆强度，范围 [0, 100]
    zego_effects_makeup_param param;
    param.intensity = 100;
    zego_effects_set_makeup_param(param);    
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 开启风格妆功能
    // 1. 开启风格妆功能，并且传入对应的风格妆绝对路径
    ZegoEffectsPlugin.instance.setMakeup('makeupdir_cutie_and_cool');

    // 设置风格妆强度，范围 [0, 100]
    ZegoEffectsMakeupParam param = ZegoEffectsMakeupParam();
    param.intensity = 100;
    ZegoEffectsPlugin.instance.setMakeupParam(param);
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 开启风格妆功能
    // 1. 开启风格妆功能，并且传入对应的风格妆绝对路径
    mEffects.setMakeup("/xxx/xxx/makeupdir/makeupdir_cutie_and_cool.bundle");

    // 设置风格妆强度，范围 [0, 100]
    mEffects.setMakeupParam({ intensity: 100 });
    ```
    :::

2. 移除风格妆。

    如果需要移除风格妆，可将 {getPlatformData2(props,nilMap)} 传入 {getPlatformData2(props,setMakeupMap)} 接口。

    :::if{props.platform=undefined}
    ```objc
    // 移除风格妆功能
    [self.effects setMakeup:nil];
    ```
    :::
    :::if{props.platform="Android"}
    ```java
    // 移除风格妆功能
    mEffects.setMakeup(null);
    ```
    :::
    :::if{props.platform="Windows"}
    ```cpp
    // 移除风格妆功能    
    zego_effects_set_makeup(handle,"");    
    ```
    :::
    :::if{props.platform="Flutter"}
    ```dart
    // 移除风格妆功能
    ZegoEffectsPlugin.instance.setMakeup('');
    ```
    :::
    :::if{props.platform="RN"}
    ```js
    // 移除风格妆功能
    mEffects.setMakeup(null);
    ```
    :::