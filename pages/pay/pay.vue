<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<u-navbar :is-back="false" title="汇元钱包">
		
		</u-navbar>
		<!-- #endif -->
		<web-view :src="url" style="width: 100%;height: 100vh;"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			this.url=uni.getStorageSync('url');
		},
		methods: {
			
		}
	}
</script>

<style>
</style>