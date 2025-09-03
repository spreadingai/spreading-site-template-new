<Title>文件共享 SDK 的 token 是否和互动白板 SDK 的 token 通用？</Title>



- - -

## 问题描述
集成文件共享 SDK 进行初始化的过程中，其中有个关键参数 token，是否与互动白板（ZegoWhiteboardView） SDK 中 loginRoom 接口里的 token 参数一样，两者的 token 可以通用？

## 解决方案
token 用于验证身份，文件共享 SDK 的 token 和互动白板完全一样，所以可以通用。
