<template>
  <div>
     <GradesFormVue @refesh_grades="getGrades()"></GradesFormVue>
      <q-table
      title="Grados"
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

           <GradesFormVue @refesh_grades="getGrades()" :grade="props.row"></GradesFormVue>

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
 import { db } from 'boot/db'
import { ref , onMounted } from 'vue'
import GradesFormVue from './GradesForm.vue'
export default {
  components:{GradesFormVue},
  setup () {
    const rows= ref([])
    const getGrades = ()=>{
    db.collection('grades').get().then(res => {
    rows.value = []
    rows.value = res.reverse();
    console.log(res)
})

    }
      onMounted(()=>{
      getGrades();
    })
    return {
      rows,
      getGrades,

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
        { name: 'actions', label: 'Acciones', field:'actions', sortable: true },



      ]
    }
  }
}

</script>
