import React from 'react'
import { connect } from 'react-redux'

const PrivateGroup = props => {
  const { authStore, permission, course_id } = props
  const { isAuthenticated, access } = authStore

  //Logado.
  if (isAuthenticated === true) {
    //Não exigi nenhuma permissão
    if (!permission) return props.children

    //Testando permissão
    const accessOk = checkAccess({ access, permission, course_id })
    if (accessOk) return props.children
    else return null
  }

  //Não logado.
  return null
}

const mapStateToProps = state => ({
  authStore: state.authStore
})

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(PrivateGroup)
