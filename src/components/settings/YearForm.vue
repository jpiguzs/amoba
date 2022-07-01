<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="add" label="Nuevo año escolar
      " @click="showForm = !showForm"></q-btn>
 <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
              Formulario Para Periodo

        </q-card-section>
          <q-form @submit="save">
        <q-card-section>

          <div>
               <q-input v-if="showForm" class="input" dense borderless label="Periodo escolar" v-model="year.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>

          </div>
          <div>
             <q-option-group
              v-model="year.status"
              :options="options"


            />
          </div>
          <div class="row">
             <div class="col-4" v-for="(lapso, index) in year.lapsos" :key="index">
              <div>
                {{lapso.name}}
              </div>
              <div>
              <q-option-group
              v-model="lapso.status"
              :options="options"
              color="green"

            />
              </div>

            </div>
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
 import {options, getStatusName} from 'src/utilities/options.js'
 import { ref, toRefs} from 'vue'
export default {
  // name: 'ComponentName',
   props:{
    year:{
      type:Object,
      default: function (){
        return ref ({name:null , id:null, status:null ,  lapsos:[]})
      }
    }
  },
  setup (props) {

    const showForm = ref(false)
    const{ year} = toRefs(props)




    const edit = year.value.id ===null ? false :true;
    if(!edit){
      let lapsos = [
        {
        name:'Lapso 1',
        status:false,
        id:CreatorId('lapso'),
      },
        {
        name:'Lapso 2',
        status:false,
        id:CreatorId('lapso'),
      },
        {
        name:'Lapso 2',
        status:false,
        id:CreatorId('lapso'),
      },

      ]
      year.value.lapsos = lapsos;
      year.value.status = false;
    }else{
      if(typeof year.value.lapsos ==='string'){
        year.value.lapsos =JSON.parse( year.value.lapsos )
      }
       
    }


    return {
      showForm,
      year,
      edit,
      options
    }
  },

  methods :{
    save(){

    this.$q.loading.show()
    if(this.year.id){
      db.collection('years').doc({ id: this.year.id }).update({
          name:this.year.name,
          status:this.year.status,
          statusname:getStatusName(this.year.status),
          lapsos:JSON.stringify(this.year.lapsos) ,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_year')
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{
       db.collection('years').add(
        {name:this.year.name,
          status:this.year.status,
          statusname:getStatusName(this.year.status),
          lapsos:JSON.stringify(this.year.lapsos) ,
          id:CreatorId('course')}).then(res =>{
      this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_year')

    })

    }


    }
  },

}
</script>
