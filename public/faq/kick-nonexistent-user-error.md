<Title>调用 “房间用户踢出接口”，踢出一个不存在的用户，是否会报错？</Title>



- - -

调用 [“房间用户踢出接口”](/real-time-video-server/api-reference/room/kick-out-user) 踢出不存在的用户时，接口也会返回成功，不会报错。如果房间内只有一个人，踢人成功后，房间将被服务端销毁。