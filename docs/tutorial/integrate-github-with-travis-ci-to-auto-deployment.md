# 🚀Github集成Travis CI：自动发布

# 前言

已经有阮一峰老师的[持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)，为什么还要写这篇文章？

原因有二：

1. 文章内容有些过时
1. 文章覆盖度不够，有些实践细节没写出来

由于以上原因，纵然可以笔者很快在Github集成Travis CI并成功构建，但在发布时却踩了一些坑，折腾一波才终于发布成功。故写下此文，旨在补充更多的细节，帮助他人少走弯路。

# 正文

## 免费购买Travis CI应用

点击 [https://github.com/marketplace/travis-ci](https://github.com/marketplace/travis-ci)，登录后免费购买(开源项目集成Travis CI不收费)。

## 选择关联仓库

选择个人或组织名下需要关联Travis CI的Github仓库。

已经设置过的，想进行修改，可以在Github的 Personal settings-> Applications 中进入。<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552699916365-0a309745-c830-480e-8c8f-58b2dde3f7bc.png#align=left&display=inline&height=285&originHeight=381&originWidth=227&size=0&status=done&width=170#align=left&display=inline&height=381&originHeight=381&originWidth=227&status=done&width=227)![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1552695398638-13ec5516-3002-4a74-bf08-099b32f2b612.png#align=left&display=inline&height=259&name=image.png&originHeight=958&originWidth=1992&size=408088&status=done&width=538#align=left&display=inline&height=359&originHeight=958&originWidth=1992&status=done&width=746)

![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552695750384-cc7d516e-c10d-4553-8811-84ac13f3ee4f.png#align=left&display=inline&height=352&originHeight=632&originWidth=1340&status=done&width=746)

## 编写CI文件

在项目根目录下新建 `.travis.yml` 文件

```bash
touch .travis.yml
```

### 发布到github pages
下面展示一个可以发布到gh-pages的例子，可以稍做修改，复制粘贴使用。

该示例包含了：

* 指定node.js版本
* 使用yarn进行安装依赖及构建
* 对安装需要的依赖进行了缓存
* 设置了两个不含敏感信息的环境变量
* 设置了一个含有敏感信息的环境变量
* 把构建生成的文件部署至github pages

```yaml
language: node_js
node_js:
- lts/*
env:
- API_SERVER=https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock PUBLIC_PATH=http://levy.work/nuxt-element-dashboard/
# 默认是yarn, 如果有yarn.lock的话
install:
- yarn
# 默认是 yarn test
script:
- yarn build
cache: yarn
deploy:
  provider: pages
  skip-cleanup: true
  keep-history: true
  local-dir: dist
  on:
    branch: master
  github-token: $GITHUB_TOKEN
```

下面对文件进行说明。

```yaml
language: node_js
node_js:
- lts/*
```

* 第1行指定了构建环境为node.js
* 第2、3行指定使用node.js最新的LTS版本

```yaml
env:
- API_SERVER=xxx PUBLIC_PATH=xxx
```

上面是设置两个环境变量。

注意，一次构建中传多个环境变量，必须写在同一行，使用空格分开。

```yaml
env:
- API_SERVER=xxx 
- PUBLIC_PATH=xxx
```

如果写成上面的形式，则会变成两个构建，每一个构建中只有一个环境变量。

```yaml
install:
- yarn
script:
- yarn build
cache: yarn
```

上面指定使用yarn进行安装依赖，安装好后执行 `yarn build` 命令; 为yarn的依赖加速安装，开启了缓存。

下面是最关键的部署配置。

```yaml
deploy:
  provider: pages
  github-token: $GITHUB_TOKEN
  skip-cleanup: true
  keep-history: true
  local-dir: dist
  on:
    branch: master
```

* 第2行指定部署到Github Pages，即仓库的 `gh-pages` 分支，请确保仓库的pages分支是 `gh-pages` , [相关操作可以看这里](#b637c71e)
* 第3行指定保留构建后的文件
* 第4行指定每次部署会新增一个提交记录再推送，而不是使用 `git push --force`
* 第5行指定构建后要部署的目录
* 第6、7行指定 `master` 分支有提交行为时，将触发构建后部署
* 第8行是部署需要用到的`github-token`,其中`$GITHUB_TOKEN`是变量，它可以在Travis CI个人仓库的setting页里设置，[相关操作可以看这里](#74ae38aa)

### 发布到npm
再给出把node.js模块发布到npm的例子

主要是 `deploy` 这里有所不同

```yaml
deploy:
  provider: npm
  email: <your_email>
  # api_key: travis encrypt NPM_TOKEN --add deploy.api_key --com
  on:
    branch: master
  skip-cleanup: true
```

api_key指的的npm的token，可以登录npm后，在个人中心生成<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1555237926690-d79ff285-afdc-4ff8-ab58-3693930e57dc.png#align=left&display=inline&height=344&originHeight=688&originWidth=1944&size=0&status=done&width=972)

因为不能泄露，所以要通过travis ci的命令行工具进行加密，执行以下命令

```
travis encrypt NPM_TOKEN --add deploy.api_key --com
```

### 复杂例子
下面是一个复杂的例子，也是实际用到的配置，主要是
- master分支才会触发构建
- 执行script命令前先读取shell中的环境变量，并生成`.env`文件
- 构建成功后
  - 把模块发布到npm
  - 把文档发布到gh-pages

```yaml
branches:
  only:
    - master
language: node_js
node_js:
- lts/*
git:
  depth: 3
install:
- yarn --frozen-lockfile
before_script: echo OSS_KEY=$OSS_KEY\\nOSS_SECRET=$OSS_SECRET\\nOSS_BUCKET=$=OSS_BUCKET\\nOSS_REGION=$OSS_REGION > .env
script:
- yarn build
cache: yarn
deploy:
- provider: pages
  local-dir: docs
  github-token: $GITHUB_TOKEN
  skip-cleanup: true
  keep-history: true
- provider: npm
  email: levy9527@qq.com
  api_key: $NPM_TOKEN
  skip-cleanup: true
```

## 相关操作
### 使用travis命令行工具加密
加密要用到travis命令行工具，如果是在travis ci web界面设置环境变量，则可直接跳过。

下面给出mac环境下操作需要注意的点

1.安装命令：
```bash
brew install travis
```

否则很可能会出现[问题](https://github.com/travis-ci/travis.rb/issues/190)

2.确保在 https://travis-ci.org/ sign in with github

3.然后在项目根目录里，执行命令

```bash
travis login —auto
```

4.修改git设置

```bash
vi .git/config
```

确保

```bash
[travis]
  slug = 是你在travis关联的仓库
```

5.添加加密环境变量

```bash
travis encrypt github-token=xxx --add deploy.github-token --com
```

因为笔者登录的travis ci域名是 [https://travis-ci.com](https://travis-ci.com)，所以要带参数 `--com` ， 默认是 [https://travis-ci.org](https://travis-ci.org)

### 通过环境变量设置GITHUB_TOKEN

首先为Travis CI新建一个token<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552699916365-0a309745-c830-480e-8c8f-58b2dde3f7bc.png#align=left&display=inline&height=285&name=&originHeight=381&originWidth=227&status=done&width=170#align=left&display=inline&height=381&originHeight=381&originWidth=227&status=done&width=227)![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552699974567-7208da19-fdb5-4c43-b19b-61acfb4c4783.png#align=left&display=inline&height=184&name=&originHeight=184&originWidth=254&size=0&status=done&width=254#align=left&display=inline&height=184&originHeight=184&originWidth=254&status=done&width=254)![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552700133575-16c48b5a-fe9c-4eb4-a6ab-cf4e066d5881.png#align=left&display=inline&height=204&name=&originHeight=204&originWidth=262&size=0&status=done&width=262#align=left&display=inline&height=204&originHeight=204&originWidth=262&status=done&width=262)

点击生成新token<br />![](https://cdn.nlark.com/yuque/0/2019/png/160590/1552700229186-44a679d9-254f-4377-94bd-ac115e345cec.png#align=left&display=inline&height=64&name=&originHeight=82&originWidth=961&size=0&status=done&width=746#align=left&display=inline&height=64&originHeight=82&originWidth=961&status=done&width=746)

设置权限

![image.png](https://camo.githubusercontent.com/ebf7a6eb9efa27c6e67aa6f4a619600d552177f8/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f706e672f3136303539302f313535323730303335313531302d35363965386361642d656363342d343230612d613763302d6439346366383761363633322e706e6723616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d353136266e616d653d696d6167652e706e67266f726967696e4865696768743d31303332266f726967696e57696474683d313232382673697a653d353938333234267374617475733d646f6e652677696474683d36313423616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d363237266f726967696e4865696768743d31303332266f726967696e57696474683d31323238267374617475733d646f6e652677696474683d373436)<br />复制生成的token。(记得先不要刷新或离开当前页面，否则token就看不见了，只能重新生成)

登录Travis CI, 进入要集成的项目设置页。

![image.png](https://camo.githubusercontent.com/f85e1e3768101a72602e4196cd116ce8e3ef7400/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f706e672f3136303539302f313535323730303630363736332d38303235396132322d653330652d343734652d616535302d6333313935383336376631662e706e6723616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d333438266e616d653d696d6167652e706e67266f726967696e4865696768743d363936266f726967696e57696474683d323534302673697a653d343334323739267374617475733d646f6e652677696474683d3132373023616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d323034266f726967696e4865696768743d363936266f726967696e57696474683d32353430267374617475733d646f6e652677696474683d373436)

添加环境变量`GITHUB_TOKEN`

注意，这里的环境变量是通过bash设置、并在.yml里读取的，所以变量名是大写加下划线形式，这是bash的最佳实践，千万别写成`github-token`

![image.png](https://camo.githubusercontent.com/79fc1975b05507406c16199e74ff88dcc5135b86/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f706e672f3136303539302f313535323730303639323934352d64633864633631362d363832392d346332622d616661652d3931353062613030313339382e706e6723616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d333030266e616d653d696d6167652e706e67266f726967696e4865696768743d363030266f726967696e57696474683d313930362673697a653d323236383538267374617475733d646f6e652677696474683d39353323616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d323335266f726967696e4865696768743d363030266f726967696e57696474683d31393036267374617475733d646f6e652677696474683d373436)

### GitHub Pages
查看`gh-pages`分支的部署情况

进入仓库 Settings -> Options

![image.png](https://camo.githubusercontent.com/04cd0a6cfed07d7ffbdc94dd5b6d2581e4b5e308/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f706e672f3136303539302f313535323639393539363430322d30383230346638612d356633362d343938362d616262372d6530623365616137616236652e706e6723616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d313030266e616d653d696d6167652e706e67266f726967696e4865696768743d323030266f726967696e57696474683d313630362673697a653d313134343838267374617475733d646f6e652677696474683d38303323616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d3933266f726967696e4865696768743d323030266f726967696e57696474683d31363036267374617475733d646f6e652677696474683d373436)

往下翻看，可以看到效果<br />![image.png](https://camo.githubusercontent.com/39c0771c595e8532683831f8c5a1a67c43ab5886/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323031392f706e672f3136303539302f313535323639393633313630352d37623031386334612d396534662d343430352d393432332d3933343566336162313665332e706e6723616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d323434266e616d653d696d6167652e706e67266f726967696e4865696768743d343838266f726967696e57696474683d313338302673697a653d323738373434267374617475733d646f6e652677696474683d36393023616c69676e3d6c65667426646973706c61793d696e6c696e65266865696768743d323634266f726967696e4865696768743d343838266f726967696e57696474683d31333830267374617475733d646f6e652677696474683d373436)<br />因为笔者自定义了域名，所以地址不是默认的 [https://xxx.github.io/xxx](https://xxx.github.io/xxx)

## 注

[原文地址](https://github.com/levy9527/blog/issues/1)