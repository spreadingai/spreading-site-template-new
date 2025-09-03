<Title>如何交叉编译 Linux alsa-lib 依赖库？</Title>


---

本文将以在 Ubuntu 20.04 为系统的 x86_64 机器上，为 aarch64 架构的嵌入式机器，交叉编译 alsa-lib（libasound）为例，进行介绍。

1. 安装编译 alsa-lib 所需的依赖库。

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

3. 从 [ALSA 官网](https://www.alsa-project.org/main/index.php/Download) 下载最新版本的 `alsa-lib` 源码并解压。

    <Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Linux/Express/alsa_website.png" /></Frame>

    例如下载 [alsa-lib-1.2.7.2.tar.bz2](https://www.alsa-project.org/files/pub/lib/alsa-lib-1.2.7.2.tar.bz2) 到本地。

    ```shell
    $ wget https://www.alsa-project.org/files/pub/lib/alsa-lib-1.2.7.2.tar.bz2
    $ tar xf alsa-lib-1.2.7.2.tar.bz2
    $ cd alsa-lib-1.2.7.2
    ```

    然后使用 `tar` 解压源码，并 `cd` 进入解压后的目录。

<Note title="说明">


    - 若找不到 "wget"，可以通过 `apt install wget` 安装 "wget" 。
    - 若 "tar" 解压失败,可能是系统没有安装 "bzip2" 库，可以通过 `apt install bzip2` 安装。
    
</Note>



4. 通过 `./configure` 生成配置文件。

    ```shell
    $ ./configure --enable-shared=yes --enable-static=no --with-pic \
    --host=aarch64-linux-gnu --prefix=/usr/aarch64-linux-gnu
    ```

    - 通过 `--host` 参数指定交叉编译的目标为 `aarch64-linux-gnu` 。此处需要根据您的实际情况，修改为您的交叉编译目标。
    - 通过 `--prefix` 参数指定安装路径为 `/usr/aarch64-linux-gnu` 。此处需要根据您的实际情况，修改为您的交叉编译工具链的安装路径。

5. 通过 `-j` 参数指定并发编译的并行任务数量，或直接通过 `make` 编译。

    ```shell
    $ make -j$(nproc)
    ```

6. 通过 `make install` 安装 alsa-lib 到交叉编译工具链的安装路径，即步骤 4 通过 `prefix` 参数指定的路径。

    ```shell
    $ make install
    ```
