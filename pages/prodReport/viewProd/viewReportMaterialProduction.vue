<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white">
					Biểu hiệu chỉnh máy rà kim
				</span>
				<view class="flex justify-center items-center">
				</view>
			</view>
		</view>
		<!-- DETAIL FORM -->
		<view class="flex h-screen bg-center bg-cover">
			<view class="w-full mx-auto z-10">
				<view class="flex flex-col">
					<view class="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
						<view class="flex-auto justify-evenly">
							<view class="flex items-center justify-between">
								<view class="flex items-center">
									<span class="font-semibold">Apache Footwear Vietnam</span>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-2">
							</view>
							<view class="flex justify-center items-center text-center">
								<span class="font-bold text-blue-500 text-[20px]">THÔNG TIN CƠ BẢN</span>
							</view>
							<view class="grid grid-cols-2 grid-rows-1 gap-8 mt-5">
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="calendar"></view>
									<view class="font-bold px-2">{{ formatDate(data.DATE_REPORT) }}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="clock"></view>
									<view class="font-bold px-2">{{ formatTime(data.TIME_REPORT) }}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="user"></view>
									<view class="font-bold px-2">{{data.STAFF_CHECK}}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<view class="font-bold px-2">{{data.PO}}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<view class="font-bold px-2">{{data.ART}}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<view class="font-bold px-2">{{data.MODEL}}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="location"></view>
									<view class="font-bold px-2">{{data.LINE}}</view>
								</view>
								<view class="flex items-center border-b border-gray-300 pb-2">
									<view class="pen"></view>
									<view class="font-bold px-2">{{data.REMARK}}</view>
								</view>
							</view>
							<view class="border-b border-dashed border-black border-b-2 my-2">
							</view>
							<scroll-view scroll-y="true" style="overflow-y: auto; height: calc(79vh - 300px);" >
								<view class="flex justify-center items-center text-center">
									<span class="font-bold text-blue-500 text-[20px]">DỮ LIỆU</span>
								</view>
								<view class="flex flex-col">
									<view class="grid grid-cols-2 grid-rows-1 gap-2 space-y-2 mt-2">
										<view class="flex flex-col gap-4">
											<view class="font-bold">Tên liệu :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<view class="font-bold px-2">{{showMaterialName(data.MATERIAL).text}}</view>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<view class="font-bold">Vị trí 1 :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<view class="font-bold px-2">{{data.MATERIAL_VT_1}}</view>
											</view>
										</view>
										
										<view class="flex flex-col gap-4">
											<view class="font-bold">Vị trí 2 :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<view class="font-bold px-2">{{data.MATERIAL_VT_2}}</view>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<view class="font-bold">Vị trí 3 :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<view class="font-bold px-2">{{data.MATERIAL_VT_3}}</view>
											</view>
										</view>
										<view class="flex flex-col gap-4">
											<view class="font-bold">Trung bình :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<span v-if="data" :class="[caculateAverage(data).color, 'font-bold px-2']">
												    {{ `${caculateAverage(data).average.toFixed(1)}%` }}
												</span>
												<view v-else>
												  Không có dữ liệu để tính toán
												</view>
											</view>
										</view>
										<view class="flex flex-col gap-4">
										    <view class="font-bold">Kết quả :</view>
											<view class="flex items-center border-b border-gray-300 pb-2">
												<view class="pen"></view>
												<span v-if="data" :class="[caculateAverage(data).color, 'font-bold px-2']">
												    {{ `${caculateAverage(data).text}` }}
												</span>
												<view v-else>
												  Không có dữ liệu để tính toán
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="border-b border-dashed border-black border-b-2 my-2">
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
						return {text: 'DA'};
					case 2:
						return {text: 'BÔNG,TƠ TẰM VÀ SỢI TỔNG HỢP'};
					case 3: 
						return {text: 'TPU/PVC'};
					case 4:
						return {text: 'GIẤY ĐÓNG GÓI'};
					case 5:
						return {text: 'HỘP TRONG'};
					case 5:
						return {text: 'THÙNG NGOÀI'};
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
					url: '/pages/prodReport/prodMaterialProduction'
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
	
	.user {
		background-image: url('/static/user.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
	}
	
	.clock {
		background-image: url('/static/clock.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
	}
	
	.location {
		background-image: url('/static/location.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
	}
	
	.calendar {
		background-image: url('/static/calendar.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
	}
	
	.pen {
		background-image: url('/static/pen.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 25px;
		height: 25px;
	}
	
	.checkbox-group {
	  display: flex;
	  flex-direction: column;
	  gap: 16px; /* Khoảng cách giữa các label */
	}
	
	.checkbox-label {
	  display: flex;
	  font-weight: bolder;
	  font-size: 20px;
	  align-items: center;
	  gap: 8px; /* Khoảng cách giữa checkbox và văn bản */
	  padding: 8px; /* Khoảng cách bên trong */
	  border: 1px solid #e5e7eb; /* Viền màu xám nhạt */
	  border-radius: 8px; /* Bo tròn các góc */
	}
</style>