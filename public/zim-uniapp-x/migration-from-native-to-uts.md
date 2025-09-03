# uni-app 项目从原生插件迁移至 UTS 插件开发指南

---

若要将现有的 uni-app 项目（当前使用原生语言插件）切换为使用 UTS 插件进行开发，请参考以下指引完成迁移。

<Steps>
<Step title="删除原生语言插件配置">
打开项目 `manifest.json` 文件，删除 `nativePlugins` 下 `zego-ZIMUniPlugin` 的配置。
</Step>
<Step title="导入 zego-zim-uts 插件">
详情请参考 [导入 SDK](/zim-uniapp-x/send-and-receive-messages#22-导入-sdk)。
</Step>
<Step title="修改 ZIM SDK 导入方式，并调整事件注册代码">
删除原生语言插件导入语句，添加 UTS 插件导入语句。

```typescript 修改导入方式
// 将旧有原生语言插件导入方式修改为 UTS 插入导入

// import ZIM from '../js_sdk/zego-ZIMUniplugin-JS/lib';

import { ZIM } from '@/uni_modules/zego-zim-uts';
```

ZIM uni-app x 的事件命名为 onXxxx，您需要对所有事件注册代码进行修改，以下代码块以 `onConnectionStateChanged` 为例。

```typescript 修改事件注册方式
// 修改事件注册方式

// zim.on('connectionStateChanged', (zim, data) => {
// });

zim.onConnectionStateChanged(data) => {
});
```
</Step>
</Steps>
