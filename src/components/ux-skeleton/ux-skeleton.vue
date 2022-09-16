<!--
 * @Author: zhangyao
 * @Date: 2022-08-11 10:07:14
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-11 10:28:58
-->
<template>
  <el-skeleton animated :loading="loading">
    <template #template>
      <el-skeleton-item variant="text" style="width: 30%" />
      <el-skeleton-item variant="text" />
      <el-skeleton-item variant="text" />
    </template>
  </el-skeleton>
</template>
<script>
import { toRefs , onMounted } from "vue";
export default{
    props:{
        loading:{
            type:Boolean,
            default:false
        }
    },
    setup(props,context) {
       let { loading } = toRefs(props);
       onMounted(()=>{
            setTimeout(() => {
                context.emit('update:loading',false)
            }, 1000)
       })
       return{
        loading
       }
    }
}
</script>