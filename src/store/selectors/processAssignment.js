export const selectProcessAssignmentById = (store, id) => {
  return store.byId[id]
}

export const selectProcessAssignmentByProcessId = (store, process_id) => {
  const filterByProcessId = (byId, process_id) => a => byId[a].process_id === process_id
  const ids = store.allIds.filter(filterByProcessId(store.byId, process_id))
  return ids.map(id => store.byId[id])
}
