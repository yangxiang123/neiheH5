<template>
	<view>
		<!-- 礼物弹窗 -->
		<view class="cu-modal bottom-modal " :class="show?'show':''">
			<view class="cu-dialog  bg-no" @tap.stop="">
				<view class=" bg-white padding-left-sm padding-right-sm radius20">
					<view class="padding" v-for="(item,index) in list" :key="index" :class="
				index==0?'':'bor-t-E5'" @tap="btnModalTab(index)">
						{{item}}
					</view>
				</view>
				<view class="padding margin-top-sm margin-bottom-sm bg-white col-999" style="border-radius: 24upx;"
					@tap="btnModalTab(-1)">
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "btn-modal",
		data() {
			return {};
		},
		props: {
			show: '',
			list: ''
		},
		methods: {
			btnModalTab(e) {
				this.$emit('btnModalTab', e);
			}
		}

	}
</script>

<style>

</style>
