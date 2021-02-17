<template>
  <div id="app">
    <p>{{count}}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script >
export default {
  name:'App', 
  components: {

  },
  computed:{
    count:function(){
      return this.$store.state.count
    }
  },
  methods:{
    increment:function(){
      this.$store.commit("increment")
    },
    decrement:function(){
      this.$store.commit("decrement")
    }
  }
}
</script>

<style scoped>
</style>
