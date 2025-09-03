# 共享文件管理

- - -

共享文件管理包含上传文件和缓存文件两个部分。

## 上传文件

当用户需要创建文件白板时，用户需要先将文件上传至 ZEGO 文件云服务，获得该文件的 `fileID`（将被永久保存并适用于所有房间）。

这个 `fileID` 将会在创建文件白板时使用，详情请参考 [创建超级白板 - 创建白板](/super-board-flutter/quick-start/create-white-board)。

<Note title="说明">
建议您将文件的名称和 `fileID` 一一对应，以便快速访问。
</Note>

ZEGO 超级白板支持客户端 API 和服务端 API 两种方式上传文件。

### 客户端 API

对于 ZEGO 超级白板 SDK 而言，文件可分为普通文件和 H5 文件。因此，当上传不同类型的文件时，需要调用不同的上传接口。

普通文件包含：

- PPT 演示文稿文件
- 文档类文件（Word/PDF）
- 表格类文件（Excel）
- 图片类文件（JPG/JPEG/PNG/BMP）
- 文本类文件（TXT）

<Warning title="注意">
上传的文件必须满足相应的规范：

- 文件请使用 Microsoft Office 2013 或以上版本编辑/保存，不支持低版本 Microsoft Office 或其他办公软件保存的文件，如 WPS、Keynote、Microsoft Office 2003 等。
- 文件必须是可编辑的，不支持“只读”、“加密”、或其他受保护的文档，否则会导致转码失败。
全部规范请参考 [文件规范](/super-board-flutter/product-desc/use-restrictions/filerule)。

</Warning>

<Tabs>
<Tab title="上传普通文件">
调用 [uploadFile](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/uploadFile.html) 方法上传普通文件。

```dart
// 上传文件回调 
ZegoSuperBoardEventHandler.uploadFile = ((info) async { 
    // 上传中... 
    if (info['state'] == ZegoSuperBoardUploadFileState.upload.value) { 

    } else if (info['state'] == ZegoSuperBoardUploadFileState.convert.value) { 
        /** 转换成功 */ 
    } 
}); 

// 上传文件 
File file = File(pickerResult.files.single.path!); 
var map = await ZegoSuperBoardManager.instance.uploadFile(filePath: file.path, renderType: ZegoSuperBoardRenderType.VectorAndIMG); 
uploadSeq = map!['seq']; 
if (kDebugMode) { 
    print('[Flutter][uploadFile]:$map'); 
} 
```
</Tab>
<Tab title=" 上传 H5 文件">
通过 [ZegoUploadCustomH5Config](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_defines/ZegoUploadCustomH5Config-class.html) 设置上传 H5 文件的配置参数，并调用 [uploadH5File](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/uploadH5File.html) 方法上传 H5 文件。

```dart
// 上传 H5 文件回调 
ZegoSuperBoardEventHandler.uploadH5File = ((info) async { 
    // 上传中... 
    if (info['state'] == ZegoSuperBoardUploadFileState.upload.value) { 

    } else if (info['state'] == ZegoSuperBoardUploadFileState.convert.value) { 
        /** 转换成功 */ 
    } 
}); 

// 上传 H5 文件 
File file = File(pickerResult.files.single.path!); 
ZegoUploadCustomH5Config config = ZegoUploadCustomH5Config(960, 540, 2, ['thumbnails/1.jpg', 'thumbnails/2.jpg']); 
var map = await ZegoSuperBoardManager.instance.uploadH5File(filePath: file.path, config: config); 
uploadSeq = map!['seq']; 
if (kDebugMode) { 
    print('[Flutter][uploadFile]:$map'); 
} 
```
</Tab>
</Tabs>

调用客户端 API 接口上传文件的过程包含分为上传阶段和格式转换阶段，详情请查看 [ZegoSuperBoardUploadFileState](https://pub.dev/documentation/zego_superboard/latest/zego_superboard_defines/ZegoSuperBoardUploadFileState.html)。

- 上传阶段：如果正常上传，会产生多次回调，每次都包含文件上传进度。例如当前上传 50%，则 "infoMap" 内容为 `{"upload_percent":0.50}`；当前上传 100%，则 "infoMap" 内容为 `{"upload_percent":1.00}`。
- 格式转换阶段：如果转换成功，只产生一次回调，包含转换后的文件 ID。例如当前转换完成，则 "infoMap" 内容为 `{"upload_fileid":"ekxxxxxxxxv"}`。

### 服务端 API

服务端 API 仅支持上传普通文件，详情请参考服务端接口文档 [请求文件转码](/super-board-server/cvt-doc)。

## 缓存文件

当用户上传文件并获取文件的 fileID 之后，如需提高文件加载速度，可以在调用 [ZegoSuperBoardManager](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager-class.html) 的 [createFileView](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/createFileView.html) 接口创建文件白板之前，提前缓存该文件。

### 缓存文件

调用 [cacheFile](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/cacheFile.html) 方法将文件缓存到本地。

``` dart
// 缓存文件回调 
ZegoSuperBoardEventHandler.cacheFile = ((info) { 
    if (kDebugMode) { 
        print('[Flutter][cacheFile] info:$info'); 
    } 
    if (info['state'] == ZegoSuperBoardCacheFileState.caching.value) {
    
    } 
}); 

// 缓存文件 
var map = await ZegoSuperBoardManager.instance.cacheFile(fileID: currentfileID); 
if (kDebugMode) { 
    print('[Flutter][cacheFileWithFile]:$map'); 
} 
```

### 取消缓存文件

调用 [cancelCacheFile](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/cancelCacheFile.html) 方法取消掉正在缓存的文件。

```dart
// cacheSeq 为 cacheFile 返回的seq值。
var map = await ZegoSuperBoardManager.instance.cancelCacheFile(seq: cacheSeq);
if (kDebugMode) {
    print('[Flutter][cancelCacheFile]:$map');
}
```

### 查询文件是否已经有缓存

调用 [queryFileCached](https://pub.dev/documentation/zego_superboard/latest/zego_superboard/ZegoSuperBoardManager/queryFileCached.html) 方法查询文件缓存是否存在。

```dart
// 通过 fileID 查询指定文件是否已缓存
var map = await ZegoSuperBoardManager.instance.queryFileCached(fileID: currentfileID);
if (kDebugMode) {
   print('[Flutter][queryFileCached]:$map');
}
```
