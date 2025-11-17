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
    stage('检出代码') {
      steps {
        script {
          echo '1. 克隆 site-template 仓库（coding 分支）...'
          sh 'rm -rf docuo-site'
          sh 'git clone -b coding https://github.com/spreadingai/spreading-site-template-new.git docuo-site'

          echo '2. 克隆 docs_all 仓库到 docs 目录...'
          dir('docuo-site') {
            sh 'rm -rf docs'
            // 使用浅克隆和通过环境变量设置 git 配置来处理大仓库
            sh '''
              GIT_HTTP_LOW_SPEED_LIMIT=0 \
              GIT_HTTP_LOW_SPEED_TIME=999999 \
              git -c http.postBuffer=524288000 clone --depth 1 https://github.com/ZEGOCLOUD/docs_all.git docs
            '''
          }
        }
      }
    }

    stage('初始化环境变量') {
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
          env.ARTIFACT_ADDR = "https://artifact-master.zego.cloud/generic/${env.ARTIFACT_NAMESPACE}/public/${env.ARTIFACT_NAME}"
          echo "制品名称：${env.ARTIFACT_NAME}"

          // 生成版本号：日期时间（精确到分钟）+ 构建号
          def dateTime = new Date().format('yyyyMMdd-HHmm', TimeZone.getTimeZone('Asia/Shanghai'))
          env.ARTIFACT_VERSION = "${dateTime}_${env.CI_BUILD_NUMBER}"
          echo "制品版本号：${env.ARTIFACT_VERSION}"
        }
      }
    }

    stage('安装依赖') {
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
          }
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
  }
}

