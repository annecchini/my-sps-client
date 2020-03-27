export const selectAssignmentById = (store, id) => {
  return store.byId[id]
}

export const selectAssignments = store => {
  return store.assignmentStore.allIds.map(id => store.assignmentStore.byId[id])
}

export const x = () => {}
