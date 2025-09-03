# ZIM 升级指南

- - -

本文介绍 ZIM SDK for Unity3D 版本升级时的一些说明和注意事项。

<a id="2_10_0"></a>

## 2.10.0 升级指南

<Warning title="注意">
请注意，从 2.10.0 版本开始，以下接口有重大变更，因此在从旧版本升级到 2.10.0 版本时，请您阅读以下指南。
</Warning>

#### 1. OnCallInvitationTimeout 方法变更

[OnCallInvitationTimeout](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~class~ZIMEventHandler#on-call-invitation-timeout) 新增参数 [ZIMCallInvitationTimeoutInfo](https://doc-zh.zego.im/article/api?doc=zim_API~cs_unity3d~struct~ZIMCallInvitationTimeoutInfo)，开发者需要在调用回调时补充此参数，否则代码无法编译通过。

<CodeGroup>
```cs 2.10.0版本用法
ZIM.GetInstance().onCallInvitationTimeout += (ZIM zim, ZIMCallInvitationTimeoutInfo info, string callID) => {

};
```

```cs 旧版本用法
ZIM.GetInstance().onCallInvitationTimeout += (ZIM zim, string callID) => {

};
```
</CodeGroup>