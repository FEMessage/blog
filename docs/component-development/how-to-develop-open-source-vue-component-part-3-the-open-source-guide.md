# 组件研发指南（三）：开源协作

# 开源准备
## 前提
已经在私服发布，并在项目中验证

## checklist

- [ ] 在 github 新建仓库
- [ ] 描述是英文，首字母大写，最好开头有 emoji

参考现有仓库
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nizcjynzj31jm0hkq68.jpg)

- [ ] 提供两份README：
README.md 是英文的，顶部含一个链接跳到中文
README-zh.md 中文文档

- [ ] docs 下的 demo 文档，在同一份中，中英双语的
- [ ] docs 下的 guide-xxx 有 中/英 两份

- [ ] 在文档中添加 contributors

- [ ] package.json version 字段修改成 1.0.0
- [ ] package.json description 字段补充英文说明

- [ ] rm -fr .git 删除在 gitlab 的提交记录

- [ ] git init 
- [ ] git add .* *
- [ ] git commit -m ' 🎉 open source'

- [ ] git remote add origin ${github_repo_url}
- [ ] git checkout -b dev
- [ ] git push origin dev:dev

- [ ] 在github设置默认分支为 dev

- [ ] 在 travis ci 设置环境变量： NPM_TOKEN GITHUB_TOKEN DINGTALK_ROBOT_TOKEN
- [ ] 合并master分支

- [ ] 把 gitlab 的项目 归档掉

# 开源维护
## issue
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj50gbvtj31ja0fc41h.jpg)
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj57s11lj317k0cwmym.jpg)
### bug
按照模板填写描述

```markdown
## Describe the bug
A clear and concise description of what the bug is.

## Screenshots
If applicable, add screenshots to help explain your problem.

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected behavior
A clear and concise description of what you expected to happen.

## environment information
 - Version [e.g. 22]
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
```

## pull request
### 项目验证
在组件里，内置的是单元测试，新增了功能或修复了bug，通过单元测试后，还不能掉以轻心，需要到项目中去验证一下。

首先 `yarn build:umd` 生成最新的 dist 内容

再使用 `yarn link` ，即可实现不发包，在本地对新功能进行测试。

验证之后，合并PR时才更有信心，也即此举能提高PR合并的成功率。

下面附下 `yarn link` 操作说明。

假设项目路径为 `/path/poject` ，组件名为 `my-component` ，组件所在路径为 `/path/my-component`  则相关操作为：

- cd /path/my-component
- yarn link
- cd /path/project
- yarn link my-component

则可以在项目中通过引用本地组件

```javascript
import MyComponent from 'my-component'
```

验证完毕，记得在项目中清除link

```js
// https://yarnpkg.com/zh-Hant/docs/cli/link
yarn unlink my-component
```

想要查看项目中link状态，使用以下命令

```sh
# https://github.com/yarnpkg/yarn/issues/1722
( ls -l node_modules ; ls -l node_modules/@* ) | grep ^l
```

### gihub
在项目中验证过后，再上 github 提 PR
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj5divggj31ke0dsacw.jpg)

基于 dev 分支
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj5ojnpzj31ik08emyu.jpg)

按照模板提交

```markdown
## Why
Why is this change required? What problem does it solve?

## How
Describe your steps:
1. one step
2. two step...

You may use xmind or other mind map to show you logic

## Test
Show your test case

you'd better show `before` and `after` 

## Docs
It there requires a change to the documentation？
```
