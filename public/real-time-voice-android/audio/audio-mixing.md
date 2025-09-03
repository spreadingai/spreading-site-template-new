# 混音

- - -

## 功能简介

混音是指 SDK 从 App 获取一路音频数据，将 App 提供的音频数据与 SDK 采集的音频数据整合为一路音频数据。为了实现在通话或直播过程中，需要播放自定义的声音或者音乐文件并且让房间内的其他人也听到的需求。

适用场景：直播过程中需要有掌声、口哨等音效，或者需要播放背景音乐。

## 前提条件

在使用混音功能之前，请确保：

- 已在项目中集成 ZEGO Express SDK，实现基本的实时语音功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/3575) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/7636)。
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目管理](/console/project-info) 中的“项目信息”。



## 使用步骤

### 开启/关闭混音

SDK 默认关闭了混音功能，需要开发者主动调用相关接口以打开该功能。

- 接口原型

    ```java
    /**
     * 开/关 混音功能
     *
     * 开启混音，结合 setAudioMixingHandler，为 SDK 提供用于混音的音频数据
     *
     * @param enable 是否开启混音功能；true 表示开启；false 表示关闭
     */
    public void enableAudioMixing(boolean enable);
    ```

- 调用示例

    ```java
    engine.enableAudioMixing(true);
    ```

### 将混音数据传给 SDK

打开混音功能后，SDK 将会在需要混音数据时触发回调，需要开发者在此回调中将混音数据传递给 SDK。

- 接口原型

    ```java
    /**
     * 设置混音相关回调
     *
     * @param handler 混音回调
     */
    public void setAudioMixingHandler(IZegoAudioMixingHandler handler);
    ```

- 调用示例

    ```java
    ZegoExpressEngine.getEngine().setAudioMixingHandler(new IZegoAudioMixingHandler() {
	    /**
    	 * 往 SDK 中拷贝混音 PCM 数据，用于将开发者提供的音频数据混到推流的音频数据中。 和 [enableAudioMixing] 	结合使用
         *
         * 支持 16k 32k 44.1k 48k 的采样率、单声道或双声道、16位深的 PCM 音频数据
         * 此回调为高频回调，为保证混音质量，请勿在此回调中处理耗时操作
         *
         * @param data 混音数据
         */
        @Override
        public ZegoAudioMixingData onAudioMixingCopyData(int expectedDataLength) {
   		    if (dataBuf.length < exceptDataLength) {
            	dataBuf = new byte[exceptDataLength];
        	}
        	if (mPcmBuffer.capacity() < exceptDataLength) {
            	    mPcmBuffer = ByteBuffer.allocateDirect(exceptDataLength);
        	}
        	mPcmBuffer.clear();

        	ZegoAudioMixingData auxDataEx = getZegoAudioAux();
        	try {
            	if (mBackgroundMusic == null) {
                    if (!pcmFilePath.equals("")) {
                        mBackgroundMusic = new FileInputStream(pcmFilePath);
                    }
                }

                int len = mBackgroundMusic.read(dataBuf);
		        // 当实际要写入 SDK 的 pcm 长度满足 SDK 要求
                if (len > 0) {
                    mPcmBuffer.put(dataBuf, 0, exceptDataLength);
                    auxDataEx.audioData = mPcmBuffer;
                    auxDataEx.audioDataLength = len;
                } else {
                    // 当实际要写入 SDK 的 pcm 长度不满足 SDK 要求
                    // 歌曲播放完毕
                    mBackgroundMusic.close();
                    mBackgroundMusic = null;
                    auxDataEx.audioData = mPcmBuffer;
                    auxDataEx.audioDataLength = 0;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            param.channel = mChannels;
            param.sampleRate = mSampleRate;
            auxDataEx.param = param;
            return auxDataEx;
	    }
    });

    ```

<Note title="说明">


[ZegoAudioMixingData](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoAudioMixingData) 中的 [audioDataLength](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoAudioMixingData#audio-data-length) 既是输入参数也是输出参数。作为输入参数，SDK 会提供一个长度值，开发者按照这个长度值写入数据即可，数据充足的情况下，无需更改 [audioDataLength](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoAudioMixingData#audio-data-length) 的值；作为输出参数，如果填写的数据不足 SDK 提供的长度值，则可设置 [audioDataLength](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoAudioMixingData#audio-data-length) 为 “0”，或者最后的尾音不足 SDK 提供的长度值时，可以用静音数据补齐。

</Note>



### 设置混音音量

在启用混音功能后，开发者可以根据需要调用 [setAudioMixingVolume](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoExpressEngine#set-audio-mixing-volume) 调整混音的音频的音量；或者调用 [muteLocalAudioMixing](https://doc-zh.zego.im/article/api?doc=Express_Audio_SDK_API~java_android~class~ZegoExpressEngine#mute-local-audio-mixing) 设置混音为静音，静音后主播端将听不到混音声音，观众端还能听到混音声音。

- 接口原型

    ```java
    /**
     * 设置混音音量
     *
     * 此 API 可以单独设置本地播放的混音音量或混入推流中的混音音量
     *
     * @param volume 混音音量 取值范围是 0 ~ 200，默认为 100
     * @param type 混音本地播放音量/混音推流中的音量
     */
    public void setAudioMixingVolume (int volume, ZegoVolumeType type);

    /**
     * 禁止或恢复本地播放混音声音
     *
     * 当静音播放混音后，混音端（推流端）将听不到混音的播放声音，远端（拉流端）依然能听到混音
     *
     * @param mute 是否静音本地混音；true 表示禁止播放播放；false 表示开启
     */
    public void muteLocalAudioMixing(boolean mute);
    ```

- 调用示例：

    ```java
    engine.setAudioMixingVolume(80, ZegoVolumeType.LOCAL);
    engine.setAudioMixingVolume(20, ZegoVolumeType.REMOTE);

    engine->muteLocalAudioMixing(true);
    ```

## API 参考列表

| 方法 | 描述 |
|-------|--------|
| [enableAudioMixing ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#enable-audio-mixing) | 开启/关闭混音 |
| [setAudioMixingHandler ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-audio-mixing-handler) | 设置混音回调 |
| [setAudioMixingVolume ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#set-audio-mixing-volume) | 设置混音音量 |
| [muteLocalAudioMixing ](https://doc-zh.zego.im/zh/api?doc=Express_Video_SDK_API~Java~class~im-zego-zegoexpress-zego-express-engine#mute-local-audio-mixing) | 静音混音本地播放 |
