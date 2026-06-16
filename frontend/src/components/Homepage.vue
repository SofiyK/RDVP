<template>
  <h1>Домашняя страница</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.commit('setLoginError', false)
})
</script>

<style scoped>
</style>