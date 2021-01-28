import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  mounted() {
    // 재활용을 위해 "hackerc_Agent" 에 정보를 저장.
    var hackerc_Agent = navigator.userAgent;

    // (.match)를 이용하여 해당 단어(키워드)가 포함될 경우 만족하는 if문 적용.
    if (
      hackerc_Agent.match(
        'LG | SAMSUNG | Samsung | iPhone | iPod | Android | Windows CE | BlackBerry | Symbian | Windows Phone | webOS | Opera Mini | Opera Mobi | POLARIS | IEMobile | lgtelecom | nokia | SonyEricsson'
      ) != null
    ) {
      store.commit('isMobile', true);
    }
    console.log('isMoblie : ' + store.state.isMoblie);
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
