<template>
	<view class="min-h-screen bg-white flex flex-col relative">
		<!-- Circle -->
		<view class="quarter-circle"></view>
		<!-- Logo Section -->
		<view class="flex flex-col items-center flex-grow justify-center">
		  <img :src="logo" alt="" class="w-[180px] h-[200px]" />
		  <h1 class="text-3xl font-bold text-gray-800">Hệ thống báo biểu</h1>
		  <p class="text-sm tracking-wide text-gray-600">Report system</p>
		</view>

		<!-- Card Section -->
		<view class="bg-[#407bff] rounded-t-3xl size-full mx-auto p-8 shadow-lg text-center">
		  <h2 class="text-2xl text-white mb-2 font-bold">Welcome</h2>
		  <p class="text-sm text-gray-300 font-semibold text-black">
			Apache Footwear Vietnam
		  </p>
		  <!-- Buttons -->
		  <view class="grid grid-cols-2 grid-rows-1 gap-2 mt-6 space-x-4">
			<button
			  class="bg-white w-full text-black font-semibold rounded-full"
			  @click="goIndex()"
			>
			  <span>Báo biểu</span>
			</button>
			
			<button
			  class="bg-white w-full text-black font-semibold rounded-full"
			  @click="goDashboard()"
			>
			  <span>Dashboard</span>
			</button>
		  </view>
		</view>
	</view>
</template>

<script>
	import logo from '../asset/logo.png'
	export default {
	  name: "WelcomePage",
	  data() {
	    return {
	      logo,
	    };
	  },
	  methods: {
		goIndex() {
			uni.navigateTo({
				url: "/pages/index/index"
			})
		},
		goDashboard() {
			uni.navigateTo({
				url: '/pages/index/indexDashboard'
			})
		},
		goSetting() {
			uni.navigateTo({
				url: '/pages/settingPage/settingPage'
			})
		},
	  }
	  
	};
</script>

<style>
	.quarter-circle {
		position: absolute;
		top: 0;
		right: 0;
		width: 200px;
		height: 200px;
		background-color: #407bff;
		border-bottom-left-radius: 100%;
	}
</style>