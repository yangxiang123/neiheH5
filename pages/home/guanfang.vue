<template>
	<view class="">
		<view class="padding">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				content:''
			}
		},
		methods:{
			getcontent(){
				this.util.request('common/article', {
					id: 9
				}).then(res => {
					this.content = res.content;
				})
			}
		},
		onLoad() {
			this.getcontent()
		}
	}
</script>

<style lang="scss">
	
</style>