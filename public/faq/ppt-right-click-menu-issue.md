<Title>为什么在转码后的动态 PPT 文件页面上点击鼠标右键不会弹出菜单？</Title>


----

出于共享文件安全性考虑，即防止共享动态 PPT 文件时用户直接通过右键菜单下载 PPT 中的资源（视频、图片），ZEGO 针对动态 PPT 的转码进行了处理，转码后的文件禁用了右键菜单，非动态 PPT 转码不受影响。

此外，若开发者还希望禁止用户使用复制或拖拽的方式下载动态 PPT 中的图片，我们还提供了 DisableH5ImageDrag 属性用于禁用动态 PPT 里图片的复制和拖拽效果。

#### 相关链接

- 超级白板：[DisableH5ImageDrag](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_web~enum~ZegoSuperboardCustomConfigKey&jumpType=route#disable-h5-image-drag)
- 文件共享：[DisableH5ImageDrag](https://doc-zh.zego.im/article/api?doc=DocsView_API~javascript_web~enum~ZegoConfigKey&jumpType=route#disable-h5-image-drag)