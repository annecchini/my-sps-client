export const selectProcessAssignmentById = (store, id) => {
  return store.byId[id]
}

export const selectProcessAssignmentByProcessId = (store, process_id, options = {}) => {
  const filterByProcessId = (byId, process_id) => a => byId[a].process_id === process_id

  const ids = store.processAssignmentStore.allIds.filter(
    filterByProcessId(store.processAssignmentStore.byId, process_id)
  )

  const processAssignments = ids.map(id => store.processAssignmentStore.byId[id])

  if (options.withAssignment === true) {
    processAssignments.map(pa => {
      pa.assignment = store.assignmentStore.byId[pa.assignment_id] ? store.assignmentStore.byId[pa.assignment_id] : null
      return pa
    })
  }

  return processAssignments
}
