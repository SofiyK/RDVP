import {createStore} from "vuex";
import router from "./router";

const store = createStore({
  state: {
    user: null,
    token: null,
    preLoading: false,
    dataPreLoading: true,
    loginError: false,
    loggedIn: false,
    rating: [],
    pager: {
      currentPage: 1,
      perPage: 5,
      total: 0
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPreloading(state, is_load) {
      state.preLoading = is_load;
    },
    setDataPreloading(state, is_load) {
      state.dataPreLoading = is_load;
    },
    setLoginError(state, isError) {
      state.loginError = isError;
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    },
    setRating(state, rating) {
      state.rating = rating;
    },
    setPage(state, page) {
      state.pager.currentPage = page;
    },
    setPager(state, pager) {
      state.pager = pager;
    },
    setPerPage(state, rows) {
      state.pager.perPage = rows;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.rating = [];
      localStorage.removeItem('token');
      router.push('/');
    }
  },
  actions: {
    // ЗАГЛУШКА: вход без бэкенда
    auth({ commit }, {login, password}) {
      commit('setPreloading', true);
      
      setTimeout(() => {
        const fakeToken = 'fake_token_' + Date.now();
        commit('setToken', fakeToken);
        localStorage.setItem('token', fakeToken);
        commit('setLoggedIn', true);
        commit('setLoginError', false);
        commit('setUser', {
          username: login || 'admin',
          id: 1
        });
        commit('setPreloading', false);
        router.push('/');
      }, 500);
    },
    
    // ЗАГЛУШКА: получение пользователя
    getUser({ commit }) {
      commit('setPreloading', false);
      router.push('/');
    },
    
    // ЗАГЛУШКА: получение рейтинга с тестовыми данными
    getRating({ state, commit }) {
      commit('setDataPreloading', true);
      
      // Тестовые данные как на скриншоте
      const mockData = [
        { name: 'Тимофей', gender: 1, birthday: '2018-12-15' },
        { name: 'Елизавета', gender: 2, birthday: '2019-05-20' },
        { name: 'Кеша', gender: 1, birthday: '2020-11-10' },
        { name: 'Олег', gender: 1, birthday: '2021-09-01' },
        { name: 'Уля', gender: 2, birthday: '2021-09-15' },
        { name: 'Маша', gender: 2, birthday: '2021-08-20' },
        { name: 'Артем', gender: 1, birthday: '2020-12-01' },
        { name: 'Стёпа', gender: 1, birthday: '2021-07-10' },
      ];
      
      setTimeout(() => {
        commit('setRating', mockData);
        commit('setPager', {
          currentPage: 1,
          perPage: state.pager.perPage,
          totalPages: 1,
          total: mockData.length
        });
        commit('setDataPreloading', false);
      }, 500);
    }
  }
});

export default store;