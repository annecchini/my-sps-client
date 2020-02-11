import { useEffect } from 'react'

const Landing = props => {
  useEffect(() => props.history.push('/process'))
  return null
}

export default Landing
