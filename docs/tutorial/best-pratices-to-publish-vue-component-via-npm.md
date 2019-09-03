# 📦vue组件发布npm最佳实践

## 前言
我们经常使用组件，二次封装或开发新组件，在团队内部使用; 可当我们想通过npm分享组件时，却没了之前的得心应手，本文旨在帮助大家在可以更轻松地发布组件

首先，把vue组件发布到npm这件事可以拆分成两个部分：

1. 在npm上发布一个包
1. 将vue组件打包

## npm发包

有人说，发包不是一行命令就搞定了么

```sh
npm publish
```

是的，可是还忽略了以下几点：

1. 首先你要在[npmjs](https://www.npmjs.com/)上注册一个账号
1. 查看你的`.npmrc`设置，确保你的registry是https://www.npmjs.com/, 而不是淘宝源
1. 在终端`npm login`，登录你的账号

做好以上三点，才可以通过`npm publish`简单地发布一个包。若要遵循最佳实践，还有一些准备工作要做好，下面将为你讲述

### 完善基本信息

package.json的以下字段需要注意

* `name`
* `version`
* `description`
* `keywords`
* `author`
* `license`
* `repository`
* `main`
* `unpkg`
* `module`
* `scripts`
* `engines`

`name`就是发布到npm上的包名，也即别人安装时输入的名字`yarn add ${name}`, 包名应该是`kebab-case`, 即英文单词全小写，中划线分割(lower case and dash-separated)

`version`是语义化的，`major.minor.patch`. 如果是`major`变动，通常意味着不兼容的修改; 如果是`minor`，意味着添加向后兼容的新功能，如果是`patch`, 意味着bug的修复。详情见[semver.org](https://semver.org/)

`description`是对包的描述，在[npmjs.com](https://www.npmjs.com/package/package)上搜索时会显示，有助于用户在搜索时进行筛选

`keywords` 同样也是帮助用户查找到你的包

`author`的格式一般是`${your name} ${email}`, 当然也可以是一个github地址

`license`可能很多人会忽略，最好也写上去。至于用哪个，vue的官方项目全是MIT，因此我也是MIT，不纠结

`repository`的格式参考如下：

```json
"repository": {
  "type": "git",
  "url": "https://github.com/FEMessage/el-data-table.git"
}
```

这样在[npm包页面](https://www.npmjs.com/package/el-data-table)就有会个github的入口

`main`定义了包的入口文件，在NodeJs环境，语句`import pkg from 'package-name'`时，其实导入的就是`main`定义的文件，它可以是[CommonJs](http://www.commonjs.org/)格式的, 也可以是[umd](https://github.com/umdjs/umd)格式

需要注意的是，当你把一个包发布到npm上时，它同时也可以在[unpkg](https://unpkg.com/#/)上获取到。也就是说，你的代码既可能在NodeJs环境也可能浏览器环境执行。为此你需要用[umd](https://github.com/umdjs/umd)格式打包，并且在package.json定义`unpkg`字段，一般而言此时它的命名为`name.min.js`

最后，别忘了定义`module`或`jsnext:main`字段，它表示用ES6模块格式打包，给Webpack 2+或Rollup等先进的构建工具来处理。

我们来看一下三个字段的示例：

```json
"main": "dist/el-data-table.js",
"unpkg": "dist/el-data-table.min.js",
"module": "dist/el-data-table.esm.js"
```

`scripts` 为了防止出现发包前忘记构建的乌龙事件，定义一下发布前的脚本, 这样每次执行`npm publish`前都会先执行`npm run build`

```json
"prepublishOnly": "npm run build"
```

`engines` 可以告诉用户运行你的包对NodeJs版本的要求，这是非常重要的，不然你使用了NodeJs新版本特性，却没有定义该字段，导致低版本NodeJs用户运行报错，让人摸不着头脑。

### 定义依赖

当你开发一个项目时，比如一个静态网站或一个单面应用，**dependencies**和**devDependencies**并没有太多区别，因为你`npm install` 或 `yarn`时，这些依赖都会下载下来，因为你是在开发。

但对于发布到npm的包则不同：

**dependencies** 是运行你的包必须安装的依赖，即当用户`yarn add my-awesome-package`时，这些依赖也会下载。

**devDependencies** 是开发你的包时需要安装的依赖，比如`eslint`, `jest`等开发工具，当用户`yarn add my-awesome-package` 时，这些依赖并不会下载！

**peerDependencies** 一般用于开发插件的场景，它要求用户必须预先安装了某些依赖。比如开发`webpack`的插件，如果你把对`webpack`的依赖定义成**dependencies**, 如果用户安装的`webpack`跟**dependencies**里的`minor`版本不一致, 则用户`yarn add my-webpack-plugin`时会把**dependencies**定义的`webpack`也下载下来，也即用户会安装两个`major`版本相同的`webpack`, 这就不合适了。

所以说，定义好你的包的依赖，可以让用户安装使用你的包时少点困惑，多些愉悦。

### 忽略文件

如果有 `.gitignore`文件，则发布时会忽略 `.gitignore`中定义的文件;  也即这些文件不需要在`.npmignore`重新定义。如果用`.gitignore`忽略了`dist`目录，但发包时又需要发布`dist`目录，此时可以在package.json定义`files`字段，这是一个白名单，里面的文件都会被发布出去

```json
"files": [
  "dist"
]
```

需要注意的是，子文件夹`.gitignore`或`.npmignore`同样有效，而它们会覆盖`files`字段

另外，有些文件无论如何设置，都不会发布出去：

* `node_modules`
* `.git`(包括`.gitignore`)

### README.md

别忘了这个文件，写下与包相关的更具体的信息，告诉用户这个包有哪些功能，如何使用。这很重要，用户不会使用一个没有文档说明的包！

### 发布

一个版本只能发布一次，为了避免每次手动修改`package.json`, 可以使用`npm version [major | minor | patch]`命令来更新`package.json`里的版本

### 打标签

假设你的包最新版本是`1.0.0`, 当用户`yarn add my-awesome-package`或`yarn add my-awesome-package@1.0.0`时，其实是相当于`yarn add my-awesome-package@latest`, 即不指定标签安装时，默认安装`latest`版本。

假设你正在开发`2.0.0`版本，它还不稳定，你想发布它让用户测试一波，此时又不能让它变成`latest`版本，不然用户`yarn add my-awesome-package`时就安装了`2.0.0`了，那将让用户崩溃。这时该怎么办呢？标签就用上场了。

可以这样发布

```sh
npm publish --tag beta
```

则用户`yarn add my-awesome-package`安装的是`1.0.0`版本， `yarn add my-awesome-package@beta`时，安装的是`2.0.0`版本，不影响老用户，棒！🎉

记住，你只能对一个版本打一个标签，使用`npm dist-tag ls` 可以查看npm包一共打了几个标签

## 打包Vue

### 脚手架

经过一番折腾，在[Vue Conf](https://www.vuemastery.com/conferences/vueconf-2018/5-libraries-you-should-know-about-adam-jahr/)上找到一个vue组件的打包脚手架([vue官方文档也有说明](https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html))，进行“本土化”修改完善后，已在github开源：[https://github.com/FEMessage/vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli)

### 说明

我们以开源组件[el-data-table](https://github.com/FEMessage/el-data-table)为例，解释目录结构及文件

```sh
├── README.md
├── build
│   └── rollup.config.js
├── dist
│   ├── el-data-table.esm.js
│   ├── el-data-table.min.js
│   └── el-data-table.umd.js
├── docs
│   ├── build
│   └── index.html
├── package.json
├── src
│   ├── el-data-table.vue
│   └── index.js
├── styleguide.config.js
├── test
│   └── index.test.js
└── yarn.lock
```

先来看三个文件:

* `README.md`
* `package.json`
* `yarn.lock`

`README.md`与`package.json`大家都懂，有`yarn.lock`因为是我们鼓励大家使用[yarn](https://yarnpkg.com/lang/en/),  它比`npm`更快。虽然`npm` 6.0号称提速17倍(可以想象6之前是得有多慢😂)，但经测试，还是不如`yarn`

接下来看`build`, `dist`, `src` 目录

```sh
├── build
│   └── rollup.config.js
├── dist
│   ├── el-data-table.esm.js
│   ├── el-data-table.min.js
│   └── el-data-table.umd.js
├── src
│   ├── el-data-table.vue
│   └── index.js
```

`build` 目录下放编译时的配置文件，这个跟`vue-cli 2.x`生成的模板build目录作用是一样的，只不过这里放置的是`rollup.config.js`。至于为什么用Rollup, 一是因为配置更简单，二是因为它更适合打包类库，当源文件中有`import lib from 'awesome-lib'`类似的代码时，Rollup并不会把`awesome-lib`捆绑输出，这正是开发类库或组件需要的特性

`dist`是输出目录，也有叫`lib`的，我也纠结了好久。看了一些优秀的开源项目，发现叫`dist`的比较多，而`webpack4`默认的输出目录也是`dist`, 因此决定用`dist`。至于`dist`目录下会有三个文件，前文已说过原因。而命名为何不是`camelcase`, 而是`kebab-case`, 后面风格指南会说到

`src`是输入目录。把`index.js`放在`src`目录，也是经过一番考虑。也想把`index.js`跟`package.json`同级，最终参考了`webpack4`, 它默认输入是`src/index.js`, 那就跟主流保持一致。该文件主要工作是把`src`目录下的vue文件设置成vue的插件。同样，vue文件的命名后面风格指南会说到

```sh
├── test
│   └── index.test.js
```

`test`目录下是基于`jest`及`vue/test-utils`的单元测试文件，具体教程可参考[官方文档](https://vue-test-utils.vuejs.org/guides/#testing-single-file-components-with-jest)

```sh
├── docs
│   ├── build
│   └── index.html
├── styleguide.config.js
```

`docs`存放的是组件的api文档，包含`props`, `slot`, `event`等内容的说明，使用的是[vue-styleguidist](https://www.npmjs.com/package/vue-styleguidist)作为vue组件文档生成工具。为啥叫 `docs`呢，因为`Github Pages`支持从`master`分支的`docs`目录读取文件，在仓库`Settings`里选择`Github Pages`的`Source`即可, 具体看[官方文档](https://pages.github.com/)

### 风格指南

vue组件把template/script/style都放在一个vue文件里，这个称之为单文件组件，`Single File Component`，缩写为SFC, 这就是[vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli)中sfc的寓意

通读[vue官方风格指南](https://cn.vuejs.org/v2/style-guide/index.html),  由于我们是`kebab-case`的重度用户，因此我们更看重的是在多个项目中保持相同的大小写规则，以下是摘取的适用于我们团队协作习惯的指南：

* [组件名，应该多个单词](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E5%90%8D%E4%B8%BA%E5%A4%9A%E4%B8%AA%E5%8D%95%E8%AF%8D-%E5%BF%85%E8%A6%81)

这样做可以避免跟现有的以及未来的 HTML 元素[相冲突](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的

* [单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)](https://cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

我们选择使用`kebab-case`

好例子：

```sh
components/
|- my-component.vue
```

* [在 DOM 模板(template)中总是 kebab-case 的](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

好例子:

```sh
<!-- template -->
<my-component></my-component>
```

* [JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串](JS/JSX 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串)

这里我们选择使用`PascalCase`, 因为在编程语言里，`kebab-case`并不是最佳实践。 也即，在非编程语言的范围，我们能用`kebab-case`就用

好例子:

```javascript
Vue.component('MyComponent', {
  // ...
})

import MyComponent from './my-component.vue'

export default {
  name: 'MyComponent',
  // ...
}
```

综上所述，就可以明白前文中el-data-table的文件命名风格为`kebab-case`的原因了

## 参考
1. [How to publish your package on npm](https://hackernoon.com/how-to-publish-your-package-on-npm-7fc1f5aae600)
1. [module-best-practices](https://www.npmjs.com/package/module-best-practices)
1. [npm-style-guide](https://github.com/voorhoede/npm-style-guide)
1. [semver.org](https://semver.org/)
1. [unpkg](https://unpkg.com/#/)
1. [umd](https://github.com/umdjs/umd)
1. [npm scripts](https://docs.npmjs.com/misc/scripts)
1. [.npmignore](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package)
1. [2018 Vue Conf](https://www.vuemastery.com/conferences/vueconf-2018/5-libraries-you-should-know-about-adam-jahr/)
1. [Vue Cookbook](https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html)
1. [Vue Style Guide](https://cn.vuejs.org/v2/style-guide/index.html)
1. [npm-vs-yarn](https://github.com/appleboy/npm-vs-yarn)
1. [Github Pages](https://pages.github.com/)

## 注
本文最早发布在掘金，现迁移至[github](https://github.com/levy9527/blog/issues/2)。