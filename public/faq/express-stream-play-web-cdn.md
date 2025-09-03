<Title>Web 平台如何实现从 CDN 拉流？</Title>



- - -

- 在登录房间前，用户需要通过 `zegoExpressEngine.on('roomStreamUpdate', callBack:(roomID,updateType,streamList) => void)`，订阅房间内的流更新信息。
- 当房间内有流新增时，将回调 “callBack”，可通过 “streamList” 拿到流更新列表，列表成员属性中包含了对应的 CDN 播放地址（flv、rtmp、hls）。拿到 CDN 地址后，不能通过 “startPlayingStream” 接口播放，需要借助 “flv.js” 、“video.js” 等插件。
- 目前 Web 平台播放 rtmp 地址需要依赖于 flash 插件，如果浏览器不支持 flash 插件，则该浏览器就不能播放 rtmp 地址的流。
- Safari 限制不能播放 flv 的流，只能播放 m3u8 或 rtmp 的流。
- 各种拉流地址的延迟：rtmp、flv ：2s ～ 5s，m3u8：5s ～2 0s。  

```js
<video id="vd_remote" playsinline controls>
</video>
```
