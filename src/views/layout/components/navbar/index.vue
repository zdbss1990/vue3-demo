<!--
 * @Author: zhangyao
 * @Date: 2022-01-24 17:14:06
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-08 11:05:03
-->
<template>
  <div class="navbar-container px-2">
    <div class="navbar-logo text-white dark:text-white">ZY Admin</div>
    <div class="horizontal-side-wrap" v-if="activeName=='top'"><side mode="horizontal"></side></div>
    <nav-opt @toggleSeting="toggleSeting"></nav-opt>
    <!-- 全局配置菜单 -->
    <el-drawer
      v-model="drawer"
      title="项目配置"
      direction="rtl"
      size="20%"
      :before-close="handleClose"
    >
      <setting-panel></setting-panel>
  </el-drawer>
  </div>
</template>
<script>
import navOpt from './nav-opt.vue';
import side from './../menu';
import { ref } from 'vue';
import SettingPanel from './setting-panel.vue';
import useLayout from './hooks/useLayout'
export default {
  components: { navOpt, side, SettingPanel },
  setup() {
    const drawer=ref(false);
    let { activeName } = useLayout();
    const handleClose=()=>{
      drawer.value=false;
    }
    const toggleSeting=(val)=>{
      drawer.value=val;
    }
    return {
       drawer,
       handleClose,
       toggleSeting,
       activeName
    }
  },
};
</script>
<style lang="scss" scoped>
.navbar-container{
  // padding:10px 20px;
  @include flex-box(100%,space-between);
  box-sizing: border-box;
  .navbar-logo{
    font-weight: bolder;
  }
  .horizontal-side-wrap{
    flex:1;
    margin:0px 150px;
  }
}
</style>
