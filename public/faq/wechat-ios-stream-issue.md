<Title>推流正常时，只有 Android 平台能使用微信浏览器正常拉流，iOS 平台无法拉流，但 “playQualityUpdate” 回调中有数据？</Title>



- - -

iOS 系统对微信浏览器有禁止自动播放的策略，不允许视频自动播放，需要用户手动点击 “video” 标签的播放按钮，触发 “video” 标签的播放动作。

```js
<video id="vd_remote" playsinline controls>
</video>
```

