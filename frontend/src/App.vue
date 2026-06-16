<template>
  <div id="app">
    <div v-if="!this.$store.state.preLoading">
      <router-view></router-view>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<script>
import store from "./state";
import router from "./router";

export default {
  computed: {
    user(){
      return this.$store.state.user;
    },
  },
  watch: {
    user(){
      if(this.user){
        router.push('/')
      } else {
        router.push('/signin')
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if(token){
      store.commit('setToken', token);
    }
    this.$store.dispatch('getUser')
  }
};
</script>