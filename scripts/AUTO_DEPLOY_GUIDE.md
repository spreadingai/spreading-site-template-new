# 自动部署指南

## 概述

本方案采用**定时轮询模式**实现自动部署，无需配置复杂的网络，适合通过跳板机访问的服务器环境。

## 工作流程

```
1. Coding CI 定时触发
   ↓
2. 检查代码是否有变化（通过 GitHub API 获取最新 commit hash）
   ├─ 有变化 → 继续构建
   └─ 无变化 → 跳过构建（不发送通知）
   ↓
3. 构建完成，上传制品到制品库
   ↓
4. 上传 latest-version-{lang}.txt 文件
   ↓
5. 上传 build-hashes-{lang}.txt 文件（记录本次构建的 commit hash）
   ↓
6. 发送飞书构建成功通知
   ↓
7. 部署服务器定时检查（每 5 分钟）
   ↓
8. 发现新版本，自动下载并部署
   ↓
9. 发送飞书部署成功/失败通知
```

## 部署步骤

### 1. 在部署服务器上准备文件

将以下文件上传到服务器（例如 `/data/webroot/`）：

```bash
/data/webroot/
├── docuo-deploy-upgrade.sh      # 升级脚本
├── auto-deploy-agent.sh         # 自动部署代理
└── deploy-config.sh             # 配置文件
```

### 2. 创建配置文件

复制配置模板并修改：

```bash
cd /data/webroot
cp deploy-config.sh.example deploy-config.sh
vim deploy-config.sh
```

**中文服务器配置示例：**

```bash
LANG=zh
ARTIFACT_BASE_URL=https://artifact-master.zego.cloud/generic/better_dev/public
WEBROOT=/data/webroot
DEPLOY_SCRIPT=/data/webroot/docuo-deploy-upgrade.sh
DOC_URL=https://doc-zh.zego.im/
FEISHU_BOT_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx
```

**英文服务器配置示例：**

```bash
LANG=en
ARTIFACT_BASE_URL=https://artifact-master.zego.cloud/generic/better_dev/public
WEBROOT=/data/webroot
DEPLOY_SCRIPT=/data/webroot/docuo-deploy-upgrade.sh
DOC_URL=https://www.zegocloud.com/docs
FEISHU_BOT_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx
```

### 3. 设置脚本权限

```bash
chmod +x /data/webroot/docuo-deploy-upgrade.sh
chmod +x /data/webroot/auto-deploy-agent.sh
```

### 4. 测试自动部署脚本

手动运行一次，确保配置正确：

```bash
/data/webroot/auto-deploy-agent.sh
```

查看输出，确认：
- ✅ 能够下载 latest-version 文件
- ✅ 能够执行部署脚本
- ✅ 能够发送飞书通知（如果配置了）

### 5. 添加到 Crontab

设置每 5 分钟检查一次：

```bash
crontab -e
```

添加以下行：

```bash
# 自动部署 Docuo 文档系统
# 注意：脚本会自动初始化 nvm 环境并切换到 Node.js v20.12.1
*/5 * * * * /data/webroot/auto-deploy-agent.sh >> /var/log/docuo-deploy.log 2>&1
```

**重要说明**：
- 脚本会自动加载 nvm 环境并切换到 Node.js v20.12.1
- 如果部署失败，会记录失败的版本号，避免重复尝试部署同一个失败的版本
- 失败版本记录在 `/data/webroot/.failed-version-{lang}` 文件中

### 6. 验证 Crontab

```bash
# 查看 crontab 配置
crontab -l

# 查看部署日志
tail -f /var/log/docuo-deploy.log
```

## Coding CI 配置

### 代码变化检测

Jenkins 会在每次构建前自动检查代码是否有变化：

1. **通过 GitHub API 获取最新 commit hash**
   - `spreading-site-template-new` (coding 分支)
   - `docs_all` (main 分支)
   - 使用 GitHub REST API: `GET /repos/{owner}/{repo}/branches/{branch}`
   - 支持认证（推荐）和未认证模式

2. **下载上次构建记录**
   - 文件名：`build-hashes-{lang}.txt`（中英文分开）
   - 内容格式：
     ```
     spreading-site-template-new=abc123...
     docs_all=def456...
     ```

3. **对比 hash**
   - 任意仓库有变化 → 继续构建
   - 两个仓库都没变化 → 跳过构建（不发送通知）

4. **构建成功后上传新的 hash 记录**
   - 供下次构建时对比使用

#### GitHub API 认证（可选但推荐）

**为什么需要认证？**
- 未认证请求：每小时 60 次
- 认证请求：每小时 5000 次

**如何配置：**

1. **创建 GitHub Personal Access Token (PAT)**
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 设置名称：`Coding CI - Docuo Build`
   - 权限：只需勾选 `public_repo`（访问公开仓库）
   - 生成并复制 token（只显示一次）

2. **在 Coding CI 配置环境变量**
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

3. **无需修改代码**
   - Jenkinsfile 会自动检测 `GITHUB_TOKEN` 环境变量
   - 如果存在，自动添加认证头
   - 如果不存在，使用未认证模式（每小时 60 次足够）

### 环境变量配置

在 Coding CI 任务中配置以下环境变量：

**中文任务（Job ID: 75615）：**
```
LANG=zh
NEXT_PUBLIC_CUSTOM_DOMAIN=https://doc-zh.zego.im
FEISHU_BOT_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx
```

**英文任务（Job ID: 75614）：**
```
LANG=en
NEXT_PUBLIC_CUSTOM_DOMAIN=https://www.zegocloud.com/docs
FEISHU_BOT_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx
```

## 飞书通知

### 构建通知

**成功通知：**
```
中文构建成功
构建地址：http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75615
版本号：20250117-1430_123
```

**失败通知：**
```
中文构建失败
构建地址：http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75615
失败阶段：构建 Standalone
```

### 部署通知

**成功通知：**
```
中文部署成功
主机名：doc-server-01
访问链接：https://doc-zh.zego.im/
版本号：20250117-1430_123
```

**失败通知：**
```
中文部署失败
主机名：doc-server-01
访问链接：https://doc-zh.zego.im/
版本号：20250117-1430_123
请检查日志：/var/log/docuo-deploy.log
```

## 目录结构

```
/data/webroot/
├── docuo-docs-zh -> docuo_releases/docuo-docs-zh-20250117-1430_123  # 软链接
├── docuo_releases/                                                   # 版本目录
│   ├── docuo-docs-zh-20250117-1430_123/
│   ├── docuo-docs-zh-20250117-1400_122/
│   └── ...（最多保留 10 个版本）
├── tmp/                                                              # 临时下载目录
├── .current-version-zh                                               # 当前部署版本
├── .failed-version-zh                                                # 失败版本记录（如果有）
├── docuo-deploy-upgrade.sh                                           # 升级脚本
├── auto-deploy-agent.sh                                              # 自动部署代理
└── deploy-config.sh                                                  # 配置文件
```

## 常见问题

### 1. 如何暂停自动部署？

```bash
# 注释掉 crontab 中的任务
crontab -e
# 在任务行前加 #

# 或者直接删除 crontab 任务
crontab -r
```

### 2. 如何手动触发部署？

```bash
# 直接运行自动部署脚本
/data/webroot/auto-deploy-agent.sh

# 或者直接运行升级脚本
/data/webroot/docuo-deploy-upgrade.sh -l zh -v latest
```

### 3. 部署失败后如何重新部署？

如果某个版本部署失败，系统会自动记录失败版本号，避免重复尝试。

**查看失败版本记录**：
```bash
# 中文版本
cat /data/webroot/.failed-version-zh

# 英文版本
cat /data/webroot/.failed-version-en
```

**重新部署失败的版本**：
```bash
# 删除失败版本记录
rm /data/webroot/.failed-version-zh

# 等待下次 crontab 执行（最多 5 分钟）
# 或者手动触发
/data/webroot/auto-deploy-agent.sh
```

### 4. 如何查看部署日志？

```bash
# 实时查看
tail -f /var/log/docuo-deploy.log

# 查看最近 100 行
tail -n 100 /var/log/docuo-deploy.log

# 搜索错误
grep ERROR /var/log/docuo-deploy.log
```

### 4. 如何回滚到旧版本？

```bash
# 查看可用版本
ls -l /data/webroot/docuo_releases/

# 回滚到指定版本
/data/webroot/docuo-deploy-upgrade.sh -l zh -v 20250117-1400_122
```

### 5. 部署失败如何排查？

1. 查看部署日志：`tail -f /var/log/docuo-deploy.log`
2. 检查网络连接：`curl -I https://artifact-master.zego.cloud`
3. 检查磁盘空间：`df -h`
4. 检查 PM2 状态：`pm2 list`
5. 手动运行升级脚本查看详细错误

## 优势

✅ **简单可靠**：不需要配置复杂的网络
✅ **易于维护**：出问题容易排查
✅ **支持多台服务器**：每台服务器独立运行
✅ **支持跳板机**：服务器只需要能访问外网制品库
✅ **可控性强**：可以随时暂停/启动自动部署
✅ **失败重试**：下次轮询会自动重试
✅ **版本管理**：自动保留最新 10 个版本，支持快速回滚
✅ **实时通知**：通过飞书机器人实时通知构建和部署状态

