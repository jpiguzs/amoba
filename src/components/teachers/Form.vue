<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Profesor
      " @click="showForm = !showForm"></q-btn>
      <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
              Nuevo Profesor

        </q-card-section>
          <q-form @submit="save" class="q-gutter-sm">
        <q-card-section class="q-gutter-xs">

          <div>
              <q-input v-if="showForm" class="input" dense borderless label="nombres" v-model="teacher.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" dense borderless label="Apellidos" v-model="teacher.last_name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" dense borderless label="cedula" v-model="teacher.ci"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" type="date" dense borderless label="Fecha de nacimiento" v-model="teacher.b_date"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
          <div>
            <q-select

          borderless
          multiple
          label-color="black"
          v-model="teacher.courses"
          :options="courses"
          :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
          :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name: '- Null -'"
          label="Materias"
          behavior="menu"
          class="input"
          emit-value
          map-options
          dense
           use-chips
            :rules="[
          val => val.length >0 || 'Campo obligatorio'
        ]"
        />
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
 import { ref, toRefs, onMounted} from 'vue'

export default {
  // name: 'ComponentName',
  props:{
    teacher:{
      type:Object,
      default:function(){
        return ref ({name:null, last_name:null,ci:null,b_date:null, id:null, courses:[] })
      }
    }

  },
  setup (props) {

   const  getCourses = ()=>{
  db.collection('course').get().then(res => {
  courses.value = []
  courses.value = res.reverse();
})}
onMounted(() => {
  getCourses() // <div>
})

    const showForm = ref(false)
  const {teacher} = toRefs(props)
    const courses = ref([])

    const edit = teacher.value.id ===null ? false :true;
    if(edit){

      teacher.value.courses =JSON.parse(teacher.value.courses)
    }

    return {
     teacher,
     showForm,
     edit,
     courses,

    }
  },

     methods :{
       save(){

    this.$q.loading.show()
    if(this.teacher.id){
      db.collection('teachers').doc({ id: this.teacher.id }).update({
        name:this.teacher.name,
          last_name:this.teacher.last_name,
          ci:this.teacher.ci,
          b_date:this.teacher.b_date,
          courses:JSON.stringify(this.teacher.courses) ,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_teachers')
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{
       db.collection('teachers').add(
        {
          name:this.teacher.name,
          id:CreatorId('teacher'),
          last_name:this.teacher.last_name,
           ci:this.teacher.ci,
           b_date:this.teacher.b_date,
           courses:JSON.stringify(this.teacher.courses) ,

          }).then(res =>{
      this.$q.loading.hide()
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      this.$emit('refesh_teachers')

      this.showForm =false;
    })

    }


    }
  }


}
</script>
