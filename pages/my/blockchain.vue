<template>
	<view class="padding">
		<view class="bg-white radius20" style="padding: 47rpx 34rpx;">
			<view class="font36 text-bold">
				区块链地址
			</view>
			<view class="margin-top-lg">
				{{info.chain}}
			</view>
			
			<view class="flex align-center justify-center padding-bottom" style="margin-top: 125rpx;">
				<view @click="util.copy(info.chain)" class="btnbg font30" style="width: 484rpx;height: 82rpx;">
					复制
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onShow(e) {
			this.getinfo();
		},
		methods: {
			getinfo(){
				this.util.request('user/index', {}, 'POST').then(res => {
					this.info = res;
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
</style>