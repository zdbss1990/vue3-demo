<!--
 * @Author: zhangyao
 * @Date: 2022-01-24 17:11:38
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-01 13:56:14
-->
<template>
  <div class="menu-container-tpl" :style="{'width':activeName!=='top'&&!collapse ? '200px':activeName=='top' ? '100%':'60px' } ">
    <el-scrollbar>
      <el-menu
        :class="activeName=='top' ? 'ux-siderbar':''"
        :default-active="currentRoute"
        :mode="mode"
        :collapse="collapse"
        router
        active-text-color="#fff"
        text-color="#ffffffb3"
        class="bg-gray-800 dark:bg-dark-500"
      >
        <ux-menu
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
        ></ux-menu>
      </el-menu>
    </el-scrollbar>
    <div class="anticon-menu-fold bg-gray-400 dark:bg-dark-300" @click="toggleCollapse(!collapse)" v-if="activeName!=='top'">
         <el-icon>
             <ArrowLeftBold  v-if="!collapse"/>
             <ArrowRightBold v-else/>
         </el-icon>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import uxMenu from "./ux-menu.vue";
import useLayout from './../navbar/hooks/useLayout';
import { ArrowLeftBold , ArrowRightBold } from '@element-plus/icons-vue';
export default {
  components: {
    uxMenu,
    ArrowLeftBold,
    ArrowRightBold
  },
  props:{
    mode:{
      type:String,
      default:'vertical'
    }
  },
  setup() {
    const store = useStore();
    const route = useRouter();
    const permissionRoutes = computed(() => store.getters.permission_routes);
    const currentRoute = route.currentRoute.value.fullPath;
    let { activeName , collapse , toggleCollapse} = useLayout();
    return {
      permissionRoutes,
      currentRoute,
      activeName,
      collapse,
      toggleCollapse
    };
  },
};
</script>
<style lang="scss" scoped>
.menu-container-tpl {
  @include layout-con();
  @include el-scrollbar();
  position: relative;
  .anticon-menu-fold{
    position: absolute;
    top: 50%;
    left: 100%;
    padding:10px 4px;
    transform: translateY(-50%);
    border-radius:0px 4px 4px 0px;
    z-index: 100;
    
  }
  .el-menu {
    border: 0;
    height: 100%;
    width: 100%;
  }
  :deep(.el-menu-item) {
    &:hover,
    &.is-active {
      background: #0960bd !important;
    }
  }
  :deep(.el-sub-menu__title){
    &:hover,
    &.is-active {
      background: #0960bd !important;
    }
  }
}
</style>
