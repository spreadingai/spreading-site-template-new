<Title>云录制结束后，没有在云存储中看到录制的文件，该怎么处理？</Title>



- - -

存在以下几种情况时，云录制结束后不会产生录制文件：

- 进行云录制时，传入的 StorageParams 存储参数配置有误，具体配置请参考 [StorageParams 中的各个云存储相关的参数如何填写？](https://doc-zh.zego.im/faq/vendor_params?product=CloudRecording&platform=all)

- 没有提供“只写权限”的访问密钥。

- 进行云录制时，传入的 RoomID 不存在。

- 进行云录制时，房间内没有用户进行推流。

