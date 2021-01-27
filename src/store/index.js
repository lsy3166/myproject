import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenName: 'Home',
    user: '',
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
    mu_modifyUser(state, { user, index }) {
      state.users[index].name = user.name;
      state.users[index].username = user.username;
      state.users[index].email = user.email;
      state.users[index].phone = user.phone;
      state.users[index].website = user.website;
    },
  },
  actions: {},
  modules: {},
});
