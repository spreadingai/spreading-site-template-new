<Title>什么是自定义图形？</Title>


---

自定义图形是指开发者可自行将本地图片网络图片设置为图形工具，当 ZEGO 提供的默认白板图形不满足需求时，可使用该功能内置更多个性化图形，以满足不同场景下的绘制需求。
- 网络图片支持 JPG、JPEG、PNG 格式；
- 网络图片大小最大支持 500K，不建议上传过大的图片，容易导致显示异常等问题。

使用自定义图形需要先使用 addImage 传入要绘制的图形，然后设置白板工具类型为自定义图形：
- iOS: 修改 toolType 属性为 ZegoSuperBoardToolCustomImage。
- Android/Web: 调用 setToolType 设置工具类型为 CustomImage。