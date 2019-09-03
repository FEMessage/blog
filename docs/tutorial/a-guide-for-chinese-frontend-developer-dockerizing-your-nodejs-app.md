# 🐳从零开始Docker化Node.js应用

## 背景

给你一台新买的服务器(CentOS)，相关账户及密码，一个基于Node.js开发的web应用源码包(zip)，要求你在新机器上使用Docker的方式把应用部署起来。此时的你，并没有搞清楚什么是容器/镜像，也没记住几个相关的Linux命令，该怎么办？本文将帮助你摆脱困境
## 方案

### 流程

为达到最终目的，先来梳理一波流程：

1. 把源码zip包上传至服务器
1. 登录服务器
1. 解压zip包
1. 安装最新Docker
1. 设置国内镜像加速器
1. 编写Dockerfile
1. 构建镜像
1. 编写启动容器脚本
1. 执行脚本，检查部署情况

下面将详细描述如何操作

> 文中服务器操作系统为CentOS 7，如果你的服务器不相符，操作细节可能会略有不同，需要另行查阅相关资料

### rsync传输

假设:

* 服务器地址为`${ip}`
* 帐户为`${user}`
* 密码为`${pass}`
* 源码包为`${zip}`
* zip包放到服务器的目录为`${path}`

则在本机源码包同级目录下，使用`scp`命令，把zip包传输至服务器的示例如下

```sh
rsync -avzP ./${zip} ${user}@${ip}:${path}

# 后面会提示输入密码
```

### ssh登录

承接上文，ssh登录服务器示例如下

```sh
ssh ${user}@${ip}

# 后面会提示输入密码
# 第一次登录会提示保存ssh信息，输入yes即可
```

如果不想每次都输入地址/帐户/密码，可以写一个简单的自动登录脚本`ssh.sh`

```sh
# 创建文件
touch ssh.sh
# 赋予脚本可执行权力
chmod +x ssh.sh
```

`ssh.sh`内容如下，记得把`${pass}`, `${user}`,`${ip}`替换为真实数据

```sh
#!/usr/bin/expect
set timeout 30
set password ${pass}
spawn ssh ${user}@${ip}
expect "*assword:"
send "$password\r"
interact
```

执行脚本即可登录服务器😄

```sh
./ssh.sh
```

### unzip解压

如上所说，源码包名为`${zip}`，解压命令如下

```sh
unzip ${zip}
```

附带一句, 如果要用命令生成zip包，假设源文件目录为`dist`，要生成的zip包为`dist.zip`, 其命令如下

```sh
zip -r dist.zip dist
# 或简写为
zip -r dist dist
```

### 安装Docker-CE

CE意为`Community Edition`, 即社区版，免费; 与之对应的是EE，`Enterprise Edition`,  企业版，强调安全，付费使用。

* 卸载旧版本的Docker

如果新机器上没有docker，跳至下一步，直接安装Docker的依赖

```sh
sudo yum remove docker \
                  docker-common \
                  container-selinux \
                  docker-selinux \
                  docker-engine \
                  docker-engine-selinux
```

* 安装Docker的依赖

```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

* 安装Docker官方仓库

```sh
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

* 更新仓库源

```sh
sudo yum makecache fast
```

* 从仓库安装Docker-CE

```sh
sudo yum install docker-ce
```

### 配置加速器

使用 Docker 的时候，需要经常从官方获取镜像，但是由于显而易见的网络原因，拉取镜像的过程非常耗时，严重影响使用 Docker 的体验。

推荐使用[DaoCloud的加速器](https://www.daocloud.io/mirror#accelerator-doc)

### Dockerfile

所有环境配置已准备完毕，可以根据Node.js应用编写Dockerfile了

假设Node.js应用的启动命令为`npm start`, 监听端口为`${app_port}`

* 创建Dockerfile

```sh
touch Dockerfile
```

`Dockerfile`内容如下

```sh
# 可以指定依赖的node镜像的版本 node:<version>，如果不指定，就会是最新的
FROM node:8

# 创建工作目录，对应的是应用代码存放在容器内的路径
WORKDIR /usr/src/app

# 把 package.json，package-lock.json(npm@5+) 或 yarn.lock 复制到工作目录(相对路径)
COPY package.json *.lock .

# 只安装dependencies依赖
# node镜像自带yarn
RUN yarn --only=prod --registry=https://registry.npm.taobao.org

# 把其他源文件复制到工作目录
COPY . .

# 替换成应用实际的端口号
EXPOSE ${app_port}

# 这里根据实际起动命令做修改
CMD [ "npm", "start" ]
```

* 补充.dockerignore

```sh
touch .dockerignore
```

`.dockerignore`内容如下

```sh
node_modules
npm-debug.log
```

### 构建镜像

写好`Dockerfile`，就可以在Dockerfile所在目录构建镜像了。

命令如下。`-t`是为了给镜像加个标签，这样方便使用`docker images`命令时检索到

```sh
# ${your_name} 可以省略
# ${tag} 省略时为 latest
docker build -t ${your_name}/${image_name}:${tag} .

# 省略版本
docker build -t ${image_name} .
```

查看镜像

```sh
docker images

# 示例输出
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
${your_name}/${image_name}    latest     d64d3505b0d2    1 minute ago
```

### 启动容器脚本

```sh
touch start.sh
chmod +x start.sh
```

`start.sh`会根据镜像新建一个容器并启动，内容如下

```sh
#!/usr/bin/env bash

container=${container_name}
image=${image_name || image_id}

docker run \
--rm \
-d \
-p ${host_port}:${app_port} \
--name $container \
$image
```

`${host_port}`是外网访问部署好的应用时对应的端口

`${app_port}`是容器内Node.js应用监听的端口

`${image_name}`是前面构建出的镜像的名字，可用`docker images`查看

`${container_name}`是给容器赋予的名字，方便`docker ps`命令时检索

--rm 容器退出后随之将其删除

-d 后台运行

-p 指定端口映射，前者是服务器器端口，也即外界访问你部署好的web应用的端口; 后者是`Dockerfile`里`EXPOSE`的端口

--name 指定容器名字

### 测试

访问刚刚启动的容器里的应用

```sh
curl -i localhost:${host_port}

# 示例输出
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
...
```

恭喜，部署成功👏

### 常用命令

* 查看运行中的容器

```sh
docker ps
# 或使用新命令
docker container ls

# 示例输出
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  ${your_name}/${image_name}:latest  npm start  ...   49160->8080
```

* 查看所有容器(包括已终止的)

```sh
docker ps -a
# 或使用新命令
docker container ls -a
```

* 查看某容器内日志

```sh
docker logs -f ${container_id}
```

* 进入某容器，并有shell执行环境

```sh
# 进入容器
# -i表示：交互式操作，-t表示：终端
docker exec -it ${container_id} bash
# 可通过输入 exit 退出
```

* 停止容器

```sh
docker container stop ${container_id}
```

* 启动已终止的容器

```sh
docker container start ${container_id}
```

* 删除容器

```sh
docker container rm ${container_name || container_id}
```

* 查看镜像

```sh
docker images
# 或使用新命令
docker image ls
```

* 删除镜像

```sh
docker image rm ${image_id}
```

## FAQ

* 不会vi，不懂怎么在服务器编辑`Dockerfile`等文件，怎么办？

> 可以参考本文，把文件在本地创建好，再通过`scp`把创建的文件跟源码包一起上传到服务器


* 为什么使用yarn?

> 因为yarn的速度比npm更快，而docker里的node镜像自带了yarn, 正好鼓励大家使用yarn


* 如果项目有全局依赖，如bower，Dockerfile怎么写？

> 可以先安装其他全局依赖，再使用yarn安装，记得命令写在一个RUN指令里, 下面是部分示例


```sh
RUN yarn config set registry https://registry.npm.taobao.org \
    && yarn global install bower \
    && bower i --allow-root \
    yarn
```

## 参考
* [https://nodejs.org/en/docs/guides/nodejs-docker-webapp](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
* [https://github.com/nodejs/docker-node/blob/master/README.md#image-variants](https://github.com/nodejs/docker-node/blob/master/README.md#image-variants)
* [https://github.com/waylybaye/HyperApp-Guide/blob/master/zh/centos-upgrade-docker.md](https://github.com/waylybaye/HyperApp-Guide/blob/master/zh/centos-upgrade-docker.md)
* [Docker命令查询](https://docs.docker.com/v1.11/engine/reference/commandline/cli/)

## 注
本文最早发布在掘金，后迁移至[github](https://github.com/levy9527/blog/issues/3)。