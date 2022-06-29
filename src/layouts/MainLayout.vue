<template>
  <q-layout view="lHh Lpr lFf">
    <div class="background" >
      <q-header class="bg-transparent" >
      <q-toolbar >



        <q-space/>
      <div class="text-blue1">
      <q-btn  class="bg-tramsparent text-grey1" v-if="user" :label="user.name" flat no-caps icon="logout" @click="logout()">
        <q-tooltip>
          Salir
        </q-tooltip>
      </q-btn>
       </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-transparent"

      width="200"
    >
     <div class="q-pt-xl flex flex-center" >
          <img src="/educa.png" alt="" style="width:100px" srcset="">
    </div>
    <div class="height--menu flex flex-center   ">
      <div>
        <tabsVue v-for="(tab, index) in tabsData" :title="tab.title" :url="tab.url" :icon="tab.icon" :key="index"></tabsVue>

      </div>





    </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    </div>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import tabsVue from 'components/commons/Tabs.vue'
import { useAuthStore} from 'stores/auth.store';
import { storeToRefs } from 'pinia';
const menuData =[
  {title:'Estudiantes', icon:'school', url:'/students'},
  {title:'Profesores', icon:'cast_for_education', url:'/teachers'},
   {title:'Usuarios', icon:'person', url:'/users'},
   {title:'Configuraciones', icon:'settings', url:'/settings'},

]

export default defineComponent({


  components: {
    tabsVue
  },

  setup () {

    const leftDrawerOpen = ref(false)
    const authStore = useAuthStore();
      const { user: authUser } = storeToRefs(authStore);

    return {
      authStore,
      tabsData:menuData,
      user:authUser,
      leftDrawerOpen,
      tab: ref('mails'),
      splitterModel: ref(20),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
   methods:{
    logout(){
        this.authStore.logout();
       this.$router.push('/')
    }
  },
})
</script>
<style>
.height--menu{
  height:88%;
}
</style>
