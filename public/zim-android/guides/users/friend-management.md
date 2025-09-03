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

export const setEventHandlerMap = {
  'Android': <a href="@setEventHandler" target='_blank'>setEventHandler</a>,
  'Web,UTS': <a href="@on" target='_blank'>on</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler-class.html" target='_blank'>ZIMEventHandler</a>,
}
export const onFriendListChangedMap = {
  'Android': <a href="@onFriendListChanged" target='_blank'>onFriendListChanged</a>,
  'Web': <a href="@friendListChanged" target='_blank'>friendListChanged</a>,
  'UTS': <a href="@friendListChanged" target='_blank'>onFriendListChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list" target='_blank'>friendListChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-list-changed-friend-info-list" target='_blank'>friendListChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendListChanged.html" target='_blank'>onFriendListChanged</a>,
}
export const onFriendApplicationListChangedMap = {
  'Android': <a href="@onFriendApplicationListChanged" target='_blank'>onFriendApplicationListChanged</a>,
  'Web': <a href="@friendApplicationListChanged" target='_blank'>friendApplicationListChanged</a>,
  'UTS': <a href="@friendApplicationListChanged" target='_blank'>onFriendApplicationListChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-application-list-changed-friend-application-info-list" target='_blank'>friendApplicationListChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-application-list-changed-friend-application-info-list" target='_blank'>friendApplicationListChanged</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendApplicationListChanged.html" target='_blank'>onFriendApplicationListChanged</a>,
}
export const onFriendApplicationUpdatedMap = {
  'Android': <a href="@onFriendApplicationUpdated" target='_blank'>onFriendApplicationUpdated</a>,
  'Web': <a href="@friendApplicationUpdated" target='_blank'>friendApplicationUpdated</a>,
  'UTS': <a href="@friendApplicationUpdated" target='_blank'>onFriendApplicationUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-application-updated-friend-application-info-list" target='_blank'>friendApplicationUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-application-updated-friend-application-info-list" target='_blank'>friendApplicationUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendApplicationUpdated.html" target='_blank'>onFriendApplicationUpdated</a>,
}
export const onFriendInfoUpdatedMap = {
  'Android': <a href="@onFriendInfoUpdated" target='_blank'>onFriendInfoUpdated</a>,
  'Web': <a href="@friendInfoUpdated" target='_blank'>friendInfoUpdated</a>,
  'UTS': <a href="@friendInfoUpdated" target='_blank'>onFriendInfoUpdated</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-friend-info-updated-friend-info-list" target='_blank'>friendInfoUpdated</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-friend-info-updated-friend-info-list" target='_blank'>friendInfoUpdated</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendInfoUpdated.html" target='_blank'>onFriendInfoUpdated</a>,
}
export const addFriendMap = {
  'Android': <a href="@addFriend" target='_blank'>addFriend</a>,
  'iOS': <a href="@addFriendByUserID" target='_blank'>addFriendByUserID</a>,
  'mac': <a href="@addFriendByUserID" target='_blank'>addFriendByUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/addFriend.html" target='_blank'>addFriend</a>,
}
export const ZIMFriendAddedCallbackMap = {
  'Android': <a href="@-ZIMFriendAddedCallback" target='_blank'>ZIMFriendAddedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendAddedResult" target='_blank'>ZIMFriendAddedResult</a>,
  'iOS': <a href="@ZIMFriendAddedCallback" target='_blank'>ZIMFriendAddedCallback</a>,
  'mac': <a href="@ZIMFriendAddedCallback" target='_blank'>ZIMFriendAddedCallback</a>,
  'window': <a href="@ZIMFriendAddedCallback" target='_blank'>ZIMFriendAddedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendAddedResult-class.html" target='_blank'>ZIMFriendAddedResult</a>,
}
export const deleteFriendsMap = {
  'Android': <a href="@deleteFriends" target='_blank'>deleteFriends</a>,
  'iOS': <a href="@deleteFriendsByUserIDs" target='_blank'>deleteFriendsByUserIDs</a>,
  'mac': <a href="@deleteFriendsByUserIDs" target='_blank'>deleteFriendsByUserIDs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/deleteFriends.html" target='_blank'>deleteFriends</a>,
}
export const ZIMFriendsDeletedCallbackMap = {
  'Android': <a href="@-ZIMFriendsDeletedCallback" target='_blank'>ZIMFriendsDeletedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendsDeletedResult" target='_blank'>ZIMFriendsDeletedResult</a>,
  'iOS': <a href="@ZIMFriendsDeletedCallback" target='_blank'>ZIMFriendsDeletedCallback</a>,
  'mac': <a href="@ZIMFriendsDeletedCallback" target='_blank'>ZIMFriendsDeletedCallback</a>,
  'window': <a href="@ZIMFriendsDeletedCallback" target='_blank'>ZIMFriendsDeletedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendsDeletedResult-class.html" target='_blank'>ZIMFriendsDeletedCallback</a>,
}
export const sendFriendApplicationMap = {
  'Android': <a href="@sendFriendApplication" target='_blank'>sendFriendApplication</a>,
  'iOS': <a href="@sendFriendApplicationToUserID" target='_blank'>sendFriendApplicationToUserID</a>,
  'mac': <a href="@sendFriendApplicationToUserID" target='_blank'>sendFriendApplicationToUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendFriendApplication.html" target='_blank'>sendFriendApplication</a>,
}
export const acceptFriendApplicationMap = {
  'Android': <a href="@acceptFriendApplication" target='_blank'>acceptFriendApplication</a>,
  'iOS': <a href="@acceptFriendApplicationFromUserID" target='_blank'>acceptFriendApplicationFromUserID</a>,
  'mac': <a href="@acceptFriendApplicationFromUserID" target='_blank'>acceptFriendApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/acceptFriendApplication.html" target='_blank'>acceptFriendApplication</a>,
}
export const ZIMFriendApplicationAcceptedCallbackMap = {
  'Android': <a href="@-ZIMFriendApplicationAcceptedCallback" target='_blank'>ZIMFriendApplicationAcceptedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendApplicationAcceptedResult" target='_blank'>ZIMFriendApplicationAcceptedResult</a>,
  'iOS': <a href="@ZIMFriendApplicationAcceptedCallback" target='_blank'>ZIMFriendApplicationAcceptedCallback</a>,
  'mac': <a href="@ZIMFriendApplicationAcceptedCallback" target='_blank'>ZIMFriendApplicationAcceptedCallback</a>,
  'window': <a href="@ZIMFriendApplicationAcceptedCallback" target='_blank'>ZIMFriendApplicationAcceptedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendApplicationSentResult-class.html" target='_blank'>ZIMFriendApplicationAcceptedResult</a>,
}
export const rejectFriendApplicationMap = {
  'Android': <a href="@rejectFriendApplication" target='_blank'>rejectFriendApplication</a>,
  'iOS': <a href="@rejectFriendApplicationFromUserID" target='_blank'>rejectFriendApplicationFromUserID</a>,
  'mac': <a href="@rejectFriendApplicationFromUserID" target='_blank'>rejectFriendApplicationFromUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMEventHandler/onFriendApplicationListChanged.html" target='_blank'>rejectFriendApplication</a>,
}
export const ZIMFriendApplicationRejectedCallbackMap = {
  'Android': <a href="@-ZIMFriendApplicationRejectedCallback" target='_blank'>ZIMFriendApplicationRejectedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendApplicationRejectedResult" target='_blank'>ZIMFriendApplicationRejectedResult</a>,
  'iOS': <a href="@ZIMFriendApplicationRejectedCallback" target='_blank'>ZIMFriendApplicationRejectedCallback</a>,
  'mac': <a href="@ZIMFriendApplicationRejectedCallback" target='_blank'>ZIMFriendApplicationRejectedCallback</a>,
  'window': <a href="@ZIMFriendApplicationRejectedCallback" target='_blank'>ZIMFriendApplicationRejectedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendApplicationRejectedResult-class.html" target='_blank'>ZIMFriendApplicationRejectedResult</a>,
}
export const queryFriendListMap = {
  'Android': <a href="@queryFriendList" target='_blank'>queryFriendList</a>,
  'iOS': <a href="@queryFriendListWithConfig" target='_blank'>queryFriendListWithConfig</a>,
  'mac': <a href="@queryFriendListWithConfig" target='_blank'>queryFriendListWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendList.html" target='_blank'>queryFriendList</a>,
}
export const ZIMFriendListQueriedCallbackMap = {
  'Android': <a href="@-ZIMFriendListQueriedCallback" target='_blank'>ZIMFriendListQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendListQueriedResult" target='_blank'>ZIMFriendListQueriedResult</a>,
  'iOS': <a href="@ZIMFriendListQueriedCallback" target='_blank'>ZIMFriendListQueriedCallback</a>,
  'mac': <a href="@ZIMFriendListQueriedCallback" target='_blank'>ZIMFriendListQueriedCallback</a>,
  'window': <a href="@ZIMFriendListQueriedCallback" target='_blank'>ZIMFriendListQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendListQueriedResult-class.html" target='_blank'>ZIMFriendListQueriedResult</a>,
}
export const queryFriendApplicationListMap = {
  'Android': <a href="@queryFriendApplicationList" target='_blank'>queryFriendApplicationList</a>,
  'iOS': <a href="@queryFriendApplicationListWithConfig" target='_blank'>queryFriendApplicationListWithConfig</a>,
  'mac': <a href="@queryFriendApplicationListWithConfig" target='_blank'>queryFriendApplicationListWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendApplicationList.html" target='_blank'>queryFriendApplicationList</a>,
}
export const ZIMFriendApplicationListQueriedCallbackMap = {
  'Android': <a href="@-ZIMFriendApplicationListQueriedCallback" target='_blank'>ZIMFriendApplicationListQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendApplicationListQueriedResult" target='_blank'>ZIMFriendApplicationListQueriedResult</a>,
  'iOS': <a href="@ZIMFriendApplicationListQueriedCallback" target='_blank'>ZIMFriendApplicationListQueriedCallback</a>,
  'mac': <a href="@ZIMFriendApplicationListQueriedCallback" target='_blank'>ZIMFriendApplicationListQueriedCallback</a>,
  'window': <a href="@ZIMFriendApplicationListQueriedCallback" target='_blank'>ZIMFriendApplicationListQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendApplicationListQueriedResult-class.html" target='_blank'>ZIMFriendApplicationListQueriedResult</a>,
}
export const updateFriendAliasMap = {
  'Android': <a href="@updateFriendAlias" target='_blank'>updateFriendAlias</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateFriendAlias.html" target='_blank'>updateFriendAlias</a>,
  
}
export const ZIMFriendAliasUpdatedCallbackMap = {
  'Android': <a href="@-ZIMFriendAliasUpdatedCallback" target='_blank'>ZIMFriendAliasUpdatedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendAliasUpdatedResult" target='_blank'>ZIMFriendAliasUpdatedResult</a>,
  'iOS': <a href="@ZIMFriendAliasUpdatedCallback" target='_blank'>ZIMFriendAliasUpdatedCallback</a>,
  'mac': <a href="@ZIMFriendAliasUpdatedCallback" target='_blank'>ZIMFriendAliasUpdatedCallback</a>,
  'window': <a href="@ZIMFriendAliasUpdatedCallback" target='_blank'>ZIMFriendAliasUpdatedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendAliasUpdatedResult-class.html" target='_blank'>ZIMFriendAliasUpdatedResult</a>,

}
export const updateFriendAttributesMap = {
  'Android': <a href="@updateFriendAttributes" target='_blank'>updateFriendAttributes</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/updateFriendAttributes.html" target='_blank'>updateFriendAttributes</a>,
}
export const ZIMFriendAttributesUpdatedCallbackMap = {
  'Android': <a href="@-ZIMFriendAttributesUpdatedCallback" target='_blank'>ZIMFriendAttributesUpdatedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendAttributesUpdatedResult" target='_blank'>ZIMFriendAttributesUpdatedResult</a>,
  'iOS': <a href="@ZIMFriendAttributesUpdatedCallback" target='_blank'>ZIMFriendAttributesUpdatedCallback</a>,
  'mac': <a href="@ZIMFriendAttributesUpdatedCallback" target='_blank'>ZIMFriendAttributesUpdatedCallback</a>,
  'window': <a href="@ZIMFriendAttributesUpdatedCallback" target='_blank'>ZIMFriendAttributesUpdatedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendAttributesUpdatedResult-class.html" target='_blank'>ZIMFriendAttributesUpdatedResult</a>,
}
export const checkFriendsRelationMap = {
  'Android': <a href="@checkFriendsRelation" target='_blank'>checkFriendsRelation</a>,
  'iOS': <a href="@checkFriendsRelationByUserIDs" target='_blank'>checkFriendsRelationByUserID</a>,
  'mac': <a href="@checkFriendsRelationByUserIDs" target='_blank'>checkFriendsRelationByUserID</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/checkFriendsRelation.html" target='_blank'>checkFriendsRelation</a>,
}
export const ZIMFriendsRelationCheckedCallbackMap = {
  'Android': <a href="@-ZIMFriendsRelationCheckedCallback" target='_blank'>ZIMFriendsRelationCheckedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendsRelationCheckedResult" target='_blank'>ZIMFriendsRelationCheckedResult</a>,
  'iOS': <a href="@ZIMFriendsRelationCheckedCallback" target='_blank'>ZIMFriendsRelationCheckedCallback</a>,
  'mac': <a href="@ZIMFriendsRelationCheckedCallback" target='_blank'>ZIMFriendsRelationCheckedCallback</a>,
  'window': <a href="@ZIMFriendsRelationCheckedCallback" target='_blank'>ZIMFriendsRelationCheckedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendAttributesUpdatedResult-class.html" target='_blank'>ZIMFriendsRelationCheckedResult</a>,
}
export const queryFriendsInfoMap = {
  'Android': <a href="@queryFriendsInfo" target='_blank'>queryFriendsInfo</a>,
  'iOS': <a href="@queryFriendsInfoByUserIDs" target='_blank'>queryFriendsInfoByUserIDs</a>,
  'mac': <a href="@queryFriendsInfoByUserIDs" target='_blank'>queryFriendsInfoByUserIDs</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/queryFriendsInfo.html" target='_blank'>queryFriendsInfo</a>,
}
export const ZIMFriendsInfoQueriedCallbackMap = {
  'Android': <a href="@-ZIMFriendsInfoQueriedCallback" target='_blank'>ZIMFriendsInfoQueriedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendsInfoQueriedResult" target='_blank'>ZIMFriendsInfoQueriedResult</a>,
  'iOS': <a href="@ZIMFriendsInfoQueriedCallback" target='_blank'>ZIMFriendsInfoQueriedCallback</a>,
  'mac': <a href="@ZIMFriendsInfoQueriedCallback" target='_blank'>ZIMFriendsInfoQueriedCallback</a>,
  'window': <a href="@ZIMFriendsInfoQueriedCallback" target='_blank'>ZIMFriendsInfoQueriedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendsInfoQueriedResult-class.html" target='_blank'>ZIMFriendsInfoQueriedResult</a>,
}
export const searchLocalFriendsMap = {
  'Android': <a href="@searchLocalFriends" target='_blank'>searchLocalFriends</a>,
  'iOS': <a href="@searchLocalFriendsWithConfig" target='_blank'>searchLocalFriendsWithConfig</a>,
  'mac': <a href="@searchLocalFriendsWithConfig" target='_blank'>searchLocalFriendsWithConfig</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/searchLocalFriends.html" target='_blank'>searchLocalFriends</a>,
}
export const ZIMFriendsSearchedCallbackMap = {
  'Android': <a href="@-ZIMFriendsSearchedCallback" target='_blank'>ZIMFriendsSearchedCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendsSearchedResult" target='_blank'>ZIMFriendsSearchedResult</a>,
  'iOS': <a href="@ZIMFriendsSearchedCallback" target='_blank'>ZIMFriendsSearchedCallback</a>,
  'mac': <a href="@ZIMFriendsSearchedCallback" target='_blank'>ZIMFriendsSearchedCallback</a>,
  'window': <a href="@ZIMFriendsSearchedCallback" target='_blank'>ZIMFriendsSearchedCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendsSearchedResult-class.html" target='_blank'>ZIMFriendsSearchedResult</a>,
}
export const ZIMFriendApplicationSentCallbackMap = {
  'Android': <a href="@-ZIMFriendApplicationSentCallback" target='_blank'>ZIMFriendApplicationSentCallback</a>,
  'Web,UTS': <a href="@-ZIMFriendApplicationSentResult" target='_blank'>ZIMFriendApplicationSentResult</a>,
  'iOS': <a href="@ZIMFriendApplicationSentCallback" target='_blank'>ZIMFriendApplicationSentCallback</a>,
  'mac': <a href="@ZIMFriendApplicationSentCallback" target='_blank'>ZIMFriendApplicationSentCallback</a>,
  'window': <a href="@ZIMFriendApplicationSentCallback" target='_blank'>ZIMFriendApplicationSentCallback</a>,
  'Flutter': <a href="https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIMFriendApplicationSentResult-class.html" target='_blank'>ZIMFriendApplicationSentResult</a>,
}


# 好友管理

- - -

## 功能简介

ZIM SDK 支持好友管理，用户可以直接添加和删除好友、查看看好友列表、向用户发起好友申请、同意或拒绝好友申请、查看好友申请列表、检查其他用户与自己的好友关系、查询或修改好友信息。

每名用户最多可以拥有 3000 名好友。

## 基础功能

### 监听好友相关回调

:::if{props.platform="undefined|iOS|mac|window|Flutter|Web"}
通过调用 {getPlatformData(props,setEventHandlerMap)} 接口，注册监听好友相关回调，包括 {getPlatformData(props,onFriendListChangedMap)}、{getPlatformData(props,onFriendApplicationListChangedMap)}、{getPlatformData(props,onFriendApplicationUpdatedMap)} 和 {getPlatformData(props,onFriendInfoUpdatedMap)} 。
:::
:::if{props.platform="UTS"}
监听以下好友相关回调，包括 {getPlatformData(props,onFriendListChangedMap)} 、{getPlatformData(props,onFriendApplicationListChangedMap)}、{getPlatformData(props,onFriendApplicationUpdatedMap)} 和 {getPlatformData(props,onFriendInfoUpdatedMap)}，获取好友相关事件 。
:::

:::if{props.platform=undefined}
```java
// 好友列表变更回调
public void onFriendListChanged(ZIM zim, ArrayList<ZIMFriendInfo> friendInfoList,
                                    ZIMFriendListChangeAction action) {}

// 好友信息变更回调
public void onFriendInfoUpdated(ZIM zim, ArrayList<ZIMFriendInfo> friendInfoList) {}

// 好友申请列表变更回调
public void
    onFriendApplicationListChanged(ZIM zim,
                                   ArrayList<ZIMFriendApplicationInfo> friendApplicationInfoList,
                                   ZIMFriendApplicationListChangeAction action) {}

// 好友申请信息变更回调
public void
    onFriendApplicationUpdated(ZIM zim,
                               ArrayList<ZIMFriendApplicationInfo> friendApplicationInfoList) {}
```
:::
:::if{props.platform="Flutter"}
```dart
// 好友列表变更回调
static void Function(ZIM zim, List<ZIMFriendInfo> friendInfoList ,ZIMFriendListChangeAction action)? onFriendListChanged;

// 好友信息变更回调
static void Function(ZIM zim, List<ZIMFriendInfo> friendInfoList)? onFriendInfoUpdated;

// 好友申请列表变更回调
static void Function(ZIM zim,List<ZIMFriendApplicationInfo> friendApplicationInfoList ,ZIMFriendApplicationListChangeAction action)? onFriendApplicationListChanged;

// 好友申请信息变更回调
static void Function(ZIM zim,List<ZIMFriendApplicationInfo> friendApplicationInfoList)? onFriendApplicationUpdated;
```
:::
:::if{props.platform="iOS"}
```objc
// 好友列表变化的回调函数
- (void)zim:(ZIM *)zim
    friendListChanged:(NSArray<ZIMFriendInfo * > *)friendInfoList
               action:(ZIMFriendListChangeAction)action{
    // 待办事项
}

// 好友信息更新的回调函数
- (void)zim:(ZIM *)zim friendInfoUpdated:(NSArray<ZIMFriendInfo * > *)friendInfoList{
    // 待办事项
}

// 好友申请列表变化的回调函数
- (void)zim:(ZIM *)zim
    friendApplicationListChanged:(NSArray<ZIMFriendApplicationInfo * > *)friendApplicationInfoList
                          action:(ZIMFriendApplicationListChangeAction)action{
    // 待办事项
}

// 好友申请信息更新的回调函数
- (void)zim:(ZIM *)zim
    friendApplicationUpdated:(NSArray<ZIMFriendApplicationInfo * > *)friendApplicationInfoList{
    // 待办事项
}
```
:::
:::if{props.platform="mac"}
```objc
// 好友列表变化的回调函数
- (void)zim:(ZIM *)zim
    friendListChanged:(NSArray<ZIMFriendInfo * > *)friendInfoList
               action:(ZIMFriendListChangeAction)action{
    // 待办事项
}

// 好友信息更新的回调函数
- (void)zim:(ZIM *)zim friendInfoUpdated:(NSArray<ZIMFriendInfo * > *)friendInfoList{
    // 待办事项
}

// 好友申请列表变化的回调函数
- (void)zim:(ZIM *)zim
    friendApplicationListChanged:(NSArray<ZIMFriendApplicationInfo * > *)friendApplicationInfoList
                          action:(ZIMFriendApplicationListChangeAction)action{
    // 待办事项
}

// 好友申请信息更新的回调函数
- (void)zim:(ZIM *)zim
    friendApplicationUpdated:(NSArray<ZIMFriendApplicationInfo * > *)friendApplicationInfoList{
    // 待办事项
}
```
:::
:::if{props.platform="Web"}
```typescript
// 好友列表变更回调
zim.on('friendListChanged', (zim, data) => {
    // 待办事项
});

// 好友信息更新回调
zim.on('friendInfoUpdated', (zim, data) => {
    // 待办事项
});

// 好友申请列表变更回调
zim.on('friendApplicationListChanged', (zim, data) => {
    // 待办事项
});

// 好友申请更新回调
zim.on('friendApplicationUpdated', (zim, data) => {
    // 待办事项
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 好友列表变更回调
zim.onFriendListChanged((data) => {
    // 待办事项
});

// 好友信息更新回调
zim.onFriendInfoUpdated((data) => {
    // 待办事项
});

// 好友申请列表变更回调
zim.onFriendApplicationListChanged((data) => {
    // 待办事项
});

// 好友申请更新回调
zim.onFriendApplicationUpdated((data) => {
    // 待办事项
});
```
:::
:::if{props.platform="window"}
```cpp
// 注册 SDK 事件通知回调
zim->setEventHandler(shared_from_this());

...
// 好友列表变更回调
void onFriendListChanged(ZIM * /*zim*/,
                                     const std::vector<ZIMFriendInfo> & /*friendInfoList*/,
                                     ZIMFriendListChangeAction & /*action*/) {
    //todo
}

// 好友信息变更回调
void onFriendInfoUpdated(ZIM * /*zim*/,
                                     const std::vector<ZIMFriendInfo> & /*friendInfoList*/) {
    //todo
}

// 好友申请列表变更回调
void onFriendApplicationListChanged(
        ZIM * /*zim*/, const std::vector<ZIMFriendApplicationInfo> & /*friendApplicationInfoList*/,
        ZIMFriendApplicationListChangeAction & /*action*/) {
    //todo
}

// 好友申请信息变更回调
void onFriendApplicationUpdated(
        ZIM * /*zim*/,
        const std::vector<ZIMFriendApplicationInfo> & /*friendApplicationInfoList*/) {
    //todo
}
```
:::

### 直接添加好友

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,addFriendMap)} 接口对其他用户设置好友备注和属性，直接添加为好友，无需对方同意。

<Note title="说明">
最多可以设置 5 个好友属性，且对应的 `key` 取值必须为 k0、k1、k2、k3、k4。建议您提前约定各属性的实际含义并保持统一。
</Note>

添加好友结果通过 {getPlatformData(props,ZIMFriendAddedCallbackMap)} 返回。

:::if{props.platform=undefined}
```java
// 直接添加好友
ZIMFriendAddConfig config = new ZIMFriendAddConfig();
config.friendAlias = "zego"
config.friendAttributes.put("k0", "v0");
config.wording = "老同学好久不见";

ZIM.getInstance().addFriend("zego", config, new ZIMFriendAddedCallback() {
    @Override
    public void onFriendAddedCallback(ZIMFriendInfo friendInfo, ZIMError zimError) {
    }
);
```
:::
:::if{props.platform="Flutter"}
```dart
// 直接添加好友
try{
    ZIMFriendAddConfig config = ZIMFriendAddConfig();
    config.friendAlias = 'zego';
    config.friendAttributes['k0'] = 'v0';
    config.wording = '老同学好久不见';
    ZIMFriendAddedResult result = await ZIM.getInstance()!.addFriend("zego", config);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑 
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::
:::if{props.platform="iOS"}
```objc
// 直接添加好友
ZIMFriendAddConfig *addConfig = [[ZIMFriendAddConfig alloc] init];
addConfig.wording = @"你好";
addConfig.friendAlias = @"马克";
addConfig.friendAttributes = @{@"k0":@"SZ"};
[[ZIM getInstance] addFriendByUserID:@"userID" config:addConfig callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="mac"}
```objc
// 直接添加好友
ZIMFriendAddConfig *addConfig = [[ZIMFriendAddConfig alloc] init];
addConfig.wording = @"你好";
addConfig.friendAlias = @"马克";
addConfig.friendAttributes = @{@"k0":@"SZ"};
[[ZIM getInstance] addFriendByUserID:@"userID" config:addConfig callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 直接添加好友
const config: ZIMFriendAddConfig = { wording: '你好！', friendAlias: '马克', friendAttributes: { k0: 'SZ' } };
zim.addFriend('userID', config)
    .then((res: ZIMFriendAddedResult) => {
        const friendInfo = res.friendInfo;
    });
```
:::
:::if{props.platform="window"}
```cpp
// 直接添加好友
ZIMFriendAddConfig config;
config.wording = "Hello!";
config.friendAlias = "Mark";
config.friendAttributes["k0"] = "SZ";
zim::ZIM::getInstance()->addFriend("userID", config, (const zim::ZIMFriendInfo &friendInfo, const zim::ZIMError &errorInfo){
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }   
}
```
:::

添加好友成功后，双方都会收到回调 {getPlatformData(props,onFriendListChangedMap)} 得知对方成为了自己的好友。

### 批量删除好友

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,deleteFriendsMap)} 接口批量单向或双向删除至多 20 名好友。

以用户 A、B 举例说明单向删除和双向删除：
- 单向删除：当用户 A 单向删除了用户 B，用户 B 不再是用户 A 的好友、用户 A 仍为用户 B 的好友。
    <Note title="说明">
    此时，如果用户 A 向用户 B [发送好友申请](#发送好友申请)，不需要用户 B 同意，即可直接成为用户 B 的好友。
    </Note>
- 双向删除：当用户 A 双向删除了用户 B，彼此都不再是对方的好友。

删除好友结果通过 {getPlatformData(props,ZIMFriendsDeletedCallbackMap)} 返回。

:::if{props.platform=undefined}
```java
// 批量删除好友
// type 为 BOTH：双向删除 
// type 为 SINGLE：单向删除
ZIMFriendDeleteConfig zimFriendDeleteConfig = new ZIMFriendDeleteConfig();
zimFriendDeleteConfig.type = ZIMFriendDeleteType.BOTH;    
ArrayList<String> arrayList = new ArrayList<>();
arrayList.add("zego");                
ZIM.getInstance().deleteFriends(arrayList, zimFriendDeleteConfig, new ZIMFriendsDeletedCallback() {
       @Override
       public void onFriendsDeletedCallback(ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError zimError) {
             // 删除结果回调。
       }
});
```

:::
:::if{props.platform="Flutter"}
```dart
// 批量删除好友
// type 为 both：双向删除 
// type 为 single：单向删除
try{
    ZIMFriendDeleteConfig friendDeleteConfig = ZIMFriendDeleteConfig();
    friendDeleteConfig.type = ZIMFriendDeleteType.single;
    List<String> list = [];
    list.add('zego');
    ZIMFriendsDeletedResult result = await ZIM.getInstance()!.deleteFriends(list, friendDeleteConfig);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS"}

```objc
// 批量删除好友
// type为ZIMFriendDeleteTypeBoth：双向删除
// type为ZIMFriendDeleteTypeSingle：单向删除
ZIMFriendDeleteConfig *friendDeleteConfig = [[ZIMFriendDeleteConfig alloc] init];
friendDeleteConfig.type = ZIMFriendDeleteTypeBoth;
[[ZIM getInstance] deleteFriendsByUserIDs:@[@"userID1",@"userID2"] config:friendDeleteConfig callback:^(NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="mac"}
```objc
// 批量删除好友
// type为ZIMFriendDeleteTypeBoth：双向删除
// type为ZIMFriendDeleteTypeSingle：单向删除
ZIMFriendDeleteConfig *friendDeleteConfig = [[ZIMFriendDeleteConfig alloc] init];
friendDeleteConfig.type = ZIMFriendDeleteTypeBoth;
[[ZIM getInstance] deleteFriendsByUserIDs:@[@"userID1",@"userID2"] config:friendDeleteConfig callback:^(NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 批量删除好友
// 类型 0: 双向删除
// 类型 1: 单向删除
const config: ZIMFriendDeleteConfig = { type: 0 };
zim.deleteFriends(['userID1', 'userID2'], config)
    .then((res: ZIMFriendsDeletedResult) => {
        const errorUserList = res.errorUserList;
    })
```
:::
:::if{props.platform="window"}
```cpp
// 批量删除好友
// type 为 ZIM_FRIEND_DELETE_TYPE_BOTH：双向删除 
// type 为 ZIM_FRIEND_DELETE_TYPE_SINGLE：单向删除
zim::ZIMFriendDeleteConfig config;
config.type = ZIM_FRIEND_DELETE_TYPE_BOTH;
std::vector<std::string> userIDs;
userIDs.emplace_back("userID1");
zim::ZIM::getInstance()->deleteFriends(userIDs, config, [=](/zim-android/guides/users/-const-std::vector<zim::zimerroruserinfo>&-erroruserlist,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }   
    });
```
:::

删除好友成功后，根据删除类型，相关用户会收到回调 {getPlatformData(props,onFriendListChangedMap)} 得知该用户不再是好友。

### 发送好友申请

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,sendFriendApplicationMap)} 接口向其他用户发送好友申请、设置好友备注和好友属性。

<Note title="说明">

最多可以设置 5 个好友属性，且对应的 `key` 取值必须为 k0、k1、k2、k3、k4。建议您提前约定各属性的实际含义并保持统一。
</Note>

发送好友申请结果通过 {getPlatformData(props,ZIMFriendApplicationSentCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
// 发送好友申请
ZIMFriendApplicationSendConfig config = new ZIMFriendApplicationSendConfig();
config.friendAlias = "zego"
config.wording = "老同学你好";
ZIM.getInstance().sendFriendApplication("zego", config, new ZIMFriendApplicationSentCallback() {
    @Override
    public void onFriendApplicationSentCallback( ZIMFriendApplicationInfo applicationInfoList, ZIMError errorInfo) {
           // 处理好友申请结果    
    }
});
```

:::

:::if{props.platform="Flutter"}
```dart
// 发送好友申请
try{
      ZIMFriendApplicationSendConfig config = ZIMFriendApplicationSendConfig();
      config.friendAlias = 'zego';
      config.wording = '老同学你好';
      ZIMFriendApplicationSentResult result = await ZIM.getInstance()!.sendFriendApplication('zego', config);
      //处理成功逻辑
    } on PlatformException catch (onError){
      //处理失败逻辑
      onError.code; //根据官网错误码表处理
      onError.message; //错误信息
    }
```
:::

:::if{props.platform="iOS|mac"}

```objc
// 发送好友申请
ZIMFriendApplicationSendConfig *sendConfig = [[ZIMFriendApplicationSendConfig alloc] init];
sendConfig.wording = @"你好！";
sendConfig.friendAlias = @"马克";
sendConfig.friendAttributes = @{@"k0":@"SZ"};
[[ZIM getInstance] sendFriendApplicationToUserID:@"userID" config:sendConfig callback:^(ZIMFriendApplicationInfo * _Nonnull applicationInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const config: ZIMFriendApplicationSendConfig = { wording: '你好！', friendAlias: '马克', friendAttributes: { k0: 'SZ' } };
zim.sendFriendApplication('userID', config)
    .then((res: ZIMFriendApplicationSentResult) => {
        const errorUserList = res.errorUserList;
    })
```
:::
:::if{props.platform="window"}
```cpp
// 发送好友申请
zim::ZIMFriendApplicationSendConfig config;
config.friendAlias = "Mark";
config.friendAttributes["k0"] = "SZ";
zim::ZIM::getInstance()->sendFriendApplication("userID", config, [=](/zim-android/guides/users/const-zim::zimfriendapplicationinfo&-applicationinfo,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }   
    });
```
:::

目标用户会收到 {getPlatformData(props,onFriendApplicationListChangedMap)} 回调，得知有用户申请加为好友。该用户可以选择在 7 日内 <a href="#同意好友申请">同意</a> 或 <a href="#拒绝好友申请">拒绝</a> 申请。

<Note title="说明">

如需调整好友申请有效期，请联系 ZEGO 技术支持。
</Note>


:::if{props.platform=undefined}
```java
// 收到好友申请列表回调
public void onFriendApplicationListChanged(ZIM zim,
                                   ArrayList<ZIMFriendApplicationInfo> friendApplicationInfoList, ZIMFriendApplicationListChangeAction action) {

}
```
:::
:::if{props.platform="Web"}
```typescript
// 收到好友申请列表回调
zim.on('friendApplicationListChanged', (zim, data) => {
});
```
:::
:::if{props.platform="UTS"}
```typescript
// 收到好友申请列表回调
zim.onFriendApplicationListChanged((data) => {
});
```
:::

### 同意好友申请

登录 ZIM SDK 后，用户可以调用 {getPlatformData(props,acceptFriendApplicationMap)} 接口，传入申请发起用户 ID，同意好友申请。

同意好友申请结果通过 {getPlatformData(props,ZIMFriendApplicationAcceptedCallbackMap)} 返回。

:::if{props.platform=undefined}
```java
// 同意好友申请
ZIMFriendApplicationAcceptConfig config = new ZIMFriendApplicationAcceptConfig();
config.friendAlias = "zego";
config.friendAttributes = new 
ZIM.getInstance().acceptFriendApplication("zego", config, new ZIMFriendApplicationAcceptedCallback() {
    @Override
    public void onFriendApplicationAccepted(ZIMFriendInfo friendInfo, ZIMError zimError) {
                                       
   }
});
```

:::

:::if{props.platform="Flutter"}
```dart
// 同意好友申请
try{
    ZIMFriendApplicationAcceptConfig acceptConfig = ZIMFriendApplicationAcceptConfig();
    acceptConfig.friendAlias = 'Mark';
    acceptConfig.friendAttributes = {'k0':'SZ'};    
    ZIMFriendApplicationAcceptedResult result = await ZIM.getInstance()!.acceptFriendApplication('zego', config);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码文档处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS|mac"}

```objc
// 接受好友申请
ZIMFriendApplicationAcceptConfig *acceptConfig = [[ZIMFriendApplicationAcceptConfig alloc] init];
acceptConfig.friendAlias = @"Mark";
acceptConfig.friendAttributes = @{@"k0":@"SZ"};
[[ZIM getInstance] acceptFriendApplicationFromUserID:@"userID" config:acceptConfig callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 接受好友申请
const config: ZIMFriendApplicationAcceptConfig = { friendAlias: 'Mark', friendAttributes: { k0: 'SZ' } };
zim.acceptFriendApplication('userID', config)
    .then((res: ZIMFriendApplicationAcceptedResult) => {
        const friendInfo = res.friendInfo;
    })
```
:::
:::if{props.platform="window"}

```cpp
// 同意好友申请
zim::ZIMFriendApplicationAcceptConfig config;
config.friendAlias = "Mark";
config.friendAttributes["k0"] = "SZ";
zim::ZIM::getInstance()->acceptFriendApplication("userID", config, [=](/zim-android/guides/users/const-zim::zimfriendinfo&-friendinfo,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
```
:::


与申请相关的双方用户不仅会收到 {getPlatformData(props,onFriendApplicationUpdatedMap)} 回调，得知申请通过，还会收到 {getPlatformData(props,onFriendListChangedMap)}  得知对方已成为自己的好友。


### 拒绝好友申请
登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,rejectFriendApplicationMap)} 拒绝好友申请。

拒绝好友申请结果通过 {getPlatformData(props,ZIMFriendApplicationRejectedCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
// 拒绝好友申请
ZIMFriendApplicationRejectConfig config = new ZIMFriendApplicationRejectConfig();
ZIM.getInstance().rejectFriendApplication("zego", config, new ZIMFriendApplicationRejectedCallback() {
    @Override
    public void onFriendApplicationRejected(ZIMUserInfo zimUserInfo, ZIMError zimError) {
          // 拒绝好友申请结果                     
    }
});
```


:::

:::if{props.platform="Flutter"}
```dart
// 拒绝好友申请
try{
    ZIMFriendApplicationRejectConfig config = ZIMFriendApplicationRejectConfig();
    ZIMFriendApplicationRejectedResult result = await ZIM.getInstance()!.rejectFriendApplication('zego', config);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS|mac"}
```objc
// 拒绝好友申请
ZIMFriendApplicationRejectConfig *rejectConfig = [[ZIMFriendApplicationRejectConfig alloc] init];
[[ZIM getInstance] rejectFriendApplicationFromUserID:@"userID" config:rejectConfig callback:^(ZIMUserInfo * _Nonnull userInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 拒绝好友申请
zim.rejectFriendApplication('userID', {} as ZIMFriendApplicationRejectConfig)
    .then((res: ZIMFriendApplicationRejectedResult) => {
        const userInfo = res.userInfo;
    })
```
:::
:::if{props.platform="window"}
```cpp
// 拒绝好友申请
zim::ZIMFriendApplicationRejectConfig config;
zim::ZIM::getInstance()->rejectFriendApplication("userID", config, [=](/zim-android/guides/users/const-zim::zimuserinfo&-userinfo,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

与申请相关的双方用户会收到 {getPlatformData(props,onFriendApplicationUpdatedMap)} 回调，得知申请遭到拒绝。

### 查询好友列表

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,queryFriendListMap)} 拉取分页全量好友列表。

查询结果通过 {getPlatformData(props,ZIMFriendListQueriedCallbackMap)} 返回，返回的好友列表以好友关系创建时间倒序排列。


:::if{props.platform=undefined}
```java
// 查询好友信息列表
ZIMFriendListQueryConfig config = new ZIMFriendListQueryConfig();
config.count = 3000;
config.nextFlag = 0;
ZIM.getInstance().queryFriendList(config, new ZIMFriendListQueriedCallback() {
            @Override
            public void onFriendListQueried(ArrayList<ZIMFriendInfo> friendList, int nextFlag, ZIMError errorInfo) {
                
}
});
```
:::
:::if{props.platform="Flutter"}

```dart
// 查询好友信息列表
try{
    ZIMFriendListQueryConfig config = ZIMFriendListQueryConfig();
    config.count = 3000;
    config.nextFlag = 0;
    ZIMFriendListQueriedResult result = await ZIM.getInstance()!.queryFriendList(config);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS"}

```objc
// 查询好友信息列表
ZIMFriendListQueryConfig *queryConfig = [[ZIMFriendListQueryConfig alloc] init];
queryConfig.count = 100;
queryConfig.nextFlag = 0;
[[ZIM getInstance] queryFriendListWithConfig:queryConfig callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::

:::if{props.platform="mac"}

```objc
// 查询好友信息列表
ZIMFriendListQueryConfig *queryConfig = [[ZIMFriendListQueryConfig alloc] init];
queryConfig.count = 100;
queryConfig.nextFlag = 0;
[[ZIM getInstance] queryFriendListWithConfig:queryConfig callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 查询好友信息列表
zim.queryFriendList({ count: 100, nextFlag: 0 } as ZIMFriendListQueryConfig)
    .then((res: ZIMFriendListQueriedResult) => {
    });
```
:::
:::if{props.platform="window"}
```cpp
// 查询好友信息列表
zim::ZIMFriendListQueryConfig config;
config.count = 100;
config.nextFlag = 0;
zim::ZIM::getInstance()->queryFriendList(config, [=](/zim-android/guides/users/const-std::vector<zim::zimfriendinfo>&-friendlist,-unsigned-int-nextflag,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

### 查询好友申请列表

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,queryFriendApplicationListMap)} 获取好友申请列表，了解各申请的状态。好友申请列表中会包含本用户向其他用户发起的申请，也会包含其他用户向本用户发起的申请。

查询结果通过 {getPlatformData(props,ZIMFriendApplicationListQueriedCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
// 查询好友申请信息列表
ZIMFriendApplicationListQueryConfig config = new ZIMFriendApplicationListQueryConfig();
config.count = 3000;
config.nextFlag = 0;
ZIM.getInstance().queryFriendApplicationList(config, new ZIMFriendApplicationListQueriedCallback() {
    @Override
    public void onFriendApplicationListQueried(ArrayList<ZIMFriendApplicationInfo> applicationList, int nextFlag, ZIMError errorInfo) {                                                                                                            
    }                                                
});
```

:::

:::if{props.platform="Flutter"}
```dart
// 查询好友申请信息列表
try{
    ZIMFriendApplicationListQueryConfig config = ZIMFriendApplicationListQueryConfig();
    config.count = 3000;
    config.nextFlag = 0;
    ZIMFriendApplicationListQueriedResult result = await ZIM.getInstance()!.queryFriendApplicationList(config);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS|mac"}
```objc
// 查询好友申请信息列表
ZIMFriendApplicationListQueryConfig *queryConfig = [[ZIMFriendApplicationListQueryConfig alloc] init];
queryConfig.count = 100;
queryConfig.nextFlag = 0;
[[ZIM getInstance] queryFriendApplicationListWithConfig:queryConfig callback:^(NSArray<ZIMFriendApplicationInfo * > * _Nonnull applicationList, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 查询好友申请信息列表
zim.queryFriendApplicationList({ count: 100, nextFlag: 0 } as ZIMFriendApplicationListQueryConfig)
    .then((res: ZIMFriendApplicationListQueriedResult) => {
    });
```
:::
:::if{props.platform="window"}
```cpp
// 查询好友申请信息列表
zim::ZIMFriendApplicationListQueryConfig config;
config.count = 100;
config.nextFlag = 0;
zim::ZIM::getInstance()->queryFriendApplicationList(config, [=](/zim-android/guides/users/const-std::vector<zim::zimfriendapplicationinfo>&-applicationlist,-unsigned-int-nextflag,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

## 更多功能

### 更新好友备注

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,updateFriendAliasMap)} 更新自己对好友的备注。

更新结果通过 {getPlatformData(props,ZIMFriendAliasUpdatedCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
// 更新好友备注
ZIM.getInstance().updateFriendAlias("A同学", "zego", new ZIMFriendAliasUpdatedCallback() {
    @Override
    public void onFriendAliasUpdated(ZIMFriendInfo friendInfo, ZIMError zimError) {

    }
});
```

:::

:::if{props.platform="Flutter"}
```dart
// 更新好友备注
try{
    ZIMFriendAliasUpdatedResult result = await ZIM.getInstance()!.updateFriendAlias('A同学', 'zego');
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS"}
```objc
// 更新好友别名
[[ZIM getInstance] updateFriendAlias:@"新别名" userID:@"userID" callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="mac"}
```objc
// 更新好友别名
[[ZIM getInstance] updateFriendAlias:@"新别名" userID:@"userID" callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::

:::if{props.platform="Web|UTS"}
```typescript
// 更新好友备注
zim.updateFriendAlias('新备注', 'userID')
    .then((res: ZIMFriendAliasUpdatedResult) => {
        const friendInfo = res.friendInfo;
    });
```
:::
:::if{props.platform="window"}
```cpp
// 更新好友备注
zim::ZIM::getInstance()->updateFriendAlias("新备注", "userID", [=](/zim-android/guides/users/const-zim::zimfriendinfo&-friendinfo,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

更新成功后，该用户可以收到 {getPlatformData(props,onFriendInfoUpdatedMap)} 接口，得知好友信息已更新。

### 更新好友属性

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,updateFriendAttributesMap)} 更新好友属性。

<Note title="说明">

最多可以设置 5 个好友属性，且对应的 `key` 取值必须为 k0、k1、k2、k3、k4。建议您提前约定各属性的实际含义并保持统一。
</Note>

更新好友属性结果通过 {getPlatformData(props,ZIMFriendAttributesUpdatedCallbackMap)} 返回。



:::if{props.platform=undefined}
```java
HashMap<String, String> friendAttributes = new HashMap<String, String>();
friendAttributes.put("k0","v0");
// 更新好友属性
zim.updateFriendAttributes(friendAttributes, "zego", new ZIMFriendAttributesUpdatedCallback(){
    
     public void onFriendAttributesUpdated(ZIMFriendInfo friendInfo, ZIMError errorInfo)   {
                   
     }
});

```

:::

:::if{props.platform="Flutter"}

```dart
// 更新好友属性
zim.updateFriendAttributes({ k1: 'v1', k2: 'v2' } , 'userID' })
    .then(res => {
        const friendInfo = res.friendInfo;
    });
```


:::

:::if{props.platform="iOS"}

```objc
// 更新好友属性
[[ZIM getInstance] updateFriendAttributes:@{@"k1":@"v1",@"k2":@"v2"} userID:@"userID" callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```

:::
:::if{props.platform="mac"}

```objc
// 更新好友属性
[[ZIM getInstance] updateFriendAttributes:@{@"k1":@"v1",@"k2":@"v2"} userID:@"userID" callback:^(ZIMFriendInfo * _Nonnull friendInfo, ZIMError * _Nonnull errorInfo) {
    
}];
```

:::

:::if{props.platform="Web|UTS"}
```typescript
// 更新好友属性
zim.updateFriendAttributes({ k1: 'v1', k2: 'v2' } , 'userID' })
    .then((res: ZIMFriendAttributesUpdatedResult) => {
        const friendInfo = res.friendInfo;
    });
```
:::
:::if{props.platform="window"}
```cpp
// 更新好友属性
std::unordered_map<std::string, std::string> friendAttributes;
friendAttributes["k1"] = "v1";
friendAttributes["k2"] = "v2";
zim::ZIM::getInstance()->updateFriendAttributes(friendAttributes, "userID", [=](/zim-android/guides/users/const-zim::zimfriendinfo&-friendinfo,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

更新成功后，该用户可以收到 {getPlatformData(props,onFriendInfoUpdatedMap)} 接口，得知好友信息已更新。

### 检查好友关系

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,checkFriendsRelationMap)} 批量检查自己与至多 20 名其他用户的好友关系。

ZEGO 支持单边或双边检查好友关系，以检查用户 A 与目标用户 B 的好友关系为例：
- 单边检查：仅检查用户 A 的好友列表是否有用户 B。
- 双边检查：同时检查用户 A 和用户 B 的好友列表是否有对方。

检查好友关系结果通过 {getPlatformData(props,ZIMFriendsRelationCheckedCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
// 检查与其他用户的好友关系
// type 为 BOTH：双向 
// type 为 SINGLE：单向
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("zego");
ZIMFriendRelationCheckConfig config = new ZIMFriendRelationCheckConfig();
config.type = ZIMFriendRelationCheckType.BOTH;
ZIM.getInstance().checkFriendsRelation(userIDs, config, new ZIMFriendsRelationCheckedCallback() {
    @Override
    public void onFriendsChecked(ArrayList<ZIMFriendRelationInfo> relationInfos, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {
                                                                
   }
});
```
:::

:::if{props.platform="Flutter"}
```dart
// 检查与其他用户的好友关系
// type 为 both：双向 
// type 为 single：单向
    try {
      ZIMFriendAttributesUpdatedResult result = await ZIM.getInstance()!.updateFriendAttributes(
          {'k1':'v1','k2':'v2'}, 'zego');
      // 处理成功逻辑
    } on PlatformException catch(onError){
      //处理失败逻辑
      onError.code; //根据官网错误码表处理
      onError.message; //错误信息
    }
```
:::

:::if{props.platform="iOS"}

```objc
// 检查与其他用户的好友关系
// type为ZIMFriendRelationCheckTypeBoth：双向关系
// type为ZIMFriendRelationCheckTypeSingle：单向关系
ZIMFriendRelationCheckConfig *checkConfig = [[ZIMFriendRelationCheckConfig alloc] init];
checkConfig.type = ZIMFriendRelationCheckTypeSingle;
[[ZIM getInstance] checkFriendsRelationByUserIDs:@[@"userID1",@"userID2"] config:checkConfig callback:^(NSArray<ZIMFriendRelationInfo * > * _Nonnull relationInfos, NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```

:::
:::if{props.platform="mac"}

```objc
// 检查与其他用户的好友关系
// type为ZIMFriendRelationCheckTypeBoth：双向
// type为ZIMFriendRelationCheckTypeSingle：单向
ZIMFriendRelationCheckConfig *checkConfig = [[ZIMFriendRelationCheckConfig alloc] init];
checkConfig.type = ZIMFriendRelationCheckTypeSingle;
[[ZIM getInstance] checkFriendsRelationByUserIDs:@[@"userID1",@"userID2"] config:checkConfig callback:^(NSArray<ZIMFriendRelationInfo * > * _Nonnull relationInfos, NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
// 检查与其他用户的好友关系
// 类型为0：双向关系
// 类型为1：单向关系
const config: ZIMFriendRelationCheckConfig = { type: 0 };
zim.checkFriendsRelation(['userID1', 'userID2'], config)
    .then((res: ZIMFriendsRelationCheckedResult) => {
    })
```
:::
:::if{props.platform="window"}
```cpp
// 检查与其他用户的好友关系
// type 为 ZIM_FRIEND_RELATION_CHECK_TYPE_BOTH：双向 
// type 为 ZIM_FRIEND_RELATION_CHECK_TYPE_SINGLE：单向
std::vector<std::string> userIDs;
userIDs.emplace_back("userID1");
zim::ZIMFriendRelationCheckConfig config;
config.type = ZIM_FRIEND_RELATION_CHECK_TYPE_BOTH;
zim::ZIM::getInstance()->checkFriendsRelation(userIDs, config, [=](/zim-android/guides/users/-const-std::vector<zim::zimfriendrelationinfo>&-relationinfos,-const-std::vector<zim::zimerroruserinfo>&-erroruserlist,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::

### 批量查询好友信息

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,queryFriendsInfoMap)} 批量查询 20 名好友信息。

批量查询好友信息结果通过 {getPlatformData(props,ZIMFriendsInfoQueriedCallbackMap)} 返回。

:::if{props.platform=undefined}
```java
// 批量查询好友信息
ArrayList<String> userIDs = new ArrayList<>();
userIDs.add("zego");
ZIM.getInstance().queryFriendsInfo(userIDs, new ZIMFriendsInfoQueriedCallback() {
    @Override
    public void onFriendsInfoQueried(ArrayList<ZIMFriendInfo> friendInfos, ArrayList<ZIMErrorUserInfo> errorUserList, ZIMError errorInfo) {

    }
});
```

:::
:::if{props.platform="Flutter"}
```dart
// 批量查询好友信息
try{
    List<String> userIDs = ['zego'];
    userIDs.add('zego');
    ZIMFriendsInfoQueriedResult result = await ZIM.getInstance()!.queryFriendsInfo(userIDs);
    //处理成功逻辑
} on PlatformException catch (onError){
    //处理失败逻辑
    onError.code; //根据官网错误码表处理
    onError.message; //错误信息
}
```
:::

:::if{props.platform="iOS"}

```objc
// 批量查询好友信息
[[ZIM getInstance] queryFriendsInfoByUserIDs:@[@"userID1",@"userID2"] callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendInfos, NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="mac"}

```objc
// 批量查询好友信息
[[ZIM getInstance] queryFriendsInfoByUserIDs:@[@"userID1",@"userID2"] callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendInfos, NSArray<ZIMErrorUserInfo * > * _Nonnull errorUserList, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::

:::if{props.platform="Web|UTS"}
```typescript
// 批量查询好友信息
zim.queryFriendsInfo(['userID1', 'userID2'])
    .then((res: ZIMFriendsInfoQueriedResult) => {
    });
```
:::
:::if{props.platform="window"}
```cpp
// 批量查询好友信息
std::vector<std::string> userIDs;
userIDs.emplace_back("userID1");
zim::ZIM::getInstance()->queryFriendsInfo(userIDs, [=](/zim-android/guides/users/-const-std::vector<zim::zimfriendinfo>&-friendinfos,-const-std::vector<zim::zimerroruserinfo>&-erroruserlist,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::
### 搜索好友

登录 ZIM SDK 后，用户可以通过 {getPlatformData(props,searchLocalFriendsMap)} 接口，传入至多 5 个关键词，即可对好友的用户名及备注进行搜索，获取同时命中所有关键词的好友。

搜索结果通过 {getPlatformData(props,ZIMFriendsSearchedCallbackMap)} 返回。


:::if{props.platform=undefined}
```java
ZIMFriendSearchConfig config = new ZIMFriendSearchConfig();
config.count = 100;
config.nextFlag = 0;
config.isAlsoMatchFriendAlias = true;
config.keywords.add("zego");
ZIM.getInstance().searchLocalFriends(config, new ZIMFriendsSearchedCallback() {
    @Override
    public void onFriendsSearched(ArrayList<ZIMFriendInfo> friendInfos, int nextFlag, ZIMError errorInfo) 
    {           
    }
});
```

:::

:::if{props.platform="Flutter"}

```dart
try {
    ZIMFriendSearchConfig config = ZIMFriendSearchConfig();
    config.count = 100;
    config.nextFlag = 0;
    config.isAlsoMatchFriendAlias = true;
    config.keywords.add('zego');
    ZIMFriendsSearchedResult result = await ZIM.getInstance()!.searchLocalFriends(config);
    // 处理成功逻辑
} on PlatformException catch (onError) {
    // 处理失败逻辑
    onError.code; // 根据官方错误代码表进行处理
    onError.message; // 错误消息
}
```

:::

:::if{props.platform="iOS"}

```objc
ZIMFriendSearchConfig *searchConfig = [[ZIMFriendSearchConfig alloc] init];
searchConfig.count = 100;
searchConfig.keywords = @[@"a",@"b"];
searchConfig.isAlsoMatchFriendAlias = YES;
searchConfig.nextFlag = 0;
[[ZIM getInstance] searchLocalFriendsWithConfig:searchConfig callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendInfos, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```

:::
:::if{props.platform="mac"}

```objc
ZIMFriendSearchConfig *searchConfig = [[ZIMFriendSearchConfig alloc] init];
searchConfig.count = 100;
searchConfig.keywords = @[@"a",@"b"];
searchConfig.isAlsoMatchFriendAlias = YES;
searchConfig.nextFlag = 0;
[[ZIM getInstance] searchLocalFriendsWithConfig:searchConfig callback:^(NSArray<ZIMFriendInfo * > * _Nonnull friendInfos, unsigned int nextFlag, ZIMError * _Nonnull errorInfo) {
    
}];
```
:::
:::if{props.platform="Web|UTS"}
```typescript
const config: ZIMFriendSearchConfig = { keywords: ['a', 'b'], isAlsoMatchFriendAlias: true, count: 100, nextFlag: 0 };
zim.searchLocalFriends(config)
    .then((res: ZIMFriendsSearchedResult) => {
        // 待办事项
    });
```
:::
:::if{props.platform="window"}
```cpp
ZIMFriendSearchConfig config;
config.count = 100;
config.isAlsoMatchFriendAlias = true;
config.nextFlag = 0;
config.keywords.emplace_back("a");
config.keywords.emplace_back("b");
zim::ZIM::getInstance()->searchLocalFriends(config, [=](/zim-android/guides/users/const-std::vector<zim::zimfriendinfo>&-friendinfos,-unsigned-int-nextflag,-const-zim::zimerror&-errorinfo) {
    if(errorInfo.code == ZIMErrorCodeSuccess) {
        // ......
    } else {
        // ......
    }  
    });
```
:::