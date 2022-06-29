<template>
  <div class="full-height q-mt-xl">
      <!-- <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Profesor
      "></q-btn> -->
      <v_form @refesh_users="getUsers()"></v_form>
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols"  :key="col.name" :props="props">
          <div v-if="col.name!='actions'">
            {{ col.value }}

          </div>
          <div v-if="col.name==='actions'">
          <v_form @refesh_users="getUsers()" :user="props.row"></v_form>

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
   import {options, getTypeName} from 'src/utilities/options.js'
   import v_form  from './Form.vue'
 import { db } from 'boot/db'
export default {
  components:{v_form},

  setup () {
      const rows= ref([]);
     const  getUsers = ()=>{
      db.collection('users').get().then(res => {
        rows.value = []

        setTimeout(() => {
        rows.value = res.reverse();

      }, 100)
      })}
    onMounted(()=>{
      getUsers();
    })
    return {

 rows,
 getUsers,

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
        { name: 'type', align: 'center', label: 'Tipo de usario', field: row => getTypeName(row.type), sortable: true },
         { name: 'actions', align: 'center', label: 'Ver', sortable: true },


      ]
    }
  }
}

</script>
