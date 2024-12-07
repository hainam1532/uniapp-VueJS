<template>
	<view class="flex flex-col h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white">
		<view class="flex justify-between p-4">
			<view class="return" @click="backMenu()"></view>
		</view>
		
		<view class="flex p-2">
			<span class="font-bold text-2xl">Thông tin chi tiết</span>
		</view>
		
		<view class="flex h-screen overflow-x-auto">
			<view class="size-full mx-auto z-10 rounded-t-3xl">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
								<svg class="w-6 h-6 text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								  <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z"/>
								</svg>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5"></view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">THÔNG TIN CƠ BẢN</span>
							</view>
							<view class="grid grid-cols-3 grid-rows-1 gap-4 mt-4 px-2 ml-8" v-if="data">
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">ID:</span>
									<h2 class="font-bold ml-10">{{ data.ID }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Ngày kiểm:</span>
									<h2 class="font-bold ml-10">{{ formatDate(data.DATE_REPORT) }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Chuyền:</span>
									<h2 class="font-bold ml-10">{{ data.DEPARTMENT_CODE }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">PO:</span>
									<h2 class="font-bold ml-10">{{ data.PROD }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">ART:</span>
									<h2 class="font-bold ml-10">{{ data.ART }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Hình thể:</span>
									<h2 class="font-bold ml-10">style</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Ghi chú:</span>
									<h2 class="font-bold ml-10">{{ data.ISSUE }}</h2>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -right-2"></view>
							</view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">KIỂM TRA Ở FI</span>
							</view>
							<view class="grid grid-cols-2 grid-rows-2 gap-4 mt-4" v-if="data">
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Size B :</span>
										<h2 class="text-sm ml-5">{{ data.FI_SIZE_B }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Chân trái/phải :</span>
										<h2 class="text-sm ml-5">{{ data.FOOT_B_FI }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Số lượng B :</span>
										<h2 class="text-sm ml-10">{{ data.FI_QTY_B }}</h2>
									</view>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-blue-500">Nguyên nhân :</span>
									<h2 class="text-sm ml-10">{{ data.ISSUE_B_FI_1 }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-red-500">Tên nguyên nhân :</span>
									<h2 class="text-sm ml-5">{{ data.ISSUE_1}}</h2>
								</view>
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Size C :</span>
										<h2 class="font-bold ml-10">{{ data.FI_SIZE_C }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Chân trái/phải :</span>
										<h2 class="font-bold ml-10">{{ data.FOOT_C_FI }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Số lượng C :</span>
										<h2 class="font-bold ml-10">{{ data.FI_QTY_C }}</h2>
									</view>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-blue-500">Nguyên nhân :</span>
									<h2 class="text-sm ml-10">{{ data.ISSUE_C_FI_2 }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-red-500">Tên nguyên nhân :</span>
									<h2 class="text-sm ml-5">{{ data.ISSUE_2 }}</h2>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-blue-200 -mt-2 -right-2"></view>
							</view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-2xl text-blue-500">KIỂM TRA Ở SẢN XUẤT</span>
							</view>
							<view class="grid grid-cols-2 grid-rows-2 gap-4 mt-4" v-if="data">
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Size B :</span>
										<h2 class="text-sm ml-5">{{ data.LINE_SIZE_B }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Chân trái/phải :</span>
										<h2 class="text-sm ml-5">{{ data.FOOT_B_PROD }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Số lượng B :</span>
										<h2 class="text-sm ml-10">{{ data.LINE_QTY_B }}</h2>
									</view>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-blue-500">Nguyên nhân :</span>
									<h2 class="text-sm ml-10">{{ data.ISSUE_PROD_FI_1 }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-red-500">Tên nguyên nhân :</span>
									<h2 class="text-sm ml-5">{{ data.ISSUE_3}}</h2>
								</view>
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Size C :</span>
										<h2 class="font-bold ml-10">{{ data.LINE_SIZE_C }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Chân trái/phải :</span>
										<h2 class="font-bold ml-10">{{ data.FOOT_C_PROD }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Số lượng C :</span>
										<h2 class="font-bold ml-10">{{ data.LINE_QTY_C }}</h2>
									</view>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-blue-500">Nguyên nhân :</span>
									<h2 class="text-sm ml-10">{{ data.ISSUE_C_FI_2 }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold mb-2 px-5">
									<span class="text-red-500">Tên nguyên nhân :</span>
									<h2 class="text-sm ml-5">{{ data.ISSUE_4 }}</h2>
								</view>
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
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			loadData() {
			  this.data = null;
			  
			  // Lấy dữ liệu đã lưu từ bộ nhớ tạm
			  uni.getStorage({
			    key: 'selectedData',
			    success: (res) => {
			      this.data = res.data;
			      this.editableData = { ...this.data };
			    },
			    fail: () => {
			      console.error("Không tìm thấy dữ liệu trong bộ nhớ tạm");
			    }
			  });
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${day}/${month}/${year}`;
			},
			formatTime(timestamp) {
			    if (!timestamp) return '';
			
			    const date = new Date(timestamp);
			
			    if (isNaN(date.getTime())) return 'Invalid time';
			
			    let hours = date.getHours();
			    const minutes = String(date.getMinutes()).padStart(2, '0');
			    const seconds = String(date.getSeconds()).padStart(2, '0');
			    const ampm = hours >= 12 ? 'AM' : 'PM';
			
			    // Convert to 12-hour format
			    hours = hours % 12;
			    if (hours === 0) hours = 12;
			
			    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
			},
			backMenu() {
				uni.navigateTo({
					url: '/pages/prodReport/prodReportBC'
				})
			},
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
	
	.add {
	  background-image: url('/static/add.png');
	  background-size: contain;
	  background-repeat: no-repeat;
	  width: 30px;
	  height: 30px;
	  margin-top: 2px;
	  margin-left: 4px;
	}
</style>