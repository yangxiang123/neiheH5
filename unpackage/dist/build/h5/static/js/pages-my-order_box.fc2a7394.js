(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-order_box"],{"25cc":function(t,e,i){"use strict";i.r(e);var s=i("8e67"),a=i("8609");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("ac79");var o=i("f0c5"),c=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"209ec3fe",null,!1,s["a"],void 0);e["default"]=c.exports},8609:function(t,e,i){"use strict";i.r(e);var s=i("a1e6"),a=i.n(s);for(var n in s)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e["default"]=a.a},"8e67":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{},[s("v-uni-view",{staticClass:"flex text-center font32 bg-white",staticStyle:{padding:"34rpx 0rpx","border-top":"solid #F7F7F7 1rpx"}},[s("v-uni-view",{staticClass:"flex-sub",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change(999)}}},[s("span",{class:999==t.type?"active":""},[t._v("全部")])]),s("v-uni-view",{staticClass:"flex-sub",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change(0)}}},[s("span",{class:0==t.type?"active":""},[t._v("进行中")])]),s("v-uni-view",{staticClass:"flex-sub",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change(1)}}},[s("span",{class:1==t.type?"active":""},[t._v("已完成")])]),s("v-uni-view",{staticClass:"flex-sub",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change(2)}}},[s("span",{class:2==t.type?"active":""},[t._v("已取消")])])],1),s("v-uni-scroll-view",{style:"padding: 20rpx 27rpx;height:"+t.boxHeight+"px",attrs:{id:"list","scroll-y":!0},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.getlist("up")}}},[t._l(t.list,(function(e,a){return 1==t.type1?s("v-uni-view",{key:a,staticClass:"bg-white margin-bottom-sm radius20",staticStyle:{padding:"29rpx 26rpx"}},[s("v-uni-view",{staticClass:"flex align-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("orderdetailed?id="+e.order_sn)}}},[s("v-uni-view",{staticClass:"font26 flex-sub col-999"},[t._v(t._s(e.order_time_text))]),s("v-uni-view",{staticClass:"font26 col-999 flex align-center"},[s("v-uni-view",{staticClass:"padding-right-sm"},[t._v("查看详情")]),s("v-uni-image",{staticStyle:{width:"11rpx",height:"19rpx"},attrs:{src:i("c51a"),mode:""}})],1)],1),e.goods?s("v-uni-view",{staticClass:"flex align-center margin-top-sm"},[s("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","border-radius":"10rpx"},attrs:{src:e.goods.goods_image,mode:""}}),s("v-uni-view",{staticClass:"padding-left-sm flex-sub"},[s("v-uni-view",{staticClass:"font30"},[t._v(t._s(e.goods.goods_name))]),s("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"26rpx"}},[s("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("编号")]),s("v-uni-view",{staticClass:"right flex justify-center align-center text-white "},[t._v("****")])],1),s("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"30rpx"}},[s("v-uni-view",{staticClass:"font32 flex-sub",staticStyle:{color:"#3b3f47"}},[t._v("￥"+t._s(e.order_amount))]),s("v-uni-view",{staticClass:"text-red font24"},[t._v(t._s(e.order_status_text))])],1)],1)],1):t._e()],1):t._e()})),t._l(t.list,(function(e,a){return 0==t.type1?s("v-uni-view",{staticClass:"bg-white margin-bottom-sm radius20",staticStyle:{padding:"29rpx 26rpx"}},[s("v-uni-view",{staticClass:"flex align-center",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("orderBoxDetail?id="+e.order_sn)}}},[s("v-uni-view",{staticClass:"font26 flex-sub col-999"},[t._v(t._s(e.order_time_text))]),s("v-uni-view",{staticClass:"font26 col-999 flex align-center"},[s("v-uni-view",{staticClass:"padding-right-sm"},[t._v("查看详情")]),s("v-uni-image",{staticStyle:{width:"11rpx",height:"19rpx"},attrs:{src:i("c51a"),mode:""}})],1)],1),s("v-uni-view",{staticClass:"flex align-center margin-top-sm"},[s("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","border-radius":"10rpx"},attrs:{src:e.box.box_image,mode:""}}),s("v-uni-view",{staticClass:"padding-left-sm flex-sub"},[s("v-uni-view",{staticClass:"font30"},[t._v(t._s(e.box.box_name))]),s("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"26rpx"}},[s("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("编号")]),s("v-uni-view",{staticClass:"right flex justify-center align-center text-white"},[t._v(t._s(e.goods_code))])],1),s("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"30rpx"}},[s("v-uni-view",{staticClass:"font32 flex-sub",staticStyle:{color:"#3b3f47"}},[t._v("￥"+t._s(e.order_amount))]),s("v-uni-view",{staticClass:"text-red font24"},[t._v(t._s(e.order_status_text))])],1)],1)],1)],1):t._e()}))],2)],1)},a=[]},a1d3:function(t,e,i){var s=i("f08d");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=i("4f06").default;a("f1fd6db4",s,!0,{sourceMap:!1,shadowMode:!1})},a1e6:function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac1f"),i("99af");var s={data:function(){return{page:1,type:999,list:[],boxHeight:"",type1:!0}},onLoad:function(t){this.getlist()},onPullDownRefresh:function(){this.list=[],this.getlist()},onReady:function(){this.box()},methods:{box:function(){var t=this,e=uni.createSelectorQuery().in(this);e.select("#list").boundingClientRect((function(e){t.boxHeight=t.windowHeight-e.top-0})).exec()},change:function(t){this.page=1,this.type=t,this.list=[],this.getlist()},getlist:function(e){var i=this;"up"==e&&this.page++,1==e&&(this.list=[],this.page=1),this.util.request("order/goods_order",{type:999==this.type?"":this.type,page:this.page,source:this.type1?1:2},"POST").then((function(e){uni.stopPullDownRefresh(),i.list=i.list.concat(e),t("log",e," at pages/my/order_box.vue:160"),t("log",i.list," at pages/my/order_box.vue:161")}))}}};e.default=s}).call(this,i("0de9")["log"])},ac79:function(t,e,i){"use strict";var s=i("a1d3"),a=i.n(s);a.a},c51a:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAABL0lEQVQ4T62Uy0rFMBCGZ0LTvfgMBRcu3QguunEluPFsXAiCSUBw6QP0CXoEaYult5U+l2BVvIsXsLdIJBXRc46NmN3M/F8mmcwEGWMjRJyjlJ6EYfgMvywUQhxpzQUAjOM4fpzFIOd8HxEdJZJSXlmW5UdRdD8NUhkoAOwBwIIW3VBK/SAIbidBqJyu61qO4+wi4qKyu667a9vWz/P8+jv0AajleR4py3IHEZe066GqqnFRFJdfoU+gd3LOtxFxWdtPTdP4WZad9/EfgApwzrcQcUUX4kVK6SdJcqbsiYAKMMY2CSGu3vm1bduDNE1PpwIaGhFCVnWmt7quD2cCSiiEWAOA9R76X0D12eAjGV3aqKwmD0c458Naw6j5jNv7LwNkPKIbUsp527aPh3wC7/inviPv2ah/AAAAAElFTkSuQmCC"},f08d:function(t,e,i){var s=i("24fb");e=s(!1),e.push([t.i,"uni-page-body[data-v-209ec3fe]{background-color:#f7f7f7}body.?%PAGE?%[data-v-209ec3fe]{background-color:#f7f7f7}.active[data-v-209ec3fe]{border-bottom:solid %?4?% #b47528;padding-bottom:%?14?%;color:#b47528}.left[data-v-209ec3fe]{background:#3b3f47;padding:%?4?% %?8?%;color:#fff;border-radius:%?6?% %?0?% %?0?% %?6?%}.right[data-v-209ec3fe]{color:#3b3f47;padding:%?4?% %?8?%;border-radius:%?0?% %?6?% %?6?% %?0?%;border:%?1?% solid #3b3f47}",""]),t.exports=e}}]);