import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateItem from '@/components/CreateItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/createitem',
      name: 'CreateItem',
      component: CreateItem
    }
  ]
})
