import { boot } from 'quasar/wrappers'

let db = new Localbase('schooldb');


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app}) => {
  // something to do
  app.config.globalProperties.$db =  db;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file


})
export {db}
