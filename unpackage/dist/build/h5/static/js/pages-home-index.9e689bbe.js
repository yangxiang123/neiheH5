(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-index"],{"0eb3":function(t,i,e){"use strict";e.r(i);var n=e("bfae"),a=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"183a":function(t,i,e){"use strict";(function(t){e("7a82");var n=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("99af"),e("e25e");var a=n(e("ade3")),s=n(e("2b06")),o={components:{uniCountdown:s.default},data:function(){var t;return t={isshow:!1,title_act:0,user:{},list:[],card_list:[],top_list:[],type:0,cardCur:0,swiperList:[{carousel_path:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0137ac5993fb83a801215603767d4c.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651140058&t=0fa9bbc6c763da89c1716066efadb5a5",type:"image"},{carousel_path:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fcb8065380cd79123f8da4ef5a1345982b2b7807d.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651140097&t=68eefbfba9f1f2916a74603e9b734037",type:"image"}],nav_list:[{uri:"/pages/home/chouqian",icon:"/static/new/index_nav8.jpg"},{uri:"/pages/home/integral",icon:"/static/new/index_nav2.png"},{uri:"/pages/my/poster",icon:"/static/new/index_nav3.png"},{uri:"999",icon:"/static/new/index_nav9.png"}],new_list:[],top_list2:""},(0,a.default)(t,"list",[{name:"数字藏品"},{name:"盲盒"},{name:"活动精选"}]),(0,a.default)(t,"current",""),(0,a.default)(t,"showNav",!1),t},onLoad:function(t){this.getcar(),this.getNewList()},onShow:function(){this.list=[],this.top_list=[],this.getUserInfos(),this.getlist()},onPullDownRefresh:function(){this.list=[],this.top_list=[],this.getUserInfos(),this.getlist()},methods:{tonav:function(t,i){"999"==i?this.$u.toast("暂未开放"):""==i?this.jifen():uni.navigateTo({url:i})},jifen:function(){var i=uni.getStorageSync("token");t("log",i," at pages/home/index.vue:422"),window.location.href="http://h5.orangexm.cn/index/user/auth_login?token=".concat(i,"&type=score")},toclub:function(){uni.switchTab({url:"/pages/club/index"})},timer:function(t){var i=(new Date).getTime();return 1e3*t>i},getNewList:function(t){var i=this;this.util.request("index/news",{}).then((function(t){i.new_list=t.data}))},showtost:function(){uni.showToast({icon:"none",title:"模块暂未开放"})},getUserInfos:function(){var i=this;this.util.getUserInfo().then((function(e){i.user=e,0==e.real?i.isshow=!0:i.isshow=!1,t("log",i.isshow,11111111111111111e5," at pages/home/index.vue:473")}))},change:function(t){this.title_act=t,this.getlist()},cardSwiper:function(t){this.cardCur=t.detail.current},getcar:function(){var i=this;this.util.request("index/carousel",{},"POST").then((function(e){i.swiperList=e,t("log",i.swiperList," at pages/home/index.vue:488")}))},tourl:function(t){1==t.link_type?window.location.href=t.link_content:2==t.link_type?uni.navigateTo({url:"/pages/my/agreement?id="+t.link_content}):3==t.link_type?this.util.urlTo("info?id="+t.link_content):4==t.link_type&&this.util.urlTo("box_info?id="+t.link_content)},getlist:function(){var i=this;this.list=[],this.top_list=[],0==this.title_act?this.util.request("index/calendar",{},"POST").then((function(e){if(uni.stopPullDownRefresh(),e)for(var n in e)i.top_list=i.top_list.concat(e[n].goods);t("log",i.top_list," at pages/home/index.vue:525");var a=i.top_list,s=(new Date).getTime();for(var o in a){var r=new Date(1e3*a[o].publish_time).getTime();if(t("log",r," at pages/home/index.vue:531"),r>s){var c,l=parseInt((r-s)/1e3),u=parseInt(l/3600/24),d=parseInt(l/3600%24),v=parseInt(l/60%60),f=parseInt(l%60);c={day:u<10?"0"+u:u,hou:d<10?"0"+d:d,min:v<10?"0"+v:v,sec:f<10?"0"+f:f},i.$set(i.top_list[o],"day",c.day),i.$set(i.top_list[o],"hou",c.hou),i.$set(i.top_list[o],"min",c.min),i.$set(i.top_list[o],"sec",c.sec)}else clearInterval(i.time11)}i.util.request("index/choiceness",{},"POST").then((function(t){uni.stopPullDownRefresh(),i.list=i.list.concat(t.goods),t.top&&(i.top_list=i.top_list.concat(t.top))}))})):1==this.title_act&&this.util.request("index/calendar_box",{},"POST").then((function(e){if(uni.stopPullDownRefresh(),e)for(var n in e)i.top_list=i.top_list.concat(e[n].goods);t("log",i.top_list," at pages/home/index.vue:584");var a=i.top_list,s=(new Date).getTime();for(var o in a){var r=new Date(1e3*a[o].publish_time).getTime();if(t("log",r," at pages/home/index.vue:590"),r>s){var c,l=parseInt((r-s)/1e3),u=parseInt(l/3600/24),d=parseInt(l/3600%24),v=parseInt(l/60%60),f=parseInt(l%60);c={day:u<10?"0"+u:u,hou:d<10?"0"+d:d,min:v<10?"0"+v:v,sec:f<10?"0"+f:f},i.$set(i.top_list[o],"day",c.day),i.$set(i.top_list[o],"hou",c.hou),i.$set(i.top_list[o],"min",c.min),i.$set(i.top_list[o],"sec",c.sec)}else clearInterval(i.time11)}i.util.request("index/choiceness_box",{},"POST").then((function(t){uni.stopPullDownRefresh(),i.list=i.list.concat(t.goods),t.top&&(i.top_list=i.top_list.concat(t.top))}))}))}},onPageScroll:function(t){t.scrollTop>0?this.showNav=!0:this.showNav=!1}};i.default=o}).call(this,e("0de9")["log"])},"189c":function(t,i,e){"use strict";e.r(i);var n=e("534f"),a=e("6a10");for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("29f5");var o=e("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"1ef8cf66",null,!1,n["a"],void 0);i["default"]=r.exports},"29f5":function(t,i,e){"use strict";var n=e("8d3b"),a=e.n(n);a.a},"2b06":function(t,i,e){"use strict";e.r(i);var n=e("3593"),a=e("0eb3");for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("8551");var o=e("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"440bf61a",null,!1,n["a"],void 0);i["default"]=r.exports},3593:function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"uni-countdown"},[t.showDay?e("v-uni-text",{staticClass:"uni-countdown__number",style:[t.timeStyle]},[t._v(t._s(t.d))]):t._e(),t.showDay?e("v-uni-text",{staticClass:"uni-countdown__splitor",style:[t.splitorStyle]},[t._v(t._s(t.dayText))]):t._e(),e("v-uni-text",{staticClass:"uni-countdown__number",style:[t.timeStyle]},[t._v(t._s(t.h))]),e("v-uni-text",{staticClass:"uni-countdown__splitor",style:[t.splitorStyle]},[t._v(t._s(t.showColon?":":t.hourText))]),e("v-uni-text",{staticClass:"uni-countdown__number",style:[t.timeStyle]},[t._v(t._s(t.i))]),e("v-uni-text",{staticClass:"uni-countdown__splitor",style:[t.splitorStyle]},[t._v(t._s(t.showColon?":":t.minuteText))]),e("v-uni-text",{staticClass:"uni-countdown__number",style:[t.timeStyle]},[t._v(t._s(t.s))]),t.showColon?t._e():e("v-uni-text",{staticClass:"uni-countdown__splitor",style:[t.splitorStyle]},[t._v(t._s(t.secondText))])],1)},a=[]},"51a5":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-countdown[data-v-440bf61a]{display:flex;flex-direction:row;justify-content:flex-start;align-items:center}.uni-countdown__splitor[data-v-440bf61a]{margin:0 2px;font-size:14px;color:#333}.uni-countdown__number[data-v-440bf61a]{border-radius:3px;text-align:center;font-size:14px}',""]),t.exports=i},"534f":function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{},[e("v-uni-view",{staticClass:"u-sticky-wrap",class:[t.elClass],style:{height:t.fixed?t.height+"px":"auto",backgroundColor:t.bgColor}},[e("v-uni-view",{staticClass:"u-sticky",style:{position:t.fixed?"fixed":"static",top:t.stickyTop+"px",left:t.left+"px",width:"auto"==t.width?"auto":t.width+"px",zIndex:t.uZIndex}},[t._t("default")],2)],1)],1)},a=[]},"68eb":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-sticky[data-v-1ef8cf66]{z-index:9999999999}',""]),t.exports=i},"6a10":function(t,i,e){"use strict";e.r(i);var n=e("e1ce"),a=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"7c81":function(t,i,e){"use strict";var n=e("984e"),a=e.n(n);a.a},8551:function(t,i,e){"use strict";var n=e("e147"),a=e.n(n);a.a},"8d3b":function(t,i,e){var n=e("68eb");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("1f660de8",n,!0,{sourceMap:!1,shadowMode:!1})},9666:function(t){t.exports=JSON.parse('{"uni-countdown.day":"天","uni-countdown.h":"時","uni-countdown.m":"分","uni-countdown.s":"秒"}')},"984e":function(t,i,e){var n=e("b969");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("3db0cf68",n,!0,{sourceMap:!1,shadowMode:!1})},aaa3:function(t,i,e){"use strict";e.r(i);var n=e("e428"),a=e("ffd0");for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("7c81");var o=e("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"33b7da3a",null,!1,n["a"],void 0);i["default"]=r.exports},b969:function(t,i,e){var n=e("24fb"),a=e("1de5"),s=e("eb62");i=n(!1);var o=a(s);i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page[data-v-33b7da3a]{background-color:#fafafa}.activity[data-v-33b7da3a]{padding:%?30?%}.activity .activity_list[data-v-33b7da3a]{margin-bottom:%?40?%;border-radius:%?50?%;border:%?1?% solid #dbdbdb}.activity .activity_list uni-image[data-v-33b7da3a]{width:100%;height:%?270?%;border-radius:%?50?%}.activity .activity_list .activity_text[data-v-33b7da3a]{padding:%?30?% %?40?% %?35?% %?40?%}.activity .activity_list .activity_text .name[data-v-33b7da3a]{font-style:normal;font-weight:500;font-size:%?36?%;line-height:%?42?%;letter-spacing:%?1?%;color:#000;white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.activity .activity_list .activity_text .time[data-v-33b7da3a]{margin-top:%?28?%;font-style:normal;font-weight:400;font-size:%?24?%;line-height:%?28?%;letter-spacing:%?1.4?%;color:rgba(0,0,0,.8);overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;word-break:break-all;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.tab_list[data-v-33b7da3a]{margin-top:%?30?%}.tab_list .le[data-v-33b7da3a]{font-size:%?36?%;color:#9f9f9f;font-weight:400;height:%?80?%;margin-right:%?30?%}.tab_list .ac[data-v-33b7da3a]{color:#282828;font-weight:600}.tab_list .line[data-v-33b7da3a]{height:%?8?%;width:%?80?%;border-radius:%?10?%;background-color:#42d0ec;margin:%?20?% auto}.left[data-v-33b7da3a]{display:inline-block;margin-top:%?23?%;padding:0 %?8?%;height:%?36?%;font-style:normal;font-weight:700;font-size:%?24?%;line-height:%?36?%;color:#441c02;background:linear-gradient(23.86deg,#ffccb8 -15.3%,#ffc582 96.5%)}.right[data-v-33b7da3a]{display:inline-block;margin-top:%?23?%;padding:0 %?8?%;height:%?36?%;font-style:normal;font-weight:700;font-size:%?24?%;line-height:%?36?%;color:#b47528;background:rgba(240,213,182,.24)}.floataaa[data-v-33b7da3a]{position:fixed;bottom:%?50?%;left:0;width:100%}.floataa[data-v-33b7da3a]{position:fixed;bottom:%?117?%;left:0;width:100%}.lists[data-v-33b7da3a]{padding:%?30?%;padding-top:%?0?%}.lists .lists_box[data-v-33b7da3a]{margin-bottom:%?34?%;margin-left:%?30?%;width:%?330?%;background-color:#fff;box-shadow:0 0 %?60?% 0 rgba(0,0,0,.101961);border-radius:%?6?%}.lists .lists_box .min_img[data-v-33b7da3a]{border-radius:%?6?%;width:%?330?%;height:%?324?%}.lists .lists_box .text[data-v-33b7da3a]{padding:%?28?% 0 %?34?% %?32?%;font-size:%?28?%;font-family:Segoe UI-Bold,Segoe UI;font-weight:700;color:#282828}.lists .lists_box .text .price[data-v-33b7da3a]{font-size:%?28?%;font-family:Segoe UI-Bold,Segoe UI;font-weight:700;color:#282828;margin-top:%?5?%}.content[data-v-33b7da3a]{padding:%?30?%;padding-bottom:%?0?%}.big[data-v-33b7da3a]{background:#fff;box-shadow:0 %?8?% %?30?% 0 rgba(0,0,0,.05);border-radius:%?30?%;position:relative;margin-bottom:%?30?%}.big .top_float[data-v-33b7da3a]{font-size:%?28?%;align-items:center;justify-content:center;padding:%?0?% %?26?%;height:%?80?%;background:rgba(0,0,0,.5);border-radius:%?0?% %?0?% %?30?% %?30?%;color:#fff;position:absolute;left:%?0?%;top:%?610?%;width:100%;font-family:Tensentype MeiHeiJ}.big .top_float .top_float_nei[data-v-33b7da3a]{display:flex;align-items:center}.big .top_float2[data-v-33b7da3a]{font-size:%?24?%;align-items:center;padding:%?15?% %?20?%;background:rgba(0,0,0,.5);border-radius:%?40?%;color:#fff;position:absolute;left:%?20?%;top:%?30?%;font-family:Tensentype MeiHeiJ}.big .img[data-v-33b7da3a]{width:100%;height:%?690?%;border-radius:%?30?%}.big .information[data-v-33b7da3a]{padding:%?28?% %?30?%;font-size:%?20?%;font-family:Source Han Sans CN-Regular,Source Han Sans CN;font-weight:400;color:#848484}.big .information .information_title[data-v-33b7da3a]{font-size:%?28?%;font-family:Segoe UI-Bold,Segoe UI;font-weight:700;color:#282828}.big .information .information_btn[data-v-33b7da3a]{margin-top:%?20?%;font-size:%?40?%;font-family:PingFang SC-中粗体,PingFang SC;font-weight:700;color:#444}.card[data-v-33b7da3a]{background-color:#fff;box-shadow:0 0 %?60?% 0 rgba(0,0,0,.101961);border-radius:%?62?% 0 0 %?62?%;margin-left:%?30?%;padding-top:%?46?%}.card .card_box[data-v-33b7da3a]{overflow-x:auto;display:flex}.card .card_box .card_list[data-v-33b7da3a]{width:%?438?%;margin-left:%?30?%}.card .card_box .card_list .img_box[data-v-33b7da3a]{width:%?438?%;height:%?382?%;position:relative;border-radius:%?30?%}.card .card_box .card_list .img_box uni-image[data-v-33b7da3a]{width:100%;height:100%;border-radius:%?30?%}.card .card_box .card_list .img_box .time[data-v-33b7da3a]{width:%?438?%;height:%?70?%;line-height:%?70?%;text-align:center;background-color:hsla(0,0%,100%,.5);color:#fff;font-size:%?28?%;border-radius:%?30?% %?30?% 0 0;position:absolute;left:0;top:0}.card .card_box .card_list .text[data-v-33b7da3a]{width:%?396?%;background:#fff;box-shadow:0 0 %?60?% 0 rgba(0,0,0,.101961);border-radius:%?42?%;padding:%?26?% %?14?% %?14?% %?22?%;box-sizing:border-box;position:relative;left:%?22?%;bottom:%?74?%}.card .card_box .card_list .text .text_title[data-v-33b7da3a]{font-size:%?28?%;font-family:Segoe UI-Bold,Segoe UI;font-weight:700;color:#282828}.card .card_box .card_list .text .shop_name[data-v-33b7da3a]{margin-top:%?15?%;font-size:%?20?%;font-weight:700;font-family:Segoe UI-Regular,Segoe UI;font-weight:400;color:#a1a1a1}.title[data-v-33b7da3a]{margin:%?0?% 0 %?42?% %?52?%;font-size:%?32?%;font-family:Segoe UI-Bold,Segoe UI;font-weight:700;color:#282828;display:flex;align-items:center}.title uni-image[data-v-33b7da3a]{width:%?32?%;height:%?32?%;margin-left:%?12?%}.top2[data-v-33b7da3a]{padding:%?40?% %?30?%;padding-top:0;margin-top:%?30?%;padding-bottom:0}.nav2[data-v-33b7da3a]{padding:0 %?0?% %?30?%;width:100%;border-radius:%?30?%;display:flex;align-items:center;margin-top:%?32?%;flex-wrap:wrap}.nav2 .nav_lists[data-v-33b7da3a]{font-size:%?24?%;font-family:PingFang SC-常规体,PingFang SC;font-weight:400;color:#9f9f9f;text-align:center;margin-top:%?30?%;display:flex;flex-direction:column;align-items:center;width:25%}.nav2 .nav_lists uni-image[data-v-33b7da3a]{width:%?100?%;height:%?100?%;margin-bottom:%?20?%}.nav[data-v-33b7da3a]{padding:%?30?%;width:100%;background:#fff;box-shadow:0 8px %?24?% 0 rgba(0,0,0,.08);border-radius:%?30?%}.nav .nav_top[data-v-33b7da3a]{display:flex;justify-content:space-between}.nav .nav_notic[data-v-33b7da3a]{margin-top:%?34?%;align-items:center;display:flex;padding-left:%?20?%}.nav .nav_notic uni-image[data-v-33b7da3a]{width:%?36?%;height:%?36?%;margin-right:%?30?%}.nav .nav_box[data-v-33b7da3a]{width:%?190?%;height:%?92?%;background:linear-gradient(135deg,#42e7ed,#42d0ec);border-radius:%?20?%;align-items:center;padding:%?16?%;box-sizing:border-box;font-size:%?24?%;font-family:PingFang SC-中黑体,PingFang SC;font-weight:500;color:#fff}.nav .nav_box uni-image[data-v-33b7da3a]{width:%?60?%;height:%?60?%;margin-right:%?5?%}.nav .nav_box2[data-v-33b7da3a]{background:linear-gradient(135deg,#b99dfe,#a272f0)}.nav .nav_box3[data-v-33b7da3a]{background:linear-gradient(135deg,#ffc46b,#fd8f35)}.notice[data-v-33b7da3a]{padding:0 %?30?%;box-shadow:0 1px 12px rgba(0,0,0,.02)}.notice .box[data-v-33b7da3a]{margin-top:%?30?%;background:url('+o+") no-repeat 50%;background-size:100% 100%;display:flex;align-items:center;height:%?130?%;width:100%;box-sizing:border-box;color:#282828}.notice .box uni-image[data-v-33b7da3a]{width:%?48?%;height:%?48?%}.notice .box .notice-text[data-v-33b7da3a]{margin-left:%?88?%;height:%?76?%;line-height:%?76?%;width:%?427?%;font-size:%?25?%;font-weight:400;color:#8e9091;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.notice .box .more[data-v-33b7da3a]{width:%?36?%;height:%?36?%;margin-left:%?30?%}.top-box[data-v-33b7da3a]{margin-top:%?20?%;width:100vw;border-radius:%?30?% %?30?% %?30?% %?30?%}.top-box .banner .swiper_item_wrap[data-v-33b7da3a]{display:flex;justify-content:center;border-radius:%?30?% %?30?% %?30?% %?30?%}.top-box .banner .swiper_item_wrap .swiper-img[data-v-33b7da3a]{width:%?690?%;height:100%;box-shadow:%?0?% %?10?% %?30?% %?0?% rgba(0,0,0,.1294);border-radius:%?30?% %?30?% %?30?% %?30?%;opacity:1}.header_custom2[data-v-33b7da3a]{background-color:#fff;width:100vw;height:%?70?%;display:flex;align-items:center}.header_custom2 .title_sy[data-v-33b7da3a]{width:100vw;text-align:center;display:line-block;color:#000;font-size:%?36?%;font-weight:600}[data-v-33b7da3a] .sticky{height:%?60?%;border-radius:%?30?% %?30?% 0 0}.fade-enter-active[data-v-33b7da3a],\n.fade-leave-active[data-v-33b7da3a]{transition:opacity 1s;opacity:1}.fade-enter[data-v-33b7da3a],\n.fade-leave-to[data-v-33b7da3a]{transition:opacity 0s;opacity:0}[data-v-33b7da3a] .uni-swiper-dot{width:%?10?%;height:%?10?%}",""]),t.exports=i},bfae:function(t,i,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("a9e3"),e("e25e");var a=e("37dc"),s=n(e("da15")),o=(0,a.initVueI18n)(s.default),r=o.t,c={name:"UniCountdown",emits:["timeup"],props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},start:{type:Boolean,default:!0},backgroundColor:{type:String,default:""},color:{type:String,default:"#333"},fontSize:{type:Number,default:14},splitorColor:{type:String,default:"#333"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0},timestamp:{type:Number,default:0}},data:function(){return{timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}},computed:{dayText:function(){return r("uni-countdown.day")},hourText:function(t){return r("uni-countdown.h")},minuteText:function(t){return r("uni-countdown.m")},secondText:function(t){return r("uni-countdown.s")},timeStyle:function(){var t=this.color,i=this.backgroundColor,e=this.fontSize;return{color:t,backgroundColor:i,fontSize:"".concat(e,"px"),width:"".concat(22*e/14,"px"),lineHeight:"".concat(20*e/14,"px"),borderRadius:"".concat(3*e/14,"px")}},splitorStyle:function(){var t=this.splitorColor,i=this.fontSize,e=this.backgroundColor;return{color:t,fontSize:"".concat(12*i/14,"px"),margin:e?"".concat(4*i/14,"px"):""}}},watch:{day:function(t){this.changeFlag()},hour:function(t){this.changeFlag()},minute:function(t){this.changeFlag()},second:function(t){this.changeFlag()},start:{immediate:!0,handler:function(t,i){if(t)this.startData();else{if(!i)return;clearInterval(this.timer)}}}},created:function(t){this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.countDown()},destroyed:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,i,e,n,a){return t?t-parseInt((new Date).getTime()/1e3,10):60*i*60*24+60*e*60+60*n+a},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.seconds,i=0,e=0,n=0,a=0;t>0?(i=Math.floor(t/86400),e=Math.floor(t/3600)-24*i,n=Math.floor(t/60)-24*i*60-60*e,a=Math.floor(t)-24*i*60*60-60*e*60-60*n):this.timeUp(),i<10&&(i="0"+i),e<10&&(e="0"+e),n<10&&(n="0"+n),a<10&&(a="0"+a),this.d=i,this.h=e,this.i=n,this.s=a},startData:function(){var t=this;if(this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.seconds<=0)return this.seconds=this.toSeconds(0,0,0,0,0),void this.countDown();clearInterval(this.timer),this.countDown(),this.timer=setInterval((function(){t.seconds--,t.seconds<0?t.timeUp():t.countDown()}),1e3)},update:function(){this.startData()},changeFlag:function(){this.syncFlag||(this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};i.default=c},c13f:function(t){t.exports=JSON.parse('{"uni-countdown.day":"天","uni-countdown.h":"时","uni-countdown.m":"分","uni-countdown.s":"秒"}')},da15:function(t,i,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("ef4f")),s=n(e("c13f")),o=n(e("9666")),r={en:a.default,"zh-Hans":s.default,"zh-Hant":o.default};i.default=r},e147:function(t,i,e){var n=e("51a5");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("eefdec86",n,!0,{sourceMap:!1,shadowMode:!1})},e1ce:function(t,i,e){"use strict";e("7a82"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("a9e3"),e("2c3e");var n={name:"u-sticky",props:{offsetTop:{type:[Number,String],default:0},index:{type:[Number,String],default:""},enable:{type:Boolean,default:!0},h5NavHeight:{type:[Number,String],default:44},bgColor:{type:String,default:"#ffffff"},zIndex:{type:[Number,String],default:""}},data:function(){return{fixed:!1,height:"auto",stickyTop:0,elClass:this.$u.guid(),left:0,width:"auto"}},watch:{offsetTop:function(t){this.initObserver()},enable:function(t){0==t?(this.fixed=!1,this.disconnectObserver("contentObserver")):this.initObserver()}},computed:{uZIndex:function(){return this.zIndex?this.zIndex:this.$u.zIndex.sticky}},mounted:function(){this.initObserver()},methods:{initObserver:function(){var t=this;this.enable&&(this.stickyTop=0!=this.offsetTop?uni.upx2px(this.offsetTop)+this.h5NavHeight:this.h5NavHeight,this.disconnectObserver("contentObserver"),this.$uGetRect("."+this.elClass).then((function(i){t.height=i.height,t.left=i.left,t.width=i.width,t.$nextTick((function(){t.observeContent()}))})))},observeContent:function(){var t=this;this.disconnectObserver("contentObserver");var i=this.createIntersectionObserver({thresholds:[.95,.98,1]});i.relativeToViewport({top:-this.stickyTop}),i.observe("."+this.elClass,(function(i){t.enable&&t.setFixed(i.boundingClientRect.top)})),this.contentObserver=i},setFixed:function(t){var i=t<this.stickyTop;i?this.$emit("fixed",this.index):this.fixed&&this.$emit("unfixed",this.index),this.fixed=i},disconnectObserver:function(t){var i=this[t];i&&i.disconnect()}},beforeDestroy:function(){this.disconnectObserver("contentObserver")}};i.default=n},e428:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var n={uSticky:e("189c").default,uniCountdown:e("2b06").default,uIcon:e("89c6").default},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"page"},[e("u-sticky",{attrs:{"h5-nav-height":"0"}},[e("transition",{attrs:{name:"fade"}},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showNav,expression:"showNav"}],staticClass:"header_custom2"},[e("v-uni-view",{staticClass:"title_sy"},[t._v("首页")])],1)],1)],1),e("v-uni-view",{staticClass:"top-box"},[e("v-uni-swiper",{staticClass:"banner",attrs:{"indicator-dots":!0,autoplay:!0,interval:3e3,duration:1e3,circular:!0,"indicator-active-color":"#fff"}},t._l(t.swiperList,(function(i,n){return e("v-uni-swiper-item",{key:n,staticClass:"swiper_item_wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tourl(i)}}},[e("v-uni-image",{staticClass:"swiper-img",attrs:{src:i.image,mode:"aspectFill"}})],1)})),1),e("v-uni-view",{staticClass:"notice",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toclub.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"box"},[e("v-uni-view",{staticClass:"shu"}),e("v-uni-swiper",{staticClass:"notice-text",attrs:{"indicator-dots":!1,autoplay:!0,interval:8e3,duration:1e3,vertical:!0,circular:!0}},t._l(t.new_list,(function(i,n){return e("v-uni-swiper-item",{key:n,staticClass:"notice-text"},[t._v(t._s(i.title))])})),1),e("v-uni-image",{staticClass:"more",attrs:{src:"/static/new/notice_more.png",mode:""}})],1)],1),e("v-uni-view",{staticClass:"top2"},[e("v-uni-view",{staticClass:"nav2"},[e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/my/poster")}}},[e("v-uni-image",{attrs:{src:"/static/iconk5.png"}}),e("v-uni-view",{},[t._v("邀请好友")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/my/invitation")}}},[e("v-uni-image",{attrs:{src:"/static/iconk3.png"}}),e("v-uni-view",{},[t._v("邀请榜")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("brickmall")}}},[e("v-uni-image",{attrs:{src:"/static/iconk6.png"}}),e("v-uni-view",{},[t._v("积分商城")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("zhuanpan")}}},[e("v-uni-image",{attrs:{src:"/static/iconk4.png"}}),e("v-uni-view",{},[t._v("抽奖")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("chicang")}}},[e("v-uni-image",{attrs:{src:"/static/index_nav5.png"}}),e("v-uni-view",{},[t._v("拉新持仓榜")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("xiaofeibang")}}},[e("v-uni-image",{attrs:{src:"/static/index_nav5.png"}}),e("v-uni-view",{},[t._v("消费榜")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("chouqian")}}},[e("v-uni-image",{attrs:{src:"/static/iconk2.png"}}),e("v-uni-view",{},[t._v("抽签")])],1),e("v-uni-view",{staticClass:"nav_lists",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/my/synthesis")}}},[e("v-uni-image",{attrs:{src:"/static/iconk1.png"}}),e("v-uni-view",{},[t._v("合成")])],1)],1),e("v-uni-view",{staticClass:"tab_list"},[e("v-uni-view",{staticClass:"flex align-center"},[e("v-uni-view",{staticClass:"le",class:0==t.title_act?"le ac":"le",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change(0)}}},[t._v("数字藏品"),0==t.title_act?e("v-uni-view",{staticClass:"line"}):t._e()],1),e("v-uni-view",{staticClass:"le",class:1==t.title_act?"le ac":"le",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change(1)}}},[t._v("盲盒"),1==t.title_act?e("v-uni-view",{staticClass:"line"}):t._e()],1),e("v-uni-view",{staticClass:"le",class:2==t.title_act?"le ac":"le",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.change(2)}}},[t._v("活动精选"),2==t.title_act?e("v-uni-view",{staticClass:"line"}):t._e()],1)],1)],1)],1)],1),2!=t.title_act?e("v-uni-view",{},[e("v-uni-view",{staticClass:"content"},t._l(t.top_list,(function(i,n){return""!=t.top_list?e("v-uni-view",{staticClass:"big"},[i.goods_image?e("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("info?id="+i.id)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:i.goods_image,mode:"aspectFill"}}),t.timer(i.publish_time)?e("v-uni-view",{staticClass:"top_float flex align-center"},[e("v-uni-view",{staticClass:"top_float_nei"},[t._v("发售倒计时:"),e("uni-countdown",{attrs:{"font-size":12,splitorColor:"#fff",color:"#fff",day:i.day,hour:i.hou,minute:i.min,second:i.sec}})],1)],1):t._e(),e("v-uni-view",{staticClass:"information"},[e("v-uni-view",{staticClass:"flex justify-between align-center"},[e("v-uni-view",{staticClass:"information_title"},[t._v(t._s(i.goods_name))])],1),e("v-uni-view",{staticClass:"u-flex"},[e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"10rpx"}},[e("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("限量")]),e("v-uni-view",{staticClass:"right flex justify-center align-center  "},[t._v(t._s(i.limit_number))])],1)],1),e("v-uni-view",{staticClass:"flex align-center justify-between"},[i.publisher_info?e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"35rpx"}},[e("v-uni-image",{staticStyle:{width:"60rpx",height:"60rpx","border-radius":"100%","margin-right":"10rpx"},attrs:{src:i.publisher_info.avatar,mode:""}}),t._v(t._s(i.publisher_info.name))],1):t._e(),e("v-uni-view",{staticClass:"information_btn"},[t._v("￥"+t._s(i.goods_price))])],1)],1)],1):t._e(),i.box_image?e("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("box_info?id="+i.id)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:i.box_image,mode:"aspectFill"}}),t.timer(i.publish_time)?e("v-uni-view",{staticClass:"top_float flex align-center "},[e("v-uni-view",{staticClass:"top_float_nei"},[t._v("发售倒计时:"),e("uni-countdown",{attrs:{"font-size":12,splitorColor:"#fff",color:"#fff",day:i.day,hour:i.hou,minute:i.min,second:i.sec}})],1)],1):t._e(),e("v-uni-view",{staticClass:"information"},[e("v-uni-view",{staticClass:"flex justify-between align-center"},[e("v-uni-view",{staticClass:"information_title"},[t._v(t._s(i.box_name))])],1),e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"10rpx"}},[e("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("限量")]),e("v-uni-view",{staticClass:"right flex justify-center align-center  "},[t._v(t._s(i.limit_number))])],1),e("v-uni-view",{staticClass:"flex align-center justify-between"},[e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"35rpx"}},[e("v-uni-image",{staticStyle:{width:"60rpx",height:"60rpx","border-radius":"100%","margin-right":"10rpx"},attrs:{src:i.publish_image,mode:""}}),t._v(t._s(i.publisher))],1),e("v-uni-view",{staticClass:"information_btn"},[t._v("￥"+t._s(i.box_price))])],1)],1)],1):t._e()],1):t._e()})),1),e("v-uni-view",{staticClass:"lists"},t._l(t.list,(function(i,n){return""!=t.list?e("v-uni-view",{staticClass:"big"},[i.goods_image?e("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("info?id="+i.id)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:i.goods_image,mode:"aspectFill"}}),1==i.is_sell_out?e("v-uni-view",{staticClass:"top_float2 "},[e("u-icon",{staticClass:"u-m-r-20",attrs:{name:"clock",color:"#fff",size:"32"}}),t._v("已售罄")],1):t._e(),e("v-uni-view",{staticClass:"information"},[e("v-uni-view",{staticClass:"flex justify-between align-center"},[e("v-uni-view",{staticClass:"information_title"},[t._v(t._s(i.goods_name))])],1),e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"10rpx"}},[e("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("限量")]),e("v-uni-view",{staticClass:"right flex justify-center align-center  "},[t._v(t._s(i.limit_number))])],1),e("v-uni-view",{staticClass:"flex align-center justify-between"},[i.publisher_info?e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"35rpx"}},[e("v-uni-image",{staticStyle:{width:"60rpx",height:"60rpx","border-radius":"100%","margin-right":"10rpx"},attrs:{src:i.publisher_info.avatar,mode:""}}),t._v(t._s(i.publisher_info.name))],1):t._e(),e("v-uni-view",{staticClass:"information_btn"},[t._v("￥"+t._s(i.goods_price))])],1)],1)],1):t._e(),i.box_image?e("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("box_info?id="+i.id)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:i.box_image,mode:"aspectFill"}}),1==i.is_sell_out?e("v-uni-view",{staticClass:"top_float2 "},[e("u-icon",{staticClass:"u-m-r-20",attrs:{name:"clock",color:"#fff",size:"32"}}),t._v("已售罄")],1):t._e(),e("v-uni-view",{staticClass:"information"},[e("v-uni-view",{staticClass:"flex justify-between align-center"},[e("v-uni-view",{staticClass:"information_title"},[t._v(t._s(i.box_name))])],1),e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"font-size":"20rpx","margin-top":"10rpx"}},[e("v-uni-view",{staticClass:"left flex justify-center align-center"},[t._v("限量")]),e("v-uni-view",{staticClass:"right flex justify-center align-center  "},[t._v(t._s(i.limit_number))])],1),e("v-uni-view",{staticClass:"flex align-center justify-between"},[e("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"35rpx"}},[e("v-uni-image",{staticStyle:{width:"60rpx",height:"60rpx","border-radius":"100%","margin-right":"10rpx"},attrs:{src:i.publish_image,mode:""}}),t._v(t._s(i.publisher))],1),e("v-uni-view",{staticClass:"information_btn"},[t._v("￥"+t._s(i.box_price))])],1)],1)],1):t._e()],1):t._e()})),1)],1):e("v-uni-view",{},[e("v-uni-view",{staticClass:"activity"},[e("v-uni-view",{staticClass:"activity_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/home/chouqian")}}},[e("v-uni-view",{},[e("v-uni-image",{attrs:{src:"/static/new/activity_list1.jpg",mode:""}})],1),e("v-uni-view",{staticClass:"activity_text"},[e("v-uni-view",{staticClass:"name"},[t._v("《摩云金翅欧鹏》消耗性抽签")]),e("v-uni-view",{staticClass:"time"},[t._v("抽签时间：2023年1月8日20:00-1月9日10:00")])],1)],1),e("v-uni-view",{staticClass:"activity_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/my/synthesis")}}},[e("v-uni-view",{},[e("v-uni-image",{attrs:{src:"/static/new/activity_list2.jpg",mode:""}})],1),e("v-uni-view",{staticClass:"activity_text"},[e("v-uni-view",{staticClass:"name"},[t._v("《活动资格卡》合成")]),e("v-uni-view",{staticClass:"time"},[t._v("抽签时间：长期开启")])],1)],1),e("v-uni-view",{staticClass:"activity_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/home/integral")}}},[e("v-uni-view",{},[e("v-uni-image",{attrs:{src:"/static/new/activity_list3.jpg",mode:""}})],1),e("v-uni-view",{staticClass:"activity_text"},[e("v-uni-view",{staticClass:"name"},[t._v("钻石商城")]),e("v-uni-view",{staticClass:"time"},[t._v("兑换时间敬请期待")])],1)],1),e("v-uni-view",{staticClass:"activity_list",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("/pages/my/poster")}}},[e("v-uni-view",{},[e("v-uni-image",{attrs:{src:"/static/new/activity_list4.jpg",mode:""}})],1),e("v-uni-view",{staticClass:"activity_text"},[e("v-uni-view",{staticClass:"name"},[t._v("金秋送爽拉新活动持续相伴")]),e("v-uni-view",{staticClass:"time"},[t._v("积分抽奖积分购，福利多多不限购")])],1)],1)],1)],1),1==t.isshow?e("v-uni-view",{staticClass:"flex align-center justify-center floataa"},[e("v-uni-view",{staticClass:"flex align-center bg-white",staticStyle:{padding:"16rpx 33rpx",width:"694rpx","box-shadow":"0px 0px 16rpx 0px rgba(0, 0, 0, 0.14)","border-radius":"20rpx"}},[e("v-uni-view",{staticClass:"flex-sub"},[t._v("实名认证之后才可以购买数字藏品")]),e("v-uni-view",{staticClass:"btnbg margin-right-sm",staticStyle:{width:"116rpx",height:"56rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.util.urlTo("../index/shiming")}}},[t._v("认证")]),e("v-uni-image",{staticStyle:{width:"22rpx",height:"22rpx"},attrs:{src:"/static/home/close.png",mode:""},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.isshow=!1}}})],1)],1):t._e()],1)},s=[]},eb62:function(t,i,e){t.exports=e.p+"static/img/notice_bg.17dffbae.png"},ef4f:function(t){t.exports=JSON.parse('{"uni-countdown.day":"day","uni-countdown.h":"h","uni-countdown.m":"m","uni-countdown.s":"s"}')},ffd0:function(t,i,e){"use strict";e.r(i);var n=e("183a"),a=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a}}]);