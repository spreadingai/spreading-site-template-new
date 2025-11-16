#!/bin/bash

###############################################################################
# Standalone 构建脚本
# 功能：
# 1. 生成静态 MD 文件
# 2. 构建 Next.js 项目
# 3. 复制 public 和 .next/static 到 standalone 目录
###############################################################################

set -e  # 遇到错误立即退出

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取语言参数，默认为 zh
LOCALE=${1:-zh}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}开始构建 Standalone 部署包 (${LOCALE})${NC}"
echo -e "${BLUE}========================================${NC}"

# 1. 生成静态 MD 文件
echo -e "${YELLOW}[1/4] 生成静态 MD 文件 (${LOCALE})...${NC}"
node scripts/generate-static-md.js --locale ${LOCALE} --clean

if [ $? -ne 0 ]; then
    echo -e "${RED}生成静态 MD 文件失败！${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 静态 MD 文件生成完成${NC}"

# 2. 构建 Next.js 项目
echo -e "${YELLOW}[2/4] 构建 Next.js 项目...${NC}"
NODE_OPTIONS="--max-old-space-size=8192" npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败！${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Next.js 构建完成${NC}"

# 3. 复制 public 目录到 standalone
echo -e "${YELLOW}[3/4] 复制 public 目录到 standalone...${NC}"

if [ -d "public" ]; then
    cp -r public .next/standalone/
    echo -e "${GREEN}✓ public 目录复制完成${NC}"
else
    echo -e "${YELLOW}⚠ public 目录不存在，跳过${NC}"
fi

# 4. 复制 .next/static 到 standalone/.next/
echo -e "${YELLOW}[4/4] 复制 .next/static 到 standalone...${NC}"

if [ -d ".next/static" ]; then
    mkdir -p .next/standalone/.next
    cp -r .next/static .next/standalone/.next/
    echo -e "${GREEN}✓ .next/static 目录复制完成${NC}"
else
    echo -e "${YELLOW}⚠ .next/static 目录不存在，跳过${NC}"
fi

# 输出构建信息
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Standalone 构建完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "语言版本: ${LOCALE}"
echo -e "输出目录: .next/standalone"
echo -e "包含内容:"
echo -e "  - server.js (服务器入口)"
echo -e "  - node_modules (最小化依赖)"
echo -e "  - .next (构建产物)"
echo -e "  - public (静态资源)"
echo -e ""
echo -e "${YELLOW}启动方式：${NC}"
echo -e "  cd .next/standalone"
echo -e "  node server.js"
echo -e ""
echo -e "${YELLOW}或使用 PM2：${NC}"
echo -e "  pm2 start .next/standalone/server.js --name doc-site-${LOCALE}"

