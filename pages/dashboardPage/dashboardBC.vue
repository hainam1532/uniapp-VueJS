<template>
		<view class="flex flex-col h-screen w-full gap-2 p-2">
			<view class="w-full">
				<button @click="backHome()" class="w-full font-semibold bg-blue-400 text-white">Quay về</button>
			</view>
			<!-- Card 1 -->
			<view class="flex flex-col items-center justify-center bg-blue-500 border-2 border-black size-full shadow-lg rounded-xl p-2">
				<view class="flex text-center font-bold text-sm text-white">
					<span>Top chuyền có giày B & C nhiều nhất</span>
				</view>
				<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
					<picker
					  class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					  mode="date"
					  :value="startDate1"
					  :end="endDate1"
					  @change="onStartDateChange1">
					  <view class="uni-input">{{ startDate1 || 'Ngày bắt đầu' }}</view>
					</picker>
					
					<picker
					  class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					  mode="date"
					  :value="endDate1"
					  :end="startDate1"
					  @change="onEndDateChange1">
					  <view class="uni-input">{{ endDate1 || 'Ngày kết thúc' }}</view>
					</picker>
				</view>
				<view class="p-1 w-full">
					<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm
						kiếm</button>
					<button @click="resetSearch()"
						class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
				</view>
				<view style="width:100%; height:400px;;">
					<l-echart ref="chartRef"></l-echart>
				</view>
			</view>
		
			<!-- Card 2 -->
			<view class="flex flex-col items-center justify-center bg-blue-500 border-2 border-black size-full shadow-lg rounded-xl p-2">
				<view class="flex text-center font-bold text-sm text-white">
					<span>Top ART bị giày B & C nhiều nhất</span>
				</view>
				<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="startDate2" :end="endDate2" @change="onStartDateChange2">
						<view class="uni-input">{{ startDate2 || 'Ngày bắt đầu' }}</view>
					</picker>
		
					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="endDate2" :end="startDate2" @change="onEndDateChange2">
						<view class="uni-input">{{ endDate2 || 'Ngày kết thúc' }}</view>
					</picker>
				</view>
				<view class="p-1 w-full">
					<button @click="onSearchARTChange()"
						class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
					<button @click="resetSearchART()"
						class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
				</view>
				<view style="width:100%; height:400px;">
					<l-echart ref="chartRef2"></l-echart>
				</view>
			</view>
		
			<!-- Card 3 -->
			<view class="flex flex-col items-center justify-center bg-blue-500 border-2 border-black size-full shadow-lg rounded-xl p-2">
				<view class="flex text-center font-bold text-sm text-white">
					<span>Top hình thể bị giày B & C nhiều nhất</span>
				</view>
				<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="startDate3" :end="endDate3" @change="onStartDateChange3">
						<view class="uni-input">{{ startDate3 || 'Ngày bắt đầu' }}</view>
					</picker>
		
					<picker
						class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
						mode="date" :value="endDate3" :end="startDate3" @change="onEndDateChange3">
						<view class="uni-input">{{ endDate3 || 'Ngày kết thúc' }}</view>
					</picker>
				</view>
				<view class="p-1 w-full">
					<button @click="onSearchModelChange()"
						class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
					<button @click="resetSearchModel()"
						class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
				</view>
				<view style="width:100%; height:400px;">
					<l-echart ref="chartRef3"></l-echart>
				</view>
			</view>
		</view>
</template>

<script>
	import { ref, onMounted } from 'vue';
	import * as echarts from 'echarts';

	export default {
		data() {
			return {
				dataLineBC: [], // Lưu dữ liệu từ API
				dataArtBC: [],
				dataModelBC: [],
				isLoading: false,
				intervalId: null,
				startDate1: '',
				endDate1: '',
				startDate2: '',
				endDate2: '',
				startDate3: '',
				endDate3: '',
				chartInstance: null,
				chartInstance2: null,
				chartInstance3: null,
			};
		},
		methods: {
			backHome() {
				uni.navigateTo({
					url: '/pages/index/indexDashboard'
				})
			},
			onStartDateChange1(e) {
				const selectedDate = e.detail.value;
				this.startDate1 = this.formatDate(selectedDate);
			},
			onEndDateChange1(e) {
			  const selectedDate = e.detail.value;
			  this.endDate1 = this.formatDate(selectedDate);
			},
			onStartDateChange2(e) {
				const selectedDate = e.detail.value;
				this.startDate2 = this.formatDate(selectedDate);
			},
			onEndDateChange2(e) {
				const selectedDate = e.detail.value;
				this.endDate2 = this.formatDate(selectedDate);
			},
			onStartDateChange3(e) {
				const selectedDate = e.detail.value;
				this.startDate3 = this.formatDate(selectedDate);
			},
			onEndDateChange3(e) {
				const selectedDate = e.detail.value;
				this.endDate3 = this.formatDate(selectedDate);
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				const day = String(date.getDate()).padStart(2, '0');
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const year = date.getFullYear();
				return `${year}/${month}/${day}`;
			},
			onSearchChange() {
				this.dataLineBC = [];
				this.dashboardLineBC();
			},
			onSearchARTChange() {
				this.dataArtBC = [];
				this.dashboardArtBC();
			},
			onSearchModelChange() {
				this.dataModelBC = [];
				this.dashboardModelBC();
			},
			resetSearch() {
				this.startDate1 = '';
				this.endDate1 = '';
				this.dataLineBC = [];
				this.dashboardLineBC();
			},
			resetSearchART() {
				this.startDate2 = '';
				this.endDate2 = '';
				this.dataArtBC = [];
				this.dashboardArtBC();
			},
			resetSearchModel() {
				this.startDate3 = '';
				this.endDate3 = '';
				this.dataModelBC = [];
				this.dashboardModelBC();
			},
			async dashboardLineBC() {
				this.isLoading = true;
			
				try {
					// Gọi API để lấy dữ liệu
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://10.30.3.50:8386/api/dashboard/getDashboardLineBC', // Địa chỉ API
							//url: 'http://10.30.3.27:8000/api/dashboard/getDashboardLineBC', // Địa chỉ API
							method: 'GET',
							data: {
								startDate: this.startDate1,
								endDate: this.endDate1,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});
			
					console.log('Dữ liệu trả về từ API:', response.data);
			
					// Lấy dữ liệu từ API
					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						// Cập nhật biểu đồ với dữ liệu mới
						this.updateChart1(newData);
					} else {
						uni.showToast({
							title: 'Không có dữ liệu.',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('Lỗi khi gọi API:', error);
					uni.showToast({
						title: 'Lỗi khi lấy dữ liệu.',
						icon: 'none',
					});
				} finally {
					this.isLoading = false;
				}
			},
			async dashboardArtBC() {
				this.isLoading = true;
							
				try {
					// Gọi API để lấy dữ liệu
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://10.30.3.50:8386/api/dashboard/getDashboardArtBC', // Địa chỉ API
							method: 'GET',
							data: {
								startDate: this.startDate2,
								endDate: this.endDate2,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});
							
					console.log('Dữ liệu trả về từ API:', response.data);
							
					// Lấy dữ liệu từ API
					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						// Cập nhật biểu đồ với dữ liệu mới
						this.updateChart2(newData);
					} else {
						uni.showToast({
							title: 'Không có dữ liệu.',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('Lỗi khi gọi API:', error);
					uni.showToast({
						title: 'Lỗi khi lấy dữ liệu.',
						icon: 'none',
					});
				} finally {
					this.isLoading = false;
				}
			},
			async dashboardModelBC() {
				this.isLoading = true;
							
				try {
					// Gọi API để lấy dữ liệu
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://10.30.3.50:8386/api/dashboard/getDashboardModelBC', // Địa chỉ API
							method: 'GET',
							data: {
								startDate: this.startDate3,
								endDate: this.endDate3,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});
							
					console.log('Dữ liệu trả về từ API:', response.data);
							
					// Lấy dữ liệu từ API
					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						// Cập nhật biểu đồ với dữ liệu mới
						this.updateChart3(newData);
					} else {
						uni.showToast({
							title: 'Không có dữ liệu.',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('Lỗi khi gọi API:', error);
					uni.showToast({
						title: 'Lỗi khi lấy dữ liệu.',
						icon: 'none',
					});
				} finally {
					this.isLoading = false;
				}
			},
			updateChart1(data) {
				// Trích xuất DEPARTMENT_CODE và COUNT từ dữ liệu API
				const departments = data.map(item => item.DEPARTMENT_CODE);
				const counts = data.map(item => item.COUNT);
			
				// Lấy tham chiếu đến thành phần biểu đồ
				const chartRef = this.$refs.chartRef;
			
				// Khởi tạo hoặc cập nhật biểu đồ ECharts
				if (!this.chartInstance) {
					chartRef.init(echarts, chart => {
						this.chartInstance = chart;
						this.setChartOptions(departments, counts);
					});
				} else {
					this.setChartOptions(departments, counts);
				}
			},
			setChartOptions(departments, counts) {
				// Cấu hình biểu đồ
				const options = {
					title: {
						text: 'Số lượng theo chuyền',
						textStyle: {
						    color: '#f9fafb',  // Set the title text color (red in this case)
						    fontSize: 18,      // You can also adjust the font size
						    fontWeight: 'bold' // Optionally, make the font bold
						},
					},
					tooltip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							color: '#f9fafb',   // Set the label color to white
							fontSize: 14,       // Adjust font size if needed
							fontWeight: 'bold', // Optionally make the font bold
							fontFamily: 'Arial' // You can specify a font family
						}
					},
					yAxis: {
						type: 'category',
						data: departments,
						axisLabel: {
						    color: '#f9fafb',      
						    fontSize: 14,        
						    fontWeight: 'bold',  
						    fontFamily: 'Arial'
						}
					},
					series: [
						{
							name: 'Số lượng',
							type: 'bar',
							data: counts,
							itemStyle: {
								color: '#f9fafb',
							},
							// label: {
							//   show: true,
							// },
						},
					],
				};
			
				// Thiết lập option cho biểu đồ
				this.chartInstance.setOption(options);
			},
			updateChart2(data) {
				// Trích xuất DEPARTMENT_CODE và COUNT từ dữ liệu API
				const art = data.map(item => item.ART);
				const counts = data.map(item => item.COUNT);
			
				// Lấy tham chiếu đến thành phần biểu đồ
				const chartRef2 = this.$refs.chartRef2;
			
				// Khởi tạo hoặc cập nhật biểu đồ ECharts
				if (!this.chartInstance2) {
					chartRef2.init(echarts, chart => {
						this.chartInstance2 = chart;
						this.setChartOptions2(art, counts);
					});
				} else {
					this.setChartOptions2(art, counts);
				}
			},
			setChartOptions2(art, counts) {
				// Cấu hình biểu đồ
				const options = {
					title: {
						text: 'Số lượng theo ART',
						textStyle: {
						    color: '#f9fafb',  // Set the title text color (red in this case)
						    fontSize: 18,      // You can also adjust the font size
						    fontWeight: 'bold' // Optionally, make the font bold
						},
					},
					tooltip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							color: '#f9fafb',   // Set the label color to white
							fontSize: 14,       // Adjust font size if needed
							fontWeight: 'bold', // Optionally make the font bold
							fontFamily: 'Arial' // You can specify a font family
						}
					},
					yAxis: {
						type: 'category',
						data: art,
						axisLabel: {
						    color: '#f9fafb',      
						    fontSize: 14, 
						    fontWeight: 'bold',  
						    fontFamily: 'Arial'
						}
					},
					series: [
						{
							name: 'Số lượng',
							type: 'bar',
							data: counts,
							itemStyle: {
								color: '#f9fafb',
							},
							// label: {
							//   show: true,
							// },
						},
					],
				};
			
				// Thiết lập option cho biểu đồ
				this.chartInstance2.setOption(options);
			},
			updateChart3(data) {
				// Trích xuất DEPARTMENT_CODE và COUNT từ dữ liệu API
				const model = data.map(item => item.STYLE);
				const counts = data.map(item => item.COUNT);
			
				// Lấy tham chiếu đến thành phần biểu đồ
				const chartRef3 = this.$refs.chartRef3;
			
				// Khởi tạo hoặc cập nhật biểu đồ ECharts
				if (!this.chartInstance3) {
					chartRef3.init(echarts, chart => {
						this.chartInstance3 = chart;
						this.setChartOptions3(model, counts);
					});
				} else {
					this.setChartOptions3(model, counts);
				}
			},
			setChartOptions3(model, counts) {
				// Cấu hình biểu đồ
				const options = {
					title: {
						text: 'Số lượng theo Model',
						textStyle: {
						    color: '#f9fafb',  // Set the title text color (red in this case)
						    fontSize: 18,      // You can also adjust the font size
						    fontWeight: 'bold' // Optionally, make the font bold
						},
					},
					tooltip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'value',
						data: model,
						axisLabel: {
							color: '#f9fafb',   // Set the label color to white
							fontSize: 14,       // Adjust font size if needed
							fontWeight: 'bold', // Optionally make the font bold
							fontFamily: 'Arial' // You can specify a font family
						}
					},
					yAxis: {
						type: 'category',
						data: model,
						axisLabel: {
						    color: '#f9fafb', 
						    fontSize: 14,        
						    fontWeight: 'bold',  
						    fontFamily: 'Arial'
						}
					},
					series: [
						{
							name: 'Số lượng',
							type: 'bar',
							data: counts,
							itemStyle: {
								color: '#f9fafb',
							},
							// label: {
							//   show: true,
							// },
						},
					],
				};
			
				// Thiết lập option cho biểu đồ
				this.chartInstance3.setOption(options);
			},
		},
		mounted() {
			this.dashboardLineBC();
			this.dashboardArtBC();
			this.dashboardModelBC();

			this.intervalId = setInterval(() => {
				this.dashboardLineBC();
				this.dashboardArtBC();
				this.dashboardModelBC();
			}, 300000);
		},
		beforeDestroy() {
			if (this.intervalId) {
				clearInterval(this.intervalId);
			}
		}
	};
</script>