<template>
    <view class="flex flex-col items-center gap-4 h-screen bg-blue-200 p-2">
        <!-- Card 1 -->
        <view class="flex flex-col bg-white size-full shadow-lg rounded-xl p-2">
            <view class="flex text-center font-bold text-[25px] items-center justify-center">
                <span>Top 3 loại vật liệu bị vượt tiêu chuẩn nhiều nhất</span>
            </view>
            <view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
                <picker
                    class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
                    mode="date" :value="startDate" :end="endDate" @change="onStartDateChange">
                    <view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
                </picker>

                <picker
                    class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
                    mode="date" :value="endDate" :start="startDate" @change="onEndDateChange">
                    <view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
                </picker>
            </view>
            <view class="p-1 w-full">
                <button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm
                    kiếm</button>
                <button @click="resetSearch()"
                    class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
            </view>
           <view class='size-full'>
				<l-echart style="width:100%; height:90%;" ref="chartRef"></l-echart>
           </view>
        </view>
        <button class="w-full rounded-lg bg-blue-400 font-semibold text-white" @click="backHome()">Quay về</button>
    </view>
</template>

<script>
	import { ref, onMounted } from 'vue';
	import * as echarts from 'echarts';

	export default {
		data() {
			return {
				dataList: [],
				isLoading: false, // Trạng thái tải dữ liệu
				startDate: '', // Thời gian bắt đầu (giá trị mẫu)
				endDate: '', // Thời gian kết thúc (giá trị mẫu)
				chartInstance: null, // Tham chiếu đến biểu đồ ECharts
			};
		},
		mounted() {
			// Gọi hàm fetchData khi component được mount
			this.fetchData();
		},
		methods: {
			backHome() {
				uni.navigateTo({
					url: '/pages/index/indexDashboard'
				})
			},
			onStartDateChange(e) {
				const selectedDate = e.detail.value;
				this.startDate = this.formatDate(selectedDate);
			},
			onEndDateChange(e) {
			  const selectedDate = e.detail.value;
			  this.endDate = this.formatDate(selectedDate);
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				const day = String(date.getDate()).padStart(2, '0');
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const year = date.getFullYear();
				return `${year}/${month}/${day}`;
			},
			onSearchChange() {
				this.dataList = [];
				this.fetchData()
			},
			resetSearch() {
				this.dataList = [];
				this.startDate = '';
				this.endDate = '';
				this.fetchData();
			},
			async fetchData() {
				this.isLoading = true;

				try {
					// Gọi API để lấy dữ liệu
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://10.30.3.50:8386/api/dashboard/getDashboardMaterialProd', // Địa chỉ API
							method: 'GET',
							data: {
								startDate: this.startDate,
								endDate: this.endDate,
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
						this.updateChart(newData);
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
			updateChart(data) {
				// Trích xuất DEPARTMENT_CODE và COUNT từ dữ liệu API
				const material = data.map(item => item.MATERIAL_NAME);
				const counts = data.map(item => item.COUNTMATERIAL);

				// Lấy tham chiếu đến thành phần biểu đồ
				const chartRef = this.$refs.chartRef;

				// Khởi tạo hoặc cập nhật biểu đồ ECharts
				if (!this.chartInstance) {
					chartRef.init(echarts, chart => {
						this.chartInstance = chart;
						this.setChartOptions(material, counts);
					});
				} else {
					this.setChartOptions(material, counts);
				}
			},
			setChartOptions(material, counts) {
				// Cấu hình biểu đồ
				const options = {
					title: {
						text: 'Số lượng liệu',
						textStyle: {
						    fontSize: 18,      // You can also adjust the font size
						    fontWeight: 'bold' // Optionally, make the font bold
						},
					},
					tooltip: {
						trigger: 'axis',
					},
					xAxis: {
						type: 'category',
						data: material,
						axisLabel: {
							rotate: 45, // Xoay nhãn nếu cần
							fontWeight: 'bold', // Optionally make the font bold
							fontFamily: 'Arial' // You can specify a font family
						},
					},
					yAxis: {
						type: 'value',
					},
					series: [
						{
							name: 'Số lượng',
							type: 'bar',
							data: counts,
							itemStyle: {
								color: '#3398DB',
								fontWeight: 'bold', // Optionally make the font bold
								fontFamily: 'Arial' // You can specify a font family
							},
							label: {
							  show: true
							},
						},
					],
				};

				// Thiết lập option cho biểu đồ
				this.chartInstance.setOption(options);
			},
		},
	};
</script>

<style scoped>
/* Đảm bảo biểu đồ hiển thị đúng kích thước */
.view {
	width: 100%;
	height: 400px;
}
</style>
