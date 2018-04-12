import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/adminUser',
        icon: 'ios-folder',
        name: 'adminUser',
        title: '后台用户管理',
        component: Main,
        children: [
            {
                path: 'user',
                icon: 'ios-paper-outline',
                name: 'userAdmin_index',
                title: '用户',
                component: resolve => { require(['@/views/admin/adminList.vue'], resolve); }
            },
            {
                path: 'addUser',
                icon: 'ios-list-outline',
                name: 'addUser_second',
                title: '添加用户',
                component: resolve => { require(['@/views/admin/addAdmin.vue'], resolve); }
            }
        ]
    },
    {
        path: '/user',
        icon: 'ios-folder',
        title: '用户管理',
        name: 'user',
        component: Main,
        children: [
            { path: 'allUser', title: '普通用户管理', name: 'allUser_index', component: resolve => { require(['@/views/user/user.vue'], resolve); } },
            { path: 'vipUser', title: 'vip用户管理', name: 'vipUser_index', component: resolve => { require(['@/views/user/vipUser.vue'], resolve); } }
        ]
    },
    {
        path: '/ask',
        icon: 'ios-folder',
        title: '问卷调查',
        name: 'ask',
        component: Main,
        children: [
            { path: 'ask', title: '问卷', name: 'ask_index', component: resolve => { require(['@/views/ask/ask.vue'], resolve); } },
            { path: 'reword', title: '奖品设置', name: 'reword_index', component: resolve => { require(['@/views/ask/reword.vue'], resolve); } },
            { path: 'addAsk', title: '添加问卷', name: 'addAsk_second', component: resolve => { require(['@/views/ask/addAsk.vue'], resolve); } }
        ]
    },
    {
        path: '/account',
        icon: 'ios-folder',
        title: '数据统计',
        name: 'account',
        component: Main,
        children: [
            { path: 'userAccount', title: '用户数据', name: 'userAccount_index', component: resolve => { require(['@/views/account/userAccount.vue'], resolve); } },
            { path: 'aaskAccount', title: '问卷数据', name: 'askAccount_second', component: resolve => { require(['@/views/account/askAccount.vue'], resolve); } }
        ]
    },
    {
        path: '/set',
        icon: 'ios-folder',
        title: '高级配置',
        name: 'set',
        component: Main,
        children: [
            { path: 'userSet', title: '用户设置', name: 'userSet_index', component: resolve => { require(['@/views/set/user.vue'], resolve); } },
            { path: 'wxSet', title: '微信配置设置', name: 'wxSet_second', component: resolve => { require(['@/views/set/wx.vue'], resolve); } }
        ]
    },
    {
        path: '/doc',
        icon: 'ios-folder',
        title: '文档说明',
        name: 'doc',
        component: Main,
        children: [
            { path: 'userDoc', title: '后台用户文档', name: 'userDoc_index', component: resolve => { require(['@/views/doc/userDoc.vue'], resolve); } },
            { path: 'askDoc', title: '问卷添加文档', name: 'askDoc_second', component: resolve => { require(['@/views/doc/askDoc.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
