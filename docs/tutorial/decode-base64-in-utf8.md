# 🔍解码base64的utf-8字符串
## 背景
后台传来经过 base64 编码的字符串(原始字符串含有中文), 需要在前端进行解码。

但 js 中的 `atob` 解码方法不支持 unicode 字符集(btoa 也是), 换言之, 中文被解码出来是会乱码的, 那怎么办呢? 此时就要用到今天介绍的方法了.

## 解决方案
```js
// 使用utf-8字符集进行base64编码
function utoa(str) {
    return btoa(unescape(encodeURIComponent(str)));
}
// 使用utf-8字符集解析base64字符串 
function atou(str) {
    return decodeURIComponent(escape(atob(str)));
}
```

只需要调用`atou`函数, 即可解析后台传来的含有中文的base64编码字符串了

## 分析atou

其实上述方法在[MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa)中已有介绍, 但却没有讲明原理, 下面将分析要点

先来分析`atou`函数

其实该函数的关键是做了一个拉丁字符到utf-8字符的转换. 

为什么这么说呢? 因为atob函数使用的是拉丁字符集, 而decodeURIComponent使用的是utf-8字符集

此时调用escape函数, 则会对拉丁字符集文本进行百分号编码(percent-encoding), 简单来说就是非ASCII字符如`È`(拉丁字符, 上面有个点的E), 它的在字符集中对应的十六进制字节为`0xC8`, 则其百分号编码为`%C8`, ASCII字符如[0-9a-z]则不需要转换

最后再调用decodeURIComponent函数, 它会将百分号编码的字符串解析成utf-8字符集的字符串, 则window.atob返回的拉丁文就变成unicode文字了, 中文也就可以显示出来了

这样讲可能有点难懂, 下面举个简单的例子

## 例子
以中文`人`字为例, 其对应的base64编码为`5Lq6`

1. 首先对其解码 `window.atob('5Lq6')` 的结果为拉丁字符串 `äºº`
2. 使用escape对拉丁字符串进行百分号编码, 也可以理解成把字符串翻译成拉丁字符集中对应的十六进制符号, `escape('äºº')` 结果为 `%E4%BA%BA`
3. 使用decodeURIComponent解析百分号编码字符串, 相当于把十六进制符号翻译成utf-8字符集中对应的字符, `decodeURIComponent('%E4%BA%BA')` 结果为 `人`, 则原始的中文字就被正确的解析出来了!

## 分析utoa

因为atou要用到escape以及decodeURIComponent函数, 则很容易理解utoa要用与之相对应的unescape以及encodeURIComponent函数.

但其实事情可以有点微妙的变化. 

如果base64的编码与解析全是由自己控制的, 且代码仅在js环境下运行, 那么可以不需要escape/unescape函数, utoa方法可以改写为

```js
function utoa(str) {
  return btoa(encodeURIComponent(str))
}
```

因为encodeURIComponent函数是使用utf-8字符集的, 输出的结果是字符串对应的百分号编码, 而百分号编码是在ASCII码范围内, btoa函数当然可以识别, 则上面的写法也是可行的

只不过它有一个明显的缺点, 那就是这样编码出来的字符串变长了

## 提问

### 如何评价上述黑魔法?

我认为这种方法的优点是, 使用的全是js内置的函数, 不需要借助第三类库, 对于有洁癖的同学来说(比如说我), 更容易接受.

缺点的话, 可能是使用了escape/unescape函数, 这两个函数不被标准推荐使用, 不过我认为那是针对URI进行编码解码的场景, 这里escape/unescape并不用于URI的编码与解码, 并没有用错地方. 只不过因为不鼓励使用, 未来有可能不被浏览器实现, 但我觉得浏览器开发商为了兼容性, 短时间内并不会这样做

### 是否可以使用 encodeURI/decodeURI 函数?

答案是可以的. 

简单来说, encodeURI与encodeURIComponent的区别在于, 后者编码得彻底, 也即URI符号的编码粒度更细. 比如URI中常见的符号`=`, `encodeURI('=')`的结果是`=`, 而`encodeURIComponent('=')`的结果是`%3D`. encodeURI/decodeURI函数同样使用的是utf-8字符集, 所以粒度的不同并不影响结果.

<!--文本主要讨论的是js中的base64编码中utf-8字符的问题-->

## 参考资料
- [MDN-btoa-usage](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa)
- [encoding-decoding-utf8-in-javascript](http://ecmanaut.blogspot.jp/2006/07/encoding-decoding-utf8-in-javascript.html)
- [delve-into-encode_utf8-function](http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html)
- [percent-encoding](http://www.cnblogs.com/DaoMuRen/p/5695030.html)
- [MDN-encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [MDN-escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape)
