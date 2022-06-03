 const routes = [
    { 
    path: '/', 
    component: () => import('../layouts/mainLayout.vue'),
      children:[{
        path:'',
        component: () => import('../pages/Home')
      }]
  },
  { 
    path: '/dashboard', 
    component: () => import('../layouts/innerLayout.vue'),
      children:[{
        path:'',
        component: () => import('../pages/Dashboard')
      }]
  },

  ]

  export default routes;
