#!/bin/bash

# 自动部署代理脚本
# 定时检查制品库是否有新版本，如果有则自动部署
# 使用方式：
#   1. 配置 deploy-config.sh 文件
#   2. 添加到 crontab: */5 * * * * /path/to/auto-deploy-agent.sh >> /var/log/docuo-deploy.log 2>&1

set -e

# 初始化 nvm 环境（crontab 执行时需要）
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    # 切换到指定的 Node.js 版本
    nvm use v20.12.1 > /dev/null 2>&1 || {
        echo "警告: 无法切换到 Node.js v20.12.1，使用当前版本"
    }
fi

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/deploy-config.sh"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] [INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] [WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR]${NC} $1"
}

log_debug() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] [DEBUG]${NC} $1"
}

# 发送飞书通知
send_feishu_notification() {
    local title="$1"
    local content="$2"

    if [ -z "$FEISHU_BOT_URL" ]; then
        log_warn "未配置 FEISHU_BOT_URL，跳过飞书通知"
        return
    fi

    log_info "发送飞书通知: $title"

    curl -X POST "$FEISHU_BOT_URL" \
      -H 'Content-Type: application/json' \
      -d "{
        \"msg_type\": \"text\",
        \"content\": {
          \"text\": \"${title}\\n${content}\"
        }
      }" 2>/dev/null || log_warn "飞书通知发送失败"
}

# 检查配置文件
if [ ! -f "$CONFIG_FILE" ]; then
    log_error "配置文件不存在: $CONFIG_FILE"
    log_error "请创建配置文件并设置以下变量："
    log_error "  LANG=zh                    # 语言：zh 或 en"
    log_error "  ARTIFACT_BASE_URL=https://artifact-master.zego.cloud/generic/better_dev/public"
    log_error "  WEBROOT=/data/webroot      # 部署根目录"
    log_error "  DEPLOY_SCRIPT=/path/to/docuo-deploy-upgrade.sh  # 部署脚本路径"
    log_error "  FEISHU_BOT_URL=https://...  # 飞书机器人 Webhook 地址（可选）"
    log_error "  DOC_URL=https://doc-zh.zego.im/  # 文档访问地址"
    exit 1
fi

# 加载配置
source "$CONFIG_FILE"

# 验证必需配置
if [ -z "$LANG" ]; then
    log_error "配置文件中未设置 LANG"
    exit 1
fi

if [ -z "$ARTIFACT_BASE_URL" ]; then
    log_error "配置文件中未设置 ARTIFACT_BASE_URL"
    exit 1
fi

if [ -z "$WEBROOT" ]; then
    log_error "配置文件中未设置 WEBROOT"
    exit 1
fi

if [ -z "$DEPLOY_SCRIPT" ]; then
    log_error "配置文件中未设置 DEPLOY_SCRIPT"
    exit 1
fi

if [ -z "$DOC_URL" ]; then
    log_error "配置文件中未设置 DOC_URL"
    exit 1
fi

# 检查部署脚本是否存在
if [ ! -f "$DEPLOY_SCRIPT" ]; then
    log_error "部署脚本不存在: $DEPLOY_SCRIPT"
    exit 1
fi

# 配置
LANG_NAME=$([ "$LANG" = "zh" ] && echo "中文" || echo "英文")
LATEST_VERSION_URL="${ARTIFACT_BASE_URL}/latest-version-${LANG}.txt?version=latest"
CURRENT_VERSION_FILE="${WEBROOT}/.current-version-${LANG}"
FAILED_VERSION_FILE="${WEBROOT}/.failed-version-${LANG}"
LOCK_FILE="/tmp/docuo-deploy-${LANG}.lock"

log_info "========================================="
log_info "开始检查 ${LANG_NAME} 版本更新"
log_info "========================================="

# 检查是否有部署正在进行
if [ -f "$LOCK_FILE" ]; then
    LOCK_PID=$(cat "$LOCK_FILE")
    if ps -p "$LOCK_PID" > /dev/null 2>&1; then
        log_warn "部署正在进行中 (PID: $LOCK_PID)，跳过本次检查"
        exit 0
    else
        log_warn "发现过期的锁文件，清理中..."
        rm -f "$LOCK_FILE"
    fi
fi

# 下载最新版本号
log_debug "下载最新版本信息: $LATEST_VERSION_URL"
LATEST_VERSION=$(curl -s -L -f "$LATEST_VERSION_URL" | tr -d '[:space:]')

if [ -z "$LATEST_VERSION" ]; then
    log_error "无法获取最新版本号"
    exit 1
fi

log_info "制品库最新版本: $LATEST_VERSION"

# 读取当前版本
CURRENT_VERSION=""
if [ -f "$CURRENT_VERSION_FILE" ]; then
    CURRENT_VERSION=$(cat "$CURRENT_VERSION_FILE" | tr -d '[:space:]')
    log_info "当前部署版本: $CURRENT_VERSION"
else
    log_warn "未找到当前版本文件，这可能是首次部署"
fi

# 比较版本
if [ "$LATEST_VERSION" = "$CURRENT_VERSION" ]; then
    log_info "已是最新版本，无需更新"
    exit 0
fi

# 检查是否是之前部署失败的版本
FAILED_VERSION=""
if [ -f "$FAILED_VERSION_FILE" ]; then
    FAILED_VERSION=$(cat "$FAILED_VERSION_FILE" | tr -d '[:space:]')
    if [ "$LATEST_VERSION" = "$FAILED_VERSION" ]; then
        log_warn "版本 $LATEST_VERSION 之前部署失败过，跳过本次部署"
        log_warn "如需重新部署此版本，请删除文件: $FAILED_VERSION_FILE"
        exit 0
    fi
fi

log_info "发现新版本，准备部署..."
log_info "  当前版本: ${CURRENT_VERSION:-无}"
log_info "  最新版本: $LATEST_VERSION"

# 创建锁文件
echo $$ > "$LOCK_FILE"

# 清理锁文件的函数
cleanup() {
    rm -f "$LOCK_FILE"
}
trap cleanup EXIT

# 执行部署
log_info "开始执行部署脚本..."
HOSTNAME=$(hostname)

if bash "$DEPLOY_SCRIPT" -l "$LANG" -v "$LATEST_VERSION"; then
    log_info "部署成功！"

    # 更新当前版本文件
    echo "$LATEST_VERSION" > "$CURRENT_VERSION_FILE"

    # 清除失败版本记录（如果存在）
    if [ -f "$FAILED_VERSION_FILE" ]; then
        rm -f "$FAILED_VERSION_FILE"
        log_debug "已清除失败版本记录"
    fi

    # 发送成功通知
    send_feishu_notification \
        "🚀 ${LANG_NAME}部署成功" \
        "主机名：${HOSTNAME}\n访问链接：${DOC_URL}\n版本号：${LATEST_VERSION}"

    log_info "========================================="
    log_info "部署完成"
    log_info "========================================="
    exit 0
else
    log_error "部署失败！"

    # 记录失败的版本号，避免重复尝试
    echo "$LATEST_VERSION" > "$FAILED_VERSION_FILE"
    log_warn "已记录失败版本: $LATEST_VERSION"
    log_warn "如需重新部署此版本，请删除文件: $FAILED_VERSION_FILE"

    # 发送失败通知
    send_feishu_notification \
        "💥 ${LANG_NAME}部署失败" \
        "主机名：${HOSTNAME}\n访问链接：${DOC_URL}\n版本号：${LATEST_VERSION}\n请检查日志：/var/log/docuo-deploy.log"

    log_info "========================================="
    log_info "部署失败"
    log_info "========================================="
    exit 1
fi

