<template>
  <div class="full-height q-mt-xl">
      <!-- <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Profesor
      "></q-btn> -->
      <q-table
      title="Usuarios"
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

  import { ref } from 'vue'

export default {
  setup () {
    return {

 rows: [
  {
    name: 'Jose 1',
    type: 'Admin',
    age: 6.0,

  },
   {
    name: 'Jose 1',
    type: 'Profesor',
    age: 6.0,

  },
  {
    name: 'Jose 1',
    type: 'Profesor',
    age: 6.0,

  },
  {
    name: 'Jose 1',
    type: 'Estudiante',
    age: 6.0,

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
        { name: 'type', align: 'center', label: 'Tipo de usario', field: 'type', sortable: true },


      ]
    }
  }
}

</script>
