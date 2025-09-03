# Safari 同时播放多视频限制（Web）

---

## 应用场景

为了改善用户体验，Safari 浏览器加强了对同时播放多个带音频的视频流的限制：当两个视频都不是静音状态时，点击一个视频进行播放后，另外一个视频则会被暂停。

多个视频流中包含音频且未静音则会受到浏览器的该限制，导致只能同时播放一个视频。

<Note title="说明">
iOS 14.0 及以上版本的 Safari 浏览器不存在该限制。  
</Note>



## 操作步骤

为了解决上述无法同时播放多个带音频的视频流问题，本文将介绍绕过浏览器限制的处理步骤：

1. 所有视频静音

   初次加载页面时，为了绕过自动播放策略（Autoplay）的限制，需要将页面上的所有视频静音。

   在创建 video 标签时，添加 muted 属性，详情请参考 [Safari浏览器自动播放策略 ](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)。

   ```html
   <video id="one" muted autoplay playsinline controls></video>
   <video id="two" muted autoplay playsinline controls></video>
   ```

   或者设置 DOM 元素属性。

   ```html
   <video id="one" autoplay playsinline controls></video>
   <video id="two" autoplay playsinline controls></video>
   
   <script>
     const videoList = document.querySelectorAll("video")
      // 把所有 video 设为静音
      videoList.forEach(video => {
          video.muted = true;
      })
   </script>
   ```


2. 静音时播放所有视频

   在静音状态下，将所有视频播放，此时页面上的所有视频都会处于播放状态，不会存在某些视频被暂停的情况。

   ```html
   <script>
     const videoList = document.querySelectorAll("video")
       // 在静音状态下播放所有视频
       videoList.forEach(video => {
           video.play()
       })
   </script>
   ```

3. 所有视频取消静音

   所有视频静音且播放的状态下，将所有视频取消静音，即可实现同时播放多条带音频的视频。

<Warning title="注意">
   在取消静音前，需要用户交互过页面才能成功，详情请参考 [浏览器自动播放策略](/real-time-video-web/best-practice/autoplay-policy#直接绕过-autoplay-限制)。
</Warning>



   ```html
   <button onclick="cancelMuted()">取消静音</button>
   <script>
       const videoList = document.querySelectorAll("video")
       // 取消所有 video 的静音效果
       function cancelMuted() {
            videoList.forEach(video => {
                video.muted = false;
         })
       }
   </script>
   ```

### 完整示例

综上所述，代码可以合并为：

```html
<video id="one" autoplay playsinline controls></video>
<video id="two" autoplay playsinline controls></video>
<button onclick="cancelMuted()">取消静音</button>

<script>
    const videoList = document.querySelectorAll("video")
        // 把所有 video 设为静音
        videoList.forEach(video => {
            video.muted = true;
        })
        // 在静音状态下播放所有视频
        videoList.forEach(video => {
            video.play()
        })
    function cancelMuted() {
        // 取消所有 video 的静音效果
        videoList.forEach(video => {
            video.muted = false;
        })
    }
</script>
```

