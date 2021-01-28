import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenName: 'Home',
    isLoginError: false,
    isLogin: false,
    errorMsg: null,
    successMsg: null,
    user: '',
    username: '',
    users: [],
  },
  mutations: {
    mu_setUsers(state) {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((users) => (state.users = users.data));
    },
    mu_setUser(state, pUser) {
      state.user = pUser;
    },
    mu_userName(state, username) {
      state.username = username;
    },
    mu_modifyUser(state, { user, index }) {
      state.users[index].name = user.name;
      state.users[index].username = user.username;
      state.users[index].email = user.email;
      state.users[index].phone = user.phone;
      state.users[index].website = user.website;
    },
    mu_loginSuccess(state) {
      state.isLogin = true;
      state.isLoginError = false;
    },
    mu_loginFail(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    mu_loginOut(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.username = '';
      //if (this.$route.path === '/login') return;
      router.push({
        path: '/login',
      });
    },
  },
  actions: {
    ac_login({ state, commit }, loginObj) {
      let users = state.users;
      let findUser = users.filter((user) => user.email === loginObj.email);
      commit('mu_userName', findUser[0].username);
      console.log('userName : ' + state.username);
      if (findUser == 0) {
        commit('mu_loginFail');
        state.errorMsg = '등록된 email이 존재하지 않습니다.';
      } else {
        if (loginObj.password && findUser[0].id == loginObj.password) {
          commit('mu_loginSuccess');
          state.successMsg = 'Sucess!!';
          router.push({ path: '/dashboard' });
        } else {
          commit('mu_loginFail');
          state.errorMsg = 'Password가 일치하지 않습니다.';
        }
      }
    },
  },
  modules: {},
});
