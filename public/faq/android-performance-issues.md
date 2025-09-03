<Title>在 Android 平台开发中，出现 CPU 占用率过高、设备发热的问题该如何分析？</Title>



- - -

本文档旨在帮助使用 ZEGO SDK 的 Android 开发人员分析 CPU 方面的性能问题，因为此类问题经常导致 App 的 UI 卡顿、手机设备发热、音视频不实时（延时较大）等问题，影响客户使用体验。

为了提升客户体验和服务，此文档分别就 CPU 使用率过高的问题展开分析，帮助开发人员定位问题根因，确认是否是 ZEGO SDK 导致的性能问题。

## 进程分析

执行 `top` 命令，查看 App 占用 CPU 是否过高，以及对应的 PID（Process Identification，进程标识号）。

例如：当前 App 的 CPU 占用率为 106%，PID 为 27056。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/cpu_top.png" /></Frame></Frame>

## 线程分析

执行 `top -H -p` 命令，按 %CPU 使用率排行，查找对应 PID 下各个线程所占用的 CPU，其中包含了系统级，C/C++（lib层）、Java 层自研的线程情况。

例如：`top -H -p 30959 -O Tid` 命令的执行结果如下：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/cpu_top_p.png" /></Frame></Frame>

从中可以看到 `com.zegodemo.dynamicfunction` 进程里面的主线程消耗了较高的 CPU。

### Profiler ⼯具

Android Studio ⾃带的分析⼯具 Profiler，也可直接查看 CPU 占用率过高的线程。

1. Android Studio 安装 Debug 版本，连接到⼿机设备，打开 Profiler ⼯具，选择要分析的 App 对应的包名。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/Profiler.png" /></Frame>

2. 点击 CPU，进⼊ CPU 分析⻚⾯。

    - 上半部分可以看到当前 App 占⽤的 CPU ⽐例、以及⼿机上其他进程占⽤的 CPU ⽐例。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/Profiler_cpu.png" /></Frame></Frame>

    - 下半部分可以看到当前所有的线程、以及线程所占⽤的 CPU 时间⽚。**CPU 占⽤率，指⼀段时间内某个线程所占⽤的 CPU 时间，即线程 running 态时间占总时间的⽐率。** 

    绿⾊条的⻓度代表线程 running 态的时间。如果其中存在较⻓的绿⾊条、或者⼀段时间内非常频繁地出现绿⾊条，表示 CPU 占用率大。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/Profiler_cpu_running.png" /></Frame></Frame>


例如：App 的主线程 running 态的时间呈现⼤批绿⾊⻓条，⿏标移动到绿⾊条上，可以看到 running 态的时间很多超过了 1s，可以推测主线程有耗时操作。  

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/Profiler_cpu_running1.png" /></Frame></Frame>


## 函数细节

定位到具体的耗时线程后，进⼀步分析⽬标线程内部的操作，根据需要详细分析的线程所在层级。

### Java 层

1. 如需 Debug 主线程或其他上层 Java 线程中的 Java 层 CPU 问题，选择：`Sample Java Methods`，点击 Record，复现 CPU 占⽤⾼的问题。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record.png" /></Frame>

2. 再点击 Stop 停止，Profiler 会⾃动解析该段时间的线程 Java ⽅法调⽤情况。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record_stop.png" /></Frame></Frame>

3. 根据 Java 方法名称，查看线程占用率。例如：下图可以看出主线程⾥⾯的 onClick ⻓度条明显占据 CPU 较⻓时间。

    点击 main 线程中的该函数，右侧⾯板会展示出 Record 时间范围内该函数的最⻓的⼏次执⾏时间。**对系统 API 的函数调⽤显示为橙⾊，对应⽤⾃有函数的调⽤显示为绿⾊（重点排查），对第三⽅ API（包括 Java 语⾔ API）的函数调⽤显示为蓝⾊。**

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record_example.png" /></Frame></Frame>

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record_example1.png" /></Frame></Frame>

### C/C++ 层

如果是 C/C++ 层占用 CPU 较高，选择`Sample C/C++ Functions`。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record_cpp.png" /></Frame>

查询 ZEGO SDK 的 so 当中对 CPU 资源的使⽤情况。Zego lib.so 中常⻅线程如下：

 <table>
  
<tbody><tr>
<th>Thread name</th>
<th>功能</th>
</tr>
<tr>
<td>decoder</td>
<td>解码线程（音频/视频）</td>
</tr>
<tr>
<td>CWelsTaskThread</td>
<td>H.264 分层编码线程</td>
</tr>
<tr>
<td>audio_encode</td>
<td>⾳频编码线程</td>
</tr>
<tr>
<td>Vcap_enc</td>
<td>视频采集编码线程</td>
</tr>
<tr>
<td>avert-play-udp</td>
<td>拉流线程</td>
</tr>
<tr>
<td>cap_thread</td>
<td>采集线程</td>
</tr>
<tr>
<td>video_filter</td>
<td>外部滤镜线程</td>
</tr>
</tbody></table>


**开发者如果遇到上述线程的问题，请保存 C/C++ 的 trace ⽂件、logcat 信息、导出 ZEGO SDK、以及保存 SD 卡内的 log 等，联系 ZEGO 技术支持处理。**

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/funcion_record_cpp_cpu.png" /></Frame></Frame>
