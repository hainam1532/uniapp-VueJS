<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#ffff"></path> </g></svg>
				<span class="font-semibold text-white py-1">Theo dõi PHOM</span>
				<svg @click="toCreatePage()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
			</view>
		</view>
		
		<!-- FORM INPUT -->
		<view class="flex flex-col size-full">
			<view class="flex flex-col p-2">
				<view class="font-semibold text-[16px] text-black">Chọn ngày :</view>
				<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-2">
				  <picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
				    mode="date"
				    :value="startDate"
				    :start="minDate"
				    :end="endDate"
				    @change="onStartDateChange"
				  >
				    <view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
				  </picker>
				  
				  <picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
				    mode="date"
				    :value="endDate"
				    :start="startDate"
				    :end="maxDate"
				    @change="onEndDateChange"
				  >
				    <view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
				  </picker>
				</view>
			</view>
			<view class="flex flex-col gap-2 p-2 w-full">
				<view class="font-semibold text-[16px] text-black">
					Mã phom :
				</view>
				<input
				  class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none" 
				  v-model="searchValue"
				  type="text"
				  autofocus 
				  placeholder="Tìm kiếm..." 
				/>
			</view>
			<view class="flex flex-col gap-2 w-full p-2">
				<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
				<button @click="resetData()" class="w-full rounded-lg font-semibold bg-red-400 text-white">Reset</button>
				<view v-if="showToast" class="toast-container">
				    <view class="flex gap-2 toast-content">
						<svg width="22px" height="22px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#036814" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
						Thành công
				    </view>
				</view>
			</view>
		</view>
		<!-- DATA LIST -->
		<scroll-view
			@scrolltolower="fetchData"
			scroll-y="true" 
			class="bg-[#f3f8fe] rounded-t-2xl shadow-lg size-full mx-auto shadow-lg p-4"
			style="overflow-y: auto; height: calc(350vh - 300px);"
		>
			<view v-for="(item, index) in dataList" :key="item.ID" @click="showDetail(item.ID)" 
				class="grid grid-cols-2 grid-rows-1 gap-2 cursor-pointer shadow-lg rounded-lg p-4 mb-4"
			>
				<p class="font-semibold text-[#214263]">
					ID:
					<span class="text-gray-600 text-sm">
						{{ item.ID }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Ngày: 
					<span class="text-gray-600 text-sm">
						{{ formatDate(item.DATE_REPORT) }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					Mã phom: 
					<span class="text-gray-600 text-sm">
						{{ item.CODE_PHOM }}
					</span>
				</p>
				<p class="font-semibold text-[#214263]">
					QC: 
					<span class="text-gray-600 text-sm">
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
					url:'/pages/index/index'
				})
			},
			toCreatePage() {
				uni.navigateTo({
					url:'/pages/iqcReport/insertPage/insertCheckPhom'
				})
			},
			fetchData() {
				this.isLoading = true;
				
				axios.get('/iqcReport/checkPHOM', {
					params: {
						page: this.startPage,
						limit: 10,
						startDate: this.startDate,
						endDate: this.endDate,
						searchValue: this.searchValue,
					}
				}).then((response) => {
					console.log('Data phom' + response.data)
					const newData = response.data?.data || [];
								
					// Kiểm tra dữ liệu trước khi cập nhật
					if (Array.isArray(newData) && newData.length > 0) {
					  this.dataList = [...this.dataList, ...newData];
										this.startPage += 1;
					  if (response.data.totalPage) {
					    this.totalPage = response.data.totalPage;
					  }
					} else {
						console.log("Không có dữ liệu mới để thêm.");
						uni.showToast({
							title: "Không có dữ liệu mới để thêm.",
							icon: 'none',
							success: (res) => {
							   this.exeRet = "success:" + JSON.stringify(res) + new Date()
							},
							fail: (res) => {
							   this.exeRet = "fail:" + JSON.stringify(res)
							},
						})
					}
				}).catch((error) => {
					console.error('Error get data phom: ' + error)
				}).finally(() => {
					this.isLoading = false;
				})
			},
			showDetail(id) {
			  const selected = this.dataList.find((item) => item.ID === id);
			  if (selected) {
			    sessionStorage.setItem('selectedData', JSON.stringify(selected));
			
			    // Sử dụng Vue Router để điều hướng
			    this.$router.push({
			      path: '/pages/iqcReport/viewPage/viewCheckPhom',
			      query: { id },
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
		}
	}
</script>

<style>
	.scroll-container {
	  height: calc(100vh - 300px);
	  overflow-y: auto;
	}
</style>