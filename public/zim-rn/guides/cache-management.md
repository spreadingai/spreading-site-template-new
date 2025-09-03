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

export const queryLocalFileCacheMap = {
  'Android': <a href="@queryLocalFileCache" target='_blank'>queryLocalFileCache</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryLocalFileCache.html" target='_blank'>queryLocalFileCache</a>,
  'iOS': <a href="@queryLocalFileCacheWithConfig" target='_blank'>queryLocalFileCacheWithConfig</a>,
}
export const ZIMFileCacheQueryConfigMap = {
  'Android': <a href="@-ZIMFileCacheQueryConfig" target='_blank'>ZIMFileCacheQueryConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFileCacheQueryConfig-class.html" target='_blank'>ZIMFileCacheQueryConfig</a>,
  
}
export const ZIMFileCacheQueriedCallbackMap = {
  'Android': <a href="@-ZIMFileCacheQueriedCallback" target='_blank'>ZIMFileCacheQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFileCacheQueriedResult-class.html" target='_blank'>ZIMFileCacheQueriedResult</a>,
  'iOS,window': <a href="@ZIMFileCacheQueriedCallback" target='_blank'>ZIMFileCacheQueriedCallback</a>,
  'RN,UTS': <a href="@-ZIMFileCacheQueriedResult" target='_blank'>ZIMFileCacheQueriedResult</a>,
}
export const clearLocalFileCacheMap = {
  'Android': <a href="@clearLocalFileCache" target='_blank'>clearLocalFileCache</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/clearLocalFileCache.html" target='_blank'>clearLocalFileCache</a>,
  'iOS': <a href="@clearLocalFileCacheWithConfig" target='_blank'>clearLocalFileCacheWithConfig</a>,
}
export const ZIMFileCacheClearConfigMap = {
  'Android': <a href="@-ZIMFileCacheClearConfig" target='_blank'>ZIMFileCacheClearConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFileCacheClearConfig-class.html" target='_blank'>ZIMFileCacheClearConfig</a>,
}
export const ZIMFileCacheClearedCallbackMap = {
  'Android': <a href="@-ZIMFileCacheClearedCallback" target='_blank'>ZIMFileCacheClearedCallback</a>,
  'iOS,window': <a href="@ZIMFileCacheClearedCallback" target='_blank'>ZIMFileCacheClearedCallback</a>,
}


# 缓存管理

- - -

## 功能简介

凭借 ZIM SDK，您可以查询当前登录用户的本地缓存文件大小，并清理本地缓存。


## 查询缓存

创建 ZIM 对象并登录后，调用 {getPlatformData(props,queryLocalFileCacheMap)} 接口，传入 {getPlatformData(props,ZIMFileCacheQueryConfigMap)}
查询结果将通过 {getPlatformData(props,ZIMFileCacheQueriedCallbackMap)} 回调接口返回。


:::if{props.platform=undefined}
```java
ZIMFileCacheQueryConfig config = new ZIMFileCacheQueryConfig ();
config.endTime = 0; // 查询当前用户在这个时间戳（UNIX）之前的缓存大小。
                    // 填 0 或晚于当前时间的值，将获取当前用户的完整缓存大小。
zim.queryLocalFileCache(config,  new ZIMFileCacheQueriedCallback() {
    @Override
    public void onFileCacheQueried(ZIMFileCacheInfo fileCacheInfo, ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
          // 查询缓存结果
        } else {
          // ......
        }      
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMFileCacheQueryConfig *config = [[ZIMFileCacheQueryConfig alloc] init];
config.endTime = 0; // 查询当前用户在这个时间戳（UNIX）之前的缓存大小。
                    // 填 0 或晚于当前时间的值，将获取当前用户的完整缓存大小。
[self.zim queryLocalFileCacheWithConfig:config callback:^(ZIMFileCacheInfo *fileCacheInfo, ZIMError *errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
          // 查询结果
    } else {
      // ......
    }
}];
```
:::
:::if{props.platform="window"}
```cpp
zim::ZIMFileCacheQueryConfig config;
config.endTime = 0; // 查询当前用户在这个时间戳（UNIX）之前的缓存大小。
                    // 填 0 或晚于当前时间的值，将获取当前用户的完整缓存大小。
zim::ZIM::getInstance()->queryLocalFileCache(config, [=](/zim-rn/guides/const-zim::zimfilecacheinfo&-filecacheinfo,-const-zim::zimerror&-errorinfo) {
    // 查询结果
});
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMFileCacheQueryConfig config = ZIMFileCacheQueryConfig();
    config.endTime = 0; // 查询当前用户在这个时间戳（UNIX）之前的缓存大小。
                        // 填 0 或晚于当前时间的值，将获取当前用户的完整缓存大小。
    ZIMFileCacheQueriedResult result = await ZIM.getInstance()!.queryLocalFileCache(config);
    // 查询缓存结果
} on PlatformException catch (onError) {
    onError.code;
    onError.message;
}
```
:::
:::if{props.platform="RN|UTS"}
```typescript
const config: ZIMFileCacheQueryConfig = {
    endTime: 0 // 查询当前用户在这个时间戳（UNIX）之前的缓存大小。填 0 或晚于当前时间的值，将获取当前用户的完整缓存大小。
};

zim.queryLocalFileCache(config)
    .then((res: ZIMFileCacheQueriedResult) => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::

## 清除缓存

创建 ZIM 对象并登录后，调用 {getPlatformData(props,clearLocalFileCacheMap)} 接口，传入 {getPlatformData(props,ZIMFileCacheClearConfigMap)} ，即可清理当前用户在本地的缓存。

:::if{props.platform="undefined|iOS|window|Flutter"}
清理结果将通过 {getPlatformData(props,ZIMFileCacheClearedCallbackMap)} 回调接口返回。
:::


:::if{props.platform=undefined}
```java
ZIMFileCacheClearConfig config = new ZIMFileCacheClearConfig ();
config.endTime = 0; // 清理当前用户在这个时间戳（UNIX）之前的缓存大小。
                    // 填 0 或晚于当前时间的值，将清除当前用户的完整缓存大小。
zim.clearLocalFileCache(config,  new ZIMFileCacheClearedCallback() {
    @Override
    public void onFileCacheCleared(ZIMError errorInfo) {
        if(errorInfo.code == ZIMErrorCode.SUCCESS) {
          // 清理缓存结果
        } else {
          // ......
        }      
    }
});
```
:::
:::if{props.platform="iOS|mac"}
```objc
ZIMFileCacheClearConfig *config = [[ZIMFileCacheClearConfig alloc] init];
config.endTime = 0; // 清理当前用户在这个时间戳（UNIX）之前的的缓存
                    // 填 0 或晚于当前时间的值，将清除当前用户的完整缓存。
[self.zim clearLocalFileCacheWithConfig:config callback:^(ZIMError *errorInfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
           // 获得清除缓存结果
    } else {
      // ......
    }
}];
```
:::
:::if{props.platform="window"}
```cpp
zim::ZIMFileCacheClearConfig config;
config.endTime = 0; // 清理当前用户在这个时间戳（UNIX）之前的的缓存
                    // 填 0 或晚于当前时间的值，将清除当前用户的完整缓存。
zim::ZIM::getInstance()->clearLocalFileCache(config, [=](/zim-rn/guides/const-zim::zimerror&-errorinfo) {
    // 获得清除缓存结果
    });
```
:::
:::if{props.platform="Flutter"}
```dart
try{
    ZIMFileCacheClearConfig config = ZIMFileCacheClearConfig();
    config.endTime = 0; // 清除当前用户在这个时间戳（UNIX）之前的缓存大小。
                        // 填 0 或晚于当前时间的值，将清除当前用户的完整缓存。
    await ZIM.getInstance()!.clearLocalFileCache(config);
} on PlatformException catch (onError) {
    onError.code;
    onError.message;
  }
```
:::
:::if{props.platform="RN|UTS"}
```typescript
const config: ZIMFileCacheClearConfig = {
    endTime: 0 // 清理当前用户在这个时间戳（UNIX）之前的缓存大小。填 0 或晚于当前时间的值，将清除当前用户的完整缓存大小。
};

zim.clearLocalFileCache(config)
    .then(() => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
<Content platform="RN" />