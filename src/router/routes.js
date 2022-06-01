 const routes = [
    { 
    path: '/', 
    component: () => import('../layouts/mainLayout.vue'),
      children:[{
        path:'',
        component: () => import('../pages/Home')
      }]
  },

  ]

  export default routes;
