import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'

import AppDropdown from './components/shared/AppDropdown'
import AppMeet from './components/shared/AppMeet'
import AppSpinner from './components/shared/AppSpinner'

import moment from 'moment'

Vue.config.productionTip = false

Vue.component('AppMeet', AppMeet)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)

Vue.use(vuelidate)

Vue.filter('capitalize', function (value) {
  if (value && typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  return ''
})
Vue.filter('dateFormat', function (value, typeFormat = 'LL') {
  if (!value) return ''
  return moment(value).format(typeFormat)
})
new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')