export const options = [{
  label: 'Activo',
  value: true
},
{
  label: 'Incativo',
 value:false
} ,

]
export const getStatusName =  (value)=>{

  return  options.find(ops=> {
   return ops.value===value
  }).label




}
