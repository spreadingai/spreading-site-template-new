# 下载

- - -

ZEGO 实时音视频（Express Video）SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 Android 客户端、且**含有版权音乐功能**的 Express-Video SDK，当前可下载版本为 3.21.0，发布日志请参考 [发布日志](/online-ktv-android/introduction/release-notes)，合规事宜请参考 [ZEGO 安全合规白皮书](https://doc-zh.zego.im/policies-and-agreements/zego-security-and-compliance-white-paper)。

| 资源 | 描述 | 下载地址 | 相关文档 |
| --- | --- | --- | --- |
| SDK | 包含版权音乐功能的 Express SDK。 | <ul><li>[Express-Video SDK v3.21.0（含版权音乐功能）](https://artifact-sdk.zego.im/copyrighted_music/express/video/ZegoExpressVideo-android-shared-java.zip)</li><li>[Express-Audio SDK v3.21.0（含版权音乐功能）](https://artifact-sdk.zego.im/copyrighted_music/express/audio/ZegoExpressAudio-android-shared-java.zip)</li></ul> | <ul><li>[集成 SDK - 实时音视频](/online-ktv-android/quick-starts/integrate-the-sdk/express-video)</li><li>[集成 SDK - 实时语音](/online-ktv-android/quick-starts/integrate-the-sdk/express-voice)</li></ul> |
| 示例 Demo | 实现合唱功能的最简代码，方便开发者参考。 | [合唱示例 Demo](https://artifact-demo.zego.im/downloads/KTV_demo/KTVChorusDemo_Android.zip) | [合唱示例 Demo 运行指引](/online-ktv-android/quick-starts/run-the-chorus-sample-code) |
| 体验 App | 即刻体验在线 KTV 的多种玩法。 | <ul><li>[实时合唱](/online-ktv-android/demo-app#实时合唱--抢唱)</li><li>[串行合唱](/online-ktv-android/demo-app#串行合唱)</li><li>[抢唱](/online-ktv-android/demo-app#实时合唱--抢唱)</li></ul> | - |
| 体验 App 源码 | 包含 KTV 场景的完整代码和业务逻辑。 | <ul><li>[实时合唱体验 App 源码](https://codestore.zego.im/project/16)</li><li>[抢唱体验 App 源码](https://codestore.zego.im/project/18)</li></ul> | <ul><li>[实时合唱体验 App 源码运行指引](/online-ktv-android/quick-starts/run-the-demo-app-source-code/real-time-chorus)</li><li>[抢唱体验 App 源码运行指引](/online-ktv-android/quick-starts/run-the-demo-app-source-code/grab-the-mic)</li></ul> |
| 歌词 UI 组件源码 | 在歌曲播放的同时同步显示 KRC（逐字）格式歌词的组件。 | [lyricview](https://artifact-sdk.zego.im/GoEnjoy/Android/sourceCode/ZegoLyricView/lyricview.zip) | [歌词组件](/online-ktv-android/zego-content-center/lyrics-display-component) |
| 评分 UI 组件源码 | 显示音高线和评分效果的组件。 | [pitchview](https://artifact-sdk.zego.im/GoEnjoy/Android/sourceCode/ZegoPitchView/pitchview.zip) | [评分组件](/online-ktv-android/zego-content-center/scoring-component) |

<Note title="说明">
- 版权音乐功能需要联系 ZEGO 技术支持单独开通，如未开通该功能，调用相关接口可能会报错。
- 本页面提供的 SDK 是基于 Express SDK。
    - 通过版本号，您可以了解本页面提供的 SDK 所对应的 Express SDK 版本。
    - 如需了解 Express SDK 版本变更详情，请参考 [实时音视频 - 发布日志](/real-time-video-android-java/client-sdk/release-notes)、[实时语音 - 发布日志](https://doc-zh.zego.im/article/12581)。
    - 如需了解版权音乐功能的更新详情，请参考 [版权音乐功能重要更新（SDK）](/online-ktv-android/introduction/release-notes)。
- 如已集成过 Express SDK，需要删除旧包并重新集成本页面提供的包，避免 SDK 版本不匹配造成初始化失败。
- 请根据项目需求下载 SDK：如果需要实现视频效果，请选择 Express-Video SDK；如果需要实现音频效果，以上两种 SDK 均可选择。 
</Note>
