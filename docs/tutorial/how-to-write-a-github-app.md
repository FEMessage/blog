# 🤖如何写一个Github App

## 温馨提示

在继续正文前，先澄清一下：

1. Github App 是需要部署的，Github 并没有提供托管服务。
1. 在 Github Marketplace 上架并非使用 Github App 的必要条件。也即，没有在上面展示，你一样可以安装使用自己的 Github App。


## 快速开始
1. npx create-probot-app your-app
1. cd your-app
1. yarn
1. yarn dev
1. register a Github App
1. install the Github App

实际开发并已上架的App，用于给 pull request 自动打标签：[https://github.com/marketplace/auto-add-label](https://github.com/marketplace/auto-add-label)

开源地址：[https://github.com/levy9527/auto-add-label](https://github.com/levy9527/auto-add-label)

## 安装应用
进入 [https://github.com/settings/apps](https://github.com/settings/apps)


![image](https://user-images.githubusercontent.com/9384365/63631087-fb77dd80-c654-11e9-9ffd-bdd776f15af6.png)


点击安装

![image](https://user-images.githubusercontent.com/9384365/63631075-e0a56900-c654-11e9-8395-3e4fda6b1ee1.png)

![image](https://user-images.githubusercontent.com/9384365/63631094-07639f80-c655-11e9-9545-bababf311129.png)

## 修改权限
进入[https://github.com/settings/apps](https://github.com/settings/apps)

![image](https://user-images.githubusercontent.com/9384365/63631100-23674100-c655-11e9-8250-92195a0c0eb3.png)


![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbpfffxfj318u0bcmzg.jpg)

别忘了，检查下是否订阅了相关事件
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbrc2ox5j31620q479d.jpg)
如果在初始化后，并且已经有用户(比如自己)安装了 Github App，再更改权限，则需重新获得用户的授权

重新授权入口如下
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbrnsvrnj31j60di40u.jpg)

进入后会有提示
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbs0ocn5j317w0i80va.jpg)

重新授权
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbshnm2lj30xu0u077s.jpg)

## webhooks
可以在 Github App 的 Advanced 页面中查看 webhooks 接收情况
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbsr62cjj31oe0om0xx.jpg)

当然也可以使用 [https://smee.io](https://smee.io/) 查看
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbsxqy08j311q0u0gpn.jpg)

## 异常
### 400
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbt74iw1j313a07amyy.jpg)

打开项目根目录下的 `.env` ，复制 `WEBHOOK_SECRET` 的值

进入 Github App 设置页
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbtgm6tbj311g0bewfx.jpg)

修改 Webhook secret 后保存
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbtt0jo2j30zy0g6q53.jpg)

根据经验，每次修改 Webhook 时，最好同时再编辑一次 Webhook secret（即使值没有发生变化），以避免以上情况的发生。
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mbu1ucz7j30u608s0tm.jpg)

## 部署
推荐使用 Heroku:

- [安装 Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
- [部署指南](https://probot.github.io/docs/deployment/#heroku)

需要指出的一点是，使用 Heroku 时网络体验稍差，不知道是否是我的网络问题，表现在两个方面：

1. 我的翻墙工具需要切换为 蓝灯，否则 Heroku Dashboard 几乎无法打开
1. 在 iTerm2 里使用 Heroku CLI 命令时，很容易出现报错 `ENOTFOUND: getaddrinfo ENOTFOUND api.heroku.com api.heroku.com:443` ，需要多次尝试，靠运气成功

可以放心的是，部署后的应用本身，是很稳定的。

## 参考

- [https://probot.github.io/docs/](https://probot.github.io/docs/)
- [https://developer.github.com/webhooks/](https://developer.github.com/webhooks/)
- [https://github.blog/2011-10-19-all-of-the-hooks/](https://github.blog/2011-10-19-all-of-the-hooks/)
