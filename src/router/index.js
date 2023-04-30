import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // ポートフォリオ一覧ページ
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  // ポートフォリオ編集ページ
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditView.vue')
  },
  // プロフィールページ
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPageView.vue')
  },
  // ポートフォリオ保存ページ
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/PostView.vue')
  },
  // ポートフォリオ詳細ページ
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostDetailView.vue')
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
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
