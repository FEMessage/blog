# 组件研发指南（三）：开源协作

# 开源准备
## 前提
已经在私服发布，并在项目中验证

## checklist

- [ ] 在 github 新建仓库
- [ ] 描述是英文，首字母大写，最好开头有 emoji

参考现有仓库
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1564469058026-08736dbd-7284-4915-96d7-ab418c1da8ef.png#align=left&display=inline&height=294&name=image.png&originHeight=588&originWidth=1958&size=416202&status=done&width=979)

- [ ] 提供两份README：
- README.md 是英文的，顶部含一个链接跳到中文
- README-zh.md 中文文档

- [ ] docs 下的 demo 文档，在同一份中，中英双语的
- [ ] docs 下的 guide-xxx 有 中/英 两份

- [ ] 在文档中添加 contributors

- [ ] package.json version 字段修改成 1.0.0
- [ ] package.json description 字段补充英文说明

- [ ] rm -fr .git 删除在 gitlab 的提交记录

- [ ] git init 
- [ ] git add .* *
- [ ] git commit -m ' 🎉 open source'
- [ ] 
- [ ] git remote add origin ${github_repo_url}
- [ ] git checkout -b dev
- [ ] git push origin dev:dev

- [ ] 在github设置默认分支为 dev

- [ ] 在 travis ci 设置环境变量： NPM_TOKEN GITHUB_TOKEN DINGTALK_ROBOT_TOKEN
- [ ] 合并master分支

- [ ] 把 gitlab 的项目 归档掉

# 开源维护
## issue
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562649996929-f62e489e-e67d-4ab2-bdf3-6d39344a7a0c.png#align=left&display=inline&height=276&name=image.png&originHeight=552&originWidth=1990&size=359937&status=done&width=995)
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562650028986-83d8c37e-8ec5-4e76-9582-b5ca05cc83be.png#align=left&display=inline&height=232&name=image.png&originHeight=464&originWidth=1568&size=189789&status=done&width=784)
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

更多具体说明请查看 [yarn 文档](https://yarnpkg.com/zh-Hant/docs/cli/link)

### gihub
在项目中验证过后，再上 github 提 PR
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562650175260-3810ecf5-5bf8-4e70-81ae-d284f2b4ebd4.png#align=left&display=inline&height=248&name=image.png&originHeight=496&originWidth=2030&size=355773&status=done&width=1015)

基于 dev 分支
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562650199732-3b58f5e6-785e-4c31-871a-854044a785dd.png#align=left&display=inline&height=151&name=image.png&originHeight=302&originWidth=1964&size=189973&status=done&width=982)

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

### PR技巧
参考文章：[https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly](https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly)

其中最重要的一点：不要一次提交一个很大改动的PR，否则别人很难 review，要学会拆分步骤。

下面是一个 PR 示例：

拆分前
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1567075387731-e7500ad8-4c27-4860-a30f-3b8f59811890.png#align=left&display=inline&height=139&name=image.png&originHeight=278&originWidth=1638&size=247439&status=done&width=819)


拆分后
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1567075453686-459786c5-d746-4ec2-8bcf-d2bf3622f3ab.png#align=left&display=inline&height=385&name=image.png&originHeight=770&originWidth=1738&size=687818&status=done&width=869)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1567075528820-bbacabdd-18eb-422f-89bc-4a80b8604fb8.png#align=left&display=inline&height=151&name=image.png&originHeight=302&originWidth=1438&size=262051&status=done&width=719)
每个 PR 改动的文件少了，这样 review 起来就更容易了。
