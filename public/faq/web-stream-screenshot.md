<Title>Web 平台如何实现对预览、拉流画面进行截图？</Title>



- - -

在 Web 平台，使用 “video” 标签对预览、拉流画面进行渲染时，开发者可通过下述方式实现截图功能：
1. 成功预览/拉流后，先通过 canvas 对象的 “drawImage” 方法，将对应video对象的数据绘制到 canvas；
2. 绘制完成后，再通过 canvas 的 “toDataURl” 方法，把图像转换为 base64 编码的 url；
3. 通过上述 url，开发者即可获取相应截图。
