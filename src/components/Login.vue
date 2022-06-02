<template>
    <div>
        <p-card 
        class="w-[658px]"
        >
            <div 
            class="text-center text-[20px] font-medium"
            >
                INICIAR SESIÓN
           </div>
           <div 
           class="flex flex justify-center items-center p-[24px]"
           >
               <div 
               class="pr-[12px] cursor-pointer"
               >
                   <img 
                   src="../assets/img/google.png" 
                   />
               </div> 
               <div 
               class="pl-[12px] cursor-pointer"
               >
                   <img 
                   src="../assets/img/linkedin.png" 
                   />
               </div>
           </div>
           <div 
           class=" flex pt-[24px] w-full "
           >
               <hr 
               class="bg-[#ACBADC] p-[0.5px] m-[10px]  text-[#ACBADC] h-[1px] font-medium w-1/3"
               /><div 
               class="w-1/3 text-center text-[#7C8498]"
               > o inicia con 
               </div> 
               <hr 
               class="bg-[#ACBADC] p-[0.5px] m-[10px]  text-[#ACBADC] h-[1px] font-medium w-1/3" 
               />
           </div>
           <div class="pt-[24px]">
               <div class="text-[#7C8498] p-[10px]">Correo electrónico </div>
               <div>
               <p-input class="w-full" />
               </div>
               <div class="text-[#7C8498] p-[10px]">Contraseña </div>
               <div>
               <p-input class="w-full" />
               </div>
           </div>
           <div class="p-[24px]">
               <p-submit>
                  <template v-slot:label>
                        login
                  </template>
            
                  <template v-slot:icon>
                          <v-icon name="camera" color="bg-white"/>
                  </template>
               </p-submit>
           </div>

        
        </p-card>
    </div>
</template>

<script>
    
    export default {
        name:"p-login",
     
    }
</script>

<style lang="scss" scoped>

</style>