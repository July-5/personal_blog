import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import sort from '@/components/sort'
import label from '@/components/label'
import login from '@/components/login'
import register from '@/components/register'
import detail from '@/components/detail'
import self from '@/components/self'
import sortdetail from '@/components/sortdetail'
import labeldetail from '@/components/labeldetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path:'/sort',
      name:'sort',
      component:sort
    },
    {
      path:'/label',
      name:'label',
      component:label
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
      path:'/self',
      name:'self',
      component:self
    },
    {
      path:'/sortdetail',
      name:'sortdetail',
      component:sortdetail
    },
    {
      path:'/labeldetail',
      name:'labeldetail',
      component:labeldetail
    },

  ]
});