<!--
 * @Author: zhangyao
 * @Date: 2022-01-20 10:54:45
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-01-20 15:58:03
-->
<template>
  <ul class="bg-panel-tpl">
    <li
      v-for="(item, index) in bgList"
      :key="index"
      :style="{ background: item }"
      @click="changeBg(item)"
    ></li>
  </ul>
</template>

<script>
import useChangeBg from "./../../hooks/useChangeBg";
export default {
  setup() {
    const { changeBg, bgList } = useChangeBg;
    return {
      bgList,
      changeBg,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-panel-tpl {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  right: 10px;
  bottom: 20px;
  li {
    width: 50px;
    height: 50px;
    border: 2px solid #fefefe;
    border-radius: 50%;
    margin-bottom: 5px;
  }
}
</style>