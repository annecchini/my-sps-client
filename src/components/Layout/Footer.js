import React from 'react'

const Footer = props => {
  return (
    <footer>
      <div id="copyright" className="bg-primary text-white mt-3 p-3 text-center">
        Copyright &copy; {new Date().getFullYear()} SEAD SPS
      </div>
    </footer>
  )
}

export default Footer
