<template>
	<view class="flex flex-col h-screen w-full bg-white">
		<view class="flex justify-between p-4">
			<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#407bff"></path> </g></svg>
		</view>
		
		<view class="flex p-2">
			<span class="font-bold text-2xl">Thông tin chi tiết</span>
		</view>
		
		<view class="flex h-screen bg-center bg-cover overflow-hidden">
			<view class="w-full mx-auto z-10 bg-[#407bff] rounded-t-3xl">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center my-1">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5"></view>
							<view class="grid grid-cols-2 grid-rows-2 gap-4 text-sm" v-if="data">
								<view class="flex flex-col gap-2 font-semibold">
									ID:
									<span class="font-medium ml-10">{{ data.ID }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Ngày kiểm:
									<span class="font-medium ml-10">{{ formatDate(data.DATE_RECORD) }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Ngày nhập kho:
									<span class="font-medium ml-10">{{ formatDate(data.DATE_WH) }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Thời gian:
									<span class="font-medium ml-10">{{ formatTime(data.TIME_REPORT) }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Số lô:
									<span class="font-medium ml-10">{{ data.MATERIAL_LOT }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Khu vực:
									<span class="font-medium">{{ showMaterialName(data.MEASUREMENT_AREA).text }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Tên liệu:
									<span class="font-medium ml-10">{{ data.NAME_MATERIAL }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Ghi chú:
									<span class="font-medium">{{ data.REMARK }}</span>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -right-2"></view>
							</view>
							<view class="grid grid-cols-2 grid-rows-2 gap-4" v-if="data">
								<view class="flex flex-col gap-2 font-semibold">
									Liệu
									<span class="text-sm ml-5">{{ data.MATERIAL_NAMEE }}</span>
								</view>
								<view class="flex flex-col gap-2 font-semibold">
									Trung bình
									<span v-if="data" :class="[caculateAverage(data).color, 'text-sm ml-10']">
									    {{ `${caculateAverage(data).average.toFixed(1)}%` }}
									</span>
									<span v-else>
									  Không có dữ liệu để tính toán
									</span>
								</view>
								<view class="flex col-span-2 justify-between items-center mb-2 px-5">
									<view class="flex flex-col gap-2 font-semibold">
										Vị trí 1
										<span class="font-medium ml-10">{{ data.MATERIAL_VT_1 }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Vị trí 2
										<span class="font-medium ml-10">{{ data.MATERIAL_VT_2 }}</span>
									</view>
									<view class="flex flex-col gap-2 font-semibold">
										Vị trí 3
										<span class="font-medium ml-10">{{ data.MATERIAL_VT_3 }}</span>
									</view>
								</view>
							</view>
							<view class="border-b border-dashed border-b-2 my-5">
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -left-2"></view>
								<view class="absolute rounded-full w-5 h-5 bg-[#407bff] -mt-2 -right-2"></view>
							</view>
							<view class="flex flex-col justify-center items-center text-lg">
								<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
</style>