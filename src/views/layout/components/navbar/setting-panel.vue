<!--
 * @Author: zhangyao
 * @Date: 2022-08-05 09:48:00
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-08 13:49:09
-->
<template>
  <div class="setting-panel-tpl">
    <div class="setting-panel">
      <h4 class="setting-panel-title mb-2 dark:text-gray-400">导航栏模式</h4>
      <div class="setting-panel-wrap">
        <div
          v-for="(item, index) in settingList"
          :key="index"
          class="setting-menu-item"
          :class="[
            `setting-menu-siderbar-${item}`,
            activeName == item ? 'active' : '',
          ]"
          @click="changeLayout(item)"
        >
          <div class="setting-menu-content"></div>
        </div>
      </div>
      <h4 class="setting-panel-title mt-2 mb-2 dark:text-gray-400">界面功能</h4>
      <div class="interface-panel">
         <div class="interface-panel-item">
            <span class="dark:text-gray-400 ">折叠菜单</span>
            <el-switch
              :disabled="activeName=='top'"
              v-model="menuCollapse"
              inline-prompt
              active-text="开"
              inactive-text="关"
            />
          </div>
           <div class="interface-panel-item">
            <span class="dark:text-gray-400 ">头部搜索</span>
            <el-switch
              v-model="search"
              inline-prompt
              active-text="开"
              inactive-text="关"
            />
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive , ref } from "vue";
import { useStore } from "vuex";
import  useLayout from './hooks/useLayout';
export default {
  setup() {
    const store = useStore();
    const settingList = reactive(["default", "top", "fold"]);
    let { activeName , collapse, toggleCollapse , searchVisable} = useLayout();
    const changeLayout=(item)=>{
        store.dispatch('changeLayoutActions',item)
        let flag=item== 'default' ? false : item== 'fold' ? true :false
        toggleCollapse(flag)
    }
    let menuCollapse=computed({
      get(){
        return collapse.value
      },
      set(val){
        toggleCollapse(val)
      }
    })
    let search=computed({
      get(){
        return searchVisable.value
      },
      set(val){
        store.dispatch('toggleSearchActions',val)
      }
    })
    return {
      settingList,
      activeName,
      collapse,
      changeLayout,
      menuCollapse,
      toggleCollapse,
      search
    };
  },
};
</script>
<style lang="scss" scoped>
.interface-panel-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting-panel-wrap {
  display: flex;
  .setting-menu-item {
    width: 54px;
    height: 48px;
    background: #fff;
    margin-right: 10px;
    position: relative;
    box-shadow: 0px 0px 4px 0px #1f2937;
    border-radius: 4px;
  }
  .setting-menu-siderbar-default {
    &::before {
      content: "";
      width: 100%;
      height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      background: #1f2937;
    }
    &::after {
      content: "";
      width: 15px;
      height: calc(100% - 10px);
      position: absolute;
      top: 10px;
      left: 0;
      background: #1f2937;
    }
  }
  .setting-menu-siderbar-top {
    &::before {
      content: "";
      width: 100%;
      height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      background: #1f2937;
    }
  }
  .setting-menu-siderbar-fold {
    &::before {
      content: "";
      width: 100%;
      height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      background: #1f2937;
    }
    &::after {
      content: "";
      width: 5px;
      height: calc(100% - 10px);
      position: absolute;
      top: 10px;
      left: 0;
      background: #1f2937;
    }
  }
  .active {
    border: 2px solid #0960bd;
  }
}
</style>