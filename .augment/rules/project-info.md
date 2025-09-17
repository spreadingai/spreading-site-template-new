---
type: "always_apply"
---

## 构建说明
项目使用pnpm构建
调试时docuo-site-template通过workspace指定本地依赖docuo-mdx-component
编译很慢，如果我不要求绝对不能编译
执行pnpm dev会很慢，所以我会启动好一个服务你直接访问就行，不要自行启动pnpm dev

## 调试说明
注意修改时特别是改动逻辑比较多时多打日志，如果是客户端日志你需要自己调用Playwright去打开页面查看
对于一般文档你可以访问http://localhost:3000/real-time-video-ios-oc/introduction/overview查看，这个对应packages/docuo-site-template/docs/core_products/real-time-voice-video/zh/ios-oc/introduction/overview.mdx这个文件

## 目录说明
### docuo-site-template
- 存放的是站点模板代码
- docs文件夹下文档内容，这个是在构建时实时从其他仓库拉下来的

### docuo-mdx-component
- 预定义的组件，被docuo-site-template使用