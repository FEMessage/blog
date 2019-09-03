# 🕸捕获与改写HTTPS请求
## 前言
本文站在 macOS 用户的角度下，分享一下对 HTTPS 进行请求拦截、对响应进行修改的经验。

要注意的是，本文介绍的工具虽然一定程度上对 Windows 用户也适用 ，但并非所有工具都是免费的。

## Proxyman
[Proxyman](https://proxyman.io)可以免费使用，在安卓/IOS手机上也有相应的解决方案，如果只是监测请求，查看 API 请求头及响应体，这个足够了。
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l8bghatxj309u02sglp.jpg)
## Charles
Charles 是收费的，而且要安装 Java 环境，但它厉害的地方在于，可以改写网络（如修改响应头），因此值得一买。

唯一的缺点就是，官方文档不太好友，界面有一定上手难度，好在文本已有图文并茂的说明。
### 安装与设置

- 进入[官网下载](https://www.charlesproxy.com/documentation/installation/)
- 开启 macOS 代理

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l99nejo8j30mw0jq0vp.jpg)

- 安装SSL证书

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l8xuepk7j31kc0rs79e.jpg)

- 点击安装后，在界面搜索 **Charles**，找到刚刚安装的证书，点击 **总是信任**

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l8ytbdzaj31le0rsaia.jpg)

- SSL代理设置

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l98xdkyyj30ps0jeq62.jpg)
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l9dn1rnaj30ww0oktcd.jpg)
### 改写网络
下面的例子展示了如何改写 HTTPS 请求的响应头。

- 点击左上角，**Structure**
- 找到想改写的请求，右键，点击 **Breakpoints**

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l9pdko9dj30ig0v2adr.jpg)

- **Breakpoints Settings**

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6l9y13bpyj30ny0j2gpg.jpg)

- 双击编辑详情

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6la131247j30u00iotay.jpg)

- 取消 **Request** 的勾选

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6la2uqwr0j30og0gaq4j.jpg)

- 刷新页面，请求将会被拦截，处理 Pending 状态

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6laapappsj31yw09cdi9.jpg)

- 此时可以编辑响应

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6labk7pxfj31o20m0n2g.jpg)

- 最终，客户端收到的是被改写后的响应

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6laczflmzj31m40cedje.jpg)

## 参考

- [https://deliveroo.engineering/2018/12/04/how-to-use-charles-proxy-to-rewrite-https-traffic-for-web-applications.html](https://deliveroo.engineering/2018/12/04/how-to-use-charles-proxy-to-rewrite-https-traffic-for-web-applications.html)
- [how-to-configure-ssl-certificates-with-charles-web-proxy-and-the-latest-android](https://stackoverflow.com/questions/3976728/how-to-configure-ssl-certificates-with-charles-web-proxy-and-the-latest-android)
- [charles-proxy-not-working-with-chrome](https://stackoverflow.com/questions/25697849/charles-proxy-not-working-with-chrome)
- [proxyman使用教程](https://medium.com/proxyman/getting-started-with-proxyman-4d44441a48e0)
- [https://www.moesif.com](https://www.moesif.com/features/api-debugging?utm_campaign=log-analysis&utm_term=%2Bhttp%20%2Bdebugger&utm_medium=ppc&utm_source=adwords&utm_campaign=Moesif+Features&hsa_tgt=kwd-423818839629&hsa_ver=3&hsa_acc=1107942668&hsa_cam=716956025&hsa_grp=43007528812&hsa_mt=b&hsa_src=g&hsa_ad=322845104570&hsa_net=adwords&hsa_kw=%2Bhttp%20%2Bdebugger&gclid=CjwKCAjw44jrBRAHEiwAZ9igKLZI1zycVjKcwM18xV9Q_2367viie0CkrYtKC3L8rsW-g_w_YQrN8RoClZoQAvD_BwE)
- [https://www.moesif.com/blog/technical/api-tools/The-Best-Free-REST-API-Debugging-Tools-For-Developing-APIs](https://www.moesif.com/blog/technical/api-tools/The-Best-Free-REST-API-Debugging-Tools-For-Developing-APIs/#)
