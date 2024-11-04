import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/authService/index.js'

const GreetingPage = () => import('@/views/GreetingView.vue')
const HomepagePage = () => import('@/views/HomepageView.vue')
const AuthPage = () => import('@/views/AuthView.vue')
const LoginPage = () => import('@/views/LoginView.vue')
const RegistrationPage = () => import('@/views/RegistrationView.vue')

const routes = [
  {
    path: '/',
    component: GreetingPage,
    name: 'greeting'
  },
  {
    path: '/map',
    component: HomepagePage,
    name: 'homepage'
  },
  {
    path: '/auth',
    component: AuthPage,
    redirect: '/auth/login',
    children: [
      { path: 'login', component: LoginPage, name: 'login' },
      { path: 'registration', component: RegistrationPage, name: 'registration' }
    ]
  }
]

export const router = createRouter(
  {
    history: createWebHistory(),
    routes
  }
)

// "Router Guards"  INTERCEPTOR FOR AUTHORIZATION IF USER IS LOGGED IN OR NOT O
router.beforeEach((to, from, next) => {
  const authRoutes = ['login', 'registration']
  const { name, matched } = to

  if (authService.isLoggedIn() && authRoutes.includes(name) || authService.isLoggedIn() && matched.length === 0) {
    next({ name: 'homepage' })
  } else if (!authRoutes.includes(name) && !authService.isLoggedIn()) {
    next({ name: 'login' })
  }  else {
    next()
  }
})
