<!--
 * @Author: zhangyao
 * @Date: 2022-01-24 17:15:15
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-13 16:21:05
-->
<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
            <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);
    return {
      key
    };
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  padding: 10px 0px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>