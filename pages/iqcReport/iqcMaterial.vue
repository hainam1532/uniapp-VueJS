<template>
  <view class="h-screen w-full bg-[#f3f8fe] flex flex-col">
    <view class="flex flex-col bg-[#407bff] rounded-b-3xl gap-4 p-2">
		<view class="mx-2 flex justify-between">
			<svg @click="backMenu()" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.3508 12.7499L11.2096 17.4615L10.1654 18.5383L3.42264 11.9999L10.1654 5.46148L11.2096 6.53833L6.3508 11.2499L21 11.2499L21 12.7499L6.3508 12.7499Z" fill="#ffff"></path> </g></svg>
			<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
		</view>
    	<view class="flex flex-col size-full">
    		<view class="flex flex-col p-2">
    			<view class="font-semibold text-sm text-white">Chọn ngày:</view>
    			<view class="grid grid-cols-2 grid-rows-1 gap-4 mt-2">
    			  <picker
					class="border border-gray-300 rounded-lg font-semibold"
    			    mode="date"
    			    :value="startDate"
    			    :start="minDate"
    			    :end="endDate"
    			    @change="onStartDateChange"
    			  >
    			    <view class="uni-input">{{ startDate }}</view>
    			  </picker>
    			  
    			  <picker
					class="border border-gray-300 rounded-lg font-semibold"
    			    mode="date"
    			    :value="endDate"
    			    :start="startDate"
    			    :end="maxDate"
    			    @change="onEndDateChange"
    			  >
    			    <view class="uni-input">{{ endDate }}</view>
    			  </picker>
    			</view>
    		</view>
			
			<view class="flex flex-col gap-2 p-2 w-full">
				<view class="font-semibold text-sm text-white">
					Tìm kiếm (số lô, tên liệu):
				</view>
				<input class="w-full h-full bg-white font-semibold border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none" type="text" autofocus placeholder="..." />
			</view>
			
			<view class="w-full p-2">
				<button class="w-full font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
			</view>
    	</view>
    </view>
	
	<!-- data list -->
	<view class="bg-[#f3f8fe] size-full mx-auto overflow-x-auto shadow-lg p-4">
		<div v-for="(item, index) in dataList" :key="item.id" @click="showDetail(item.id)" class="bg-white cursor-pointer shadow-md rounded-lg p-4 mb-4">
		  <p class="font-semibold text-gray-800">Ngày kiểm: <span class="text-gray-600">{{ item.checkDate }}</span></p>
		  <p class="font-semibold text-gray-800">Ngày nhập kho: <span class="text-gray-600">{{ item.warehouseDate }}</span></p>
		  <p class="font-semibold text-gray-800">Thời gian: <span class="text-gray-600">{{ item.time }}</span></p>
		  <p class="font-semibold text-gray-800">Số lô: <span class="text-gray-600">{{ item.batchNumber }}</span></p>
		  <p class="font-semibold text-gray-800">Khu vực: <span class="text-gray-600">{{ item.area }}</span></p>
		  <p class="font-semibold text-gray-800">Tên liệu: <span class="text-gray-600">{{ item.materialName }}</span></p>
		  <p class="font-semibold text-gray-800">Ghi chú: <span class="text-gray-600">{{ item.note }}</span></p>
		</div>
	</view>

  </view>
</template>

<script>
	import axios from '../../axios.js';
	export default {
		data() {
			const currentDate = this.getDate();
			return {
			  startDate: currentDate, // Ngày bắt đầu mặc định là hôm nay
			  endDate: currentDate, // Ngày kết thúc mặc định là hôm nay
			  minDate: this.getDate(-60), // 60 năm trước
			  maxDate: this.getDate(2), // 2 năm sau
			  dataList: [],
			  startPage: 1,
			  totalPage: 5,
			  deviceData: null,
			  selectedData: null,
			  showDetailView: false
			};
		},
		created() {
			this.fetchData();  
		},
		 //  mounted() {
			// this.getDataDevice();  
		 //  },
		methods: {
			fetchData() {
			  // Giả lập API call để lấy dữ liệu
			  if (this.startPage <= this.totalPage) {
				const newData = Array.from({ length: 10 }, (_, i) => ({
				  id: (this.startPage - 1) * 10 + i + 1,
				  checkDate: '2024-11-21',
				  warehouseDate: '2024-11-20',
				  time: '10:30 AM',
				  batchNumber: `Batch ${(this.startPage - 1) * 10 + i + 1}`,
				  area: 'Khu A',
				  materialName: `Material ${(this.startPage - 1) * 10 + i + 1}`,
				  note: 'Ghi chú kiểm tra',
				}));
				this.dataList = [...this.dataList, ...newData];
				this.startPage += 1;
			  }
			},
			handleScroll(event) {
			  const { scrollTop, scrollHeight, clientHeight } = event.target;
			  if (scrollTop + clientHeight >= scrollHeight - 10) {
				this.fetchData(); 
			  }
			},
			showDetail(id) {
			  const selected = this.dataList.find((item) => item.id === id);
			  if (selected) {
			    sessionStorage.setItem('selectedData', JSON.stringify(selected));
			
			    // Sử dụng Vue Router để điều hướng
			    this.$router.push({
			      path: '/pages/iqcReport/viewPage/viewMaterialIQC',
			      query: { id },
			    });
			  }
			},
			// async getDataDevice() {
			// 	try {
			// 		const res = await axios.get('/getDEVICE');
			// 		this.deviceData = res.data;
					
			// 		console.log('Data device: ', this.deviceData);
			// 	} catch (error) {
			// 		console.error('Get error: ', error);
			// 	}
			// },
			onStartDateChange(e) {
			  this.startDate = e.detail.value;
			  if (new Date(this.endDate) < new Date(this.startDate)) {
				// Tự động cập nhật ngày kết thúc nếu nhỏ hơn ngày bắt đầu
				this.endDate = this.startDate;
			  }
			},
			// Hàm cập nhật Ngày Kết Thúc khi người dùng chọn
			onEndDateChange(e) {
			  this.endDate = e.detail.value;
			  console.log(this.endDate)
			},
			// Hàm tạo ngày với offset
			getDate(offset = 0) {
			  const date = new Date();
			  date.setFullYear(date.getFullYear() + offset);
			  const year = date.getFullYear();
			  const month = String(date.getMonth() + 1).padStart(2, '0');
			  const day = String(date.getDate()).padStart(2, '0');
			  return `${year}/${month}/${day}`;
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
	  padding: 12px;
	  background-color: #f5f5f5;
	  border-radius: 8px;
	  text-align: center;
	}
</style>
