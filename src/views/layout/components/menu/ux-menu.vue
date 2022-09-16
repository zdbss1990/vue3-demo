<!--
 * @Author: zhangyao
 * @Date: 2022-02-09 10:17:03
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-10 15:55:08
-->
<template>
  <!-- 多级菜单 -->
  <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
       <template #title v-if="item.name">
           <ux-svg-icon v-if="item.meta?.icon" :icon-class="`${item.meta?.icon}`"></ux-svg-icon>
           <span>{{item.meta.title}}</span> 
      </template>
       <Menu v-for="route in item.children" :key="route.path" :item="route"></Menu>
  </el-sub-menu>
  <!-- 一级菜单 -->
  <el-menu-item v-else :index="item.path" class="!bg-gray-800 !dark:bg-dark-500">
    <ux-svg-icon
      v-if="item.meta?.icon"
      :icon-class="`${item.meta?.icon}`"
    ></ux-svg-icon>
     <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>
<script>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name:'Menu',
  props: {
    item: Object,
  },
  setup(props) {
    const route = useRouter();
    const currentRoute=route.currentRoute.value.fullPath;
    const { item } = toRefs(props);
    return {
      item,
      currentRoute
    };
  },
};
</script>
<style lang="scss" scoped></style>