# 3.8.0 及以上版本升级指南

---

<Warning title="注意">
- 如果您当前的 SDK 低于 3.8.0 版本，需要升级到任一 3.8.0 或以上的 SDK 版本时，都请务必阅读本文。
- 此外，建议您根据**当前版本号**与**升级目标版本号**，参考 [发布日志](https://doc-zh.zego.im/article/12548) 中两个版本区间的变更说明，检查您的业务相关接口。

</Warning>



在 3.8.0 版本，对媒体推流器 [IZegoMediaDataPublisher](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoMediaDataPublisher) 类的一个 API 接口命名进行变更：将原来的成员函数 `setMediaDataPublisherEventHandler` 更名为 [setEventHandler](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_linux~class~IZegoExpressEngine#set-event-handler)。

## 编译报错

从 3.8.0 之前的版本升级成功后，可能会编译报错，需要适配。

```sh
error: no member named 'setMediaDataPublisherEventHandler' in 'ZEGO::EXPRESS::IZegoMediaDataPublisher'
    publisher->setMediaDataPublisherEventHandler(shared_from_this());
    ~~~~~~~~~  ^
1 error generated.
```

## 适配方式

<Tabs>
<Tab title="3.8.0 版本前">
```cpp
publisher->setMediaDataPublisherEventHandler(shared_from_this());
```
</Tab>
<Tab title="3.8.0 版本及以上">
```cpp
publisher->setEventHandler(shared_from_this());
```

</Tab>
</Tabs>

<Content />