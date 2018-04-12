import Vue from 'vue'
import Router from 'vue-router'
import Ask from '@/components/ask'
import Reword from '@/components/reword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ask',
      component: Ask
    },
    {
      path: '/reword/:info',
      name: 'reword',
      component: Reword
    }
  ]
})
