<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'

 import { CreatorId  } from "src/utilities/idCreator.js";
  import { db } from 'boot/db'
export default defineComponent({
  name: 'App',
  setup(){
  onMounted(() => {
     db.collection('users').get().then(res => {
        if(res.length ===0){
        db.collection('users').add(
        {
          name:"Administrador",
          id:CreatorId('user'),
          user_name:'21174755',
          password:'12345',
          type:1

          }).then(res =>{

        })
        }
  })
  })

  }
})
</script>
