<Title>如何使用附带 ASan 工具的 ZEGO SDK？</Title>


---

[Address Sanitizer (ASan)](https://github.com/google/sanitizers/wiki/AddressSanitizer) 是一种基于编译器的快速检测工具，用于检测原生代码中的内存错误。

ASan 可以检测以下问题：

- 堆栈和堆缓冲区上溢/下溢
- 释放之后的堆使用情况
- 超出范围的堆栈使用情况
- 重复释放/错误释放

## 获取 SDK

如需获取开启了 ASan 工具的 SDK 包，请联系 ZEGO 技术支持获取。

<Warning title="注意">


SDK 包中已附带了匹配版本的 ASan 运行时库。

</Warning>



## 集成 SDK

下面以 RTC SDK 为例，进行说明如何集成开启了 ASan 的 SDK 包，其他产品操作类似。

### Android

1. 请根据 [集成 SDK](/real-time-video-android-java/quick-start/integrating-sdk) 文档的 “方式二：复制 SDK 文件手动集成” 进行集成 SDK。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_android_asan_runtime_library.png" /></Frame>

2. 请将 SDK 包内带有的 ASan 运行时库一并集成到 App 内。

    将 “wrap.sh” 集成到 App 内。您可以从 [跑通示例源码](/real-time-video-android-java/quick-start/run-example-code) 中下载的 Android 示例代码中获取 “wrap.sh” 文件，解压示例源码后，找到 “ZegoExpressExample/main/asan/lib” 目录，将整个 `lib` 目录拷贝到您的应用工程的 “app/src/main/resources” 目录下，结构如下所示。

<Note title="说明">


    您也可以通过 [Android ASan 文档](https://developer.android.com/ndk/guides/asan) ，获取谷歌 NDK 提供的 “wrap.sh`” 文件进行集成。
    
</Note>



    ```bash
    <project root>
    └── app
        ├── src
        │   └── main
        │       └── resources
        │           └── lib
        │               ├── arm64-v8a
        │               │   └── wrap.sh
        │               ├── armeabi-v7a
        │               │   └── wrap.sh
        │               ├── x86
        │               │   └── wrap.sh
        │               └── x86_64
        │                   └── wrap.sh
        └── libs
            ├── ZegoExpressEngine.jar
            ├── arm64-v8a
            │   ├── libclang_rt.asan-aarch64-android.so
            │   └── libZegoExpressEngine.so
            ├── armeabi-v7a
            │   ├── libclang_rt.asan-arm-android.so
            │   └── libZegoExpressEngine.so
            ├── x86
            │   ├── libclang_rt.asan-i686-android.so
            │   └── libZegoExpressEngine.so
            └── x86_64
                ├── libclang_rt.asan-x86_64-android.so
                └── libZegoExpressEngine.so
    ```
    **注意事项**

    请确保 “wrap.sh” 文件以 LF (`\n`) 方式换行，而不是 CRLF (`\r\n`)，否则构建出来的 App 无法启动。

    一般 Windows 系统上默认的换行符是 CRLF，如果您在 Windows 系统上开发 Android App、并且手动创建或修改了 “wrap.sh” 文件，请确保此文件一定要以 LF 方式换行。

    您可以通过 VS Code 等编辑器查看文件的换行符，如下图所示。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/android_asan_wrap_sh_crlf_or_lf.png" /></Frame>


3. 修改 Android App 工程配置。以 “debuggable” 运行 App，将 `android:debuggable` 添加到 `AndroidManifest.xml` 应用清单。

    该步骤是为了确保，即使构建的是 Release 包，也是可调试的。如果构建出来的包是不可调试的，则 ASan 无法正常工作。

    ```xml
    <application
        android:debuggable="true"
        ...>
        ...
    </application>
    ```

    如果修改工程配置后，构建 Release App 时 gradle 报错提示：

    ```markdown
    Error: Avoid hardcoding the debug mode; leaving it out allows debug and release builds to automatically assign one [HardcodedDebugMode]
        android:debuggable="true"
        ~~~~~~~~~~~~~~~~~~~~~~~~~
    ```

    请在 “app/build.gradle” 文件中，添加如下配置：

    ```groovy
    android {
        lintOptions {
            // Allow the hardcode of `android:debuggable="true"` in `AndroidManifest.xml`, which required by ASan
            // Ref: https://developer.android.com/ndk/guides/asan#running
            checkReleaseBuilds false
        }
    }
    ```

4. 如果您的 App 的 minSdkVersion >= 23、且工程使用的 Android Gradle Plugin 版本 >= 7.0，请在 “app/build.gradle” 文件中将 `useLegacyPackaging` 设置为 `true`，如下所示，详情请参考 [文档](https://developer.android.com/ndk/guides/wrap-script#packaging_wrapsh)。

    ```groovy
    android {
        packagingOptions {
            // Only available since AGP 7.0
            jniLibs {
                useLegacyPackaging true
            }
        }
    }
    ```

5. 如果运行 App 时报错 “The APKs are invalid.” ，请参考 [GitHub 文档](https://github.com/android/ndk/issues/988)，在 “app/build.gradle” 文件中添加如下配置，并参考 [配置文档](https://developer.android.com/ndk/guides/asan#building) 进行处理。

    ```groovy
    android {
        defaultConfig {
            externalNativeBuild {
                cmake {
                    arguments "-DANDROID_STL=c++_shared"
                }
            }
        }
    }
    ```

### iOS

1. 请根据 [集成 SDK](/real-time-video-ios-oc/quick-start/integrating-sdk) 文档的 “方式三：复制 SDK 文件手动集成” 进行集成 SDK。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_ios_asan_runtime_library.png" /></Frame>

2. SDK 包内带有 ASan 运行时库，请根据情况选择是否将其集成到 App 内。

    **情况一：仅 ZEGO SDK 使用 ASan，自己 App 的代码不需要使用 ASan**

    在这种情况下，请将 ASan 运行时库以 “Embed & Sign” 的方式集成到 App 内。

<Warning title="注意">


    SDK 包内附带三个 ASan 运行时库，分别对应 iOS 真机、iOS 模拟器和 Mac Catalyst。请勿同时集成多个 ASan 运行时库到 App 内。
    - 当运行 iOS 真机时，需要集成 `libclang_rt.asan_ios_dynamic.dylib`。
    - 当运行 iOS 模拟器时，需要集成 `libclang_rt.asan_iossim_dynamic.dylib`。
    - 当运行 iOS Mac Catalyst 时，需要集成 `libclang_rt.asan_osx_dynamic.dylib`。
    
</Warning>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_ios_xcode_embed_asan_runtime_library.png" /></Frame>

    **情况二：ZEGO SDK 和自己 App 的代码都需要使用 ASan**

    1. 集成 ZEGO SDK 的 xcframework，不需要集成 ASan 运行时库。但此时首先需要确认 ZEGO SDK 使用的 clang 版本与本机的 clang 版本是否匹配。

    ```sh
    # 查看 ZEGO SDK 使用的 clang 版本
    otool -l libclang_rt.asan_ios_dynamic.dylib | grep -A 2 LC_SOURCE_VERSION

    # 查看本机 Xcode 附带的 clang 版本
    clang --version
    ```

    若不匹配，需要下载 ZEGO SDK 所使用的 Xcode 版本，否则 ASan 无法使用。

<Note title="说明">


    可通过如下链接查询 Xcode 历史版本中附带的 clang 版本：
        - [https://en.wikipedia.org/wiki/Xcode](https://en.wikipedia.org/wiki/Xcode)
        - [https://gist.github.com/yamaya/2924292](https://gist.github.com/yamaya/2924292)
    
</Note>



    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/ios_asan_lib_clang_version.png" /></Frame>

    以上图为例，本机 Xcode 附带的 clang 版本为 1400 (14.0.0) ，而该 ZEGO SDK 所使用的 clang 版本为 1316 (13.1.6)，然后查询到 Xcode 13.3 到 13.4.1 所附带的 clang 版本均为 1316，因此可以下载一个 13.4.1 版本的 Xcode。

<Note title="说明">


    您可以使用 [XcodesApp](https://github.com/RobotsAndPencils/XcodesApp) 在本机同时安装多个版本的 Xcode。
    
</Note>



    2. 打开 Xcode 工程，在菜单栏选择 ”Product > Scheme > Edit Scheme“，在侧边栏点击 “Run”，在 ”Diagnostics“ 选项卡中，勾选 ”Address Sanitizer“ ，即可开启 ASan。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_ios_xcode_scheme_enable_asan.png" /></Frame>

    3. 单击 Xcode 的运行按钮，开始构建并调试 App。

<Warning title="注意">

        - 此时 Xcode 会自动集成 ASan 运行时库到 App 中，因此不能再手动集成 ZEGO SDK 附带的 ASan 运行时库，否则会冲突。
        - 若使用命令行构建 App 而不是 Xcode GUI，请在 `xcodebuild` 命令中，添加 `-enableAddressSanitizer YES` 参数，详情请参考 [文档](https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early) 进行处理。
    
</Warning>



### macOS

<Warning title="注意">


若您的工程是 Xcode 原生工程，请参考上面 iOS 的使用方式进行集成，下面将介绍非 Xcode 工程的集成方式。

</Warning>



<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_mac_asan_runtime_library.png" /></Frame>

SDK 包内带有 ASan 运行时库，请根据情况来选择是否将其集成到 App 内。

**情况一：仅 ZEGO SDK 使用 ASan，自己 App 的代码不需要使用 ASan**

- CMake

    ```cmake
    # 链接 ZEGO SDK 以及 ZEGO SDK 包内提供的 ASan 运行时库
    link_libraries(
        "${CMAKE_CURRENT_LIST_DIR}/libs/ZegoExpressEngine.xcframework/macos-arm64_x86_64/libZegoExpressEngine.dylib"
        "${CMAKE_CURRENT_LIST_DIR}/libs/libclang_rt.asan_osx_dynamic.dylib"
    )
    ```

- QMake (Qt5)

    ```qmake
    # 链接 ZEGO SDK 以及 ZEGO SDK 包内提供的 ASan 运行时库
    LIBS += -L$$PWD/libs -lclang_rt.asan_osx_dynamic
    LIBS += -L$$PWD/libs/ZegoExpressEngine.xcframework/macos-arm64_x86_64 -lZegoExpressEngine
    ```

**情况二：ZEGO SDK 和自己 App 的代码都需要使用 ASan**

<Warning title="注意">


请确保 ZEGO SDK 使用的 clang 版本与本机的 clang 版本匹配，请参考上述 iOS 的情况二进行处理。

</Warning>



- CMake

    ```cmake
    # 为自己的 App 开启 ASan
    add_compile_options(-fsanitize=address)
    add_link_options(-fsanitize=address)

    # 链接 ZEGO SDK 以及 ZEGO SDK 包内提供的 ASan 运行时库
    link_libraries(
        "${CMAKE_CURRENT_LIST_DIR}/libs/ZegoExpressEngine.xcframework/macos-arm64_x86_64/libZegoExpressEngine.dylib"
        "${CMAKE_CURRENT_LIST_DIR}/libs/libclang_rt.asan_osx_dynamic.dylib"
    )
    ```

- QMake (Qt5)

    ```qmake
    # 为自己的 App 开启 ASan
    QMAKE_CXXFLAGS += -fsanitize=address
    QMAKE_LFLAGS += -fsanitize=address

    # 链接 ZEGO SDK 以及 ZEGO SDK 包内提供的 ASan 运行时库
    LIBS += -L$$PWD/libs -lclang_rt.asan_osx_dynamic
    LIBS += -L$$PWD/libs/ZegoExpressEngine.xcframework/macos-arm64_x86_64 -lZegoExpressEngine
    ```

### Windows

目前我们使用微软 [MSVC 的 ASan](https://learn.microsoft.com/en-us/cpp/sanitizers/asan)。请参考 [官方文档](https://learn.microsoft.com/en-us/cpp/sanitizers/asan) 为您的 App 开启 ASan。

<Note title="说明">


使用 MSVC ASan 有如下限制：

- 需要使用 Visual Studio 2019 v16.9 或更高版本，建议使用 Visual Studio 2022。
- App 的所有 C/C++ 代码需要以 Static CRT (`/MT`) 的方式编译。（因为 ZEGO SDK 使用了 Static CRT，详情请参考 [文档](https://learn.microsoft.com/en-us/answers/questions/650660/open-address-sanitizer-flagmy-app-crash.html?childToView=657116#comment-657116) 进行操作）
- 当 EXE 链接了开启 ASan 的 DLL 时，该 EXE 也必须开启 ASan （[参考文档](https://devblogs.microsoft.com/cppblog/asan-for-windows-x64-and-debug-build-support/#comment-1163)）。因此若要使用开启了 ASan 的 ZEGO SDK，您的 App 也必须开启 ASan。


</Note>



## 运行 App

当发生问题时，ASan 会输出类似如下的报告到控制台中，请将相关内容、相应的 SDK 日志、以及崩溃日志 (Apple Crash Report / Windows Crash Dump) 提交给 ZEGO 技术支持进行分析。

```log
==9901==ERROR: AddressSanitizer: heap-use-after-free on address 0x60700000dfb5 at pc 0x45917b bp 0x7fff4490c700 sp 0x7fff4490c6f8
READ of size 1 at 0x60700000dfb5 thread T0
    #0 0x45917a in main use-after-free.c:5
    #1 0x7fce9f25e76c in __libc_start_main /build/buildd/eglibc-2.15/csu/libc-start.c:226
    #2 0x459074 in _start (a.out+0x459074)
0x60700000dfb5 is located 5 bytes inside of 80-byte region [0x60700000dfb0,0x60700000e000)
freed by thread T0 here:
    #0 0x4441ee in __interceptor_free projects/compiler-rt/lib/asan/asan_malloc_linux.cc:64
    #1 0x45914a in main use-after-free.c:4
    #2 0x7fce9f25e76c in __libc_start_main /build/buildd/eglibc-2.15/csu/libc-start.c:226
previously allocated by thread T0 here:
    #0 0x44436e in __interceptor_malloc projects/compiler-rt/lib/asan/asan_malloc_linux.cc:74
    #1 0x45913f in main use-after-free.c:3
    #2 0x7fce9f25e76c in __libc_start_main /build/buildd/eglibc-2.15/csu/libc-start.c:226
SUMMARY: AddressSanitizer: heap-use-after-free use-after-free.c:5 main
```

部分平台需要用非常规方式启动 App 以获得 ASan 的错误报告。

### Android

无需做特殊处理，直接运行 App 即可。当 App 崩溃时，ASan 的错误报告会与崩溃堆栈一并输出到 Logcat 中，你可以通过 Android Studio 或 `adb logcat` 查看。

### iOS

<Warning title="注意">



若使用 Xcode 运行调试 App 则无需做特殊处理。当 App 崩溃时，ASan 的报告将输出在 Xcode 的调试控制台中。

</Warning>




若打包出 ipa 包分发给其他 iOS 设备运行，请注意开启了 ASan 后的包无法上传到 App Store Connect（包括 TestFlight，会被 Apple 拒绝），因此建议以 `ad-hoc` 或 `development` 的方式打包并通过 ipa 包来分发给内部测试设备。可以使用 [tidevice](https://github.com/alibaba/taobao-iphone-device) 或 [libimobiledevice](https://libimobiledevice.org) 等工具将 ipa 安装到测试设备上。

当 App 崩溃时，常规的 Apple Crash Report 崩溃报告中不会包含 ASan 的报告（包括第三方异常上报平台例如 Bugly 等收集的崩溃报告）

ASan 报告会输出到系统日志中，你需要自行获取，以下提供几种常用的获取方式。

**方式一**

将 iOS 设备连接到 Mac，在 Mac 上打开**控制台** App (Console.app)，在控制台 App 左侧设备列表中找到并选中该 iOS 设备，然后点击开始按钮，开始实时收集系统日志。然后在 iOS 设备上运行 App，当 App 崩溃时，控制台上会输出 ASan 错误报告。

**方式二**

1. 首先需要获取 iOS 设备的 UDID：将 iOS 设备连接到 Mac，打开**访达** App 并在左侧设备列表中找到并选中该 iOS 设备，在右侧找到设备名称和型号名称，点击型号名称那行文本，此时会切换展示设备序列号和 UDID，右键点击 UDID 并选择拷贝 UDID。

2. 在 iOS 设备上运行 App，当 App 崩溃后，将 iOS 设备连接到 Mac，在 Mac 上打开终端 App (Terminal.app) 并执行 `sudo log collect --last 10m --device-udid YOUR-UDID` 命令（将 YOUR_UDID 替换为上一步获取到的 UDID），此时会在当前目录下生成一份 **system_logs.logarchive** 系统日志归档，其中包含此 iOS 设备 10 分钟前到当前为止的所有系统日志。双击打开 **system_logs.logarchive** 文件，其中包含 ASan 错误报告。

### macOS

1. 不要直接双击打开应用，而是打开终端并 `cd` 到应用（.app）所在的目录下。

```shell
cd MyAwesomeApp
```

2. 运行 `.app` 目录里的可执行二进制文件。

```shell
./MyAwesomeApp.app/Contents/MacOS/MyAwesomeApp
```

当崩溃发生时，终端控制台中会输出 ASan 的错误报告。

### Windows

不要直接双击打开应用，而是打开命令提示符并 `cd` 到应用 `.exe` 所在的目录下，然后运行应用。

```cmd
cd MyAwesomeApp
```

当崩溃发生时，命令提示符的控制台中会输出 ASan 的错误报告。另外建议设置 ASan 的崩溃转储文件路径，当发生崩溃时将产生 Crash Dump 文件（[参考文档](https://learn.microsoft.com/en-us/cpp/sanitizers/asan#crash-dumps)）。

```cmd
set ASAN_SAVE_DUMPS=MyFileName.dmp
.\MyAwesomeApp.exe
```

## 注意事项

ASan 默认检测 Container Overflow 问题，但是容易产生误报，详情请参考 [GitHub 文档](https://github.com/google/sanitizers/wiki/AddressSanitizerContainerOverflow#false-positives)，因此在启动 App 时，建议关闭 Container Overflow 类型错误的检测。

### Android

若您从 [跑通示例源码](/real-time-video-android-java/quick-start/run-example-code) 中获取 `wrap.sh` 文件，则无需做额外修改，示例源码中提供的 `wrap.sh` 是已修改完成的。

若您从 Android NDK 或其他地方获取 `wrap.sh` 文件，则需要修改 `wrap.sh` 文件，为 `ASAN_OPTIONS` 环境变量添加 `detect_container_overflow=0` 参数，如下所示。

```shell
export ASAN_OPTIONS=log_to_syslog=false,allow_user_segv_handler=1,detect_container_overflow=0
```

### iOS

若使用 Xcode 直接运行调试 App，打开 Xcode 工程，在菜单栏选择 ”Product > Scheme > Edit Scheme“，在侧边栏点击 “Run”，然后在 ”Arguments“ 选项卡的 “Environment Variables” 选项中，添加环境变量 `ASAN_OPTIONS` 其值设为 `detect_container_overflow=0`，如下图所示。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Common/ASAN/express_ios_xcode_scheme_set_asan_options.png" /></Frame>

若使用 ipa 包分发到其他设备运行 App，请使用 [tidevice](https://github.com/alibaba/taobao-iphone-device) 设置环境变量，然后启动 App。

```shell
tidevice launch -e ASAN_OPTIONS:"detect_container_overflow=0" YOUR_APP_BUNDLE_ID
```

### macOS

在终端启动 App 前，先设置 `ASAN_OPTIONS` 环境变量，然后运行 App。

```shell
export ASAN_OPTIONS=detect_container_overflow=0
./MyAwesomeApp.app/Contents/MacOS/MyAwesomeApp
```

### Windows

在命令提示符启动 App 前，先设置 `ASAN_OPTIONS` 环境变量，然后运行 App。

```cmd
set ASAN_OPTIONS=detect_container_overflow=0
set ASAN_SAVE_DUMPS=MyFileName.dmp
.\MyAwesomeApp.exe
```
