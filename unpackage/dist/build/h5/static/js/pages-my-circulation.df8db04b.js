(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-circulation"],{"0a9f":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac1f"),i("99af");var n={data:function(){return{page:1,type:1,list:[],boxHeight:"",tablist:[{name:"我转赠的",type:1},{name:"我收到的",type:2}],act:0}},onLoad:function(t){this.getlist()},onPullDownRefresh:function(){this.list=[],this.getlist()},onReady:function(){this.box()},methods:{box:function(){var t=this,e=uni.createSelectorQuery().in(this);e.select("#list").boundingClientRect((function(e){t.boxHeight=t.windowHeight-e.top-40})).exec()},change:function(t,e){this.act=e,this.list=[],this.page=1,this.type=t,this.getlist()},getlist:function(t){var e=this;"up"==t&&this.page++,this.util.request("user/give_record",{type:this.type,page:this.page}).then((function(t){uni.stopPullDownRefresh(),e.list=e.list.concat(t)}))}}};e.default=n},"401a":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{},[i("v-uni-view",{staticClass:"top_box"},t._l(t.tablist,(function(e,n){return i("v-uni-view",{key:n,staticClass:"top_list",class:t.act==n?"top_list_act":"top_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change(e.type,n)}}},[t._v(t._s(e.name))])})),1),i("v-uni-scroll-view",{style:"padding: 20rpx 0;height:"+t.boxHeight+"px",attrs:{id:"list","scroll-y":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.getlist("up")}}},[i("v-uni-view",{staticClass:"big_list"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"bg-white margin-bottom-sm radius20 lists"},[i("v-uni-view",{},[i("v-uni-image",{staticStyle:{width:"340rpx",height:"340rpx","border-radius":"20rpx"},attrs:{src:e.goods_image,mode:""}}),i("v-uni-view",{staticClass:"padding-left-sm flex-sub u-margin-top-20"},[i("v-uni-view",{staticClass:"font30 text-bold name"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:"margin-top-xs font24 col-999"},[t._v(t._s(1==t.type?"转赠对象":"接收对象")+"："+t._s(e.tonickname))]),i("v-uni-view",{staticClass:"flex align-center col-999 font24 margin-top-xs"},[t._v(t._s(1==t.type?"转赠时间":"接收时间")+"："+t._s(e.give_time_text.slice(0,11)))])],1)],1)],1)})),1)],1)],1)},a=[]},"68ff":function(t,e,i){"use strict";i.r(e);var n=i("0a9f"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"7da1":function(t,e,i){"use strict";var n=i("ae9b"),a=i.n(n);a.a},"95f2":function(t,e,i){"use strict";i.r(e);var n=i("401a"),a=i("68ff");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("7da1");var s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"384a4e8e",null,!1,n["a"],void 0);e["default"]=r.exports},ae9b:function(t,e,i){var n=i("e3ff");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("15062bf6",n,!0,{sourceMap:!1,shadowMode:!1})},e3ff:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-384a4e8e]{background-color:#f7f7f7}body.?%PAGE?%[data-v-384a4e8e]{background-color:#f7f7f7}.name[data-v-384a4e8e]{width:%?320?%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.top_box[data-v-384a4e8e]{background-color:#fff;display:flex;align-items:center;justify-content:space-around;padding:%?30?%}.top_box .top_list[data-v-384a4e8e]{width:%?250?%;height:%?80?%;background-color:#f5f5f5;color:#000;text-align:center;line-height:%?80?%;border-radius:%?50?%}.top_box .top_list_act[data-v-384a4e8e]{border-radius:%?50?%;width:%?250?%;height:%?80?%;background-color:#fff;color:#000;border:%?1?% solid #000;text-align:center;line-height:%?80?%;box-sizing:border-box}.big_list[data-v-384a4e8e]{display:flex!important;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:%?20?%}.big_list .lists[data-v-384a4e8e]{padding-bottom:%?20?%}.active[data-v-384a4e8e]{border-bottom:solid %?4?% #3b3f47;padding-bottom:%?14?%;color:#3b3f47}',""]),t.exports=e}}]);