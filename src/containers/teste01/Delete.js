import React from 'react'
import { useEffect } from 'react'

const Delete = (props) => {
  const { history } = props

  // componentDidMount() {
  //   const { history } = this.props;

  //   history.listen((newLocation, action) => {
  //     if (action === "PUSH") {
  //       if (
  //         newLocation.pathname !== this.currentPathname ||
  //         newLocation.search !== this.currentSearch
  //       ) {
  //         // Save new location
  //         this.currentPathname = newLocation.pathname;
  //         this.currentSearch = newLocation.search;

  //         // Clone location object and push it to history
  //         history.push({
  //           pathname: newLocation.pathname,
  //           search: newLocation.search
  //         });
  //       }
  //     } else {
  //       // Send user back if they try to navigate back
  //       history.go(1);
  //     }
  //   });
  // }

  useEffect(() => {
    history.listen((newLocation, action) => {
      if (action === 'PUSH') {
        console.log('tentei voltar.')
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(props)
  return <div>Delete component.</div>
}

export default Delete
