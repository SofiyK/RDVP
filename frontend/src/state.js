import {createStore} from "vuex";
import router from "./router";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;
const store = createStore({
  state: {
    user: {},




    token: null,
    preLoading: false,
    loginError: false,
    loggedIn: false,
    rating: {},
    pager: {
      currentPage: 1,
      perPage: 5,
    }
  },
mutations: {
  setToken(state, token) {
    state.token = token;
  },

  getToken(context, token) {
    context.token = token;
  },

  setUser(context, user) {
    context.user = user;
  },

  setPreloading(context, is_load) {
    context.preLoading = is_load;
  },
  setLoginError(context, isError) {
    context.loginError = isError;
  },
  setLoggedIn(context, isLoggedIn) {
    context.loggedIn = isLoggedIn;
  },
  setRating(context, rating) {
    context.rating = rating;
  },
  setPage(context, page) {
    context.pager.currentPage = page;
  },
  setPager(context, pager) {
    context.pager = pager;
  },
  logout(context) {

    context.user = null;
    context.token = null;
    context.loggedIn = false;
    context.rating = {};
    localStorage.removeItem('token')
    router.push('/')
  },
},
actions: {
  auth(context, {login, password}) {

    context.commit('setPreloading', true)
    window.axios.post(backendUrl + '/OAuthController/Authorize', {
      username: login,
      password: password,
      grant_type: 'password'
    }, {
      headers: {
        Authorization: 'Basic ' + window.btoa(client_id + ':' + client_secret)
      }




    }).then((response) => {
      if (response.data.access_token) {
        context.commit('setToken', response.data.access_token)
        localStorage.setItem('token', response.data.access_token);
        context.commit('setLoggedIn', true);
        context.commit('setLoginError', false);
        context.dispatch('getUser');
      } else {
        context.commit('setLoginError', true)
        context.commit('setPreloading', false)
      }
    })

  },
  getUser(context) {
    // context.commit('setPreloading', true);
    console.log('get user')
    return window.axios.get(backendUrl + '/OAuthController/user', {
      headers: {
        Authorization: 'Bearer ' + context.state.token
      }
    }).then((response) => {
      context.commit('setUser', response.data);
      context.commit('setPreloading', false);

    }).catch(error => {
      if (error.response) context.commit('setLoggedIn', false);
    }
    )

  },
  getRating(context) {
    console.log('get rating')
    const params = new URLSearchParams()
    params.append('per_page', context.state.pager.perPage)
    return window.axios.post(backendUrl + '/RatingApi/rating?page_group1=' + context.state.pager.currentPage, params,
      {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        },
      }).then((response) => {
        context.commit('setRating', response.data.ratings);
        context.commit('setPager', response.data.pager);
        console.log(response.data.ratings)
        console.log(response.data.pager)

      })
  }
}
})

export default store;