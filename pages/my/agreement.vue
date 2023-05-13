<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="padding">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				content: '',
				title: ''
			}
		},
		onLoad(e) {
			e.id ? this.id = e.id : '';
			this.getcontent();
		},
		methods: {
			getcontent() {
				this.util.request('common/article', {
					id: this.id
				}).then(res => {
					this.content = res.content;
					this.title = res.title;
				})
			}
		}
	}
</script>

<style>
</style>