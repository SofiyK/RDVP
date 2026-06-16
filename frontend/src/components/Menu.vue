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

const username = computed(() => {
  return store.state.user?.username ?? ''
})

const isLoggedIn = computed(() => store.state.loggedIn)

const items = ref([
  {
    label: 'Рейтинг',
    icon: 'pi pi-fw pi-chart-line',
    visible: false, // будет обновлено через watch
    items: [
      {
        label: 'Все рейтинги',
        icon: 'pi pi-fw pi-list',
        command: () => router.push('/rating')
      },
      {
        label: 'Создать рейтинг',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          store.commit('setCreateRatingDialogVisible', true)
        }
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

// Функция обновления видимости
function updateMenuVisibility(loggedIn) {
  if (loggedIn) {
    items.value[0].visible = true   // Рейтинг
    items.value[1].visible = true   // Пользователь
    items.value[2].visible = false  // Вход
  } else {
    items.value[0].visible = false  // Рейтинг
    items.value[1].visible = false  // Пользователь
    items.value[2].visible = true   // Вход
  }
}

// Обновляем при изменении
watch(isLoggedIn, (loggedIn) => {
  updateMenuVisibility(loggedIn)
})

// Обновляем сразу при загрузке (важно!)
updateMenuVisibility(isLoggedIn.value)

watch(username, (newUsername) => {
  items.value[1].label = newUsername
})

function logout() {
  store.commit('logout')
}
</script>

<style scoped>
</style>