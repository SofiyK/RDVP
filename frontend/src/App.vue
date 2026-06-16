<template>
  <div id="app">
    <Menu />
    <router-view />
    <CreateRating />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Menu from './components/Menu.vue'
import CreateRating from './components/CreateRating.vue'

const store = useStore()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    store.commit('setToken', token)
    store.commit('setLoggedIn', true)
    store.dispatch('getUser')
  }
})
</script>