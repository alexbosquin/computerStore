import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import ComputerRegister from '@/components/ComputerRegister'
import ComputerAdmin from '@/components/ComputerAdmin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/computerregister',
      name: 'ComputerRegister',
      component: ComputerRegister
    },
    {
      path: '/computeradmin',
      name: 'ComputerAdmin',
      component: ComputerAdmin
    }
  ]
})
