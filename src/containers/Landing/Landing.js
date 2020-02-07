import { useEffect } from 'react'

const Landing = props => {
  useEffect(() => props.history.push('/process'), [props.history])
  return null
}

export default Landing
