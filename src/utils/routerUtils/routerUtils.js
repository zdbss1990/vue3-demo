/*
 * @Author: zhangyao
 * @Date: 2022-02-22 14:42:57
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-02-22 16:50:59
 */
class RouterUtils{
    getRouteTitleHandled(route){
      let router={...route};
      let meta={...route.meta};
      let title='';
      if(meta.title){
          if(typeof meta.title==='function'){
              meta.__titleIsFunction__=true;
              title=meta.title(router)
          }else title=meta.title
      }
      meta.title=title;
      router.meta=meta;
      return router;
    }
    objEqual(objOne, objTwo) {
        const keysArrOne = Object.keys(objOne);
        const keysArrTwo = Object.keys(objTwo);
        if (keysArrOne.length !== keysArrTwo.length) return false;
        else if (keysArrOne.length === 0 && keysArrTwo.length === 0) return true;
        else return !keysArrOne.some(key => decodeURI(objOne[key]) !== decodeURI(objTwo[key]));
    }
    routeEqual(routeOne, routeTwo) {
        const paramsOne = routeOne.params || {};
        const paramsTwo = routeTwo.params || {};
        const queryOne = routeOne.query || {};
        const queryTwo = routeTwo.query || {};
        return (
            routeOne.name === routeTwo.name && this.objEqual(paramsOne, paramsTwo) && this.objEqual(queryOne, queryTwo)
        );
    }
    doCustomTimes(times,callback){
        let i=-1;
        while(++i<times){
            callback(i)
        }
    }
    routeHasExist(tagNavList,routeItem){
        const len=tagNavList.length;
        let res=false;
        this.doCustomTimes(len,index=>{
            if(this.routeEqual(tagNavList[index], routeItem)) res=true
        })
        return res;
    }
    getHomeRoute(routers, homeName = 'Home') {
        let i = -1;
        let len = routers.length;
        let homeRoute = {};
        while (++i < len) {
            let item = routers[i];
            if (item.children && item.children.length) {
                let res = this.getHomeRoute(item.children, homeName);
                if (res.name) return res;
            } else {
                if (item.name === homeName) homeRoute = item;
            }
        }
        return homeRoute;
    }
    getNextRoute(list,route){
        let res={};
        if (list.length === 2) {
            res = this.getHomeRoute(list);
        } else {
            const index = list.findIndex(item => this.routeEqual(item, route));
            if (index === list.length - 1) res = list[list.length - 2];
            else res = list[index + 1];
        }
        return res;
    }
}

export default new RouterUtils;