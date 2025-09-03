# 常见问题

- - -

<Note title="说明">`大饼 AI 变声` 是通过 ZEGO Express SDK 实现的。如果您在使用过程中，遇到了 SDK 相关的问题，请参考 <a href="https://doc-zh.zego.im/faq?product=ExpressVideo" class="md-grid-item" target="_blank">实时音视频 - 常见问题</a>；本文仅展示 `大饼 AI 变声` 相关问题。</Note>



#### 在构建 apk 包时，如果出现如下报错信息，该如何处理？

```java
java.lang.NoClassDefFoundError: Failed resolution of: Lkotlin/jvm/internal/Intrinsics;
```

出现如上报错时，是由于缺少 `kotlin-stdlib` 所致，您可以在 build.gradle 文件中，添加如下依赖，再重新构建 apk 即可。

```groovy
dependencies {
    implementation 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.3.30'
}
```
