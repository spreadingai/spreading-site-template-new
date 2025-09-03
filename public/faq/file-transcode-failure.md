<Title>文件上传或加载失败怎么处理？</Title>


----

## 问题描述
1. 调用文件共享 SDK 上传文件接口，将目标文件上传后，收到转码失败的错误码及信息。
2. 调用文件共享 SDK 加载文件接口，遇到加载失败（错误码为 ZegoDocsViewErrorServerFileNotExist，2030010）的情况。
3. 调用文件共享 SDK 加载文件接口，遇到加载失败（错误码为 ZegoDocsViewErrorSizeInvalid，2030004）的情况。


## 问题原因
### 文件转码失败的原因
文件转码失败，可能有以下原因：

- 源文件不可编辑。待转码的源文件必须是可编辑的，不⽀持对“只读”、“⼆进制加密”或设置了其它保护导致内容⽆法编辑的⽂件进⾏转码。
- 用户的文件里包含的图片结构被破坏。用户在压缩文件里的图片的过程中导致图片受损，结构被破坏，此时图片虽然可以在电脑本地正常预览，但是在使用文件共享 SDK 进行文件上传时会失败。

### 加载文件失败（错误码 2030010）的原因
加载文件时返回的 2030010 错误码表示找不到服务器上的文件，可能有以下原因：
- 传入的 fileID 错误，找不到对应文件。
- 对应的文件已被删除。
- 上传文件和加载文件时使用了不同的AppID，无法获取文件。

### 加载文件失败（错误码 2030004）的原因
加载文件时返回的 2030004 错误码表示没有获取到当前 `ZegoDocsView` 有效的宽度和高度，原因如下：

文件共享 SDK 在加载 `ZegoDocsView` 时，需要读取到该 View 的有效宽度和高度，以执行文件图片的切片工作。如果 SDK 加载时拿不到有效的宽度和高度，就会报错并抛出这个错误码。


## 解决方案
### 文件转码失败解决方案
- 文件共享 SDK 不支持由 WPS 保存的文件，请确保您的文件是用 Microsoft Office 生成的。
- 请确保您的文件时可编辑的：没有“只读”属性；没有经过加密；文件里包含的图片内容没有受损，可以在电脑中正常展示。
- 如果您的文件类型是 图片 且在 Microsoft Office PPT 中导入正常，但无法转为 PDF，可通过如下步骤判断失败原因和处理：

    1. 使用图片处理工具判断图片是否被损坏：如使用 PS 工具导入该图片时，会报错 “IDAT: incorrect data check”，代表该图片已损坏；
    2. 通过 Microsoft Office PPT 对图片进行“另存为”操作，PPT 会对图片重新进行处理。此时将另存为的图片重新插入源文件，可正#常文件转码。

### 加载文件失败（错误码 2030010）解决方案
- 确认传入的 fileID 是否是正确的，该文件上传成功后获取到的 fileID 和当前加载时的 fileID 必须保持一致。
- 确认您是否调用过服务端 API `https://docservice.zego.im/doc/del_file`主动删除了已经上传到云端的文件。
- 确认您在上传文件时使用的 AppID 是否与加载文件时使用的 AppID 一致，如果不一致，则无法访问到相应的文件。

### 加载文件失败（错误码 2030004）解决方案
#### 方案一:
- Android
因为 `ZegoDocsView` 获取宽高时，`View` 的绘制还未完成，此时存在时序问题。所以在 `Android` 中，一种常用的做法是以 `Handler` 为基础，调用 `View.post()` 将传入任务的执行时机调整到 View 绘制完成之后，从而能够确保获取到 `View` 有效的宽高。

    具体详细的使用方式可以在示例demo中参考。示例代码如下图所示：

    ```java
        ZegoDocsView zegoDocsView = new ZegoDocsView(this);
        zegoDocsView.post(new Runnable() {
            @Override
            public void run() {
                zegoDocsView.loadFile("xxxxxx", "", new IZegoDocsViewLoadListener() {
                    @Override
                    public void onLoadFile(int errorCode) {
                        if (errorCode == 0) {
                            // 加载文件成功
                        } else {
                            // 加载文件失败
                        }
                    }
                });
            }
        });
    ```

- iOS
在初始化的时候设置宽高，即可解决。
    ```objc
    ZegoDocsView * docsView = [[ZegoDocsView alloc] init];
    //设置一个非0的宽高
    [docsView setFrame:CGRectMake(0, 0, 1280, 720)];
    [docsView loadFileWithFileID:@"xxx" authKey:@"" completionBlock:^(ZegoDocsViewError errorCode) {
        if (errorCode == 0) {
                // 加载文件成功
        } else {
                // 加载文件失败
        }
    }];
    ```

#### 方案二 :
在界面刚初始化时拿不到有效的宽度和高度，`ZegoDocsView` 提供了一个接口 `setEstimatedSize` 用于传入一个当前view的估计值，从而确保 `loadFile` 能够成功。

- Android 
示例代码
    ```java
    ZegoDocsView zegoDocsView = new ZegoDocsView(this);
    zegoDocsView.setEstimatedSize(1280, 720);
    zegoDocsView.loadFile("xxx", "", new IZegoDocsViewLoadListener() {
        @Override
        public void onLoadFile(int errorCode) {
            if (errorCode == 0) {
                // 加载文件成功
            } else {
                // 加载文件失败
            }
        }
    });
    ```

- iOS
示例代码
    ```objc
    ZegoDocsView * docsView = [[ZegoDocsView alloc] init];
    //不确定view的宽高的时候可以设置一个预估值
    [docsView setEstimatedSize:CGSizeMake(1280, 720)];
    [docsView loadFileWithFileID:@"xxx" authKey:@"" completionBlock:^(ZegoDocsViewError errorCode) {
        if (errorCode == 0) {
                // 加载文件成功
        } else {
                // 加载文件失败
        }
    }];
    ```




## 相关链接
- [常见错误码](https://doc-zh.zego.im/article/4372)
- [文件共享 SDK 详细功能特性与格式支持](https://doc-zh.zego.im/article/4399)
