<template>
	<view class="h-screen w-full flex flex-col">
		<view class="flex flex-col bg-blue-600 rounded-b-xl gap-2 p-1">
			<view class="flex justify-between gap-2 p-2">
				<view class="back" @click="goBack()"></view>
				<span class="font-bold text-[25px] text-white">Biểu nhiệt độ ngẫu nhiên máy định hình nóng</span>
				<view class="add" @click="goCreate()"></view>
			</view>
			<view class="flex flex-col size-full">
				<view class="flex flex-col p-1 gap-1.5">
					<view class="font-semibold text-[16px] text-white">Chọn ngày lãnh :</view>
					<view class="grid grid-cols-2 grid-rows-1 gap-2 mt-1">
						<picker
							class="w-full h-full bg-white shadow-lg font-semibold border-2 border-black px-1.5 py-1.5 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
							mode="date" :value="startDate" :end="endDate" @change="onStartDateChange">
							<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
						</picker>

						<picker
							class="w-full h-full bg-white shadow-lg font-semibold border-2 border-black px-1.5 py-1.5 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
							mode="date" :value="endDate" :start="startDate" @change="onEndDateChange">
							<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
						</picker>
					</view>
					<view class="grid grid-cols-2 grid-rows-1 gap-2 mt-1">
						<view class="font-semibold text-[16px] text-white">Chuyền :</view>
						<!-- <view class="font-semibold text-[16px] text-black">Ca :</view> -->
					</view>
					<view class="grid grid-cols-1 grid-rows-1 gap-2">
						<mySelectModal
						  class="w-full h-full bg-white shadow-lg font-semibold border-2 border-black px-1 py-1 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						  :data="dataDepartment"
						  valueField="DEPARTMENT_CODE"
						  displayField="DEPARTMENT_NAME"
						  placeholder="Nhập hoặc chọn dữ liệu..."
						  title="Danh sách lựa chọn chuyền"
						  @select="handleSelect"
						  @clear="handleClear"
						/>
					</view>
				</view>
				<view class="flex flex-col gap-1 w-full p-1">
					<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#63abb7] text-white">Tìm kiếm</button>
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
		</view>
		
		<scroll-view @scrolltolower="fetchData" scroll-y="true"
			class="rounded-t-2xl shadow-lg size-full mx-auto shadow-lg p-2"
			style="overflow-y: auto; height: calc(430vh - 300px);">
			<view v-for="(item, index) in dataList" :key="item.ID" @click="showDetail(item.ID)"
				class="grid grid-cols-3 grid-rows-1 bg-white gap-2 cursor-pointer shadow-lg rounded-lg p-2 border-2 border-black mb-2 transition-all duration-300 hover:border-blue-500">
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Ngày :</view>
					<span class="text-[15px] font-bold">
						{{ formatDate(item.DATEE) || 'Không có ngày' }}
					</span>
				</view>
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Chuyền :</view>
					<span class="text-[15px] font-bold">
						{{ item.LINE_NO || 'Không có chuyền' }}
					</span>
				</view>
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Ca :</view>
					<span class="text-[15px] font-bold">
						{{ item.SHIFT || 'Không có ca' }}
					</span>
				</view>
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Thời gian :</view>
					<span class="text-[15px] font-bold">
						{{ item.TIME_RANGE || 'Không có thời gian' }}
					</span>
				</view>
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Nhân viên :</view>
					<span class="text-[15px] font-bold">
						{{ item.QC || 'Thiếu MSNV' }}
					</span>
				</view>
				<view class="flex gap-2">
					<view class="font-bold text-blue-600">Kết quả :</view>
					<span v-if="item && item.RESULT" :class="[
					    showStatus(item.RESULT).color, 
					    showStatus(item.RESULT).bg,
					    'font-bold text-[15px] px-2 rounded-md shadow-md inline-block'
					  ]">
						{{ showStatus(item.RESULT).text }}
					</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Mã máy 1 :</view>
					<span class="text-[15px] font-bold">{{item.MACHINE_1}}</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Mã máy 2 :</view>
					<span class="text-[15px] font-bold">{{item.MACHINE_2}}</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Mã máy 3 :</view>
					<span class="text-[15px] font-bold">{{item.MACHINE_3}}</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Nhiệt độ thực tế 1 :</view>
					<span class="text-[15px] font-bold">{{item.TEMP_ACTUAL_1}}</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Nhiệt độ thực tế 2 :</view>
					<span class="text-[15px] font-bold">{{item.TEMP_ACTUAL_2}}</span>
				</view>
				<view class="flex gap-2">
					<view  class="font-bold text-blue-600">Nhiệt độ thực tế 3 :</view>
					<span class="text-[15px] font-bold">{{item.TEMP_ACTUAL_3}}</span>
				</view>
			</view>
			<view v-if="isLoading" class="loading-text">Đang tải...</view>
			<view v-if="startPage > totalPage" class="end-text">Không còn dữ liệu để tải</view>
		</scroll-view>
	</view>
</template>

<script>
	import mySelectModal from '../../components/mySelect2/mySelect2.vue';
	export default {
		components: {
			mySelectModal,
		},
		data() {
			return {
				dataDepartment: [],
				dataList: [],
				startDate: '',
				endDate: '',
				searchDepartment: '',
				startPage: 1,
				totalPage: 1000,
				isLoading: false,
				formData: {
					DEPARTMENT_CODE: ''
				}
			};
		},
		mounted() {
			this.getDepartment();
			this.fetchData();
			this.$nextTick(() => {
				const scrollContainer = document.querySelector(".scroll-container");
				if (scrollContainer) {
					scrollContainer.scrollTop = 0; // Đặt lại vị trí cuộn
				}
			});
		},
		computed: {
			departmentList() {
				return this.dataDepartment.map(item => item.DEPARTMENT_CODE);
			}
		},
		methods : {
			goBack() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			goCreate() {
				uni.navigateTo({
					url: '/pages/iprdReport/insertPage/insertTempMachine'
				})
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
			bindPickerDepartmentChange(e){
				const selectedIndex = e.detail.value;
				const selectedDepartment = this.dataDepartment[selectedIndex];
				this.formData.DEPARTMENT_CODE = selectedDepartment.DEPARTMENT_CODE;
			},
			handleSelect(item) {
				console.log("Đã chọn:", item);
				this.searchDepartment = item.DEPARTMENT_CODE;
			},
			handleClear() {
				console.log("Đã hủy chọn");
				this.searchDepartment = '';
				this.startPage = 1;
				this.dataList = [];
				this.fetchData();
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
			onSearchChange() {
				// Đặt lại `startPage` về 1 khi thay đổi `searchValue`
				this.startPage = 1;
				this.dataList = []; // Đặt lại dataList để tìm kiếm mới từ trang đầu tiên
				this.fetchData(); // Gọi lại fetchData để truy vấn với searchValue mới
			},
			showStatus(passFail) {
				switch (passFail) {
					case "S": // Khi pass_fail = "S"
						return {
							text: "Đạt", color: "text-green-600", bg: "bg-green-200"
						};
					case "F": // Khi pass_fail = "F"
						return {
							text: "Không đạt", color: "text-red-600", bg: "bg-red-200"
						};
					case null:
					case undefined:
					case "":
						return {
							text: "Không xác định", color: "text-gray-500", bg: "bg-gray-200"
						};
					default:
						return {
							text: "Không xác định", color: "text-gray-500", bg: "bg-gray-200"
						};
				}
			},
			resetSearch() {
				this.startDate = '';
				this.endDate = '';
				this.searchDepartment = '';
				this.startPage = 1;
				this.dataList = [];
				this.fetchData();
			},
			getDepartment() {
				this.isLoading = true;
			
				uni.request({
					//url: 'http://10.30.3.50:8386/api/configData/getDepartment',
					url: 'http://10.30.3.50:8386/api/configData/getDepartment',
					method: 'GET',
					success: (res) => {
						const newDataDepartment = res.data?.data || [];
						if (Array.isArray(newDataDepartment) && newDataDepartment.length > 0) {
							this.dataDepartment = newDataDepartment.map((item) => ({
								DEPARTMENT_CODE: item.DEPARTMENT_CODE,
								DEPARTMENT_NAME: item.DEPARTMENT_NAME,
							}));
						} else {
							console.error('No department data or data is empty.');
						}
					},
					fail: (error) => {
						console.error("Error fetching department data:", error);
					},
					complete: () => {
						this.isLoading = false;
					},
				});
			},
			fetchData() {
			  // // Tránh gọi API nếu đang tải hoặc đã tải hết các trang
			  // if (this.isLoading || this.startPage > this.totalPage) {
			  //   console.log("Fetch skipped: Đang tải hoặc đã tải hết các trang.");
			  //   return;
			  // }
			
			  this.isLoading = true;
			
			  uni.request({
			    url: 'http://10.30.3.50:8386/api/iprdReport/getDataTempMachine', // Địa chỉ API của bạn
			    method: 'GET',
			    data: {
			      page: this.startPage,
			      limit: 10,
			      startDate: this.startDate,
			      endDate: this.endDate,
			      line_no: this.searchDepartment,
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
			        console.log("Không còn dữ liệu để tải.");
			        uni.showToast({
			          title: "Không còn dữ liệu để tải.",
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
		}
	}
</script>

<style scoped>
	.add {
		background-image: url('/static/add.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}

	.back {
		background-image: url('/static/return.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}
	
	.scroll-container {
		height: calc(100vh - 300px);
		overflow-y: auto;
	}
</style>




<!-- <view class="flex flex-col h-screen w-full bg-gradient-to-b from-blue-200 via-blue-100 to-white">
		<view class="flex justify-between gap-2 p-2">
			<view class="back" @click="goBack()"></view>
			<span class="font-bold text-[25px]">Máy định hình nóng lạnh ngẫu nhiên</span>
			<view class="add" @click="goCreate()"></view>
		</view>
		
		
	</view> -->