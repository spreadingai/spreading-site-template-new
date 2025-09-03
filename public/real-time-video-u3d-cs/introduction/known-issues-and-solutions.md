# 已知问题及解决方案

- - -

## Unity 2022.3.17f1c1 版本非托管线程调用托管代码，存在必现的内存泄漏问题。

### 问题原因
使用 Xcode Instruments Allocations 测试发现，有大量的内存申请未释放，且都是原生 SDK 回调函数调用 c# 的托管代码，导致内存泄露。

<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/known_issues_and_solutions_u3d1.jpeg" /></Frame>

### 处理方式

Unity 官方在 [Unity 2022.3.29f1c1](https://unity.com/cn/releases/editor/whats-new/2022.3.29) 修复了该问题，但并未说明该问题是什么时候引入的，因此若出现该问题，请更新到 Unity 修复的版本。
<Frame width="512" height="auto" caption=""><img src="https://doc-media.zego.im/sdk-doc/Pics/Express/known_issues_and_solutions_u3d2.jpeg" /></Frame>
