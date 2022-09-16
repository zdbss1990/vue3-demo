/*
 * @Author: zhangyao
 * @Date: 2022-08-05 13:44:41
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-08 13:48:45
 */
import { useStore } from "vuex";
import { computed } from 'vue';
export default function useLayout(){
    const store = useStore();
    let activeName = computed(() => store.state.app.layoutType);
    let collapse = computed(() => store.state.app.collapse);
    let searchVisable=computed(()=>store.state.app.search)
    const toggleCollapse=(val)=>{
      store.dispatch('toggleCollapseActions',val)
    }
    return {
        activeName,
        collapse,
        toggleCollapse,
        searchVisable
    }
}