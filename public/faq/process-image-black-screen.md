<Title>如何处理调用 processImageBuffer 后导致的黑屏？</Title>



---

请将 `initEnv` 跟 `processImageBuffer` 放在同一个线程里。