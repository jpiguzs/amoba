
const routes = [
  {
    path: '/students',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/students/index.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/userLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }

    ]
  },
  {
    path: '/teachers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/teachers/Index.vue') }


    ]
  },
  {
    path: '/admin-teachers',
    component: () => import('layouts/userLayout.vue'),
    children: [
      { path: '', component: () => import('pages/teachersAdmin/Index.vue') }


    ]
  },
  {
    path: '/admin-students',
    component: () => import('layouts/userLayout.vue'),
    children: [
      { path: '', component: () => import('pages/studentAdmin/Index.vue') }


    ]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/Index.vue') }


    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/settings/Index.vue') }


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
