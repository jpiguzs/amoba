<template>
  <q-layout view="lHh Lpr lFf">
    <div class="background" >
      <q-header class="bg-transparent" >
      <q-toolbar >


        <q-toolbar-title>
          Educa
        </q-toolbar-title>



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
  {title:'Estudiantes', icon:'school', url:'/'},
  {title:'Profesores', icon:'cast_for_education', url:'/teachers'},
   {title:'Configuraciones', icon:'settings', url:'/settings'},
]

export default defineComponent({


  components: {
    tabsVue
  },


  setup () {
      const authStore = useAuthStore();
      const { user: authUser } = storeToRefs(authStore);
    const leftDrawerOpen = ref(false)


    return {
      user:authUser,
      authStore,

      tabsData:menuData,

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

</style>
