<template>
  <div>
       <CourseForm @refesh_courses="getCourses"></CourseForm>
      <q-table
      title="Materias"
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
  import   CourseForm  from './CourseForm.vue'
   import { db } from 'boot/db'

export default {
  components:{CourseForm},
  data () {
    return {

 rows: [
  



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



      ]
    }
  },
  methods:{
    getCourses(){
      db.collection('course').get().then(courses => {
  this.rows = []
  this.rows = courses.reverse();
})
    }
  },
  mounted(){
    
    this.getCourses();
    console.log(this)
    
    //this.$root.on('refesh_courses', this.getCourses)
  }
}

</script>
