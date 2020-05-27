// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import store from './store'
import { button } from 'mint-ui'
import './mock/mockServer' // 加载mockServer即可

Vue.use(less)

Vue.config.productionTip = false
Vue.component(button.name, button)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})