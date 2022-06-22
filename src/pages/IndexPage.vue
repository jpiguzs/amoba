<template>
  <q-page class="flex flex-center">
    <loginVue></loginVue>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import loginVue from 'components/auth/login.vue'

export default defineComponent({
  name: 'IndexPage',
  components:{loginVue}
})
</script>
