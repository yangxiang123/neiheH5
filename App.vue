<script>
	import Vue from 'vue'
	export default {
		globalData: {
			/** 代理客户id */
			agent_id: 1,
			/** http 服务端地址 */
			http_url: 'http://panda_im.xmdzh.top:80',
			/** 静态文件存放地址 */
			static_url: 'http://panda_im.xmdzh.top:80',
			/** socket 服务端地址 */
			socket_url: 'ws://panda_im.xmdzh.top:8383',
			// socket_url: 'wss://xxx.xxx.com/wss',
			/** socket 连接状态 */
			socket_state: 0,
			/** 好友申请通知 */
			new_friend_tips_num: 0,
			/** 群认证通知 */
			new_group_tips_num: 0,
			/** 朋友圈通知 */
			no_reader_circle: 0,
			/** 朋友圈消息未读数 */
			no_reader_circle_chat_num: 0,
			/** 缓存的数据 */
			cache: {
				/** 个人头像缓存数据 */
				local_photo: '',
			},
			/** 用户信息 */
			user_info: {
				id: 0,
				nickname: '',
				username: '',
				photo: 'default_man/70.jpg',
				doodling: '',
				phone: '',
				circle_img: 'default_circle_img.jpg?_=3.1415926',
			},
			isOnlie: true,
			dragInfo: {
				moveX: 260,
				moveY: 180,
				state: -1
			},
			headerTime: null
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.windowHeight = e.windowHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.windowHeight = e.windowHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.windowHeight = e.windowHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/my.css";

	page {
		// background: url('@/static/zhucebg.png') no-repeat;
		// background-size: cover;
		// min-height: 100vh;
	}

	.btn {
		cursor: pointer;
	}


	page {
		max-width: 750px;
		margin: 0 auto;
	}

	@keyframes show_list {
		0% {
			opacity: 0;
			transform: translate3d(0, -50rpx, 0);
		}

		100% {
			opacity: 1;
			transform: translateZ(0);
		}
	}
</style>