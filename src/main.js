import {routes} from '@/router';
import Vue       from 'vue'
import App       from './App.vue'
import ElementUI from 'element-ui';
import Element   from 'element-ui';
import VueRouter from 'vue-router';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
