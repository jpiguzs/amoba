<template>
  <div class="full-height q-mt-xl">
      <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Estudiante
      "></q-btn>
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


export default {
  
  
  setup () {
     
return {

 rows: [
  {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,
    grade:'5to año',
    section:'A'

  },
   {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,
     grade:'5to año',
        section:'A'

  },
  {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,
    grade:'5to año',
    section:'A',


  },
  {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,
    grade:'5to año',
    section:'A'

  },



],
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
        { name: 'age', label: 'Edad', field: 'age', sortable: true },
        { name: 'grade', label: 'Grado', field: 'grade', sortable: true },
         { name: 'section', label: 'Seccion', field: 'section', sortable: true },



      ]
    }
  }
}

</script>
