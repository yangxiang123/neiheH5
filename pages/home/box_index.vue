<template>
	<view class="page">
		
		<!-- 列表 发售日历-->
		<view class="card">
			<view class="title">发售日历 <image src="/static/title_le.png"></image>
			</view>
			<view class="card_box">
				<view class="card_list" v-for="(item,index) in card_list" :key="index"  @click="util.urlTo('box_info?id='+item.id)">
					<view class="img_box">
						<image :src="item.box_image" mode="aspectFill"></image>
						<view class="time">
							<view class="fa">{{item.publish_time_text}}  发售</view>
						
						</view>
						<!--  -->
					</view>
					
					<view class="text">
						<view class="text_title">{{item.box_name}}</view>
						<view class="shop_name flex align-center"><image :src="item.publish_image" mode="" style="width:20rpx;height:20rpx;"></image>  {{item.publisher}}</view>
						<view class="bottom flex align-center justify-between">
							<view class="left">限量:{{item.box_number}}</view>
							<view class="right">￥{{item.box_price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="title">精选推荐 <image src="/static/title_le.png"></image>
			</view>
			<view class="big" v-if="top_list != ''" @click="util.urlTo('box_info?id='+top_list.id)">
				<image :src="top_list.box_image" mode="aspectFill" class="img"></image>
				<view class="information">
					<view class="flex justify-between align-center">
						<view class="information_title">{{top_list.box_name}}</view>
						<view class="">限量{{top_list.limit_number}}份</view>
					</view>
					<view class="flex align-center" style="margin-top:35rpx;"><image :src="top_list.publish_image" mode="" style="width:20rpx;height:20rpx;"></image>  {{top_list.publisher}}</view>
					
					<view class="information_btn">￥{{top_list.box_price}}</view>
				</view>				
			</view>
			
			
		</view>
		<view class="lists">
			<view class="lists_box" v-for="(item,index) in list" :key="index" @click="util.urlTo('box_info?id='+item.id)">
				<image :src="item.box_image" mode="aspectFill" class="min_img"></image>
				<view class="text">
					<view class="">{{item.box_name}}</view>
					<view class="flex align-center" style="margin-top:15rpx;color: #A1A1A1;font-size:20rpx;:20rpx;height:20rpx;"><image :src="item.publish_image" mode="" style="width:20rpx;height:20rpx;"></image>  {{item.publisher}}</view>
				</view>
			</view>
			
			
		</view>
		<!-- <view class="more">查看更多 ></view> -->
		<!-- <view v-if="isshow" class="flex align-center justify-center"
			style="position: fixed;bottom: 117rpx;left: 0;width: 100%;">
			<view class="flex align-center bg-white"
				style="padding: 16rpx 33rpx;width: 694rpx;box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.14);border-radius: 20rpx;">
				<view class="flex-sub">
					实名认证之后才可以购买数字藏品
				</view>
				<view @click="util.urlTo('../index/shiming')" class="btnbg margin-right-sm"
					style="width: 116rpx;height: 56rpx;">
					认证
				</view>
				<image @click="isshow = false" src="/static/home/close.png" style="width: 22rpx;height: 22rpx;" mode="">
				</image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshow: false,
				user: {},
				list: [],
				card_list:[],
				top_list: '',
				type: 0,
				cardCur: 0,
				swiperList: [{
						carousel_path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0137ac5993fb83a801215603767d4c.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651140058&t=0fa9bbc6c763da89c1716066efadb5a5',
						type: 'image'
					},
					{
						carousel_path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fcb8065380cd79123f8da4ef5a1345982b2b7807d.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651140097&t=68eefbfba9f1f2916a74603e9b734037',
						type: 'image'
					}
				],
			}
		},
		onLoad(e) {
			this.getcar();
		},
		onShow() {
			// this.util.getVersion();
			this.list = [];
			this.card_list = []
			this.getlist();
			this.getUserInfo();
		},
		onPullDownRefresh() {
			this.list = [];
			this.card_list = []
			this.getlist();
			this.getUserInfo();
		},
		methods: {
			showtost() {
				uni.showToast({
					icon: "none",
					title: '模块暂未开放'
				})
			},
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.user = res;
					this.isshow = (res.real == 0);
				})
			},
			change(e) {
				this.list = [];
				this.type = e;
				this.getlist();
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current;
			},
			getcar() {
				this.util.request('index/carousel', {}, 'POST').then(res => {
					this.swiperList = res;
				})
			},
			tourl(e) {
				if (e.type_status == 2) {
					plus.runtime.openURL(e.type_value);
				} else {
					this.util.urlTo('info?id=' + e.type_value);
				}
			},
			getlist() {
				this.util.request('index/choiceness_box', {}, 'POST').then(res => {
					// this.swiperList = res.top;
					uni.stopPullDownRefresh()
					this.list = this.list.concat(res.goods);
					this.top_list = res.top
				})

				this.util.request('index/calendar_box', {}, 'POST').then(res => {
					// this.swiperList = res.top;
					uni.stopPullDownRefresh()
					
					for(let i in res){
						this.card_list = this.card_list.concat(res[i].goods)
					}
					
					console.log(this.card_list)
					
				})
			},

		}
	}
</script>

<style lang="scss">
	.page {
		background: url('@/static/zhucebg.png') no-repeat;
		background-size: cover;
		min-height: 100vh;
		padding-bottom:45rpx;
	}
	
	.lists{
		display: flex;
		flex-wrap: wrap;
		margin-top:30rpx;
		
		.lists_box{
			margin-bottom:34rpx;
			margin-left:30rpx;
			width: 330rpx;
			background-color: #fff;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0,0,0,0.0313725508749485);
			border-radius:20rpx;
			
			.min_img{
				border-radius: 22rpx 22rpx 0px 0px;
				width: 330rpx;
				height:324rpx;
			}
			
			.text{
				padding:28rpx 0 34rpx 32rpx;
				font-size: 28rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;
			}
		}
		
	
	}
	.more{
		margin:0rpx auto;
		margin-top:45rpx;
		width:206rpx;
		height: 54rpx;
		box-shadow: -4rpx 4rpx 6rpx 0px rgba(255,204.00000303983688,0,0.16862745583057404);
		border-radius: 28rpx;
		opacity: 1;
		border: 2rpx solid #E3E3E3;
		font-size: 20rpx;
		font-weight: 400;
		color: #B7B7B7;
		text-align: center;
		line-height:54rpx;
	}
	
	.content{
		padding:30rpx;
		margin-top:42rpx;
		.big{
			background: #FFFFFF;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0,0,0,0.0313725508749485);
			border-radius: 50rpx;
			padding:30rpx 26rpx;
			
			.img{
				width:100%;
				height:478rpx;
				border-radius:30rpx;
			}
			
			.information{
				padding:50rpx 22rpx;
				padding-bottom:80rpx;
				font-size: 20rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				font-weight: 400;
				color: #848484;
				.information_title{
					font-size: 28rpx;
					font-family: Segoe UI-Bold, Segoe UI;
					font-weight: bold;
					color: #282828;
				}
				
				.information_btn{
					width: 206rpx;
					height: 54rpx;
					line-height:54rpx;
					text-align: center;
					background: #003CFF;
					box-shadow: -4rpx 4rpx 6rpx 0px rgba(255,204.00000303983688,0,0.16862745583057404);
					border-radius: 28rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: #FFFFFF;
					float: right;
				}
				
			}
		}
	}


	.card {
		margin-top:30rpx;
		background-color: #fff;
		box-shadow: 0px 0px 60rpx 0px rgba(0, 0, 0, 0.10196078568696976);
		border-radius: 62rpx 0px 0px 62rpx;
		margin-left: 30rpx;
		padding-top: 46rpx;
		
		.card_box{
			overflow-x: auto;
			display: flex;
			
			.card_list{
				width: 438rpx;
				margin-left:30rpx;
				
				.img_box{
					width: 438rpx;
					height:382rpx;
					position: relative;
					border-radius:30rpx;
					
					image{
						width:100%;
						height:100%;
						border-radius:30rpx;
					}
					
					.time{
						width: 438rpx;
						height: 70rpx;
						line-height:70rpx;
						text-align: center;
						background-color: #FFFFFF;
						opacity: 0.5;
						border-radius: 30rpx 30rpx 0px 0px;					
						position: absolute;
						left:0;
						top:0;	
						.fa{
							opacity:1;
							width: 100%;
							height:100%;
							font-size: 20rpx;
							font-family: Source Han Sans CN-Regular, Source Han Sans CN;
							font-weight: 400;
							color: #000;		
						}							
					}
				}
				
				.text{
					width: 396rpx;
					background: #FFFFFF;
					box-shadow: 0px 0px 60rpx 0px rgba(0,0,0,0.10196078568696976);
					border-radius: 42rpx;
					padding:26rpx 14rpx 14rpx 22rpx;
					box-sizing: border-box;
					position: relative;
					left:22rpx;
					bottom:74rpx;
					
					.text_title{
						font-size: 28rpx;
						font-family: Segoe UI-Bold, Segoe UI;
						font-weight: bold;
						color: #282828;
					}
					
					.shop_name{
						margin-top:15rpx;
						font-size: 20rpx;
						font-family: Segoe UI-Regular, Segoe UI;
						font-weight: 400;
						color: #A1A1A1;
					}
					
					.left{
						font-size: 20rpx;
						font-family: Source Han Sans CN-Regular, Source Han Sans CN;
						font-weight: 400;
						color: #848484;
					}
					
					.right{
						padding:16rpx;
						background: #003CFF;
						box-shadow: -4rpx 4rpx 6rpx 0px rgba(255,204.00000303983688,0,0.16862745583057404);
						font-weight: bold;
						color: #FFFFFF;
						border-radius: 28rpx;
						
					}
				}
			}
		}
	}

	.title {
		margin: 0rpx 0 42rpx 52rpx;
		font-size: 32rpx;
		font-family: Segoe UI-Bold, Segoe UI;
		font-weight: bold;
		color: #282828;
		display: flex;
		align-items: center;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-left: 12rpx;
		}
	}





	.nav {
		padding: 38rpx 70rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;
		background: #FFFFFF;
		border-radius: 56rpx;
		margin-top: 46rpx;
		text-align: center;

		image {
			width: 70rpx;
			height: 70rpx;
		}
	}

	.notice {

		width: 100%;

		.box {
			background-color: #fff;
			padding: 16rpx 32rpx;
			box-shadow: 0px 12rpx 24rpx 0px rgba(103.0000014603138, 169.00000512599945, 255, 0.16078431904315948);
			border-radius: 7rpx;
			display: flex;
			align-items: center;
			height: 76rpx;
			box-sizing: border-box;
			border-radius: 38rpx;

			image {
				width: 27rpx;
				height: 25rpx;
			}

			.notice-text {
				width: 427rpx;
				font-size: 25rpx;
				font-weight: 400;
				color: #8E9091;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.top-box {
		padding: 30rpx;
		width: 100%;
		// height: 946rpx;
		background: url('@/static/top_bg.png') no-repeat;
		background-size: cover;
	}

</style>
