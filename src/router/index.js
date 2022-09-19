import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

export const defaultRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          icon: 'home',
          title: '主页',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)',
    component: () =>
      import(
        /* webpackChunkName: "not-found" */ '@/views/not-found/not-found.vue'
      ),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: {
      name: 'BaseTable'
    },
    meta: {
      roles: ['user'],
      title: '表格'
    },
    children: [
      {
        path: '/base-table',
        name: 'BaseTable',
        meta: {
          roles: ['user'],
          title: '基础表格'
        },
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/table/table.vue')
      }
    ]
  },
  {
    path: '/form',
    name: 'Form',
    component: Layout,
    redirect: {
      name: 'BaseForm'
    },
    meta: {
      roles: ['admin', 'user'],
      title: '表单',
      icon: 'form'
    },
    children: [
      {
        path: '/base-form',
        name: 'BaseForm',
        component: () =>
          import(
            /* webpackChunkName: "base-form" */ '@/views/form/base-form/base-form.vue'
          ),
        meta: {
          roles: ['user'],
          icon: 'form',
          title: '基础表单'
        }
      },
      {
        path: '/submit-form',
        name: 'SubmitForm',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '提交表单'
        }
      }
    ]
  },
  {
    path: '/page',
    name: 'Page',
    component: Layout,
    redirect: {
      name: 'BasePage'
    },
    meta: {
      roles: ['user'],
      title: '页面',
      icon: 'form'
    },
    children: [
      {
        path: '/base-page',
        name: 'BasePage',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面'
        }
      },
      {
        path: '/base-page1',
        name: 'BasePage1',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面1'
        }
      },
      {
        path: '/base-page2',
        name: 'BasePage2',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面2'
        }
      },
      {
        path: '/base-page3',
        name: 'BasePage3',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面3'
        }
      },
      {
        path: '/base-page4',
        name: 'BasePage4',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面4'
        }
      },
      {
        path: '/base-page5',
        name: 'BasePage5',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面5'
        }
      },
      {
        path: '/base-page6',
        name: 'BasePage6',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面6'
        }
      },
      {
        path: '/base-page7',
        name: 'BasePage7',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面7'
        }
      },
      {
        path: '/base-page8',
        name: 'BasePage8',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面8'
        }
      },
      {
        path: '/base-page9',
        name: 'BasePage9',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面9'
        }
      },
      {
        path: '/base-page10',
        name: 'BasePage10',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面10'
        }
      },
      {
        path: '/base-page11',
        name: 'BasePage11',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面11'
        }
      },
      {
        path: '/base-page12',
        name: 'BasePage12',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面12'
        }
      },
      {
        path: '/base-page13',
        name: 'BasePage13',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面13'
        }
      },
      {
        path: '/base-page14',
        name: 'BasePage14',
        component: () =>
          import(
            /* webpackChunkName: "submit-form" */ '@/views/form/submit-form/submit-form.vue'
          ),
        meta: {
          roles: ['user'],
          title: '基础页面14'
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () =>
      import(
        /* webpackChunkName: "not-found" */ '@/views/not-found/not-found.vue'
      ),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: defaultRoutes
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: []
  })
  router.matcher = newRouter.matcher //reset router
}

export default router
