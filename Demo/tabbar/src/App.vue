<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <img src="./assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="./assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot='item-text'>首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="blue">
        <img src="./assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="./assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot='item-text'>分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="blue">
        <img src="./assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="./assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot='item-text'>购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile" activeColor="blue">
        <img src="./assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="./assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot='item-text'>我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from './components/tabbar/TabBar'
import TabBarItem from './components/tabbar/TabBarItem'

import Home from './views/home/Home'
import Cart from './views/cart/Cart'
import Category from './views/category/Category'
import Profile from './views/profile/profile'

export default {
  name: 'App',
  components:{
    TabBar,
    TabBarItem,
    Home,
    Cart,
    Category,
    Profile
  }
}
</script>

<style>
/* 在组件中引用css外部文件，需要通过@import的方式 */
 @import "./assets/css/base.css";

</style>
