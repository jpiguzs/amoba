<template>
  <div class="text-pink-400 flex w-full h-screen justify-center items-center ">
  <div>{{ msg }}</div>

  </div>
</template>

<script> 
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
