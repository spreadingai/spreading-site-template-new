<Title>在 Windows 应用开发中，出现 CPU 占用高、内存泄漏等的问题，该如何分析？</Title>



---

在 Windows 应用开发中，遇到 CPU 占用高、内存泄漏，需要对应用程序进行调优、性能分析等，以下介绍两种性能分析工具，开发者可以根据业务场景选择。


## VS 性能分析工具

<Note title="说明">


以下仅介绍 VS 自带的性能分析工具入门的使用，开发者如有兴趣，可自行去了解更多功能的使用说明。

</Note>



Visual Studio 自带性能分析工具，可以直接对在 VS 中执行的项目进行分析，也可以追踪生成的可执行文件（例如 pdb 文件），两者的操作在执行分析时有一定的区别，其余都相同。


不同版本的 VS 可能有所差别，但操作步骤大致相同，下文以 Visual Studio 2015 为例。

1. 执行性能分析，并生成分析报告。在菜单栏，选择 “调试 > 性能探查器”，或使用快捷键 `Alt + F2`，如下图所示：    

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_1.png" /></Frame></Frame>

    弹出如下对话框：

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_2.png" /></Frame></Frame>

2. 选择分析现有项目、其它项目、或其它可执行文件。以 ZegoLiveRoomTopics 示例专题 Demo 为例，选择现有项目，点击 “开始” 启动。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_3.png" /></Frame></Frame>

### CPU 性能分析

1. 在如下对话框中，选择 “CPU 采样(建议)”，点击 “完成”。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_1.png" /></Frame></Frame>

    会自动弹出示例 Demo，如图：

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_2.png" /></Frame></Frame>

2. 以推流功能为例，进行分析。

    1. 点击左侧的 “推流”。
    2. 再点击 “初始化 SDK”，输入房间 roomID，登录房间。
    3. 输入流 streamID，开始推流。
   
    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_3.png" /></Frame></Frame>

3. 此时，关闭程序，等待生成分析报告。最终报告如下：

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_4.png" /></Frame></Frame>

4. 点击中间的 “热路径”，按照函数名筛选。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_5.png" /></Frame></Frame>

5. 点击 “调用关系树”，可查看整个流程。

    - 独占样本数：指该函数中不包含子函数的执行时间。
    - 非独占样本数：指包含子函数执行时间的总执行时间。

    下图为从初始化开始到推流、主要占用 CPU 的函数。其中，AVE 为 ZegoLiveRoom.dll 的内部方法，需要导入符号文件。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_cpu_6.png" /></Frame></Frame>

    从上图可以看出，此次推流过程中的 CPU 消耗，除主线程外，还有 SDK 的编解线程和其他线程。



### 内存分析

1. 选择 “调试 > 窗口 > 显示诊断工具”，勾选 `内存使用率`，即可看到内存运行状态。

    以推流功能为例。在初始化前，先第一次截取快照 1；推流成功后，截取快照 2。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_memory_1.png" /></Frame></Frame>

    可以看出，推流成功后，内存增加超过了 20 MB。

2. 点击快照 2 的红色箭头，可以查看详细的内存增长对比。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_memory_2.png" /></Frame></Frame>

    可以看到，主要的内存增长是在 unsigned char[] 和 void 对象上。由此可以推测，主要是音视频数据模块的申请造成的内存增长。

3. 右上角，切换 `视图模式` 为 “堆栈视图”，可以查看内存增长的具体触发信息。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_memory_3.png" /></Frame></Frame>

    可以看出，主要是 “外部帧” 引起的内存增长。

4. 点击 “外部帧”，展开详细信息。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/windows_memory_4.png" /></Frame></Frame>

    可以看到，内存增长主要来自 ZegoLiveRoom.dll，与上文分析的 CPU 增长原因一致。

## 使用 Process Explorer 分析 CPU 占用率

[Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer) 是一款由微软提供的免费工具，可以很方便地查看某个进程下各个线程的 CPU 占用率，进行性能分析。

1. 打开 Process Explorer，查看各个进程的资源情况。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/pe_1.png" /></Frame></Frame>

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/pe_2.png" /></Frame></Frame>

    可以看到，zegoLiveRoomWrapper.exe 的 CPU 占用率是 3.52%。

2. 在该进程上右键，选择 “Properties...”，再点击切换到 “Threads” 页签，查看具体的线程占用信息。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/pe_3.png" /></Frame></Frame>

    可以看到，TID 为 27092 的线程占用 CPU 最高。

3. 选择该线程，点击右下角的 “Stack“，可以查看该线程此时的运行堆栈。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/pe_4.png" /></Frame></Frame>

    可以看到，此时主要是外部采集线程在运行推屏幕数据。

## 使用 UMDH 定位内存泄漏

UMDH (User-Mode Dump Heap，用户模式转储堆) 是一款轻量级的内存泄漏分析工具，用于监视 Windows 程序的内存使用情况。

UMDH 是 Debugging Tools for Windows 里面的一个工具，主要通过分析比较进程的 Heap Stacktrace 信息来发现内存泄露。

1. 安装 [Debugging Tools for Windows](https://learn.microsoft.comhttps://doc-zh.zego.im/zh-cn/windows-hardware/drivers/debugger/debugger-download-tools#install-debugging-tools-for-windows)。

2. 设置环境变量。
    
    打开 “控制面板 > 高级系统设置 > 环境变量”，将 Debugging Tools for Windows 的安装路径（例如：“C:\Program Files (x86)\Windows Kits\10\Debuggers\x64”）添加到系统的 PATH 环境变量中。

3. 设置 `_NT_SYMBOL_PATH` 系统符号路径。

    ```
    set _NT_SYMBOL_PATH=c:\mysymbols;srv*c:\mycache*https://msdl.microsoft.com/download/symbols
    ```

4. 在 Windows 上启动需要监控的应用程序。

5. 生成堆快照。

    1. 打开终端，执行命令 `umdh -p:PID -f:filename1.txt`。

        - PID 是您的应用程序的进程 ID。
        - filename1.txt 是您保存堆快照后的文件名。
  
    2. 程序运行一段时间后，再次生成一个堆快照，执行命令 `umdh -p:PID -f:filename2.txt`。

6. 比较两次堆快照。

    执行 `umdh -d filename1.txt filename2.txt > diff.txt`，UMDH 会自动比较两个快照，并将结果输出在 “diff.txt” 文件中。

7. 打开 diff.txt 文件，可以看到内存增长最大的堆栈信息、以及对应泄漏的调用函数。

如果发现内存泄漏与 ZegoExpressEngine SDK 相关，可以保存好 diff.txt 文件，联系 ZEGO 技术支持进一步分析。

更多 UMDH 使用说明，请参考 [UMDH 介绍](https://learn.microsoft.comhttps://doc-zh.zego.im/zh-cn/windows-hardware/drivers/debugger/umdh)、[使用 UMDH 查找用户模式内存泄漏](https://learn.microsoft.comhttps://doc-zh.zego.im/zh-cn/windows-hardware/drivers/debugger/using-umdh-to-find-a-user-mode-memory-leak)。