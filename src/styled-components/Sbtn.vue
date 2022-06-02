<template>
    <div class="inline">
        <button class="bg-[#3568F0] rounded-[10px] p-[10px] text-white h-[40px]" type="submit">
           <div class="flex">
            <slot name="label">
                
            </slot>
            <slot name="icon">
                
            </slot>
           </div> 
           
        </button>
    </div>
</template>

<script>
    export default {
        name:'submit-btn'
    }
</script>

<style lang="scss" scoped>

</style>