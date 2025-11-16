# 快速部署指南

## 🚀 快速开始

### 构建

```bash
# 中文版本
npm run build:zh

# 英文版本
npm run build:en
```

### 本地测试

```bash
cd .next/standalone
node server.js
```

访问：http://localhost:3000

### 部署到服务器

```bash
# 1. 压缩
cd .next
zip -r standalone.zip standalone/

# 2. 上传
scp standalone.zip user@server:/path/to/app/

# 3. 解压并启动
ssh user@server
cd /path/to/app
unzip standalone.zip
cd standalone
pm2 start server.js --name doc-site -i max
```

## 📦 构建产物说明

`.next/standalone/` 目录包含：

```
standalone/
├── server.js              # 服务器入口文件
├── node_modules/          # 最小化的依赖包
├── .next/                 # Next.js 构建产物
│   ├── static/           # 静态资源（已复制）
│   └── ...
├── public/               # 公共资源（已复制）
└── package.json
```

## 🔧 环境变量

在服务器上设置（可选）：

```bash
export NODE_ENV=production
export NEXT_PUBLIC_CUSTOM_DOMAIN=https://doc-zh.zego.im
export NEXT_PUBLIC_CONFIG_FILE=docuo.config.zh.json
```

## 📊 两个版本的区别

| 项目 | build:zh | build:en |
|------|----------|----------|
| 静态 MD | 中文 | 英文 |
| 配置文件 | docuo.config.zh.json | docuo.config.en.json |
| 目标用户 | 中文用户 | 英文用户 |

## ⚙️ 腾讯云动态加速配置要点

### 缓存规则

```
/_next/static/*  → 1年
*.js, *.css      → 7天
*.jpg, *.png     → 30天
HTML 页面        → 不缓存或5分钟
```

### 回源配置

- 回源协议：HTTP 或 HTTPS
- 回源 Host：源站 IP 或域名
- 回源端口：3000（或 Nginx 代理端口）

## 🔄 更新流程

```bash
# 1. 本地构建
npm run build:zh

# 2. 打包
cd .next
zip -r standalone.zip standalone/

# 3. 上传
scp standalone.zip user@server:/path/to/app/

# 4. 部署
ssh user@server
cd /path/to/app
unzip -o standalone.zip
pm2 restart doc-site
```

## 📝 详细文档

查看 [STANDALONE_DEPLOYMENT.md](./STANDALONE_DEPLOYMENT.md) 获取完整部署指南。

## ❓ 常见问题

### Q: 为什么选择 standalone 模式？

A:
- ✅ 最小化部署包体积
- ✅ 只包含运行时必需的依赖
- ✅ 适合容器化部署
- ✅ 启动速度快

### Q: public 和 .next/static 为什么要复制？

A:
- standalone 模式默认不复制这两个目录
- 采用动态加速方案，所有资源需要在同一个服务中
- 复制后 server.js 会自动提供这些静态文件

### Q: 如何验证构建是否成功？

A:
```bash
# 检查目录结构
ls -la .next/standalone/public
ls -la .next/standalone/.next/static

# 本地测试
cd .next/standalone
node server.js
# 访问 http://localhost:3000

# 或者打包后检查
cd .next
zip -r test.zip standalone/
unzip -l test.zip | head -30
```

### Q: 内存不足怎么办？

A:
```bash
# 构建时增加内存
NODE_OPTIONS="--max-old-space-size=8192" npm run build:zh

# 运行时增加内存
pm2 start server.js --node-args="--max-old-space-size=4096"
```

