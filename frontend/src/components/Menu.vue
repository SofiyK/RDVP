<template>
  <Menubar :model="items">
    <template #start>
      <a href="/"><img alt="Logo" src="../../src/assets/logo.png" width="30"/></a>
    </template>
  </Menubar>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const store = useStore()
const router = useRouter()

const login = ref('administrator')
const password = ref('password')
const brand = import.meta.env.VITE_APP_APPNAME

const username = computed(() => {
  return store.state.user?.username ?? ''
})

const isLoggedIn = computed(() => store.state.loggedIn)

const items = ref([
  {
    label: 'Рейтинг',
    icon: 'pi pi-fw pi-chart-line',
    visible: false,
    items: [
      {
        label: 'Все рейтинги',
        icon: 'pi pi-fw pi-list',
        command: () => router.push('/rating')
      },
      {
        label: 'Создать рейтинг',
        icon: 'pi pi-fw pi-plus',
      },
    ]
  },
  {
    label: ' ',
    icon: 'pi pi-fw pi-user',
    visible: false,
    items: [
      {
        label: 'Выход',
        icon: 'pi pi-fw pi-sign-out',
        command: () => logout()
      },
    ]
  },
  {
    label: 'Вход',
    visible: true,
    icon: 'pi pi-fw pi-sign-in',
    command: () => router.push('/login')
  },
])

watch(username, (newUsername) => {
  items.value[1].label = newUsername
})

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    items.value[0].visible = true
    items.value[2].visible = false
    items.value[1].visible = true
  } else {
    items.value[0].visible = false
    items.value[2].visible = true
    items.value[1].visible = false
  }
})

function logout() {
  store.commit('logout')
}
</script>

<style scoped>
</style>