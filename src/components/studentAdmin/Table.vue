<template>
  <div class="full-height q-mt-xl">
      <!-- <q-btn class="bg-tramsparent text-grey1" flat no-caps icon="person" label="Nuevo Profesor
      "></q-btn> -->
      <q-table
      title="Notas"
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
    course: 'Matematica',
    student: {
    name :'Jose Gregorio' ,
    last_name:'Piguz sanvicente',
    grade:'5to año',
    section:'A',
    lapso1:10,
    lapso2:3,
    lapso3:null,
    averg: function(){
      let factor =[this.lapso1, this.lapso2, this.lapso3].filter(lapso=> lapso != null).length;
       let total = (this.lapso1? this.lapso1 : 0 ) + (this.lapso2? this.lapso2 : 0 ) + (this.lapso3? this.lapso3 : 0 );

       return total/factor;
    }
    },


  },
   {
    course: 'Fisica',
    student: {
    name :'Jose Gregorio' ,
    last_name:'Piguz sanvicente',
    grade:'5to año',
    section:'A',
    lapso1:10,
    lapso2:10,
    lapso3:null,
    averg: function(){
      let factor =[this.lapso1, this.lapso2, this.lapso3].filter(lapso=> lapso != null).length;
       let total = (this.lapso1? this.lapso1 : 0 ) + (this.lapso2? this.lapso2 : 0 ) + (this.lapso3? this.lapso3 : 0 );

       return total/factor;
    }
    },


  },
   {
    course: 'Quimica',
    student: {
    name :'Jose Gregorio' ,
    last_name:'Piguz sanvicente',
    grade:'5to año',
    section:'A',
    lapso1:10,
    lapso2:7,
    lapso3:null,
    averg: function(){
      let factor =[this.lapso1, this.lapso2, this.lapso3].filter(lapso=> lapso != null).length;
       let total = (this.lapso1? this.lapso1 : 0 ) + (this.lapso2? this.lapso2 : 0 ) + (this.lapso3? this.lapso3 : 0 );

       return total/factor;
    }
    },


  },
   {
    course: 'Deporte',
    student: {
    name :'Jose Gregorio' ,
    last_name:'Piguz sanvicente',
    grade:'5to año',
    section:'A',
    lapso1:7,
    lapso2:9,
    lapso3:null,
    averg: function(){
      let factor =[this.lapso1, this.lapso2, this.lapso3].filter(lapso=> lapso != null).length;
       let total = (this.lapso1? this.lapso1 : 0 ) + (this.lapso2? this.lapso2 : 0 ) + (this.lapso3? this.lapso3 : 0 );

       return total/factor;
    }
    },


  },




],
      filter: ref(''),

      columns: [
        {
          name: 'course',
          required: true,
          label: 'Materia',
          align: 'left',
          field: row => row.course,
          format: val => `${val}`,
          sortable: true
        },


        { name: 'laptso1', align: 'center', label: 'nota lapso 1', field: row=> row.student.lapso1, sortable: true },
        { name: 'laptso2', align: 'center', label: 'nota lapso 2', field: row=> row.student.lapso2, sortable: true },
        { name: 'laptso3', align: 'center', label: 'nota lapso 3', field: row=> row.student.lapso3, sortable: true },
        { name: 'total', align: 'center', label: 'Promedio', field: row =>  row.student.averg(), sortable: true },


      ]
    }
  }
}

</script>
