<!--
 * @Author: zhangyao
 * @Date: 2022-01-24 17:16:50
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-19 10:20:44
-->
<template>
  <div class="nav-wrapper">
    <div class="btn-con left-btn">
      <el-icon @click="handleScroll(240)" class="dark:text-white"
        ><ArrowLeftBold
      /></el-icon>
    </div>
    <div class="tags-wrapper">
      <div
        class="scroll-outer"
        ref="scrollOuter"
        @DOMMouseScroll="handlescroll"
        @mousewheel="handlescroll"
      >
        <div
          class="scroll-body"
          ref="scrollBody"
          :style="{ left: tagBodyLeft + 'px' }"
        >
          <transition-group
            name="taglist-moving-animation"
            class="tag-wrapper dark:text-white"
            tag="div"
          >
            <el-tag
              v-for="(route, index) in routes"
              :key="`tag-nav-${index}`"
              :class="isCurrentTag(route) ? 'tag-checked' : ''"
              type="info"
              effect="plain"
              :closable="index == 0 ? false : true"
              size="large"
              @click="toPage(route)"
              @close="closeTag(route)"
              @contextmenu.prevent="contextMenu(route, $event)"
            >
              {{ route.meta.title }}
            </el-tag>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="btn-con right-btn">
      <el-icon @click="handleScroll(-240)" class="dark:text-white"
        ><ArrowRightBold
      /></el-icon>
    </div>
    <ul
      v-show="visable"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      class="contextmenu"
    >
      <li v-for="(item, key) of menuList" :key="key">
        <el-link
          :underline="false"
          :disabled="key == 'other' && (disabled || routes.length <= 2)"
          @click="handelClose(key, routes)"
          >{{ item }}</el-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'
import useDomClient from './hooks/useDomClient'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
export default {
  components: {
    ArrowLeftBold,
    ArrowRightBold
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const routes = computed(() => store.state.app.routerList)
    const scrollOuter = ref(null)
    const scrollBody = ref(null)
    const menuList = reactive({
      all: '关闭全部标签页',
      other: '关闭其他标签页'
    })
    watch(
      () => route,
      (newVal, oldVal) => {
        let { query, name, params, meta, path } = newVal
        store.dispatch('routeListActions', {
          route: { name, query, params, meta, path }
        })
      },
      { immediate: true, deep: true }
    )
    let currentRoute = computed(() => {
      let { query, name, params, meta, path } = route
      return { query, name, params, meta, path }
    })
    //
    const isCurrentRouter = (oneRoute, twoRoute) => {
      return oneRoute.name == twoRoute.value.name
    }
    //判断当前路由激活
    const isCurrentTag = (route) => {
      return isCurrentRouter(route, currentRoute)
    }
    //点击跳转
    const toPage = (route) => {
      let { query = {}, params = {}, path } = route
      router.push({
        path,
        query,
        params
      })
      closeMenu()
    }
    //获取前一个路由
    const getPreRoute = (routes, route) => {
      let result
      if (routes.value.length == 2) {
        result = routes.value[0] //长度等于2直接跳到主页
        store.dispatch('filterRouteActions', {
          flag: 'default',
          currentRoute: route
        })
      } else {
        //不等于2找到当前的路由前一项
        let index = routes.value.findIndex((item) => item.name == route.name)
        result = routes.value[--index]
        store.dispatch('filterRouteActions', {
          flag: 'default',
          currentRoute: route
        })
      }
      toPage(result)
    }
    //关闭
    const closeTag = (route) => {
      //判断是否是当前激活的路由
      //1.不是当前激活路由直接删除数组这一项
      //2.是当前激活路由，删除当前激活路由，判断前一项是否有值把激活项移动到前一项
      if (!isCurrentRouter(route, currentRoute)) {
        store.dispatch('filterRouteActions', {
          flag: 'default',
          currentRoute: route
        })
      } else {
        getPreRoute(routes, route)
      }
      closeMenu()
    }
    const handlescroll = (e) => {
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      handleScroll(delta)
    }
    //滚动
    const tagBodyLeft = ref(0)
    const handleScroll = (offset) => {
      const outerWidth = scrollOuter.value.offsetWidth
      const bodyWidth = scrollBody.value.offsetWidth
      if (offset > 0) {
        tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (tagBodyLeft.value < -(bodyWidth - outerWidth)) {
            // eslint-disable-next-line no-self-assign
            tagBodyLeft.value = tagBodyLeft.value
          } else {
            tagBodyLeft.value = Math.max(
              tagBodyLeft.value + offset,
              outerWidth - bodyWidth
            )
          }
        } else {
          tagBodyLeft.value = 0
        }
      }
    }
    const {
      visable,
      contextMenuLeft,
      contextMenuTop,
      contextMenu,
      closeMenu,
      handelClose,
      disabled
    } = useDomClient(store, currentRoute, toPage, route)
    return {
      routes,
      currentRoute,
      isCurrentTag,
      toPage,
      closeTag,
      menuList,
      contextMenu,
      visable,
      contextMenuLeft,
      contextMenuTop,
      closeMenu,
      handelClose,
      disabled,
      handlescroll,
      handleScroll,
      scrollOuter,
      scrollBody,
      tagBodyLeft
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-wrapper {
  @include layout-con;
  display: flex;
  align-items: center;
  overflow: hidden;
  .tags-wrapper {
    position: relative;
    @include layout-con;
    overflow: hidden;
    display: flex;
    align-items: center;
    .scroll-outer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .scroll-body {
        height: calc(100% - 1px);
        display: inline-block;
        padding: 3px;
        position: absolute;
        overflow: visible;
        white-space: nowrap;
        transition: left 0.3s ease;
        .tag-wrapper {
          @include flex-box($justifyContent: flex-start);
        }
        .el-tag {
          margin-right: 5px;
          @apply dark:bg-dark-500 dark:text-white dark:border-dark-400;
          cursor: pointer;
        }
        .tag-checked {
          color: #0960bd !important;
        }
      }
    }
  }
  .btn-con {
    @include flex-box() {
      z-index: 10;
    }
  }
}
.contextmenu {
  position: absolute;
  z-index: 100;
  padding: 5px 10px;
  border-radius: 4px;
  @apply bg-white dark:bg-dark-500;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  font-size: 10px;
  li {
    line-height: 24px;
    .el-link {
      font-size: 12px;
    }
  }
}
</style>
