<template>
	<view class="page">
		<view class="flex justify-center">
			<image src="/static/yq_title.png" mode="" class="title"></image>
		</view>
		<view class="" style="margin-top:30rpx;">
			活动有效期：{{list.start_time}}~{{list.end_time}}
		</view>
		<view class="main">
			<view class="flex align-center">
				<image :src="list.box_info.box_image" mode="widthFix"></image>
				<view class="" style="margin-left:40rpx;font-size:48rpx;color:#3D3D3D;">X</view>
				<view class="" style="margin-left:40rpx;font-size:72rpx;color:#58D6F9;">{{list.times}}</view>
			</view>
			<view class="main_name">{{list.box_info.box_name}}</view>
		</view>

		<view class="titleming">活动说明</view>
		
		<view class="" v-html="list.introduce" style="margin-top:20rpx;color:#9F9F9F;line-height: 40px;"></view>

		<view class="pai_title flex align-center justify-around">
			
			<view class="pai_way" v-for="(item,index) in days" @click="days_act=index" :key="index" :class="days_act==index?'pai_way':'pai_way2'">
				
			{{item}}
			<view class="line" v-if="days_act==index"></view>
			</view>
			
		</view>

		<view class="box" v-if="days_act == 0">
			<view class="flex justify-between align-center way" v-for="(item,index) in list.ranking">
				<view class="hao" v-if="index < 10" :class="index==0?'hao1':index==1?'hao2':index==2?'hao3':'hao'">
					NO.{{index+1}}</view>
				<view class="flex align-center">
					<image :src="item.inviter.avatar" mode=""></image>
					<view class="name">{{item.inviter.nickname}}</view>
				</view>
				<view class="bot">{{item.num}}</view>
			</view>
		</view>
		
		<view class="box2" v-if="days_act == 1">
			<view class="list flex align-center justify-between" v-for="(item,index) in all">
				<view class="flex align-center">
					<image :src="item.user.avatar" mode=""></image>
					<view class="" style="margin-left:20rpx;">
						<view class="" style="color: #444;">{{item.user.nickname}}</view>
						<view class="" style="color:#9F9F9F ;">{{item.invitetime_text}}</view>
					</view>
				</view>
				<view class="">{{item.user.real_status==0?'未实名':'实名'}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				all: [],
				list: '',
				days: ['排行榜', '邀请记录'],
				days_act: 0,
				act: 0,
				page: 1,
				real: '',
				invite: ''
			}
		},
		onShow(e) {
			this.getinfo();
			this.getlist();
		},
		onPullDownRefresh() {
			this.list = '';
			this.getlist();
			this.getUserInfo();
		},
		methods: {
			look() {
				console.log(this.list.poster)
				let _this = this;
				let imgArray = [];
				// 多张
				for (let i = 0; i < 1; i++) {
					imgArray.push(_this.list.poster);
				}

				uni.previewImage({
					current: 1, //当前为第几张
					urls: imgArray,
					// indicator: 'number',
					// loop: true
				});
				// this.util.lookImg(this.list.poster);
			},
			getlist() {
				this.util.request('invite/inviteRank', {}, 'POST').then(res => {
					uni.stopPullDownRefresh()
					this.list = res;
					console.log(this.list)
				})
			},
			getinfo() {
				this.util.request('invite/junior', {
					is_activity:1
				}).then(res => {
					this.all = res.list;
		
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.page {
		padding: 40rpx 44rpx;
	}
	
	.box2 {
		margin-top: 40rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
	
		.list {
			height: 130rpx;
			border-bottom: 2rpx solid #F1F1F1;
	
			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 100%;
			}
		}
	}

	.title {
		width: 400rpx;
		height: 58rpx;
		margin: 0 auto;
	}
	.main{
		padding-left:20rpx;
		margin-top:50rpx;
		image{
			width:320rpx;
			height:248rpx;
		}
		.main_name{
			padding-left:120rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei-Bold, Microsoft YaHei;
			font-weight: bold;
			color: #58D6F9;
		}
	}
	
	.titleming{
		margin-top:50rpx;
		font-size: 34rpx;
		font-family: Microsoft YaHei-Bold, Microsoft YaHei;
		font-weight: bold;
		color: #444444
	}
	
	.pai_title{
		margin-top:60rpx;
		padding:0 100rpx;
		.pai_way{
			font-size: 36rpx;
			font-family: Microsoft YaHei-Bold, Microsoft YaHei;
			font-weight: bold;
			color: #282828;
		}
		.pai_way2{
			font-size: 28rpx;
			font-family: Microsoft YaHei-Regular, Microsoft YaHei;
			font-weight: 400;
			color: #CECECE;
		}
		.line{
			width: 90rpx;
			height: 8rpx;
			background: #58D6F9;
			border-radius: 4rpx;
			margin:0 auto;
		}
	}

	.box {
		margin-top: 40rpx;

		.way {
			padding: 40rpx;
			margin-bottom: 32rpx;
			border-radius: 20rpx;
			background-color: #fff;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 100%;
			}

			.name {
				font-size: 28rpx;
				color: #444444;
				margin-left: 20rpx;
			}

			.bot {
				color: #FF7F5A;
				font-size: 36rpx;
			}
		}

		.hao {
			color: #444444;
			font-size: 36rpx;
		}

		.hao1 {
			color: #FFC300;
			font-size: 36rpx;
		}

		.hao2 {
			color: #B9B9B9;
			font-size: 36rpx;
		}

		.hao3 {
			color: #E28F00;
			font-size: 36rpx;
		}
	}



</style>
