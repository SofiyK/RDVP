<template>
  <Dialog 
    :key="$route.fullPath" 
    v-model:visible="visible" 
    closable 
    close-on-escape 
    modal
  >
    <template #header>
      <div>Создание рейтинга</div>
    </template>

    <h5>Имя ребенка</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-user" style="position: relative; left: 25px;"/>
      <InputText v-model="name" aria-describedby="name-help" placeholder="Имя" type="text"/><br>
      <small v-if="store.state.validation.name" id="name-help" class="p-error">
        {{ store.state.validation.name }}
      </small>
    </span>

    <h5>Описание</h5>
    <span class="p-input-icon-left">
      <i class="pi pi-lock" style="position: relative; left: 25px;"/>
      <InputText v-model="description" aria-describedby="description-help" placeholder="Комментарий" type="text"/>
      <br>
      <small v-if="store.state.validation.description" id="description-help" class="p-error">
        {{ store.state.validation.description }}
      </small>
    </span>

    <h5>Дата рождения</h5>
    <span class="p-field p-col-12 p-md-4">
      <Calendar v-model="birthday" dateFormat="dd.mm.yy" style="position: relative; left: 18px;"/>
      <br>
      <small v-if="store.state.validation.birthday" id="birthday-help" class="p-error">
        {{ store.state.validation.birthday }}
      </small>
    </span>

    <h5>Пол</h5>
    <div class="p-field-radiobutton">
      <RadioButton id="man" v-model="gender" :value="1"/>
      <label for="man">Мужской</label>
    </div>

    <div class="p-field-radiobutton">
      <RadioButton id="woman" v-model="gender" :value="0"/>
      <label for="woman">Женский</label>
    </div>
    <br>

    <small v-if="store.state.validation.gender" id="gender-help" class="p-error">
      {{ store.state.validation.gender }}
    </small>

    <template #footer>
      <Button autofocus icon="pi pi-check" label="Создать" @click="create"/>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import RadioButton from 'primevue/radiobutton'

const $route = useRoute()
const store = useStore()

const name = ref('')
const description = ref('')
const birthday = ref('')
const gender = ref(1)

// Связь с store для visible
const visible = computed({
  get: () => store.state.createRatingDialogVisible,
  set: (val) => store.commit('setCreateRatingDialogVisible', val)
})

// Форматирование даты
watch(birthday, (newVal) => {
  if (newVal && typeof newVal === 'object') {
    const year = newVal.getFullYear()
    const month = String(newVal.getMonth() + 1).padStart(2, '0')
    const day = String(newVal.getDate()).padStart(2, '0')
    birthday.value = `${year}-${month}-${day}`
  }
})

function create() {
  store.dispatch('createRating', {
    name: name.value,
    description: description.value,
    birthday: birthday.value,
    gender: gender.value
  })
}
</script>

<style scoped>
</style>