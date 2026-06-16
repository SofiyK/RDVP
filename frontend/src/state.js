import {createStore} from "vuex";

const backendUrl = process.env.VUE_APP_BACKEND_URL;
const client_id = process.env.VUE_APP_CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET;

const store = createStore({
    state: {
        user: {},
        token: null,
        preLoading: false,
        errorPassword: false,
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
        setErrorPassword(context, isError) {
            context.errorPassword = isError;
        },

        logout(context) {       
            context.user = null;
            context.token = null;
            localStorage.removeItem('token')
        },
    },
    actions: {
        auth(context, {login, password}){
            context.commit('setErrorPassword', false)
            window.axios.post(backendUrl+'/OAuthController/Authorize', {
                username: login,
                password: password,
                grant_type: 'password'
            }, {
                headers: {
                    Authorization: 'Basic ' + window.btoa(client_id+':'+client_secret)
                }
            }).then((response) => {
                if(response.data.access_token){
                    context.commit('setToken', response.data.access_token)
                    localStorage.setItem('token', response.data.access_token);
                    context.dispatch('getUser')
                } else {
                    context.commit('setErrorPassword', true)
                }
            })
        },
        getUser(context){
            context.commit('setPreloading', true);
            console.log('get user, token:', context.state.token);

            if (!context.state.token) {
                context.commit('setPreloading', false);
                context.commit('setUser', null);
                return Promise.resolve();
            }

            return axios.get(backendUrl+'/OAuthController/user', {
                headers: {
                    Authorization: 'Bearer ' + context.state.token
                }
            }).then((response) => {
                context.commit('setUser', response.data);
                context.commit('setPreloading', false);
            }).catch((error) => {
                console.error('GetUser error:', error);
                context.commit('setPreloading', false);  // ← ВАЖНО: выключаем загрузку при ошибке
                context.commit('setUser', null);
            });
        }
    },
})

export default store;