<template>
	 <view class="h-screen w-full bg-[#407bff] flex flex-col">
		<view class="flex flex-col p-4 gap-2">
		  <!-- Header with Title and Button -->
		  <view class="flex justify-between items-center">
		    <!-- Left Text -->
		    <view class="text-3xl font-bold text-white">
		      Dashboard - QC
		    </view>
		
		    <!-- Button aligned to the right -->
		    <view class="return" @click="backHome()"></view>
		  </view>
		
		  <!-- Subtext -->
		  <p class="text-sm font-semibold text-gray-200 ml-4">Chọn dashboard</p>
		</view>
		
		<view class="bg-white rounded-t-3xl size-full mx-auto shadow-lg">
			<view class="flex flex-col">
				<view class="flex flex-col gap-2">
					<view class="font-bold text-2xl p-4">
						Dashboard
					</view>
					<view class="grid grid-cols-1 grid-rows-1 gap-4 p-2">
						<button @click="goDashboardBC()" class="flex flex-col gap-2 bg-blue-500 items-center justify-center rounded-lg w-full mx-auto shadow-lg">
							<view class="diagram"></view>
							<span class="font-semibold text-lg text-white">Giày B&C</span>
						</button>
						
						<button @click="goDashboardNeedle()" class="flex flex-col gap-2 bg-[#f8773e] items-center justify-center rounded-lg w-full mx-auto shadow-lg">
							<view class="diagram2"></view>
							<span class="font-semibold text-lg text-white">Máy rà kim</span>
						</button>
						
						<button @click="goDashboardMaterialIQC()" class="flex flex-col gap-2 bg-[#637cdd] items-center justify-center rounded-lg w-full mx-auto shadow-lg">
							<view class="diagram3"></view>
							<span class="font-semibold text-lg text-white">Độ ẩm liệu IQC</span>
						</button>
						
						<button @click="goDashboardMaterialProduction()" class="flex flex-col gap-2 bg-[#47aac1] items-center justify-center rounded-lg w-full mx-auto shadow-lg">
							<view class="diagram4"></view>
							<span class="font-semibold text-lg text-white">Độ ẩm liệu sản xuất</span>
						</button>
					</view>
				</view>
			</view>
		</view>
	 </view>
</template>


<script>
	export default {
		name: 'menu',
		data() {
		    return {
		      data: []
		    };
		},
		methods: {
			goDashboardNeedle() {
				uni.navigateTo({
					url: '/pages/dashboardPage/dashboardNeedle'
				})
			},
			goDashboardMaterialIQC() {
				uni.navigateTo({
					url: '/pages/dashboardPage/dashboardMaterialIQC'
				})
			},
			goDashboardBC() {
				uni.navigateTo({
					url: '/pages/dashboardPage/dashboardBC'
				})
			},
			goDashboardMaterialProduction() {
				uni.navigateTo({
					url: '/pages/dashboardPage/dashboardMaterialProduction'
				})
			},
			backHome() {
				uni.navigateTo({
					url: '/pages/homePage/homePage'
				})
			}
		},
		onLoad() {
		}
	}
</script>

<style>
	.return {
		  background-image: url('/static/return.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
	.diagram {
		  background-image: url('/static/diagram.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 80px;
		  height: 80px;
		  margin-top: 8px;
		}
		
	.diagram2 {
		  background-image: url('/static/diagram2.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		 width: 80px;
		 height: 80px;
		  margin-top: 8px;
		}
		
	.diagram3 {
		  background-image: url('/static/diagram3.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 80px;
		  height: 80px;
		  margin-top: 8px;
		}
		
	.diagram4 {
		  background-image: url('/static/diagram4.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 80px;
		  height: 80px;
		  margin-top: 8px;
		}
</style>
