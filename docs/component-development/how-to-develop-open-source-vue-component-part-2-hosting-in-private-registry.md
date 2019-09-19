# 组件研发指南（二）：私服托管

## 基础
代码托管在[gitlab](https://gitlab.com)

分支模型：master + feature，协作方式跟 github 一样，使用 pull request 工作流，不同的是，私服不需要 dev 分支

私服使用[verdaccio](https://github.com/verdaccio/verdaccio)

请使用[vue-sfc-cli](https://github.com/FEMessage/vue-sfc-cli)初始化工程

版本号从0.x开始，具体请了解[语义化版本](http://semver.org/)

## 文档
有两部分文档要写：

- README.md 
- docs目录下的demo

README.md  按照模板编写有不足的，可以补充。暂时没有内容的，则先空着，不急着删除，因为有些内容是开源后就有的。

## 测试
test目录下自带了一个纯函数测试的例子，记得删除，并给组件添加相应的纯函数测试。

## 发布
第一次发布请先注册
```bash
npm adduser --registry ${私服地址}
```

再登录
```bash
npm login --registry ${私服地址}
```

然后修改版本号
```bash
npm version major | minor | patch
```

构建

```bash
npm run build
```

最后发布
```bash
npm publish --registry ${私服地址}
```

取消发布
```bash
npm unpublish --registry ${私服地址}  --force @femessage/excel-it
```

## 安装
```bash
yarn add xxx --registry ${私服地址}
```

## 更新
```bash
yarn upgrade xxx --latest --registry ${私服地址}
```

## hash值不对
如果出现安装私服包提示hash值不对，需要删除依赖，重新安装

如何知道是私服包？注意在 yarn.lock 里查看地址，如果依赖的地址不是淘宝源，也不是yarn源，而是私服地址，则说明是私服包。  

则解决方案以 上传组件 upload-to-ali 为例

```bash
yarn remove upload-to-ali
yarn add upload-to-ali ---registry ${私服地址}
```
