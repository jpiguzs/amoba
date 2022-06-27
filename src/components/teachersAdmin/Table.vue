<template>
  <div class="full-height q-mt-xl">
      <!-- <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Profesor
      "></q-btn> -->
      <q-table
      title="Notas de los estudiantes"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      no-data-label="No  hay datos para mostar"
      no-results-label="No se encontraron resultados"
      row-key="name"
      flat
      card-container-class="border-8px"
      card-class="border-8px"
    >
      <template v-slot:top-right>
        <q-input class="input" dense borderless v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" @refesh_students="getStudents()"  :key="col.name" :props="props">
          <div v-if="col.name!='actions'">
            {{ col.value }}

          </div>
          <div v-if="col.name==='actions'">
            <FormVue 
            :course="props.row" 
            :student="getStudentName(props.row.student_id)"
            :course_name="getCourseName(props.row.course_id)"
            :section_name="getSecionName(props.row.grade_id, props.row.section_id)"
            :grade_name="getGradeName(props.row.grade_id)"
            ></FormVue>

          </div>
          </q-td>




        </q-tr>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Well this is sad... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>

    import { ref, onMounted } from 'vue'
    import { db } from 'boot/db'
    import { useAuthStore} from 'stores/auth.store';
    import { storeToRefs } from 'pinia';
    import FormVue from './Form.vue';
export default {
  components:{FormVue},
  setup () {
     const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
      const grades = ref([])
      const courses = ref([])
      const studentsDb = ref([])
     const averg = function(student){
      let factor =[student.lapso1, student.lapso2, student.lapso3].filter(lapso=> lapso != null).length;
       let total = (student.lapso1?  parseInt(student.lapso1) : 0 ) + ( student.lapso2? parseInt(student.lapso2) : 0 ) + (student.lapso3? parseInt(student.lapso3) : 0 );

       return factor===0 ?'no hay notas': total/factor;
    }
    const rows = ref([])
     const getGradeName = (grade_id)=>{

      if(grades.value.length > 0){
         return grades.value.find(grade => grade.id === grade_id).name
      }

    }
     const getSecionName = (grade_id, secction_id)=>{
      if(grades.value.length > 0){
        console.log()
        let sections = JSON.parse( grades.value.find(grade => grade.id === grade_id).secctions)
      return sections.find(section=> section.id === secction_id).name
    }
      }
      const getStudentName = (student_id)=>{
      if(studentsDb.value.length > 0){
      console.log(student_id)
      let student =   studentsDb.value.find(row => row.id === student_id)
      return student.name + ' ' + student.last_name
    }
      }
       const getCourseName = (course_id)=>{
      if(courses.value.length > 0){
        console.log(course_id)
     return  courses.value.find(row => row.id === course_id).name

    }
      }

     const  getStudents = ()=>{
      db.collection('students').get().then(res => {
        rows.value = []
        let students =[];
        studentsDb.value = res;


        res.forEach(student => {
          let coursesStudent = JSON.parse(student.courses);
          let filtred_cursed = coursesStudent.filter(cou=> cou.teacher_id===authUser.value.id );
          students.push(...filtred_cursed)
        });

        setTimeout(() => {
        rows.value = students;
        console.log(rows.value)

      }, 100)
      })
      db.collection('grades').get().then(res => {
        grades.value = []


        setTimeout(() => {
        grades.value = res.reverse();

      }, 100)
      })
      db.collection('course').get().then(res => {
        courses.value = []
        console.log(res)

        setTimeout(() => {
        courses.value = res.reverse();

      }, 100)
      })
      }
    onMounted(()=>{

      getStudents();
    })
    return {

      rows,
      getCourseName,
      getSecionName,
      getStudentName,
      getGradeName,
      filter: ref(''),

      columns: [
        {
          name: 'course',
          required: true,
          label: 'Materia',
          align: 'left',
          field: row => row.course_id,
          format: val => getCourseName(val),
          sortable: true
        },
         {
           name: 'stundents',
           align: 'center',
           label: 'Estudiante',
           field: row => row.student_id,
            format: val =>getStudentName(val),
           sortable: true },
        { name: 'Grade', align: 'center', label: 'grado', field: row => getGradeName(row.grade_id), sortable: true },
        { name: 'secction', align: 'center', label: 'Seccion', field: row => getSecionName(row.grade_id, row.section_id), sortable: true },
        { name: 'laptso1', align: 'center', label: 'nota lapso 1', field: row=> row.lapso1, sortable: true },
        { name: 'laptso2', align: 'center', label: 'nota lapso 2', field: row=> row.lapso2, sortable: true },
        { name: 'laptso3', align: 'center', label: 'nota lapso 3', field: row=> row.lapso3, sortable: true },
        { name: 'total', align: 'center', label: 'Promedio', field: row =>  averg(row), sortable: true },
        { name: 'actions', align: 'center', label: 'Ver', sortable: true },


      ]
    }
  }
}

</script>
