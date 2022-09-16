<!--
 * @Author: zhangyao
 * @Date: 2022-01-21 15:15:18
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-13 16:52:33
-->
<template>
  <div class="home-tpl text-black dark:text-white">
    <banner-card :cardList="cardList"></banner-card>
    <div class="charts-container">
      <el-row>
        <el-col :md="16" :sm="24">
          <el-card class="box-card dark:bg-dark-500">
            <template #header>
              <div class="card-header dark:text-white">
                <span>历史访问记录</span>
              </div>
            </template>
            <div class="box-card-body">
              <pie-chart></pie-chart>
            </div>
          </el-card>
        </el-col>
        <el-col :md="8" :sm="24">
          <el-card class="box-card dark:bg-dark-500">
            <template #header>
              <div class="card-header dark:text-white">
                <span>访问人数增长比例</span>
              </div>
            </template>
            <div class="box-card-body">
              <ring-chart></ring-chart>
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-card class="box-card dark:bg-dark-500">
            <template #header>
              <div class="card-header dark:text-white">
                <span>用户列表排行</span>
              </div>
            </template>
            <div class="box-card-body">
              <el-table :data="userList" border stripe style="width: 100%">
                <el-table-column prop="username" label="UserName" />
                <el-table-column
                  prop="telephone"
                  label="Telephone"
                  width="180"
                />
                <el-table-column prop="address" label="Address" />
                <el-table-column fixed="right" label="Operations">
                  <template #default>
                    <el-button link type="primary" size="small"
                      >Detail</el-button
                    >
                    <el-button link type="primary" size="small">Edit</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-card class="box-card dark:bg-dark-500">
            <template #header>
              <div class="card-header dark:text-white">
                <span>日期进程</span>
              </div>
            </template>
            <div class="box-card-body">
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card class="dark:bg-dark-500 dark:text-white">
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card class="dark:bg-dark-500 dark:text-white">
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card class="dark:bg-dark-500 dark:text-white">
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { computed, defineAsyncComponent, onMounted, reactive, ref } from "vue";
export default {
  components: {
    BannerCard: defineAsyncComponent(() =>
      import("./components/banner-card.vue")
    ),
    PieChart: defineAsyncComponent(() =>
      import("./components/3d-pie-chart.vue")
    ),
    RingChart: defineAsyncComponent(() =>
      import("./components/ring-chart.vue")
    ),
  },
  setup() {
    const cardList = reactive([
      { name: "访问量", num: "70,239", pre: 0.5, progress: 50 },
      { name: "注册用户量", num: "18", pre: 0.01, progress: 10 },
      { name: "销售量", num: "1300", pre: 0.3, progress: 20 },
      { name: "销售额", num: "$1834.00", pre: 0.21, progress: 30 },
    ]);
    const userList = reactive([
      { username: "ZhangSan", telephone: "13223323322", address: "ShangHai" },
      { username: "LiSi", telephone: "13223323322", address: "BeiJin" },
      { username: "WangEr", telephone: "13223323322", address: "TianJin" },
      { username: "WangEes", telephone: "13223323322", address: "TianJin" },
      { username: "Wangyu", telephone: "13223323322", address: "TianJin" },
      { username: "Wangxx", telephone: "13223323322", address: "TianJin" },
      { username: "Wanger", telephone: "13223323322", address: "TianJin" },
    ]);
    return {
      cardList,
      userList,
    };
  },
};
</script>
<style lang="scss" scoped>
.charts-container {
  .el-col {
    padding: 0 6px;
    box-sizing: border-box;
    margin-top: 10px;
  }
  .box-card-body {
    height: 350px;
  }
}
</style>