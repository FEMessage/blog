(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{222:function(a,s,t){"use strict";t.r(s);var r=t(2),e=Object(r.a)({},function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"组件研发指南（二）：私服托管"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#组件研发指南（二）：私服托管","aria-hidden":"true"}},[a._v("#")]),a._v(" 组件研发指南（二）：私服托管")]),a._v(" "),t("h2",{attrs:{id:"基础"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基础","aria-hidden":"true"}},[a._v("#")]),a._v(" 基础")]),a._v(" "),t("p",[a._v("代码托管在"),t("a",{attrs:{href:"https://gitlab.com",target:"_blank",rel:"noopener noreferrer"}},[a._v("gitlab"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("私服使用"),t("a",{attrs:{href:"https://github.com/verdaccio/verdaccio",target:"_blank",rel:"noopener noreferrer"}},[a._v("verdaccio"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("请使用"),t("a",{attrs:{href:"https://github.com/FEMessage/vue-sfc-cli",target:"_blank",rel:"noopener noreferrer"}},[a._v("vue-sfc-cli"),t("OutboundLink")],1),a._v("初始化工程")]),a._v(" "),t("p",[a._v("版本号从0.x开始，具体请了解"),t("a",{attrs:{href:"http://semver.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("语义化版本"),t("OutboundLink")],1)]),a._v(" "),t("h2",{attrs:{id:"文档"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文档","aria-hidden":"true"}},[a._v("#")]),a._v(" 文档")]),a._v(" "),t("p",[a._v("有两部分文档要写：")]),a._v(" "),t("ul",[t("li",[a._v("README.md")]),a._v(" "),t("li",[a._v("docs目录下的demo")])]),a._v(" "),t("p",[a._v("README.md  按照模板编写有不足的，可以补充。暂时没有内容的，则先空着，不急着删除，因为有些内容是开源后就有的。")]),a._v(" "),t("h2",{attrs:{id:"测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#测试","aria-hidden":"true"}},[a._v("#")]),a._v(" 测试")]),a._v(" "),t("p",[a._v("test目录下自带了一个纯函数测试的例子，记得删除，并给组件添加相应的纯函数测试。")]),a._v(" "),t("h2",{attrs:{id:"发布"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发布","aria-hidden":"true"}},[a._v("#")]),a._v(" 发布")]),a._v(" "),t("p",[a._v("第一次发布请先注册")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" adduser --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])]),t("p",[a._v("再登录")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" login --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])]),t("p",[a._v("然后修改版本号")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" version major "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" minor "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" patch\n")])])]),t("p",[a._v("构建")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" run build\n")])])]),t("p",[a._v("最后发布")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" publish --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])]),t("p",[a._v("取消发布")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" unpublish --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("  --force @femessage/excel-it\n")])])]),t("h2",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("yarn add xxx --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])]),t("h2",{attrs:{id:"更新"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#更新","aria-hidden":"true"}},[a._v("#")]),a._v(" 更新")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("yarn upgrade xxx --latest --registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])]),t("h2",{attrs:{id:"hash值不对"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hash值不对","aria-hidden":"true"}},[a._v("#")]),a._v(" hash值不对")]),a._v(" "),t("p",[a._v("如果出现安装私服包提示hash值不对，需要删除依赖，重新安装")]),a._v(" "),t("p",[a._v("如何知道是私服包？注意在 yarn.lock 里查看地址，如果依赖的地址不是淘宝源，也不是yarn源，而是私服地址，则说明是私服包。")]),a._v(" "),t("p",[a._v("则解决方案以 上传组件 upload-to-ali 为例")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("yarn remove upload-to-ali\nyarn add upload-to-ali ---registry "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${私服地址}")]),a._v("\n")])])])])},[],!1,null,null,null);s.default=e.exports}}]);