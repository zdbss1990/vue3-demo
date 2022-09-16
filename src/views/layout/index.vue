<!--
 * @Author: zhangyao
 * @Date: 2022-01-18 17:05:40
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-01 15:56:11
-->
<template>
  <div id="layout-wrap" v-loading="loading" element-loading-background="#252121" element-loading-text="Loading...">
    <div class="layout-header bg-gray-800 dark:bg-dark-500" :class="activeName!=='top' ? 'layout-top-header':''"><navbar></navbar></div>
    <div class="layout-container">
      <div class="layout-sider" v-if="activeName!=='top'"><side></side></div>
        <div class="layout-main bg-white dark:bg-dark-900">
          <div class="tag-nav-wrapper">
            <tags-nav></tags-nav>
          </div>
          <app-main></app-main>
        </div>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar/index.vue";
import side from "./components/menu/index.vue";
import tagsNav from "./components/tags-nav/index.vue";
import AppMain from "./components/app-main.vue";
import { onMounted, ref } from 'vue';
import useLayout from './components/navbar/hooks/useLayout'
export default {
  components: { navbar, side, tagsNav, AppMain },
  setup() {
    let loading =ref(true);
    let { activeName } = useLayout();
    onMounted(()=>{
      setTimeout(()=>{
        loading.value=false
      },1000)
    })
    return {
      loading,
      activeName
    };
  },
};
</script>

<style lang="scss" scoped>
#layout-wrap {
  @include layout-con();
  display: flex;
  flex-direction: column;
  .layout-header {
    height: 58px;
  }
  .layout-container{
    width: 100%;
    height: calc(100% - 58px);
    display: flex;
    overflow: hidden;
  }
  .layout-main{
    flex:1;
    height: 100%;
    padding:10px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .layout-top-header{
    padding:16px 0px;
  }
  .tag-nav-wrapper{
    height: 40px;
  }
}
</style>