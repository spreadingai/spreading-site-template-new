<Title>使用云端录制时，房间内只有两个真实用户，但 onRoomOnlineUserCountUpdate 回调却显示有三个用户？</Title>
- - -

云录制相当于一个虚拟的客户端。调用开始录制接口时，相当于一个用户登录房间进行拉流，所以 `onRoomOnlineUserCountUpdate` 回调中，会显示比房间内真实用户数量多 1 个。