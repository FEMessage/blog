# 组件研发指南（五）：基础拾遗

## 进阶内容
因为基础大部人都了解，所以特意把进阶内容放到前面，方便检索查阅

- [🔨揭秘vue-sfc-cli：组件研发利器](https://zhuanlan.zhihu.com/p/72590127)
- [📦vue组件发布npm最佳实践](https://github.com/levy9527/blog/issues/2)
- [renderless-components-in-vuejs](https://adamwathan.me/renderless-components-in-vuejs/)
- [container-components-in-react](https://medium.com/@learnreact/container-components-c0e67432e005) 
- [前年端组件化框架之路](https://github.com/xufei/blog/issues/19)
- [组件化 or 分层](https://github.com/xufei/blog/issues/50)

## 基础知识
基本上开发任何一个组件，都离不开以下内容。以下说明一些核心内容，更多请看[vue官方文档](https://cn.vuejs.org/v2/guide/components.html)

### props
prop 定义了这个组件有哪些属性可以配置，比如el-button可以传size，loading等。在开发组件时，所有的props都需要进行格式校验，所以最好还是使用对象的写法。

### events
通过对外$emit一个事件 ，就可以触发自定义的事件xxx，并且在父级通过 @xxx 来监听：
```html
<template>   
  <button @click="onClick"> </button> 
</template> 

<script>   
  export default {  
    methods: {    
      onClick (event) {      
        this.$emit('click-child', event);  
      }    
    }  
  } </script> 
```

```html
<!-- 父组件 -->
<father-compoment @click-child="onClick"></father-compoment> 
```

### slot
由于每个用户的使用场景都不一样，所以为了方便用户的拓展，可以使用插槽 slot可以分发组件的内容。

```html
<template>  
    <div>   
      普通插槽:
      <slot></slot>

      带默认内容的插槽:
      <slot>默认内用</slot>

      命名插槽:
      <slot name="test"></slot>

      作用域插槽：
      <slot name="test" :row="{a:1}"></slot>
   </div>
</template>  

```

## 单向数据流
父组件是通过 props 把数据传递到子组件，子组件接收后即可通过 this.xx 来使用。但是，子组件不能直接修改props的值。如果你尝试直接修改props，vue会在控制台警告你。

所以，对于子组件想要更改props的场景，可以有2中解决方案：

1. 在子组件的 data 中拷贝一份 prop, 使用data去维护数据

```javascript
export default {  
  props: {     
    value: String   
  },  
  data () {    
    return {      
      currentValue: this.value    
   } 
```

2 emit一个事件通知父组件进行修改, 此时父组件需要用到 `.sync` 修改符

```html
<template> 
  <div>    
		<button @click="increase(1)">plus</button>  
	</div> 
 </template> 
<script>  
export default {    
  props: {   
    value: {        
      type: Number     
    }     
  },     
  methods: {       
    increase (val) {        
      this.$emit('update:value', this.value + val);      
    }     
  }   
} 
</script> 
```
