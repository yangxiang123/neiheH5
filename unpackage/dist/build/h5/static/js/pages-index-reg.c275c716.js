(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-reg"],{"1f3f":function(t,e,i){"use strict";i.r(e);var a=i("3a6c"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"3a6c":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac1f"),i("841c");var a={data:function(){return{radio:!1,second:60,showText:!0,security_code:"获取验证码",mobile:"",code:"",password:"",qrcode:"",sliderVerifyFLag:!1,token:""}},onLoad:function(t){t.invite_code&&(this.qrcode=t.invite_code)},methods:{getQueryVariable:function(t){for(var e=window.location.search.substring(1),i=e.split("&"),a=0;a<i.length;a++){var n=i[a].split("=");if(n[0]==t)return n[1]}return!1},success:function(t){this.util.showToast("验证通过"),this.token=t,this.sliderVerifyFLag=!1,this.regsubmit()},isShowimage:function(t){this.sliderVerifyFLag=t,uni.showToast({title:"验证失败",icon:"none"})},getCode:function(){var t=this;this.showText=!1;var e=setInterval((function(){var e=--t.second;t.second=e<10?"0"+e:e}),1e3);setTimeout((function(){clearInterval(e),t.second=60,t.showText=!0}),6e4)},sendcode:function(){var t=this;return!!this.showText&&(this.util.checkPhone(this.mobile)?void this.util.request("sms/send",{mobile:this.mobile,event:"mobilelogin"},"POST").then((function(e){t.util.showToast("发送成功，请注意查收"),t.getCode()})):(this.util.showToast("请输入正确手机号"),!1))},submit:function(){return this.radio?this.util.checkPhone(this.mobile)?this.code.length<4?(this.util.showToast("请输入4位数验证码"),!1):this.password.length<6?(this.util.showToast("请输入至少6位数密码"),!1):void(this.sliderVerifyFLag=!0):(this.util.showToast("请输入正确手机号"),!1):(this.util.showToast("请阅读并同意隐私协议"),!1)},regsubmit:function(){var t=this,e=this;this.util.request("user/register",{mobile:this.mobile,captcha:this.code,password:this.password,inviter:this.qrcode},"POST").then((function(i){t.util.showToast("注册成功"),uni.setStorageSync("info",i.userinfo),uni.setStorageSync("token",i.userinfo.token),setTimeout((function(){e.util.urlTo("index")}),1e3)}))}}};e.default=a},"48a1":function(t,e,i){t.exports=i.p+"static/img/login_wtb_bg.5d04005f.jpg"},"713e":function(t,e,i){var a=i("24fb"),n=i("1de5"),o=i("48a1");e=a(!1);var s=n(o);e.push([t.i,"uni-page-body[data-v-3e45fa80]{background-color:#fff}body.?%PAGE?%[data-v-3e45fa80]{background-color:#fff}.topbak[data-v-3e45fa80]{background:url("+s+") no-repeat 50%;background-size:100% 100%;height:%?350?%;width:100%;background-position:0 %?-20?%}.hui[data-v-3e45fa80]{font-size:%?24?%;font-family:Source Han Sans CN-Regular,Source Han Sans CN;font-weight:400;color:#9f9f9f}.content1[data-v-3e45fa80]{position:relative;bottom:%?30?%;border-radius:%?30?% %?30?% 0 0;background-color:#fff;padding:%?52?% %?40?%\n\t/* \twidth: 100%;\n\theight:100vh;\n\tbackground: url('@/static/zhucebg.png') no-repeat;\n\tbackground-size: contain; */}.item[data-v-3e45fa80]{width:%?660?%;height:%?540?%;border-radius:%?30?%;background-color:#fff;margin:%?0?% auto;position:relative;top:%?446?%}.submit[data-v-3e45fa80]{margin:0 auto;width:%?662?%;height:%?100?%;background:#3b3f47;border-radius:%?6?%;line-height:%?100?%;text-align:center;color:#fff}.title[data-v-3e45fa80]{padding:%?28?% %?0?% %?14?%}.flex[data-v-3e45fa80]{display:flex;align-items:center}uni-input[data-v-3e45fa80]{border:solid %?1?% #999;padding:%?22?% %?34?%;border-radius:%?12?%}.plsty[data-v-3e45fa80]{color:#8a8a8a;font-size:%?26?%}.mar[data-v-3e45fa80]{margin:%?0?% %?40?%}.btn[data-v-3e45fa80]{color:#fff;font-size:%?32?%;line-height:%?82?%;height:%?82?%;background:linear-gradient(0deg,#1a9eff,#0fb8ff);border-radius:%?12?%}.yzm[data-v-3e45fa80]{font-size:%?26?%;color:#1198ea;border:solid %?1?% #1198ea;width:%?192?%;padding:%?27?% %?0?%;text-align:center;border-radius:%?12?%}.placesty[data-v-3e45fa80]{font-size:%?26?%;color:#aaa}.inp[data-v-3e45fa80]{border:none;border-bottom:%?1?% solid #f5f5f5;height:%?82?%;margin-top:%?19?%}",""]),t.exports=e},"76a0":function(t,e,i){"use strict";var a=i("c4f5"),n=i.n(a);n.a},b368:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={tfggVerify:i("090b").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{},[i("cu-custom",{attrs:{bgColor:"bg-white",isBack:!1}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("注册熊猫艺术")])],2),i("v-uni-view",{staticClass:"topbak"}),i("v-uni-view",{staticClass:"content1"},[i("v-uni-view",{staticClass:"form"},[i("v-uni-view",{staticClass:"flex align-center"},[i("v-uni-view",{staticClass:"font26 padding-left-xs hui"},[t._v("账号")])],1),i("v-uni-view",{},[i("v-uni-input",{staticClass:"inp",attrs:{type:"tel",placeholder:"请输入手机号","placeholder-class":"placesty"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}})],1),i("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"46rpx"}},[i("v-uni-view",{staticClass:"font26 padding-left-xs hui"},[t._v("验证码")])],1),i("v-uni-view",{staticClass:"flex align-center"},[i("v-uni-input",{staticClass:"inp flex-sub",attrs:{type:"number",placeholder:"请输入4位数验证码","placeholder-class":"placesty"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),i("v-uni-view",{staticStyle:{width:"61rpx"}}),i("v-uni-view",{staticClass:"text-black font26",staticStyle:{"margin-top":"19rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendcode.apply(void 0,arguments)}}},[t._v(t._s(1==t.showText?t.security_code:t.second+"s"))])],1),i("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"46rpx"}},[i("v-uni-view",{staticClass:"font26 padding-left-xs hui"},[t._v("设置密码")])],1),i("v-uni-view",{},[i("v-uni-input",{staticClass:"inp",attrs:{type:"password",placeholder:"请输入密码","placeholder-class":"placesty"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),i("v-uni-view",{staticClass:"flex align-center",staticStyle:{"margin-top":"46rpx"}},[i("v-uni-view",{staticClass:"font26 padding-left-xs hui"},[t._v("邀请码")])],1),i("v-uni-view",{},[i("v-uni-input",{staticClass:"inp",attrs:{type:"text",placeholder:"请输入邀请码","placeholder-class":"placesty"},model:{value:t.qrcode,callback:function(e){t.qrcode=e},expression:"qrcode"}})],1),i("v-uni-view",{staticClass:"flex align-center justify-center font24 margin-top-sm"},[i("v-uni-view",{staticClass:"flex align-center"},[i("v-uni-radio",{staticStyle:{transform:"scale(.5)"},attrs:{checked:t.radio,color:"#3B3F47"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.radio=!t.radio}}}),i("v-uni-view",{staticClass:"col-999",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.radio=!t.radio}}},[t._v("已阅读并同意")]),i("v-uni-view",{staticClass:"text-black",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("../my/agreement?id=2")}}},[t._v("《用户服务协议》")]),t._v("和"),i("v-uni-view",{staticClass:"text-black",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("../my/agreement?id=1")}}},[t._v("《隐私权益》")])],1)],1),i("v-uni-view",{staticStyle:{"margin-top":"60rpx"}},[i("v-uni-view",{staticClass:"submit font30",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("注册")]),i("v-uni-view",{staticClass:"flex-sub text-black",staticStyle:{margin:"30rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.util.urlTo("index")}}},[t._v("登录")])],1)],1)],1),i("tfgg-verify",{attrs:{shows:t.sliderVerifyFLag},on:{result:function(e){arguments[0]=e=t.$handleEvent(e),t.success.apply(void 0,arguments)},change:function(e){arguments[0]=e=t.$handleEvent(e),t.isShowimage.apply(void 0,arguments)}}})],1)},o=[]},c4f5:function(t,e,i){var a=i("713e");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("85b2039c",a,!0,{sourceMap:!1,shadowMode:!1})},e19b:function(t,e,i){"use strict";i.r(e);var a=i("b368"),n=i("1f3f");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("76a0");var s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"3e45fa80",null,!1,a["a"],void 0);e["default"]=r.exports}}]);