<template>
  <div class="full-height q-mt-xl">
    <FormVue ></FormVue>
      <q-table
      title="Estudiantes"
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
          <q-td v-for="col in props.cols"  :key="col.name" :props="props">
          <div v-if="col.name!='actions'">
            {{ col.value }}

          </div>
          <div v-if="col.name==='actions'">
            <FormVue :student="props.row" ></FormVue>

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

  import { ref, onMounted,  } from 'vue'
  import { useQuasar } from 'quasar'
  import { db } from 'boot/db'
  import FormVue from './Form.vue'

export default {
  components:{FormVue},

  setup () {
  const grades = ref([])
 const rows = ref([])
    const getGradeName = (grade_id)=>{

      if(grades.value.length > 0){
         return grades.value.find(grade => grade.id === grade_id).name
      }

    }
     const getSecionName = (grade_id, secction_id)=>{
      if(grades.value.length > 0){
        let sections = JSON.parse( grades.value.find(grade => grade.id === grade_id).secctions)
      return sections.find(section=> section.id === secction_id).name
    }
      }

     const  getStudents = ()=>{
      db.collection('students').get().then(res => {
        rows.value = []

        setTimeout(() => {
        rows.value = res.reverse();

      }, 100)
      })
      db.collection('grades').get().then(res => {
        grades.value = []

        setTimeout(() => {
        grades.value = res.reverse();

      }, 100)
      })
      }
    onMounted(()=>{
      getStudents();
    })
    const calculateAge = (birthday) => {
   let hoy = new Date();
     let cumpleanos = new Date(birthday);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
    }
    return {

 rows,
 getStudents,
      filter: ref(''),

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nomber',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'ci', align: 'center', label: 'cedula', field: 'ci', sortable: true },
        { name: 'age', label: 'Edad', field: 'age', field: row => row.b_date, format:val => calculateAge(val), sortable: true },
        { name: 'grade', label: 'Grado', field: 'grade_id', field: row => row.grade_id, format:val => getGradeName(val), sortable: true },
        { name: 'section', label: 'Seccion', field: 'section_id', field: row => row, format:val => getSecionName(val.grade_id, val.section_id), sortable: true },
        { name: 'actions', label: 'Acciones', field:'actions', sortable: true },


      ]
    }
  }
}

</script>
