<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<span class="font-semibold text-white py-1 border-b-2">Biểu đo độ ẩm liệu khu vực sản xuất</span>
				<view class="add" @click="toCreatePage()"></view>
			</view>
			<view class="flex flex-col size-full">
				<view class="flex flex-col p-2">
					<view class="font-semibold text-sm text-white">Chọn ngày :</view>
					<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-2">
						<picker class="border border-gray-300 rounded-lg font-semibold" mode="date" :value="startDate"
							@change="onStartDateChange">
							<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
						</picker>

						<picker class="border border-gray-300 rounded-lg font-semibold" mode="date" :value="endDate"
							@change="onEndDateChange">
							<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
						</picker>
					</view>
				</view>

				<view class="flex flex-col gap-2 p-2 w-full">
					<view class="font-semibold text-sm text-white">
						Tìm kiếm ( #PO ) :
					</view>
					<input
						class="w-full h-full bg-white font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						v-model="searchValue" type="text" autofocus placeholder="Tìm kiếm..." />
				</view>

				<view class="flex flex-col gap-2 w-full p-2">
					<button @click="onSearchChange()"
						class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
					<button @click="resetData()"
						class="w-full rounded-lg font-semibold bg-red-400 text-white">Reset</button>
					<view v-if="showToast" class="toast-container">
						<view class="flex gap-2 toast-content">
							<svg width="22px" height="22px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
								fill="#000000">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path fill="#036814"
										d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z">
									</path>
								</g>
							</svg>
							Thành công
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- data list -->
		<scroll-view 
			@scrolltolower="fetchData"
			scroll-y="true" 
			class="scroll-container size-full mx-auto shadow-xl p-4"
			style="overflow-y: auto; height: calc(190vh - 300px);"
		>
			<view v-for="(item, index) in dataList" :key="item.ID" @click="showDetail(item.ID)" class="grid grid-cols-3 grid-rows-1 gap-2 bg-white cursor-pointer shadow-lg rounded-xl p-4 mb-4">
				<p class="font-semibold text-[#214263]">
					Ngày kiểm : 
					<span class="text-gray-600 text-sm font-bold">
						{{ formatDate(item.DATE_REPORT) }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Bộ phận : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.LINE }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Thời gian : 
					<span class="text-gray-600 text-sm font-bold">
						{{ formatTime(item.TIME_REPORT) }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					#PO : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.PO }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					ART : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.ART || '0' }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					MODEL : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.MODEL || '0' }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Ghi chú : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.REMARK }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					QC : 
					<span class="text-gray-600 text-sm font-bold">
						{{ item.STAFF_CHECK }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Trung bình:
					<span v-if="item" :class="[showStatus(item).color, 'text-sm']">
					    {{showStatus(item).text}} - {{showStatus(item).average.toFixed(1)}}%
					</span>
					<span v-else>
					  Không có dữ liệu để tính toán
					</span>
				</p>
			</view>
			<view v-if="isLoading" class="loading-text">Đang tải...</view>
			<view v-if="startPage > totalPage" class="end-text">Không còn dữ liệu để tải</view>
		</scroll-view>
	</view>
</template>

<script>
	import axios from '../../axios.js'
	export default {
		data() {
			return {
				dataList: [],
				startDate: '',
				endDate: '',
				searchValue: '',
				startPage: 1,
				totalPage: 1000,
				isLoading: false
			}
		},
		mounted() {
			this.$nextTick(() => {
			    const scrollContainer = document.querySelector(".scroll-container");
			    if (scrollContainer) {
			      scrollContainer.scrollTop = 0; // Đặt lại vị trí cuộn
			    }
			  });
			this.fetchData();  
		},
		methods: {
			backMenu() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toCreatePage() {
				uni.navigateTo({
					url: '/pages/prodReport/insertProd/insertMaterialProduction'
				})
			},
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const day = String(date.getDate()).padStart(2, '0');
			    const month = String(date.getMonth() + 1).padStart(2, '0');
			    const year = date.getFullYear();
			    return `${year}/${month}/${day}`;
			},
			getDate(offset = 0) {
				const date = new Date();
				date.setFullYear(date.getFullYear() + offset);
				return this.formatDate(date);
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
			resetData() {
				this.startDate = '';
				this.endDate = '';
				this.searchValue = '';
				this.startPage = 1;
				this.dataList = [];
				this.fetchData();
			},
			onSearchChange() {
			  // Đặt lại `startPage` về 1 khi thay đổi `searchValue`
			  this.startPage = 1;
			  this.dataList = []; // Đặt lại dataList để tìm kiếm mới từ trang đầu tiên
			  this.fetchData(); // Gọi lại fetchData để truy vấn với searchValue mới
			},
			onStartDateChange(e) {
				const selectedDate = e.detail.value;
			    this.startDate = this.formatDate(selectedDate);
			  
			    if (new Date(this.endDate) < new Date(this.startDate)) {
			        this.endDate = this.startDate;
			    }
			},
			onEndDateChange(e) {
				const selectedDate = e.detail.value;
				this.endDate = this.formatDate(selectedDate);
			    console.log(this.endDate)
			},
			showStatus(passFail) {
			    const averageCal = (
			      parseFloat(passFail.MATERIAL_VT_1) + 
			      parseFloat(passFail.MATERIAL_VT_2) + 
			      parseFloat(passFail.MATERIAL_VT_3)
			    ) / 3;
			    			
			    if (averageCal <= 17 && passFail.MATERIAL === 1) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal <= 7 && passFail.MATERIAL === 2) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal <= 2 && passFail.MATERIAL === 3) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal <= 6 && (passFail.MATERIAL === 4 || passFail.MATERIAL === 5 || passFail.MATERIAL === 6)) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else {
			      return { text: 'Vượt tiêu chuẩn', color: 'text-red-400', average: averageCal };
			    }
			},
			showDetail(id) {
			  const selected = this.dataList.find((item) => item.ID === id);
			  if (selected) {
			    // Lưu trữ dữ liệu vào bộ nhớ tạm
			    uni.setStorage({
			      key: 'selectedData',
			      data: selected,
			      success: () => {
			        // Chuyển hướng đến trang viewCheckPhom
			        uni.navigateTo({
			          url: '/pages/prodReport/viewProd/viewReportMaterialProduction',
			        });
			      },
			      fail: (error) => {
			        console.error('Error saving selectedData:', error);
			      }
			    });
			  }
			},
			fetchData() {
			  // Tránh gọi API nếu đang tải hoặc đã tải hết các trang
			  if (this.isLoading || this.startPage > this.totalPage) {
			    console.log("Fetch skipped: Đang tải hoặc đã tải hết các trang.");
			    return;
			  }
			
			  this.isLoading = true;
			
			  uni.request({
			    url: 'http://10.30.3.50:8386/api/prodReport/dataReportMaterialControl', // Địa chỉ API của bạn
			    method: 'GET',
			    data: {
			      page: this.startPage,
			      limit: 10,
			      startDate: this.startDate,
			      endDate: this.endDate,
			      searchValue: this.searchValue,
			    },
			    success: (response) => {
			      console.log("Response từ API:", response.data);
			
			      // Xử lý dữ liệu nhận được
			      const newData = response.data?.data || [];
			      if (Array.isArray(newData) && newData.length > 0) {
			        // Cập nhật danh sách dữ liệu và số trang
			        this.dataList = [...this.dataList, ...newData];
			        this.startPage += 1;
			
			        if (response.data.totalPage) {
			          this.totalPage = response.data.totalPage;
			        }
			      } else {
			        // Không có dữ liệu mới
			        console.log("Không có dữ liệu mới để thêm.");
			        uni.showToast({
			          title: "Không có dữ liệu mới để thêm.",
			          icon: 'none',
			          success: (res) => {
			            console.log("Thông báo thành công:", res);
			          },
			          fail: (res) => {
			            console.error("Thông báo thất bại:", res);
			          },
			        });
			      }
			    },
			    fail: (error) => {
			      // Hiển thị lỗi khi gọi API
			      console.error("Lỗi khi gọi API:", error);
			
			      // Thông báo lỗi cho người dùng
			      uni.showToast({
			        title: "Lỗi khi tải dữ liệu!",
			        icon: "none",
			      });
			    },
			    complete: () => {
			      // Đặt lại trạng thái isLoading
			      this.isLoading = false;
			    }
			  });
			}
		}
	}
</script>

<style>
	.uni-input {
		padding: 4px;
		background-color: #f5f5f5;
		border-radius: 8px;
		text-align: center;
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