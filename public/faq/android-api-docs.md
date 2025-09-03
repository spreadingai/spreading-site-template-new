<Title>Express Android SDK 如何查看 API 注释和文档？</Title>



由于 Zego Express Android Java SDK 提供的产物形式是 “.jar” 及 “.so”，默认情况下在 Android Studio 中单击跳转 SDK 类或函数时，展示的是反编译的 Java 字节码，没有注释。

为了提升开发体验，从 v2.23.0 版本开始以 jar 包形式同时提供 Java 源码，开发者可通过 Android Studio 导入源码 jar 包，以获得 API 注释。

## 操作指南

1. 从官网下载 [最新的 Android SDK 包](/real-time-video-android-java/client-sdk/download-sdk)。
2. 解压后可以看到在 “ZegoExpressEngine.jar” 所在目录下包含一个 “ZegoExpressEngine-sources.jar”。

<Note title="说明">


- 如果您是通过本地下载导入的 SDK，可以把这两个 jar 包一起放到项目中。
- 如果您通过 Gradle 在线依赖导入 SDK，可放置 “ZegoExpressEngine-sources.jar” 至任意目录。

</Note>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_java_sources_jar.png" /></Frame>

3. 在 Android Studio 中打开您的项目工程，并打开含有调用 “ZegoExpressEngine” 相关 API 的源代码文件单击 SDK 的类或函数以进行跳转，则可以看到 Android Studio 反编译后的 Java 字节码。
4. 此时可以在页面右上角单机 “Choose Sources...”，在弹出的文件选择窗口中找到 “ZegoExpressEngine-sources.jar” 并打开。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_studio_choose_sources.png" /></Frame>

5. 加载完成后，可以看到原来反编译的 Java 字节码现在变成了源码，且包含 API 注释文档。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_studio_show_source_comment.png" /></Frame>
6. 此时回到项目源代码文件，将鼠标悬停在任意一个 SDK 的类或函数上，可以展示此 API 的文档。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_studio_show_api_document.png" /></Frame>
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Android/ExpressSDK/Integration/android_studio_show_callback_document.png" /></Frame>

6. （可选）SDK 包中同时交付了 “javadoc” API 文档，您可以在解压后的 SDK 包的 "Document" 目录中找到 “index.html” 文档，双击打开 "index.html"，即可查看此 SDK 包的 API 文档。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/express_api_document_html.png" /></Frame>
