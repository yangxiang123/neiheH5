<template>
	<view class="">
		<view class="padding">
			<view class="flex align-center justify-center">
				<view class="text-center titlebg padding-top-sm">
					<view class="font42" style="color: #3B3F47;">
						合成限量藏品
					</view>
					<view class="flex align-center justify-center" style="font-size: 20rpx;margin-top: 21rpx;">
						<view class="left flex justify-center align-center">
							结束时间
						</view>
						<view class="right flex justify-center align-center text-white">
							<!-- {{util.timestampToTime(all.compound_time)}} -->
							{{timeEnd}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="text-center bg" style="padding-top: 20rpx;position: relative;">
			<!-- <image src="../../static/my/yuanbg.png" style="width: 100%;height: 750rpx;position: absolute;left: 0;top: 0;" mode=""></image> -->
			<image :src="all.master_map"
				style="width: 415rpx;height: 415rpx;border-radius: 20rpx;border: solid 6rpx #19A2FF;" mode=""></image>
			<view class="margin-top-sm flex align-center justify-center">
				<image src="/static/home/xianz.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
				<view class="text-blue"
					style="border: solid 1rpx #1E2127;display: inline-block;padding: 12rpx 31rpx;border-radius: 12rpx;z-index: 9;">
					{{all.goods_name}}
				</view>
				<image src="/static/home/xianr.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
			</view>
			<view class="flex align-center justify-around" style="padding: 28rpx 100rpx;">
				<view class="flex align-center justify-center" style="font-size: 20rpx;z-index: 9;">
					<view class="left flex justify-center align-center">
						限量
					</view>
					<view class="right2 flex justify-center align-center text-white">
						{{all.limit_number}}份
					</view>
				</view>
				<!-- <view class="" style="border: solid 1rpx #0042FF;color: #0042FF;padding: 2rpx 11rpx;border-radius: 4rpx;display: inline-block;z-index: 9;">
					剩余{{all.goods_number}}份
				</view> -->
			</view>
		</view>
		<view class="flex align-center justify-center flex-wrap margin-top-lg">
			<view @click="hecheng" class="flex align-center justify-center"
				:class="all.compound_status != 1 ? 'bgbtn' : 'bgbtnwc text-white'" style="font-size: 48rpx;">
				{{all.compound_status != 1 ? '材料不足' : '立即合成'}}
			</view>
			<!-- <view class="col-999 w-all text-center">
				每位用户只限合成1次
			</view> -->
		</view>
		<!-- 合成所需藏品 -->
		<view class="bg-white margin radius12 margin-top-sm" style="padding: 56rpx 40rpx;margin-top: 79rpx;">
			<view class="flex align-center justify-center">
				<image src="/static/home/xianz.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
				<view class="text-black font32" style="padding: 0rpx 54rpx;">
					合成所需藏品
				</view>
				<image src="/static/home/xianr.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
			</view>
			<view class="margin-top-lg flex flex-wrap align-center">
				<view class="po-rela synthesisChild" style="margin-bottom:10rpx;" v-for="(item,index) in all.compound" :key="index">
					<view class="text-white flex align-center justify-center bfb">
						{{item.compound_goods_need}}
					</view>
					<view class="hb" v-if="!item.compound_goods_status"></view>
					<image :src="item.compound_goods_image"
						style="width: 181rpx;height: 181rpx;border-radius: 14rpx;border: solid 1rpx #FFB033;" mode="">
					</image>
				</view>
			</view>
		</view>
		<!-- 合成说明 -->
		<view class="bg-white margin radius12 margin-top-sm" style="padding: 56rpx 40rpx;">
			<view class="flex align-center justify-center">
				<image src="/static/home/xianz.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
				<view class="text-black font32" style="padding: 0rpx 54rpx;">
					合成说明
				</view>
				<image src="/static/home/xianr.png" style="width: 112rpx;height: 20rpx;" mode=""></image>
			</view>
			<view class="margin-top-lg" style="line-height: 46rpx;">
				{{all.compound_explain}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				timer: null,
				all: {},
				timeEnd: '',
				id: ''
			}
		},
		onLoad(e) {
			e.id ? this.id = e.id : '';
			this.getinfo();
		},
		methods: {
			getinfo() {
				this.util.request('goods/compound_details', {
					id: this.id
				}).then(res => {
					this.all = res;
					let _this = this;
					let date = new Date().getTime()
					let endTime = new Date(_this.all.compound_time_text).getTime()
					console.log(date,endTime,endTime - date);
					if(date - endTime > 0){
						_this.timeEnd = '已结束'
					}else{
						_this.timeEnd = _this.all.compound_time_text
						// this.timer = setInterval(function() {
						// 	_this.timeEnd = _this.util.secChange(_this.all.end_time);
						// 	// _this.timeEnd = _this.all.end_time
						// 	_this.all.end_time--;
						// }, 1000)
					}
					
				// 	this.timer = setInterval(function() {
				// 		_this.timeEnd = _this.util.secChange(_this.all.residue_time);
				// 		_this.all.residue_time--;
				// 	}, 1000)
				})
			},
			hecheng() {



				// 普通合成
				this.util.request('goods/compound', {
					id: this.id
				}).then(res => {
					this.util.showMsg('合成成功', function() {
						uni.navigateBack({
							delta: 1
						})
					})
					this.getinfo();
					// setTimeout(()=>{

					// },2000)
					// this.util.showMsg('合成成功', 1000, this.util.backTo(1, 1000))
					// this.getinfo();
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.bg {
		width: 630rpx;
		height: 648rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 20rpx 0px rgba(0, 0, 0, 0.10000000149011612);
		border-radius: 40rpx;
		margin: 0 auto;
	}

	.left {
		background: #3B3F47;
		padding: 4rpx 8rpx;
		color: #fff;
		border-radius: 10rpx 0rpx 0rpx 10rpx;
	}

	.right {
		color: #444;
		padding: 4rpx 8rpx;
		border-radius: 0rpx 10rpx 10rpx 0rpx;
		border: 1rpx solid #3B3F47;
	}
	.right2{
		color: #444;
		padding: 2rpx 8rpx;
		border-radius: 0rpx 10rpx 10rpx 0rpx;
		border: 1rpx solid #3B3F47;
	}
	.titlebg {
		width: 510rpx;
		height: 172rpx;
		background: #FFFFFF;
		box-shadow: 0px 12rpx 24rpx 0px rgba(103.0000014603138, 169.00000512599945, 255, 0.16078431904315948);
		border-radius: 40rpx;
		padding-bottom: 20rpx;
	}

	.bgbtn {
		width: 661rpx;
		height: 149rpx;
		background: url('@/static/my/hcbtnbg.png') no-repeat;
		background-size: cover;
		color: #1E2020;
	}

	.bgbtnwc {
		width: 661rpx;
		height: 258rpx;
		background: url('@/static/hc.png') no-repeat;
		background-size: cover;
		color: white;
	}

	.bfb {
		width: 80rpx;
		height: 32rpx;
		border-radius: 16rpx;
		border: solid 1rpx white;
		background-color: #E40016;
		position: absolute;
		top: -16rpx;
		right: -16rpx;
		z-index: 9;
	}

	.hb {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		position: absolute;
		left: 0;
		right: 0;
		z-index: 5;
		border-radius: 14rpx;
	}
	.synthesisChild{
		margin-right: 35rpx;
		margin-bottom: 35rpx;
	}
	.synthesisChild:nth-child(3n){
		margin-right: 0;
	}
</style>