<Title>在加载动态 PPT 文件后，点击动态 PPT 无法翻页，该如何处理？</Title>



- - -

### 问题原因

没开启点击翻页的设置。

### 解决方案

以 web 平台为例：

```typescript
// 引入 ZegoExpressDocs SDK
import { ZegoExpressDocs } from 'zego-express-docsview-web';

/**
* 初始化 ZegoExpressDocs SDK
* @param appID: ZEGO 为开发者签发的应用 ID，请从 ZEGO 管理控制台申请
* @param token: token
* @param userID: userID
*/
const zegoExpressDocs = new ZegoExpressDocs({appID, token, userID});

/** 设置动态PPT步数切页模式
* 当设置 1 代表默认模式，正常上一步和下一步
* 当设置 2 代表在页中的第一步执行上一步时，不跳转，页中的最后一步执行下一步时，不跳转。
*/
zegoExpressDocs.setConfig('pptStepMode', 1);
```