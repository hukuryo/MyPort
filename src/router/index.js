import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'


const routes = [
  // ポートフォリオ一覧ページ
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  // ポートフォリオ編集ページ
  {
    path: '/edit/:id',
    name: 'postEdit',
    component: () => import('../views/EditView.vue'),
    meta: { requiresAuth: true }
  },
  // プロフィールページ
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPageView.vue'),
    meta: { requiresAuth: true }
  },
  // ポートフォリオ保存ページ
  {
    path: '/post',
    name: 'postSave',
    component: () => import('../views/PostView.vue'),
    meta: { requiresAuth: true }
  },
  // ポートフォリオ詳細ページ
  {
    path: '/post/:id',
    name: 'postDetail',
    component: () => import('../views/PostDetailView.vue'),
    meta: { requiresAuth: true }
  },
  // ログインページ
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  // ユーザー登録ページ
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 認証がない場合にログインページの遷移させる記述
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          message: true
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
