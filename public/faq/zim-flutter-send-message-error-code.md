<Title>ZIM Flutter [sendMessage](https://pub.dev/documentation/zego_zim/latest/zego_zim/ZIM/sendMessage.html) 接口的 `ZIMMessageSentCallback` 中没有暴露 `errorcode`，该如何获取呢？</Title>



------
您可以通过捕获 `PlatformException` 异常的方式来获取 `errorcode`，详情可参考以下代码片段。   
```
try { 
    var ret = await ZIM.getInstance()!.sendMessage(
        message, 
        obj.toUserID, 
        ZIMConversationType.peer, 
        config, 
        messageSendNotification); 
    } 
on PlatformException catch (onError) {
     onError.code; onError.message; 
}
```