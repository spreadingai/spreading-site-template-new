# 共享文件管理

- - -

共享文件管理包含上传文件和缓存文件两个部分。

## 上传文件

当用户需要创建文件白板时，用户需要先将文件上传至 ZEGO 文件云服务，获得该文件的 `fileID`（将被永久保存并适用于所有房间）。

这个 `fileID` 将会在创建文件白板时使用，详情请参考 [创建超级白板 - 创建白板](/super-board-electron/quick-start/create-white-board)。

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
全部规范请参考 [文件规范](/super-board-electron/product-desc/use-restrictions/filerule)。

</Warning>

<Tabs>
<Tab title="上传普通文件">

调用 [uploadFile](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoEvent#upload-file) 方法上传普通文件。
```javascript
var file; // 待上传文件
if (!file) return alert('请先选择文件');
var zegoSuperBoard = ZegoSuperBoardManager.getInstance();
//上传文件后转码后渲染模式类型，如果用户涉及到 iOS、Web、Windows、Mac、小程序各端的业务，推荐使用 VectorAndIMG 模式。

// 文件转码的状态
// 1: 上传中,
// 2: 已上传,
// 4: 排队中,
// 8: 转码中,
// 16: 转码成功,
// 32: 转码失败,
// 64: 取消转码

zegoSuperBoard
    .uploadFile(file, renderType, function(infoMap) {

        // 上传中...
        if(infoMap.status === 1){
        
        }
        // 排队中...
        if(infoMap.status === 4){
        
        }
        // 转码中...
        if(infoMap.status === 8){
        
        }
        // 转换成功
        if(infoMap.status === 16){
            // 获得转码成功的文件 ID
            var fileID = infoMap.fileID;
        }
         
    })
    .then(function(fileID) {
        // 这里上传完成立即创建文件白板，开发者根据实际情况处理
    })
    .catch(function(error){
        // 上传失败
        console.log(error)
    });
```


</Tab>
<Tab title="上传 H5 文件">
通过 [ZegoSuperboardCustomH5Config](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoSuperboardCustomH5Config) 设置上传 H5 文件的配置参数，并调用 [uploadH5File](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoEvent#upload-h5file) 方法上传 H5 文件。

``` javascript

var selectedH5File = null; // 当前选择的 H5 压缩包文件

var config = {
    width: 1600, // 自定义文件的宽
    height: 900, // 自定义文件的高
    pageCount: 7, // 自定义文件的页数
    // 自定义文件缩略图相对路径数组
    thumbnailList: ['thumbnail/1.png','thumbnail/2.png','thumbnail/3.png','thumbnail/4.png','thumbnail/5.png','thumbnail/6.png','thumbnail/7.png']
};
zegoSuperBoard
    .uploadH5File(selectedH5File, config, function(res) {
        // 上传进度
        console.log(res.uploadPercent + '%');
    })
    .then(function(fileID) {
        // 上传成功，得到 H5 文件 ID
        // 这里上传完成立即创建文件白板，开发者根据实际情况处理
    })
    .catch(function(error) {
        // 上传失败
        console.log(error)
    }); 
```
</Tab>
</Tabs>

文件上传分为上传中，排队中，转换中，和转换成功等多个阶段。具体上传状态请查看 [ZegoSuperBoardUploadFileState](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~enum~ZegoSuperBoardUploadFileState)

- 上传阶段：如果正常上传，会产生多次回调，每次都包含文件上传进度。例如当前上传 50%，则 "infoMap" 内容为 `{"uploadPercent":0.50}`；当前上传 100%，则 "infoMap" 内容为 `{"uploadPercent":1.00}`。
- 格式转换阶段：如果转换成功，只产生一次回调，包含转换后的文件 ID。例如当前转换完成，则 "infoMap" 内容为 `{"fileID":"ekxxxxxxxxv"}`。

#### 服务端 API

服务端 API 仅支持上传普通文件，详情请参考服务端接口文档 [请求文件转码](/super-board-server/cvt-doc)。

## 缓存文件

当用户上传文件并获取文件的 fileID 之后，如需提高文件加载速度，可以在调用 [ZegoSuperBoardManager](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager) 的 [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#create-file-view) 接口创建文件白板之前，提前缓存该文件。

调用 [cacheFile](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~interface~ZegoEvent#cache-file) 方法提前请求该文件中的资源。
``` javascript

var zegoSuperBoard = ZegoSuperBoardManager.getInstance()
zegoSuperBoard.cacheFile(fileID).then(function(res){
    // 回调中返回的参数：seq, cachePercent
}).catch(function(error){
    // 缓存失败
})

```
