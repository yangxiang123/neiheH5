<template>
	<view class="page_wrap">
		<!-- <uni-search-bar ref="searchBar" placeholder="搜索聊天记录" :show="false" @confirm="search" @search="search">
		</uni-search-bar> -->
		<u-navbar :is-back="false" title="聊天">
			<view class="u-slot-right">
				<view class="set" @click="addShow = !addShow">
					<u-icon name="plus-circle" color="#444" size="48"></u-icon>
				</view>
				
				<view class="join_box" v-show="addShow" >
					<view class="join_iten" @click="goAction(1)">
						<u-icon name="account" size="40"></u-icon>
						<text>添加好友</text>
					</view>
					<view class="join_iten" @click="goAction(0)">
						<u-icon name="account" size="40"></u-icon>
						<text>加入群聊</text>
					</view>
				
				</view>
			</view>
		</u-navbar>
		<u-sticky h5-nav-height="0">
			<!-- 只能有一个根元素 -->
			<view class="sticky_wrap">
				<view class="header_wrap">
					<view class="header_tabs">
						<u-tabs :list="tabsList" :is-scroll="false" :current="tabscurrent" @change="tabschange"></u-tabs>
					</view>
				</view>
				
			</view>
		</u-sticky>
		<view class="" v-if='tabscurrent == 0'>
			<view class="cell" v-for="(value,key) of list" @click="goMessage(value.list_id,key,value.no_reader_num,value.chat_id)">
				<!-- <image class="userImg" :src="item.photo_path" mode=""></image> -->
				<u-avatar :src="value.photo_path" mode="circle"></u-avatar>
				<view class="msg_text">
					<text>{{value.show_name}}</text>
					<text class="last_msg text-1">{{value.last_msg}}</text>
				</view>
			</view>
		</view>
		<view class="" v-if='tabscurrent == 1'>
			<view class="cell" @click="goPath('/pages/details/apply-list',0)">
				<u-icon  size="32" name="arrow-right" v-if="true"></u-icon>
				<u-icon size="32" name="arrow-down" v-else></u-icon>
				<text >新的朋友</text>
			</view>
			<!-- <view class="cell">
				<u-icon  size="32" name="arrow-right" v-if="true"></u-icon>
				<u-icon size="32" name="arrow-down" v-else></u-icon>
				<text >群聊通知</text>
			</view> -->
			<!-- 我的群聊 -->
			<!-- <view class="cell showMyChatGroup_box" @click='showMyChatGroupList = !showMyChatGroupList'>
				<view class="">
					<u-icon  size="32" name="arrow-right" v-if="!showMyChatGroupList"></u-icon>
					<u-icon  size="32" name="arrow-down" v-else></u-icon>
					<text >我的群聊</text>
				</view>
				<view class="input_wrap">
					<u-icon name='search'></u-icon>
					<u-input  v-model="value" type="text"  :height='inputHeiht' placeholder='搜索群'/>
				</view>
			</view>
			<view class="" v-show="showMyChatGroupList">
				<view class="cell" v-for="item of 20">
					<image class="userImg" src="../../static/icon1.png" mode=""></image>
					<text>用户名</text>
				</view>
				<view class="cell">
					<image class="userImg" src="../../static/icon1.png" mode=""></image>
					<text>用户名</text>
				</view>
				<view class="cell">
					<image class="userImg" src="../../static/icon1.png" mode=""></image>
					<text>用户名</text>
				</view>
			</view> -->
			<!-- 我的好友 -->
			<view class="cell" @click='showMyChatFriendList = !showMyChatFriendList'>
				<u-icon  size="32" name="arrow-right" v-if="!showMyChatFriendList"></u-icon>
				<u-icon  size="32" name="arrow-down" v-else></u-icon>
				<text >我的好友</text>
			</view>
			<view class=""  v-if="showMyChatFriendList">
				<block v-for="(list, key) in list_data"
				       :key="key">
				  <view class="uni-list-cell-divider"
				        :id="list.letter">
				    {{list.letter}}
				  </view>
				  <view class="uni-list-cell"
				        hover-class="none"
				        :class="list.data.length -1 == index ? 'uni-list-cell-last' : ''"
				        v-for="(item,index) in list.data"
				        :key="isKey(key,index)">
				    <uni-swipe-action :options="[ {text: '备注'} ]"
				                      @tap="swipeAction(item.user_id + '')">
				      <view class="uni-media-list"
				            @tap="goDetails(item.user_id + '')">
				        <view class="uni-media-list-logo">
				          <image :src="photo(item.photo+'')"
				                 :lazy-load="true"
				                 style="border-radius: 10px;" />
				        </view>
				        <view class="uni-media-list-body">
				          <view class="uni-list-cell-navigate">{{item.name}}</view>
				        </view>
				      </view>
				    </uni-swipe-action>
				  </view>
				</block>
				
			</view>
		</view>
		<!-- <view class="list" :style="{'hieght':`${listHeigh}`+'rpx'}">
			<swiper scroll-x="false" class="swiper" :style='{"height": `${listHeigh}rpx`}' @change='swiperChange' :current="swiperCurrent"
				>
				<swiper-item>
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						 @scroll="scroll">
						
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
							
						
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view> -->
	</view>
</template>

<script>
	import animate from '../../static/css/chat/animate.css';
	// import uniIcon from '../../components/uni-icons/uni-icons.vue';
	// import uniBadge from '../../components/uni-badge/uni-badge.vue';
	import uniSwipeAction from '@/components/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import _get from '../../common/_get';
	import _hook from '../../common/_hook';
	import _action from '../../common/_action';
	import _data from '../../common/_data';
	import _page from '../../common/common';
	// import uniSearchBar from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			// uniIcon,
			// uniBadge,
			uniSwipeAction,
			uniSwipeActionItem,
			// uniSearchBar
		},
		data() {
			return {
				list: [],
				search_list: [],
				list_index: '',
				action_menu: false,
				action_menu_num: 0,
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				tabsList: [{
					name: '消息'
				}, {
					name: '通讯录'
				}],
				tabscurrent: 0,
				swiperCurrent:0,
				listHeigh:0,
				addShow:false,
				showMyChatFriendList:false,
				
				
				// 通信录
				list_data: [],
				new_friend_tips: 0,
				new_group_tips: 0,
				title: 'grid',
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: "A",
				titleHeight: 0,
				search_list: [],
				keyword: '',
				key_data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
			}
		},
		onShow() {
			// _hook.routeTabBarHook();
			uni.$off('data_chat_list');
			let _this = this,
				chat_list = _data.localData('chat_list');
			

			/** 监听最新数据 */
			uni.$on('data_chat_list', function(data) {
				_this.list = data;
				// _this.search_list = _this.list;
				console.log("this.list1: ",_this.list);
				console.log("接收到新数据....");
			});
			//有缓存则监听是否有数据更新，有则重新获取
			// uni.$once('update_chat_list', function () {
			//   _get.getChatList();
			// })
			/** 加载本地缓存数据，让页面秒速渲染出来 */
			if (chat_list) {
				_this.list = chat_list;
				console.log("_this.list2: ",_this.list);
			} else {
				_get.getChatList();
			}
			
			
			// 通信录
			
			let  frien_list = _data.localData('frien_list'),
			  tips_num = _data.data('new_friend_tips_num'),
			  tips_group_apply = _data.data('new_group_tips_num');
			
			/** 监听最新数据 */
			uni.$on('data_friend_list', function (data) {
			  _this.list_data = data;
			  _this.search_list = data;
			});
			/** 监听新的朋友提示 */
			uni.$on('data_new_friend_tips', function (data) {
			  _this.new_friend_tips = data;
			  console.log(_this.new_friend_tips);
			});
			/** 监听群认证消息 */
			uni.$on('data_new_group_apply_tips', function (data) {
			  _this.new_group_tips = data;
			});
			
			_this.new_friend_tips = tips_num;
			_this.new_group_tips = tips_group_apply;
			
			/** 加载本地缓存数据，让页面秒速渲染出来 */
			if (frien_list) {
			  _this.list_data = frien_list;
			} else {
			  _get.getFriendList();
			}
		},
		onLoad() {
			this.setListHeight()
			console.log("this.list: ",this.list);
		},
		onUnload() {
			uni.$off('data_chat_list');
		},
		onPullDownRefresh() {
			_get.getChatList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 300);
		},
		onHide() {
			//清空search框
			if (this.keyword) {
				this.$refs.searchBar.clear();
				this.list = this.search_list;
			}
		},

		computed: {
			showActionMenu() {
				return this.action_menu;
			},
			staticPhoto() {
				return _data.staticPhoto();
			},
			imgRan() {
				return Math.random();
			},
		},
		methods: {
			setListHeight(){
				let systemHeight = uni.getSystemInfoSync().windowHeight,
					query = uni.createSelectorQuery(),
					that = this
					query.select('.header_wrap').boundingClientRect()
					query.exec(data=>{
						that.listHeigh = (systemHeight - data[0].height) * 2
						console.log(that.listHeigh);
					})
			},
			swiperChange(e){
				this.current = e.detail.current
				// console.log(e);
			},
			tabschange(index) {
				this.tabscurrent = index;
				this.swiperCurrent = index
			},
			search(chat_msg) {
				chat_msg = chat_msg.trim();
				let _this = this;
				_this.keyword = chat_msg;
				console.log(!chat_msg)
				if (!chat_msg) {
					_this.list = _this.search_list;
					return true;
				}
				_get.serchChatMsg({
					'chat_msg': chat_msg
				}, function(data) {
					_this.list = data;
				})
			},
			goPath(path) {
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},
			imageError(e) {
				let index = e.currentTarget.dataset.index
				//替换index对应的图片
				this.list[index].photo_path = '/default_photo_path.png';
			},
			msgHandle(msg, num) {
				if (num == undefined) num = 16;
				if (!msg) return '';
				msg = msg.replace(/&lt;/g, '<');
				return msg.length > num ? msg.substr(0, num) + '...' : msg;
			},
			timestampFormat(time) {
				return _action.timestampFormat(time);
			},
			goAction(type) {
				let path = '';
				switch (type) {
					case 0:
						path = '/pages/information/index_list?list_id=0';
						break;
					case 1:
						path = '/pages/information/addFriends';
						break;
					case 2:
						path = '../my/store';
						break;
					default:
						return;
						break;
				}
				uni.navigateTo({
					url: path,
					animationType: 'slide-in-bottom',
				});
			},
			actionMain() {
				this.action_menu = !this.action_menu;
				this.action_menu_num++;
			},
			openedAction(key) {
				this.list_index = key;
			},
			swipeAction(e) {
				let list_index = e.content.number
				let _this = this,
					list_id = _this.list[list_index].list_id;
				if (!list_id) {
					return;
				}
				let top = _this.list[list_index].top;
				console.log("top", top)
				let value = top == 1 ? 0 : 1;
				console.log("value", value)
				switch (e.index) {
					case 0:
						//置顶 /取消置顶
						_this.$httpSend({
							path: '/im/message/chatTop ',
							data: {
								list_id: list_id,
								value: value
							},
							success: () => {
								_get.getChatList();
							}
						});
						break;
					case 1:
						/** 删除这条对话 */
						_this.$httpSend({
							path: '/im/chat/deleteChat',
							data: {
								list_id,
							},
							success: (data) => {
								_get.getChatList();
							}
						});
						break;
					default:
						break;
				}
			},
			swipeData(value, index) {
				return [{
						text: value.top == 1 ? '取消置顶' : '置顶',
						number: index,
						style: {

						},
					},
					{
						text: '删除',
						number: index,
						style: {
							backgroundColor: 'rgb(255,58,49)',
						}
					}
				];
			},
			goMessage(list_id, key, no_reader_num, chat_id) {
				if (no_reader_num > 0) {
					_get.getChatData({
						send_data: {
							list_id: list_id,
							time: 0,
							is_up: 1,
						},
						is_action_data: 1,
					});
					this.list[key].no_reader_num = 0;
					_data.localData('chat_list', this.list);
					_action.updataNoReader(list_id);
					_action.setStatusTips();
				}
				console.log("chat_id", chat_id);
				_data.localData('message_list_id', list_id);
				// './message?list_id=' + list_id + "&chat_id="+chat_id,
				uni.navigateTo({
					url: './message?list_id=' + list_id
				});
			},
			goScanCode() {
				let _this = this;
				_this.action_menu = false;
				_page.scanCode();
			},
		},
		watch: {

		},
		onNavigationBarButtonTap(e) {
			this.action_menu = !this.action_menu;
		},
	}
</script>

<style lang="scss">
	/* @import '@/static/css/uni.css' */
	/* @import '@/static/css/chat/style.css' */
	.uni-list-cell {
		overflow: hidden;
	}

	.uni-media-list-logo {
		height: 100upx;
		width: 100upx;
	}

	.search .content {
		padding-left: 20upx;
		height: 60upx;
	}

	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}

	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 5px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

	.red_num {
		position: absolute;
		height: 34upx;
		top: 7upx;
		left: 120upx;
		font-size: 23upx !important;
	}

	/**
	.uni-media-list-body {
		height: auto;
	}
	*/

	.uni-swipe-action,
	.uni-swipe,
	.uni-view,
	.uni-media-list {
		width: 750upx !important;
	}

	.action_main {
		position: fixed;
		top: 55px;
		/* #ifndef H5 */
		top: 15px;
		/* #endif */
		width: 750upx;
		height: 1080upx;
		z-index: 10000;
	}

	.action_base {
		position: absolute;
		right: 15upx;
		width: 300upx;
		top: -15upx;
		background: #36363d;
		border-radius: 10upx;
	}

	.sj {
		position: fixed;
		top: -28upx;
		right: 26upx;

		/* #ifdef APP-PLUS */
		top: 3upx;
		right: 20upx;
		/* #endif */

		width: 0;
		height: 0;
		border-left: 20upx solid transparent;
		border-right: 20upx solid transparent;
		border-bottom: 20upx solid #36363d;
	}

	.action_item {
		color: #e5e5e5;
		height: 100upx;
		line-height: 100upx;
		margin-left: 45upx;
		border-bottom: 1px solid #3e3e3e;
	}

	.action_icon {
		width: 45upx;
		height: 45upx;
		display: inline-block;
		vertical-align: middle;
	}

	.action_item:last-child {
		border: none;
	}

	.action_item_text {
		font-size: 30upx;
	}
	
	/*  */
	.list_wrap{
			display: flex;
			flex-direction: column;
			.u-input{
				width: 100rpx !important;
			}
		}
		.list{
			flex: 1;
			// transform: translateY(100rpx);
		}
		.swiper{
			// flex:1;
			// height: 83vh !important;
			
		}
		.u-cell-item-box{
			// height: 100vh !important;
			overflow-y:auto;
		}
		.swiper-item_wrp{
			overflow-y:auto;
		}
		.userImg{
			width: 50rpx;
			height: 50rpx;
		}
		.join_box{
	
			width: 240rpx;
			height: 150rpx;
			display: flex;
			
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			position: absolute;
			z-index: 999;
			top: 80rpx;
			background-color: #fff;
			right: 20rpx;
			box-shadow: 0 0 10rpx rgb(92, 91, 84);
			border-radius: 20rpx;
			.join_iten:nth-child(1){
				border-bottom: 1rpx solid #c8c9cc;
			}
			.join_iten{
				width: 100%;
				line-height: 75rpx;
				text-align: center;
				
			}
		}
		.cell{
			width: 100vw;
			// height: 100rpx;
			border-bottom: 1rpx solid rgba(75, 75, 75, 0.2);
			display: flex;
			align-items: center;
			padding: 20rpx 50rpx;
			.userImg{
				width: 70rpx;
				height: 70rpx;
				margin-right: 30rpx;
			}
			.msg_text{
				height: 80rpx;
				margin-left: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				text:nth-child(1){
					font-size: 34rpx;
				}
				text:nth-child(2){
					font-size: 20rpx;
					color: #909399;
				}
			}
			
		}
		.showMyChatGroup_box{
			display: flex;
			justify-content: space-between;
			
		}
		.set {
			position: absolute;
			right: 30rpx;
			top: 20rpx;
		}
		.last_msg{
			width: 500rpx;
			
		}
</style>
