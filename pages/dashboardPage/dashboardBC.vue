<template>
	<view class="flex flex-col items-center gap-4 h-full bg-blue-200 p-2">
		<!-- Card 1 -->
		<view class="flex flex-col items-center justify-center bg-white size-full shadow-lg rounded-xl p-2">
			<view class="flex text-center font-bold text-sm">
				<span>Top chuyền có giày B & C nhiều nhất</span>
			</view>
			<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="startDate" :start="minDate" :end="endDate" @change="onStartDateChange">
					<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
				</picker>

				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="endDate" :start="startDate" :end="maxDate" @change="onEndDateChange">
					<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
				</picker>
			</view>
			<view class="p-1 w-full">
				<button @click="onSearchChange()" class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm
					kiếm</button>
				<button @click="resetSearch()"
					class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
			</view>
			<view id="chart1" class="w-full h-[400px]"></view>
		</view>

		<!-- Card 2 -->
		<view class="flex flex-col items-center justify-center bg-white size-full shadow-lg rounded-xl p-2">
			<view class="flex text-center font-bold text-sm">
				<span>Top ART bị giày B & C nhiều nhất</span>
			</view>
			<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="startDate" :start="minDate" :end="endDate" @change="onStartDateChange">
					<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
				</picker>

				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="endDate" :start="startDate" :end="maxDate" @change="onEndDateChange">
					<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
				</picker>
			</view>
			<view class="p-1 w-full">
				<button @click="onSearchARTChange()"
					class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
				<button @click="resetSearchART()"
					class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
			</view>
			<view id="chart2" class="w-full h-[400px]"></view>
		</view>

		<!-- Card 3 -->
		<view class="flex flex-col items-center justify-center bg-white size-full shadow-lg rounded-xl p-2">
			<view class="flex text-center font-bold text-sm">
				<span>Top hình thể bị giày B & C nhiều nhất</span>
			</view>
			<view class="grid grid-cols-2 grid-rows-1 gap-2 w-full py-1.5">
				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="startDate" :start="minDate" :end="endDate" @change="onStartDateChange">
					<view class="uni-input">{{ startDate || 'Ngày bắt đầu' }}</view>
				</picker>

				<picker
					class="w-full h-full bg-white shadow-lg font-semibold border px-2 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
					mode="date" :value="endDate" :start="startDate" :end="maxDate" @change="onEndDateChange">
					<view class="uni-input">{{ endDate || 'Ngày kết thúc' }}</view>
				</picker>
			</view>
			<view class="p-1 w-full">
				<button @click="onSearchModelChange()"
					class="w-full rounded-lg font-semibold bg-[#3acdbb] text-white">Tìm kiếm</button>
				<button @click="resetSearchModel()"
					class="w-full rounded-lg font-semibold bg-red-400 text-white mt-1">Reset</button>
			</view>
			<view id="chart3" class="w-full h-[400px]"></view>
		</view>

		<button class="w-full rounded-lg bg-blue-400 font-semibold text-white" @click="backHome()">Return</button>
	</view>
</template>

<script>
	import * as echarts from "echarts";
	import {
		onMounted,
		onBeforeUnmount,
		ref
	} from "vue";

	export default {
		data() {
			return {
				dataLineBC: [], // Lưu dữ liệu từ API
				dataArtBC: [],
				dataModelBC: [],
				isLoading: false,
				intervalId: null,
				startDate: '',
				endDate: ''
			};
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

				if (new Date(this.endDate) < new Date(this.startDate)) {
					this.endDate = this.startDate;
				}
			},
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
				this.startDate = '';
				this.endDate = '';
				this.dataLineBC = [];
				this.dashboardLineBC();
			},
			resetSearchART() {
				this.startDate = '';
				this.endDate = '';
				this.dataArtBC = [];
				this.dashboardArtBC();
			},
			resetSearchModel() {
				this.startDate = '';
				this.endDate = '';
				this.dataModelBC = [];
				this.dashboardModelBC();
			},
			async dashboardLineBC() {
				this.isLoading = true;

				try {
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: "http://10.30.3.50:8386/api/dashboard/getDashboardLineBC",
							method: "GET",
							data: {
								startDate: this.startDate,
								endDate: this.endDate,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});

					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						this.dataLineBC = newData; // Cập nhật dữ liệu
						this.updateChart1(newData); // Cập nhật chart1
					} else {
						uni.showToast({
							title: "Không có dữ liệu mới.",
							icon: "none",
						});
					}
				} catch (error) {
					console.error("Lỗi khi gọi API:", error);
					uni.showToast({
						title: "Lỗi khi tải dữ liệu!",
						icon: "none",
					});
				} finally {
					this.isLoading = false;
				}
			},
			async dashboardArtBC() {
				this.isLoading = true;

				try {
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: "http://10.30.3.50:8386/api/dashboard/getDashboardArtBC",
							method: "GET",
							data: {
								startDate: this.startDate,
								endDate: this.endDate,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});

					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						this.dataArtBC = newData; // Cập nhật dữ liệu
						this.updateChart2(newData); // Cập nhật chart2
					} else {
						uni.showToast({
							title: "Không có dữ liệu mới.",
							icon: "none",
						});
					}
				} catch (error) {
					console.error("Lỗi khi gọi API:", error);
					uni.showToast({
						title: "Lỗi khi tải dữ liệu!",
						icon: "none",
					});
				} finally {
					this.isLoading = false;
				}
			},
			async dashboardModelBC() {
				this.isLoading = true;

				try {
					const response = await new Promise((resolve, reject) => {
						uni.request({
							url: "http://10.30.3.50:8386/api/dashboard/getDashboardModelBC",
							method: "GET",
							data: {
								startDate: this.startDate,
								endDate: this.endDate,
							},
							success: (res) => resolve(res),
							fail: (err) => reject(err),
						});
					});

					const newData = response.data?.data || [];
					if (Array.isArray(newData) && newData.length > 0) {
						this.dataArtBC = newData; // Cập nhật dữ liệu
						this.updateChart3(newData); // Cập nhật chart3
					} else {
						uni.showToast({
							title: "Không có dữ liệu mới.",
							icon: "none",
						});
					}
				} catch (error) {
					console.error("Lỗi khi gọi API:", error);
					uni.showToast({
						title: "Lỗi khi tải dữ liệu!",
						icon: "none",
					});
				} finally {
					this.isLoading = false;
				}
			},
			updateChart1(data) {
				const chart = this.charts.chart1;
				if (chart) {
					// Lọc Top 10 Department theo COUNT
					const topData = data
						.sort((a, b) => b.COUNT - a.COUNT) // Sắp xếp giảm dần theo COUNT
						.slice(0, 100); // Lấy Top 100

					// Chuẩn bị dữ liệu
					const categories = topData.map(item => item.DEPARTMENT_CODE); // Tên department
					const values = topData.map(item => item.COUNT); // Giá trị COUNT

					// Danh sách màu (có thể thêm nhiều màu hơn nếu cần)
					const colorList = [
						'#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
						'#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
					];

					// Cấu hình biểu đồ
					const option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow', // Tooltip dạng bóng
							},
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'value', // Trục X là giá trị COUNT
						},
						yAxis: {
							type: 'category', // Trục Y là các department
							data: categories, // Gán tên các department vào trục Y
						},
						series: [{
							name: 'Số lượng', // Tên series
							type: 'bar',
							data: values.map((value, index) => ({
								value, // Giá trị của thanh
								itemStyle: {
									color: colorList[index % colorList.length], // Màu theo index
								},
							})),
							label: {
								show: true, // Hiển thị giá trị trên thanh
							},
						}, ],
					};

					chart.setOption(option); // Cập nhật biểu đồ
				}
			},
			updateChart2(data) {
				const chart = this.charts.chart2;
				if (chart) {
					// Lọc Top 10 Department theo COUNT
					const topData = data
						.sort((a, b) => b.COUNT - a.COUNT) // Sắp xếp giảm dần theo COUNT
						.slice(0, 100); // Lấy Top 100

					// Chuẩn bị dữ liệu
					const categories = topData.map(item => item.ART); // Tên department
					const values = topData.map(item => item.COUNT); // Giá trị COUNT

					// Danh sách màu (có thể thêm nhiều màu hơn nếu cần)
					const colorList = [
						'#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
						'#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
					];

					// Cấu hình biểu đồ
					const option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow', // Tooltip dạng bóng
							},
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'value', // Trục X là giá trị COUNT
						},
						yAxis: {
							type: 'category', // Trục Y là các department
							data: categories, // Gán tên các department vào trục Y
						},
						series: [{
							name: 'Số lượng', // Tên series
							type: 'bar',
							data: values.map((value, index) => ({
								value, // Giá trị của thanh
								itemStyle: {
									color: colorList[index % colorList.length], // Màu theo index
								},
							})),
							label: {
								show: true, // Hiển thị giá trị trên thanh
							},
						}, ],
					};

					chart.setOption(option); // Cập nhật biểu đồ
				}
			},
			updateChart3(data) {
				const chart = this.charts.chart3;
				if (chart) {
					// Lọc Top 10 Department theo COUNT
					const topData = data
						.sort((a, b) => b.COUNT - a.COUNT) // Sắp xếp giảm dần theo COUNT
						.slice(0, 100); // Lấy Top 100

					// Chuẩn bị dữ liệu
					const categories = topData.map(item => item.STYLE); // Tên department
					const values = topData.map(item => item.COUNT); // Giá trị COUNT

					// Danh sách màu (có thể thêm nhiều màu hơn nếu cần)
					const colorList = [
						'#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
						'#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
					];

					// Cấu hình biểu đồ
					const option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow', // Tooltip dạng bóng
							},
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'value', // Trục X là giá trị COUNT
						},
						yAxis: {
							type: 'category', // Trục Y là các department
							data: categories, // Gán tên các department vào trục Y
						},
						series: [{
							name: 'Số lượng', // Tên series
							type: 'bar',
							data: values.map((value, index) => ({
								value, // Giá trị của thanh
								itemStyle: {
									color: colorList[index % colorList.length], // Màu theo index
								},
							})),
							label: {
								show: true, // Hiển thị giá trị trên thanh
							},
						}, ],
					};

					chart.setOption(option); // Cập nhật biểu đồ
				}
			}
		},
		setup() {
			const charts = {}; // Lưu trữ các instance biểu đồ

			const initChart = (id) => {
				const chartDom = document.getElementById(id);
				if (chartDom) {
					const chart = echarts.init(chartDom);
					charts[id] = chart;
				}
			};

			const resizeCharts = () => {
				Object.values(charts).forEach((chart) => chart.resize());
			};

			onMounted(() => {
				// Khởi tạo các biểu đồ
				initChart("chart1");
				initChart("chart2");
				initChart("chart3");

				// Lắng nghe sự kiện resize
				uni.onWindowResize(resizeCharts);
			});

			onBeforeUnmount(() => {
				// Hủy sự kiện và xóa biểu đồ
				uni.offWindowResize(resizeCharts);
				Object.values(charts).forEach((chart) => chart.dispose());
			});

			return {
				charts,
			};
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