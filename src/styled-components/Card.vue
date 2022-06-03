<template>
    <div>
        <div 
        :class="bg_type===1? 'bg-gradient-to-b from-[#FFFFFF] to-[#EEF0F6]':' bg-[#FFFFFF]'"
        class=" p-[48px] rounded-[20px] shadow-[0_5px_20px_rgba(124,132,152,0.2)]"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:"p-card",
        props:{
            bg_type:{
                type:Number,
                default:1,
            }
        }
    }
</script>
