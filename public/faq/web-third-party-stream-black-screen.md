<Title>使用浏览器推第三方视频流，推流/预览正常，但拉流时画面黑屏，该如何处理？</Title>



- - - 

目前，使用如下类型的浏览器推第三方视频流时，会出现此问题。

- chrome 88~92 版本浏览器
- Safari 浏览器
- 鸿蒙系统火狐浏览器

开发者可以在推流时，使用 Canvas 获取 video 元素的媒体流。

```javascript
/**
 * Compatible with the problem that the video of customized captured stream is abnormal when chrome 88-92 turns on hardware acceleration
 * @param {*} video 
 * @returns 
 */
var canvas;
let localStream;
var media = getStreamThroughCanvas(video)
zg.createZegoStream({
    custom: {
        video: {
            source: media
        },
        audio: {
            source: media
        }
    }
}).then(stream => {
    localStream = stream;
})
function destroy() {
    localStream && zg.destroyStream(localStream)
    localStream = null;
    if(canvas) {
        canvas.width = 0;
        canvas.remove();
        canvas = null;
    }
}
function getStreamThroughCanvas(video) {

    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const draw = function () {
        if(!canvas) return
        if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
        if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        setTimeout(draw, 66);
    };

    draw();

    const media = canvas.captureStream();

    // overwrite stop track function
    const track = media.getVideoTracks()[0];
    const q = track.stop;
    track.stop = () => {
        q.call(track);
        draw();
    };

    // get audio track
    const stream = video.captureStream && video.captureStream()
    if (stream instanceof MediaStream && stream.getAudioTracks().length) {
        const micro = stream.getAudioTracks()[0];
        media.addTrack(micro);
    }
    return media;
}
```
