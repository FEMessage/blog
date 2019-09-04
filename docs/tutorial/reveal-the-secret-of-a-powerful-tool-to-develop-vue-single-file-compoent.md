# 🔨揭秘vue-sfc-cli：组件研发利器
## 前言
本文将揭示vue单文件组件的工具 [vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli) 的内涵，说明它是如何在整个组件研发流程中提升效率的。

本文可以看成是 [📦vue组件发布npm最佳实践](https://github.com/levy9527/blog/issues/2) 的成长篇，是 [🤖自动化的Github Workflow](https://github.com/levy9527/blog/issues/12) 的姐妹篇，是团队最佳实践的落地产物，涉及的背景知识有点多，需要花点时间消化🤔

## 使用教程
### 快速开始
```bash
npx vue-sfc-cli

# 接下来会有一串的提示，请务必填写
# 推荐kebab-case风格，小写字母，多个单词用-（dash）分隔，如my-component

# 填充完提示后
cd my-component

# 使用git初始化，这样可以使用commit hook
git init

# 安装依赖
yarn

# 开始开发
yarn dev

# 打包
yarn build

# 可以发布了！
yarn publish
```


### 参数选项
`-u, --upgrade`
根据 template目录下模板，生成新的文件，更新到当前组件中。使用的是覆盖策略，默认覆盖的文件定义在 update-files.js。常用于使用最新版本vue-sfc-cli对旧组件的配置进行升级
```bash
# cd my-component
npx vue-sfc-cli -u
```

`--files`
如果想更新额外的文件，可以传此选项，后接文件名，多个文件使用 `,` 分隔
```bash
npx vue-sfc-cli -u --files package.json,.babelrc.js
```

`--test`
生成一个测试的组件模板，常用于ci环境测试。
```bash
npx vue-sfc-cli --test
```

### 示例文档
在docs目录下，新建 `md` 文件，建议命名同样是kebab-case

以上传组件[upload-to-ali](https://github.com/FEMessage/upload-to-ali)的 docs/draggable.md 文档为例 
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njnx6bzxj315q0ncmyy.jpg)

`yarn dev` 时会转这个markdown文件就会换成demo，可以看到实际代码，还可以实时修改代码，让demo刷新

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njzaqijoj31fe0ra0vh.jpg)
### API文档
在vue文件里，编写注释，即可生成API文档。

#### props
在props里使用多行注释
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njp9z99jj315w0comxo.jpg)
#### slot
在slot上一行，使用  @slot 开头的注释
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njpim5svj315u0b80u4.jpg)
#### event
在emit事件上方，使用多行注释
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njptoul6j315o07q74q.jpg)
#### methods
在要公开显示的方法上方，使用多行注释，并添加 @public
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njq2ydpaj315i0a2aak.jpg)

效果预览
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njqezjjkj31q70u0k18.jpg)
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njqlyo25j31lt0u0tg0.jpg)

### 引入第三方库
以[Element-UI](https://element.eleme.io/)为例

```bash
yarn add element-ui
```

新增一个文件：`styleguide/element.js`

```javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
```

修改配置文件：`styleguide.config.js`

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njqyuhg1j314k084q36.jpg)

### 环境变量
如果需要使用环境变量，推荐使用 `dotenv` 

```bash
yarn add dotenv --dev
```

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njrhmhsvj315q0i6dh4.jpg)

### prettier and husky
组件模板内置prettier, 可以在提交代码时格式化。

注意的是需要先执行 `git init` 命令，之后再执行 `yarn` 安装依赖，否则提交钩子不生效。

### 注意
不建议在Windows下生成组件,因为.sh可能没有执行权限。 

## 技术详解
### 技术概览

- [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) 本地开发demo与生成文档
- [jest](https://jestjs.io/docs/en/getting-started) 单元测试
- prettier + husky 代码格式化
- [rollup](https://rollupjs.org/) 打包
- [standard-version](https://github.com/conventional-changelog/standard-version) 自动生成changelog
- [github-release-notes](https://github.com/github-tools/github-release-notes) 生成github release
- [auto-add-label](https://github.com/levy9527/auto-add-label) 为pr自动添加label
- netlify 预览pr
- travis ci 发布npm/github pages
- shell + dingtalk api 发布成功后发送钉钉消息
- [all-contributors](https://github.com/all-contributors/all-contributors) 显示贡献者
- 内置README.md模板，包括目录结构、返回顶部以及一些常见的badge

### 模板目录
以下是生成的组件默认模板配置
```shell
├── .all-contributorsrc  # all-contributors配置
├── .babelrc 
├── .editorconfig
├── .gitignore
├── .grenrc.js           # github-release-notes配置
├── .prettierignore      # prettier配置
├── .prettierrc          # prettier配置
├── .travis.yml          # travis ci配置
├── LICENSE              # MIT
├── README.md            # 自述文件
├── build                # rollup配置
│   └── rollup.config.js
├── build.sh             # ci相关文件
├── dist                 # 打包输出目录
├── docs                 # 使用文档，这些md会转换成demo
│   ├── basic.md 
├── notify.sh            # ci相关文件，用于钉钉通知
├── package.json
├── src                   # 源文件目录
│   ├── index.js
│   └── upload-to-ali.vue # 单文件组件
├── styleguide.config.js  # vue-styleguidist配置文件
└── yarn.lock 
```

### 开发
选用[vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist)的原因是，好处是：书写md，既可以充当文档，又可以转换成可运行的demo。

这样的好处是，文档与demo一体化，不用同时维护两份代码。

修改md、修改源文件，demo是会hot reload的，非常方便。

### 测试
对于组件的测试，大家首先想到的是相关的工具集[vue-test-utils](https://vue-test-utils.vuejs.org/guides/#getting-started)，然后觉得，组件测试有点难写，或者说，不知道怎么写。

其实可以换个思路，先从简单的做起。做单元测试，更重要的是培养写测试的习惯，所以一开始建议只用jest对纯函数进行测试。

也即，把组件里的方法抽取出来，单独放到一个文件里，然后专门对这些函数进行测试。

这样的好处是，为了方便测试：

- 开发者在写组件时，需要尽可能地写短小精悍的函数
- 函数要写成纯函数，也即不依赖或影响到全局变量

这样的方法，也很适合对一个完全没有测试的组件，逐步补充测试用例。

下面是 [el-data-table](https://github.com/FEMessage/el-data-table) 对纯函数测试的代码示例

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njyb3t9gj31520cyt9u.jpg)

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njy63k0uj31500ki40k.jpg)

更多请看：✅使用jest进行测试驱动开发

### 构建
`yarn build` 即可构建生成三个文件：

- upload-to-ali.esm.js
- upload-to-ali.min.js
- upload-to-ali.umd.js

使用者import组件时，默认import进来的是 upload-to-ali.umd.js。 关于三个文件的相关描述，📦vue组件发布npm最佳实践 已阐述过，就不重复了。

rollup的一个特点是，默认不会把组件的依赖一起打包进去，这个特性有利于减少组件的分发体积。

下面是个示例：

```javascript
// src/index.js
const crypto = require('crypto')
const axios = require('axios')
```

执行 `yarn build` , 会得到以下信息
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nk18iw4xj316y05aq49.jpg)
请不用担心这个警告，这是有意而为之的，因为不想把依赖把打包进dist进去了。

### commit规范
在继续下面的内容之前，再复习一下[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

摘取重点如下，格式为：
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
其中`<type>`: `<subject>` 是必须的。

type的类型有：

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

另外约定，更新依赖使用 chore(deps)，这也是github官方的做法

### PR自动打标签
由于[github-release-notes](https://github.com/github-tools/github-release-notes)生成的release notes只对打上了label的Pull Request才有效，因此给github仓库添加一个[自动添加label的机器人](https://github.com/levy9527/auto-add-label)，避免重复劳动。

#### 流程详解
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nk4bfl87j30ua0e2dhy.jpg)
#### .grenrc.js

.grenrc.js是github release notes 的配置, 这是参考了nuxt、github以及其他流行仓库后得到的配置，可以拿来即用

```js
module.exports = {
  dataSource: 'prs',
  prefix: '',
  ignoreLabels: ['duplicate', 'help wanted', 'invalid', 'question', 'wontfix'],
  ignoreIssuesWith: [
    'duplicate',
    'help wanted',
    'invalid',
    'question',
    'wontfix'
  ],
  onlyMilestones: false,
  changelogFilename: 'CHANGELOG.md',
  template: {
    issue: '- {{name}} [{{text}}]({{url}})',
    group: '\n### {{heading}}\n'
  },
  // https://github.com/nuxt/nuxt.js/releases
  // https://gitmoji.carloscuesta.me
  groupBy: {
    '✨ New Features:': ['enhancement'],
    '🐛 Bug Fixes:': ['bug'],
    '📖 Documentation:': ['documentation'],
    '💅 Refactors:': ['refactor'],
    '♻️ Tests:': ['test'],
    '🚀 Performance:': ['performance'],
    '⚓ Dependency upgrades:': ['dependencies'],
    '🏡 Chore:': ['chore'],
    '💄 Style:': ['style'],
    '🎩 Hack': ['hack']
  }
}
```

### 自动发布
#### Travis CI
主要利用Travis CI做到自动化，先看下面的 `.travis.yml` 配置：

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nju941mej31240u0go8.jpg)

上面参数的具体说明，可以参考教程：[🚀Github集成TravisCI：自动发布](https://github.com/levy9527/blog/issues/1)

#### 流程详解
其主要流程如下图所示：
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nk5dsnyzj31do0t6gqs.jpg)
#### build.sh
build.sh内容如下：
```bash
#!/bin/sh
yarn stdver

yarn build

git remote add github https://$GITHUB_TOKEN@github.com/FEMessage/upload-to-ali.git > /dev/null 2>&1
git push github HEAD:master --follow-tags
```

与之相对应的，package.json里scipts需要有以下字段：
```json
"stdver": "standard-version -m '[skip ci] chore(release): v%s'",
"release": "gren release --override"
```

notify.sh内容如下：
```bash
#!/bin/sh
if [ "$TRAVIS_TEST_RESULT" != "0" ]
then
echo "build not success, bye"
exit 1
fi

url=https://api.github.com/repos/FEMessage/upload-to-ali/releases/latest
resp_tmp_file=resp.tmp

curl -H "Authorization: token $GITHUB_TOKEN" $url > $resp_tmp_file

html_url=`cat $resp_tmp_file | sed -n 5p | sed 's/\"html_url\"://g' | awk -F '"' '{print $2}'`
body=`cat $resp_tmp_file | grep body | sed 's/\"body\"://g;s/\"//g'`

msg='{"msgtype": "markdown", "markdown": {"title": "upload-to-ali更新", "text": "@所有人\n# [upload-to-ali]('$html_url')\n'$body'"}}'

curl -X POST https://oapi.dingtalk.com/robot/send\?access_token\=$DINGTALK_ROBOT_TOKEN -H 'Content-Type: application/json' -d "$msg"

rm $resp_tmp_file
```

这里有两个关键点：

- 构建失败，不发送消息
- 调用github api获取最新release时，带上github token

### README.md
参考了优秀开源项目后，我们搜索出了一套README.md模板，内置在初始化工程里了
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njszpy1dj319o0u0416.jpg)

还有常见的badge
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njssu1jmj310e02swez.jpg)

以及contributors
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6njsleix6j31as0u00zp.jpg)
相关emoji代表的意思，可以看[官方文档](https://allcontributors.org/docs/en/emoji-key)

## 结语
最后，欢迎大家使用[https://github.com/FEMessage/vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli)开发vue组件～
