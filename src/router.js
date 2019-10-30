import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "login" */ './views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (signup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "signup" */ './views/Signup.vue')
  },
  {
    path: '/freelancerEnroll',
    name: 'freelancerEnroll',
    // route level code-splitting
    // this generates a separate chunk (freelancerEnroll.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "freelancerEnroll" */ './views/Freelancer_Enroll.vue')
  },
  {
    path: '/freelancerShow',
    name: 'freelancerShow',
    // route level code-splitting
    // this generates a separate chunk (freelancerShow.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "freelancerShow" */ './views/Freelancer_Show.vue')
  },
  {
    path: '/jobEnroll',
    name: 'jobEnroll',
    // route level code-splitting
    // this generates a separate chunk (jobEnroll.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "jobEnroll" */ './views/Job_Enroll.vue')
  },
  {
    path: '/jobShow',
    name: 'jobShow',
    // route level code-splitting
    // this generates a separate chunk (jobShow.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "jobShow" */ './views/Job_Show.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/mypage',
    component: () =>
                import(/* webpackChunkName: "mypage" */ './views/Mypage.vue'),
    children: [{
      path: '',
      name: 'mypage',
      component: () =>
                        import('./components/Mypage/profile.vue')
    },
    {
      path: '/mypage/profile',
      name: 'profileEdit',
      component: () =>
                        import('./components/Mypage/profile.vue')
    },
    {
      path: '/mypage/freelancerProfileEdit',
      name: 'freelancerProfileEdit',
      component: () =>
                        import('./components/Mypage/freelancerProfileEdit.vue')
    },
    {
      path: '/mypage/schedule',
      name: 'schedule',
      component: () =>
                        import('./components/Mypage/Schedule.vue')
    },
    {
      path: '/mypage/enrolledJob',
      name: 'enrolledJob',
      component: () =>
                        import('./components/Mypage/enrolledJob.vue')
    },
    {
      path: '/mypage/createdJob',
      name: 'createdJob',
      component: () =>
                        import('./components/Mypage/createdJob.vue')
    }
    ]
  },
  {
    path: '/freelancer/:freelancerId',
    name: 'freelancer',
    props: true,
    component: () =>
                import('./components/Freelancer/Freelancer_Detail.vue')
  },
  {
    path: '/job/:num',
    name: 'job',
    props: true,
    component: () =>
                import('./components/Job/Job_Detail.vue')
  },
  {
    path: '/jobEdit/:num',
    name: 'jobEdit',
    props: true,
    component: () =>
                import('./components/Job/Job_Edit.vue')
  }
  ]
})
