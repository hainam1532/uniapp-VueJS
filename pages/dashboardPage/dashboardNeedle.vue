<template>
    <view class="flex flex-col items-center gap-4 h-screen bg-blue-200 p-2">
        <!-- Card 1 -->
        <view class="flex flex-col bg-white size-full shadow-lg rounded-xl p-2">
            <view class="flex text-center font-bold text-[20px] items-center justify-center">
                <span>Top kim may</span>
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
            <view>
                <l-echart style="width:100%; height:600px" ref="chartRef"></l-echart>
            </view>
        </view>
        <button class="w-full rounded-lg bg-blue-400 font-semibold text-white" @click="backHome()">Return</button>
    </view>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    // Khai báo các biến và references
    const chartRef = ref(null);
    const startDate = ref('');
    const endDate = ref('');
    const metalNoData = ref([]);
    const countData = ref([]);
    const isLoading = ref(false);
    const colorList = [
      '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
      '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570',
    ];

    // Khởi tạo option cho biểu đồ
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: metalNoData.value,
      },
      series: [{
        name: 'Số lượng',
        type: 'bar',
        data: countData.value,
        label: {
          show: true,
        },
        itemStyle: {
          color: function(params) {
            return colorList[params.dataIndex % colorList.length];
          },
        },
      }],
    };

    let myChart = null;

    // Khởi tạo biểu đồ khi component được mount
    onMounted(() => {
      nextTick(() => {
        // Đảm bảo chartRef.value là một DOM element hợp lệ
        if (chartRef.value && chartRef.value.$el) {
          myChart = echarts.init(chartRef.value.$el);
          myChart.setOption(option);
        } else {
          console.error("chartRef is not a valid DOM element");
        }
      });
    });

    // Hàm gọi API và cập nhật dữ liệu
    const dashboardMaterialIQC = async () => {
      isLoading.value = true;
      try {
        const response = await uni.request({
          url: "http://10.30.3.50:8386/api/dashboard/getDashboardNeedle",
          method: "GET",
          data: {
            startDate: startDate.value,
            endDate: endDate.value,
          },
        });

        const newData = response.data?.data || [];
        if (Array.isArray(newData) && newData.length > 0) {
          metalNoData.value = newData.map(item => item.METAL_NO);
          countData.value = newData.map(item => item.COUNT);
          
          // Cập nhật biểu đồ sau khi có dữ liệu mới
          if (myChart) {
            myChart.setOption({
              yAxis: [{
                data: metalNoData.value,
              }],
              series: [{
                data: countData.value,
              }],
            });
          }
        } else {
          uni.showToast({
            title: "Không có dữ liệu mới.",
            icon: "none",
          });
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        uni.showToast({ title: "Lỗi khi tải dữ liệu!", icon: "none" });
      } finally {
        isLoading.value = false;
      }
    };

    // Hàm thay đổi ngày bắt đầu
    const onStartDateChange = (e) => {
      const selectedDate = e.detail.value;
      startDate.value = formatDate(selectedDate);
      if (new Date(endDate.value) < new Date(startDate.value)) {
        endDate.value = startDate.value;
      }
    };

    // Hàm thay đổi ngày kết thúc
    const onEndDateChange = (e) => {
      const selectedDate = e.detail.value;
      endDate.value = formatDate(selectedDate);
    };

    // Hàm format ngày tháng
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    };

    // Hàm tìm kiếm dữ liệu
    const onSearchChange = () => {
      metalNoData.value = [];
      countData.value = [];
      dashboardMaterialIQC();
    };

    // Hàm reset tìm kiếm
    const resetSearch = () => {
      startDate.value = '';
      endDate.value = '';
      metalNoData.value = [];
      countData.value = [];
      dashboardMaterialIQC();
    };

    // Hàm quay lại trang chủ
    const backHome = () => {
      uni.navigateTo({
        url: '/pages/index/indexDashboard',
      });
    };

    return {
      chartRef,
      startDate,
      endDate,
      metalNoData,
      countData,
      isLoading,
      onStartDateChange,
      onEndDateChange,
      onSearchChange,
      resetSearch,
      backHome,
      dashboardMaterialIQC,
    };
  },
  mounted() {
    this.dashboardMaterialIQC();
    this.intervalId = setInterval(() => {
      this.dashboardMaterialIQC();
    }, 300000); // Cập nhật dữ liệu mỗi 5 phút
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>
