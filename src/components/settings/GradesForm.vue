<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="add" label="Nuevo Grado
      " @click="showForm = !showForm"></q-btn>
      <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
              Nuevo Grado

        </q-card-section>
          <q-form @submit="save" class="q-gutter-sm">
        <q-card-section class="q-gutter-xs">

          <div>
              <q-input v-if="showForm" class="input" dense borderless label="Grado" v-model="grade.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
          <div>
            <div class="flex flex-center">
              Materias <q-btn class="bg-tramsparent text-grey1 btn-success" dense rounded @click="setNewCurse()" icon="add"></q-btn>
            </div>
            <div  v-for="(course, index) in grade.courses" :key="index">
                <coursesTeacherForm :course="course"></coursesTeacherForm>
            </div>
          </div>
          <div>
            <div class="flex flex-center">
              Secciones <q-btn class="bg-tramsparent text-grey1 btn-success" dense rounded @click="setNewSecctions()" icon="add"></q-btn>
            </div>
            <div  v-for="(section, index) in grade.secctions" :key="index">
                <div>
              <q-input v-if="showForm" class="input" dense borderless label="Seccion" v-model="section.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
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
 import { ref, toRefs, onMounted} from 'vue'
 import coursesTeacherForm  from './CoursesTeacherForm.vue'

export default {
  // name: 'ComponentName',
  components:{coursesTeacherForm},
  props:{
    grade:{
      type:Object,
      default:function(){
        return ref ({name:null, last_name:null,ci:null,b_date:null, id:null, courses:[], secctions:[] })
      }
    }

  },
  setup (props) {
  const teachers = ref([]);
  const courses = ref([])
  const showForm = ref(false)
  const {grade} = toRefs(props)
  const  getOptions = ()=>{
    db.collection('course').get().then(res => {
    courses.value = []
    courses.value = res.reverse();
})
 db.collection('teachers').get().then(res => {
    teachers.value = []
    teachers.value = res.reverse();
})

}
  onMounted(() => {
    getOptions() // <div>

  })



    const setNewCurse = ()=>{
      grade.value.courses.push({
        course_id:null,
        teacher_id:null,
      })
    }
    const setNewSecctions = ()=>{
      grade.value.secctions.push({
        id:CreatorId('sections'),
        name:null,
      })
    }

    // if(grade.value.secctions.length === 0){
    //   setNewSecctions();
    //   grade.value.secctions = JSON.stringify( grade.value.secctions);
    //   console.log('hola')
    // }

    const edit = grade.value.id ===null ? false :true;
    if(edit){

      grade.value.courses =JSON.parse(grade.value.courses)
      grade.value.secctions = JSON.parse( grade.value.secctions );
    }else{
      setNewCurse()
    }

    return {
     grade,
     showForm,
     edit,
     courses,
     setNewCurse,
     teachers,
     setNewSecctions

    }
  },

     methods :{
       save(){

    this.$q.loading.show()
    if(this.grade.id){
      db.collection('grades').doc({ id: this.grade.id }).update({
        name:this.grade.name,
        secctions:JSON.stringify(this.grade.secctions),
        courses:JSON.stringify(this.grade.courses) ,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      window.location.reload()
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{
       db.collection('grades').add(
        {
          name:this.grade.name,
          id:CreatorId('grade'),
           courses:JSON.stringify(this.grade.courses) ,
              secctions:JSON.stringify(this.grade.secctions),
          }).then(res =>{
      this.$q.loading.hide()
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
      window.location.reload()

      this.showForm =false;
    })

    }


    }
  }


}
</script>
