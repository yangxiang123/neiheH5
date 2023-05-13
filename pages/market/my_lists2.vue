<template>
	<view class="page">
		
		<view class="lists">
			<view class="lists_box" v-for="(item,index) in list" :key="index" @click="navto(item.id)"
				v-if="list">
				<image :src="item.goods.goods_image" mode="aspectFill" class="min_img"></image>
				<view class="text">
					<view class="">{{item.goods.goods_name}}</view>
					<view class="flex align-center" style="font-size: 20rpx;margin-top:10rpx;">
						<view class="left flex justify-center align-center">
						编号
						</view>
						<view class="right flex justify-center align-center text-white">
							{{item.code}}
						</view>
					</view>
					<!-- <view class="flex align-center"
						style="margin-top:15rpx;color: #A1A1A1;font-size:20rpx;:20rpx;height:20rpx;">
						<image :src="item.goods.publish_image" mode="" style="width:20rpx;height:20rpx;"></image>
						{{item.goods.publisher}}
					</view> -->
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null,
				page: 1,
				isshow: false,
				type_list: [{
						name: '收藏中',
						id: ''
					},
					{
						name: '转售中',
						id: ''
					},
					{
						name: '已转售',
						id: ''
					},
				],
				typeIndex: 0,
				id:0,
				act:0
			}
		},
		// onShow() {
		// 	this.getlist(1)
		// },
		onReachBottom() {
			if (this.isshow == false) {
				this.page += 1
				this.getlist()
			}

		},
		onLoad(e) {
		
			this.id = e.id
			this.typeIndex = Number(e.type1) 
			this.act = e.act
			this.getlist(1)
		
		},
		methods: {
			navto(id){
				if(this.act != 3){
					uni.navigateTo({
						url:'info?id='+id
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'该藏品已售出'
					})
				}
				
			},
			getlist(e) {
				if (e == 1) {
					this.page = 1;
					this.list = [];
				}

				this.util.request('user/user_compound', {
					type: this.typeIndex+1,
					goods_id: this.id,
					is_list: 1,
					page: this.page
				}).then(res => {
					this.list = this.list.concat(res);
					if (res == '') {
						this.isshow = true
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	
	
	.lists {
		display: flex;
		flex-wrap: wrap;
		padding-top: 30rpx;

		.lists_box {
			margin-bottom: 34rpx;
			margin-left: 30rpx;
			width: 330rpx;
			background-color: #fff;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0, 0, 0, 0.0313725508749485);
			border-radius: 10rpx;
			
			.left {
				display: inline-block;
				
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
				
				padding: 0 8rpx;
				height: 36rpx;
				font-style: normal;
				font-weight: 700;
				font-size: 24rpx;
				line-height: 36rpx;
				color: #b47528;
				background: rgba(240, 213, 182, .24);
			}

			.min_img {
				border-radius: 10rpx 10rpx 0px 0px;
				width: 330rpx;
				height: 330rpx;
			}

			.text {
				padding: 28rpx 0 34rpx 32rpx;
				font-size: 28rpx;
				font-family: Segoe UI-Bold, Segoe UI;
				font-weight: bold;
				color: #282828;
			}
		}
		
	

	}
	
	.xian {
		width: 50upx;
		height: 5upx;
		background: #003CFF;
		border-radius: 3upx;
		position: absolute;
		bottom: -10upx;
		left: 50%;
		transform: translateX(-50%);
	}
	
</style>
