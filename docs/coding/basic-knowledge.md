# 前端基础

## 环境配置

1. Node.js LTS版本安装 [https://nodejs.org/en/](https://nodejs.org/en/)

2. 淘宝源设置: npm config set registry [https://registry.npm.taobao.org/](https://registry.npm.taobao.org/)  

3. nvm Node.js版本管理工具安装 [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

4. Yarn 包管理器安装 [https://yarnpkg.com/lang/en/](https://yarnpkg.com/lang/en/)  注意：依赖统一使用Yarn安装，而不是NPM

5. Chrome 最新版本安装 [https://www.google.cn/chrome/](https://www.google.cn/chrome/)

6. Lantern 翻墙工具安装 [https://github.com/getlantern/download](https://github.com/getlantern/download)（其他翻墙工具也行，目的是可以使用谷歌搜索）

7. Webstorm IDE安装 [https://www.jetbrains.com/webstorm/download/](https://www.jetbrains.com/webstorm/download/) (其他IDE也行，自己顺手即可)


> 注：默认使用淘宝源，不需要cnpm; 除了安装私服包要指定registry, 其他一概使用yarn + 淘宝源安装依赖
> 
> 淘宝源设置也可以这样：
> vi ~/.npmrc
> # 添加下面一行
> registry=https://registry.npm.taobao.org/


<a name="efdf5b49"></a>
## [](#w70vup)技术栈说明

- 前端框架：[nuxt](https://github.com/levy9527/nuxt-element-dashboard)
- vue组件开发工具：[https://github.com/FEMessage/vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli)
- 路由管理：[vue-router](https://router.vuejs.org/api/)

- 状态管理：[vuex](https://vuex.vuejs.org/)

- UI库：[element](http://element.eleme.io/#/), [vant](https://youzan.github.io/vant/#/zh-CN/sku)(移动端)

- ajax库： [axios](https://github.com/axios/axios)

- css预处理器：[less](http://lesscss.org/#)

- 代码格式化：[prettier](https://github.com/prettier/prettier)


<a name="e51e79c6"></a>
## [](#clgoxl)学习资料
<a name="d750a04f"></a>
### [](#2vhgur)Vue官方手册
[Vue-Essentials-Cheat-Sheet.pdf](https://www.yuque.com/attachments/yuque/0/2018/pdf/160590/1542700735398-be2ba608-d9fd-4f85-806e-b60de5f0311b.pdf?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2018%2Fpdf%2F160590%2F1542700735398-be2ba608-d9fd-4f85-806e-b60de5f0311b.pdf%22%2C%22name%22%3A%22Vue-Essentials-Cheat-Sheet.pdf%22%2C%22size%22%3A145848%2C%22ext%22%3A%22pdf%22%2C%22type%22%3A%22application%2Fpdf%22%2C%22card%22%3A%22file%22%7D)
<a name="476267f2"></a>

### [](#dmxrhl)Nuxt官方手册
[Nuxtjs-Cheat-Sheet.pdf](https://www.yuque.com/attachments/yuque/0/2018/pdf/160590/1542700784237-94ecc57e-ddb7-442c-ad47-6fe5759ba7ea.pdf?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2018%2Fpdf%2F160590%2F1542700784237-94ecc57e-ddb7-442c-ad47-6fe5759ba7ea.pdf%22%2C%22name%22%3A%22Nuxtjs-Cheat-Sheet.pdf%22%2C%22size%22%3A165521%2C%22ext%22%3A%22pdf%22%2C%22type%22%3A%22application%2Fpdf%22%2C%22card%22%3A%22file%22%7D)

<a name="1556e1e3"></a>
## [](#0gc3ug)编码规范
约定，前端的风格偏向**kebab-case，**即**字母开头命名**，且**全部字母为小写**，单词之间统一使用中划线 “-” 连接。

### Vue风格指南

[https://cn.vuejs.org/v2/style-guide/](https://cn.vuejs.org/v2/style-guide/)

请务必花上时间读完。

### 组件风格

通读[vue官方风格指南](https://cn.vuejs.org/v2/style-guide/index.html),  由于我们是`kebab-case`的重度用户，因此我们更看重的是在多个项目中保持相同的大小写规则，以下是摘取的适用于我们团队协作习惯的指南：

- [组件名，应该多个单词](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E5%90%8D%E4%B8%BA%E5%A4%9A%E4%B8%AA%E5%8D%95%E8%AF%8D-%E5%BF%85%E8%A6%81)<br />

这样做可以避免跟现有的以及未来的 HTML 元素[相冲突](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的

- [单文件组件的文件名使用是横线连接 (kebab-case)](https://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)<br />

好例子：

```
components/
|- my-component.vue
```

- [在 DOM 模板(template)中总是 kebab-case 的](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)<br />

好例子:

```
<!-- template -->
<my-component></my-component>
```

- [JS/JSX 中的组件名应该始终是 PascalCase 的](https://www.yuque.com/deepexi-company/dev-doc-ep8ty/JS/JSX%C2%A0%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%BA%94%E8%AF%A5%E5%A7%8B%E7%BB%88%E6%98%AF%20PascalCase%20%E7%9A%84%EF%BC%8C%E5%B0%BD%E7%AE%A1%E5%9C%A8%E8%BE%83%E4%B8%BA%E7%AE%80%E5%8D%95%E7%9A%84%E5%BA%94%E7%94%A8%E4%B8%AD%E5%8F%AA%E4%BD%BF%E7%94%A8Vue.component%C2%A0%E8%BF%9B%E8%A1%8C%E5%85%A8%E5%B1%80%E7%BB%84%E4%BB%B6%E6%B3%A8%E5%86%8C%E6%97%B6%EF%BC%8C%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%20kebab-case%20%E5%AD%97%E7%AC%A6%E4%B8%B2)<br />

这里我们选择使用`PascalCase`, 因为在编程语言里，`kebab-case`并不是最佳实践。

好例子:

```
Vue.component('MyComponent', {
  // ...
})
​
import MyComponent from './my-component.vue'
​
export default {
  components: {MyComponent},
  // ...
}
```

### Container

注意理解区分container与component的区别。虽然其概念源于react社区，但思想是通用的。

简单来说：

- container是带有特殊业务逻辑的，一个常见的例子是会发送特定的ajax请求。<br />
- component是只包含UI渲染逻辑的，一般通过props传参，例如functional组件。<br />

原文出处：[https://medium.com/@learnreact/container-components-c0e67432e005](https://medium.com/@learnreact/container-components-c0e67432e005)

### JS偏好

[整洁的javascript](https://github.com/ryanmcdermott/clean-code-javascript)

### CSS约定

class的命名应该尽量精短、明确，同样是**kebab-case**

每个页面约定在页面代码的根元素加上 `class=${page-name}`<br />并且在后续的css代码中, 该页面的类选择器都放在.page-name中

```
<template>
  <div class="my-page">
    <div class="list"></div>
    <button class='submit-btn'></button>
  </div>
</template>
```

```css
<style lang="stylus">
.my-page {
  .list {}
  .submit-btn {}
}
</style>
```

命名需要精简，但却也要有意义

```
// 推荐
#nav {}
.author {}

// 不推荐
#navigation {}
.atr {}
```

避免多余的选择器

```css
// 推荐
#example {}
.error {}

// 不推荐
ul#example {}
div.error {}
```

### 参考

[google style](https://google.github.io/styleguide/htmlcssguide.html#CSS_Style_Rules)

## [](#ltmdmb)团队github
[https://github.com/FEMessage](https://github.com/FEMessage)

<a name="02619935"></a>
## [](#2icufa)团队npm
[https://www.npmjs.com/settings/femessage/packages](https://www.npmjs.com/settings/femessage/packages)

<a name="06ad4cd7"></a>
## [](#lfypzf)常用yarn命令
<a name="install"></a>
### [](#o86xhl)install
安装依赖

```bash
yarn install 

# 可以简写成
yarn
```

<a name="add"></a>
### [](#n1mpuh)add
添加依赖并安装

```bash
yarn add xxx
```

添加开发依赖并安装

```bash
yarn add xxx -D
```

添加peer依赖并安装

```bash
yarn add xxx -P
```

<a name="upgrade"></a>
### [](#q720ge)upgrade
更新至最新版本

```bash
yarn upgrade xxx --latest
```

更新至指定版本

```bash
yarn upgrade xxx@1.0.0
```

<a name="remove"></a>
### [](#21p4fn)remove
删除依赖

```bash
yarn remove xxx
```

<a name="1501ec79"></a>
