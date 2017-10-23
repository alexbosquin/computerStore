import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import ComputerRegister from '@/components/ComputerRegister'
import ComputerAdmin from '@/components/ComputerAdmin'
import ComputerEdit from '@/components/ComputerEdit'
import Home from '@/components/Home'
import ShowComputer from '@/components/ShowComputer'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
    },
    ,
    {
      path: '/computeredit',
      name: 'ComputerEdit',
      component: ComputerEdit
    },
    {
      path: '/showComputer',
      name: 'ShowComputer',
      component: ShowComputer
    },
  ]
})
