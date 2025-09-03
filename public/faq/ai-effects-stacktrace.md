<Title>如何获取 ZegoEffects SDK 的堆栈信息？</Title>


---

各平台根据以下方式，可获取 ZegoEffects SDK 的堆栈信息。

- Android

    - 实时分析日志  

    `adb logcat | ndk-stack -sym [目标 abi (armeabi/armeabi-v7a/arm64-v8a) 的 so 动态库所在的目录]`  

    例如：

    `adb logcat | ndk-stack -sym /path/to/your/project/armeabi-v7a`

    - 先获取日志再分析 (用 adb logcat 保存日志文件，再通过 ndk-stack 命令分析)
      
    `adb logcat > xx.log`
          
    `ndk-stack -sym [目标 abi 的 so 动态库所在的目录] -dump [日志文件]`  

     例如：

    `adb logcat > crash.log`

    `ndk-stack -sym /path/to/your/project/armeabi-v7a -dump crash.log`

- iOS/iPadOS

    1. 将 iOS 设备连接到 Mac，打开 Xcode，顶部菜单栏选择 “Window > Devices and Simulators”。
    2. 在左侧选择指定设备，然后点击 “View Device Logs”，在弹出的对话框中，找到对应的 Process 应用包名、且 Type 为 “Crash” 的对应时间的日志，在此条日志上右键选择 “Export Log”，保存的 “.crash” 文件为堆栈信息。
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/View_Device_Logs.png" /></Frame></Frame>    

- macOS

    “~/Library/Logs/DiagnosticReports” 路径下，以 “.crash” 结尾的文件为堆栈信息。


- Windows
    
    1. 找到注册表路径：
    ```cpp
    HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\WindowsError Reporting\LocalDumps
    ```
    
    2. 在右侧窗口，新建字符串值 DumpCount、DumpFolder、DumpType 并修改其值，如下所示：
    DumpType的值：
    0 = Create a custom dump
    1 = Mini dump
    2 = Full dump

    <Frame width="512" height="auto" caption=""><img src="https://storage.zego.im/sdk-doc/Pics/FAQ/expressSDKlogwindows.png" /></Frame>
    
    3. 系统在程序崩溃时，会在上面设置的 DumpFolder 目录下，生成对应程序的 Dump 文件为堆栈信息。