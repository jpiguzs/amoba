<template>
  <div class="full-height q-mt-xl">

      <q-table
      title="Profesores"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
      row-key="name"
      flat
      card-container-class="border-8px"
      card-class="border-8px"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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
    ci: 159,
    age: 6.0,

  },
   {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,

  },
  {
    name: 'Jose 1',
    ci: 159,
    age: 6.0,

  },
  {
    name: 'Jose 1',
    ci: 159,
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
        { name: 'ci', align: 'center', label: 'cedula', field: 'ci', sortable: true },
        { name: 'age', label: 'Edad', field: 'age', sortable: true },
      
        
      ]
    }
  }
}

</script>
