var app = getApp();
// var path = "https://h5.cbart.com.cn/api/"
var versions = '1.0.0';
var userInfoAPI = '/api/user/index';
var appType = 1; //1安卓 2ios
// var path = "http://naisi.com/api/"; 
// var game = "https://api.ads66.com";

var game = "http://apitest.aijinyang.cn/";
// var game = "http://h5test.aijinyang.cn/";

// var apis = "http://h5.aijinyang.cn"; http://h5.aijinyang.cn
// var apis = "https://nice.nai365.com"; 
// var path = "http://h5.xmdzh.top/api/";
// var apis = "http://h5.aijinyang.cn";
// var path = "http://h5.aijinyang.cn/api/";
// var chat = 'http://panda_im.xmdzh.top'
// var img = 'http://h5.aijinyang.cn'

var apis = "http://apitest.aijinyang.cn";
var path = "http://apitest.aijinyang.cn/api/";
var chat = 'http://apitest.aijinyang.cn'
var img = 'http://apitest.aijinyang.cn/'

// var apis = "http://h5test.aijinyang.cn";
// var path = "http://h5test.aijinyang.cn/api/";
// var chat = 'http://h5test.aijinyang.cn'
// var img = 'http://h5test.aijinyang.cn/'

module.exports = {
	path: path,
	versions: versions,
	userInfoAPI: userInfoAPI,
	apis: apis,
	img: img,
	game: game,
	appType: appType
}