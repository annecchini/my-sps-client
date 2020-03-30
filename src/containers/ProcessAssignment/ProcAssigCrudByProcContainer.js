import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Form, Alert, Button } from 'react-bootstrap'

import ErrorAlert from '../../components/Error/ErrorAlert'
import { clearErrors } from '../../store/actions/error'
import { listAssignment } from '../../store/actions/assignment'
import { readProcess } from '../../store/actions/process'
import { selectAssignments } from '../../store/selectors/assignment'
import { selectProcessById } from '../../store/selectors/process'
import { selectCourseByProcessIdV2 } from '../../store/selectors/course'
import { selectProcessAssignmentByProcessIdV2 } from '../../store/selectors/processAssignment'
import { convertObjetsToOptions } from '../../utils/store-helpers'
import SelectField from '../../components/SelectField'
import { createProcessAssignment, deleteProcessAssignment } from '../../store/actions/processAssigment'
import PrivateGroup from '../../containers/Auth/PrivateGroup'
import { convertErrorsFormat } from '../../utils/error-helpers'

const ProcAssigCrudByProcContainer = props => {
  const { errorStore, process, course, processAssignments, assignments } = props
  const initialState = { process_id: props.match.params.process_id, assignment_id: '' }

  const [createData, setCreateData] = useState(initialState)
  const [deleteData, setDeleteData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [mode, setMode] = useState('list')

  //mostras apenas Assig sem processAssig
  const assignmentsAvailable = assignments.filter(
    assig => !processAssignments.map(pa => pa.assignment_id).includes(assig.id)
  )
  const assignmentOptions = convertObjetsToOptions(assignmentsAvailable, { label: 'name', value: 'id' })
  assignmentOptions.unshift({ label: 'Escolha o cargo', value: '' })

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listAssignment()
    props.readProcess(props.match.params.process_id, {
      withCourse: true,
      withProcessAssignment: true,
      withAssignment: false
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Pegar errors do store (onPropsUpdate)
  useEffect(() => {
    const storeErrors =
      errorStore.data && errorStore.data.devMessage && errorStore.data.devMessage.errors
        ? errorStore.data.devMessage.errors
        : []
    if (storeErrors.length > 0) {
      setErrors({ ...convertErrorsFormat(storeErrors) })
    }
  }, [errorStore])

  const onChange = e => {
    e.preventDefault()
    setCreateData({ ...createData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    props.createProcessAssignment(createData, {
      callbackOk: () => {
        setMode('list')
        setCreateData({ ...createData, assignment_id: '' })
      }
    })
  }

  const onCancel = () => {
    setMode('list')
    setCreateData({ ...createData, assignment_id: '' })
  }

  const onDeletePA = id => {
    props.deleteProcessAssignment(id, {
      callbackOk: () => {
        setMode('list')
      }
    })
  }

  const goToCreateProcAssig = () => {
    setCreateData(initialState)
    setMode('create')
  }

  const goToDeleteProcAssig = pa => {
    setDeleteData(pa)
    setMode('delete')
  }

  // const allProps = {
  //   ...props
  // }

  // console.log('\n')
  // console.log('Variaveis:')
  // console.log('process: ', process)
  // console.log('course: ', course)
  // console.log('procAssig: ', processAssignments)
  // console.log('assignmentsAvailalble: ', assignmentsAvailable)
  // console.log('\n')

  const renderList = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Atribuições de cargo do processo</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-1">
            <PrivateGroup permission="processAssignment_create" course_id={course ? course.id : false}>
              <Button onClick={goToCreateProcAssig}>Nova atribuição de cargo</Button>
            </PrivateGroup>
          </div>
          {/* Lista de atrbuições de cargo */}
          <ul className="list-group mb-0">
            {processAssignments && processAssignments.length > 0 ? (
              processAssignments.map(pa => (
                <li className="list-group-item" key={pa.id}>
                  <div className="row">
                    <div className="col d-flex align-items-center">{`${
                      assignments.find(assig => assig.id === pa.assignment_id).name
                    }`}</div>
                    <div className="col d-flex  d-flex align-items-center justify-content-end">
                      <Button variant="danger" onClick={() => goToDeleteProcAssig(pa)}>
                        Excluir
                      </Button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-inline-item" key="no-assig">
                Sem cargos associados
              </li>
            )}
          </ul>
        </Card.Body>
      </Card>
    )
  }

  const renderCreate = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Criar atribuição de cargo</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={onSubmit}>
            {errors.id ? (
              <Alert className="my-2" variant="danger">
                {errors.id} || {errors.process_id}
              </Alert>
            ) : null}

            <SelectField
              label="Cargo"
              name="assignment_id"
              value={createData.assignment_id}
              onChange={onChange}
              options={assignmentOptions}
              error={errors.assignment_id}
            />

            <Button variant="primary" type="submit">
              Enviar
            </Button>

            <Button className="ml-1" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }

  const renderDelete = () => {
    return (
      <Card className="mt-2 mx-2" border="danger">
        <Card.Header as="h5" className="bg-danger">
          <span className="text-light"> Excluir atribuição de cargo </span>
        </Card.Header>
        <Card.Body>
          <p>Tem certeza que deseja excluir a seguinte atribuição de cargo?</p>

          <dl className="row mb-0">
            <dt className="col-sm-3">Cargo:</dt>
            <dd className="col-sm-9">{assignments.find(assig => assig.id === deleteData.assignment_id).name}</dd>
          </dl>

          <div className="mt-2">
            <Button variant="danger" onClick={() => onDeletePA(deleteData.id)}>
              Excluir
            </Button>

            <Button className="ml-1" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <React.Fragment>
      <ErrorAlert errorStore={errorStore} />

      {mode === 'list' ? renderList() : null}

      {mode === 'create' ? renderCreate() : null}

      {mode === 'delete' ? renderDelete() : null}
    </React.Fragment>
  )
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  errorStore: state.errorStore,
  assignments: selectAssignments(state),
  process: selectProcessById(state, ownProps.match.params.process_id, { withCourse: false }),
  course: selectCourseByProcessIdV2(state, ownProps.match.params.process_id, { withGraduationLevel: false }),
  processAssignments: selectProcessAssignmentByProcessIdV2(state, ownProps.match.params.process_id, {withAssignment: false}) //prettier-ignore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listAssignment,
  readProcess,
  createProcessAssignment,
  deleteProcessAssignment
}

export default connect(mapStateToProps, mapActionsToProps)(ProcAssigCrudByProcContainer)
