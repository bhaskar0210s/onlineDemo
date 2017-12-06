import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import DetailView from '@/components/DetailView'
import PostView from '@/components/PostView'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
<<<<<<< HEAD
      path: '/detail',
=======
      path: '/detail/:id',
>>>>>>> Initial Commit
      name: 'detail',
      component: DetailView,
      props: true
    },
    {
      path: '/post',
      name: 'post',
      component: PostView,
      props: true
    }
  ]
})
