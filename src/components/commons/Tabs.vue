<template>

    <div class="cursor-pointer q-pa-md " :class="$route.path===url? 'text-blue1': 'text-grey1' "  v-on:click="$router.push(url)">
            <div class="icon text-center ">
                <q-icon :name="icon" size="30px" ></q-icon>
            </div>
            <div class="text-size-1 q-pt-sm  text-center" >
                 {{title}}
            </div>
          </div>

</template>

<script>
export default {
  // name: 'ComponentName',
  props:['title', 'url', 'icon'],
  setup () {
    return {



    }
  }
}
</script>
