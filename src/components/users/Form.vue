<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="add" label="Nuevo usuario
      " @click="showForm =!showForm"></q-btn>
 <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
             Formulario de usuarios

        </q-card-section>
          <q-form @submit="save">
        <q-card-section>

            <div>
                   <q-input v-if="showForm" class="input" dense borderless label="Nombre" v-model="user.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
            </div>
             <div>
                   <q-input v-if="user.type===1 || user.type===null " class="input" dense borderless label="Cedula" v-model="user.user_name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
            </div>
               <div>
                   <q-input v-if="showForm" class="input" type="password" dense borderless label="Contraseña" v-model="user.password"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
            </div>


        </q-card-section>
        <div class="row">
               <q-btn icon="send" type="submit" class="bg-tramsparent  col-6 text-blue1" flat label="Guardar"></q-btn>
                <q-btn icon="close" class=" bg-tramsparent col-6 text-grey1" flat v-close-popup label="cerrar"></q-btn>
        </div>
           </q-form>
      </q-card>
     </q-dialog>
  </div>
</template>

<script>
 import { db } from 'boot/db'

 import { CreatorId  } from "src/utilities/idCreator.js";
 import { ref, toRefs} from 'vue'
 import { useAuthStore} from 'stores/auth.store';
export default {
  // name: 'ComponentName',
   props:{
    user:{
      type:Object,
      default: function (){
        return ref ({name:null , id:null, user_name:null, password:null, type:null})
      }
    }
  },
  setup (props) {
 const authStore = useAuthStore();
    const showForm = ref(false)
  const{ user} = toRefs(props)


    const edit = user.value.id ===null ? false :true;


    return {
      showForm,
      user,
      edit,
       authStore
    }
  },

  methods :{
    save(){

    this.$q.loading.show()
    if(this.authStore.CheckAviableName({user_name:this.user.user_name, id:this.user.id })){
       this.$q.notify({
        message:'Esta cedula ya ha esta tomada',
        color:"red"
      });
      this.$q.loading.hide();
      return
    }
    if(this.user.id){

      db.collection('users').doc({ id: this.user.id }).update({
         name:this.user.name,
         password:this.user.password,
         user_name:this.user.user_name,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
       this.authStore.getUsers();
      this.$emit('refesh_users')
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{
       db.collection('users').add({
        name:this.user.name,
        id:CreatorId('user'),
         password:this.user.password,
         user_name:this.user.user_name,
         type:1
         }).then(res =>{
      this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
       this.authStore.getUsers();
      this.$emit('refesh_users')
      this.user.name =null;
      this.showForm =false;
    })

    }


    }
  },

}
</script>
