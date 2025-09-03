<Title>Web 平台通过 “createStream” 方法创建了流，并已给 video 对象的 “srcObject” 赋值，为什么 video 对象没有画面？</Title>



- - -

可以通过如下两种方式处理：

* 需要给 video 对象设置 “autoplay” 属性才会自动播放。 
* 可以给 video 对象设置 “controls” 属性，用户再通过手动方式点击播放控件来进行播放。

<Note title="说明">
  

“autoplay” 属性在 iOS 的 Safari 浏览器无效，需要使用第二种方式处理。

</Note>


