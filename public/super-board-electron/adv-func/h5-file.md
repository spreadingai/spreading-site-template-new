# H5 文件的制作与使用

- - -

## 导读
---
### 简介

H5 文件是指由开发者制作的用于多端共享的 HTML5 页面，是 ZegoSuperBoard SDK 支持的一种新的文件类型。开发者可以在 H5 文件中添加类似于动态 PPT 中的翻页、跳步、动画触发器、音视频等功能。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/WhiteboardView/superboard_h5.gif" /></Frame>

### 概念解释
- ZEGO 桥接层：用于 H5 文件与 ZegoSuperBoard SDK 交互的桥梁，只有在 H5 文件中引入了 ZEGO 桥接层，才能与 ZegoSuperBoard SDK 进行通信，从而达到多端互通。
- ZEGOBridge：ZEGO 桥接层注入在全局的一个对象，H5 文件在引入桥接层后，可以读取到这个对象，通过这个对象获取到 ZEGOBridge 的唯一实例。
- Bridge：ZEGOBridge 的唯一实例，这个实例中包含了 H5 文件需要用到的所有方法。
- 操作记录：H5 文件内执行的除翻页、跳步以外的其他操作均称为一条操作记录，该操作记录是与页绑定的，即某页下的操作记录。
- 操作记录列表：某页所有操作记录组成的集合，在页数变更时，内部会自动清空该列表，H5 文件的所有除翻页、跳步外的行为都依赖该列表执行。

### 文档说明
本文将通过 H5 文件的制作和使用两个部分来介绍：

- H5 文件的制作：从集成 ZEGO 桥接层开始到与 ZEGO 桥接层进行交互。
- H5 文件的使用：从 ZegoSuperBoard SDK 上传到后续多端互通。

## 示例源码下载

- ZEGO 提供了制作完成的 H5 文件供开发者参考，包含集成 ZEGO 桥接层以及接口使用方法，详情请参考 [H5 文件示例源码](https://artifact-demo.zego.im/docs/web/demo/zego_h5_demo.zip)。

- 在 ZegoDocsView SDK 中使用 H5 文件的完整示例源码请参考 [跑通示例源码](/super-board-electron/quick-start/run-demo)。


## 交互时序图

本时序图描述了开发者制作 H5 文件时，H5 文件通过 ZEGO 桥接层和 ZegoSuperBoard SDK 的交互流程。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/docsview/H5_Sequence.png" /></Frame>

## 制作步骤

H5 文件的制作，即如何集成并与 ZEGO 桥接层交互，分为以下 5 个步骤，开发者请确保遵循以下步骤。

### 引入 ZEGO 桥接层

在 H5 文件中引入 ZEGO 桥接层。开发者需要保证在使用桥接层方法时该 H5 资源已加载完成。

<Warning title="注意">

ZEGOBridge 是单例模式，一个页面中只能存在一个 Bridge 实例，只有引入了桥接层才能使用相关方法。

</Warning>

桥接层文件地址如下：
```bash
https://doc-media.zego.im/public/ZEGOBridge.js
```
引入代码示例：
```html
<script src="https://doc-media.zego.im/public/ZEGOBridge.js"></script>
```
### 注册回调

调用 getInstance 注册相关回调并获取桥接层的唯一实例。

<Warning title="注意">

为达到多端互通的效果，H5 文件中需要执行的所有业务操作都必须先调用桥接层接口，然后在对应回调中执行。

</Warning>

```typescript
// 获取唯一实例
const bridge = ZEGOBridge.getInstance({
    // 注册翻页、跳步回调
    onPageChange: function (params) {
        // 需要在此回调函数中返回一个 Promise 对象，用于通知桥接层当前翻页、跳步任务已执行完成
        return new Promise(resolve => {
            // 执行具体的翻页、跳步逻辑
            // 具体业务逻辑
            resolve();
        });
    },
    // 注册操作记录回调
    onRecordChange: function (params)
    {
        // 需要在此回调函数中返回一个 Promise 对象，用于通知桥接层当前操作任务已执行完成
        return new Promise(resolve => {
            // recordList 表示当前操作记录列表
            // oldRecordList 上一次的操作记录列表
            // recordType 产生当前操作记录列表的操作类型，可根据此类型实现具体的业务
            const { recordList, oldRecordList, recordType } = params;
            // 根据 recordType、recordList、oldRecordList 来执行具体业务逻辑
            resolve();
        });
    },
    // 注册错误回调，可选
    onError: function (params) {
        // 具体业务逻辑
    }
});

```

### 传入页面初始信息

调用 getReady，通知桥接层页面准备就绪，并传入初始页数、步数、总页数、当前页总步数等信息。

<Warning title="注意">

 其他接口必须要在调用 getReady 后调用才会生效。

</Warning>

```typescript
// 传入初始页数、步数、总页数、所有页对应总步数
bridge.getReady({
    page: 1, // 初始页数为 1
    step: 1, // 当前页初始步数为 1
    pageCount: 3, // 总页数为 3
    maxSteps: [ 5, 3, 1 ] // 总共有 3 页，每页总步数分别为5、3、1
})
```

### 翻页/跳步
调用 requestChangePage 通知桥接层当前需要翻页、跳步。

<Warning title="注意">
这里只是发送翻页、跳步请求，并不代表请求成功，具体操作请在注册的 onPageChange 回调中执行。
</Warning>

```typescript
// 请求跳转到第 3 页、第 1 步
bridge.requestChangePage(3, 1);

```

### 其它操作

调用其他相关接口通知桥接层当前需要执行其它操作。

<Warning title="注意">

这里只是发送操作请求，并不代表请求成功，具体操作请在注册的 onRecordChange 回调中执行。所有操作记录列表的更新都会在 onRecordChange 回调参数中体现。

</Warning>

```typescript
// 此时追加一条当前页内容为 id 的记录
bridge.pushRecord({ id: 'ZEGO' })

// 移除最近一次操作记录
bridge.popRecord()

// 清空当前页操作记录
bridge.clearRecordStack()

// 使用内容为 name 的记录替换当前页所有操作记录
bridge.replaceRecordStack({ name: 'ZEGO' })
```

## 使用步骤
H5 文件制作成功后，想要实现多端互通，请参考[快速开始 - 创建文件白板](/super-board-electron/quick-start/create-white-board)，在项目中集成 ZegoSuperView SDK，实现 H5 文件上传和多端同步显示。

## 文件制作和使用规范

H5 文件制作及使用规范请参考 [H5 文件规范](/super-board-electron/product-desc/use-restrictions/filerule#h5-文件)。

## H5 桥接层 API

<Accordion title="以下介绍 H5 桥接层 API。" defaultOpen="true">

<Steps>
<Step title="获取桥接层的唯一实例">
```typescript
// 步数、页数变更回调参数
interface OnPageChangeParams {
    page: number; // 当前页数，从 1 开始
    step: number; // 当前步数，从 1 开始
    oldPage: number; // 原页数，从 1 开始
    oldStep: number; // 原步数，从 1 开始
    taskID: string; // 任务ID
}

// 操作记录类型
enum RecordType {
    Push = 1, // 追加，对应于 pushRecord 接口
    Pop, // 移除最新一个，对应于 popRecord 接口
    Replace, // 全量替换，对应于 replaceRecordStack 接口
    Clear, // 清空，对应于 clearRecordStack 接口
    Stop = 100, // 停止音视频的场景
    LateJoinRoom = 101, // 后进房场景
    Back = 102 // 操作失败回退场景
}

// 操作记录列表变更回调参数
interface OnRecordChangeParams {
    recordList?: any[]; // 当前操作列表，recordType = 100 时不存在
    oldRecordList?: any[]; // 原操作列表，recordType = 100 时不存在
    taskID: string; // 任务ID
    recordType: RecordType; // 操作记录类型
    push: boolean; // 当前操作是否是远端推送
}

// 失败回调参数
interface OnErrorParams {
    code: number; // 错误码
    msg: string; // 错误描述
    data?: any; // 业务参数
    error?: Error; // 错误堆栈
}

// 步数、页数变更回调
type pageChangeCallback = (params: OnPageChangeParams) => Promise<any>;

// 操作记录变更回调
type recordChangeCallback = (params: OnRecordChangeParams) => Promise<any>;

// 错误回调
type errorCallback = (params: OnErrorParams) => void;

// 获取实例需要传入的参数
interface BridgeOptions {
    onPageChange: pageChangeCallback; // 页数、步数变更回调
    onRecordChange: recordChangeCallback; // 记录变更回调
    onError?: errorCallback; // 错误回调，可选
}

// 获取 ZEGOBridge 单例
static getInstance(options: BridgeOptions): Bridge;

```

</Step>
<Step title="通知桥接层文件准备就绪">

```typescript
// 页面初始数据
interface InitData {
    page: number; // 文件初始所在页数，从 1 开始
    step: number; // 文件初始当前页所在步数，从 1 开始
    pageCount: number; // 文件总页数
    maxSteps: number[]; // 文件所有页对应总步数
}

/**
 * 通知桥接层页面准备就绪
 *
 * 调用时机：引入脚本成功，页面准备就绪，可以进行多端同步的时候
 *
 * note：一般情况下可在 页面 load 的事件回调中调用
 *
 * @param data 页面初始数据
 */
getReady(data: InitData): void

```

</Step>
<Step title="请求翻页/跳步">
```typescript
/**
 * 发送翻页、跳步请求
 *
 * 调用时机：页面准备就绪，getReady 调用完成后，需要翻页、跳步的时候
 *
 * note：这里只是发送翻页、跳步请求，并不代表请求成功，具体操作请在 onPageChange 回调中执行
 *
 * @param page 目标页数
 *
 * @param step 目标步数，选填，不填默认为 1，表示跳转到当前页第一步
 *
 * @return 请求任务ID，唯一标识
 */
requestChangePage(page: number, step?: number): string

```

</Step>
<Step title="请求执行其它操作">

ZEGOBridge 提供了 4 个接口来组合页面的操作，所有接口都用来更新当前页的操作记录列表 recordList。H5 文件需要保证组合调用后 recordList 不能超过 ZEGO 桥接层的最大长度限制，超过限制，桥接层会在 onError 回调中抛出，当前的一次操作请求会无效。

<Warning title="注意">

最大长度计算规则：recordList 转换为 base64 后的字节数不能超过 948 字节。
</Warning>


</Step>
<Step title="追加一条当前页的操作记录">

```typescript
/**
 * 追加一条操作记录
 *
 * 调用时机：页面准备就绪，getReady 调用完成后，需要追加操作的时候
 *
 * note：这里只是发送请求，并不代表请求成功，具体操作请在 onRecordChange 回调中执行
 *
 * note：如果开发者需要关注操作历史记录，请使用该方法
 *
 * @param record 操作记录
 *
 * @return 请求任务ID，唯一标识
 */
pushRecord(record: string | number | Array<any> | object | boolean | null): string

```

</Step>
<Step title="移除最近一次操作记录">

```typescript
/**
 * 移除最近一次操作记录
 *
 * 调用时机：页面准备就绪，getReady 调用完成后，需要移除最近一次操作记录的时候
 *
 * note：这里只是发送请求，并不代表请求成功，具体操作请在 onRecordChange 回调中执行
 *
 * @return 请求任务ID，唯一标识和最近一次操作记录
 */
popRecord(): { taskID: string; record: string | number | Array<any> | object | boolean | null }

```

</Step>
<Step title="清空当前页操作记录">

```typescript
/**
 * 清空当前页操作记录
 *
 * 调用时机：页面准备就绪，getReady 调用完成后，需要清空当前页操作记录的时候
 *
 * note：这里只是发送请求，并不代表请求成功，具体操作请在 onRecordChange 回调中执行
 *
 * note：每当页数变更时，脚本内部已将操作记录清空，正常情况下开发者无需用到此方法
 *
 * @param record 操作记录
 *
 * @return 请求任务ID，唯一标识
 */
clearRecordStack(): string

```

</Step>
<Step title="全量替换当前页的操作记录列表">
```typescript
/**
 * 替换当前页操作记录
 *
 * 调用时机：页面准备就绪，getReady 调用完成后，需要替换当前页操作记录的时候
 *
 * note：这里只是发送请求，并不代表请求成功，具体操作请在 onRecordChange 回调中执行
 *
 * note：全量替换当前的操作记录列表，如果开发者不需要关注操作历史记录，请使该方法
 *
 * @param record 操作记录
 *
 * @return 请求任务ID，唯一标识
 */
replaceRecordStack(record: string | number | Array<any> | object | boolean | null): string

```

</Step>

</Steps>

</Accordion>

## H5 桥接层错误码
H5 桥接层错误码请参考 [常见错误码](/super-board-electron/error-code)。

<Content />