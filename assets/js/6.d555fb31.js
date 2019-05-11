(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{217:function(v,_,a){"use strict";a.r(_);var r=a(2),t=Object(r.a)({},function(){var v=this,_=v.$createElement,a=v._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[a("h1",{attrs:{id:"履行承诺，交付可用的功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#履行承诺，交付可用的功能","aria-hidden":"true"}},[v._v("#")]),v._v(" 履行承诺，交付可用的功能")]),v._v(" "),a("p",[a("a",{attrs:{name:"48fbf753"}})]),v._v(" "),a("h1",{attrs:{id:"日期-2018-11-18"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#日期-2018-11-18","aria-hidden":"true"}},[v._v("#")]),v._v(" 日期 2018-11-18")]),v._v(" "),a("p",[a("a",{attrs:{name:"df368884"}})]),v._v(" "),a("h1",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言","aria-hidden":"true"}},[v._v("#")]),v._v(" 前言")]),v._v(" "),a("p",[v._v("本文记录了在北京百得利项目的实战经历。")]),v._v(" "),a("p",[a("a",{attrs:{name:"58378f0d"}})]),v._v(" "),a("h1",{attrs:{id:"正文"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#正文","aria-hidden":"true"}},[v._v("#")]),v._v(" 正文")]),v._v(" "),a("p",[a("a",{attrs:{name:"4917cff8"}})]),v._v(" "),a("h2",{attrs:{id:"承诺的压力"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#承诺的压力","aria-hidden":"true"}},[v._v("#")]),v._v(" 承诺的压力")]),v._v(" "),a("p",[v._v("权限管理的重构与协同设置功能有所相关，我放在一起做了。")]),v._v(" "),a("p",[v._v("按照最开始的规划，周二是能上线的。但到了周一，才注意到当初有疏忽的点，协同设置的修改，影响到移动端的客服显示了。当晚召集小伙伴，重新分析一波，确认周二能把相关改动做好。")]),v._v(" "),a("p",[v._v("周二那天感受到了，我感受到了时间的压力。")]),v._v(" "),a("p",[v._v("当天上午的时候，用户管理还没有完全重构好，但接口已经调通了。考虑到还要在几个环境去测试，还要跟移动端联调，我产生了“先保证功能可用，后面再重构”的想法。")]),v._v(" "),a("p",[v._v("这里主要是这样考虑的：上周我信誓旦旦，说这周二能搞定; 如果周二搞不定，那就是打脸了。虽说这个功能并非很重要，这并不影响系统的下单，但这是我的承诺，没有做到，损失的是我的信誉。不能按时完成任务，降低的是我的可信度。所以我周二那天有着“必须搞定”的念头。")]),v._v(" "),a("p",[v._v("但同时，我又觉得，这些丑陋的代码不经过整理就上线了，我的内心无法忍受。但如果继续重构，会增加调试时间，可能今天赶不上上线。")]),v._v(" "),a("p",[v._v("我很矛盾，导致有些心神不宁，明显感到状态不如上周专心致志。")]),v._v(" "),a("p",[v._v("尤其是到了午餐时间，我还想再写一个小时，不想中断编码节奏，但肚子又饿得慌。我知道，如果我继续写，1点多的时候叫个外卖，中午就不休息了，那我前一个小时的质量能得以保证，但下午就崩溃了; 而如果我去吃饭，刚吃完了必须休息一会儿，所以现在的编码状态一定会被打断，得一个多小时会才能恢复，但下午的质量能得以保证。")]),v._v(" "),a("p",[v._v("犹豫在三，我选择了先去吃饭。“越是有压力的时候，越要保持正常作息”。")]),v._v(" "),a("p",[v._v("吃完了在酒店里，根本睡不着，于是起身去公办室。我隐约觉得这个状态下，接下来很可能会写bug。")]),v._v(" "),a("p",[v._v("于是我准备像压力妥协，我说，“先把功能上线吧，代码质量后面再说了”。")]),v._v(" "),a("p",[v._v("结果一联调，发现仍有考虑不周全的地方，后端客服查询接口需要增加过滤参数; 预约逻辑也要改，不然影响到下单，无法走流程！")]),v._v(" "),a("p",[v._v("查询接口增加参数在可控范围内，但预约失败却是始料不及的。预约功能非常关键，但之前梳理逻辑的时候，居然没考虑到这一点，必须要指出，这里我的失误非常严重。")]),v._v(" "),a("p",[v._v("怎么办？我当即做了以下调整：")]),v._v(" "),a("ol",[a("li",[v._v("首先，接受周二无法上线的事实"),a("br")]),v._v(" "),a("li",[v._v("接着，找到开发预约功能的火柴哥，重新梳理一波逻辑，确定明天能搞定"),a("br")]),v._v(" "),a("li",[v._v("找到Y经理，告诉他由于之前我考虑不周，影响到预约功能了，需要明天才能上线")]),v._v(" "),a("li",[v._v("重新调整心态，继续进行用户管理的重构，不降低代码质量。")])]),v._v(" "),a("p",[v._v("第3点的秘诀是：调整对方预期，许下新的承诺。这里的关键点是，自己主动找人，而不是等到别人来找你，二者有天壤之别。让别人来找你，然后你才告诉对方这事不能按时完成，你就留下不靠谱的印象。"),a("br"),v._v(" "),a("br"),v._v("第4点是《The clean Coder》里提到的，“越是紧要关头，越是要冷静。战胜压力靠的是你平时遵守的纪律”，“如果你笃行重构，此时要更多地重构”。这标志着我心态转变：从理论到实践，对该价值观的真正确认。")]),v._v(" "),a("p",[v._v("事实证明，越是时间紧急，越不能想着赶工。因为总有意料之外的事情：到了周三，一切准备就绪了，却发现，原来权限管理本身就有bug，这在旧版本的权限管理就存在的，只是一直没暴露出来，结果又花了好些时间修复。")]),v._v(" "),a("p",[v._v("所以前辈说的不错，唯有按部就班，保持井然有序，才是致胜的秘诀。")]),v._v(" "),a("p",[a("a",{attrs:{name:"b7194217"}})]),v._v(" "),a("h2",{attrs:{id:"无法上线的功能价值为零"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#无法上线的功能价值为零","aria-hidden":"true"}},[v._v("#")]),v._v(" 无法上线的功能价值为零")]),v._v(" "),a("p",[v._v("周二晚上新的权限管理在测试环境可见的时候，我通知了C总，跟他说即将上线新的权限管理，用户体验更佳。C总觉得不错，跟我说“谢谢”，还问我啥时上到生产。我说，等测试完功能没问题就上线。")]),v._v(" "),a("p",[v._v("到了周三在测试环境通过测试时，发现分支管理很不合理，想上个线，给feature分支的开发者带来很大负担：分支开发者本地合并主干代码，解决冲突后，再提交到主干，而在那之后feature分支的代码就被污染了; 想该功能单独上线，需要重uat切个分支出来，再cherry-pick feature分支相关的提交记录。")]),v._v(" "),a("p",[v._v("这里的关键，我的分支，一共有70+个提交，我得cherry-pick这么多提交，并且之前合并主干遇到冲突, 很多会再遇到一次，得再一次手工解决。")]),v._v(" "),a("p",[v._v("我开玩笑说，这特么上个线比上炕费劲多了。")]),v._v(" "),a("p",[v._v("我找到Y经理，跟他说，我这么多提交去cherry-pick，很有可能会失误，得想个办法。Y经理说，那就不急着上线呗，你的功能先放一放，到时跟其他功能一起从测试环境同步过去。")]),v._v(" "),a("p",[v._v("当时我就想，那好，既然你不着急上线，那我也不着急了。反正我该做的已经做了，剩下的就交给你了，这功能上不了线也怪不了我。")]),v._v(" "),a("p",[v._v("我顿时觉得心理轻松了许多。")]),v._v(" "),a("p",[v._v("但后来我突然想起到了C总昨天的那句“谢谢”。C总是感受到了我们想把事情做好，不断完善，提供更佳的用户体验的态度而道谢的。如果我把负责推到Y经理身上，认为我只管开发，不管上线，那我是在开空头支票，这不是专业人员应有的态度。而且，从成果产出的角度讲，功能没上线，没有被真正的用户使用到，那么成果产出为零，该功能的价值为零。")]),v._v(" "),a("p",[v._v("把这层想明白，我就着手合并代码，开始了我的cherry-pick之旅。我花了一个上午合并代码，解决冲突，然后再写了份cherry-pick操作步骤文档。下午再找到相关开发人员，帮他们cherry-pick一波。大半个下午过去了，代码才准备就绪，上了uat。")]),v._v(" "),a("p",[v._v("最终，经过一番细致而繁琐的操作，新的权限管理上线了, 我没食言，兑现了承诺。")])])},[],!1,null,null,null);_.default=t.exports}}]);