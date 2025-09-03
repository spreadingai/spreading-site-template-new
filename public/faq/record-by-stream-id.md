<Title>如何指定 StreamID 进行云端录制？</Title>



- - -

有以下两种情况：

- 单流录制：通过设置 `RecordStreamList` 成员下的 StreamId 参数，指定待录制的流 StreamId。
- 混流录制：通过设置 `MixInputList` 成员下的 StreamId 参数，指定在该画面中录制的流的 StreamId。

详情请参考 [开始录制](/cloud-recording-server/start#请求参数)。