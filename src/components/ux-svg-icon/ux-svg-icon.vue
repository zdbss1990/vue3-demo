<!--
 * @Author: zhangyao
 * @Date: 2022-02-09 13:55:46
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-04 11:18:05
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { toRefs, computed } from "vue";
export default {
  props: {
    iconClass: String,
    className: String,
    color:String
  },
  setup(props) {
    const { iconClass, className ,color } = toRefs(props);
    const svgClass = computed(() => {
      return className.value ? `svg-icon ${className.value}` : "svg-icon";
    });
    const iconName = computed(() => `#icon-${iconClass.value}`);
    return {
      svgClass,
      iconName,
      color
    };
  },
};
</script>
<style lang="scss">
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
</style>