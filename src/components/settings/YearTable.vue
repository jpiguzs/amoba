<template>
  <div>
      <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="add" label="Nuevo Año
      "></q-btn>
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
    name: '2017-2018',
    status: 'culminado',
    age: 6.0,

  },
   {
    name: '2018-2019',
    status: 'culminado',
    age: 6.0,

  },
  {
    name: '2019-2020',
    status: 'culminado',
    age: 6.0,

  },
  {
    name: '2020-2021',
    status: 'En proceso',
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
          {
          name: 'status',
          required: true,
          label: 'Estatus',
          align: 'left',
          field: row => row.status,
          format: val => `${val}`,
          sortable: true
        },



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
