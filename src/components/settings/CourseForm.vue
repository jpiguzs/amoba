<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="add" label="Nueva materia
      " @click="showForm = !showForm"></q-btn>
 <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
              Nueva materias

        </q-card-section>
          <q-form @submit="save">
        <q-card-section>


              <q-input v-if="showForm" class="input" dense borderless label="materia" v-model="course.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>

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
export default {
  // name: 'ComponentName',
   props:{
    course:{
      type:Object,
      default: function (){
        return ref ({name:null , id:null})
      }
    }
  },
  setup (props) {

    const showForm = ref(false)
  const{ course} = toRefs(props)


    const edit = course.value.id ===null ? false :true;


    return {
      showForm,
      course,
      edit
    }
  },

  methods :{
    save(){

    this.$q.loading.show()
    if(this.course.id){
      db.collection('course').doc({ id: this.course.id }).update({
         name:this.course.name,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_courses')
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{
       db.collection('course').add({name:this.course.name, id:CreatorId('course')}).then(res =>{
      this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_courses')
      this.course.name =null;
      this.showForm =false;
    })

    }


    }
  },

}
</script>
