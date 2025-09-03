<Title>两条流混流时，若其中一条流断开了，混流是否会自动停止？</Title>



- - -

存在以下情况：

- 发起混流任务时，只要某一个输入流不存在，则混流任务发起失败。
- 发起混流任务成功后，SDK 支持混单流。若某条输入流停止了，混流任务会自动重试拉取该断开的流 90 秒（已断开的流画面停留在最后一帧）；90 秒后不再重试，需要手动调用 [stopMixerTask ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#stop-mixer-task) 方法停止混流任务。
- 发起混流任务成功后，如果所有输入流都停止了，90 秒后混流任务会自动停止。
