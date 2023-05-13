<template>
	<view class="page">
		<!-- <view class="mar28 flex" style="margin-top:30rpx;">
			<view v-for="(item,index) in type_list" :key="index" class="flex-sub text-center"
			 style="position: relative;"	:class="typeIndex==index?'text-blue':''" @tap="typeIndex=index;getlist(1)">
				{{item.name}}
				<view class="xian" v-show="typeIndex==index">
				</view>
			</view>
		</view> -->
		<view class="lists">
			<view class="lists_box" v-for="(item,index) in list" :key="index" @click="navto(item.id)"
				v-if="list">
				<image :src="item.box.box_image" mode="aspectFill" class="min_img"></image>
				<view class="text">
					<view class="">{{item.box.box_name}}</view>
					<!-- <view class="flex align-center"
						style="margin-top:15rpx;color: #A1A1A1;font-size:20rpx;:20rpx;height:20rpx;">
						<image :src="item.box.publish_image" mode="" style="width:20rpx;height:20rpx;"></image>
						{{item.box.publisher}}
					</view> -->
				</view>
			</view>


		</view>
		<view class="batchOpen font30" v-show="list.length>0" @click="open">
			批量开启
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
				act:0,
				id:0
			}
		},
	
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
						url:'box_info?id='+id
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'该盲盒已售出'
					})
				}
				
			},
			getlist(e) {
				if (e == 1) {
					this.page = 1;
					this.list = [];
				}

				this.util.request('user/user_box', {
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

			},
			open(){
				this.util.request('goods/open_all_box', {
					
				}).then(res => {
					this.util.showToast('已全部开启!')
					this.list = []
				})
			}
		}
	}
</script>

<style lang="scss">
	.lists {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;

		.lists_box {
			margin-bottom: 34rpx;
			margin-left: 30rpx;
			width: 330rpx;
			background-color: #fff;
			box-shadow: 0px 20rpx 24rpx 0px rgba(0, 0, 0, 0.0313725508749485);
			border-radius: 10rpx;

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
	.batchOpen{
		position: absolute;
		bottom: 60rpx;
		right: 60rpx;
		
		margin: 0 auto;
		// width: 200rpx;
		height: 90rpx;
		background: #3B3F47;
		border-radius: 50rpx;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		padding: 0 70rpx;
	}
	
</style>
