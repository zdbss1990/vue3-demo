<!--
 * @Author: zhangyao
 * @Date: 2022-09-09 13:39:28
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-09 16:26:11
-->
<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, onBeforeUnmount , inject } from "vue";
import useChartResize from "@/hooks/use-chart-resize.js";
export default {
  setup() {
    const echarts = inject("ec");
    let option = reactive({});
    const chart = ref(null);
    let statusChart = null;
    const generateData = (totalNum, bigvalue, smallvalue, color) => {
      let dataArr = [];
      for (var i = 0; i < totalNum; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: bigvalue,
            itemStyle: {
              normal: {
                color: color,
                borderWidth: 0,
              },
            },
          });
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: smallvalue,
            itemStyle: {
              normal: {
                color: "rgb(0,0,0,0)",
                borderWidth: 0,
              },
            },
          });
        }
      }
      return dataArr;
    };
    const threeData = generateData(6, 40, 5, "rgb(12,65,144)");
    const initChart = () => {
      statusChart = echarts.init(chart.value);
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}——{d}%<br/>访问量:{c}",
        },
        title: {
          text: "访问人数",
          subtext: "比例",
          x: "center",
          y: "45%",
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#999",
          },
          subtextStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#999",
          },
        },
        series: [
            {
              type: "pie",
              radius: ["80", "60"],
              center: ["50%", "50%"],
              color: [
                "rgb(255,183,112)",
                "rgb(255,162,70)",
                "rgb(254,130,8)",
                "rgb(125,235,255)",
                "rgb(77,194,255)",
                "rgb(50,185,255)",
                "rgb(24,176,255)",
                "rgb(1,155,255)",
                "rgb(39,115,254)",
                "rgb(39,93,254)",
              ],
            //   itemStyle: {
            //     normal: {
            //       borderWidth: 1,
            //       borderColor: "#CCC",
            //     },
            //   },
              data: [
                {
                  value: 5,
                  name: "9月30",
                },
                {
                  value: 13,
                  name: "10月1",
                },
                {
                  value: 21,
                  name: "10月2",
                },
                {
                  value: 40,
                  name: "10月3",
                },
                {
                  value: 73,
                  name: "10月4",
                },
              ],
              labelLine: {
                normal: {
                  show: true,
                  length: 100,
                  length2: 80,
                  lineStyle: {
                    color: "#999",
                    width: 2,
                    type: "dashed",
                  },
                },
              },
              label: {
                normal: {
                  formatter: "{b|{b}}\n{hr|}",
                  rich: {
                    b: {
                      fontSize: 12,
                      color: "#999",
                      align: "left",
                      padding: [0, 0, 0, 0],
                    }
                  },
                },
              },
            },
            {
              type: "pie",
              name: "旋转圆",
              zlevel: 20,
              silent: true,
              radius: ["65%", "80%"],
              hoverAnimation: false,
              startAngle: 50,
              data: threeData,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
            },
          ]
      };
      statusChart.setOption(option)
    };
    onMounted(() => {
      initChart();
      let { addEventResizeListenner } = useChartResize(statusChart);
      addEventResizeListenner();
    });
    onBeforeUnmount(() => {
      let { removeEventResizeListenner } = useChartResize(statusChart);
      removeEventResizeListenner();
    });
    return {
      option,
      chart,
      statusChart
    };
  },
};
</script>
<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
