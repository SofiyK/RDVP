<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./state";
import Menu from "./components/Menu";

export default {
  components: { Menu },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      store.commit('setToken', token);
      store.commit('setLoggedIn', true);
      this.$store.dispatch('getUser');
    }
  }
};
</script>