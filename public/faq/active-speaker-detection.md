<Title>Express SDK 如何监听房间内谁在说话？</Title>



- - -

- 拉单流的情况下，拉流成功后通过调用 [startSoundLevelMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-sound-level-monitor) 和监听 [onRemoteSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-remote-sound-level-update) 回调来获取音量信息。
- 拉混流的情况下，首先需要在混流配置里启动音浪选项（即 [enableSoundLevel](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-mixer-task&jumpType=route#enable-sound-level) 设置为 “true”），并为每条输入的流指定一个唯一的 “soundLevelID”，然后监听 [onMixerSoundLevelUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~ObjectiveC_ios~protocol~zego-event-handler&jumpType=route#on-mixer-sound-level-update) 回调来获取音量信息。