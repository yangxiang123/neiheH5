(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-chicang"],{"0143":function(t,n,a){var i=a("97c6");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var e=a("4f06").default;e("b57b165c",i,!0,{sourceMap:!1,shadowMode:!1})},1256:function(t,n,a){"use strict";a.r(n);var i=a("4f94"),e=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(n,t,(function(){return i[t]}))}(o);n["default"]=e.a},"484e":function(t,n,a){t.exports=a.p+"static/img/rank_bg2.986885fa.png"},"4f94":function(t,n,a){"use strict";(function(t){a("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{list:{}}},methods:{getlist:function(){var n=this;this.util.request("invite/holding_rank",{},"POST").then((function(a){t("log",a," at pages/home/chicang.vue:34"),uni.stopPullDownRefresh(),n.list=a.ranking,t("log",n.list," at pages/home/chicang.vue:37")}))}},onShow:function(){this.getlist()}};n.default=i}).call(this,a("0de9")["log"])},"78c1":function(t,n,a){"use strict";a.r(n);var i=a("b454"),e=a("1256");for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(o);a("dc9b");var s=a("f0c5"),u=Object(s["a"])(e["default"],i["b"],i["c"],!1,null,"9b288542",null,!1,i["a"],void 0);n["default"]=u.exports},"97c6":function(t,n,a){var i=a("24fb"),e=a("1de5"),o=a("484e");n=i(!1);var s=e(o);n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-9b288542]{background-color:#9d1432}body.?%PAGE?%[data-v-9b288542]{background-color:#9d1432}uni-page-body .bg[data-v-9b288542]{width:100%;position:absolute;left:0;right:0;top:0}uni-page-body .title[data-v-9b288542]{font-size:%?72?%;font-family:YouSheBiaoTiHei-Bold,YouSheBiaoTiHei;font-weight:700;color:#fff;text-align:center;padding-top:%?120?%;letter-spacing:%?20?%}uni-page-body .text[data-v-9b288542]{font-size:%?24?%;font-family:PingFang SC-常规体,PingFang SC;font-weight:400;color:#fff;text-align:center;padding-top:%?120?%;letter-spacing:%?20?%}uni-page-body .box[data-v-9b288542]{padding:0 %?32?% 0 %?32?%;position:relative;top:%?400?%}uni-page-body .box .way[data-v-9b288542]{padding:%?40?%;margin-bottom:%?32?%;border-radius:%?20?%;background:url('+s+") no-repeat 50%;background-size:100% 100%}uni-page-body .box .way uni-image[data-v-9b288542]{width:%?68?%;height:%?68?%;border-radius:100%}uni-page-body .box .way .name[data-v-9b288542]{font-size:%?28?%;color:#444;margin-left:%?20?%}uni-page-body .box .way .bot[data-v-9b288542]{color:#ff7f5a;font-size:%?36?%}uni-page-body .box .hao[data-v-9b288542]{color:#444;font-size:%?36?%}uni-page-body .box .hao1[data-v-9b288542]{color:#ffc300;font-size:%?36?%}uni-page-body .box .hao2[data-v-9b288542]{color:#b9b9b9;font-size:%?36?%}uni-page-body .box .hao3[data-v-9b288542]{color:#e28f00;font-size:%?36?%}",""]),t.exports=n},b454:function(t,n,a){"use strict";a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return e})),a.d(n,"a",(function(){}));var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"page"},[a("v-uni-image",{staticClass:"bg",attrs:{src:"/static/rank_bg3.jpg",mode:"widthFix"}}),a("v-uni-view",{staticClass:"box"},t._l(t.list,(function(n,i){return a("v-uni-view",{staticClass:"flex justify-between align-center way"},[a("v-uni-view",{staticClass:"u-flex"},[i<10?a("v-uni-view",{staticClass:"hao",class:0==i?"hao1":1==i?"hao2":2==i?"hao3":"hao"},[t._v("NO."+t._s(i+1))]):t._e(),a("v-uni-view",{staticClass:"flex align-center u-m-l-30"},[a("v-uni-image",{attrs:{src:n.user.avatar,mode:""}}),a("v-uni-view",{staticClass:"name"},[t._v(t._s(n.user.nickname))])],1)],1),a("v-uni-view",{staticClass:"bot"},[t._v(t._s(n.invite_num))])],1)})),1)],1)},e=[]},dc9b:function(t,n,a){"use strict";var i=a("0143"),e=a.n(i);e.a}}]);