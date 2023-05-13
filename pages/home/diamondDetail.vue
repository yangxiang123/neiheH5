<template>
	<view class="diamond_wrap">
		<u-sticky offset-top='0'>
			<u-tabs :list="tabs" bold :is-scroll="true" active-color='#000' :bar-style='barStyle'  :current="act" @change="changeTab"></u-tabs>
			<!-- <view class="tabs_wrap">
				<view class="tabs">
					<view :class="act == index?'tabact':'tab_list'" v-for="(item,index) in tabs" :key="index" @click="changeTab(index,item)">{{item.name}}
						<view class="line" v-if="act == index"></view>
					</view>
				</view>
				
			</view> -->
		</u-sticky>
		<view class="select_wrap">
			<view :class="isopenTime?'select_time be_box':'select_time'" @click="changeType('isopenTime')">
				<text>2022年1月</text>
				<text :class="isopenTime?'open':'close'" >▲</text>
			</view>
			<view :class="isopenType?'select_type be_box':'select_type'" @click="changeType('isopenType')">
				<text>黑钻</text>
				<text :class="isopenType?'open':'close'">▲</text>
			</view>
		</view>
		<view class="list_wrap" :style="{'display': show ? 'block' : 'none'}">
			
			<view class="list_item_wrap">
				<view v-show="isopenTime" class="list_item" v-for="(item,index) of 10" @click="change('isopenTime',index)">
					<u-icon :style="{'display': list_item_wrap == index ? 'inline-block' : 'none'}" name="checkbox-mark" color="#EB6534"></u-icon>
					<text :class="selectTime == index ? 'selectItem' : ''">2022年2月</text>
				</view>
			</view>
			<view class="list_item_wrap">
				<view v-show="isopentype" class="list_item" v-for="(item,index) of 10" @click="change('isopenTime',index)">
					<u-icon :style="{'display': selectTime == index ? 'inline-block' : 'none'}" name="checkbox-mark" color="#EB6534"></u-icon>
					<text :class="selectTime == index ? 'selectItem' : ''">2022年2月</text>
				</view>
			</view>
		</view>
		<!-- <view class="content">
			<view class="list_item" v-for="item of 30 ">
				<text>金钻</text>
				<text>+1000</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data(){
			return{
				iconStyle:{
					backgroundColor: '#C7A363',
					color: '#FDE0BE',
					borderRadius: '50%',
					padding: '6rpx',
					marginLeft:'10rpx'
				},
				act: 0,
				tabsList:[],
				page:1,
				active_item:{
					color: '#fff !important',
					fontWeight: 'bolder',
					background: '#00CBD7',
				},
				list: [],
				tabs:[],
				isLight:true,
				isopenTime:false,
				isopenType:false,
				show:false,
				selectTime:2,
				selectType:3,
				barStyle:{
					'backgroundColor':'#00DFEC'
					
				}
			}
		},
		onShow() {
			this.getTabs()
		},
		methods:{
			getTabs(){
				this.util.request('index/new_types').then(res => {
					this.tabs = res
					this.tabsList = this.tabs[this.act].children
					// this.getlist()
				})
			},
			changeTab(index,item) {
				this.page = 1
				// uni.showLoading({
				// 	mask: true
				// })
				this.act = index
				console.log(this.act);
				// this.tabsList = item.children
				
				// this.getlist()
			},
			changeType(text){
				
				if(text == 'isopenTime'){
					this.isopenType = false
					this.isopenTime = !this.isopenTime
				}else{
					this.isopenType = !this.isopenType
					this.isopenTime = false
				}
				(this.isopenTime || this.isopenType) ? this.show = true : this.show = false
			},
			change(typeName,index){
				if(typeName == 'isopenTime'){
					this.selectTime = index
					this.show = false
					this.isopenTime = false
					this.isopenType = false
				}else{
					this.selectType = index
					this.show = false
					this.isopenTime = false
					this.isopenType = false
				}
			},
			
		},
	}
</script>

<style lang="scss">
	.tabs_wrap{
		padding-top: 30rpx;
		transform: translateY(-25rpx);
		background-color: #fff;
	}
	.tabs {
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		// background-color: #fff;
	
		.tabact {
			height: 70rpx;
			line-height: 40rpx;
			padding-bottom: 30rpx;
			color: #000;
			font-weight: 700;
			font-size: 36rpx;
			margin-right: 40rpx;
	
			.line {
				width: 60rpx;
				height: 10rpx;
				border-radius: 10rpx;
				background-color: #00DFEC;
				margin-left: 50rpx;
				margin-top: 20rpx;
			}
		}
	
		.tab_list {
			height: 70rpx;
			color: rgba(0, 0, 0, .6);
			margin-right: 40rpx;
			font-weight: 400;
			font-size: 30rpx;
			// padding-bottom: 30rpx;
		}
	
	}
	.select_wrap{
		display: flex;
		padding: 30rpx;
		background-color: #FAFAFA;
		.select_time{
			background-color: #EEEEEE;
			padding: 8rpx 14rpx;
			width: 190rpx;
		}
		.close{
			display: inline-block;
			color: #949494;
			transform:rotate(180deg);
			font-size: 24rpx;
		}
		.open{
			display: inline-block;
			color: #EB602E;
			font-size: 24rpx;
		}
		.select_type{
			text-align: center;
			width: 190rpx;
			margin-left: 30rpx;
			background-color: #EEEEEE;
			padding: 8rpx 14rpx;
		}
	}
	.list_item_wrap{
		// padding: 30rpx;
		margin:0 30rpx 20rpx 30rpx;
		background-color: #EEEEEE;
		border-radius: 0 20rpx 20rpx 20rpx;
	}
	.list_wrap{
		height: 500rpx;
		width: 100vw;
		background-color: #F5F5F5;
		overflow-y: scroll;
		
		.list_item{
			line-height: 70rpx;
			padding-left: 40rpx;
			.selectItem{
				color: #EC762E;
				font-weight: 600;
				margin-left: 20rpx;
			}
		}
	}
	.be_box{
		position: relative;
	}
	.be_box::after{
		position: absolute;
		content: '';
		width:100%;
		height: 30rpx;
		top: 100%;
		background-color: #EEEEEE;
		left: 0%;
	}
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		.list_item{
			width: 80vw;
			padding: 10rpx 30rpx;
			display: flex;
			justify-content: space-between;
			
		}
	}
</style>