export const options = [{
  label: 'Activo',
  value: true
},
{
  label: 'Inactivo',
 value:false
} ,

]
export const type_users = [{
  label: 'Administrador',
  value: 1
},
{
  label: 'Profesor',
 value:2
} ,
{
  label: 'Estudiante',
 value:3
} ,
]
export const getStatusName =  (value)=>{

  return  options.find(ops=> {
   return ops.value===value
  }).label

}

export const getTypeName =  (value)=>{

  return  type_users.find(ops=> {
   return ops.value===value
  }).label




}
