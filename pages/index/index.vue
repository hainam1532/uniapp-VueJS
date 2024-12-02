<template>
	 <view class="h-screen w-full bg-[#407bff] flex flex-col">
		<view class="flex flex-col p-4 gap-2">
		  <!-- Header with Title and Button -->
		  <view class="flex justify-between items-center">
		    <!-- Left Text -->
		    <view class="text-3xl font-bold text-white">
		      Báo biểu - QC
		    </view>
		
		    <!-- Button aligned to the right -->
		    <view class="return" @click="backHome()"></view>
		  </view>
		
		  <!-- Subtext -->
		  <p class="text-sm font-semibold text-gray-200 ml-4">Chọn báo biểu</p>
		</view>
		
		<view class="bg-white rounded-t-3xl size-full mx-auto shadow-lg">
			<view class="flex flex-col">
				<view class="flex flex-col gap-2">
					<view class="font-bold text-xl p-4">
						1. Biểu IQC
					</view>
					<view class="grid grid-cols-2 grid-rows-1 gap-4 p-2">
						<button @click="goMaterialIQC()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Độ ẩm liệu IQC</span>
						</button>
						
						<button @click="goCheckPhomIQC()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Theo dõi phom</span>
						</button>
					</view>
					
					<view class="font-bold text-xl p-4">
						2. Biểu QC sản xuất
					</view>
					<view class="grid grid-cols-2 grid-rows-3 gap-4 p-2">
						<button @click="goReportBC()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Giày B&C hằng ngày</span>
						</button>
						
						<button @click="goNeedleCorrection()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Hiệu chỉnh rà kim</span>
						</button>
						
						<button @click="goOuterBoxSeal()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Tem niêm phong thùng ngoài</span>
						</button>
						
						<button @click="goMaterialProduction()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Độ ẩm liệu khu vực sản xuất</span>
						</button>
						
						<button @click="goControlOuterBox()" class="flex flex-col items-center justify-center rounded-lg border border-gray-800 w-full mx-auto shadow-lg">
							<view class="logo mt-4"></view>
							<span class="font-semibold text-[14px]">Quản khống tem thùng ngoài</span>
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
				iconType: []
			}
		},
		methods: {
			goMaterialIQC() {
				uni.navigateTo({
					url: '/pages/iqcReport/iqcMaterial'
				})
			},
			goCheckPhomIQC() {
				uni.navigateTo({
					url: '/pages/iqcReport/iqcCheckPhom'
				})
			},
			goReportBC() {
				uni.navigateTo({
					url: '/pages/prodReport/prodReportBC'
				})
			},
			goNeedleCorrection() {
				uni.navigateTo({
					url: '/pages/prodReport/prodNeedleCorrection'
				})
			},
			goOuterBoxSeal() {
				uni.navigateTo({
					url: '/pages/prodReport/prodOuterBoxSeal'
				})
			},
			goMaterialProduction() {
				uni.navigateTo({
					url: '/pages/prodReport/prodMaterialProduction'
				})
			},
			goControlOuterBox() {
				uni.navigateTo({
					url: '/pages/prodReport/prodControlOuterBox'
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


<style scoped>
	.logo {
	  background-image: url('/static/file.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 40px;
	  height: 40px;
	}
	
	.return {
	  background-image: url('/static/return.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 40px;
	  height: 40px;
	}
</style>