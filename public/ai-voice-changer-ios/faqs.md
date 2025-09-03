# 常见问题

- - -

<Note title="说明">
`大饼 AI 变声` 是通过 ZEGO Express SDK 实现的。如果您在使用过程中，遇到了 SDK 相关的问题，请参考 <a href="https://doc-zh.zego.im/faq?product=ExpressVideo" class="md-grid-item" target="_blank">实时音视频 - 常见问题</a>；本文仅展示 `大饼 AI 变声` 相关问题。
</Note>

#### 在编译工程时，如果出现类似 “Undefined symbol” 的错误，该如何处理？

```objc
Undefined symbol:
_$s10ObjectiveC8ObjCBoolVMn
```

出现如上报错时，您可以通过在您的项目工程目录中，添加一个空白的以 `.swift` 结尾的文件，重新编译即可。
