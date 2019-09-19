# GIT最佳实践

## 一个功能对应一个分支

下面是好的示例： 格式化代码，也应该单独一个PR
![好的示例](https://tva1.sinaimg.cn/large/006y8mN6gy1g6megbpz6qj315a0le77p.jpg)

下面是不好的示例：因为一个PR修改了不同的主题内容

![不好的示例](https://tva1.sinaimg.cn/large/006y8mN6gy1g6md819j8qj312y0dajsm.jpg)

![关闭理由](https://tva1.sinaimg.cn/large/006y8mN6gy1g6md86mgeuj312w0aegmx.jpg)

## 提交“瘦”的PR

参考文章：[https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly](https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly)

其中最重要的一点：不要一次提交一个很大改动的PR，否则别人很难 review，要学会拆分步骤。

下面是一个 PR 示例：

拆分前，包含了35个改动，很难 review
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj6ned4yj319i07q0um.jpg)

拆分后
![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj5z3bq1j31ca0len2j.jpg)

单个PR的改动文件只有11个

![image.png](https://tva1.sinaimg.cn/large/006y8mN6gy1g6nj6vup9jj313y08e769.jpg)
每个 PR 改动的文件少了，这样 review 起来就更容易了。

## 使用正确的标题

[相关规范看这里](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

另外，请回答：出于什么原因需要进行这次修改？具体改动了些什么？

使用一定要使用现在时祈使句（例如要使用 change ，而不是 changed 或 changes）。

优先使用正面肯定语句，而不是否定句。

好的示例：`docs: extraQuery 的正确使用方法`

不好的示例：`docs: 更新不直观的例子`

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mdn22hcsj312207uabq.jpg)

## 根据模板填写PR描述
这是我们 Github 的 PR 模板，融合了我们的最佳实践
![image-20190513142522614](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mdpi1qp8j30zc0u0774.jpg)

下面是实际的好的例子
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6mdrclpxij30xr0u00zm.jpg)

## 1+2 review 规则

1 是指发起 PR 的人，2 是指进行 code review 的人。也即，每一个 PR，至少要经过两个团队成员 approve 才能合并。

> 上面是针对 github 的协作，项目组中可酌情变为 1+1 规则

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g73pq0aembj31jq0qu7ac.jpg)

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g73pqvc8srj31jc0ecadk.jpg)

##礼貌提问
在 github 向人提问时，需要有礼貌。当提出 feature request时，还要说明自己的情况，尽可能提供更多的信息给对方。

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g74vklutqjj31ku0tu109.jpg)

上面的示例有三个重点：

1. 开头表达感谢
2. 中间说明己方的使用情况，并给出相应链接
3. 最后参考业界已有实现，给出一个方案设想，并给出相应链接

## bug修复

提交格式为：<br />fix #${bugId} ${bugMsg}

例如：<br />fix #37 数据源管理-查看表字段，输入表名称进行查询后，需要点击两次返回按钮才能返回

## 精简提交

一次只提交一个“瘦”的功能，同时只包含相关改动文件。例如，对于两个错误的修复应该进行两次不同的提交。

如果发现写提交信息时，需要写两点以上;  则需要拆分提交。

如果提交信息里含有“并且”，“而且”，“同时”等字眼时，也需要考虑是否要拆分提交。

有个衡量的标准是：查看某个文件的提交历史，如果其所有提交信息的描述都是与此文件相关的，那就是符合规范的; 如果发现某次的提交信息与本文件无关，则说明提交的时候误操作了。

精简的提交可以让其他的开发团队人员更简单地明白其改动的用义。如果其中一次提交的改动出现了问题，也可以方便地回滚到改动之前的状态。借助暂存功能来标记相关的改动文件，Git 可以为你打造出非常精准的提交。

## 频繁提交
一次提交应只对应一个“瘦”的功能。从而达到频繁提交的目标。

经常性地提交改动可以确保不会出现特别庞大的提交，同时也可以比较精准地对应到所需要的改动上。

此外，通过频繁地提交也可以比较快速地和其他开发人员来共享你的改动。同样也会避免在整合代码时出现过多的合并冲突。相反的，非常庞大的提交会加大整合代码时出现冲突的风险，解决这些冲突也会非常复杂。

## 不要提交不完整的改动

虽然原则上来说不要提交一些还没有完成的改动，但是对于一个非常庞大的新功能来说，也并不意味着你必须整体完成这个功能后才可以提交。恰恰相反，你必须把那些改动正确地分割成一些有意义的逻辑模块来进行频繁地提交。

如果你仅仅是因为急着想要下班，或者是想要得到一个干净的工作副本（比如想要切换到另一个分支上），你可以利用 Git 所提供的储藏（Stash）功能来解决这些问题。切记不要把那些不完整的改动提交到仓库中。
## 提交前测试那些改动

不要理所当然地认为自己完成的改动都是正确的。

所有的改动一定要通过彻底地测试才表示它真正地被完成了。尽管这些改动可能仅仅是提交到了你的本地仓库中，只有你自己才能看到，但完整的测试同样是非常重要的，因为这些代码可能之后会被推送和共享到远程给其他的开发人员。

## 版本控制不是备份系统

版本控制系统具有一个很强大的附带功能，那就是服务器端的备份功能。但是千万不要把 VCS 仅仅当成一个备份系统。特别需要注意的是，只能提交那些有意义的改动。VCS 不是用来备份文件用的。（请参阅 <提交对映改动>）

## 学习资源
[Pro Git](https://git.oschina.net/progit/)<br />[https://learngitbranching.js.org](https://learngitbranching.js.org/?NODEMO)
