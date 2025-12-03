# 说明

## 如何构建

构建使用 Coding 进行构建，构建完成后会自动上传制品库中。
- 工作日每天 12:00 及 18:00 自动构建一次
- 可手动点击 doc-zh-auto-build 及 doc-en-auto-build 的 “立即构建” 按钮进行构建

构建时会自动对比 git 是否有变更记录，如果无变更会自动跳过构建。

## 如何部署
服务器会自动检测制品变更自动部署，详情请查看：https://zegocloud.feishu.cn/wiki/PwvnwOLGriDBb9kFSSRcxKHwnDc


## 其他问题
构建内存溢出处理：
```bash
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```
