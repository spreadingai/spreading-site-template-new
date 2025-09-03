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

export const exportLocalMessagesMap = {
  'Android': <a href="@exportLocalMessages" target='_blank'>exportLocalMessages</a>,
  'iOS': <a href="@exportLocalMessagesToFolderPath" target='_blank'>exportLocalMessagesToFolderPath</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/exportLocalMessages.html" target='_blank'>exportLocalMessages</a>,
}
export const ZIMMessageExportingProgressMap = {
  'Android': <a href="@-ZIMMessageExportingProgress" target='_blank'>ZIMMessageExportingProgress</a>,
  'window,iOS': <a href="@ZIMMessageExportingProgress" target='_blank'>ZIMMessageExportingProgress</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageExportingProgress.html" target='_blank'>ZIMMessageExportingProgress</a>,
}
export const ZIMMessageExportedCallbackMap = {
  'Android': <a href="@-ZIMMessageExportedCallback" target='_blank'>ZIMMessageExportedCallback</a>,
  'window,iOS': <a href="@ZIMMessageExportedCallback" target='_blank'>ZIMMessageExportedCallback</a>,
  'RN,UTS': <a href="@-ZIMMessageExportedResult" target='_blank'>ZIMMessageExportedResult</a>,
}
export const ZIMMessageImportedCallbackMap = {
  'Android': <a href="@-ZIMMessageImportedCallback" target='_blank'>ZIMMessageImportedCallback</a>,
  'window,iOS': <a href="@ZIMMessageImportedCallback" target='_blank'>ZIMMessageImportedCallback</a>,
  'RN,UTS': <a href="@-ZIMMessageImportedResult" target='_blank'>ZIMMessageImportedResult</a>,
}
export const importLocalMessagesMap = {
  'Android': <a href="@importLocalMessages" target='_blank'>importLocalMessages</a>,
  'iOS': <a href="@importLocalMessagesToFolderPath" target='_blank'>importLocalMessagesToFolderPath</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/importLocalMessages.html" target='_blank'>importLocalMessages</a>,
}
export const ZIMMessageImportingProgressMap = {
  'Android': <a href="@-ZIMMessageImportingProgress" target='_blank'>ZIMMessageImportingProgress</a>,
  'window,iOS': <a href="@ZIMMessageImportingProgress" target='_blank'>ZIMMessageImportingProgress</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMMessageImportingProgress.html" target='_blank'>ZIMMessageImportingProgress</a>,
}



# 导出导入消息

- - -

## 功能简介

凭借 ZIM SDK，您可以将当前用户客户端的本地聊天记录（单聊消息和群聊消息）导出作为备份，可用于更换设备时迁移聊天记录，或恢复被删除的消息。

<Warning title="注意">

强烈建议开发者在迁移消息过程中对备份文件进行加密，以免泄露用户数据。
</Warning>


## 导出消息

创建 ZIM 对象并登录后，调用 {getPlatformData(props,exportLocalMessagesMap)} 接口，传入一个绝对路径，将当前用户的聊天消息保存到该目录。

导出进度，将通过 {getPlatformData(props,ZIMMessageExportingProgressMap)} 回调接口返回。

:::if{props.platform="undefined|iOS|window"}

导出操作结果，将通过 {getPlatformData(props,ZIMMessageExportedCallbackMap)} 回调接口返回。
:::

<Note title="说明">

本接口导出的消息文件名称为 zim_backup_msg_text。如果多次调用本接口时，传入的路径相同，ZIM SDK 会自行将旧的 zim_backup_msg_text 文件更名，以确保最新导出的文件名称为 zim_backup_msg_text。
</Note>


:::if{props.platform=undefined}
```java
// 导出消息
ZIMMessageExportConfig config = new ZIMMessageExportConfig();
zim.exportLocalMessages("folderPath", config, new ZIMMessageExportedCallback() {
    @Override
    public void onMessageExportingProgress(long exportedMessageCount, long totalMessageCount) {
          // 导出进度回调         
    }
    @Override
    public void onMessageExported(ZIMError errorInfo) {
         //导出结果回调
    }
 });
```

:::

:::if{props.platform="Flutter"}
```dart
// 导出消息
try{
    ZIMMessageExportConfig config = ZIMMessageExportConfig();
    await ZIM.getInstance()!.exportLocalMessages('folderPath', config, (exportedMessageCount, totalMessageCount) {
      // 导出进度回调   
    });
      // 导出成功
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```
:::

:::if{props.platform="RN|UTS"}
```typescript
// 导出进度回调
const progress = (exportedMessageCount, totalMessageCount) => {};
// 导出消息
const folderPath = '/sdcard/xxxx'; // 本地文件目录的绝对路径
zim.exportLocalMessages(folderPath, {} as ZIMMessageExportConfig, progress)
    .then(() => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::

:::if{props.platform="window"}
```cpp
// 导出消息
zim::ZIMMessageExportConfig config;
zim::ZIM::getInstance()->exportLocalMessages("folderPath", config, [](unsigned long long exportedMessageCount,
    unsigned long long totalMessageCount) {
        // 导出进度回调
    }, [](const zim::ZIMError& errorInfo) {
        // 导出结果回调
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 导出消息
ZIMMessageExportConfig *config = [[ZIMMessageExportConfig alloc] init];
[self.zim exportLocalMessagesToFolderPath:@"folderPath" config: config 
                                 progress:^(unsigned long long exportedMessageCount,
                                            unsigned long long totalMessageCount) {
                                                // 导出进度回调
                                } callback:^(ZIMError *errorInfo) {
                                                // 导出结果回调
}];
```
:::


## 导入消息

创建 ZIM 对象并登录后，调用 {getPlatformData(props,importLocalMessagesMap)} 接口，传入备份文件所在目录的绝对路径，即可导入消息。

ZIM SDK 默认读取目录中名称为 zim_backup_msg_text 的文件。如果该路径下存在多份备份，请确认待导入的文件名称是否为 zim_backup_msg_text。

导入进度，将通过 {getPlatformData(props,ZIMMessageImportingProgressMap)} 回调接口返回。

:::if{props.platform="undefined|iOS|window"}
导入操作结果，将通过 {getPlatformData(props,ZIMMessageImportedCallbackMap)} 回调接口返回。
:::

:::if{props.platform=undefined}
```java
// 导入消息
ZIMMessageImportConfig config = new ZIMMessageImportConfig();
zim.importLocalMessages("folderPath", config, new ZIMMessageImportedCallback() {
    @Override
    public void onMessageImportingProgress(long importedMessageCount, long totalMessageCount) {
          // 导入进度回调         
    }
    @Override
    public void onMessageImported(ZIMError errorInfo) {
         // 导入结果回调
    }

 });
```

:::
:::if{props.platform="Flutter"}
```dart
// 导入消息
try{
    ZIMMessageImportConfig config = ZIMMessageImportConfig();
    var result = await ZIM.getInstance()!.importLocalMessages('folderPath', config, (importedMessageCount, totalMessageCount) {
      // 导入进度回调
    });
      // result 为导入结果回调
} on PlatformException catch(onError){
    onError.code;
    onError.message;
}
```

:::
:::if{props.platform="RN|UTS"}
```typescript
// 导入进度回调
const progress = (importedMessageCount, totalMessageCount) => {};
// 导入消息
const folderPath = '/sdcard/xxxx'; // 本地文件目录的绝对路径
zim.importLocalMessages(folderPath, {} as ZIMMessageImportConfig, progress)
    .then(() => {
        // 操作成功
    })
    .catch((err: ZIMError) => {
        // 操作失败
    });
```
:::
:::if{props.platform="window"}
```cpp
// 导入消息
zim::ZIMMessageImportConfig config;
zim::ZIM::getInstance()->importLocalMessages("folderPath", config, [](unsigned long long importedMessageCount,
    unsigned long long totalMessageCount) {
        //导入进度回调
    }, [](const zim::ZIMError& errorInfo) {
        //导入结果回调
    });
```
:::
:::if{props.platform="iOS"}
```objc
// 导入消息
ZIMMessageImportConfig *config = [[ZIMMessageImportConfig alloc] init];
[self.zim importLocalMessagesToFolderPath:@"folderPath" config: config 
                                 progress:^(unsigned long long importedMessageCount,
                                            unsigned long long totalMessageCount) {
                                                //导入进度回调
                                } callback:^(ZIMError *errorInfo) {
                                                //导入结果回调
}];
```
:::
<Content platform="window" />