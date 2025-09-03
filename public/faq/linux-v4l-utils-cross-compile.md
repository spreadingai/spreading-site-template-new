<Title>如何交叉编译 Linux v4l-utils 依赖库？</Title>


---

本文将以在 Ubuntu 20.04 系统的 x86_64 机器上，为 aarch64 架构的嵌入式机器，交叉编译 v4l-utils（libv4l）为例，进行介绍。

1. 安装编译 v4l-utils 所需的依赖库。

    ```shell
    $ apt update
    $ apt install make automake libtool
    ```

2. 安装交叉编译工具链。

<Note title="说明">


    此处示例安装最新版本的 GNU GCC 工具链，请根据实际情况为自己的嵌入式机器安装正确的交叉编译工具链。
    
</Note>



    ```shell
    $ apt update
    $ apt install gcc-aarch64-linux-gnu g++-aarch64-linux-gnu
    ```

3. 从 [V4l 官网](https://linuxtv.org/wiki/index.php/V4l-utils) 下载最新版本的 `V4l-utils` 源码并解压。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/Express/v4l_website.png" /></Frame>

    例如下载 [v4l-utils-1.22.1.tar.bz2](https://linuxtv.org/downloads/v4l-utils/v4l-utils-1.22.1.tar.bz2) 到本地。

    ```shell
    $ wget https://linuxtv.org/downloads/v4l-utils/v4l-utils-1.22.1.tar.bz2
    $ tar xf v4l-utils-1.22.1.tar.bz2
    $ cd v4l-utils-1.22.1
    ```

    然后通过 `tar` 解压源码，并 `cd` 进入目录。

<Note title="说明">


    - 若找不到 "wget"，可以通过 `apt install wget` 安装 "wget" 。
    - 若 "tar" 解压失败，可能是系统没有安装 "bzip2" 库，可以通过 `apt install bzip2` 安装。
    
</Note>




4. 通过 `./configure` 生成配置文件。

    ```shell
    $ ./configure --disable-doxygen-doc --without-jpeg --with-pic \
        --host=aarch64-linux-gnu --prefix=/usr/aarch64-linux-gnu
    ```

    - 通过 `--host` 参数指定交叉编译的目标为 `aarch64-linux-gnu` 。此处需要根据您的实际情况，修改为您的交叉编译目标。
    - 通过 `--prefix` 参数指定安装路径为 `/usr/aarch64-linux-gnu` 。此处需要根据您的实际情况，修改为您的交叉编译工具链的安装路径。

5. 通过 `-j` 参数指定并发编译的并行任务数量，或直接通过 `make` 编译。

    ```shell
    $ make -j$(nproc)
    ```

<Note title="说明">


    若编译时遇到 "std" 相关错误，有可能是因为你的编译器版本较低，可以尝试通过在执行步骤 4 的 `./configure` 前执行 `export CXXFLAGS="-std=gnu++11"` 指定使用 gnu++11 来编译 C++ 代码。
    
</Note>



6. 通过 `make install` 安装 v4l-utils 到交叉编译工具链的安装路径，即步骤 4 通过 `prefix` 参数指定的路径。

    ```shell
    $ make install
    ```
