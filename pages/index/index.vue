<template>
  <view class="content">
    <view
      class="bg-[url(https://pic1.zhimg.com/v2-3ee20468f54bbfefcd0027283b21aaa8_720w.jpg)] bg-[length:100%_100%] bg-no-repeat w-screen h-[41.54vw]">
    </view>

	<view class="flex mt-[200px]">
		<button class="font-semibold bg-blue-400 text-white" @click="doing()">Click me...</button>
	</view>

  </view>
</template>


<script>
	export default {
		name: 'menu',
		methods: {
			doing() {
				uni.navigateTo({
					url: '/pages/homePage/homePage'
				})
			}
		}
	}
</script>
