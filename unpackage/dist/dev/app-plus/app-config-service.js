
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/home/box_index","pages/home/chicang","pages/home/guanfang","pages/home/choujiang","pages/home/message","pages/home/box_info","pages/index/index","pages/index/reg","pages/market/index_detail","pages/home/info","pages/club/index","pages/club/studio","pages/market/index","pages/market/orderdetail","pages/market/info","pages/market/my_lists","pages/market/my_lists2","pages/market/my_boxlists","pages/market/my_boxlists2","pages/market/pay_order","pages/market/box_info","pages/my/index","pages/my/setting","pages/my/setting2","pages/my/info","pages/my/phone","pages/my/codephone","pages/my/psd","pages/my/psd2","pages/my/blockchain","pages/my/money","pages/my/recharge","pages/my/withdrawal","pages/my/blockchain","pages/my/detailed","pages/my/binding","pages/my/pledge","pages/my/purchase","pages/my/order","pages/my/orderdetailed","pages/my/orderBoxDetail","pages/my/fragment","pages/my/synthesis","pages/my/circulation","pages/my/invitation","pages/my/collection","pages/my/resale","pages/my/conversion","pages/my/attention","pages/my/record","pages/my/service","pages/my/notice","pages/my/synthesizer","pages/my/phoneyz","pages/my/bank_list","pages/my/bind_bank","pages/my/agreement","pages/my/poster","pages/my/openWallet","pages/index/reset","pages/index/shiming","pages/pay/pay","pages/pay/base","pages/home/chou_qian_xiang_qing","pages/home/chouqian","pages/home/laxin","pages/home/xiaofeibang","pages/home/zhuanpan","pages/home/zhuanpan2","pages/my/my_collection","pages/my/order_box","pages/my/my_money","pages/my/rechange2/rechange2"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"selectedColor":"#282828","backgroundColor":"#FFFFFF","color":"#BBBBBB","list":[{"iconPath":"./static/tab1.png","selectedIconPath":"static/tab2.png","text":"首页","pagePath":"pages/home/index"},{"iconPath":"./static/tab3.png","selectedIconPath":"static/tab4.png","text":"寄售","pagePath":"pages/market/index"},{"iconPath":"./static/tab5.png","selectedIconPath":"static/tab6.png","text":"发现","pagePath":"pages/club/index"},{"iconPath":"./static/tab7.png","selectedIconPath":"static/tab8.png","text":"我的","pagePath":"pages/my/index"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"wutuobang","compilerVersion":"3.4.18","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/home/box_index","meta":{},"window":{"navigationBarTitleText":"盲盒","navigationBarBackgroundColor":"white"}},{"path":"/pages/home/chicang","meta":{},"window":{"navigationBarTitleText":"持仓排行榜","navigationBarBackgroundColor":"white"}},{"path":"/pages/home/guanfang","meta":{},"window":{"navigationBarTitleText":"官方社群","navigationBarBackgroundColor":"white"}},{"path":"/pages/home/choujiang","meta":{},"window":{"navigationBarTitleText":"抽奖活动","navigationBarBackgroundColor":"white"}},{"path":"/pages/home/message","meta":{},"window":{"navigationBarTitleText":"系统消息","navigationBarBackgroundColor":"white"}},{"path":"/pages/home/box_info","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/index/reg","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/market/index_detail","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/home/info","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/club/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/club/studio","meta":{},"window":{"navigationBarTitleText":"工作室","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/market/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/market/orderdetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/market/info","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/market/my_lists","meta":{},"window":{"navigationBarTitleText":"我的藏品","navigationBarBackgroundColor":"white"}},{"path":"/pages/market/my_lists2","meta":{},"window":{"navigationBarTitleText":"我的藏品","navigationBarBackgroundColor":"white"}},{"path":"/pages/market/my_boxlists","meta":{},"window":{"navigationBarTitleText":"我的盲盒","navigationBarBackgroundColor":"white"}},{"path":"/pages/market/my_boxlists2","meta":{},"window":{"navigationBarTitleText":"我的盲盒","navigationBarBackgroundColor":"white"}},{"path":"/pages/market/pay_order","meta":{},"window":{"navigationBarTitleText":"支付","navigationBarBackgroundColor":"white"}},{"path":"/pages/market/box_info","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/setting","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/setting2","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/info","meta":{},"window":{"navigationBarTitleText":"账户与安全","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/phone","meta":{},"window":{"navigationBarTitleText":"手机号码","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/codephone","meta":{},"window":{"navigationBarTitleText":"手机号码","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/psd","meta":{},"window":{"navigationBarTitleText":"操作密码","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/psd2","meta":{},"window":{"navigationBarTitleText":"操作密码","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/blockchain","meta":{},"window":{"navigationBarTitleText":"区块链","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/money","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/recharge","meta":{},"window":{"navigationBarTitleText":"充值","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/detailed","meta":{},"window":{"navigationBarTitleText":"余额明细","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/binding","meta":{},"window":{"navigationBarTitleText":"绑定银行卡","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/pledge","meta":{},"window":{"navigationBarTitleText":"质押","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/purchase","meta":{},"window":{"navigationBarTitleText":"申购","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/order","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/orderdetailed","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/my/orderBoxDetail","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/my/fragment","meta":{},"window":{"navigationBarTitleText":"碎片","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/synthesis","meta":{},"window":{"navigationBarTitleText":"藏品合成"}},{"path":"/pages/my/circulation","meta":{},"window":{"navigationBarTitleText":"流转记录","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/my/invitation","meta":{},"window":{"navigationBarTitleText":"邀请记录","enablePullDownRefresh":true}},{"path":"/pages/my/collection","meta":{},"window":{"navigationBarTitleText":"我的藏品","enablePullDownRefresh":true}},{"path":"/pages/my/resale","meta":{},"window":{"navigationBarTitleText":"藏品转售","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/conversion","meta":{},"window":{"navigationBarTitleText":"藏品转赠","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/attention","meta":{},"window":{"navigationBarTitleText":"我的关注","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/my/record","meta":{},"window":{"navigationBarTitleText":"回收记录","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/my/service","meta":{},"window":{"navigationBarTitleText":"平台客服","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/notice","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/my/synthesizer","meta":{},"window":{"navigationBarTitleText":"合成","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/phoneyz","meta":{},"window":{"navigationBarTitleText":"验证码","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/bank_list","meta":{},"window":{"navigationBarTitleText":"银行卡列表","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/bind_bank","meta":{},"window":{"navigationBarTitleText":"绑定银行卡","navigationBarBackgroundColor":"white"}},{"path":"/pages/my/agreement","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/poster","meta":{},"window":{"navigationBarTitleText":"邀请好友","transparentTitle":"auto"}},{"path":"/pages/my/openWallet","meta":{},"window":{"navigationBarTitleText":"开通钱包","enablePullDownRefresh":true}},{"path":"/pages/index/reset","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/index/shiming","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"white"}},{"path":"/pages/pay/pay","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/pay/base","meta":{},"window":{"navigationBarTitleText":"支付","navigationBarBackgroundColor":"white","enablePullDownRefresh":true}},{"path":"/pages/home/chou_qian_xiang_qing","meta":{},"window":{"navigationBarTitleText":"抽奖详情","enablePullDownRefresh":false}},{"path":"/pages/home/chouqian","meta":{},"window":{"navigationBarTitleText":"抽签","enablePullDownRefresh":false}},{"path":"/pages/home/laxin","meta":{},"window":{"navigationBarTitleText":"拉新","enablePullDownRefresh":false}},{"path":"/pages/home/xiaofeibang","meta":{},"window":{"navigationBarTitleText":"消费榜","enablePullDownRefresh":false}},{"path":"/pages/home/zhuanpan","meta":{},"window":{"navigationBarTitleText":"转盘","enablePullDownRefresh":false}},{"path":"/pages/home/zhuanpan2","meta":{},"window":{"navigationBarTitleText":"大转盘","enablePullDownRefresh":false}},{"path":"/pages/my/my_collection","meta":{},"window":{"navigationBarTitleText":"我的藏品","enablePullDownRefresh":false}},{"path":"/pages/my/order_box","meta":{},"window":{"navigationBarTitleText":"我的盲盒订单","enablePullDownRefresh":false}},{"path":"/pages/my/my_money","meta":{},"window":{"navigationBarTitleText":"我的钱包","enablePullDownRefresh":false}},{"path":"/pages/my/rechange2/rechange2","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
