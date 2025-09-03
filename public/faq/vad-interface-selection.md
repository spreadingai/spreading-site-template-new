<Title>如何根据场景选择语音检测的不同接口？</Title>



---


**如下介绍不同语音检测接口的几种使用场景：**   

### 场景一：节省流量

当您希望没有语音活动时不发送数据，达到节省流量的目的，可以使用如下方法：     
设置 ZegoEngineConfig 类下的配置项 `enable_vad` 开启语音活动检测功能和 `enable_dtx` 开启离散音频包发送。两个接口配合使用，在关闭麦克风或者静音的状态下，达到推流中检测为静音的数据包不发送的功能。


### 场景二：实时判断

当您希望在获取音频音量变化的同时，判断这个音频是否包含语音信息，可以使用如下方法：    
调用 ZegoSoundLevelConfig 下的 [enableVAD](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-entity-zego-sound-level-config&jumpType=route#enable-vad) 接口设置声浪回调是否包含 VAD 检测结果，可在 [onCapturedSoundLevelInfoUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-captured-sound-level-info-update) 回调中通过 vad 参数判断对应的流是否包含正常语音，以此来决定是否显示音量变化。


### 场景三：数据统计

当您需要判断麦克风是否有持续的语音输入，并统计一定周期内的检测结果时，可以使用如下方法：    
通过稳态语音检测功能可以判断一定时间内是否有人对着麦克风说话，用于检测采集后或音频前处理后的音频数据为噪声还是正常声音。该功能是通过统计固定窗口时间内所有的语音判断的结果，人声达到一定比率后才判定为人声。    
先调用 [onAudioVADStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-audio-vad-state-update) 接口设置检测音频数据的稳态语音状态的回调，再调用 [startAudioVADStableStateMonitor](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-zego-express-engine&jumpType=route#start-audio-vad-stable-state-monitor) 接口（包括麦克风采集和外部音频采集）开始语音的稳态检测。    
通过 [onAudioVADStateUpdate](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~Java_android~class~im-zego-zegoexpress-callback-i-zego-event-handler&jumpType=route#on-audio-vad-state-update) 回调（该回调通知周期为 3 秒）中 state 参数，判断检测的音频数据是噪声还是正常语音。


