<Title>单流和混流的录制分辨率分别在哪里设置？</Title>


---

### 单流录制
- 音视频的录制的分辨率根据推流的分辨率决定最终录制的分辨率是多少，简单来说，音视频的分辨率宽高是多少，录制出来的文件的分辨率宽高就是多少，不需要单独设定。
- 单流录制的白板的分辨率宽高是跟据 `RecordInputParams` 中的 `Whiteboard` 中的 `Width` 和 `Height` 参数来设置。该参数只对单流录制中白板起效。

### 混流录制
混流录制最终输出的文件的分辨率宽高是根据 `RecordInputParams` 中的 `MixConfig` 中的 `MixOutputVideoConfig` 参数来设置。