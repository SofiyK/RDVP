<template>
<div>
  <div>
    <router-link to="/">{{ brand }}</router-link>
  </div>
  <div v-if="this.$store.state.loginError">
    Ошибка аутентификации! Проверьте правильность логина и пароля
  </div>
  <div v-if="!this.$store.state.preLoading">
    <div v-if="this.$store.state.loggedIn">
      <router-link to="/rating">Мои рейтинги</router-link>
      Привет, {{ $store.state.user.username }}!
      <button @click="logout">Выйти</button>
    </div>
    <div v-else>
      <input v-model="login" placeholder="Login" style="display: block;"/>
      <input v-model="password" placeholder="Password" style="display: block;" type="password"/>
      <button style="display: block;" @click="signIn">Войти</button>
    </div>
  </div>
  <div v-else>
    Загрузка...
  </div>
</div>
</template>

<script>
export default {
name: "Menu",
data() {
  return {




    login: 'administrator',
    password: 'password',
    brand: process.env.VUE_APP_APPNAME
  };
},
methods: {
  signIn() {
    // Временно обходим store, логинимся напрямую
    this.$store.commit('setUser', { username: this.login });
    this.$store.commit('setLoggedIn', true);
    this.$store.commit('setLoginError', false);
  },
  logout() {
    this.$store.commit('logout');
  }
}

}
</script>

<style scoped>

</style>
