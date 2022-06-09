<template>
  <q-layout view="lHh Lpr lFf">
    <div class="background" >
      <q-header class="bg-transparent" >
      <q-toolbar >


        <q-toolbar-title>
          Educa
        </q-toolbar-title>


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

    const leftDrawerOpen = ref(false)

    return {
      tabsData:menuData,

      leftDrawerOpen,
      tab: ref('mails'),
      splitterModel: ref(20),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>

</style>
