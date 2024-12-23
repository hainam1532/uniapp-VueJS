<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<view class="return" @click="backMenu()"></view>
				<h2 class="font-semibold text-[20px] text-white">Theo dõi PHOM</h2>
				<view class="add" @click="toCreatePage()"></view>
			</view>
		</view>

		<!-- FORM INPUT -->
		<view class="flex flex-col size-full">
			<view class="flex flex-col p-2 gap-1">
				<span class="font-semibold text-[16px] ml-2 text-black">Chọn ngày :</span>
				<view class="grid grid-cols-2 grid-rows-1 gap-2 mt-1">
					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="startDate" :start="minDate" :end="endDate" @change="onStartDateChange">
						<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
					</picker>

					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="endDate" :start="startDate" :end="maxDate" @change="onEndDateChange">
						<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
					</picker>
				</view>
				<span class="font-semibold text-[16px] ml-2 text-black">
					Mã phom :
				</span>
				<input
					class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					v-model="searchValue" type="text" autofocus placeholder="Tìm kiếm..." />
			</view>
	
			<view class="flex flex-col gap-2 w-full p-1">
				<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm
					kiếm</button>
				<button @click="resetSearch()"
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
		<!-- DATA LIST -->
		<scroll-view @scrolltolower="fetchData" scroll-y="true"
			class="rounded-t-2xl shadow-lg size-full mx-auto shadow-lg p-2"
			style="overflow-y: auto; height: calc(430vh - 300px);">
			<view v-for="(item, index) in dataList" :key="item.ID" @click="showDetail(item.ID)"
				class="grid grid-cols-2 grid-rows-1 border-2 border-black bg-white gap-2 cursor-pointer shadow-lg rounded-lg p-2 mb-2">
				<p class="font-bold text-[#214263]">
					ID:
					<span class="text-gray-600 text-[15px]">
						{{ item.ID }}
					</span>
				</p>
				<p class="font-bold text-[#214263]">
					Ngày:
					<span class="text-gray-600 text-[15px]">
						{{ formatDate(item.DATE_REPORT) }}
					</span>
				</p>
				<p class="font-bold text-[#214263]">
					Mã phom:
					<span class="text-gray-600 text-[15px]">
						{{ item.CODE_PHOM }}
					</span>
				</p>
				<p class="font-bold text-[#214263]">
					QC:
					<span class="text-gray-600 text-[15px]">
						{{ item.QC }}
					</span>
				</p>
			</view>
			<view v-if="isLoading" class="loading-text">Đang tải...</view>
			<view v-if="startPage > totalPage" class="end-text">Không còn dữ liệu để tải</view>
		</scroll-view>
	</view>
</template>

<script>
	import axios from '../../axios.js';
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
					url: '/pages/iqcReport/insertPage/insertCheckPhom'
				})
			},
			fetchData() {
			  // Tránh gọi API nếu đang tải hoặc đã tải hết các trang
			  if (this.isLoading || this.startPage > this.totalPage) {
			    console.log("Fetch skipped: Đang tải hoặc đã tải hết các trang.");
			    return;
			  }
			
			  this.isLoading = true;
			
			  uni.request({
			    url: 'http://10.30.3.50:8386/api/iqcReport/checkPHOM', // Địa chỉ API của bạn
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
			          url: '/pages/iqcReport/viewPage/viewCheckPhom',
			        });
			      },
			      fail: (error) => {
			        console.error('Error saving selectedData:', error);
			      }
			    });
			  }
			},
			// Hàm cập nhật Ngày Kết Thúc khi người dùng chọn
			onEndDateChange(e) {
				const selectedDate = e.detail.value;
				this.endDate = this.formatDate(selectedDate);
				console.log(this.endDate)
			},
			onStartDateChange(e) {
				const selectedDate = e.detail.value;
				this.startDate = this.formatDate(selectedDate);

				if (new Date(this.endDate) < new Date(this.startDate)) {
					this.endDate = this.startDate;
				}
			},
			onSearchChange() {
				// Đặt lại `startPage` về 1 khi thay đổi `searchValue`
				this.startPage = 1;
				this.dataList = []; // Đặt lại dataList để tìm kiếm mới từ trang đầu tiên
				this.fetchData(); // Gọi lại fetchData để truy vấn với searchValue mới
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
			resetSearch() {
				this.startDate = '';
				this.endDate = '';
				this.searchValue = '';
				this.startPage = 1;
				this.dataList = [];
				this.fetchData();
			}
		}
	}
</script>

<style>
	.scroll-container {
		height: calc(100vh - 300px);
		overflow-y: auto;
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