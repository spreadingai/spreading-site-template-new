<Title>使用 “switchRoom” 切换房间的时候，为什么报错：1000002-没有登录房间？</Title>



- - -

- 切换房间之前，需要先调用 “loginRoom” 登录一个房间 A，才能使用 “switchRoom” 切换到房间 B。
- 如果调用 “switchRoom”时，使用的 “fromRoomID” 参数和用户当前所在的 “roomID” 不一致，也会产生此报错。