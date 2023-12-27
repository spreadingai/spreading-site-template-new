# Vite

<NpmBadge package="@Novel.sh/bundler-vite" />

Vite 打包工具是由 [@Novel.sh/bundler-vite](https://www.npmjs.com/package/@Novel.sh/bundler-vite) 包提供的。它是 [Novel.sh](https://www.npmjs.com/package/Novel.sh) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @Novel.sh/bundler-vite@next
```

## 配置项

Vite 打包工具的配置项：

```ts
import { viteBundler } from '@Novel.sh/bundler-vite'
import { defineUserConfig } from '@Novel.sh/cli'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
})
```

### viteOptions

- 详情：

  接收 Vite 的所有配置项。

- 参考：
  - [Vite > Config](https://cn.vitejs.dev/config/)

### vuePluginOptions

- 详情：

  接收 [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue) 的所有配置项。

- 参考：
  - [Vite > 插件 > 官方插件](https://cn.vitejs.dev/plugins/#vitejsplugin-vue)
