<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" @click="clickIcon">
      <slot name="item-icon"  ></slot>
    </div>
    <div v-else  @click="clickIcon"><slot name="item-icon-active" ></slot></div>
    <div :style="activeStyle"><slot  name="item-text"></slot>   </div>
       
  </div>
</template>

<script >
export default {
  name:'', 
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive:false
    }
  },
  components: {
   
  },
  computed:{
    isActive:{
      get(){
      //通过this.$route.path获得当前活跃的路由地址，之后用indexOf，看当前活跃的与想要的path是否一致
      // /home -> item1(/home) = true
      // /home -> item2(/cart) = false
      // /home -> item3(/category) = false
      // /home -> item4(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1
      },
      set(val){}
    },
    activeStyle:{
      get(){
        return this.isActive ?{color:this.activeColor}:{}
      }
    }
  },
  methods:{
     clickIcon(){
      this.isActive=!this.isActive;
    },
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 20px;
  height: 20px;
  vertical-align:middle;
  
}

</style>
