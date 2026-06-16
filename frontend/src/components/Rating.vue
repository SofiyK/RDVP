<<template>
  <h1 class="text-center">Рейтинги</h1>
  
  <div v-if="store.state.dataPreLoading" style="text-align: center">
    <ProgressSpinner strokeWidth="4" style="width:50px;height:50px;"/>
  </div>
  
  <div v-else>
    <DataView :layout="layout" :value="ratings">
      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 md:col-3 p-2">
            <div class="product-grid-item card">
              <Panel>
                <template #header>
                  {{ item.name }}
                </template>
                <template #icons>
                  <span class="pi pi-chart-line"></span>
                </template>
                
                <div v-if="item.gender == 1">
                  <img :alt="item.name" src="../../src/assets/boy.png" style="width: 100%"/>
                </div>
                <div v-else>
                  <img :alt="item.name" src="../../src/assets/girl.png" style="width: 100%"/>
                </div>
                
                <div class="mt-4" style="text-align: center">
                  Возраст: {{ getAge(item) }}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </template>
      
      <template #empty>
        <div class="text-center p-4">Нет данных</div>
      </template>
    </DataView>
  </div>
  
  <Paginator 
    v-model:rows="rows" 
    :rowsPerPageOptions="[2,5,10,50]"
    :totalRecords="total" 
    @page="onPage($event)"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Paginator from 'primevue/paginator'
import DataView from 'primevue/dataview'
import Panel from 'primevue/panel'
import ProgressSpinner from 'primevue/progressspinner'

const store = useStore()
const router = useRouter()

const rows = ref(5)
const layout = ref('grid')

const ratings = computed(() => store.state.rating)
const total = computed(() => store.state.pager?.total || 0)

function onPage(event) {
  store.state.pager.perPage = event.rows
  store.commit('setPage', event.page + 1)
  store.dispatch('getRating')
}

function getAge(rating) {
  if (!rating?.birthday) return '—'
  
  const now = new Date()
  const birthday = new Date(rating.birthday)
  
  let year = now.getFullYear() - birthday.getFullYear()
  let month = now.getMonth() - birthday.getMonth()
  
  if (month < 0) {
    year--
    month += 12
  }
  
  let yearText = ''
  if (year > 0) {
    yearText = year + ' '
    if (year === 1) yearText += 'год '
    else if (year >= 2 && year <= 4) yearText += 'года '
    else yearText += 'лет '
  }
  
  return yearText + month + ' мес.'
}

onMounted(() => {
  if (store.state.loggedIn) {
    store.dispatch('getRating')
    store.commit('setLoginError', false)
  } else {
    router.push('/')
  }
})
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mt-4 {
  margin-top: 1.5rem;
}
.p-2 {
  padding: 0.5rem;
}
</style>