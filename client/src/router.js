import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'ArticleCollection',
          component: () => import('./components/componentHome/contentComponent/articlescollection.vue')
        },
        {
          path: '/articles/create',
          name: 'CreateArticle',
          component: () => import('./components/componentHome/contentComponent/createarticle.vue')
        },
        {
          path: '/articles/:id',
          name: 'FullPageArticle',
          component: () => import('./components/componentHome/contentComponent/fullpagearticle.vue')
        },
        {
          path: '/articles/update/:id',
          name: 'UpdateArticle',
          component: () => import('./components/componentHome/contentComponent/updatearticle.vue')
        }
      ]
    }
  ]
})
