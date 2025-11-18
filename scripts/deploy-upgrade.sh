#!/bin/bash

# 文档系统升级脚本 - 蓝绿部署方式
# 使用方式：
#   交互模式：./deploy-upgrade.sh
#   命令行模式：./deploy-upgrade.sh -l zh -v 20250117-1430_123

set -e

# 初始化 nvm 环境（支持 crontab 和手动执行）
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    # 切换到指定的 Node.js 版本
    nvm use v20.12.1 > /dev/null 2>&1 || {
        echo "警告: 无法切换到 Node.js v20.12.1，使用当前版本"
    }
fi

# 配置
WEBROOT="/data/webroot"
RELEASES_DIR="${WEBROOT}/docuo_releases"
ARTIFACT_BASE_URL="https://artifact-master.zego.cloud/generic/better_dev/public"
MAX_VERSIONS=10

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 解析命令行参数
LANG=""
VERSION=""

while getopts "l:v:h" opt; do
  case $opt in
    l) LANG="$OPTARG" ;;
    v) VERSION="$OPTARG" ;;
    h)
      echo "使用方式: $0 [-l language] [-v version]"
      echo "  -l  语言 (zh 或 en)"
      echo "  -v  版本号"
      echo "  -h  显示帮助"
      exit 0
      ;;
    \?)
      log_error "无效的选项: -$OPTARG"
      exit 1
      ;;
  esac
done

# 获取已安装的版本列表
get_installed_versions() {
    local lang=$1
    if [ -d "${RELEASES_DIR}" ]; then
        ls -1 "${RELEASES_DIR}" 2>/dev/null | grep "^docuo-docs-${lang}-" | sed "s/^docuo-docs-${lang}-//" | sort -r
    fi
}

# 交互式选择语言
if [ -z "$LANG" ]; then
    echo ""
    echo "请选择语言："
    echo "  1) zh (中文)"
    echo "  2) en (英文)"
    read -p "请输入选项 [1-2]: " lang_choice

    case $lang_choice in
        1) LANG="zh" ;;
        2) LANG="en" ;;
        *)
            log_error "无效的选择"
            exit 1
            ;;
    esac
fi

# 验证语言
if [[ "$LANG" != "zh" && "$LANG" != "en" ]]; then
    log_error "语言必须是 zh 或 en"
    exit 1
fi

log_info "选择的语言: $LANG"

# 交互式选择版本
if [ -z "$VERSION" ]; then
    echo ""
    echo "请选择版本："
    echo "  1) 下载最新版本 (latest)"
    echo "  2) 从已安装版本中选择（回滚）"
    read -p "请输入选项 [1-2]: " version_choice

    case $version_choice in
        1)
            # 使用 latest 作为下载版本号
            ARTIFACT_VERSION="latest"
            # 使用服务器时间作为本地目录版本号
            VERSION=$(date '+%Y%m%d-%H%M')_0
            log_info "将下载最新版本，本地版本号: ${VERSION}"
            DOWNLOAD_NEW=true
            ;;
        2)
            installed_versions=$(get_installed_versions "$LANG")
            if [ -z "$installed_versions" ]; then
                log_error "没有找到已安装的 ${LANG} 版本"
                exit 1
            fi

            echo ""
            echo "已安装的版本："
            select version in $installed_versions; do
                if [ -n "$version" ]; then
                    VERSION="$version"
                    DOWNLOAD_NEW=false
                    break
                fi
            done
            ;;
        *)
            log_error "无效的选择"
            exit 1
            ;;
    esac
else
    # 命令行指定版本，检查是否已存在
    if [ -d "${RELEASES_DIR}/docuo-docs-${LANG}-${VERSION}" ]; then
        log_info "版本 ${VERSION} 已存在，将直接切换"
        DOWNLOAD_NEW=false
    else
        log_info "版本 ${VERSION} 不存在，将下载"
        ARTIFACT_VERSION="$VERSION"
        DOWNLOAD_NEW=true
    fi
fi

log_info "目标版本: $VERSION"

# 创建必要的目录
mkdir -p "${RELEASES_DIR}"
mkdir -p "${WEBROOT}/tmp"

# 下载和解压新版本
if [ "$DOWNLOAD_NEW" = true ]; then
    RELEASE_DIR="${RELEASES_DIR}/docuo-docs-${LANG}-${VERSION}"

    if [ -d "$RELEASE_DIR" ]; then
        log_warn "版本 ${VERSION} 已存在，将覆盖"
        rm -rf "$RELEASE_DIR"
    fi

    log_info "开始下载版本 ${ARTIFACT_VERSION}..."

    ARTIFACT_URL="${ARTIFACT_BASE_URL}/docuo-docs-${LANG}.zip?version=${ARTIFACT_VERSION}"
    TMP_ZIP="${WEBROOT}/tmp/docuo-docs-${LANG}-${VERSION}.zip"

    # 下载制品（无需鉴权）
    if ! curl -o "$TMP_ZIP" -f -L "$ARTIFACT_URL"; then
        log_error "下载失败"
        rm -f "$TMP_ZIP"
        exit 1
    fi

    log_info "下载完成，开始解压..."

    # 解压到临时目录
    TMP_EXTRACT="${WEBROOT}/tmp/extract-${VERSION}"
    rm -rf "$TMP_EXTRACT"
    mkdir -p "$TMP_EXTRACT"

    if ! unzip -q "$TMP_ZIP" -d "$TMP_EXTRACT"; then
        log_error "解压失败"
        rm -rf "$TMP_EXTRACT" "$TMP_ZIP"
        exit 1
    fi

    # 移动到 releases 目录（解压后的目录名应该是 docuo-docs-{lang}）
    EXTRACTED_DIR="${TMP_EXTRACT}/docuo-docs-${LANG}"
    if [ ! -d "$EXTRACTED_DIR" ]; then
        log_error "解压后的目录结构不正确，期望: ${EXTRACTED_DIR}"
        rm -rf "$TMP_EXTRACT" "$TMP_ZIP"
        exit 1
    fi

    # 如果下载的是 latest 版本，尝试从 version.txt 读取实际版本号
    if [ "$ARTIFACT_VERSION" = "latest" ]; then
        VERSION_FILE="${EXTRACTED_DIR}/version.txt"
        if [ -f "$VERSION_FILE" ]; then
            ACTUAL_VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
            if [ -n "$ACTUAL_VERSION" ]; then
                log_info "从 version.txt 读取到实际版本号: ${ACTUAL_VERSION}"
                VERSION="$ACTUAL_VERSION"
                # 更新 RELEASE_DIR
                RELEASE_DIR="${RELEASES_DIR}/docuo-docs-${LANG}-${VERSION}"
            else
                log_warn "version.txt 文件为空，使用默认版本号: ${VERSION}"
            fi
        else
            log_warn "未找到 version.txt 文件，使用默认版本号: ${VERSION}"
        fi
    fi

    # 如果目标目录已存在，先删除
    if [ -d "$RELEASE_DIR" ]; then
        log_warn "目标目录已存在，将覆盖: ${RELEASE_DIR}"
        rm -rf "$RELEASE_DIR"
    fi

    mv "$EXTRACTED_DIR" "$RELEASE_DIR"

    # 清理临时文件
    rm -rf "$TMP_EXTRACT" "$TMP_ZIP"

    log_info "版本 ${VERSION} 准备完成"
else
    RELEASE_DIR="${RELEASES_DIR}/docuo-docs-${LANG}-${VERSION}"

    if [ ! -d "$RELEASE_DIR" ]; then
        log_error "版本目录不存在: ${RELEASE_DIR}"
        exit 1
    fi

    log_info "使用已存在的版本: ${VERSION}"
fi

# 获取当前版本（如果存在）
CURRENT_LINK="${WEBROOT}/docuo-docs-${LANG}"
CURRENT_VERSION=""
if [ -L "$CURRENT_LINK" ]; then
    CURRENT_TARGET=$(readlink "$CURRENT_LINK")
    CURRENT_VERSION=$(basename "$CURRENT_TARGET" | sed "s/^docuo-docs-${LANG}-//")
    log_info "当前版本: ${CURRENT_VERSION}"
fi

# 切换软链接
log_info "切换到新版本..."
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

# 重启 PM2
PM2_APP_NAME="docuo-docs-${LANG}"
log_info "重启 PM2 应用: ${PM2_APP_NAME}..."

if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
    # 应用存在，使用 reload 实现零停机
    if LANG="$LANG" pm2 reload "$PM2_APP_NAME" --update-env; then
        log_info "PM2 应用重启成功"
    else
        log_error "PM2 应用重启失败"
        # 回滚
        if [ -n "$CURRENT_VERSION" ]; then
            log_warn "尝试回滚到版本: ${CURRENT_VERSION}"
            ln -sfn "${RELEASES_DIR}/docuo-docs-${LANG}-${CURRENT_VERSION}" "$CURRENT_LINK"
            LANG="$LANG" pm2 reload "$PM2_APP_NAME" --update-env
        fi
        exit 1
    fi
else
    log_warn "PM2 应用不存在，尝试启动..."
    cd "$CURRENT_LINK"
    if LANG="$LANG" pm2 start ecosystem.config.js; then
        log_info "PM2 应用启动成功"
    else
        log_error "PM2 应用启动失败"
        exit 1
    fi
fi

# 等待服务启动
log_info "等待服务启动..."
sleep 3

# 健康检查
log_info "执行健康检查..."
if curl -f -s http://localhost:3000 > /dev/null; then
    log_info "健康检查通过"
else
    log_error "健康检查失败"
    # 回滚
    if [ -n "$CURRENT_VERSION" ]; then
        log_warn "尝试回滚到版本: ${CURRENT_VERSION}"
        ln -sfn "${RELEASES_DIR}/docuo-docs-${LANG}-${CURRENT_VERSION}" "$CURRENT_LINK"
        pm2 reload "$PM2_APP_NAME"
    fi
    exit 1
fi

# 清理旧版本，只保留最新的 MAX_VERSIONS 个
log_info "清理旧版本（保留最新 ${MAX_VERSIONS} 个）..."
installed_versions=$(get_installed_versions "$LANG")
version_count=$(echo "$installed_versions" | wc -l)

if [ "$version_count" -gt "$MAX_VERSIONS" ]; then
    versions_to_delete=$(echo "$installed_versions" | tail -n +$((MAX_VERSIONS + 1)))

    for old_version in $versions_to_delete; do
        old_dir="${RELEASES_DIR}/docuo-docs-${LANG}-${old_version}"
        log_info "删除旧版本: ${old_version}"
        rm -rf "$old_dir"
    done
fi

log_info "升级完成！"
log_info "当前版本: ${VERSION}"
log_info "应用名称: ${PM2_APP_NAME}"
log_info "应用路径: ${CURRENT_LINK}"

# 显示 PM2 状态
pm2 list | grep "$PM2_APP_NAME" || true


