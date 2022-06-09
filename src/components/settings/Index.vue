<template>
  <div class="full-height q-mt-xl">
      <div class="q-mt-xl q-pt-xl ">
            <div class="row ">
              <div class="col-4 q-pa-xs">
                  <courses></courses>
              </div>
              <div class="col-4 q-pa-xs" >
                <grade></grade>
              </div>
              <div class="col-4 q-pa-xs">
                 <yearTable></yearTable>
              </div>
            </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import courses  from './CousersTable.vue'
import grade  from './GradesTable.vue'
import yearTable  from './YearTable.vue'
export default {
  // name: 'ComponentName',
  components:{courses, grade, yearTable},
  setup () {
    return {
       tab: ref('courses')
    }
  }
}
</script>
<style>
  .width-50{
    width: 50%;
  }
</style>
