<template>
    <div class="h-screen">
    <!-- en esta seccion decidi calcular el procentaje de que abarca el diseño en lugar de usar los 80px del diseño, para que sea estetico en diferentes pantallas-->
    <header class="h-[8.3333%]">
        <navbar></navbar>
    </header>
        <div class="h-[91.6667%]">
             <router-view />
        </div>
    </div>
</template>

<script>
import navbar from '../styled-components/navbar.vue'
    export default {
        name:'main-layout',
        components:{navbar}
    }
</script>

<style lang="scss" scoped>

</style>