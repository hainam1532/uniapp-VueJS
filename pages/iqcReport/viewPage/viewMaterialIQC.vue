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
							<view class="flex flex-col gap-4" v-if="data">
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">ID:</span>
									<h2 class="font-bold ml-10">{{ data.ID }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Ngày kiểm:</span>
									<h2 class="font-bold ml-10">{{ formatDate(data.DATE_RECORD) }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Ngày nhập kho:</span>
									<h2 class="font-bold ml-10">{{ formatDate(data.DATE_WH) }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Thời gian:</span>
									<h2 class="font-bold ml-10">{{ formatTime(data.TIME_REPORT) }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Số lô:</span>
									<h2 class="font-bold ml-10">{{ data.MATERIAL_LOT }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Khu vực:</span>
									<h2 class="font-bold ml-10">{{ showMaterialName(data.MEASUREMENT_AREA).text }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Tên liệu:</span>
									<h2 class="font-bold ml-10">{{ data.NAME_MATERIAL }}</h2>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									<span class="text-blue-500">Ghi chú:</span>
									<h2 class="font-bold">{{ data.REMARK }}</h2>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
							</view>
							<view class="grid grid-cols-2 grid-rows-2 gap-4" v-if="data">
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Liệu</span>
										<h2 class="text-sm ml-5">{{ data.MATERIAL_NAMEE }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Trung bình</span>
										<span v-if="data" :class="[caculateAverage(data).color, 'text-xl ml-10']">
										    {{ `${caculateAverage(data).average.toFixed(1)}%` }}
										</span>
										<h2 v-else>
										  Không có dữ liệu để tính toán
										</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Nhân viên</span>
										<h2 class="text-sm ml-10">{{ data.STAFF_CHECK }}</h2>
									</view>
								</view>
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Vị trí 1</span>
										<h2 class="font-bold ml-10">{{ data.MATERIAL_VT_1 }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Vị trí 2</span>
										<h2 class="font-bold ml-10">{{ data.MATERIAL_VT_2 }}</h2>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										<span class="text-blue-500">Vị trí 3</span>
										<h2 class="font-bold ml-10">{{ data.MATERIAL_VT_3 }}</h2>
									</view>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-5">
							</view>
							<view class="flex flex-col justify-center items-center text-lg">
								<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
			caculateAverage(data) {
			  if (!data) {
			    console.error("Dữ liệu không hợp lệ: record is undefined");
			    return { text: 'Không có dữ liệu', color: 'text-gray-500', average: 0 };
			  }
			  
			  const vt1 = parseFloat(data.MATERIAL_VT_1);
			  const vt2 = parseFloat(data.MATERIAL_VT_2);
			  const vt3 = parseFloat(data.MATERIAL_VT_3);
			  
			  if (isNaN(vt1) || isNaN(vt2) || isNaN(vt3)) {
			    console.error("Dữ liệu không hợp lệ: Một trong các giá trị của MATERIAL_VT không hợp lệ");
			    return { text: 'Không có dữ liệu', color: 'text-gray-500', average: 0 };
			  }
			  
			  const averageCal = (vt1 + vt2 + vt3) / 3;
			  
			  if (averageCal < 17 && data.MATERIAL === 1) {
			    return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			  } else if (averageCal < 7 && data.MATERIAL === 2) {
			    return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			  } else if (averageCal < 2 && data.MATERIAL === 3) {
			    return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			  } else if (averageCal < 6 && (data.MATERIAL === 4 || data.MATERIAL === 5 || data.MATERIAL === 6)) {
			    return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			  } else {
			    return { text: 'Vượt tiêu chuẩn', color: 'text-red-400', average: averageCal };
			  }
			  
			},
			showMaterialName(measurementArea) {
				switch (measurementArea) {
					case 1:
						return {text: 'Liệu mới về'};
					case 2:
						return {text: 'Liệu lưu trữ trong khu vực đạt'};
					case 3: 
						return {text: 'Liệu chuẩn bị phát cho hiện trường'};
					default:
						return {text: 'Không xác định'};
				}
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
					url: '/pages/iqcReport/iqcMaterial'
				})
			},
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
	
	.return {
		  background-image: url('/static/return.png');
		  background-size: contain;
		  background-repeat: no-repeat;
		  width: 30px;
		  height: 30px;
		  margin-top: 2px;
		  margin-left: 4px;
		}
</style>