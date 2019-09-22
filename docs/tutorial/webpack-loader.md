# 📝Webpack Loader 入门

建议先简要的学习如何[编写一个webpack loader](https://webpack.docschina.org/contribute/writing-a-loader/#%E6%B5%8B%E8%AF%95)

## 在团队 资源中心 中应用

> 资源中心是汇集了团队一路以来的各种沉淀产物, 包括开源组件, 系统模板, 文章, 理念, 以及手机 App.

### Why

过去的资源中心查看组件文档/示例是跳到github page, 过程比较慢.  
为了拥有更好的体验, 我们建立了这个资源中心, 提前获取各个组件的 markdown 文件, 利用 webpack loader 直接展示在资源中心.

### How

由于资源中心是个 Nuxt 应用, 我们编写一个 loader 来将 markdown 文件转换为 vue 文件, 交给 vue-loader 处理.

## 转换前后实际输出代码对比

### 转换前的 markdown 文件

````markdown
我的示例

```vue
<template>
  <button @click="count++">I love you {{ count }}</button>
</template>
<script>
export default {
  data() {
    return {
      count: 3000
    }
  }
}
</script>
```
````

### 转换后为 vue 文件

````diff
+ <template>
+   <demo-and-code>
+     <template v-slot:component>
+       <p>我的示例</p>
+       <button @click="count++">I love you {{ count }}</button>
+     </template>
+     <template v-slot:html>
+       <div v-pre class="code">
          我的示例

          ```vue
          <template>
            <button @click="count++">I love you {{ count }}</button>
          </template>
          <script>
          export default {
            data() {
              return {
                count: 3000
              }
            }
          }
          </script>
          ```
+       </div>
+     </template>
+   </demo-and-code>
+ </template>
+ <script>
+ export default {
+   data() {
+     return {
+       count: 3000
+     }
+   }
+ }
+ </script>
````

::: tip
为了了解转换后的 vue 文件细节, 仍需要往下看!
:::

## Loader 相关代码

由于资源中心有两种类型的 markdown 需要转换

- 带有 demo 的 markdown
- 普通的 markdown

### 处理带有 demo 的 markdown:

**markdown-loader/demo-loader.js**

```js
const vuedown = require('vuedown')
const highlight = require('./utils/highlight')
const hoistingCode = require('./utils/hoistingCode')

module.exports = function(source) {
  const html = vuedown.marked(source, {highlight})

  const {template, hoistedTags} = hoistingCode(source)

  const component = `<template>
  <demo-and-code>
    <template v-slot:component>
      ${template || ''}
    </template>
    <template v-slot:html>
      <div v-pre class="code">
        ${html}
      </div>
    </template>
  </demo-and-code>
</template>


${hoistedTags ? hoistedTags.join('\n\n') : ''}`

  return component
}
```

**utils/hoistingCode.js**

用于收集 vue 代码段里的 template, script 和 style 代码并返回

```js
const {marked} = require('vuedown')

module.exports = source => {
  // https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/lib/hoist.js
  const RE = /^<(script|style)(?=(\s|>|$))/i

  const tokens = marked.lexer(source)
  const env = {
    hoistedTags: [],
    template: ''
  }

  const renderer = new marked.Renderer()

  const hoistedTags = env.hoistedTags

  renderer.html = text => {
    if (RE.test(text.trim())) {
      hoistedTags.push(text)
      return ''
    }
    return text
  }

  tokens.forEach(token => {
    // 对应md中的vue block
    if (token.type === 'code' && (token.lang === 'vue' || token.lang === 'html')) {
      env.template = token.text
      marked(injectBlankLine(token.text), {
        renderer
      })
    }
  })

  hoistedTags.forEach(html => {
    env.template = env.template.replace(html.trim(), '')
  })

  return env
}

/**
 * marked会将相邻的tag识别成同一text，所以要在tag之间加空行
 * 举例：<a></a>\n<b></b>
 */
function injectBlankLine(text) {
  return text.replace(/(<(script|style)>)/g, '\n$1')
}
```

**nuxt.config.js**

```js
extend(config) {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      'vue-loader',
      {
        loader: require.resolve('./build/markdown-loader/demo-loader')
      }
    ]
  })
}
```

**demo-and-code.vue**

这个是 示例与代码 的容器

```html
<template>
  <div class="demo-and-code wrapper">
    <slot name="component" />

    <details ref="details" @toggle="toggle" open>
      <summary>{{ !isOpen ? '显示' : '隐藏' }}代码</summary>
      <div class="code-block">
        <slot name="html" />
      </div>
    </details>
  </div>
</template>
<!-- css -->
```

### 处理普通的 markdown:

**markdown-loader/index.js**

```js
const vuedown = require('vuedown')
module.exports = function(source) {
  return vuedown(source)
}
```

**nuxt.config.js**

```js
extend(config) {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      'vue-loader',
      {
        loader: require.resolve('./build/markdown-loader')
      }
    ]
  })
}
```
