<Title>在 RTC 的自定义前处理功能中使用 ZegoEffects 功能时，预览和推流出现黑屏，如何处理？</Title>



---

请勿在 RTC 的 `onCapturedUnprocessedTextureData` 回调中调用 `initEnv` 接口，需要在 `onStart` 回调中调用。
