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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-transparent"

      width="200"
    >
    <div class="full-height flex flex-center   ">
      <div>
          <div class="cursor-pointer q-pa-md ">
            <div class="icon text-center ">
                <q-icon name="school" size="30px" color="blue"></q-icon>
            </div>
            <div class="text-size-1 text-blue text-center">
                  Estudiantes
            </div>
          </div>
          <div class="cursor-pointer q-pa-md">
            <div class="icon text-center ">
                <q-icon name="cast_for_education" size="30px" color="blue"></q-icon>
            </div>
            <div class="text-size-1 text-blue text-center">
                  Profesores
            </div>
          </div>
          <div class="cursor-pointer q-pa-md">
            <div class="icon text-center ">
                <q-icon name="settings" size="30px" color="blue"></q-icon>
            </div>
            <div class="text-size-1 text-blue">
                  Configuraciones
            </div>
          </div>
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
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
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
