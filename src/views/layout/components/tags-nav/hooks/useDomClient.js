/*
 * @Author: zhangyao
 * @Date: 2022-08-09 16:01:56
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-10 09:42:04
 */
import {
    ref, watch
} from "vue";
export default function useDomClient(store,currentRouter,toPage,activeRoute) {
    //打开菜单
    const visable = ref(false);
    const contextMenuLeft = ref(0);
    const contextMenuTop = ref(0);
    const disabled = ref(false);
    const contextMenu = (route, e) => {
        //如果是home返回
        disabled.value = route.name!==activeRoute.name  ? true:false
        if (route.name == 'Home') return;
        visable.value = true;
        contextMenuLeft.value = e.clientX -  10;
        contextMenuTop.value = e.clientY + 20;
    }
    const closeMenu=()=>visable.value=false;
    const handelClose=(key,routes)=>{
        let currentRoute;
        if(key=='all'){
            currentRoute=routes[0]
            store.dispatch("filterRouteActions",{flag:'all', currentRoute});
        }else{
            currentRoute=currentRouter.value
            store.dispatch("filterRouteActions",{flag:'other', currentRoute});
        }
        toPage(currentRoute)
    }
    watch(visable,(newVal,oldVal)=>{
        if(newVal){
            document.addEventListener('click',closeMenu)
        }else{
            document.removeEventListener('click',closeMenu)
        }
    })
    return {
        visable,
        contextMenuLeft,
        contextMenuTop,
        contextMenu,
        closeMenu,
        handelClose,
        disabled
    }
}