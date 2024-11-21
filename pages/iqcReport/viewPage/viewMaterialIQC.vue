<template>
	<view class="flex flex-col h-screen w-full bg-white">
		<view class="flex justify-between p-4">
			<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#407bff"></path> </g></svg>
		</view>
		
		<view class="flex p-2">
			<span class="font-bold text-2xl">Thông tin chi tiết</span>
		</view>
		
		<view class="flex flex-col items-center justify-center min-h-screen bg-center bg-cover">
			<view class="max-w-md size-full mx-auto z-10 bg-[#407bff] rounded-3xl">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5"></view>
							<view class="flex items-center">
								<view class="grid grid-cols-2 grid-rows-4 gap-4 text-sm" v-if="data">
									<view class="flex flex-col gap-2 font-semibold">
										ID:
										<span class="font-medium ml-10">{{ data.id }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Ngày kiểm:
										<span class="font-medium ml-10">{{ data.checkDate }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Ngày nhập kho:
										<span class="font-medium ml-10">{{ data.warehouseDate }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Thời gian:
										<span class="font-medium ml-10">{{ data.time }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Số lô:
										<span class="font-medium ml-10">{{ data.batchNumber }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Khu vực:
										<span class="font-medium ml-10">{{ data.area }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Tên liệu:
										<span class="font-medium ml-10">{{ data.materialName }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Ghi chú:
										<span class="font-medium ml-10">{{ data.note }}</span>
									</view>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -right-2"></view>
							</view>
							<view class="flex flex-col py-5 justify-center text-sm">
								<span class="font-bold text-center">APH IT - Software</span>
								<view class="barcode h-14 w-0 inline-block mt-4 relative left-auto"></view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  data: null,
			};
		},
		created() {
			this.loadData();
		},
		watch: {
			'$route.query.id': {
			  handler() {
				this.loadData();
			  },
			  immediate: true,
			},
		},
		methods: {
			loadData() {
				this.data = null;
				const id = this.$route.query.id;
				if (id) {
					const storedData = sessionStorage.getItem('selectedData');
					if (storedData) {
					  this.data = JSON.parse(storedData);
					} else {
					  console.error('Không tìm thấy dữ liệu trong sessionStorage');
					}
				} else {
					console.error('ID không tồn tại trong URL');
				}
			},
			backMenu() {
				uni.navigateTo({
					url: '/pages/iqcReport/iqcMaterial'
				})
			}
		},
	};
</script>

<style>
	.barcode {
		left: 50%;
		box-shadow: 1px 0 0 1px, 5px 0 0 1px, 10px 0 0 1px, 11px 0 0 1px, 15px 0 0 1px, 18px 0 0 1px, 22px 0 0 1px, 23px 0 0 1px, 26px 0 0 1px, 30px 0 0 1px, 35px 0 0 1px, 37px 0 0 1px, 41px 0 0 1px, 44px 0 0 1px, 47px 0 0 1px, 51px 0 0 1px, 56px 0 0 1px, 59px 0 0 1px, 64px 0 0 1px, 68px 0 0 1px, 72px 0 0 1px, 74px 0 0 1px, 77px 0 0 1px, 81px 0 0 1px, 85px 0 0 1px, 88px 0 0 1px, 92px 0 0 1px, 95px 0 0 1px, 96px 0 0 1px, 97px 0 0 1px, 101px 0 0 1px, 105px 0 0 1px, 109px 0 0 1px, 110px 0 0 1px, 113px 0 0 1px, 116px 0 0 1px, 120px 0 0 1px, 123px 0 0 1px, 127px 0 0 1px, 130px 0 0 1px, 131px 0 0 1px, 134px 0 0 1px, 135px 0 0 1px, 138px 0 0 1px, 141px 0 0 1px, 144px 0 0 1px, 147px 0 0 1px, 148px 0 0 1px, 151px 0 0 1px, 155px 0 0 1px, 158px 0 0 1px, 162px 0 0 1px, 165px 0 0 1px, 168px 0 0 1px, 173px 0 0 1px, 176px 0 0 1px, 177px 0 0 1px, 180px 0 0 1px;
		display: inline-block;
		transform: translateX(-90px);
	}
</style>