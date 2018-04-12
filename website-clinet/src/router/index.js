import {Root, Home, Briefing, Business, Notice, ContactUs, Content} from '../views'

const routes = [{
    component: Root,
    routes: [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    { 
        path: '/briefing',
        component: Briefing
    },
    { 
        path: '/business',
        component: Business
    },
    { 
        path: '/notice/:page',
        component: Notice
    },
    { 
        path: '/contactUs',
        component: ContactUs
    },
    { 
        path: '/content',
        component: Content
    }
]}
]

export default routes