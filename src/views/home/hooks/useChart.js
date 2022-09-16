/*
 * @Author: zhangyao
 * @Date: 2022-08-12 09:56:36
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-01 15:54:45
 */
const color = ["#E6A23C", "#3c9ae8", "#F56C6C"];
export default function useChart() {
    //设置lable
    const setLabel = (optionData) => {
        optionData.forEach((item, index) => {
            item = Object.assign(item, {
                itemStyle: {
                    color: color[index]
                },
                label: {
                    show: true,
                    color: color[index],
                    formatter: [
                        '{b|{b}}',
                        '{c|{c}}{b|位}',
                        '{d|{d}%}'
                    ].join('\n'), // 用\n来换行
                    rich: {
                        b: {
                            color: color[index],
                            lineHeight: 25,
                            align: 'left'
                        },
                        c: {
                            fontSize: 22,
                            color: color[index],
                            textShadowColor: '#1c90a6',
                            textShadowOffsetX: 0,
                            textShadowOffsetY: 2,
                            textShadowBlur: 5
                        },
                        d: {
                            color: color[index],
                            align: 'left'
                        }
                    }
                },
                labelLine: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(255,255,255,0.7)'
                    }
                }
            })
        })
    }
    //获取3d方法
    const getPie3D = (pieData, internalDiameterRatio, distance, alpha, pieHeight, opacity = 1) => {
        const series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let legendBfb = [];
        const k = 1 - internalDiameterRatio;
        pieData.sort((a, b) => {
            return b.value - a.value
        })
        for (let i = 0; i < pieData.length; i++) {
            sumValue += pieData[i].value;
            const seriesItem = {
                name: typeof pieData[i].name == 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: k
                },
                center: ['10%', '50%']
            }
            if (typeof pieData[i].itemStyle !== 'undefined') {
                const itemStyle = {}
                itemStyle.color =
                    typeof pieData[i].itemStyle.color !== 'undefined' ?
                    pieData[i].itemStyle.color :
                    opacity
                itemStyle.opacity =
                    typeof pieData[i].itemStyle.opacity !== 'undefined' ?
                    pieData[i].itemStyle.opacity :
                    opacity
                seriesItem.itemStyle = itemStyle
            }
            series.push(seriesItem)
        }
        legendData = []
        legendBfb = []
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value
            series[i].pieData.startRatio = startValue / sumValue
            series[i].pieData.endRatio = endValue / sumValue
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                series[i].pieData.value
            )
            startValue = endValue
            const bfb = fomatFloat(series[i].pieData.value / sumValue, 4)
            legendData.push({
                name: series[i].name,
                value: bfb
            })
            legendBfb.push({
                name: series[i].name,
                value: bfb
            })
        }
        const boxHeight = getHeight3D(series, pieHeight) // 通过pieHeight设定3d饼/环的高度，单位是px
        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        const option = {
            legend: {
                show: false,
                data: legendData,
                orient: 'vertical',
                left: 10,
                top: 10,
                itemGap: 10,
                textStyle: {
                    color: '#A1E2FF'
                },
                icon: 'circle',
                formatter: function (param) {
                    const item = legendBfb.filter(item => item.name === param)[0]
                    const bfs = fomatFloat(item.value * 100, 2) + '%'
                    return `${item.name}  ${bfs}`
                }
            },
            labelLine: {
                show: true,
                lineStyle: {
                    color: '#3c9ae8'
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{b} \n{c} {d}%'
            },
            tooltip: {
                backgroundColor: '#fff',
                borderColor: '#3c9ae8',
                textStyle: {
                    color: '#3c9ae8',
                    fontSize: 13
                },
                formatter: params => {
                    if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
                        let bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) *
                            100).toFixed(2);
                        return `${params.seriesName}<br/>` +
                            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                            `${ bfb }%`;
                    }
                }
            },
            xAxis3D: {
                min: -1,
                max: 1
            },
            yAxis3D: {
                min: -1,
                max: 1
            },
            zAxis3D: {
                min: -1,
                max: 1
            },
            grid3D: {
                show: false,
                boxHeight: boxHeight, // 圆环的高度
                viewControl: {
                    // 3d效果可以放大、旋转等，请自己去查看官方配置
                    alpha, // 角度
                    distance, // 调整视角到主体的距离，类似调整zoom
                    rotateSensitivity: 0, // 设置为0无法旋转
                    zoomSensitivity: 0, // 设置为0无法缩放
                    panSensitivity: 0, // 设置为0无法平移
                    autoRotate: false // 自动旋转
                }
            },
            series: series
        }
        return option
    }


    /**
     * 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
     */
    const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
        // 计算
        const midRatio = (startRatio + endRatio) / 2
        const startRadian = startRatio * Math.PI * 2
        const endRadian = endRatio * Math.PI * 2
        const midRadian = midRatio * Math.PI * 2
        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            isSelected = false
        }
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3
        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        const hoverRate = isHovered ? 1.05 : 1
        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32
            },
            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20
            },
            x: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetX +
                        Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    )
                }
                if (u > endRadian) {
                    return (
                        offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    )
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
            },
            y: function (u, v) {
                if (u < startRadian) {
                    return (
                        offsetY +
                        Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    )
                }
                if (u > endRadian) {
                    return (
                        offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    )
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
            },
            z: function (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u)
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1
                }
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
            }
        }
    }

    /**
     * 获取3d丙图的最高扇区的高度
     */
    const getHeight3D = (series, height) => {
        series.sort((a, b) => {
            return b.pieData.value - a.pieData.value
        })
        return (height * 25) / series[0].pieData.value
    }

    /**
     * 格式化浮点数
     */
    const fomatFloat = (num, n) => {
        let f = parseFloat(num)
        if (isNaN(f)) {
            return false
        }
        f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
        let s = f.toString()
        let rs = s.indexOf('.')
        // 判定如果是整数，增加小数点再补0
        if (rs < 0) {
            rs = s.length
            s += '.'
        }
        while (s.length <= rs + n) {
            s += '0'
        }
        return s
    }

    const bindListen = (myChart, option) => {
        let hoveredIndex = '';
        // 监听 mouseover，近似实现高亮（放大）效果
        myChart.on('mouseover', (params) => {
            // 准备重新渲染扇形所需的参数
            let isSelected
            let isHovered
            let startRatio
            let endRatio
            let k
            if (hoveredIndex === params.seriesIndex) {
                return;
                // 否则进行高亮及必要的取消高亮操作
            } else {
                if (hoveredIndex !== "") {
                    const hoveredSelectData = option.series[hoveredIndex];
                    if (hoveredSelectData.name !== "pie2d") {
                        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                        isSelected = hoveredSelectData.pieStatus.selected;
                        isHovered = false;
                        startRatio = hoveredSelectData.pieData.startRatio;
                        endRatio = hoveredSelectData.pieData.endRatio;
                        k = hoveredSelectData.pieStatus.k;

                        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                        option.series[hoveredIndex].parametricEquation =
                            getParametricEquation(
                                startRatio,
                                endRatio,
                                isSelected,
                                isHovered,
                                k,
                                option.series[hoveredIndex].pieData.value
                            );
                        option.series[hoveredIndex].pieStatus.hovered = isHovered;

                        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                        hoveredIndex = "";
                    }
                }

                // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
                if (params.seriesName !== "mouseoutSeries") {
                    const mouseoverSelectData = option.series[params.seriesIndex];
                    if (mouseoverSelectData.name !== "pie2d") {
                        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                        isSelected = mouseoverSelectData.pieStatus.selected;
                        isHovered = true;
                        startRatio = mouseoverSelectData.pieData.startRatio;
                        endRatio = mouseoverSelectData.pieData.endRatio;
                        k = mouseoverSelectData.pieStatus.k;
                        // 对当前点击的扇形，执行高亮操作（对 option 更新）
                        option.series[params.seriesIndex].parametricEquation =
                            getParametricEquation(
                                startRatio,
                                endRatio,
                                isSelected,
                                isHovered,
                                k,
                                option.series[params.seriesIndex].pieData.value + 5
                            );
                        option.series[params.seriesIndex].pieStatus.hovered = isHovered;
                        // 记录上次高亮的扇形对应的系列号 seriesIndex
                        hoveredIndex = params.seriesIndex;
                    }
                }

                // 使用更新后的 option，渲染图表
                myChart.setOption(option)
            }
        })
        // 修正取消高亮失败的 bug
        myChart.on('globalout', () => {
            // 准备重新渲染扇形所需的参数
            let isSelected
            let isHovered
            let startRatio
            let endRatio
            let k
            if (hoveredIndex !== '') {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                isSelected = option.series[hoveredIndex].pieStatus.selected
                isHovered = false
                k = option.series[hoveredIndex].pieStatus.k
                startRatio = option.series[hoveredIndex].pieData.startRatio
                endRatio = option.series[hoveredIndex].pieData.endRatio
                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                option.series[
                    hoveredIndex
                ].parametricEquation = getParametricEquation(
                    startRatio,
                    endRatio,
                    isSelected,
                    isHovered,
                    k,
                    option.series[hoveredIndex].pieData.value
                )
                option.series[hoveredIndex].pieStatus.hovered = isHovered
                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = ''
            }
            // 使用更新后的 option，渲染图表
            myChart.setOption(option)
        })
    }
    return {
        setLabel,
        getPie3D,
        getParametricEquation,
        bindListen
    }
}