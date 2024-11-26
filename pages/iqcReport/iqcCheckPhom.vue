<template>
	<view class="h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white flex flex-col">
		<view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
			<view class="mx-2 flex justify-between">
				<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#ffff"></path> </g></svg>
				<h2 class="font-semibold text-2xl text-white py-1">Theo dõi PHOM</h2>
				<svg @click="toCreatePage()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.06935 5.00839C2 5.37595 2 5.81722 2 6.69975V13.75C2 17.5212 2 19.4069 3.17157 20.5784C4.34315 21.75 6.22876 21.75 10 21.75H14C17.7712 21.75 19.6569 21.75 20.8284 20.5784C22 19.4069 22 17.5212 22 13.75V11.5479C22 8.91554 22 7.59935 21.2305 6.74383C21.1598 6.66514 21.0849 6.59024 21.0062 6.51946C20.1506 5.75 18.8345 5.75 16.2021 5.75H15.8284C14.6747 5.75 14.0979 5.75 13.5604 5.59678C13.2651 5.5126 12.9804 5.39471 12.7121 5.24543C12.2237 4.97367 11.8158 4.56578 11 3.75L10.4497 3.19975C10.1763 2.92633 10.0396 2.78961 9.89594 2.67051C9.27652 2.15704 8.51665 1.84229 7.71557 1.76738C7.52976 1.75 7.33642 1.75 6.94975 1.75C6.06722 1.75 5.62595 1.75 5.25839 1.81935C3.64031 2.12464 2.37464 3.39031 2.06935 5.00839ZM12 11C12.4142 11 12.75 11.3358 12.75 11.75V13H14C14.4142 13 14.75 13.3358 14.75 13.75C14.75 14.1642 14.4142 14.5 14 14.5H12.75V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V14.5H10C9.58579 14.5 9.25 14.1642 9.25 13.75C9.25 13.3358 9.58579 13 10 13H11.25V11.75C11.25 11.3358 11.5858 11 12 11Z" fill="#ffff"></path> </g></svg>
			</view>
		</view>
		
		<!-- FORM INPUT -->
		<view class="flex flex-col size-full">
			<view class="flex flex-col p-2">
				<span class="font-semibold text-[16px] ml-2 text-black">Chọn ngày :</span>
				<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-2">
				  <picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
				    mode="date"
				    :value="startDate"
				    :start="minDate"
				    :end="endDate"
				    @change="onStartDateChange"
				  >
				    <view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
				  </picker>
				  
				  <picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
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
				<span class="font-semibold text-[16px] ml-2 text-black">
					Mã phom :
				</span>
				<input
				  class="w-full h-full bg-white shadow-lg font-semibold border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none" 
				  v-model="searchValue"
				  type="text"
				  autofocus 
				  placeholder="Tìm kiếm..." 
				/>
			</view>
			<view class="flex flex-col gap-2 w-full p-2">
				<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
				<button @click="resetSearch()" class="w-full rounded-lg font-semibold bg-red-400 text-white">Reset</button>
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
			style="overflow-y: auto; height: calc(430vh - 300px);"
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
						limit: 20,
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
</style>