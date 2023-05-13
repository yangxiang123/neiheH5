<template>
	<view class="">
		<u-sticky h5-nav-height="0">
			<view :class="isLight ? 'header_custom2' : 'header_custom'">
				<u-icon @click='util.backTo(1)' name='arrow-left' :color="isLight ? '#000' : '#FEE8BB'" size="40"></u-icon>
				<text class="title">钻石商城</text>
				<text class="rightText">钻石规则</text>
			</view>
		</u-sticky>
		<!-- <view class="top">
			<view class="brick_card">
				<view class="card_top" @click="util.urlTo('diamondDetail')">
					<text>我的钻石</text>
					<u-icon :custom-style='iconStyle' name='arrow-right' size="18"></u-icon>
				</view>
				<view class="type_box">
					<view class="type_item" v-for="(item,index) of 4">
						<image src="../../static/brickMall/zuanshi1.png" class="itemImg" mode=""></image>
						<text class="num">0</text>
					</view>
				</view>
			</view>
		</view> -->
		<u-sticky offset-top='0'>
			<view class="tabs_wrap">
				<view class="tabs">
					<view :class="act == index?'tabact':'tab_list'" v-for="(item,index) in tabs" :key="index"
						@click="change(index,item)">{{item.name}}
						<view class="line" v-if="act == index"></view>
					</view>
				</view>
				<u-tabs :list="tabsList" :current="current" @change="changeTabs" :show-bar='false' height='50' :active-item-style='active_item'></u-tabs>
			</view>
		</u-sticky>
		<view class="goods_box">
			
			<view class="goods_list">
				<view class="goods_item" v-for="item of 10" @click='util.urlTo(`/pages/home/integral_info`)'>
					<image class='goods_image' src="../../static/brickMall/goos.jpg" mode=""></image>
					<view class="sy_box">
						<text>剩余 888 </text>
					</view>
					<view class="goods_content">
						<text class="goods_name">xxxxxxxxxxxxxxxx</text>
						<view class="goods_xl">
							<text class="goods_xl_1">限量</text>
							<text class="goods_xl_2">18888份</text>
						</view>
						<view class="goods_price">
							<text>11</text>
							<image src="../../static/brickMall/zuanshi1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				iconStyle:{
					backgroundColor: '#C7A363',
					color: '#FDE0BE',
					borderRadius: '50%',
					padding: '6rpx',
					marginLeft:'10rpx'
				},
				act: 0,
				tabsList:[],
				page:1,
				active_item:{
					color: '#fff !important',
					fontWeight: 'bolder',
					background: '#00CBD7',
				},
				current: 0,
				list: [],
				tabs:[],
				isLight:false
			}
		},
		onShow() {
			this.getTabs()
		},
		methods:{
			getTabs(){
				this.util.request('index/new_types').then(res => {
					this.tabs = res
					this.tabsList = this.tabs[this.act].children
					// this.getlist()
				})
			},
			changeTabs(index){
				this.current = index;
				// uni.showLoading({
				// 	mask: true
				// })
				// this.getlist()
				this.page = 1
			},
			change(index,item) {
				this.current = 0
				this.page = 1
				// uni.showLoading({
				// 	mask: true
				// })
				this.act = index
				this.tabsList = item.children
				
				// this.getlist()
			},
		},
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			// console.log(e);
			return
			if(e.scrollTop!=0){
				this.isLight = true
			}else{
				this.isLight = false
			}
			console.log(this.header_style);
		},
	}
</script>

<style lang="scss">
	.top{
		background-image: url('../../static/brickMall/header_bg.png');
		height: 325rpx;
		// margin-top: 40rpx;
		padding-top: 30rpx;
	}
	// 控制页面滑动时顶部到导航栏样式切换
	.header_custom2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 0 10rpx 20rpx;
		background-color: #fff;
		// height: 100rpx;
		.title{
			color: #000;
			font-size: 36rpx;
			font-weight: 600;
		}
		.rightText{
			border-radius: 40rpx 0 0 40rpx; 
			background-color: #fff;
			color: #000;
			padding: 10rpx 20rpx;
			font-size: 28rpx;
		}
	}
	.header_custom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 0 10rpx 20rpx;
		background-color: #141314;
		// height: 100rpx;
		.title{
			color: rgb(255, 231, 184);
			font-size: 36rpx;
			font-weight: 600;
		}
		.rightText{
			border-radius: 40rpx 0 0 40rpx; 
			background-color: #222122;
			color: rgb(255, 231, 184);
			padding: 10rpx 20rpx;
			font-size: 28rpx;
		}
	}
	
	.brick_card{
		display: flex;
		flex-direction: column;
		background-image: url('../../static/brickMall/header_card_bg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		margin: 20rpx 20rpx 0 20rpx;
		padding: 20rpx 30rpx;
		height: 300rpx;
		// border-radius: 20rpx;
		.card_top{
			display: flex;
			align-items: center;
			text{
				color: #624522;
				font-size: 32rpx;
				font-weight: 600;
			}
			
		}
		.type_box{
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			padding: 0 40rpx;
			.type_item{
				display: flex;
				flex-direction: column;
				align-items: center;
				.itemImg{
					width: 64rpx;
					height: 64rpx;
				}
				.num{
					color: rgb(106, 64, 0);
					font-weight: 600;
				}
			}
		}
	}
	.u-tabs{
		width: 90%;
		margin: 30rpx auto;
	}
	/deep/.u-tab-item{
		font-weight: bolder;
		margin-right:20rpx;
		border-radius: 40rpx;
		// background: #F5F5F5;
		color: rgba(0,0,0,0.6) !important;
		// border: 1px solid red !important;
	}
	/deep/.sticky{
		// padding: 20rpx;
		height: 60rpx;
		padding-top: 30rpx;
		// background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		transform: translateY(-30rpx);
	}
	.tabs_wrap{
		padding-top: 30rpx;
		transform: translateY(-12rpx);
		background-color: #fff;
		// border-radius: 20rpx 20rpx 0 0;
	}
	.tabs {
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		// background-color: #fff;
	
		.tabact {
			height: 70rpx;
			line-height: 40rpx;
			padding-bottom: 30rpx;
			color: #000;
			font-weight: 700;
			font-size: 36rpx;
			margin-right: 40rpx;
	
			.line {
				width: 60rpx;
				height: 10rpx;
				border-radius: 10rpx;
				background-color: #00DFEC;
				margin-left: 50rpx;
				margin-top: 20rpx;
			}
		}
	
		.tab_list {
			height: 70rpx;
			color: rgba(0, 0, 0, .6);
			margin-right: 40rpx;
			padding-bottom: 30rpx;
			font-weight: 400;
			font-size: 30rpx;
		}
	
	}
	
	.goods_box{
		transform: translateY(-30rpx);
		padding-top: 40rpx;
		border-radius: 30rpx 30rpx 0 0; 
		background-color: #fff;
	}
	.goods_list{
		display: flex;
		justify-content: space-between;
		padding:  0 20rpx;
		flex-wrap: wrap;
		.goods_item{
			width: 330rpx;
			// border: 1px solid;
			border-radius: 30rpx;
			margin-bottom: 30rpx;
			position: relative;
			.sy_box{
				position: absolute;
				top: 272rpx;
				text-align: center;
				width: 80%;
				left: 10%;
				margin: 0 auto;
				// background-image: url('../../static/brickMall/sy_bg.png');
				border-radius: 20rpx 20rpx 0 0 ;
				background-color: #FF855B;
				background-size: 100%;
				height:60rpx;
				align-items: center;
				display: flex;
				justify-content: center;
				text{
					font-size: 36rpx;
				}
			}
			.goods_image{
				width: 330rpx; 
				height: 330rpx;
				border-radius: 30rpx 30rpx 0 0;
			}
			.goods_content{
				z-index: 999;
				border: 1px solid #e0e0e0;
				border-radius:0 0 20rpx 20rpx;
				padding: 10rpx 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// background-color: red;
				transform: translateY(-6rpx);
				height:170rpx;
				.goods_name{
					width: 280rpx;
					font-size: 40rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.goods_xl{
					display: flex;
					.goods_xl_1{
						background-color: #FFD2A6;
						color: #694935;
						padding: 2rpx 6rpx;
						border-radius: 10rpx 0 0 10rpx ;
					}
					.goods_xl_2{
						background-color: #FCF7F1;
						color: #D6B389;
						padding: 2rpx 6rpx;
						border-radius: 0 10rpx 10rpx 0;
					}
				}
				.goods_price{
					display: flex;
					justify-content: flex-end;
					text{
							color: #EB602E;
							font-size: 40rpx;
					}
					image{
						width: 30rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>