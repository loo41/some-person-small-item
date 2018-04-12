import Vue from 'vue';
import iView from 'iview';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
