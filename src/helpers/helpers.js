import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/dbboard/';
// const baseURL = 'http://192.168.219.102:3000/dbboard/';

const handleError = (fn) => (...params) =>
  fn(...params).catch((error) => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  getboard: handleError(async (id) => {
    const res = await axios.get(baseURL + 'write/' + id);
    return res.data;
  }),
  getboards: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteboard: handleError(async (id) => {
    const res = await axios.delete(baseURL + 'write/' + id);
    return res.data;
  }),
  createboard: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateboard: handleError(async (payload, id) => {
    const res = await axios.put(baseURL + 'write/' + id, payload);
    return res.data;
  })
};
