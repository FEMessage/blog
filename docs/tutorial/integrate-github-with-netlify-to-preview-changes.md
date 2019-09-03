# ⚡️Github集成Netlify：快速预览PR

## 前言
本文将介绍使用Netlify为Github中的开源项目进行持续部署：

每当项目发生一个Pull Request时，Netlify会构建相应的代码，并自动回复，在回复内容提供一个在线链接，可供开发者快速预览此次改动的效果。

## 开始使用

- 直接访问[Netlify网站](https://app.netlify.com/start)，使用Github账号登录

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mancjsx0j31860m4n0b.jpg)

- 选择一个仓库

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb4t9f6uj313k0qcq6h.jpg)

- 配置构建信息

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb54a8ivj31580my778.jpg)

- 还可以配置环境变量

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb5nyxo4j313y0k0mz9.jpg)<br />则在Node.js应用中，可以通过 `process.env.PUBLIC_PATH` 获取值

## 修改名字
第一次部署时，默认的名称是随机生成的，可以修改，方便识别并访问<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb62cm6xj31180c0myr.jpg)

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb6nncttj31ea0n8q63.jpg)<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb6zhio0j30x00hytao.jpg)<br />名字即修改成功，这样访问的域名就更好记了。

## 设置通知
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb7evtg4j31r70u0gv7.jpg)<br />选择事件为“部署成功后”<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb7ljpz6j30ww0hctac.jpg)<br />以后项目有Pull Request时，Netlify就是自动构建，并在成功后自动给Pull Request添加回复👏<br />![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mb85jf6kj316a0pswiv.jpg)

## 集成Gitlab
Netlify也可以集成[Gitlab](https://gitlab.com/)上的私密仓库，其操作与本文对Github的描述别无二致，唯一不同的是，部署成功进行一个评论时，Gitlab需要access token
![image](https://user-images.githubusercontent.com/9384365/58619773-25409300-82f8-11e9-8930-baf6be2f7640.png)

可以登录Gitlab后，点击头像 -> 用户设置 -> 访问令牌里获取，范围勾选`api`
![image](https://user-images.githubusercontent.com/9384365/58620017-a7c95280-82f8-11e9-9b09-249bd457ac04.png)

生成后复制到Netlify即可

## 注

[原文地址](https://github.com/levy9527/blog/issues/4)
