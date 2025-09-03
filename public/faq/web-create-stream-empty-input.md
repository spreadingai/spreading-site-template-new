<Title>Web 平台调用 createStream 方法创建流，参数 “audioInput” 和 “videoInput” 可以传空串吗？</Title>



- - - 


* audioInput：音频输入设备，不传则为默认设备，选填。 
* videoInput：视频输入设备，不传则为默认设备，选填。

“audioInput” 和 “videoInput” 参数不传（整个参数都不用携带）则 SDK 会使用默认的设备，若传空串则会导致获取不到设备，可以写成 `audioInput: undefined` 、`videoInput:undefined` 。