<template>
	<view class="page" v-if="list != ''">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{index==0?'藏品列表':'盲盒列表'}}</block>
		</cu-custom>

		<view class="top_bg" v-if="list != ''">
			<image :src="list[0].goods.goods_image" mode="aspectFill" v-if="index== 0 && list[0].goods"></image>
			<image :src="list[0].box.box_image" mode="aspectFill" v-else></image>
			<view class="right_nav" v-show='list[0].goods.news_id' @click='util.urlTo(`/pages/my/notice?id=${list[0].goods.news_id}`)'>
				相关公告
				<u-icon name='arrow-right' size='20' color='#c8c9cc'></u-icon>
			</view>
		</view>
		<view class="name_box">
			<view class="name_bot" v-if="index== 0 && list != '' && list[0].goods">
				<view class="title">{{list[0].goods.goods_name}}</view>
				<view class="bot">
					<view class="flex align-center" style="font-size: 20rpx;margin-top: 10rpx;">
						<view class="left flex justify-center align-center">
							限量
						</view>
						<view class="right flex justify-center align-center  ">
							{{list[0].goods.limit_number}}
						</view>
					</view>

					<!-- <view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
						<view class="left flex justify-center align-center">
							流通
						</view>
						<view class="right flex justify-center align-center  ">
							{{list[0].goods.limit_number}}
						</view>
					</view> -->
					<view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
						<view class="left flex justify-center align-center">
							持有量
						</view>
						<view class="right flex justify-center align-center  ">
							{{list[0].goods.hold_number}}
						</view>
					</view>
				</view>
			</view>
			<view class="name_bot" v-if="index== 1 && list != '' && list[0].box">
				<view class="title">{{list[0].box.box_name}}</view>
				<view class="bot">
					<view class="flex align-center" style="font-size: 20rpx;margin-top: 10rpx;">
						<view class="left flex justify-center align-center">
							限量
						</view>
						<view class="right flex justify-center align-center  ">
							{{list[0].box.limit_number}}
						</view>
					</view>
					<view class="flex align-center u-m-l-50" style="font-size: 20rpx;margin-top: 10rpx;">
						<view class="left flex justify-center align-center">
							流通
						</view>
						<view class="right flex justify-center align-center  ">
							{{list[0].box.limit_number}}
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="box">
			<view class="top">
				<view class="" v-for="(item,index) in navTab" :key="index" :class="active==index?'hei':'hui'"
					@click="active = index;change(index)">{{item.name}}
					<view class="line" v-if="active == index"></view>
				</view>
			</view>
		</view>
		<view class="content2" v-if="active==2 && list2 != ''">


			<view class="content1">
				<view class="lists2" v-for="(item,indexs) in list2" :key="indexs">
					<view class="u-flex u-row-between">
						<view class="" v-if="index== 0 && list[0].goods">{{list[0].goods.goods_name}}
							#{{item.goods_code}}</view>

						<view class="" v-if="index== 1 && list[0].goods">{{list[0].box.box_name}} #{{item.goods_code}}
						</view>
						<view class="">￥{{item.turn_price}}</view>
					</view>
					<view class="u-flex u-row-between u-margin-top-20">
						<!-- 	<view class="">接收者: {{substr(item.user.nickname)}} </view> -->

						<view class="">{{item.turn_finish_time}}</view>
					</view>
				</view>
			</view>
		</view>

		<view style="margin-top:-10rpx;padding:0 20rpx;" v-if="active!=2">
			<view class="padding scroo-box" v-if="index == 0">
				<view class="lists" @click="util.urlTo('info?type=2&id='+item.id)" style="position: relative;"
					v-for="(item,index) in list" :key="index">
					<view class="lists_goods">
						<view class="top">
							<view class="lists_left">
								<view class="left_left">
									<view class="name text-1">{{item.goods.goods_name}}</view>
									
									<view class="code">#{{item.code}}<text class="hou">/{{item.goods.limit_number}}</text>
									</view>
								</view>	
							</view>
							<view class="lists_right">
								<view class="lists_right_left">
									<view class="lists_right_left_top">
										<view class="pay_status" v-if="item.order_info">锁定中</view>
										<view class="pay_status2" v-else>寄售</view>
										<view class="price">￥{{item.goods_price}}</view>
									</view>
								</view>
								
								<view class="lists_right_right">
									<image src="/static/new/right.png" mode=""></image>
								</view>
							</view>
						</view>
						<view class="down" v-show="item.blockurl">
							链上标识：{{item.blockurl}}
						</view>
					</view>
				</view>
			</view>
			<view class="scroo-box" v-else>
				<view class=" lists" @click="util.urlTo('box_info?type=2&id='+item.id)" style="position: relative;"
					v-for="(item,index) in list" :key="index">
					<view class="bg-white radius20 margin-bottom-sm lists"
						@click="util.urlTo('box_info?type=2&id='+item.id)" style="position: relative;"
						v-for="(item,index) in list" :key="index">
						<view class="lists_left">
							<view class="left_left">
								<view class="name">{{item.box.box_name}}</view>
								<view class="code">#{{item.code}}<text class="hou">/{{item.box.limit_number}}</text>
								</view>
							</view>
							<view class="pay_status" v-if="item.order_info">锁定中</view>
							<view class="pay_status2" v-else>寄售</view>
						</view>
						<view class="lists_right">
							<view class="right_left">
								<view class="price">￥{{item.box_price}}</view>
								<!-- <view class="time">发布时间{{item.box.publish_time_text.slice(0,11)}}</view> -->
							</view>
							<image src="/static/new/right.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bsnImg">
			<image src="../../static/BSN_bgImg.png" mode=""></image>
		</view>
		<view class="submit font30" @click="bulkOrder">
			批量下单
		</view>
		<u-modal mask-close-able v-model="show" title='选择下单数量' @confirm='bulkOrder2' show-cancel-button>
			<view class="slot-content number_box" style="height: 200rpx;">
				<u-number-box input-width='200' :size="30" input-height="70" :min='min' :max='maxNum' v-model="value"
					@change="valChange"></u-number-box>
			</view>
		</u-modal>
	</view>
</template>

<script>
	
	import data from './data.js'; //筛选菜单数据
	export default {
		data() {
			return {

				page: 1,
				type: 2,
				list: [],
				classlist: ['藏品', '盲盒'],
				classion: '',
				keyword: '',
				index: 0,
				navTab: [{
						name: '按价格排序'
					},
					{
						name: '按时间排序'
					},
					{
						name: '寄售记录'
					}
				],

				active: 0,
				filterData: [],
				defaultSelected: [],
				goods_id: '',
				modal: false,
				classionIndex: -1,
				goodsTagIndex: -1,
				goodsTag: '',
				boxHeight: '',
				title_one: '',
				last_page: 1,
				list2: [],
				is_next: true,
				show: false,
				value: 1,
				min: 1,
				maxNum: null,

			}

		},
		watch: {
			show(val, oldVal) {
				if (!val) {
					this.value = 1
				}
			}
		},
		onShow(e) {

			this.filterData = data;

			this.page = 1;
			this.list = [];
			// console.log(getApp().globalData.paramsData)
			this.getclass();
			this.getlist()

		},
		onLoad(e) {
			this.index = e.type
			this.goods_id = e.id

			// console.log(e)
		},
		onReady() {
			this.box();
		},
		onReachBottom() {
			if (this.active != 2) {
				if (this.is_next) {
					this.getlist('up')
				}

			}else{
				if (this.is_next) {
					this.getzuijin('up')
				}
			}
		},
		methods: {
			bulkOrder() {
				this.show = true
			},
			bulkOrder2() {
				if (this.value > 0) {
					this.util.request('order/advance_orders', {
						id: this.goods_id,
						number: this.value
					}, 'POST').then(res => {
						let data = JSON.stringify(res)
						let url = '/pages/my/order?type=0'
						this.util.urlTo(url);
						// this.util.urlTo('orderdetail?id=' + data);
						// this.getlist();
					})

				}
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			substr(str) {
				let add = str.slice(str.length - 2, str.length)

				let newstr = '****' + add
				return newstr
			},
			getzuijin(e) {
				
				if (e == 'up') {
					this.page++;
				}
				this.util.request('goods/latest_sale', {
					goods: this.goods_id,
					page: this.page,
					per: 10
				}, 'POST').then(res => {
					
					this.last_page = res.last_page
					this.list2 = [...this.list2,...res.data]
					if (res.last_page== res.current_page) {
						this.is_next = false
					}
					// this.getlist();
				})
			},
			showtost() {
				uni.showToast({
					icon: 'none',
					title: '该通道暂未开启',
				});
			},
			todeil() {
				uni.navigateTo({
					url: '/pages/my/order'
				})
			},
			box() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#box').boundingClientRect(data => {
					// this.boxHeight = this.windowHeight - data.top - 50;
				}).exec();
			},
			confirm(e) {},
			bindPickerChange(e) {
				this.page = 1;
				this.list = [];
				this.classionIndex = -1;
				this.goodsTagIndex = -1;
				this.index = e;
				this.getlist();
			},
			async getclass() {
				this.util.request('goods/classion', {}, 'POST').then(res => {
					this.classion = res;

					// this.getlist();
				})
			},
			getgoodsTag() {
				if (this.index == 0) {
					this.util.request('goods/class_goods', {
						class: this.classion[this.classionIndex].id
					}).then(res => {
						this.goodsTag = res;
					})
				} else {
					// this.goods_id=this.classion[this.classionIndex].id;
					// this.modal=false;
					// this.getList(1);
					this.util.request('goods/class_box', {
						class: this.classion[this.classionIndex].id
					}).then(res => {
						this.goodsTag = res;
					})
				}
			},
			change(e) {
				this.is_next = true
				if (e == 0) {
					this.type = 2;
					this.page = 1;
					this.list = [];
					this.getlist();
				} else if (e == 1) {
					this.type = 1;
					this.page = 1;
					this.list = [];
					this.getlist();
				} else if (e == 2) {
					this.page = 1;
					this.list2 = []
					this.getzuijin()
				}

			},
			getlist(e) {
				if (e == 'search') {
					this.page = 1;
					this.list = [];
				}
				if (e == 'up') {
					this.page++;
				}
				if (this.index == 0) {
					this.util.request('goods/bazaar_goods', {
						goods_id: this.goods_id,
						sort: this.type,
						keyword: this.keyword,
						page: this.page,
						is_list: 1
					}).then(res => {
						this.list = this.list.concat(res.data);
						this.title_one = this.list[0].goods.goods_name;
						let buy_limit_num = Number(this.list[0].goods.limit_number);
						if (buy_limit_num) {
							// 如果设置了最大购买限制
							this.maxNum = buy_limit_num > res.total ? res.total : buy_limit_num;
						} else {
							this.maxNum = res.total;
						}
						if (res.last_page== res.current_page) {
							this.is_next = false
						}
					})
				} else {
					this.util.request('goods/bazaar_box', {
						box_id: this.goods_id,
						sort: this.type,
						keyword: this.keyword,
						page: this.page,
						is_list: 1
					}).then(res => {
						this.list = this.list.concat(res.data);
						this.totalMax = res.total
						this.title_one = this.list[0].box.box_name
						if (res.last_page== res.current_page) {
							this.is_next = false
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.page{
		padding-bottom: 30rpx;
	}
	.bulkOrder {
		width: 284rpx;
		height: 72rpx;
		background: linear-gradient(270deg, #49D8B5 0%, #49D3D8 100%);
		border-radius: 42rpx 42rpx 42rpx 42rpx;
		opacity: 1;

		position: fixed;
		bottom: 40rpx;
		right: 40rpx;

		text {
			display: block;
			color: #fff;
			line-height: 72rpx;
			text-align: center;
			font-size: 34rpx;
		}
	}

	.bulkOrder2 {
		position: relative;

		text {
			position: absolute;
			left: 0rpx;
			border-radius: 42rpx 42rpx 42rpx 42rpx;
			background: linear-gradient(270deg, #49D8B5 0%, #49D3D8 100%);
			width: 180rpx;
			height: 50rpx;
			display: block;
			color: #fff;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
		}
	}

	.top_bg {
		position: relative;
		image {
			width: 100%;
			height: 400rpx;
		}
		.right_nav{
			position: absolute;
			top: 30%;
			color: #fff;
			right: 0%;
			background-color: #f29100;
			padding: 4rpx 8rpx 4rpx 30rpx;
			border-radius: 20rpx 0 0 20rpx;
		}
	}

	.content2 {

		padding: 30rpx;
		padding-top: 0;
	}

	.content1 {
		background-color: #fff;
		padding: 24rpx 30rpx;
		border: 1rpx solid #dbdbdb;
		border-radius: 36rpx;

		.lists2 {
			padding: 26rpx 0;
			border-bottom: 1rpx solid #dbdbdb;
			color: #000;

			:last-child {
				border-bottom: 0rpx solid #dbdbdb;
			}

		}
	}

	.name_box {
		position: relative;
		bottom: 88rpx;
		padding: 0 30rpx;

		.left {
			display: inline-block;
			margin-top: 23rpx;
			padding: 0 8rpx;
			height: 36rpx;
			font-style: normal;
			font-weight: 700;
			font-size: 24rpx;
			line-height: 36rpx;
			color: #441c02;
			background: linear-gradient(23.86deg, #ffccb8 -15.3%, #ffc582 96.5%);
		}

		.right {
			display: inline-block;
			margin-top: 23rpx;
			padding: 0 8rpx;
			height: 36rpx;
			font-style: normal;
			font-weight: 700;
			font-size: 24rpx;
			line-height: 36rpx;
			color: #b47528;
			background: rgba(240, 213, 182, .24);
		}

		.name_bot {
			padding: 30rpx;
			border-radius: 30rpx;
			background-color: #fff;
			border: 1rpx solid #CCC;
		}

		.title {
			font-size: 40rpx;
			font-family: PingFang SC-中粗体, PingFang SC;
			font-weight: bold;
			color: #444444;
		}

		.bot {

			font-size: 24rpx;
			font-family: PingFang SC-常规体, PingFang SC;
			font-weight: normal;
			color: #9F9F9F;
			display: flex;
			align-items: center;

			.bot_right {
				margin-left: 60rpx;
			}
		}
	}

	.scroo-box {
		background-color: #fff;
		padding: 24rpx 30rpx;
		border: 1rpx solid #dbdbdb;
		border-radius: 36rpx;
		padding-bottom: 0;
	}

	.lists {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 26rpx 0;
		border-bottom: 1rpx solid #dbdbdb;

		:last-child {
			border-bottom: 0rpx solid #dbdbdb;
		}

		.lists_goods{
			display: flex;
			flex-direction: column;
			.top{
				display: flex;
			}
			.down{
				// white-space: nowrap;
			}
		}
		.lists_right {
			display: flex;
			
			align-items: center;
			
			.price {
				font-weight: 700;
				font-size: 40rpx;
				line-height: 40rpx;
				color: #000;
				text-align: right;
			}

			.time {
				margin-top: 15rpx;
				font-style: normal;
				font-weight: 400;
				font-size: 20rpx;
				line-height: 24rpx;
				text-align: right;
				color: rgba(0, 0, 0, .4);
			}

			image {
				width: 22rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}
			.lists_right_left{
				display: flex;
				flex-direction: column;
				justify-content: center;
				.lists_right_left_top{
					display: flex;
					justify-content: space-between;
					.pay_status {
						// margin-left: 20rpx;
						color: rgba(0, 0, 0, .6);
						background: #e7e7e7;
						padding: 8rpx 12rpx;
						font-style: normal;
						font-weight: 500;
						font-size: 20rpx;
						line-height: 20rpx;
						letter-spacing: 1rpx;
						border-radius: 8rpx;
					}
		
					.pay_status2 {
						margin-left: 20rpx;
						color: #33b56e;
						background: #e1ffda;
						padding: 8rpx 12rpx;
						font-style: normal;
						font-weight: 500;
						font-size: 20rpx;
						line-height: 20rpx;
						letter-spacing: 1rpx;
						border-radius: 8rpx;
					}
					.price{
						margin-left: 40rpx;
					}
				}
				.lists_right_left_bottom{
					margin-top: 10rpx;
					color: #c8c9cc;
					text-align: center;
					white-space: nowrap;
				}
			}
		}

		.lists_left {
			display: flex;

			align-items: center;

			

			.left_left {
				
				
				.name {
					width: 300rpx;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 28rpx;
					text-align: justify;
					color: #000;
					max-width: 300rpx;
					white-space: nowrap;
					word-break: break-all;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
				}

				.code {
					line-height: 34rpx;
					margin-top: 10rpx;
					font-weight: 700;
					font-size: 28rpx;
					color: #000;

					.hou {
						font-weight: 400;
						font-size: 24rpx;
						color: #CCC;
						white-space: nowrap;
					}
				}

			}
			.left_right{
				
			}
		}


	}




	.page {
		background-color: rgb(245, 245, 245);
		min-height: 100vh;
	}

	.placesty {
		font-size: 24rpx;
		color: #999999;
	}

	.top-box {
		padding: 30rpx;
		width: 100%;

		background: url('@/static/top_bg.png') no-repeat;
		background-size: cover;

		.search {
			margin-top: 30rpx;
			height: 76rpx;
			background: #FFFFFF;
			box-shadow: 0px 12rpx 24rpx 0px rgba(103.0000014603138, 169.00000512599945, 255, 0.16078431904315948);
			border-radius: 38rpx;
			padding-left: 96rpx;
		}

		.left_img {
			position: absolute;
			left: 24rpx;
			top: 24rpx;
			height: 30rpx;
			padding-right: 20rpx;
			border-right: 1rpx solid #8F8F8F;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.bttom_box {
		padding: 10rpx 20rpx;

		.title {
			font-size: 28rpx;
			font-family: PingFang SC-中黑体, PingFang SC;
			font-weight: bold;
			color: #3D3D3D;
		}

		.price {
			margin-top: 20rpx;
			font-size: 32rpx;
			font-family: PingFang SC-中黑体, PingFang SC;
			font-weight: bold;
			color: #3D3D3D;
		}


	}

	.box {

		border-radius: 46rpx;
		position: relative;
		padding: 30rpx 46rpx;
		padding-top: 0;
		margin-top: -40rpx;

		.top {
			padding: 0 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;

			.hui {
				color: #A5A5A5
			}


			.line {
				margin-top: 10rpx;
				width: 48rpx;
				height: 8rpx;
				transform: translateX(100%);

				background: linear-gradient(0deg, #00dfec, #00dfec), linear-gradient(88.28deg, #00dfec 11.97%, #3df3dd 97.04%);
			}

			.hei {
				font-weight: 900;
				color: #282828;

			}
		}

		.img {
			margin-top: 50rpx;
			width: 318rpx;
			height: 80rpx;
		}

		.classlists {
			margin-right: 50rpx;
			font-size: 28rpx;
			font-family: Segoe UI-Bold, Segoe UI;
			font-weight: bold;
			color: #282828;
		}

		.lan {
			color: #003CFF;
			font-size: 32rpx;
		}
	}

	.number_box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		justify-content: space-evenly;
		align-items: center;
	}

	.bsnImg {
		width: 100%;
		display: flex;
		justify-content: center;
		height: 200rpx;
		align-items: center;
		margin-bottom: 100rpx;
		image {
			width: 300rpx;
			height: 70rpx;
		}
	}

	.submit {
		position: fixed;
		bottom: 30rpx;
		left: 44rpx;
		// margin: 0 auto;
		// margin: 0 auto;
		width: 662rpx;
		height: 100rpx;
		background: #3B3F47;
		border-radius: 6rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		// margin-bottom: 30rpx;
	}
</style>