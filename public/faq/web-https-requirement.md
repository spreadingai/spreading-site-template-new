<Title>Web 平台报错 “https or localhost required”，是否必须要求 “https”？</Title>



- - -

- 基于浏览器安全策略对隐私性的要求，Web 端调用摄像头和麦克风都强制要求 “https”，此安全策略是浏览器的要求，SDK 必须遵守。
- 可以使用 “localhost” 先集成测试，后续上线仍然需要 “https” 环境。
