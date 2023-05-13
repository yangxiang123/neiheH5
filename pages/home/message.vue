<template>
	<view class="page">
		<view class="box" v-for="(item,index) in list" :key="index"  @click="util.urlTo('/pages/my/notice?id='+item.id)">
			<view class="title">{{item.title}}</view>
			<view class="time">{{item.time_text}}  <text class="right">{{item.type_text}}</text> </view>
			<!-- <view class="content" v-html="item.content"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[]
			}
		},
		methods:{
			getList(e) {
				this.util.request('index/news', {
			
				}).then(res => {
					this.list = this.list.concat(res);
				})
			},
		},
		onLoad() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.page{
		padding:30rpx;
		
		
		.box{
			padding:40rpx;
			margin-bottom:30rpx;
			background: #FFFFFF;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0,0,0,0.029999999329447746);
			border-radius: 40rpx;
			.title{
				font-size: 28rpx;
				font-family: Segoe UI-Regular, Segoe UI;
				font-weight: 400;
				color: #444444;
			}
			.time{
				margin-top:20rpx;
				font-size: 20rpx;
				font-family: Segoe UI-Regular, Segoe UI;
				font-weight: 400;
				color: #9F9F9F;
				
				.right{
					font-size: 20rpx;
					font-family: Segoe UI-Regular, Segoe UI;
					font-weight: 400;
					color: #284BFF;
					margin-left:15rpx;
				}
			}
			
			.content{
				margin-top:20rpx;
				// font-size: 24rpx;
				// font-family: Segoe UI-Regular, Segoe UI;
				// font-weight: 400;
				// color: #9F9F9F;
				// line-height: 36rpx;
			}
		}
	}
</style>