<template>
	<view>
		<view class="text-xl" style="padding: 120upx 68upx;">
			客服：
			<view class="margin-top" @tap="util.copy(service)">
				{{service}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				service: ''
			}
		},
		onLoad() {
			this.getBase();
		},
		methods: {
			getUserInfo() {
				this.util.getUserInfo().then(res => {
					this.wx = res.userinfo.service;
				})
			},
			getBase() {
				this.util.request('common/sitesinfo').then(res => {
					this.service = res.service;
				})
			},
		}
	}
</script>

<style>
	page {
		background: url('@/static/zhucebg.png') no-repeat;
		background-size: cover;
		min-height: 100vh;
	}
</style>
