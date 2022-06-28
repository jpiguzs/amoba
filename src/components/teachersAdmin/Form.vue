<template>
  <div>
 <q-btn  class="bg-tramsparent text-grey1" flat no-caps icon="visibility" @click="showForm = !showForm"></q-btn>
<q-dialog v-model="showForm">
  <q-card class="border-8px" style="width:320px">
    <q-card-section>
      {{student}}
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      {{grade_name}}
    </q-card-section>
     <q-separator></q-separator>
      <q-card-section>
      {{section_name}}
    </q-card-section>
    <q-separator></q-separator>
     <q-card-section class="text-center text-capitalize">
      {{course_name}}
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-form @submit="save" >


      <div class="row ">

        <div class="col-4 q-pa-xs">

          <q-input class="input" type="number" dense borderless label="Primer lapso" v-model="course.lapso1"></q-input>
        </div>
         <div class="col-4 q-pa-xs">

          <q-input class="input" type="number" dense borderless label="segundo lapso" v-model="course.lapso2"></q-input>
        </div>
        <div class="col-4 q-pa-xs">

          <q-input class="input" type="number" dense borderless label="tercer lapso" v-model="course.lapso3"></q-input>
        </div>
      </div>
       <div class="row">
               <q-btn icon="send" type="submit" class="bg-tramsparent  col-6 text-blue1" flat label="Guardar"></q-btn>
                <q-btn icon="close" class=" bg-tramsparent col-6 text-grey1" flat v-close-popup label="cerrar"></q-btn>
        </div>
       </q-form>
    </q-card-section>

  </q-card>
</q-dialog>
  </div>
</template>

<script>
import {ref, toRefs, onMounted} from 'vue'
import {db} from 'src/boot/db'
export default {
  // name: 'ComponentName',
  props:{
    student:String,
    course_name:String,
    section_name:String,
    grade_name:String,
    course:{
      type:Object,
      default: function (){
        return ref ({
        course_id:null,
        teacher_id:null,
        grade_id:null,
        section_id:null,
        lapso1:null,
        lapso2:null,
        lapso3:null,
        student_id: null
    })
  }}},
  setup (props) {
    const showForm = ref(false);
    const {student, course_name, section_name, grade_name, course} = toRefs(props)
    return {
      student, course_name, section_name, grade_name, course,
      showForm
    }
  },
  methods :{
    save(){
      db.collection('students').doc({ id: this.course.student_id }).get().then(document => {
    let {courses} = document
        courses = JSON.parse(courses)
        let course_index = courses.findIndex(course => {
          return course.teacher_id === this.course.teacher_id && course.course_id === this.course.course_id;
        })
        courses[course_index] = this.course;
        db.collection('students').doc({ id: document.id }).update({

          courses:JSON.stringify(courses) ,
      }).then(res=>{
        this.$q.loading.hide();
      this.$q.notify({
        message:'Guardado con exito',
        color:"green"
      })})
      this.showForm =false;

})
    }
  }
}
</script>
