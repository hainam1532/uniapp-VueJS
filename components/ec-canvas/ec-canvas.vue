<template>
  <view style="width:100%; height:400%">
    <l-echart ref="chartRef"></l-echart>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const chartRef = ref(null);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        confine: true,
      },
      legend: {
        data: ['热度', '正面', '负面'],
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999999',
            },
          },
          axisLabel: {
            color: '#666666',
          },
        },
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999999',
            },
          },
          axisLabel: {
            color: '#666666',
          },
        },
      ],
      series: [
        {
          name: '热度',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside',
            },
          },
          data: [300, 270, 340, 344, 300, 320, 310],
        },
      ],
    };

    onMounted(() => {
      setTimeout(async () => {
        if (!chartRef.value) return;
        const myChart = await chartRef.value.init(echarts);
        myChart.setOption(option);
      }, 300);
    });

    return {
      chartRef,
    };
  },
};
</script>
