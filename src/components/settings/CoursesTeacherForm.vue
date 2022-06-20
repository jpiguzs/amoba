<template>
  <div class="row">
    <div :class=" course.course_id?'col-6' :'col-12'">
      <q-select borderless label-color="black" v-model="course.course_id" :options="courses"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'" label="Materias"
        behavior="menu" class="input" emit-value map-options dense @change="Geteacher()" use-chips :rules="[
          val => val.length > 0 || 'Campo obligatorio'
        ]" />
    </div>
    <div class="col-6" v-if="course.course_id">
      <q-select borderless label-color="black" v-model="course.teacher_id" :options="teachers"
        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name + ' ' + opt.last_name : '- Null -'"
        label="Profresores" behavior="menu" class="input" emit-value map-options dense use-chips :rules="[
          val => !!val || 'Campo obligatorio'
        ]" />

    </div>

  </div>
</template>

<script>

import { db } from 'boot/db'
import { ref, toRefs, onMounted, watch } from 'vue'
export default {
  // name: 'ComponentName',
  props: {
    course: {
      type: Object,
      default: function () {
        return ref({ course_id: null, teacher_id: null })
      }
    }

  },
  setup(props) {
    const { course } = toRefs(props)
    const teachers = ref([]);
    const teachers_filtred = ref([]);
    const courses = ref([])
    const getOptions = () => {
      db.collection('course').get().then(res => {
        courses.value = []
        courses.value = res.reverse();
      })
      db.collection('teachers').get().then(res => {
        teachers.value = []
        teachers.value = res.reverse();
        teachers_filtred.value = res.reverse();
      })

    }

    const getTeacher = () => {
      teachers.value = teachers.value.filter(teacher => {
        let courses = JSON.parse(teacher.courses)
        return courses.some(cour => cour === course.course_id)
      });
      console.log(teachers)

    }
    watch(course.value, (newval, old) => {
      if(newval){
        teachers_filtred.value = teachers.value.filter(teacher => {
        let courses = JSON.parse(teacher.courses)
        return courses.some(cour => cour === newval.course_id)
      });
      }else{
        teachers_filtred.value = teachers.value;
      }

    })
    // getTeacher(){
    //    teachers.value =  teachers.value
    // }

    onMounted(() => {
      getOptions() // <div>
    })

    return {
      teachers:teachers_filtred,
      courses,
      course,
      getTeacher
    }
  }
}
</script>
