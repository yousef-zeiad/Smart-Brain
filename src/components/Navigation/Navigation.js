import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={()=> onRouteChange('signout')} className= 'f3 link dim black underline pa3 pointer'> Sign Out </p>
      </nav>
    )
  } else {
      return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={()=> onRouteChange('LogIn')} className= 'f3 link dim black underline pa3 pointer'> LogIn </p>
          <p onClick={()=> onRouteChange('Register')} className= 'f3 link dim black underline pa3 pointer'> Register </p>
        </nav>
      )
  }
}

export default Navigation;