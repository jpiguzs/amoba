<template>
  <div>
      <YearFormVue @refesh_year="getYear()"></YearFormVue>
      <q-table
      title="Años escolares"
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
        <q-input class="input w-150"  dense borderless v-model="filter" placeholder="Search">
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

           <YearFormVue @refesh_year="getYear()" :year="props.row"></YearFormVue>

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
import YearFormVue from './YearForm.vue'
import { ref, onMounted } from 'vue'
   import { db } from 'boot/db'
export default {
  components:{YearFormVue},
  setup () {
    const rows= ref([]);
     const  getYear = ()=>{
      db.collection('years').get().then(res => {
        rows.value = []

        setTimeout(() => {
        rows.value = res.reverse();

      }, 100)
      })}
    onMounted(()=>{
      getYear();
    })
    return {

      rows,
      getYear,
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
          {
          name: 'status',
          required: true,
          label: 'Estatus',
          align: 'left',
          field: row => row.statusname,
          format: val => `${val}`,
          sortable: true
        },
          { name: 'actions', label: 'Acciones', field:'actions', sortable: true },



      ]
    }
  }
}

</script>
<style>
   .w-150{
     width: 150px;
   }
</style>
