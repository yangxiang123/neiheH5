<template>
	<view>
		<view class="content">
			<view class="type_box">
				<u-tabs active-color='#000' :bar-style='barStyle' :list="way" :is-scroll="true" :current="act" @change="getgoodsTag"></u-tabs>
				<!-- <view class="way" v-for="(item,index) in way" :key="index" :class="act==index?'way1':'way'"
					@click="getgoodsTag(index)">{{item}}</view> -->
			</view>
			<view class="lists" :style='{"height":`${type_boxHeight}`}'>
				<view class="lists_wrap" v-if="list != ''" v-for="(item,index) in list" :key="index">
					<view class="lists_box" v-if="item.goods"
						@click="util.urlTo('/pages/market/my_lists2?id='+item.goods_id+'&type1='+typeIndex+'&act='+act)">
						<image :src="item.goods.goods_image" mode="aspectFill" class="min_img"></image>
						<!-- <view class="fa" v-if="item.goods_number >0 ">发售中</view>
						<view class="fa2" v-else>已售完</view> -->
						<view class="num">x {{item.total_num}}</view>
						<view class="text">
							<view class="">{{item.goods.goods_name}}</view>
							<!-- <view class="flex align-center flex-sub margin-top-xs">
								<image :src="item.goods.publish_image"
									style="width: 38rpx;height: 38rpx;border-radius: 50%;" mode="">
								</image>
								<view class="padding-left-sm font24 col-999 text-1" style="width: 120rpx;">
									{{item.goods.publisher}}
								</view>
							</view> -->
		
							<!-- <view class="flex align-center left_box"
								style="font-size:18rpx;position: absolute;left:36rpx;top:230rpx;">
								<view class="left flex justify-center align-center text-white">
									限量
								</view>
								<view class="right flex justify-center align-center">
									{{item.goods.limit_number}}份
								</view>
							</view> -->
						</view>
					</view>
					<view class="lists_box" v-if="item.box"
						@click="util.urlTo('/pages/market/my_boxlists2?id='+item.box_id+'&type1='+typeIndex+'&act='+act)">
						<image :src="item.box.box_image" mode="aspectFill" class="min_img"></image>
						<view class="num">x {{item.total_num}}</view>
						<view class="text">
							<view class="">{{item.box.box_name}}</view>
							<!-- <view class="flex align-center flex-sub margin-top-xs">
								<image :src="item.box.publish_image"
									style="width: 38rpx;height: 38rpx;border-radius: 50%;" mode="">
								</image>
								<view class="padding-left-sm font24 col-999 text-1" style="width: 120rpx;">
									{{item.box.publisher}}
								</view>
							</view> -->
		
							<!-- <view class="flex align-center left_box"
								style="font-size:18rpx;position: absolute;left:36rpx;top:230rpx;">
								<view class="left flex justify-center align-center text-white">
									限量
								</view>
								<view class="right flex justify-center align-center">
									{{item.box.limit_number}}份
								</view>
							</view> -->
						</view>
					</view>
				</view>
				<view class="" v-else style="margin:0 auto;">
					<image src="/static/null.png" mode="" style="width:228rpx;height:230rpx;"></image>
					<view class="hui" style="text-align: center;color:#9F9F9F ;margin-top:40rpx;">暂无数据</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				way: [
					{name:'藏品'},
					{name:'盲盒'},
					{name:'寄售中'},
					{name:'已售出'},
				],
				act: 0,
				list: [],
				typeIndex: 0,
				barStyle:{
					background:'#00DFEC'
				},
				type_boxHeight:0
			};
		},
		onShow() {
			this.getgoodsTag(0)
		},
		onReady() {
				this.setBoxHeight()
		},
		methods:{
			setBoxHeight(){
				let systemHeight = uni.getSystemInfoSync().windowHeight,
					query = uni.createSelectorQuery(),
					that = this
					query.select('.type_box').boundingClientRect()
					query.exec(data=>{
						console.log(systemHeight,data);
						that.type_boxHeight = systemHeight - data[0].height + 'px'
						
						console.log(that.type_boxHeight);
					})
			},
			getgoodsTag(index) {
				this.act = index
				if (index == 0 || index == 1) {
					this.typeIndex = 0
				} else if (index == 2) {
					this.typeIndex = 1
				} else {
					this.typeIndex = 2
				}
				this.list = []
			
			
				if (this.act == 0) {
					this.util.request('user/user_compound', {
						type: 1,
					}).then(res => {
						this.list = res;
						console.log(this.list)
					})
				} else if (this.act == 1) {
					this.util.request('user/user_box', {
						type: 1,
					}).then(res => {
						this.list = res;
					})
				} else if (this.act == 2) {
					this.util.request('user/user_compound', {
						type: 2,
					}).then(res => {
						this.list = res;
			
						this.util.request('user/user_box', {
							type: 2,
						}).then(req => {
			
							this.list = this.list.concat(req);
			
						})
					})
				} else if (this.act == 3) {
					this.util.request('user/user_compound', {
						type: 3,
					}).then(res => {
						this.list = res;
						this.util.request('user/user_box', {
							type: 3,
						}).then(req => {
			
							this.list = this.list.concat(req);
							console.log(this.list)
						})
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.content {
		// padding: 30rpx;
		// margin-top: 40rpx;
		.type_box {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 100vw;
			padding: 0 44rpx;
			border-bottom: 1rpx solid rgba(85,85,0,0.1);
			.way1 {
				// border-radius:50rpx;
				// width:150rpx;
				// height:50rpx;
				// background-color: #fff;
				// color: #000;
				// border: 1rpx solid #000;
				// text-align: center;
				// line-height:50rpx;
				// box-sizing: border-box;
				font-weight: 600;
				font-size: 32rpx;
				line-height: 100%;
			}
	
			.way {
				width:110rpx;
				height:50rpx;
				line-height: 100%;
				// background-color: #F5F5F5;
				// color: #000;
				// text-align: center;
				// line-height:50rpx;
				// border-radius:50rpx;
			}
		}
	
		.left {
			background: #A7C4FF;
			padding: 6rpx 8rpx;
			color: #fff;
			border-radius: 10rpx 0rpx 0rpx 10rpx;
		}
	
		.right {
			color: #A1A1A1;
			padding: 4rpx 8rpx;
			border-radius: 0rpx 10rpx 10rpx 0rpx;
			border: 2rpx solid #A7C4FF;
			background-color: #fff;
		}
	
		.lists {
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			// margin-top: 30rpx;
			padding: 30rpx;
			background: #fafafa;
			align-content: flex-start;
			.lists_wrap:nth-child(2n){
				margin-right: 0rpx !important;
			}
			.lists_wrap{
				margin-right: 30rpx;
				height: 400rpx;
				margin-bottom: 34rpx;
			}
			.lists_box {
				margin-bottom: 34rpx;
				width: 330rpx;
				// width: 330rpx;
				padding-bottom: 20rpx;
				background-color: #fff;
				box-shadow: 0px 20rpx 24rpx 0px rgba(0, 0, 0, 0.0313725508749485);
				border-radius: 10rpx;
				position: relative;
				
				.num {
					padding: 5rpx 15rpx;
					border-radius: 30rpx;
					background-color: rgba(0, 0, 0, 0.4);
					color: #fff;
					font-size: 26rpx;
					position: absolute;
					right: 30rpx;
					top: 260rpx;
				}
	
	
	
	
	
				.top_float {
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					background-color: #FFFFFF;
					opacity: 0.5;
					border-radius: 20rpx 20rpx 0px 0px;
					position: absolute;
					left: 0;
					top: 0;
	
	
				}
	
				.min_img {
					border-radius: 10rpx;
					width: 330rpx;
					height: 330rpx;
				}
	
				.text {
					padding: 20rpx 0 0rpx 8rpx;
					font-size: 28rpx;
					font-family: Segoe UI-Bold, Segoe UI;
					font-weight: bold;
					color: #282828;
					height: 50rpx;

	
	
					.price {
						margin-top: 20rpx;
						font-size: 40rpx;
						font-weight: bold;
						color: #282828;
					}
	
					.num {
						font-size: 24rpx;
						font-weight: 400;
						color: #848484;
					}
				}
			}
		}
	
	
	
		.box {
			margin-bottom: 40rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding-top: 60rpx;
			padding-bottom: 40rpx;
	
	
			.title {
				text-align: center;
				font-size: 40rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;
	
				image {
					margin-left: 20rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
	
			.detail {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
	
				.detail_list {
					margin-left: 30rpx;
					width: 304rpx;
					height: 378rpx;
					background: #FFFFFF;
					box-shadow: 0px 20rpx 24rpx 0px rgba(0, 0, 0, 0.0313725508749485);
					border-radius: 10rpx;
	
					image {
						width: 304rpx;
						height: 298rpx;
						box-shadow: 0px 0px 60rpx 0px rgba(0, 0, 0, 0.10196078568696976);
						border-radius: 10rpx 10rpx 0px 0px;
					}
	
					.name {
						font-size: 24rpx;
						font-family: Segoe UI-Bold, Segoe UI;
						font-weight: bold;
						color: #282828;
						margin-top: 26rpx;
						margin-left: 32rpx;
					}
	
				}
			}
	
			.more {
				width: 206rpx;
				height: 54rpx;
				text-align: center;
				line-height: 54rpx;
				margin: 45rpx auto;
				box-shadow: -4rpx 4rpx 6rpx 0px rgba(255, 204.00000303983688, 0, 0.16862745583057404);
				border-radius: 28rpx;
				opacity: 1;
				border: 2rpx solid #E3E3E3;
				font-size: 20rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				color: #B7B7B7;
			}
		}
	}

</style>
