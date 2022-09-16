/*
 * @Author: zhangyao
 * @Date: 2022-08-11 15:17:28
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-11 15:17:28
 */
<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
    <div class="bg"></div>
  </div>
</template>
<script>
import { inject, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import "echarts-gl";
import useChart from "./../hooks/useChart.js"; //工具类js，页面路径自己修改
import useChartResize from '@/hooks/use-chart-resize.js'
export default {
  setup() {
    const echarts = inject("ec");
    const chart = ref(null);
    let statusChart = null;
    let option = reactive({});
    let { setLabel, getPie3D , bindListen } = useChart();
    const optionData = reactive([
      {
        name: "昨日浏览量",
        value: 176,
      },
      {
        name: "今日浏览量",
        value: 253,
      },
       {
        name: "前天浏览量",
        value: 103,
      },
    ]);
    setLabel(optionData);
    const initChart = () => {
      statusChart = echarts.init(chart.value);
      option = getPie3D(optionData, 0.8, 180, 27, 25, 0.3);
      statusChart.setOption(option)
      option.series.push({
        name: 'pie2d', //自己根据场景修改
        backgroundColor: 'transparent',
        type: 'pie',
        label: {
          opacity: 1,
          fontSize: 13,
          lineHeight: 20
        },
        startAngle: -45, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['20%', '50%'],
        center: ['50%', '50%'],
        data: optionData,
        itemStyle: {
          opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
          color: "rgb(0,253,255,0.6)",
        }
      })
      statusChart.setOption(option);
      bindListen(statusChart,option);
    };
    onMounted(() => {
        initChart();
        let { addEventResizeListenner} = useChartResize(statusChart);
        addEventResizeListenner()
    });
    onBeforeUnmount(()=>{
      let { removeEventResizeListenner } = useChartResize(statusChart);
      removeEventResizeListenner()
    })
    return {
      optionData,
      chart,
      statusChart,
      option,
    };
  },
};
</script>
<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  .chart,
  .bg {
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .bg {
    position: absolute;
    bottom: 50px;
    left: 50%;
    z-index: 0;
    width: 275px;
    height: 150px;
    background: no-repeat center;
    background-image: url("./../../../assets/img/pie.png");
    background-size: 100% 100%;
    transform: translateX(-50%);
  }
}
</style>
