
import VueRouter from 'vue-router'
import routes from './routes'    







const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: "history",
   
  });
  export default Router;



