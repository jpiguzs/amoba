<template>
  <div class="full-height q-mt-xl">
      <teacherForm @refesh_teachers="getTeachers"></teacherForm>
      <q-table
      title="Profesores"
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
           <teacherForm @refesh_teachers="getTeachers" :teacher="props.row" ></teacherForm>

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
  import teacherForm from './Form.vue'
   import { db } from 'boot/db'

export default {
  components:{teacherForm},
  setup () {
    const rows = ref([])
     const  getTeachers = ()=>{
      db.collection('teachers').get().then(res => {
        rows.value = []
        console.log(res)

        setTimeout(() => {
        rows.value = res.reverse();

      }, 100)
      })}
    onMounted(()=>{
      getTeachers();
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
 getTeachers,
      filter: ref(''),

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'ci', align: 'center', label: 'cedula', field: 'ci', sortable: true },
        { name: 'age', label: 'Edad', field: 'age', field: row => row.b_date, format:val => calculateAge(val), sortable: true },
          { name: 'actions', label: 'Acciones', field:'actions', sortable: true },


      ]
    }
  }
}

</script>
