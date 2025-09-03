export const getPlatformData = (props, data) => {
    const platform = (props.platform ?? "Android").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["Android"] || data["android"] || data["default"];
};

export const getPlatformData2 = (props, data) => {
    const platform = (props.platform ?? "default").toLowerCase();
    for (const [key, value] of Object.entries(data)) {
        const pList = key.split(",").map((v) => v.toLowerCase());
        if (pList.includes(platform)) {
            return value;
        }
    }
    return data["default"];
};

export const setGeofencingConfigMap = {
  'Android': <a href="@setGeofencingConfig" target='_blank'>setGeofencingConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/setGeofencingConfig.html" target='_blank'>setGeofencingConfig</a>,
}
export const createMap = {
  'Android': <a href="@create" target='_blank'>create</a>,
  'iOS': <a href="@createWithAppConfig" target='_blank'>createWithAppConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/create.html" target='_blank'>create</a>,
}



# 地理围栏

- - -

## 功能简介

地理围栏指将即时通信数据传输限定在某一区域，用以满足地区数据隐私安全相关法规，即限定访问某一特定区域的通信服务。例如，当指定的地理围栏区域为欧洲时，不区分 App 用户所在区域，SDK 实际访问的区域将为欧洲。

<table>
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
- 由于指定地理围栏区域与 App 用户所在区域之间存在跨区域公共互联网，公共互联网网络质量较差会导致通信体验受到影响。
</Warning>

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/ZIM/GeoFence.jpeg" /></Frame>

当前 SDK 支持配置地区如下：

<Note title="说明">

如需支持更多区域，请联系 ZEGO 技术支持。
</Note>


|地区|枚举|枚举值|
|-|-|-|
|中国大陆，不包含港澳台|CN|2|
|北美|NA|3|
|欧洲，包括英国|EU|4|
|亚洲，不包括中国大陆和印度|AS|5|
|印度|IN|6|

## 实现流程

### 1 开通地理围栏权限

地理围栏能力在某些情况下需要进行收费，请联系 ZEGO 商务确认并开通地理围栏权限。

### 2 设置地理围栏

在创建 SDK 之前，调用 {getPlatformData(props,setGeofencingConfigMap)} 接口，设置地理围栏信息。

- 地理围栏信息：包括地理围栏类型和地理围栏区域列表。
- 地理围栏类型：包括联合（Include）和排除（Exclude）两种类型，地理围栏类型将作用于地理围栏区域列表。
    - 联合：表示区域列表内的所有区域都包含在地理围栏内。
    - 排除：表示区域列表内容所有区域都排除在地理围栏外。

<Warning title="注意">

请在调用 {getPlatformData(props,createMap)} 之前配置地理围栏信息，否则无效。
</Warning>

:::if{props.platform=undefined}
<CodeGroup>
```cpp title="联合模式示例"
// 设置联合模式的示例
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
ArrayList<Integer> arrayList = new ArrayList<Integer>();
arrayList.add(2);
arrayList.add(3);
// 这个接口在 create 之前调用
ZIM.setGeofencingConfig(arrayList, ZIMGeofencingType.Include);
```
```cpp title="排除模式示例"
// 设置排除模式的示例
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
ArrayList<Integer> arrayList = new ArrayList<Integer>();
arrayList.add(2);
arrayList.add(3);
// 这个接口在 create之前调用
ZIM.setGeofencingConfig(arrayList, ZIMGeofencingType.Exclude);
```
</CodeGroup>
:::

:::if{props.platform="iOS"}
<CodeGroup>
```objc title="联合模式示例"
// 设置联合模式的示例
// 设置联合模式
ZIMGeofencingType type = ZIMGeofencingTypeInclude;

// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
NSMutableArray<NSNumber *> *arealist = [[NSMutableArray alloc] init];
[arealist addObject:@ZIMZIMGeofencingAreaCN];
[arealist addObject:@ZIMZIMGeofencingAreaNA];
// 这个接口在 createWithAppConfig 之前调用
[ZIM setGeofencingConfigWithAreaList:arealist type:type];
```
```objc title="排除模式示例"    
// 设置排除模式的示例
// 设置排除模式
ZIMGeofencingType type = ZIMGeofencingTypeExclude;
    
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
NSMutableArray<NSNumber *> *arealist = [[NSMutableArray alloc] init];
[arealist addObject:@ZIMZIMGeofencingAreaCN];
[arealist addObject:@ZIMZIMGeofencingAreaNA];
// 这个接口在 createWithAppConfig 之前调用
[ZIM setGeofencingConfigWithAreaList:arealist type:type];
```
</CodeGroup>
:::

:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="联合模式示例"
  // 设置联合模式的示例
  const areaList = [3];
  ZIM.setGeofencingConfig(areaList, 1);
  ```
```typescript title="排除模式示例"
  // 设置排除模式的示例
  const areaList = [2];
  ZIM.setGeofencingConfig(areaList, 2);
  ```
</CodeGroup>
:::

:::if{props.platform="Flutter"}

<CodeGroup>
```dart title="联合模式示例"
// 设置联合模式的示例
//设置联合模式
ZIMGeofencingType type = ZIMGeofencingType.include;
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
List<int> areaList = [ZIMGeofencingArea.CN,ZIMGeofencingArea.NA];
// 这个接口在 create 之前调用
ZIM.setGeofencingConfig(areaList, type);
```
```dart title="排除模式示例"
// 设置排除模式的示例
//设置排除模式
ZIMGeofencingType type = ZIMGeofencingType.exclude;
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
List<int> areaList = [ZIMGeofencingArea.CN,ZIMGeofencingArea.NA];
// 这个接口在 create 之前调用
ZIM.setGeofencingConfig(areaList, type);
```
</CodeGroup>
:::

:::if{props.platform="window"}
<CodeGroup>
```cpp title="联合模式示例"
// 设置联合模式的示例
//设置联合模式
ZIMGeofencingType type = ZIMGeofencingType::ZIM_GEOFENCING_TYPE_INCLUDE;
// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
std::vector<int> areaList;
areaList.push_back(ZIMGeofencingArea::ZIM_GEOFENCING_AREA_CN);
areaList.push_back(ZIMGeofencingArea::ZIM_GEOFENCING_AREA_NA);
// 这个接口在 create 之前调用
zim::ZIM::setGeofencingConfig(area_int_list, type);
```
```cpp title="排除模式示例"
// 设置排除模式的示例
//设置排除模式
ZIMGeofencingType type = ZIMGeofencingType::ZIM_GEOFENCING_TYPE_EXCLUDE;

// 设置区域列表信息，最少设置 1 个，最多设置不得大于 SDK 所支持个数
std::vector<int> areaList;
areaList.push_back(ZIMGeofencingArea::ZIM_GEOFENCING_AREA_CN);
areaList.push_back(ZIMGeofencingArea::ZIM_GEOFENCING_AREA_NA);
// 这个接口在 create之前调用
zim::ZIM::setGeofencingConfig(area_int_list, type);
```
</CodeGroup>
:::

### 3 其他功能接入
完成地理围栏设置后，即可进行其他功能接入。

<Content platform="iOS" />