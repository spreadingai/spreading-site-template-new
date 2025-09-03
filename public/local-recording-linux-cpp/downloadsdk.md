# 下载

---

ZEGO 本地服务端录制 SDK 由深圳市即构科技有限公司提供，您可以在本页面获取适用于 Linux 客户端的 SDK，合规事宜请参考 [ZEGO 安全合规白皮书](/policies-and-agreements/zego-security-and-compliance-white-paper)。

<Card title="本地服务端录制 SDK" href="https://artifact-sdk.zego.im/downloads/ZegoLiveRoom-ServerRecording-Linux.zip" target="_blank">
本地下载 Linux - C++ 
</Card>

<Accordion title="2022-12-07 Version：g52a08f9ad6">

**问题修复**

修复因 DNS 查询线程卡死、可能会导致无法正常录制的偶现问题。

</Accordion>



<Accordion title="2022-03-23 Version：ga01596a1c8">

**新增功能**

1. 优化了鉴权方式

ga01596a1c8 及以上版本，在初始化 SDK 时不传 AppSign，在登录房间前必须通过 SetCustomToken 接口将 Token 传给 SDK，具体请参考 [使用 Token 鉴权](https://doc-zh.zego.im#14430)。

ga01596a1c8 之前版本，在初始化 SDK 时需传入 AppSign。

相关 API 请参考 [InitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af8fcc2e5a69e83075637631d68fcf4ea), [SetCustomToken](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a68bdea0d66d62c8bf4d671284707b3ae) 

</Accordion>


<Accordion title="2021-12-02 Version：gd2ef35d43f">

**新增功能**

1. 适配 H.265 整体解决方案
    
    H.265 编解码完整方案上线，适用于单主播直播和多人互动直播场景。该插件主要适配的是 RTC 产品的 H.265 自动降级（H.254 降级为 H.264）能力，录制时会产生两份文件（H.254 和 H.264 各一份）。

2. 支持对指定的流进行截图。
3. 外部采集时，支持采集音频输入源。
4. 混流录制过程中，新增如下功能：

    - 支持设置图片水印。
    - 混流录制过程中，支持暂停/恢复录制。
    - 混流录制时，支持给指定的流设置背景图片。

**废弃删除**

为了降低开发者对环境的理解，废弃了掉测试环境，统一使用环境。在 `gd2ef35d43f` 及以上版本废弃了原有的 [SetUseTestEnv] 设置是否使用测试环境接口，开发者可以不设置环境信息，直接使用。

</Accordion>


<Accordion title="2021-03-05 Version：g22ad96a1f9">

**新增功能**

1. 支持混流画面输出图片水印和文字水印。

相关 API 请参考 [UpdateImageWaterMarkConfig](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#aa7978cd09c9542c3e52b45077d4198c4)

</Accordion>



<Accordion title="2020-12-09 Version：g5dbbce505a">

**新增功能**

1. 录制支持 m3u8 文件格式。

2. 支持设置布局模式(裁剪或者黑边)。

3. 流更新回调增加流创建时间信息。

4. 支持外部输入视频数据设置码率。

5. 支持外部输入视频数据作为录制输入源。

**改进优化**

1. 混流录制视频时戳修正，更均匀，与帧率对齐。

2. 混流录制支持更多路流录制，修复之前存在的瓶颈问题。

3. 优化录制 MP3 格式可补静音数据。

4. 优化域名解析可能耗时过长的问题。

**问题修复**

1. 修复单流录制输入流音频格式切换，录制文件声音不可用的问题。

2. 数据缓存增大，修复系统io时间较长时导致卡住的问题。

3. 修复可能多次回调 OnRecordEnd 的问题。

4. 修复单流录制超过上限时没有回调录制失败的问题。

5. 修复混流录制时输入重复的流 ID 导致的崩溃问题。

6. 修复无法退出房间的问题。

</Accordion>



<Accordion title="2020-08-10 Version：g3896eefc2">

**新增功能**

1. 支持在单流、混流同时录制时，可以同时生成混流对应的 MP3 文件。
2. 支持视频音频分开录制。

</Accordion>

<Accordion title="2020-06-05 Version：g64ae32b1f">

**问题修复**
1. 修复在不登出房间的前提下，第一次录制后停止录制，再开始第二次录制，第二段录制文件会没有声音的 bug。
</Accordion>

<Accordion title="2020-04-30 Version：g709410abf">
 
**新增功能**

1. 登录鉴权功能  
新增 [SetCustomToken](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a68bdea0d66d62c8bf4d671284707b3ae) 接口，用于设置自定义鉴权信息，验证登录时用户的合法性。 
2. 设置用户信息  
新增 [SetUser](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a7ac98e20f63c4fae7266214be860a089) 接口，用于设置用户名相关信息。  
3. 获取录制开始的绝对时间戳  
在线教育场景中，可能存在教师端直播推流同时编辑白板的情况，客户可通过即构录制SDK录制教师的直播音视频流，并且获得开始录制时相对教师端的绝对时间戳，用于教师音视频录制文件和白板数据的对齐处理。   
（1）新增 [onRecvMediaSideInfo](https://doc-zh.zego.im/API/ServerRecord/class_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_i_media_side_callback.html#a1ebd6831721ce03e71db1c52a904e008) 回调，可通过该回调接收推流端发送的媒体次要信息。  
（2）新增 [GetRecordLastMediaSideTime](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#af11acf7b7af97126a6cbe2fca2e7cca9) 接口，获取收到的最近一次媒体次要信息数据包距离录制的第一个数据包的时间间隔。  

  推流端开始推流后周期性地发送媒体次要信息（填入当前的绝对时间戳），录制端收到后将解析出来的时间戳减去 `GetRecordLastMediaSideTime` 返回的时间，即得到开始录制的绝对时间戳。 

4. 获取录制文件相关信息  
新增 [GetRecordStatus](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a1c2d983f3d3cef1ef0b54288e9e2eac3) 接口，用于获取录制文件的存储路径、已录制时长、文件大小。  
5. 新增设置水印设置位置、字体颜色、背景颜色属性功能。

**问题修复**

1. 修复柔性配置拉取失败时，不会回调错误的 bug。
2. 修复 [InitSDK](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a0b05e2d88f37fe107e55c6f01809674b) 失败时，调用 [LoginRoom](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#ac13869a794f456b739a5c9240e8f752c) 回调成功的 bug。
3. 混流输入中有流删除时，回调 [OnMixStreamRecordUpdate](https://doc-zh.zego.im/API/ServerRecord/class_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_i_callback.html#ad5838ef43c3ec75de7f556c085fba7f3)。
</Accordion>

<Accordion title="2019-12-18 Version：g133f0c096">
 
**问题修复**

1. 修改拉流失败后，停止录制时回调错误码不准确的问题。
2. 修复单流录制中出现断流情况时，录制文件时长不准确的问题。
</Accordion>

<Accordion title="2019-10-29 Version：gf7c3cd37b">

**改进优化**

1. 增加 [OnSeek](https://doc-zh.zego.im/API/ServerRecord/class_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_i_callback.html#abbc5b7d8bbba7521a633f50138a4e3e0) 回调，因为 [OnStreamRecordData](https://doc-zh.zego.im/API/ServerRecord/class_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_i_callback.html#aca52e7bbe249d107a9794587f54b3c02) 回调的数据不是顺序的，在保存录制数据时，可根据 `OnSeek` 回调调整写数据的偏移位置，以保证录制数据是一段连贯的音视频。
2. 混流录制支持自动补白视频。
3. 修复其它已知问题。
</Accordion>

<Accordion title="2019-06-11 Version：g99f5b93e">

**改进优化**

1. 混流录制 [StartRecordMixStream](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a6a117184a597fe9cb7b6bdce03604b39) 接口中的 [ZegoMixStreamRecordConfig](https://doc-zh.zego.im/API/ServerRecord/struct_z_e_g_o_1_1_l_i_v_e_r_o_o_m_1_1_zego_mix_stream_record_config.html) 参数新增 `bGenerateMp3` 配置，支持在生成视频文件的同时也生成分离的音频文件，即 同时生成 Mp3、Mp4 文件。 

**API **整理
`g99f5b93e` 版本中对 API 进行了如下变动。

**改动：**
- [StartRecordMixStream](https://doc-zh.zego.im/API/ServerRecord/namespace_z_e_g_o_1_1_l_i_v_e_r_o_o_m.html#a6a117184a597fe9cb7b6bdce03604b39) 

</Accordion>
