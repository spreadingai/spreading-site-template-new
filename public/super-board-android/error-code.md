# 常见错误码

- - -


通过本文可以了解错误码的含义、产生原因及及处理方法，如有疑问请联系 ZEGO 技术支持。

## 310xxxx 公共错误码

该类错误码指的是接口通用错误的错误码，通常会从 onError 回调中抛出，请根据以下错误码信息进行相应处理。

| 错误码     | 错误码提示 | <p style={{width:"5em"}}>描述</p>  | 可能原因 | 处理建议     |
| ------- | ---------- | ----- | ---- | ----------- |
| 0       | ZegoSuperBoardSuccess  | 成功 |  -    |    -   |
| 3100001 | ZegoSuperBoardErrorInternal | 内部错误 | -   | 请联系 ZEGO 技术支持处理。 |
| 3100002 | ZegoSuperBoardErrorParamInvalid | 参数错误 |   传入的参数有误。   | 请留意控制台输出的具体信息。  |
| 3100003 | ZegoSuperBoardErrorNetworkTimeout | 网络超时 |  设备断开网络连接或者没有联网。 |   检查设备网络状况。  |
| 3100004 | ZegoSuperBoardErrorNetworkDisconnect | 网络断开|   设备断开网络连接或者没有联网。 |  检查设备网络状况。  |
| 3100005 | ZegoSuperBoardErrorResponse | 网络回包错误 |  设备断开网络连接或者没有联网。      |    检查设备网络状况。   |
| 3100006 | ZegoSuperBoardErrorRequestTooFrequent  | 请求过于频繁 |   -   |  请控制发送请求的次数。  |
| 3100007 | ZegoSuperBoardErrorVersionMismatch  | 初始化失败 |  白板SDK 和 ZegoExpress-Video SDK 不匹配。    |   请使用和白板 SDK 匹配的 ZegoExpress-Video SDK。   |
| 3100008 | ZegoSuperBoardErrorExpressImcompatible   | 初始化失败 | ZegoExpress-VideoSDK 不包含白板功能。     |    请使用包含白板功能的 ZegoExpress-Video SDK。  |
| 3100009 | ZegoSuperBoardErrorRequestFailure | 请求失败  | 网络异常。    | 检查设备网络状况。 |

## 3110xxx 房间相关错误码
| 错误码     | 错误码提示 | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议|
| ------- | ------ | ------- | ---- | --------- |
| 3110001 | ZegoSuperBoardErrorNoLoginRoom | 未登录房间 |   没有登录房间。   |   在相关操作前先执行 loginRoom 操作。      |

## 3120xxx 白板 view 相关错误码
| 错误码     | 错误码提示| <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议   |
| ------- | ---------- | ------ | ---- | --------- |
| 3120001 | ZegoSuperBoardErrorViewNotExist   | 白板 view 不存在 |  可能由于网络等原因掉线，导致操作的白板判定为不存在。  |   建议断网重连。    |
| 3120002 | ZegoSuperBoardErrorViewCreateFail             | 创建白板 view 失败 |    网络异常。   |  建议增加对应的重试机制。   |
| 3120003 | ZegoSuperBoardErrorViewModifyFail             | 修改白板 view 失败 |  网络异常。   |  建议增加对应的重试机制。 |
| 3120004 | ZegoSuperBoardErrorViewNameLimit              | 白板 view 名称过长 |  -    |   将白板名称限制在 128 个字节以内。    |
| 3120005 | ZegoSuperBoardErrorViewParentNotExist         | 白板 view 的 parent 不存在  |  通常是因为获取不到父容器。    |  请确保父容器已创建。       |
| 3120006 | ZegoSuperBoardErrorViewNumLimit               | 超过白板最大数量限制 |  单房间内最多允许同时存在 50 个白板。    |  删除不需要的白板。 |
| 3120007 | ZegoSuperBoardErrorAnimationInfoLimit         | 动画信息过长  |  -    |  建议缩短要同步的动画信息。 |

## 3130xxx 图元相关错误码
| 错误码   | 错误码提示    | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议  |
| ------- | ----------- | --- | ------- | -------- |
| 3130001 | ZegoSuperBoardErrorGraphicNotExist | 图元不存在 | 网络异常。   | 建议增加对应的重试机制。  |
| 3130002 | ZegoSuperBoardErrorGraphicCreateFail | 创建图元错误 | 网络异常。 | 建议增加对应的重试机制。  |
| 3130003 | ZegoSuperBoardErrorGraphicModifyFail | 修改图元错误 | 网络异常。  |  建议增加对应的重试机制。 |
| 3130004 | ZegoSuperBoardErrorGraphicUnableDraw | 未开启绘制 | -  | 检查代码是否设置了绘制白板权限。 |
| 3130005 | ZegoSuperBoardErrorGraphicDataLimit | 单个图元数据大小超过限制 | -     |  建议分段绘制图元，单个图元超过一定的数据量会被限制。  |
| 3130006 | ZegoSuperBoardErrorGraphicNumLimit   | 超过图元最大数量限制 | -     |  建议重新创建一个新的白板用于绘制。   |
| 3130007 | ZegoSuperBoardErrorGraphicTextLimit | 文本字数超过上限 | - | 建议重新创建一个文本图元进行书写。  |
| 3130008 | ZegoSuperBoardErrorGraphicImageSizeLimit  | 图片图元大小超限制 | - | 建议上传的图片不要太大。 |
| 3130009 | ZegoSuperBoardErrorGraphicImageTypeNotSupport | 不支持的图片类型                                                                                           | -     | 请查看文件规范使用支持的图片类型。  |
| 3130010 | ZegoSuperBoardErrorGraphicIllegalAddress | 无效图片地址| -     |  检查是否传入了无效的网络URL，或传入了无效的本地路径。 |
| 3130011 | ZegoSuperBoardErrorGraphicCursorOffsetLimit | 光标设置偏移值超出光标大小| -     |  检查是否传入的光标偏移值超出了光标图片的大小。 |
| 3130021 | ZegoSuperBoardErrorGetContextFail   |  获取 canvas 上下文失败 |  <ul><li>在部分 iOS 移动设备上渲染文件个数过多导致绘制 canvas 内存超出限制。</li><li>在部分 iOS 移动设备渲染的静态文件页数过多，绘制 canvas 过超出内存限制。</li></ul> | 处理建议：建议拆分文件，重新上传共享文件。|
| 3130022 | ZegoSuperBoardErrorDrawImageFail  |  canvas 绘制失败 | 在部分 iOS 移动设备上渲染文件偶现绘制 canvas 失败。| 请联系 ZEGO 技术支持。 |
| 3130023 | ZegoSuperBoardErrorSwitchSpeakerFail  | 切换扬声器失败 | <ul><li>使用的浏览器不支持 getUserMedia、enumerateDevices、setSinkId 等接口。</li><li>文件不是动态文件。</li></ul>| <ul><li>更换浏览器，如 Google Chrome 浏览器。</li><li>使用动态文件。</li></ul> |

## 314xxxx 接口调用错误码
| 错误码     | 错误码提示| <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议    |
| ------- | ------ | ------ | ---- | -------- |
| 3140001 | ZegoSuperBoardErrorInitFail  | 初始化失败 | -  | 检查您的 AppID 和 AppSign 是否设置正确，网络状态是否正常。  |
| 3140002 | ZegoSuperBoardErrorGetListFail| 拉取白板 view 列表失败 | 网络异常。     |  可增加对应的重试机制。  |
| 3140003 | ZegoSuperBoardErrorCreateFail  | 创建白板 view 失败|  网络异常或者创建白板个数超过限制。     |  可增加对应的重试机制。 |
| 3140004 | ZegoSuperBoardErrorDestroyFail  | 销毁白板 view 失败| 网络异常。     |  可增加对应的重试机制。 |
| 3140005 | ZegoSuperBoardErrorAttachFail  | attach 白板 view 失败| 界面展示时机错误。     | 请在界面容器准备好之后再添加白板。   |
| 3140006 | ZegoSuperBoardErrorClearFail  | 清空白板 view 失败 | 网络异常。     |  可增加对应的重试机制。 |
| 3140007 | ZegoSuperBoardErrorScrollFail| 滚动白板 view 失败 | 权限不足、滚动冲突。     |  检查房间内是否设置了禁止滚动的权限，或尝试重新滚动。 |
| 3140008 | ZegoSuperBoardErrorUndoFail | 撤销操作失败 | 网络异常或操作冲突。     |  尝试重新撤销。  |
| 3140009 | ZegoSuperBoardErrorRedoFail  | 重做操作失败 | 网络异常或操作冲突。     |  尝试重新重做。 |
| 3140010 | ZegoSuperBoardErrorLogFolderNotAccess | 初始化时设置的日志目录无法创建或写入 | 权限不足或路径不可访问。  |  检查是否授予了对应的目录权限，对应目录是否可读可写。    |
| 3140011 | ZegoSuperBoardErrorCacheFolderNotAccess | 初始化时设置的缓存目录无法创建或写入 |权限不足或路径不可访问。  |  检查是否授予了对应的目录权限，对应目录是否可读可写。   |
| 3140012 | ZegoSuperBoardErrorSwitchFail | 切换白板 view 失败 | 网络异常或操作冲突。  |  尝试重新切换。 |

## 315xxxx 权限错误码
| 错误码     | 错误码提示 | <p style={{width:"5em"}}>描述</p>  | 可能原因 | 处理建议   |
| ------- | --------- | ----- | ---- | ----------- |
| 3150001 | ZegoSuperBoardErrorNoAuthScale | 无白板缩放权限 |  服务端配置权限关闭。   |    检查服务端权限状态。  |
| 3150002 | ZegoSuperBoardErrorNoAuthScroll | 无白板滚动权限|  服务端配置权限关闭。 | 检查服务端权限状态。  |
| 3150003 | ZegoSuperBoardErrorNoAuthCreateGraphic | 无图元创建权限 |   服务端配置权限关闭。    |    检查服务端权限状态。  |
| 3150004 | ZegoSuperBoardErrorNoAuthUpdateGraphic | 无图元编辑权限 |  服务端配置权限关闭。     |    检查服务端权限状态。 |
| 3150005 | ZegoSuperBoardErrorNoAuthMoveGraphic | 无白板移动权限 |   服务端配置权限关闭。    |     检查服务端权限状态。  |
| 3150006 | ZegoSuperBoardErrorNoAuthDeleteGraphic | 无白板删除权限 |  服务端配置权限关闭。     |     检查服务端权限状态。    |
| 3150007 | ZegoSuperBoardErrorNoAuthClearGraphic   | 无白板清空权限 |  服务端配置权限关闭。     |      检查服务端权限状态。   |

## 3111xxx 文件上传错误码
| 错误码   | 错误码提示  | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议  |
| ------- | --------- | ---- | ---- | --------- |
| 3111001 | ZegoSuperBoardErrorFileNotExist | 找不到对应的本地文件 |  1. 上传时访问了错误的文件路径。 <br /> 2. 本地文件已被删除。 | 检查文件路径是否正确。 |
| 3111002 | ZegoSuperBoardErrorUploadFailed  | 上传失败 |   设备网络断开连接。   |   检查设备网络状况是否良好。  |
| 3111003 | ZegoSuperBoardErrorUnsupportRenderType  | 不支持的渲染模式 |  上传传入的 renderType 不正确。    |   检查传入的参数。    |

## 3121xxx 格式转换错误码

<Note title="说明">

上传文件的具体规范请参考 [文件规范](/super-board-android/product-desc/use-restrictions/filerule)。

</Note>

| 错误码  | 错误码提示 | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议   |
| ------ | -------- | ----- | ---- | ----------- |
| 3121001 | ZegoSuperBoardErrorFileEncrypt  | 需要转码的文件被加密 |  可能的原因包括：<br />Word 文件访问需要密码。<br />Excel 文件访问需要密码。<br />PPT 文件访问需要密码。 |  关闭掉对应文件的密码访问权限。   |
| 3121002 | ZegoSuperBoardErrorFileSizeLimit | 文件内容过大 |   可能的原因包括：<br />Excel 文件大小超过 10MB。<br />Excel 文件打开时间过久。<br />文本文件大小超过 2MB。<br />其他文件大小超过 300MB。     |  缩小上传的文件大小 。  |
| 3121003 | ZegoSuperBoardErrorFileSheetLimit  | 文件页数过多  |  可能的原因包括：<br />Excel 文件 sheet 数量超过 20。<br />Word 文件页数超过 500。<br />PPT 文件页数超过 500。|    减少文件总页数。  |
| 3121004 | ZegoSuperBoardErrorConvertFail  | 格式转换失败 | 文件包含不支持转码的元素。   |  删除掉对应元素。|
| 3121005 | ZegoSuperBoardErrorConvertCancel | 格式转换被取消 | -  |  重新发起格式转换   |
| 3121006 | ZegoSuperBoardErrorFileContentEmpty | 文件内容为空 | 可能的原因包括：<br />PDF 文件内无内容。<br />PPT 文件内没有幻灯片。<br />Excel 文件内无内容。<br />Word 文件内无内容。|  补充对应文件的内容后再发起转码    |
| 3121007 | ZegoSuperBoardErrorFileReadOnly  | 文件为只读模式  |可能的原因包括：<br />动态 PPT 文件被设置为只读模式，会导致转码失败。<br />动态 PPT 文件中包含转码服务器不支持的字体，会导致转码失败。   | 去除动态 PPT 文件的只读模式; <br />字体更换成转码服务器支持的字体。 |
| 3121008 | ZegoSuperBoardErrorConvertElementNotSupported | 源文件中存在不支持转码的元素| - |   删除对应的元素再进行转码。   |
| 3121009 | ZegoSuperBoardErrorConvertFileTypeInvalid  | 文件后缀名不符合 ZEGO 定义的文件规范  | -     |  将文件后缀名更改成符合 ZEGO 定义的文件规范。 |
| 3121010 | ZegoSuperBoardErrorConvertFileUnsafe  | 源文件中存在安全隐患，无法正常打开  | - |  请使用 office 打开文件，查看是否有安全隐患提示，并按照提示修改文件。    |
| 3121011 | ZegoSuperBoardErrorConvertElementNotExported | 转码结束后存在图片、音视频文件未正常导出| - |  重新发起转码请求。 |

## 3131xxx SDK接口调用
| 错误码     | 错误码提示 | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议 |
| ------- | -------- | ----- | ---- | --------- |
| 3131001 | ZegoSuperBoardErrorAuthParamInvalid | 认证参数错误 |  1.Token 不正确  <br />2.文件共享服务未开通 | 1.请检查传入的 Token 是否正确，是否能正常使用。  <br />2.请联系 ZEGO 技术支持开通文件共享服务。    |
| 3131002 | ZegoSuperBoardErrorFilePathNotAccess   | 路径权限不足 |    1.初始化时传入的log目录不可用。 <br />2.初始化时传入的cache目录不可用。 <br />3.初始化时传入的data目录不可用。   | 检查传入的参数。 |
| 3131003 | ZegoSuperBoardErrorInitFailed | 初始化失败 |  1. AppID 和 AppSign 错误。<br /> 2.传入环境 isTestEnv 错误。  |  检查传入参数。 |
| 3131004 | ZegoSuperBoardErrorSizeInvalid  | 无效的文件视窗大小 |   内部错误。  |   请联系 ZEGO 技术支持处理。  |
| 3131005 | ZegoSuperBoardErrorFreeSpaceLimit   | 本地空间不足 |  设备存储空间不足。   |   检查设备剩余存储空间是否充足，清理手机缓存。  |
| 3131006 | ZegoSuperBoardErrorUploadNotSupported | 不支持文件上传功能 |   -   |   请联系 ZEGO 技术支持处理。  |
| 3131007 | ZegoSuperBoardErrorUploadDuplicated | 正在上传相同文件 |  重复上传相同文件。    |  如果需要重新转码文件，请等到上一次转码结束再发起新上传。 |
| 3131008 | ZegoSuperBoardErrorEmptyDomain   | 空域名  |  内部错误。    |         请联系 ZEGO 技术支持处理。  | 
| 3131009 | ZegoSuperBoardErrorDuplicateInit   | 已初始化  |  重复初始化。       |    无需解决。  |  
| 3131010 | ZegoSuperBoardErrorServerFileNotExist  | 找不到对应的转码后文件 | 1. 访问文件时传入了错误的 fileID，比如该文件上传时和当前访问时使用了不同的 AppID。<br />2.文件的上传环境和文件的访问环境不一致。  |  检查 fileID 是否正确。 |
| 3131011 | ZegoSuperBoardErrorDocLogFolderNotAccess    | 初始化时设置的日志目录无法创建或写入 |   设置的 LogPath 不正确。   |  检查设置的 LogPath。   |
| 3131012 | ZegoSuperBoardErrorDocCacheFolderNotAccess  | 初始化时设置的缓存目录无法创建或写入 |  设置的 cachePath 不正确。 |   检查设置的 cachePath。  | 
| 3131013 | ZegoSuperBoardErrorDocDataFolderNotAccess   | 初始化时设置的数据目录无法创建或写入 |  设置的 logPath 不正确。  |  检查设置的 logPath。 | 
| 3131014 | ZegoSuperBoardErrorCacheNotSupported    | 不支持预加载该文件  | 当前 AppID 未开通预加载服务。 |    请联系 ZEGO 技术支持处理。  | 
| 3131015 | ZegoSuperBoardErrorCacheFailed    | 预加载失败 | 网络故障导致预加载失败。 |    检查设备连接网络情况。   |
| 3131016 | ZegoSuperBoardErrorZipFileInvalid  | 无效的 ZIP 文件 | 不是合法的 ZIP 文件，文件损坏等。     | 检查 ZIP 文件是否可以正常使用。  |
| 3131017 | ZegoSuperBoardErrorH5FileInvalid   | 无效的H5文件 | 1.不符合ZEGO定义的H5文件规范。 <br />22.文件中没有index.html。 | 检查H5文件是否符合规范。|
| 3131018 | ZegoSuperBoardErrorFileCorruption   | 文件已经损坏 | 打开文件时弹需要修复文件提示框（文件损坏）。 | 检查文件是否已经损坏。|
| 3131019 | ZegoSuperBoardErrorFileContentIncomplete   | 文件内容不完整|  EOF 错误（文件内容不完整）。 | 检查文件内容是否完整。|


## 3112xxx H5桥接层错误码
| 错误码     | 错误码提示 | <p style={{width:"5em"}}>描述</p> | 可能原因 | 处理建议 |
| ------- | --------- | ---- | ---- | ----------- |
| 3112001 | ZegoBridgeErrorNotReady | H5 没有调用 getReady |  没有调用 getReady 函数。    |  请确保调用 getReady 函数。   |
| 3112002 | ZegoBridgeErrorParamInvalid  | 参数错误 |  H5调用脚本接口参数不符合要求。    |   请留意控制台输出的具体信息。 |
| 3112003 | ZegoBridgeErrorRecordListLimit  | recordList字节长度超过限制   |  H5调用操作相关接口导致当前页的 recordList 超出最大长度限制（base64 后最大为 948 字节）。    |  请确保调用操作相关接口发送的 recordList base64 后长度不超过 948 字节|
| 3112006 | ZegoBridgeErrorH5  | H5内部代码执行出错 |  -    |  请联系ZEGO技术支持处理。 |

<Content />