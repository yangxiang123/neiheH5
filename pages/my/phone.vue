<template>
	<view class="">
		<view class="text-center" style="padding-top: 109rpx;">
			<image :src="info.avatar" style="width: 220rpx;height: 220rpx;border-radius: 20rpx;box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);" mode=""></image>
		</view>
		<view class="text-center" style="margin-top: 66rpx;">
			<view class="font26">
				绑定手机号
			</view>
			<view v-if="info.mobile" class="margin-top-sm" style="font-size: 46rpx;">
				{{util.phoneMask(info.mobile)}}
			</view>
			<view class="col-999 font26" style="margin-top: 26rpx;">
				手机号可用于登录和找回密码
			</view>
		</view>
		<view class="flex align-center justify-center" style="margin-top: 140rpx;">
			<view @click="util.urlTo('codephone')" class="flex align-center justify-center font30" style="background-color: #E0E0E0;border-radius: 41rpx;width: 484rpx;height: 82rpx;">
				更换手机号
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
		onLoad(e) {
			this.getinfo();
		},
		methods: {
			getinfo(){
				this.util.request('user/index', {}, 'POST').then(res => {
					this.info = res;
				})
			},
			profile(e){
				let data;
				if(e != 'nickname'){
					data = {
						avatar: e
					}
				}else{
					data = {
						nickname: this.nickname
					}
				}
				this.util.request('user/profile', data, 'POST').then(res => {
					if(e == 'nickname'){
						this.modalName = '';
						this.nickname = '';
					}
					this.getinfo();
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