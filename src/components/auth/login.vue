<template>
  <div>
    <q-card class="card-customize q-pa-md row " flat>
      <q-card-section class="col-12 flex flex-center text-h6 q-mt-md">
        <img src="/educa.png" alt="" style="width: 200px ;" srcset="">
      </q-card-section>

      <q-card-section class="col-12">
        <q-form class="" @submit="login">

          <q-input v-model="user_name" bottom-slots label="cedula"    lazy-rules>
            <template v-slot:before>
              <q-icon class="text--secondary" name="person" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            bottom-slots
            label="Contraseña"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:before>
              <q-icon class="text--secondary" name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>


          <div class="q-mb-sm">
            <q-btn

              class="full-width btn--primary"
              label="iniciar sesion"
              type="submit"
              flat
            />
          </div>
          <q-separator class="q-mb-sm " color="turquese-secondary" />

          <!--
            <div>
              <q-btn class="full-width " label="Iniciar sesion con Google " icon="" />
            </div>
          -->
        </q-form>

      </q-card-section>
    </q-card>



  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from 'boot/db'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia';
import { useAuthStore} from 'stores/auth.store';
import { useRouter} from 'vue-router'
export default {
  name: "login-vue",
  setup(){
     const router = useRouter()
    const $q = useQuasar()
    const password = ref(null)
    const user_name = ref(null)
    const isPwd = ref(true)
    const users = ref([]);
    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    const getUsers = () =>{
       db.collection('users').get().then(res => {
      users.value = res.reverse();

    })
    }
    onMounted(() => {
      getUsers()
    })
    const login = ()=>{

      let userFound = users.value.find(user =>{
        return user.user_name===user_name.value && user.password === password.value;
      })
      if(!userFound){
          $q.notify({
            message:"Datos incorrectos",
            color:"red"
          })
      } else{

        authStore.SetUser(userFound);

         $q.notify({
            message:"Datos correctos",
            color:"green"
          })
      if(userFound.type===2){
        router.push('/admin-teachers');
      }
      if(userFound.type===1){
        router.push('/students');
      }
      if(userFound.type===3){
        router.push('/admin-students');
      }
      }
    }
    return {
      password,
      user_name,
      isPwd,
      login, users
    }
  }
};
</script>
<style>
.space {
  margin-top: 80%;
}
</style>
