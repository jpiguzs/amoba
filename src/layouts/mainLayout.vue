<template>
    <div>
    <header>
        <navbar></navbar>
    </header>
        <div>
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