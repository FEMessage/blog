# 金字塔原理在Github PR中的运用

## 前言
以上传组件在Github上一个[PR](https://github.com/FEMessage/upload-to-ali/pull/8)为例，演示描述如何从通过金字塔原理，由初始的版本演化成结构分明、逻辑清晰的最终版本。

## 目的
本次PR的新增的是拖拽上传图片功能，需要在描述中说明清楚以下相关信息：

- 拖拽上传功能
- 不影响之前已有的粘贴上传功能
- 说明兼容性

## 版本1
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mcwv9p0qj30z80d6gp6.jpg)

亮点：

- 说明一下粘贴及拖拽操作的表现，这样用户使用时能提前了解，知道组件能力的边界，而不会认为是“怪异”行为

不足：

- 红框内部应该是兼容性说明，而不是Fixes的内容。也即，标题与内容不符。

## 版本2
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mcxzlwi1j31280guwit.jpg)<br />亮点：

- 兼容性说明独立放到 compatibility，标题与内容相符了

不足：

- draggable 与 android select or take photos 是两件事，不应该放一起, 后者应该是另一个pr的内容
- 同时兼容性说明不够清晰完整，没有覆盖全部情况

## 版本3
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mcy6l7j9j312c0qk43l.jpg)<br />

亮点：上面考虑到了以下情况

- 粘贴/拖拽
- 单张模式/多张模式
- Windows系统/Mac系统

但依然存在不足：

- 不知道“依然存在无法粘贴的问题 v1.20”，是指什么，要点击才能知道，期望用户可以直观地看出来
- 其实 粘贴 跟 多张模式 无关，因为 Mac系统下 copy 多张，实际只能 paste 上传一张

## 版本4

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mcyh08vuj30y60qmwiq.jpg)

思路：

- 把 粘贴 与 拖拽 放到外层，单张模式/多张模式 放在内层
- 详细描述 粘贴 在 Windows 系统下的兼容情况

还是存在不足：

- 拖拽与粘贴文字出现的顺序，Mac系统/Windows系统不一致
- Mac下的粘贴说明有点费解，期望一个例子

## 版本5

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mcyvbanlj30xy0u0q82.jpg)

跟版本1比起来，是不是清晰明了很多！

这就是金字塔原理的魔力。


