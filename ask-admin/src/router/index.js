import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    let userName = sessionStorage.getItem('userName');
    if (!userName && from.path !== '/login' && to.path !== '/login') {
        return next({ path: '/login' });
    }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
