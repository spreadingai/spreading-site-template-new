<Title>集成 RoomKit iOS SDK 打包时报错：“Failed to verify bitcode in xxx.framework/xxx” 如何处理？</Title>


---

请检查 Xcode 版本是否过低，建议更新为最新的 Xcode 版本。
若一定要使用旧版 Xcode 打包，请先在工程的 “Build Setting” 中找到 “Enable Bitcode” 选项并设为 “NO”，然后打开终端，cd DIRECTORY 到 xxx.framework 所在目录 DIRECTORY，执行以下命令以去除 SDK 内的 Bitcode。
```
xcrun bitcode_strip .framework/xxx -r -o xxx.framework/xxx
```