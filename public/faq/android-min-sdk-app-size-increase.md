<Title>为什么设置 Android minSdkVersion 为 23 后，APK 包体积增大了？</Title>



---

这是因为 minSdkVersion 为 23 及以上版本时，AGP（Android Gradle 插件）默认将不再压缩 APK 中的 so 文件，所以打包出来的 APK 包会更大，具体原因可参考下方的“详情描述”。

但开发者无需担心上传到应用商店后包的下载大小变大，因为应用商店一般会使用压缩补丁，将开发者上传的 APK 包再次压缩。

## 详情描述

Android 23 及以上版本能够直接从 APK 中读取 so 文件，而不必提取它们，因此如果 API 级别（对应 minSdkVersion）是 23 及以上版本，AGP 默认将不再压缩 APK 中的 so 文件。

<Note title="说明">


如果 minSdkVersion 为 23 及以上版本，且开发者没有手动设置 android:extractNativeLibs=“true”，则系统会在清单中自动注入 android:extractNativeLibs=”false”。

android:extractNativeLibs 的设置决定了软件包安装程序是否将原生库从 APK 提取到文件系统。如果设为 “false”，则原生库必须保持页面对齐状态，并以未压缩的形式存储在 APK 中。无需更改代码，因为链接器在运行时会直接从 APK 加载库。

关于 android:extractNativeLibs 的详情可参考 [官网文档](https://developer.android.com/guide/topics/manifest/application-element.html#extractNativeLibs)。


</Note>



这意味着虽然 APK 体积会变大，但实际安装后的应用体积反而更小：

- 当 API < 23 时，安装后的应用包括压缩的 so 文件和从 APK 中提取的解压后的 so 副本。
- 当 API >= 23 且 android:extractNativeLibs=”false” 时，安装后的应用仅包括未压缩的 so 文件，而没有提取的 so 副本。



