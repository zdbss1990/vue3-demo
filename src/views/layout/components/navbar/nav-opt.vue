<!--
 * @Author: zhangyao
 * @Date: 2022-08-04 11:25:00
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-08 13:51:13
-->
<template>
     <ul class="navbar-opt">
      <li class="opt-item">
         <transition name="fade">
           <el-input v-model="search" placeholder="请输入搜索内容" v-show="toggleSearch&&searchVisable"/>
         </transition>
      </li>
      <li class="opt-item">
        <ux-svg-icon icon-class="search" v-show="searchVisable" @click="toggleSearch=!toggleSearch"></ux-svg-icon>
      </li>
      <li class="opt-item">
         <el-dropdown class="dark:text-white">
            <el-badge is-dot class="item">
            <ux-svg-icon icon-class="message" class="text-size-[18px] "></ux-svg-icon>
        </el-badge>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item  v-for="(item,index) in msgList" :key="index">
                    <div class="msg-item py-2 px-1">
                        <img class="w-8 mr-2" :src="item.imgSrc"/>
                        <div>
                            <p class="mb-1">{{item.text}}</p>
                            <p class="text-size-[12px]">{{formatDate(item.date)}}</p>
                        </div>
                    </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li class="opt-item">
       <el-dropdown class="dark:text-white" trigger="click">
          <span class="el-dropdown-link">
            <el-avatar size="small"
             src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span class="user-name text-size-[12px] truncate px-1">ZY Admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><div @click="logout">退出系统</div></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li class="opt-item">
        <ux-svg-icon :icon-class="dark ? 'day':'night'" @click="toggleTheme"></ux-svg-icon>
      </li>
      <li class="opt-item">
        <ux-svg-icon icon-class="set" @click="toggleSeting"></ux-svg-icon>
      </li>
    </ul>
</template>
<script>
import { ref , watch ,reactive, computed} from 'vue';
import { formatDate } from '@/utils/utils.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import  useLayout from './hooks/useLayout';
export default {
     setup(props,context) {
     let search= ref('');
     let toggleSearch=ref(false);
     const store=useStore();
     const router=useRouter();
     let { searchVisable } = useLayout();
     const msgList=reactive([
        {
            imgSrc:'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            text:'你收到了8份新消息',
            date:1659592753707
        },
        {
            imgSrc:'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            text:'你收到了8份新消息',
            date:1659592753707
        },
        {
            imgSrc:'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            text:'你收到了8份新消息',
            date:1659592753707
        }
     ])
     let dark = computed(()=>store.state.app.dark)
     const toggleTheme=()=>{
        store.dispatch('toggleThemeActions',!dark.value)
     }
     watch(dark,(newVal,oldVal)=>{
        if(newVal){
          document.documentElement.classList.add('dark')
        }else{
          document.documentElement.classList.remove('dark')
        }
     },{immediate:true})
     //退出
     const logout=()=>{
        store.dispatch('logOut').then(res=>{
            router.push({path:'/login'})
        })
     }
     //打开菜单
     const toggleSeting=()=>{
        context.emit('toggleSeting',true)
     }
     return{
       dark,
       search,
       toggleSearch,
       msgList,
       formatDate,
       logout,
       toggleTheme,
       toggleSeting,
       searchVisable
     }
  },
}
</script>
<style lang="scss" scoped>
  .navbar-opt{
    display: flex;
    align-items: center;
  }
  .user-name{
    vertical-align: super;
  }
  .opt-item{
   padding: 0 4px;
   box-sizing: border-box;
   text-align: center;
  }
  .msg-item{
    display: flex;
    align-items: center;
  }
  .fade-enter-from,
  .fade-leave-to{
    /*定义进入开始和离开结束的透明度为0*/
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from{
    /*定义进入结束和离开开始的透明度为1*/
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active{
    /*定义进入和离开过渡状态的透明度变化的时间和变化曲线*/
    transition: opacity 1s ease;
  }
</style>