import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/home/Home')
const Cart = ()=>import('../views/cart/Cart')
const Category = ()=>import('../views/category/Category')
const Profile = ()=>import('../views/profile/profile')

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
]

//3.实例化router实例
const router = new VueRouter({
  routes,
  mode:'history'
})

//4.导出router
export default router