import { useEffect } from 'react'

const Landing = props => {
  const { history } = props
  useEffect(() => history.push('/process'), [history])
  return null
}

export default Landing
