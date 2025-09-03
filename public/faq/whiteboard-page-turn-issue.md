<Title>白板创建成功后，调用翻页接口不生效？</Title>



- - -

## 问题描述
白板创建成功后，调用翻页接口进行翻页，白板未能翻到指定页。

## 问题原因
对于多页白板，如果创建该白板时传入的 aspectWidth 与 aspectHeight 的比例、pageCount 不符合要求（例如 aspectWidth 未乘以 pageCount 的倍数），导致创建的不是多页白板，就会出现无法翻页的现象。

## 解决方案
确保传入的 aspectWidth、aspectHeight 和 pageCount 参数是合法的且 aspectWidth 是单页宽度乘以 pageCount 的值。

以 Web 平台为例，创建宽为 1600 px，高为 900 px，横向有 5 页的 [ZegoWhiteboardView](https://doc-zh.zego.im/article/api?doc=WhiteBoardView_API~javascript_web~interface~ZegoWhiteboardView&jumpType=route) 的示例如下：

```typescript
const zegoWhiteboardView = await zegoExpressEngine.createView({
    roomID: '登录房间号',
    name: '白板名称',
    aspectWidth: 1600 * 5,
    aspectHeight: 900,
    pageCount: 5,
    fileInfo?: {
        fileID: '文件ID',
        fileName: '文件名',
        fileType: '文件类型',
        authKey: ''
    }
})
```


## 相关链接

[实现流程 - 互动白板](https://doc-zh.zego.im/article/8847#3_3)
