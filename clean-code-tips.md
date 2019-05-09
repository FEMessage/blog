# 编码技巧

<a name="9250817b"></a>
## 代码要清晰表达意图

<a name="32c2e391"></a>
### 普通写法(魔法数字)
```javascript
coffeeShop.placeOrder(2)
```

阅读上面的代码，可以大致明白是要在咖啡店下一个订单，但是，2到底是什么意思？要两杯咖啡，还是下单两次，还是指杯子的大小？

我们搞不清楚。

有人可能会说可以加点注释。

```javascript
coffeeShop.placeOrder(2) // large cup
```

现在看起来好一点了。不过请注意，注释不是为了帮写得不好的代码补漏，我们应该养成习惯，用代码沟通。

<a name="0ca38d41"></a>
### 优雅写法

所以，更清晰的代码书写方式是，定义常量（或枚举），消除魔法数字。

```javascript
const LARGE_CUP = 2

coffeeShop.placeOrder(LARGE_CUP)
```

<a name="314e7f7d"></a>
## 避免重复(提高可维护性)

一个常见的场景是， 一个字段, 比如说状态 ，对应的值有好几个，会渲染成下拉选择框，也会作格式化处理。

![](https://cdn.nlark.com/yuque/0/2018/png/160590/1544445184513-9834ec32-0d28-4831-82e8-6405f4cd9eb2.png#align=left&display=inline&height=161&originHeight=256&originWidth=1187&status=done&width=747)

<a name="7fd1d669"></a>
### 普通写法(魔法字符串)

第一直觉写出来的代码都是类似这样的
```javascript
// select options 配置
{
  $type: 'select',
  $options: [
   {
    label: '待处理',
    value: 1,
    },
    {
    label: '处理中',
    value: 2,
    },
    {
    label: '已处理',
    value: 3,
    }
  ]
}
```

```javascript
// table columns 配置
{
  prop: 'status',
  label: '状态',
  minWidth: '50px',
  formatter: row => {
    switch (row.status) {
      case 1:
        return '待处理'
      case 2:
        return '处理中'
      case 3:
        return '已处理'
    }
  }
}
```

可以发现，类似'待处理'这样的字符串，出现了不止一次，如果要添加一个状态，或修改一下状态的文字描述，就得在各处寻找替换，增加了维护成本。

<a name="0ca38d41-1"></a>
### 优雅写法

可以定义一个常量对象，里面包含了状态值与状态文字描述的映射关系。

```javascript
const STATUS = {
  1: '待处理',
  2: '处理中',
  3: '已处理'
}
```

则select组件的options可以用这个对象来渲染，table组件的状态列也可以用这个对象来格式化后端字段

```javascript
// select options 配置
{
  $type: 'select',
  $options: Object.keys(STATUS).map(v => {
    return {
      value: v,
      label: STATUS[v]
    }
  })
}
```

```javascript
// table columns 配置
{
  prop: 'status',
  label: '状态',
  minWidth: '50px',
  formatter: row => STATUS[row.status]
}
```

这样状态的值与文字描述集中起来，且只出现一次，提高了可维护性。
