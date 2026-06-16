<template>
{{ this.$store.state.pager }}
<h1>Рейтинги</h1>




<div>
  <button @click="prev()">Предыдущая страница</button>
  Страница: <input v-model="page" type="number">
  <button @click="next()">Следующая страница</button>
</div>
<div>
  <ul>
    <li v-for="rating in ratings" v-bind:key="rating.id">{{ rating.id }} &nbsp; {{ rating.name }}</li>
  </ul>
</div>

</template>

<script>

import '../state.js'
import router from "../router";
export default {
  name: "Rating",
  methods: {
    next() {
      if (this.page < this.$store.state.pager.pageCount) {
        this.$store.commit("setPage", (this.page + 1))
        this.$store.dispatch('getRating')
      }
    },
    prev() {
      if (this.page > 1) {
        this.$store.commit("setPage", (this.page - 1))
        this.$store.dispatch('getRating')
      }
    }
  },
  computed: {
    ratings: function () {
      return this.$store.state.rating;
    },
    page: {
      get() {
        return this.$store.state.pager.currentPage;
      }
    }
  },

  mounted() {
    if (this.$store.state.loggedIn) {
      this.$store.dispatch('getRating');
      this.$store.commit("setLoginError", false);
    } else router.push('/');
  }
}
</script>

<style scoped>

</style>