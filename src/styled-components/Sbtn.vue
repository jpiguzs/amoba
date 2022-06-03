<template>
    <div class="inline">
        <button class="bg-[#3568F0] rounded-[10px] pl-[20px] pr-[20px] text-white h-[40px] w-fit " type="submit">
           <div class="flex ">
            <slot name="label">
                
            </slot>
            <div  class="pl-[10px] pt-[5px]">
                <slot name="icon">
                    <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71966 0.67239L10 8.54699L1.71966 16.4216L-3.16149e-07 14.6134L6.37918 8.54699L-2.43753e-06 2.48055L1.71966 0.67239Z" fill="white"/>
                        </svg>
                
            </slot>
            </div>
            
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