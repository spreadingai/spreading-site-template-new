pipeline {
  agent {
    docker {
      reuseNode false
      registryUrl 'https://artifact-image-master.zego.cloud'
      registryCredentialsId "cac42d99-de71-4825-81a2-b80e48cce93a"
      image "efficiency/build/${env.BUILD_ENV_IMAGE}"
      args '-v /root/.ssh:/root/.ssh -v /root/.gitconfig:/root/.gitconfig -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/docker_token/expire_token:/usr/local/docker_token/expire_token -v /data/gopath:/data/gopath -v /data/opensca:/data/opensca'
    }
  }

  stages {
    stage('检查代码变化') {
      steps {
        script {
          echo '检查仓库是否有代码变化...'

          // 通过 GitHub API 获取最新 commit hash
          echo '通过 GitHub API 获取 commit hash...'

          // 构建认证头（如果提供了 GITHUB_TOKEN）
          def authHeader = env.GITHUB_TOKEN ? "-H \"Authorization: Bearer ${env.GITHUB_TOKEN}\"" : ""

          // 重试 3 次获取 site-template commit hash
          def siteTemplateHash = ''
          retry(3) {
            try {
              siteTemplateHash = sh(
                script: """
                  RESPONSE=\$(curl -s -m 10 \
                    -H "Accept: application/vnd.github+json" \
                    -H "X-GitHub-Api-Version: 2022-11-28" \
                    ${authHeader} \
                    https://api.github.com/repos/spreadingai/spreading-site-template-new/branches/coding)

                  # 使用 python 解析 JSON 获取 commit.sha
                  HASH=\$(echo "\$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('commit', {}).get('sha', ''))" 2>/dev/null)

                  # 检查是否成功获取 hash
                  if [ -z "\$HASH" ]; then
                    # 检查是否是 API 错误响应
                    ERROR_MSG=\$(echo "\$RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('message', ''))" 2>/dev/null)
                    if [ -n "\$ERROR_MSG" ]; then
                      echo "API 错误: \$ERROR_MSG" >&2
                    else
                      echo "解析失败，响应内容（前500字符）: \${RESPONSE:0:500}" >&2
                    fi
                    exit 1
                  fi

                  echo "\$HASH"
                """,
                returnStdout: true
              ).trim()
            } catch (Exception e) {
              echo "获取 site-template commit hash 失败，准备重试..."
              sleep(time: 5, unit: 'SECONDS')
              throw e
            }
          }

          // 重试 3 次获取 docs_all commit hash
          def docsAllHash = ''
          retry(3) {
            try {
              docsAllHash = sh(
                script: """
                  RESPONSE=\$(curl -s -m 10 \
                    -H "Accept: application/vnd.github+json" \
                    -H "X-GitHub-Api-Version: 2022-11-28" \
                    ${authHeader} \
                    https://api.github.com/repos/ZEGOCLOUD/docs_all/branches/main)

                  # 使用 python 解析 JSON 获取 commit.sha
                  HASH=\$(echo "\$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('commit', {}).get('sha', ''))" 2>/dev/null)

                  # 检查是否成功获取 hash
                  if [ -z "\$HASH" ]; then
                    # 检查是否是 API 错误响应
                    ERROR_MSG=\$(echo "\$RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('message', ''))" 2>/dev/null)
                    if [ -n "\$ERROR_MSG" ]; then
                      echo "API 错误: \$ERROR_MSG" >&2
                    else
                      echo "解析失败，响应内容（前500字符）: \${RESPONSE:0:500}" >&2
                    fi
                    exit 1
                  fi

                  echo "\$HASH"
                """,
                returnStdout: true
              ).trim()
            } catch (Exception e) {
              echo "获取 docs_all commit hash 失败，准备重试..."
              sleep(time: 5, unit: 'SECONDS')
              throw e
            }
          }

          echo "spreading-site-template-new (coding): ${siteTemplateHash}"
          echo "docs_all (main): ${docsAllHash}"

          // 保存当前 hash 到环境变量
          env.CURRENT_SITE_HASH = siteTemplateHash
          env.CURRENT_DOCS_HASH = docsAllHash

          // 下载上次构建的 hash 记录（根据 LANG 区分）
          def langSuffix = env.LANG ?: 'zh'
          def lastHashesFile = 'last-build-hashes.txt'
          def artifactBaseUrl = "https://artifact-master.zego.cloud/generic/${env.ARTIFACT_NAMESPACE}/public"
          def lastHashesUrl = "${artifactBaseUrl}/build-hashes-${langSuffix}.txt?version=latest"

          echo "尝试下载上次构建记录: ${lastHashesUrl}"
          def downloadResult = sh(
            script: "curl -s -L -f -o ${lastHashesFile} '${lastHashesUrl}'",
            returnStatus: true
          )

          if (downloadResult == 0) {
            // 成功下载，读取上次的 hash
            def lastHashes = readFile(lastHashesFile).trim().split('\n')
            def lastSiteHash = lastHashes[0].split('=')[1]
            def lastDocsHash = lastHashes[1].split('=')[1]

            echo "上次构建记录："
            echo "  spreading-site-template-new: ${lastSiteHash}"
            echo "  docs_all: ${lastDocsHash}"

            // 对比 hash
            if (siteTemplateHash == lastSiteHash && docsAllHash == lastDocsHash) {
              echo '代码未发生变化，跳过本次构建'
              env.SKIP_BUILD = 'true'
            } else {
              echo '检测到代码变化，继续构建'
              if (siteTemplateHash != lastSiteHash) {
                echo "  - spreading-site-template-new 有更新"
              }
              if (docsAllHash != lastDocsHash) {
                echo "  - docs_all 有更新"
              }
              env.SKIP_BUILD = 'false'
            }
          } else {
            echo '未找到上次构建记录，这可能是首次构建，继续执行'
            env.SKIP_BUILD = 'false'
          }
        }
      }
    }

    stage('检出代码') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        script {
          echo '1. 克隆 site-template 仓库（coding 分支）...'
          sh 'rm -rf docuo-site'

          // 重试 3 次克隆 site-template 仓库
          retry(3) {
            try {
              sh 'git clone -b coding https://github.com/spreadingai/spreading-site-template-new.git docuo-site'
            } catch (Exception e) {
              echo "克隆 site-template 失败，准备重试..."
              sh 'rm -rf docuo-site'
              sleep(time: 5, unit: 'SECONDS')
              throw e
            }
          }
          echo 'site-template 仓库克隆成功'

          echo '2. 克隆 docs_all 仓库到 docs 目录...'
          dir('docuo-site') {
            sh 'rm -rf docs'

            // 重试 3 次克隆 docs_all 仓库
            retry(3) {
              try {
                // 使用浅克隆和通过环境变量设置 git 配置来处理大仓库
                sh '''
                  GIT_HTTP_LOW_SPEED_LIMIT=0 \
                  GIT_HTTP_LOW_SPEED_TIME=999999 \
                  git -c http.postBuffer=524288000 clone --depth 1 https://github.com/ZEGOCLOUD/docs_all.git docs
                '''
              } catch (Exception e) {
                echo "克隆 docs_all 失败，准备重试..."
                sh 'rm -rf docs'
                sleep(time: 5, unit: 'SECONDS')
                throw e
              }
            }
            echo 'docs_all 仓库克隆成功'
          }
        }
      }
    }

    stage('初始化环境变量') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        script {
          // 获取语言配置，默认为 zh
          env.LANG = env.LANG ?: 'zh'
          echo "构建语言版本：${env.LANG}"

          // 根据 LANG 自动设置配置
          if (env.LANG == 'en') {
            env.NEXT_PUBLIC_CONFIG_FILE = 'docuo.config.en.json'
            env.NEXT_PUBLIC_BASE_PATH = '/docs'
            echo "英文版本配置："
            echo "  - CONFIG_FILE: docuo.config.en.json"
            echo "  - BASE_PATH: /docs"
          } else {
            env.NEXT_PUBLIC_CONFIG_FILE = 'docuo.config.zh.json'
            env.NEXT_PUBLIC_BASE_PATH = ''
            echo "中文版本配置："
            echo "  - CONFIG_FILE: docuo.config.zh.json"
            echo "  - BASE_PATH: (空)"
          }

          // 制品名称根据语言区分
          env.ARTIFACT_NAME = "docuo-docs-${env.LANG}.zip"
          env.ARTIFACT_BASE_URL = "https://artifact-master.zego.cloud/generic/${env.ARTIFACT_NAMESPACE}/public"
          env.ARTIFACT_ADDR = "${env.ARTIFACT_BASE_URL}/${env.ARTIFACT_NAME}"
          echo "制品名称：${env.ARTIFACT_NAME}"
          echo "制品基础 URL：${env.ARTIFACT_BASE_URL}"

          // 生成版本号：日期时间（精确到分钟）+ 构建号
          def dateTime = new Date().format('yyyyMMdd-HHmm', TimeZone.getTimeZone('Asia/Shanghai'))
          env.ARTIFACT_VERSION = "${dateTime}_${env.CI_BUILD_NUMBER}"
          echo "制品版本号：${env.ARTIFACT_VERSION}"
        }
      }
    }

    stage('安装依赖') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        dir('docuo-site') {
          echo '检查 Node.js 版本...'
          sh 'node --version'

          echo '检查 Node.js 版本是否满足要求...'
          sh '''
            NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
            if [ "$NODE_VERSION" -lt 18 ]; then
              echo "错误: Node.js 版本过低，当前版本: $(node --version)"
              echo "Next.js 要求 Node.js >= v18.17.0"
              echo "请在 Jenkins 中配置使用 Node.js 18+ 的构建镜像"
              exit 1
            fi
          '''

          echo '配置 npm 使用淘宝镜像源...'
          sh 'npm config get registry'
          sh 'npm config set registry https://registry.npmmirror.com'
          sh 'npm config get registry'

          echo '开始安装依赖（使用淘宝镜像）...'
          sh 'npm install --registry=https://registry.npmmirror.com'
          echo '依赖安装完成'
        }
      }
    }

    stage('生成环境配置') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        dir('docuo-site') {
          echo '生成 .env 文件...'
          sh '''
            cat > .env << EOF
NEXT_PUBLIC_CONFIG_FILE=${NEXT_PUBLIC_CONFIG_FILE}
NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
NEXT_PUBLIC_CUSTOM_DOMAIN=${NEXT_PUBLIC_CUSTOM_DOMAIN}
NEXT_PUBLIC_INSTANCE_LIMIT=${NEXT_PUBLIC_INSTANCE_LIMIT}
NEXT_PUBLIC_VERSION_LIMIT=${NEXT_PUBLIC_VERSION_LIMIT}
NEXT_PUBLIC_PLAN=${NEXT_PUBLIC_PLAN}
EOF
          '''
          echo '.env 文件生成完成'
        }
      }
    }

    stage('构建 Standalone') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        dir('docuo-site') {
          script {
            echo "开始构建 Standalone 部署包（语言：${env.LANG}）..."

            // 根据语言选择构建命令
            if (env.LANG == 'en') {
              echo '执行英文版本构建...'
              sh 'npm run build:en'
            } else {
              echo '执行中文版本构建...'
              sh 'npm run build:zh'
            }

            echo 'Standalone 构建完成'

            // 验证构建产物
            echo '验证构建产物...'
            sh '''
              if [ ! -d ".next/standalone" ]; then
                echo "错误：.next/standalone 目录不存在！"
                exit 1
              fi

              if [ ! -f ".next/standalone/server.js" ]; then
                echo "错误：server.js 文件不存在！"
                exit 1
              fi

              if [ ! -d ".next/standalone/public" ]; then
                echo "警告：public 目录未复制到 standalone"
              fi

              if [ ! -d ".next/standalone/.next/static" ]; then
                echo "警告：.next/static 目录未复制到 standalone"
              fi

              echo "构建产物验证通过"
            '''
          }
        }
      }
    }

    stage('打包 Standalone 制品') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        dir('docuo-site') {
          script {
            echo "开始打包 Standalone 部署包（语言：${env.LANG}）..."

            // 复制 .env 文件和 ecosystem.config.js 到 standalone 目录
            sh '''
              cp .env .next/standalone/
              cp ecosystem.config.js .next/standalone/
            '''

            // 创建 version.txt 文件
            sh """
              echo '${env.ARTIFACT_VERSION}' > .next/standalone/version.txt
            """

            // 重命名 standalone 目录为 docuo-docs-{lang}，然后打包
            sh """
              cd .next
              mv standalone docuo-docs-${env.LANG}
              zip -r -q ${env.ARTIFACT_NAME} docuo-docs-${env.LANG}/
              mv ${env.ARTIFACT_NAME} ../
            """

            echo '打包完成'

            echo '制品信息：'
            sh """
              echo "制品名称：${env.ARTIFACT_NAME}"
              echo "语言版本：${env.LANG}"
              echo "制品版本号：${env.ARTIFACT_VERSION}"
              ls -lh ${env.ARTIFACT_NAME}
              du -sh ${env.ARTIFACT_NAME}
              echo "制品内容（前20项）："
              unzip -l ${env.ARTIFACT_NAME} | head -25
            """
          }
        }
      }
    }

    stage('上传制品') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        script {
          dir('docuo-site') {
            echo "上传制品，版本：${env.ARTIFACT_VERSION}，语言：${env.LANG}..."

            echo '上传到公开制品库...'
            sh "curl -u ${env.ARTIFACT_ACCOUNT}:${env.ARTIFACT_TOKEN} -f -X POST '${env.ARTIFACT_ADDR}?version=${env.ARTIFACT_VERSION}' -Ffile='@./${env.ARTIFACT_NAME}'"

            echo '清理制品文件...'
            sh "rm -f ${env.ARTIFACT_NAME}"
            echo '上传制品完成'

            echo '制品下载地址：'
            echo "${env.ARTIFACT_ADDR}?version=${env.ARTIFACT_VERSION}"

            // 创建并上传 latest-version 文件
            echo "创建 latest-version 文件..."
            sh """
              echo '${env.ARTIFACT_VERSION}' > latest-version-${env.LANG}.txt
            """

            echo '上传 latest-version 文件到制品库（版本号：${env.ARTIFACT_VERSION}）...'
            sh "curl -u ${env.ARTIFACT_ACCOUNT}:${env.ARTIFACT_TOKEN} -f -X POST '${env.ARTIFACT_BASE_URL}/latest-version-${env.LANG}.txt?version=${env.ARTIFACT_VERSION}' -Ffile='@./latest-version-${env.LANG}.txt'"

            echo '清理 latest-version 文件...'
            sh "rm -f latest-version-${env.LANG}.txt"
            echo 'latest-version 文件上传完成'

            // 创建并上传 build-hashes 文件
            echo "创建 build-hashes 文件..."
            sh """
              cat > build-hashes-${env.LANG}.txt << EOF
spreading-site-template-new=${env.CURRENT_SITE_HASH}
docs_all=${env.CURRENT_DOCS_HASH}
EOF
            """

            echo '上传 build-hashes 文件到制品库（版本号：${env.ARTIFACT_VERSION}）...'
            sh "curl -u ${env.ARTIFACT_ACCOUNT}:${env.ARTIFACT_TOKEN} -f -X POST '${env.ARTIFACT_BASE_URL}/build-hashes-${env.LANG}.txt?version=${env.ARTIFACT_VERSION}' -Ffile='@./build-hashes-${env.LANG}.txt'"

            echo '清理 build-hashes 文件...'
            sh "rm -f build-hashes-${env.LANG}.txt"
            echo 'build-hashes 文件上传完成'
          }
        }
      }
    }

    stage('发送飞书通知') {
      when {
        expression { env.SKIP_BUILD == 'false' }
      }
      steps {
        script {
          if (env.FEISHU_BOT_URL) {
            def langName = env.LANG == 'zh' ? '中文' : '英文'
            def jobUrl = env.LANG == 'zh' ? 'http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75615' : 'http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75614'

            echo "发送飞书构建成功通知..."
            sh """
              curl -X POST '${env.FEISHU_BOT_URL}' \
                -H 'Content-Type: application/json' \
                -d '{
                  "msg_type": "text",
                  "content": {
                    "text": "✅ ${langName}构建成功\\n构建地址：${jobUrl}\\n版本号：${env.ARTIFACT_VERSION}"
                  }
                }'
            """
          } else {
            echo "未配置 FEISHU_BOT_URL，跳过飞书通知"
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        if (env.FEISHU_BOT_URL) {
          def langName = env.LANG == 'zh' ? '中文' : '英文'
          def jobUrl = env.LANG == 'zh' ? 'http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75615' : 'http://dev.coding.zego.cloud/p/better_dev/ci/job?id=75614'

          // 获取失败的阶段
          def failedStage = "未知阶段"
          try {
            def buildLog = currentBuild.rawBuild.getLog(100).join('\n')
            if (buildLog.contains('stage(\'检出代码\')')) {
              failedStage = "检出代码"
            } else if (buildLog.contains('stage(\'安装依赖\')')) {
              failedStage = "安装依赖"
            } else if (buildLog.contains('stage(\'生成环境配置\')')) {
              failedStage = "生成环境配置"
            } else if (buildLog.contains('stage(\'构建 Standalone\')')) {
              failedStage = "构建 Standalone"
            } else if (buildLog.contains('stage(\'打包 Standalone 制品\')')) {
              failedStage = "打包 Standalone 制品"
            } else if (buildLog.contains('stage(\'上传制品\')')) {
              failedStage = "上传制品"
            }
          } catch (Exception e) {
            failedStage = "无法获取失败阶段"
          }

          echo "发送飞书构建失败通知..."
          sh """
            curl -X POST '${env.FEISHU_BOT_URL}' \
              -H 'Content-Type: application/json' \
              -d '{
                "msg_type": "text",
                "content": {
                  "text": "❌ ${langName}构建失败\\n构建地址：${jobUrl}\\n失败阶段：${failedStage}"
                }
              }'
          """
        }
      }
    }
  }

  environment {
    // 语言配置：zh（中文）或 en（英文）
    // 在 Jenkins 任务配置中设置此环境变量
    // NEXT_PUBLIC_CONFIG_FILE 和 NEXT_PUBLIC_BASE_PATH 会在初始化阶段根据 LANG 自动设置
    LANG = "${env.LANG ?: 'zh'}"

    // site-template 内部使用的环境变量
    NEXT_PUBLIC_CUSTOM_DOMAIN = "${env.NEXT_PUBLIC_CUSTOM_DOMAIN ?: ''}"
    NEXT_PUBLIC_INSTANCE_LIMIT = '-1'
    NEXT_PUBLIC_VERSION_LIMIT = "${env.NEXT_PUBLIC_VERSION_LIMIT ?: ''}"
    NEXT_PUBLIC_PLAN = '1'

    // 飞书机器人通知
    FEISHU_BOT_URL = "${env.FEISHU_BOT_URL ?: ''}"
  }
}

