#!/bin/bash

# 取环境变量
echo $token_3th
echo $username
echo $repo
echo $deploy_branch

#  安装环境依赖
# build build test

echo "start delete template docs"
rm -rf docs
echo "delete template docs end"

# 克隆远端用户 docs 仓库，拷贝到指定目录，推送到远端
git clone -b $deploy_branch "https://$username:$token_3th@github.com/$username/$repo.git" ./docs
cd ./docs
rm -rf .git
# echo "last commit: "
# git rev-parse HEAD
cd ../