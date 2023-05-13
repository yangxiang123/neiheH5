<template>
	<view class="" v-show="isshow">
		<view class="flex align-center justify-center" style="width: 100vw;height: 100vh;position: fixed;left: 0;top: 0;z-index: 999;background-color: rgba(0, 0, 0, .4);">
			<view class="" id="c1" ref="demo"></view>
		</view>
	</view>
</template>

<script>
	// import dz from '../dz/dz.js'
	export default {
		data() {
			return {
				
			}
		},
		props:{
			isshow: Boolean
		},
		// onLoad(e) {
		// 	var script = document.createElement('script');
		// 	script.src = 'https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js';
		// 	script.crossorigin = 'anonymous';
		// 	document.head.appendChild(script)
		// },
		mounted() {
			let that = this;
			setTimeout(function(){
				that.login()
			},150)
		},
		methods: {
			login(){
				let that = this;
				var myCaptcha = _dx.Captcha(document.getElementById('c1'), {
				  appId: 'b7230220f0766bac5281031ecf354a04', //appId，在控制台应用管理或应用配置模块获取
				  apiServer: '72948470863550b0c189a586445096ea',  
				 // apiServer域名地址在控制台页面->无感验证->应用管页面左上角获取，必须填写完整包括https://。
				  success: function (token) {
					that.$emit('success_token', token)
					
					that.login()
				    // 获取验证码token，用于后端校验，注意获取token若是sl开头的字符串，则是前端网络不通生成的降级token,请检查前端网络及apiServer地址。
				  }
				})
			}
		}
	}
</script>

<style>
</style>