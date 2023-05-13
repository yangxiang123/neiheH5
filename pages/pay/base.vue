<template>
	<view class="">
		<!-- <web-view :src="url" style="width: 100%;height: 100vh;"></web-view> -->
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
			
			document.querySelector('body').innerHTML =this.url;
			document.forms[0].submit()

			console.log(this.url)
		},
		methods: {
			
		}
	}
</script>

<style>
</style>