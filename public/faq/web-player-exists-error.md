<Title>Web 平台拉流时候报错：“Player already exist！” 是什么原因？</Title>



- - -

SDK 不支持重复拉取同一条流、渲染到不同的 view 上。如果尝试重复拉取一个正在播放中的流，就会报错。