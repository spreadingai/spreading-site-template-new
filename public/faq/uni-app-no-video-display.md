<Title>在 uni-app 平台上，本地预览、拉流，均无画面显示，该如何处理？</Title>



- - -

请注意，ZEGO uni-app SDK 在推拉流过程中，视频相关的画面是基于原生 view 进行渲染的，只能使用 nvue（通过 weex 原生渲染），不能使用 vue（通过 WebView 渲染）。
