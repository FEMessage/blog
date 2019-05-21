# 金字塔原理在Github PR中的运用

<a name="df368884"></a>
## 前言
以上传组件在Github上一个[PR](https://github.com/FEMessage/upload-to-ali/pull/8)为例，演示描述如何从通过金字塔原理，由初始的版本演化成结构分明、逻辑清晰的最终版本。

<a name="ApGoy"></a>
## 目的
本次PR的新增的是拖拽上传图片功能，需要在描述中说明清楚以下相关信息：

- 拖拽上传功能
- 不影响之前已有的粘贴上传功能
- 说明兼容性

<a name="6d253f9a"></a>
## 版本1
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1551332615934-da8a4264-ff86-445d-ab4c-052ee64e7a75.png#align=left&display=inline&height=237&name=image.png&originHeight=474&originWidth=1268&size=153441&status=done&width=634)

亮点：

- 说明一下粘贴及拖拽操作的表现，这样用户使用时能提前了解，知道组件能力的边界，而不会认为是“怪异”行为

不足：

- 红框内部应该是兼容性说明，而不是Fixes的内容。也即，标题与内容不符。

<a name="d33b9223"></a>
## 版本2
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1551332820390-59d0acdd-00f2-4549-89e5-06d6b90ace21.png#align=left&display=inline&height=303&name=image.png&originHeight=606&originWidth=1376&size=185403&status=done&width=688)<br />亮点：

- 兼容性说明独立放到 compatibility，标题与内容相符了

不足：

- draggable 与 android select or take photos 是两件事，不应该放一起, 后者应该是另一个pr的内容
- 同时兼容性说明不够清晰完整，没有覆盖全部情况

<a name="06b95f03"></a>
## 版本3
![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1551333058790-362570d1-0577-4f2d-9e58-7232d3c24485.png#align=left&display=inline&height=478&name=image.png&originHeight=956&originWidth=1380&size=223760&status=done&width=690)<br />

亮点：上面考虑到了以下情况

- 粘贴/拖拽
- 单张模式/多张模式
- Windows系统/Mac系统

但依然存在不足：

- 不知道“依然存在无法粘贴的问题 v1.20”，是指什么，要点击才能知道，期望用户可以直观地看出来
- 其实 粘贴 跟 多张模式 无关，因为 Mac系统下 copy 多张，实际只能 paste 上传一张

<a name="32df8fe6"></a>
## 版本4

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1551333333678-d905066c-dd55-40c5-b2a9-c73e7cacfbee.png#align=left&display=inline&height=479&name=image.png&originHeight=958&originWidth=1230&size=221501&status=done&width=615)

思路：

- 把 粘贴 与 拖拽 放到外层，单张模式/多张模式 放在内层
- 详细描述 粘贴 在 Windows 系统下的兼容情况

还是存在不足：

- 拖拽与粘贴文字出现的顺序，Mac系统/Windows系统不一致
- Mac下的粘贴说明有点费解，期望一个例子

<a name="0ae4536f"></a>
## 版本5

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1551333815016-56abd978-690f-4181-9b9b-5269aa5bbbb5.png#align=left&display=inline&height=556&name=image.png&originHeight=1112&originWidth=1258&size=255056&status=done&width=629)

跟版本1比起来，是不是清晰明了很多！

这就是金字塔原理的魔力。


