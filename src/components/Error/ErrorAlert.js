import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

import isEmpty from '../../utils/is-empty'
import { checkNested } from '../../utils/checkNested'

const ErrorAlert = props => {
  const { errorStore } = props
  const [show, setShow] = useState(false)
  let heading = 'Erro:'
  let message = 'Sem informações adicionais.'

  useEffect(() => {
    if (!isEmpty(errorStore)) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [errorStore])

  if (errorStore.serverError) heading = 'Erro do servidor:'
  else if (errorStore.anotherError) heading = 'Erro desconhecido:'
  if (checkNested(errorStore, 'data', 'userMessage')) message = errorStore.data.userMessage

  if (show) {
    return (
      <Alert className="mx-2 my-2" variant="danger" onClose={() => setShow(false)} dismissible>
        <span className="font-weight-bold">{heading} </span>
        {message}
      </Alert>
    )
  } else {
    return null
  }
}

export default ErrorAlert
