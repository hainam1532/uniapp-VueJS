<template>
  <view class="h-screen w-full bg-[#f3f8fe] flex flex-col">
    <view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
		<view class="mx-2 flex justify-between">
			<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#ffff"></path> </g></svg>
			<span class="font-semibold text-white py-1">Độ ẩm liệu IQC</span>
			<svg @click="toCreatePage()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
		</view>
    	<view class="flex flex-col size-full">
    		<view class="flex flex-col p-2">
    			<view class="font-semibold text-sm text-white">Chọn ngày :</view>
    			<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-2">
    			  <picker
					class="border border-gray-300 rounded-lg font-semibold"
    			    mode="date"
    			    :value="startDate"
    			    :start="minDate"
    			    :end="endDate"
    			    @change="onStartDateChange"
    			  >
    			    <view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
    			  </picker>
    			  
    			  <picker
					class="border border-gray-300 rounded-lg font-semibold"
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
				<view class="font-semibold text-sm text-white">
					Tìm kiếm (số lô) :
				</view>
				<input 
				  class="w-full h-full bg-white font-semibold border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none" 
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
    </view>
	
	<!-- data list -->
	<scroll-view 
		@scrolltolower="fetchData"
		scroll-y="true" 
		class="scroll-container bg-[#f3f8fe] size-full mx-auto shadow-lg p-4"
		style="overflow-y: auto; height: calc(100vh - 300px);"
	>
		<view v-for="(item, index) in dataList" :key="item.ID" @click="showDetail(item.ID)" class="bg-white cursor-pointer shadow-md rounded-lg p-4 mb-4">
			<p class="font-semibold text-[#214263]">Ngày kiểm: <span class="text-gray-600 text-sm">{{ formatDate(item.DATE_RECORD) }}</span></p>
			<p class="font-semibold text-[#214263]">Ngày nhập kho: <span class="text-gray-600 text-sm">{{ formatDate(item.DATE_WH) }}</span></p>
			<p class="font-semibold text-[#214263]">Thời gian: <span class="text-gray-600 text-sm">{{ formatTime(item.TIME_REPORT) }}</span></p>
			<p class="font-semibold text-[#214263]">Số lô: <span class="text-gray-600 text-sm">{{ item.MATERIAL_LOT }}</span></p>
			<p class="font-semibold text-[#214263]">Khu vực: <span class="text-gray-600 text-sm">{{ showMaterialName(item.MEASUREMENT_AREA).text }}</span></p>
			<p class="font-semibold text-[#214263]">Tên liệu: <span class="text-gray-600 text-sm">{{ item.NAME_MATERIAL }}</span></p>
			<p class="font-semibold text-[#214263]">Ghi chú: <span class="text-gray-600 text-sm">{{ item.REMARK }}</span></p>
			<p class="font-semibold text-[#214263]">
				Trung bình:
				<span v-if="item" :class="[caculateAverage(item).color, 'text-sm']">
				    {{caculateAverage(item).text}}
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
	import axios from '../../axios.js';
	export default {
		data() {
			const currentDate = this.getDate();
			return {
			  startDate: '', 
			  endDate: '',
			  searchValue: '',
			  dataList: [],
			  startPage: 1,
			  totalPage: 1000,
			  deviceData: null,
			  selectedData: null,
			  showDetailView: false,
			  isLoading: false,
			  showToast: false,
			};
		},
		// created() {
		// 	this.fetchData();  
		// },
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
			showToastMessage() {
				this.showToast = true;
				setTimeout(() => {
					this.showToast = false;
				}, 3000);
			},
			resetData() {
				this.startDate = '';
				this.endDate = '';
				this.searchValue = '';
				this.startPage = 1;
				this.dataList = [];
				this.fetchData();
			},
			fetchData() {
			  if (this.isLoading || this.startPage > this.totalPage) {
			    console.log("Fetch skipped: Loading or all pages loaded");
			    return;
			  }
			  
			  this.isLoading = true;
			
			  axios
			    .get("/iqcReport/dataIQC", {
			      params: {
			        page: this.startPage,
			        limit: 10,
			        startDate: this.startDate,
			        endDate: this.endDate,
			        searchValue: this.searchValue,
			      },
			    })
			    .then((response) => {
			      console.log("Response từ API:", response.data);
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
			    })
			    .catch((error) => {
			      console.error("Lỗi khi gọi API:", error);
			    })
			    .finally(() => {
			      this.isLoading = false;
			    });
			},
			handleScroll(event) {
			  const target = event.target;
			  const { scrollTop, scrollHeight, clientHeight } = target;
			
			  // Nếu gần đến cuối danh sách, gọi fetchData
			  if (scrollHeight - scrollTop <= clientHeight + 100) {
			    this.fetchData();
			  }
			},
			showDetail(id) {
			  const selected = this.dataList.find((item) => item.ID === id);
			  if (selected) {
			    sessionStorage.setItem('selectedData', JSON.stringify(selected));
			
			    // Sử dụng Vue Router để điều hướng
			    this.$router.push({
			      path: '/pages/iqcReport/viewPage/viewMaterialIQC',
			      query: { id },
			    });
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
			// Hàm cập nhật Ngày Kết Thúc khi người dùng chọn
			onEndDateChange(e) {
				const selectedDate = e.detail.value;
				this.endDate = this.formatDate(selectedDate);
			    console.log(this.endDate)
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
			caculateAverage(record) {
			    const averageCal = (
			      parseFloat(record.MATERIAL_VT_1) + 
			      parseFloat(record.MATERIAL_VT_2) + 
			      parseFloat(record.MATERIAL_VT_3)
			    ) / 3;
			
			    if (averageCal < 17 && record.MATERIAL === 1) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal < 7 && record.MATERIAL === 2) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal < 2 && record.MATERIAL === 3) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else if (averageCal < 6 && (record.MATERIAL === 4 || record.MATERIAL === 5 || record.MATERIAL === 6)) {
			      return { text: 'Đạt', color: 'text-emerald-500', average: averageCal };
			    } else {
			      return { text: 'Vượt tiêu chuẩn', color: 'text-red-400', average: averageCal };
			    }
			},
			// Reset loadmore
			resetLoadMore() {
				this.$refs["dataList"].resetLoadmore();
			},
			loadmore() {
			  console.log("loadmore事件触发");
			  this.dataList.push('1');
			},
			backMenu() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toCreatePage() {
				uni.navigateTo({
					url: '/pages/iqcReport/insertPage/insertMaterialIQC'
				})
			}
		},
	};
</script>

<style>
	.picker-container {
	  display: flex;
	  flex-direction: column;
	}
	.picker-label {
	  margin-bottom: 8px;
	  font-size: 16px;
	  font-weight: bold;
	}
	.uni-input {
	  padding: 4px;
	  background-color: #f5f5f5;
	  border-radius: 8px;
	  text-align: center;
	}
	.loading-text,
	.end-text {
	  text-align: center;
	  padding: 16px;
	  color: #999;
	}
	.scroll-container {
	  height: calc(100vh - 300px);
	  overflow-y: auto;
	}
	.toast-container {
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  background-color: #71be34; /* Màu nền xanh lá */
	  color: white;
	  padding: 12px;
	  border-radius: 8px;
	  z-index: 9999;
	  opacity: 0.9;
	}
	
	.toast-content {
	  font-size: 14px;
	  text-align: center;
	}
</style>
