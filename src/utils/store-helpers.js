export const convertObjetsToOptions = (objList, options = {}) => {
  const name = options.name || 'name'
  const value = options.value || 'id'
  return objList.map(obj => ({ label: obj[name], value: obj[value] }))
}
