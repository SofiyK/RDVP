<template>
  <h1>Домашняя страница</h1>
</template>

<script>
import '../state.js'

export default {
  name: "Homepage",
  mounted() {
    this.$store.commit('setLoginError', false)
  }
}
</script>

<style scoped>
</style>