<Title>Web 平台 “playQualityUpdate” 中有音频码率，但拉流成功后有画面没有声音，是什么原因？</Title>



- - -

请检查拉流对应的 “video” 标签对象是否设置了 “muted” 静音属性。
* true：静音
* false：非静音
