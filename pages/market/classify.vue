<template>
	<view class="">
		<u-navbar :is-back="false" title="分类">
			<u-icon name='arrow-left' style='margin-left: 20rpx;' size='40' @click='showmodal = true'></u-icon>
			<view class="set" @click.stop="changeClassify">
				<text>确认</text>
			</view>
			
		</u-navbar>
		<view class="classify_action">
			<view class="title">
				<text>我的分类</text>
			</view>
			<view class="card_list">
				<view class="card_cell_gd">
					<text>我的关注</text>
				</view>
				<view class="card_cell_gd">
					<text>推荐</text>
				</view>
				<view class="card_cell_gd">
					<text>全部</text>
				</view>
				<view class="card_cell" v-for="item of classify_action_list" @click="deleteClassify(item)" >
					<text>{{item.text}}</text>
				</view>
			</view>
			
			<view class="title" style="margin-top: 20rpx;">
				<text>其他分类</text>
			</view>
			<view class="card_list">
				<view class="card_cell_un" v-for="item of classify_unaction_list" @click="addClassify(item)">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<u-modal v-model="showmodal" title='' :cancel-style='cancelstyle' :confirm-style='confirmstyle' :content="contentmodal" show-cancel-button @confirm='confirm' @cancel='cancel'></u-modal>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				classify_action_list:[
					{text:'aaa'},
					{text:'bbb'},
					{text:'ccc'},
					{text:'ddd'},
				],
				classify_unaction_list:[
					{text:'eee'},
					{text:'fff'},
					{text:'ggg'},
					{text:'hhh'},
				],
				showmodal:false,
				contentmodal:'确定保存现在的分类排序吗？',
				cancelstyle:{
					'border': '2rpx solid',
					'border-radius': '15rpx',
					'background-color': '#fff',
					// 'width':'200rpx',
					'height':'90rpx'
				},
				confirmstyle:{
					'background-color': '#000',
					'border-radius': '15rpx',
					'color': '#fff',
					// 'width':'200rpx',
					'margin-left':'30rpx',
					'height':'90rpx'
				}
			}
		},
		onLoad() {
			this.get_classify_action_list()
		},
		onUnload() {
			this.showmodal = true
			console.log('页面离开了');
			return
		},
		methods:{
			back(){
				this.util.backTo()
			},
			confirm(){
				//保存当前选项并返回
				this.back()
			},
			cancel(){
				//取消保存当前选项并返回
				this.back()
			},
			get_classify_action_list(){
				
			},
			addClassify(item){
				this.classify_unaction_list.forEach((i,index)=>{
					if(i == item){
						this.classify_unaction_list.splice(index,1)
					}
				})
				this.classify_action_list.push(item)
			},
			deleteClassify(item){
				this.classify_action_list.forEach((i,index)=>{
					if(i == item){
						this.classify_action_list.splice(index,1)
					}
				})
				this.classify_unaction_list.push(item)
			},
			changeClassify(){
				
				//保存当前选项并返回
				this.back()
			}
		}
	}
</script>

<style lang="scss">
	.set {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
		text{
			font-weight: 600 !important;
			color: #EB602E;
			font-size: 30rpx;
		}
	}
	/deep/ .u-title{
		font-weight: 600 !important;
	}
	.classify_action{
		padding: 40rpx 30rpx;
		background-color: #F5F5F5;
		min-height: 100vh;
	}
	.title{
		font-size: 32rpx;
		// line-height: 32rpx;
		letter-spacing: 1rpx;
		color: #000;
		font-weight: 600;
	}
	.card_list{
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
		.card_cell_gd{
			width: 218rpx;
			height: 88rpx;
			border-radius: 20rpx;
			margin-right: 18rpx;
			background-color: #fbfbfb;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			margin-bottom: 30rpx;
			color: rgba(0,0,0,.4);;
		}
		.card_cell_gd:nth-child(3n){
			margin-right: 0rpx;
		}
		.card_cell:nth-child(3n){
			margin-right: 0rpx;
		}
		.card_cell{
			width: 218rpx;
			height: 88rpx;
			border-radius: 20rpx;
			margin-right: 18rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			margin-bottom: 30rpx;
		}
		.card_cell::after{
			position: absolute;
			content: '-';
			border-radius: 50%;
			background-color: #FD9C79;
			color: #fff;
			width: 40rpx;
			height: 40rpx;
			font-size: 60rpx;
			line-height: 32rpx;
			font-weight: 500;
			text-align: center;
			top: -10rpx;
			right: -10rpx;
		}
		.card_cell_un:nth-child(3n){
			margin-right: 0rpx;
		}
		.card_cell_un{
			width: 218rpx;
			height: 88rpx;
			border-radius: 20rpx;
			margin-right: 18rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			margin-bottom: 30rpx;
		}
		.card_cell_un::after{
			position: absolute;
			content: '+';
			border-radius: 50%;
			background-color: #FD9C79;
			color: #fff;
			width: 40rpx;
			height: 40rpx;
			font-size: 40rpx;
			line-height: 40rpx;
			font-weight: 500;
			text-align: center;
			top: -10rpx;
			right: -10rpx;
		}
	}
	// /deep/ .uicon-minus{
	// 	background-color: #EB602E;
	// 	// color: #fff;
	// 	border-radius: 50%;
	// 	padding: 10rpx;
	// 	color: #fff;
	// 	position: absolute;
	// 	transform: translate(20rpx,-20rpx);
	// }
	/deep/ .u-model{
		padding: 0 30rpx 30rpx 30rpx;
	}
	
</style>