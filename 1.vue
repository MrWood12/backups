<template>
  <div id="app">
    <p>我的个人信息：{{info}}</p>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script >
export default {
  name:'App', 
  components: {

  },
  computed:{
    info(){
      return this.$store.state.info
    }
  },
  methods:{
    updateInfo(){
      this.$store.commit('updateInfo',{height:1.88})
    }
  }
}
</script>

<style scoped>
</style>
