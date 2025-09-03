# 设置动态文件的扬声器

- - -

## 功能简介
该文档展示了如何使用超级白板 SDK 设置动态文件音视频扬声器。

## 实现流程

### Dom 结构

```html
<div class="layui-form-item">
  <label class="layui-form-label" data-locale="speaker">扬声器设置</label>
  <div class="layui-input-inline">
    <select id="speaker" name="speaker" lay-filter="speaker">
    </select>
  </div>
</div>
```

### 1. 获取扬声器设备信息

参考以下示例代码，定义获取扬声器设备信息的函数 `getSpeakers`，扬声器设备信息包含 label 值。

```typescript
async function getSpeakers() {
    // 判断是否支持获取扬声器设备信息
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !navigator.mediaDevices.enumerateDevices){
        return Promise.resolve([]);
    };
    // 提示用户使用媒体输入的权限
    await navigator.mediaDevices.getUserMedia({audio:true});
    // 请求可用媒体输入和输出设备的列表，例如麦克风、相机、耳机等
    let devices = await navigator.mediaDevices.enumerateDevices();
    // 找出扬声器设备信息，包含 label 值
    let speakers = devices.filter(function (device) {
        return device.kind === 'audiooutput' && device.deviceId
    })
    // 把找到的信息 return 出去
    return Promise.resolve(speakers);
}
```

### 2. 把获取到的扬声器的 label 值渲染到 Dom 上

将获取到的扬声器信息中的 label 值赋值给 option 元素 value。 

```typescript
async function renderSpeakerHtml (){
    // 获取扬声器设备信息
    var speakers = await getSpeakers();
    // 没有获取到就不往下执行
    if(!speakers.length) return;
    // 清空之前 select 内 存在的子节点和内容
    $("#speaker").empty();
    // 把扬声器设备信息追加到 select 标签内
    for (let index = 0; index < speakers.length; index++) {
        var label = speakers[index].label.toString();
        $("#speaker").append("<option value='"+  label  +"'>"+ label +"</option>");
    }
}
```

### 3. 设置动态文件扬声器

首先，调用 [getInstance](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#get-instance) 获取超级白板实例。随后，调用 [getCurrentSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardView#get-current-super-board-sub-view) 获取当前展示 superBoardSubView。最后，调用 [switchSpeaker](https://doc-zh.zego.im/) 切换动态文件中的扬声器。

```typescript
// 获取超级白板实例
let zegoSuperBoard = ZegoSuperBoardManager.getInstance();

async function switchSpeaker() {
    if (!zegoSuperBoard) return;
    let value = document.getElementById('speaker').value;
    // 需要 superBoardSubView 存在时调用
    var zegoSuperBoardSubView = zegoSuperBoard.getSuperBoardView().getCurrentSuperBoardSubView();
    if(value && zegoSuperBoardSubView){
        // 切换扬声器
        let res = await zegoSuperBoardSubView.switchSpeaker(value).catch((err)=>{
            console.log('atag switchSpeaker-catch', err)
        });
    }
}
```

### 4. 处理 select 元素的 change 事件

如果想要实现手动下拉切换扬声器，你需要处理 select 元素的 change 事件。

```typescript
// 处理下拉选择扬声器
$("#speaker").change(function () {
    switchSpeaker();
})
```

## 注意事项

如果需要在设置扬声器之后，在创建文件或切换文件中生效此前设置的扬声器，则需要如下操作：
- 在 [createFileView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardManager#create-file-view)之后调用 [switchSpeaker](https://doc-zh.zego.im/)。
- 在 [switchSuperBoardSubView](https://doc-zh.zego.im/article/api?doc=superboard_API~javascript_electron~class~ZegoSuperBoardView#switch-super-board-sub-view) 成功之后调用 [switchSpeaker](https://doc-zh.zego.im/)。

<Content />