import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import $F from './assets/js/cwj-function.js';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/cwj-main.css';

Vue.prototype.$F = $F;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
