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

export const setConversationDraftMap = {
  'Android': <a href="@setConversationDraft" target='_blank'>setConversationDraft</a>,
}
export const onConversationChangedMap = {
  'Android': <a href="@onConversationChanged" target='_blank'>onConversationChanged</a>,
  'Web': <a href="@conversationChanged" target='_blank'>conversationChanged</a>,
  'UTS': <a href="@conversationChanged" target='_blank'>onConversationChanged</a>,
  'iOS': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_ios~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
  'mac': <a href="https://doc-zh.zego.im/article/api?doc=zim_API~objective-c_macos~protocol~ZIMEventHandler#zim-conversation-changed" target='_blank'>conversationChanged</a>,
}



# 保存会话草稿

- - -

## 功能简介

会话草稿，指用户正在编辑但尚未发送的文本消息。ZIM 支持用户退出会话后仍在本地保存会话草稿，以便继续编辑。

<Frame width="auto" height="auto">
  <img src="https://media-resource.spreading.io/docuo/workspace740/af061ebc6eaf0f12ae9e7f72235bd04e/030416263e.png" alt="8_会话草稿_中文.png"/>
</Frame>

## 实现流程

调用 {getPlatformData(props,setConversationDraftMap)} 接口，传入 conversationID 与conversationType 指定某个会话，即可将草稿保存到会话。

<Note title="说明">

如需清除会话草稿，`draft` 字段请传空字符串。
</Note>

保存草稿成功后，可以通过 {getPlatformData(props,onConversationChangedMap)} 回调接口获取草稿变更后的会话信息。

:::if{props.platform=undefined}
<CodeGroup>
```java title="示例代码"
// 为某个会话设置草稿
// 以群聊会话为例
zim.setConversationDraft("draft", "Group_ID", ZIMConversationType.GROUP, new ZIMConversationDraftSetCallback() {
    @Override
    public void onConversationDraftSet(ZIMError errorInfo) {
             // 设置草稿后的回调。
        }
});
```
</CodeGroup>
:::
:::if{props.platform="iOS|mac"}
<CodeGroup>
```objc title="示例代码"
// 为某个会话设置草稿
// 以群聊会话为例
zim.setConversationDraft("draft", "Group_ID", ZIMConversationType.GROUP, new ZIMConversationDraftSetCallback() {
    @Override
    public void onConversationDraftSet(ZIMError errorInfo) {
             // 设置草稿后的回调。
        }
});
```
</CodeGroup>
:::
:::if{props.platform="Web|UTS"}
<CodeGroup>
```typescript title="示例代码"
// 为某个会话设置草稿
// 以群聊消息为例
zim.setConversationDraft("draft", "Group_ID", 2)
    .then((res: ZIMConversationDraftSetResult) => {
        // 保存成功后的业务逻辑
    })
    .catch((err: ZIMError) => {
        // 请查看错误码文档获取解决建议
    });
```
</CodeGroup>
:::
:::if{props.platform="window"}
<CodeGroup>
```Cpp title="示例代码"
// 为某个会话设置草稿
// 以群聊消息为例
zim->setConversationDraft("draft", "Group_ID", zim::ZIM_CONVERSATION_TYPE_GROUP, [=](/zim-miniprogram/guides/conversation/const-std::string&-conversationid,-zim::zimconversationtype-conversationtype,-const-zim::zimerror&-errorinfo) {
    // 保存会话草稿的操作结果
    if (errorInfo.code == zim::ZIM_ERROR_CODE_SUCCESS) {
        // 保存成功后的业务逻辑
    } else {
        // 请查看错误码文档获取解决建议
    }
});
```
</CodeGroup>
:::

<Content platform="Web" />