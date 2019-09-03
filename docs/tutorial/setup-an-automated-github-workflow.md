# 🤖自动化的Github Workflow

## 前言
本文说明了我们的开源项目的Github协作流程，并解释了如何做到规范化及自动化。

内容涉及：

1. 内容模板
1. 分支模型
1. CI集成
1. 自动生成Release Notes

最终的效果是：

1. 不需要提交构建产物到仓库
1. 合并/发布操作完全在线化，维护者不需要拉取最新代码到本地。

## 正文
### 内容模板
内容模板包括：

- ISSUE_TEMPLATE
- PULL_REQUEST_TEMPLATE

可以在仓库里新建一个隐藏文件夹 `.github` , 里面放两个文件：

- ISSUE_TEMPLATE.md
- PULL_REQUEST_TEMPLATE.md

也可以通过界面设置。在仓库设置里，点击“Set up templates”<br />
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5ffbcrjj315g0qndkv.jpg)

如果是组织，想为所有项目设置模板，则可以在组织下建立一个名为 `.github` 的仓库, 再重复上面的过程即可<br />
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5fp1qonj310e0ngq6b.jpg)

具体内容参考我们的[仓库设置](https://github.com/FEMessage/.github)

### 分支模型
仓库有两个基础分支：

1. dev（默认分支）
1. master（用于发布）

通过pull request来合并新的代码：

- 协作者的代码通过pr合并到dev
- dev通过pr合并到master

注意点：

- merge 到 dev，使用squash merge

![squash merge](https://cdn.nlark.com/yuque/0/2019/png/160590/1560580837435-bbfbe99e-afd7-413f-a69c-6773c313056f.png)

- merge 到 master，使用普通的merge
- 永远不向master直接commit代码



### CI集成
推荐两个工具：

1. netlify
1. travis ci

netlify的作用是，当有新的pr发生时，可以提前预览修改后构建的产物。可以查看[netlify使用教程](https://github.com/levy9527/blog/issues/4)

travis ci的作用是，master有代码更新时，自动构建发布。可以查看[travis ci使用教程](https://github.com/levy9527/blog/issues/1)

### 自动生成Release Notes
让我们渐进式地实现这个功能。

首先要规范化commit message，具体可以查看[Commit Message Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)，这个叫做[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)。

摘取重点如下，格式为：

```sh
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中`<type>`: `<subject>` 是必须的。

type的类型有：

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

规范了commit信息后，就可以使用工具[standard-version](https://github.com/conventional-changelog/standard-version)自动化以下操作：

- 更新package.json里的version字段
- 生成新的git tag
- 生成CHANGELOG.md
- 把package.json, CHANGELOG.md的改动提交至git仓库，生成相关的commit

如果觉得commit规范不好记，可以使用工具：[https://github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli)

也可以使用vscode的插件：[vscode-commititzen](https://marketplace.visualstudio.com/itemdetails?itemName=KnisterPeter.vscode-commitizen)

如果想阻止不规范的提交，可以使用工具：[https://github.com/conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)

以上操作对非开源项目也适用，是可以在公司产品、项目中推广的方式。

如果要针对 Github 生成 Release Notes，可以借助工具：[https://github.com/github-tools/github-release-notes](https://github.com/github-tools/github-release-notes)

## 误区
#### dev分支不是最新的
结论：master的commit次数会比dev多，但dev的功能代码是比master新的。

解释：因为master合并dev的代码会产生一个commit，同时又因为自动生成Release Notes时，CI会修改package.json，并新增一个commit，所以master永远有比dev多出的commit

下图是dev合并了pr，还master还未合并dev的情况：master既有领先，又有落后。<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5gyru0uj315g05jabe.jpg)

以下是master合并了dev，并且通过CI成功发布后的情况<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5h8bb75j315g054aba.jpg)
#### 在dev分支查看package.json
结论：以npm上的版本为准，可以查看README.md的图标<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5hft89hj315g07j0tm.jpg)

解释：接入CI后，package.json的修改不再由人工操作，所以dev的package.json不会得到更新。<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6m5hjt1pqj315g0ietc9.jpg)

