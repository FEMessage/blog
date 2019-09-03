# ⚡️Github集成Netlify：快速预览PR

## 前言
本文将介绍使用Netlify为Github中的开源项目进行持续部署：

每当项目发生一个Pull Request时，Netlify会构建相应的代码，并自动回复，在回复内容提供一个在线链接，可供开发者快速预览此次改动的效果。

## 开始使用

- 直接访问[Netlify网站](https://app.netlify.com/start)，使用Github账号登录

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556165773216-68c20ed9-8cec-41c2-8008-cee315a679f1.png#align=left&display=inline&height=308&name=image.png&originHeight=796&originWidth=1590&size=127420&status=done&width=616)

- 选择一个仓库

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556167307595-4fa8aed7-0ef0-428c-9434-9d556b544b15.png#align=left&display=inline&height=330&name=image.png&originHeight=948&originWidth=1424&size=455617&status=done&width=495)

- 配置构建信息

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556166286531-839b84a7-7440-4072-b9b1-43521aefa001.png#align=left&display=inline&height=342&name=image.png&originHeight=826&originWidth=1484&size=372056&status=done&width=614)

- 还可以配置环境变量

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556171046903-2d8a7afb-4ffa-4496-a583-966ebf43a215.png#align=left&display=inline&height=272&name=image.png&originHeight=720&originWidth=1438&size=265291&status=done&width=544)<br />则在Node.js应用中，可以通过 `process.env.PUBLIC_PATH` 获取值

## 修改名字
第一次部署时，默认的名称是随机生成的，可以修改，方便识别并访问<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556166447476-242ada57-68ae-4708-8df9-162c07f6b925.png#align=left&display=inline&height=170&name=image.png&originHeight=432&originWidth=1340&size=184737&status=done&width=528)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556167384605-a3c58e8d-20a1-4ccc-8eb0-32070f16b812.png#align=left&display=inline&height=269&name=image.png&originHeight=836&originWidth=1810&size=371925&status=done&width=583)<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556167207637-a65e1dcc-d4e4-474a-8123-23727544147a.png#align=left&display=inline&height=270&name=image.png&originHeight=646&originWidth=1188&size=199730&status=done&width=497)<br />名字即修改成功，这样访问的域名就更好记了。

## 设置通知
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556166868736-2b67a6e5-7cf1-4173-b017-152c0ea825ba.png#align=left&display=inline&height=354&name=image.png&originHeight=1162&originWidth=2448&size=1176949&status=done&width=746)<br />选择事件为“部署成功后”<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556166891913-d7de3a5b-aa92-4305-81e0-e7008548a7bb.png#align=left&display=inline&height=303&name=image.png&originHeight=624&originWidth=1184&size=155852&status=done&width=575)<br />以后项目有Pull Request时，Netlify就是自动构建，并在成功后自动给Pull Request添加回复👏<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1556167041582-c119f51c-5308-40fa-8e43-60939f6f048f.png#align=left&display=inline&height=455&name=image.png&originHeight=928&originWidth=1522&size=530485&status=done&width=746)

## 集成Gitlab
Netlify也可以集成[Gitlab](https://gitlab.com/)上的私密仓库，其操作与本文对Github的描述别无二致，唯一不同的是，部署成功进行一个评论时，Gitlab需要access token
![image](https://user-images.githubusercontent.com/9384365/58619773-25409300-82f8-11e9-8930-baf6be2f7640.png)

可以登录Gitlab后，点击头像 -> 用户设置 -> 访问令牌里获取，范围勾选`api`
![image](https://user-images.githubusercontent.com/9384365/58620017-a7c95280-82f8-11e9-9b09-249bd457ac04.png)

生成后复制到Netlify即可

## 注

[原文地址](https://github.com/levy9527/blog/issues/4)