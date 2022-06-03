<template>
    <div class="bg-costum h-screen p-[24px]">
        <div class="bg-[rgba(255,255,255,0.55)] h-full backdrop-blur-[10px] flex rounded-[20px]">
            <div class="w-[118px]">
                <p-menu />
            </div>
             <router-view />
        </div>
       
    </div>
</template>

<script>
import menu from '../components/menu.vue'
    export default {
        name:'innerLayout',
        components:{'p-menu':menu}
    }
</script>

<style lang="scss" scoped>

</style>