(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-zhuanpan"],{"1e58":function(t,n,i){var e=i("a0f2");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=i("4f06").default;s("85b4deae",e,!0,{sourceMap:!1,shadowMode:!1})},"37c5":function(t,n,i){t.exports=i.p+"static/img/listNull.46ed866b.png"},"3be8":function(t,n,i){"use strict";(function(t){i("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,i("99af"),i("a434");var e={data:function(){return{sjNum:0,isQd:!0,AwardList:[],fen:"",toalt:"",pay_score:"",modalName:"",page:1,last_page:1,lists:[]}},onLoad:function(){this.getinit()},methods:{lower:function(){t("log",1," at pages/home/zhuanpan.vue:74"),this.page<this.last_page&&(this.page+=1,this.getmodle_list())},chakan:function(){this.lists=[],this.page=1,this.getmodle_list(),this.modalName="Modal"},getmodle_list:function(){var t=this;this.util.request("user/draw_record",{page:this.page},"POST").then((function(n){t.lists=t.lists.concat(n.data),t.last_page=n.last_page}))},getinit:function(){var t=this;this.util.request("user/draw_rule",{},"POST").then((function(n){t.toalt=n.rule,t.pay_score=n.pay_score,t.util.request("user/prizes",{},"POST").then((function(n){t.AwardList=n.prizes,t.fen=n.score,t.AwardList.splice(4,0,{img:"../../static/begin.png",name:t.pay_score+"积分/次",id:0})}))}))},updateMoney:function(t){this.getinit()}}};n.default=e}).call(this,i("0de9")["log"])},"4fcd":function(t,n,i){"use strict";i("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{nImg:String,AwardList:{type:Array,default:[]}},data:function(){return{sel:"",FastNums:0,SlowNums:0,time:1e3,LoopStatus:!0,noClick:!0,sell_fen:null,sjNum:0}},onLoad:function(){},methods:{updateMoney:function(t){this.$emit("updateMoney",t)},begin:function(t){var n=this;if(4==t){if(!this.noClick)return void uni.showToast({title:"请勿频繁点击",icon:"none",position:"bottom"});this.noClick=!1,this.FastNums=0,this.SlowNums=0,this.time=200,this.LoopStatus=!0,this.util.request("user/draw",{},"POST").then((function(t){for(var i in n.AwardList)n.AwardList[i].id==t.prize&&(n.sjNum=i);n.loop()}))}},loop:function(){var t=this,n=this.sjNum;(!this.sel||this.sel<9)&&(3==this.sel||""===this.sel?this.sel=0:2==this.sel?this.sel=5:5==this.sel?this.sel=8:8==this.sel?this.sel=7:7==this.sel?this.sel=6:6==this.sel?this.sel=3:this.sel++,this.FastNums++,4==this.FastNums&&(this.FastNums=0,this.time=50,this.SlowNums++),8==this.SlowNums&&(this.SlowNums=0,this.time=500,this.FastNums=5),this.FastNums>5&&this.sel==n&&(this.noClick=!0,this.LoopStatus=!1,uni.showToast({title:"恭喜获得-"+this.AwardList[n].name,icon:"none",position:"bottom"}),this.updateMoney()),this.LoopStatus&&setTimeout((function(){t.loop()}),this.time))}}};n.default=e},5918:function(t,n,i){"use strict";i.r(n);var e=i("4fcd"),s=i.n(e);for(var a in e)["default"].indexOf(a)<0&&function(t){i.d(n,t,(function(){return e[t]}))}(a);n["default"]=s.a},"66a3":function(t,n,i){"use strict";i.r(n);var e=i("bdec"),s=i("7305");for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(n,t,(function(){return s[t]}))}(a);i("bd87");var o=i("f0c5"),l=Object(o["a"])(s["default"],e["b"],e["c"],!1,null,"f2f703ec",null,!1,e["a"],void 0);n["default"]=l.exports},6704:function(t,n,i){t.exports=i.p+"static/img/luck2.081f6914.png"},7305:function(t,n,i){"use strict";i.r(n);var e=i("3be8"),s=i.n(e);for(var a in e)["default"].indexOf(a)<0&&function(t){i.d(n,t,(function(){return e[t]}))}(a);n["default"]=s.a},"7fb6":function(t,n,i){"use strict";i.r(n);var e=i("f854"),s=i("5918");for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(n,t,(function(){return s[t]}))}(a);i("d6a0");var o=i("f0c5"),l=Object(o["a"])(s["default"],e["b"],e["c"],!1,null,"5b22c3a4",null,!1,e["a"],void 0);n["default"]=l.exports},a0f2:function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 抽奖 */.luck-list[data-v-5b22c3a4]{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;margin:0 auto;margin-top:%?440?%;width:%?600?%}.cell-item[data-v-5b22c3a4]{width:%?150?%;height:%?158?%;border-radius:%?30?%;margin:%?5?%}.cell-content[data-v-5b22c3a4]{width:%?150?%;height:%?138?%;border-radius:%?30?%;display:flex;flex-direction:column;align-items:center;justify-content:center}.w[data-v-5b22c3a4]{background-color:#fdf2ee}.w-b[data-v-5b22c3a4]{background-color:#f8d0c3}.y[data-v-5b22c3a4]{background-color:#fee610}.y-b[data-v-5b22c3a4]{background-color:#efcd22}",""]),t.exports=n},bd87:function(t,n,i){"use strict";var e=i("be59"),s=i.n(e);s.a},bdec:function(t,n,i){"use strict";i.d(n,"b",(function(){return s})),i.d(n,"c",(function(){return a})),i.d(n,"a",(function(){return e}));var e={gbChoujiang:i("7fb6").default,uIcon:i("86f6").default},s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"page"},[e("gb-choujiang",{attrs:{AwardList:t.AwardList},on:{updateMoney:function(n){arguments[0]=n=t.$handleEvent(n),t.updateMoney.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"bot"},[e("v-uni-view",{staticClass:"u-flex u-row-between"},[e("v-uni-view",{staticClass:"left"},[t._v("剩余积分:"+t._s(t.fen))]),e("v-uni-view",{on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.chakan.apply(void 0,arguments)}}},[t._v("点击查看中奖列表>>>")])],1),e("v-uni-view",{staticClass:"margin-top-sm text-sm text999 letter",staticStyle:{"line-height":"42rpx"}},[e("v-uni-rich-text",{attrs:{nodes:t.toalt}})],1)],1),e("v-uni-view",{staticClass:"cu-modal",class:"Modal"==t.modalName?"show":"",staticStyle:{"z-index":"999"}},[e("v-uni-view",{staticClass:"cu-dialog radius20 smbg po-rela bg-white"},[e("v-uni-scroll-view",{staticClass:"scroll-Y",attrs:{"scroll-y":!0},on:{scrolltolower:function(n){arguments[0]=n=t.$handleEvent(n),t.lower.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"list"},[e("v-uni-view",{staticClass:"close",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.modalName=""}}},[e("u-icon",{attrs:{name:"close",color:"#ccc",size:"40"}})],1),t.lists.length?t._l(t.lists,(function(n,i){return e("v-uni-view",{key:i,staticClass:"way"},[e("v-uni-view",{staticClass:"way_left"},[e("v-uni-image",{attrs:{src:n.prize.img,mode:""}}),e("v-uni-view",{},[t._v(t._s(n.prize.name))])],1),e("v-uni-view",{staticClass:"time"},[t._v(t._s(n.create_time))])],1)})):e("v-uni-view",{staticClass:"listNull"},[e("v-uni-image",{attrs:{src:i("37c5"),mode:""}}),e("v-uni-text",[t._v("暂无数据")])],1)],2)],1)],1)],1)],1)},a=[]},be59:function(t,n,i){var e=i("eea6");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=i("4f06").default;s("3ed48dcb",e,!0,{sourceMap:!1,shadowMode:!1})},d6a0:function(t,n,i){"use strict";var e=i("1e58"),s=i.n(e);s.a},eea6:function(t,n,i){var e=i("24fb"),s=i("1de5"),a=i("6704");n=e(!1);var o=s(a);n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.listNull[data-v-f2f703ec]{width:100%;margin:0 auto;background-size:100%;display:flex;flex-direction:column;align-items:center}.listNull uni-text[data-v-f2f703ec]{color:#939393}.page[data-v-f2f703ec]{height:100vh;width:100%;background:url('+o+") no-repeat 50%;background-size:100% 100%;position:relative;overflow:hidden}.page .bot[data-v-f2f703ec]{padding:0 %?44?%;padding-top:%?60?%;color:#fff}.page .list[data-v-f2f703ec]{width:100%;height:%?800?%;padding:%?30?%}.page .list .close[data-v-f2f703ec]{text-align:right}.page .list .way[data-v-f2f703ec]{height:%?100?%;line-height:%?100?%;display:flex;align-items:center;justify-content:space-between;padding:0 %?20?%;border-bottom:%?1?% solid #f5f5f5;color:#444}.page .list .way .way_left[data-v-f2f703ec]{display:flex;align-items:center}.page .list .way uni-image[data-v-f2f703ec]{width:%?40?%;height:%?40?%;margin-right:%?20?%}.page .list .way .time[data-v-f2f703ec]{color:#ccc}",""]),t.exports=n},f854:function(t,n,i){"use strict";i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return s})),i.d(n,"a",(function(){}));var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticStyle:{}},[i("v-uni-view",{staticClass:"luck-list"},t._l(t.AwardList,(function(n,e){return i("v-uni-view",{key:e},[i("v-uni-view",{staticClass:"cell-item",class:4==e||e===t.sel?"y-b":"w-b",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.begin(e)}}},[i("v-uni-view",{staticClass:"cell-content",class:4==e||e===t.sel?"y":"w"},[n.img?i("v-uni-image",{staticStyle:{width:"60rpx",height:"60rpx"},attrs:{src:n.img,mode:"widthFix"}}):t._e(),i("v-uni-view",{staticStyle:{"margin-top":"5rpx"}},[i("v-uni-text",{staticStyle:{"font-size":"21rpx"}},[t._v(t._s(n.name))])],1)],1)],1)],1)})),1)],1)},s=[]}}]);