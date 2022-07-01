<template>
  <div>
    <q-btn v-if="!edit" class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Estudiante
      " @click="showForm = !showForm"></q-btn>
      <q-btn v-if="edit"   class="bg-tramsparent text-grey1" flat no-caps icon="edit" @click="showForm = !showForm"></q-btn>
     <q-dialog v-model="showForm">
      <q-card class="border-8px" style="width:320px">
        <q-card-section class="text-h6 text-blue1 text-center" >
              Formulario Para Estudiante

        </q-card-section>
          <q-form @submit="save" class="q-gutter-sm">
        <q-card-section class="q-gutter-xs">

          <div>
              <q-input v-if="showForm" class="input" dense borderless label="nombres" v-model="student.name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" dense borderless label="Apellidos" v-model="student.last_name"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" dense borderless label="cedula" v-model="student.ci"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
           <div>
              <q-input v-if="showForm" class="input" type="date" dense borderless label="Fecha de nacimiento" v-model="student.b_date"   :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
      ></q-input>
          </div>
          <div>
            <q-select

          borderless

          label-color="black"
          v-model="student.grade_id"
          :options="grades"
          :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
          :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name: '- Null -'"
          label="Grados"
          behavior="menu"
          class="input"
          emit-value
          map-options
          dense
          clearable
           use-chips
            :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
        />
          </div>
          <div>
            <q-select
          v-if="student.grade_id"
          borderless

          label-color="black"
          v-model="student.section_id"
          :options="sections"
          :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
          :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name: '- Null -'"
          label="secciones"
          behavior="menu"
          class="input"
          emit-value
          map-options
          dense
           use-chips
            :rules="[
          val => !!val || 'Campo obligatorio'
        ]"
        />
          </div>
       <div>
              <q-input v-if="!edit" class="input"  type="password" dense borderless label="clave de ingreso" v-model="password"   :rules="[
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
 import { ref, toRefs, onMounted, watch} from 'vue'
  import { useAuthStore} from 'stores/auth.store';

export default {
  // name: 'ComponentName',
  props:{
    student:{
      type:Object,
      default:function(){
        return ref ({name:null, last_name:null,ci:null,b_date:null, id:null, courses:[], grade_id:null, section_id:null })
      }
    }

  },
  setup (props) {
 const authStore = useAuthStore();
const  getGrades = ()=>{
  db.collection('grades').get().then(res => {
  grades.value = []
  grades.value = res.reverse();
  if(student.value.id){
  sections.value = JSON.parse(grades.value.find(grade => grade.id=== student.value.grade_id).secctions);

  }
})}
onMounted(() => {
  getGrades() // <div>
})
  const showForm = ref(false)
  const {student} = toRefs(props)
  const grades = ref([])
  const edit = student.value.id ===null ? false :true;
  const password = ref(null)
  const sections = ref([])
  if(edit){
    if(typeof student.value.courses === 'string' ){
      student.value.courses =JSON.parse(student.value.courses)
    }
    

  }
 watch(student.value, (currentValue, oldValue) => {
  console.log(currentValue);
  if(currentValue.grade_id){
    sections.value = JSON.parse(grades.value.find(grade => grade.id=== currentValue.grade_id).secctions);

  }
  });

    return {
      authStore,
     student,
     showForm,
     edit,
     grades,
     sections,
     password

    }
  },

     methods :{
       save(){
    let id = CreatorId('student');
    let courses = JSON.parse(this.grades.find(grade => grade.id=== this.student.grade_id).courses);
    this.student.courses = courses.map(course =>{
      let data = {
        course_id:course.course_id,
        teacher_id:course.teacher_id,
        grade_id:this.student.grade_id,
        section_id:this.student.section_id,
        lapso1:null,
        lapso2:null,
        lapso3:null,
        student_id: this.student.id ? this.student.id :id
      }
      return data
    })
    this.$q.loading.show()
      if(this.authStore.CheckAviableName({user_name:this.student.ci, id:this.student.id })){
       this.$q.notify({
        message:'Esta cedula ya ha esta tomada',
        color:"red"
      });
      this.$q.loading.hide();
      return
    }
    if(this.student.id){
      db.collection('students').doc({ id: this.student.id }).update({
        name:this.student.name,
          last_name:this.student.last_name,
          ci:this.student.ci,
          b_date:this.student.b_date,
          grade_id:this.student.grade_id,
          section_id:this.student.section_id,

      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
       db.collection('users').doc({ id: this.student.id }).update(
        {
          name:this.student.name+" "+ this.student.last_name,
          user_name:this.student.ci,

          type:3

          }).then(res =>{

        })
        this.authStore.getUsers();
      this.$emit('refesh_students')
      this.showForm =false;

      }).catch(err=>{
        debug(err)
      })
    }else{

       db.collection('students').add(
        {
          name:this.student.name,
          id,
          last_name:this.student.last_name,
           ci:this.student.ci,
           b_date:this.student.b_date,
           grade_id:this.student.grade_id,
          section_id:this.student.section_id,
           courses:JSON.stringify(this.student.courses) ,

          }).then(res =>{
      this.$q.loading.hide()
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })
       db.collection('users').add(
        {
          name:this.student.name+""+ this.student.last_name,
          id,
          user_name:this.student.ci,
          password:this.password,
          type:3

          }).then(res =>{

        })
        this.authStore.getUsers();
      this.$emit('refesh_students')

      this.showForm =false;
    })

    }


    }
  }


}
</script>
