<Title>使用 “muteMicrophone”、“enableAudioCaptureDevice” 接口时，将参数设置为 false，两者有什么区别？</Title>




- - -

### 接口的区别

- 使用 `muteMicrophone` 接口，将参数 mute 设置为false，即表示静音（关闭麦克风），此时 SDK 会**使用静音数据替换设备采集到的音频数据进行推流**，此时仍然会占用麦克风设备，推流质量回调中也仍会有音频相关数据。

    类似逻辑的接口还有 “mutePublishStreamAudio”。

- 使用 `enableAudioCaptureDevice` 接口，将参数 enable 设置为 false，即表示关闭音频采集设备，此时 SDK **不会再占用音频设备**。如果此时正在推流，默认会**使用静音数据做为音频数据进行推流**。


### 如何选择接口

- 如果您必须要让 SDK 放弃占用麦克风，实现 App 退到后台后释放麦克风占用等功能，可调用 `enableAudioCaptureDevice` 接口关闭音频采集设备，并使用 `isMicrophoneMuted` 接口来检查麦克风是否静音。

- 通过 `enableAudioCaptureDevice` 接口，在硬件上关闭或打开麦克风是耗时操作。如果您频繁操作，将会产生一定的性能开销，一般推荐使用 `muteMicrophone` 接口。
