# ✅使用jest进行测试驱动开发

## 前言
本文将使用[jest](https://jestjs.io/docs/en/getting-started)进行测试驱动开发的示例，源码在[github](https://github.com/levy9527/jest-tdd-demo)。重点说明在开发中引入单元测试后开发过程，以及测试先行的开发思路。

本文的重点是过程以及思维方法，框架以及用法不是重点。

本文使用的编程语言是javascript，思路对其他语言也是适用的。

本文主要以函数作为测试对象。

## 环境搭建
假设项目结构为
```bash
.
├── README.md
├── package.json
├── src
├── test
└── yarn.lock
```

- 安装依赖
```bash
yarn add --dev jest
```

- 打开package.json, 修改scripts字段
```json
"scripts": {
  "test": "jest"
}
```

之后把测试文件放在test文件夹下，使用`yarn test` 即可查看测试结果

## 开发
现在要开发一个函数，根据传入的文件名判断是否为shell文件。

先做好约定：

1. shell文件应该以 `.sh` 结尾
1. shell文件不以 `.` 开头
1. 函数为名 `isShellFile`

下面来看下开发步骤是怎么样的。

### 文件初始化
在src目录下新建 `isShellFile.js` 

```bash
touch isShellFile.js
```

然后一行代码也不写，在test目录下新建 `isShellFile.test.js` 

可以注意到，测试文件的名与源文件名类似，只是中间多了个 `.test` 

```bash
touch isShellFile.test.js
```

### 第一个用例
打开测试文件 `test/isShellFile.test.js` ，编写第一个用例，也是最普通的一个: `bash.sh` 

```javascript
const isShellFile = require('../src/isShellFile')

test('isShellFile', () => {
  // 调用函数，期望它返回值为 true
  expect(isShellFile('bash.sh')).toBeTruthy()
})
```

运行 `yarn test` , 结果如下：
```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (2ms)

  ● isShellFile

    TypeError: isShellFile is not a function
    ^^^

      3 | test('isShellFile', () => {
      4 |  
    > 5 |   expect(isShellFile('bash.sh')).toBeTruthy()
        |          ^
      6 | })
```

失败是意料之中的，因为 `src/isShellFile.js` 一行代码也没写，所以测试代码中第5行 `isShellFile` 无法进行函数调用。

完善源文件`src/isShellFile.js` 
```javascript
module.exports = function(filename) {

}
```

这样 `isShellFile` 就可以作为函数被调用了。

再运行 `yarn test` 

```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (7ms)

  ● isShellFile

    expect(received).toBeTruthy()
    ^^^
    Received: undefined

      3 | test('isShellFile', () => {
      4 |   
    > 5 |   expect(isShellFile('bash.sh')).toBeTruthy()
        |                                  ^
      6 | })
```
又报错了，但这次报错原因跟上次不同，说明有进步。

这次报错原因是，期望函数调用返回值为真 , 但实际没有返回真 。

这是当然的，因为在源文件中，根本没有写返回语句。

为了让测试通过，修改 `src/isShellFile.js` 
```javascript
 module.exports = function(filename) {
+  return true
 }
```

运行 `yarn test` , 测试通过了！
```bash
 PASS  test/isShellFile.test.js
  ✓ isShellFile (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.548s
Ran all test suites.
```

把上述修改，提交到版本控制系统中。
```bash
git add package.json yarn.lock src test
git commit -m 'feat: init jest test case'
```

### 第二个用例
观察我们的测试用例，发现太简单了，只有正面的用例，没有反面的、异常的用例
```javascript
test('isShellFile', () => {
  expect(isShellFile('bash.sh')).toBeTruthy()
})
```

在 `test/isShellFile.test.js` 添加一个反面的用例

```javascript
 test('isShellFile', () => {
   expect(isShellFile('bash.sh')).toBeTruthy()
+  expect(isShellFile('bash.txt')).toBeFalsy()
 })
```

运行 `yarn test` 

(可以发现，在开发过程中需要反复执行上述命令，有个偷懒的办法，执行`yarn test --watch`，即可监听文件变化，自动执行测试用例)
```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (6ms)

  ● isShellFile

    expect(received).toBeFalsy()
    ^^^
    Received: true

      4 |  
      5 |   expect(isShellFile('bash.sh')).toBeTruthy()
    > 6 |   expect(isShellFile('bash.txt')).toBeFalsy()
        |                                   ^
      7 | })
```

报错了，期望返回假，但函数返回的是真。这是因为，源文件中， `isShellFile` 函数永远返回真！

完善 `src/isShellFile.js` 逻辑
```javascript
 module.exports = function(filename) {
-  return true;
+  return filename.indexOf('.sh') > -1
 };
```

测试通过了
```bash
 PASS  test/isShellFile.test.js
  ✓ isShellFile (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.568s
Ran all test suites.
```

把上述修改提交到版本控制系统
```bash
git commit -am 'fix: 函数永远返回真的bug'
```

### 第三个用例
我们再添加一个用例，这次考虑特殊情况： `.sh` 这种文件，不算是shell文件。

修改 `test/isShellFile.test.js` 
```javascript
   expect(isShellFile("bash.sh")).toBeTruthy();
   expect(isShellFile("bash.txt")).toBeFalsy();
+  expect(isShellFile('.sh')).toBeFalsy()
```

测试不通过
```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (8ms)

  ● isShellFile

    expect(received).toBeFalsy()
    ^^^
    Received: true

      5 |   expect(isShellFile("bash.sh")).toBeTruthy();
      6 |   expect(isShellFile("bash.txt")).toBeFalsy();
    > 7 |   expect(isShellFile('.sh')).toBeFalsy()
        |                              ^
      8 | });
```

说明逻辑待完善，修改 `src/isShellFile.js` 
```javascript
 module.exports = function(filename) {
-  return filename.indexOf(".sh") > -1;
+  let index = filename.indexOf(".sh");
+  return index > -1 && index != 0;
 };
```

测试通过(为精简文章内容，后面不再展示测试通过的输出)，提交代码。
```bash
git commit -am 'fix: .sh应该返回false'
```

### 第四个用例
按照第三个用例的逻辑， `.bash.sh` 也不应该是shell文件，那么函数是否能正确判断呢，测试便知。

修改 `test/isShellFile.test.js`
```javascript
   expect(isShellFile('.sh')).toBeFalsy()
+  expect(isShellFile('.bash.sh')).toBeFalsy()
```

测试不通过
```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (3ms)

  ● isShellFile

    expect(received).toBeFalsy()
    ^^^
    Received: true

       6 |   expect(isShellFile("bash.txt")).toBeFalsy();
       7 |   expect(isShellFile('.sh')).toBeFalsy()
    >  8 |   expect(isShellFile('.bash.sh')).toBeFalsy()
         |                                   ^
       9 | });
```

说明逻辑待完善，修改 `src/isShellFile.js` 
```javascript
 module.exports = function(filename) {
   let index = filename.indexOf(".sh");
-  return index > -1 && index != 0;
+  return !filename.startsWith('.')  && index > -1;
 };
```

测试通过，提交代码。
```bash
git commit -am 'fix: .开头的文件不算sh文件'
```

### 第五个用例
再考虑一种情况，如果 `.sh` 出现在中间呢？如 `bash.sh.txt` , 它不应该是shell文件，来看看函数是否能通过测试。

修改 `test/isShellFile.test.js`
```javascript
   expect(isShellFile('.bash.sh')).toBeFalsy()
+  expect(isShellFile('bash.sh.txt')).toBeFalsy()
```

测试不通过
```bash
 FAIL  test/isShellFile.test.js
  ✕ isShellFile (5ms)

  ● isShellFile

    expect(received).toBeFalsy()
    ^^^
    Received: true

       7 |   expect(isShellFile('.sh')).toBeFalsy()
       8 |   expect(isShellFile('.bash.sh')).toBeFalsy()
    >  9 |   expect(isShellFile('bash.sh.txt')).toBeFalsy()
         |                                      ^
      10 | });
```

说明逻辑待完善，修改 `src/isShellFile.js` 
```javascript
 module.exports = function(filename) {
-  let index = filename.indexOf(".sh");
-  return !filename.startsWith('.')  && index > -1;
+  let index = filename.lastIndexOf(".");
+  return !filename.startsWith('.')  && filename.substr(index) == '.sh';
 };
```

测试通过，提交代码。
```bash
git commit -am 'fix: .sh必须在结尾'
```

### 重构
我们来观察目前 `src/isShellFile.js` 的函数逻辑
```javascript
module.exports = function(filename) {
  let index = filename.lastIndexOf(".");
  return !filename.startsWith('.')  && filename.substr(index) == '.sh';
};
```

对于 `.bashrc` 这样的文件，并不是shell文件，因为它是以 `.` 开头的。

则通过 `filename.startsWith('.')` 判断即可，前面的函数调用 `filename.lastIndexOf(".")` 是多余的。也即，目前的函数判断逻辑不够简明。

下面是一种优化思路：
```javascript
module.exports = function(filename) {
  return !filename.startsWith('.')  && filename.substr(filename.lastIndexOf(".")) == '.sh';
};
```

测试通过，提交代码
```bash
git commit -am 'refactor: 优化逻辑'
```

注意，这个重构示例的重点是：

1. 先完成功能，再重构
1. 重构必须要有测试用例，且确保重构后全部测试用例通过

至于其他方面，见仁见智，并不是重点。

## 结论
本文通过代码实例，践行了测试先行的理念。

文中的代码实现不是重点，而是开发过程。

文中 [文件初始化](#Pv5Ni) 及 [第一个用例](#Pv5Ni) 的内容，尤其值得回味，它体现了两个思路：

- 总是在有一个失败的单元测试后才开始编码
- 用必要的最小代码让测试通过

总的来看，TDD总是处于一个循环中：

1. 编写用例
1. 测试失败
1. 编写代码
1. 测试成功
1. 提交代码
1. 重复以上

通过这样，功能的实现每次都是最小成本的，功能也是有步骤地、通过迭代完成的，而不是一步登天。

更关键的是，完善的测试用例，是开发者的“守护天使”，有了它们，以后在添加新功能时，修改/重构代码都有了可靠的保障，让开发者可以充满信心，code with confidence😎！

## 扩展
### 使用babel
要想使用import/export语法，需要安装babel相关依赖

- 安装依赖
```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

- 在项目根路径新增配置文件 `babel.config.js` 
```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

- 重新启动测试
```bash
yarn test --watch
```

### 为什么使用jest

因为这是vue官方工具链的一部分, 同时也可以为后续的组件测试作准备。
![](https://cdn.nlark.com/yuque/0/2019/png/160590/1560233227494-a5d13c94-ebc2-4296-bb3e-d5406f832b6c.png?x-oss-process=image/watermark,type_d3F5LW1pY3JvaGVp,size_10,text_5ru05pmu56eR5oqA,color_FFFFFF,shadow_50,t_80,g_se,x_10,y_10)

更多请点击查看[2019-06-04尤雨溪的vue技术分享](https://www.yuque.com/preview/yuque/0/2019/pdf/160590/1560232844122-419cd5a9-5d42-4a35-a266-6d6ea02828b3.pdf)
