# 地理围栏

- - -

## 功能简介

地理围栏指将音视频及信令数据传输限定在某一区域，用以满足地区数据隐私安全相关法规，即限定访问某一特定区域的音视频服务。例如，当指定的地理围栏区域为欧洲时，不区分 App 用户所在区域，SDK 实际访问的区域将为欧洲。


<table>
  <colgroup>
    <col/>
    <col/>
  </colgroup>
<tbody><tr>
<th>指定的地理围栏区域</th>
<th>App 用户所在区域</th>
<th>SDK 实际访问的区域</th>
<th>连接后的用户体验</th>
</tr>
<tr>
<td>欧洲</td>
<td>欧洲</td>
<td>欧洲</td>
<td>正常</td>
</tr>
<tr>
<td>欧洲</td>
<td>中国</td>
<td>欧洲</td>
<td>可能受到较大影响</td>
</tr>
</tbody></table>

<Warning title="注意">

- 如果指定地理围栏区域的服务器都不可用，SDK 会直接报错。
- 由于指定地理围栏区域与 App 用户所在区域之间存在跨区域公共互联网，公共互联网网络质量较差会导致音视频体验受到影响。
</Warning>

<Frame width="auto" height="auto" >
  <img src="https://doc-media.zego.im/sdk-doc/Pics/Express/Geofencing_pic.jpeg" />
</Frame>

当前 SDK 支持配置地区如下：

<Note title="说明">

如需支持更多区域，请联系 ZEGO 技术支持。
</Note>


|地区|枚举|
|-|-|
|中国大陆，不包含港澳台|CN|
|北美|NA|
|印度|IN|
|欧洲|EU|
|亚洲，不包括中国大陆和印度|AS|

## 前提条件

在使用地理围栏功能之前，请确保：
- 已在 [ZEGO 控制台](https://console.zego.im) 创建项目，并申请有效的 AppID 和 AppSign，详情请参考 [控制台 - 项目信息](/console/project-info)。
- 已在项目中集成 ZEGO Express SDK，并实现了基本的音视频推拉流功能，详情请参考 [快速开始 - 集成](https://doc-zh.zego.im/article/9975) 和 [快速开始 - 实现流程](https://doc-zh.zego.im/article/9976)。


## 实现流程

### 开通地理围栏权限

地理围栏能力在某些情况下需要进行收费，请联系 ZEGO 商务确认并开通地理围栏权限。


### 设置地理围栏

- 地理围栏信息：包括地理围栏类型和地理围栏区域列表。
- 地理围栏类型：包括联合（Include）和排除（Exclude）两种类型，地理围栏类型将作用于地理围栏区域列表。
    - 联合：表示区域列表内的所有区域都包含在地理围栏内。
    - 排除：表示区域列表内容所有区域都排除在地理围栏外。

在创建 SDK 之前，调用 [setGeoFence](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#set-geo-fence) 接口，设置地理围栏信息。

<Warning title="注意">


请在调用 [createEngine](https://doc-zh.zego.im/article/api?doc=Express_Video_SDK_API~cpp_macos~class~ZegoExpressSDK#create-engine) 之前配置地理围栏信息，否则无效。

</Warning>




```cpp
// 设置联合模式的示例
//设置联合模式
ZegoGeoFenceType  type = ZegoGeoFenceType::ZEGO_GEO_FENCE_TYPE_INCLUDE;
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
std::vector<int> areaList;
areaList.push_back((int)ZegoGeoFenceAreaCode::ZEGO_GEO_FENCE_AREA_CODE_CN);
areaList.push_back((int)ZegoGeoFenceAreaCode::ZEGO_GEO_FENCE_AREA_CODE_NA);
// 这个接口是静态方法，在 createEngine 之前调用
ZegoExpressSDK::setGeoFence(type, areaList);

// 设置排除模式的示例
//设置排除模式
ZegoGeoFenceType  type = ZegoGeoFenceType::ZEGO_GEO_FENCE_TYPE_EXCLUDE;

// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
std::vector<int> areaList;
areaList.push_back((int)ZegoGeoFenceAreaCode::ZEGO_GEO_FENCE_AREA_CODE_CN);
areaList.push_back((int)ZegoGeoFenceAreaCode::ZEGO_GEO_FENCE_AREA_CODE_NA);
// 这个接口是静态方法，在 createEngine 之前调用
ZegoExpressSDK::setGeoFence(type, areaList);
```

### 其他功能接入

完成地理围栏设置后，即可进行其他功能接入。
