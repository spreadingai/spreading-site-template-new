<Title>如何处理使用 OBS 推流，SDK 拉流时出现画面卡顿或音画不同步的问题？</Title>



- - -

### 问题描述

使用 OBS 推流，SDK 拉流时，出现了画面卡顿或音画不同步的现象。

### 问题原因

使用 OBS 推流时，推了带 B 帧的流。带 B 帧的流在直播场景下延迟很大，默认情况下，ZEGO Express SDK 不支持解码带 B 帧的流，所以出现了画面卡顿或音画不同步的现象。

### 解决方案

以下是 ZEGO 推荐的 3 种解决方案。

1. 设置 OBS 不推 B 帧

在 OBS 中设置不推 B 帧：输出模式选 “高级 > Profile”， 选择 baseline 或者 SDK 用软解拉流。

若 OBS 为经典版本，在高级中设置 B 帧：“高级 > 配置文件”，选择 “baseline”。

<Note title="说明">


如果在 OBS 中设置了不推 B 帧，拉流出现了一会儿模糊一会儿清晰的情况，请参考方案 3 进行处理。  

</Note>




2. 设置 SDK 支持拉 B 帧

在 Express 拉流前调用接口 enableCheckPoc(false)，requireHardwareDecoder(false) 则可以拉 B 帧的视频流。

3. 出现一会儿模糊一会儿清晰的情况，可能是因为画面复杂码率编不过来导致的，有以下 3 种解决方式：
   - 提高码率
   - 提高 CPU 的使用率：输出模式选 “高级 > cpu使用预设”，比如改为 medium。使用越多，画面质量越好。
   - OBS 中设置 profile 为 main，同时拉流端要调整为支持 B 帧。






