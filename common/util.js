var app = getApp();
var api = require('./api.js');
import md5 from '@/js_sdk/js-md5/build/md5.min.js';
/**
 * request 普通请求
 */
function request(url, data = {}, method = "POST") {
	let _this = this;
	return new Promise(function(resolve, reject) {
		// uni.setStorageSync('token', '8b0e884f-31a7-4f79-bfb8-cd4df534439c');
		const token = uni.getStorageSync('token');
		const info = uni.getStorageSync('info');
		// data.token = token;
		var one = token.substr(-10)
		var userid = '0'
		if (info) {
			userid = info.user_id.toString()
		}
		var two = md5(userid).substr(-10)
		let sign = md5(one + two)

		// data.token = token;
		uni.request({
			url: api.path + url,
			data: data,
			method: method,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Language': 'zh-cn',
				'token': token,
				'sign': sign
			},
			success(res) {
				// console.log(res.data.code)
				if (res.header.token) {
					uni.setStorageSync('token', res.header.token);
				}
				if (res.data.code == 1) {
					resolve(res.data.data);
				} else if (res.data.code == 401) {
					toLogin();
				} else if (res.data.msg) {
					resolve(res.data.data);
					_this.showToast(res.data.msg);
				}
			},
			fail(err) {
				// reject(err)
				_this.showToast('加载失败');
			}
		})
	});
}

function gamerequest(url, data = {}, method = "get") {
	let _this = this;
	return new Promise(function(resolve, reject) {
		// uni.setStorageSync('token', '8b0e884f-31a7-4f79-bfb8-cd4df534439c');
		const token = uni.getStorageSync('token');

		data.token = token;
		uni.request({
			url: api.apis + url,
			data: data,
			method: method,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Language': 'zh-cn'
			},
			success(res) {
				console.log(res.data.code)
				if (res.data.code == 1) {
					resolve(res.data.data);
				} else if (res.data.code == 401) {
					toLogin();
				} else if (res.data.msg) {
					_this.showToast(res.data.msg);
				}
			},
			fail(err) {
				// reject(err)
				_this.showToast('加载失败');
			}
		})
	});
}

/* 
 预览图片
 e:图片地址 可单张字符串或数组
 index:图片索引
 item:多数据数组情况下传 图片字段名
 */
function lookImg(e, index = 0, item) {
	let url;
	if (Array.isArray(e)) {
		url = e;
	} else {
		url = [e];
	}
	let urls = [];
	if (item) {
		url.map(i => {
			urls.push(i[item]);
		})
		url = urls;
	}
	uni.previewImage({
		urls: url,
		current: index
	})
}

/**
 * 获取用户信息
 */
function getUserInfo() {
	let that = this;
	return new Promise((resolve, reject) => {
		request(
			'user/index', {}, "POST"
		).then(res => {
			// console.log(res)
			resolve(res);
		})
	});
}

/**
 * 跳转到登录页面,并清空缓存
 */
function toLogin(e) {
	uni.hideLoading()
	uni.clearStorage();
	uni.clearStorageSync();
	uni.reLaunch({
		url: "/pages/index/index"
	})
}
/**
 * 对象转url参数
 * @param {Object} obj
 */
function objToUrl(obj) {
	let u = "";
	for (let key in obj) {
		u = u + key + "=" + obj[key] + "&";
	}
	return u.substring(0, u.length - 1);
}
/**
 * 消息提示框
 */
function showToast(msg = '', isback) {
	uni.showToast({
		title: msg,
		duration: 2000,
		icon: 'none'
	});
	if (isback) {
		setTimeout(function() {
			uni.navigateBack()
		}, 1000)
	}
}
/**
 *  弹出提示信息结束后执行方法
 */
function showMsg(msg, duration = 2000, callback) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: duration,
		success: function() {
			setTimeout(callback, duration);
		}
	})
}

function seeimg(list, index) {
	uni.previewImage({
		count: index,
		urls: list
	})
}

function secChange(time) {
	if (time <= 0) {
		return '00:00:00'
	}
	let min;
	let h;
	let s;
	if (time >= 60 && time <= 3600) {
		min = parseInt(time / 60);
		if (min < 10) {
			min = '0' + min;
		}
		s = time % 60;
		if (s < 10) {
			s = '0' + s;
		}
		time = '00' + ':' + min + ":" + s + "";
	} else {
		if (time > 3600) {
			min = parseInt(((time % 3600) / 60));
			if (min < 10) {
				min = '0' + min;
			}
			h = parseInt(time / 3600);
			if (h < 10) {
				h = '0' + h;
			}
			s = time % 60;
			if (s < 10) {
				s = '0' + s;
			}
			time = h + ":" + min + ":" + s + "";
		} else {
			let s = time;
			if (s < 10) {
				s = '0' + s;
			}
			time = '00' + ':' + '00' + ':' + s;
		}
	}
	return time;
}
/**
 *  页面跳转
 */
function urlTo(e) {
	uni.navigateTo({
		url: e
	})
}

/**
 *  页面跳转
 */
function urltabTo(e) {
	uni.switchTab({
		url: e
	})
}

/**
 *  页面返回
 */
function backTo(e, v) {
	uni.navigateBack({
		delta: e,
		duration: v
	})
}

/**
 *手机掩码
 * @param {Object} phone
 */
function phoneMask(phone) {
	return phone.substring(0, 3) + '****' + phone.substring(7);
}
/**
 * 验证手机号
 * @param {Object} phone
 */
function checkPhone(phone) {
	let zz = /^1[3456789]\d{9}$/;
	return zz.test(phone);
}
/**
 * 验证姓名
 * @param {Object} phone
 */
function checkName(name) {
	let zz = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则
	return zz.test(name);
}
/*  
验证日期
*/
function checkDate(date) {
	let shengri_zz = /^\d{4}-\d{2}-\d{2}$/; //日期验证
	return shengri_zz.test(date);
}

/*  
格式化时间戳
*/
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
	// return Y + M + D+ h + m;
}
/* 
 判断是否微信浏览
 */
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
/* 
		验证邮箱
	 */
function checkEmail(value) {
	return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
}
/* 
		身份证验证
	 */
function checkIDCard(idNum) {
	if (!idNum) {
		return false
	}
	// alert(idNum);
	var errors = new Array( // eslint-disable-line
		"alert('验证通过');",
		"alert('身份证号码位数不对');",
		"alert('身份证含有非法字符');",
		"alert('身份证号码校验错误');",
		"alert('身份证地区非法');"
	)
	// 身份号码位数及格式检验
	var re
	var len = idNum.length
	// 身份证位数检验
	if (len != 15 && len != 18) { // eslint-disable-line
		return false
	} else if (len == 15) { // eslint-disable-line
		re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/)
	} else {
		re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/)
	}
	var area = {
		11: '北京',
		12: '天津',
		13: '河北',
		14: '山西',
		15: '内蒙古',
		21: '辽宁',
		22: '吉林',
		23: '黑龙江',
		31: '上海',
		32: '江苏',
		33: '浙江',
		34: '安徽',
		35: '福建',
		36: '江西',
		37: '山东',
		41: '河南',
		42: '湖北',
		43: '湖南',
		44: '广东',
		45: '广西',
		46: '海南',
		50: '重庆',
		51: '四川',
		52: '贵州',
		53: '云南',
		54: '西藏',
		61: '陕西',
		62: '甘肃',
		63: '青海',
		64: '宁夏',
		65: '新疆',
		71: '台湾',
		81: '香港',
		82: '澳门',
		91: '国外'
	}
	var idcard_array = new Array() // eslint-disable-line
	idcard_array = idNum.split('') // eslint-disable-line
	// 地区检验
	if (area[parseInt(idNum.substr(0, 2))] == null) {
		return false
	}
	// 出生日期正确性检验
	var a = idNum.match(re)
	if (a != null) { // eslint-disable-line
		var flag
		var DD
		if (len == 15) { // eslint-disable-line
			DD = new Date('19' + a[3] + '/' + a[4] + '/' + a[5])
			flag = DD.getYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[5] // eslint-disable-line
		} else if (len == 18) { // eslint-disable-line
			DD = new Date(a[3] + '/' + a[4] + '/' + a[5])
			flag = DD.getFullYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[
				5] // eslint-disable-line
		}
		if (!flag) {
			// return false;
			return false
		}
		// 检验校验位
		if (len == 18) { // eslint-disable-line
			var S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
				(parseInt(idcard_array[1]) +
					parseInt(idcard_array[11])) * 9 +
				(parseInt(idcard_array[2]) +
					parseInt(idcard_array[12])) * 10 +
				(parseInt(idcard_array[3]) +
					parseInt(idcard_array[13])) * 5 +
				(parseInt(idcard_array[4]) +
					parseInt(idcard_array[14])) * 8 +
				(parseInt(idcard_array[5]) +
					parseInt(idcard_array[15])) * 4 +
				(parseInt(idcard_array[6]) +
					parseInt(idcard_array[16])) * 2 +
				parseInt(idcard_array[7]) * 1 +
				parseInt(idcard_array[8]) * 6 +
				parseInt(idcard_array[9]) * 3
			var Y = S % 11
			var M = 'F'
			var JYM = '10X98765432'
			M = JYM.substr(Y, 1) // 判断校验位
			// 检测ID的校验位
			if (M == idcard_array[17]) { // eslint-disable-line
				return true
				// return "";
			} else {
				// return false;
				return false
			}
		}
	} else {
		// return false;
		return false
	}
	return true
}
/* 
 检查更新
 */
function getVersion(e) {
	var appversion
	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
		//  获取 app的version
		appversion = wgtinfo.version;

		console.log(appversion, 777777777777)

	});
	let _this = this;
	_this.request('common/version', {
		version: appversion
	}, 'POST').then(res => {
		if (res.android.newversion != appversion) {
			uni.showModal({
				title: '更新提示',
				content: '为了您的正常使用请您更新最新版本',
				showCancel: false,
				confirmText: '立即更新',
				success: function(gdx) {
					if (gdx.confirm) {
						console.log(res.android.downloadurl)
						plus.runtime.openURL(res.android.downloadurl);
					}
				}
			});
		}
	})
}
/* 
 微信,支付宝 app支付调取
 */
function pay(type, data, order_id, deltype) {
	return new Promise(function(resolve, reject) {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				console.log(res)
				// showToast('支付成功');
				resolve();
			},
			fail(err) {
				console.log(err)
				showToast('支付失败');
				request('Order/delOrder', {
					order_id: order_id,
					type: deltype
				}).then(res => {

				})
			}
		})
	});
}
/**
 * 上传文件
 */
function upload(e) {
	let that = this;
	let token = uni.getStorageSync('token');
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: api.path + 'common/upload',
			filePath: e,
			name: 'file',
			formData: {
				token: token
			},
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);
				resolve(data.data);
			},
			fail(err) {
				showToast('图片上传失败');
			}
		});
	});
}
/* 
 微信订阅消息授权
 */
function requestSubscribeMessage() {
	let _this = this;
	request('Common/templateid', {}, 'POST').then(rel => {
		if (rel.length) {
			wx.getSetting({
				withSubscriptions: true,
				success(res) {
					console.log(res)
					let num = 0;
					for (let i = 0; i < rel.length; i++) {
						let id = rel[i];
						if (res.subscriptionsSetting[id] == 'accept') {
							num += 1;
						}
					}
					if (num != rel.length) {
						uni.showModal({
							title: '温馨提示',
							content: '为了更好的促进服务进度，需要您订阅服务通知',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									wx.requestSubscribeMessage({
										tmplIds: rel,
										success(res) {
											// console.log(res)
											// wx.getSetting({
											// 	withSubscriptions: true,
											// 	success(res) {
											// 		console.log(res)
											// 	}
											// })
										},
										fail(gdx) {
											console.log(gdx)
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			})
		}
	})
}
/* 
 微信,支付宝 app支付调取
 */
function appPay(type, data) {
	let payType;
	if (type == 0) {
		payType = 'wxpay';
	} else if (type == 1) {
		payType = 'alipay'
	}
	return new Promise(function(resolve, reject) {
		uni.requestPayment({
			provider: payType,
			orderInfo: data,
			success(res) {
				console.log(res)
				showToast('支付成功');
				resolve();
			},
			fail(err) {
				console.log(err)
				showToast('支付失败');
			}
		})
	});
}
// bgm音乐提示
function voice() {
	const voiceBg = uni.getBackgroundAudioManager();
	request('Common/remind', {}).then(res => {
		voiceBg.src = api.apis + res;
	})
	setInterval(function() {
		// voiceBg.title = '小蜜蜂';
		// voiceBg.play();
		request('Order/getRemind', {}).then(res => {
			console.log(res.status == 1)
			if (res.status == 1) {
				voiceBg.title = '小蜜蜂';
				voiceBg.play();
				request('Order/winRemind', {
					str: res.str
				}).then(gdx => {

				})
			}
		})
	}, 3000)
}

// 拨打电话
function makePhoneCall(e) {
	uni.makePhoneCall({
		phoneNumber: e
	});
}

// 复制到剪切板
function copy(e) {
	uni.setClipboardData({
		data: e,
		success: function() {
			uni.showToast({
				title: '已复制到剪切板'
			})
		}
	});
}
module.exports = {
	request,
	toLogin,
	objToUrl,
	showToast,
	showMsg,
	checkPhone,
	checkName,
	checkDate,
	urlTo,
	backTo,
	urltabTo,
	phoneMask,
	getUserInfo,
	timestampToTime,
	isWeiXin,
	checkEmail,
	checkIDCard,
	getVersion,
	pay,
	appPay,
	upload,
	requestSubscribeMessage,
	voice,
	makePhoneCall,
	seeimg,
	gamerequest,
	api,
	copy,
	secChange
}