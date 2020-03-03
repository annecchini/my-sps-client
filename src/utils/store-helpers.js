export const convertStoreToOptions = store => {
  const options = store.allIds.map(id => {
    return { label: store.byId[id].name, value: id }
  })
  return options
}
