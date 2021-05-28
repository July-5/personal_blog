import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/backmodule/index'
import users from '@/components/backmodule/user/users'
import login from '@/components/backmodule/login'
import articles from '@/components/backmodule/article/articles'
import sorts from '@/components/backmodule/sort/sorts'
import comments from '@/components/backmodule/comment/comments'
import labels from '@/components/backmodule/label/labels'
import markdown from '@/components/backmodule/article/markdown'
import updatemd from '@/components/backmodule/article/updatemd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{title:'首页'},
      children:[ {
      path: '/users',
      component: users,
      meta:{title:'用户管理'}
    },
    {
      path: '/articles',
      component: articles,
      meta:{title:'首页'}
    },
    {
      path: '/sorts',
      component: sorts
    },
    {
      path: '/comments',
      component: comments
    },
    {
      path: '/labels',
      component: labels
    },
    {
      path: '/markdown',
      component: markdown
    },
    {
      path: '/updatemd',
      component: updatemd
    }

  ]
    },
    {
      path: '/login',
      component: login
    },
  ]
})
