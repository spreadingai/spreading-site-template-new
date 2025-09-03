<Title>在 iOS 应用开发中，出现卡顿、设备发热、内存占用过多等的问题，该如何分析？</Title>



---

在 iOS 应用开发过程中，经常会遇到性能达不到要求，导致卡顿、发热、内存占用过多、闪退等的问题，可以通过以下方式，进行性能分析和优化：

1. 通过 Xcode 中的 Instruments 工具，进行性能检测与分析；
2. 通过分析，找到资源泄露、内存泄露、能量消耗等性能开销较大的地方，然后进行优化。

<Note title="说明">


在音视频场景中，性能分析和优化尤为重要。由于音视频渲染、编码等操作的开销都很大，尤其是某些海外业务场景下（例如，用户群体硬件条件一般），如果应用的性能差，影响更明显，用户的体验会大打折扣。

</Note>




## Instruments 介绍

Instruments 是 Xcode ⼯具集的⼀部分，是⼀个强⼤⽽灵活的性能分析和测试⼯具，可帮助开发者剖析 iOS、watchOS、tvOS 和 macOS 等应⽤程序、进程和设备，以便更好地理解和优化它们的⾏为和性能。从应⽤程序开发过程的前期，就将⼯具整合到⼯作流程中，可以帮助开发者在开发周期的早期发现问题，从⽽节省后期的时间。

在 Instruments 中，可以使⽤专⻔的“⼯具”，随时间跟踪应⽤程序、进程和设备的不同⽅⾯，通过对收集的数据进⾏分析，呈现详细的结果。

Instruments 可以广泛地收集不同类型的数据并反复排查，更容易识别可能被忽略的问题。例如：由于多个打开的⽹络连接，应⽤程序可能会出现⼤量内存增⻓，此时通过 “Allocations” 和 “NetWork”，开发者就可以识别没有关闭的连接，释放内存占用。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/performance_ios_1.jpeg" /></Frame></Frame>

有效地使⽤⼯具，可以：

- 检查⼀个或多个应⽤程序或进程的⾏为。
- 检查设备的特定功能，如 Wi-Fi 和蓝⽛。
- 在模拟器或物理设备上执⾏分析。
- 跟踪源代码中的问题。
- 对应⽤进⾏性能分析。
- 查找应⽤程序中的内存问题，如泄漏、废弃内存和僵⼫对象。
- 确定优化应⽤程序的⽅法，以获得更⼤的效率。
- 执⾏⼀般系统级故障排除。
- 将⼯具配置保存为模板，以便下次使⽤。

虽然 Instruments 嵌⼊在 Xcode 的工具集中，与 Xcode ⼀起使⽤；但 Instruments 也是⼀个独⽴的应⽤程序，可以根据需要单独使⽤。


## Instruments 使用

### 启动 Instruments

在 Xcode 中，选择 “Xcode > Open Developer Tool > Instruments”。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/xcode_Instruments.png" /></Frame></Frame>

### 创建 Trace 文件

启动 Instruments 后，在弹出的 “Choose a profilling template for:” 对话框中，选择一个 `目标设备` 和 `目标进程（App）`，然后选择需要使用的 `工具`（下图以 Allocations 为例），最后点击 “Choose” 完成创建。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_index.png" /></Frame></Frame>

<Accordion title="Trace 文件介绍" defaultOpen="false">
<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_Allocations.jpeg" /></Frame></Frame>

- **工具栏**

    - 开始/结束：启动或停止对 App 的监控分析。点击开始时 App 会启动，Instruments 会根据配置监控 App 的运行情况，时间轴面板和详情面板会实时更新，点击结束时 App 会退出，Instruments 会停止工作。
    - 暂停：暂停对 App 的监控分析。点击暂停时 App 会暂停运行并卡住，Instruments 会暂停监控 App 的运行情况。
    - 目标设备：目标设备列表，包括 iPhone，iPad，Mac，Apple Watch 等，iOS 设备可通过有线或者无线连接。
    - 目标进程：目标设备上的可以分析的进程，如 iPhone 上的 App。
    - 活动观察器：当前 Trace 文件中已存在的分析活动，可通过点击左右按钮进行切换，同时显示每个分析活动所用的时间。
    - 添加分析工具：显示或隐藏所有的 Instruments 工具列表，可从列表中选择某个工具，并添加到当前的分析活动中。

- **时间轴面板**

    时间轴面板是随着时间，通过监控 App，实时更新收集到的数据，并以图表的形式展示。图表可缩放、左右滚动、点击指定某个时间点观察附近的数据情况、在某个时间点上插入标识图标、标记为高亮、划定指定的时间区域（高亮）、在 Instruments 列表中选择某个或多个工具做大头针等，将该工具固定显示在时间轴面板的最下方。

- **数据展示区**

    数据展示区是随着时间，通过监控 App，实时更新收集到的数据，并以表格的形式展示。显示的数据内容，对应时间轴面板选择的 “Instruments 工具”（高亮），数据内容详情与时间轴面板的时间选择有关，例如时间轴面板上指定的某时间点，某个时间区域等，默认随着时间进度变化。

    - 导航栏：左上角可以更显数据展示的区域数据组织类型，如截图所示当前为 Allocations List，即将所有以列表形式平铺
    - 收集数据的显示区域：显示数据内容详情。
    - 过滤和配置工具栏：可通过在输入框输入关键字，过滤数据显示区域想要显示的数据；可通过配置按钮选项，调整数据显示区域显示数据的方式。
</Accordion>

### 翻译 Trace 堆栈

Instruments 分析完成后，需要对 Trace 文件中分析出来的堆栈信息进行翻译，便于确认有问题的函数、或待优化的问题。

点击 “File > Symbols”。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_allocations_symbols.png" /></Frame></Frame>

一般来说，对于常见应用，符号表（Symbols）可以分为两种类型：

- 可以直接获取。例如，应用本身在编译过程中生成的符号表。

    如何生成应用 App 的符号表：

    1. 选择 “Build Settings > Build Options > Debug Information Format”，确认是否为 `DWARF with dSYM File`。
    2. 编译项目后，在 Products 文件夹下，会生成对应的 “.app” 文件。在该文件上右键，选择 “show in Finder”，在同一级目录下，找到对应的 dSYM 文件，即符号表文件。

- 对于第三方库，比如 ZegoExpressEngine，符号表是由 ZEGO 保管维护，因此开发者无法直接获取到。

    <Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_allocations_symbols_add.png" /></Frame></Frame>

在分析过程中，如果发现异常与 ZEGO 有关，您可以保存 Trace 文件，并联系 ZEGO 技术支持进行分析。

### 保存 Trace 文件

将已分析好的 Trace 文件，保存在本地，并联系 ZEGO 技术支持定位问题。

点击 “File > Save/Save As...”。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_allocations_save.png" /></Frame></Frame>


## 相关案例分析

### CPU 消耗

App 运行时，分析 CPU 的消耗情况，一般使用 `Time Profiler`。

CPU 的消耗直接导致设备发热、卡顿、耗电等问题，分析 CPU 的消耗情况可以确认 App 内各线程工作是否符合预期。

例如，使用 ZegoExpressEngine 官网示例 Demo，运行 Demo，点击 `推流`，点击 `Start Publishing` 按钮，点击 `Stop Publishing` 按钮，CPU 消耗情况如下图：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instrument_demo_cpu.png" /></Frame></Frame>

点击上方 `Threads` 过滤器选项，可以查看示例 Demo 下所有线程的 CPU 使用情况。

从下图可以看出，在选中的时间段内，主线程有一次占比较高的 CPU 消耗；在下方展开调用栈详情，可以看出是 Demo 中的某个回调导致 CPU 消耗增大。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_demo_cpu_threads.jpeg" /></Frame></Frame>

再点击右下角的调用栈接口详情，跳转到 Demo 的对应代码位置。

查看代码详情，可以发现是因为此时 SDK 回调了一次推流质量，Demo 更新了 UILabel 的内容，UI 的刷新导致 CPU 消耗增大。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_demo_cpu_code.jpeg" /></Frame></Frame>

您在发现 App 存在 CPU 消耗异常、手机发热、卡顿严重等问题时，可以通过上述方式进行分析。如果发现 ZegoExpressEngine SDK 导致 CPU 消耗增加，可以保存好 Trace 文件，联系 ZEGO 技术支持进一步分析。

### 内存增长

App 运行时，分析内存的增⻓情况，一般使用 `Allocations`。

例如，使用 ZegoExpressEngine 官网示例 demo，运行 demo，点击 `推流`，点击 `Start Publishing` 按钮，点击 `Stop Publishing` 按钮，返回到首页列表页，内存变化情况如下图：

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_allocations_demo.png" /></Frame></Frame>

由于已经在前面已经导入了 Demo 的符号表，可以看到 Demo 的详细调用堆栈；同时，由于没有导入 ZegoExpressEngine SDK 的符号表，对应的堆栈都只是简单的地址。

选择其中一个内存变化区域，点击右侧堆栈跟 Demo 有关的方法调用，可以直接跳转到对应代码处，并详细展示了每一行代码的内存影响。

<Frame width="512" height="auto" caption=""><Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/FAQ/Performance/instruments_allocations_demo_code.png" /></Frame></Frame>

如果发现 ZegoExpressEngine SDK 内存变化存在异常，如内存持续增长，或内存未按照预期释放，可以保存好 Trace 文件，联系 ZEGO 技术支持进一步分析。