<!--
 * @Author: zhangyao
 * @Date: 2022-08-10 16:11:00
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-19 10:05:34
-->
<template>
  <el-row>
    <el-col :md="6" :sm="24" v-for="(item, index) in cardList" :key="index">
      <el-card class="box-card dark:bg-dark-500">
        <template #header>
          <div class="card-header dark:text-white">
            <span>{{ item.name }}</span>
          </div>
        </template>
        <ux-skeleton v-model:loading="loading"></ux-skeleton>
        <div v-if="!loading" class="card-container">
          <div class="card-text-container">
            <p class="card-num">{{ item.num }}</p>
            <p class="dark:text-white">
              <el-icon><CaretTop /></el-icon>
              <span class="title-tip">{{ item.pre }}%与上周相比</span>
            </p>
          </div>
          <el-progress type="circle" :percentage="item.progress" :width="100" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { toRefs, ref } from 'vue'
import { CaretTop } from '@element-plus/icons-vue'
export default {
  components: {
    CaretTop
  },
  props: {
    cardList: {
      type: Array
    }
  },
  setup(props) {
    let { cardList } = toRefs(props)
    const loading = ref(true)
    return {
      cardList,
      loading
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  padding: 0 6px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .card-num {
    font-size: 20px;
    font-weight: bolder;
    color: #3c9ae8;
  }
  .title-tip {
    font-size: 12px;
  }
  .el-icon {
    vertical-align: middle;
    margin-right: 5px;
  }
  .card-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
