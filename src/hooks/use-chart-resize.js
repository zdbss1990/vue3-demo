/*
 * @Author: zhangyao
 * @Date: 2022-09-01 14:02:59
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-16 17:33:39
 */
import elementResizeDetectorMaker from 'element-resize-detector';
export default function useChartResize(chart) {
    const chartEleResizeListenner = () => {
        let erd = elementResizeDetectorMaker();
        erd.listenTo(chart._dom, () => {
            if (!chart) return;
            chart.resize();
        })
    }
    const windowResizeListenner = () => {
        if (!chart) return;
        chart.resize();
    }

    const addEventResizeListenner = () => {
        window.addEventListener('resize', windowResizeListenner);
        chartEleResizeListenner()
    }
    const removeEventResizeListenner = () => {
        window.removeEventListener('resize', windowResizeListenner);
    }
    return {
        addEventResizeListenner,
        removeEventResizeListenner
    }
}